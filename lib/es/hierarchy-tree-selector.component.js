var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _dec, _class, _class2, _temp;

var _templateObject = _taggedTemplateLiteralLoose(['\n  height: 100%;\n  &&& {\n    padding: 0;\n  }\n'], ['\n  height: 100%;\n  &&& {\n    padding: 0;\n  }\n']),
    _templateObject2 = _taggedTemplateLiteralLoose(['\n  display: flex;\n  min-height: 300px;\n  > div {\n    width: 50%;\n    flex: 1 1 100%;\n  }\n'], ['\n  display: flex;\n  min-height: 300px;\n  > div {\n    width: 50%;\n    flex: 1 1 100%;\n  }\n']),
    _templateObject3 = _taggedTemplateLiteralLoose(['\n  height:100%;\n  .oc-scrollbar-container {\n    height: calc(100% - ', ');\n    padding: ', ';\n  }\n  .tree-header {\n    min-height: ', ';\n    .ordering-arrows {\n      font-weight: 24px;\n    }\n  }\n  .oc-react-tree {\n    height: 100%;\n    .rc-tree-iconEle.rc-tree-icon__customize {\n        display:none;\n    }\n  }\n'], ['\n  height:100%;\n  .oc-scrollbar-container {\n    height: calc(100% - ', ');\n    padding: ', ';\n  }\n  .tree-header {\n    min-height: ', ';\n    .ordering-arrows {\n      font-weight: 24px;\n    }\n  }\n  .oc-react-tree {\n    height: 100%;\n    .rc-tree-iconEle.rc-tree-icon__customize {\n        display:none;\n    }\n  }\n']),
    _templateObject4 = _taggedTemplateLiteralLoose(['\n  display: flex;\n  justify-content: center;\n  font-weight: bold;\n'], ['\n  display: flex;\n  justify-content: center;\n  font-weight: bold;\n']);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

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

var ACTION_BAR_CONTAINER_HEIGHT = '54px';
var TREE_ACTIONS = {
  ADD_CHILDREN: 'ADD_CHILDREN',
  MOVE_LEAF: 'MOVE_LEAF',
  RENAME_PARENT: 'RENAME_PARENT',
  DELETE_PARENT: 'DELETE_PARENT'
};

var Grid = styled(Datagrid)(_templateObject);

var Container = styled.div(_templateObject2);

