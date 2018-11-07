import React from 'react';
import TreeComponent from '@opuscapita/react-treeview';
import styled from 'styled-components';
import { List, fromJS } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Datagrid, gridShape, gridColumnShape, DatagridActions } from '@opuscapita/react-grid';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PerfectScrollbar from '@opuscapita/react-perfect-scrollbar';
import { Primitive } from '@opuscapita/oc-cm-common-layouts';
// App imports
import ControlBar from './hierarchy-tree-selector-control-bar.component';
import ArrowControls from './hierarchy-tree-selector-arrow-controls.component';
import { defaultTranslations } from './hierarchy-tree.utils';

const ACTION_BAR_CONTAINER_HEIGHT = '57px';
const TREE_ACTIONS = {
  ADD_CHILDREN: 'ADD_CHILDREN',
  MOVE_LEAF: 'MOVE_LEAF',
  RENAME_PARENT: 'RENAME_PARENT',
  DELETE_PARENT: 'DELETE_PARENT',
};

const Grid = styled(Datagrid)`
  height: 100%;
  padding: 0;
  .oc-datagrid-main-container {
    border: 1px solid ${props => props.theme.colors.colorLightGray};
    border-top:none;
  }
`;

const Container = styled.div`
  display: flex;
  > div {
    width: 50%;
    flex: 1 1 100%;
  }
`;

const TreeContainer = styled.div`
  height:100%;
  .oc-scrollbar-container {
    border: 1px solid ${props => props.theme.colors.colorLightGray};
    height: calc(100% - ${ACTION_BAR_CONTAINER_HEIGHT});
    padding: ${props => props.theme.gutterWidth};
  }
  .oc-react-tree {
    height: 100%;
    .rc-tree-iconEle.rc-tree-icon__customize {
        display:none;
    }
  }
`;

const mapDispatchToProps = {
  setData: DatagridActions.setData,
};

