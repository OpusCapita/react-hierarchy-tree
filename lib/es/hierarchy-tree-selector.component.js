var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _dec, _class, _class2, _temp;

var _templateObject = _taggedTemplateLiteralLoose(['\n  height: 100%;\n  &&& {\n    padding: 0;\n  }\n  .oc-datagrid-main-container {\n    border: 1px solid ', ';\n    border-top:none;\n  }\n'], ['\n  height: 100%;\n  &&& {\n    padding: 0;\n  }\n  .oc-datagrid-main-container {\n    border: 1px solid ', ';\n    border-top:none;\n  }\n']),
    _templateObject2 = _taggedTemplateLiteralLoose(['\n  display: flex;\n  min-height: 300px;\n  > div {\n    width: 50%;\n    flex: 1 1 100%;\n  }\n'], ['\n  display: flex;\n  min-height: 300px;\n  > div {\n    width: 50%;\n    flex: 1 1 100%;\n  }\n']),
    _templateObject3 = _taggedTemplateLiteralLoose(['\n  height:100%;\n  .oc-scrollbar-container {\n    border: 1px solid ', ';\n    height: calc(100% - ', ');\n    padding: ', ';\n  }\n  .oc-react-tree {\n    height: 100%;\n    .rc-tree-iconEle.rc-tree-icon__customize {\n        display:none;\n    }\n  }\n'], ['\n  height:100%;\n  .oc-scrollbar-container {\n    border: 1px solid ', ';\n    height: calc(100% - ', ');\n    padding: ', ';\n  }\n  .oc-react-tree {\n    height: 100%;\n    .rc-tree-iconEle.rc-tree-icon__customize {\n        display:none;\n    }\n  }\n']),
    _templateObject4 = _taggedTemplateLiteralLoose(['\n  display: flex;\n  justify-content: center;\n  font-weight: bold;\n'], ['\n  display: flex;\n  justify-content: center;\n  font-weight: bold;\n']);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

import TreeComponent from '@opuscapita/react-treeview';
import PerfectScrollbar from '@opuscapita/react-perfect-scrollbar';
import { Primitive } from '@opuscapita/oc-cm-common-layouts';
import { Datagrid, gridShape, gridColumnShape, DatagridActions } from '@opuscapita/react-grid';
import { ConfirmDialog } from '@opuscapita/react-confirmation-dialog';

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

var ACTION_BAR_CONTAINER_HEIGHT = '57px';
var TREE_ACTIONS = {
  ADD_CHILDREN: 'ADD_CHILDREN',
  MOVE_LEAF: 'MOVE_LEAF',
  RENAME_PARENT: 'RENAME_PARENT',
  DELETE_PARENT: 'DELETE_PARENT'
};

var Grid = styled(Datagrid)(_templateObject, function (props) {
  return props.theme.colors.colorLightGray;
});

var Container = styled.div(_templateObject2);

var TreeContainer = styled.div(_templateObject3, function (props) {
  return props.theme.colors.colorLightGray;
}, ACTION_BAR_CONTAINER_HEIGHT, function (props) {
  return props.theme.gutterWidth;
});

var NoItemsText = styled.p(_templateObject4);

var mapDispatchToProps = {
  setData: DatagridActions.setData,
  clearSelectedItems: DatagridActions.clearSelectedItems
};

var mapStateToProps = function mapStateToProps(state, props) {
  var gridId = props.grid.id;
  return {
    selectedGridItems: state.datagrid.getIn([gridId, 'selectedItems'], List()),
    gridData: state.datagrid.getIn([gridId, 'allData'], List())
  };
};

