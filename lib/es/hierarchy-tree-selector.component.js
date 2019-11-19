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
      expandedKeys: props.defaultExpandedKeys,
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
  defaultExpandedKeys: [],
  singleRoot: true
}), _temp)) || _class);
export { HierarchyTreeSelector as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlRyZWVDb21wb25lbnQiLCJQcmltaXRpdmUiLCJEYXRhZ3JpZCIsImdyaWRTaGFwZSIsImdyaWRDb2x1bW5TaGFwZSIsIkRhdGFncmlkQWN0aW9ucyIsIkNvbmZpcm1EaWFsb2ciLCJSZWFjdCIsInN0eWxlZCIsIkxpc3QiLCJmcm9tSlMiLCJJbW11dGFibGVQcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJjb25uZWN0IiwiQ29udHJvbEJhciIsIkFycm93Q29udHJvbHMiLCJkZWZhdWx0VHJhbnNsYXRpb25zIiwiQUNUSU9OX0JBUl9DT05UQUlORVJfSEVJR0hUIiwiVFJFRV9BQ1RJT05TIiwiQUREX0NISUxEUkVOIiwiTU9WRV9MRUFGIiwiUkVOQU1FX1BBUkVOVCIsIkRFTEVURV9QQVJFTlQiLCJHcmlkIiwiQ29udGFpbmVyIiwiZGl2IiwiVHJlZUNvbnRhaW5lciIsInByb3BzIiwidGhlbWUiLCJndXR0ZXJXaWR0aCIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsInNldERhdGEiLCJjbGVhclNlbGVjdGVkSXRlbXMiLCJtYXBTdGF0ZVRvUHJvcHMiLCJzdGF0ZSIsImdyaWRJZCIsImdyaWQiLCJpZCIsInNlbGVjdGVkR3JpZEl0ZW1zIiwiZGF0YWdyaWQiLCJnZXRJbiIsImdyaWREYXRhIiwiSGllcmFyY2h5VHJlZVNlbGVjdG9yIiwic2VsZWN0ZWRLZXlzIiwib25TZWxlY3QiLCJsb2NrZWRLZXkiLCJzZWxlY3RlZEl0ZW0iLCJnZXRUcmVlSXRlbSIsInNldFN0YXRlIiwiY2hpbGRLZXkiLCJvblByZXZlbnREZWxldGUiLCJpdGVtIiwibW92ZUl0ZW1Ub0dyaWQiLCJsZWFmcyIsImdldEFsbExlYWZzIiwiZmluZCIsImxlYWYiLCJzaG93RGVsZXRlQ29uZmlybWF0aW9uIiwiZGF0YSIsImNhbGxiYWNrIiwib25DaGFuZ2UiLCJ0cmVlRGF0YSIsImlkS2V5IiwibmV3SXRlbXMiLCJzbGljZSIsInB1c2giLCJhY3Rpb24iLCJ0eXBlIiwiZ2V0VXBkYXRlZFRyZWUiLCJwYXJlbnQiLCJleHBhbmRQYXJlbnQiLCJpdGVtcyIsInNlbGVjdGVkSWQiLCJmaWx0ZXIiLCJpIiwiaW5jbHVkZXMiLCJnZXQiLCJ0b0pTIiwibmV3R3JpZEl0ZW1zIiwic2V0RGF0YVRvR3JpZCIsInZhbHVlIiwiaWRzIiwiZXhwYW5kZWRLZXlzIiwiYXJyYXkiLCJpc1NlbGVjdGVkRGlzYWJsZWQiLCJmb3VuZCIsInZhbHVlS2V5IiwicmVtb3ZlQWN0aW9ucyIsInJvb3RJdGVtIiwibGVuZ3RoIiwiZGVzZWxlY3RJdGVtIiwiY2hpbGQiLCJmaWx0ZXJlZENoaWxkcmVuIiwiY2hpbGRJdGVtIiwiY29uY2F0IiwiVHlwZUVycm9yIiwiYWxyZWFkeUZvdW5kIiwicmV0dXJuUGFyZW50IiwiZm9yRWFjaCIsImdldEFkamFjZW50SXRlbUlkIiwicGFyZW50QXJyIiwiQXJyYXkiLCJpc0FycmF5IiwiaW5kZXgiLCJmaW5kSW5kZXgiLCJhZGphY2VudEl0ZW0iLCJzZXROZXdJdGVtcyIsImdyaWRDb2x1bW5zIiwic2VsZWN0ZWRLZXkiLCJuZXh0U2VsZWN0ZWRLZXkiLCJnZXRBZGphY2VudEl0ZW0iLCJwYXJlbnRJZCIsImV4cGFuZGVkSWQiLCJuZXdFeHBhbmRlZEtleXMiLCJ0cmFuc2xhdGlvbnMiLCJvbkFkZE5ld0NsaWNrIiwib25EZWxldGVDbGljayIsIm9uSW5wdXRDaGFuZ2UiLCJkZWZhdWx0RXhwYW5kZWRLZXlzIiwicmVuZGVyIiwiY2xhc3NOYW1lIiwibWVyZ2VkR3JpZCIsIk9iamVjdCIsImFzc2lnbiIsImRlZmF1bHRTaG93RmlsdGVyaW5nUm93IiwibWVyZ2VkVHJhbnNsYXRpb25zIiwib25UcmVlSXRlbVNlbGVjdCIsIm9uRXhwYW5kIiwib25PcmRlckNsaWNrIiwidHJlZVRpdGxlIiwicmVuZGVySGVhZGVyUmlnaHQiLCJvbk1vdmVUb1RyZWVDbGljayIsIm9uTW92ZVRvR3JpZENsaWNrIiwiZ3JpZFRpdGxlIiwiZGVsZXRlQ29uZmlybURpYWxvZyIsImRlbGV0ZVBhcmVudCIsImNsb3NlRGVsZXRlQ29uZmlybWF0aW9uRGlhbG9nIiwiUHVyZUNvbXBvbmVudCIsInVuZGVmaW5lZCIsImRlZmF1bHRFeHBhbmRBbGwiLCJzaW5nbGVSb290Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPQSxhQUFQLE1BQTBCLGtDQUExQjtBQUNBLFNBQVNDLFNBQVQsUUFBMEIsa0NBQTFCO0FBQ0EsU0FDRUMsUUFERixFQUNZQyxTQURaLEVBQ3VCQyxlQUR2QixFQUN3Q0MsZUFEeEMsUUFFTyx3QkFGUDtBQUdBLE9BQU9DLGFBQVAsTUFBMEIsdUNBQTFCO0FBQ0EsT0FBT0MsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLE1BQVAsTUFBbUIsbUJBQW5CO0FBQ0EsU0FBU0MsSUFBVCxFQUFlQyxNQUFmLFFBQTZCLFdBQTdCO0FBQ0EsT0FBT0Msa0JBQVAsTUFBK0IsMkJBQS9CO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLFNBQVNDLE9BQVQsUUFBd0IsYUFBeEIsQyxDQUVBOztBQUNBLE9BQU9DLFVBQVAsTUFBdUIsaURBQXZCO0FBQ0EsT0FBT0MsYUFBUCxNQUEwQixvREFBMUI7QUFDQSxTQUFTQyxtQkFBVCxRQUFvQyx3QkFBcEM7QUFFQSxJQUFNQywyQkFBMkIsR0FBRyxNQUFwQztBQUNBLElBQU1DLFlBQVksR0FBRztBQUNuQkMsRUFBQUEsWUFBWSxFQUFFLGNBREs7QUFFbkJDLEVBQUFBLFNBQVMsRUFBRSxXQUZRO0FBR25CQyxFQUFBQSxhQUFhLEVBQUUsZUFISTtBQUluQkMsRUFBQUEsYUFBYSxFQUFFO0FBSkksQ0FBckI7QUFPQSxJQUFNQyxJQUFJLEdBQUdmLE1BQU0sQ0FBQ04sUUFBRCxDQUFULG1CQUFWO0FBT0EsSUFBTXNCLFNBQVMsR0FBR2hCLE1BQU0sQ0FBQ2lCLEdBQVYsb0JBQWY7QUFT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LG9CQUFDLFNBQUQsQ0FBVyxRQUFYLFFBQXFCa0Isa0JBQWtCLENBQUNRLFNBQXhDO0FBTmQsTUEzQkYsQ0FERixFQXFDRyxLQUFLbkcsS0FBTCxDQUFXdUIsc0JBQVgsSUFDQyxvQkFBQyxhQUFEO0FBQ0UsTUFBQSxZQUFZLEVBQUVvRSxrQkFBa0IsQ0FBQ1MsbUJBRG5DO0FBRUUsTUFBQSxlQUFlLEVBQUUsS0FBS0MsWUFGeEI7QUFHRSxNQUFBLGNBQWMsRUFBRSxLQUFLQztBQUh2QixNQXRDSixDQURGO0FBK0NELEc7OztFQS9kZ0RqSSxLQUFLLENBQUNrSSxhLDRDQXlCakM7QUFDcEIzRSxFQUFBQSxLQUFLLEVBQUUsSUFEYTtBQUVwQndCLEVBQUFBLFFBQVEsRUFBRSxNQUZVO0FBR3BCckMsRUFBQUEsUUFBUSxFQUFFLFVBSFU7QUFJcEJKLEVBQUFBLFNBQVMsRUFBRTZGLFNBSlM7QUFLcEI3RSxFQUFBQSxRQUFRLEVBQUUsRUFMVTtBQU1wQjJELEVBQUFBLFNBQVMsRUFBRSxFQU5TO0FBT3BCTixFQUFBQSxZQUFZLEVBQUVsRyxtQkFQTTtBQVFwQnFCLEVBQUFBLEVBQUUsRUFBRSxnQkFSZ0I7QUFTcEJPLEVBQUFBLFFBQVEsRUFBRThGLFNBVFU7QUFVcEI5RSxFQUFBQSxRQUFRLEVBQUU4RSxTQVZVO0FBV3BCeEYsRUFBQUEsZUFBZSxFQUFFd0YsU0FYRztBQVlwQkMsRUFBQUEsZ0JBQWdCLEVBQUUsSUFaRTtBQWFwQnJCLEVBQUFBLG1CQUFtQixFQUFFLEVBYkQ7QUFjcEJzQixFQUFBQSxVQUFVLEVBQUU7QUFkUSxDO1NBekJIbEcscUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVHJlZUNvbXBvbmVudCBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC10cmVlLWNvbXBvbmVudCc7XG5pbXBvcnQgeyBQcmltaXRpdmUgfSBmcm9tICdAb3B1c2NhcGl0YS9vYy1jbS1jb21tb24tbGF5b3V0cyc7XG5pbXBvcnQge1xuICBEYXRhZ3JpZCwgZ3JpZFNoYXBlLCBncmlkQ29sdW1uU2hhcGUsIERhdGFncmlkQWN0aW9ucyxcbn0gZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtZ3JpZCc7XG5pbXBvcnQgQ29uZmlybURpYWxvZyBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1jb25maXJtYXRpb24tZGlhbG9nJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCB7IExpc3QsIGZyb21KUyB9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgSW1tdXRhYmxlUHJvcFR5cGVzIGZyb20gJ3JlYWN0LWltbXV0YWJsZS1wcm9wdHlwZXMnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbi8vIEFwcCBpbXBvcnRzXG5pbXBvcnQgQ29udHJvbEJhciBmcm9tICcuL2hpZXJhcmNoeS10cmVlLXNlbGVjdG9yLWNvbnRyb2wtYmFyLmNvbXBvbmVudCc7XG5pbXBvcnQgQXJyb3dDb250cm9scyBmcm9tICcuL2hpZXJhcmNoeS10cmVlLXNlbGVjdG9yLWFycm93LWNvbnRyb2xzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBkZWZhdWx0VHJhbnNsYXRpb25zIH0gZnJvbSAnLi9oaWVyYXJjaHktdHJlZS51dGlscyc7XG5cbmNvbnN0IEFDVElPTl9CQVJfQ09OVEFJTkVSX0hFSUdIVCA9ICc1NHB4JztcbmNvbnN0IFRSRUVfQUNUSU9OUyA9IHtcbiAgQUREX0NISUxEUkVOOiAnQUREX0NISUxEUkVOJyxcbiAgTU9WRV9MRUFGOiAnTU9WRV9MRUFGJyxcbiAgUkVOQU1FX1BBUkVOVDogJ1JFTkFNRV9QQVJFTlQnLFxuICBERUxFVEVfUEFSRU5UOiAnREVMRVRFX1BBUkVOVCcsXG59O1xuXG5jb25zdCBHcmlkID0gc3R5bGVkKERhdGFncmlkKWBcbiAgaGVpZ2h0OiAxMDAlO1xuICAmJiYge1xuICAgIHBhZGRpbmc6IDA7XG4gIH1cbmA7XG5cbmNvbnN0IENvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIG1pbi1oZWlnaHQ6IDMwMHB4O1xuICA+IGRpdiB7XG4gICAgd2lkdGg6IDUwJTtcbiAgICBmbGV4OiAxIDEgMTAwJTtcbiAgfVxuYDtcblxuY29uc3QgVHJlZUNvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gIGhlaWdodDogMTAwJTtcbiAgLm9jLXNjcm9sbGJhci1jb250YWluZXIge1xuICAgIGhlaWdodDogY2FsYygxMDAlIC0gJHtBQ1RJT05fQkFSX0NPTlRBSU5FUl9IRUlHSFR9KTtcbiAgICBwYWRkaW5nOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmd1dHRlcldpZHRofTtcbiAgfVxuICAudHJlZS1oZWFkZXIge1xuICAgIG1pbi1oZWlnaHQ6ICR7QUNUSU9OX0JBUl9DT05UQUlORVJfSEVJR0hUfTtcbiAgICAub3JkZXJpbmctYXJyb3dzIHtcbiAgICAgIGZvbnQtd2VpZ2h0OiAyNHB4O1xuICAgIH1cbiAgfVxuICAub2MtcmVhY3QtdHJlZSB7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIC5yYy10cmVlLWljb25FbGUucmMtdHJlZS1pY29uX19jdXN0b21pemUge1xuICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG4gIH1cbmA7XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IHtcbiAgc2V0RGF0YTogRGF0YWdyaWRBY3Rpb25zLnNldERhdGEsXG4gIGNsZWFyU2VsZWN0ZWRJdGVtczogRGF0YWdyaWRBY3Rpb25zLmNsZWFyU2VsZWN0ZWRJdGVtcyxcbn07XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSwgcHJvcHMpID0+IHtcbiAgY29uc3QgZ3JpZElkID0gcHJvcHMuZ3JpZC5pZDtcbiAgcmV0dXJuIHtcbiAgICBzZWxlY3RlZEdyaWRJdGVtczogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW2dyaWRJZCwgJ3NlbGVjdGVkSXRlbXMnXSwgTGlzdCgpKSxcbiAgICBncmlkRGF0YTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW2dyaWRJZCwgJ2FsbERhdGEnXSwgTGlzdCgpKSxcbiAgfTtcbn07XG5cbkBjb25uZWN0KFxuICBtYXBTdGF0ZVRvUHJvcHMsXG4gIG1hcERpc3BhdGNoVG9Qcm9wcyxcbilcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhpZXJhcmNoeVRyZWVTZWxlY3RvciBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGlkS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHZhbHVlS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNoaWxkS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGxvY2tlZEtleTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB0cmVlRGF0YTogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnNoYXBlKHt9KSksXG4gICAgZ3JpZDogZ3JpZFNoYXBlLmlzUmVxdWlyZWQsXG4gICAgZ3JpZENvbHVtbnM6IFByb3BUeXBlcy5hcnJheU9mKGdyaWRDb2x1bW5TaGFwZSkuaXNSZXF1aXJlZCxcbiAgICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgc2V0RGF0YTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBjbGVhclNlbGVjdGVkSXRlbXM6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgc2VsZWN0ZWRHcmlkSXRlbXM6IEltbXV0YWJsZVByb3BUeXBlcy5saXN0LmlzUmVxdWlyZWQsXG4gICAgZ3JpZERhdGE6IEltbXV0YWJsZVByb3BUeXBlcy5saXN0LmlzUmVxdWlyZWQsXG4gICAgdHJhbnNsYXRpb25zOiBQcm9wVHlwZXMuc2hhcGUoe30pLFxuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRlZmF1bHRFeHBhbmRBbGw6IFByb3BUeXBlcy5ib29sLFxuICAgIGRlZmF1bHRFeHBhbmRlZEtleXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcpLFxuICAgIHNpbmdsZVJvb3Q6IFByb3BUeXBlcy5ib29sLFxuICAgIC8vIENhbGxiYWNrc1xuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25QcmV2ZW50RGVsZXRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGlkS2V5OiAnaWQnLFxuICAgIHZhbHVlS2V5OiAnbmFtZScsXG4gICAgY2hpbGRLZXk6ICdjaGlsZHJlbicsXG4gICAgbG9ja2VkS2V5OiB1bmRlZmluZWQsXG4gICAgdHJlZURhdGE6IFtdLFxuICAgIGNsYXNzTmFtZTogJycsXG4gICAgdHJhbnNsYXRpb25zOiBkZWZhdWx0VHJhbnNsYXRpb25zLFxuICAgIGlkOiAnaGllcmFyY2h5LXRyZWUnLFxuICAgIG9uU2VsZWN0OiB1bmRlZmluZWQsXG4gICAgb25DaGFuZ2U6IHVuZGVmaW5lZCxcbiAgICBvblByZXZlbnREZWxldGU6IHVuZGVmaW5lZCxcbiAgICBkZWZhdWx0RXhwYW5kQWxsOiB0cnVlLFxuICAgIGRlZmF1bHRFeHBhbmRlZEtleXM6IFtdLFxuICAgIHNpbmdsZVJvb3Q6IHRydWUsXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHNlbGVjdGVkS2V5czogW10sXG4gICAgICBleHBhbmRlZEtleXM6IHByb3BzLmRlZmF1bHRFeHBhbmRlZEtleXMsXG4gICAgICBzaG93RGVsZXRlQ29uZmlybWF0aW9uOiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdHMgYSB0cmVlIGl0ZW1cbiAgICogQHBhcmFtIHNlbGVjdGVkS2V5cyAoYXJyYXkpXG4gICAqL1xuICBvblRyZWVJdGVtU2VsZWN0ID0gKHNlbGVjdGVkS2V5cykgPT4ge1xuICAgIGNvbnN0IHsgb25TZWxlY3QsIGxvY2tlZEtleSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzZWxlY3RlZEl0ZW0gPSB0aGlzLmdldFRyZWVJdGVtKHNlbGVjdGVkS2V5c1swXSk7XG4gICAgaWYgKGxvY2tlZEtleSAmJiBzZWxlY3RlZEl0ZW0gJiYgc2VsZWN0ZWRJdGVtW2xvY2tlZEtleV0pIHJldHVybjtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRLZXlzIH0sICgpID0+IHtcbiAgICAgIGlmIChvblNlbGVjdCkgb25TZWxlY3Qoc2VsZWN0ZWRLZXlzKTtcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogRGlzcGxheXMgYSBjb25maXJtYXRpb24gZGlhbG9nXG4gICAqL1xuICBvbkRlbGV0ZUNsaWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgY2hpbGRLZXksIGxvY2tlZEtleSwgb25QcmV2ZW50RGVsZXRlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmdldFRyZWVJdGVtKHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdKTtcbiAgICAvLyBJZiBpdGVtIGlzIG5vdCBhIHBhcmVudCwgd2Ugd29uJ3Qgc2hvdyB0aGUgZGVsZXRlIGNvbmZpcm1hdGlvbiBkaWFsb2dcbiAgICBpZiAoIWl0ZW1bY2hpbGRLZXldKSB7XG4gICAgICB0aGlzLm1vdmVJdGVtVG9HcmlkKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGxvY2tlZEtleSkge1xuICAgICAgLy8gSWYgaXQgaXMgYSBwYXJlbnQsIHdlIHdhbnQgdG8gY2hlY2sgdGhhdCBpdCBkb2Vzbid0IGNvbnRhaW4gYW55IGxvY2tlZCBpdGVtc1xuICAgICAgY29uc3QgbGVhZnMgPSB0aGlzLmdldEFsbExlYWZzKGl0ZW1bY2hpbGRLZXldKTtcbiAgICAgIGlmIChsZWFmcy5maW5kKGxlYWYgPT4gbGVhZltsb2NrZWRLZXldKSAmJiBvblByZXZlbnREZWxldGUpIHtcbiAgICAgICAgb25QcmV2ZW50RGVsZXRlKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnNldFN0YXRlKHsgc2hvd0RlbGV0ZUNvbmZpcm1hdGlvbjogdHJ1ZSB9KTtcbiAgfTtcblxuICAvKipcbiAgICogQWRkcyBhIG5ldyBub2RlIHRvIHRoZSByb290IG9mIHRoZSB0cmVlLCBvciB1bmRlciBhIHNlbGVjdGVkIHRyZWUgbm9kZSB1c2luZ1xuICAgKiBBRERfQ0hJTERSRU4gYWN0aW9uXG4gICAqIEBwYXJhbSBkYXRhIC0gZGF0YSB0byBiZSBhZGRlZFxuICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICovXG4gIG9uQWRkTmV3Q2xpY2sgPSAoZGF0YSwgY2FsbGJhY2spID0+IHtcbiAgICBjb25zdCB7IG9uQ2hhbmdlLCB0cmVlRGF0YSwgaWRLZXkgfSA9IHRoaXMucHJvcHM7XG4gICAgbGV0IG5ld0l0ZW1zID0gdHJlZURhdGEuc2xpY2UoKTtcblxuICAgIC8vIElmIG5vIHRyZWUgbm9kZSBpcyBzZWxlY3RlZCwgd2UnbGwgcGxhY2UgdGhlIG5ldyBpdGVtIHRvIHRoZSByb290XG4gICAgLy8gb2YgdGhlIHRyZWVcbiAgICBpZiAoIXRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdKSB7XG4gICAgICBuZXdJdGVtcy5wdXNoKGRhdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBhY3Rpb24gPSB7XG4gICAgICAgIHR5cGU6IFRSRUVfQUNUSU9OUy5BRERfQ0hJTERSRU4sXG4gICAgICAgIGRhdGEsXG4gICAgICB9O1xuICAgICAgbmV3SXRlbXMgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdLCB0cmVlRGF0YSwgYWN0aW9uKTtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkS2V5czogW2RhdGFbaWRLZXldXSB9LCAoKSA9PiB7XG4gICAgICAvLyBJZiB0aGUgcGFyZW50IGlzIG5vdCB5ZXQgZXhwYW5kZWQsIHdlIHdpbGwgZXhwYW5kIGl0IG5vd1xuICAgICAgY29uc3QgcGFyZW50ID0gdGhpcy5nZXRUcmVlSXRlbShkYXRhW2lkS2V5XSwgdHJlZURhdGEsIHRydWUpIHx8IHt9O1xuICAgICAgdGhpcy5leHBhbmRQYXJlbnQocGFyZW50W2lkS2V5XSk7XG5cbiAgICAgIGlmIChvbkNoYW5nZSkgb25DaGFuZ2UobmV3SXRlbXMpO1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9KTtcbiAgfTtcblxuICBvbk1vdmVUb0dyaWRDbGljayA9ICgpID0+IHtcbiAgICB0aGlzLm1vdmVJdGVtVG9HcmlkKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIENhbGxzIG9uQ2hhbmdlIGNhbGxiYWNrIHdoZW5ldmVyIHVzZXIgcmVvcmRlcnMgdHJlZSBpdGVtcyB1c2luZyBvcmRlcmluZyBhcnJvd3NcbiAgICogQHBhcmFtIGl0ZW1zXG4gICAqL1xuICBvbk9yZGVyQ2xpY2sgPSAoaXRlbXMpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKGl0ZW1zKTtcbiAgfTtcblxuICAvKipcbiAgICogQWRkcyBzZWxlY3RlZCBncmlkIGl0ZW1zIHRvIHRoZSBjaG9zZW4gdHJlZSBub2RlIHVzaW5nIEFERF9DSElMRFJFTiBhY3Rpb25cbiAgICovXG4gIG9uTW92ZVRvVHJlZUNsaWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIG9uQ2hhbmdlLCBzZWxlY3RlZEdyaWRJdGVtcywgZ3JpZERhdGEsIHRyZWVEYXRhLCBpZEtleSxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzZWxlY3RlZElkID0gdGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF07XG5cbiAgICBjb25zdCBhY3Rpb24gPSB7XG4gICAgICB0eXBlOiBUUkVFX0FDVElPTlMuQUREX0NISUxEUkVOLFxuICAgICAgZGF0YTogZ3JpZERhdGEuZmlsdGVyKGkgPT4gc2VsZWN0ZWRHcmlkSXRlbXMuaW5jbHVkZXMoaS5nZXQoaWRLZXkpKSkudG9KUygpLFxuICAgIH07XG4gICAgY29uc3QgbmV3SXRlbXMgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKHNlbGVjdGVkSWQsIHRyZWVEYXRhLCBhY3Rpb24pO1xuICAgIGNvbnN0IG5ld0dyaWRJdGVtcyA9IGdyaWREYXRhLmZpbHRlcihpdGVtID0+ICFzZWxlY3RlZEdyaWRJdGVtcy5pbmNsdWRlcyhpdGVtLmdldChpZEtleSkpKTtcblxuICAgIHRoaXMuZXhwYW5kUGFyZW50KHNlbGVjdGVkSWQsIHRydWUpO1xuICAgIHRoaXMuc2V0RGF0YVRvR3JpZChuZXdHcmlkSXRlbXMsIHRydWUpO1xuICAgIGlmIChvbkNoYW5nZSkgb25DaGFuZ2UobmV3SXRlbXMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZW5hbWVzIHRoZSBjaG9zZW4gdHJlZSBub2RlIHVzaW5nIGEgUkVOQU1FX1BBUkVOVCBhY3Rpb25cbiAgICogQHBhcmFtIHZhbHVlXG4gICAqL1xuICBvbklucHV0Q2hhbmdlID0gKHZhbHVlKSA9PiB7XG4gICAgY29uc3QgeyB0cmVlRGF0YSwgb25DaGFuZ2UgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgYWN0aW9uID0ge1xuICAgICAgdHlwZTogVFJFRV9BQ1RJT05TLlJFTkFNRV9QQVJFTlQsXG4gICAgICBkYXRhOiB2YWx1ZSxcbiAgICB9O1xuICAgIGNvbnN0IG5ld0l0ZW1zID0gdGhpcy5nZXRVcGRhdGVkVHJlZSh0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXSwgdHJlZURhdGEsIGFjdGlvbik7XG4gICAgaWYgKG9uQ2hhbmdlKSBvbkNoYW5nZShuZXdJdGVtcyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEZpcmVkIG9uIGV4cGFuZFxuICAgKiBAcGFyYW0gaWRzXG4gICAqL1xuICBvbkV4cGFuZCA9IChpZHMpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGV4cGFuZGVkS2V5czogaWRzLFxuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHVwZGF0ZWQgdHJlZSBpdGVtcy5cbiAgICogQHBhcmFtIGlkIC0gdGFyZ2V0IGl0ZW1cbiAgICogQHBhcmFtIGFycmF5IC0gYXJyYXkgd2hlcmUgdGFyZ2V0IGl0ZW0gaXMgYmVpbmcgc2VhcmNoZWRcbiAgICogQHBhcmFtIGFjdGlvbiAtIGFjdGlvbiB0byBiZSBwZXJmb3JtZWQge3R5cGUsIGRhdGF9XG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgZ2V0VXBkYXRlZFRyZWUgPSAoaWQsIGFycmF5ID0gdGhpcy5wcm9wcy50cmVlRGF0YSwgYWN0aW9uKSA9PiB7XG4gICAgaWYgKHRoaXMuaXNTZWxlY3RlZERpc2FibGVkKCkpIHJldHVybiBhcnJheTtcblxuICAgIGxldCBmb3VuZCA9IGZhbHNlO1xuICAgIGNvbnN0IHsgaWRLZXksIGNoaWxkS2V5LCB2YWx1ZUtleSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBuZXdJdGVtcyA9IGFycmF5LnNsaWNlKCk7XG4gICAgY29uc3QgcmVtb3ZlQWN0aW9ucyA9IFtUUkVFX0FDVElPTlMuTU9WRV9MRUFGLCBUUkVFX0FDVElPTlMuREVMRVRFX1BBUkVOVF07XG5cbiAgICAvLyBJZiBkZWxldGVkIHBhcmVudCBpdGVtIGlzIGluIHRoZSByb290IG5vZGVcbiAgICBpZiAoYWN0aW9uLnR5cGUgPT09IFRSRUVfQUNUSU9OUy5ERUxFVEVfUEFSRU5UKSB7XG4gICAgICBjb25zdCByb290SXRlbSA9IGFycmF5LmZpbmQoaXRlbSA9PiBpdGVtW2lkS2V5XSA9PT0gaWQpO1xuICAgICAgaWYgKHJvb3RJdGVtKSB7XG4gICAgICAgIGlmIChyb290SXRlbVtjaGlsZEtleV0ubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5zZXREYXRhVG9HcmlkKGZyb21KUyh0aGlzLmdldEFsbExlYWZzKHJvb3RJdGVtW2NoaWxkS2V5XSkpKTtcbiAgICAgICAgICB0aGlzLmRlc2VsZWN0SXRlbSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXdJdGVtcy5maWx0ZXIoaXRlbSA9PiBpdGVtW2lkS2V5XSAhPT0gaWQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmV3SXRlbXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSBuZXdJdGVtc1tpXTtcbiAgICAgIGlmIChyZW1vdmVBY3Rpb25zLmluY2x1ZGVzKGFjdGlvbi50eXBlKSAmJiBpdGVtW2NoaWxkS2V5XSAmJiAhZm91bmQpIHtcbiAgICAgICAgZm91bmQgPSAhIWl0ZW1bY2hpbGRLZXldLmZpbmQoY2hpbGQgPT4gY2hpbGRbaWRLZXldID09PSBpZCk7XG4gICAgICAgIGlmIChmb3VuZCkge1xuICAgICAgICAgIC8vIFdoZW4gcmVtb3ZpbmcgYW4gaXRlbSB3ZSBtdXN0IGZpcnN0IGZpbmQgaXRzIHBhcmVudCBhbmQgYWx0ZXIgaXRzIGNoaWxkcmVuIGFycmF5XG4gICAgICAgICAgaWYgKGFjdGlvbi50eXBlID09PSBUUkVFX0FDVElPTlMuTU9WRV9MRUFGKSB7XG4gICAgICAgICAgICBpdGVtW2NoaWxkS2V5XSA9IGl0ZW1bY2hpbGRLZXldLmZpbHRlcihjaGlsZCA9PiBjaGlsZFtpZEtleV0gIT09IGlkKTtcbiAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RJdGVtKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChhY3Rpb24udHlwZSA9PT0gVFJFRV9BQ1RJT05TLkRFTEVURV9QQVJFTlQpIHtcbiAgICAgICAgICAgIC8vIHdlIG11c3QgZmlyc3QgZmlsdGVyIHRoZSBjaGlsZHJlbiwgc28gdGhhdCB3ZSB3b24ndCBnZXQgbGVhZnMgZnJvbVxuICAgICAgICAgICAgLy8gb3RoZXIgY2hpbGQgYnJhbmNoZXNcbiAgICAgICAgICAgIGNvbnN0IGZpbHRlcmVkQ2hpbGRyZW4gPSBpdGVtW2NoaWxkS2V5XS5maWx0ZXIoY2hpbGRJdGVtID0+IGNoaWxkSXRlbVtpZEtleV0gPT09IGlkKTtcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YVRvR3JpZChmcm9tSlModGhpcy5nZXRBbGxMZWFmcyhmaWx0ZXJlZENoaWxkcmVuKSkpO1xuICAgICAgICAgICAgdGhpcy5kZXNlbGVjdEl0ZW0oKTtcbiAgICAgICAgICAgIGl0ZW1bY2hpbGRLZXldID0gaXRlbVtjaGlsZEtleV0uZmlsdGVyKGNoaWxkSXRlbSA9PiBjaGlsZEl0ZW1baWRLZXldICE9PSBpZCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtW2lkS2V5XSA9PT0gaWQgJiYgIWZvdW5kKSB7XG4gICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICAgIGNhc2UgVFJFRV9BQ1RJT05TLkFERF9DSElMRFJFTjpcbiAgICAgICAgICAgIGl0ZW1bY2hpbGRLZXldID0gKGl0ZW1bY2hpbGRLZXldIHx8IFtdKS5jb25jYXQoYWN0aW9uLmRhdGEpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBUUkVFX0FDVElPTlMuUkVOQU1FX1BBUkVOVDpcbiAgICAgICAgICAgIGl0ZW1bdmFsdWVLZXldID0gYWN0aW9uLmRhdGE7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQWN0aW9uIHR5cGUgaXMgdW5kZWZpbmVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVtjaGlsZEtleV0gJiYgIWZvdW5kKSBmb3VuZCA9IHRoaXMuZ2V0VXBkYXRlZFRyZWUoaWQsIGl0ZW1bY2hpbGRLZXldLCBhY3Rpb24pO1xuICAgIH1cblxuICAgIGlmICghZm91bmQpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gbmV3SXRlbXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybnMgcmVjdXJzaXZlbHkgYWxsIGxlYWYgaXRlbXMgZnJvbSBhIGdpdmVuIGFycmF5XG4gICAqIEBwYXJhbSBhcnJheVxuICAgKiBAcGFyYW0gYWxyZWFkeUZvdW5kICh1c2VkIHJlY3Vyc2l2ZWx5KVxuICAgKi9cbiAgZ2V0QWxsTGVhZnMgPSAoYXJyYXksIGFscmVhZHlGb3VuZCA9IFtdKSA9PiB7XG4gICAgY29uc3QgeyBjaGlsZEtleSB9ID0gdGhpcy5wcm9wcztcbiAgICBsZXQgbGVhZnMgPSBhbHJlYWR5Rm91bmQ7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBpdGVtID0gYXJyYXlbaV07XG4gICAgICBpZiAoaXRlbVtjaGlsZEtleV0pIHtcbiAgICAgICAgbGVhZnMgPSB0aGlzLmdldEFsbExlYWZzKGl0ZW1bY2hpbGRLZXldLCBhbHJlYWR5Rm91bmQpO1xuICAgICAgfVxuICAgICAgaWYgKCFpdGVtW2NoaWxkS2V5XSkgbGVhZnMucHVzaChpdGVtKTtcbiAgICB9XG4gICAgcmV0dXJuIGxlYWZzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgdHJlZSBpdGVtIGJ5IElEXG4gICAqIEBwYXJhbSBpZFxuICAgKiBAcGFyYW0gYXJyYXlcbiAgICogQHBhcmFtIHJldHVyblBhcmVudCAtIHJldHVybiBpdGVtJ3MgcGFyZW50IGluc3RlYWQgb2YgdGhlIGl0ZW1cbiAgICogQHBhcmFtIHBhcmVudCAtIHBhcmVudCBpdGVtICh1c2VkIHJlY3Vyc2l2ZWx5KVxuICAgKiBAcmV0dXJucyB7e319XG4gICAqL1xuICBnZXRUcmVlSXRlbSA9IChpZCwgYXJyYXkgPSB0aGlzLnByb3BzLnRyZWVEYXRhLCByZXR1cm5QYXJlbnQgPSBmYWxzZSwgcGFyZW50ID0gbnVsbCkgPT4ge1xuICAgIGNvbnN0IHsgY2hpbGRLZXksIGlkS2V5IH0gPSB0aGlzLnByb3BzO1xuICAgIGxldCBmb3VuZCA9IGFycmF5LmZpbmQoaXRlbSA9PiBpdGVtW2lkS2V5XSA9PT0gaWQpO1xuXG4gICAgaWYgKGZvdW5kICYmIHJldHVyblBhcmVudCkgZm91bmQgPSBwYXJlbnQ7XG5cbiAgICBpZiAoIWZvdW5kKSB7XG4gICAgICBhcnJheS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGlmIChpdGVtW2NoaWxkS2V5XSAmJiAhZm91bmQpIHtcbiAgICAgICAgICBmb3VuZCA9IHRoaXMuZ2V0VHJlZUl0ZW0oaWQsIGl0ZW1bY2hpbGRLZXldLCByZXR1cm5QYXJlbnQsIGl0ZW0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGZvdW5kO1xuICB9O1xuXG4gIC8qKlxuICAgKiBHZXQgYWRqYWNlbnQgaXRlbSAoaWQpIGluIHBhcmVudCBhcnJheS4gVXNlZCB3aGVuIG1vdmluZyBpdGVtcyBmcm9tIHRyZWVcbiAgICogdG8gZ3JpZC9kZWxldGluZyBhbiBpdGVtXG4gICAqIEBwYXJhbSBpZFxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIGdldEFkamFjZW50SXRlbSA9IChpZCkgPT4ge1xuICAgIGlmICghaWQpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IHsgY2hpbGRLZXksIGlkS2V5LCB0cmVlRGF0YSB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IGdldEFkamFjZW50SXRlbUlkID0gKHBhcmVudCkgPT4ge1xuICAgICAgY29uc3QgcGFyZW50QXJyID0gQXJyYXkuaXNBcnJheShwYXJlbnQpID8gcGFyZW50IDogcGFyZW50W2NoaWxkS2V5XTtcbiAgICAgIGNvbnN0IGluZGV4ID0gcGFyZW50QXJyLmZpbmRJbmRleChjaGlsZCA9PiBjaGlsZFtpZEtleV0gPT09IGlkKTtcbiAgICAgIGxldCBhZGphY2VudEl0ZW0gPSBwYXJlbnRBcnJbaW5kZXggKyAxXTtcbiAgICAgIGlmICghYWRqYWNlbnRJdGVtKSBhZGphY2VudEl0ZW0gPSBwYXJlbnRBcnJbaW5kZXggLSAxXTtcbiAgICAgIGlmICghYWRqYWNlbnRJdGVtICYmICFBcnJheS5pc0FycmF5KHBhcmVudCkpIGFkamFjZW50SXRlbSA9IHBhcmVudDtcbiAgICAgIGlmICghYWRqYWNlbnRJdGVtKSByZXR1cm4gbnVsbDtcblxuICAgICAgcmV0dXJuIGFkamFjZW50SXRlbVtpZEtleV07XG4gICAgfTtcblxuICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuZ2V0VHJlZUl0ZW0oaWQsIHRoaXMucHJvcHMudHJlZURhdGEsIHRydWUpO1xuICAgIHJldHVybiBwYXJlbnQgPyBnZXRBZGphY2VudEl0ZW1JZChwYXJlbnQpIDogZ2V0QWRqYWNlbnRJdGVtSWQodHJlZURhdGEpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBcHBlbmRzIHByb3ZpZGVkIGl0ZW1zIHRvIHRoZSBncmlkXG4gICAqIEBwYXJhbSBpdGVtcyAtIGltbXV0YWJsZSBhcnJheSBvZiBpdGVtcyB0byBiZSBhcHBlbmRlZCB0byBncmlkXG4gICAqIEBwYXJhbSBzZXROZXdJdGVtcyAtIHNldCBjb21wbGV0ZWx5IGEgbmV3IGFycmF5IG9mIGl0ZW1zXG4gICAqL1xuICBzZXREYXRhVG9HcmlkID0gKGl0ZW1zLCBzZXROZXdJdGVtcyA9IGZhbHNlKSA9PiB7XG4gICAgbGV0IGRhdGEgPSBMaXN0KCk7XG4gICAgY29uc3QgeyBncmlkLCBncmlkQ29sdW1ucywgZ3JpZERhdGEgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFzZXROZXdJdGVtcykgZGF0YSA9IGdyaWREYXRhLnNsaWNlKCk7XG4gICAgY29uc3QgbmV3R3JpZEl0ZW1zID0gZGF0YS5jb25jYXQoaXRlbXMpO1xuXG4gICAgdGhpcy5wcm9wcy5zZXREYXRhKGdyaWQsIGdyaWRDb2x1bW5zLCBuZXdHcmlkSXRlbXMpO1xuICAgIHRoaXMucHJvcHMuY2xlYXJTZWxlY3RlZEl0ZW1zKGdyaWQpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDaGVja3Mgd2hldGhlciBvciBub3QgZ2l2ZW4gbm9kZSBpcyBkaXNhYmxlZFxuICAgKi9cbiAgaXNTZWxlY3RlZERpc2FibGVkID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgbG9ja2VkS2V5IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGl0ZW0gPSAhIXRoaXMuZ2V0VHJlZUl0ZW0odGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF0pO1xuICAgIGlmICghaXRlbSkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiBpdGVtW2xvY2tlZEtleV07XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgdGhlIGNob3NlbiBpdGVtIGZyb20gYSB0cmVlIGFuZCB1cGRhdGVzIHRoZSBncmlkIHVzaW5nIE1PVkVfTEVBRlxuICAgKiBhY3Rpb25cbiAgICovXG4gIG1vdmVJdGVtVG9HcmlkID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgdHJlZURhdGEsIG9uQ2hhbmdlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHNlbGVjdGVkS2V5ID0gdGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF07XG4gICAgY29uc3QgYWN0aW9uID0ge1xuICAgICAgdHlwZTogVFJFRV9BQ1RJT05TLk1PVkVfTEVBRixcbiAgICAgIGRhdGE6IHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdLFxuICAgIH07XG4gICAgY29uc3QgbmV4dFNlbGVjdGVkS2V5ID0gdGhpcy5nZXRBZGphY2VudEl0ZW0oc2VsZWN0ZWRLZXkpO1xuICAgIGNvbnN0IG5ld0dyaWRJdGVtcyA9IGZyb21KUyhbdGhpcy5nZXRUcmVlSXRlbShzZWxlY3RlZEtleSldKTtcbiAgICBjb25zdCBuZXdJdGVtcyA9IHRoaXMuZ2V0VXBkYXRlZFRyZWUoc2VsZWN0ZWRLZXksIHRyZWVEYXRhLCBhY3Rpb24pO1xuXG4gICAgdGhpcy5zZXREYXRhVG9HcmlkKG5ld0dyaWRJdGVtcyk7XG4gICAgaWYgKG9uQ2hhbmdlKSBvbkNoYW5nZShuZXdJdGVtcyk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzZWxlY3RlZEtleXM6IFtuZXh0U2VsZWN0ZWRLZXldLFxuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBFeHBhbmRzIGEgcGFyZW50XG4gICAqIEBwYXJhbSBwYXJlbnRJZFxuICAgKi9cbiAgZXhwYW5kUGFyZW50ID0gKHBhcmVudElkKSA9PiB7XG4gICAgaWYgKHBhcmVudElkICYmICF0aGlzLnN0YXRlLmV4cGFuZGVkS2V5cy5maW5kKGV4cGFuZGVkSWQgPT4gZXhwYW5kZWRJZCA9PT0gcGFyZW50SWQpKSB7XG4gICAgICBjb25zdCBuZXdFeHBhbmRlZEtleXMgPSB0aGlzLnN0YXRlLmV4cGFuZGVkS2V5cy5zbGljZSgpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICBuZXdFeHBhbmRlZEtleXMucHVzaChwYXJlbnRJZCk7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgZXhwYW5kZWRLZXlzOiBuZXdFeHBhbmRlZEtleXMgfSk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBDbG9zZXMgZGVsZXRlIGNvbmZpcm1hdGlvbiBkaWFsb2dcbiAgICovXG4gIGNsb3NlRGVsZXRlQ29uZmlybWF0aW9uRGlhbG9nID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzaG93RGVsZXRlQ29uZmlybWF0aW9uOiBmYWxzZSB9KTtcbiAgfTtcblxuICAvKipcbiAgICogRGVsZXRlcyBhIHBhcmVudCBub2RlXG4gICAqL1xuICBkZWxldGVQYXJlbnQgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBvbkNoYW5nZSwgdHJlZURhdGEgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgc2VsZWN0ZWRLZXkgPSB0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXTtcbiAgICBjb25zdCBhY3Rpb24gPSB7XG4gICAgICB0eXBlOiBUUkVFX0FDVElPTlMuREVMRVRFX1BBUkVOVCxcbiAgICB9O1xuICAgIGNvbnN0IG5leHRTZWxlY3RlZEtleSA9IHRoaXMuZ2V0QWRqYWNlbnRJdGVtKHNlbGVjdGVkS2V5KTtcbiAgICBjb25zdCBuZXdJdGVtcyA9IHRoaXMuZ2V0VXBkYXRlZFRyZWUoc2VsZWN0ZWRLZXksIHRyZWVEYXRhLCBhY3Rpb24pO1xuICAgIGlmIChvbkNoYW5nZSkgb25DaGFuZ2UobmV3SXRlbXMpO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2VsZWN0ZWRLZXlzOiBbbmV4dFNlbGVjdGVkS2V5XSxcbiAgICAgIHNob3dEZWxldGVDb25maXJtYXRpb246IGZhbHNlLFxuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBEZXNlbGVjdHMgYW4gaXRlbSwgaWYgaXQgaXMgZS5nLiByZW1vdmVkXG4gICAqL1xuICBkZXNlbGVjdEl0ZW0gPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkS2V5czogW10gfSk7XG4gIH07XG5cbiAgcmVuZGVySGVhZGVyUmlnaHQgPSB0cmFuc2xhdGlvbnMgPT4gKFxuICAgIDxDb250cm9sQmFyXG4gICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgIG9uQWRkTmV3Q2xpY2s9e3RoaXMub25BZGROZXdDbGlja31cbiAgICAgIG9uRGVsZXRlQ2xpY2s9e3RoaXMub25EZWxldGVDbGlja31cbiAgICAgIG9uSW5wdXRDaGFuZ2U9e3RoaXMub25JbnB1dENoYW5nZX1cbiAgICAgIHNlbGVjdGVkVHJlZUl0ZW09e3RoaXMuZ2V0VHJlZUl0ZW0odGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF0pfVxuICAgICAgaGVpZ2h0PXtBQ1RJT05fQkFSX0NPTlRBSU5FUl9IRUlHSFR9XG4gICAgICB0cmFuc2xhdGlvbnM9e3RyYW5zbGF0aW9uc31cbiAgICAvPlxuICApO1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICB2YWx1ZUtleSxcbiAgICAgIGlkS2V5LFxuICAgICAgdHJlZURhdGEsXG4gICAgICBncmlkLFxuICAgICAgZ3JpZENvbHVtbnMsXG4gICAgICBjbGFzc05hbWUsXG4gICAgICB0cmFuc2xhdGlvbnMsXG4gICAgICBjaGlsZEtleSxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IG1lcmdlZEdyaWQgPSBPYmplY3QuYXNzaWduKHt9LCBncmlkLCB7IGRlZmF1bHRTaG93RmlsdGVyaW5nUm93OiB0cnVlIH0pO1xuICAgIGNvbnN0IG1lcmdlZFRyYW5zbGF0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRUcmFuc2xhdGlvbnMsIHRyYW5zbGF0aW9ucyk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPFJlYWN0LkZyYWdtZW50PlxuICAgICAgICA8Q29udGFpbmVyIGNsYXNzTmFtZT17Y2xhc3NOYW1lfT5cbiAgICAgICAgICA8VHJlZUNvbnRhaW5lcj5cbiAgICAgICAgICAgIDxUcmVlQ29tcG9uZW50XG4gICAgICAgICAgICAgIHRyZWVEYXRhPXt0cmVlRGF0YX1cbiAgICAgICAgICAgICAgZGF0YUxvb2tVcEtleT17aWRLZXl9XG4gICAgICAgICAgICAgIGRhdGFMb29rVXBWYWx1ZT17dmFsdWVLZXl9XG4gICAgICAgICAgICAgIGRhdGFMb29rVXBDaGlsZHJlbj17Y2hpbGRLZXl9XG4gICAgICAgICAgICAgIG9uU2VsZWN0PXt0aGlzLm9uVHJlZUl0ZW1TZWxlY3R9XG4gICAgICAgICAgICAgIG9uRXhwYW5kPXt0aGlzLm9uRXhwYW5kfVxuICAgICAgICAgICAgICBjaGVja2FibGU9e2ZhbHNlfVxuICAgICAgICAgICAgICBzZWxlY3RlZEtleXM9e3RoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzfVxuICAgICAgICAgICAgICBleHBhbmRlZEtleXM9e3RoaXMuc3RhdGUuZXhwYW5kZWRLZXlzfVxuICAgICAgICAgICAgICBvbk9yZGVyQnV0dG9uQ2xpY2s9e3RoaXMub25PcmRlckNsaWNrfVxuICAgICAgICAgICAgICB0aXRsZT17bWVyZ2VkVHJhbnNsYXRpb25zLnRyZWVUaXRsZX1cbiAgICAgICAgICAgICAgc2VsZWN0YWJsZVxuICAgICAgICAgICAgICBzaG93T3JkZXJpbmdBcnJvd3NcbiAgICAgICAgICAgICAgc2hvd0V4cGFuZEFsbFxuICAgICAgICAgICAgICBoZWFkZXJSaWdodD17dGhpcy5yZW5kZXJIZWFkZXJSaWdodChtZXJnZWRUcmFuc2xhdGlvbnMpfVxuICAgICAgICAgICAgICBoYW5kbGVFeHBhbmRlZEtleXNNYW51YWxseVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L1RyZWVDb250YWluZXI+XG4gICAgICAgICAgPEFycm93Q29udHJvbHNcbiAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgc2VsZWN0ZWRUcmVlSXRlbT17dGhpcy5nZXRUcmVlSXRlbSh0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXSl9XG4gICAgICAgICAgICBvbk1vdmVUb1RyZWVDbGljaz17dGhpcy5vbk1vdmVUb1RyZWVDbGlja31cbiAgICAgICAgICAgIG9uTW92ZVRvR3JpZENsaWNrPXt0aGlzLm9uTW92ZVRvR3JpZENsaWNrfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPEdyaWRcbiAgICAgICAgICAgIGdyaWQ9e21lcmdlZEdyaWR9XG4gICAgICAgICAgICBjb2x1bW5zPXtncmlkQ29sdW1uc31cbiAgICAgICAgICAgIG11bHRpU2VsZWN0XG4gICAgICAgICAgICBmaWx0ZXJpbmdcbiAgICAgICAgICAgIHJvd1NlbGVjdENoZWNrYm94Q29sdW1uXG4gICAgICAgICAgICBncmlkSGVhZGVyPXs8UHJpbWl0aXZlLlN1YnRpdGxlPnttZXJnZWRUcmFuc2xhdGlvbnMuZ3JpZFRpdGxlfTwvUHJpbWl0aXZlLlN1YnRpdGxlPn1cbiAgICAgICAgICAvPlxuICAgICAgICA8L0NvbnRhaW5lcj5cbiAgICAgICAge3RoaXMuc3RhdGUuc2hvd0RlbGV0ZUNvbmZpcm1hdGlvbiAmJiAoXG4gICAgICAgICAgPENvbmZpcm1EaWFsb2dcbiAgICAgICAgICAgIHRyYW5zbGF0aW9ucz17bWVyZ2VkVHJhbnNsYXRpb25zLmRlbGV0ZUNvbmZpcm1EaWFsb2d9XG4gICAgICAgICAgICBjb25maXJtQ2FsbGJhY2s9e3RoaXMuZGVsZXRlUGFyZW50fVxuICAgICAgICAgICAgY2FuY2VsQ2FsbGJhY2s9e3RoaXMuY2xvc2VEZWxldGVDb25maXJtYXRpb25EaWFsb2d9XG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cbiAgICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gICAgKTtcbiAgfVxufVxuIl19