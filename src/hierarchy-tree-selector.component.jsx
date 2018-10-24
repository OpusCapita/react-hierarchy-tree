import React from 'react';
import TreeComponent from '@opuscapita/react-treeview';
import styled from 'styled-components';
import { List, fromJS } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Datagrid, gridShape, gridColumnShape, DatagridActions } from '@opuscapita/react-grid';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PerfectScrollbar from '@opuscapita/react-perfect-scrollbar';

// App imports
import ControlButton from './hierarchy-tree-selector-arrows.component';
import ControlBar from './hierarchy-tree-selector-control-bar.component';

const TREE_ACTIONS = {
  ADD_CHILDREN: 'ADD_CHILDREN',
  MOVE_LEAF: 'MOVE_LEAF',
  RENAME_PARENT: 'RENAME_PARENT',
  DELETE_PARENT: 'DELETE_PARENT',
};

const ITEM_TYPES = {
  LEAF: 'LEAF',
  PARENT: 'PARENT',
};

const Grid = styled(Datagrid)`
  height: 100%;
  padding: 0;
  border: 1px solid ${props => props.theme.colors.colorLightGray};
`;

const Container = styled.div`
  display: flex;
  height: calc(100% - 50px);
  > div {
    width: 50%;
    flex: 1 1 100%;
  }
`;

const Controls = styled.div`
  display: flex;
  max-width: 5rem;
  flex-direction: column;
  justify-content: center;
`;

