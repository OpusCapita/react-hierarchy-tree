import TreeComponent from '@opuscapita/react-tree-component';
import { Primitive } from '@opuscapita/oc-cm-common-layouts';
import { Datagrid, gridShape, gridColumnShape, DatagridActions } from '@opuscapita/react-grid';
import ConfirmDialog from '@opuscapita/react-confirmation-dialog';
import React from 'react';
import styled from 'styled-components';
import { List, fromJS } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// App imports
import ControlBar from './hierarchy-tree-selector-control-bar.component';
import ArrowControls from './hierarchy-tree-selector-arrow-controls.component';
import { defaultTranslations } from './hierarchy-tree.utils';

const ACTION_BAR_CONTAINER_HEIGHT = '54px';
const TREE_ACTIONS = {
  ADD_CHILDREN: 'ADD_CHILDREN',
  MOVE_LEAF: 'MOVE_LEAF',
  RENAME_PARENT: 'RENAME_PARENT',
  DELETE_PARENT: 'DELETE_PARENT',
};

const Grid = styled(Datagrid)`
  height: 100%;
  &&& {
    padding: 0;
  }
`;

const Container = styled.div`
  display: flex;
  min-height: 300px;
  > div {
    width: 50%;
    flex: 1 1 100%;
  }
`;

const TreeContainer = styled.div`
  height: 100%;
  .oc-scrollbar-container {
    height: calc(100% - ${ACTION_BAR_CONTAINER_HEIGHT});
    padding: ${props => props.theme.gutterWidth};
  }
  .tree-header {
    min-height: ${ACTION_BAR_CONTAINER_HEIGHT};
    .ordering-arrows {
      font-weight: 24px;
    }
  }
  .oc-react-tree {
    height: 100%;
    .rc-tree-iconEle.rc-tree-icon__customize {
      display: none;
    }
  }
`;

const mapDispatchToProps = {
  setData: DatagridActions.setData,
  clearSelectedItems: DatagridActions.clearSelectedItems,
};

const mapStateToProps = (state, props) => {
  const gridId = props.grid.id;
  return {
    selectedGridItems: state.datagrid.getIn([gridId, 'selectedItems'], List()),
    gridData: state.datagrid.getIn([gridId, 'allData'], List()),
  };
};

@connect(
  mapStateToProps,
  mapDispatchToProps,
)
export default class HierarchyTreeSelector extends React.PureComponent {
  static propTypes = {
    idKey: PropTypes.string,
    valueKey: PropTypes.string,
    childKey: PropTypes.string,
    lockedKey: PropTypes.string,
    treeData: PropTypes.arrayOf(PropTypes.shape({})),
    grid: gridShape.isRequired,
    gridColumns: PropTypes.arrayOf(gridColumnShape).isRequired,
    className: PropTypes.string,
    setData: PropTypes.func.isRequired,
    clearSelectedItems: PropTypes.func.isRequired,
    selectedGridItems: ImmutablePropTypes.list.isRequired,
    gridData: ImmutablePropTypes.list.isRequired,
    translations: PropTypes.shape({}),
    id: PropTypes.string,
    defaultExpandAll: PropTypes.bool,
    singleRoot: PropTypes.bool,

    // Callbacks
    onChange: PropTypes.func,
    onSelect: PropTypes.func,
    onPreventDelete: PropTypes.func,
  };