var TreeContainer = styled.div(_templateObject3, ACTION_BAR_CONTAINER_HEIGHT, function (props) {
  return props.theme.gutterWidth;
}, ACTION_BAR_CONTAINER_HEIGHT);

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

    _this.onDeleteClick = function () {
      var childKey = _this.props.childKey;

      // If item is not a parent, we won't show the delete confirmation dialog

      if (!_this.getTreeItem(_this.state.selectedKeys[0])[childKey]) {
        _this.moveItemToGrid();
        return;
      }
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
      _this.moveItemToGrid();
    };

    _this.onOrderClick = function (items) {
      _this.props.onChange(items);
    };

    _this.onMoveToTreeClick = function () {
      var _this$props2 = _this.props,
          onChange = _this$props2.onChange,
          selectedGridItems = _this$props2.selectedGridItems,
          gridData = _this$props2.gridData,
          treeData = _this$props2.treeData,
          idKey = _this$props2.idKey;

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
      var _this$props3 = _this.props,
          treeData = _this$props3.treeData,
          onChange = _this$props3.onChange;

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

    _this.getUpdatedTree = function (id) {
      var array = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.props.treeData;
      var action = arguments[2];

      var found = false;
      var _this$props4 = _this.props,
          idKey = _this$props4.idKey,
          childKey = _this$props4.childKey,
          valueKey = _this$props4.valueKey;

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
      var _this$props5 = _this.props,
          childKey = _this$props5.childKey,
          idKey = _this$props5.idKey;

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
      var _this$props6 = _this.props,
          childKey = _this$props6.childKey,
          idKey = _this$props6.idKey,
          treeData = _this$props6.treeData;


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

    _this.setDataToGrid = function (items) {
      var setNewItems = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var data = List();
      var _this$props7 = _this.props,
          grid = _this$props7.grid,
          gridColumns = _this$props7.gridColumns,
          gridData = _this$props7.gridData;

      if (!setNewItems) data = gridData.slice();
      var newGridItems = data.concat(items);

      _this.props.setData(grid, gridColumns, newGridItems);
      _this.props.clearSelectedItems(grid);
    };

    _this.moveItemToGrid = function () {
      var _this$props8 = _this.props,
          treeData = _this$props8.treeData,
          onChange = _this$props8.onChange;

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
      var _this$props9 = _this.props,
          onChange = _this$props9.onChange,
          treeData = _this$props9.treeData;

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

    _this.deselectItem = function () {
      _this.setState({ selectedKeys: [] });
    };

    _this.renderHeaderRight = function (translations) {
      return React.createElement(ControlBar, _extends({}, _this.props, {
        onAddNewClick: _this.onAddNewClick,
        onDeleteClick: _this.onDeleteClick,
        onInputChange: _this.onInputChange,
        selectedTreeItem: _this.getTreeItem(_this.state.selectedKeys[0]),
        height: ACTION_BAR_CONTAINER_HEIGHT,
        translations: translations
      }));
    };

    _this.state = {
      selectedKeys: [],
      showDeleteConfirmation: false
    };
    return _this;
  }

  /**
   * Selects a tree item
   * @param selectedKeys (array)
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
   * Calls onChange callback whenever user reorders tree items using ordering arrows
   * @param items
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
   * Appends provided items to the grid
   * @param items - immutable array of items to be appended to grid
   * @param setNewItems - set completely a new array of items
   */


  /**
   * Removes the chosen item from a tree and updates the grid using MOVE_LEAF
   * action
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
          !!treeData.length && React.createElement(TreeComponent, {
            treeData: treeData,
            dataLookUpKey: idKey,
            dataLookUpValue: valueKey,
            onSelect: this.onTreeItemSelect,
            onExpand: this.onExpand,
            checkable: false,
            selectedKeys: this.state.selectedKeys,
            expandedKeys: this.state.expandedKeys,
            onOrderButtonClick: this.onOrderClick,
            title: mergedTranslations.treeTitle,
            selectable: true,
            showOrderingArrows: true,
            showExpandAll: true,
            headerRight: this.renderHeaderRight(mergedTranslations),
            handleExpandedKeysManually: true
          }),
          !treeData.length && React.createElement(
            NoItemsText,
            null,
            mergedTranslations.noTreeItems
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
  onSelect: undefined,
  onChange: undefined,
  defaultExpandAll: true,
  singleRoot: true
}, _temp)) || _class);
export { HierarchyTreeSelector as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlRyZWVDb21wb25lbnQiLCJQcmltaXRpdmUiLCJEYXRhZ3JpZCIsImdyaWRTaGFwZSIsImdyaWRDb2x1bW5TaGFwZSIsIkRhdGFncmlkQWN0aW9ucyIsIkNvbmZpcm1EaWFsb2ciLCJSZWFjdCIsInN0eWxlZCIsIkxpc3QiLCJmcm9tSlMiLCJJbW11dGFibGVQcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJjb25uZWN0IiwiQ29udHJvbEJhciIsIkFycm93Q29udHJvbHMiLCJkZWZhdWx0VHJhbnNsYXRpb25zIiwiQUNUSU9OX0JBUl9DT05UQUlORVJfSEVJR0hUIiwiVFJFRV9BQ1RJT05TIiwiQUREX0NISUxEUkVOIiwiTU9WRV9MRUFGIiwiUkVOQU1FX1BBUkVOVCIsIkRFTEVURV9QQVJFTlQiLCJHcmlkIiwiQ29udGFpbmVyIiwiZGl2IiwiVHJlZUNvbnRhaW5lciIsInByb3BzIiwidGhlbWUiLCJndXR0ZXJXaWR0aCIsIk5vSXRlbXNUZXh0IiwicCIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsInNldERhdGEiLCJjbGVhclNlbGVjdGVkSXRlbXMiLCJtYXBTdGF0ZVRvUHJvcHMiLCJzdGF0ZSIsImdyaWRJZCIsImdyaWQiLCJpZCIsInNlbGVjdGVkR3JpZEl0ZW1zIiwiZGF0YWdyaWQiLCJnZXRJbiIsImdyaWREYXRhIiwiSGllcmFyY2h5VHJlZVNlbGVjdG9yIiwib25UcmVlSXRlbVNlbGVjdCIsInNlbGVjdGVkS2V5cyIsIm9uU2VsZWN0Iiwic2V0U3RhdGUiLCJvbkRlbGV0ZUNsaWNrIiwiY2hpbGRLZXkiLCJnZXRUcmVlSXRlbSIsIm1vdmVJdGVtVG9HcmlkIiwic2hvd0RlbGV0ZUNvbmZpcm1hdGlvbiIsIm9uQWRkTmV3Q2xpY2siLCJkYXRhIiwiY2FsbGJhY2siLCJvbkNoYW5nZSIsInRyZWVEYXRhIiwiaWRLZXkiLCJuZXdJdGVtcyIsInNsaWNlIiwicHVzaCIsImFjdGlvbiIsInR5cGUiLCJnZXRVcGRhdGVkVHJlZSIsInBhcmVudCIsImV4cGFuZFBhcmVudCIsIm9uTW92ZVRvR3JpZENsaWNrIiwib25PcmRlckNsaWNrIiwiaXRlbXMiLCJvbk1vdmVUb1RyZWVDbGljayIsInNlbGVjdGVkSWQiLCJmaWx0ZXIiLCJpbmNsdWRlcyIsImkiLCJnZXQiLCJ0b0pTIiwibmV3R3JpZEl0ZW1zIiwiaXRlbSIsInNldERhdGFUb0dyaWQiLCJvbklucHV0Q2hhbmdlIiwidmFsdWUiLCJvbkV4cGFuZCIsImlkcyIsImV4cGFuZGVkS2V5cyIsImFycmF5IiwiZm91bmQiLCJ2YWx1ZUtleSIsInJlbW92ZUFjdGlvbnMiLCJyb290SXRlbSIsImZpbmQiLCJsZW5ndGgiLCJnZXRBbGxMZWFmcyIsImRlc2VsZWN0SXRlbSIsImNoaWxkIiwiZmlsdGVyZWRDaGlsZHJlbiIsImNoaWxkSXRlbSIsImNvbmNhdCIsIlR5cGVFcnJvciIsImFscmVhZHlGb3VuZCIsImxlYWZzIiwicmV0dXJuUGFyZW50IiwiZm9yRWFjaCIsImdldEFkamFjZW50SXRlbSIsImdldEFkamFjZW50SXRlbUlkIiwicGFyZW50QXJyIiwiQXJyYXkiLCJpc0FycmF5IiwiaW5kZXgiLCJmaW5kSW5kZXgiLCJhZGphY2VudEl0ZW0iLCJzZXROZXdJdGVtcyIsImdyaWRDb2x1bW5zIiwic2VsZWN0ZWRLZXkiLCJuZXh0U2VsZWN0ZWRLZXkiLCJwYXJlbnRJZCIsImV4cGFuZGVkSWQiLCJuZXdFeHBhbmRlZEtleXMiLCJjbG9zZURlbGV0ZUNvbmZpcm1hdGlvbkRpYWxvZyIsImRlbGV0ZVBhcmVudCIsInJlbmRlckhlYWRlclJpZ2h0IiwidHJhbnNsYXRpb25zIiwicmVuZGVyIiwiY2xhc3NOYW1lIiwibWVyZ2VkR3JpZCIsIk9iamVjdCIsImFzc2lnbiIsImRlZmF1bHRTaG93RmlsdGVyaW5nUm93IiwibWVyZ2VkVHJhbnNsYXRpb25zIiwidHJlZVRpdGxlIiwibm9UcmVlSXRlbXMiLCJncmlkVGl0bGUiLCJkZWxldGVDb25maXJtRGlhbG9nIiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyIsInVuZGVmaW5lZCIsImRlZmF1bHRFeHBhbmRBbGwiLCJzaW5nbGVSb290Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU9BLGFBQVAsTUFBMEIsa0NBQTFCO0FBQ0EsU0FBU0MsU0FBVCxRQUEwQixrQ0FBMUI7QUFDQSxTQUFTQyxRQUFULEVBQW1CQyxTQUFuQixFQUE4QkMsZUFBOUIsRUFBK0NDLGVBQS9DLFFBQXNFLHdCQUF0RTtBQUNBLE9BQU9DLGFBQVAsTUFBMEIsdUNBQTFCO0FBQ0EsT0FBT0MsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLE1BQVAsTUFBbUIsbUJBQW5CO0FBQ0EsU0FBU0MsSUFBVCxFQUFlQyxNQUFmLFFBQTZCLFdBQTdCO0FBQ0EsT0FBT0Msa0JBQVAsTUFBK0IsMkJBQS9CO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLFNBQVNDLE9BQVQsUUFBd0IsYUFBeEI7O0FBRUE7QUFDQSxPQUFPQyxVQUFQLE1BQXVCLGlEQUF2QjtBQUNBLE9BQU9DLGFBQVAsTUFBMEIsb0RBQTFCO0FBQ0EsU0FBU0MsbUJBQVQsUUFBb0Msd0JBQXBDOztBQUVBLElBQU1DLDhCQUE4QixNQUFwQztBQUNBLElBQU1DLGVBQWU7QUFDbkJDLGdCQUFjLGNBREs7QUFFbkJDLGFBQVcsV0FGUTtBQUduQkMsaUJBQWUsZUFISTtBQUluQkMsaUJBQWU7QUFKSSxDQUFyQjs7QUFPQSxJQUFNQyxPQUFPZixPQUFPTixRQUFQLENBQVAsaUJBQU47O0FBT0EsSUFBTXNCLFlBQVloQixPQUFPaUIsR0FBbkIsa0JBQU47O0FBU0EsSUFBTUMsZ0JBQWdCbEIsT0FBT2lCLEdBQXZCLG1CQUdvQlIsMkJBSHBCLEVBSVM7QUFBQSxTQUFTVSxNQUFNQyxLQUFOLENBQVlDLFdBQXJCO0FBQUEsQ0FKVCxFQU9ZWiwyQkFQWixDQUFOOztBQW9CQSxJQUFNYSxjQUFjdEIsT0FBT3VC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QUFBQTtBQUFjcUMsK0JBQW1CRTtBQUFqQztBQWxCdkIsU0FERjtBQXFCRSw0QkFBQyxhQUFELGVBQ00sS0FBS3hHLEtBRFg7QUFFRSw0QkFBa0IsS0FBS3dCLFdBQUwsQ0FBaUIsS0FBS2YsS0FBTCxDQUFXVSxZQUFYLENBQXdCLENBQXhCLENBQWpCLENBRnBCO0FBR0UsNkJBQW1CLEtBQUt5QixpQkFIMUI7QUFJRSw2QkFBbUIsS0FBS0g7QUFKMUIsV0FyQkY7QUEyQkUsNEJBQUMsSUFBRDtBQUNFLGdCQUFNeUQsVUFEUjtBQUVFLG1CQUFTWixXQUZYO0FBR0UsMkJBSEY7QUFJRSx5QkFKRjtBQUtFLHVDQUxGO0FBTUUsc0JBQVk7QUFBQyxxQkFBRCxDQUFXLFFBQVg7QUFBQTtBQUFxQmdCLCtCQUFtQkc7QUFBeEM7QUFOZDtBQTNCRixPQURGO0FBcUNHLFdBQUtoRyxLQUFMLENBQVdpQixzQkFBWCxJQUNELG9CQUFDLGFBQUQ7QUFDRSxzQkFBYzRFLG1CQUFtQkksbUJBRG5DO0FBRUUseUJBQWlCLEtBQUtiLFlBRnhCO0FBR0Usd0JBQWdCLEtBQUtEO0FBSHZCO0FBdENGLEtBREY7QUErQ0QsRzs7O0VBamNnRGhILE1BQU0rSCxhLFdBdUJoREMsWSxHQUFlO0FBQ3BCNUUsU0FBTyxJQURhO0FBRXBCNkIsWUFBVSxNQUZVO0FBR3BCdEMsWUFBVSxVQUhVO0FBSXBCUSxZQUFVLEVBSlU7QUFLcEJrRSxhQUFXLEVBTFM7QUFNcEJGLGdCQUFjMUcsbUJBTk07QUFPcEJ1QixNQUFJLGdCQVBnQjtBQVFwQlEsWUFBVXlGLFNBUlU7QUFTcEIvRSxZQUFVK0UsU0FUVTtBQVVwQkMsb0JBQWtCLElBVkU7QUFXcEJDLGNBQVk7QUFYUSxDO1NBdkJIOUYscUIiLCJmaWxlIjoiaGllcmFyY2h5LXRyZWUtc2VsZWN0b3IuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRyZWVDb21wb25lbnQgZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtdHJlZS1jb21wb25lbnQnO1xuaW1wb3J0IHsgUHJpbWl0aXZlIH0gZnJvbSAnQG9wdXNjYXBpdGEvb2MtY20tY29tbW9uLWxheW91dHMnO1xuaW1wb3J0IHsgRGF0YWdyaWQsIGdyaWRTaGFwZSwgZ3JpZENvbHVtblNoYXBlLCBEYXRhZ3JpZEFjdGlvbnMgfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1ncmlkJztcbmltcG9ydCBDb25maXJtRGlhbG9nIGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWNvbmZpcm1hdGlvbi1kaWFsb2cnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHsgTGlzdCwgZnJvbUpTIH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCBJbW11dGFibGVQcm9wVHlwZXMgZnJvbSAncmVhY3QtaW1tdXRhYmxlLXByb3B0eXBlcyc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuLy8gQXBwIGltcG9ydHNcbmltcG9ydCBDb250cm9sQmFyIGZyb20gJy4vaGllcmFyY2h5LXRyZWUtc2VsZWN0b3ItY29udHJvbC1iYXIuY29tcG9uZW50JztcbmltcG9ydCBBcnJvd0NvbnRyb2xzIGZyb20gJy4vaGllcmFyY2h5LXRyZWUtc2VsZWN0b3ItYXJyb3ctY29udHJvbHMuY29tcG9uZW50JztcbmltcG9ydCB7IGRlZmF1bHRUcmFuc2xhdGlvbnMgfSBmcm9tICcuL2hpZXJhcmNoeS10cmVlLnV0aWxzJztcblxuY29uc3QgQUNUSU9OX0JBUl9DT05UQUlORVJfSEVJR0hUID0gJzU0cHgnO1xuY29uc3QgVFJFRV9BQ1RJT05TID0ge1xuICBBRERfQ0hJTERSRU46ICdBRERfQ0hJTERSRU4nLFxuICBNT1ZFX0xFQUY6ICdNT1ZFX0xFQUYnLFxuICBSRU5BTUVfUEFSRU5UOiAnUkVOQU1FX1BBUkVOVCcsXG4gIERFTEVURV9QQVJFTlQ6ICdERUxFVEVfUEFSRU5UJyxcbn07XG5cbmNvbnN0IEdyaWQgPSBzdHlsZWQoRGF0YWdyaWQpYFxuICBoZWlnaHQ6IDEwMCU7XG4gICYmJiB7XG4gICAgcGFkZGluZzogMDtcbiAgfVxuYDtcblxuY29uc3QgQ29udGFpbmVyID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogZmxleDtcbiAgbWluLWhlaWdodDogMzAwcHg7XG4gID4gZGl2IHtcbiAgICB3aWR0aDogNTAlO1xuICAgIGZsZXg6IDEgMSAxMDAlO1xuICB9XG5gO1xuXG5jb25zdCBUcmVlQ29udGFpbmVyID0gc3R5bGVkLmRpdmBcbiAgaGVpZ2h0OjEwMCU7XG4gIC5vYy1zY3JvbGxiYXItY29udGFpbmVyIHtcbiAgICBoZWlnaHQ6IGNhbGMoMTAwJSAtICR7QUNUSU9OX0JBUl9DT05UQUlORVJfSEVJR0hUfSk7XG4gICAgcGFkZGluZzogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5ndXR0ZXJXaWR0aH07XG4gIH1cbiAgLnRyZWUtaGVhZGVyIHtcbiAgICBtaW4taGVpZ2h0OiAke0FDVElPTl9CQVJfQ09OVEFJTkVSX0hFSUdIVH07XG4gICAgLm9yZGVyaW5nLWFycm93cyB7XG4gICAgICBmb250LXdlaWdodDogMjRweDtcbiAgICB9XG4gIH1cbiAgLm9jLXJlYWN0LXRyZWUge1xuICAgIGhlaWdodDogMTAwJTtcbiAgICAucmMtdHJlZS1pY29uRWxlLnJjLXRyZWUtaWNvbl9fY3VzdG9taXplIHtcbiAgICAgICAgZGlzcGxheTpub25lO1xuICAgIH1cbiAgfVxuYDtcblxuY29uc3QgTm9JdGVtc1RleHQgPSBzdHlsZWQucGBcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuYDtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0ge1xuICBzZXREYXRhOiBEYXRhZ3JpZEFjdGlvbnMuc2V0RGF0YSxcbiAgY2xlYXJTZWxlY3RlZEl0ZW1zOiBEYXRhZ3JpZEFjdGlvbnMuY2xlYXJTZWxlY3RlZEl0ZW1zLFxufTtcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlLCBwcm9wcykgPT4ge1xuICBjb25zdCBncmlkSWQgPSBwcm9wcy5ncmlkLmlkO1xuICByZXR1cm4ge1xuICAgIHNlbGVjdGVkR3JpZEl0ZW1zOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbZ3JpZElkLCAnc2VsZWN0ZWRJdGVtcyddLCBMaXN0KCkpLFxuICAgIGdyaWREYXRhOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbZ3JpZElkLCAnYWxsRGF0YSddLCBMaXN0KCkpLFxuICB9O1xufTtcblxuQGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIaWVyYXJjaHlUcmVlU2VsZWN0b3IgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBpZEtleTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB2YWx1ZUtleTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjaGlsZEtleTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB0cmVlRGF0YTogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnNoYXBlKHt9KSksXG4gICAgZ3JpZDogZ3JpZFNoYXBlLmlzUmVxdWlyZWQsXG4gICAgZ3JpZENvbHVtbnM6IFByb3BUeXBlcy5hcnJheU9mKGdyaWRDb2x1bW5TaGFwZSkuaXNSZXF1aXJlZCxcbiAgICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgc2V0RGF0YTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBjbGVhclNlbGVjdGVkSXRlbXM6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgc2VsZWN0ZWRHcmlkSXRlbXM6IEltbXV0YWJsZVByb3BUeXBlcy5saXN0LmlzUmVxdWlyZWQsXG4gICAgZ3JpZERhdGE6IEltbXV0YWJsZVByb3BUeXBlcy5saXN0LmlzUmVxdWlyZWQsXG4gICAgdHJhbnNsYXRpb25zOiBQcm9wVHlwZXMuc2hhcGUoe30pLFxuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRlZmF1bHRFeHBhbmRBbGw6IFByb3BUeXBlcy5ib29sLFxuICAgIHNpbmdsZVJvb3Q6IFByb3BUeXBlcy5ib29sLFxuXG4gICAgLy8gQ2FsbGJhY2tzXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGlkS2V5OiAnaWQnLFxuICAgIHZhbHVlS2V5OiAnbmFtZScsXG4gICAgY2hpbGRLZXk6ICdjaGlsZHJlbicsXG4gICAgdHJlZURhdGE6IFtdLFxuICAgIGNsYXNzTmFtZTogJycsXG4gICAgdHJhbnNsYXRpb25zOiBkZWZhdWx0VHJhbnNsYXRpb25zLFxuICAgIGlkOiAnaGllcmFyY2h5LXRyZWUnLFxuICAgIG9uU2VsZWN0OiB1bmRlZmluZWQsXG4gICAgb25DaGFuZ2U6IHVuZGVmaW5lZCxcbiAgICBkZWZhdWx0RXhwYW5kQWxsOiB0cnVlLFxuICAgIHNpbmdsZVJvb3Q6IHRydWUsXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgc2VsZWN0ZWRLZXlzOiBbXSxcbiAgICAgIHNob3dEZWxldGVDb25maXJtYXRpb246IGZhbHNlLFxuICAgIH07XG4gIH1cblxuXG4gIC8qKlxuICAgKiBTZWxlY3RzIGEgdHJlZSBpdGVtXG4gICAqIEBwYXJhbSBzZWxlY3RlZEtleXMgKGFycmF5KVxuICAgKi9cbiAgb25UcmVlSXRlbVNlbGVjdCA9IChzZWxlY3RlZEtleXMpID0+IHtcbiAgICBjb25zdCB7IG9uU2VsZWN0IH0gPSB0aGlzLnByb3BzO1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZEtleXMgfSwgKCkgPT4ge1xuICAgICAgaWYgKG9uU2VsZWN0KSBvblNlbGVjdChzZWxlY3RlZEtleXMpO1xuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBEaXNwbGF5cyBhIGNvbmZpcm1hdGlvbiBkaWFsb2dcbiAgICovXG4gIG9uRGVsZXRlQ2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBjaGlsZEtleSB9ID0gdGhpcy5wcm9wcztcblxuICAgIC8vIElmIGl0ZW0gaXMgbm90IGEgcGFyZW50LCB3ZSB3b24ndCBzaG93IHRoZSBkZWxldGUgY29uZmlybWF0aW9uIGRpYWxvZ1xuICAgIGlmICghdGhpcy5nZXRUcmVlSXRlbSh0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXSlbY2hpbGRLZXldKSB7XG4gICAgICB0aGlzLm1vdmVJdGVtVG9HcmlkKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoeyBzaG93RGVsZXRlQ29uZmlybWF0aW9uOiB0cnVlIH0pO1xuICB9O1xuXG5cbiAgLyoqXG4gICAqIEFkZHMgYSBuZXcgbm9kZSB0byB0aGUgcm9vdCBvZiB0aGUgdHJlZSwgb3IgdW5kZXIgYSBzZWxlY3RlZCB0cmVlIG5vZGUgdXNpbmdcbiAgICogQUREX0NISUxEUkVOIGFjdGlvblxuICAgKiBAcGFyYW0gZGF0YSAtIGRhdGEgdG8gYmUgYWRkZWRcbiAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAqL1xuICBvbkFkZE5ld0NsaWNrID0gKGRhdGEsIGNhbGxiYWNrKSA9PiB7XG4gICAgY29uc3QgeyBvbkNoYW5nZSwgdHJlZURhdGEsIGlkS2V5IH0gPSB0aGlzLnByb3BzO1xuICAgIGxldCBuZXdJdGVtcyA9IHRyZWVEYXRhLnNsaWNlKCk7XG5cbiAgICAvLyBJZiBubyB0cmVlIG5vZGUgaXMgc2VsZWN0ZWQsIHdlJ2xsIHBsYWNlIHRoZSBuZXcgaXRlbSB0byB0aGUgcm9vdFxuICAgIC8vIG9mIHRoZSB0cmVlXG4gICAgaWYgKCF0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXSkge1xuICAgICAgbmV3SXRlbXMucHVzaChkYXRhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgYWN0aW9uID0ge1xuICAgICAgICB0eXBlOiBUUkVFX0FDVElPTlMuQUREX0NISUxEUkVOLFxuICAgICAgICBkYXRhLFxuICAgICAgfTtcbiAgICAgIG5ld0l0ZW1zID0gdGhpcy5nZXRVcGRhdGVkVHJlZSh0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXSwgdHJlZURhdGEsIGFjdGlvbik7XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZEtleXM6IFtkYXRhW2lkS2V5XV0gfSwgKCkgPT4ge1xuICAgICAgLy8gSWYgdGhlIHBhcmVudCBpcyBub3QgeWV0IGV4cGFuZGVkLCB3ZSB3aWxsIGV4cGFuZCBpdCBub3dcbiAgICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuZ2V0VHJlZUl0ZW0oZGF0YVtpZEtleV0sIHRyZWVEYXRhLCB0cnVlKSB8fCB7fTtcbiAgICAgIHRoaXMuZXhwYW5kUGFyZW50KHBhcmVudFtpZEtleV0pO1xuXG4gICAgICBpZiAob25DaGFuZ2UpIG9uQ2hhbmdlKG5ld0l0ZW1zKTtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfSk7XG4gIH07XG5cblxuICBvbk1vdmVUb0dyaWRDbGljayA9ICgpID0+IHtcbiAgICB0aGlzLm1vdmVJdGVtVG9HcmlkKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIENhbGxzIG9uQ2hhbmdlIGNhbGxiYWNrIHdoZW5ldmVyIHVzZXIgcmVvcmRlcnMgdHJlZSBpdGVtcyB1c2luZyBvcmRlcmluZyBhcnJvd3NcbiAgICogQHBhcmFtIGl0ZW1zXG4gICAqL1xuICBvbk9yZGVyQ2xpY2sgPSAoaXRlbXMpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKGl0ZW1zKTtcbiAgfTtcblxuICAvKipcbiAgICogQWRkcyBzZWxlY3RlZCBncmlkIGl0ZW1zIHRvIHRoZSBjaG9zZW4gdHJlZSBub2RlIHVzaW5nIEFERF9DSElMRFJFTiBhY3Rpb25cbiAgICovXG4gIG9uTW92ZVRvVHJlZUNsaWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIG9uQ2hhbmdlLCBzZWxlY3RlZEdyaWRJdGVtcywgZ3JpZERhdGEsIHRyZWVEYXRhLCBpZEtleSxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzZWxlY3RlZElkID0gdGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF07XG5cbiAgICBjb25zdCBhY3Rpb24gPSB7XG4gICAgICB0eXBlOiBUUkVFX0FDVElPTlMuQUREX0NISUxEUkVOLFxuICAgICAgZGF0YTogZ3JpZERhdGFcbiAgICAgICAgLmZpbHRlcihpID0+IHNlbGVjdGVkR3JpZEl0ZW1zLmluY2x1ZGVzKGkuZ2V0KGlkS2V5KSkpXG4gICAgICAgIC50b0pTKCksXG4gICAgfTtcbiAgICBjb25zdCBuZXdJdGVtcyA9IHRoaXMuZ2V0VXBkYXRlZFRyZWUoc2VsZWN0ZWRJZCwgdHJlZURhdGEsIGFjdGlvbik7XG4gICAgY29uc3QgbmV3R3JpZEl0ZW1zID0gZ3JpZERhdGEuZmlsdGVyKGl0ZW0gPT4gIXNlbGVjdGVkR3JpZEl0ZW1zLmluY2x1ZGVzKGl0ZW0uZ2V0KGlkS2V5KSkpO1xuXG4gICAgdGhpcy5leHBhbmRQYXJlbnQoc2VsZWN0ZWRJZCwgdHJ1ZSk7XG4gICAgdGhpcy5zZXREYXRhVG9HcmlkKG5ld0dyaWRJdGVtcywgdHJ1ZSk7XG4gICAgaWYgKG9uQ2hhbmdlKSBvbkNoYW5nZShuZXdJdGVtcyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlbmFtZXMgdGhlIGNob3NlbiB0cmVlIG5vZGUgdXNpbmcgYSBSRU5BTUVfUEFSRU5UIGFjdGlvblxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICovXG4gIG9uSW5wdXRDaGFuZ2UgPSAodmFsdWUpID0+IHtcbiAgICBjb25zdCB7IHRyZWVEYXRhLCBvbkNoYW5nZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBhY3Rpb24gPSB7XG4gICAgICB0eXBlOiBUUkVFX0FDVElPTlMuUkVOQU1FX1BBUkVOVCxcbiAgICAgIGRhdGE6IHZhbHVlLFxuICAgIH07XG4gICAgY29uc3QgbmV3SXRlbXMgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdLCB0cmVlRGF0YSwgYWN0aW9uKTtcbiAgICBpZiAob25DaGFuZ2UpIG9uQ2hhbmdlKG5ld0l0ZW1zKTtcbiAgfTtcblxuICAvKipcbiAgICogRmlyZWQgb24gZXhwYW5kXG4gICAqIEBwYXJhbSBpZHNcbiAgICovXG4gIG9uRXhwYW5kID0gKGlkcykgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZXhwYW5kZWRLZXlzOiBpZHMsXG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdXBkYXRlZCB0cmVlIGl0ZW1zLlxuICAgKiBAcGFyYW0gaWQgLSB0YXJnZXQgaXRlbVxuICAgKiBAcGFyYW0gYXJyYXkgLSBhcnJheSB3aGVyZSB0YXJnZXQgaXRlbSBpcyBiZWluZyBzZWFyY2hlZFxuICAgKiBAcGFyYW0gYWN0aW9uIC0gYWN0aW9uIHRvIGJlIHBlcmZvcm1lZCB7dHlwZSwgZGF0YX1cbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBnZXRVcGRhdGVkVHJlZSA9IChpZCwgYXJyYXkgPSB0aGlzLnByb3BzLnRyZWVEYXRhLCBhY3Rpb24pID0+IHtcbiAgICBsZXQgZm91bmQgPSBmYWxzZTtcbiAgICBjb25zdCB7IGlkS2V5LCBjaGlsZEtleSwgdmFsdWVLZXkgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgbmV3SXRlbXMgPSBhcnJheS5zbGljZSgpO1xuICAgIGNvbnN0IHJlbW92ZUFjdGlvbnMgPSBbVFJFRV9BQ1RJT05TLk1PVkVfTEVBRiwgVFJFRV9BQ1RJT05TLkRFTEVURV9QQVJFTlRdO1xuXG4gICAgLy8gSWYgZGVsZXRlZCBwYXJlbnQgaXRlbSBpcyBpbiB0aGUgcm9vdCBub2RlXG4gICAgaWYgKGFjdGlvbi50eXBlID09PSBUUkVFX0FDVElPTlMuREVMRVRFX1BBUkVOVCkge1xuICAgICAgY29uc3Qgcm9vdEl0ZW0gPSBhcnJheS5maW5kKGl0ZW0gPT4gaXRlbVtpZEtleV0gPT09IGlkKTtcbiAgICAgIGlmIChyb290SXRlbSkge1xuICAgICAgICBpZiAocm9vdEl0ZW1bY2hpbGRLZXldLmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuc2V0RGF0YVRvR3JpZChmcm9tSlModGhpcy5nZXRBbGxMZWFmcyhyb290SXRlbVtjaGlsZEtleV0pKSk7XG4gICAgICAgICAgdGhpcy5kZXNlbGVjdEl0ZW0oKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3SXRlbXMuZmlsdGVyKGl0ZW0gPT4gaXRlbVtpZEtleV0gIT09IGlkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5ld0l0ZW1zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBpdGVtID0gbmV3SXRlbXNbaV07XG4gICAgICBpZiAocmVtb3ZlQWN0aW9ucy5pbmNsdWRlcyhhY3Rpb24udHlwZSkgJiYgaXRlbVtjaGlsZEtleV0gJiYgIWZvdW5kKSB7XG4gICAgICAgIGZvdW5kID0gISFpdGVtW2NoaWxkS2V5XS5maW5kKGNoaWxkID0+IGNoaWxkW2lkS2V5XSA9PT0gaWQpO1xuICAgICAgICBpZiAoZm91bmQpIHtcbiAgICAgICAgICAvLyBXaGVuIHJlbW92aW5nIGFuIGl0ZW0gd2UgbXVzdCBmaXJzdCBmaW5kIGl0cyBwYXJlbnQgYW5kIGFsdGVyIGl0cyBjaGlsZHJlbiBhcnJheVxuICAgICAgICAgIGlmIChhY3Rpb24udHlwZSA9PT0gVFJFRV9BQ1RJT05TLk1PVkVfTEVBRikge1xuICAgICAgICAgICAgaXRlbVtjaGlsZEtleV0gPSBpdGVtW2NoaWxkS2V5XS5maWx0ZXIoY2hpbGQgPT4gY2hpbGRbaWRLZXldICE9PSBpZCk7XG4gICAgICAgICAgICB0aGlzLmRlc2VsZWN0SXRlbSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYWN0aW9uLnR5cGUgPT09IFRSRUVfQUNUSU9OUy5ERUxFVEVfUEFSRU5UKSB7XG4gICAgICAgICAgICAvLyB3ZSBtdXN0IGZpcnN0IGZpbHRlciB0aGUgY2hpbGRyZW4sIHNvIHRoYXQgd2Ugd29uJ3QgZ2V0IGxlYWZzIGZyb21cbiAgICAgICAgICAgIC8vIG90aGVyIGNoaWxkIGJyYW5jaGVzXG4gICAgICAgICAgICBjb25zdCBmaWx0ZXJlZENoaWxkcmVuID0gaXRlbVtjaGlsZEtleV0uZmlsdGVyKGNoaWxkSXRlbSA9PiBjaGlsZEl0ZW1baWRLZXldID09PSBpZCk7XG4gICAgICAgICAgICB0aGlzLnNldERhdGFUb0dyaWQoZnJvbUpTKHRoaXMuZ2V0QWxsTGVhZnMoZmlsdGVyZWRDaGlsZHJlbikpKTtcbiAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RJdGVtKCk7XG4gICAgICAgICAgICBpdGVtW2NoaWxkS2V5XSA9IGl0ZW1bY2hpbGRLZXldLmZpbHRlcihjaGlsZEl0ZW0gPT4gY2hpbGRJdGVtW2lkS2V5XSAhPT0gaWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVtpZEtleV0gPT09IGlkICYmICFmb3VuZCkge1xuICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgICBjYXNlIFRSRUVfQUNUSU9OUy5BRERfQ0hJTERSRU46XG4gICAgICAgICAgICBpdGVtW2NoaWxkS2V5XSA9IChpdGVtW2NoaWxkS2V5XSB8fCBbXSkuY29uY2F0KGFjdGlvbi5kYXRhKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgVFJFRV9BQ1RJT05TLlJFTkFNRV9QQVJFTlQ6XG4gICAgICAgICAgICBpdGVtW3ZhbHVlS2V5XSA9IGFjdGlvbi5kYXRhO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FjdGlvbiB0eXBlIGlzIHVuZGVmaW5lZCcpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bY2hpbGRLZXldICYmICFmb3VuZCkgZm91bmQgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKGlkLCBpdGVtW2NoaWxkS2V5XSwgYWN0aW9uKTtcbiAgICB9XG5cbiAgICBpZiAoIWZvdW5kKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIG5ld0l0ZW1zO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHJlY3Vyc2l2ZWx5IGFsbCBsZWFmIGl0ZW1zIGZyb20gYSBnaXZlbiBhcnJheVxuICAgKiBAcGFyYW0gYXJyYXlcbiAgICogQHBhcmFtIGFscmVhZHlGb3VuZCAodXNlZCByZWN1cnNpdmVseSlcbiAgICovXG4gIGdldEFsbExlYWZzID0gKGFycmF5LCBhbHJlYWR5Rm91bmQgPSBbXSkgPT4ge1xuICAgIGNvbnN0IHsgY2hpbGRLZXkgfSA9IHRoaXMucHJvcHM7XG4gICAgbGV0IGxlYWZzID0gYWxyZWFkeUZvdW5kO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3QgaXRlbSA9IGFycmF5W2ldO1xuICAgICAgaWYgKGl0ZW1bY2hpbGRLZXldKSB7XG4gICAgICAgIGxlYWZzID0gdGhpcy5nZXRBbGxMZWFmcyhpdGVtW2NoaWxkS2V5XSwgYWxyZWFkeUZvdW5kKTtcbiAgICAgIH1cbiAgICAgIGlmICghaXRlbVtjaGlsZEtleV0pIGxlYWZzLnB1c2goaXRlbSk7XG4gICAgfVxuICAgIHJldHVybiBsZWFmcztcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyBhIHRyZWUgaXRlbSBieSBJRFxuICAgKiBAcGFyYW0gaWRcbiAgICogQHBhcmFtIGFycmF5XG4gICAqIEBwYXJhbSByZXR1cm5QYXJlbnQgLSByZXR1cm4gaXRlbSdzIHBhcmVudCBpbnN0ZWFkIG9mIHRoZSBpdGVtXG4gICAqIEBwYXJhbSBwYXJlbnQgLSBwYXJlbnQgaXRlbSAodXNlZCByZWN1cnNpdmVseSlcbiAgICogQHJldHVybnMge3t9fVxuICAgKi9cbiAgZ2V0VHJlZUl0ZW0gPSAoaWQsIGFycmF5ID0gdGhpcy5wcm9wcy50cmVlRGF0YSwgcmV0dXJuUGFyZW50ID0gZmFsc2UsIHBhcmVudCA9IG51bGwpID0+IHtcbiAgICBjb25zdCB7IGNoaWxkS2V5LCBpZEtleSB9ID0gdGhpcy5wcm9wcztcbiAgICBsZXQgZm91bmQgPSBhcnJheS5maW5kKGl0ZW0gPT4gaXRlbVtpZEtleV0gPT09IGlkKTtcblxuICAgIGlmIChmb3VuZCAmJiByZXR1cm5QYXJlbnQpIGZvdW5kID0gcGFyZW50O1xuXG4gICAgaWYgKCFmb3VuZCkge1xuICAgICAgYXJyYXkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBpZiAoaXRlbVtjaGlsZEtleV0gJiYgIWZvdW5kKSB7XG4gICAgICAgICAgZm91bmQgPSB0aGlzLmdldFRyZWVJdGVtKGlkLCBpdGVtW2NoaWxkS2V5XSwgcmV0dXJuUGFyZW50LCBpdGVtKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBmb3VuZDtcbiAgfTtcblxuICAvKipcbiAgICogR2V0IGFkamFjZW50IGl0ZW0gKGlkKSBpbiBwYXJlbnQgYXJyYXkuIFVzZWQgd2hlbiBtb3ZpbmcgaXRlbXMgZnJvbSB0cmVlXG4gICAqIHRvIGdyaWQvZGVsZXRpbmcgYW4gaXRlbVxuICAgKiBAcGFyYW0gaWRcbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBnZXRBZGphY2VudEl0ZW0gPSAoaWQpID0+IHtcbiAgICBpZiAoIWlkKSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCB7IGNoaWxkS2V5LCBpZEtleSwgdHJlZURhdGEgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBnZXRBZGphY2VudEl0ZW1JZCA9IChwYXJlbnQpID0+IHtcbiAgICAgIGNvbnN0IHBhcmVudEFyciA9IEFycmF5LmlzQXJyYXkocGFyZW50KSA/IHBhcmVudCA6IHBhcmVudFtjaGlsZEtleV07XG4gICAgICBjb25zdCBpbmRleCA9IHBhcmVudEFyci5maW5kSW5kZXgoY2hpbGQgPT4gY2hpbGRbaWRLZXldID09PSBpZCk7XG4gICAgICBsZXQgYWRqYWNlbnRJdGVtID0gcGFyZW50QXJyW2luZGV4ICsgMV07XG4gICAgICBpZiAoIWFkamFjZW50SXRlbSkgYWRqYWNlbnRJdGVtID0gcGFyZW50QXJyW2luZGV4IC0gMV07XG4gICAgICBpZiAoIWFkamFjZW50SXRlbSAmJiAhQXJyYXkuaXNBcnJheShwYXJlbnQpKSBhZGphY2VudEl0ZW0gPSBwYXJlbnQ7XG4gICAgICBpZiAoIWFkamFjZW50SXRlbSkgcmV0dXJuIG51bGw7XG5cbiAgICAgIHJldHVybiBhZGphY2VudEl0ZW1baWRLZXldO1xuICAgIH07XG5cbiAgICBjb25zdCBwYXJlbnQgPSB0aGlzLmdldFRyZWVJdGVtKGlkLCB0aGlzLnByb3BzLnRyZWVEYXRhLCB0cnVlKTtcbiAgICByZXR1cm4gcGFyZW50ID8gZ2V0QWRqYWNlbnRJdGVtSWQocGFyZW50KSA6IGdldEFkamFjZW50SXRlbUlkKHRyZWVEYXRhKTtcbiAgfTtcblxuICAvKipcbiAgICogQXBwZW5kcyBwcm92aWRlZCBpdGVtcyB0byB0aGUgZ3JpZFxuICAgKiBAcGFyYW0gaXRlbXMgLSBpbW11dGFibGUgYXJyYXkgb2YgaXRlbXMgdG8gYmUgYXBwZW5kZWQgdG8gZ3JpZFxuICAgKiBAcGFyYW0gc2V0TmV3SXRlbXMgLSBzZXQgY29tcGxldGVseSBhIG5ldyBhcnJheSBvZiBpdGVtc1xuICAgKi9cbiAgc2V0RGF0YVRvR3JpZCA9IChpdGVtcywgc2V0TmV3SXRlbXMgPSBmYWxzZSkgPT4ge1xuICAgIGxldCBkYXRhID0gTGlzdCgpO1xuICAgIGNvbnN0IHsgZ3JpZCwgZ3JpZENvbHVtbnMsIGdyaWREYXRhIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghc2V0TmV3SXRlbXMpIGRhdGEgPSBncmlkRGF0YS5zbGljZSgpO1xuICAgIGNvbnN0IG5ld0dyaWRJdGVtcyA9IGRhdGEuY29uY2F0KGl0ZW1zKTtcblxuICAgIHRoaXMucHJvcHMuc2V0RGF0YShncmlkLCBncmlkQ29sdW1ucywgbmV3R3JpZEl0ZW1zKTtcbiAgICB0aGlzLnByb3BzLmNsZWFyU2VsZWN0ZWRJdGVtcyhncmlkKTtcbiAgfTtcblxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIHRoZSBjaG9zZW4gaXRlbSBmcm9tIGEgdHJlZSBhbmQgdXBkYXRlcyB0aGUgZ3JpZCB1c2luZyBNT1ZFX0xFQUZcbiAgICogYWN0aW9uXG4gICAqL1xuICBtb3ZlSXRlbVRvR3JpZCA9ICgpID0+IHtcbiAgICBjb25zdCB7IHRyZWVEYXRhLCBvbkNoYW5nZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzZWxlY3RlZEtleSA9IHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdO1xuICAgIGNvbnN0IGFjdGlvbiA9IHtcbiAgICAgIHR5cGU6IFRSRUVfQUNUSU9OUy5NT1ZFX0xFQUYsXG4gICAgICBkYXRhOiB0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXSxcbiAgICB9O1xuICAgIGNvbnN0IG5leHRTZWxlY3RlZEtleSA9IHRoaXMuZ2V0QWRqYWNlbnRJdGVtKHNlbGVjdGVkS2V5KTtcbiAgICBjb25zdCBuZXdHcmlkSXRlbXMgPSBmcm9tSlMoW3RoaXMuZ2V0VHJlZUl0ZW0oc2VsZWN0ZWRLZXkpXSk7XG4gICAgY29uc3QgbmV3SXRlbXMgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKHNlbGVjdGVkS2V5LCB0cmVlRGF0YSwgYWN0aW9uKTtcblxuICAgIHRoaXMuc2V0RGF0YVRvR3JpZChuZXdHcmlkSXRlbXMpO1xuICAgIGlmIChvbkNoYW5nZSkgb25DaGFuZ2UobmV3SXRlbXMpO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2VsZWN0ZWRLZXlzOiBbbmV4dFNlbGVjdGVkS2V5XSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeHBhbmRzIGEgcGFyZW50XG4gICAqIEBwYXJhbSBwYXJlbnRJZFxuICAgKi9cbiAgZXhwYW5kUGFyZW50ID0gKHBhcmVudElkKSA9PiB7XG4gICAgaWYgKHBhcmVudElkICYmICF0aGlzLnN0YXRlLmV4cGFuZGVkS2V5cy5maW5kKGV4cGFuZGVkSWQgPT4gZXhwYW5kZWRJZCA9PT0gcGFyZW50SWQpKSB7XG4gICAgICBjb25zdCBuZXdFeHBhbmRlZEtleXMgPSB0aGlzLnN0YXRlLmV4cGFuZGVkS2V5cy5zbGljZSgpO1xuICAgICAgbmV3RXhwYW5kZWRLZXlzLnB1c2gocGFyZW50SWQpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGV4cGFuZGVkS2V5czogbmV3RXhwYW5kZWRLZXlzIH0pO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogQ2xvc2VzIGRlbGV0ZSBjb25maXJtYXRpb24gZGlhbG9nXG4gICAqL1xuICBjbG9zZURlbGV0ZUNvbmZpcm1hdGlvbkRpYWxvZyA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2hvd0RlbGV0ZUNvbmZpcm1hdGlvbjogZmFsc2UgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIERlbGV0ZXMgYSBwYXJlbnQgbm9kZVxuICAgKi9cbiAgZGVsZXRlUGFyZW50ID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgb25DaGFuZ2UsIHRyZWVEYXRhIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHNlbGVjdGVkS2V5ID0gdGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF07XG4gICAgY29uc3QgYWN0aW9uID0ge1xuICAgICAgdHlwZTogVFJFRV9BQ1RJT05TLkRFTEVURV9QQVJFTlQsXG4gICAgfTtcbiAgICBjb25zdCBuZXh0U2VsZWN0ZWRLZXkgPSB0aGlzLmdldEFkamFjZW50SXRlbShzZWxlY3RlZEtleSk7XG4gICAgY29uc3QgbmV3SXRlbXMgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKHNlbGVjdGVkS2V5LCB0cmVlRGF0YSwgYWN0aW9uKTtcbiAgICBpZiAob25DaGFuZ2UpIG9uQ2hhbmdlKG5ld0l0ZW1zKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNlbGVjdGVkS2V5czogW25leHRTZWxlY3RlZEtleV0sXG4gICAgICBzaG93RGVsZXRlQ29uZmlybWF0aW9uOiBmYWxzZSxcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogRGVzZWxlY3RzIGFuIGl0ZW0sIGlmIGl0IGlzIGUuZy4gcmVtb3ZlZFxuICAgKi9cbiAgZGVzZWxlY3RJdGVtID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZEtleXM6IFtdIH0pO1xuICB9O1xuXG4gIHJlbmRlckhlYWRlclJpZ2h0ID0gdHJhbnNsYXRpb25zID0+IChcbiAgICA8Q29udHJvbEJhclxuICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICBvbkFkZE5ld0NsaWNrPXt0aGlzLm9uQWRkTmV3Q2xpY2t9XG4gICAgICBvbkRlbGV0ZUNsaWNrPXt0aGlzLm9uRGVsZXRlQ2xpY2t9XG4gICAgICBvbklucHV0Q2hhbmdlPXt0aGlzLm9uSW5wdXRDaGFuZ2V9XG4gICAgICBzZWxlY3RlZFRyZWVJdGVtPXt0aGlzLmdldFRyZWVJdGVtKHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdKX1cbiAgICAgIGhlaWdodD17QUNUSU9OX0JBUl9DT05UQUlORVJfSEVJR0hUfVxuICAgICAgdHJhbnNsYXRpb25zPXt0cmFuc2xhdGlvbnN9XG4gICAgLz5cbiAgKTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgdmFsdWVLZXksIGlkS2V5LCB0cmVlRGF0YSwgZ3JpZCwgZ3JpZENvbHVtbnMsIGNsYXNzTmFtZSwgdHJhbnNsYXRpb25zLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgbWVyZ2VkR3JpZCA9IE9iamVjdC5hc3NpZ24oe30sIGdyaWQsIHsgZGVmYXVsdFNob3dGaWx0ZXJpbmdSb3c6IHRydWUgfSk7XG4gICAgY29uc3QgbWVyZ2VkVHJhbnNsYXRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdFRyYW5zbGF0aW9ucywgdHJhbnNsYXRpb25zKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8UmVhY3QuRnJhZ21lbnQ+XG4gICAgICAgIDxDb250YWluZXIgY2xhc3NOYW1lPXtjbGFzc05hbWV9PlxuICAgICAgICAgIDxUcmVlQ29udGFpbmVyPlxuICAgICAgICAgICAgeyEhdHJlZURhdGEubGVuZ3RoICYmIDxUcmVlQ29tcG9uZW50XG4gICAgICAgICAgICAgIHRyZWVEYXRhPXt0cmVlRGF0YX1cbiAgICAgICAgICAgICAgZGF0YUxvb2tVcEtleT17aWRLZXl9XG4gICAgICAgICAgICAgIGRhdGFMb29rVXBWYWx1ZT17dmFsdWVLZXl9XG4gICAgICAgICAgICAgIG9uU2VsZWN0PXt0aGlzLm9uVHJlZUl0ZW1TZWxlY3R9XG4gICAgICAgICAgICAgIG9uRXhwYW5kPXt0aGlzLm9uRXhwYW5kfVxuICAgICAgICAgICAgICBjaGVja2FibGU9e2ZhbHNlfVxuICAgICAgICAgICAgICBzZWxlY3RlZEtleXM9e3RoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzfVxuICAgICAgICAgICAgICBleHBhbmRlZEtleXM9e3RoaXMuc3RhdGUuZXhwYW5kZWRLZXlzfVxuICAgICAgICAgICAgICBvbk9yZGVyQnV0dG9uQ2xpY2s9e3RoaXMub25PcmRlckNsaWNrfVxuICAgICAgICAgICAgICB0aXRsZT17bWVyZ2VkVHJhbnNsYXRpb25zLnRyZWVUaXRsZX1cbiAgICAgICAgICAgICAgc2VsZWN0YWJsZVxuICAgICAgICAgICAgICBzaG93T3JkZXJpbmdBcnJvd3NcbiAgICAgICAgICAgICAgc2hvd0V4cGFuZEFsbFxuICAgICAgICAgICAgICBoZWFkZXJSaWdodD17dGhpcy5yZW5kZXJIZWFkZXJSaWdodChtZXJnZWRUcmFuc2xhdGlvbnMpfVxuICAgICAgICAgICAgICBoYW5kbGVFeHBhbmRlZEtleXNNYW51YWxseVxuICAgICAgICAgICAgLz59XG4gICAgICAgICAgICB7IXRyZWVEYXRhLmxlbmd0aCAmJiA8Tm9JdGVtc1RleHQ+e21lcmdlZFRyYW5zbGF0aW9ucy5ub1RyZWVJdGVtc308L05vSXRlbXNUZXh0Pn1cbiAgICAgICAgICA8L1RyZWVDb250YWluZXI+XG4gICAgICAgICAgPEFycm93Q29udHJvbHNcbiAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgc2VsZWN0ZWRUcmVlSXRlbT17dGhpcy5nZXRUcmVlSXRlbSh0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXSl9XG4gICAgICAgICAgICBvbk1vdmVUb1RyZWVDbGljaz17dGhpcy5vbk1vdmVUb1RyZWVDbGlja31cbiAgICAgICAgICAgIG9uTW92ZVRvR3JpZENsaWNrPXt0aGlzLm9uTW92ZVRvR3JpZENsaWNrfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPEdyaWRcbiAgICAgICAgICAgIGdyaWQ9e21lcmdlZEdyaWR9XG4gICAgICAgICAgICBjb2x1bW5zPXtncmlkQ29sdW1uc31cbiAgICAgICAgICAgIG11bHRpU2VsZWN0XG4gICAgICAgICAgICBmaWx0ZXJpbmdcbiAgICAgICAgICAgIHJvd1NlbGVjdENoZWNrYm94Q29sdW1uXG4gICAgICAgICAgICBncmlkSGVhZGVyPXs8UHJpbWl0aXZlLlN1YnRpdGxlPnttZXJnZWRUcmFuc2xhdGlvbnMuZ3JpZFRpdGxlfTwvUHJpbWl0aXZlLlN1YnRpdGxlPn1cbiAgICAgICAgICAvPlxuICAgICAgICA8L0NvbnRhaW5lcj5cbiAgICAgICAge3RoaXMuc3RhdGUuc2hvd0RlbGV0ZUNvbmZpcm1hdGlvbiAmJlxuICAgICAgICA8Q29uZmlybURpYWxvZ1xuICAgICAgICAgIHRyYW5zbGF0aW9ucz17bWVyZ2VkVHJhbnNsYXRpb25zLmRlbGV0ZUNvbmZpcm1EaWFsb2d9XG4gICAgICAgICAgY29uZmlybUNhbGxiYWNrPXt0aGlzLmRlbGV0ZVBhcmVudH1cbiAgICAgICAgICBjYW5jZWxDYWxsYmFjaz17dGhpcy5jbG9zZURlbGV0ZUNvbmZpcm1hdGlvbkRpYWxvZ31cbiAgICAgICAgLz5cbiAgICAgICAgfVxuICAgICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgICApO1xuICB9XG59XG4iXX0=