const TreeContainer = styled.div`
  height:100%;
  border: 1px solid ${props => props.theme.colors.colorLightGray};
  padding: ${props => props.theme.gutterWidth};
  .rc-tree {
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
    selectedItems: state.datagrid.getIn([gridId, 'selectedItems'], List()),
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
    selectedItems: ImmutablePropTypes.list.isRequired,
    gridData: ImmutablePropTypes.list.isRequired,
    defaultNewNodeValue: PropTypes.string,
    translations: PropTypes.shape({}),
  };

  static defaultProps = {
    idKey: 'id',
    valueKey: 'name',
    childKey: 'children',
    treeData: [],
    className: '',
    defaultNewNodeValue: 'New node',
    translations: {
      add: 'Add level',
      delete: 'Delete',
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedId: null,
    };
  }

  /**
   * Selects a tree item
   * @param selectedItems (array)
   */
  onTreeItemSelect = (selectedItems) => {
    this.setState({ selectedId: selectedItems[0] });
  };

  /**
   * Deletes a parent node
   */
  onDeleteClick = () => {
    const { onChange, treeData } = this.props;
    const action = {
      type: TREE_ACTIONS.DELETE_PARENT,
    };
    const newItems = this.getUpdatedTree(this.state.selectedId, treeData, action);
    onChange(newItems);
  };

  /**
   * Adds a new node to the root of the tree, or under a selected tree node using
   * ADD_CHILDREN action
   * @param data
   */
  onAddNewClick = (data) => {
    const { onChange, treeData } = this.props;
    let newItems = treeData.slice();

    // If no tree node is selected, we'll place the new item to the root
    // of the tree
    if (!this.state.selectedId) {
      newItems.push(data);
    } else {
      const action = {
        type: TREE_ACTIONS.ADD_CHILDREN,
        data,
      };
      newItems = this.getUpdatedTree(this.state.selectedId, treeData, action);
    }
    onChange(newItems);
  };

  /**
   * Removes the chosen item from a tree and updates the grid using MOVE_LEAF
   * action
   */
  onMoveToGridClick = () => {
    const { treeData, onChange } = this.props;
    const action = {
      type: TREE_ACTIONS.MOVE_LEAF,
      data: this.state.selectedId,
    };
    const newGridItems = fromJS([this.findTreeItem(this.state.selectedId)]);
    const newItems = this.getUpdatedTree(this.state.selectedId, treeData, action);

    this.setDataToGrid(newGridItems);
    onChange(newItems);
  };

  /**
   * Adds selected grid items to the chosen tree node using ADD_CHILDREN action
   */
  onMoveToTreeClick = () => {
    const {
      onChange, selectedItems, gridData, treeData,
    } = this.props;

    const action = {
      type: TREE_ACTIONS.ADD_CHILDREN,
      data: gridData
        .filter(i => selectedItems.includes(i.get('id')))
        .toJS(),
    };
    const newItems = this.getUpdatedTree(this.state.selectedId, treeData, action);
    const newGridItems = gridData.filter(item => !selectedItems.includes(item.get('id')));

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
    const newItems = this.getUpdatedTree(this.state.selectedId, treeData, action);
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
          this.setDataToGrid(fromJS(this.getLeafs(rootItem[childKey])));
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
            this.setDataToGrid(fromJS(this.getLeafs(item[childKey])));
            this.deselectItem();
            item[childKey] = [];
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
   * Returns leaf items from a given array
   * @param array
   * @param alreadyFound (used recursively)
   */
  getLeafs = (array, alreadyFound = []) => {
    const { childKey } = this.props;
    let leafs = alreadyFound;

    for (let i = 0; i < array.length; i += 1) {
      const item = array[i];
      if (item[childKey]) {
        leafs = this.getLeafs(item[childKey], alreadyFound);
      }
      if (!item[childKey]) leafs.push(item);
    }
    return leafs;
  };

  /**
   * Returns the value of the selected tree item
   * @returns {null}
   */
  getSelectedValue = () => {
    const { valueKey } = this.props;
    const item = this.findTreeItem(this.state.selectedId);
    return item ? item[valueKey] : null;
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

  /**
   * Deselects an item, if it is e.g. removed
   */
  deselectItem = () => {
    this.setState({ selectedId: null });
  };

  /**
   * Is selected item a parent (has a [childKey])
   * @returns {boolean}
   */
  isSelectedItemParent = () => {
    const { childKey } = this.props;
    const item = this.findTreeItem(this.state.selectedId);
    return item ? !!item[childKey] : false;
  };

  /**
   * Checks if selected item has got leaf items (items with no [childKey])
   * @returns boolean
   */
  hasSelectedItemChildrenOfType = (type) => {
    const { childKey } = this.props;
    const item = this.findTreeItem(this.state.selectedId);
    if (!item[childKey]) return false;
    if (type === ITEM_TYPES.LEAF) return !!item[childKey].find(childItem => !childItem[childKey]);
    return !!item[childKey].find(childItem => childItem[childKey]);
  };

  /**
   * Returns a tree item by ID
   * @param id
   * @param array
   * @returns {{}}
   */
  findTreeItem = (id, array = this.props.treeData) => {
    const { childKey, idKey } = this.props;
    let found = array.find(item => item[idKey] === id);
    if (!found) {
      array.forEach((item) => {
        if (item[childKey] && !found) found = this.findTreeItem(id, item[childKey]);
      });
    }
    return found;
  };

  /**
   * Is add button disabled
   * @returns {boolean}
   */
  isAddDisabled = () => {
    if (!this.state.selectedId) return false;
    return !this.isSelectedItemParent() || this.hasSelectedItemChildrenOfType(ITEM_TYPES.LEAF);
  };

  /**
   * Is "move to tree" caret disabled
   * @returns {boolean}
   */
  isMoveToTreeDisabled = () => {
    const { selectedItems } = this.props;
    return !this.isSelectedItemParent() ||
      !selectedItems.size ||
      this.hasSelectedItemChildrenOfType(ITEM_TYPES.PARENT);
  };

  render() {
    const {
      valueKey, idKey, treeData, grid, gridColumns, className,
    } = this.props;

    const extendedGrid = Object.assign({}, grid, { defaultShowFilteringRow: true });

    return (
      <div className={className}>
        <ControlBar
          {...this.props}
          onAddNewClick={this.onAddNewClick}
          onDeleteClick={this.onDeleteClick}
          addDisabled={this.isAddDisabled()}
          inputDisabled={!this.isSelectedItemParent()}
          deleteDisabled={!this.isSelectedItemParent()}
          selectedValue={this.getSelectedValue()}
          onInputChange={this.onInputChange}
        />
        <Container>
          <PerfectScrollbar>
            <TreeContainer>
              <TreeComponent
                treeData={treeData}
                dataLookUpKey={idKey}
                dataLookUpValue={valueKey}
                onSelect={this.onTreeItemSelect}
                checkable={false}
                selectable
                defaultExpandAll
              />
            </TreeContainer>
          </PerfectScrollbar>
          <Controls>
            <ControlButton
              icon="CaretLeft"
              onClick={this.onMoveToTreeClick}
              disabled={this.isMoveToTreeDisabled()}
            />
            <ControlButton
              icon="CaretRight"
              onClick={this.onMoveToGridClick}
              disabled={this.isSelectedItemParent()}
            />
          </Controls>
          <Grid
            grid={extendedGrid}
            columns={gridColumns}
            rowSelect
            multiSelect
            filtering
          />
        </Container>
      </div>
    );
  }
}
