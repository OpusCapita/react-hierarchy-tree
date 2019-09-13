var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _dec, _class, _class2, _temp;

var _templateObject = _taggedTemplateLiteralLoose(['\n  height: 100%;\n  &&& {\n    padding: 0;\n  }\n'], ['\n  height: 100%;\n  &&& {\n    padding: 0;\n  }\n']),
    _templateObject2 = _taggedTemplateLiteralLoose(['\n  display: flex;\n  min-height: 300px;\n  > div {\n    width: 50%;\n    flex: 1 1 100%;\n  }\n'], ['\n  display: flex;\n  min-height: 300px;\n  > div {\n    width: 50%;\n    flex: 1 1 100%;\n  }\n']),
    _templateObject3 = _taggedTemplateLiteralLoose(['\n  height: 100%;\n  .oc-scrollbar-container {\n    height: calc(100% - ', ');\n    padding: ', ';\n  }\n  .tree-header {\n    min-height: ', ';\n    .ordering-arrows {\n      font-weight: 24px;\n    }\n  }\n  .oc-react-tree {\n    height: 100%;\n    .rc-tree-iconEle.rc-tree-icon__customize {\n      display: none;\n    }\n  }\n'], ['\n  height: 100%;\n  .oc-scrollbar-container {\n    height: calc(100% - ', ');\n    padding: ', ';\n  }\n  .tree-header {\n    min-height: ', ';\n    .ordering-arrows {\n      font-weight: 24px;\n    }\n  }\n  .oc-react-tree {\n    height: 100%;\n    .rc-tree-iconEle.rc-tree-icon__customize {\n      display: none;\n    }\n  }\n']);

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
      expandedKeys: [],
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
        translations = _props.translations,
        childKey = _props.childKey;


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
          React.createElement(TreeComponent, {
            treeData: treeData,
            dataLookUpKey: idKey,
            dataLookUpValue: valueKey,
            dataLookUpChildren: childKey,
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
          })
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlRyZWVDb21wb25lbnQiLCJQcmltaXRpdmUiLCJEYXRhZ3JpZCIsImdyaWRTaGFwZSIsImdyaWRDb2x1bW5TaGFwZSIsIkRhdGFncmlkQWN0aW9ucyIsIkNvbmZpcm1EaWFsb2ciLCJSZWFjdCIsInN0eWxlZCIsIkxpc3QiLCJmcm9tSlMiLCJJbW11dGFibGVQcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJjb25uZWN0IiwiQ29udHJvbEJhciIsIkFycm93Q29udHJvbHMiLCJkZWZhdWx0VHJhbnNsYXRpb25zIiwiQUNUSU9OX0JBUl9DT05UQUlORVJfSEVJR0hUIiwiVFJFRV9BQ1RJT05TIiwiQUREX0NISUxEUkVOIiwiTU9WRV9MRUFGIiwiUkVOQU1FX1BBUkVOVCIsIkRFTEVURV9QQVJFTlQiLCJHcmlkIiwiQ29udGFpbmVyIiwiZGl2IiwiVHJlZUNvbnRhaW5lciIsInByb3BzIiwidGhlbWUiLCJndXR0ZXJXaWR0aCIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsInNldERhdGEiLCJjbGVhclNlbGVjdGVkSXRlbXMiLCJtYXBTdGF0ZVRvUHJvcHMiLCJzdGF0ZSIsImdyaWRJZCIsImdyaWQiLCJpZCIsInNlbGVjdGVkR3JpZEl0ZW1zIiwiZGF0YWdyaWQiLCJnZXRJbiIsImdyaWREYXRhIiwiSGllcmFyY2h5VHJlZVNlbGVjdG9yIiwib25UcmVlSXRlbVNlbGVjdCIsInNlbGVjdGVkS2V5cyIsIm9uU2VsZWN0Iiwic2V0U3RhdGUiLCJvbkRlbGV0ZUNsaWNrIiwiY2hpbGRLZXkiLCJnZXRUcmVlSXRlbSIsIm1vdmVJdGVtVG9HcmlkIiwic2hvd0RlbGV0ZUNvbmZpcm1hdGlvbiIsIm9uQWRkTmV3Q2xpY2siLCJkYXRhIiwiY2FsbGJhY2siLCJvbkNoYW5nZSIsInRyZWVEYXRhIiwiaWRLZXkiLCJuZXdJdGVtcyIsInNsaWNlIiwicHVzaCIsImFjdGlvbiIsInR5cGUiLCJnZXRVcGRhdGVkVHJlZSIsInBhcmVudCIsImV4cGFuZFBhcmVudCIsIm9uTW92ZVRvR3JpZENsaWNrIiwib25PcmRlckNsaWNrIiwiaXRlbXMiLCJvbk1vdmVUb1RyZWVDbGljayIsInNlbGVjdGVkSWQiLCJmaWx0ZXIiLCJpbmNsdWRlcyIsImkiLCJnZXQiLCJ0b0pTIiwibmV3R3JpZEl0ZW1zIiwiaXRlbSIsInNldERhdGFUb0dyaWQiLCJvbklucHV0Q2hhbmdlIiwidmFsdWUiLCJvbkV4cGFuZCIsImlkcyIsImV4cGFuZGVkS2V5cyIsImFycmF5IiwiZm91bmQiLCJ2YWx1ZUtleSIsInJlbW92ZUFjdGlvbnMiLCJyb290SXRlbSIsImZpbmQiLCJsZW5ndGgiLCJnZXRBbGxMZWFmcyIsImRlc2VsZWN0SXRlbSIsImNoaWxkIiwiZmlsdGVyZWRDaGlsZHJlbiIsImNoaWxkSXRlbSIsImNvbmNhdCIsIlR5cGVFcnJvciIsImFscmVhZHlGb3VuZCIsImxlYWZzIiwicmV0dXJuUGFyZW50IiwiZm9yRWFjaCIsImdldEFkamFjZW50SXRlbSIsImdldEFkamFjZW50SXRlbUlkIiwicGFyZW50QXJyIiwiQXJyYXkiLCJpc0FycmF5IiwiaW5kZXgiLCJmaW5kSW5kZXgiLCJhZGphY2VudEl0ZW0iLCJzZXROZXdJdGVtcyIsImdyaWRDb2x1bW5zIiwic2VsZWN0ZWRLZXkiLCJuZXh0U2VsZWN0ZWRLZXkiLCJwYXJlbnRJZCIsImV4cGFuZGVkSWQiLCJuZXdFeHBhbmRlZEtleXMiLCJjbG9zZURlbGV0ZUNvbmZpcm1hdGlvbkRpYWxvZyIsImRlbGV0ZVBhcmVudCIsInJlbmRlckhlYWRlclJpZ2h0IiwidHJhbnNsYXRpb25zIiwicmVuZGVyIiwiY2xhc3NOYW1lIiwibWVyZ2VkR3JpZCIsIk9iamVjdCIsImFzc2lnbiIsImRlZmF1bHRTaG93RmlsdGVyaW5nUm93IiwibWVyZ2VkVHJhbnNsYXRpb25zIiwidHJlZVRpdGxlIiwiZ3JpZFRpdGxlIiwiZGVsZXRlQ29uZmlybURpYWxvZyIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiLCJ1bmRlZmluZWQiLCJkZWZhdWx0RXhwYW5kQWxsIiwic2luZ2xlUm9vdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU9BLGFBQVAsTUFBMEIsa0NBQTFCO0FBQ0EsU0FBU0MsU0FBVCxRQUEwQixrQ0FBMUI7QUFDQSxTQUFTQyxRQUFULEVBQW1CQyxTQUFuQixFQUE4QkMsZUFBOUIsRUFBK0NDLGVBQS9DLFFBQXNFLHdCQUF0RTtBQUNBLE9BQU9DLGFBQVAsTUFBMEIsdUNBQTFCO0FBQ0EsT0FBT0MsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLE1BQVAsTUFBbUIsbUJBQW5CO0FBQ0EsU0FBU0MsSUFBVCxFQUFlQyxNQUFmLFFBQTZCLFdBQTdCO0FBQ0EsT0FBT0Msa0JBQVAsTUFBK0IsMkJBQS9CO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLFNBQVNDLE9BQVQsUUFBd0IsYUFBeEI7O0FBRUE7QUFDQSxPQUFPQyxVQUFQLE1BQXVCLGlEQUF2QjtBQUNBLE9BQU9DLGFBQVAsTUFBMEIsb0RBQTFCO0FBQ0EsU0FBU0MsbUJBQVQsUUFBb0Msd0JBQXBDOztBQUVBLElBQU1DLDhCQUE4QixNQUFwQztBQUNBLElBQU1DLGVBQWU7QUFDbkJDLGdCQUFjLGNBREs7QUFFbkJDLGFBQVcsV0FGUTtBQUduQkMsaUJBQWUsZUFISTtBQUluQkMsaUJBQWU7QUFKSSxDQUFyQjs7QUFPQSxJQUFNQyxPQUFPZixPQUFPTixRQUFQLENBQVAsaUJBQU47O0FBT0EsSUFBTXNCLFlBQVloQixPQUFPaUIsR0FBbkIsa0JBQU47O0FBU0EsSUFBTUMsZ0JBQWdCbEIsT0FBT2lCLEdBQXZCLG1CQUdvQlIsMkJBSHBCLEVBSVM7QUFBQSxTQUFTVSxNQUFNQyxLQUFOLENBQVlDLFdBQXJCO0FBQUEsQ0FKVCxFQU9ZWiwyQkFQWixDQUFOOztBQW9CQSxJQUFNYSxxQkFBcUI7QUFDekJDLFdBQVMxQixnQkFBZ0IwQixPQURBO0FBRXpCQyxzQkFB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QixDQUFqQixDQUZwQjtBQUdFLDZCQUFtQixLQUFLeUIsaUJBSDFCO0FBSUUsNkJBQW1CLEtBQUtIO0FBSjFCLFdBckJGO0FBMkJFLDRCQUFDLElBQUQ7QUFDRSxnQkFBTXlELFVBRFI7QUFFRSxtQkFBU1osV0FGWDtBQUdFLDJCQUhGO0FBSUUseUJBSkY7QUFLRSx1Q0FMRjtBQU1FLHNCQUFZO0FBQUMscUJBQUQsQ0FBVyxRQUFYO0FBQUE7QUFBcUJnQiwrQkFBbUJFO0FBQXhDO0FBTmQ7QUEzQkYsT0FERjtBQXFDRyxXQUFLL0YsS0FBTCxDQUFXaUIsc0JBQVgsSUFDQyxvQkFBQyxhQUFEO0FBQ0Usc0JBQWM0RSxtQkFBbUJHLG1CQURuQztBQUVFLHlCQUFpQixLQUFLWixZQUZ4QjtBQUdFLHdCQUFnQixLQUFLRDtBQUh2QjtBQXRDSixLQURGO0FBK0NELEc7OztFQWxjZ0Q5RyxNQUFNNEgsYSxXQXVCaERDLFksR0FBZTtBQUNwQjNFLFNBQU8sSUFEYTtBQUVwQjZCLFlBQVUsTUFGVTtBQUdwQnRDLFlBQVUsVUFIVTtBQUlwQlEsWUFBVSxFQUpVO0FBS3BCa0UsYUFBVyxFQUxTO0FBTXBCRixnQkFBY3hHLG1CQU5NO0FBT3BCcUIsTUFBSSxnQkFQZ0I7QUFRcEJRLFlBQVV3RixTQVJVO0FBU3BCOUUsWUFBVThFLFNBVFU7QUFVcEJDLG9CQUFrQixJQVZFO0FBV3BCQyxjQUFZO0FBWFEsQztTQXZCSDdGLHFCIiwiZmlsZSI6ImhpZXJhcmNoeS10cmVlLXNlbGVjdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUcmVlQ29tcG9uZW50IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LXRyZWUtY29tcG9uZW50JztcbmltcG9ydCB7IFByaW1pdGl2ZSB9IGZyb20gJ0BvcHVzY2FwaXRhL29jLWNtLWNvbW1vbi1sYXlvdXRzJztcbmltcG9ydCB7IERhdGFncmlkLCBncmlkU2hhcGUsIGdyaWRDb2x1bW5TaGFwZSwgRGF0YWdyaWRBY3Rpb25zIH0gZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtZ3JpZCc7XG5pbXBvcnQgQ29uZmlybURpYWxvZyBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1jb25maXJtYXRpb24tZGlhbG9nJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCB7IExpc3QsIGZyb21KUyB9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgSW1tdXRhYmxlUHJvcFR5cGVzIGZyb20gJ3JlYWN0LWltbXV0YWJsZS1wcm9wdHlwZXMnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbi8vIEFwcCBpbXBvcnRzXG5pbXBvcnQgQ29udHJvbEJhciBmcm9tICcuL2hpZXJhcmNoeS10cmVlLXNlbGVjdG9yLWNvbnRyb2wtYmFyLmNvbXBvbmVudCc7XG5pbXBvcnQgQXJyb3dDb250cm9scyBmcm9tICcuL2hpZXJhcmNoeS10cmVlLXNlbGVjdG9yLWFycm93LWNvbnRyb2xzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBkZWZhdWx0VHJhbnNsYXRpb25zIH0gZnJvbSAnLi9oaWVyYXJjaHktdHJlZS51dGlscyc7XG5cbmNvbnN0IEFDVElPTl9CQVJfQ09OVEFJTkVSX0hFSUdIVCA9ICc1NHB4JztcbmNvbnN0IFRSRUVfQUNUSU9OUyA9IHtcbiAgQUREX0NISUxEUkVOOiAnQUREX0NISUxEUkVOJyxcbiAgTU9WRV9MRUFGOiAnTU9WRV9MRUFGJyxcbiAgUkVOQU1FX1BBUkVOVDogJ1JFTkFNRV9QQVJFTlQnLFxuICBERUxFVEVfUEFSRU5UOiAnREVMRVRFX1BBUkVOVCcsXG59O1xuXG5jb25zdCBHcmlkID0gc3R5bGVkKERhdGFncmlkKWBcbiAgaGVpZ2h0OiAxMDAlO1xuICAmJiYge1xuICAgIHBhZGRpbmc6IDA7XG4gIH1cbmA7XG5cbmNvbnN0IENvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIG1pbi1oZWlnaHQ6IDMwMHB4O1xuICA+IGRpdiB7XG4gICAgd2lkdGg6IDUwJTtcbiAgICBmbGV4OiAxIDEgMTAwJTtcbiAgfVxuYDtcblxuY29uc3QgVHJlZUNvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gIGhlaWdodDogMTAwJTtcbiAgLm9jLXNjcm9sbGJhci1jb250YWluZXIge1xuICAgIGhlaWdodDogY2FsYygxMDAlIC0gJHtBQ1RJT05fQkFSX0NPTlRBSU5FUl9IRUlHSFR9KTtcbiAgICBwYWRkaW5nOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmd1dHRlcldpZHRofTtcbiAgfVxuICAudHJlZS1oZWFkZXIge1xuICAgIG1pbi1oZWlnaHQ6ICR7QUNUSU9OX0JBUl9DT05UQUlORVJfSEVJR0hUfTtcbiAgICAub3JkZXJpbmctYXJyb3dzIHtcbiAgICAgIGZvbnQtd2VpZ2h0OiAyNHB4O1xuICAgIH1cbiAgfVxuICAub2MtcmVhY3QtdHJlZSB7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIC5yYy10cmVlLWljb25FbGUucmMtdHJlZS1pY29uX19jdXN0b21pemUge1xuICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG4gIH1cbmA7XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IHtcbiAgc2V0RGF0YTogRGF0YWdyaWRBY3Rpb25zLnNldERhdGEsXG4gIGNsZWFyU2VsZWN0ZWRJdGVtczogRGF0YWdyaWRBY3Rpb25zLmNsZWFyU2VsZWN0ZWRJdGVtcyxcbn07XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSwgcHJvcHMpID0+IHtcbiAgY29uc3QgZ3JpZElkID0gcHJvcHMuZ3JpZC5pZDtcbiAgcmV0dXJuIHtcbiAgICBzZWxlY3RlZEdyaWRJdGVtczogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW2dyaWRJZCwgJ3NlbGVjdGVkSXRlbXMnXSwgTGlzdCgpKSxcbiAgICBncmlkRGF0YTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW2dyaWRJZCwgJ2FsbERhdGEnXSwgTGlzdCgpKSxcbiAgfTtcbn07XG5cbkBjb25uZWN0KFxuICBtYXBTdGF0ZVRvUHJvcHMsXG4gIG1hcERpc3BhdGNoVG9Qcm9wcyxcbilcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhpZXJhcmNoeVRyZWVTZWxlY3RvciBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGlkS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHZhbHVlS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNoaWxkS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHRyZWVEYXRhOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc2hhcGUoe30pKSxcbiAgICBncmlkOiBncmlkU2hhcGUuaXNSZXF1aXJlZCxcbiAgICBncmlkQ29sdW1uczogUHJvcFR5cGVzLmFycmF5T2YoZ3JpZENvbHVtblNoYXBlKS5pc1JlcXVpcmVkLFxuICAgIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBzZXREYXRhOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGNsZWFyU2VsZWN0ZWRJdGVtczogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBzZWxlY3RlZEdyaWRJdGVtczogSW1tdXRhYmxlUHJvcFR5cGVzLmxpc3QuaXNSZXF1aXJlZCxcbiAgICBncmlkRGF0YTogSW1tdXRhYmxlUHJvcFR5cGVzLmxpc3QuaXNSZXF1aXJlZCxcbiAgICB0cmFuc2xhdGlvbnM6IFByb3BUeXBlcy5zaGFwZSh7fSksXG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGVmYXVsdEV4cGFuZEFsbDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2luZ2xlUm9vdDogUHJvcFR5cGVzLmJvb2wsXG5cbiAgICAvLyBDYWxsYmFja3NcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgaWRLZXk6ICdpZCcsXG4gICAgdmFsdWVLZXk6ICduYW1lJyxcbiAgICBjaGlsZEtleTogJ2NoaWxkcmVuJyxcbiAgICB0cmVlRGF0YTogW10sXG4gICAgY2xhc3NOYW1lOiAnJyxcbiAgICB0cmFuc2xhdGlvbnM6IGRlZmF1bHRUcmFuc2xhdGlvbnMsXG4gICAgaWQ6ICdoaWVyYXJjaHktdHJlZScsXG4gICAgb25TZWxlY3Q6IHVuZGVmaW5lZCxcbiAgICBvbkNoYW5nZTogdW5kZWZpbmVkLFxuICAgIGRlZmF1bHRFeHBhbmRBbGw6IHRydWUsXG4gICAgc2luZ2xlUm9vdDogdHJ1ZSxcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgc2VsZWN0ZWRLZXlzOiBbXSxcbiAgICAgIGV4cGFuZGVkS2V5czogW10sXG4gICAgICBzaG93RGVsZXRlQ29uZmlybWF0aW9uOiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdHMgYSB0cmVlIGl0ZW1cbiAgICogQHBhcmFtIHNlbGVjdGVkS2V5cyAoYXJyYXkpXG4gICAqL1xuICBvblRyZWVJdGVtU2VsZWN0ID0gKHNlbGVjdGVkS2V5cykgPT4ge1xuICAgIGNvbnN0IHsgb25TZWxlY3QgfSA9IHRoaXMucHJvcHM7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkS2V5cyB9LCAoKSA9PiB7XG4gICAgICBpZiAob25TZWxlY3QpIG9uU2VsZWN0KHNlbGVjdGVkS2V5cyk7XG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIERpc3BsYXlzIGEgY29uZmlybWF0aW9uIGRpYWxvZ1xuICAgKi9cbiAgb25EZWxldGVDbGljayA9ICgpID0+IHtcbiAgICBjb25zdCB7IGNoaWxkS2V5IH0gPSB0aGlzLnByb3BzO1xuXG4gICAgLy8gSWYgaXRlbSBpcyBub3QgYSBwYXJlbnQsIHdlIHdvbid0IHNob3cgdGhlIGRlbGV0ZSBjb25maXJtYXRpb24gZGlhbG9nXG4gICAgaWYgKCF0aGlzLmdldFRyZWVJdGVtKHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdKVtjaGlsZEtleV0pIHtcbiAgICAgIHRoaXMubW92ZUl0ZW1Ub0dyaWQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNob3dEZWxldGVDb25maXJtYXRpb246IHRydWUgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBuZXcgbm9kZSB0byB0aGUgcm9vdCBvZiB0aGUgdHJlZSwgb3IgdW5kZXIgYSBzZWxlY3RlZCB0cmVlIG5vZGUgdXNpbmdcbiAgICogQUREX0NISUxEUkVOIGFjdGlvblxuICAgKiBAcGFyYW0gZGF0YSAtIGRhdGEgdG8gYmUgYWRkZWRcbiAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAqL1xuICBvbkFkZE5ld0NsaWNrID0gKGRhdGEsIGNhbGxiYWNrKSA9PiB7XG4gICAgY29uc3QgeyBvbkNoYW5nZSwgdHJlZURhdGEsIGlkS2V5IH0gPSB0aGlzLnByb3BzO1xuICAgIGxldCBuZXdJdGVtcyA9IHRyZWVEYXRhLnNsaWNlKCk7XG5cbiAgICAvLyBJZiBubyB0cmVlIG5vZGUgaXMgc2VsZWN0ZWQsIHdlJ2xsIHBsYWNlIHRoZSBuZXcgaXRlbSB0byB0aGUgcm9vdFxuICAgIC8vIG9mIHRoZSB0cmVlXG4gICAgaWYgKCF0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXSkge1xuICAgICAgbmV3SXRlbXMucHVzaChkYXRhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgYWN0aW9uID0ge1xuICAgICAgICB0eXBlOiBUUkVFX0FDVElPTlMuQUREX0NISUxEUkVOLFxuICAgICAgICBkYXRhLFxuICAgICAgfTtcbiAgICAgIG5ld0l0ZW1zID0gdGhpcy5nZXRVcGRhdGVkVHJlZSh0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXSwgdHJlZURhdGEsIGFjdGlvbik7XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZEtleXM6IFtkYXRhW2lkS2V5XV0gfSwgKCkgPT4ge1xuICAgICAgLy8gSWYgdGhlIHBhcmVudCBpcyBub3QgeWV0IGV4cGFuZGVkLCB3ZSB3aWxsIGV4cGFuZCBpdCBub3dcbiAgICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuZ2V0VHJlZUl0ZW0oZGF0YVtpZEtleV0sIHRyZWVEYXRhLCB0cnVlKSB8fCB7fTtcbiAgICAgIHRoaXMuZXhwYW5kUGFyZW50KHBhcmVudFtpZEtleV0pO1xuXG4gICAgICBpZiAob25DaGFuZ2UpIG9uQ2hhbmdlKG5ld0l0ZW1zKTtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfSk7XG4gIH07XG5cbiAgb25Nb3ZlVG9HcmlkQ2xpY2sgPSAoKSA9PiB7XG4gICAgdGhpcy5tb3ZlSXRlbVRvR3JpZCgpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDYWxscyBvbkNoYW5nZSBjYWxsYmFjayB3aGVuZXZlciB1c2VyIHJlb3JkZXJzIHRyZWUgaXRlbXMgdXNpbmcgb3JkZXJpbmcgYXJyb3dzXG4gICAqIEBwYXJhbSBpdGVtc1xuICAgKi9cbiAgb25PcmRlckNsaWNrID0gKGl0ZW1zKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5vbkNoYW5nZShpdGVtcyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEFkZHMgc2VsZWN0ZWQgZ3JpZCBpdGVtcyB0byB0aGUgY2hvc2VuIHRyZWUgbm9kZSB1c2luZyBBRERfQ0hJTERSRU4gYWN0aW9uXG4gICAqL1xuICBvbk1vdmVUb1RyZWVDbGljayA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBvbkNoYW5nZSwgc2VsZWN0ZWRHcmlkSXRlbXMsIGdyaWREYXRhLCB0cmVlRGF0YSwgaWRLZXksXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgc2VsZWN0ZWRJZCA9IHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdO1xuXG4gICAgY29uc3QgYWN0aW9uID0ge1xuICAgICAgdHlwZTogVFJFRV9BQ1RJT05TLkFERF9DSElMRFJFTixcbiAgICAgIGRhdGE6IGdyaWREYXRhLmZpbHRlcihpID0+IHNlbGVjdGVkR3JpZEl0ZW1zLmluY2x1ZGVzKGkuZ2V0KGlkS2V5KSkpLnRvSlMoKSxcbiAgICB9O1xuICAgIGNvbnN0IG5ld0l0ZW1zID0gdGhpcy5nZXRVcGRhdGVkVHJlZShzZWxlY3RlZElkLCB0cmVlRGF0YSwgYWN0aW9uKTtcbiAgICBjb25zdCBuZXdHcmlkSXRlbXMgPSBncmlkRGF0YS5maWx0ZXIoaXRlbSA9PiAhc2VsZWN0ZWRHcmlkSXRlbXMuaW5jbHVkZXMoaXRlbS5nZXQoaWRLZXkpKSk7XG5cbiAgICB0aGlzLmV4cGFuZFBhcmVudChzZWxlY3RlZElkLCB0cnVlKTtcbiAgICB0aGlzLnNldERhdGFUb0dyaWQobmV3R3JpZEl0ZW1zLCB0cnVlKTtcbiAgICBpZiAob25DaGFuZ2UpIG9uQ2hhbmdlKG5ld0l0ZW1zKTtcbiAgfTtcblxuICAvKipcbiAgICogUmVuYW1lcyB0aGUgY2hvc2VuIHRyZWUgbm9kZSB1c2luZyBhIFJFTkFNRV9QQVJFTlQgYWN0aW9uXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKi9cbiAgb25JbnB1dENoYW5nZSA9ICh2YWx1ZSkgPT4ge1xuICAgIGNvbnN0IHsgdHJlZURhdGEsIG9uQ2hhbmdlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGFjdGlvbiA9IHtcbiAgICAgIHR5cGU6IFRSRUVfQUNUSU9OUy5SRU5BTUVfUEFSRU5ULFxuICAgICAgZGF0YTogdmFsdWUsXG4gICAgfTtcbiAgICBjb25zdCBuZXdJdGVtcyA9IHRoaXMuZ2V0VXBkYXRlZFRyZWUodGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF0sIHRyZWVEYXRhLCBhY3Rpb24pO1xuICAgIGlmIChvbkNoYW5nZSkgb25DaGFuZ2UobmV3SXRlbXMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBGaXJlZCBvbiBleHBhbmRcbiAgICogQHBhcmFtIGlkc1xuICAgKi9cbiAgb25FeHBhbmQgPSAoaWRzKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBleHBhbmRlZEtleXM6IGlkcyxcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyB1cGRhdGVkIHRyZWUgaXRlbXMuXG4gICAqIEBwYXJhbSBpZCAtIHRhcmdldCBpdGVtXG4gICAqIEBwYXJhbSBhcnJheSAtIGFycmF5IHdoZXJlIHRhcmdldCBpdGVtIGlzIGJlaW5nIHNlYXJjaGVkXG4gICAqIEBwYXJhbSBhY3Rpb24gLSBhY3Rpb24gdG8gYmUgcGVyZm9ybWVkIHt0eXBlLCBkYXRhfVxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIGdldFVwZGF0ZWRUcmVlID0gKGlkLCBhcnJheSA9IHRoaXMucHJvcHMudHJlZURhdGEsIGFjdGlvbikgPT4ge1xuICAgIGxldCBmb3VuZCA9IGZhbHNlO1xuICAgIGNvbnN0IHsgaWRLZXksIGNoaWxkS2V5LCB2YWx1ZUtleSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBuZXdJdGVtcyA9IGFycmF5LnNsaWNlKCk7XG4gICAgY29uc3QgcmVtb3ZlQWN0aW9ucyA9IFtUUkVFX0FDVElPTlMuTU9WRV9MRUFGLCBUUkVFX0FDVElPTlMuREVMRVRFX1BBUkVOVF07XG5cbiAgICAvLyBJZiBkZWxldGVkIHBhcmVudCBpdGVtIGlzIGluIHRoZSByb290IG5vZGVcbiAgICBpZiAoYWN0aW9uLnR5cGUgPT09IFRSRUVfQUNUSU9OUy5ERUxFVEVfUEFSRU5UKSB7XG4gICAgICBjb25zdCByb290SXRlbSA9IGFycmF5LmZpbmQoaXRlbSA9PiBpdGVtW2lkS2V5XSA9PT0gaWQpO1xuICAgICAgaWYgKHJvb3RJdGVtKSB7XG4gICAgICAgIGlmIChyb290SXRlbVtjaGlsZEtleV0ubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5zZXREYXRhVG9HcmlkKGZyb21KUyh0aGlzLmdldEFsbExlYWZzKHJvb3RJdGVtW2NoaWxkS2V5XSkpKTtcbiAgICAgICAgICB0aGlzLmRlc2VsZWN0SXRlbSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXdJdGVtcy5maWx0ZXIoaXRlbSA9PiBpdGVtW2lkS2V5XSAhPT0gaWQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmV3SXRlbXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSBuZXdJdGVtc1tpXTtcbiAgICAgIGlmIChyZW1vdmVBY3Rpb25zLmluY2x1ZGVzKGFjdGlvbi50eXBlKSAmJiBpdGVtW2NoaWxkS2V5XSAmJiAhZm91bmQpIHtcbiAgICAgICAgZm91bmQgPSAhIWl0ZW1bY2hpbGRLZXldLmZpbmQoY2hpbGQgPT4gY2hpbGRbaWRLZXldID09PSBpZCk7XG4gICAgICAgIGlmIChmb3VuZCkge1xuICAgICAgICAgIC8vIFdoZW4gcmVtb3ZpbmcgYW4gaXRlbSB3ZSBtdXN0IGZpcnN0IGZpbmQgaXRzIHBhcmVudCBhbmQgYWx0ZXIgaXRzIGNoaWxkcmVuIGFycmF5XG4gICAgICAgICAgaWYgKGFjdGlvbi50eXBlID09PSBUUkVFX0FDVElPTlMuTU9WRV9MRUFGKSB7XG4gICAgICAgICAgICBpdGVtW2NoaWxkS2V5XSA9IGl0ZW1bY2hpbGRLZXldLmZpbHRlcihjaGlsZCA9PiBjaGlsZFtpZEtleV0gIT09IGlkKTtcbiAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RJdGVtKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChhY3Rpb24udHlwZSA9PT0gVFJFRV9BQ1RJT05TLkRFTEVURV9QQVJFTlQpIHtcbiAgICAgICAgICAgIC8vIHdlIG11c3QgZmlyc3QgZmlsdGVyIHRoZSBjaGlsZHJlbiwgc28gdGhhdCB3ZSB3b24ndCBnZXQgbGVhZnMgZnJvbVxuICAgICAgICAgICAgLy8gb3RoZXIgY2hpbGQgYnJhbmNoZXNcbiAgICAgICAgICAgIGNvbnN0IGZpbHRlcmVkQ2hpbGRyZW4gPSBpdGVtW2NoaWxkS2V5XS5maWx0ZXIoY2hpbGRJdGVtID0+IGNoaWxkSXRlbVtpZEtleV0gPT09IGlkKTtcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YVRvR3JpZChmcm9tSlModGhpcy5nZXRBbGxMZWFmcyhmaWx0ZXJlZENoaWxkcmVuKSkpO1xuICAgICAgICAgICAgdGhpcy5kZXNlbGVjdEl0ZW0oKTtcbiAgICAgICAgICAgIGl0ZW1bY2hpbGRLZXldID0gaXRlbVtjaGlsZEtleV0uZmlsdGVyKGNoaWxkSXRlbSA9PiBjaGlsZEl0ZW1baWRLZXldICE9PSBpZCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtW2lkS2V5XSA9PT0gaWQgJiYgIWZvdW5kKSB7XG4gICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICAgIGNhc2UgVFJFRV9BQ1RJT05TLkFERF9DSElMRFJFTjpcbiAgICAgICAgICAgIGl0ZW1bY2hpbGRLZXldID0gKGl0ZW1bY2hpbGRLZXldIHx8IFtdKS5jb25jYXQoYWN0aW9uLmRhdGEpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBUUkVFX0FDVElPTlMuUkVOQU1FX1BBUkVOVDpcbiAgICAgICAgICAgIGl0ZW1bdmFsdWVLZXldID0gYWN0aW9uLmRhdGE7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQWN0aW9uIHR5cGUgaXMgdW5kZWZpbmVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVtjaGlsZEtleV0gJiYgIWZvdW5kKSBmb3VuZCA9IHRoaXMuZ2V0VXBkYXRlZFRyZWUoaWQsIGl0ZW1bY2hpbGRLZXldLCBhY3Rpb24pO1xuICAgIH1cblxuICAgIGlmICghZm91bmQpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gbmV3SXRlbXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybnMgcmVjdXJzaXZlbHkgYWxsIGxlYWYgaXRlbXMgZnJvbSBhIGdpdmVuIGFycmF5XG4gICAqIEBwYXJhbSBhcnJheVxuICAgKiBAcGFyYW0gYWxyZWFkeUZvdW5kICh1c2VkIHJlY3Vyc2l2ZWx5KVxuICAgKi9cbiAgZ2V0QWxsTGVhZnMgPSAoYXJyYXksIGFscmVhZHlGb3VuZCA9IFtdKSA9PiB7XG4gICAgY29uc3QgeyBjaGlsZEtleSB9ID0gdGhpcy5wcm9wcztcbiAgICBsZXQgbGVhZnMgPSBhbHJlYWR5Rm91bmQ7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBpdGVtID0gYXJyYXlbaV07XG4gICAgICBpZiAoaXRlbVtjaGlsZEtleV0pIHtcbiAgICAgICAgbGVhZnMgPSB0aGlzLmdldEFsbExlYWZzKGl0ZW1bY2hpbGRLZXldLCBhbHJlYWR5Rm91bmQpO1xuICAgICAgfVxuICAgICAgaWYgKCFpdGVtW2NoaWxkS2V5XSkgbGVhZnMucHVzaChpdGVtKTtcbiAgICB9XG4gICAgcmV0dXJuIGxlYWZzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgdHJlZSBpdGVtIGJ5IElEXG4gICAqIEBwYXJhbSBpZFxuICAgKiBAcGFyYW0gYXJyYXlcbiAgICogQHBhcmFtIHJldHVyblBhcmVudCAtIHJldHVybiBpdGVtJ3MgcGFyZW50IGluc3RlYWQgb2YgdGhlIGl0ZW1cbiAgICogQHBhcmFtIHBhcmVudCAtIHBhcmVudCBpdGVtICh1c2VkIHJlY3Vyc2l2ZWx5KVxuICAgKiBAcmV0dXJucyB7e319XG4gICAqL1xuICBnZXRUcmVlSXRlbSA9IChpZCwgYXJyYXkgPSB0aGlzLnByb3BzLnRyZWVEYXRhLCByZXR1cm5QYXJlbnQgPSBmYWxzZSwgcGFyZW50ID0gbnVsbCkgPT4ge1xuICAgIGNvbnN0IHsgY2hpbGRLZXksIGlkS2V5IH0gPSB0aGlzLnByb3BzO1xuICAgIGxldCBmb3VuZCA9IGFycmF5LmZpbmQoaXRlbSA9PiBpdGVtW2lkS2V5XSA9PT0gaWQpO1xuXG4gICAgaWYgKGZvdW5kICYmIHJldHVyblBhcmVudCkgZm91bmQgPSBwYXJlbnQ7XG5cbiAgICBpZiAoIWZvdW5kKSB7XG4gICAgICBhcnJheS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGlmIChpdGVtW2NoaWxkS2V5XSAmJiAhZm91bmQpIHtcbiAgICAgICAgICBmb3VuZCA9IHRoaXMuZ2V0VHJlZUl0ZW0oaWQsIGl0ZW1bY2hpbGRLZXldLCByZXR1cm5QYXJlbnQsIGl0ZW0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGZvdW5kO1xuICB9O1xuXG4gIC8qKlxuICAgKiBHZXQgYWRqYWNlbnQgaXRlbSAoaWQpIGluIHBhcmVudCBhcnJheS4gVXNlZCB3aGVuIG1vdmluZyBpdGVtcyBmcm9tIHRyZWVcbiAgICogdG8gZ3JpZC9kZWxldGluZyBhbiBpdGVtXG4gICAqIEBwYXJhbSBpZFxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIGdldEFkamFjZW50SXRlbSA9IChpZCkgPT4ge1xuICAgIGlmICghaWQpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IHsgY2hpbGRLZXksIGlkS2V5LCB0cmVlRGF0YSB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IGdldEFkamFjZW50SXRlbUlkID0gKHBhcmVudCkgPT4ge1xuICAgICAgY29uc3QgcGFyZW50QXJyID0gQXJyYXkuaXNBcnJheShwYXJlbnQpID8gcGFyZW50IDogcGFyZW50W2NoaWxkS2V5XTtcbiAgICAgIGNvbnN0IGluZGV4ID0gcGFyZW50QXJyLmZpbmRJbmRleChjaGlsZCA9PiBjaGlsZFtpZEtleV0gPT09IGlkKTtcbiAgICAgIGxldCBhZGphY2VudEl0ZW0gPSBwYXJlbnRBcnJbaW5kZXggKyAxXTtcbiAgICAgIGlmICghYWRqYWNlbnRJdGVtKSBhZGphY2VudEl0ZW0gPSBwYXJlbnRBcnJbaW5kZXggLSAxXTtcbiAgICAgIGlmICghYWRqYWNlbnRJdGVtICYmICFBcnJheS5pc0FycmF5KHBhcmVudCkpIGFkamFjZW50SXRlbSA9IHBhcmVudDtcbiAgICAgIGlmICghYWRqYWNlbnRJdGVtKSByZXR1cm4gbnVsbDtcblxuICAgICAgcmV0dXJuIGFkamFjZW50SXRlbVtpZEtleV07XG4gICAgfTtcblxuICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuZ2V0VHJlZUl0ZW0oaWQsIHRoaXMucHJvcHMudHJlZURhdGEsIHRydWUpO1xuICAgIHJldHVybiBwYXJlbnQgPyBnZXRBZGphY2VudEl0ZW1JZChwYXJlbnQpIDogZ2V0QWRqYWNlbnRJdGVtSWQodHJlZURhdGEpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBcHBlbmRzIHByb3ZpZGVkIGl0ZW1zIHRvIHRoZSBncmlkXG4gICAqIEBwYXJhbSBpdGVtcyAtIGltbXV0YWJsZSBhcnJheSBvZiBpdGVtcyB0byBiZSBhcHBlbmRlZCB0byBncmlkXG4gICAqIEBwYXJhbSBzZXROZXdJdGVtcyAtIHNldCBjb21wbGV0ZWx5IGEgbmV3IGFycmF5IG9mIGl0ZW1zXG4gICAqL1xuICBzZXREYXRhVG9HcmlkID0gKGl0ZW1zLCBzZXROZXdJdGVtcyA9IGZhbHNlKSA9PiB7XG4gICAgbGV0IGRhdGEgPSBMaXN0KCk7XG4gICAgY29uc3QgeyBncmlkLCBncmlkQ29sdW1ucywgZ3JpZERhdGEgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFzZXROZXdJdGVtcykgZGF0YSA9IGdyaWREYXRhLnNsaWNlKCk7XG4gICAgY29uc3QgbmV3R3JpZEl0ZW1zID0gZGF0YS5jb25jYXQoaXRlbXMpO1xuXG4gICAgdGhpcy5wcm9wcy5zZXREYXRhKGdyaWQsIGdyaWRDb2x1bW5zLCBuZXdHcmlkSXRlbXMpO1xuICAgIHRoaXMucHJvcHMuY2xlYXJTZWxlY3RlZEl0ZW1zKGdyaWQpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZW1vdmVzIHRoZSBjaG9zZW4gaXRlbSBmcm9tIGEgdHJlZSBhbmQgdXBkYXRlcyB0aGUgZ3JpZCB1c2luZyBNT1ZFX0xFQUZcbiAgICogYWN0aW9uXG4gICAqL1xuICBtb3ZlSXRlbVRvR3JpZCA9ICgpID0+IHtcbiAgICBjb25zdCB7IHRyZWVEYXRhLCBvbkNoYW5nZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzZWxlY3RlZEtleSA9IHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdO1xuICAgIGNvbnN0IGFjdGlvbiA9IHtcbiAgICAgIHR5cGU6IFRSRUVfQUNUSU9OUy5NT1ZFX0xFQUYsXG4gICAgICBkYXRhOiB0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXSxcbiAgICB9O1xuICAgIGNvbnN0IG5leHRTZWxlY3RlZEtleSA9IHRoaXMuZ2V0QWRqYWNlbnRJdGVtKHNlbGVjdGVkS2V5KTtcbiAgICBjb25zdCBuZXdHcmlkSXRlbXMgPSBmcm9tSlMoW3RoaXMuZ2V0VHJlZUl0ZW0oc2VsZWN0ZWRLZXkpXSk7XG4gICAgY29uc3QgbmV3SXRlbXMgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKHNlbGVjdGVkS2V5LCB0cmVlRGF0YSwgYWN0aW9uKTtcblxuICAgIHRoaXMuc2V0RGF0YVRvR3JpZChuZXdHcmlkSXRlbXMpO1xuICAgIGlmIChvbkNoYW5nZSkgb25DaGFuZ2UobmV3SXRlbXMpO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2VsZWN0ZWRLZXlzOiBbbmV4dFNlbGVjdGVkS2V5XSxcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogRXhwYW5kcyBhIHBhcmVudFxuICAgKiBAcGFyYW0gcGFyZW50SWRcbiAgICovXG4gIGV4cGFuZFBhcmVudCA9IChwYXJlbnRJZCkgPT4ge1xuICAgIGlmIChwYXJlbnRJZCAmJiAhdGhpcy5zdGF0ZS5leHBhbmRlZEtleXMuZmluZChleHBhbmRlZElkID0+IGV4cGFuZGVkSWQgPT09IHBhcmVudElkKSkge1xuICAgICAgY29uc3QgbmV3RXhwYW5kZWRLZXlzID0gdGhpcy5zdGF0ZS5leHBhbmRlZEtleXMuc2xpY2UoKTtcbiAgICAgIG5ld0V4cGFuZGVkS2V5cy5wdXNoKHBhcmVudElkKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBleHBhbmRlZEtleXM6IG5ld0V4cGFuZGVkS2V5cyB9KTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIENsb3NlcyBkZWxldGUgY29uZmlybWF0aW9uIGRpYWxvZ1xuICAgKi9cbiAgY2xvc2VEZWxldGVDb25maXJtYXRpb25EaWFsb2cgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNob3dEZWxldGVDb25maXJtYXRpb246IGZhbHNlIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBEZWxldGVzIGEgcGFyZW50IG5vZGVcbiAgICovXG4gIGRlbGV0ZVBhcmVudCA9ICgpID0+IHtcbiAgICBjb25zdCB7IG9uQ2hhbmdlLCB0cmVlRGF0YSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzZWxlY3RlZEtleSA9IHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdO1xuICAgIGNvbnN0IGFjdGlvbiA9IHtcbiAgICAgIHR5cGU6IFRSRUVfQUNUSU9OUy5ERUxFVEVfUEFSRU5ULFxuICAgIH07XG4gICAgY29uc3QgbmV4dFNlbGVjdGVkS2V5ID0gdGhpcy5nZXRBZGphY2VudEl0ZW0oc2VsZWN0ZWRLZXkpO1xuICAgIGNvbnN0IG5ld0l0ZW1zID0gdGhpcy5nZXRVcGRhdGVkVHJlZShzZWxlY3RlZEtleSwgdHJlZURhdGEsIGFjdGlvbik7XG4gICAgaWYgKG9uQ2hhbmdlKSBvbkNoYW5nZShuZXdJdGVtcyk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzZWxlY3RlZEtleXM6IFtuZXh0U2VsZWN0ZWRLZXldLFxuICAgICAgc2hvd0RlbGV0ZUNvbmZpcm1hdGlvbjogZmFsc2UsXG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIERlc2VsZWN0cyBhbiBpdGVtLCBpZiBpdCBpcyBlLmcuIHJlbW92ZWRcbiAgICovXG4gIGRlc2VsZWN0SXRlbSA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRLZXlzOiBbXSB9KTtcbiAgfTtcblxuICByZW5kZXJIZWFkZXJSaWdodCA9IHRyYW5zbGF0aW9ucyA9PiAoXG4gICAgPENvbnRyb2xCYXJcbiAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgb25BZGROZXdDbGljaz17dGhpcy5vbkFkZE5ld0NsaWNrfVxuICAgICAgb25EZWxldGVDbGljaz17dGhpcy5vbkRlbGV0ZUNsaWNrfVxuICAgICAgb25JbnB1dENoYW5nZT17dGhpcy5vbklucHV0Q2hhbmdlfVxuICAgICAgc2VsZWN0ZWRUcmVlSXRlbT17dGhpcy5nZXRUcmVlSXRlbSh0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXSl9XG4gICAgICBoZWlnaHQ9e0FDVElPTl9CQVJfQ09OVEFJTkVSX0hFSUdIVH1cbiAgICAgIHRyYW5zbGF0aW9ucz17dHJhbnNsYXRpb25zfVxuICAgIC8+XG4gICk7XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHZhbHVlS2V5LFxuICAgICAgaWRLZXksXG4gICAgICB0cmVlRGF0YSxcbiAgICAgIGdyaWQsXG4gICAgICBncmlkQ29sdW1ucyxcbiAgICAgIGNsYXNzTmFtZSxcbiAgICAgIHRyYW5zbGF0aW9ucyxcbiAgICAgIGNoaWxkS2V5LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgbWVyZ2VkR3JpZCA9IE9iamVjdC5hc3NpZ24oe30sIGdyaWQsIHsgZGVmYXVsdFNob3dGaWx0ZXJpbmdSb3c6IHRydWUgfSk7XG4gICAgY29uc3QgbWVyZ2VkVHJhbnNsYXRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdFRyYW5zbGF0aW9ucywgdHJhbnNsYXRpb25zKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8UmVhY3QuRnJhZ21lbnQ+XG4gICAgICAgIDxDb250YWluZXIgY2xhc3NOYW1lPXtjbGFzc05hbWV9PlxuICAgICAgICAgIDxUcmVlQ29udGFpbmVyPlxuICAgICAgICAgICAgPFRyZWVDb21wb25lbnRcbiAgICAgICAgICAgICAgdHJlZURhdGE9e3RyZWVEYXRhfVxuICAgICAgICAgICAgICBkYXRhTG9va1VwS2V5PXtpZEtleX1cbiAgICAgICAgICAgICAgZGF0YUxvb2tVcFZhbHVlPXt2YWx1ZUtleX1cbiAgICAgICAgICAgICAgZGF0YUxvb2tVcENoaWxkcmVuPXtjaGlsZEtleX1cbiAgICAgICAgICAgICAgb25TZWxlY3Q9e3RoaXMub25UcmVlSXRlbVNlbGVjdH1cbiAgICAgICAgICAgICAgb25FeHBhbmQ9e3RoaXMub25FeHBhbmR9XG4gICAgICAgICAgICAgIGNoZWNrYWJsZT17ZmFsc2V9XG4gICAgICAgICAgICAgIHNlbGVjdGVkS2V5cz17dGhpcy5zdGF0ZS5zZWxlY3RlZEtleXN9XG4gICAgICAgICAgICAgIGV4cGFuZGVkS2V5cz17dGhpcy5zdGF0ZS5leHBhbmRlZEtleXN9XG4gICAgICAgICAgICAgIG9uT3JkZXJCdXR0b25DbGljaz17dGhpcy5vbk9yZGVyQ2xpY2t9XG4gICAgICAgICAgICAgIHRpdGxlPXttZXJnZWRUcmFuc2xhdGlvbnMudHJlZVRpdGxlfVxuICAgICAgICAgICAgICBzZWxlY3RhYmxlXG4gICAgICAgICAgICAgIHNob3dPcmRlcmluZ0Fycm93c1xuICAgICAgICAgICAgICBzaG93RXhwYW5kQWxsXG4gICAgICAgICAgICAgIGhlYWRlclJpZ2h0PXt0aGlzLnJlbmRlckhlYWRlclJpZ2h0KG1lcmdlZFRyYW5zbGF0aW9ucyl9XG4gICAgICAgICAgICAgIGhhbmRsZUV4cGFuZGVkS2V5c01hbnVhbGx5XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvVHJlZUNvbnRhaW5lcj5cbiAgICAgICAgICA8QXJyb3dDb250cm9sc1xuICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICBzZWxlY3RlZFRyZWVJdGVtPXt0aGlzLmdldFRyZWVJdGVtKHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdKX1cbiAgICAgICAgICAgIG9uTW92ZVRvVHJlZUNsaWNrPXt0aGlzLm9uTW92ZVRvVHJlZUNsaWNrfVxuICAgICAgICAgICAgb25Nb3ZlVG9HcmlkQ2xpY2s9e3RoaXMub25Nb3ZlVG9HcmlkQ2xpY2t9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8R3JpZFxuICAgICAgICAgICAgZ3JpZD17bWVyZ2VkR3JpZH1cbiAgICAgICAgICAgIGNvbHVtbnM9e2dyaWRDb2x1bW5zfVxuICAgICAgICAgICAgbXVsdGlTZWxlY3RcbiAgICAgICAgICAgIGZpbHRlcmluZ1xuICAgICAgICAgICAgcm93U2VsZWN0Q2hlY2tib3hDb2x1bW5cbiAgICAgICAgICAgIGdyaWRIZWFkZXI9ezxQcmltaXRpdmUuU3VidGl0bGU+e21lcmdlZFRyYW5zbGF0aW9ucy5ncmlkVGl0bGV9PC9QcmltaXRpdmUuU3VidGl0bGU+fVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvQ29udGFpbmVyPlxuICAgICAgICB7dGhpcy5zdGF0ZS5zaG93RGVsZXRlQ29uZmlybWF0aW9uICYmIChcbiAgICAgICAgICA8Q29uZmlybURpYWxvZ1xuICAgICAgICAgICAgdHJhbnNsYXRpb25zPXttZXJnZWRUcmFuc2xhdGlvbnMuZGVsZXRlQ29uZmlybURpYWxvZ31cbiAgICAgICAgICAgIGNvbmZpcm1DYWxsYmFjaz17dGhpcy5kZWxldGVQYXJlbnR9XG4gICAgICAgICAgICBjYW5jZWxDYWxsYmFjaz17dGhpcy5jbG9zZURlbGV0ZUNvbmZpcm1hdGlvbkRpYWxvZ31cbiAgICAgICAgICAvPlxuICAgICAgICApfVxuICAgICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgICApO1xuICB9XG59XG4iXX0=