const mapStateToProps = (state, props) => {
  const gridId = props.grid.id;
  return {
    selectedGridItems: state.datagrid.getIn([gridId, 'selectedItems'], List()),
    gridData: state.datagrid.getIn([gridId, 'allData'], List()),
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class HierarchyTreeSelector extends React.PureComponent {
  static propTypes = {
    idKey: PropTypes.string,
    valueKey: PropTypes.string,
    childKey: PropTypes.string,
    treeData: PropTypes.arrayOf(PropTypes.shape({})),
    onChange: PropTypes.func.isRequired,
    grid: gridShape.isRequired,
    gridColumns: PropTypes.arrayOf(gridColumnShape).isRequired,
    className: PropTypes.string,
    setData: PropTypes.func.isRequired,
    selectedGridItems: ImmutablePropTypes.list.isRequired,
    gridData: ImmutablePropTypes.list.isRequired,
    translations: PropTypes.shape({}),
    id: PropTypes.string,
    onDragDropPrevent: PropTypes.func,
  };

  static defaultProps = {
    idKey: 'id',
    valueKey: 'name',
    childKey: 'children',
    treeData: [],
    className: '',
    translations: defaultTranslations,
    id: 'hierarchy-tree',
    onDragDropPrevent: undefined,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedKeys: [],
    };
  }

  /**
   * Selects a tree item
   * @param selectedKeys (array)
   */
  onTreeItemSelect = (selectedKeys) => {
    this.setState({ selectedKeys });
  };

  /**
   * Fired on drag n' drop
   * @param items
   */
  onTreeItemDragDrop = (items) => {
    const { onChange } = this.props;
    onChange(items);
  };

  /**
   * Deletes a parent node
   */
  onDeleteClick = () => {
    const { onChange, treeData } = this.props;
    const action = {
      type: TREE_ACTIONS.DELETE_PARENT,
    };
    const newItems = this.getUpdatedTree(this.state.selectedKeys[0], treeData, action);
    onChange(newItems);
  };

  /**
   * Adds a new node to the root of the tree, or under a selected tree node using
   * ADD_CHILDREN action
   * @param data
   */
  onAddNewClick = (data, callback) => {
    const { onChange, treeData, idKey } = this.props;
    let newItems = treeData.slice();

    // If no tree node is selected, we'll place the new item to the root
    // of the tree
    if (!this.state.selectedKeys[0]) {
      newItems.push(data);
    } else {
      const action = {
        type: TREE_ACTIONS.ADD_CHILDREN,
        data,
      };
      newItems = this.getUpdatedTree(this.state.selectedKeys[0], treeData, action);
    }
    this.setState({ selectedKeys: [data[idKey]] }, () => {
      onChange(newItems);
      callback();
    });
  };

  /**
   * Removes the chosen item from a tree and updates the grid using MOVE_LEAF
   * action
   */
  onMoveToGridClick = () => {
    const { treeData, onChange } = this.props;
    const action = {
      type: TREE_ACTIONS.MOVE_LEAF,
      data: this.state.selectedKeys[0],
    };
    const newGridItems = fromJS([this.getTreeItem(this.state.selectedKeys[0])]);
    const newItems = this.getUpdatedTree(this.state.selectedKeys[0], treeData, action);

    this.setDataToGrid(newGridItems);
    onChange(newItems);
  };

  /**
   * Adds selected grid items to the chosen tree node using ADD_CHILDREN action
   */
  onMoveToTreeClick = () => {
    const {
      onChange, selectedGridItems, gridData, treeData,
    } = this.props;

    const action = {
      type: TREE_ACTIONS.ADD_CHILDREN,
      data: gridData
        .filter(i => selectedGridItems.includes(i.get('id')))
        .toJS(),
    };
    const newItems = this.getUpdatedTree(this.state.selectedKeys[0], treeData, action);
    const newGridItems = gridData.filter(item => !selectedGridItems.includes(item.get('id')));

    this.setDataToGrid(newGridItems, true);
    onChange(newItems);
  };

  /**
   * Renames the chosen tree node using a RENAME_PARENT action
   * @param value
   */
  onInputChange = (value) => {
    const { treeData, onChange } = this.props;
    const action = {
      type: TREE_ACTIONS.RENAME_PARENT,
      data: value,
    };
    const newItems = this.getUpdatedTree(this.state.selectedKeys[0], treeData, action);
    onChange(newItems);
  };

  /**
   * Returns updated tree items.
   * @param id - target item
   * @param array - array where target item is being searched
   * @param action - action to be performed {type, data}
   * @returns {*}
   */
  getUpdatedTree = (id, array = this.props.treeData, action) => {
    let found = false;
    const { idKey, childKey, valueKey } = this.props;
    const newItems = array.slice();
    const removeActions = [TREE_ACTIONS.MOVE_LEAF, TREE_ACTIONS.DELETE_PARENT];

    // If deleted parent item is in the root node
    if (action.type === TREE_ACTIONS.DELETE_PARENT) {
      const rootItem = array.find(item => item[idKey] === id);
      if (rootItem) {
        if (rootItem[childKey].length) {
          this.setDataToGrid(fromJS(this.getAllLeafs(rootItem[childKey])));
          this.deselectItem();
        }
        return newItems.filter(item => item[idKey] !== id);
      }
    }

    for (let i = 0; i < newItems.length; i += 1) {
      const item = newItems[i];
      if (removeActions.includes(action.type) && item[childKey] && !found) {
        found = !!item[childKey].find(child => child[idKey] === id);
        if (found) {
          // When removing an item we must first find its parent and alter its children array
          if (action.type === TREE_ACTIONS.MOVE_LEAF) {
            item[childKey] = item[childKey].filter(child => child[idKey] !== id);
            this.deselectItem();
          }
          if (action.type === TREE_ACTIONS.DELETE_PARENT) {
            // we must first filter the children, so that we won't get leafs from
            // other child branches
            const filteredChildren = item[childKey].filter(childItem => childItem[idKey] === id);
            this.setDataToGrid(fromJS(this.getAllLeafs(filteredChildren)));
            this.deselectItem();
            item[childKey] = item[childKey].filter(childItem => childItem[idKey] !== id);
          }
          break;
        }
      }

      if (item[idKey] === id && !found) {
        found = true;
        switch (action.type) {
          case TREE_ACTIONS.ADD_CHILDREN:
            item[childKey] = (item[childKey] || []).concat(action.data);
            break;
          case TREE_ACTIONS.RENAME_PARENT:
            item[valueKey] = action.data;
            break;
          default:
            throw new TypeError('Action type is undefined');
        }
        break;
      }
      if (item[childKey] && !found) found = this.getUpdatedTree(id, item[childKey], action);
    }

    if (!found) return false;
    return newItems;
  };

  /**
   * Returns recursively all leaf items from a given array
   * @param array
   * @param alreadyFound (used recursively)
   */
  getAllLeafs = (array, alreadyFound = []) => {
    const { childKey } = this.props;
    let leafs = alreadyFound;

    for (let i = 0; i < array.length; i += 1) {
      const item = array[i];
      if (item[childKey]) {
        leafs = this.getAllLeafs(item[childKey], alreadyFound);
      }
      if (!item[childKey]) leafs.push(item);
    }
    return leafs;
  };

  /**
   * Returns a tree item by ID
   * @param id
   * @param array
   * @param returnParent - return item's parent instead of the item
   * @param parent - parent item (used recursively)
   * @returns {{}}
   */
  getTreeItem = (id, array = this.props.treeData, returnParent = false, parent = null) => {
    const { childKey, idKey } = this.props;
    let found = array.find(item => item[idKey] === id);

    if (found && returnParent) found = parent;

    if (!found) {
      array.forEach((item) => {
        if (item[childKey] && !found) {
          found = this.getTreeItem(id, item[childKey], returnParent, item);
        }
      });
    }
    return found;
  };

  /**
   * Appends provided items to the grid
   * @param items - immutable array of items to be appended to grid
   * @param setNewItems - set completely a new array of items
   */
  setDataToGrid = (items, setNewItems = false) => {
    let data = List();
    const { grid, gridColumns, gridData } = this.props;
    if (!setNewItems) data = gridData.slice();
    const newGridItems = data.concat(items);
    this.props.setData(grid, gridColumns, newGridItems);
  };

  isDragDropLegal = (items, e) => {
    const { childKey, treeData, onDragDropPrevent } = this.props;
    const dropItem = this.getTreeItem(e.node.props.eventKey);
    const dragItem = this.getTreeItem(e.dragNode.props.eventKey);
    const dropItemParent = this.getTreeItem(e.node.props.eventKey, treeData, true);

    /**
     * We want to prevent the move, if:
     * - Selected item is a parent, and ..
     *    - Dropping over an item, and ..
     *      - New parent has leafs OR new parent is a leaf
     *    - Dropping between items, and ..
     *        - New parent's parent has leafs
     *  - Selected item is a leaf, and ...
     */
    if (dragItem[childKey]) {
      if (
        (!e.dropToGap && (this.hasLeafs(dropItem) || !dropItem[childKey])) ||
        (dropItemParent && e.dropToGap && (this.hasLeafs(dropItemParent)))
      ) {
        if (onDragDropPrevent) onDragDropPrevent();
        return false;
      }
    } else if (
      (dropItem && !e.dropToGap && this.hasParents(dropItem)) ||
      (dropItemParent && e.dropToGap && this.hasParents(dropItemParent)) ||
      (e.dropToGap && !dropItemParent) ||
      (!e.dropToGap && !dropItem[childKey])
    ) {
      // Item has got parent as a child - leaf cannot be dropped here
      if (onDragDropPrevent) onDragDropPrevent();
      return false;
    }
    return true;
  };


  hasLeafs = (item) => {
    const { childKey } = this.props;
    if (!item[childKey]) return false;
    return !!item[childKey].find(child => !child[childKey]);
  };

  hasParents = (item) => {
    const { childKey } = this.props;
    if (!item[childKey]) return false;
    return !!item[childKey].find(child => child[childKey]);
  };

  /**
   * Deselects an item, if it is e.g. removed
   */
  deselectItem = () => {
    this.setState({ selectedKeys: [] });
  };

  render() {
    const {
      valueKey, idKey, treeData, grid, gridColumns, className, translations,
    } = this.props;

    const mergedGrid = Object.assign({}, grid, { defaultShowFilteringRow: true });
    const mergedTranslations = Object.assign({}, defaultTranslations, translations);

    return (
      <Container className={className}>
        <TreeContainer>
          <ControlBar
            {...this.props}
            onAddNewClick={this.onAddNewClick}
            onDeleteClick={this.onDeleteClick}
            onInputChange={this.onInputChange}
            selectedTreeItem={this.getTreeItem(this.state.selectedKeys[0])}
            height={ACTION_BAR_CONTAINER_HEIGHT}
            translations={mergedTranslations}
          />
          <PerfectScrollbar>
            <TreeComponent
              treeData={treeData}
              dataLookUpKey={idKey}
              dataLookUpValue={valueKey}
              onSelect={this.onTreeItemSelect}
              onDragDrop={this.onTreeItemDragDrop}
              checkable={false}
              selectedKeys={this.state.selectedKeys}
              isDragDropLegal={this.isDragDropLegal}
              selectable
              draggable
              defaultExpandAll
            />
          </PerfectScrollbar>
        </TreeContainer>
        <ArrowControls
          {...this.props}
          selectedTreeItem={this.getTreeItem(this.state.selectedKeys[0])}
          onMoveToTreeClick={this.onMoveToTreeClick}
          onMoveToGridClick={this.onMoveToGridClick}
        />
        <Grid
          grid={mergedGrid}
          columns={gridColumns}
          rowSelect
          multiSelect
          filtering
          gridHeader={<Primitive.Subtitle>{mergedTranslations.gridTitle}</Primitive.Subtitle>}
        />
      </Container>
    );
  }
}