  static defaultProps = {
    idKey: 'id',
    valueKey: 'name',
    childKey: 'children',
    lockedKey: 'disabled',
    treeData: [],
    className: '',
    translations: defaultTranslations,
    id: 'hierarchy-tree',
    onSelect: undefined,
    onChange: undefined,
    onPreventDelete: undefined,
    defaultExpandAll: true,
    singleRoot: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedKeys: [],
      expandedKeys: [],
      showDeleteConfirmation: false,
    };
  }

  /**
   * Selects a tree item
   * @param selectedKeys (array)
   */
  onTreeItemSelect = (selectedKeys) => {
    if (this.isSelectedDisabled()) return;
    const { onSelect, lockedKey } = this.props;
    const selectedItem = this.getTreeItem(selectedKeys[0]);
    if (selectedItem && selectedItem[lockedKey]) return;
    this.setState({ selectedKeys }, () => {
      if (onSelect) onSelect(selectedKeys);
    });
  };

  /**
   * Displays a confirmation dialog
   */
  onDeleteClick = () => {
    const { childKey, lockedKey, onPreventDelete } = this.props;
    const item = this.getTreeItem(this.state.selectedKeys[0]);
    // If item is not a parent, we won't show the delete confirmation dialog
    if (!item[childKey]) {
      this.moveItemToGrid();
      return;
    }
    // If it is a parent, we want to check that it doesn't contain any locked items
    const leafs = this.getAllLeafs(item[childKey]);
    if (leafs.find(leaf => leaf[lockedKey]) && onPreventDelete) {
      onPreventDelete();
      return;
    }

    this.setState({ showDeleteConfirmation: true });
  };

  /**
   * Adds a new node to the root of the tree, or under a selected tree node using
   * ADD_CHILDREN action
   * @param data - data to be added
   * @param callback
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
      // If the parent is not yet expanded, we will expand it now
      const parent = this.getTreeItem(data[idKey], treeData, true) || {};
      this.expandParent(parent[idKey]);

      if (onChange) onChange(newItems);
      callback();
    });
  };

  onMoveToGridClick = () => {
    this.moveItemToGrid();
  };

  /**
   * Calls onChange callback whenever user reorders tree items using ordering arrows
   * @param items
   */
  onOrderClick = (items) => {
    this.props.onChange(items);
  };

  /**
   * Adds selected grid items to the chosen tree node using ADD_CHILDREN action
   */
  onMoveToTreeClick = () => {
    const {
      onChange, selectedGridItems, gridData, treeData, idKey,
    } = this.props;
    const selectedId = this.state.selectedKeys[0];

    const action = {
      type: TREE_ACTIONS.ADD_CHILDREN,
      data: gridData.filter(i => selectedGridItems.includes(i.get(idKey))).toJS(),
    };
    const newItems = this.getUpdatedTree(selectedId, treeData, action);
    const newGridItems = gridData.filter(item => !selectedGridItems.includes(item.get(idKey)));

    this.expandParent(selectedId, true);
    this.setDataToGrid(newGridItems, true);
    if (onChange) onChange(newItems);
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
    if (onChange) onChange(newItems);
  };

  /**
   * Fired on expand
   * @param ids
   */
  onExpand = (ids) => {
    this.setState({
      expandedKeys: ids,
    });
  };

  /**
   * Returns updated tree items.
   * @param id - target item
   * @param array - array where target item is being searched
   * @param action - action to be performed {type, data}
   * @returns {*}
   */
  getUpdatedTree = (id, array = this.props.treeData, action) => {
    if (this.isSelectedDisabled()) return array;

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
   * Get adjacent item (id) in parent array. Used when moving items from tree
   * to grid/deleting an item
   * @param id
   * @returns {*}
   */
  getAdjacentItem = (id) => {
    if (!id) return null;
    const { childKey, idKey, treeData } = this.props;

    const getAdjacentItemId = (parent) => {
      const parentArr = Array.isArray(parent) ? parent : parent[childKey];
      const index = parentArr.findIndex(child => child[idKey] === id);
      let adjacentItem = parentArr[index + 1];
      if (!adjacentItem) adjacentItem = parentArr[index - 1];
      if (!adjacentItem && !Array.isArray(parent)) adjacentItem = parent;
      if (!adjacentItem) return null;

      return adjacentItem[idKey];
    };

    const parent = this.getTreeItem(id, this.props.treeData, true);
    return parent ? getAdjacentItemId(parent) : getAdjacentItemId(treeData);
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
    this.props.clearSelectedItems(grid);
  };

  /**
   * Checks whether or not given node is disabled
   */
  isSelectedDisabled = () => {
    const { lockedKey } = this.props;
    const item = !!this.getTreeItem(this.state.selectedKeys[0]);
    if (!item) return false;
    return item[lockedKey];
  };

  /**
   * Removes the chosen item from a tree and updates the grid using MOVE_LEAF
   * action
   */
  moveItemToGrid = () => {
    const { treeData, onChange } = this.props;
    const selectedKey = this.state.selectedKeys[0];
    const action = {
      type: TREE_ACTIONS.MOVE_LEAF,
      data: this.state.selectedKeys[0],
    };
    const nextSelectedKey = this.getAdjacentItem(selectedKey);
    const newGridItems = fromJS([this.getTreeItem(selectedKey)]);
    const newItems = this.getUpdatedTree(selectedKey, treeData, action);

    this.setDataToGrid(newGridItems);
    if (onChange) onChange(newItems);
    this.setState({
      selectedKeys: [nextSelectedKey],
    });
  };

  /**
   * Expands a parent
   * @param parentId
   */
  expandParent = (parentId) => {
    if (parentId && !this.state.expandedKeys.find(expandedId => expandedId === parentId)) {
      const newExpandedKeys = this.state.expandedKeys.slice();
      newExpandedKeys.push(parentId);
      this.setState({ expandedKeys: newExpandedKeys });
    }
  };

  /**
   * Closes delete confirmation dialog
   */
  closeDeleteConfirmationDialog = () => {
    this.setState({ showDeleteConfirmation: false });
  };

  /**
   * Deletes a parent node
   */
  deleteParent = () => {
    const { onChange, treeData } = this.props;
    const selectedKey = this.state.selectedKeys[0];
    const action = {
      type: TREE_ACTIONS.DELETE_PARENT,
    };
    const nextSelectedKey = this.getAdjacentItem(selectedKey);
    const newItems = this.getUpdatedTree(selectedKey, treeData, action);
    if (onChange) onChange(newItems);
    this.setState({
      selectedKeys: [nextSelectedKey],
      showDeleteConfirmation: false,
    });
  };

  /**
   * Deselects an item, if it is e.g. removed
   */
  deselectItem = () => {
    this.setState({ selectedKeys: [] });
  };

  renderHeaderRight = translations => (
    <ControlBar
      {...this.props}
      onAddNewClick={this.onAddNewClick}
      onDeleteClick={this.onDeleteClick}
      onInputChange={this.onInputChange}
      selectedTreeItem={this.getTreeItem(this.state.selectedKeys[0])}
      height={ACTION_BAR_CONTAINER_HEIGHT}
      translations={translations}
    />
  );

  render() {
    const {
      valueKey,
      idKey,
      treeData,
      grid,
      gridColumns,
      className,
      translations,
      childKey,
    } = this.props;

    const mergedGrid = Object.assign({}, grid, { defaultShowFilteringRow: true });
    const mergedTranslations = Object.assign({}, defaultTranslations, translations);

    return (
      <React.Fragment>
        <Container className={className}>
          <TreeContainer>
            <TreeComponent
              treeData={treeData}
              dataLookUpKey={idKey}
              dataLookUpValue={valueKey}
              dataLookUpChildren={childKey}
              onSelect={this.onTreeItemSelect}
              onExpand={this.onExpand}
              checkable={false}
              selectedKeys={this.state.selectedKeys}
              expandedKeys={this.state.expandedKeys}
              onOrderButtonClick={this.onOrderClick}
              title={mergedTranslations.treeTitle}
              selectable
              showOrderingArrows
              showExpandAll
              headerRight={this.renderHeaderRight(mergedTranslations)}
              handleExpandedKeysManually
            />
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
            multiSelect
            filtering
            rowSelectCheckboxColumn
            gridHeader={<Primitive.Subtitle>{mergedTranslations.gridTitle}</Primitive.Subtitle>}
          />
        </Container>
        {this.state.showDeleteConfirmation && (
          <ConfirmDialog
            translations={mergedTranslations.deleteConfirmDialog}
            confirmCallback={this.deleteParent}
            cancelCallback={this.closeDeleteConfirmationDialog}
          />
        )}
      </React.Fragment>
    );
  }
}
