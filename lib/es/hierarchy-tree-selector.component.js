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

    _defineProperty(_assertThisInitialized(_this), "countParents", function (selectedKey, counter) {
      var _this$props10 = _this.props,
          idKey = _this$props10.idKey,
          treeData = _this$props10.treeData;

      var newParent = _this.getTreeItem(selectedKey, treeData, true);

      if (newParent) {
        return _this.countParents(newParent[idKey], counter + 1);
      }

      return counter;
    });

    _defineProperty(_assertThisInitialized(_this), "hasLevelReachedMax", function (selectedLevel) {
      var maxLevel = _this.props.maxLevel;
      if (!selectedLevel || !maxLevel) return false;

      var numberOfParents = _this.countParents(selectedLevel, 0);

      return numberOfParents >= maxLevel;
    });

    _defineProperty(_assertThisInitialized(_this), "isSelectedDisabled", function () {
      var lockedKey = _this.props.lockedKey;
      var item = !!_this.getTreeItem(_this.state.selectedKeys[0]);
      if (!item) return false;
      return item[lockedKey];
    });

    _defineProperty(_assertThisInitialized(_this), "moveItemToGrid", function () {
      var _this$props11 = _this.props,
          treeData = _this$props11.treeData,
          onChange = _this$props11.onChange;
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
      var _this$props12 = _this.props,
          onChange = _this$props12.onChange,
          treeData = _this$props12.treeData;
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
        translations: translations,
        isAddDisabled: _this.hasLevelReachedMax(_this.state.selectedKeys[0])
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
    var _this$props13 = this.props,
        valueKey = _this$props13.valueKey,
        leafValueKey = _this$props13.leafValueKey,
        idKey = _this$props13.idKey,
        treeData = _this$props13.treeData,
        grid = _this$props13.grid,
        gridColumns = _this$props13.gridColumns,
        className = _this$props13.className,
        translations = _this$props13.translations,
        childKey = _this$props13.childKey;
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
  singleRoot: true,
  maxLevel: 0,
  maxValueLength: undefined
}), _temp)) || _class);
export { HierarchyTreeSelector as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlRyZWVDb21wb25lbnQiLCJQcmltaXRpdmUiLCJEYXRhZ3JpZCIsImdyaWRTaGFwZSIsImdyaWRDb2x1bW5TaGFwZSIsIkRhdGFncmlkQWN0aW9ucyIsIkNvbmZpcm1EaWFsb2ciLCJSZWFjdCIsInN0eWxlZCIsIkxpc3QiLCJmcm9tSlMiLCJJbW11dGFibGVQcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJjb25uZWN0IiwiQ29udHJvbEJhciIsIkFycm93Q29udHJvbHMiLCJkZWZhdWx0VHJhbnNsYXRpb25zIiwiQUNUSU9OX0JBUl9DT05UQUlORVJfSEVJR0hUIiwiVFJFRV9BQ1RJT05TIiwiQUREX0NISUxEUkVOIiwiTU9WRV9MRUFGIiwiUkVOQU1FX1BBUkVOVCIsIkRFTEVURV9QQVJFTlQiLCJHcmlkIiwiQ29udGFpbmVyIiwiZGl2IiwiVHJlZUNvbnRhaW5lciIsInByb3BzIiwidGhlbWUiLCJndXR0ZXJXaWR0aCIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsInNldERhdGEiLCJjbGVhclNlbGVjdGVkSXRlbXMiLCJtYXBTdGF0ZVRvUHJvcHMiLCJzdGF0ZSIsImdyaWRJZCIsImdyaWQiLCJpZCIsInNlbGVjdGVkR3JpZEl0ZW1zIiwiZGF0YWdyaWQiLCJnZXRJbiIsImdyaWREYXRhIiwiSGllcmFyY2h5VHJlZVNlbGVjdG9yIiwic2VsZWN0ZWRLZXlzIiwib25TZWxlY3QiLCJsb2NrZWRLZXkiLCJzZWxlY3RlZEl0ZW0iLCJnZXRUcmVlSXRlbSIsInNldFN0YXRlIiwiY2hpbGRLZXkiLCJvblByZXZlbnREZWxldGUiLCJpdGVtIiwibW92ZUl0ZW1Ub0dyaWQiLCJsZWFmcyIsImdldEFsbExlYWZzIiwiZmluZCIsImxlYWYiLCJzaG93RGVsZXRlQ29uZmlybWF0aW9uIiwiZGF0YSIsImNhbGxiYWNrIiwib25DaGFuZ2UiLCJ0cmVlRGF0YSIsImlkS2V5IiwibmV3SXRlbXMiLCJzbGljZSIsInB1c2giLCJhY3Rpb24iLCJ0eXBlIiwiZ2V0VXBkYXRlZFRyZWUiLCJwYXJlbnQiLCJleHBhbmRQYXJlbnQiLCJpdGVtcyIsInNlbGVjdGVkSWQiLCJmaWx0ZXIiLCJpIiwiaW5jbHVkZXMiLCJnZXQiLCJ0b0pTIiwibmV3R3JpZEl0ZW1zIiwic2V0RGF0YVRvR3JpZCIsInZhbHVlIiwiaWRzIiwiZXhwYW5kZWRLZXlzIiwiYXJyYXkiLCJpc1NlbGVjdGVkRGlzYWJsZWQiLCJmb3VuZCIsInZhbHVlS2V5IiwicmVtb3ZlQWN0aW9ucyIsInJvb3RJdGVtIiwibGVuZ3RoIiwiZGVzZWxlY3RJdGVtIiwiY2hpbGQiLCJmaWx0ZXJlZENoaWxkcmVuIiwiY2hpbGRJdGVtIiwiY29uY2F0IiwiVHlwZUVycm9yIiwiYWxyZWFkeUZvdW5kIiwicmV0dXJuUGFyZW50IiwiZm9yRWFjaCIsImdldEFkamFjZW50SXRlbUlkIiwicGFyZW50QXJyIiwiQXJyYXkiLCJpc0FycmF5IiwiaW5kZXgiLCJmaW5kSW5kZXgiLCJhZGphY2VudEl0ZW0iLCJzZXROZXdJdGVtcyIsImdyaWRDb2x1bW5zIiwic29ydEtleSIsInNvcnRCeSIsInNlbGVjdGVkS2V5IiwiY291bnRlciIsIm5ld1BhcmVudCIsImNvdW50UGFyZW50cyIsInNlbGVjdGVkTGV2ZWwiLCJtYXhMZXZlbCIsIm51bWJlck9mUGFyZW50cyIsIm5leHRTZWxlY3RlZEtleSIsImdldEFkamFjZW50SXRlbSIsInBhcmVudElkIiwiZXhwYW5kZWRJZCIsIm5ld0V4cGFuZGVkS2V5cyIsInRyYW5zbGF0aW9ucyIsIm9uQWRkTmV3Q2xpY2siLCJvbkRlbGV0ZUNsaWNrIiwib25JbnB1dENoYW5nZSIsImhhc0xldmVsUmVhY2hlZE1heCIsImNvbXBvbmVudERpZE1vdW50IiwiZGVmYXVsdEV4cGFuZGVkS2V5cyIsIm9uRXhwYW5kIiwicmVuZGVyIiwibGVhZlZhbHVlS2V5IiwiY2xhc3NOYW1lIiwibWVyZ2VkR3JpZCIsIk9iamVjdCIsImFzc2lnbiIsImRlZmF1bHRTaG93RmlsdGVyaW5nUm93IiwibWVyZ2VkVHJhbnNsYXRpb25zIiwib25UcmVlSXRlbVNlbGVjdCIsIm9uT3JkZXJDbGljayIsInRyZWVUaXRsZSIsInJlbmRlckhlYWRlclJpZ2h0Iiwib25Nb3ZlVG9UcmVlQ2xpY2siLCJvbk1vdmVUb0dyaWRDbGljayIsImdyaWRUaXRsZSIsImRlbGV0ZUNvbmZpcm1EaWFsb2ciLCJkZWxldGVQYXJlbnQiLCJjbG9zZURlbGV0ZUNvbmZpcm1hdGlvbkRpYWxvZyIsIlB1cmVDb21wb25lbnQiLCJ1bmRlZmluZWQiLCJkZWZhdWx0RXhwYW5kQWxsIiwic2luZ2xlUm9vdCIsIm1heFZhbHVlTGVuZ3RoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPQSxhQUFQLE1BQTBCLGtDQUExQjtBQUNBLFNBQVNDLFNBQVQsUUFBMEIsa0NBQTFCO0FBQ0EsU0FDRUMsUUFERixFQUNZQyxTQURaLEVBQ3VCQyxlQUR2QixFQUN3Q0MsZUFEeEMsUUFFTyx3QkFGUDtBQUdBLE9BQU9DLGFBQVAsTUFBMEIsdUNBQTFCO0FBQ0EsT0FBT0MsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLE1BQVAsTUFBbUIsbUJBQW5CO0FBQ0EsU0FBU0MsSUFBVCxFQUFlQyxNQUFmLFFBQTZCLFdBQTdCO0FBQ0EsT0FBT0Msa0JBQVAsTUFBK0IsMkJBQS9CO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLFNBQVNDLE9BQVQsUUFBd0IsYUFBeEIsQyxDQUVBOztBQUNBLE9BQU9DLFVBQVAsTUFBdUIsaURBQXZCO0FBQ0EsT0FBT0MsYUFBUCxNQUEwQixvREFBMUI7QUFDQSxTQUFTQyxtQkFBVCxRQUFvQyx3QkFBcEM7QUFFQSxJQUFNQywyQkFBMkIsR0FBRyxNQUFwQztBQUNBLElBQU1DLFlBQVksR0FBRztBQUNuQkMsRUFBQUEsWUFBWSxFQUFFLGNBREs7QUFFbkJDLEVBQUFBLFNB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eUcsU0FYVTtBQVlwQnpGLEVBQUFBLFFBQVEsRUFBRXlGLFNBWlU7QUFhcEJuRyxFQUFBQSxlQUFlLEVBQUVtRyxTQWJHO0FBY3BCQyxFQUFBQSxnQkFBZ0IsRUFBRSxJQWRFO0FBZXBCdEIsRUFBQUEsbUJBQW1CLEVBQUUsRUFmRDtBQWdCcEJ1QixFQUFBQSxVQUFVLEVBQUUsSUFoQlE7QUFpQnBCcEMsRUFBQUEsUUFBUSxFQUFFLENBakJVO0FBa0JwQnFDLEVBQUFBLGNBQWMsRUFBRUg7QUFsQkksQztTQTdCSDNHLHFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRyZWVDb21wb25lbnQgZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtdHJlZS1jb21wb25lbnQnO1xuaW1wb3J0IHsgUHJpbWl0aXZlIH0gZnJvbSAnQG9wdXNjYXBpdGEvb2MtY20tY29tbW9uLWxheW91dHMnO1xuaW1wb3J0IHtcbiAgRGF0YWdyaWQsIGdyaWRTaGFwZSwgZ3JpZENvbHVtblNoYXBlLCBEYXRhZ3JpZEFjdGlvbnMsXG59IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWdyaWQnO1xuaW1wb3J0IENvbmZpcm1EaWFsb2cgZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtY29uZmlybWF0aW9uLWRpYWxvZyc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgeyBMaXN0LCBmcm9tSlMgfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IEltbXV0YWJsZVByb3BUeXBlcyBmcm9tICdyZWFjdC1pbW11dGFibGUtcHJvcHR5cGVzJztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG4vLyBBcHAgaW1wb3J0c1xuaW1wb3J0IENvbnRyb2xCYXIgZnJvbSAnLi9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci1jb250cm9sLWJhci5jb21wb25lbnQnO1xuaW1wb3J0IEFycm93Q29udHJvbHMgZnJvbSAnLi9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci1hcnJvdy1jb250cm9scy5jb21wb25lbnQnO1xuaW1wb3J0IHsgZGVmYXVsdFRyYW5zbGF0aW9ucyB9IGZyb20gJy4vaGllcmFyY2h5LXRyZWUudXRpbHMnO1xuXG5jb25zdCBBQ1RJT05fQkFSX0NPTlRBSU5FUl9IRUlHSFQgPSAnNTRweCc7XG5jb25zdCBUUkVFX0FDVElPTlMgPSB7XG4gIEFERF9DSElMRFJFTjogJ0FERF9DSElMRFJFTicsXG4gIE1PVkVfTEVBRjogJ01PVkVfTEVBRicsXG4gIFJFTkFNRV9QQVJFTlQ6ICdSRU5BTUVfUEFSRU5UJyxcbiAgREVMRVRFX1BBUkVOVDogJ0RFTEVURV9QQVJFTlQnLFxufTtcblxuY29uc3QgR3JpZCA9IHN0eWxlZChEYXRhZ3JpZClgXG4gIGhlaWdodDogMTAwJTtcbiAgJiYmIHtcbiAgICBwYWRkaW5nOiAwO1xuICB9XG5gO1xuXG5jb25zdCBDb250YWluZXIgPSBzdHlsZWQuZGl2YFxuICBkaXNwbGF5OiBmbGV4O1xuICBtaW4taGVpZ2h0OiAzMDBweDtcbiAgPiBkaXYge1xuICAgIHdpZHRoOiA1MCU7XG4gICAgZmxleDogMSAxIDEwMCU7XG4gIH1cbmA7XG5cbmNvbnN0IFRyZWVDb250YWluZXIgPSBzdHlsZWQuZGl2YFxuICBoZWlnaHQ6IDEwMCU7XG4gIC5vYy1zY3JvbGxiYXItY29udGFpbmVyIHtcbiAgICBoZWlnaHQ6IGNhbGMoMTAwJSAtICR7QUNUSU9OX0JBUl9DT05UQUlORVJfSEVJR0hUfSk7XG4gICAgcGFkZGluZzogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5ndXR0ZXJXaWR0aH07XG4gIH1cbiAgLnRyZWUtaGVhZGVyIHtcbiAgICBtaW4taGVpZ2h0OiAke0FDVElPTl9CQVJfQ09OVEFJTkVSX0hFSUdIVH07XG4gICAgLm9yZGVyaW5nLWFycm93cyB7XG4gICAgICBmb250LXdlaWdodDogMjRweDtcbiAgICB9XG4gIH1cbiAgLm9jLXJlYWN0LXRyZWUge1xuICAgIGhlaWdodDogMTAwJTtcbiAgICAucmMtdHJlZS1pY29uRWxlLnJjLXRyZWUtaWNvbl9fY3VzdG9taXplIHtcbiAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgfVxuICB9XG5gO1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSB7XG4gIHNldERhdGE6IERhdGFncmlkQWN0aW9ucy5zZXREYXRhLFxuICBjbGVhclNlbGVjdGVkSXRlbXM6IERhdGFncmlkQWN0aW9ucy5jbGVhclNlbGVjdGVkSXRlbXMsXG59O1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUsIHByb3BzKSA9PiB7XG4gIGNvbnN0IGdyaWRJZCA9IHByb3BzLmdyaWQuaWQ7XG4gIHJldHVybiB7XG4gICAgc2VsZWN0ZWRHcmlkSXRlbXM6IHN0YXRlLmRhdGFncmlkLmdldEluKFtncmlkSWQsICdzZWxlY3RlZEl0ZW1zJ10sIExpc3QoKSksXG4gICAgZ3JpZERhdGE6IHN0YXRlLmRhdGFncmlkLmdldEluKFtncmlkSWQsICdhbGxEYXRhJ10sIExpc3QoKSksXG4gIH07XG59O1xuXG5AY29ubmVjdChcbiAgbWFwU3RhdGVUb1Byb3BzLFxuICBtYXBEaXNwYXRjaFRvUHJvcHMsXG4pXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIaWVyYXJjaHlUcmVlU2VsZWN0b3IgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBpZEtleTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB2YWx1ZUtleTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjaGlsZEtleTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBsb2NrZWRLZXk6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbGVhZlZhbHVlS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHNvcnRLZXk6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdHJlZURhdGE6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zaGFwZSh7fSkpLFxuICAgIGdyaWQ6IGdyaWRTaGFwZS5pc1JlcXVpcmVkLFxuICAgIGdyaWRDb2x1bW5zOiBQcm9wVHlwZXMuYXJyYXlPZihncmlkQ29sdW1uU2hhcGUpLmlzUmVxdWlyZWQsXG4gICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHNldERhdGE6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgY2xlYXJTZWxlY3RlZEl0ZW1zOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHNlbGVjdGVkR3JpZEl0ZW1zOiBJbW11dGFibGVQcm9wVHlwZXMubGlzdC5pc1JlcXVpcmVkLFxuICAgIGdyaWREYXRhOiBJbW11dGFibGVQcm9wVHlwZXMubGlzdC5pc1JlcXVpcmVkLFxuICAgIHRyYW5zbGF0aW9uczogUHJvcFR5cGVzLnNoYXBlKHt9KSxcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkZWZhdWx0RXhwYW5kQWxsOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkZWZhdWx0RXhwYW5kZWRLZXlzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKSxcbiAgICBzaW5nbGVSb290OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBtYXhMZXZlbDogUHJvcFR5cGVzLm51bWJlcixcbiAgICBtYXhWYWx1ZUxlbmd0aDogUHJvcFR5cGVzLm51bWJlcixcbiAgICAvLyBDYWxsYmFja3NcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uUHJldmVudERlbGV0ZTogUHJvcFR5cGVzLmZ1bmMsXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBpZEtleTogJ2lkJyxcbiAgICB2YWx1ZUtleTogJ25hbWUnLFxuICAgIGNoaWxkS2V5OiAnY2hpbGRyZW4nLFxuICAgIGxvY2tlZEtleTogdW5kZWZpbmVkLFxuICAgIGxlYWZWYWx1ZUtleTogdW5kZWZpbmVkLFxuICAgIHNvcnRLZXk6IHVuZGVmaW5lZCxcbiAgICB0cmVlRGF0YTogW10sXG4gICAgY2xhc3NOYW1lOiAnJyxcbiAgICB0cmFuc2xhdGlvbnM6IGRlZmF1bHRUcmFuc2xhdGlvbnMsXG4gICAgaWQ6ICdoaWVyYXJjaHktdHJlZScsXG4gICAgb25TZWxlY3Q6IHVuZGVmaW5lZCxcbiAgICBvbkNoYW5nZTogdW5kZWZpbmVkLFxuICAgIG9uUHJldmVudERlbGV0ZTogdW5kZWZpbmVkLFxuICAgIGRlZmF1bHRFeHBhbmRBbGw6IHRydWUsXG4gICAgZGVmYXVsdEV4cGFuZGVkS2V5czogW10sXG4gICAgc2luZ2xlUm9vdDogdHJ1ZSxcbiAgICBtYXhMZXZlbDogMCxcbiAgICBtYXhWYWx1ZUxlbmd0aDogdW5kZWZpbmVkLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzZWxlY3RlZEtleXM6IFtdLFxuICAgICAgZXhwYW5kZWRLZXlzOiBbXSxcbiAgICAgIHNob3dEZWxldGVDb25maXJtYXRpb246IGZhbHNlLFxuICAgIH07XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5kZWZhdWx0RXhwYW5kZWRLZXlzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMub25FeHBhbmQodGhpcy5wcm9wcy5kZWZhdWx0RXhwYW5kZWRLZXlzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0cyBhIHRyZWUgaXRlbVxuICAgKiBAcGFyYW0gc2VsZWN0ZWRLZXlzIChhcnJheSlcbiAgICovXG4gIG9uVHJlZUl0ZW1TZWxlY3QgPSAoc2VsZWN0ZWRLZXlzKSA9PiB7XG4gICAgY29uc3QgeyBvblNlbGVjdCwgbG9ja2VkS2V5IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHNlbGVjdGVkSXRlbSA9IHRoaXMuZ2V0VHJlZUl0ZW0oc2VsZWN0ZWRLZXlzWzBdKTtcbiAgICBpZiAobG9ja2VkS2V5ICYmIHNlbGVjdGVkSXRlbSAmJiBzZWxlY3RlZEl0ZW1bbG9ja2VkS2V5XSkgcmV0dXJuO1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZEtleXMgfSwgKCkgPT4ge1xuICAgICAgaWYgKG9uU2VsZWN0KSBvblNlbGVjdChzZWxlY3RlZEtleXMpO1xuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBEaXNwbGF5cyBhIGNvbmZpcm1hdGlvbiBkaWFsb2dcbiAgICovXG4gIG9uRGVsZXRlQ2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBjaGlsZEtleSwgbG9ja2VkS2V5LCBvblByZXZlbnREZWxldGUgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgaXRlbSA9IHRoaXMuZ2V0VHJlZUl0ZW0odGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF0pO1xuICAgIC8vIElmIGl0ZW0gaXMgbm90IGEgcGFyZW50LCB3ZSB3b24ndCBzaG93IHRoZSBkZWxldGUgY29uZmlybWF0aW9uIGRpYWxvZ1xuICAgIGlmICghaXRlbVtjaGlsZEtleV0pIHtcbiAgICAgIHRoaXMubW92ZUl0ZW1Ub0dyaWQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAobG9ja2VkS2V5KSB7XG4gICAgICAvLyBJZiBpdCBpcyBhIHBhcmVudCwgd2Ugd2FudCB0byBjaGVjayB0aGF0IGl0IGRvZXNuJ3QgY29udGFpbiBhbnkgbG9ja2VkIGl0ZW1zXG4gICAgICBjb25zdCBsZWFmcyA9IHRoaXMuZ2V0QWxsTGVhZnMoaXRlbVtjaGlsZEtleV0pO1xuICAgICAgaWYgKGxlYWZzLmZpbmQobGVhZiA9PiBsZWFmW2xvY2tlZEtleV0pICYmIG9uUHJldmVudERlbGV0ZSkge1xuICAgICAgICBvblByZXZlbnREZWxldGUoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuc2V0U3RhdGUoeyBzaG93RGVsZXRlQ29uZmlybWF0aW9uOiB0cnVlIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBZGRzIGEgbmV3IG5vZGUgdG8gdGhlIHJvb3Qgb2YgdGhlIHRyZWUsIG9yIHVuZGVyIGEgc2VsZWN0ZWQgdHJlZSBub2RlIHVzaW5nXG4gICAqIEFERF9DSElMRFJFTiBhY3Rpb25cbiAgICogQHBhcmFtIGRhdGEgLSBkYXRhIHRvIGJlIGFkZGVkXG4gICAqIEBwYXJhbSBjYWxsYmFja1xuICAgKi9cbiAgb25BZGROZXdDbGljayA9IChkYXRhLCBjYWxsYmFjaykgPT4ge1xuICAgIGNvbnN0IHsgb25DaGFuZ2UsIHRyZWVEYXRhLCBpZEtleSB9ID0gdGhpcy5wcm9wcztcbiAgICBsZXQgbmV3SXRlbXMgPSB0cmVlRGF0YS5zbGljZSgpO1xuXG4gICAgLy8gSWYgbm8gdHJlZSBub2RlIGlzIHNlbGVjdGVkLCB3ZSdsbCBwbGFjZSB0aGUgbmV3IGl0ZW0gdG8gdGhlIHJvb3RcbiAgICAvLyBvZiB0aGUgdHJlZVxuICAgIGlmICghdGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF0pIHtcbiAgICAgIG5ld0l0ZW1zLnB1c2goZGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGFjdGlvbiA9IHtcbiAgICAgICAgdHlwZTogVFJFRV9BQ1RJT05TLkFERF9DSElMRFJFTixcbiAgICAgICAgZGF0YSxcbiAgICAgIH07XG4gICAgICBuZXdJdGVtcyA9IHRoaXMuZ2V0VXBkYXRlZFRyZWUodGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF0sIHRyZWVEYXRhLCBhY3Rpb24pO1xuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRLZXlzOiBbZGF0YVtpZEtleV1dIH0sICgpID0+IHtcbiAgICAgIC8vIElmIHRoZSBwYXJlbnQgaXMgbm90IHlldCBleHBhbmRlZCwgd2Ugd2lsbCBleHBhbmQgaXQgbm93XG4gICAgICBjb25zdCBwYXJlbnQgPSB0aGlzLmdldFRyZWVJdGVtKGRhdGFbaWRLZXldLCB0cmVlRGF0YSwgdHJ1ZSkgfHwge307XG4gICAgICB0aGlzLmV4cGFuZFBhcmVudChwYXJlbnRbaWRLZXldKTtcblxuICAgICAgaWYgKG9uQ2hhbmdlKSBvbkNoYW5nZShuZXdJdGVtcyk7XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH0pO1xuICB9O1xuXG4gIG9uTW92ZVRvR3JpZENsaWNrID0gKCkgPT4ge1xuICAgIHRoaXMubW92ZUl0ZW1Ub0dyaWQoKTtcbiAgfTtcblxuICAvKipcbiAgICogQ2FsbHMgb25DaGFuZ2UgY2FsbGJhY2sgd2hlbmV2ZXIgdXNlciByZW9yZGVycyB0cmVlIGl0ZW1zIHVzaW5nIG9yZGVyaW5nIGFycm93c1xuICAgKiBAcGFyYW0gaXRlbXNcbiAgICovXG4gIG9uT3JkZXJDbGljayA9IChpdGVtcykgPT4ge1xuICAgIHRoaXMucHJvcHMub25DaGFuZ2UoaXRlbXMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBZGRzIHNlbGVjdGVkIGdyaWQgaXRlbXMgdG8gdGhlIGNob3NlbiB0cmVlIG5vZGUgdXNpbmcgQUREX0NISUxEUkVOIGFjdGlvblxuICAgKi9cbiAgb25Nb3ZlVG9UcmVlQ2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgb25DaGFuZ2UsIHNlbGVjdGVkR3JpZEl0ZW1zLCBncmlkRGF0YSwgdHJlZURhdGEsIGlkS2V5LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHNlbGVjdGVkSWQgPSB0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXTtcblxuICAgIGNvbnN0IGFjdGlvbiA9IHtcbiAgICAgIHR5cGU6IFRSRUVfQUNUSU9OUy5BRERfQ0hJTERSRU4sXG4gICAgICBkYXRhOiBncmlkRGF0YS5maWx0ZXIoaSA9PiBzZWxlY3RlZEdyaWRJdGVtcy5pbmNsdWRlcyhpLmdldChpZEtleSkpKS50b0pTKCksXG4gICAgfTtcbiAgICBjb25zdCBuZXdJdGVtcyA9IHRoaXMuZ2V0VXBkYXRlZFRyZWUoc2VsZWN0ZWRJZCwgdHJlZURhdGEsIGFjdGlvbik7XG4gICAgY29uc3QgbmV3R3JpZEl0ZW1zID0gZ3JpZERhdGEuZmlsdGVyKGl0ZW0gPT4gIXNlbGVjdGVkR3JpZEl0ZW1zLmluY2x1ZGVzKGl0ZW0uZ2V0KGlkS2V5KSkpO1xuXG4gICAgdGhpcy5leHBhbmRQYXJlbnQoc2VsZWN0ZWRJZCwgdHJ1ZSk7XG4gICAgdGhpcy5zZXREYXRhVG9HcmlkKG5ld0dyaWRJdGVtcywgdHJ1ZSk7XG4gICAgaWYgKG9uQ2hhbmdlKSBvbkNoYW5nZShuZXdJdGVtcyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlbmFtZXMgdGhlIGNob3NlbiB0cmVlIG5vZGUgdXNpbmcgYSBSRU5BTUVfUEFSRU5UIGFjdGlvblxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICovXG4gIG9uSW5wdXRDaGFuZ2UgPSAodmFsdWUpID0+IHtcbiAgICBjb25zdCB7IHRyZWVEYXRhLCBvbkNoYW5nZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBhY3Rpb24gPSB7XG4gICAgICB0eXBlOiBUUkVFX0FDVElPTlMuUkVOQU1FX1BBUkVOVCxcbiAgICAgIGRhdGE6IHZhbHVlLFxuICAgIH07XG4gICAgY29uc3QgbmV3SXRlbXMgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdLCB0cmVlRGF0YSwgYWN0aW9uKTtcbiAgICBpZiAob25DaGFuZ2UpIG9uQ2hhbmdlKG5ld0l0ZW1zKTtcbiAgfTtcblxuICAvKipcbiAgICogRmlyZWQgb24gZXhwYW5kXG4gICAqIEBwYXJhbSBpZHNcbiAgICovXG4gIG9uRXhwYW5kID0gKGlkcykgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZXhwYW5kZWRLZXlzOiBpZHMsXG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdXBkYXRlZCB0cmVlIGl0ZW1zLlxuICAgKiBAcGFyYW0gaWQgLSB0YXJnZXQgaXRlbVxuICAgKiBAcGFyYW0gYXJyYXkgLSBhcnJheSB3aGVyZSB0YXJnZXQgaXRlbSBpcyBiZWluZyBzZWFyY2hlZFxuICAgKiBAcGFyYW0gYWN0aW9uIC0gYWN0aW9uIHRvIGJlIHBlcmZvcm1lZCB7dHlwZSwgZGF0YX1cbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBnZXRVcGRhdGVkVHJlZSA9IChpZCwgYXJyYXkgPSB0aGlzLnByb3BzLnRyZWVEYXRhLCBhY3Rpb24pID0+IHtcbiAgICBpZiAodGhpcy5pc1NlbGVjdGVkRGlzYWJsZWQoKSkgcmV0dXJuIGFycmF5O1xuXG4gICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgY29uc3QgeyBpZEtleSwgY2hpbGRLZXksIHZhbHVlS2V5IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IG5ld0l0ZW1zID0gYXJyYXkuc2xpY2UoKTtcbiAgICBjb25zdCByZW1vdmVBY3Rpb25zID0gW1RSRUVfQUNUSU9OUy5NT1ZFX0xFQUYsIFRSRUVfQUNUSU9OUy5ERUxFVEVfUEFSRU5UXTtcblxuICAgIC8vIElmIGRlbGV0ZWQgcGFyZW50IGl0ZW0gaXMgaW4gdGhlIHJvb3Qgbm9kZVxuICAgIGlmIChhY3Rpb24udHlwZSA9PT0gVFJFRV9BQ1RJT05TLkRFTEVURV9QQVJFTlQpIHtcbiAgICAgIGNvbnN0IHJvb3RJdGVtID0gYXJyYXkuZmluZChpdGVtID0+IGl0ZW1baWRLZXldID09PSBpZCk7XG4gICAgICBpZiAocm9vdEl0ZW0pIHtcbiAgICAgICAgaWYgKHJvb3RJdGVtW2NoaWxkS2V5XS5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLnNldERhdGFUb0dyaWQoZnJvbUpTKHRoaXMuZ2V0QWxsTGVhZnMocm9vdEl0ZW1bY2hpbGRLZXldKSkpO1xuICAgICAgICAgIHRoaXMuZGVzZWxlY3RJdGVtKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ld0l0ZW1zLmZpbHRlcihpdGVtID0+IGl0ZW1baWRLZXldICE9PSBpZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdJdGVtcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3QgaXRlbSA9IG5ld0l0ZW1zW2ldO1xuICAgICAgaWYgKHJlbW92ZUFjdGlvbnMuaW5jbHVkZXMoYWN0aW9uLnR5cGUpICYmIGl0ZW1bY2hpbGRLZXldICYmICFmb3VuZCkge1xuICAgICAgICBmb3VuZCA9ICEhaXRlbVtjaGlsZEtleV0uZmluZChjaGlsZCA9PiBjaGlsZFtpZEtleV0gPT09IGlkKTtcbiAgICAgICAgaWYgKGZvdW5kKSB7XG4gICAgICAgICAgLy8gV2hlbiByZW1vdmluZyBhbiBpdGVtIHdlIG11c3QgZmlyc3QgZmluZCBpdHMgcGFyZW50IGFuZCBhbHRlciBpdHMgY2hpbGRyZW4gYXJyYXlcbiAgICAgICAgICBpZiAoYWN0aW9uLnR5cGUgPT09IFRSRUVfQUNUSU9OUy5NT1ZFX0xFQUYpIHtcbiAgICAgICAgICAgIGl0ZW1bY2hpbGRLZXldID0gaXRlbVtjaGlsZEtleV0uZmlsdGVyKGNoaWxkID0+IGNoaWxkW2lkS2V5XSAhPT0gaWQpO1xuICAgICAgICAgICAgdGhpcy5kZXNlbGVjdEl0ZW0oKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGFjdGlvbi50eXBlID09PSBUUkVFX0FDVElPTlMuREVMRVRFX1BBUkVOVCkge1xuICAgICAgICAgICAgLy8gd2UgbXVzdCBmaXJzdCBmaWx0ZXIgdGhlIGNoaWxkcmVuLCBzbyB0aGF0IHdlIHdvbid0IGdldCBsZWFmcyBmcm9tXG4gICAgICAgICAgICAvLyBvdGhlciBjaGlsZCBicmFuY2hlc1xuICAgICAgICAgICAgY29uc3QgZmlsdGVyZWRDaGlsZHJlbiA9IGl0ZW1bY2hpbGRLZXldLmZpbHRlcihjaGlsZEl0ZW0gPT4gY2hpbGRJdGVtW2lkS2V5XSA9PT0gaWQpO1xuICAgICAgICAgICAgdGhpcy5zZXREYXRhVG9HcmlkKGZyb21KUyh0aGlzLmdldEFsbExlYWZzKGZpbHRlcmVkQ2hpbGRyZW4pKSk7XG4gICAgICAgICAgICB0aGlzLmRlc2VsZWN0SXRlbSgpO1xuICAgICAgICAgICAgaXRlbVtjaGlsZEtleV0gPSBpdGVtW2NoaWxkS2V5XS5maWx0ZXIoY2hpbGRJdGVtID0+IGNoaWxkSXRlbVtpZEtleV0gIT09IGlkKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1baWRLZXldID09PSBpZCAmJiAhZm91bmQpIHtcbiAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgICAgY2FzZSBUUkVFX0FDVElPTlMuQUREX0NISUxEUkVOOlxuICAgICAgICAgICAgaXRlbVtjaGlsZEtleV0gPSAoaXRlbVtjaGlsZEtleV0gfHwgW10pLmNvbmNhdChhY3Rpb24uZGF0YSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIFRSRUVfQUNUSU9OUy5SRU5BTUVfUEFSRU5UOlxuICAgICAgICAgICAgaXRlbVt2YWx1ZUtleV0gPSBhY3Rpb24uZGF0YTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBY3Rpb24gdHlwZSBpcyB1bmRlZmluZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtW2NoaWxkS2V5XSAmJiAhZm91bmQpIGZvdW5kID0gdGhpcy5nZXRVcGRhdGVkVHJlZShpZCwgaXRlbVtjaGlsZEtleV0sIGFjdGlvbik7XG4gICAgfVxuXG4gICAgaWYgKCFmb3VuZCkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiBuZXdJdGVtcztcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyByZWN1cnNpdmVseSBhbGwgbGVhZiBpdGVtcyBmcm9tIGEgZ2l2ZW4gYXJyYXlcbiAgICogQHBhcmFtIGFycmF5XG4gICAqIEBwYXJhbSBhbHJlYWR5Rm91bmQgKHVzZWQgcmVjdXJzaXZlbHkpXG4gICAqL1xuICBnZXRBbGxMZWFmcyA9IChhcnJheSwgYWxyZWFkeUZvdW5kID0gW10pID0+IHtcbiAgICBjb25zdCB7IGNoaWxkS2V5IH0gPSB0aGlzLnByb3BzO1xuICAgIGxldCBsZWFmcyA9IGFscmVhZHlGb3VuZDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSBhcnJheVtpXTtcbiAgICAgIGlmIChpdGVtW2NoaWxkS2V5XSkge1xuICAgICAgICBsZWFmcyA9IHRoaXMuZ2V0QWxsTGVhZnMoaXRlbVtjaGlsZEtleV0sIGFscmVhZHlGb3VuZCk7XG4gICAgICB9XG4gICAgICBpZiAoIWl0ZW1bY2hpbGRLZXldKSBsZWFmcy5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgICByZXR1cm4gbGVhZnM7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSB0cmVlIGl0ZW0gYnkgSURcbiAgICogQHBhcmFtIGlkXG4gICAqIEBwYXJhbSBhcnJheVxuICAgKiBAcGFyYW0gcmV0dXJuUGFyZW50IC0gcmV0dXJuIGl0ZW0ncyBwYXJlbnQgaW5zdGVhZCBvZiB0aGUgaXRlbVxuICAgKiBAcGFyYW0gcGFyZW50IC0gcGFyZW50IGl0ZW0gKHVzZWQgcmVjdXJzaXZlbHkpXG4gICAqIEByZXR1cm5zIHt7fX1cbiAgICovXG4gIGdldFRyZWVJdGVtID0gKGlkLCBhcnJheSA9IHRoaXMucHJvcHMudHJlZURhdGEsIHJldHVyblBhcmVudCA9IGZhbHNlLCBwYXJlbnQgPSBudWxsKSA9PiB7XG4gICAgY29uc3QgeyBjaGlsZEtleSwgaWRLZXkgfSA9IHRoaXMucHJvcHM7XG4gICAgbGV0IGZvdW5kID0gYXJyYXkuZmluZChpdGVtID0+IGl0ZW1baWRLZXldID09PSBpZCk7XG5cbiAgICBpZiAoZm91bmQgJiYgcmV0dXJuUGFyZW50KSBmb3VuZCA9IHBhcmVudDtcblxuICAgIGlmICghZm91bmQpIHtcbiAgICAgIGFycmF5LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgaWYgKGl0ZW1bY2hpbGRLZXldICYmICFmb3VuZCkge1xuICAgICAgICAgIGZvdW5kID0gdGhpcy5nZXRUcmVlSXRlbShpZCwgaXRlbVtjaGlsZEtleV0sIHJldHVyblBhcmVudCwgaXRlbSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gZm91bmQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIEdldCBhZGphY2VudCBpdGVtIChpZCkgaW4gcGFyZW50IGFycmF5LiBVc2VkIHdoZW4gbW92aW5nIGl0ZW1zIGZyb20gdHJlZVxuICAgKiB0byBncmlkL2RlbGV0aW5nIGFuIGl0ZW1cbiAgICogQHBhcmFtIGlkXG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgZ2V0QWRqYWNlbnRJdGVtID0gKGlkKSA9PiB7XG4gICAgaWYgKCFpZCkgcmV0dXJuIG51bGw7XG4gICAgY29uc3QgeyBjaGlsZEtleSwgaWRLZXksIHRyZWVEYXRhIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgZ2V0QWRqYWNlbnRJdGVtSWQgPSAocGFyZW50KSA9PiB7XG4gICAgICBjb25zdCBwYXJlbnRBcnIgPSBBcnJheS5pc0FycmF5KHBhcmVudCkgPyBwYXJlbnQgOiBwYXJlbnRbY2hpbGRLZXldO1xuICAgICAgY29uc3QgaW5kZXggPSBwYXJlbnRBcnIuZmluZEluZGV4KGNoaWxkID0+IGNoaWxkW2lkS2V5XSA9PT0gaWQpO1xuICAgICAgbGV0IGFkamFjZW50SXRlbSA9IHBhcmVudEFycltpbmRleCArIDFdO1xuICAgICAgaWYgKCFhZGphY2VudEl0ZW0pIGFkamFjZW50SXRlbSA9IHBhcmVudEFycltpbmRleCAtIDFdO1xuICAgICAgaWYgKCFhZGphY2VudEl0ZW0gJiYgIUFycmF5LmlzQXJyYXkocGFyZW50KSkgYWRqYWNlbnRJdGVtID0gcGFyZW50O1xuICAgICAgaWYgKCFhZGphY2VudEl0ZW0pIHJldHVybiBudWxsO1xuXG4gICAgICByZXR1cm4gYWRqYWNlbnRJdGVtW2lkS2V5XTtcbiAgICB9O1xuXG4gICAgY29uc3QgcGFyZW50ID0gdGhpcy5nZXRUcmVlSXRlbShpZCwgdGhpcy5wcm9wcy50cmVlRGF0YSwgdHJ1ZSk7XG4gICAgcmV0dXJuIHBhcmVudCA/IGdldEFkamFjZW50SXRlbUlkKHBhcmVudCkgOiBnZXRBZGphY2VudEl0ZW1JZCh0cmVlRGF0YSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEFwcGVuZHMgcHJvdmlkZWQgaXRlbXMgdG8gdGhlIGdyaWRcbiAgICogQHBhcmFtIGl0ZW1zIC0gaW1tdXRhYmxlIGFycmF5IG9mIGl0ZW1zIHRvIGJlIGFwcGVuZGVkIHRvIGdyaWRcbiAgICogQHBhcmFtIHNldE5ld0l0ZW1zIC0gc2V0IGNvbXBsZXRlbHkgYSBuZXcgYXJyYXkgb2YgaXRlbXNcbiAgICovXG4gIHNldERhdGFUb0dyaWQgPSAoaXRlbXMsIHNldE5ld0l0ZW1zID0gZmFsc2UpID0+IHtcbiAgICBsZXQgZGF0YSA9IExpc3QoKTtcbiAgICBjb25zdCB7XG4gICAgICBncmlkLCBncmlkQ29sdW1ucywgZ3JpZERhdGEsIHNvcnRLZXksXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFzZXROZXdJdGVtcykgZGF0YSA9IGdyaWREYXRhLnNsaWNlKCk7XG4gICAgbGV0IG5ld0dyaWRJdGVtcyA9IGRhdGEuY29uY2F0KGl0ZW1zKTtcbiAgICBpZiAoc29ydEtleSkgbmV3R3JpZEl0ZW1zID0gbmV3R3JpZEl0ZW1zLnNvcnRCeShpID0+IGkuZ2V0KHNvcnRLZXkpKTtcblxuICAgIHRoaXMucHJvcHMuc2V0RGF0YShncmlkLCBncmlkQ29sdW1ucywgbmV3R3JpZEl0ZW1zKTtcbiAgICB0aGlzLnByb3BzLmNsZWFyU2VsZWN0ZWRJdGVtcyhncmlkKTtcbiAgfTtcblxuICBjb3VudFBhcmVudHMgPSAoc2VsZWN0ZWRLZXksIGNvdW50ZXIpID0+IHtcbiAgICBjb25zdCB7IGlkS2V5LCB0cmVlRGF0YSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBuZXdQYXJlbnQgPSB0aGlzLmdldFRyZWVJdGVtKHNlbGVjdGVkS2V5LCB0cmVlRGF0YSwgdHJ1ZSk7XG4gICAgaWYgKG5ld1BhcmVudCkge1xuICAgICAgcmV0dXJuIHRoaXMuY291bnRQYXJlbnRzKG5ld1BhcmVudFtpZEtleV0sIGNvdW50ZXIgKyAxKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvdW50ZXI7XG4gIH1cblxuICBoYXNMZXZlbFJlYWNoZWRNYXggPSAoc2VsZWN0ZWRMZXZlbCkgPT4ge1xuICAgIGNvbnN0IHsgbWF4TGV2ZWwgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFzZWxlY3RlZExldmVsIHx8ICFtYXhMZXZlbCkgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IG51bWJlck9mUGFyZW50cyA9IHRoaXMuY291bnRQYXJlbnRzKHNlbGVjdGVkTGV2ZWwsIDApO1xuICAgIHJldHVybiBudW1iZXJPZlBhcmVudHMgPj0gbWF4TGV2ZWw7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIHdoZXRoZXIgb3Igbm90IGdpdmVuIG5vZGUgaXMgZGlzYWJsZWRcbiAgICovXG4gIGlzU2VsZWN0ZWREaXNhYmxlZCA9ICgpID0+IHtcbiAgICBjb25zdCB7IGxvY2tlZEtleSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBpdGVtID0gISF0aGlzLmdldFRyZWVJdGVtKHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdKTtcbiAgICBpZiAoIWl0ZW0pIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gaXRlbVtsb2NrZWRLZXldO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZW1vdmVzIHRoZSBjaG9zZW4gaXRlbSBmcm9tIGEgdHJlZSBhbmQgdXBkYXRlcyB0aGUgZ3JpZCB1c2luZyBNT1ZFX0xFQUZcbiAgICogYWN0aW9uXG4gICAqL1xuICBtb3ZlSXRlbVRvR3JpZCA9ICgpID0+IHtcbiAgICBjb25zdCB7IHRyZWVEYXRhLCBvbkNoYW5nZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzZWxlY3RlZEtleSA9IHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdO1xuICAgIGNvbnN0IGFjdGlvbiA9IHtcbiAgICAgIHR5cGU6IFRSRUVfQUNUSU9OUy5NT1ZFX0xFQUYsXG4gICAgICBkYXRhOiB0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXSxcbiAgICB9O1xuICAgIGNvbnN0IG5leHRTZWxlY3RlZEtleSA9IHRoaXMuZ2V0QWRqYWNlbnRJdGVtKHNlbGVjdGVkS2V5KTtcbiAgICBjb25zdCBuZXdHcmlkSXRlbXMgPSBmcm9tSlMoW3RoaXMuZ2V0VHJlZUl0ZW0oc2VsZWN0ZWRLZXkpXSk7XG4gICAgY29uc3QgbmV3SXRlbXMgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKHNlbGVjdGVkS2V5LCB0cmVlRGF0YSwgYWN0aW9uKTtcblxuICAgIHRoaXMuc2V0RGF0YVRvR3JpZChuZXdHcmlkSXRlbXMpO1xuICAgIGlmIChvbkNoYW5nZSkgb25DaGFuZ2UobmV3SXRlbXMpO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2VsZWN0ZWRLZXlzOiBbbmV4dFNlbGVjdGVkS2V5XSxcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogRXhwYW5kcyBhIHBhcmVudFxuICAgKiBAcGFyYW0gcGFyZW50SWRcbiAgICovXG4gIGV4cGFuZFBhcmVudCA9IChwYXJlbnRJZCkgPT4ge1xuICAgIGlmIChwYXJlbnRJZCAmJiAhdGhpcy5zdGF0ZS5leHBhbmRlZEtleXMuZmluZChleHBhbmRlZElkID0+IGV4cGFuZGVkSWQgPT09IHBhcmVudElkKSkge1xuICAgICAgY29uc3QgbmV3RXhwYW5kZWRLZXlzID0gdGhpcy5zdGF0ZS5leHBhbmRlZEtleXMuc2xpY2UoKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgbmV3RXhwYW5kZWRLZXlzLnB1c2gocGFyZW50SWQpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGV4cGFuZGVkS2V5czogbmV3RXhwYW5kZWRLZXlzIH0pO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogQ2xvc2VzIGRlbGV0ZSBjb25maXJtYXRpb24gZGlhbG9nXG4gICAqL1xuICBjbG9zZURlbGV0ZUNvbmZpcm1hdGlvbkRpYWxvZyA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2hvd0RlbGV0ZUNvbmZpcm1hdGlvbjogZmFsc2UgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIERlbGV0ZXMgYSBwYXJlbnQgbm9kZVxuICAgKi9cbiAgZGVsZXRlUGFyZW50ID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgb25DaGFuZ2UsIHRyZWVEYXRhIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHNlbGVjdGVkS2V5ID0gdGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF07XG4gICAgY29uc3QgYWN0aW9uID0ge1xuICAgICAgdHlwZTogVFJFRV9BQ1RJT05TLkRFTEVURV9QQVJFTlQsXG4gICAgfTtcbiAgICBjb25zdCBuZXh0U2VsZWN0ZWRLZXkgPSB0aGlzLmdldEFkamFjZW50SXRlbShzZWxlY3RlZEtleSk7XG4gICAgY29uc3QgbmV3SXRlbXMgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKHNlbGVjdGVkS2V5LCB0cmVlRGF0YSwgYWN0aW9uKTtcbiAgICBpZiAob25DaGFuZ2UpIG9uQ2hhbmdlKG5ld0l0ZW1zKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNlbGVjdGVkS2V5czogW25leHRTZWxlY3RlZEtleV0sXG4gICAgICBzaG93RGVsZXRlQ29uZmlybWF0aW9uOiBmYWxzZSxcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogRGVzZWxlY3RzIGFuIGl0ZW0sIGlmIGl0IGlzIGUuZy4gcmVtb3ZlZFxuICAgKi9cbiAgZGVzZWxlY3RJdGVtID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZEtleXM6IFtdIH0pO1xuICB9O1xuXG4gIHJlbmRlckhlYWRlclJpZ2h0ID0gdHJhbnNsYXRpb25zID0+IChcbiAgICA8Q29udHJvbEJhclxuICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICBvbkFkZE5ld0NsaWNrPXt0aGlzLm9uQWRkTmV3Q2xpY2t9XG4gICAgICBvbkRlbGV0ZUNsaWNrPXt0aGlzLm9uRGVsZXRlQ2xpY2t9XG4gICAgICBvbklucHV0Q2hhbmdlPXt0aGlzLm9uSW5wdXRDaGFuZ2V9XG4gICAgICBzZWxlY3RlZFRyZWVJdGVtPXt0aGlzLmdldFRyZWVJdGVtKHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdKX1cbiAgICAgIGhlaWdodD17QUNUSU9OX0JBUl9DT05UQUlORVJfSEVJR0hUfVxuICAgICAgdHJhbnNsYXRpb25zPXt0cmFuc2xhdGlvbnN9XG4gICAgICBpc0FkZERpc2FibGVkPXt0aGlzLmhhc0xldmVsUmVhY2hlZE1heCh0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXSl9XG4gICAgLz5cbiAgKTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgdmFsdWVLZXksXG4gICAgICBsZWFmVmFsdWVLZXksXG4gICAgICBpZEtleSxcbiAgICAgIHRyZWVEYXRhLFxuICAgICAgZ3JpZCxcbiAgICAgIGdyaWRDb2x1bW5zLFxuICAgICAgY2xhc3NOYW1lLFxuICAgICAgdHJhbnNsYXRpb25zLFxuICAgICAgY2hpbGRLZXksXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBtZXJnZWRHcmlkID0gT2JqZWN0LmFzc2lnbih7fSwgZ3JpZCwgeyBkZWZhdWx0U2hvd0ZpbHRlcmluZ1JvdzogdHJ1ZSB9KTtcbiAgICBjb25zdCBtZXJnZWRUcmFuc2xhdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0VHJhbnNsYXRpb25zLCB0cmFuc2xhdGlvbnMpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxSZWFjdC5GcmFnbWVudD5cbiAgICAgICAgPENvbnRhaW5lciBjbGFzc05hbWU9e2NsYXNzTmFtZX0+XG4gICAgICAgICAgPFRyZWVDb250YWluZXI+XG4gICAgICAgICAgICA8VHJlZUNvbXBvbmVudFxuICAgICAgICAgICAgICB0cmVlRGF0YT17dHJlZURhdGF9XG4gICAgICAgICAgICAgIGRhdGFMb29rVXBLZXk9e2lkS2V5fVxuICAgICAgICAgICAgICBkYXRhTG9va1VwVmFsdWU9e3ZhbHVlS2V5fVxuICAgICAgICAgICAgICBkYXRhTG9va1VwTGVhZlZhbHVlPXtsZWFmVmFsdWVLZXl9XG4gICAgICAgICAgICAgIGRhdGFMb29rVXBDaGlsZHJlbj17Y2hpbGRLZXl9XG4gICAgICAgICAgICAgIG9uU2VsZWN0PXt0aGlzLm9uVHJlZUl0ZW1TZWxlY3R9XG4gICAgICAgICAgICAgIG9uRXhwYW5kPXt0aGlzLm9uRXhwYW5kfVxuICAgICAgICAgICAgICBjaGVja2FibGU9e2ZhbHNlfVxuICAgICAgICAgICAgICBzZWxlY3RlZEtleXM9e3RoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzfVxuICAgICAgICAgICAgICBleHBhbmRlZEtleXM9e3RoaXMuc3RhdGUuZXhwYW5kZWRLZXlzfVxuICAgICAgICAgICAgICBvbk9yZGVyQnV0dG9uQ2xpY2s9e3RoaXMub25PcmRlckNsaWNrfVxuICAgICAgICAgICAgICB0aXRsZT17bWVyZ2VkVHJhbnNsYXRpb25zLnRyZWVUaXRsZX1cbiAgICAgICAgICAgICAgc2VsZWN0YWJsZVxuICAgICAgICAgICAgICBzaG93T3JkZXJpbmdBcnJvd3NcbiAgICAgICAgICAgICAgc2hvd0V4cGFuZEFsbFxuICAgICAgICAgICAgICBoZWFkZXJSaWdodD17dGhpcy5yZW5kZXJIZWFkZXJSaWdodChtZXJnZWRUcmFuc2xhdGlvbnMpfVxuICAgICAgICAgICAgICBoYW5kbGVFeHBhbmRlZEtleXNNYW51YWxseVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L1RyZWVDb250YWluZXI+XG4gICAgICAgICAgPEFycm93Q29udHJvbHNcbiAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgc2VsZWN0ZWRUcmVlSXRlbT17dGhpcy5nZXRUcmVlSXRlbSh0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXSl9XG4gICAgICAgICAgICBvbk1vdmVUb1RyZWVDbGljaz17dGhpcy5vbk1vdmVUb1RyZWVDbGlja31cbiAgICAgICAgICAgIG9uTW92ZVRvR3JpZENsaWNrPXt0aGlzLm9uTW92ZVRvR3JpZENsaWNrfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPEdyaWRcbiAgICAgICAgICAgIGdyaWQ9e21lcmdlZEdyaWR9XG4gICAgICAgICAgICBjb2x1bW5zPXtncmlkQ29sdW1uc31cbiAgICAgICAgICAgIG11bHRpU2VsZWN0XG4gICAgICAgICAgICBmaWx0ZXJpbmdcbiAgICAgICAgICAgIHJvd1NlbGVjdENoZWNrYm94Q29sdW1uXG4gICAgICAgICAgICBncmlkSGVhZGVyPXs8UHJpbWl0aXZlLlN1YnRpdGxlPnttZXJnZWRUcmFuc2xhdGlvbnMuZ3JpZFRpdGxlfTwvUHJpbWl0aXZlLlN1YnRpdGxlPn1cbiAgICAgICAgICAvPlxuICAgICAgICA8L0NvbnRhaW5lcj5cbiAgICAgICAge3RoaXMuc3RhdGUuc2hvd0RlbGV0ZUNvbmZpcm1hdGlvbiAmJiAoXG4gICAgICAgICAgPENvbmZpcm1EaWFsb2dcbiAgICAgICAgICAgIHRyYW5zbGF0aW9ucz17bWVyZ2VkVHJhbnNsYXRpb25zLmRlbGV0ZUNvbmZpcm1EaWFsb2d9XG4gICAgICAgICAgICBjb25maXJtQ2FsbGJhY2s9e3RoaXMuZGVsZXRlUGFyZW50fVxuICAgICAgICAgICAgY2FuY2VsQ2FsbGJhY2s9e3RoaXMuY2xvc2VEZWxldGVDb25maXJtYXRpb25EaWFsb2d9XG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cbiAgICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gICAgKTtcbiAgfVxufVxuIl19