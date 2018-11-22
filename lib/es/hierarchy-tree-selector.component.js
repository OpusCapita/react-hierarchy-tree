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

import TreeComponent from '@opuscapita/react-tree-component';
import PerfectScrollbar from '@opuscapita/react-perfect-scrollbar';
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
        translations: mergedTranslations.deleteConfirmDialog,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlRyZWVDb21wb25lbnQiLCJQZXJmZWN0U2Nyb2xsYmFyIiwiUHJpbWl0aXZlIiwiRGF0YWdyaWQiLCJncmlkU2hhcGUiLCJncmlkQ29sdW1uU2hhcGUiLCJEYXRhZ3JpZEFjdGlvbnMiLCJDb25maXJtRGlhbG9nIiwiUmVhY3QiLCJzdHlsZWQiLCJMaXN0IiwiZnJvbUpTIiwiSW1tdXRhYmxlUHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwiY29ubmVjdCIsIkNvbnRyb2xCYXIiLCJBcnJvd0NvbnRyb2xzIiwiZGVmYXVsdFRyYW5zbGF0aW9ucyIsIkFDVElPTl9CQVJfQ09OVEFJTkVSX0hFSUdIVCIsIlRSRUVfQUNUSU9OUyIsIkFERF9DSElMRFJFTiIsIk1PVkVfTEVBRiIsIlJFTkFNRV9QQVJFTlQiLCJERUxFVEVfUEFSRU5UIiwiR3JpZCIsInByb3BzIiwidGhlbWUiLCJjb2xvcnMiLCJjb2xvckxpZ2h0R3JheSIsIkNvbnRhaW5lciIsImRpdiIsIlRyZWVDb250YWluZXIiLCJndXR0ZXJXaWR0aCIsIk5vSXRlbXNUZXh0IiwicCIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsInNldERhdGEiLCJjbGVhclNlbGVjdGVkSXRlbXMiLCJtYXBTdGF0ZVRvUHJvcHMiLCJzdGF0ZSIsImdyaWRJZCIsImdyaWQiLCJpZCIsInNlbGVjdGVkR3JpZEl0ZW1zIiwiZGF0YWdyaWQiLCJnZXRJbiIsImdyaWREYXRhIiwiSGllcmFyY2h5VHJlZVNlbGVjdG9yIiwib25UcmVlSXRlbVNlbGVjdCIsInNlbGVjdGVkS2V5cyIsIm9uU2VsZWN0Iiwic2V0U3RhdGUiLCJvblRyZWVJdGVtRHJhZ0Ryb3AiLCJpdGVtcyIsIm9uQ2hhbmdlIiwib25EZWxldGVDbGljayIsInNob3dEZWxldGVDb25maXJtYXRpb24iLCJvbkFkZE5ld0NsaWNrIiwiZGF0YSIsImNhbGxiYWNrIiwidHJlZURhdGEiLCJpZEtleSIsIm5ld0l0ZW1zIiwic2xpY2UiLCJwdXNoIiwiYWN0aW9uIiwidHlwZSIsImdldFVwZGF0ZWRUcmVlIiwicGFyZW50IiwiZ2V0VHJlZUl0ZW0iLCJleHBhbmRQYXJlbnQiLCJvbk1vdmVUb0dyaWRDbGljayIsInNlbGVjdGVkS2V5IiwibmV4dFNlbGVjdGVkS2V5IiwiZ2V0QWRqYWNlbnRJdGVtIiwibmV3R3JpZEl0ZW1zIiwic2V0RGF0YVRvR3JpZCIsIm9uTW92ZVRvVHJlZUNsaWNrIiwic2VsZWN0ZWRJZCIsImZpbHRlciIsImluY2x1ZGVzIiwiaSIsImdldCIsInRvSlMiLCJpdGVtIiwib25JbnB1dENoYW5nZSIsInZhbHVlIiwib25FeHBhbmQiLCJpZHMiLCJleHBhbmRlZEtleXMiLCJvbkV4cGFuZEFsbCIsIm5ld0V4cGFuZGVkSXRlbXMiLCJpc0FsbEV4cGFuZGVkIiwiZ2V0QWxsUGFyZW50SWRzIiwiYXJyYXkiLCJmb3VuZCIsImNoaWxkS2V5IiwidmFsdWVLZXkiLCJyZW1vdmVBY3Rpb25zIiwicm9vdEl0ZW0iLCJmaW5kIiwibGVuZ3RoIiwiZ2V0QWxsTGVhZnMiLCJkZXNlbGVjdEl0ZW0iLCJjaGlsZCIsImZpbHRlcmVkQ2hpbGRyZW4iLCJjaGlsZEl0ZW0iLCJjb25jYXQiLCJUeXBlRXJyb3IiLCJhbHJlYWR5Rm91bmQiLCJsZWFmcyIsInJldHVyblBhcmVudCIsImZvckVhY2giLCJnZXRBZGphY2VudEl0ZW1JZCIsInBhcmVudEFyciIsIkFycmF5IiwiaXNBcnJheSIsImluZGV4IiwiZmluZEluZGV4IiwiYWRqYWNlbnRJdGVtIiwiY2IiLCJhY2MiLCJ0b3RhbCIsInJlZHVjZSIsInNldE5ld0l0ZW1zIiwiZ3JpZENvbHVtbnMiLCJwYXJlbnRJZCIsImV4cGFuZGVkSWQiLCJuZXdFeHBhbmRlZEtleXMiLCJjbG9zZURlbGV0ZUNvbmZpcm1hdGlvbkRpYWxvZyIsImRlbGV0ZVBhcmVudCIsImlzRHJhZ0Ryb3BMZWdhbCIsImUiLCJvbkRyYWdEcm9wUHJldmVudCIsImRyb3BJdGVtIiwibm9kZSIsImV2ZW50S2V5IiwiZHJhZ0l0ZW0iLCJkcmFnTm9kZSIsImRyb3BJdGVtUGFyZW50IiwiZHJvcFRvR2FwIiwiaGFzTGVhZnMiLCJoYXNQYXJlbnRzIiwiZGVmYXVsdEV4cGFuZEFsbCIsImNvbXBvbmVudERpZE1vdW50IiwicmVuZGVyIiwiY2xhc3NOYW1lIiwidHJhbnNsYXRpb25zIiwibWVyZ2VkR3JpZCIsIk9iamVjdCIsImFzc2lnbiIsImRlZmF1bHRTaG93RmlsdGVyaW5nUm93IiwibWVyZ2VkVHJhbnNsYXRpb25zIiwibm9UcmVlSXRlbXMiLCJncmlkVGl0bGUiLCJkZWxldGVDb25maXJtRGlhbG9nIiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyIsInVuZGVmaW5lZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPQSxhQUFQLE1BQTBCLGtDQUExQjtBQUNBLE9BQU9DLGdCQUFQLE1BQTZCLHFDQUE3QjtBQUNBLFNBQVNDLFNBQVQsUUFBMEIsa0NBQTFCO0FBQ0EsU0FBU0MsUUFBVCxFQUFtQkMsU0FBbkIsRUFBOEJDLGVBQTlCLEVBQStDQyxlQUEvQyxRQUFzRSx3QkFBdEU7QUFDQSxPQUFPQyxhQUFQLE1BQTBCLHVDQUExQjs7QUFFQSxPQUFPQyxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsTUFBUCxNQUFtQixtQkFBbkI7QUFDQSxTQUFTQyxJQUFULEVBQWVDLE1BQWYsUUFBNkIsV0FBN0I7QUFDQSxPQUFPQyxrQkFBUCxNQUErQiwyQkFBL0I7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsU0FBU0MsT0FBVCxRQUF3QixhQUF4Qjs7QUFHQTtBQUNBLE9BQU9DLFVBQVAsTUFBdUIsaURBQXZCO0FBQ0EsT0FBT0MsYUFBUCxNQUEwQixvREFBMUI7QUFDQSxTQUFTQyxtQkFBVCxRQUFvQyx3QkFBcEM7O0FBRUEsSUFBTUMsOEJBQThCLE1BQXBDO0FBQ0EsSUFBTUMsZUFBZTtBQUNuQkMsZ0JBQWMsY0FE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c291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRyZWVDb21wb25lbnQgZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtdHJlZS1jb21wb25lbnQnO1xuaW1wb3J0IFBlcmZlY3RTY3JvbGxiYXIgZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtcGVyZmVjdC1zY3JvbGxiYXInO1xuaW1wb3J0IHsgUHJpbWl0aXZlIH0gZnJvbSAnQG9wdXNjYXBpdGEvb2MtY20tY29tbW9uLWxheW91dHMnO1xuaW1wb3J0IHsgRGF0YWdyaWQsIGdyaWRTaGFwZSwgZ3JpZENvbHVtblNoYXBlLCBEYXRhZ3JpZEFjdGlvbnMgfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1ncmlkJztcbmltcG9ydCBDb25maXJtRGlhbG9nIGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWNvbmZpcm1hdGlvbi1kaWFsb2cnO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgeyBMaXN0LCBmcm9tSlMgfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IEltbXV0YWJsZVByb3BUeXBlcyBmcm9tICdyZWFjdC1pbW11dGFibGUtcHJvcHR5cGVzJztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5cbi8vIEFwcCBpbXBvcnRzXG5pbXBvcnQgQ29udHJvbEJhciBmcm9tICcuL2hpZXJhcmNoeS10cmVlLXNlbGVjdG9yLWNvbnRyb2wtYmFyLmNvbXBvbmVudCc7XG5pbXBvcnQgQXJyb3dDb250cm9scyBmcm9tICcuL2hpZXJhcmNoeS10cmVlLXNlbGVjdG9yLWFycm93LWNvbnRyb2xzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBkZWZhdWx0VHJhbnNsYXRpb25zIH0gZnJvbSAnLi9oaWVyYXJjaHktdHJlZS51dGlscyc7XG5cbmNvbnN0IEFDVElPTl9CQVJfQ09OVEFJTkVSX0hFSUdIVCA9ICc1N3B4JztcbmNvbnN0IFRSRUVfQUNUSU9OUyA9IHtcbiAgQUREX0NISUxEUkVOOiAnQUREX0NISUxEUkVOJyxcbiAgTU9WRV9MRUFGOiAnTU9WRV9MRUFGJyxcbiAgUkVOQU1FX1BBUkVOVDogJ1JFTkFNRV9QQVJFTlQnLFxuICBERUxFVEVfUEFSRU5UOiAnREVMRVRFX1BBUkVOVCcsXG59O1xuXG5jb25zdCBHcmlkID0gc3R5bGVkKERhdGFncmlkKWBcbiAgaGVpZ2h0OiAxMDAlO1xuICAmJiYge1xuICAgIHBhZGRpbmc6IDA7XG4gIH1cbiAgLm9jLWRhdGFncmlkLW1haW4tY29udGFpbmVyIHtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAke3Byb3BzID0+IHByb3BzLnRoZW1lLmNvbG9ycy5jb2xvckxpZ2h0R3JheX07XG4gICAgYm9yZGVyLXRvcDpub25lO1xuICB9XG5gO1xuXG5jb25zdCBDb250YWluZXIgPSBzdHlsZWQuZGl2YFxuICBkaXNwbGF5OiBmbGV4O1xuICBtaW4taGVpZ2h0OiAzMDBweDtcbiAgPiBkaXYge1xuICAgIHdpZHRoOiA1MCU7XG4gICAgZmxleDogMSAxIDEwMCU7XG4gIH1cbmA7XG5cbmNvbnN0IFRyZWVDb250YWluZXIgPSBzdHlsZWQuZGl2YFxuICBoZWlnaHQ6MTAwJTtcbiAgLm9jLXNjcm9sbGJhci1jb250YWluZXIge1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuY29sb3JzLmNvbG9yTGlnaHRHcmF5fTtcbiAgICBoZWlnaHQ6IGNhbGMoMTAwJSAtICR7QUNUSU9OX0JBUl9DT05UQUlORVJfSEVJR0hUfSk7XG4gICAgcGFkZGluZzogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5ndXR0ZXJXaWR0aH07XG4gIH1cbiAgLm9jLXJlYWN0LXRyZWUge1xuICAgIGhlaWdodDogMTAwJTtcbiAgICAucmMtdHJlZS1pY29uRWxlLnJjLXRyZWUtaWNvbl9fY3VzdG9taXplIHtcbiAgICAgICAgZGlzcGxheTpub25lO1xuICAgIH1cbiAgfVxuYDtcblxuY29uc3QgTm9JdGVtc1RleHQgPSBzdHlsZWQucGBcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuYDtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0ge1xuICBzZXREYXRhOiBEYXRhZ3JpZEFjdGlvbnMuc2V0RGF0YSxcbiAgY2xlYXJTZWxlY3RlZEl0ZW1zOiBEYXRhZ3JpZEFjdGlvbnMuY2xlYXJTZWxlY3RlZEl0ZW1zLFxufTtcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlLCBwcm9wcykgPT4ge1xuICBjb25zdCBncmlkSWQgPSBwcm9wcy5ncmlkLmlkO1xuICByZXR1cm4ge1xuICAgIHNlbGVjdGVkR3JpZEl0ZW1zOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbZ3JpZElkLCAnc2VsZWN0ZWRJdGVtcyddLCBMaXN0KCkpLFxuICAgIGdyaWREYXRhOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbZ3JpZElkLCAnYWxsRGF0YSddLCBMaXN0KCkpLFxuICB9O1xufTtcblxuQGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIaWVyYXJjaHlUcmVlU2VsZWN0b3IgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBpZEtleTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB2YWx1ZUtleTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjaGlsZEtleTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB0cmVlRGF0YTogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnNoYXBlKHt9KSksXG4gICAgZ3JpZDogZ3JpZFNoYXBlLmlzUmVxdWlyZWQsXG4gICAgZ3JpZENvbHVtbnM6IFByb3BUeXBlcy5hcnJheU9mKGdyaWRDb2x1bW5TaGFwZSkuaXNSZXF1aXJlZCxcbiAgICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgc2V0RGF0YTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBjbGVhclNlbGVjdGVkSXRlbXM6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgc2VsZWN0ZWRHcmlkSXRlbXM6IEltbXV0YWJsZVByb3BUeXBlcy5saXN0LmlzUmVxdWlyZWQsXG4gICAgZ3JpZERhdGE6IEltbXV0YWJsZVByb3BUeXBlcy5saXN0LmlzUmVxdWlyZWQsXG4gICAgdHJhbnNsYXRpb25zOiBQcm9wVHlwZXMuc2hhcGUoe30pLFxuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRlZmF1bHRFeHBhbmRBbGw6IFByb3BUeXBlcy5ib29sLFxuXG4gICAgLy8gQ2FsbGJhY2tzXG4gICAgb25EcmFnRHJvcFByZXZlbnQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBpZEtleTogJ2lkJyxcbiAgICB2YWx1ZUtleTogJ25hbWUnLFxuICAgIGNoaWxkS2V5OiAnY2hpbGRyZW4nLFxuICAgIHRyZWVEYXRhOiBbXSxcbiAgICBjbGFzc05hbWU6ICcnLFxuICAgIHRyYW5zbGF0aW9uczogZGVmYXVsdFRyYW5zbGF0aW9ucyxcbiAgICBpZDogJ2hpZXJhcmNoeS10cmVlJyxcbiAgICBvbkRyYWdEcm9wUHJldmVudDogdW5kZWZpbmVkLFxuICAgIG9uU2VsZWN0OiB1bmRlZmluZWQsXG4gICAgb25DaGFuZ2U6IHVuZGVmaW5lZCxcbiAgICBkZWZhdWx0RXhwYW5kQWxsOiB0cnVlLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgbGV0IGV4cGFuZGVkS2V5cyA9IFtdO1xuICAgIGlmIChwcm9wcy5kZWZhdWx0RXhwYW5kQWxsICYmIHByb3BzLnRyZWVEYXRhKSB7XG4gICAgICBleHBhbmRlZEtleXMgPSB0aGlzLmdldEFsbFBhcmVudElkcyhwcm9wcy50cmVlRGF0YSk7XG4gICAgfVxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzZWxlY3RlZEtleXM6IFtdLFxuICAgICAgZXhwYW5kZWRLZXlzLFxuICAgICAgc2hvd0RlbGV0ZUNvbmZpcm1hdGlvbjogZmFsc2UsXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnN0IHsgZGVmYXVsdEV4cGFuZEFsbCB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoZGVmYXVsdEV4cGFuZEFsbCkge1xuICAgICAgdGhpcy5vbkV4cGFuZCh0aGlzLmdldEFsbFBhcmVudElkcygpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0cyBhIHRyZWUgaXRlbVxuICAgKiBAcGFyYW0gc2VsZWN0ZWRLZXlzIChhcnJheSlcbiAgICovXG4gIG9uVHJlZUl0ZW1TZWxlY3QgPSAoc2VsZWN0ZWRLZXlzKSA9PiB7XG4gICAgY29uc3QgeyBvblNlbGVjdCB9ID0gdGhpcy5wcm9wcztcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRLZXlzIH0sICgpID0+IHtcbiAgICAgIGlmIChvblNlbGVjdCkgb25TZWxlY3Qoc2VsZWN0ZWRLZXlzKTtcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogRmlyZWQgb24gZHJhZyBuJyBkcm9wXG4gICAqIEBwYXJhbSBpdGVtc1xuICAgKi9cbiAgb25UcmVlSXRlbURyYWdEcm9wID0gKGl0ZW1zKSA9PiB7XG4gICAgY29uc3QgeyBvbkNoYW5nZSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAob25DaGFuZ2UpIG9uQ2hhbmdlKGl0ZW1zKTtcbiAgfTtcblxuICAvKipcbiAgICogRGlzcGxheXMgYSBjb25maXJtYXRpb24gZGlhbG9nXG4gICAqL1xuICBvbkRlbGV0ZUNsaWNrID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzaG93RGVsZXRlQ29uZmlybWF0aW9uOiB0cnVlIH0pO1xuICB9O1xuXG5cbiAgLyoqXG4gICAqIEFkZHMgYSBuZXcgbm9kZSB0byB0aGUgcm9vdCBvZiB0aGUgdHJlZSwgb3IgdW5kZXIgYSBzZWxlY3RlZCB0cmVlIG5vZGUgdXNpbmdcbiAgICogQUREX0NISUxEUkVOIGFjdGlvblxuICAgKiBAcGFyYW0gZGF0YSAtIGRhdGEgdG8gYmUgYWRkZWRcbiAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAqL1xuICBvbkFkZE5ld0NsaWNrID0gKGRhdGEsIGNhbGxiYWNrKSA9PiB7XG4gICAgY29uc3QgeyBvbkNoYW5nZSwgdHJlZURhdGEsIGlkS2V5IH0gPSB0aGlzLnByb3BzO1xuICAgIGxldCBuZXdJdGVtcyA9IHRyZWVEYXRhLnNsaWNlKCk7XG5cbiAgICAvLyBJZiBubyB0cmVlIG5vZGUgaXMgc2VsZWN0ZWQsIHdlJ2xsIHBsYWNlIHRoZSBuZXcgaXRlbSB0byB0aGUgcm9vdFxuICAgIC8vIG9mIHRoZSB0cmVlXG4gICAgaWYgKCF0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXSkge1xuICAgICAgbmV3SXRlbXMucHVzaChkYXRhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgYWN0aW9uID0ge1xuICAgICAgICB0eXBlOiBUUkVFX0FDVElPTlMuQUREX0NISUxEUkVOLFxuICAgICAgICBkYXRhLFxuICAgICAgfTtcbiAgICAgIG5ld0l0ZW1zID0gdGhpcy5nZXRVcGRhdGVkVHJlZSh0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXSwgdHJlZURhdGEsIGFjdGlvbik7XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZEtleXM6IFtkYXRhW2lkS2V5XV0gfSwgKCkgPT4ge1xuICAgICAgLy8gSWYgdGhlIHBhcmVudCBpcyBub3QgeWV0IGV4cGFuZGVkLCB3ZSB3aWxsIGV4cGFuZCBpdCBub3dcbiAgICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuZ2V0VHJlZUl0ZW0oZGF0YVtpZEtleV0sIHRyZWVEYXRhLCB0cnVlKSB8fCB7fTtcbiAgICAgIHRoaXMuZXhwYW5kUGFyZW50KHBhcmVudFtpZEtleV0pO1xuXG4gICAgICBpZiAob25DaGFuZ2UpIG9uQ2hhbmdlKG5ld0l0ZW1zKTtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgdGhlIGNob3NlbiBpdGVtIGZyb20gYSB0cmVlIGFuZCB1cGRhdGVzIHRoZSBncmlkIHVzaW5nIE1PVkVfTEVBRlxuICAgKiBhY3Rpb25cbiAgICovXG4gIG9uTW92ZVRvR3JpZENsaWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgdHJlZURhdGEsIG9uQ2hhbmdlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHNlbGVjdGVkS2V5ID0gdGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF07XG4gICAgY29uc3QgYWN0aW9uID0ge1xuICAgICAgdHlwZTogVFJFRV9BQ1RJT05TLk1PVkVfTEVBRixcbiAgICAgIGRhdGE6IHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdLFxuICAgIH07XG4gICAgY29uc3QgbmV4dFNlbGVjdGVkS2V5ID0gdGhpcy5nZXRBZGphY2VudEl0ZW0oc2VsZWN0ZWRLZXkpO1xuICAgIGNvbnN0IG5ld0dyaWRJdGVtcyA9IGZyb21KUyhbdGhpcy5nZXRUcmVlSXRlbShzZWxlY3RlZEtleSldKTtcbiAgICBjb25zdCBuZXdJdGVtcyA9IHRoaXMuZ2V0VXBkYXRlZFRyZWUoc2VsZWN0ZWRLZXksIHRyZWVEYXRhLCBhY3Rpb24pO1xuXG4gICAgdGhpcy5zZXREYXRhVG9HcmlkKG5ld0dyaWRJdGVtcyk7XG4gICAgaWYgKG9uQ2hhbmdlKSBvbkNoYW5nZShuZXdJdGVtcyk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzZWxlY3RlZEtleXM6IFtuZXh0U2VsZWN0ZWRLZXldLFxuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBZGRzIHNlbGVjdGVkIGdyaWQgaXRlbXMgdG8gdGhlIGNob3NlbiB0cmVlIG5vZGUgdXNpbmcgQUREX0NISUxEUkVOIGFjdGlvblxuICAgKi9cbiAgb25Nb3ZlVG9UcmVlQ2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgb25DaGFuZ2UsIHNlbGVjdGVkR3JpZEl0ZW1zLCBncmlkRGF0YSwgdHJlZURhdGEsIGlkS2V5LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHNlbGVjdGVkSWQgPSB0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXTtcblxuICAgIGNvbnN0IGFjdGlvbiA9IHtcbiAgICAgIHR5cGU6IFRSRUVfQUNUSU9OUy5BRERfQ0hJTERSRU4sXG4gICAgICBkYXRhOiBncmlkRGF0YVxuICAgICAgICAuZmlsdGVyKGkgPT4gc2VsZWN0ZWRHcmlkSXRlbXMuaW5jbHVkZXMoaS5nZXQoaWRLZXkpKSlcbiAgICAgICAgLnRvSlMoKSxcbiAgICB9O1xuICAgIGNvbnN0IG5ld0l0ZW1zID0gdGhpcy5nZXRVcGRhdGVkVHJlZShzZWxlY3RlZElkLCB0cmVlRGF0YSwgYWN0aW9uKTtcbiAgICBjb25zdCBuZXdHcmlkSXRlbXMgPSBncmlkRGF0YS5maWx0ZXIoaXRlbSA9PiAhc2VsZWN0ZWRHcmlkSXRlbXMuaW5jbHVkZXMoaXRlbS5nZXQoaWRLZXkpKSk7XG5cbiAgICB0aGlzLmV4cGFuZFBhcmVudChzZWxlY3RlZElkLCB0cnVlKTtcbiAgICB0aGlzLnNldERhdGFUb0dyaWQobmV3R3JpZEl0ZW1zLCB0cnVlKTtcbiAgICBpZiAob25DaGFuZ2UpIG9uQ2hhbmdlKG5ld0l0ZW1zKTtcbiAgfTtcblxuICAvKipcbiAgICogUmVuYW1lcyB0aGUgY2hvc2VuIHRyZWUgbm9kZSB1c2luZyBhIFJFTkFNRV9QQVJFTlQgYWN0aW9uXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKi9cbiAgb25JbnB1dENoYW5nZSA9ICh2YWx1ZSkgPT4ge1xuICAgIGNvbnN0IHsgdHJlZURhdGEsIG9uQ2hhbmdlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGFjdGlvbiA9IHtcbiAgICAgIHR5cGU6IFRSRUVfQUNUSU9OUy5SRU5BTUVfUEFSRU5ULFxuICAgICAgZGF0YTogdmFsdWUsXG4gICAgfTtcbiAgICBjb25zdCBuZXdJdGVtcyA9IHRoaXMuZ2V0VXBkYXRlZFRyZWUodGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF0sIHRyZWVEYXRhLCBhY3Rpb24pO1xuICAgIGlmIChvbkNoYW5nZSkgb25DaGFuZ2UobmV3SXRlbXMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBGaXJlZCBvbiBleHBhbmRcbiAgICogQHBhcmFtIGlkc1xuICAgKi9cbiAgb25FeHBhbmQgPSAoaWRzKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBleHBhbmRlZEtleXM6IGlkcyxcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogRXhwYW5kIGFsbCB0aGUgaXRlbXNcbiAgICovXG4gIG9uRXhwYW5kQWxsID0gKCkgPT4ge1xuICAgIGNvbnN0IG5ld0V4cGFuZGVkSXRlbXMgPSB0aGlzLmlzQWxsRXhwYW5kZWQoKSA/IFtdIDogdGhpcy5nZXRBbGxQYXJlbnRJZHMoKTtcbiAgICB0aGlzLnNldFN0YXRlKHsgZXhwYW5kZWRLZXlzOiBuZXdFeHBhbmRlZEl0ZW1zIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHVwZGF0ZWQgdHJlZSBpdGVtcy5cbiAgICogQHBhcmFtIGlkIC0gdGFyZ2V0IGl0ZW1cbiAgICogQHBhcmFtIGFycmF5IC0gYXJyYXkgd2hlcmUgdGFyZ2V0IGl0ZW0gaXMgYmVpbmcgc2VhcmNoZWRcbiAgICogQHBhcmFtIGFjdGlvbiAtIGFjdGlvbiB0byBiZSBwZXJmb3JtZWQge3R5cGUsIGRhdGF9XG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgZ2V0VXBkYXRlZFRyZWUgPSAoaWQsIGFycmF5ID0gdGhpcy5wcm9wcy50cmVlRGF0YSwgYWN0aW9uKSA9PiB7XG4gICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgY29uc3QgeyBpZEtleSwgY2hpbGRLZXksIHZhbHVlS2V5IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IG5ld0l0ZW1zID0gYXJyYXkuc2xpY2UoKTtcbiAgICBjb25zdCByZW1vdmVBY3Rpb25zID0gW1RSRUVfQUNUSU9OUy5NT1ZFX0xFQUYsIFRSRUVfQUNUSU9OUy5ERUxFVEVfUEFSRU5UXTtcblxuICAgIC8vIElmIGRlbGV0ZWQgcGFyZW50IGl0ZW0gaXMgaW4gdGhlIHJvb3Qgbm9kZVxuICAgIGlmIChhY3Rpb24udHlwZSA9PT0gVFJFRV9BQ1RJT05TLkRFTEVURV9QQVJFTlQpIHtcbiAgICAgIGNvbnN0IHJvb3RJdGVtID0gYXJyYXkuZmluZChpdGVtID0+IGl0ZW1baWRLZXldID09PSBpZCk7XG4gICAgICBpZiAocm9vdEl0ZW0pIHtcbiAgICAgICAgaWYgKHJvb3RJdGVtW2NoaWxkS2V5XS5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLnNldERhdGFUb0dyaWQoZnJvbUpTKHRoaXMuZ2V0QWxsTGVhZnMocm9vdEl0ZW1bY2hpbGRLZXldKSkpO1xuICAgICAgICAgIHRoaXMuZGVzZWxlY3RJdGVtKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ld0l0ZW1zLmZpbHRlcihpdGVtID0+IGl0ZW1baWRLZXldICE9PSBpZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdJdGVtcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3QgaXRlbSA9IG5ld0l0ZW1zW2ldO1xuICAgICAgaWYgKHJlbW92ZUFjdGlvbnMuaW5jbHVkZXMoYWN0aW9uLnR5cGUpICYmIGl0ZW1bY2hpbGRLZXldICYmICFmb3VuZCkge1xuICAgICAgICBmb3VuZCA9ICEhaXRlbVtjaGlsZEtleV0uZmluZChjaGlsZCA9PiBjaGlsZFtpZEtleV0gPT09IGlkKTtcbiAgICAgICAgaWYgKGZvdW5kKSB7XG4gICAgICAgICAgLy8gV2hlbiByZW1vdmluZyBhbiBpdGVtIHdlIG11c3QgZmlyc3QgZmluZCBpdHMgcGFyZW50IGFuZCBhbHRlciBpdHMgY2hpbGRyZW4gYXJyYXlcbiAgICAgICAgICBpZiAoYWN0aW9uLnR5cGUgPT09IFRSRUVfQUNUSU9OUy5NT1ZFX0xFQUYpIHtcbiAgICAgICAgICAgIGl0ZW1bY2hpbGRLZXldID0gaXRlbVtjaGlsZEtleV0uZmlsdGVyKGNoaWxkID0+IGNoaWxkW2lkS2V5XSAhPT0gaWQpO1xuICAgICAgICAgICAgdGhpcy5kZXNlbGVjdEl0ZW0oKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGFjdGlvbi50eXBlID09PSBUUkVFX0FDVElPTlMuREVMRVRFX1BBUkVOVCkge1xuICAgICAgICAgICAgLy8gd2UgbXVzdCBmaXJzdCBmaWx0ZXIgdGhlIGNoaWxkcmVuLCBzbyB0aGF0IHdlIHdvbid0IGdldCBsZWFmcyBmcm9tXG4gICAgICAgICAgICAvLyBvdGhlciBjaGlsZCBicmFuY2hlc1xuICAgICAgICAgICAgY29uc3QgZmlsdGVyZWRDaGlsZHJlbiA9IGl0ZW1bY2hpbGRLZXldLmZpbHRlcihjaGlsZEl0ZW0gPT4gY2hpbGRJdGVtW2lkS2V5XSA9PT0gaWQpO1xuICAgICAgICAgICAgdGhpcy5zZXREYXRhVG9HcmlkKGZyb21KUyh0aGlzLmdldEFsbExlYWZzKGZpbHRlcmVkQ2hpbGRyZW4pKSk7XG4gICAgICAgICAgICB0aGlzLmRlc2VsZWN0SXRlbSgpO1xuICAgICAgICAgICAgaXRlbVtjaGlsZEtleV0gPSBpdGVtW2NoaWxkS2V5XS5maWx0ZXIoY2hpbGRJdGVtID0+IGNoaWxkSXRlbVtpZEtleV0gIT09IGlkKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1baWRLZXldID09PSBpZCAmJiAhZm91bmQpIHtcbiAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgICAgY2FzZSBUUkVFX0FDVElPTlMuQUREX0NISUxEUkVOOlxuICAgICAgICAgICAgaXRlbVtjaGlsZEtleV0gPSAoaXRlbVtjaGlsZEtleV0gfHwgW10pLmNvbmNhdChhY3Rpb24uZGF0YSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIFRSRUVfQUNUSU9OUy5SRU5BTUVfUEFSRU5UOlxuICAgICAgICAgICAgaXRlbVt2YWx1ZUtleV0gPSBhY3Rpb24uZGF0YTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBY3Rpb24gdHlwZSBpcyB1bmRlZmluZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtW2NoaWxkS2V5XSAmJiAhZm91bmQpIGZvdW5kID0gdGhpcy5nZXRVcGRhdGVkVHJlZShpZCwgaXRlbVtjaGlsZEtleV0sIGFjdGlvbik7XG4gICAgfVxuXG4gICAgaWYgKCFmb3VuZCkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiBuZXdJdGVtcztcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyByZWN1cnNpdmVseSBhbGwgbGVhZiBpdGVtcyBmcm9tIGEgZ2l2ZW4gYXJyYXlcbiAgICogQHBhcmFtIGFycmF5XG4gICAqIEBwYXJhbSBhbHJlYWR5Rm91bmQgKHVzZWQgcmVjdXJzaXZlbHkpXG4gICAqL1xuICBnZXRBbGxMZWFmcyA9IChhcnJheSwgYWxyZWFkeUZvdW5kID0gW10pID0+IHtcbiAgICBjb25zdCB7IGNoaWxkS2V5IH0gPSB0aGlzLnByb3BzO1xuICAgIGxldCBsZWFmcyA9IGFscmVhZHlGb3VuZDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSBhcnJheVtpXTtcbiAgICAgIGlmIChpdGVtW2NoaWxkS2V5XSkge1xuICAgICAgICBsZWFmcyA9IHRoaXMuZ2V0QWxsTGVhZnMoaXRlbVtjaGlsZEtleV0sIGFscmVhZHlGb3VuZCk7XG4gICAgICB9XG4gICAgICBpZiAoIWl0ZW1bY2hpbGRLZXldKSBsZWFmcy5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgICByZXR1cm4gbGVhZnM7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSB0cmVlIGl0ZW0gYnkgSURcbiAgICogQHBhcmFtIGlkXG4gICAqIEBwYXJhbSBhcnJheVxuICAgKiBAcGFyYW0gcmV0dXJuUGFyZW50IC0gcmV0dXJuIGl0ZW0ncyBwYXJlbnQgaW5zdGVhZCBvZiB0aGUgaXRlbVxuICAgKiBAcGFyYW0gcGFyZW50IC0gcGFyZW50IGl0ZW0gKHVzZWQgcmVjdXJzaXZlbHkpXG4gICAqIEByZXR1cm5zIHt7fX1cbiAgICovXG4gIGdldFRyZWVJdGVtID0gKGlkLCBhcnJheSA9IHRoaXMucHJvcHMudHJlZURhdGEsIHJldHVyblBhcmVudCA9IGZhbHNlLCBwYXJlbnQgPSBudWxsKSA9PiB7XG4gICAgY29uc3QgeyBjaGlsZEtleSwgaWRLZXkgfSA9IHRoaXMucHJvcHM7XG4gICAgbGV0IGZvdW5kID0gYXJyYXkuZmluZChpdGVtID0+IGl0ZW1baWRLZXldID09PSBpZCk7XG5cbiAgICBpZiAoZm91bmQgJiYgcmV0dXJuUGFyZW50KSBmb3VuZCA9IHBhcmVudDtcblxuICAgIGlmICghZm91bmQpIHtcbiAgICAgIGFycmF5LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgaWYgKGl0ZW1bY2hpbGRLZXldICYmICFmb3VuZCkge1xuICAgICAgICAgIGZvdW5kID0gdGhpcy5nZXRUcmVlSXRlbShpZCwgaXRlbVtjaGlsZEtleV0sIHJldHVyblBhcmVudCwgaXRlbSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gZm91bmQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIEdldCBhZGphY2VudCBpdGVtIChpZCkgaW4gcGFyZW50IGFycmF5LiBVc2VkIHdoZW4gbW92aW5nIGl0ZW1zIGZyb20gdHJlZVxuICAgKiB0byBncmlkL2RlbGV0aW5nIGFuIGl0ZW1cbiAgICogQHBhcmFtIGlkXG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgZ2V0QWRqYWNlbnRJdGVtID0gKGlkKSA9PiB7XG4gICAgaWYgKCFpZCkgcmV0dXJuIG51bGw7XG4gICAgY29uc3QgeyBjaGlsZEtleSwgaWRLZXksIHRyZWVEYXRhIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgZ2V0QWRqYWNlbnRJdGVtSWQgPSAocGFyZW50KSA9PiB7XG4gICAgICBjb25zdCBwYXJlbnRBcnIgPSBBcnJheS5pc0FycmF5KHBhcmVudCkgPyBwYXJlbnQgOiBwYXJlbnRbY2hpbGRLZXldO1xuICAgICAgY29uc3QgaW5kZXggPSBwYXJlbnRBcnIuZmluZEluZGV4KGNoaWxkID0+IGNoaWxkW2lkS2V5XSA9PT0gaWQpO1xuICAgICAgbGV0IGFkamFjZW50SXRlbSA9IHBhcmVudEFycltpbmRleCArIDFdO1xuICAgICAgaWYgKCFhZGphY2VudEl0ZW0pIGFkamFjZW50SXRlbSA9IHBhcmVudEFycltpbmRleCAtIDFdO1xuICAgICAgaWYgKCFhZGphY2VudEl0ZW0gJiYgIUFycmF5LmlzQXJyYXkocGFyZW50KSkgYWRqYWNlbnRJdGVtID0gcGFyZW50O1xuICAgICAgaWYgKCFhZGphY2VudEl0ZW0pIHJldHVybiBudWxsO1xuXG4gICAgICByZXR1cm4gYWRqYWNlbnRJdGVtW2lkS2V5XTtcbiAgICB9O1xuXG4gICAgY29uc3QgcGFyZW50ID0gdGhpcy5nZXRUcmVlSXRlbShpZCwgdGhpcy5wcm9wcy50cmVlRGF0YSwgdHJ1ZSk7XG4gICAgcmV0dXJuIHBhcmVudCA/IGdldEFkamFjZW50SXRlbUlkKHBhcmVudCkgOiBnZXRBZGphY2VudEl0ZW1JZCh0cmVlRGF0YSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYWxsIElEcyBpbiB0aGUgdHJlZVxuICAgKiBAcGFyYW0gYXJyYXlcbiAgICovXG4gIGdldEFsbFBhcmVudElkcyA9IChhcnJheSA9IHRoaXMucHJvcHMudHJlZURhdGEpID0+IHtcbiAgICBjb25zdCB7IGlkS2V5LCBjaGlsZEtleSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBjYiA9IChhY2MsIGl0ZW0pID0+IHtcbiAgICAgIGxldCB0b3RhbCA9IGFjYztcbiAgICAgIGlmIChpdGVtW2NoaWxkS2V5XSAmJiBpdGVtW2NoaWxkS2V5XS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRvdGFsID0gYWNjLmNvbmNhdChpdGVtW2lkS2V5XSk7XG4gICAgICAgIHJldHVybiBpdGVtW2NoaWxkS2V5XS5yZWR1Y2UoY2IsIHRvdGFsKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0b3RhbDtcbiAgICB9O1xuICAgIHJldHVybiBhcnJheS5yZWR1Y2UoY2IsIFtdKTtcbiAgfTtcblxuICAvKipcbiAgICogQXBwZW5kcyBwcm92aWRlZCBpdGVtcyB0byB0aGUgZ3JpZFxuICAgKiBAcGFyYW0gaXRlbXMgLSBpbW11dGFibGUgYXJyYXkgb2YgaXRlbXMgdG8gYmUgYXBwZW5kZWQgdG8gZ3JpZFxuICAgKiBAcGFyYW0gc2V0TmV3SXRlbXMgLSBzZXQgY29tcGxldGVseSBhIG5ldyBhcnJheSBvZiBpdGVtc1xuICAgKi9cbiAgc2V0RGF0YVRvR3JpZCA9IChpdGVtcywgc2V0TmV3SXRlbXMgPSBmYWxzZSkgPT4ge1xuICAgIGxldCBkYXRhID0gTGlzdCgpO1xuICAgIGNvbnN0IHsgZ3JpZCwgZ3JpZENvbHVtbnMsIGdyaWREYXRhIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghc2V0TmV3SXRlbXMpIGRhdGEgPSBncmlkRGF0YS5zbGljZSgpO1xuICAgIGNvbnN0IG5ld0dyaWRJdGVtcyA9IGRhdGEuY29uY2F0KGl0ZW1zKTtcblxuICAgIHRoaXMucHJvcHMuc2V0RGF0YShncmlkLCBncmlkQ29sdW1ucywgbmV3R3JpZEl0ZW1zKTtcbiAgICB0aGlzLnByb3BzLmNsZWFyU2VsZWN0ZWRJdGVtcyhncmlkKTtcbiAgfTtcblxuICAvKipcbiAgICogRXhwYW5kcyBhIHBhcmVudFxuICAgKiBAcGFyYW0gcGFyZW50SWRcbiAgICovXG4gIGV4cGFuZFBhcmVudCA9IChwYXJlbnRJZCkgPT4ge1xuICAgIGlmIChwYXJlbnRJZCAmJiAhdGhpcy5zdGF0ZS5leHBhbmRlZEtleXMuZmluZChleHBhbmRlZElkID0+IGV4cGFuZGVkSWQgPT09IHBhcmVudElkKSkge1xuICAgICAgY29uc3QgbmV3RXhwYW5kZWRLZXlzID0gdGhpcy5zdGF0ZS5leHBhbmRlZEtleXMuc2xpY2UoKTtcbiAgICAgIG5ld0V4cGFuZGVkS2V5cy5wdXNoKHBhcmVudElkKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBleHBhbmRlZEtleXM6IG5ld0V4cGFuZGVkS2V5cyB9KTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIENsb3NlcyBkZWxldGUgY29uZmlybWF0aW9uIGRpYWxvZ1xuICAgKi9cbiAgY2xvc2VEZWxldGVDb25maXJtYXRpb25EaWFsb2cgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNob3dEZWxldGVDb25maXJtYXRpb246IGZhbHNlIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBEZWxldGVzIGEgcGFyZW50IG5vZGVcbiAgICovXG4gIGRlbGV0ZVBhcmVudCA9ICgpID0+IHtcbiAgICBjb25zdCB7IG9uQ2hhbmdlLCB0cmVlRGF0YSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzZWxlY3RlZEtleSA9IHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdO1xuICAgIGNvbnN0IGFjdGlvbiA9IHtcbiAgICAgIHR5cGU6IFRSRUVfQUNUSU9OUy5ERUxFVEVfUEFSRU5ULFxuICAgIH07XG4gICAgY29uc3QgbmV4dFNlbGVjdGVkS2V5ID0gdGhpcy5nZXRBZGphY2VudEl0ZW0oc2VsZWN0ZWRLZXkpO1xuICAgIGNvbnN0IG5ld0l0ZW1zID0gdGhpcy5nZXRVcGRhdGVkVHJlZShzZWxlY3RlZEtleSwgdHJlZURhdGEsIGFjdGlvbik7XG4gICAgaWYgKG9uQ2hhbmdlKSBvbkNoYW5nZShuZXdJdGVtcyk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzZWxlY3RlZEtleXM6IFtuZXh0U2VsZWN0ZWRLZXldLFxuICAgICAgc2hvd0RlbGV0ZUNvbmZpcm1hdGlvbjogZmFsc2UsXG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBhIG1vdmUgaXMgcGVybWl0dGVkIGJlZm9yZSBjYWxsaW5nIFRyZWUgY29tcG9uZW50J3Mgb25EcmFnRHJvcCBjYWxsYmFja1xuICAgKiBAcGFyYW0gaXRlbXNcbiAgICogQHBhcmFtIGVcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBpc0RyYWdEcm9wTGVnYWwgPSAoaXRlbXMsIGUpID0+IHtcbiAgICBjb25zdCB7IGNoaWxkS2V5LCB0cmVlRGF0YSwgb25EcmFnRHJvcFByZXZlbnQgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgZHJvcEl0ZW0gPSB0aGlzLmdldFRyZWVJdGVtKGUubm9kZS5wcm9wcy5ldmVudEtleSk7XG4gICAgY29uc3QgZHJhZ0l0ZW0gPSB0aGlzLmdldFRyZWVJdGVtKGUuZHJhZ05vZGUucHJvcHMuZXZlbnRLZXkpO1xuICAgIGNvbnN0IGRyb3BJdGVtUGFyZW50ID0gdGhpcy5nZXRUcmVlSXRlbShlLm5vZGUucHJvcHMuZXZlbnRLZXksIHRyZWVEYXRhLCB0cnVlKTtcblxuICAgIC8qKlxuICAgICAqIFdlIHdhbnQgdG8gcHJldmVudCB0aGUgbW92ZSwgaWY6XG4gICAgICogLSBTZWxlY3RlZCBpdGVtIGlzIGEgcGFyZW50LCBhbmQgLi5cbiAgICAgKiAgICAtIERyb3BwaW5nIG92ZXIgYW4gaXRlbSwgYW5kIC4uXG4gICAgICogICAgICAtIE5ldyBwYXJlbnQgaGFzIGxlYWZzIE9SIG5ldyBwYXJlbnQgaXMgYSBsZWFmXG4gICAgICogICAgLSBEcm9wcGluZyBiZXR3ZWVuIGl0ZW1zLCBhbmQgLi5cbiAgICAgKiAgICAgICAgLSBOZXcgcGFyZW50J3MgcGFyZW50IGhhcyBsZWFmc1xuICAgICAqICAtIFNlbGVjdGVkIGl0ZW0gaXMgYSBsZWFmLCBhbmQgLi4uXG4gICAgICovXG4gICAgaWYgKGRyYWdJdGVtW2NoaWxkS2V5XSkge1xuICAgICAgaWYgKFxuICAgICAgICAoIWUuZHJvcFRvR2FwICYmICh0aGlzLmhhc0xlYWZzKGRyb3BJdGVtKSB8fCAhZHJvcEl0ZW1bY2hpbGRLZXldKSkgfHxcbiAgICAgICAgKGRyb3BJdGVtUGFyZW50ICYmIGUuZHJvcFRvR2FwICYmICh0aGlzLmhhc0xlYWZzKGRyb3BJdGVtUGFyZW50KSkpXG4gICAgICApIHtcbiAgICAgICAgaWYgKG9uRHJhZ0Ryb3BQcmV2ZW50KSBvbkRyYWdEcm9wUHJldmVudCgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIChkcm9wSXRlbSAmJiAhZS5kcm9wVG9HYXAgJiYgdGhpcy5oYXNQYXJlbnRzKGRyb3BJdGVtKSkgfHxcbiAgICAgIChkcm9wSXRlbVBhcmVudCAmJiBlLmRyb3BUb0dhcCAmJiB0aGlzLmhhc1BhcmVudHMoZHJvcEl0ZW1QYXJlbnQpKSB8fFxuICAgICAgKGUuZHJvcFRvR2FwICYmICFkcm9wSXRlbVBhcmVudCkgfHxcbiAgICAgICghZS5kcm9wVG9HYXAgJiYgIWRyb3BJdGVtW2NoaWxkS2V5XSlcbiAgICApIHtcbiAgICAgIC8vIEl0ZW0gaGFzIGdvdCBwYXJlbnQgYXMgYSBjaGlsZCAtIGxlYWYgY2Fubm90IGJlIGRyb3BwZWQgaGVyZVxuICAgICAgaWYgKG9uRHJhZ0Ryb3BQcmV2ZW50KSBvbkRyYWdEcm9wUHJldmVudCgpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuXG4gIGlzQWxsRXhwYW5kZWQgPSAoKSA9PlxuICAgIHRoaXMuc3RhdGUuZXhwYW5kZWRLZXlzLmxlbmd0aCA9PT0gdGhpcy5nZXRBbGxQYXJlbnRJZHMoKS5sZW5ndGg7XG5cbiAgaGFzTGVhZnMgPSAoaXRlbSkgPT4ge1xuICAgIGNvbnN0IHsgY2hpbGRLZXkgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFpdGVtW2NoaWxkS2V5XSkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiAhIWl0ZW1bY2hpbGRLZXldLmZpbmQoY2hpbGQgPT4gIWNoaWxkW2NoaWxkS2V5XSk7XG4gIH07XG5cbiAgaGFzUGFyZW50cyA9IChpdGVtKSA9PiB7XG4gICAgY29uc3QgeyBjaGlsZEtleSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIWl0ZW1bY2hpbGRLZXldKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuICEhaXRlbVtjaGlsZEtleV0uZmluZChjaGlsZCA9PiBjaGlsZFtjaGlsZEtleV0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBEZXNlbGVjdHMgYW4gaXRlbSwgaWYgaXQgaXMgZS5nLiByZW1vdmVkXG4gICAqL1xuICBkZXNlbGVjdEl0ZW0gPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkS2V5czogW10gfSk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHZhbHVlS2V5LCBpZEtleSwgdHJlZURhdGEsIGdyaWQsIGdyaWRDb2x1bW5zLCBjbGFzc05hbWUsIHRyYW5zbGF0aW9ucyxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IG1lcmdlZEdyaWQgPSBPYmplY3QuYXNzaWduKHt9LCBncmlkLCB7IGRlZmF1bHRTaG93RmlsdGVyaW5nUm93OiB0cnVlIH0pO1xuICAgIGNvbnN0IG1lcmdlZFRyYW5zbGF0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRUcmFuc2xhdGlvbnMsIHRyYW5zbGF0aW9ucyk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPFJlYWN0LkZyYWdtZW50PlxuICAgICAgICA8Q29udGFpbmVyIGNsYXNzTmFtZT17Y2xhc3NOYW1lfT5cbiAgICAgICAgICA8VHJlZUNvbnRhaW5lcj5cbiAgICAgICAgICAgIDxDb250cm9sQmFyXG4gICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICBvbkFkZE5ld0NsaWNrPXt0aGlzLm9uQWRkTmV3Q2xpY2t9XG4gICAgICAgICAgICAgIG9uRGVsZXRlQ2xpY2s9e3RoaXMub25EZWxldGVDbGlja31cbiAgICAgICAgICAgICAgb25JbnB1dENoYW5nZT17dGhpcy5vbklucHV0Q2hhbmdlfVxuICAgICAgICAgICAgICBvbkV4cGFuZEFsbENsaWNrPXt0aGlzLm9uRXhwYW5kQWxsfVxuICAgICAgICAgICAgICBleHBhbmRBbGw9e3RoaXMuaXNBbGxFeHBhbmRlZCgpfVxuICAgICAgICAgICAgICBzZWxlY3RlZFRyZWVJdGVtPXt0aGlzLmdldFRyZWVJdGVtKHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdKX1cbiAgICAgICAgICAgICAgaGVpZ2h0PXtBQ1RJT05fQkFSX0NPTlRBSU5FUl9IRUlHSFR9XG4gICAgICAgICAgICAgIHRyYW5zbGF0aW9ucz17bWVyZ2VkVHJhbnNsYXRpb25zfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxQZXJmZWN0U2Nyb2xsYmFyPlxuICAgICAgICAgICAgICB7ISF0cmVlRGF0YS5sZW5ndGggJiYgPFRyZWVDb21wb25lbnRcbiAgICAgICAgICAgICAgICB0cmVlRGF0YT17dHJlZURhdGF9XG4gICAgICAgICAgICAgICAgZGF0YUxvb2tVcEtleT17aWRLZXl9XG4gICAgICAgICAgICAgICAgZGF0YUxvb2tVcFZhbHVlPXt2YWx1ZUtleX1cbiAgICAgICAgICAgICAgICBvblNlbGVjdD17dGhpcy5vblRyZWVJdGVtU2VsZWN0fVxuICAgICAgICAgICAgICAgIG9uRHJhZ0Ryb3A9e3RoaXMub25UcmVlSXRlbURyYWdEcm9wfVxuICAgICAgICAgICAgICAgIG9uRXhwYW5kPXt0aGlzLm9uRXhwYW5kfVxuICAgICAgICAgICAgICAgIGNoZWNrYWJsZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRLZXlzPXt0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c31cbiAgICAgICAgICAgICAgICBleHBhbmRlZEtleXM9e3RoaXMuc3RhdGUuZXhwYW5kZWRLZXlzfVxuICAgICAgICAgICAgICAgIGlzRHJhZ0Ryb3BMZWdhbD17dGhpcy5pc0RyYWdEcm9wTGVnYWx9XG4gICAgICAgICAgICAgICAgc2VsZWN0YWJsZVxuICAgICAgICAgICAgICAgIGRyYWdnYWJsZVxuICAgICAgICAgICAgICAvPn1cbiAgICAgICAgICAgICAgeyF0cmVlRGF0YS5sZW5ndGggJiYgPE5vSXRlbXNUZXh0PnttZXJnZWRUcmFuc2xhdGlvbnMubm9UcmVlSXRlbXN9PC9Ob0l0ZW1zVGV4dD59XG4gICAgICAgICAgICA8L1BlcmZlY3RTY3JvbGxiYXI+XG4gICAgICAgICAgPC9UcmVlQ29udGFpbmVyPlxuICAgICAgICAgIDxBcnJvd0NvbnRyb2xzXG4gICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgIHNlbGVjdGVkVHJlZUl0ZW09e3RoaXMuZ2V0VHJlZUl0ZW0odGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF0pfVxuICAgICAgICAgICAgb25Nb3ZlVG9UcmVlQ2xpY2s9e3RoaXMub25Nb3ZlVG9UcmVlQ2xpY2t9XG4gICAgICAgICAgICBvbk1vdmVUb0dyaWRDbGljaz17dGhpcy5vbk1vdmVUb0dyaWRDbGlja31cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxHcmlkXG4gICAgICAgICAgICBncmlkPXttZXJnZWRHcmlkfVxuICAgICAgICAgICAgY29sdW1ucz17Z3JpZENvbHVtbnN9XG4gICAgICAgICAgICByb3dTZWxlY3RcbiAgICAgICAgICAgIG11bHRpU2VsZWN0XG4gICAgICAgICAgICBmaWx0ZXJpbmdcbiAgICAgICAgICAgIHJvd1NlbGVjdENoZWNrYm94Q29sdW1uXG4gICAgICAgICAgICBncmlkSGVhZGVyPXs8UHJpbWl0aXZlLlN1YnRpdGxlPnttZXJnZWRUcmFuc2xhdGlvbnMuZ3JpZFRpdGxlfTwvUHJpbWl0aXZlLlN1YnRpdGxlPn1cbiAgICAgICAgICAvPlxuXG4gICAgICAgIDwvQ29udGFpbmVyPlxuICAgICAgICB7dGhpcy5zdGF0ZS5zaG93RGVsZXRlQ29uZmlybWF0aW9uICYmXG4gICAgICAgIDxDb25maXJtRGlhbG9nXG4gICAgICAgICAgdHJhbnNsYXRpb25zPXttZXJnZWRUcmFuc2xhdGlvbnMuZGVsZXRlQ29uZmlybURpYWxvZ31cbiAgICAgICAgICBjb25maXJtQ2FsbGJhY2s9e3RoaXMuZGVsZXRlUGFyZW50fVxuICAgICAgICAgIGNhbmNlbENhbGxiYWNrPXt0aGlzLmNsb3NlRGVsZXRlQ29uZmlybWF0aW9uRGlhbG9nfVxuICAgICAgICAvPlxuICAgICAgICB9XG4gICAgICA8L1JlYWN0LkZyYWdtZW50PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==