var HierarchyTreeSelector = (_dec = connect(mapStateToProps, mapDispatchToProps), _dec(_class = (_temp = _class2 = function (_React$PureComponent) {
  _inherits(HierarchyTreeSelector, _React$PureComponent);

  function HierarchyTreeSelector(props) {
    _classCallCheck(this, HierarchyTreeSelector);

    var _this = _possibleConstructorReturn(this, _React$PureComponent.call(this, props));

    _this.onTreeItemSelect = function (selectedKeys) {
      var onSelect = _this.props.onSelect;

      _this.setState({ selectedKeys: selectedKeys }, function () {
        if (onSelect) onSelect(selectedKeys);
      });
    };

    _this.onTreeItemDragDrop = function (items) {
      var onChange = _this.props.onChange;

      if (onChange) onChange(items);
    };

    _this.onDeleteClick = function () {
      _this.setState({ showDeleteConfirmation: true });
    };

    _this.onAddNewClick = function (data, callback) {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          treeData = _this$props.treeData,
          idKey = _this$props.idKey;

      var newItems = treeData.slice();

      // If no tree node is selected, we'll place the new item to the root
      // of the tree
      if (!_this.state.selectedKeys[0]) {
        newItems.push(data);
      } else {
        var action = {
          type: TREE_ACTIONS.ADD_CHILDREN,
          data: data
        };
        newItems = _this.getUpdatedTree(_this.state.selectedKeys[0], treeData, action);
      }
      _this.setState({ selectedKeys: [data[idKey]] }, function () {
        // If the parent is not yet expanded, we will expand it now
        var parent = _this.getTreeItem(data[idKey], treeData, true) || {};
        _this.expandParent(parent[idKey]);

        if (onChange) onChange(newItems);
        callback();
      });
    };

    _this.onMoveToGridClick = function () {
      var _this$props2 = _this.props,
          treeData = _this$props2.treeData,
          onChange = _this$props2.onChange;

      var selectedKey = _this.state.selectedKeys[0];
      var action = {
        type: TREE_ACTIONS.MOVE_LEAF,
        data: _this.state.selectedKeys[0]
      };
      var nextSelectedKey = _this.getAdjacentItem(selectedKey);
      var newGridItems = fromJS([_this.getTreeItem(selectedKey)]);
      var newItems = _this.getUpdatedTree(selectedKey, treeData, action);

      _this.setDataToGrid(newGridItems);
      if (onChange) onChange(newItems);
      _this.setState({
        selectedKeys: [nextSelectedKey]
      });
    };

    _this.onMoveToTreeClick = function () {
      var _this$props3 = _this.props,
          onChange = _this$props3.onChange,
          selectedGridItems = _this$props3.selectedGridItems,
          gridData = _this$props3.gridData,
          treeData = _this$props3.treeData,
          idKey = _this$props3.idKey;

      var selectedId = _this.state.selectedKeys[0];

      var action = {
        type: TREE_ACTIONS.ADD_CHILDREN,
        data: gridData.filter(function (i) {
          return selectedGridItems.includes(i.get(idKey));
        }).toJS()
      };
      var newItems = _this.getUpdatedTree(selectedId, treeData, action);
      var newGridItems = gridData.filter(function (item) {
        return !selectedGridItems.includes(item.get(idKey));
      });

      _this.expandParent(selectedId, true);
      _this.setDataToGrid(newGridItems, true);
      if (onChange) onChange(newItems);
    };

    _this.onInputChange = function (value) {
      var _this$props4 = _this.props,
          treeData = _this$props4.treeData,
          onChange = _this$props4.onChange;

      var action = {
        type: TREE_ACTIONS.RENAME_PARENT,
        data: value
      };
      var newItems = _this.getUpdatedTree(_this.state.selectedKeys[0], treeData, action);
      if (onChange) onChange(newItems);
    };

    _this.onExpand = function (ids) {
      _this.setState({
        expandedKeys: ids
      });
    };

    _this.onExpandAll = function () {
      var newExpandedItems = _this.isAllExpanded() ? [] : _this.getAllParentIds();
      _this.setState({ expandedKeys: newExpandedItems });
    };

    _this.getUpdatedTree = function (id) {
      var array = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.props.treeData;
      var action = arguments[2];

      var found = false;
      var _this$props5 = _this.props,
          idKey = _this$props5.idKey,
          childKey = _this$props5.childKey,
          valueKey = _this$props5.valueKey;

      var newItems = array.slice();
      var removeActions = [TREE_ACTIONS.MOVE_LEAF, TREE_ACTIONS.DELETE_PARENT];

      // If deleted parent item is in the root node
      if (action.type === TREE_ACTIONS.DELETE_PARENT) {
        var rootItem = array.find(function (item) {
          return item[idKey] === id;
        });
        if (rootItem) {
          if (rootItem[childKey].length) {
            _this.setDataToGrid(fromJS(_this.getAllLeafs(rootItem[childKey])));
            _this.deselectItem();
          }
          return newItems.filter(function (item) {
            return item[idKey] !== id;
          });
        }
      }

      for (var i = 0; i < newItems.length; i += 1) {
        var item = newItems[i];
        if (removeActions.includes(action.type) && item[childKey] && !found) {
          found = !!item[childKey].find(function (child) {
            return child[idKey] === id;
          });
          if (found) {
            // When removing an item we must first find its parent and alter its children array
            if (action.type === TREE_ACTIONS.MOVE_LEAF) {
              item[childKey] = item[childKey].filter(function (child) {
                return child[idKey] !== id;
              });
              _this.deselectItem();
            }
            if (action.type === TREE_ACTIONS.DELETE_PARENT) {
              // we must first filter the children, so that we won't get leafs from
              // other child branches
              var filteredChildren = item[childKey].filter(function (childItem) {
                return childItem[idKey] === id;
              });
              _this.setDataToGrid(fromJS(_this.getAllLeafs(filteredChildren)));
              _this.deselectItem();
              item[childKey] = item[childKey].filter(function (childItem) {
                return childItem[idKey] !== id;
              });
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
        if (item[childKey] && !found) found = _this.getUpdatedTree(id, item[childKey], action);
      }

      if (!found) return false;
      return newItems;
    };

    _this.getAllLeafs = function (array) {
      var alreadyFound = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var childKey = _this.props.childKey;

      var leafs = alreadyFound;

      for (var i = 0; i < array.length; i += 1) {
        var item = array[i];
        if (item[childKey]) {
          leafs = _this.getAllLeafs(item[childKey], alreadyFound);
        }
        if (!item[childKey]) leafs.push(item);
      }
      return leafs;
    };

    _this.getTreeItem = function (id) {
      var array = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.props.treeData;
      var returnParent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var parent = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var _this$props6 = _this.props,
          childKey = _this$props6.childKey,
          idKey = _this$props6.idKey;

      var found = array.find(function (item) {
        return item[idKey] === id;
      });

      if (found && returnParent) found = parent;

      if (!found) {
        array.forEach(function (item) {
          if (item[childKey] && !found) {
            found = _this.getTreeItem(id, item[childKey], returnParent, item);
          }
        });
      }
      return found;
    };

    _this.getAdjacentItem = function (id) {
      if (!id) return null;
      var _this$props7 = _this.props,
          childKey = _this$props7.childKey,
          idKey = _this$props7.idKey,
          treeData = _this$props7.treeData;


      var getAdjacentItemId = function getAdjacentItemId(parent) {
        var parentArr = Array.isArray(parent) ? parent : parent[childKey];
        var index = parentArr.findIndex(function (child) {
          return child[idKey] === id;
        });
        var adjacentItem = parentArr[index + 1];
        if (!adjacentItem) adjacentItem = parentArr[index - 1];
        if (!adjacentItem && !Array.isArray(parent)) adjacentItem = parent;
        if (!adjacentItem) return null;

        return adjacentItem[idKey];
      };

      var parent = _this.getTreeItem(id, _this.props.treeData, true);
      return parent ? getAdjacentItemId(parent) : getAdjacentItemId(treeData);
    };

    _this.getAllParentIds = function () {
      var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.props.treeData;
      var _this$props8 = _this.props,
          idKey = _this$props8.idKey,
          childKey = _this$props8.childKey;

      var cb = function cb(acc, item) {
        var total = acc;
        if (item[childKey] && item[childKey].length > 0) {
          total = acc.concat(item[idKey]);
          return item[childKey].reduce(cb, total);
        }
        return total;
      };
      return array.reduce(cb, []);
    };

    _this.setDataToGrid = function (items) {
      var setNewItems = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var data = List();
      var _this$props9 = _this.props,
          grid = _this$props9.grid,
          gridColumns = _this$props9.gridColumns,
          gridData = _this$props9.gridData;

      if (!setNewItems) data = gridData.slice();
      var newGridItems = data.concat(items);

      _this.props.setData(grid, gridColumns, newGridItems);
      _this.props.clearSelectedItems(grid);
    };

    _this.expandParent = function (parentId) {
      if (parentId && !_this.state.expandedKeys.find(function (expandedId) {
        return expandedId === parentId;
      })) {
        var newExpandedKeys = _this.state.expandedKeys.slice();
        newExpandedKeys.push(parentId);
        _this.setState({ expandedKeys: newExpandedKeys });
      }
    };

    _this.closeDeleteConfirmationDialog = function () {
      _this.setState({ showDeleteConfirmation: false });
    };

    _this.deleteParent = function () {
      var _this$props10 = _this.props,
          onChange = _this$props10.onChange,
          treeData = _this$props10.treeData;

      var selectedKey = _this.state.selectedKeys[0];
      var action = {
        type: TREE_ACTIONS.DELETE_PARENT
      };
      var nextSelectedKey = _this.getAdjacentItem(selectedKey);
      var newItems = _this.getUpdatedTree(selectedKey, treeData, action);
      if (onChange) onChange(newItems);
      _this.setState({
        selectedKeys: [nextSelectedKey],
        showDeleteConfirmation: false
      });
    };

    _this.isDragDropLegal = function (items, e) {
      var _this$props11 = _this.props,
          childKey = _this$props11.childKey,
          treeData = _this$props11.treeData,
          onDragDropPrevent = _this$props11.onDragDropPrevent;

      var dropItem = _this.getTreeItem(e.node.props.eventKey);
      var dragItem = _this.getTreeItem(e.dragNode.props.eventKey);
      var dropItemParent = _this.getTreeItem(e.node.props.eventKey, treeData, true);

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
        if (!e.dropToGap && (_this.hasLeafs(dropItem) || !dropItem[childKey]) || dropItemParent && e.dropToGap && _this.hasLeafs(dropItemParent)) {
          if (onDragDropPrevent) onDragDropPrevent();
          return false;
        }
      } else if (dropItem && !e.dropToGap && _this.hasParents(dropItem) || dropItemParent && e.dropToGap && _this.hasParents(dropItemParent) || e.dropToGap && !dropItemParent || !e.dropToGap && !dropItem[childKey]) {
        // Item has got parent as a child - leaf cannot be dropped here
        if (onDragDropPrevent) onDragDropPrevent();
        return false;
      }
      return true;
    };

    _this.isAllExpanded = function () {
      return _this.state.expandedKeys.length === _this.getAllParentIds().length;
    };

    _this.hasLeafs = function (item) {
      var childKey = _this.props.childKey;

      if (!item[childKey]) return false;
      return !!item[childKey].find(function (child) {
        return !child[childKey];
      });
    };

    _this.hasParents = function (item) {
      var childKey = _this.props.childKey;

      if (!item[childKey]) return false;
      return !!item[childKey].find(function (child) {
        return child[childKey];
      });
    };

    _this.deselectItem = function () {
      _this.setState({ selectedKeys: [] });
    };

    var expandedKeys = [];
    if (props.defaultExpandAll && props.treeData) {
      expandedKeys = _this.getAllParentIds(props.treeData);
    }
    _this.state = {
      selectedKeys: [],
      expandedKeys: expandedKeys,
      showDeleteConfirmation: false
    };
    return _this;
  }

  HierarchyTreeSelector.prototype.componentDidMount = function componentDidMount() {
    var defaultExpandAll = this.props.defaultExpandAll;

    if (defaultExpandAll) {
      this.onExpand(this.getAllParentIds());
    }
  };

  /**
   * Selects a tree item
   * @param selectedKeys (array)
   */


  /**
   * Fired on drag n' drop
   * @param items
   */


  /**
   * Displays a confirmation dialog
   */


  /**
   * Adds a new node to the root of the tree, or under a selected tree node using
   * ADD_CHILDREN action
   * @param data - data to be added
   * @param callback
   */


  /**
   * Removes the chosen item from a tree and updates the grid using MOVE_LEAF
   * action
   */


  /**
   * Adds selected grid items to the chosen tree node using ADD_CHILDREN action
   */


  /**
   * Renames the chosen tree node using a RENAME_PARENT action
   * @param value
   */


  /**
   * Fired on expand
   * @param ids
   */


  /**
   * Expand all the items
   */


  /**
   * Returns updated tree items.
   * @param id - target item
   * @param array - array where target item is being searched
   * @param action - action to be performed {type, data}
   * @returns {*}
   */


  /**
   * Returns recursively all leaf items from a given array
   * @param array
   * @param alreadyFound (used recursively)
   */


  /**
   * Returns a tree item by ID
   * @param id
   * @param array
   * @param returnParent - return item's parent instead of the item
   * @param parent - parent item (used recursively)
   * @returns {{}}
   */


  /**
   * Get adjacent item (id) in parent array. Used when moving items from tree
   * to grid/deleting an item
   * @param id
   * @returns {*}
   */


  /**
   * Returns all IDs in the tree
   * @param array
   */


  /**
   * Appends provided items to the grid
   * @param items - immutable array of items to be appended to grid
   * @param setNewItems - set completely a new array of items
   */


  /**
   * Expands a parent
   * @param parentId
   */


  /**
   * Closes delete confirmation dialog
   */


  /**
   * Deletes a parent node
   */


  /**
   * Checks if a move is permitted before calling Tree component's onDragDrop callback
   * @param items
   * @param e
   * @returns {boolean}
   */


  /**
   * Deselects an item, if it is e.g. removed
   */


  HierarchyTreeSelector.prototype.render = function render() {
    var _props = this.props,
        valueKey = _props.valueKey,
        idKey = _props.idKey,
        treeData = _props.treeData,
        grid = _props.grid,
        gridColumns = _props.gridColumns,
        className = _props.className,
        translations = _props.translations;


    var mergedGrid = Object.assign({}, grid, { defaultShowFilteringRow: true });
    var mergedTranslations = Object.assign({}, defaultTranslations, translations);

    return React.createElement(
      React.Fragment,
      null,
      React.createElement(
        Container,
        { className: className },
        React.createElement(
          TreeContainer,
          null,
          React.createElement(ControlBar, _extends({}, this.props, {
            onAddNewClick: this.onAddNewClick,
            onDeleteClick: this.onDeleteClick,
            onInputChange: this.onInputChange,
            onExpandAllClick: this.onExpandAll,
            expandAll: this.isAllExpanded(),
            selectedTreeItem: this.getTreeItem(this.state.selectedKeys[0]),
            height: ACTION_BAR_CONTAINER_HEIGHT,
            translations: mergedTranslations
          })),
          React.createElement(
            PerfectScrollbar,
            null,
            !!treeData.length && React.createElement(TreeComponent, {
              treeData: treeData,
              dataLookUpKey: idKey,
              dataLookUpValue: valueKey,
              onSelect: this.onTreeItemSelect,
              onDragDrop: this.onTreeItemDragDrop,
              onExpand: this.onExpand,
              checkable: false,
              selectedKeys: this.state.selectedKeys,
              expandedKeys: this.state.expandedKeys,
              isDragDropLegal: this.isDragDropLegal,
              selectable: true,
              draggable: true
            }),
            !treeData.length && React.createElement(
              NoItemsText,
              null,
              mergedTranslations.noTreeItems
            )
          )
        ),
        React.createElement(ArrowControls, _extends({}, this.props, {
          selectedTreeItem: this.getTreeItem(this.state.selectedKeys[0]),
          onMoveToTreeClick: this.onMoveToTreeClick,
          onMoveToGridClick: this.onMoveToGridClick
        })),
        React.createElement(Grid, {
          grid: mergedGrid,
          columns: gridColumns,
          rowSelect: true,
          multiSelect: true,
          filtering: true,
          rowSelectCheckboxColumn: true,
          gridHeader: React.createElement(
            Primitive.Subtitle,
            null,
            mergedTranslations.gridTitle
          )
        })
      ),
      this.state.showDeleteConfirmation && React.createElement(ConfirmDialog, {
        titleText: mergedTranslations.deleteConfirmDialog.titleText,
        bodyText: mergedTranslations.deleteConfirmDialog.bodyText,
        okButtonText: mergedTranslations.deleteConfirmDialog.okButtonText,
        cancelButtonText: mergedTranslations.deleteConfirmDialog.cancelButtonText,
        confirmCallback: this.deleteParent,
        cancelCallback: this.closeDeleteConfirmationDialog
      })
    );
  };

  return HierarchyTreeSelector;
}(React.PureComponent), _class2.defaultProps = {
  idKey: 'id',
  valueKey: 'name',
  childKey: 'children',
  treeData: [],
  className: '',
  translations: defaultTranslations,
  id: 'hierarchy-tree',
  onDragDropPrevent: undefined,
  onSelect: undefined,
  onChange: undefined,
  defaultExpandAll: true
}, _temp)) || _class);
export { HierarchyTreeSelector as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlRyZWVDb21wb25lbnQiLCJQZXJmZWN0U2Nyb2xsYmFyIiwiUHJpbWl0aXZlIiwiRGF0YWdyaWQiLCJncmlkU2hhcGUiLCJncmlkQ29sdW1uU2hhcGUiLCJEYXRhZ3JpZEFjdGlvbnMiLCJDb25maXJtRGlhbG9nIiwiUmVhY3QiLCJzdHlsZWQiLCJMaXN0IiwiZnJvbUpTIiwiSW1tdXRhYmxlUHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwiY29ubmVjdCIsIkNvbnRyb2xCYXIiLCJBcnJvd0NvbnRyb2xzIiwiZGVmYXVsdFRyYW5zbGF0aW9ucyIsIkFDVElPTl9CQVJfQ09OVEFJTkVSX0hFSUdIVCIsIlRSRUVfQUNUSU9OUyIsIkFERF9DSElMRFJFTiIsIk1PVkVfTEVBRiIsIlJFTkFNRV9QQVJFTlQiLCJERUxFVEVfUEFSRU5UIiwiR3JpZCIsInByb3BzIiwidGhlbWUiLCJjb2xvcnMiLCJjb2xvckxpZ2h0R3JheSIsIkNvbnRhaW5lciIsImRpdiIsIlRyZWVDb250YWluZXIiLCJndXR0ZXJXaWR0aCIsIk5vSXRlbXNUZXh0IiwicCIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsInNldERhdGEiLCJjbGVhclNlbGVjdGVkSXRlbXMiLCJtYXBTdGF0ZVRvUHJvcHMiLCJzdGF0ZSIsImdyaWRJZCIsImdyaWQiLCJpZCIsInNlbGVjdGVkR3JpZEl0ZW1zIiwiZGF0YWdyaWQiLCJnZXRJbiIsImdyaWREYXRhIiwiSGllcmFyY2h5VHJlZVNlbGVjdG9yIiwib25UcmVlSXRlbVNlbGVjdCIsInNlbGVjdGVkS2V5cyIsIm9uU2VsZWN0Iiwic2V0U3RhdGUiLCJvblRyZWVJdGVtRHJhZ0Ryb3AiLCJpdGVtcyIsIm9uQ2hhbmdlIiwib25EZWxldGVDbGljayIsInNob3dEZWxldGVDb25maXJtYXRpb24iLCJvbkFkZE5ld0NsaWNrIiwiZGF0YSIsImNhbGxiYWNrIiwidHJlZURhdGEiLCJpZEtleSIsIm5ld0l0ZW1zIiwic2xpY2UiLCJwdXNoIiwiYWN0aW9uIiwidHlwZSIsImdldFVwZGF0ZWRUcmVlIiwicGFyZW50IiwiZ2V0VHJlZUl0ZW0iLCJleHBhbmRQYXJlbnQiLCJvbk1vdmVUb0dyaWRDbGljayIsInNlbGVjdGVkS2V5IiwibmV4dFNlbGVjdGVkS2V5IiwiZ2V0QWRqYWNlbnRJdGVtIiwibmV3R3JpZEl0ZW1zIiwic2V0RGF0YVRvR3JpZCIsIm9uTW92ZVRvVHJlZUNsaWNrIiwic2VsZWN0ZWRJZCIsImZpbHRlciIsImluY2x1ZGVzIiwiaSIsImdldCIsInRvSlMiLCJpdGVtIiwib25JbnB1dENoYW5nZSIsInZhbHVlIiwib25FeHBhbmQiLCJpZHMiLCJleHBhbmRlZEtleXMiLCJvbkV4cGFuZEFsbCIsIm5ld0V4cGFuZGVkSXRlbXMiLCJpc0FsbEV4cGFuZGVkIiwiZ2V0QWxsUGFyZW50SWRzIiwiYXJyYXkiLCJmb3VuZCIsImNoaWxkS2V5IiwidmFsdWVLZXkiLCJyZW1vdmVBY3Rpb25zIiwicm9vdEl0ZW0iLCJmaW5kIiwibGVuZ3RoIiwiZ2V0QWxsTGVhZnMiLCJkZXNlbGVjdEl0ZW0iLCJjaGlsZCIsImZpbHRlcmVkQ2hpbGRyZW4iLCJjaGlsZEl0ZW0iLCJjb25jYXQiLCJUeXBlRXJyb3IiLCJhbHJlYWR5Rm91bmQiLCJsZWFmcyIsInJldHVyblBhcmVudCIsImZvckVhY2giLCJnZXRBZGphY2VudEl0ZW1JZCIsInBhcmVudEFyciIsIkFycmF5IiwiaXNBcnJheSIsImluZGV4IiwiZmluZEluZGV4IiwiYWRqYWNlbnRJdGVtIiwiY2IiLCJhY2MiLCJ0b3RhbCIsInJlZHVjZSIsInNldE5ld0l0ZW1zIiwiZ3JpZENvbHVtbnMiLCJwYXJlbnRJZCIsImV4cGFuZGVkSWQiLCJuZXdFeHBhbmRlZEtleXMiLCJjbG9zZURlbGV0ZUNvbmZpcm1hdGlvbkRpYWxvZyIsImRlbGV0ZVBhcmVudCIsImlzRHJhZ0Ryb3BMZWdhbCIsImUiLCJvbkRyYWdEcm9wUHJldmVudCIsImRyb3BJdGVtIiwibm9kZSIsImV2ZW50S2V5IiwiZHJhZ0l0ZW0iLCJkcmFnTm9kZSIsImRyb3BJdGVtUGFyZW50IiwiZHJvcFRvR2FwIiwiaGFzTGVhZnMiLCJoYXNQYXJlbnRzIiwiZGVmYXVsdEV4cGFuZEFsbCIsImNvbXBvbmVudERpZE1vdW50IiwicmVuZGVyIiwiY2xhc3NOYW1lIiwidHJhbnNsYXRpb25zIiwibWVyZ2VkR3JpZCIsIk9iamVjdCIsImFzc2lnbiIsImRlZmF1bHRTaG93RmlsdGVyaW5nUm93IiwibWVyZ2VkVHJhbnNsYXRpb25zIiwibm9UcmVlSXRlbXMiLCJncmlkVGl0bGUiLCJkZWxldGVDb25maXJtRGlhbG9nIiwidGl0bGVUZXh0IiwiYm9keVRleHQiLCJva0J1dHRvblRleHQiLCJjYW5jZWxCdXR0b25UZXh0IiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyIsInVuZGVmaW5lZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPQSxhQUFQLE1BQTBCLDRCQUExQjtBQUNBLE9BQU9DLGdCQUFQLE1BQTZCLHFDQUE3QjtBQUNBLFNBQVNDLFNBQVQsUUFBMEIsa0NBQTFCO0FBQ0EsU0FBU0MsUUFBVCxFQUFtQkMsU0FBbkIsRUFBOEJDLGVBQTlCLEVBQStDQyxlQUEvQyxRQUFzRSx3QkFBdEU7QUFDQSxTQUFTQyxhQUFULFFBQThCLHVDQUE5Qjs7QUFFQSxPQUFPQyxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsTUFBUCxNQUFtQixtQkFBbkI7QUFDQSxTQUFTQyxJQUFULEVBQWVDLE1BQWYsUUFBNkIsV0FBN0I7QUFDQSxPQUFPQyxrQkFBUCxNQUErQiwyQkFBL0I7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsU0FBU0MsT0FBVCxRQUF3QixhQUF4Qjs7QUFHQTtBQUNBLE9BQU9DLFVBQVAsTUFBdUIsaURBQXZCO0FBQ0EsT0FBT0MsYUFBUCxNQUEwQixvREFBMUI7QUFDQSxTQUFTQyxtQkFBVCxRQUFvQyx3QkFBcEM7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QUFXLEVBTFM7QUFNcEJDLGdCQUFjbEksbUJBTk07QUFPcEJ5QixNQUFJLGdCQVBnQjtBQVFwQjJGLHFCQUFtQjZCLFNBUkM7QUFTcEJoSCxZQUFVZ0gsU0FUVTtBQVVwQjVHLFlBQVU0RyxTQVZVO0FBV3BCbkIsb0JBQWtCO0FBWEUsQztTQXZCSGhHLHFCIiwiZmlsZSI6ImhpZXJhcmNoeS10cmVlLXNlbGVjdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUcmVlQ29tcG9uZW50IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LXRyZWV2aWV3JztcbmltcG9ydCBQZXJmZWN0U2Nyb2xsYmFyIGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LXBlcmZlY3Qtc2Nyb2xsYmFyJztcbmltcG9ydCB7IFByaW1pdGl2ZSB9IGZyb20gJ0BvcHVzY2FwaXRhL29jLWNtLWNvbW1vbi1sYXlvdXRzJztcbmltcG9ydCB7IERhdGFncmlkLCBncmlkU2hhcGUsIGdyaWRDb2x1bW5TaGFwZSwgRGF0YWdyaWRBY3Rpb25zIH0gZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtZ3JpZCc7XG5pbXBvcnQgeyBDb25maXJtRGlhbG9nIH0gZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtY29uZmlybWF0aW9uLWRpYWxvZyc7XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCB7IExpc3QsIGZyb21KUyB9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgSW1tdXRhYmxlUHJvcFR5cGVzIGZyb20gJ3JlYWN0LWltbXV0YWJsZS1wcm9wdHlwZXMnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cblxuLy8gQXBwIGltcG9ydHNcbmltcG9ydCBDb250cm9sQmFyIGZyb20gJy4vaGllcmFyY2h5LXRyZWUtc2VsZWN0b3ItY29udHJvbC1iYXIuY29tcG9uZW50JztcbmltcG9ydCBBcnJvd0NvbnRyb2xzIGZyb20gJy4vaGllcmFyY2h5LXRyZWUtc2VsZWN0b3ItYXJyb3ctY29udHJvbHMuY29tcG9uZW50JztcbmltcG9ydCB7IGRlZmF1bHRUcmFuc2xhdGlvbnMgfSBmcm9tICcuL2hpZXJhcmNoeS10cmVlLnV0aWxzJztcblxuY29uc3QgQUNUSU9OX0JBUl9DT05UQUlORVJfSEVJR0hUID0gJzU3cHgnO1xuY29uc3QgVFJFRV9BQ1RJT05TID0ge1xuICBBRERfQ0hJTERSRU46ICdBRERfQ0hJTERSRU4nLFxuICBNT1ZFX0xFQUY6ICdNT1ZFX0xFQUYnLFxuICBSRU5BTUVfUEFSRU5UOiAnUkVOQU1FX1BBUkVOVCcsXG4gIERFTEVURV9QQVJFTlQ6ICdERUxFVEVfUEFSRU5UJyxcbn07XG5cbmNvbnN0IEdyaWQgPSBzdHlsZWQoRGF0YWdyaWQpYFxuICBoZWlnaHQ6IDEwMCU7XG4gICYmJiB7XG4gICAgcGFkZGluZzogMDtcbiAgfVxuICAub2MtZGF0YWdyaWQtbWFpbi1jb250YWluZXIge1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuY29sb3JzLmNvbG9yTGlnaHRHcmF5fTtcbiAgICBib3JkZXItdG9wOm5vbmU7XG4gIH1cbmA7XG5cbmNvbnN0IENvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIG1pbi1oZWlnaHQ6IDMwMHB4O1xuICA+IGRpdiB7XG4gICAgd2lkdGg6IDUwJTtcbiAgICBmbGV4OiAxIDEgMTAwJTtcbiAgfVxuYDtcblxuY29uc3QgVHJlZUNvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gIGhlaWdodDoxMDAlO1xuICAub2Mtc2Nyb2xsYmFyLWNvbnRhaW5lciB7XG4gICAgYm9yZGVyOiAxcHggc29saWQgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5jb2xvcnMuY29sb3JMaWdodEdyYXl9O1xuICAgIGhlaWdodDogY2FsYygxMDAlIC0gJHtBQ1RJT05fQkFSX0NPTlRBSU5FUl9IRUlHSFR9KTtcbiAgICBwYWRkaW5nOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmd1dHRlcldpZHRofTtcbiAgfVxuICAub2MtcmVhY3QtdHJlZSB7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIC5yYy10cmVlLWljb25FbGUucmMtdHJlZS1pY29uX19jdXN0b21pemUge1xuICAgICAgICBkaXNwbGF5Om5vbmU7XG4gICAgfVxuICB9XG5gO1xuXG5jb25zdCBOb0l0ZW1zVGV4dCA9IHN0eWxlZC5wYFxuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG5gO1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSB7XG4gIHNldERhdGE6IERhdGFncmlkQWN0aW9ucy5zZXREYXRhLFxuICBjbGVhclNlbGVjdGVkSXRlbXM6IERhdGFncmlkQWN0aW9ucy5jbGVhclNlbGVjdGVkSXRlbXMsXG59O1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUsIHByb3BzKSA9PiB7XG4gIGNvbnN0IGdyaWRJZCA9IHByb3BzLmdyaWQuaWQ7XG4gIHJldHVybiB7XG4gICAgc2VsZWN0ZWRHcmlkSXRlbXM6IHN0YXRlLmRhdGFncmlkLmdldEluKFtncmlkSWQsICdzZWxlY3RlZEl0ZW1zJ10sIExpc3QoKSksXG4gICAgZ3JpZERhdGE6IHN0YXRlLmRhdGFncmlkLmdldEluKFtncmlkSWQsICdhbGxEYXRhJ10sIExpc3QoKSksXG4gIH07XG59O1xuXG5AY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcylcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhpZXJhcmNoeVRyZWVTZWxlY3RvciBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGlkS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHZhbHVlS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNoaWxkS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHRyZWVEYXRhOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc2hhcGUoe30pKSxcbiAgICBncmlkOiBncmlkU2hhcGUuaXNSZXF1aXJlZCxcbiAgICBncmlkQ29sdW1uczogUHJvcFR5cGVzLmFycmF5T2YoZ3JpZENvbHVtblNoYXBlKS5pc1JlcXVpcmVkLFxuICAgIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBzZXREYXRhOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGNsZWFyU2VsZWN0ZWRJdGVtczogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBzZWxlY3RlZEdyaWRJdGVtczogSW1tdXRhYmxlUHJvcFR5cGVzLmxpc3QuaXNSZXF1aXJlZCxcbiAgICBncmlkRGF0YTogSW1tdXRhYmxlUHJvcFR5cGVzLmxpc3QuaXNSZXF1aXJlZCxcbiAgICB0cmFuc2xhdGlvbnM6IFByb3BUeXBlcy5zaGFwZSh7fSksXG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGVmYXVsdEV4cGFuZEFsbDogUHJvcFR5cGVzLmJvb2wsXG5cbiAgICAvLyBDYWxsYmFja3NcbiAgICBvbkRyYWdEcm9wUHJldmVudDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGlkS2V5OiAnaWQnLFxuICAgIHZhbHVlS2V5OiAnbmFtZScsXG4gICAgY2hpbGRLZXk6ICdjaGlsZHJlbicsXG4gICAgdHJlZURhdGE6IFtdLFxuICAgIGNsYXNzTmFtZTogJycsXG4gICAgdHJhbnNsYXRpb25zOiBkZWZhdWx0VHJhbnNsYXRpb25zLFxuICAgIGlkOiAnaGllcmFyY2h5LXRyZWUnLFxuICAgIG9uRHJhZ0Ryb3BQcmV2ZW50OiB1bmRlZmluZWQsXG4gICAgb25TZWxlY3Q6IHVuZGVmaW5lZCxcbiAgICBvbkNoYW5nZTogdW5kZWZpbmVkLFxuICAgIGRlZmF1bHRFeHBhbmRBbGw6IHRydWUsXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICBsZXQgZXhwYW5kZWRLZXlzID0gW107XG4gICAgaWYgKHByb3BzLmRlZmF1bHRFeHBhbmRBbGwgJiYgcHJvcHMudHJlZURhdGEpIHtcbiAgICAgIGV4cGFuZGVkS2V5cyA9IHRoaXMuZ2V0QWxsUGFyZW50SWRzKHByb3BzLnRyZWVEYXRhKTtcbiAgICB9XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHNlbGVjdGVkS2V5czogW10sXG4gICAgICBleHBhbmRlZEtleXMsXG4gICAgICBzaG93RGVsZXRlQ29uZmlybWF0aW9uOiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgY29uc3QgeyBkZWZhdWx0RXhwYW5kQWxsIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChkZWZhdWx0RXhwYW5kQWxsKSB7XG4gICAgICB0aGlzLm9uRXhwYW5kKHRoaXMuZ2V0QWxsUGFyZW50SWRzKCkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3RzIGEgdHJlZSBpdGVtXG4gICAqIEBwYXJhbSBzZWxlY3RlZEtleXMgKGFycmF5KVxuICAgKi9cbiAgb25UcmVlSXRlbVNlbGVjdCA9IChzZWxlY3RlZEtleXMpID0+IHtcbiAgICBjb25zdCB7IG9uU2VsZWN0IH0gPSB0aGlzLnByb3BzO1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZEtleXMgfSwgKCkgPT4ge1xuICAgICAgaWYgKG9uU2VsZWN0KSBvblNlbGVjdChzZWxlY3RlZEtleXMpO1xuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBGaXJlZCBvbiBkcmFnIG4nIGRyb3BcbiAgICogQHBhcmFtIGl0ZW1zXG4gICAqL1xuICBvblRyZWVJdGVtRHJhZ0Ryb3AgPSAoaXRlbXMpID0+IHtcbiAgICBjb25zdCB7IG9uQ2hhbmdlIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChvbkNoYW5nZSkgb25DaGFuZ2UoaXRlbXMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBEaXNwbGF5cyBhIGNvbmZpcm1hdGlvbiBkaWFsb2dcbiAgICovXG4gIG9uRGVsZXRlQ2xpY2sgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNob3dEZWxldGVDb25maXJtYXRpb246IHRydWUgfSk7XG4gIH07XG5cblxuICAvKipcbiAgICogQWRkcyBhIG5ldyBub2RlIHRvIHRoZSByb290IG9mIHRoZSB0cmVlLCBvciB1bmRlciBhIHNlbGVjdGVkIHRyZWUgbm9kZSB1c2luZ1xuICAgKiBBRERfQ0hJTERSRU4gYWN0aW9uXG4gICAqIEBwYXJhbSBkYXRhIC0gZGF0YSB0byBiZSBhZGRlZFxuICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICovXG4gIG9uQWRkTmV3Q2xpY2sgPSAoZGF0YSwgY2FsbGJhY2spID0+IHtcbiAgICBjb25zdCB7IG9uQ2hhbmdlLCB0cmVlRGF0YSwgaWRLZXkgfSA9IHRoaXMucHJvcHM7XG4gICAgbGV0IG5ld0l0ZW1zID0gdHJlZURhdGEuc2xpY2UoKTtcblxuICAgIC8vIElmIG5vIHRyZWUgbm9kZSBpcyBzZWxlY3RlZCwgd2UnbGwgcGxhY2UgdGhlIG5ldyBpdGVtIHRvIHRoZSByb290XG4gICAgLy8gb2YgdGhlIHRyZWVcbiAgICBpZiAoIXRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdKSB7XG4gICAgICBuZXdJdGVtcy5wdXNoKGRhdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBhY3Rpb24gPSB7XG4gICAgICAgIHR5cGU6IFRSRUVfQUNUSU9OUy5BRERfQ0hJTERSRU4sXG4gICAgICAgIGRhdGEsXG4gICAgICB9O1xuICAgICAgbmV3SXRlbXMgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdLCB0cmVlRGF0YSwgYWN0aW9uKTtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkS2V5czogW2RhdGFbaWRLZXldXSB9LCAoKSA9PiB7XG4gICAgICAvLyBJZiB0aGUgcGFyZW50IGlzIG5vdCB5ZXQgZXhwYW5kZWQsIHdlIHdpbGwgZXhwYW5kIGl0IG5vd1xuICAgICAgY29uc3QgcGFyZW50ID0gdGhpcy5nZXRUcmVlSXRlbShkYXRhW2lkS2V5XSwgdHJlZURhdGEsIHRydWUpIHx8IHt9O1xuICAgICAgdGhpcy5leHBhbmRQYXJlbnQocGFyZW50W2lkS2V5XSk7XG5cbiAgICAgIGlmIChvbkNoYW5nZSkgb25DaGFuZ2UobmV3SXRlbXMpO1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogUmVtb3ZlcyB0aGUgY2hvc2VuIGl0ZW0gZnJvbSBhIHRyZWUgYW5kIHVwZGF0ZXMgdGhlIGdyaWQgdXNpbmcgTU9WRV9MRUFGXG4gICAqIGFjdGlvblxuICAgKi9cbiAgb25Nb3ZlVG9HcmlkQ2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3QgeyB0cmVlRGF0YSwgb25DaGFuZ2UgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgc2VsZWN0ZWRLZXkgPSB0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXTtcbiAgICBjb25zdCBhY3Rpb24gPSB7XG4gICAgICB0eXBlOiBUUkVFX0FDVElPTlMuTU9WRV9MRUFGLFxuICAgICAgZGF0YTogdGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF0sXG4gICAgfTtcbiAgICBjb25zdCBuZXh0U2VsZWN0ZWRLZXkgPSB0aGlzLmdldEFkamFjZW50SXRlbShzZWxlY3RlZEtleSk7XG4gICAgY29uc3QgbmV3R3JpZEl0ZW1zID0gZnJvbUpTKFt0aGlzLmdldFRyZWVJdGVtKHNlbGVjdGVkS2V5KV0pO1xuICAgIGNvbnN0IG5ld0l0ZW1zID0gdGhpcy5nZXRVcGRhdGVkVHJlZShzZWxlY3RlZEtleSwgdHJlZURhdGEsIGFjdGlvbik7XG5cbiAgICB0aGlzLnNldERhdGFUb0dyaWQobmV3R3JpZEl0ZW1zKTtcbiAgICBpZiAob25DaGFuZ2UpIG9uQ2hhbmdlKG5ld0l0ZW1zKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNlbGVjdGVkS2V5czogW25leHRTZWxlY3RlZEtleV0sXG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEFkZHMgc2VsZWN0ZWQgZ3JpZCBpdGVtcyB0byB0aGUgY2hvc2VuIHRyZWUgbm9kZSB1c2luZyBBRERfQ0hJTERSRU4gYWN0aW9uXG4gICAqL1xuICBvbk1vdmVUb1RyZWVDbGljayA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBvbkNoYW5nZSwgc2VsZWN0ZWRHcmlkSXRlbXMsIGdyaWREYXRhLCB0cmVlRGF0YSwgaWRLZXksXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgc2VsZWN0ZWRJZCA9IHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdO1xuXG4gICAgY29uc3QgYWN0aW9uID0ge1xuICAgICAgdHlwZTogVFJFRV9BQ1RJT05TLkFERF9DSElMRFJFTixcbiAgICAgIGRhdGE6IGdyaWREYXRhXG4gICAgICAgIC5maWx0ZXIoaSA9PiBzZWxlY3RlZEdyaWRJdGVtcy5pbmNsdWRlcyhpLmdldChpZEtleSkpKVxuICAgICAgICAudG9KUygpLFxuICAgIH07XG4gICAgY29uc3QgbmV3SXRlbXMgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKHNlbGVjdGVkSWQsIHRyZWVEYXRhLCBhY3Rpb24pO1xuICAgIGNvbnN0IG5ld0dyaWRJdGVtcyA9IGdyaWREYXRhLmZpbHRlcihpdGVtID0+ICFzZWxlY3RlZEdyaWRJdGVtcy5pbmNsdWRlcyhpdGVtLmdldChpZEtleSkpKTtcblxuICAgIHRoaXMuZXhwYW5kUGFyZW50KHNlbGVjdGVkSWQsIHRydWUpO1xuICAgIHRoaXMuc2V0RGF0YVRvR3JpZChuZXdHcmlkSXRlbXMsIHRydWUpO1xuICAgIGlmIChvbkNoYW5nZSkgb25DaGFuZ2UobmV3SXRlbXMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZW5hbWVzIHRoZSBjaG9zZW4gdHJlZSBub2RlIHVzaW5nIGEgUkVOQU1FX1BBUkVOVCBhY3Rpb25cbiAgICogQHBhcmFtIHZhbHVlXG4gICAqL1xuICBvbklucHV0Q2hhbmdlID0gKHZhbHVlKSA9PiB7XG4gICAgY29uc3QgeyB0cmVlRGF0YSwgb25DaGFuZ2UgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgYWN0aW9uID0ge1xuICAgICAgdHlwZTogVFJFRV9BQ1RJT05TLlJFTkFNRV9QQVJFTlQsXG4gICAgICBkYXRhOiB2YWx1ZSxcbiAgICB9O1xuICAgIGNvbnN0IG5ld0l0ZW1zID0gdGhpcy5nZXRVcGRhdGVkVHJlZSh0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXSwgdHJlZURhdGEsIGFjdGlvbik7XG4gICAgaWYgKG9uQ2hhbmdlKSBvbkNoYW5nZShuZXdJdGVtcyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEZpcmVkIG9uIGV4cGFuZFxuICAgKiBAcGFyYW0gaWRzXG4gICAqL1xuICBvbkV4cGFuZCA9IChpZHMpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGV4cGFuZGVkS2V5czogaWRzLFxuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBFeHBhbmQgYWxsIHRoZSBpdGVtc1xuICAgKi9cbiAgb25FeHBhbmRBbGwgPSAoKSA9PiB7XG4gICAgY29uc3QgbmV3RXhwYW5kZWRJdGVtcyA9IHRoaXMuaXNBbGxFeHBhbmRlZCgpID8gW10gOiB0aGlzLmdldEFsbFBhcmVudElkcygpO1xuICAgIHRoaXMuc2V0U3RhdGUoeyBleHBhbmRlZEtleXM6IG5ld0V4cGFuZGVkSXRlbXMgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdXBkYXRlZCB0cmVlIGl0ZW1zLlxuICAgKiBAcGFyYW0gaWQgLSB0YXJnZXQgaXRlbVxuICAgKiBAcGFyYW0gYXJyYXkgLSBhcnJheSB3aGVyZSB0YXJnZXQgaXRlbSBpcyBiZWluZyBzZWFyY2hlZFxuICAgKiBAcGFyYW0gYWN0aW9uIC0gYWN0aW9uIHRvIGJlIHBlcmZvcm1lZCB7dHlwZSwgZGF0YX1cbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBnZXRVcGRhdGVkVHJlZSA9IChpZCwgYXJyYXkgPSB0aGlzLnByb3BzLnRyZWVEYXRhLCBhY3Rpb24pID0+IHtcbiAgICBsZXQgZm91bmQgPSBmYWxzZTtcbiAgICBjb25zdCB7IGlkS2V5LCBjaGlsZEtleSwgdmFsdWVLZXkgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgbmV3SXRlbXMgPSBhcnJheS5zbGljZSgpO1xuICAgIGNvbnN0IHJlbW92ZUFjdGlvbnMgPSBbVFJFRV9BQ1RJT05TLk1PVkVfTEVBRiwgVFJFRV9BQ1RJT05TLkRFTEVURV9QQVJFTlRdO1xuXG4gICAgLy8gSWYgZGVsZXRlZCBwYXJlbnQgaXRlbSBpcyBpbiB0aGUgcm9vdCBub2RlXG4gICAgaWYgKGFjdGlvbi50eXBlID09PSBUUkVFX0FDVElPTlMuREVMRVRFX1BBUkVOVCkge1xuICAgICAgY29uc3Qgcm9vdEl0ZW0gPSBhcnJheS5maW5kKGl0ZW0gPT4gaXRlbVtpZEtleV0gPT09IGlkKTtcbiAgICAgIGlmIChyb290SXRlbSkge1xuICAgICAgICBpZiAocm9vdEl0ZW1bY2hpbGRLZXldLmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuc2V0RGF0YVRvR3JpZChmcm9tSlModGhpcy5nZXRBbGxMZWFmcyhyb290SXRlbVtjaGlsZEtleV0pKSk7XG4gICAgICAgICAgdGhpcy5kZXNlbGVjdEl0ZW0oKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3SXRlbXMuZmlsdGVyKGl0ZW0gPT4gaXRlbVtpZEtleV0gIT09IGlkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5ld0l0ZW1zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBpdGVtID0gbmV3SXRlbXNbaV07XG4gICAgICBpZiAocmVtb3ZlQWN0aW9ucy5pbmNsdWRlcyhhY3Rpb24udHlwZSkgJiYgaXRlbVtjaGlsZEtleV0gJiYgIWZvdW5kKSB7XG4gICAgICAgIGZvdW5kID0gISFpdGVtW2NoaWxkS2V5XS5maW5kKGNoaWxkID0+IGNoaWxkW2lkS2V5XSA9PT0gaWQpO1xuICAgICAgICBpZiAoZm91bmQpIHtcbiAgICAgICAgICAvLyBXaGVuIHJlbW92aW5nIGFuIGl0ZW0gd2UgbXVzdCBmaXJzdCBmaW5kIGl0cyBwYXJlbnQgYW5kIGFsdGVyIGl0cyBjaGlsZHJlbiBhcnJheVxuICAgICAgICAgIGlmIChhY3Rpb24udHlwZSA9PT0gVFJFRV9BQ1RJT05TLk1PVkVfTEVBRikge1xuICAgICAgICAgICAgaXRlbVtjaGlsZEtleV0gPSBpdGVtW2NoaWxkS2V5XS5maWx0ZXIoY2hpbGQgPT4gY2hpbGRbaWRLZXldICE9PSBpZCk7XG4gICAgICAgICAgICB0aGlzLmRlc2VsZWN0SXRlbSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYWN0aW9uLnR5cGUgPT09IFRSRUVfQUNUSU9OUy5ERUxFVEVfUEFSRU5UKSB7XG4gICAgICAgICAgICAvLyB3ZSBtdXN0IGZpcnN0IGZpbHRlciB0aGUgY2hpbGRyZW4sIHNvIHRoYXQgd2Ugd29uJ3QgZ2V0IGxlYWZzIGZyb21cbiAgICAgICAgICAgIC8vIG90aGVyIGNoaWxkIGJyYW5jaGVzXG4gICAgICAgICAgICBjb25zdCBmaWx0ZXJlZENoaWxkcmVuID0gaXRlbVtjaGlsZEtleV0uZmlsdGVyKGNoaWxkSXRlbSA9PiBjaGlsZEl0ZW1baWRLZXldID09PSBpZCk7XG4gICAgICAgICAgICB0aGlzLnNldERhdGFUb0dyaWQoZnJvbUpTKHRoaXMuZ2V0QWxsTGVhZnMoZmlsdGVyZWRDaGlsZHJlbikpKTtcbiAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RJdGVtKCk7XG4gICAgICAgICAgICBpdGVtW2NoaWxkS2V5XSA9IGl0ZW1bY2hpbGRLZXldLmZpbHRlcihjaGlsZEl0ZW0gPT4gY2hpbGRJdGVtW2lkS2V5XSAhPT0gaWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVtpZEtleV0gPT09IGlkICYmICFmb3VuZCkge1xuICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgICBjYXNlIFRSRUVfQUNUSU9OUy5BRERfQ0hJTERSRU46XG4gICAgICAgICAgICBpdGVtW2NoaWxkS2V5XSA9IChpdGVtW2NoaWxkS2V5XSB8fCBbXSkuY29uY2F0KGFjdGlvbi5kYXRhKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgVFJFRV9BQ1RJT05TLlJFTkFNRV9QQVJFTlQ6XG4gICAgICAgICAgICBpdGVtW3ZhbHVlS2V5XSA9IGFjdGlvbi5kYXRhO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FjdGlvbiB0eXBlIGlzIHVuZGVmaW5lZCcpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bY2hpbGRLZXldICYmICFmb3VuZCkgZm91bmQgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKGlkLCBpdGVtW2NoaWxkS2V5XSwgYWN0aW9uKTtcbiAgICB9XG5cbiAgICBpZiAoIWZvdW5kKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIG5ld0l0ZW1zO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHJlY3Vyc2l2ZWx5IGFsbCBsZWFmIGl0ZW1zIGZyb20gYSBnaXZlbiBhcnJheVxuICAgKiBAcGFyYW0gYXJyYXlcbiAgICogQHBhcmFtIGFscmVhZHlGb3VuZCAodXNlZCByZWN1cnNpdmVseSlcbiAgICovXG4gIGdldEFsbExlYWZzID0gKGFycmF5LCBhbHJlYWR5Rm91bmQgPSBbXSkgPT4ge1xuICAgIGNvbnN0IHsgY2hpbGRLZXkgfSA9IHRoaXMucHJvcHM7XG4gICAgbGV0IGxlYWZzID0gYWxyZWFkeUZvdW5kO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3QgaXRlbSA9IGFycmF5W2ldO1xuICAgICAgaWYgKGl0ZW1bY2hpbGRLZXldKSB7XG4gICAgICAgIGxlYWZzID0gdGhpcy5nZXRBbGxMZWFmcyhpdGVtW2NoaWxkS2V5XSwgYWxyZWFkeUZvdW5kKTtcbiAgICAgIH1cbiAgICAgIGlmICghaXRlbVtjaGlsZEtleV0pIGxlYWZzLnB1c2goaXRlbSk7XG4gICAgfVxuICAgIHJldHVybiBsZWFmcztcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyBhIHRyZWUgaXRlbSBieSBJRFxuICAgKiBAcGFyYW0gaWRcbiAgICogQHBhcmFtIGFycmF5XG4gICAqIEBwYXJhbSByZXR1cm5QYXJlbnQgLSByZXR1cm4gaXRlbSdzIHBhcmVudCBpbnN0ZWFkIG9mIHRoZSBpdGVtXG4gICAqIEBwYXJhbSBwYXJlbnQgLSBwYXJlbnQgaXRlbSAodXNlZCByZWN1cnNpdmVseSlcbiAgICogQHJldHVybnMge3t9fVxuICAgKi9cbiAgZ2V0VHJlZUl0ZW0gPSAoaWQsIGFycmF5ID0gdGhpcy5wcm9wcy50cmVlRGF0YSwgcmV0dXJuUGFyZW50ID0gZmFsc2UsIHBhcmVudCA9IG51bGwpID0+IHtcbiAgICBjb25zdCB7IGNoaWxkS2V5LCBpZEtleSB9ID0gdGhpcy5wcm9wcztcbiAgICBsZXQgZm91bmQgPSBhcnJheS5maW5kKGl0ZW0gPT4gaXRlbVtpZEtleV0gPT09IGlkKTtcblxuICAgIGlmIChmb3VuZCAmJiByZXR1cm5QYXJlbnQpIGZvdW5kID0gcGFyZW50O1xuXG4gICAgaWYgKCFmb3VuZCkge1xuICAgICAgYXJyYXkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBpZiAoaXRlbVtjaGlsZEtleV0gJiYgIWZvdW5kKSB7XG4gICAgICAgICAgZm91bmQgPSB0aGlzLmdldFRyZWVJdGVtKGlkLCBpdGVtW2NoaWxkS2V5XSwgcmV0dXJuUGFyZW50LCBpdGVtKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBmb3VuZDtcbiAgfTtcblxuICAvKipcbiAgICogR2V0IGFkamFjZW50IGl0ZW0gKGlkKSBpbiBwYXJlbnQgYXJyYXkuIFVzZWQgd2hlbiBtb3ZpbmcgaXRlbXMgZnJvbSB0cmVlXG4gICAqIHRvIGdyaWQvZGVsZXRpbmcgYW4gaXRlbVxuICAgKiBAcGFyYW0gaWRcbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBnZXRBZGphY2VudEl0ZW0gPSAoaWQpID0+IHtcbiAgICBpZiAoIWlkKSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCB7IGNoaWxkS2V5LCBpZEtleSwgdHJlZURhdGEgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBnZXRBZGphY2VudEl0ZW1JZCA9IChwYXJlbnQpID0+IHtcbiAgICAgIGNvbnN0IHBhcmVudEFyciA9IEFycmF5LmlzQXJyYXkocGFyZW50KSA/IHBhcmVudCA6IHBhcmVudFtjaGlsZEtleV07XG4gICAgICBjb25zdCBpbmRleCA9IHBhcmVudEFyci5maW5kSW5kZXgoY2hpbGQgPT4gY2hpbGRbaWRLZXldID09PSBpZCk7XG4gICAgICBsZXQgYWRqYWNlbnRJdGVtID0gcGFyZW50QXJyW2luZGV4ICsgMV07XG4gICAgICBpZiAoIWFkamFjZW50SXRlbSkgYWRqYWNlbnRJdGVtID0gcGFyZW50QXJyW2luZGV4IC0gMV07XG4gICAgICBpZiAoIWFkamFjZW50SXRlbSAmJiAhQXJyYXkuaXNBcnJheShwYXJlbnQpKSBhZGphY2VudEl0ZW0gPSBwYXJlbnQ7XG4gICAgICBpZiAoIWFkamFjZW50SXRlbSkgcmV0dXJuIG51bGw7XG5cbiAgICAgIHJldHVybiBhZGphY2VudEl0ZW1baWRLZXldO1xuICAgIH07XG5cbiAgICBjb25zdCBwYXJlbnQgPSB0aGlzLmdldFRyZWVJdGVtKGlkLCB0aGlzLnByb3BzLnRyZWVEYXRhLCB0cnVlKTtcbiAgICByZXR1cm4gcGFyZW50ID8gZ2V0QWRqYWNlbnRJdGVtSWQocGFyZW50KSA6IGdldEFkamFjZW50SXRlbUlkKHRyZWVEYXRhKTtcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyBhbGwgSURzIGluIHRoZSB0cmVlXG4gICAqIEBwYXJhbSBhcnJheVxuICAgKi9cbiAgZ2V0QWxsUGFyZW50SWRzID0gKGFycmF5ID0gdGhpcy5wcm9wcy50cmVlRGF0YSkgPT4ge1xuICAgIGNvbnN0IHsgaWRLZXksIGNoaWxkS2V5IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGNiID0gKGFjYywgaXRlbSkgPT4ge1xuICAgICAgbGV0IHRvdGFsID0gYWNjO1xuICAgICAgaWYgKGl0ZW1bY2hpbGRLZXldICYmIGl0ZW1bY2hpbGRLZXldLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdG90YWwgPSBhY2MuY29uY2F0KGl0ZW1baWRLZXldKTtcbiAgICAgICAgcmV0dXJuIGl0ZW1bY2hpbGRLZXldLnJlZHVjZShjYiwgdG90YWwpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRvdGFsO1xuICAgIH07XG4gICAgcmV0dXJuIGFycmF5LnJlZHVjZShjYiwgW10pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBcHBlbmRzIHByb3ZpZGVkIGl0ZW1zIHRvIHRoZSBncmlkXG4gICAqIEBwYXJhbSBpdGVtcyAtIGltbXV0YWJsZSBhcnJheSBvZiBpdGVtcyB0byBiZSBhcHBlbmRlZCB0byBncmlkXG4gICAqIEBwYXJhbSBzZXROZXdJdGVtcyAtIHNldCBjb21wbGV0ZWx5IGEgbmV3IGFycmF5IG9mIGl0ZW1zXG4gICAqL1xuICBzZXREYXRhVG9HcmlkID0gKGl0ZW1zLCBzZXROZXdJdGVtcyA9IGZhbHNlKSA9PiB7XG4gICAgbGV0IGRhdGEgPSBMaXN0KCk7XG4gICAgY29uc3QgeyBncmlkLCBncmlkQ29sdW1ucywgZ3JpZERhdGEgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFzZXROZXdJdGVtcykgZGF0YSA9IGdyaWREYXRhLnNsaWNlKCk7XG4gICAgY29uc3QgbmV3R3JpZEl0ZW1zID0gZGF0YS5jb25jYXQoaXRlbXMpO1xuXG4gICAgdGhpcy5wcm9wcy5zZXREYXRhKGdyaWQsIGdyaWRDb2x1bW5zLCBuZXdHcmlkSXRlbXMpO1xuICAgIHRoaXMucHJvcHMuY2xlYXJTZWxlY3RlZEl0ZW1zKGdyaWQpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBFeHBhbmRzIGEgcGFyZW50XG4gICAqIEBwYXJhbSBwYXJlbnRJZFxuICAgKi9cbiAgZXhwYW5kUGFyZW50ID0gKHBhcmVudElkKSA9PiB7XG4gICAgaWYgKHBhcmVudElkICYmICF0aGlzLnN0YXRlLmV4cGFuZGVkS2V5cy5maW5kKGV4cGFuZGVkSWQgPT4gZXhwYW5kZWRJZCA9PT0gcGFyZW50SWQpKSB7XG4gICAgICBjb25zdCBuZXdFeHBhbmRlZEtleXMgPSB0aGlzLnN0YXRlLmV4cGFuZGVkS2V5cy5zbGljZSgpO1xuICAgICAgbmV3RXhwYW5kZWRLZXlzLnB1c2gocGFyZW50SWQpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGV4cGFuZGVkS2V5czogbmV3RXhwYW5kZWRLZXlzIH0pO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogQ2xvc2VzIGRlbGV0ZSBjb25maXJtYXRpb24gZGlhbG9nXG4gICAqL1xuICBjbG9zZURlbGV0ZUNvbmZpcm1hdGlvbkRpYWxvZyA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2hvd0RlbGV0ZUNvbmZpcm1hdGlvbjogZmFsc2UgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIERlbGV0ZXMgYSBwYXJlbnQgbm9kZVxuICAgKi9cbiAgZGVsZXRlUGFyZW50ID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgb25DaGFuZ2UsIHRyZWVEYXRhIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHNlbGVjdGVkS2V5ID0gdGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF07XG4gICAgY29uc3QgYWN0aW9uID0ge1xuICAgICAgdHlwZTogVFJFRV9BQ1RJT05TLkRFTEVURV9QQVJFTlQsXG4gICAgfTtcbiAgICBjb25zdCBuZXh0U2VsZWN0ZWRLZXkgPSB0aGlzLmdldEFkamFjZW50SXRlbShzZWxlY3RlZEtleSk7XG4gICAgY29uc3QgbmV3SXRlbXMgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKHNlbGVjdGVkS2V5LCB0cmVlRGF0YSwgYWN0aW9uKTtcbiAgICBpZiAob25DaGFuZ2UpIG9uQ2hhbmdlKG5ld0l0ZW1zKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNlbGVjdGVkS2V5czogW25leHRTZWxlY3RlZEtleV0sXG4gICAgICBzaG93RGVsZXRlQ29uZmlybWF0aW9uOiBmYWxzZSxcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGEgbW92ZSBpcyBwZXJtaXR0ZWQgYmVmb3JlIGNhbGxpbmcgVHJlZSBjb21wb25lbnQncyBvbkRyYWdEcm9wIGNhbGxiYWNrXG4gICAqIEBwYXJhbSBpdGVtc1xuICAgKiBAcGFyYW0gZVxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIGlzRHJhZ0Ryb3BMZWdhbCA9IChpdGVtcywgZSkgPT4ge1xuICAgIGNvbnN0IHsgY2hpbGRLZXksIHRyZWVEYXRhLCBvbkRyYWdEcm9wUHJldmVudCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBkcm9wSXRlbSA9IHRoaXMuZ2V0VHJlZUl0ZW0oZS5ub2RlLnByb3BzLmV2ZW50S2V5KTtcbiAgICBjb25zdCBkcmFnSXRlbSA9IHRoaXMuZ2V0VHJlZUl0ZW0oZS5kcmFnTm9kZS5wcm9wcy5ldmVudEtleSk7XG4gICAgY29uc3QgZHJvcEl0ZW1QYXJlbnQgPSB0aGlzLmdldFRyZWVJdGVtKGUubm9kZS5wcm9wcy5ldmVudEtleSwgdHJlZURhdGEsIHRydWUpO1xuXG4gICAgLyoqXG4gICAgICogV2Ugd2FudCB0byBwcmV2ZW50IHRoZSBtb3ZlLCBpZjpcbiAgICAgKiAtIFNlbGVjdGVkIGl0ZW0gaXMgYSBwYXJlbnQsIGFuZCAuLlxuICAgICAqICAgIC0gRHJvcHBpbmcgb3ZlciBhbiBpdGVtLCBhbmQgLi5cbiAgICAgKiAgICAgIC0gTmV3IHBhcmVudCBoYXMgbGVhZnMgT1IgbmV3IHBhcmVudCBpcyBhIGxlYWZcbiAgICAgKiAgICAtIERyb3BwaW5nIGJldHdlZW4gaXRlbXMsIGFuZCAuLlxuICAgICAqICAgICAgICAtIE5ldyBwYXJlbnQncyBwYXJlbnQgaGFzIGxlYWZzXG4gICAgICogIC0gU2VsZWN0ZWQgaXRlbSBpcyBhIGxlYWYsIGFuZCAuLi5cbiAgICAgKi9cbiAgICBpZiAoZHJhZ0l0ZW1bY2hpbGRLZXldKSB7XG4gICAgICBpZiAoXG4gICAgICAgICghZS5kcm9wVG9HYXAgJiYgKHRoaXMuaGFzTGVhZnMoZHJvcEl0ZW0pIHx8ICFkcm9wSXRlbVtjaGlsZEtleV0pKSB8fFxuICAgICAgICAoZHJvcEl0ZW1QYXJlbnQgJiYgZS5kcm9wVG9HYXAgJiYgKHRoaXMuaGFzTGVhZnMoZHJvcEl0ZW1QYXJlbnQpKSlcbiAgICAgICkge1xuICAgICAgICBpZiAob25EcmFnRHJvcFByZXZlbnQpIG9uRHJhZ0Ryb3BQcmV2ZW50KCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKFxuICAgICAgKGRyb3BJdGVtICYmICFlLmRyb3BUb0dhcCAmJiB0aGlzLmhhc1BhcmVudHMoZHJvcEl0ZW0pKSB8fFxuICAgICAgKGRyb3BJdGVtUGFyZW50ICYmIGUuZHJvcFRvR2FwICYmIHRoaXMuaGFzUGFyZW50cyhkcm9wSXRlbVBhcmVudCkpIHx8XG4gICAgICAoZS5kcm9wVG9HYXAgJiYgIWRyb3BJdGVtUGFyZW50KSB8fFxuICAgICAgKCFlLmRyb3BUb0dhcCAmJiAhZHJvcEl0ZW1bY2hpbGRLZXldKVxuICAgICkge1xuICAgICAgLy8gSXRlbSBoYXMgZ290IHBhcmVudCBhcyBhIGNoaWxkIC0gbGVhZiBjYW5ub3QgYmUgZHJvcHBlZCBoZXJlXG4gICAgICBpZiAob25EcmFnRHJvcFByZXZlbnQpIG9uRHJhZ0Ryb3BQcmV2ZW50KCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG5cbiAgaXNBbGxFeHBhbmRlZCA9ICgpID0+XG4gICAgdGhpcy5zdGF0ZS5leHBhbmRlZEtleXMubGVuZ3RoID09PSB0aGlzLmdldEFsbFBhcmVudElkcygpLmxlbmd0aDtcblxuICBoYXNMZWFmcyA9IChpdGVtKSA9PiB7XG4gICAgY29uc3QgeyBjaGlsZEtleSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIWl0ZW1bY2hpbGRLZXldKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuICEhaXRlbVtjaGlsZEtleV0uZmluZChjaGlsZCA9PiAhY2hpbGRbY2hpbGRLZXldKTtcbiAgfTtcblxuICBoYXNQYXJlbnRzID0gKGl0ZW0pID0+IHtcbiAgICBjb25zdCB7IGNoaWxkS2V5IH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghaXRlbVtjaGlsZEtleV0pIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gISFpdGVtW2NoaWxkS2V5XS5maW5kKGNoaWxkID0+IGNoaWxkW2NoaWxkS2V5XSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIERlc2VsZWN0cyBhbiBpdGVtLCBpZiBpdCBpcyBlLmcuIHJlbW92ZWRcbiAgICovXG4gIGRlc2VsZWN0SXRlbSA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRLZXlzOiBbXSB9KTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgdmFsdWVLZXksIGlkS2V5LCB0cmVlRGF0YSwgZ3JpZCwgZ3JpZENvbHVtbnMsIGNsYXNzTmFtZSwgdHJhbnNsYXRpb25zLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgbWVyZ2VkR3JpZCA9IE9iamVjdC5hc3NpZ24oe30sIGdyaWQsIHsgZGVmYXVsdFNob3dGaWx0ZXJpbmdSb3c6IHRydWUgfSk7XG4gICAgY29uc3QgbWVyZ2VkVHJhbnNsYXRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdFRyYW5zbGF0aW9ucywgdHJhbnNsYXRpb25zKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8UmVhY3QuRnJhZ21lbnQ+XG4gICAgICAgIDxDb250YWluZXIgY2xhc3NOYW1lPXtjbGFzc05hbWV9PlxuICAgICAgICAgIDxUcmVlQ29udGFpbmVyPlxuICAgICAgICAgICAgPENvbnRyb2xCYXJcbiAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgIG9uQWRkTmV3Q2xpY2s9e3RoaXMub25BZGROZXdDbGlja31cbiAgICAgICAgICAgICAgb25EZWxldGVDbGljaz17dGhpcy5vbkRlbGV0ZUNsaWNrfVxuICAgICAgICAgICAgICBvbklucHV0Q2hhbmdlPXt0aGlzLm9uSW5wdXRDaGFuZ2V9XG4gICAgICAgICAgICAgIG9uRXhwYW5kQWxsQ2xpY2s9e3RoaXMub25FeHBhbmRBbGx9XG4gICAgICAgICAgICAgIGV4cGFuZEFsbD17dGhpcy5pc0FsbEV4cGFuZGVkKCl9XG4gICAgICAgICAgICAgIHNlbGVjdGVkVHJlZUl0ZW09e3RoaXMuZ2V0VHJlZUl0ZW0odGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF0pfVxuICAgICAgICAgICAgICBoZWlnaHQ9e0FDVElPTl9CQVJfQ09OVEFJTkVSX0hFSUdIVH1cbiAgICAgICAgICAgICAgdHJhbnNsYXRpb25zPXttZXJnZWRUcmFuc2xhdGlvbnN9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPFBlcmZlY3RTY3JvbGxiYXI+XG4gICAgICAgICAgICAgIHshIXRyZWVEYXRhLmxlbmd0aCAmJiA8VHJlZUNvbXBvbmVudFxuICAgICAgICAgICAgICAgIHRyZWVEYXRhPXt0cmVlRGF0YX1cbiAgICAgICAgICAgICAgICBkYXRhTG9va1VwS2V5PXtpZEtleX1cbiAgICAgICAgICAgICAgICBkYXRhTG9va1VwVmFsdWU9e3ZhbHVlS2V5fVxuICAgICAgICAgICAgICAgIG9uU2VsZWN0PXt0aGlzLm9uVHJlZUl0ZW1TZWxlY3R9XG4gICAgICAgICAgICAgICAgb25EcmFnRHJvcD17dGhpcy5vblRyZWVJdGVtRHJhZ0Ryb3B9XG4gICAgICAgICAgICAgICAgb25FeHBhbmQ9e3RoaXMub25FeHBhbmR9XG4gICAgICAgICAgICAgICAgY2hlY2thYmxlPXtmYWxzZX1cbiAgICAgICAgICAgICAgICBzZWxlY3RlZEtleXM9e3RoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzfVxuICAgICAgICAgICAgICAgIGV4cGFuZGVkS2V5cz17dGhpcy5zdGF0ZS5leHBhbmRlZEtleXN9XG4gICAgICAgICAgICAgICAgaXNEcmFnRHJvcExlZ2FsPXt0aGlzLmlzRHJhZ0Ryb3BMZWdhbH1cbiAgICAgICAgICAgICAgICBzZWxlY3RhYmxlXG4gICAgICAgICAgICAgICAgZHJhZ2dhYmxlXG4gICAgICAgICAgICAgIC8+fVxuICAgICAgICAgICAgICB7IXRyZWVEYXRhLmxlbmd0aCAmJiA8Tm9JdGVtc1RleHQ+e21lcmdlZFRyYW5zbGF0aW9ucy5ub1RyZWVJdGVtc308L05vSXRlbXNUZXh0Pn1cbiAgICAgICAgICAgIDwvUGVyZmVjdFNjcm9sbGJhcj5cbiAgICAgICAgICA8L1RyZWVDb250YWluZXI+XG4gICAgICAgICAgPEFycm93Q29udHJvbHNcbiAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgc2VsZWN0ZWRUcmVlSXRlbT17dGhpcy5nZXRUcmVlSXRlbSh0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXSl9XG4gICAgICAgICAgICBvbk1vdmVUb1RyZWVDbGljaz17dGhpcy5vbk1vdmVUb1RyZWVDbGlja31cbiAgICAgICAgICAgIG9uTW92ZVRvR3JpZENsaWNrPXt0aGlzLm9uTW92ZVRvR3JpZENsaWNrfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPEdyaWRcbiAgICAgICAgICAgIGdyaWQ9e21lcmdlZEdyaWR9XG4gICAgICAgICAgICBjb2x1bW5zPXtncmlkQ29sdW1uc31cbiAgICAgICAgICAgIHJvd1NlbGVjdFxuICAgICAgICAgICAgbXVsdGlTZWxlY3RcbiAgICAgICAgICAgIGZpbHRlcmluZ1xuICAgICAgICAgICAgcm93U2VsZWN0Q2hlY2tib3hDb2x1bW5cbiAgICAgICAgICAgIGdyaWRIZWFkZXI9ezxQcmltaXRpdmUuU3VidGl0bGU+e21lcmdlZFRyYW5zbGF0aW9ucy5ncmlkVGl0bGV9PC9QcmltaXRpdmUuU3VidGl0bGU+fVxuICAgICAgICAgIC8+XG5cbiAgICAgICAgPC9Db250YWluZXI+XG4gICAgICAgIHt0aGlzLnN0YXRlLnNob3dEZWxldGVDb25maXJtYXRpb24gJiZcbiAgICAgICAgPENvbmZpcm1EaWFsb2dcbiAgICAgICAgICB0aXRsZVRleHQ9e21lcmdlZFRyYW5zbGF0aW9ucy5kZWxldGVDb25maXJtRGlhbG9nLnRpdGxlVGV4dH1cbiAgICAgICAgICBib2R5VGV4dD17bWVyZ2VkVHJhbnNsYXRpb25zLmRlbGV0ZUNvbmZpcm1EaWFsb2cuYm9keVRleHR9XG4gICAgICAgICAgb2tCdXR0b25UZXh0PXttZXJnZWRUcmFuc2xhdGlvbnMuZGVsZXRlQ29uZmlybURpYWxvZy5va0J1dHRvblRleHR9XG4gICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dD17bWVyZ2VkVHJhbnNsYXRpb25zLmRlbGV0ZUNvbmZpcm1EaWFsb2cuY2FuY2VsQnV0dG9uVGV4dH1cbiAgICAgICAgICBjb25maXJtQ2FsbGJhY2s9e3RoaXMuZGVsZXRlUGFyZW50fVxuICAgICAgICAgIGNhbmNlbENhbGxiYWNrPXt0aGlzLmNsb3NlRGVsZXRlQ29uZmlybWF0aW9uRGlhbG9nfVxuICAgICAgICAvPlxuICAgICAgICB9XG4gICAgICA8L1JlYWN0LkZyYWdtZW50PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==