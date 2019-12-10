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
          gridData = _this$props9.gridData,
          sortKey = _this$props9.sortKey;
      if (!setNewItems) data = gridData.slice();
      var newGridItems = data.concat(items);
      if (sortKey) newGridItems = newGridItems.sortBy(function (i) {
        return i.get(sortKey);
      });

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

  var _proto = HierarchyTreeSelector.prototype;

  _proto.componentDidMount = function componentDidMount() {
    if (this.props.defaultExpandedKeys.length > 0) {
      this.onExpand(this.props.defaultExpandedKeys);
    }
  }
  /**
   * Selects a tree item
   * @param selectedKeys (array)
   */
  ;

  _proto.render = function render() {
    var _this$props12 = this.props,
        valueKey = _this$props12.valueKey,
        leafValueKey = _this$props12.leafValueKey,
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
      dataLookUpLeafValue: leafValueKey,
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
  leafValueKey: undefined,
  sortKey: undefined,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlRyZWVDb21wb25lbnQiLCJQcmltaXRpdmUiLCJEYXRhZ3JpZCIsImdyaWRTaGFwZSIsImdyaWRDb2x1bW5TaGFwZSIsIkRhdGFncmlkQWN0aW9ucyIsIkNvbmZpcm1EaWFsb2ciLCJSZWFjdCIsInN0eWxlZCIsIkxpc3QiLCJmcm9tSlMiLCJJbW11dGFibGVQcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJjb25uZWN0IiwiQ29udHJvbEJhciIsIkFycm93Q29udHJvbHMiLCJkZWZhdWx0VHJhbnNsYXRpb25zIiwiQUNUSU9OX0JBUl9DT05UQUlORVJfSEVJR0hUIiwiVFJFRV9BQ1RJT05TIiwiQUREX0NISUxEUkVOIiwiTU9WRV9MRUFGIiwiUkVOQU1FX1BBUkVOVCIsIkRFTEVURV9QQVJFTlQiLCJHcmlkIiwiQ29udGFpbmVyIiwiZGl2IiwiVHJlZUNvbnRhaW5lciIsInByb3BzIiwidGhlbWUiLCJndXR0ZXJXaWR0aCIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsInNldERhdGEiLCJjbGVhclNlbGVjdGVkSXRlbXMiLCJtYXBTdGF0ZVRvUHJvcHMiLCJzdGF0ZSIsImdyaWRJZCIsImdyaWQiLCJpZCIsInNlbGVjdGVkR3JpZEl0ZW1zIiwiZGF0YWdyaWQiLCJnZXRJbiIsImdyaWREYXRhIiwiSGllcmFyY2h5VHJlZVNlbGVjdG9yIiwic2VsZWN0ZWRLZXlzIiwib25TZWxlY3QiLCJsb2NrZWRLZXkiLCJzZWxlY3RlZEl0ZW0iLCJnZXRUcmVlSXRlbSIsInNldFN0YXRlIiwiY2hpbGRLZXkiLCJvblByZXZlbnREZWxldGUiLCJpdGVtIiwibW92ZUl0ZW1Ub0dyaWQiLCJsZWFmcyIsImdldEFsbExlYWZzIiwiZmluZCIsImxlYWYiLCJzaG93RGVsZXRlQ29uZmlybWF0aW9uIiwiZGF0YSIsImNhbGxiYWNrIiwib25DaGFuZ2UiLCJ0cmVlRGF0YSIsImlkS2V5IiwibmV3SXRlbXMiLCJzbGljZSIsInB1c2giLCJhY3Rpb24iLCJ0eXBlIiwiZ2V0VXBkYXRlZFRyZWUiLCJwYXJlbnQiLCJleHBhbmRQYXJlbnQiLCJpdGVtcyIsInNlbGVjdGVkSWQiLCJmaWx0ZXIiLCJpIiwiaW5jbHVkZXMiLCJnZXQiLCJ0b0pTIiwibmV3R3JpZEl0ZW1zIiwic2V0RGF0YVRvR3JpZCIsInZhbHVlIiwiaWRzIiwiZXhwYW5kZWRLZXlzIiwiYXJyYXkiLCJpc1NlbGVjdGVkRGlzYWJsZWQiLCJmb3VuZCIsInZhbHVlS2V5IiwicmVtb3ZlQWN0aW9ucyIsInJvb3RJdGVtIiwibGVuZ3RoIiwiZGVzZWxlY3RJdGVtIiwiY2hpbGQiLCJmaWx0ZXJlZENoaWxkcmVuIiwiY2hpbGRJdGVtIiwiY29uY2F0IiwiVHlwZUVycm9yIiwiYWxyZWFkeUZvdW5kIiwicmV0dXJuUGFyZW50IiwiZm9yRWFjaCIsImdldEFkamFjZW50SXRlbUlkIiwicGFyZW50QXJyIiwiQXJyYXkiLCJpc0FycmF5IiwiaW5kZXgiLCJmaW5kSW5kZXgiLCJhZGphY2VudEl0ZW0iLCJzZXROZXdJdGVtcyIsImdyaWRDb2x1bW5zIiwic29ydEtleSIsInNvcnRCeSIsInNlbGVjdGVkS2V5IiwibmV4dFNlbGVjdGVkS2V5IiwiZ2V0QWRqYWNlbnRJdGVtIiwicGFyZW50SWQiLCJleHBhbmRlZElkIiwibmV3RXhwYW5kZWRLZXlzIiwidHJhbnNsYXRpb25zIiwib25BZGROZXdDbGljayIsIm9uRGVsZXRlQ2xpY2siLCJvbklucHV0Q2hhbmdlIiwiY29tcG9uZW50RGlkTW91bnQiLCJkZWZhdWx0RXhwYW5kZWRLZXlzIiwib25FeHBhbmQiLCJyZW5kZXIiLCJsZWFmVmFsdWVLZXkiLCJjbGFzc05hbWUiLCJtZXJnZWRHcmlkIiwiT2JqZWN0IiwiYXNzaWduIiwiZGVmYXVsdFNob3dGaWx0ZXJpbmdSb3ciLCJtZXJnZWRUcmFuc2xhdGlvbnMiLCJvblRyZWVJdGVtU2VsZWN0Iiwib25PcmRlckNsaWNrIiwidHJlZVRpdGxlIiwicmVuZGVySGVhZGVyUmlnaHQiLCJvbk1vdmVUb1RyZWVDbGljayIsIm9uTW92ZVRvR3JpZENsaWNrIiwiZ3JpZFRpdGxlIiwiZGVsZXRlQ29uZmlybURpYWxvZyIsImRlbGV0ZVBhcmVudCIsImNsb3NlRGVsZXRlQ29uZmlybWF0aW9uRGlhbG9nIiwiUHVyZUNvbXBvbmVudCIsInVuZGVmaW5lZCIsImRlZmF1bHRFeHBhbmRBbGwiLCJzaW5nbGVSb290Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPQSxhQUFQLE1BQTBCLGtDQUExQjtBQUNBLFNBQVNDLFNBQVQsUUFBMEIsa0NBQTFCO0FBQ0EsU0FDRUMsUUFERixFQUNZQyxTQURaLEVBQ3VCQyxlQUR2QixFQUN3Q0MsZUFEeEMsUUFFTyx3QkFGUDtBQUdBLE9BQU9DLGFBQVAsTUFBMEIsdUNBQTFCO0FBQ0EsT0FBT0MsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLE1BQVAsTUFBbUIsbUJBQW5CO0FBQ0EsU0FBU0MsSUFBVCxFQUFlQyxNQUFmLFFBQTZCLFdBQTdCO0FBQ0EsT0FBT0Msa0JBQVAsTUFBK0IsMkJBQS9CO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLFNBQVNDLE9BQVQsUUFBd0IsYUFBeEIsQyxDQUVBOztBQUNBLE9BQU9DLFVBQVAsTUFBdUIsaURBQXZCO0FBQ0EsT0FBT0MsYUFBUCxNQUEwQixvREFBMUI7QUFDQSxTQUFTQyxtQkFBVCxRQUFvQyx3QkFBcEM7QUFFQSxJQUFNQywyQkFBMkIsR0FBRyxNQUFwQztBQUNBLElBQU1DLFlBQVksR0FBRztBQUNuQkMsRUFBQUEsWUFBWSxFQUFFLGNBREs7QUFFbkJDLEVBQUFBLFNBQVMsRUFBRSxXQUZRO0FBR25CQyxFQUFBQSxhQUFhLEVBQUUsZUFISTtBQUluQkMsRUFBQUEsYUFBYSxFQUFFO0FBSkksQ0FBckI7QUFPQSxJQUFNQyxJQUFJLEdBQUdmLE1BQU0sQ0FBQ04sUUFBRCxDQUFULG1CQUFWO0FBT0EsSUFBTXNCLFNBQVMsR0FBR2hCLE1BQU0sQ0FBQ2lCLEdBQVYsb0JBQWY7QUFTQSxJQUFNQyxhQUFhLEdBQUdsQixNQUFNLENBQUNpQixHQUFWLHFCQUdPUiwyQkFIUCxFQUlKLFVBQUFVLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWUMsV0FBaEI7QUFBQSxDQUpELEVBT0RaLDJCQVBDLENBQW5CO0FBb0JBLElBQU1hLGtCQUFrQixHQUFHO0FBQ3pCQyxFQUFBQSxPQUFPLEVBQUUxQixlQUFlLENBQUMwQixPQURBO0FBRXpCQyxFQUFBQSxrQkFBa0IsRUFBRTNCLGVBQWUsQ0FBQzJCO0FBRlgsQ0FBM0I7O0FBS0EsSUFBTUMsZUFBZSxHQUFHLFNBQWxCQSxlQUFrQixDQUFDQyxLQUFELEVBQVFQLEtBQVIsRUFBa0I7QUFDeEMsTUFBTVEsTUFBTSxHQUFHUixLQUFLLENBQUNTLElBQU4sQ0FBV0MsRUFBMUI7QUFDQSxTQUFPO0FBQ0xDLElBQUFBLGlCQUFpQixFQUFFSixLQUFLLENBQUNLLFFBQU4sQ0FBZUMsS0FBZixDQUFxQixDQUFDTCxNQUFELEVBQVMsZUFBVCxDQUFyQixFQUFnRDFCLElBQUksRUFBcEQsQ0FEZDtBQUVMZ0MsSUFBQUEsUUFBUSxFQUFFUCxLQUFLLENBQUNLLFFBQU4sQ0FBZUMsS0FBZixDQUFxQixDQUFDTCxNQUFELEVBQVMsU0FBVCxDQUFyQixFQUEwQzFCLElBQUksRUFBOUM7QUFGTCxHQUFQO0FBSUQsQ0FORDs7SUFZcUJpQyxxQixXQUpwQjdCLE9BQU8sQ0FDTm9CLGVBRE0sRUFFTkgsa0JBRk0sQzs7Ozs7QUFrRE4saUNBQVlILEtBQVosRUFBbUI7QUFBQTs7QUFDakIsNENBQU1BLEtBQU47O0FBRGlCLHVFQW1CQSxVQUFDZ0IsWUFBRCxFQUFrQjtBQUFBLHdCQUNILE1BQUtoQixLQURGO0FBQUEsVUFDM0JpQixRQUQyQixlQUMzQkEsUUFEMkI7QUFBQSxVQUNqQkMsU0FEaUIsZUFDakJBLFNBRGlCOztBQUVuQyxVQUFNQyxZQUFZLEdBQUcsTUFBS0MsV0FBTCxDQUFpQkosWUFBWSxDQUFDLENBQUQsQ0FBN0IsQ0FBckI7O0FBQ0EsVUFBSUUsU0FBUyxJQUFJQyxZQUFiLElBQTZCQSxZQUFZLENBQUNELFNBQUQsQ0FBN0MsRUFBMEQ7O0FBQzFELFlBQUtHLFFBQUwsQ0FBYztBQUFFTCxRQUFBQSxZQUFZLEVBQVpBO0FBQUYsT0FBZCxFQUFnQyxZQUFNO0FBQ3BDLFlBQUlDLFFBQUosRUFBY0EsUUFBUSxDQUFDRCxZQUFELENBQVI7QUFDZixPQUZEO0FBR0QsS0ExQmtCOztBQUFBLG9FQStCSCxZQUFNO0FBQUEseUJBQzZCLE1BQUtoQixLQURsQztBQUFBLFVBQ1pzQixRQURZLGdCQUNaQSxRQURZO0FBQUEsVUFDRkosU0FERSxnQkFDRkEsU0FERTtBQUFBLFVBQ1NLLGVBRFQsZ0JBQ1NBLGVBRFQ7O0FBRXBCLFVBQU1DLElBQUksR0FBRyxNQUFLSixXQUFMLENBQWlCLE1BQUtiLEtBQUwsQ0FBV1MsWUFBWCxDQUF3QixDQUF4QixDQUFqQixDQUFiLENBRm9CLENBR3BCOzs7QUFDQSxVQUFJLENBQUNRLElBQUksQ0FBQ0YsUUFBRCxDQUFULEVBQXFCO0FBQ25CLGNBQUtHLGNBQUw7O0FBQ0E7QUFDRDs7QUFFRCxVQUFJUCxTQUFKLEVBQWU7QUFDYjtBQUNBLFlBQU1RLEtBQUssR0FBRyxNQUFLQyxXQUFMLENBQWlCSCxJQUFJLENBQUNGLFFBQUQsQ0FBckIsQ0FBZDs7QUFDQSxZQUFJSSxLQUFLLENBQUNFLElBQU4sQ0FBVyxVQUFBQyxJQUFJO0FBQUEsaUJBQUlBLElBQUksQ0FBQ1gsU0FBRCxDQUFSO0FBQUEsU0FBZixLQUF1Q0ssZUFBM0MsRUFBNEQ7QUFDMURBLFVBQUFBLGVBQWU7QUFDZjtBQUNEO0FBQ0Y7O0FBRUQsWUFBS0YsUUFBTCxDQUFjO0FBQUVTLFFBQUFBLHNCQUFzQixFQUFFO0FBQTFCLE9BQWQ7QUFDRCxLQWxEa0I7O0FBQUEsb0VBMERILFVBQUNDLElBQUQsRUFBT0MsUUFBUCxFQUFvQjtBQUFBLHlCQUNJLE1BQUtoQyxLQURUO0FBQUEsVUFDMUJpQyxRQUQwQixnQkFDMUJBLFFBRDBCO0FBQUEsVUFDaEJDLFFBRGdCLGdCQUNoQkEsUUFEZ0I7QUFBQSxVQUNOQyxLQURNLGdCQUNOQSxLQURNO0FBRWxDLFVBQUlDLFFBQVEsR0FBR0YsUUFBUSxDQUFDRyxLQUFULEVBQWYsQ0FGa0MsQ0FJbEM7QUFDQTs7QUFDQSxVQUFJLENBQUMsTUFBSzlCLEtBQUwsQ0FBV1MsWUFBWCxDQUF3QixDQUF4QixDQUFMLEVBQWlDO0FBQy9Cb0IsUUFBQUEsUUFBUSxDQUFDRSxJQUFULENBQWNQLElBQWQ7QUFDRCxPQUZELE1BRU87QUFDTCxZQUFNUSxNQUFNLEdBQUc7QUFDYkMsVUFBQUEsSUFBSSxFQUFFakQsWUFBWSxDQUFDQyxZQUROO0FBRWJ1QyxVQUFBQSxJQUFJLEVBQUpBO0FBRmEsU0FBZjtBQUlBSyxRQUFBQSxRQUFRLEdBQUcsTUFBS0ssY0FBTCxDQUFvQixNQUFLbEMsS0FBTCxDQUFXUyxZQUFYLENBQXdCLENBQXhCLENBQXBCLEVBQWdEa0IsUUFBaEQsRUFBMERLLE1BQTFELENBQVg7QUFDRDs7QUFDRCxZQUFLbEIsUUFBTCxDQUFjO0FBQUVMLFFBQUFBLFlBQVksRUFBRSxDQUFDZSxJQUFJLENBQUNJLEtBQUQsQ0FBTDtBQUFoQixPQUFkLEVBQStDLFlBQU07QUFDbkQ7QUFDQSxZQUFNTyxNQUFNLEdBQUcsTUFBS3RCLFdBQUwsQ0FBaUJXLElBQUksQ0FBQ0ksS0FBRCxDQUFyQixFQUE4QkQsUUFBOUIsRUFBd0MsSUFBeEMsS0FBaUQsRUFBaEU7O0FBQ0EsY0FBS1MsWUFBTCxDQUFrQkQsTUFBTSxDQUFDUCxLQUFELENBQXhCOztBQUVBLFlBQUlGLFFBQUosRUFBY0EsUUFBUSxDQUFDRyxRQUFELENBQVI7QUFDZEosUUFBQUEsUUFBUTtBQUNULE9BUEQ7QUFRRCxLQWpGa0I7O0FBQUEsd0VBbUZDLFlBQU07QUFDeEIsWUFBS1AsY0FBTDtBQUNELEtBckZrQjs7QUFBQSxtRUEyRkosVUFBQ21CLEtBQUQsRUFBVztBQUN4QixZQUFLNUMsS0FBTCxDQUFXaUMsUUFBWCxDQUFvQlcsS0FBcEI7QUFDRCxLQTdGa0I7O0FBQUEsd0VBa0dDLFlBQU07QUFBQSx5QkFHcEIsTUFBSzVDLEtBSGU7QUFBQSxVQUV0QmlDLFFBRnNCLGdCQUV0QkEsUUFGc0I7QUFBQSxVQUVadEIsaUJBRlksZ0JBRVpBLGlCQUZZO0FBQUEsVUFFT0csUUFGUCxnQkFFT0EsUUFGUDtBQUFBLFVBRWlCb0IsUUFGakIsZ0JBRWlCQSxRQUZqQjtBQUFBLFVBRTJCQyxLQUYzQixnQkFFMkJBLEtBRjNCO0FBSXhCLFVBQU1VLFVBQVUsR0FBRyxNQUFLdEMsS0FBTCxDQUFXUyxZQUFYLENBQXdCLENBQXhCLENBQW5CO0FBRUEsVUFBTXVCLE1BQU0sR0FBRztBQUNiQyxRQUFBQSxJQUFJLEVBQUVqRCxZQUFZLENBQUNDLFlBRE47QUFFYnVDLFFBQUFBLElBQUksRUFBRWpCLFFBQVEsQ0FBQ2dDLE1BQVQsQ0FBZ0IsVUFBQUMsQ0FBQztBQUFBLGlCQUFJcEMsaUJBQWlCLENBQUNxQyxRQUFsQixDQUEyQkQsQ0FBQyxDQUFDRSxHQUFGLENBQU1kLEtBQU4sQ0FBM0IsQ0FBSjtBQUFBLFNBQWpCLEVBQStEZSxJQUEvRDtBQUZPLE9BQWY7O0FBSUEsVUFBTWQsUUFBUSxHQUFHLE1BQUtLLGNBQUwsQ0FBb0JJLFVBQXBCLEVBQWdDWCxRQUFoQyxFQUEwQ0ssTUFBMUMsQ0FBakI7O0FBQ0EsVUFBTVksWUFBWSxHQUFHckMsUUFBUSxDQUFDZ0MsTUFBVCxDQUFnQixVQUFBdEIsSUFBSTtBQUFBLGVBQUksQ0FBQ2IsaUJBQWlCLENBQUNxQyxRQUFsQixDQUEyQnhCLElBQUksQ0FBQ3lCLEdBQUwsQ0FBU2QsS0FBVCxDQUEzQixDQUFMO0FBQUEsT0FBcEIsQ0FBckI7O0FBRUEsWUFBS1EsWUFBTCxDQUFrQkUsVUFBbEIsRUFBOEIsSUFBOUI7O0FBQ0EsWUFBS08sYUFBTCxDQUFtQkQsWUFBbkIsRUFBaUMsSUFBakM7O0FBQ0EsVUFBSWxCLFFBQUosRUFBY0EsUUFBUSxDQUFDRyxRQUFELENBQVI7QUFDZixLQWxIa0I7O0FBQUEsb0VBd0hILFVBQUNpQixLQUFELEVBQVc7QUFBQSx5QkFDTSxNQUFLckQsS0FEWDtBQUFBLFVBQ2pCa0MsUUFEaUIsZ0JBQ2pCQSxRQURpQjtBQUFBLFVBQ1BELFFBRE8sZ0JBQ1BBLFFBRE87QUFFekIsVUFBTU0sTUFBTSxHQUFHO0FBQ2JDLFFBQUFBLElBQUksRUFBRWpELFlBQVksQ0FBQ0csYUFETjtBQUVicUMsUUFBQUEsSUFBSSxFQUFFc0I7QUFGTyxPQUFmOztBQUlBLFVBQU1qQixRQUFRLEdBQUcsTUFBS0ssY0FBTCxDQUFvQixNQUFLbEMsS0FBTCxDQUFXUyxZQUFYLENBQXdCLENBQXhCLENBQXBCLEVBQWdEa0IsUUFBaEQsRUFBMERLLE1BQTFELENBQWpCOztBQUNBLFVBQUlOLFFBQUosRUFBY0EsUUFBUSxDQUFDRyxRQUFELENBQVI7QUFDZixLQWhJa0I7O0FBQUEsK0RBc0lSLFVBQUNrQixHQUFELEVBQVM7QUFDbEIsWUFBS2pDLFFBQUwsQ0FBYztBQUNaa0MsUUFBQUEsWUFBWSxFQUFFRDtBQURGLE9BQWQ7QUFHRCxLQTFJa0I7O0FBQUEscUVBbUpGLFVBQUM1QyxFQUFELEVBQUs4QyxLQUFMLEVBQWtDakIsTUFBbEMsRUFBNkM7QUFBQSxVQUF4Q2lCLEtBQXdDO0FBQXhDQSxRQUFBQSxLQUF3QyxHQUFoQyxNQUFLeEQsS0FBTCxDQUFXa0MsUUFBcUI7QUFBQTs7QUFDNUQsVUFBSSxNQUFLdUIsa0JBQUwsRUFBSixFQUErQixPQUFPRCxLQUFQO0FBRS9CLFVBQUlFLEtBQUssR0FBRyxLQUFaO0FBSDRELHlCQUl0QixNQUFLMUQsS0FKaUI7QUFBQSxVQUlwRG1DLEtBSm9ELGdCQUlwREEsS0FKb0Q7QUFBQSxVQUk3Q2IsUUFKNkMsZ0JBSTdDQSxRQUo2QztBQUFBLFVBSW5DcUMsUUFKbUMsZ0JBSW5DQSxRQUptQztBQUs1RCxVQUFNdkIsUUFBUSxHQUFHb0IsS0FBSyxDQUFDbkIsS0FBTixFQUFqQjtBQUNBLFVBQU11QixhQUFhLEdBQUcsQ0FBQ3JFLFlBQVksQ0FBQ0UsU0FBZCxFQUF5QkYsWUFBWSxDQUFDSSxhQUF0QyxDQUF0QixDQU40RCxDQVE1RDs7QUFDQSxVQUFJNEMsTUFBTSxDQUFDQyxJQUFQLEtBQWdCakQsWUFBWSxDQUFDSSxhQUFqQyxFQUFnRDtBQUM5QyxZQUFNa0UsUUFBUSxHQUFHTCxLQUFLLENBQUM1QixJQUFOLENBQVcsVUFBQUosSUFBSTtBQUFBLGlCQUFJQSxJQUFJLENBQUNXLEtBQUQsQ0FBSixLQUFnQnpCLEVBQXBCO0FBQUEsU0FBZixDQUFqQjs7QUFDQSxZQUFJbUQsUUFBSixFQUFjO0FBQ1osY0FBSUEsUUFBUSxDQUFDdkMsUUFBRCxDQUFSLENBQW1Cd0MsTUFBdkIsRUFBK0I7QUFDN0Isa0JBQUtWLGFBQUwsQ0FBbUJyRSxNQUFNLENBQUMsTUFBSzRDLFdBQUwsQ0FBaUJrQyxRQUFRLENBQUN2QyxRQUFELENBQXpCLENBQUQsQ0FBekI7O0FBQ0Esa0JBQUt5QyxZQUFMO0FBQ0Q7O0FBQ0QsaUJBQU8zQixRQUFRLENBQUNVLE1BQVQsQ0FBZ0IsVUFBQXRCLElBQUk7QUFBQSxtQkFBSUEsSUFBSSxDQUFDVyxLQUFELENBQUosS0FBZ0J6QixFQUFwQjtBQUFBLFdBQXBCLENBQVA7QUFDRDtBQUNGOztBQUVELFdBQUssSUFBSXFDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdYLFFBQVEsQ0FBQzBCLE1BQTdCLEVBQXFDZixDQUFDLElBQUksQ0FBMUMsRUFBNkM7QUFDM0MsWUFBTXZCLElBQUksR0FBR1ksUUFBUSxDQUFDVyxDQUFELENBQXJCOztBQUNBLFlBQUlhLGFBQWEsQ0FBQ1osUUFBZCxDQUF1QlQsTUFBTSxDQUFDQyxJQUE5QixLQUF1Q2hCLElBQUksQ0FBQ0YsUUFBRCxDQUEzQyxJQUF5RCxDQUFDb0MsS0FBOUQsRUFBcUU7QUFDbkVBLFVBQUFBLEtBQUssR0FBRyxDQUFDLENBQUNsQyxJQUFJLENBQUNGLFFBQUQsQ0FBSixDQUFlTSxJQUFmLENBQW9CLFVBQUFvQyxLQUFLO0FBQUEsbUJBQUlBLEtBQUssQ0FBQzdCLEtBQUQsQ0FBTCxLQUFpQnpCLEVBQXJCO0FBQUEsV0FBekIsQ0FBVjs7QUFDQSxjQUFJZ0QsS0FBSixFQUFXO0FBQ1Q7QUFDQSxnQkFBSW5CLE1BQU0sQ0FBQ0MsSUFBUCxLQUFnQmpELFlBQVksQ0FBQ0UsU0FBakMsRUFBNEM7QUFDMUMrQixjQUFBQSxJQUFJLENBQUNGLFFBQUQsQ0FBSixHQUFpQkUsSUFBSSxDQUFDRixRQUFELENBQUosQ0FBZXdCLE1BQWYsQ0FBc0IsVUFBQWtCLEtBQUs7QUFBQSx1QkFBSUEsS0FBSyxDQUFDN0IsS0FBRCxDQUFMLEtBQWlCekIsRUFBckI7QUFBQSxlQUEzQixDQUFqQjs7QUFDQSxvQkFBS3FELFlBQUw7QUFDRDs7QUFDRCxnQkFBSXhCLE1BQU0sQ0FBQ0MsSUFBUCxLQUFnQmpELFlBQVksQ0FBQ0ksYUFBakMsRUFBZ0Q7QUFDOUM7QUFDQTtBQUNBLGtCQUFNc0UsZ0JBQWdCLEdBQUd6QyxJQUFJLENBQUNGLFFBQUQsQ0FBSixDQUFld0IsTUFBZixDQUFzQixVQUFBb0IsU0FBUztBQUFBLHVCQUFJQSxTQUFTLENBQUMvQixLQUFELENBQVQsS0FBcUJ6QixFQUF6QjtBQUFBLGVBQS9CLENBQXpCOztBQUNBLG9CQUFLMEMsYUFBTCxDQUFtQnJFLE1BQU0sQ0FBQyxNQUFLNEMsV0FBTCxDQUFpQnNDLGdCQUFqQixDQUFELENBQXpCOztBQUNBLG9CQUFLRixZQUFMOztBQUNBdkMsY0FBQUEsSUFBSSxDQUFDRixRQUFELENBQUosR0FBaUJFLElBQUksQ0FBQ0YsUUFBRCxDQUFKLENBQWV3QixNQUFmLENBQXNCLFVBQUFvQixTQUFTO0FBQUEsdUJBQUlBLFNBQVMsQ0FBQy9CLEtBQUQsQ0FBVCxLQUFxQnpCLEVBQXpCO0FBQUEsZUFBL0IsQ0FBakI7QUFDRDs7QUFDRDtBQUNEO0FBQ0Y7O0FBRUQsWUFBSWMsSUFBSSxDQUFDVyxLQUFELENBQUosS0FBZ0J6QixFQUFoQixJQUFzQixDQUFDZ0QsS0FBM0IsRUFBa0M7QUFDaENBLFVBQUFBLEtBQUssR0FBRyxJQUFSOztBQUNBLGtCQUFRbkIsTUFBTSxDQUFDQyxJQUFmO0FBQ0UsaUJBQUtqRCxZQUFZLENBQUNDLFlBQWxCO0FBQ0VnQyxjQUFBQSxJQUFJLENBQUNGLFFBQUQsQ0FBSixHQUFpQixDQUFDRSxJQUFJLENBQUNGLFFBQUQsQ0FBSixJQUFrQixFQUFuQixFQUF1QjZDLE1BQXZCLENBQThCNUIsTUFBTSxDQUFDUixJQUFyQyxDQUFqQjtBQUNBOztBQUNGLGlCQUFLeEMsWUFBWSxDQUFDRyxhQUFsQjtBQUNFOEIsY0FBQUEsSUFBSSxDQUFDbUMsUUFBRCxDQUFKLEdBQWlCcEIsTUFBTSxDQUFDUixJQUF4QjtBQUNBOztBQUNGO0FBQ0Usb0JBQU0sSUFBSXFDLFNBQUosQ0FBYywwQkFBZCxDQUFOO0FBUko7O0FBVUE7QUFDRDs7QUFDRCxZQUFJNUMsSUFBSSxDQUFDRixRQUFELENBQUosSUFBa0IsQ0FBQ29DLEtBQXZCLEVBQThCQSxLQUFLLEdBQUcsTUFBS2pCLGNBQUwsQ0FBb0IvQixFQUFwQixFQUF3QmMsSUFBSSxDQUFDRixRQUFELENBQTVCLEVBQXdDaUIsTUFBeEMsQ0FBUjtBQUMvQjs7QUFFRCxVQUFJLENBQUNtQixLQUFMLEVBQVksT0FBTyxLQUFQO0FBQ1osYUFBT3RCLFFBQVA7QUFDRCxLQWhOa0I7O0FBQUEsa0VBdU5MLFVBQUNvQixLQUFELEVBQVFhLFlBQVIsRUFBOEI7QUFBQSxVQUF0QkEsWUFBc0I7QUFBdEJBLFFBQUFBLFlBQXNCLEdBQVAsRUFBTztBQUFBOztBQUFBLFVBQ2xDL0MsUUFEa0MsR0FDckIsTUFBS3RCLEtBRGdCLENBQ2xDc0IsUUFEa0M7QUFFMUMsVUFBSUksS0FBSyxHQUFHMkMsWUFBWjs7QUFFQSxXQUFLLElBQUl0QixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHUyxLQUFLLENBQUNNLE1BQTFCLEVBQWtDZixDQUFDLElBQUksQ0FBdkMsRUFBMEM7QUFDeEMsWUFBTXZCLElBQUksR0FBR2dDLEtBQUssQ0FBQ1QsQ0FBRCxDQUFsQjs7QUFDQSxZQUFJdkIsSUFBSSxDQUFDRixRQUFELENBQVIsRUFBb0I7QUFDbEJJLFVBQUFBLEtBQUssR0FBRyxNQUFLQyxXQUFMLENBQWlCSCxJQUFJLENBQUNGLFFBQUQsQ0FBckIsRUFBaUMrQyxZQUFqQyxDQUFSO0FBQ0Q7O0FBQ0QsWUFBSSxDQUFDN0MsSUFBSSxDQUFDRixRQUFELENBQVQsRUFBcUJJLEtBQUssQ0FBQ1ksSUFBTixDQUFXZCxJQUFYO0FBQ3RCOztBQUNELGFBQU9FLEtBQVA7QUFDRCxLQW5Pa0I7O0FBQUEsa0VBNk9MLFVBQUNoQixFQUFELEVBQUs4QyxLQUFMLEVBQWtDYyxZQUFsQyxFQUF3RDVCLE1BQXhELEVBQTBFO0FBQUEsVUFBckVjLEtBQXFFO0FBQXJFQSxRQUFBQSxLQUFxRSxHQUE3RCxNQUFLeEQsS0FBTCxDQUFXa0MsUUFBa0Q7QUFBQTs7QUFBQSxVQUF4Q29DLFlBQXdDO0FBQXhDQSxRQUFBQSxZQUF3QyxHQUF6QixLQUF5QjtBQUFBOztBQUFBLFVBQWxCNUIsTUFBa0I7QUFBbEJBLFFBQUFBLE1BQWtCLEdBQVQsSUFBUztBQUFBOztBQUFBLHlCQUMxRCxNQUFLMUMsS0FEcUQ7QUFBQSxVQUM5RXNCLFFBRDhFLGdCQUM5RUEsUUFEOEU7QUFBQSxVQUNwRWEsS0FEb0UsZ0JBQ3BFQSxLQURvRTtBQUV0RixVQUFJdUIsS0FBSyxHQUFHRixLQUFLLENBQUM1QixJQUFOLENBQVcsVUFBQUosSUFBSTtBQUFBLGVBQUlBLElBQUksQ0FBQ1csS0FBRCxDQUFKLEtBQWdCekIsRUFBcEI7QUFBQSxPQUFmLENBQVo7QUFFQSxVQUFJZ0QsS0FBSyxJQUFJWSxZQUFiLEVBQTJCWixLQUFLLEdBQUdoQixNQUFSOztBQUUzQixVQUFJLENBQUNnQixLQUFMLEVBQVk7QUFDVkYsUUFBQUEsS0FBSyxDQUFDZSxPQUFOLENBQWMsVUFBQy9DLElBQUQsRUFBVTtBQUN0QixjQUFJQSxJQUFJLENBQUNGLFFBQUQsQ0FBSixJQUFrQixDQUFDb0MsS0FBdkIsRUFBOEI7QUFDNUJBLFlBQUFBLEtBQUssR0FBRyxNQUFLdEMsV0FBTCxDQUFpQlYsRUFBakIsRUFBcUJjLElBQUksQ0FBQ0YsUUFBRCxDQUF6QixFQUFxQ2dELFlBQXJDLEVBQW1EOUMsSUFBbkQsQ0FBUjtBQUNEO0FBQ0YsU0FKRDtBQUtEOztBQUNELGFBQU9rQyxLQUFQO0FBQ0QsS0EzUGtCOztBQUFBLHNFQW1RRCxVQUFDaEQsRUFBRCxFQUFRO0FBQ3hCLFVBQUksQ0FBQ0EsRUFBTCxFQUFTLE9BQU8sSUFBUDtBQURlLHlCQUVjLE1BQUtWLEtBRm5CO0FBQUEsVUFFaEJzQixRQUZnQixnQkFFaEJBLFFBRmdCO0FBQUEsVUFFTmEsS0FGTSxnQkFFTkEsS0FGTTtBQUFBLFVBRUNELFFBRkQsZ0JBRUNBLFFBRkQ7O0FBSXhCLFVBQU1zQyxpQkFBaUIsR0FBRyxTQUFwQkEsaUJBQW9CLENBQUM5QixNQUFELEVBQVk7QUFDcEMsWUFBTStCLFNBQVMsR0FBR0MsS0FBSyxDQUFDQyxPQUFOLENBQWNqQyxNQUFkLElBQXdCQSxNQUF4QixHQUFpQ0EsTUFBTSxDQUFDcEIsUUFBRCxDQUF6RDtBQUNBLFlBQU1zRCxLQUFLLEdBQUdILFNBQVMsQ0FBQ0ksU0FBVixDQUFvQixVQUFBYixLQUFLO0FBQUEsaUJBQUlBLEtBQUssQ0FBQzdCLEtBQUQsQ0FBTCxLQUFpQnpCLEVBQXJCO0FBQUEsU0FBekIsQ0FBZDtBQUNBLFlBQUlvRSxZQUFZLEdBQUdMLFNBQVMsQ0FBQ0csS0FBSyxHQUFHLENBQVQsQ0FBNUI7QUFDQSxZQUFJLENBQUNFLFlBQUwsRUFBbUJBLFlBQVksR0FBR0wsU0FBUyxDQUFDRyxLQUFLLEdBQUcsQ0FBVCxDQUF4QjtBQUNuQixZQUFJLENBQUNFLFlBQUQsSUFBaUIsQ0FBQ0osS0FBSyxDQUFDQyxPQUFOLENBQWNqQyxNQUFkLENBQXRCLEVBQTZDb0MsWUFBWSxHQUFHcEMsTUFBZjtBQUM3QyxZQUFJLENBQUNvQyxZQUFMLEVBQW1CLE9BQU8sSUFBUDtBQUVuQixlQUFPQSxZQUFZLENBQUMzQyxLQUFELENBQW5CO0FBQ0QsT0FURDs7QUFXQSxVQUFNTyxNQUFNLEdBQUcsTUFBS3RCLFdBQUwsQ0FBaUJWLEVBQWpCLEVBQXFCLE1BQUtWLEtBQUwsQ0FBV2tDLFFBQWhDLEVBQTBDLElBQTFDLENBQWY7O0FBQ0EsYUFBT1EsTUFBTSxHQUFHOEIsaUJBQWlCLENBQUM5QixNQUFELENBQXBCLEdBQStCOEIsaUJBQWlCLENBQUN0QyxRQUFELENBQTdEO0FBQ0QsS0FwUmtCOztBQUFBLG9FQTJSSCxVQUFDVSxLQUFELEVBQVFtQyxXQUFSLEVBQWdDO0FBQUEsVUFBeEJBLFdBQXdCO0FBQXhCQSxRQUFBQSxXQUF3QixHQUFWLEtBQVU7QUFBQTs7QUFDOUMsVUFBSWhELElBQUksR0FBR2pELElBQUksRUFBZjtBQUQ4Qyx5QkFJMUMsTUFBS2tCLEtBSnFDO0FBQUEsVUFHNUNTLElBSDRDLGdCQUc1Q0EsSUFINEM7QUFBQSxVQUd0Q3VFLFdBSHNDLGdCQUd0Q0EsV0FIc0M7QUFBQSxVQUd6QmxFLFFBSHlCLGdCQUd6QkEsUUFIeUI7QUFBQSxVQUdmbUUsT0FIZSxnQkFHZkEsT0FIZTtBQUs5QyxVQUFJLENBQUNGLFdBQUwsRUFBa0JoRCxJQUFJLEdBQUdqQixRQUFRLENBQUN1QixLQUFULEVBQVA7QUFDbEIsVUFBSWMsWUFBWSxHQUFHcEIsSUFBSSxDQUFDb0MsTUFBTCxDQUFZdkIsS0FBWixDQUFuQjtBQUNBLFVBQUlxQyxPQUFKLEVBQWE5QixZQUFZLEdBQUdBLFlBQVksQ0FBQytCLE1BQWIsQ0FBb0IsVUFBQW5DLENBQUM7QUFBQSxlQUFJQSxDQUFDLENBQUNFLEdBQUYsQ0FBTWdDLE9BQU4sQ0FBSjtBQUFBLE9BQXJCLENBQWY7O0FBRWIsWUFBS2pGLEtBQUwsQ0FBV0ksT0FBWCxDQUFtQkssSUFBbkIsRUFBeUJ1RSxXQUF6QixFQUFzQzdCLFlBQXRDOztBQUNBLFlBQUtuRCxLQUFMLENBQVdLLGtCQUFYLENBQThCSSxJQUE5QjtBQUNELEtBdFNrQjs7QUFBQSx5RUEyU0UsWUFBTTtBQUFBLFVBQ2pCUyxTQURpQixHQUNILE1BQUtsQixLQURGLENBQ2pCa0IsU0FEaUI7QUFFekIsVUFBTU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxNQUFLSixXQUFMLENBQWlCLE1BQUtiLEtBQUwsQ0FBV1MsWUFBWCxDQUF3QixDQUF4QixDQUFqQixDQUFmO0FBQ0EsVUFBSSxDQUFDUSxJQUFMLEVBQVcsT0FBTyxLQUFQO0FBQ1gsYUFBT0EsSUFBSSxDQUFDTixTQUFELENBQVg7QUFDRCxLQWhUa0I7O0FBQUEscUVBc1RGLFlBQU07QUFBQSwwQkFDVSxNQUFLbEIsS0FEZjtBQUFBLFVBQ2JrQyxRQURhLGlCQUNiQSxRQURhO0FBQUEsVUFDSEQsUUFERyxpQkFDSEEsUUFERztBQUVyQixVQUFNa0QsV0FBVyxHQUFHLE1BQUs1RSxLQUFMLENBQVdTLFlBQVgsQ0FBd0IsQ0FBeEIsQ0FBcEI7QUFDQSxVQUFNdUIsTUFBTSxHQUFHO0FBQ2JDLFFBQUFBLElBQUksRUFBRWpELFlBQVksQ0FBQ0UsU0FETjtBQUVic0MsUUFBQUEsSUFBSSxFQUFFLE1BQUt4QixLQUFMLENBQVdTLFlBQVgsQ0FBd0IsQ0FBeEI7QUFGTyxPQUFmOztBQUlBLFVBQU1vRSxlQUFlLEdBQUcsTUFBS0MsZUFBTCxDQUFxQkYsV0FBckIsQ0FBeEI7O0FBQ0EsVUFBTWhDLFlBQVksR0FBR3BFLE1BQU0sQ0FBQyxDQUFDLE1BQUtxQyxXQUFMLENBQWlCK0QsV0FBakIsQ0FBRCxDQUFELENBQTNCOztBQUNBLFVBQU0vQyxRQUFRLEdBQUcsTUFBS0ssY0FBTCxDQUFvQjBDLFdBQXBCLEVBQWlDakQsUUFBakMsRUFBMkNLLE1BQTNDLENBQWpCOztBQUVBLFlBQUthLGFBQUwsQ0FBbUJELFlBQW5COztBQUNBLFVBQUlsQixRQUFKLEVBQWNBLFFBQVEsQ0FBQ0csUUFBRCxDQUFSOztBQUNkLFlBQUtmLFFBQUwsQ0FBYztBQUNaTCxRQUFBQSxZQUFZLEVBQUUsQ0FBQ29FLGVBQUQ7QUFERixPQUFkO0FBR0QsS0F0VWtCOztBQUFBLG1FQTRVSixVQUFDRSxRQUFELEVBQWM7QUFDM0IsVUFBSUEsUUFBUSxJQUFJLENBQUMsTUFBSy9FLEtBQUwsQ0FBV2dELFlBQVgsQ0FBd0IzQixJQUF4QixDQUE2QixVQUFBMkQsVUFBVTtBQUFBLGVBQUlBLFVBQVUsS0FBS0QsUUFBbkI7QUFBQSxPQUF2QyxDQUFqQixFQUFzRjtBQUNwRixZQUFNRSxlQUFlLEdBQUcsTUFBS2pGLEtBQUwsQ0FBV2dELFlBQVgsQ0FBd0JsQixLQUF4QixFQUF4QixDQURvRixDQUMzQjs7O0FBQ3pEbUQsUUFBQUEsZUFBZSxDQUFDbEQsSUFBaEIsQ0FBcUJnRCxRQUFyQjs7QUFDQSxjQUFLakUsUUFBTCxDQUFjO0FBQUVrQyxVQUFBQSxZQUFZLEVBQUVpQztBQUFoQixTQUFkO0FBQ0Q7QUFDRixLQWxWa0I7O0FBQUEsb0ZBdVZhLFlBQU07QUFDcEMsWUFBS25FLFFBQUwsQ0FBYztBQUFFUyxRQUFBQSxzQkFBc0IsRUFBRTtBQUExQixPQUFkO0FBQ0QsS0F6VmtCOztBQUFBLG1FQThWSixZQUFNO0FBQUEsMEJBQ1ksTUFBSzlCLEtBRGpCO0FBQUEsVUFDWGlDLFFBRFcsaUJBQ1hBLFFBRFc7QUFBQSxVQUNEQyxRQURDLGlCQUNEQSxRQURDO0FBRW5CLFVBQU1pRCxXQUFXLEdBQUcsTUFBSzVFLEtBQUwsQ0FBV1MsWUFBWCxDQUF3QixDQUF4QixDQUFwQjtBQUNBLFVBQU11QixNQUFNLEdBQUc7QUFDYkMsUUFBQUEsSUFBSSxFQUFFakQsWUFBWSxDQUFDSTtBQUROLE9BQWY7O0FBR0EsVUFBTXlGLGVBQWUsR0FBRyxNQUFLQyxlQUFMLENBQXFCRixXQUFyQixDQUF4Qjs7QUFDQSxVQUFNL0MsUUFBUSxHQUFHLE1BQUtLLGNBQUwsQ0FBb0IwQyxXQUFwQixFQUFpQ2pELFFBQWpDLEVBQTJDSyxNQUEzQyxDQUFqQjs7QUFDQSxVQUFJTixRQUFKLEVBQWNBLFFBQVEsQ0FBQ0csUUFBRCxDQUFSOztBQUNkLFlBQUtmLFFBQUwsQ0FBYztBQUNaTCxRQUFBQSxZQUFZLEVBQUUsQ0FBQ29FLGVBQUQsQ0FERjtBQUVadEQsUUFBQUEsc0JBQXNCLEVBQUU7QUFGWixPQUFkO0FBSUQsS0EzV2tCOztBQUFBLG1FQWdYSixZQUFNO0FBQ25CLFlBQUtULFFBQUwsQ0FBYztBQUFFTCxRQUFBQSxZQUFZLEVBQUU7QUFBaEIsT0FBZDtBQUNELEtBbFhrQjs7QUFBQSx3RUFvWEMsVUFBQXlFLFlBQVk7QUFBQSxhQUM5QixvQkFBQyxVQUFELGVBQ00sTUFBS3pGLEtBRFg7QUFFRSxRQUFBLGFBQWEsRUFBRSxNQUFLMEYsYUFGdEI7QUFHRSxRQUFBLGFBQWEsRUFBRSxNQUFLQyxhQUh0QjtBQUlFLFFBQUEsYUFBYSxFQUFFLE1BQUtDLGFBSnRCO0FBS0UsUUFBQSxnQkFBZ0IsRUFBRSxNQUFLeEUsV0FBTCxDQUFpQixNQUFLYixLQUFMLENBQVdTLFlBQVgsQ0FBd0IsQ0FBeEIsQ0FBakIsQ0FMcEI7QUFNRSxRQUFBLE1BQU0sRUFBRTFCLDJCQU5WO0FBT0UsUUFBQSxZQUFZLEVBQUVtRztBQVBoQixTQUQ4QjtBQUFBLEtBcFhiOztBQUVqQixVQUFLbEYsS0FBTCxHQUFhO0FBQ1hTLE1BQUFBLFlBQVksRUFBRSxFQURIO0FBRVh1QyxNQUFBQSxZQUFZLEVBQUUsRUFGSDtBQUdYekIsTUFBQUEsc0JBQXNCLEVBQUU7QUFIYixLQUFiO0FBRmlCO0FBT2xCOzs7O1NBRUQrRCxpQixHQUFBLDZCQUFvQjtBQUNsQixRQUFJLEtBQUs3RixLQUFMLENBQVc4RixtQkFBWCxDQUErQmhDLE1BQS9CLEdBQXdDLENBQTVDLEVBQStDO0FBQzdDLFdBQUtpQyxRQUFMLENBQWMsS0FBSy9GLEtBQUwsQ0FBVzhGLG1CQUF6QjtBQUNEO0FBQ0Y7QUFFRDs7Ozs7O1NBaVhBRSxNLEdBQUEsa0JBQVM7QUFBQSx3QkFXSCxLQUFLaEcsS0FYRjtBQUFBLFFBRUwyRCxRQUZLLGlCQUVMQSxRQUZLO0FBQUEsUUFHTHNDLFlBSEssaUJBR0xBLFlBSEs7QUFBQSxRQUlMOUQsS0FKSyxpQkFJTEEsS0FKSztBQUFBLFFBS0xELFFBTEssaUJBS0xBLFFBTEs7QUFBQSxRQU1MekIsSUFOSyxpQkFNTEEsSUFOSztBQUFBLFFBT0x1RSxXQVBLLGlCQU9MQSxXQVBLO0FBQUEsUUFRTGtCLFNBUkssaUJBUUxBLFNBUks7QUFBQSxRQVNMVCxZQVRLLGlCQVNMQSxZQVRLO0FBQUEsUUFVTG5FLFFBVkssaUJBVUxBLFFBVks7QUFhUCxRQUFNNkUsVUFBVSxHQUFHQyxNQUFNLENBQUNDLE1BQVAsQ0FBYyxFQUFkLEVBQWtCNUYsSUFBbEIsRUFBd0I7QUFBRTZGLE1BQUFBLHVCQUF1QixFQUFFO0FBQTNCLEtBQXhCLENBQW5CO0FBQ0EsUUFBTUMsa0JBQWtCLEdBQUdILE1BQU0sQ0FBQ0MsTUFBUCxDQUFjLEVBQWQsRUFBa0JoSCxtQkFBbEIsRUFBdUNvRyxZQUF2QyxDQUEzQjtBQUVBLFdBQ0Usb0JBQUMsS0FBRCxDQUFPLFFBQVAsUUFDRSxvQkFBQyxTQUFEO0FBQVcsTUFBQSxTQUFTLEVBQUVTO0FBQXRCLE9BQ0Usb0JBQUMsYUFBRCxRQUNFLG9CQUFDLGFBQUQ7QUFDRSxNQUFBLFFBQVEsRUFBRWhFLFFBRFo7QUFFRSxNQUFBLGFBQWEsRUFBRUMsS0FGakI7QUFHRSxNQUFBLGVBQWUsRUFBRXdCLFFBSG5CO0FBSUUsTUFBQSxtQkFBbUIsRUFBRXNDLFlBSnZCO0FBS0UsTUFBQSxrQkFBa0IsRUFBRTNFLFFBTHRCO0FBTUUsTUFBQSxRQUFRLEVBQUUsS0FBS2tGLGdCQU5qQjtBQU9FLE1BQUEsUUFBUSxFQUFFLEtBQUtULFFBUGpCO0FBUUUsTUFBQSxTQUFTLEVBQUUsS0FSYjtBQVNFLE1BQUEsWUFBWSxFQUFFLEtBQUt4RixLQUFMLENBQVdTLFlBVDNCO0FBVUUsTUFBQSxZQUFZLEVBQUUsS0FBS1QsS0FBTCxDQUFXZ0QsWUFWM0I7QUFXRSxNQUFBLGtCQUFrQixFQUFFLEtBQUtrRCxZQVgzQjtBQVlFLE1BQUEsS0FBSyxFQUFFRixrQkFBa0IsQ0FBQ0csU0FaNUI7QUFhRSxNQUFBLFVBQVUsTUFiWjtBQWNFLE1BQUEsa0JBQWtCLE1BZHBCO0FBZUUsTUFBQSxhQUFhLE1BZmY7QUFnQkUsTUFBQSxXQUFXLEVBQUUsS0FBS0MsaUJBQUwsQ0FBdUJKLGtCQUF2QixDQWhCZjtBQWlCRSxNQUFBLDBCQUEwQjtBQWpCNUIsTUFERixDQURGLEVBc0JFLG9CQUFDLGFBQUQsZUFDTSxLQUFLdkcsS0FEWDtBQUVFLE1BQUEsZ0JBQWdCLEVBQUUsS0FBS29CLFdBQUwsQ0FBaUIsS0FBS2IsS0FBTCxDQUFXUyxZQUFYLENBQXdCLENBQXhCLENBQWpCLENBRnBCO0FBR0UsTUFBQSxpQkFBaUIsRUFBRSxLQUFLNEYsaUJBSDFCO0FBSUUsTUFBQSxpQkFBaUIsRUFBRSxLQUFLQztBQUoxQixPQXRCRixFQTRCRSxvQkFBQyxJQUFEO0FBQ0UsTUFBQSxJQUFJLEVBQUVWLFVBRFI7QUFFRSxNQUFBLE9BQU8sRUFBRW5CLFdBRlg7QUFHRSxNQUFBLFdBQVcsTUFIYjtBQUlFLE1BQUEsU0FBUyxNQUpYO0FBS0UsTUFBQSx1QkFBdUIsTUFMekI7QUFNRSxNQUFBLFVBQVUsRUFBRSxvQkFBQyxTQUFELENBQVcsUUFBWCxRQUFxQnVCLGtCQUFrQixDQUFDTyxTQUF4QztBQU5kLE1BNUJGLENBREYsRUFzQ0csS0FBS3ZHLEtBQUwsQ0FBV3VCLHNCQUFYLElBQ0Msb0JBQUMsYUFBRDtBQUNFLE1BQUEsWUFBWSxFQUFFeUUsa0JBQWtCLENBQUNRLG1CQURuQztBQUVFLE1BQUEsZUFBZSxFQUFFLEtBQUtDLFlBRnhCO0FBR0UsTUFBQSxjQUFjLEVBQUUsS0FBS0M7QUFIdkIsTUF2Q0osQ0FERjtBQWdERCxHOzs7RUE5ZWdEckksS0FBSyxDQUFDc0ksYSw0Q0EyQmpDO0FBQ3BCL0UsRUFBQUEsS0FBSyxFQUFFLElBRGE7QUFFcEJ3QixFQUFBQSxRQUFRLEVBQUUsTUFGVTtBQUdwQnJDLEVBQUFBLFFBQVEsRUFBRSxVQUhVO0FBSXBCSixFQUFBQSxTQUFTLEVBQUVpRyxTQUpTO0FBS3BCbEIsRUFBQUEsWUFBWSxFQUFFa0IsU0FMTTtBQU1wQmxDLEVBQUFBLE9BQU8sRUFBRWtDLFNBTlc7QUFPcEJqRixFQUFBQSxRQUFRLEVBQUUsRUFQVTtBQVFwQmdFLEVBQUFBLFNBQVMsRUFBRSxFQVJTO0FBU3BCVCxFQUFBQSxZQUFZLEVBQUVwRyxtQkFUTTtBQVVwQnFCLEVBQUFBLEVBQUUsRUFBRSxnQkFWZ0I7QUFXcEJPLEVBQUFBLFFBQVEsRUFBRWtHLFNBWFU7QUFZcEJsRixFQUFBQSxRQUFRLEVBQUVrRixTQVpVO0FBYXBCNUYsRUFBQUEsZUFBZSxFQUFFNEYsU0FiRztBQWNwQkMsRUFBQUEsZ0JBQWdCLEVBQUUsSUFkRTtBQWVwQnRCLEVBQUFBLG1CQUFtQixFQUFFLEVBZkQ7QUFnQnBCdUIsRUFBQUEsVUFBVSxFQUFFO0FBaEJRLEM7U0EzQkh0RyxxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUcmVlQ29tcG9uZW50IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LXRyZWUtY29tcG9uZW50JztcbmltcG9ydCB7IFByaW1pdGl2ZSB9IGZyb20gJ0BvcHVzY2FwaXRhL29jLWNtLWNvbW1vbi1sYXlvdXRzJztcbmltcG9ydCB7XG4gIERhdGFncmlkLCBncmlkU2hhcGUsIGdyaWRDb2x1bW5TaGFwZSwgRGF0YWdyaWRBY3Rpb25zLFxufSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1ncmlkJztcbmltcG9ydCBDb25maXJtRGlhbG9nIGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWNvbmZpcm1hdGlvbi1kaWFsb2cnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHsgTGlzdCwgZnJvbUpTIH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCBJbW11dGFibGVQcm9wVHlwZXMgZnJvbSAncmVhY3QtaW1tdXRhYmxlLXByb3B0eXBlcyc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuLy8gQXBwIGltcG9ydHNcbmltcG9ydCBDb250cm9sQmFyIGZyb20gJy4vaGllcmFyY2h5LXRyZWUtc2VsZWN0b3ItY29udHJvbC1iYXIuY29tcG9uZW50JztcbmltcG9ydCBBcnJvd0NvbnRyb2xzIGZyb20gJy4vaGllcmFyY2h5LXRyZWUtc2VsZWN0b3ItYXJyb3ctY29udHJvbHMuY29tcG9uZW50JztcbmltcG9ydCB7IGRlZmF1bHRUcmFuc2xhdGlvbnMgfSBmcm9tICcuL2hpZXJhcmNoeS10cmVlLnV0aWxzJztcblxuY29uc3QgQUNUSU9OX0JBUl9DT05UQUlORVJfSEVJR0hUID0gJzU0cHgnO1xuY29uc3QgVFJFRV9BQ1RJT05TID0ge1xuICBBRERfQ0hJTERSRU46ICdBRERfQ0hJTERSRU4nLFxuICBNT1ZFX0xFQUY6ICdNT1ZFX0xFQUYnLFxuICBSRU5BTUVfUEFSRU5UOiAnUkVOQU1FX1BBUkVOVCcsXG4gIERFTEVURV9QQVJFTlQ6ICdERUxFVEVfUEFSRU5UJyxcbn07XG5cbmNvbnN0IEdyaWQgPSBzdHlsZWQoRGF0YWdyaWQpYFxuICBoZWlnaHQ6IDEwMCU7XG4gICYmJiB7XG4gICAgcGFkZGluZzogMDtcbiAgfVxuYDtcblxuY29uc3QgQ29udGFpbmVyID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogZmxleDtcbiAgbWluLWhlaWdodDogMzAwcHg7XG4gID4gZGl2IHtcbiAgICB3aWR0aDogNTAlO1xuICAgIGZsZXg6IDEgMSAxMDAlO1xuICB9XG5gO1xuXG5jb25zdCBUcmVlQ29udGFpbmVyID0gc3R5bGVkLmRpdmBcbiAgaGVpZ2h0OiAxMDAlO1xuICAub2Mtc2Nyb2xsYmFyLWNvbnRhaW5lciB7XG4gICAgaGVpZ2h0OiBjYWxjKDEwMCUgLSAke0FDVElPTl9CQVJfQ09OVEFJTkVSX0hFSUdIVH0pO1xuICAgIHBhZGRpbmc6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuZ3V0dGVyV2lkdGh9O1xuICB9XG4gIC50cmVlLWhlYWRlciB7XG4gICAgbWluLWhlaWdodDogJHtBQ1RJT05fQkFSX0NPTlRBSU5FUl9IRUlHSFR9O1xuICAgIC5vcmRlcmluZy1hcnJvd3Mge1xuICAgICAgZm9udC13ZWlnaHQ6IDI0cHg7XG4gICAgfVxuICB9XG4gIC5vYy1yZWFjdC10cmVlIHtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgLnJjLXRyZWUtaWNvbkVsZS5yYy10cmVlLWljb25fX2N1c3RvbWl6ZSB7XG4gICAgICBkaXNwbGF5OiBub25lO1xuICAgIH1cbiAgfVxuYDtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0ge1xuICBzZXREYXRhOiBEYXRhZ3JpZEFjdGlvbnMuc2V0RGF0YSxcbiAgY2xlYXJTZWxlY3RlZEl0ZW1zOiBEYXRhZ3JpZEFjdGlvbnMuY2xlYXJTZWxlY3RlZEl0ZW1zLFxufTtcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlLCBwcm9wcykgPT4ge1xuICBjb25zdCBncmlkSWQgPSBwcm9wcy5ncmlkLmlkO1xuICByZXR1cm4ge1xuICAgIHNlbGVjdGVkR3JpZEl0ZW1zOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbZ3JpZElkLCAnc2VsZWN0ZWRJdGVtcyddLCBMaXN0KCkpLFxuICAgIGdyaWREYXRhOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbZ3JpZElkLCAnYWxsRGF0YSddLCBMaXN0KCkpLFxuICB9O1xufTtcblxuQGNvbm5lY3QoXG4gIG1hcFN0YXRlVG9Qcm9wcyxcbiAgbWFwRGlzcGF0Y2hUb1Byb3BzLFxuKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGllcmFyY2h5VHJlZVNlbGVjdG9yIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgaWRLZXk6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdmFsdWVLZXk6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2hpbGRLZXk6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbG9ja2VkS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGxlYWZWYWx1ZUtleTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBzb3J0S2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHRyZWVEYXRhOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc2hhcGUoe30pKSxcbiAgICBncmlkOiBncmlkU2hhcGUuaXNSZXF1aXJlZCxcbiAgICBncmlkQ29sdW1uczogUHJvcFR5cGVzLmFycmF5T2YoZ3JpZENvbHVtblNoYXBlKS5pc1JlcXVpcmVkLFxuICAgIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBzZXREYXRhOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGNsZWFyU2VsZWN0ZWRJdGVtczogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBzZWxlY3RlZEdyaWRJdGVtczogSW1tdXRhYmxlUHJvcFR5cGVzLmxpc3QuaXNSZXF1aXJlZCxcbiAgICBncmlkRGF0YTogSW1tdXRhYmxlUHJvcFR5cGVzLmxpc3QuaXNSZXF1aXJlZCxcbiAgICB0cmFuc2xhdGlvbnM6IFByb3BUeXBlcy5zaGFwZSh7fSksXG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGVmYXVsdEV4cGFuZEFsbDogUHJvcFR5cGVzLmJvb2wsXG4gICAgZGVmYXVsdEV4cGFuZGVkS2V5czogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZyksXG4gICAgc2luZ2xlUm9vdDogUHJvcFR5cGVzLmJvb2wsXG4gICAgLy8gQ2FsbGJhY2tzXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblByZXZlbnREZWxldGU6IFByb3BUeXBlcy5mdW5jLFxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgaWRLZXk6ICdpZCcsXG4gICAgdmFsdWVLZXk6ICduYW1lJyxcbiAgICBjaGlsZEtleTogJ2NoaWxkcmVuJyxcbiAgICBsb2NrZWRLZXk6IHVuZGVmaW5lZCxcbiAgICBsZWFmVmFsdWVLZXk6IHVuZGVmaW5lZCxcbiAgICBzb3J0S2V5OiB1bmRlZmluZWQsXG4gICAgdHJlZURhdGE6IFtdLFxuICAgIGNsYXNzTmFtZTogJycsXG4gICAgdHJhbnNsYXRpb25zOiBkZWZhdWx0VHJhbnNsYXRpb25zLFxuICAgIGlkOiAnaGllcmFyY2h5LXRyZWUnLFxuICAgIG9uU2VsZWN0OiB1bmRlZmluZWQsXG4gICAgb25DaGFuZ2U6IHVuZGVmaW5lZCxcbiAgICBvblByZXZlbnREZWxldGU6IHVuZGVmaW5lZCxcbiAgICBkZWZhdWx0RXhwYW5kQWxsOiB0cnVlLFxuICAgIGRlZmF1bHRFeHBhbmRlZEtleXM6IFtdLFxuICAgIHNpbmdsZVJvb3Q6IHRydWUsXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHNlbGVjdGVkS2V5czogW10sXG4gICAgICBleHBhbmRlZEtleXM6IFtdLFxuICAgICAgc2hvd0RlbGV0ZUNvbmZpcm1hdGlvbjogZmFsc2UsXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGlmICh0aGlzLnByb3BzLmRlZmF1bHRFeHBhbmRlZEtleXMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5vbkV4cGFuZCh0aGlzLnByb3BzLmRlZmF1bHRFeHBhbmRlZEtleXMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3RzIGEgdHJlZSBpdGVtXG4gICAqIEBwYXJhbSBzZWxlY3RlZEtleXMgKGFycmF5KVxuICAgKi9cbiAgb25UcmVlSXRlbVNlbGVjdCA9IChzZWxlY3RlZEtleXMpID0+IHtcbiAgICBjb25zdCB7IG9uU2VsZWN0LCBsb2NrZWRLZXkgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgc2VsZWN0ZWRJdGVtID0gdGhpcy5nZXRUcmVlSXRlbShzZWxlY3RlZEtleXNbMF0pO1xuICAgIGlmIChsb2NrZWRLZXkgJiYgc2VsZWN0ZWRJdGVtICYmIHNlbGVjdGVkSXRlbVtsb2NrZWRLZXldKSByZXR1cm47XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkS2V5cyB9LCAoKSA9PiB7XG4gICAgICBpZiAob25TZWxlY3QpIG9uU2VsZWN0KHNlbGVjdGVkS2V5cyk7XG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIERpc3BsYXlzIGEgY29uZmlybWF0aW9uIGRpYWxvZ1xuICAgKi9cbiAgb25EZWxldGVDbGljayA9ICgpID0+IHtcbiAgICBjb25zdCB7IGNoaWxkS2V5LCBsb2NrZWRLZXksIG9uUHJldmVudERlbGV0ZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBpdGVtID0gdGhpcy5nZXRUcmVlSXRlbSh0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXSk7XG4gICAgLy8gSWYgaXRlbSBpcyBub3QgYSBwYXJlbnQsIHdlIHdvbid0IHNob3cgdGhlIGRlbGV0ZSBjb25maXJtYXRpb24gZGlhbG9nXG4gICAgaWYgKCFpdGVtW2NoaWxkS2V5XSkge1xuICAgICAgdGhpcy5tb3ZlSXRlbVRvR3JpZCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChsb2NrZWRLZXkpIHtcbiAgICAgIC8vIElmIGl0IGlzIGEgcGFyZW50LCB3ZSB3YW50IHRvIGNoZWNrIHRoYXQgaXQgZG9lc24ndCBjb250YWluIGFueSBsb2NrZWQgaXRlbXNcbiAgICAgIGNvbnN0IGxlYWZzID0gdGhpcy5nZXRBbGxMZWFmcyhpdGVtW2NoaWxkS2V5XSk7XG4gICAgICBpZiAobGVhZnMuZmluZChsZWFmID0+IGxlYWZbbG9ja2VkS2V5XSkgJiYgb25QcmV2ZW50RGVsZXRlKSB7XG4gICAgICAgIG9uUHJldmVudERlbGV0ZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNob3dEZWxldGVDb25maXJtYXRpb246IHRydWUgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBuZXcgbm9kZSB0byB0aGUgcm9vdCBvZiB0aGUgdHJlZSwgb3IgdW5kZXIgYSBzZWxlY3RlZCB0cmVlIG5vZGUgdXNpbmdcbiAgICogQUREX0NISUxEUkVOIGFjdGlvblxuICAgKiBAcGFyYW0gZGF0YSAtIGRhdGEgdG8gYmUgYWRkZWRcbiAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAqL1xuICBvbkFkZE5ld0NsaWNrID0gKGRhdGEsIGNhbGxiYWNrKSA9PiB7XG4gICAgY29uc3QgeyBvbkNoYW5nZSwgdHJlZURhdGEsIGlkS2V5IH0gPSB0aGlzLnByb3BzO1xuICAgIGxldCBuZXdJdGVtcyA9IHRyZWVEYXRhLnNsaWNlKCk7XG5cbiAgICAvLyBJZiBubyB0cmVlIG5vZGUgaXMgc2VsZWN0ZWQsIHdlJ2xsIHBsYWNlIHRoZSBuZXcgaXRlbSB0byB0aGUgcm9vdFxuICAgIC8vIG9mIHRoZSB0cmVlXG4gICAgaWYgKCF0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXSkge1xuICAgICAgbmV3SXRlbXMucHVzaChkYXRhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgYWN0aW9uID0ge1xuICAgICAgICB0eXBlOiBUUkVFX0FDVElPTlMuQUREX0NISUxEUkVOLFxuICAgICAgICBkYXRhLFxuICAgICAgfTtcbiAgICAgIG5ld0l0ZW1zID0gdGhpcy5nZXRVcGRhdGVkVHJlZSh0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXSwgdHJlZURhdGEsIGFjdGlvbik7XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZEtleXM6IFtkYXRhW2lkS2V5XV0gfSwgKCkgPT4ge1xuICAgICAgLy8gSWYgdGhlIHBhcmVudCBpcyBub3QgeWV0IGV4cGFuZGVkLCB3ZSB3aWxsIGV4cGFuZCBpdCBub3dcbiAgICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuZ2V0VHJlZUl0ZW0oZGF0YVtpZEtleV0sIHRyZWVEYXRhLCB0cnVlKSB8fCB7fTtcbiAgICAgIHRoaXMuZXhwYW5kUGFyZW50KHBhcmVudFtpZEtleV0pO1xuXG4gICAgICBpZiAob25DaGFuZ2UpIG9uQ2hhbmdlKG5ld0l0ZW1zKTtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfSk7XG4gIH07XG5cbiAgb25Nb3ZlVG9HcmlkQ2xpY2sgPSAoKSA9PiB7XG4gICAgdGhpcy5tb3ZlSXRlbVRvR3JpZCgpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDYWxscyBvbkNoYW5nZSBjYWxsYmFjayB3aGVuZXZlciB1c2VyIHJlb3JkZXJzIHRyZWUgaXRlbXMgdXNpbmcgb3JkZXJpbmcgYXJyb3dzXG4gICAqIEBwYXJhbSBpdGVtc1xuICAgKi9cbiAgb25PcmRlckNsaWNrID0gKGl0ZW1zKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5vbkNoYW5nZShpdGVtcyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEFkZHMgc2VsZWN0ZWQgZ3JpZCBpdGVtcyB0byB0aGUgY2hvc2VuIHRyZWUgbm9kZSB1c2luZyBBRERfQ0hJTERSRU4gYWN0aW9uXG4gICAqL1xuICBvbk1vdmVUb1RyZWVDbGljayA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBvbkNoYW5nZSwgc2VsZWN0ZWRHcmlkSXRlbXMsIGdyaWREYXRhLCB0cmVlRGF0YSwgaWRLZXksXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgc2VsZWN0ZWRJZCA9IHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdO1xuXG4gICAgY29uc3QgYWN0aW9uID0ge1xuICAgICAgdHlwZTogVFJFRV9BQ1RJT05TLkFERF9DSElMRFJFTixcbiAgICAgIGRhdGE6IGdyaWREYXRhLmZpbHRlcihpID0+IHNlbGVjdGVkR3JpZEl0ZW1zLmluY2x1ZGVzKGkuZ2V0KGlkS2V5KSkpLnRvSlMoKSxcbiAgICB9O1xuICAgIGNvbnN0IG5ld0l0ZW1zID0gdGhpcy5nZXRVcGRhdGVkVHJlZShzZWxlY3RlZElkLCB0cmVlRGF0YSwgYWN0aW9uKTtcbiAgICBjb25zdCBuZXdHcmlkSXRlbXMgPSBncmlkRGF0YS5maWx0ZXIoaXRlbSA9PiAhc2VsZWN0ZWRHcmlkSXRlbXMuaW5jbHVkZXMoaXRlbS5nZXQoaWRLZXkpKSk7XG5cbiAgICB0aGlzLmV4cGFuZFBhcmVudChzZWxlY3RlZElkLCB0cnVlKTtcbiAgICB0aGlzLnNldERhdGFUb0dyaWQobmV3R3JpZEl0ZW1zLCB0cnVlKTtcbiAgICBpZiAob25DaGFuZ2UpIG9uQ2hhbmdlKG5ld0l0ZW1zKTtcbiAgfTtcblxuICAvKipcbiAgICogUmVuYW1lcyB0aGUgY2hvc2VuIHRyZWUgbm9kZSB1c2luZyBhIFJFTkFNRV9QQVJFTlQgYWN0aW9uXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKi9cbiAgb25JbnB1dENoYW5nZSA9ICh2YWx1ZSkgPT4ge1xuICAgIGNvbnN0IHsgdHJlZURhdGEsIG9uQ2hhbmdlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGFjdGlvbiA9IHtcbiAgICAgIHR5cGU6IFRSRUVfQUNUSU9OUy5SRU5BTUVfUEFSRU5ULFxuICAgICAgZGF0YTogdmFsdWUsXG4gICAgfTtcbiAgICBjb25zdCBuZXdJdGVtcyA9IHRoaXMuZ2V0VXBkYXRlZFRyZWUodGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF0sIHRyZWVEYXRhLCBhY3Rpb24pO1xuICAgIGlmIChvbkNoYW5nZSkgb25DaGFuZ2UobmV3SXRlbXMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBGaXJlZCBvbiBleHBhbmRcbiAgICogQHBhcmFtIGlkc1xuICAgKi9cbiAgb25FeHBhbmQgPSAoaWRzKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBleHBhbmRlZEtleXM6IGlkcyxcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyB1cGRhdGVkIHRyZWUgaXRlbXMuXG4gICAqIEBwYXJhbSBpZCAtIHRhcmdldCBpdGVtXG4gICAqIEBwYXJhbSBhcnJheSAtIGFycmF5IHdoZXJlIHRhcmdldCBpdGVtIGlzIGJlaW5nIHNlYXJjaGVkXG4gICAqIEBwYXJhbSBhY3Rpb24gLSBhY3Rpb24gdG8gYmUgcGVyZm9ybWVkIHt0eXBlLCBkYXRhfVxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIGdldFVwZGF0ZWRUcmVlID0gKGlkLCBhcnJheSA9IHRoaXMucHJvcHMudHJlZURhdGEsIGFjdGlvbikgPT4ge1xuICAgIGlmICh0aGlzLmlzU2VsZWN0ZWREaXNhYmxlZCgpKSByZXR1cm4gYXJyYXk7XG5cbiAgICBsZXQgZm91bmQgPSBmYWxzZTtcbiAgICBjb25zdCB7IGlkS2V5LCBjaGlsZEtleSwgdmFsdWVLZXkgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgbmV3SXRlbXMgPSBhcnJheS5zbGljZSgpO1xuICAgIGNvbnN0IHJlbW92ZUFjdGlvbnMgPSBbVFJFRV9BQ1RJT05TLk1PVkVfTEVBRiwgVFJFRV9BQ1RJT05TLkRFTEVURV9QQVJFTlRdO1xuXG4gICAgLy8gSWYgZGVsZXRlZCBwYXJlbnQgaXRlbSBpcyBpbiB0aGUgcm9vdCBub2RlXG4gICAgaWYgKGFjdGlvbi50eXBlID09PSBUUkVFX0FDVElPTlMuREVMRVRFX1BBUkVOVCkge1xuICAgICAgY29uc3Qgcm9vdEl0ZW0gPSBhcnJheS5maW5kKGl0ZW0gPT4gaXRlbVtpZEtleV0gPT09IGlkKTtcbiAgICAgIGlmIChyb290SXRlbSkge1xuICAgICAgICBpZiAocm9vdEl0ZW1bY2hpbGRLZXldLmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuc2V0RGF0YVRvR3JpZChmcm9tSlModGhpcy5nZXRBbGxMZWFmcyhyb290SXRlbVtjaGlsZEtleV0pKSk7XG4gICAgICAgICAgdGhpcy5kZXNlbGVjdEl0ZW0oKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3SXRlbXMuZmlsdGVyKGl0ZW0gPT4gaXRlbVtpZEtleV0gIT09IGlkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5ld0l0ZW1zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBpdGVtID0gbmV3SXRlbXNbaV07XG4gICAgICBpZiAocmVtb3ZlQWN0aW9ucy5pbmNsdWRlcyhhY3Rpb24udHlwZSkgJiYgaXRlbVtjaGlsZEtleV0gJiYgIWZvdW5kKSB7XG4gICAgICAgIGZvdW5kID0gISFpdGVtW2NoaWxkS2V5XS5maW5kKGNoaWxkID0+IGNoaWxkW2lkS2V5XSA9PT0gaWQpO1xuICAgICAgICBpZiAoZm91bmQpIHtcbiAgICAgICAgICAvLyBXaGVuIHJlbW92aW5nIGFuIGl0ZW0gd2UgbXVzdCBmaXJzdCBmaW5kIGl0cyBwYXJlbnQgYW5kIGFsdGVyIGl0cyBjaGlsZHJlbiBhcnJheVxuICAgICAgICAgIGlmIChhY3Rpb24udHlwZSA9PT0gVFJFRV9BQ1RJT05TLk1PVkVfTEVBRikge1xuICAgICAgICAgICAgaXRlbVtjaGlsZEtleV0gPSBpdGVtW2NoaWxkS2V5XS5maWx0ZXIoY2hpbGQgPT4gY2hpbGRbaWRLZXldICE9PSBpZCk7XG4gICAgICAgICAgICB0aGlzLmRlc2VsZWN0SXRlbSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYWN0aW9uLnR5cGUgPT09IFRSRUVfQUNUSU9OUy5ERUxFVEVfUEFSRU5UKSB7XG4gICAgICAgICAgICAvLyB3ZSBtdXN0IGZpcnN0IGZpbHRlciB0aGUgY2hpbGRyZW4sIHNvIHRoYXQgd2Ugd29uJ3QgZ2V0IGxlYWZzIGZyb21cbiAgICAgICAgICAgIC8vIG90aGVyIGNoaWxkIGJyYW5jaGVzXG4gICAgICAgICAgICBjb25zdCBmaWx0ZXJlZENoaWxkcmVuID0gaXRlbVtjaGlsZEtleV0uZmlsdGVyKGNoaWxkSXRlbSA9PiBjaGlsZEl0ZW1baWRLZXldID09PSBpZCk7XG4gICAgICAgICAgICB0aGlzLnNldERhdGFUb0dyaWQoZnJvbUpTKHRoaXMuZ2V0QWxsTGVhZnMoZmlsdGVyZWRDaGlsZHJlbikpKTtcbiAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RJdGVtKCk7XG4gICAgICAgICAgICBpdGVtW2NoaWxkS2V5XSA9IGl0ZW1bY2hpbGRLZXldLmZpbHRlcihjaGlsZEl0ZW0gPT4gY2hpbGRJdGVtW2lkS2V5XSAhPT0gaWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVtpZEtleV0gPT09IGlkICYmICFmb3VuZCkge1xuICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgICBjYXNlIFRSRUVfQUNUSU9OUy5BRERfQ0hJTERSRU46XG4gICAgICAgICAgICBpdGVtW2NoaWxkS2V5XSA9IChpdGVtW2NoaWxkS2V5XSB8fCBbXSkuY29uY2F0KGFjdGlvbi5kYXRhKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgVFJFRV9BQ1RJT05TLlJFTkFNRV9QQVJFTlQ6XG4gICAgICAgICAgICBpdGVtW3ZhbHVlS2V5XSA9IGFjdGlvbi5kYXRhO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FjdGlvbiB0eXBlIGlzIHVuZGVmaW5lZCcpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bY2hpbGRLZXldICYmICFmb3VuZCkgZm91bmQgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKGlkLCBpdGVtW2NoaWxkS2V5XSwgYWN0aW9uKTtcbiAgICB9XG5cbiAgICBpZiAoIWZvdW5kKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIG5ld0l0ZW1zO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHJlY3Vyc2l2ZWx5IGFsbCBsZWFmIGl0ZW1zIGZyb20gYSBnaXZlbiBhcnJheVxuICAgKiBAcGFyYW0gYXJyYXlcbiAgICogQHBhcmFtIGFscmVhZHlGb3VuZCAodXNlZCByZWN1cnNpdmVseSlcbiAgICovXG4gIGdldEFsbExlYWZzID0gKGFycmF5LCBhbHJlYWR5Rm91bmQgPSBbXSkgPT4ge1xuICAgIGNvbnN0IHsgY2hpbGRLZXkgfSA9IHRoaXMucHJvcHM7XG4gICAgbGV0IGxlYWZzID0gYWxyZWFkeUZvdW5kO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3QgaXRlbSA9IGFycmF5W2ldO1xuICAgICAgaWYgKGl0ZW1bY2hpbGRLZXldKSB7XG4gICAgICAgIGxlYWZzID0gdGhpcy5nZXRBbGxMZWFmcyhpdGVtW2NoaWxkS2V5XSwgYWxyZWFkeUZvdW5kKTtcbiAgICAgIH1cbiAgICAgIGlmICghaXRlbVtjaGlsZEtleV0pIGxlYWZzLnB1c2goaXRlbSk7XG4gICAgfVxuICAgIHJldHVybiBsZWFmcztcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyBhIHRyZWUgaXRlbSBieSBJRFxuICAgKiBAcGFyYW0gaWRcbiAgICogQHBhcmFtIGFycmF5XG4gICAqIEBwYXJhbSByZXR1cm5QYXJlbnQgLSByZXR1cm4gaXRlbSdzIHBhcmVudCBpbnN0ZWFkIG9mIHRoZSBpdGVtXG4gICAqIEBwYXJhbSBwYXJlbnQgLSBwYXJlbnQgaXRlbSAodXNlZCByZWN1cnNpdmVseSlcbiAgICogQHJldHVybnMge3t9fVxuICAgKi9cbiAgZ2V0VHJlZUl0ZW0gPSAoaWQsIGFycmF5ID0gdGhpcy5wcm9wcy50cmVlRGF0YSwgcmV0dXJuUGFyZW50ID0gZmFsc2UsIHBhcmVudCA9IG51bGwpID0+IHtcbiAgICBjb25zdCB7IGNoaWxkS2V5LCBpZEtleSB9ID0gdGhpcy5wcm9wcztcbiAgICBsZXQgZm91bmQgPSBhcnJheS5maW5kKGl0ZW0gPT4gaXRlbVtpZEtleV0gPT09IGlkKTtcblxuICAgIGlmIChmb3VuZCAmJiByZXR1cm5QYXJlbnQpIGZvdW5kID0gcGFyZW50O1xuXG4gICAgaWYgKCFmb3VuZCkge1xuICAgICAgYXJyYXkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBpZiAoaXRlbVtjaGlsZEtleV0gJiYgIWZvdW5kKSB7XG4gICAgICAgICAgZm91bmQgPSB0aGlzLmdldFRyZWVJdGVtKGlkLCBpdGVtW2NoaWxkS2V5XSwgcmV0dXJuUGFyZW50LCBpdGVtKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBmb3VuZDtcbiAgfTtcblxuICAvKipcbiAgICogR2V0IGFkamFjZW50IGl0ZW0gKGlkKSBpbiBwYXJlbnQgYXJyYXkuIFVzZWQgd2hlbiBtb3ZpbmcgaXRlbXMgZnJvbSB0cmVlXG4gICAqIHRvIGdyaWQvZGVsZXRpbmcgYW4gaXRlbVxuICAgKiBAcGFyYW0gaWRcbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBnZXRBZGphY2VudEl0ZW0gPSAoaWQpID0+IHtcbiAgICBpZiAoIWlkKSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCB7IGNoaWxkS2V5LCBpZEtleSwgdHJlZURhdGEgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBnZXRBZGphY2VudEl0ZW1JZCA9IChwYXJlbnQpID0+IHtcbiAgICAgIGNvbnN0IHBhcmVudEFyciA9IEFycmF5LmlzQXJyYXkocGFyZW50KSA/IHBhcmVudCA6IHBhcmVudFtjaGlsZEtleV07XG4gICAgICBjb25zdCBpbmRleCA9IHBhcmVudEFyci5maW5kSW5kZXgoY2hpbGQgPT4gY2hpbGRbaWRLZXldID09PSBpZCk7XG4gICAgICBsZXQgYWRqYWNlbnRJdGVtID0gcGFyZW50QXJyW2luZGV4ICsgMV07XG4gICAgICBpZiAoIWFkamFjZW50SXRlbSkgYWRqYWNlbnRJdGVtID0gcGFyZW50QXJyW2luZGV4IC0gMV07XG4gICAgICBpZiAoIWFkamFjZW50SXRlbSAmJiAhQXJyYXkuaXNBcnJheShwYXJlbnQpKSBhZGphY2VudEl0ZW0gPSBwYXJlbnQ7XG4gICAgICBpZiAoIWFkamFjZW50SXRlbSkgcmV0dXJuIG51bGw7XG5cbiAgICAgIHJldHVybiBhZGphY2VudEl0ZW1baWRLZXldO1xuICAgIH07XG5cbiAgICBjb25zdCBwYXJlbnQgPSB0aGlzLmdldFRyZWVJdGVtKGlkLCB0aGlzLnByb3BzLnRyZWVEYXRhLCB0cnVlKTtcbiAgICByZXR1cm4gcGFyZW50ID8gZ2V0QWRqYWNlbnRJdGVtSWQocGFyZW50KSA6IGdldEFkamFjZW50SXRlbUlkKHRyZWVEYXRhKTtcbiAgfTtcblxuICAvKipcbiAgICogQXBwZW5kcyBwcm92aWRlZCBpdGVtcyB0byB0aGUgZ3JpZFxuICAgKiBAcGFyYW0gaXRlbXMgLSBpbW11dGFibGUgYXJyYXkgb2YgaXRlbXMgdG8gYmUgYXBwZW5kZWQgdG8gZ3JpZFxuICAgKiBAcGFyYW0gc2V0TmV3SXRlbXMgLSBzZXQgY29tcGxldGVseSBhIG5ldyBhcnJheSBvZiBpdGVtc1xuICAgKi9cbiAgc2V0RGF0YVRvR3JpZCA9IChpdGVtcywgc2V0TmV3SXRlbXMgPSBmYWxzZSkgPT4ge1xuICAgIGxldCBkYXRhID0gTGlzdCgpO1xuICAgIGNvbnN0IHtcbiAgICAgIGdyaWQsIGdyaWRDb2x1bW5zLCBncmlkRGF0YSwgc29ydEtleSxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIXNldE5ld0l0ZW1zKSBkYXRhID0gZ3JpZERhdGEuc2xpY2UoKTtcbiAgICBsZXQgbmV3R3JpZEl0ZW1zID0gZGF0YS5jb25jYXQoaXRlbXMpO1xuICAgIGlmIChzb3J0S2V5KSBuZXdHcmlkSXRlbXMgPSBuZXdHcmlkSXRlbXMuc29ydEJ5KGkgPT4gaS5nZXQoc29ydEtleSkpO1xuXG4gICAgdGhpcy5wcm9wcy5zZXREYXRhKGdyaWQsIGdyaWRDb2x1bW5zLCBuZXdHcmlkSXRlbXMpO1xuICAgIHRoaXMucHJvcHMuY2xlYXJTZWxlY3RlZEl0ZW1zKGdyaWQpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDaGVja3Mgd2hldGhlciBvciBub3QgZ2l2ZW4gbm9kZSBpcyBkaXNhYmxlZFxuICAgKi9cbiAgaXNTZWxlY3RlZERpc2FibGVkID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgbG9ja2VkS2V5IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGl0ZW0gPSAhIXRoaXMuZ2V0VHJlZUl0ZW0odGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF0pO1xuICAgIGlmICghaXRlbSkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiBpdGVtW2xvY2tlZEtleV07XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgdGhlIGNob3NlbiBpdGVtIGZyb20gYSB0cmVlIGFuZCB1cGRhdGVzIHRoZSBncmlkIHVzaW5nIE1PVkVfTEVBRlxuICAgKiBhY3Rpb25cbiAgICovXG4gIG1vdmVJdGVtVG9HcmlkID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgdHJlZURhdGEsIG9uQ2hhbmdlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHNlbGVjdGVkS2V5ID0gdGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF07XG4gICAgY29uc3QgYWN0aW9uID0ge1xuICAgICAgdHlwZTogVFJFRV9BQ1RJT05TLk1PVkVfTEVBRixcbiAgICAgIGRhdGE6IHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdLFxuICAgIH07XG4gICAgY29uc3QgbmV4dFNlbGVjdGVkS2V5ID0gdGhpcy5nZXRBZGphY2VudEl0ZW0oc2VsZWN0ZWRLZXkpO1xuICAgIGNvbnN0IG5ld0dyaWRJdGVtcyA9IGZyb21KUyhbdGhpcy5nZXRUcmVlSXRlbShzZWxlY3RlZEtleSldKTtcbiAgICBjb25zdCBuZXdJdGVtcyA9IHRoaXMuZ2V0VXBkYXRlZFRyZWUoc2VsZWN0ZWRLZXksIHRyZWVEYXRhLCBhY3Rpb24pO1xuXG4gICAgdGhpcy5zZXREYXRhVG9HcmlkKG5ld0dyaWRJdGVtcyk7XG4gICAgaWYgKG9uQ2hhbmdlKSBvbkNoYW5nZShuZXdJdGVtcyk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzZWxlY3RlZEtleXM6IFtuZXh0U2VsZWN0ZWRLZXldLFxuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBFeHBhbmRzIGEgcGFyZW50XG4gICAqIEBwYXJhbSBwYXJlbnRJZFxuICAgKi9cbiAgZXhwYW5kUGFyZW50ID0gKHBhcmVudElkKSA9PiB7XG4gICAgaWYgKHBhcmVudElkICYmICF0aGlzLnN0YXRlLmV4cGFuZGVkS2V5cy5maW5kKGV4cGFuZGVkSWQgPT4gZXhwYW5kZWRJZCA9PT0gcGFyZW50SWQpKSB7XG4gICAgICBjb25zdCBuZXdFeHBhbmRlZEtleXMgPSB0aGlzLnN0YXRlLmV4cGFuZGVkS2V5cy5zbGljZSgpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICBuZXdFeHBhbmRlZEtleXMucHVzaChwYXJlbnRJZCk7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgZXhwYW5kZWRLZXlzOiBuZXdFeHBhbmRlZEtleXMgfSk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBDbG9zZXMgZGVsZXRlIGNvbmZpcm1hdGlvbiBkaWFsb2dcbiAgICovXG4gIGNsb3NlRGVsZXRlQ29uZmlybWF0aW9uRGlhbG9nID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzaG93RGVsZXRlQ29uZmlybWF0aW9uOiBmYWxzZSB9KTtcbiAgfTtcblxuICAvKipcbiAgICogRGVsZXRlcyBhIHBhcmVudCBub2RlXG4gICAqL1xuICBkZWxldGVQYXJlbnQgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBvbkNoYW5nZSwgdHJlZURhdGEgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgc2VsZWN0ZWRLZXkgPSB0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXTtcbiAgICBjb25zdCBhY3Rpb24gPSB7XG4gICAgICB0eXBlOiBUUkVFX0FDVElPTlMuREVMRVRFX1BBUkVOVCxcbiAgICB9O1xuICAgIGNvbnN0IG5leHRTZWxlY3RlZEtleSA9IHRoaXMuZ2V0QWRqYWNlbnRJdGVtKHNlbGVjdGVkS2V5KTtcbiAgICBjb25zdCBuZXdJdGVtcyA9IHRoaXMuZ2V0VXBkYXRlZFRyZWUoc2VsZWN0ZWRLZXksIHRyZWVEYXRhLCBhY3Rpb24pO1xuICAgIGlmIChvbkNoYW5nZSkgb25DaGFuZ2UobmV3SXRlbXMpO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2VsZWN0ZWRLZXlzOiBbbmV4dFNlbGVjdGVkS2V5XSxcbiAgICAgIHNob3dEZWxldGVDb25maXJtYXRpb246IGZhbHNlLFxuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBEZXNlbGVjdHMgYW4gaXRlbSwgaWYgaXQgaXMgZS5nLiByZW1vdmVkXG4gICAqL1xuICBkZXNlbGVjdEl0ZW0gPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkS2V5czogW10gfSk7XG4gIH07XG5cbiAgcmVuZGVySGVhZGVyUmlnaHQgPSB0cmFuc2xhdGlvbnMgPT4gKFxuICAgIDxDb250cm9sQmFyXG4gICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgIG9uQWRkTmV3Q2xpY2s9e3RoaXMub25BZGROZXdDbGlja31cbiAgICAgIG9uRGVsZXRlQ2xpY2s9e3RoaXMub25EZWxldGVDbGlja31cbiAgICAgIG9uSW5wdXRDaGFuZ2U9e3RoaXMub25JbnB1dENoYW5nZX1cbiAgICAgIHNlbGVjdGVkVHJlZUl0ZW09e3RoaXMuZ2V0VHJlZUl0ZW0odGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF0pfVxuICAgICAgaGVpZ2h0PXtBQ1RJT05fQkFSX0NPTlRBSU5FUl9IRUlHSFR9XG4gICAgICB0cmFuc2xhdGlvbnM9e3RyYW5zbGF0aW9uc31cbiAgICAvPlxuICApO1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICB2YWx1ZUtleSxcbiAgICAgIGxlYWZWYWx1ZUtleSxcbiAgICAgIGlkS2V5LFxuICAgICAgdHJlZURhdGEsXG4gICAgICBncmlkLFxuICAgICAgZ3JpZENvbHVtbnMsXG4gICAgICBjbGFzc05hbWUsXG4gICAgICB0cmFuc2xhdGlvbnMsXG4gICAgICBjaGlsZEtleSxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IG1lcmdlZEdyaWQgPSBPYmplY3QuYXNzaWduKHt9LCBncmlkLCB7IGRlZmF1bHRTaG93RmlsdGVyaW5nUm93OiB0cnVlIH0pO1xuICAgIGNvbnN0IG1lcmdlZFRyYW5zbGF0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRUcmFuc2xhdGlvbnMsIHRyYW5zbGF0aW9ucyk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPFJlYWN0LkZyYWdtZW50PlxuICAgICAgICA8Q29udGFpbmVyIGNsYXNzTmFtZT17Y2xhc3NOYW1lfT5cbiAgICAgICAgICA8VHJlZUNvbnRhaW5lcj5cbiAgICAgICAgICAgIDxUcmVlQ29tcG9uZW50XG4gICAgICAgICAgICAgIHRyZWVEYXRhPXt0cmVlRGF0YX1cbiAgICAgICAgICAgICAgZGF0YUxvb2tVcEtleT17aWRLZXl9XG4gICAgICAgICAgICAgIGRhdGFMb29rVXBWYWx1ZT17dmFsdWVLZXl9XG4gICAgICAgICAgICAgIGRhdGFMb29rVXBMZWFmVmFsdWU9e2xlYWZWYWx1ZUtleX1cbiAgICAgICAgICAgICAgZGF0YUxvb2tVcENoaWxkcmVuPXtjaGlsZEtleX1cbiAgICAgICAgICAgICAgb25TZWxlY3Q9e3RoaXMub25UcmVlSXRlbVNlbGVjdH1cbiAgICAgICAgICAgICAgb25FeHBhbmQ9e3RoaXMub25FeHBhbmR9XG4gICAgICAgICAgICAgIGNoZWNrYWJsZT17ZmFsc2V9XG4gICAgICAgICAgICAgIHNlbGVjdGVkS2V5cz17dGhpcy5zdGF0ZS5zZWxlY3RlZEtleXN9XG4gICAgICAgICAgICAgIGV4cGFuZGVkS2V5cz17dGhpcy5zdGF0ZS5leHBhbmRlZEtleXN9XG4gICAgICAgICAgICAgIG9uT3JkZXJCdXR0b25DbGljaz17dGhpcy5vbk9yZGVyQ2xpY2t9XG4gICAgICAgICAgICAgIHRpdGxlPXttZXJnZWRUcmFuc2xhdGlvbnMudHJlZVRpdGxlfVxuICAgICAgICAgICAgICBzZWxlY3RhYmxlXG4gICAgICAgICAgICAgIHNob3dPcmRlcmluZ0Fycm93c1xuICAgICAgICAgICAgICBzaG93RXhwYW5kQWxsXG4gICAgICAgICAgICAgIGhlYWRlclJpZ2h0PXt0aGlzLnJlbmRlckhlYWRlclJpZ2h0KG1lcmdlZFRyYW5zbGF0aW9ucyl9XG4gICAgICAgICAgICAgIGhhbmRsZUV4cGFuZGVkS2V5c01hbnVhbGx5XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvVHJlZUNvbnRhaW5lcj5cbiAgICAgICAgICA8QXJyb3dDb250cm9sc1xuICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICBzZWxlY3RlZFRyZWVJdGVtPXt0aGlzLmdldFRyZWVJdGVtKHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdKX1cbiAgICAgICAgICAgIG9uTW92ZVRvVHJlZUNsaWNrPXt0aGlzLm9uTW92ZVRvVHJlZUNsaWNrfVxuICAgICAgICAgICAgb25Nb3ZlVG9HcmlkQ2xpY2s9e3RoaXMub25Nb3ZlVG9HcmlkQ2xpY2t9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8R3JpZFxuICAgICAgICAgICAgZ3JpZD17bWVyZ2VkR3JpZH1cbiAgICAgICAgICAgIGNvbHVtbnM9e2dyaWRDb2x1bW5zfVxuICAgICAgICAgICAgbXVsdGlTZWxlY3RcbiAgICAgICAgICAgIGZpbHRlcmluZ1xuICAgICAgICAgICAgcm93U2VsZWN0Q2hlY2tib3hDb2x1bW5cbiAgICAgICAgICAgIGdyaWRIZWFkZXI9ezxQcmltaXRpdmUuU3VidGl0bGU+e21lcmdlZFRyYW5zbGF0aW9ucy5ncmlkVGl0bGV9PC9QcmltaXRpdmUuU3VidGl0bGU+fVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvQ29udGFpbmVyPlxuICAgICAgICB7dGhpcy5zdGF0ZS5zaG93RGVsZXRlQ29uZmlybWF0aW9uICYmIChcbiAgICAgICAgICA8Q29uZmlybURpYWxvZ1xuICAgICAgICAgICAgdHJhbnNsYXRpb25zPXttZXJnZWRUcmFuc2xhdGlvbnMuZGVsZXRlQ29uZmlybURpYWxvZ31cbiAgICAgICAgICAgIGNvbmZpcm1DYWxsYmFjaz17dGhpcy5kZWxldGVQYXJlbnR9XG4gICAgICAgICAgICBjYW5jZWxDYWxsYmFjaz17dGhpcy5jbG9zZURlbGV0ZUNvbmZpcm1hdGlvbkRpYWxvZ31cbiAgICAgICAgICAvPlxuICAgICAgICApfVxuICAgICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgICApO1xuICB9XG59XG4iXX0=