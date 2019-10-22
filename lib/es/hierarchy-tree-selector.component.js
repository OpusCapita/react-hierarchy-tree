var _dec, _class, _class2, _temp;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject3() {
  var data = _taggedTemplateLiteralLoose(["\n  height: 100%;\n  .oc-scrollbar-container {\n    height: calc(100% - ", ");\n    padding: ", ";\n  }\n  .tree-header {\n    min-height: ", ";\n    .ordering-arrows {\n      font-weight: 24px;\n    }\n  }\n  .oc-react-tree {\n    height: 100%;\n    .rc-tree-iconEle.rc-tree-icon__customize {\n      display: none;\n    }\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteralLoose(["\n  display: flex;\n  min-height: 300px;\n  > div {\n    width: 50%;\n    flex: 1 1 100%;\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteralLoose(["\n  height: 100%;\n  &&& {\n    padding: 0;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteralLoose(strings, raw) { if (!raw) { raw = strings.slice(0); } strings.raw = raw; return strings; }

import TreeComponent from '@opuscapita/react-tree-component';
import { Primitive } from '@opuscapita/oc-cm-common-layouts';
import { Datagrid, gridShape, gridColumnShape, DatagridActions } from '@opuscapita/react-grid';
import ConfirmDialog from '@opuscapita/react-confirmation-dialog';
import React from 'react';
import styled from 'styled-components';
import { List, fromJS } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; // App imports

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
var Grid = styled(Datagrid)(_templateObject());
var Container = styled.div(_templateObject2());
var TreeContainer = styled.div(_templateObject3(), ACTION_BAR_CONTAINER_HEIGHT, function (props) {
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

var HierarchyTreeSelector = (_dec = connect(mapStateToProps, mapDispatchToProps), _dec(_class = (_temp = _class2 =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(HierarchyTreeSelector, _React$PureComponent);

  function HierarchyTreeSelector(props) {
    var _this;

    _this = _React$PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "onTreeItemSelect", function (selectedKeys) {
      var _this$props = _this.props,
          onSelect = _this$props.onSelect,
          lockedKey = _this$props.lockedKey;

      var selectedItem = _this.getTreeItem(selectedKeys[0]);

      if (lockedKey && selectedItem && selectedItem[lockedKey]) return;

      _this.setState({
        selectedKeys: selectedKeys
      }, function () {
        if (onSelect) onSelect(selectedKeys);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onDeleteClick", function () {
      var _this$props2 = _this.props,
          childKey = _this$props2.childKey,
          lockedKey = _this$props2.lockedKey,
          onPreventDelete = _this$props2.onPreventDelete;

      var item = _this.getTreeItem(_this.state.selectedKeys[0]); // If item is not a parent, we won't show the delete confirmation dialog


      if (!item[childKey]) {
        _this.moveItemToGrid();

        return;
      }

      if (lockedKey) {
        // If it is a parent, we want to check that it doesn't contain any locked items
        var leafs = _this.getAllLeafs(item[childKey]);

        if (leafs.find(function (leaf) {
          return leaf[lockedKey];
        }) && onPreventDelete) {
          onPreventDelete();
          return;
        }
      }

      _this.setState({
        showDeleteConfirmation: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onAddNewClick", function (data, callback) {
      var _this$props3 = _this.props,
          onChange = _this$props3.onChange,
          treeData = _this$props3.treeData,
          idKey = _this$props3.idKey;
      var newItems = treeData.slice(); // If no tree node is selected, we'll place the new item to the root
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

      _this.setState({
        selectedKeys: [data[idKey]]
      }, function () {
        // If the parent is not yet expanded, we will expand it now
        var parent = _this.getTreeItem(data[idKey], treeData, true) || {};

        _this.expandParent(parent[idKey]);

        if (onChange) onChange(newItems);
        callback();
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onMoveToGridClick", function () {
      _this.moveItemToGrid();
    });

    _defineProperty(_assertThisInitialized(_this), "onOrderClick", function (items) {
      _this.props.onChange(items);
    });

    _defineProperty(_assertThisInitialized(_this), "onMoveToTreeClick", function () {
      var _this$props4 = _this.props,
          onChange = _this$props4.onChange,
          selectedGridItems = _this$props4.selectedGridItems,
          gridData = _this$props4.gridData,
          treeData = _this$props4.treeData,
          idKey = _this$props4.idKey;
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
    });

    _defineProperty(_assertThisInitialized(_this), "onInputChange", function (value) {
      var _this$props5 = _this.props,
          treeData = _this$props5.treeData,
          onChange = _this$props5.onChange;
      var action = {
        type: TREE_ACTIONS.RENAME_PARENT,
        data: value
      };

      var newItems = _this.getUpdatedTree(_this.state.selectedKeys[0], treeData, action);

      if (onChange) onChange(newItems);
    });

    _defineProperty(_assertThisInitialized(_this), "onExpand", function (ids) {
      _this.setState({
        expandedKeys: ids
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getUpdatedTree", function (id, array, action) {
      if (array === void 0) {
        array = _this.props.treeData;
      }

      if (_this.isSelectedDisabled()) return array;
      var found = false;
      var _this$props6 = _this.props,
          idKey = _this$props6.idKey,
          childKey = _this$props6.childKey,
          valueKey = _this$props6.valueKey;
      var newItems = array.slice();
      var removeActions = [TREE_ACTIONS.MOVE_LEAF, TREE_ACTIONS.DELETE_PARENT]; // If deleted parent item is in the root node

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
    });

    _defineProperty(_assertThisInitialized(_this), "getAllLeafs", function (array, alreadyFound) {
      if (alreadyFound === void 0) {
        alreadyFound = [];
      }

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
    });

    _defineProperty(_assertThisInitialized(_this), "getTreeItem", function (id, array, returnParent, parent) {
      if (array === void 0) {
        array = _this.props.treeData;
      }

      if (returnParent === void 0) {
        returnParent = false;
      }

      if (parent === void 0) {
        parent = null;
      }

      var _this$props7 = _this.props,
          childKey = _this$props7.childKey,
          idKey = _this$props7.idKey;
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
    });

    _defineProperty(_assertThisInitialized(_this), "getAdjacentItem", function (id) {
      if (!id) return null;
      var _this$props8 = _this.props,
          childKey = _this$props8.childKey,
          idKey = _this$props8.idKey,
          treeData = _this$props8.treeData;

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
    });

    _defineProperty(_assertThisInitialized(_this), "setDataToGrid", function (items, setNewItems) {
      if (setNewItems === void 0) {
        setNewItems = false;
      }

      var data = List();
      var _this$props9 = _this.props,
          grid = _this$props9.grid,
          gridColumns = _this$props9.gridColumns,
          gridData = _this$props9.gridData;
      if (!setNewItems) data = gridData.slice();
      var newGridItems = data.concat(items);

      _this.props.setData(grid, gridColumns, newGridItems);

      _this.props.clearSelectedItems(grid);
    });

    _defineProperty(_assertThisInitialized(_this), "isSelectedDisabled", function () {
      var lockedKey = _this.props.lockedKey;
      var item = !!_this.getTreeItem(_this.state.selectedKeys[0]);
      if (!item) return false;
      return item[lockedKey];
    });

    _defineProperty(_assertThisInitialized(_this), "moveItemToGrid", function () {
      var _this$props10 = _this.props,
          treeData = _this$props10.treeData,
          onChange = _this$props10.onChange;
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
    });

    _defineProperty(_assertThisInitialized(_this), "expandParent", function (parentId) {
      if (parentId && !_this.state.expandedKeys.find(function (expandedId) {
        return expandedId === parentId;
      })) {
        var newExpandedKeys = _this.state.expandedKeys.slice(); // eslint-disable-line


        newExpandedKeys.push(parentId);

        _this.setState({
          expandedKeys: newExpandedKeys
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "closeDeleteConfirmationDialog", function () {
      _this.setState({
        showDeleteConfirmation: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "deleteParent", function () {
      var _this$props11 = _this.props,
          onChange = _this$props11.onChange,
          treeData = _this$props11.treeData;
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
    });

    _defineProperty(_assertThisInitialized(_this), "deselectItem", function () {
      _this.setState({
        selectedKeys: []
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderHeaderRight", function (translations) {
      return React.createElement(ControlBar, _extends({}, _this.props, {
        onAddNewClick: _this.onAddNewClick,
        onDeleteClick: _this.onDeleteClick,
        onInputChange: _this.onInputChange,
        selectedTreeItem: _this.getTreeItem(_this.state.selectedKeys[0]),
        height: ACTION_BAR_CONTAINER_HEIGHT,
        translations: translations
      }));
    });

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


  var _proto = HierarchyTreeSelector.prototype;

  _proto.render = function render() {
    var _this$props12 = this.props,
        valueKey = _this$props12.valueKey,
        idKey = _this$props12.idKey,
        treeData = _this$props12.treeData,
        grid = _this$props12.grid,
        gridColumns = _this$props12.gridColumns,
        className = _this$props12.className,
        translations = _this$props12.translations,
        childKey = _this$props12.childKey;
    var mergedGrid = Object.assign({}, grid, {
      defaultShowFilteringRow: true
    });
    var mergedTranslations = Object.assign({}, defaultTranslations, translations);
    return React.createElement(React.Fragment, null, React.createElement(Container, {
      className: className
    }, React.createElement(TreeContainer, null, React.createElement(TreeComponent, {
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
    })), React.createElement(ArrowControls, _extends({}, this.props, {
      selectedTreeItem: this.getTreeItem(this.state.selectedKeys[0]),
      onMoveToTreeClick: this.onMoveToTreeClick,
      onMoveToGridClick: this.onMoveToGridClick
    })), React.createElement(Grid, {
      grid: mergedGrid,
      columns: gridColumns,
      multiSelect: true,
      filtering: true,
      rowSelectCheckboxColumn: true,
      gridHeader: React.createElement(Primitive.Subtitle, null, mergedTranslations.gridTitle)
    })), this.state.showDeleteConfirmation && React.createElement(ConfirmDialog, {
      translations: mergedTranslations.deleteConfirmDialog,
      confirmCallback: this.deleteParent,
      cancelCallback: this.closeDeleteConfirmationDialog
    }));
  };

  return HierarchyTreeSelector;
}(React.PureComponent), _defineProperty(_class2, "defaultProps", {
  idKey: 'id',
  valueKey: 'name',
  childKey: 'children',
  lockedKey: undefined,
  treeData: [],
  className: '',
  translations: defaultTranslations,
  id: 'hierarchy-tree',
  onSelect: undefined,
  onChange: undefined,
  onPreventDelete: undefined,
  defaultExpandAll: true,
  singleRoot: true
}), _temp)) || _class);
export { HierarchyTreeSelector as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlRyZWVDb21wb25lbnQiLCJQcmltaXRpdmUiLCJEYXRhZ3JpZCIsImdyaWRTaGFwZSIsImdyaWRDb2x1bW5TaGFwZSIsIkRhdGFncmlkQWN0aW9ucyIsIkNvbmZpcm1EaWFsb2ciLCJSZWFjdCIsInN0eWxlZCIsIkxpc3QiLCJmcm9tSlMiLCJJbW11dGFibGVQcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJjb25uZWN0IiwiQ29udHJvbEJhciIsIkFycm93Q29udHJvbHMiLCJkZWZhdWx0VHJhbnNsYXRpb25zIiwiQUNUSU9OX0JBUl9DT05UQUlORVJfSEVJR0hUIiwiVFJFRV9BQ1RJT05TIiwiQUREX0NISUxEUkVOIiwiTU9WRV9MRUFGIiwiUkVOQU1FX1BBUkVOVCIsIkRFTEVURV9QQVJFTlQiLCJHcmlkIiwiQ29udGFpbmVyIiwiZGl2IiwiVHJlZUNvbnRhaW5lciIsInByb3BzIiwidGhlbWUiLCJndXR0ZXJXaWR0aCIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsInNldERhdGEiLCJjbGVhclNlbGVjdGVkSXRlbXMiLCJtYXBTdGF0ZVRvUHJvcHMiLCJzdGF0ZSIsImdyaWRJZCIsImdyaWQiLCJpZCIsInNlbGVjdGVkR3JpZEl0ZW1zIiwiZGF0YWdyaWQiLCJnZXRJbiIsImdyaWREYXRhIiwiSGllcmFyY2h5VHJlZVNlbGVjdG9yIiwic2VsZWN0ZWRLZXlzIiwib25TZWxlY3QiLCJsb2NrZWRLZXkiLCJzZWxlY3RlZEl0ZW0iLCJnZXRUcmVlSXRlbSIsInNldFN0YXRlIiwiY2hpbGRLZXkiLCJvblByZXZlbnREZWxldGUiLCJpdGVtIiwibW92ZUl0ZW1Ub0dyaWQiLCJsZWFmcyIsImdldEFsbExlYWZzIiwiZmluZCIsImxlYWYiLCJzaG93RGVsZXRlQ29uZmlybWF0aW9uIiwiZGF0YSIsImNhbGxiYWNrIiwib25DaGFuZ2UiLCJ0cmVlRGF0YSIsImlkS2V5IiwibmV3SXRlbXMiLCJzbGljZSIsInB1c2giLCJhY3Rpb24iLCJ0eXBlIiwiZ2V0VXBkYXRlZFRyZWUiLCJwYXJlbnQiLCJleHBhbmRQYXJlbnQiLCJpdGVtcyIsInNlbGVjdGVkSWQiLCJmaWx0ZXIiLCJpIiwiaW5jbHVkZXMiLCJnZXQiLCJ0b0pTIiwibmV3R3JpZEl0ZW1zIiwic2V0RGF0YVRvR3JpZCIsInZhbHVlIiwiaWRzIiwiZXhwYW5kZWRLZXlzIiwiYXJyYXkiLCJpc1NlbGVjdGVkRGlzYWJsZWQiLCJmb3VuZCIsInZhbHVlS2V5IiwicmVtb3ZlQWN0aW9ucyIsInJvb3RJdGVtIiwibGVuZ3RoIiwiZGVzZWxlY3RJdGVtIiwiY2hpbGQiLCJmaWx0ZXJlZENoaWxkcmVuIiwiY2hpbGRJdGVtIiwiY29uY2F0IiwiVHlwZUVycm9yIiwiYWxyZWFkeUZvdW5kIiwicmV0dXJuUGFyZW50IiwiZm9yRWFjaCIsImdldEFkamFjZW50SXRlbUlkIiwicGFyZW50QXJyIiwiQXJyYXkiLCJpc0FycmF5IiwiaW5kZXgiLCJmaW5kSW5kZXgiLCJhZGphY2VudEl0ZW0iLCJzZXROZXdJdGVtcyIsImdyaWRDb2x1bW5zIiwic2VsZWN0ZWRLZXkiLCJuZXh0U2VsZWN0ZWRLZXkiLCJnZXRBZGphY2VudEl0ZW0iLCJwYXJlbnRJZCIsImV4cGFuZGVkSWQiLCJuZXdFeHBhbmRlZEtleXMiLCJ0cmFuc2xhdGlvbnMiLCJvbkFkZE5ld0NsaWNrIiwib25EZWxldGVDbGljayIsIm9uSW5wdXRDaGFuZ2UiLCJyZW5kZXIiLCJjbGFzc05hbWUiLCJtZXJnZWRHcmlkIiwiT2JqZWN0IiwiYXNzaWduIiwiZGVmYXVsdFNob3dGaWx0ZXJpbmdSb3ciLCJtZXJnZWRUcmFuc2xhdGlvbnMiLCJvblRyZWVJdGVtU2VsZWN0Iiwib25FeHBhbmQiLCJvbk9yZGVyQ2xpY2siLCJ0cmVlVGl0bGUiLCJyZW5kZXJIZWFkZXJSaWdodCIsIm9uTW92ZVRvVHJlZUNsaWNrIiwib25Nb3ZlVG9HcmlkQ2xpY2siLCJncmlkVGl0bGUiLCJkZWxldGVDb25maXJtRGlhbG9nIiwiZGVsZXRlUGFyZW50IiwiY2xvc2VEZWxldGVDb25maXJtYXRpb25EaWFsb2ciLCJQdXJlQ29tcG9uZW50IiwidW5kZWZpbmVkIiwiZGVmYXVsdEV4cGFuZEFsbCIsInNpbmdsZVJvb3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU9BLGFBQVAsTUFBMEIsa0NBQTFCO0FBQ0EsU0FBU0MsU0FBVCxRQUEwQixrQ0FBMUI7QUFDQSxTQUNFQyxRQURGLEVBQ1lDLFNBRFosRUFDdUJDLGVBRHZCLEVBQ3dDQyxlQUR4QyxRQUVPLHdCQUZQO0FBR0EsT0FBT0MsYUFBUCxNQUEwQix1Q0FBMUI7QUFDQSxPQUFPQyxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsTUFBUCxNQUFtQixtQkFBbkI7QUFDQSxTQUFTQyxJQUFULEVBQWVDLE1BQWYsUUFBNkIsV0FBN0I7QUFDQSxPQUFPQyxrQkFBUCxNQUErQiwyQkFBL0I7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsU0FBU0MsT0FBVCxRQUF3QixhQUF4QixDLENBRUE7O0FBQ0EsT0FBT0MsVUFBUCxNQUF1QixpREFBdkI7QUFDQSxPQUFPQyxhQUFQLE1BQTBCLG9EQUExQjtBQUNBLFNBQVNDLG1CQUFULFFBQW9DLHdCQUFwQztBQUVBLElBQU1DLDJCQUEyQixHQUFHLE1BQXBDO0FBQ0EsSUFBTUMsWUFBWSxHQUFHO0FBQ25CQyxFQUFBQSxZQUFZLEVBQUUsY0FESztBQUVuQkMsRUFBQUEsU0FBUyxFQUFFLFdBRlE7QUFHbkJDLEVBQUFBLGFBQWEsRUFBRSxlQUhJO0FBSW5CQyxFQUFBQSxhQUFhLEVBQUU7QUFKSSxDQUFyQjtBQU9BLElBQU1DLElBQUksR0FBR2YsTUFBTSxDQUFDTixRQUFELENBQVQsbUJBQVY7QUFPQSxJQUFNc0IsU0FBUyxHQUFHaEIsTUFBTSxDQUFDaUIsR0FBVixvQkFBZjtBQVNBLElBQU1DLGFBQWEsR0FBR2xCLE1B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Q0FBQ1EsU0FBeEM7QUFOZCxNQTNCRixDQURGLEVBcUNHLEtBQUtsRyxLQUFMLENBQVd1QixzQkFBWCxJQUNDLG9CQUFDLGFBQUQ7QUFDRSxNQUFBLFlBQVksRUFBRW1FLGtCQUFrQixDQUFDUyxtQkFEbkM7QUFFRSxNQUFBLGVBQWUsRUFBRSxLQUFLQyxZQUZ4QjtBQUdFLE1BQUEsY0FBYyxFQUFFLEtBQUtDO0FBSHZCLE1BdENKLENBREY7QUErQ0QsRzs7O0VBOWRnRGhJLEtBQUssQ0FBQ2lJLGEsNENBeUJqQztBQUNwQjFFLEVBQUFBLEtBQUssRUFBRSxJQURhO0FBRXBCd0IsRUFBQUEsUUFBUSxFQUFFLE1BRlU7QUFHcEJyQyxFQUFBQSxRQUFRLEVBQUUsVUFIVTtBQUlwQkosRUFBQUEsU0FBUyxFQUFFNEYsU0FKUztBQUtwQjVFLEVBQUFBLFFBQVEsRUFBRSxFQUxVO0FBTXBCMEQsRUFBQUEsU0FBUyxFQUFFLEVBTlM7QUFPcEJMLEVBQUFBLFlBQVksRUFBRWxHLG1CQVBNO0FBUXBCcUIsRUFBQUEsRUFBRSxFQUFFLGdCQVJnQjtBQVNwQk8sRUFBQUEsUUFBUSxFQUFFNkYsU0FUVTtBQVVwQjdFLEVBQUFBLFFBQVEsRUFBRTZFLFNBVlU7QUFXcEJ2RixFQUFBQSxlQUFlLEVBQUV1RixTQVhHO0FBWXBCQyxFQUFBQSxnQkFBZ0IsRUFBRSxJQVpFO0FBYXBCQyxFQUFBQSxVQUFVLEVBQUU7QUFiUSxDO1NBekJIakcscUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVHJlZUNvbXBvbmVudCBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC10cmVlLWNvbXBvbmVudCc7XG5pbXBvcnQgeyBQcmltaXRpdmUgfSBmcm9tICdAb3B1c2NhcGl0YS9vYy1jbS1jb21tb24tbGF5b3V0cyc7XG5pbXBvcnQge1xuICBEYXRhZ3JpZCwgZ3JpZFNoYXBlLCBncmlkQ29sdW1uU2hhcGUsIERhdGFncmlkQWN0aW9ucyxcbn0gZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtZ3JpZCc7XG5pbXBvcnQgQ29uZmlybURpYWxvZyBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1jb25maXJtYXRpb24tZGlhbG9nJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCB7IExpc3QsIGZyb21KUyB9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgSW1tdXRhYmxlUHJvcFR5cGVzIGZyb20gJ3JlYWN0LWltbXV0YWJsZS1wcm9wdHlwZXMnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbi8vIEFwcCBpbXBvcnRzXG5pbXBvcnQgQ29udHJvbEJhciBmcm9tICcuL2hpZXJhcmNoeS10cmVlLXNlbGVjdG9yLWNvbnRyb2wtYmFyLmNvbXBvbmVudCc7XG5pbXBvcnQgQXJyb3dDb250cm9scyBmcm9tICcuL2hpZXJhcmNoeS10cmVlLXNlbGVjdG9yLWFycm93LWNvbnRyb2xzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBkZWZhdWx0VHJhbnNsYXRpb25zIH0gZnJvbSAnLi9oaWVyYXJjaHktdHJlZS51dGlscyc7XG5cbmNvbnN0IEFDVElPTl9CQVJfQ09OVEFJTkVSX0hFSUdIVCA9ICc1NHB4JztcbmNvbnN0IFRSRUVfQUNUSU9OUyA9IHtcbiAgQUREX0NISUxEUkVOOiAnQUREX0NISUxEUkVOJyxcbiAgTU9WRV9MRUFGOiAnTU9WRV9MRUFGJyxcbiAgUkVOQU1FX1BBUkVOVDogJ1JFTkFNRV9QQVJFTlQnLFxuICBERUxFVEVfUEFSRU5UOiAnREVMRVRFX1BBUkVOVCcsXG59O1xuXG5jb25zdCBHcmlkID0gc3R5bGVkKERhdGFncmlkKWBcbiAgaGVpZ2h0OiAxMDAlO1xuICAmJiYge1xuICAgIHBhZGRpbmc6IDA7XG4gIH1cbmA7XG5cbmNvbnN0IENvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIG1pbi1oZWlnaHQ6IDMwMHB4O1xuICA+IGRpdiB7XG4gICAgd2lkdGg6IDUwJTtcbiAgICBmbGV4OiAxIDEgMTAwJTtcbiAgfVxuYDtcblxuY29uc3QgVHJlZUNvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gIGhlaWdodDogMTAwJTtcbiAgLm9jLXNjcm9sbGJhci1jb250YWluZXIge1xuICAgIGhlaWdodDogY2FsYygxMDAlIC0gJHtBQ1RJT05fQkFSX0NPTlRBSU5FUl9IRUlHSFR9KTtcbiAgICBwYWRkaW5nOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmd1dHRlcldpZHRofTtcbiAgfVxuICAudHJlZS1oZWFkZXIge1xuICAgIG1pbi1oZWlnaHQ6ICR7QUNUSU9OX0JBUl9DT05UQUlORVJfSEVJR0hUfTtcbiAgICAub3JkZXJpbmctYXJyb3dzIHtcbiAgICAgIGZvbnQtd2VpZ2h0OiAyNHB4O1xuICAgIH1cbiAgfVxuICAub2MtcmVhY3QtdHJlZSB7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIC5yYy10cmVlLWljb25FbGUucmMtdHJlZS1pY29uX19jdXN0b21pemUge1xuICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG4gIH1cbmA7XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IHtcbiAgc2V0RGF0YTogRGF0YWdyaWRBY3Rpb25zLnNldERhdGEsXG4gIGNsZWFyU2VsZWN0ZWRJdGVtczogRGF0YWdyaWRBY3Rpb25zLmNsZWFyU2VsZWN0ZWRJdGVtcyxcbn07XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSwgcHJvcHMpID0+IHtcbiAgY29uc3QgZ3JpZElkID0gcHJvcHMuZ3JpZC5pZDtcbiAgcmV0dXJuIHtcbiAgICBzZWxlY3RlZEdyaWRJdGVtczogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW2dyaWRJZCwgJ3NlbGVjdGVkSXRlbXMnXSwgTGlzdCgpKSxcbiAgICBncmlkRGF0YTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW2dyaWRJZCwgJ2FsbERhdGEnXSwgTGlzdCgpKSxcbiAgfTtcbn07XG5cbkBjb25uZWN0KFxuICBtYXBTdGF0ZVRvUHJvcHMsXG4gIG1hcERpc3BhdGNoVG9Qcm9wcyxcbilcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhpZXJhcmNoeVRyZWVTZWxlY3RvciBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGlkS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHZhbHVlS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNoaWxkS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGxvY2tlZEtleTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB0cmVlRGF0YTogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnNoYXBlKHt9KSksXG4gICAgZ3JpZDogZ3JpZFNoYXBlLmlzUmVxdWlyZWQsXG4gICAgZ3JpZENvbHVtbnM6IFByb3BUeXBlcy5hcnJheU9mKGdyaWRDb2x1bW5TaGFwZSkuaXNSZXF1aXJlZCxcbiAgICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgc2V0RGF0YTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBjbGVhclNlbGVjdGVkSXRlbXM6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgc2VsZWN0ZWRHcmlkSXRlbXM6IEltbXV0YWJsZVByb3BUeXBlcy5saXN0LmlzUmVxdWlyZWQsXG4gICAgZ3JpZERhdGE6IEltbXV0YWJsZVByb3BUeXBlcy5saXN0LmlzUmVxdWlyZWQsXG4gICAgdHJhbnNsYXRpb25zOiBQcm9wVHlwZXMuc2hhcGUoe30pLFxuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRlZmF1bHRFeHBhbmRBbGw6IFByb3BUeXBlcy5ib29sLFxuICAgIHNpbmdsZVJvb3Q6IFByb3BUeXBlcy5ib29sLFxuXG4gICAgLy8gQ2FsbGJhY2tzXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblByZXZlbnREZWxldGU6IFByb3BUeXBlcy5mdW5jLFxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgaWRLZXk6ICdpZCcsXG4gICAgdmFsdWVLZXk6ICduYW1lJyxcbiAgICBjaGlsZEtleTogJ2NoaWxkcmVuJyxcbiAgICBsb2NrZWRLZXk6IHVuZGVmaW5lZCxcbiAgICB0cmVlRGF0YTogW10sXG4gICAgY2xhc3NOYW1lOiAnJyxcbiAgICB0cmFuc2xhdGlvbnM6IGRlZmF1bHRUcmFuc2xhdGlvbnMsXG4gICAgaWQ6ICdoaWVyYXJjaHktdHJlZScsXG4gICAgb25TZWxlY3Q6IHVuZGVmaW5lZCxcbiAgICBvbkNoYW5nZTogdW5kZWZpbmVkLFxuICAgIG9uUHJldmVudERlbGV0ZTogdW5kZWZpbmVkLFxuICAgIGRlZmF1bHRFeHBhbmRBbGw6IHRydWUsXG4gICAgc2luZ2xlUm9vdDogdHJ1ZSxcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgc2VsZWN0ZWRLZXlzOiBbXSxcbiAgICAgIGV4cGFuZGVkS2V5czogW10sXG4gICAgICBzaG93RGVsZXRlQ29uZmlybWF0aW9uOiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdHMgYSB0cmVlIGl0ZW1cbiAgICogQHBhcmFtIHNlbGVjdGVkS2V5cyAoYXJyYXkpXG4gICAqL1xuICBvblRyZWVJdGVtU2VsZWN0ID0gKHNlbGVjdGVkS2V5cykgPT4ge1xuICAgIGNvbnN0IHsgb25TZWxlY3QsIGxvY2tlZEtleSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzZWxlY3RlZEl0ZW0gPSB0aGlzLmdldFRyZWVJdGVtKHNlbGVjdGVkS2V5c1swXSk7XG4gICAgaWYgKGxvY2tlZEtleSAmJiBzZWxlY3RlZEl0ZW0gJiYgc2VsZWN0ZWRJdGVtW2xvY2tlZEtleV0pIHJldHVybjtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRLZXlzIH0sICgpID0+IHtcbiAgICAgIGlmIChvblNlbGVjdCkgb25TZWxlY3Qoc2VsZWN0ZWRLZXlzKTtcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogRGlzcGxheXMgYSBjb25maXJtYXRpb24gZGlhbG9nXG4gICAqL1xuICBvbkRlbGV0ZUNsaWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgY2hpbGRLZXksIGxvY2tlZEtleSwgb25QcmV2ZW50RGVsZXRlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmdldFRyZWVJdGVtKHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdKTtcbiAgICAvLyBJZiBpdGVtIGlzIG5vdCBhIHBhcmVudCwgd2Ugd29uJ3Qgc2hvdyB0aGUgZGVsZXRlIGNvbmZpcm1hdGlvbiBkaWFsb2dcbiAgICBpZiAoIWl0ZW1bY2hpbGRLZXldKSB7XG4gICAgICB0aGlzLm1vdmVJdGVtVG9HcmlkKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGxvY2tlZEtleSkge1xuICAgICAgLy8gSWYgaXQgaXMgYSBwYXJlbnQsIHdlIHdhbnQgdG8gY2hlY2sgdGhhdCBpdCBkb2Vzbid0IGNvbnRhaW4gYW55IGxvY2tlZCBpdGVtc1xuICAgICAgY29uc3QgbGVhZnMgPSB0aGlzLmdldEFsbExlYWZzKGl0ZW1bY2hpbGRLZXldKTtcbiAgICAgIGlmIChsZWFmcy5maW5kKGxlYWYgPT4gbGVhZltsb2NrZWRLZXldKSAmJiBvblByZXZlbnREZWxldGUpIHtcbiAgICAgICAgb25QcmV2ZW50RGVsZXRlKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnNldFN0YXRlKHsgc2hvd0RlbGV0ZUNvbmZpcm1hdGlvbjogdHJ1ZSB9KTtcbiAgfTtcblxuICAvKipcbiAgICogQWRkcyBhIG5ldyBub2RlIHRvIHRoZSByb290IG9mIHRoZSB0cmVlLCBvciB1bmRlciBhIHNlbGVjdGVkIHRyZWUgbm9kZSB1c2luZ1xuICAgKiBBRERfQ0hJTERSRU4gYWN0aW9uXG4gICAqIEBwYXJhbSBkYXRhIC0gZGF0YSB0byBiZSBhZGRlZFxuICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICovXG4gIG9uQWRkTmV3Q2xpY2sgPSAoZGF0YSwgY2FsbGJhY2spID0+IHtcbiAgICBjb25zdCB7IG9uQ2hhbmdlLCB0cmVlRGF0YSwgaWRLZXkgfSA9IHRoaXMucHJvcHM7XG4gICAgbGV0IG5ld0l0ZW1zID0gdHJlZURhdGEuc2xpY2UoKTtcblxuICAgIC8vIElmIG5vIHRyZWUgbm9kZSBpcyBzZWxlY3RlZCwgd2UnbGwgcGxhY2UgdGhlIG5ldyBpdGVtIHRvIHRoZSByb290XG4gICAgLy8gb2YgdGhlIHRyZWVcbiAgICBpZiAoIXRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdKSB7XG4gICAgICBuZXdJdGVtcy5wdXNoKGRhdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBhY3Rpb24gPSB7XG4gICAgICAgIHR5cGU6IFRSRUVfQUNUSU9OUy5BRERfQ0hJTERSRU4sXG4gICAgICAgIGRhdGEsXG4gICAgICB9O1xuICAgICAgbmV3SXRlbXMgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdLCB0cmVlRGF0YSwgYWN0aW9uKTtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkS2V5czogW2RhdGFbaWRLZXldXSB9LCAoKSA9PiB7XG4gICAgICAvLyBJZiB0aGUgcGFyZW50IGlzIG5vdCB5ZXQgZXhwYW5kZWQsIHdlIHdpbGwgZXhwYW5kIGl0IG5vd1xuICAgICAgY29uc3QgcGFyZW50ID0gdGhpcy5nZXRUcmVlSXRlbShkYXRhW2lkS2V5XSwgdHJlZURhdGEsIHRydWUpIHx8IHt9O1xuICAgICAgdGhpcy5leHBhbmRQYXJlbnQocGFyZW50W2lkS2V5XSk7XG5cbiAgICAgIGlmIChvbkNoYW5nZSkgb25DaGFuZ2UobmV3SXRlbXMpO1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9KTtcbiAgfTtcblxuICBvbk1vdmVUb0dyaWRDbGljayA9ICgpID0+IHtcbiAgICB0aGlzLm1vdmVJdGVtVG9HcmlkKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIENhbGxzIG9uQ2hhbmdlIGNhbGxiYWNrIHdoZW5ldmVyIHVzZXIgcmVvcmRlcnMgdHJlZSBpdGVtcyB1c2luZyBvcmRlcmluZyBhcnJvd3NcbiAgICogQHBhcmFtIGl0ZW1zXG4gICAqL1xuICBvbk9yZGVyQ2xpY2sgPSAoaXRlbXMpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKGl0ZW1zKTtcbiAgfTtcblxuICAvKipcbiAgICogQWRkcyBzZWxlY3RlZCBncmlkIGl0ZW1zIHRvIHRoZSBjaG9zZW4gdHJlZSBub2RlIHVzaW5nIEFERF9DSElMRFJFTiBhY3Rpb25cbiAgICovXG4gIG9uTW92ZVRvVHJlZUNsaWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIG9uQ2hhbmdlLCBzZWxlY3RlZEdyaWRJdGVtcywgZ3JpZERhdGEsIHRyZWVEYXRhLCBpZEtleSxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzZWxlY3RlZElkID0gdGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF07XG5cbiAgICBjb25zdCBhY3Rpb24gPSB7XG4gICAgICB0eXBlOiBUUkVFX0FDVElPTlMuQUREX0NISUxEUkVOLFxuICAgICAgZGF0YTogZ3JpZERhdGEuZmlsdGVyKGkgPT4gc2VsZWN0ZWRHcmlkSXRlbXMuaW5jbHVkZXMoaS5nZXQoaWRLZXkpKSkudG9KUygpLFxuICAgIH07XG4gICAgY29uc3QgbmV3SXRlbXMgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKHNlbGVjdGVkSWQsIHRyZWVEYXRhLCBhY3Rpb24pO1xuICAgIGNvbnN0IG5ld0dyaWRJdGVtcyA9IGdyaWREYXRhLmZpbHRlcihpdGVtID0+ICFzZWxlY3RlZEdyaWRJdGVtcy5pbmNsdWRlcyhpdGVtLmdldChpZEtleSkpKTtcblxuICAgIHRoaXMuZXhwYW5kUGFyZW50KHNlbGVjdGVkSWQsIHRydWUpO1xuICAgIHRoaXMuc2V0RGF0YVRvR3JpZChuZXdHcmlkSXRlbXMsIHRydWUpO1xuICAgIGlmIChvbkNoYW5nZSkgb25DaGFuZ2UobmV3SXRlbXMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZW5hbWVzIHRoZSBjaG9zZW4gdHJlZSBub2RlIHVzaW5nIGEgUkVOQU1FX1BBUkVOVCBhY3Rpb25cbiAgICogQHBhcmFtIHZhbHVlXG4gICAqL1xuICBvbklucHV0Q2hhbmdlID0gKHZhbHVlKSA9PiB7XG4gICAgY29uc3QgeyB0cmVlRGF0YSwgb25DaGFuZ2UgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgYWN0aW9uID0ge1xuICAgICAgdHlwZTogVFJFRV9BQ1RJT05TLlJFTkFNRV9QQVJFTlQsXG4gICAgICBkYXRhOiB2YWx1ZSxcbiAgICB9O1xuICAgIGNvbnN0IG5ld0l0ZW1zID0gdGhpcy5nZXRVcGRhdGVkVHJlZSh0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXSwgdHJlZURhdGEsIGFjdGlvbik7XG4gICAgaWYgKG9uQ2hhbmdlKSBvbkNoYW5nZShuZXdJdGVtcyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEZpcmVkIG9uIGV4cGFuZFxuICAgKiBAcGFyYW0gaWRzXG4gICAqL1xuICBvbkV4cGFuZCA9IChpZHMpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGV4cGFuZGVkS2V5czogaWRzLFxuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHVwZGF0ZWQgdHJlZSBpdGVtcy5cbiAgICogQHBhcmFtIGlkIC0gdGFyZ2V0IGl0ZW1cbiAgICogQHBhcmFtIGFycmF5IC0gYXJyYXkgd2hlcmUgdGFyZ2V0IGl0ZW0gaXMgYmVpbmcgc2VhcmNoZWRcbiAgICogQHBhcmFtIGFjdGlvbiAtIGFjdGlvbiB0byBiZSBwZXJmb3JtZWQge3R5cGUsIGRhdGF9XG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgZ2V0VXBkYXRlZFRyZWUgPSAoaWQsIGFycmF5ID0gdGhpcy5wcm9wcy50cmVlRGF0YSwgYWN0aW9uKSA9PiB7XG4gICAgaWYgKHRoaXMuaXNTZWxlY3RlZERpc2FibGVkKCkpIHJldHVybiBhcnJheTtcblxuICAgIGxldCBmb3VuZCA9IGZhbHNlO1xuICAgIGNvbnN0IHsgaWRLZXksIGNoaWxkS2V5LCB2YWx1ZUtleSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBuZXdJdGVtcyA9IGFycmF5LnNsaWNlKCk7XG4gICAgY29uc3QgcmVtb3ZlQWN0aW9ucyA9IFtUUkVFX0FDVElPTlMuTU9WRV9MRUFGLCBUUkVFX0FDVElPTlMuREVMRVRFX1BBUkVOVF07XG5cbiAgICAvLyBJZiBkZWxldGVkIHBhcmVudCBpdGVtIGlzIGluIHRoZSByb290IG5vZGVcbiAgICBpZiAoYWN0aW9uLnR5cGUgPT09IFRSRUVfQUNUSU9OUy5ERUxFVEVfUEFSRU5UKSB7XG4gICAgICBjb25zdCByb290SXRlbSA9IGFycmF5LmZpbmQoaXRlbSA9PiBpdGVtW2lkS2V5XSA9PT0gaWQpO1xuICAgICAgaWYgKHJvb3RJdGVtKSB7XG4gICAgICAgIGlmIChyb290SXRlbVtjaGlsZEtleV0ubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5zZXREYXRhVG9HcmlkKGZyb21KUyh0aGlzLmdldEFsbExlYWZzKHJvb3RJdGVtW2NoaWxkS2V5XSkpKTtcbiAgICAgICAgICB0aGlzLmRlc2VsZWN0SXRlbSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXdJdGVtcy5maWx0ZXIoaXRlbSA9PiBpdGVtW2lkS2V5XSAhPT0gaWQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmV3SXRlbXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSBuZXdJdGVtc1tpXTtcbiAgICAgIGlmIChyZW1vdmVBY3Rpb25zLmluY2x1ZGVzKGFjdGlvbi50eXBlKSAmJiBpdGVtW2NoaWxkS2V5XSAmJiAhZm91bmQpIHtcbiAgICAgICAgZm91bmQgPSAhIWl0ZW1bY2hpbGRLZXldLmZpbmQoY2hpbGQgPT4gY2hpbGRbaWRLZXldID09PSBpZCk7XG4gICAgICAgIGlmIChmb3VuZCkge1xuICAgICAgICAgIC8vIFdoZW4gcmVtb3ZpbmcgYW4gaXRlbSB3ZSBtdXN0IGZpcnN0IGZpbmQgaXRzIHBhcmVudCBhbmQgYWx0ZXIgaXRzIGNoaWxkcmVuIGFycmF5XG4gICAgICAgICAgaWYgKGFjdGlvbi50eXBlID09PSBUUkVFX0FDVElPTlMuTU9WRV9MRUFGKSB7XG4gICAgICAgICAgICBpdGVtW2NoaWxkS2V5XSA9IGl0ZW1bY2hpbGRLZXldLmZpbHRlcihjaGlsZCA9PiBjaGlsZFtpZEtleV0gIT09IGlkKTtcbiAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RJdGVtKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChhY3Rpb24udHlwZSA9PT0gVFJFRV9BQ1RJT05TLkRFTEVURV9QQVJFTlQpIHtcbiAgICAgICAgICAgIC8vIHdlIG11c3QgZmlyc3QgZmlsdGVyIHRoZSBjaGlsZHJlbiwgc28gdGhhdCB3ZSB3b24ndCBnZXQgbGVhZnMgZnJvbVxuICAgICAgICAgICAgLy8gb3RoZXIgY2hpbGQgYnJhbmNoZXNcbiAgICAgICAgICAgIGNvbnN0IGZpbHRlcmVkQ2hpbGRyZW4gPSBpdGVtW2NoaWxkS2V5XS5maWx0ZXIoY2hpbGRJdGVtID0+IGNoaWxkSXRlbVtpZEtleV0gPT09IGlkKTtcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YVRvR3JpZChmcm9tSlModGhpcy5nZXRBbGxMZWFmcyhmaWx0ZXJlZENoaWxkcmVuKSkpO1xuICAgICAgICAgICAgdGhpcy5kZXNlbGVjdEl0ZW0oKTtcbiAgICAgICAgICAgIGl0ZW1bY2hpbGRLZXldID0gaXRlbVtjaGlsZEtleV0uZmlsdGVyKGNoaWxkSXRlbSA9PiBjaGlsZEl0ZW1baWRLZXldICE9PSBpZCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtW2lkS2V5XSA9PT0gaWQgJiYgIWZvdW5kKSB7XG4gICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICAgIGNhc2UgVFJFRV9BQ1RJT05TLkFERF9DSElMRFJFTjpcbiAgICAgICAgICAgIGl0ZW1bY2hpbGRLZXldID0gKGl0ZW1bY2hpbGRLZXldIHx8IFtdKS5jb25jYXQoYWN0aW9uLmRhdGEpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBUUkVFX0FDVElPTlMuUkVOQU1FX1BBUkVOVDpcbiAgICAgICAgICAgIGl0ZW1bdmFsdWVLZXldID0gYWN0aW9uLmRhdGE7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQWN0aW9uIHR5cGUgaXMgdW5kZWZpbmVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVtjaGlsZEtleV0gJiYgIWZvdW5kKSBmb3VuZCA9IHRoaXMuZ2V0VXBkYXRlZFRyZWUoaWQsIGl0ZW1bY2hpbGRLZXldLCBhY3Rpb24pO1xuICAgIH1cblxuICAgIGlmICghZm91bmQpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gbmV3SXRlbXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybnMgcmVjdXJzaXZlbHkgYWxsIGxlYWYgaXRlbXMgZnJvbSBhIGdpdmVuIGFycmF5XG4gICAqIEBwYXJhbSBhcnJheVxuICAgKiBAcGFyYW0gYWxyZWFkeUZvdW5kICh1c2VkIHJlY3Vyc2l2ZWx5KVxuICAgKi9cbiAgZ2V0QWxsTGVhZnMgPSAoYXJyYXksIGFscmVhZHlGb3VuZCA9IFtdKSA9PiB7XG4gICAgY29uc3QgeyBjaGlsZEtleSB9ID0gdGhpcy5wcm9wcztcbiAgICBsZXQgbGVhZnMgPSBhbHJlYWR5Rm91bmQ7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBpdGVtID0gYXJyYXlbaV07XG4gICAgICBpZiAoaXRlbVtjaGlsZEtleV0pIHtcbiAgICAgICAgbGVhZnMgPSB0aGlzLmdldEFsbExlYWZzKGl0ZW1bY2hpbGRLZXldLCBhbHJlYWR5Rm91bmQpO1xuICAgICAgfVxuICAgICAgaWYgKCFpdGVtW2NoaWxkS2V5XSkgbGVhZnMucHVzaChpdGVtKTtcbiAgICB9XG4gICAgcmV0dXJuIGxlYWZzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgdHJlZSBpdGVtIGJ5IElEXG4gICAqIEBwYXJhbSBpZFxuICAgKiBAcGFyYW0gYXJyYXlcbiAgICogQHBhcmFtIHJldHVyblBhcmVudCAtIHJldHVybiBpdGVtJ3MgcGFyZW50IGluc3RlYWQgb2YgdGhlIGl0ZW1cbiAgICogQHBhcmFtIHBhcmVudCAtIHBhcmVudCBpdGVtICh1c2VkIHJlY3Vyc2l2ZWx5KVxuICAgKiBAcmV0dXJucyB7e319XG4gICAqL1xuICBnZXRUcmVlSXRlbSA9IChpZCwgYXJyYXkgPSB0aGlzLnByb3BzLnRyZWVEYXRhLCByZXR1cm5QYXJlbnQgPSBmYWxzZSwgcGFyZW50ID0gbnVsbCkgPT4ge1xuICAgIGNvbnN0IHsgY2hpbGRLZXksIGlkS2V5IH0gPSB0aGlzLnByb3BzO1xuICAgIGxldCBmb3VuZCA9IGFycmF5LmZpbmQoaXRlbSA9PiBpdGVtW2lkS2V5XSA9PT0gaWQpO1xuXG4gICAgaWYgKGZvdW5kICYmIHJldHVyblBhcmVudCkgZm91bmQgPSBwYXJlbnQ7XG5cbiAgICBpZiAoIWZvdW5kKSB7XG4gICAgICBhcnJheS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGlmIChpdGVtW2NoaWxkS2V5XSAmJiAhZm91bmQpIHtcbiAgICAgICAgICBmb3VuZCA9IHRoaXMuZ2V0VHJlZUl0ZW0oaWQsIGl0ZW1bY2hpbGRLZXldLCByZXR1cm5QYXJlbnQsIGl0ZW0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGZvdW5kO1xuICB9O1xuXG4gIC8qKlxuICAgKiBHZXQgYWRqYWNlbnQgaXRlbSAoaWQpIGluIHBhcmVudCBhcnJheS4gVXNlZCB3aGVuIG1vdmluZyBpdGVtcyBmcm9tIHRyZWVcbiAgICogdG8gZ3JpZC9kZWxldGluZyBhbiBpdGVtXG4gICAqIEBwYXJhbSBpZFxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIGdldEFkamFjZW50SXRlbSA9IChpZCkgPT4ge1xuICAgIGlmICghaWQpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IHsgY2hpbGRLZXksIGlkS2V5LCB0cmVlRGF0YSB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IGdldEFkamFjZW50SXRlbUlkID0gKHBhcmVudCkgPT4ge1xuICAgICAgY29uc3QgcGFyZW50QXJyID0gQXJyYXkuaXNBcnJheShwYXJlbnQpID8gcGFyZW50IDogcGFyZW50W2NoaWxkS2V5XTtcbiAgICAgIGNvbnN0IGluZGV4ID0gcGFyZW50QXJyLmZpbmRJbmRleChjaGlsZCA9PiBjaGlsZFtpZEtleV0gPT09IGlkKTtcbiAgICAgIGxldCBhZGphY2VudEl0ZW0gPSBwYXJlbnRBcnJbaW5kZXggKyAxXTtcbiAgICAgIGlmICghYWRqYWNlbnRJdGVtKSBhZGphY2VudEl0ZW0gPSBwYXJlbnRBcnJbaW5kZXggLSAxXTtcbiAgICAgIGlmICghYWRqYWNlbnRJdGVtICYmICFBcnJheS5pc0FycmF5KHBhcmVudCkpIGFkamFjZW50SXRlbSA9IHBhcmVudDtcbiAgICAgIGlmICghYWRqYWNlbnRJdGVtKSByZXR1cm4gbnVsbDtcblxuICAgICAgcmV0dXJuIGFkamFjZW50SXRlbVtpZEtleV07XG4gICAgfTtcblxuICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuZ2V0VHJlZUl0ZW0oaWQsIHRoaXMucHJvcHMudHJlZURhdGEsIHRydWUpO1xuICAgIHJldHVybiBwYXJlbnQgPyBnZXRBZGphY2VudEl0ZW1JZChwYXJlbnQpIDogZ2V0QWRqYWNlbnRJdGVtSWQodHJlZURhdGEpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBcHBlbmRzIHByb3ZpZGVkIGl0ZW1zIHRvIHRoZSBncmlkXG4gICAqIEBwYXJhbSBpdGVtcyAtIGltbXV0YWJsZSBhcnJheSBvZiBpdGVtcyB0byBiZSBhcHBlbmRlZCB0byBncmlkXG4gICAqIEBwYXJhbSBzZXROZXdJdGVtcyAtIHNldCBjb21wbGV0ZWx5IGEgbmV3IGFycmF5IG9mIGl0ZW1zXG4gICAqL1xuICBzZXREYXRhVG9HcmlkID0gKGl0ZW1zLCBzZXROZXdJdGVtcyA9IGZhbHNlKSA9PiB7XG4gICAgbGV0IGRhdGEgPSBMaXN0KCk7XG4gICAgY29uc3QgeyBncmlkLCBncmlkQ29sdW1ucywgZ3JpZERhdGEgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFzZXROZXdJdGVtcykgZGF0YSA9IGdyaWREYXRhLnNsaWNlKCk7XG4gICAgY29uc3QgbmV3R3JpZEl0ZW1zID0gZGF0YS5jb25jYXQoaXRlbXMpO1xuXG4gICAgdGhpcy5wcm9wcy5zZXREYXRhKGdyaWQsIGdyaWRDb2x1bW5zLCBuZXdHcmlkSXRlbXMpO1xuICAgIHRoaXMucHJvcHMuY2xlYXJTZWxlY3RlZEl0ZW1zKGdyaWQpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDaGVja3Mgd2hldGhlciBvciBub3QgZ2l2ZW4gbm9kZSBpcyBkaXNhYmxlZFxuICAgKi9cbiAgaXNTZWxlY3RlZERpc2FibGVkID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgbG9ja2VkS2V5IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGl0ZW0gPSAhIXRoaXMuZ2V0VHJlZUl0ZW0odGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF0pO1xuICAgIGlmICghaXRlbSkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiBpdGVtW2xvY2tlZEtleV07XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgdGhlIGNob3NlbiBpdGVtIGZyb20gYSB0cmVlIGFuZCB1cGRhdGVzIHRoZSBncmlkIHVzaW5nIE1PVkVfTEVBRlxuICAgKiBhY3Rpb25cbiAgICovXG4gIG1vdmVJdGVtVG9HcmlkID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgdHJlZURhdGEsIG9uQ2hhbmdlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHNlbGVjdGVkS2V5ID0gdGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF07XG4gICAgY29uc3QgYWN0aW9uID0ge1xuICAgICAgdHlwZTogVFJFRV9BQ1RJT05TLk1PVkVfTEVBRixcbiAgICAgIGRhdGE6IHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdLFxuICAgIH07XG4gICAgY29uc3QgbmV4dFNlbGVjdGVkS2V5ID0gdGhpcy5nZXRBZGphY2VudEl0ZW0oc2VsZWN0ZWRLZXkpO1xuICAgIGNvbnN0IG5ld0dyaWRJdGVtcyA9IGZyb21KUyhbdGhpcy5nZXRUcmVlSXRlbShzZWxlY3RlZEtleSldKTtcbiAgICBjb25zdCBuZXdJdGVtcyA9IHRoaXMuZ2V0VXBkYXRlZFRyZWUoc2VsZWN0ZWRLZXksIHRyZWVEYXRhLCBhY3Rpb24pO1xuXG4gICAgdGhpcy5zZXREYXRhVG9HcmlkKG5ld0dyaWRJdGVtcyk7XG4gICAgaWYgKG9uQ2hhbmdlKSBvbkNoYW5nZShuZXdJdGVtcyk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzZWxlY3RlZEtleXM6IFtuZXh0U2VsZWN0ZWRLZXldLFxuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBFeHBhbmRzIGEgcGFyZW50XG4gICAqIEBwYXJhbSBwYXJlbnRJZFxuICAgKi9cbiAgZXhwYW5kUGFyZW50ID0gKHBhcmVudElkKSA9PiB7XG4gICAgaWYgKHBhcmVudElkICYmICF0aGlzLnN0YXRlLmV4cGFuZGVkS2V5cy5maW5kKGV4cGFuZGVkSWQgPT4gZXhwYW5kZWRJZCA9PT0gcGFyZW50SWQpKSB7XG4gICAgICBjb25zdCBuZXdFeHBhbmRlZEtleXMgPSB0aGlzLnN0YXRlLmV4cGFuZGVkS2V5cy5zbGljZSgpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICBuZXdFeHBhbmRlZEtleXMucHVzaChwYXJlbnRJZCk7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgZXhwYW5kZWRLZXlzOiBuZXdFeHBhbmRlZEtleXMgfSk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBDbG9zZXMgZGVsZXRlIGNvbmZpcm1hdGlvbiBkaWFsb2dcbiAgICovXG4gIGNsb3NlRGVsZXRlQ29uZmlybWF0aW9uRGlhbG9nID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzaG93RGVsZXRlQ29uZmlybWF0aW9uOiBmYWxzZSB9KTtcbiAgfTtcblxuICAvKipcbiAgICogRGVsZXRlcyBhIHBhcmVudCBub2RlXG4gICAqL1xuICBkZWxldGVQYXJlbnQgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBvbkNoYW5nZSwgdHJlZURhdGEgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgc2VsZWN0ZWRLZXkgPSB0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXTtcbiAgICBjb25zdCBhY3Rpb24gPSB7XG4gICAgICB0eXBlOiBUUkVFX0FDVElPTlMuREVMRVRFX1BBUkVOVCxcbiAgICB9O1xuICAgIGNvbnN0IG5leHRTZWxlY3RlZEtleSA9IHRoaXMuZ2V0QWRqYWNlbnRJdGVtKHNlbGVjdGVkS2V5KTtcbiAgICBjb25zdCBuZXdJdGVtcyA9IHRoaXMuZ2V0VXBkYXRlZFRyZWUoc2VsZWN0ZWRLZXksIHRyZWVEYXRhLCBhY3Rpb24pO1xuICAgIGlmIChvbkNoYW5nZSkgb25DaGFuZ2UobmV3SXRlbXMpO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2VsZWN0ZWRLZXlzOiBbbmV4dFNlbGVjdGVkS2V5XSxcbiAgICAgIHNob3dEZWxldGVDb25maXJtYXRpb246IGZhbHNlLFxuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBEZXNlbGVjdHMgYW4gaXRlbSwgaWYgaXQgaXMgZS5nLiByZW1vdmVkXG4gICAqL1xuICBkZXNlbGVjdEl0ZW0gPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkS2V5czogW10gfSk7XG4gIH07XG5cbiAgcmVuZGVySGVhZGVyUmlnaHQgPSB0cmFuc2xhdGlvbnMgPT4gKFxuICAgIDxDb250cm9sQmFyXG4gICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgIG9uQWRkTmV3Q2xpY2s9e3RoaXMub25BZGROZXdDbGlja31cbiAgICAgIG9uRGVsZXRlQ2xpY2s9e3RoaXMub25EZWxldGVDbGlja31cbiAgICAgIG9uSW5wdXRDaGFuZ2U9e3RoaXMub25JbnB1dENoYW5nZX1cbiAgICAgIHNlbGVjdGVkVHJlZUl0ZW09e3RoaXMuZ2V0VHJlZUl0ZW0odGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF0pfVxuICAgICAgaGVpZ2h0PXtBQ1RJT05fQkFSX0NPTlRBSU5FUl9IRUlHSFR9XG4gICAgICB0cmFuc2xhdGlvbnM9e3RyYW5zbGF0aW9uc31cbiAgICAvPlxuICApO1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICB2YWx1ZUtleSxcbiAgICAgIGlkS2V5LFxuICAgICAgdHJlZURhdGEsXG4gICAgICBncmlkLFxuICAgICAgZ3JpZENvbHVtbnMsXG4gICAgICBjbGFzc05hbWUsXG4gICAgICB0cmFuc2xhdGlvbnMsXG4gICAgICBjaGlsZEtleSxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IG1lcmdlZEdyaWQgPSBPYmplY3QuYXNzaWduKHt9LCBncmlkLCB7IGRlZmF1bHRTaG93RmlsdGVyaW5nUm93OiB0cnVlIH0pO1xuICAgIGNvbnN0IG1lcmdlZFRyYW5zbGF0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRUcmFuc2xhdGlvbnMsIHRyYW5zbGF0aW9ucyk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPFJlYWN0LkZyYWdtZW50PlxuICAgICAgICA8Q29udGFpbmVyIGNsYXNzTmFtZT17Y2xhc3NOYW1lfT5cbiAgICAgICAgICA8VHJlZUNvbnRhaW5lcj5cbiAgICAgICAgICAgIDxUcmVlQ29tcG9uZW50XG4gICAgICAgICAgICAgIHRyZWVEYXRhPXt0cmVlRGF0YX1cbiAgICAgICAgICAgICAgZGF0YUxvb2tVcEtleT17aWRLZXl9XG4gICAgICAgICAgICAgIGRhdGFMb29rVXBWYWx1ZT17dmFsdWVLZXl9XG4gICAgICAgICAgICAgIGRhdGFMb29rVXBDaGlsZHJlbj17Y2hpbGRLZXl9XG4gICAgICAgICAgICAgIG9uU2VsZWN0PXt0aGlzLm9uVHJlZUl0ZW1TZWxlY3R9XG4gICAgICAgICAgICAgIG9uRXhwYW5kPXt0aGlzLm9uRXhwYW5kfVxuICAgICAgICAgICAgICBjaGVja2FibGU9e2ZhbHNlfVxuICAgICAgICAgICAgICBzZWxlY3RlZEtleXM9e3RoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzfVxuICAgICAgICAgICAgICBleHBhbmRlZEtleXM9e3RoaXMuc3RhdGUuZXhwYW5kZWRLZXlzfVxuICAgICAgICAgICAgICBvbk9yZGVyQnV0dG9uQ2xpY2s9e3RoaXMub25PcmRlckNsaWNrfVxuICAgICAgICAgICAgICB0aXRsZT17bWVyZ2VkVHJhbnNsYXRpb25zLnRyZWVUaXRsZX1cbiAgICAgICAgICAgICAgc2VsZWN0YWJsZVxuICAgICAgICAgICAgICBzaG93T3JkZXJpbmdBcnJvd3NcbiAgICAgICAgICAgICAgc2hvd0V4cGFuZEFsbFxuICAgICAgICAgICAgICBoZWFkZXJSaWdodD17dGhpcy5yZW5kZXJIZWFkZXJSaWdodChtZXJnZWRUcmFuc2xhdGlvbnMpfVxuICAgICAgICAgICAgICBoYW5kbGVFeHBhbmRlZEtleXNNYW51YWxseVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L1RyZWVDb250YWluZXI+XG4gICAgICAgICAgPEFycm93Q29udHJvbHNcbiAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgc2VsZWN0ZWRUcmVlSXRlbT17dGhpcy5nZXRUcmVlSXRlbSh0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXSl9XG4gICAgICAgICAgICBvbk1vdmVUb1RyZWVDbGljaz17dGhpcy5vbk1vdmVUb1RyZWVDbGlja31cbiAgICAgICAgICAgIG9uTW92ZVRvR3JpZENsaWNrPXt0aGlzLm9uTW92ZVRvR3JpZENsaWNrfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPEdyaWRcbiAgICAgICAgICAgIGdyaWQ9e21lcmdlZEdyaWR9XG4gICAgICAgICAgICBjb2x1bW5zPXtncmlkQ29sdW1uc31cbiAgICAgICAgICAgIG11bHRpU2VsZWN0XG4gICAgICAgICAgICBmaWx0ZXJpbmdcbiAgICAgICAgICAgIHJvd1NlbGVjdENoZWNrYm94Q29sdW1uXG4gICAgICAgICAgICBncmlkSGVhZGVyPXs8UHJpbWl0aXZlLlN1YnRpdGxlPnttZXJnZWRUcmFuc2xhdGlvbnMuZ3JpZFRpdGxlfTwvUHJpbWl0aXZlLlN1YnRpdGxlPn1cbiAgICAgICAgICAvPlxuICAgICAgICA8L0NvbnRhaW5lcj5cbiAgICAgICAge3RoaXMuc3RhdGUuc2hvd0RlbGV0ZUNvbmZpcm1hdGlvbiAmJiAoXG4gICAgICAgICAgPENvbmZpcm1EaWFsb2dcbiAgICAgICAgICAgIHRyYW5zbGF0aW9ucz17bWVyZ2VkVHJhbnNsYXRpb25zLmRlbGV0ZUNvbmZpcm1EaWFsb2d9XG4gICAgICAgICAgICBjb25maXJtQ2FsbGJhY2s9e3RoaXMuZGVsZXRlUGFyZW50fVxuICAgICAgICAgICAgY2FuY2VsQ2FsbGJhY2s9e3RoaXMuY2xvc2VEZWxldGVDb25maXJtYXRpb25EaWFsb2d9XG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cbiAgICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gICAgKTtcbiAgfVxufVxuIl19