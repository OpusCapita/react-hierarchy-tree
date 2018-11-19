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

      onChange(items);
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

        onChange(newItems);
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
      onChange(newItems);
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
      onChange(newItems);
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
      onChange(newItems);
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
      onChange(newItems);
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
      console.log(this.getAllParentIds());
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
  defaultExpandAll: true
}, _temp)) || _class);
export { HierarchyTreeSelector as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlRyZWVDb21wb25lbnQiLCJQZXJmZWN0U2Nyb2xsYmFyIiwiUHJpbWl0aXZlIiwiRGF0YWdyaWQiLCJncmlkU2hhcGUiLCJncmlkQ29sdW1uU2hhcGUiLCJEYXRhZ3JpZEFjdGlvbnMiLCJDb25maXJtRGlhbG9nIiwiUmVhY3QiLCJzdHlsZWQiLCJMaXN0IiwiZnJvbUpTIiwiSW1tdXRhYmxlUHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwiY29ubmVjdCIsIkNvbnRyb2xCYXIiLCJBcnJvd0NvbnRyb2xzIiwiZGVmYXVsdFRyYW5zbGF0aW9ucyIsIkFDVElPTl9CQVJfQ09OVEFJTkVSX0hFSUdIVCIsIlRSRUVfQUNUSU9OUyIsIkFERF9DSElMRFJFTiIsIk1PVkVfTEVBRiIsIlJFTkFNRV9QQVJFTlQiLCJERUxFVEVfUEFSRU5UIiwiR3JpZCIsInByb3BzIiwidGhlbWUiLCJjb2xvcnMiLCJjb2xvckxpZ2h0R3JheSIsIkNvbnRhaW5lciIsImRpdiIsIlRyZWVDb250YWluZXIiLCJndXR0ZXJXaWR0aCIsIk5vSXRlbXNUZXh0IiwicCIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsInNldERhdGEiLCJjbGVhclNlbGVjdGVkSXRlbXMiLCJtYXBTdGF0ZVRvUHJvcHMiLCJzdGF0ZSIsImdyaWRJZCIsImdyaWQiLCJpZCIsInNlbGVjdGVkR3JpZEl0ZW1zIiwiZGF0YWdyaWQiLCJnZXRJbiIsImdyaWREYXRhIiwiSGllcmFyY2h5VHJlZVNlbGVjdG9yIiwib25UcmVlSXRlbVNlbGVjdCIsInNlbGVjdGVkS2V5cyIsIm9uU2VsZWN0Iiwic2V0U3RhdGUiLCJvblRyZWVJdGVtRHJhZ0Ryb3AiLCJpdGVtcyIsIm9uQ2hhbmdlIiwib25EZWxldGVDbGljayIsInNob3dEZWxldGVDb25maXJtYXRpb24iLCJvbkFkZE5ld0NsaWNrIiwiZGF0YSIsImNhbGxiYWNrIiwidHJlZURhdGEiLCJpZEtleSIsIm5ld0l0ZW1zIiwic2xpY2UiLCJwdXNoIiwiYWN0aW9uIiwidHlwZSIsImdldFVwZGF0ZWRUcmVlIiwicGFyZW50IiwiZ2V0VHJlZUl0ZW0iLCJleHBhbmRQYXJlbnQiLCJvbk1vdmVUb0dyaWRDbGljayIsInNlbGVjdGVkS2V5IiwibmV4dFNlbGVjdGVkS2V5IiwiZ2V0QWRqYWNlbnRJdGVtIiwibmV3R3JpZEl0ZW1zIiwic2V0RGF0YVRvR3JpZCIsIm9uTW92ZVRvVHJlZUNsaWNrIiwic2VsZWN0ZWRJZCIsImZpbHRlciIsImluY2x1ZGVzIiwiaSIsImdldCIsInRvSlMiLCJpdGVtIiwib25JbnB1dENoYW5nZSIsInZhbHVlIiwib25FeHBhbmQiLCJpZHMiLCJleHBhbmRlZEtleXMiLCJvbkV4cGFuZEFsbCIsIm5ld0V4cGFuZGVkSXRlbXMiLCJpc0FsbEV4cGFuZGVkIiwiZ2V0QWxsUGFyZW50SWRzIiwiYXJyYXkiLCJmb3VuZCIsImNoaWxkS2V5IiwidmFsdWVLZXkiLCJyZW1vdmVBY3Rpb25zIiwicm9vdEl0ZW0iLCJmaW5kIiwibGVuZ3RoIiwiZ2V0QWxsTGVhZnMiLCJkZXNlbGVjdEl0ZW0iLCJjaGlsZCIsImZpbHRlcmVkQ2hpbGRyZW4iLCJjaGlsZEl0ZW0iLCJjb25jYXQiLCJUeXBlRXJyb3IiLCJhbHJlYWR5Rm91bmQiLCJsZWFmcyIsInJldHVyblBhcmVudCIsImZvckVhY2giLCJnZXRBZGphY2VudEl0ZW1JZCIsInBhcmVudEFyciIsIkFycmF5IiwiaXNBcnJheSIsImluZGV4IiwiZmluZEluZGV4IiwiYWRqYWNlbnRJdGVtIiwiY2IiLCJhY2MiLCJ0b3RhbCIsInJlZHVjZSIsInNldE5ld0l0ZW1zIiwiZ3JpZENvbHVtbnMiLCJwYXJlbnRJZCIsImV4cGFuZGVkSWQiLCJuZXdFeHBhbmRlZEtleXMiLCJjbG9zZURlbGV0ZUNvbmZpcm1hdGlvbkRpYWxvZyIsImRlbGV0ZVBhcmVudCIsImlzRHJhZ0Ryb3BMZWdhbCIsImUiLCJvbkRyYWdEcm9wUHJldmVudCIsImRyb3BJdGVtIiwibm9kZSIsImV2ZW50S2V5IiwiZHJhZ0l0ZW0iLCJkcmFnTm9kZSIsImRyb3BJdGVtUGFyZW50IiwiZHJvcFRvR2FwIiwiaGFzTGVhZnMiLCJoYXNQYXJlbnRzIiwiZGVmYXVsdEV4cGFuZEFsbCIsImNvbXBvbmVudERpZE1vdW50IiwiY29uc29sZSIsImxvZyIsInJlbmRlciIsImNsYXNzTmFtZSIsInRyYW5zbGF0aW9ucyIsIm1lcmdlZEdyaWQiLCJPYmplY3QiLCJhc3NpZ24iLCJkZWZhdWx0U2hvd0ZpbHRlcmluZ1JvdyIsIm1lcmdlZFRyYW5zbGF0aW9ucyIsIm5vVHJlZUl0ZW1zIiwiZ3JpZFRpdGxlIiwiZGVsZXRlQ29uZmlybURpYWxvZyIsInRpdGxlVGV4dCIsImJvZHlUZXh0Iiwib2tCdXR0b25UZXh0IiwiY2FuY2VsQnV0dG9uVGV4dCIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiLCJ1bmRlZmluZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBT0EsYUFBUCxNQUEwQiw0QkFBMUI7QUFDQSxPQUFPQyxnQkFBUCxNQUE2QixxQ0FBN0I7QUFDQSxTQUFTQyxTQUFULFFBQTBCLGtDQUExQjtBQUNBLFNBQVNDLFFBQVQsRUFBbUJDLFNBQW5CLEVBQThCQyxlQUE5QixFQUErQ0MsZUFBL0MsUUFBc0Usd0JBQXRFO0FBQ0EsU0FBU0MsYUFBVCxRQUE4Qix1Q0FBOUI7O0FBRUEsT0FBT0MsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLE1BQVAsTUFBbUIsbUJBQW5CO0FBQ0EsU0FBU0MsSUFBVCxFQUFlQyxNQUFmLFFBQTZCLFdBQTdCO0FBQ0EsT0FBT0Msa0JBQVAsTUFBK0IsMkJBQS9CO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLFNBQVNDLE9BQVQsUUFBd0IsYUFBeEI7O0FBR0E7QUFDQSxPQUFPQyxVQUFQLE1BQXVCLGlEQUF2QjtBQUNBLE9BQU9DLGFBQVAsTUFBMEIsb0RBQTFCO0FBQ0EsU0FBU0MsbUJB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SSxnQkFQZ0I7QUFRcEIyRixxQkFBbUIrQixTQVJDO0FBU3BCbEgsWUFBVWtILFNBVFU7QUFVcEJyQixvQkFBa0I7QUFWRSxDO1NBdkJIaEcscUIiLCJmaWxlIjoiaGllcmFyY2h5LXRyZWUtc2VsZWN0b3IuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRyZWVDb21wb25lbnQgZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtdHJlZXZpZXcnO1xuaW1wb3J0IFBlcmZlY3RTY3JvbGxiYXIgZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtcGVyZmVjdC1zY3JvbGxiYXInO1xuaW1wb3J0IHsgUHJpbWl0aXZlIH0gZnJvbSAnQG9wdXNjYXBpdGEvb2MtY20tY29tbW9uLWxheW91dHMnO1xuaW1wb3J0IHsgRGF0YWdyaWQsIGdyaWRTaGFwZSwgZ3JpZENvbHVtblNoYXBlLCBEYXRhZ3JpZEFjdGlvbnMgfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1ncmlkJztcbmltcG9ydCB7IENvbmZpcm1EaWFsb2cgfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1jb25maXJtYXRpb24tZGlhbG9nJztcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHsgTGlzdCwgZnJvbUpTIH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCBJbW11dGFibGVQcm9wVHlwZXMgZnJvbSAncmVhY3QtaW1tdXRhYmxlLXByb3B0eXBlcyc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuXG4vLyBBcHAgaW1wb3J0c1xuaW1wb3J0IENvbnRyb2xCYXIgZnJvbSAnLi9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci1jb250cm9sLWJhci5jb21wb25lbnQnO1xuaW1wb3J0IEFycm93Q29udHJvbHMgZnJvbSAnLi9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci1hcnJvdy1jb250cm9scy5jb21wb25lbnQnO1xuaW1wb3J0IHsgZGVmYXVsdFRyYW5zbGF0aW9ucyB9IGZyb20gJy4vaGllcmFyY2h5LXRyZWUudXRpbHMnO1xuXG5jb25zdCBBQ1RJT05fQkFSX0NPTlRBSU5FUl9IRUlHSFQgPSAnNTdweCc7XG5jb25zdCBUUkVFX0FDVElPTlMgPSB7XG4gIEFERF9DSElMRFJFTjogJ0FERF9DSElMRFJFTicsXG4gIE1PVkVfTEVBRjogJ01PVkVfTEVBRicsXG4gIFJFTkFNRV9QQVJFTlQ6ICdSRU5BTUVfUEFSRU5UJyxcbiAgREVMRVRFX1BBUkVOVDogJ0RFTEVURV9QQVJFTlQnLFxufTtcblxuY29uc3QgR3JpZCA9IHN0eWxlZChEYXRhZ3JpZClgXG4gIGhlaWdodDogMTAwJTtcbiAgJiYmIHtcbiAgICBwYWRkaW5nOiAwO1xuICB9XG4gIC5vYy1kYXRhZ3JpZC1tYWluLWNvbnRhaW5lciB7XG4gICAgYm9yZGVyOiAxcHggc29saWQgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5jb2xvcnMuY29sb3JMaWdodEdyYXl9O1xuICAgIGJvcmRlci10b3A6bm9uZTtcbiAgfVxuYDtcblxuY29uc3QgQ29udGFpbmVyID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogZmxleDtcbiAgbWluLWhlaWdodDogMzAwcHg7XG4gID4gZGl2IHtcbiAgICB3aWR0aDogNTAlO1xuICAgIGZsZXg6IDEgMSAxMDAlO1xuICB9XG5gO1xuXG5jb25zdCBUcmVlQ29udGFpbmVyID0gc3R5bGVkLmRpdmBcbiAgaGVpZ2h0OjEwMCU7XG4gIC5vYy1zY3JvbGxiYXItY29udGFpbmVyIHtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAke3Byb3BzID0+IHByb3BzLnRoZW1lLmNvbG9ycy5jb2xvckxpZ2h0R3JheX07XG4gICAgaGVpZ2h0OiBjYWxjKDEwMCUgLSAke0FDVElPTl9CQVJfQ09OVEFJTkVSX0hFSUdIVH0pO1xuICAgIHBhZGRpbmc6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuZ3V0dGVyV2lkdGh9O1xuICB9XG4gIC5vYy1yZWFjdC10cmVlIHtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgLnJjLXRyZWUtaWNvbkVsZS5yYy10cmVlLWljb25fX2N1c3RvbWl6ZSB7XG4gICAgICAgIGRpc3BsYXk6bm9uZTtcbiAgICB9XG4gIH1cbmA7XG5cbmNvbnN0IE5vSXRlbXNUZXh0ID0gc3R5bGVkLnBgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBmb250LXdlaWdodDogYm9sZDtcbmA7XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IHtcbiAgc2V0RGF0YTogRGF0YWdyaWRBY3Rpb25zLnNldERhdGEsXG4gIGNsZWFyU2VsZWN0ZWRJdGVtczogRGF0YWdyaWRBY3Rpb25zLmNsZWFyU2VsZWN0ZWRJdGVtcyxcbn07XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSwgcHJvcHMpID0+IHtcbiAgY29uc3QgZ3JpZElkID0gcHJvcHMuZ3JpZC5pZDtcbiAgcmV0dXJuIHtcbiAgICBzZWxlY3RlZEdyaWRJdGVtczogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW2dyaWRJZCwgJ3NlbGVjdGVkSXRlbXMnXSwgTGlzdCgpKSxcbiAgICBncmlkRGF0YTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW2dyaWRJZCwgJ2FsbERhdGEnXSwgTGlzdCgpKSxcbiAgfTtcbn07XG5cbkBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGllcmFyY2h5VHJlZVNlbGVjdG9yIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgaWRLZXk6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdmFsdWVLZXk6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2hpbGRLZXk6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdHJlZURhdGE6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zaGFwZSh7fSkpLFxuICAgIGdyaWQ6IGdyaWRTaGFwZS5pc1JlcXVpcmVkLFxuICAgIGdyaWRDb2x1bW5zOiBQcm9wVHlwZXMuYXJyYXlPZihncmlkQ29sdW1uU2hhcGUpLmlzUmVxdWlyZWQsXG4gICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHNldERhdGE6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgY2xlYXJTZWxlY3RlZEl0ZW1zOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHNlbGVjdGVkR3JpZEl0ZW1zOiBJbW11dGFibGVQcm9wVHlwZXMubGlzdC5pc1JlcXVpcmVkLFxuICAgIGdyaWREYXRhOiBJbW11dGFibGVQcm9wVHlwZXMubGlzdC5pc1JlcXVpcmVkLFxuICAgIHRyYW5zbGF0aW9uczogUHJvcFR5cGVzLnNoYXBlKHt9KSxcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkZWZhdWx0RXhwYW5kQWxsOiBQcm9wVHlwZXMuYm9vbCxcblxuICAgIC8vIENhbGxiYWNrc1xuICAgIG9uRHJhZ0Ryb3BQcmV2ZW50OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBpZEtleTogJ2lkJyxcbiAgICB2YWx1ZUtleTogJ25hbWUnLFxuICAgIGNoaWxkS2V5OiAnY2hpbGRyZW4nLFxuICAgIHRyZWVEYXRhOiBbXSxcbiAgICBjbGFzc05hbWU6ICcnLFxuICAgIHRyYW5zbGF0aW9uczogZGVmYXVsdFRyYW5zbGF0aW9ucyxcbiAgICBpZDogJ2hpZXJhcmNoeS10cmVlJyxcbiAgICBvbkRyYWdEcm9wUHJldmVudDogdW5kZWZpbmVkLFxuICAgIG9uU2VsZWN0OiB1bmRlZmluZWQsXG4gICAgZGVmYXVsdEV4cGFuZEFsbDogdHJ1ZSxcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIGxldCBleHBhbmRlZEtleXMgPSBbXTtcbiAgICBpZiAocHJvcHMuZGVmYXVsdEV4cGFuZEFsbCAmJiBwcm9wcy50cmVlRGF0YSkge1xuICAgICAgZXhwYW5kZWRLZXlzID0gdGhpcy5nZXRBbGxQYXJlbnRJZHMocHJvcHMudHJlZURhdGEpO1xuICAgIH1cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgc2VsZWN0ZWRLZXlzOiBbXSxcbiAgICAgIGV4cGFuZGVkS2V5cyxcbiAgICAgIHNob3dEZWxldGVDb25maXJtYXRpb246IGZhbHNlLFxuICAgIH07XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBjb25zdCB7IGRlZmF1bHRFeHBhbmRBbGwgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKGRlZmF1bHRFeHBhbmRBbGwpIHtcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuZ2V0QWxsUGFyZW50SWRzKCkpO1xuICAgICAgdGhpcy5vbkV4cGFuZCh0aGlzLmdldEFsbFBhcmVudElkcygpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0cyBhIHRyZWUgaXRlbVxuICAgKiBAcGFyYW0gc2VsZWN0ZWRLZXlzIChhcnJheSlcbiAgICovXG4gIG9uVHJlZUl0ZW1TZWxlY3QgPSAoc2VsZWN0ZWRLZXlzKSA9PiB7XG4gICAgY29uc3QgeyBvblNlbGVjdCB9ID0gdGhpcy5wcm9wcztcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRLZXlzIH0sICgpID0+IHtcbiAgICAgIGlmIChvblNlbGVjdCkgb25TZWxlY3Qoc2VsZWN0ZWRLZXlzKTtcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogRmlyZWQgb24gZHJhZyBuJyBkcm9wXG4gICAqIEBwYXJhbSBpdGVtc1xuICAgKi9cbiAgb25UcmVlSXRlbURyYWdEcm9wID0gKGl0ZW1zKSA9PiB7XG4gICAgY29uc3QgeyBvbkNoYW5nZSB9ID0gdGhpcy5wcm9wcztcbiAgICBvbkNoYW5nZShpdGVtcyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIERpc3BsYXlzIGEgY29uZmlybWF0aW9uIGRpYWxvZ1xuICAgKi9cbiAgb25EZWxldGVDbGljayA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2hvd0RlbGV0ZUNvbmZpcm1hdGlvbjogdHJ1ZSB9KTtcbiAgfTtcblxuXG4gIC8qKlxuICAgKiBBZGRzIGEgbmV3IG5vZGUgdG8gdGhlIHJvb3Qgb2YgdGhlIHRyZWUsIG9yIHVuZGVyIGEgc2VsZWN0ZWQgdHJlZSBub2RlIHVzaW5nXG4gICAqIEFERF9DSElMRFJFTiBhY3Rpb25cbiAgICogQHBhcmFtIGRhdGEgLSBkYXRhIHRvIGJlIGFkZGVkXG4gICAqIEBwYXJhbSBjYWxsYmFja1xuICAgKi9cbiAgb25BZGROZXdDbGljayA9IChkYXRhLCBjYWxsYmFjaykgPT4ge1xuICAgIGNvbnN0IHsgb25DaGFuZ2UsIHRyZWVEYXRhLCBpZEtleSB9ID0gdGhpcy5wcm9wcztcbiAgICBsZXQgbmV3SXRlbXMgPSB0cmVlRGF0YS5zbGljZSgpO1xuXG4gICAgLy8gSWYgbm8gdHJlZSBub2RlIGlzIHNlbGVjdGVkLCB3ZSdsbCBwbGFjZSB0aGUgbmV3IGl0ZW0gdG8gdGhlIHJvb3RcbiAgICAvLyBvZiB0aGUgdHJlZVxuICAgIGlmICghdGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF0pIHtcbiAgICAgIG5ld0l0ZW1zLnB1c2goZGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGFjdGlvbiA9IHtcbiAgICAgICAgdHlwZTogVFJFRV9BQ1RJT05TLkFERF9DSElMRFJFTixcbiAgICAgICAgZGF0YSxcbiAgICAgIH07XG4gICAgICBuZXdJdGVtcyA9IHRoaXMuZ2V0VXBkYXRlZFRyZWUodGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF0sIHRyZWVEYXRhLCBhY3Rpb24pO1xuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRLZXlzOiBbZGF0YVtpZEtleV1dIH0sICgpID0+IHtcbiAgICAgIC8vIElmIHRoZSBwYXJlbnQgaXMgbm90IHlldCBleHBhbmRlZCwgd2Ugd2lsbCBleHBhbmQgaXQgbm93XG4gICAgICBjb25zdCBwYXJlbnQgPSB0aGlzLmdldFRyZWVJdGVtKGRhdGFbaWRLZXldLCB0cmVlRGF0YSwgdHJ1ZSkgfHwge307XG4gICAgICB0aGlzLmV4cGFuZFBhcmVudChwYXJlbnRbaWRLZXldKTtcblxuICAgICAgb25DaGFuZ2UobmV3SXRlbXMpO1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogUmVtb3ZlcyB0aGUgY2hvc2VuIGl0ZW0gZnJvbSBhIHRyZWUgYW5kIHVwZGF0ZXMgdGhlIGdyaWQgdXNpbmcgTU9WRV9MRUFGXG4gICAqIGFjdGlvblxuICAgKi9cbiAgb25Nb3ZlVG9HcmlkQ2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3QgeyB0cmVlRGF0YSwgb25DaGFuZ2UgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgc2VsZWN0ZWRLZXkgPSB0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXTtcbiAgICBjb25zdCBhY3Rpb24gPSB7XG4gICAgICB0eXBlOiBUUkVFX0FDVElPTlMuTU9WRV9MRUFGLFxuICAgICAgZGF0YTogdGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF0sXG4gICAgfTtcbiAgICBjb25zdCBuZXh0U2VsZWN0ZWRLZXkgPSB0aGlzLmdldEFkamFjZW50SXRlbShzZWxlY3RlZEtleSk7XG4gICAgY29uc3QgbmV3R3JpZEl0ZW1zID0gZnJvbUpTKFt0aGlzLmdldFRyZWVJdGVtKHNlbGVjdGVkS2V5KV0pO1xuICAgIGNvbnN0IG5ld0l0ZW1zID0gdGhpcy5nZXRVcGRhdGVkVHJlZShzZWxlY3RlZEtleSwgdHJlZURhdGEsIGFjdGlvbik7XG5cbiAgICB0aGlzLnNldERhdGFUb0dyaWQobmV3R3JpZEl0ZW1zKTtcbiAgICBvbkNoYW5nZShuZXdJdGVtcyk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzZWxlY3RlZEtleXM6IFtuZXh0U2VsZWN0ZWRLZXldLFxuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBZGRzIHNlbGVjdGVkIGdyaWQgaXRlbXMgdG8gdGhlIGNob3NlbiB0cmVlIG5vZGUgdXNpbmcgQUREX0NISUxEUkVOIGFjdGlvblxuICAgKi9cbiAgb25Nb3ZlVG9UcmVlQ2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgb25DaGFuZ2UsIHNlbGVjdGVkR3JpZEl0ZW1zLCBncmlkRGF0YSwgdHJlZURhdGEsIGlkS2V5LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHNlbGVjdGVkSWQgPSB0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXTtcblxuICAgIGNvbnN0IGFjdGlvbiA9IHtcbiAgICAgIHR5cGU6IFRSRUVfQUNUSU9OUy5BRERfQ0hJTERSRU4sXG4gICAgICBkYXRhOiBncmlkRGF0YVxuICAgICAgICAuZmlsdGVyKGkgPT4gc2VsZWN0ZWRHcmlkSXRlbXMuaW5jbHVkZXMoaS5nZXQoaWRLZXkpKSlcbiAgICAgICAgLnRvSlMoKSxcbiAgICB9O1xuICAgIGNvbnN0IG5ld0l0ZW1zID0gdGhpcy5nZXRVcGRhdGVkVHJlZShzZWxlY3RlZElkLCB0cmVlRGF0YSwgYWN0aW9uKTtcbiAgICBjb25zdCBuZXdHcmlkSXRlbXMgPSBncmlkRGF0YS5maWx0ZXIoaXRlbSA9PiAhc2VsZWN0ZWRHcmlkSXRlbXMuaW5jbHVkZXMoaXRlbS5nZXQoaWRLZXkpKSk7XG5cbiAgICB0aGlzLmV4cGFuZFBhcmVudChzZWxlY3RlZElkLCB0cnVlKTtcbiAgICB0aGlzLnNldERhdGFUb0dyaWQobmV3R3JpZEl0ZW1zLCB0cnVlKTtcbiAgICBvbkNoYW5nZShuZXdJdGVtcyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlbmFtZXMgdGhlIGNob3NlbiB0cmVlIG5vZGUgdXNpbmcgYSBSRU5BTUVfUEFSRU5UIGFjdGlvblxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICovXG4gIG9uSW5wdXRDaGFuZ2UgPSAodmFsdWUpID0+IHtcbiAgICBjb25zdCB7IHRyZWVEYXRhLCBvbkNoYW5nZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBhY3Rpb24gPSB7XG4gICAgICB0eXBlOiBUUkVFX0FDVElPTlMuUkVOQU1FX1BBUkVOVCxcbiAgICAgIGRhdGE6IHZhbHVlLFxuICAgIH07XG4gICAgY29uc3QgbmV3SXRlbXMgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdLCB0cmVlRGF0YSwgYWN0aW9uKTtcbiAgICBvbkNoYW5nZShuZXdJdGVtcyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEZpcmVkIG9uIGV4cGFuZFxuICAgKiBAcGFyYW0gaWRzXG4gICAqL1xuICBvbkV4cGFuZCA9IChpZHMpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGV4cGFuZGVkS2V5czogaWRzLFxuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBFeHBhbmQgYWxsIHRoZSBpdGVtc1xuICAgKi9cbiAgb25FeHBhbmRBbGwgPSAoKSA9PiB7XG4gICAgY29uc3QgbmV3RXhwYW5kZWRJdGVtcyA9IHRoaXMuaXNBbGxFeHBhbmRlZCgpID8gW10gOiB0aGlzLmdldEFsbFBhcmVudElkcygpO1xuICAgIHRoaXMuc2V0U3RhdGUoeyBleHBhbmRlZEtleXM6IG5ld0V4cGFuZGVkSXRlbXMgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdXBkYXRlZCB0cmVlIGl0ZW1zLlxuICAgKiBAcGFyYW0gaWQgLSB0YXJnZXQgaXRlbVxuICAgKiBAcGFyYW0gYXJyYXkgLSBhcnJheSB3aGVyZSB0YXJnZXQgaXRlbSBpcyBiZWluZyBzZWFyY2hlZFxuICAgKiBAcGFyYW0gYWN0aW9uIC0gYWN0aW9uIHRvIGJlIHBlcmZvcm1lZCB7dHlwZSwgZGF0YX1cbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBnZXRVcGRhdGVkVHJlZSA9IChpZCwgYXJyYXkgPSB0aGlzLnByb3BzLnRyZWVEYXRhLCBhY3Rpb24pID0+IHtcbiAgICBsZXQgZm91bmQgPSBmYWxzZTtcbiAgICBjb25zdCB7IGlkS2V5LCBjaGlsZEtleSwgdmFsdWVLZXkgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgbmV3SXRlbXMgPSBhcnJheS5zbGljZSgpO1xuICAgIGNvbnN0IHJlbW92ZUFjdGlvbnMgPSBbVFJFRV9BQ1RJT05TLk1PVkVfTEVBRiwgVFJFRV9BQ1RJT05TLkRFTEVURV9QQVJFTlRdO1xuXG4gICAgLy8gSWYgZGVsZXRlZCBwYXJlbnQgaXRlbSBpcyBpbiB0aGUgcm9vdCBub2RlXG4gICAgaWYgKGFjdGlvbi50eXBlID09PSBUUkVFX0FDVElPTlMuREVMRVRFX1BBUkVOVCkge1xuICAgICAgY29uc3Qgcm9vdEl0ZW0gPSBhcnJheS5maW5kKGl0ZW0gPT4gaXRlbVtpZEtleV0gPT09IGlkKTtcbiAgICAgIGlmIChyb290SXRlbSkge1xuICAgICAgICBpZiAocm9vdEl0ZW1bY2hpbGRLZXldLmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuc2V0RGF0YVRvR3JpZChmcm9tSlModGhpcy5nZXRBbGxMZWFmcyhyb290SXRlbVtjaGlsZEtleV0pKSk7XG4gICAgICAgICAgdGhpcy5kZXNlbGVjdEl0ZW0oKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3SXRlbXMuZmlsdGVyKGl0ZW0gPT4gaXRlbVtpZEtleV0gIT09IGlkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5ld0l0ZW1zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBpdGVtID0gbmV3SXRlbXNbaV07XG4gICAgICBpZiAocmVtb3ZlQWN0aW9ucy5pbmNsdWRlcyhhY3Rpb24udHlwZSkgJiYgaXRlbVtjaGlsZEtleV0gJiYgIWZvdW5kKSB7XG4gICAgICAgIGZvdW5kID0gISFpdGVtW2NoaWxkS2V5XS5maW5kKGNoaWxkID0+IGNoaWxkW2lkS2V5XSA9PT0gaWQpO1xuICAgICAgICBpZiAoZm91bmQpIHtcbiAgICAgICAgICAvLyBXaGVuIHJlbW92aW5nIGFuIGl0ZW0gd2UgbXVzdCBmaXJzdCBmaW5kIGl0cyBwYXJlbnQgYW5kIGFsdGVyIGl0cyBjaGlsZHJlbiBhcnJheVxuICAgICAgICAgIGlmIChhY3Rpb24udHlwZSA9PT0gVFJFRV9BQ1RJT05TLk1PVkVfTEVBRikge1xuICAgICAgICAgICAgaXRlbVtjaGlsZEtleV0gPSBpdGVtW2NoaWxkS2V5XS5maWx0ZXIoY2hpbGQgPT4gY2hpbGRbaWRLZXldICE9PSBpZCk7XG4gICAgICAgICAgICB0aGlzLmRlc2VsZWN0SXRlbSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYWN0aW9uLnR5cGUgPT09IFRSRUVfQUNUSU9OUy5ERUxFVEVfUEFSRU5UKSB7XG4gICAgICAgICAgICAvLyB3ZSBtdXN0IGZpcnN0IGZpbHRlciB0aGUgY2hpbGRyZW4sIHNvIHRoYXQgd2Ugd29uJ3QgZ2V0IGxlYWZzIGZyb21cbiAgICAgICAgICAgIC8vIG90aGVyIGNoaWxkIGJyYW5jaGVzXG4gICAgICAgICAgICBjb25zdCBmaWx0ZXJlZENoaWxkcmVuID0gaXRlbVtjaGlsZEtleV0uZmlsdGVyKGNoaWxkSXRlbSA9PiBjaGlsZEl0ZW1baWRLZXldID09PSBpZCk7XG4gICAgICAgICAgICB0aGlzLnNldERhdGFUb0dyaWQoZnJvbUpTKHRoaXMuZ2V0QWxsTGVhZnMoZmlsdGVyZWRDaGlsZHJlbikpKTtcbiAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RJdGVtKCk7XG4gICAgICAgICAgICBpdGVtW2NoaWxkS2V5XSA9IGl0ZW1bY2hpbGRLZXldLmZpbHRlcihjaGlsZEl0ZW0gPT4gY2hpbGRJdGVtW2lkS2V5XSAhPT0gaWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVtpZEtleV0gPT09IGlkICYmICFmb3VuZCkge1xuICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgICBjYXNlIFRSRUVfQUNUSU9OUy5BRERfQ0hJTERSRU46XG4gICAgICAgICAgICBpdGVtW2NoaWxkS2V5XSA9IChpdGVtW2NoaWxkS2V5XSB8fCBbXSkuY29uY2F0KGFjdGlvbi5kYXRhKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgVFJFRV9BQ1RJT05TLlJFTkFNRV9QQVJFTlQ6XG4gICAgICAgICAgICBpdGVtW3ZhbHVlS2V5XSA9IGFjdGlvbi5kYXRhO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FjdGlvbiB0eXBlIGlzIHVuZGVmaW5lZCcpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bY2hpbGRLZXldICYmICFmb3VuZCkgZm91bmQgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKGlkLCBpdGVtW2NoaWxkS2V5XSwgYWN0aW9uKTtcbiAgICB9XG5cbiAgICBpZiAoIWZvdW5kKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIG5ld0l0ZW1zO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHJlY3Vyc2l2ZWx5IGFsbCBsZWFmIGl0ZW1zIGZyb20gYSBnaXZlbiBhcnJheVxuICAgKiBAcGFyYW0gYXJyYXlcbiAgICogQHBhcmFtIGFscmVhZHlGb3VuZCAodXNlZCByZWN1cnNpdmVseSlcbiAgICovXG4gIGdldEFsbExlYWZzID0gKGFycmF5LCBhbHJlYWR5Rm91bmQgPSBbXSkgPT4ge1xuICAgIGNvbnN0IHsgY2hpbGRLZXkgfSA9IHRoaXMucHJvcHM7XG4gICAgbGV0IGxlYWZzID0gYWxyZWFkeUZvdW5kO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3QgaXRlbSA9IGFycmF5W2ldO1xuICAgICAgaWYgKGl0ZW1bY2hpbGRLZXldKSB7XG4gICAgICAgIGxlYWZzID0gdGhpcy5nZXRBbGxMZWFmcyhpdGVtW2NoaWxkS2V5XSwgYWxyZWFkeUZvdW5kKTtcbiAgICAgIH1cbiAgICAgIGlmICghaXRlbVtjaGlsZEtleV0pIGxlYWZzLnB1c2goaXRlbSk7XG4gICAgfVxuICAgIHJldHVybiBsZWFmcztcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyBhIHRyZWUgaXRlbSBieSBJRFxuICAgKiBAcGFyYW0gaWRcbiAgICogQHBhcmFtIGFycmF5XG4gICAqIEBwYXJhbSByZXR1cm5QYXJlbnQgLSByZXR1cm4gaXRlbSdzIHBhcmVudCBpbnN0ZWFkIG9mIHRoZSBpdGVtXG4gICAqIEBwYXJhbSBwYXJlbnQgLSBwYXJlbnQgaXRlbSAodXNlZCByZWN1cnNpdmVseSlcbiAgICogQHJldHVybnMge3t9fVxuICAgKi9cbiAgZ2V0VHJlZUl0ZW0gPSAoaWQsIGFycmF5ID0gdGhpcy5wcm9wcy50cmVlRGF0YSwgcmV0dXJuUGFyZW50ID0gZmFsc2UsIHBhcmVudCA9IG51bGwpID0+IHtcbiAgICBjb25zdCB7IGNoaWxkS2V5LCBpZEtleSB9ID0gdGhpcy5wcm9wcztcbiAgICBsZXQgZm91bmQgPSBhcnJheS5maW5kKGl0ZW0gPT4gaXRlbVtpZEtleV0gPT09IGlkKTtcblxuICAgIGlmIChmb3VuZCAmJiByZXR1cm5QYXJlbnQpIGZvdW5kID0gcGFyZW50O1xuXG4gICAgaWYgKCFmb3VuZCkge1xuICAgICAgYXJyYXkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBpZiAoaXRlbVtjaGlsZEtleV0gJiYgIWZvdW5kKSB7XG4gICAgICAgICAgZm91bmQgPSB0aGlzLmdldFRyZWVJdGVtKGlkLCBpdGVtW2NoaWxkS2V5XSwgcmV0dXJuUGFyZW50LCBpdGVtKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBmb3VuZDtcbiAgfTtcblxuICAvKipcbiAgICogR2V0IGFkamFjZW50IGl0ZW0gKGlkKSBpbiBwYXJlbnQgYXJyYXkuIFVzZWQgd2hlbiBtb3ZpbmcgaXRlbXMgZnJvbSB0cmVlXG4gICAqIHRvIGdyaWQvZGVsZXRpbmcgYW4gaXRlbVxuICAgKiBAcGFyYW0gaWRcbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBnZXRBZGphY2VudEl0ZW0gPSAoaWQpID0+IHtcbiAgICBpZiAoIWlkKSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCB7IGNoaWxkS2V5LCBpZEtleSwgdHJlZURhdGEgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBnZXRBZGphY2VudEl0ZW1JZCA9IChwYXJlbnQpID0+IHtcbiAgICAgIGNvbnN0IHBhcmVudEFyciA9IEFycmF5LmlzQXJyYXkocGFyZW50KSA/IHBhcmVudCA6IHBhcmVudFtjaGlsZEtleV07XG4gICAgICBjb25zdCBpbmRleCA9IHBhcmVudEFyci5maW5kSW5kZXgoY2hpbGQgPT4gY2hpbGRbaWRLZXldID09PSBpZCk7XG4gICAgICBsZXQgYWRqYWNlbnRJdGVtID0gcGFyZW50QXJyW2luZGV4ICsgMV07XG4gICAgICBpZiAoIWFkamFjZW50SXRlbSkgYWRqYWNlbnRJdGVtID0gcGFyZW50QXJyW2luZGV4IC0gMV07XG4gICAgICBpZiAoIWFkamFjZW50SXRlbSAmJiAhQXJyYXkuaXNBcnJheShwYXJlbnQpKSBhZGphY2VudEl0ZW0gPSBwYXJlbnQ7XG4gICAgICBpZiAoIWFkamFjZW50SXRlbSkgcmV0dXJuIG51bGw7XG5cbiAgICAgIHJldHVybiBhZGphY2VudEl0ZW1baWRLZXldO1xuICAgIH07XG5cbiAgICBjb25zdCBwYXJlbnQgPSB0aGlzLmdldFRyZWVJdGVtKGlkLCB0aGlzLnByb3BzLnRyZWVEYXRhLCB0cnVlKTtcbiAgICByZXR1cm4gcGFyZW50ID8gZ2V0QWRqYWNlbnRJdGVtSWQocGFyZW50KSA6IGdldEFkamFjZW50SXRlbUlkKHRyZWVEYXRhKTtcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyBhbGwgSURzIGluIHRoZSB0cmVlXG4gICAqIEBwYXJhbSBhcnJheVxuICAgKi9cbiAgZ2V0QWxsUGFyZW50SWRzID0gKGFycmF5ID0gdGhpcy5wcm9wcy50cmVlRGF0YSkgPT4ge1xuICAgIGNvbnN0IHsgaWRLZXksIGNoaWxkS2V5IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGNiID0gKGFjYywgaXRlbSkgPT4ge1xuICAgICAgbGV0IHRvdGFsID0gYWNjO1xuICAgICAgaWYgKGl0ZW1bY2hpbGRLZXldICYmIGl0ZW1bY2hpbGRLZXldLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdG90YWwgPSBhY2MuY29uY2F0KGl0ZW1baWRLZXldKTtcbiAgICAgICAgcmV0dXJuIGl0ZW1bY2hpbGRLZXldLnJlZHVjZShjYiwgdG90YWwpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRvdGFsO1xuICAgIH07XG4gICAgcmV0dXJuIGFycmF5LnJlZHVjZShjYiwgW10pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBcHBlbmRzIHByb3ZpZGVkIGl0ZW1zIHRvIHRoZSBncmlkXG4gICAqIEBwYXJhbSBpdGVtcyAtIGltbXV0YWJsZSBhcnJheSBvZiBpdGVtcyB0byBiZSBhcHBlbmRlZCB0byBncmlkXG4gICAqIEBwYXJhbSBzZXROZXdJdGVtcyAtIHNldCBjb21wbGV0ZWx5IGEgbmV3IGFycmF5IG9mIGl0ZW1zXG4gICAqL1xuICBzZXREYXRhVG9HcmlkID0gKGl0ZW1zLCBzZXROZXdJdGVtcyA9IGZhbHNlKSA9PiB7XG4gICAgbGV0IGRhdGEgPSBMaXN0KCk7XG4gICAgY29uc3QgeyBncmlkLCBncmlkQ29sdW1ucywgZ3JpZERhdGEgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFzZXROZXdJdGVtcykgZGF0YSA9IGdyaWREYXRhLnNsaWNlKCk7XG4gICAgY29uc3QgbmV3R3JpZEl0ZW1zID0gZGF0YS5jb25jYXQoaXRlbXMpO1xuXG4gICAgdGhpcy5wcm9wcy5zZXREYXRhKGdyaWQsIGdyaWRDb2x1bW5zLCBuZXdHcmlkSXRlbXMpO1xuICAgIHRoaXMucHJvcHMuY2xlYXJTZWxlY3RlZEl0ZW1zKGdyaWQpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBFeHBhbmRzIGEgcGFyZW50XG4gICAqIEBwYXJhbSBwYXJlbnRJZFxuICAgKi9cbiAgZXhwYW5kUGFyZW50ID0gKHBhcmVudElkKSA9PiB7XG4gICAgaWYgKHBhcmVudElkICYmICF0aGlzLnN0YXRlLmV4cGFuZGVkS2V5cy5maW5kKGV4cGFuZGVkSWQgPT4gZXhwYW5kZWRJZCA9PT0gcGFyZW50SWQpKSB7XG4gICAgICBjb25zdCBuZXdFeHBhbmRlZEtleXMgPSB0aGlzLnN0YXRlLmV4cGFuZGVkS2V5cy5zbGljZSgpO1xuICAgICAgbmV3RXhwYW5kZWRLZXlzLnB1c2gocGFyZW50SWQpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGV4cGFuZGVkS2V5czogbmV3RXhwYW5kZWRLZXlzIH0pO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogQ2xvc2VzIGRlbGV0ZSBjb25maXJtYXRpb24gZGlhbG9nXG4gICAqL1xuICBjbG9zZURlbGV0ZUNvbmZpcm1hdGlvbkRpYWxvZyA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2hvd0RlbGV0ZUNvbmZpcm1hdGlvbjogZmFsc2UgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIERlbGV0ZXMgYSBwYXJlbnQgbm9kZVxuICAgKi9cbiAgZGVsZXRlUGFyZW50ID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgb25DaGFuZ2UsIHRyZWVEYXRhIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHNlbGVjdGVkS2V5ID0gdGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF07XG4gICAgY29uc3QgYWN0aW9uID0ge1xuICAgICAgdHlwZTogVFJFRV9BQ1RJT05TLkRFTEVURV9QQVJFTlQsXG4gICAgfTtcbiAgICBjb25zdCBuZXh0U2VsZWN0ZWRLZXkgPSB0aGlzLmdldEFkamFjZW50SXRlbShzZWxlY3RlZEtleSk7XG4gICAgY29uc3QgbmV3SXRlbXMgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKHNlbGVjdGVkS2V5LCB0cmVlRGF0YSwgYWN0aW9uKTtcbiAgICBvbkNoYW5nZShuZXdJdGVtcyk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzZWxlY3RlZEtleXM6IFtuZXh0U2VsZWN0ZWRLZXldLFxuICAgICAgc2hvd0RlbGV0ZUNvbmZpcm1hdGlvbjogZmFsc2UsXG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBhIG1vdmUgaXMgcGVybWl0dGVkIGJlZm9yZSBjYWxsaW5nIFRyZWUgY29tcG9uZW50J3Mgb25EcmFnRHJvcCBjYWxsYmFja1xuICAgKiBAcGFyYW0gaXRlbXNcbiAgICogQHBhcmFtIGVcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBpc0RyYWdEcm9wTGVnYWwgPSAoaXRlbXMsIGUpID0+IHtcbiAgICBjb25zdCB7IGNoaWxkS2V5LCB0cmVlRGF0YSwgb25EcmFnRHJvcFByZXZlbnQgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgZHJvcEl0ZW0gPSB0aGlzLmdldFRyZWVJdGVtKGUubm9kZS5wcm9wcy5ldmVudEtleSk7XG4gICAgY29uc3QgZHJhZ0l0ZW0gPSB0aGlzLmdldFRyZWVJdGVtKGUuZHJhZ05vZGUucHJvcHMuZXZlbnRLZXkpO1xuICAgIGNvbnN0IGRyb3BJdGVtUGFyZW50ID0gdGhpcy5nZXRUcmVlSXRlbShlLm5vZGUucHJvcHMuZXZlbnRLZXksIHRyZWVEYXRhLCB0cnVlKTtcblxuICAgIC8qKlxuICAgICAqIFdlIHdhbnQgdG8gcHJldmVudCB0aGUgbW92ZSwgaWY6XG4gICAgICogLSBTZWxlY3RlZCBpdGVtIGlzIGEgcGFyZW50LCBhbmQgLi5cbiAgICAgKiAgICAtIERyb3BwaW5nIG92ZXIgYW4gaXRlbSwgYW5kIC4uXG4gICAgICogICAgICAtIE5ldyBwYXJlbnQgaGFzIGxlYWZzIE9SIG5ldyBwYXJlbnQgaXMgYSBsZWFmXG4gICAgICogICAgLSBEcm9wcGluZyBiZXR3ZWVuIGl0ZW1zLCBhbmQgLi5cbiAgICAgKiAgICAgICAgLSBOZXcgcGFyZW50J3MgcGFyZW50IGhhcyBsZWFmc1xuICAgICAqICAtIFNlbGVjdGVkIGl0ZW0gaXMgYSBsZWFmLCBhbmQgLi4uXG4gICAgICovXG4gICAgaWYgKGRyYWdJdGVtW2NoaWxkS2V5XSkge1xuICAgICAgaWYgKFxuICAgICAgICAoIWUuZHJvcFRvR2FwICYmICh0aGlzLmhhc0xlYWZzKGRyb3BJdGVtKSB8fCAhZHJvcEl0ZW1bY2hpbGRLZXldKSkgfHxcbiAgICAgICAgKGRyb3BJdGVtUGFyZW50ICYmIGUuZHJvcFRvR2FwICYmICh0aGlzLmhhc0xlYWZzKGRyb3BJdGVtUGFyZW50KSkpXG4gICAgICApIHtcbiAgICAgICAgaWYgKG9uRHJhZ0Ryb3BQcmV2ZW50KSBvbkRyYWdEcm9wUHJldmVudCgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIChkcm9wSXRlbSAmJiAhZS5kcm9wVG9HYXAgJiYgdGhpcy5oYXNQYXJlbnRzKGRyb3BJdGVtKSkgfHxcbiAgICAgIChkcm9wSXRlbVBhcmVudCAmJiBlLmRyb3BUb0dhcCAmJiB0aGlzLmhhc1BhcmVudHMoZHJvcEl0ZW1QYXJlbnQpKSB8fFxuICAgICAgKGUuZHJvcFRvR2FwICYmICFkcm9wSXRlbVBhcmVudCkgfHxcbiAgICAgICghZS5kcm9wVG9HYXAgJiYgIWRyb3BJdGVtW2NoaWxkS2V5XSlcbiAgICApIHtcbiAgICAgIC8vIEl0ZW0gaGFzIGdvdCBwYXJlbnQgYXMgYSBjaGlsZCAtIGxlYWYgY2Fubm90IGJlIGRyb3BwZWQgaGVyZVxuICAgICAgaWYgKG9uRHJhZ0Ryb3BQcmV2ZW50KSBvbkRyYWdEcm9wUHJldmVudCgpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuXG4gIGlzQWxsRXhwYW5kZWQgPSAoKSA9PlxuICAgIHRoaXMuc3RhdGUuZXhwYW5kZWRLZXlzLmxlbmd0aCA9PT0gdGhpcy5nZXRBbGxQYXJlbnRJZHMoKS5sZW5ndGg7XG5cbiAgaGFzTGVhZnMgPSAoaXRlbSkgPT4ge1xuICAgIGNvbnN0IHsgY2hpbGRLZXkgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFpdGVtW2NoaWxkS2V5XSkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiAhIWl0ZW1bY2hpbGRLZXldLmZpbmQoY2hpbGQgPT4gIWNoaWxkW2NoaWxkS2V5XSk7XG4gIH07XG5cbiAgaGFzUGFyZW50cyA9IChpdGVtKSA9PiB7XG4gICAgY29uc3QgeyBjaGlsZEtleSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIWl0ZW1bY2hpbGRLZXldKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuICEhaXRlbVtjaGlsZEtleV0uZmluZChjaGlsZCA9PiBjaGlsZFtjaGlsZEtleV0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBEZXNlbGVjdHMgYW4gaXRlbSwgaWYgaXQgaXMgZS5nLiByZW1vdmVkXG4gICAqL1xuICBkZXNlbGVjdEl0ZW0gPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkS2V5czogW10gfSk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHZhbHVlS2V5LCBpZEtleSwgdHJlZURhdGEsIGdyaWQsIGdyaWRDb2x1bW5zLCBjbGFzc05hbWUsIHRyYW5zbGF0aW9ucyxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IG1lcmdlZEdyaWQgPSBPYmplY3QuYXNzaWduKHt9LCBncmlkLCB7IGRlZmF1bHRTaG93RmlsdGVyaW5nUm93OiB0cnVlIH0pO1xuICAgIGNvbnN0IG1lcmdlZFRyYW5zbGF0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRUcmFuc2xhdGlvbnMsIHRyYW5zbGF0aW9ucyk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPFJlYWN0LkZyYWdtZW50PlxuICAgICAgICA8Q29udGFpbmVyIGNsYXNzTmFtZT17Y2xhc3NOYW1lfT5cbiAgICAgICAgICA8VHJlZUNvbnRhaW5lcj5cbiAgICAgICAgICAgIDxDb250cm9sQmFyXG4gICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICBvbkFkZE5ld0NsaWNrPXt0aGlzLm9uQWRkTmV3Q2xpY2t9XG4gICAgICAgICAgICAgIG9uRGVsZXRlQ2xpY2s9e3RoaXMub25EZWxldGVDbGlja31cbiAgICAgICAgICAgICAgb25JbnB1dENoYW5nZT17dGhpcy5vbklucHV0Q2hhbmdlfVxuICAgICAgICAgICAgICBvbkV4cGFuZEFsbENsaWNrPXt0aGlzLm9uRXhwYW5kQWxsfVxuICAgICAgICAgICAgICBleHBhbmRBbGw9e3RoaXMuaXNBbGxFeHBhbmRlZCgpfVxuICAgICAgICAgICAgICBzZWxlY3RlZFRyZWVJdGVtPXt0aGlzLmdldFRyZWVJdGVtKHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdKX1cbiAgICAgICAgICAgICAgaGVpZ2h0PXtBQ1RJT05fQkFSX0NPTlRBSU5FUl9IRUlHSFR9XG4gICAgICAgICAgICAgIHRyYW5zbGF0aW9ucz17bWVyZ2VkVHJhbnNsYXRpb25zfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxQZXJmZWN0U2Nyb2xsYmFyPlxuICAgICAgICAgICAgICB7ISF0cmVlRGF0YS5sZW5ndGggJiYgPFRyZWVDb21wb25lbnRcbiAgICAgICAgICAgICAgICB0cmVlRGF0YT17dHJlZURhdGF9XG4gICAgICAgICAgICAgICAgZGF0YUxvb2tVcEtleT17aWRLZXl9XG4gICAgICAgICAgICAgICAgZGF0YUxvb2tVcFZhbHVlPXt2YWx1ZUtleX1cbiAgICAgICAgICAgICAgICBvblNlbGVjdD17dGhpcy5vblRyZWVJdGVtU2VsZWN0fVxuICAgICAgICAgICAgICAgIG9uRHJhZ0Ryb3A9e3RoaXMub25UcmVlSXRlbURyYWdEcm9wfVxuICAgICAgICAgICAgICAgIG9uRXhwYW5kPXt0aGlzLm9uRXhwYW5kfVxuICAgICAgICAgICAgICAgIGNoZWNrYWJsZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRLZXlzPXt0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c31cbiAgICAgICAgICAgICAgICBleHBhbmRlZEtleXM9e3RoaXMuc3RhdGUuZXhwYW5kZWRLZXlzfVxuICAgICAgICAgICAgICAgIGlzRHJhZ0Ryb3BMZWdhbD17dGhpcy5pc0RyYWdEcm9wTGVnYWx9XG4gICAgICAgICAgICAgICAgc2VsZWN0YWJsZVxuICAgICAgICAgICAgICAgIGRyYWdnYWJsZVxuICAgICAgICAgICAgICAvPn1cbiAgICAgICAgICAgICAgeyF0cmVlRGF0YS5sZW5ndGggJiYgPE5vSXRlbXNUZXh0PnttZXJnZWRUcmFuc2xhdGlvbnMubm9UcmVlSXRlbXN9PC9Ob0l0ZW1zVGV4dD59XG4gICAgICAgICAgICA8L1BlcmZlY3RTY3JvbGxiYXI+XG4gICAgICAgICAgPC9UcmVlQ29udGFpbmVyPlxuICAgICAgICAgIDxBcnJvd0NvbnRyb2xzXG4gICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgIHNlbGVjdGVkVHJlZUl0ZW09e3RoaXMuZ2V0VHJlZUl0ZW0odGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF0pfVxuICAgICAgICAgICAgb25Nb3ZlVG9UcmVlQ2xpY2s9e3RoaXMub25Nb3ZlVG9UcmVlQ2xpY2t9XG4gICAgICAgICAgICBvbk1vdmVUb0dyaWRDbGljaz17dGhpcy5vbk1vdmVUb0dyaWRDbGlja31cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxHcmlkXG4gICAgICAgICAgICBncmlkPXttZXJnZWRHcmlkfVxuICAgICAgICAgICAgY29sdW1ucz17Z3JpZENvbHVtbnN9XG4gICAgICAgICAgICByb3dTZWxlY3RcbiAgICAgICAgICAgIG11bHRpU2VsZWN0XG4gICAgICAgICAgICBmaWx0ZXJpbmdcbiAgICAgICAgICAgIHJvd1NlbGVjdENoZWNrYm94Q29sdW1uXG4gICAgICAgICAgICBncmlkSGVhZGVyPXs8UHJpbWl0aXZlLlN1YnRpdGxlPnttZXJnZWRUcmFuc2xhdGlvbnMuZ3JpZFRpdGxlfTwvUHJpbWl0aXZlLlN1YnRpdGxlPn1cbiAgICAgICAgICAvPlxuXG4gICAgICAgIDwvQ29udGFpbmVyPlxuICAgICAgICB7dGhpcy5zdGF0ZS5zaG93RGVsZXRlQ29uZmlybWF0aW9uICYmXG4gICAgICAgIDxDb25maXJtRGlhbG9nXG4gICAgICAgICAgdGl0bGVUZXh0PXttZXJnZWRUcmFuc2xhdGlvbnMuZGVsZXRlQ29uZmlybURpYWxvZy50aXRsZVRleHR9XG4gICAgICAgICAgYm9keVRleHQ9e21lcmdlZFRyYW5zbGF0aW9ucy5kZWxldGVDb25maXJtRGlhbG9nLmJvZHlUZXh0fVxuICAgICAgICAgIG9rQnV0dG9uVGV4dD17bWVyZ2VkVHJhbnNsYXRpb25zLmRlbGV0ZUNvbmZpcm1EaWFsb2cub2tCdXR0b25UZXh0fVxuICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ9e21lcmdlZFRyYW5zbGF0aW9ucy5kZWxldGVDb25maXJtRGlhbG9nLmNhbmNlbEJ1dHRvblRleHR9XG4gICAgICAgICAgY29uZmlybUNhbGxiYWNrPXt0aGlzLmRlbGV0ZVBhcmVudH1cbiAgICAgICAgICBjYW5jZWxDYWxsYmFjaz17dGhpcy5jbG9zZURlbGV0ZUNvbmZpcm1hdGlvbkRpYWxvZ31cbiAgICAgICAgLz5cbiAgICAgICAgfVxuICAgICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgICApO1xuICB9XG59XG4iXX0=