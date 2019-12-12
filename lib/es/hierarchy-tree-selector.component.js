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
  maxLevel: 0
}), _temp)) || _class);
export { HierarchyTreeSelector as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlRyZWVDb21wb25lbnQiLCJQcmltaXRpdmUiLCJEYXRhZ3JpZCIsImdyaWRTaGFwZSIsImdyaWRDb2x1bW5TaGFwZSIsIkRhdGFncmlkQWN0aW9ucyIsIkNvbmZpcm1EaWFsb2ciLCJSZWFjdCIsInN0eWxlZCIsIkxpc3QiLCJmcm9tSlMiLCJJbW11dGFibGVQcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJjb25uZWN0IiwiQ29udHJvbEJhciIsIkFycm93Q29udHJvbHMiLCJkZWZhdWx0VHJhbnNsYXRpb25zIiwiQUNUSU9OX0JBUl9DT05UQUlORVJfSEVJR0hUIiwiVFJFRV9BQ1RJT05TIiwiQUREX0NISUxEUkVOIiwiTU9WRV9MRUFGIiwiUkVOQU1FX1BBUkVOVCIsIkRFTEVURV9QQVJFTlQiLCJHcmlkIiwiQ29udGFpbmVyIiwiZGl2IiwiVHJlZUNvbnRhaW5lciIsInByb3BzIiwidGhlbWUiLCJndXR0ZXJXaWR0aCIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsInNldERhdGEiLCJjbGVhclNlbGVjdGVkSXRlbXMiLCJtYXBTdGF0ZVRvUHJvcHMiLCJzdGF0ZSIsImdyaWRJZCIsImdyaWQiLCJpZCIsInNlbGVjdGVkR3JpZEl0ZW1zIiwiZGF0YWdyaWQiLCJnZXRJbiIsImdyaWREYXRhIiwiSGllcmFyY2h5VHJlZVNlbGVjdG9yIiwic2VsZWN0ZWRLZXlzIiwib25TZWxlY3QiLCJsb2NrZWRLZXkiLCJzZWxlY3RlZEl0ZW0iLCJnZXRUcmVlSXRlbSIsInNldFN0YXRlIiwiY2hpbGRLZXkiLCJvblByZXZlbnREZWxldGUiLCJpdGVtIiwibW92ZUl0ZW1Ub0dyaWQiLCJsZWFmcyIsImdldEFsbExlYWZzIiwiZmluZCIsImxlYWYiLCJzaG93RGVsZXRlQ29uZmlybWF0aW9uIiwiZGF0YSIsImNhbGxiYWNrIiwib25DaGFuZ2UiLCJ0cmVlRGF0YSIsImlkS2V5IiwibmV3SXRlbXMiLCJzbGljZSIsInB1c2giLCJhY3Rpb24iLCJ0eXBlIiwiZ2V0VXBkYXRlZFRyZWUiLCJwYXJlbnQiLCJleHBhbmRQYXJlbnQiLCJpdGVtcyIsInNlbGVjdGVkSWQiLCJmaWx0ZXIiLCJpIiwiaW5jbHVkZXMiLCJnZXQiLCJ0b0pTIiwibmV3R3JpZEl0ZW1zIiwic2V0RGF0YVRvR3JpZCIsInZhbHVlIiwiaWRzIiwiZXhwYW5kZWRLZXlzIiwiYXJyYXkiLCJpc1NlbGVjdGVkRGlzYWJsZWQiLCJmb3VuZCIsInZhbHVlS2V5IiwicmVtb3ZlQWN0aW9ucyIsInJvb3RJdGVtIiwibGVuZ3RoIiwiZGVzZWxlY3RJdGVtIiwiY2hpbGQiLCJmaWx0ZXJlZENoaWxkcmVuIiwiY2hpbGRJdGVtIiwiY29uY2F0IiwiVHlwZUVycm9yIiwiYWxyZWFkeUZvdW5kIiwicmV0dXJuUGFyZW50IiwiZm9yRWFjaCIsImdldEFkamFjZW50SXRlbUlkIiwicGFyZW50QXJyIiwiQXJyYXkiLCJpc0FycmF5IiwiaW5kZXgiLCJmaW5kSW5kZXgiLCJhZGphY2VudEl0ZW0iLCJzZXROZXdJdGVtcyIsImdyaWRDb2x1bW5zIiwic29ydEtleSIsInNvcnRCeSIsInNlbGVjdGVkS2V5IiwiY291bnRlciIsIm5ld1BhcmVudCIsImNvdW50UGFyZW50cyIsInNlbGVjdGVkTGV2ZWwiLCJtYXhMZXZlbCIsIm51bWJlck9mUGFyZW50cyIsIm5leHRTZWxlY3RlZEtleSIsImdldEFkamFjZW50SXRlbSIsInBhcmVudElkIiwiZXhwYW5kZWRJZCIsIm5ld0V4cGFuZGVkS2V5cyIsInRyYW5zbGF0aW9ucyIsIm9uQWRkTmV3Q2xpY2siLCJvbkRlbGV0ZUNsaWNrIiwib25JbnB1dENoYW5nZSIsImhhc0xldmVsUmVhY2hlZE1heCIsImNvbXBvbmVudERpZE1vdW50IiwiZGVmYXVsdEV4cGFuZGVkS2V5cyIsIm9uRXhwYW5kIiwicmVuZGVyIiwibGVhZlZhbHVlS2V5IiwiY2xhc3NOYW1lIiwibWVyZ2VkR3JpZCIsIk9iamVjdCIsImFzc2lnbiIsImRlZmF1bHRTaG93RmlsdGVyaW5nUm93IiwibWVyZ2VkVHJhbnNsYXRpb25zIiwib25UcmVlSXRlbVNlbGVjdCIsIm9uT3JkZXJDbGljayIsInRyZWVUaXRsZSIsInJlbmRlckhlYWRlclJpZ2h0Iiwib25Nb3ZlVG9UcmVlQ2xpY2siLCJvbk1vdmVUb0dyaWRDbGljayIsImdyaWRUaXRsZSIsImRlbGV0ZUNvbmZpcm1EaWFsb2ciLCJkZWxldGVQYXJlbnQiLCJjbG9zZURlbGV0ZUNvbmZpcm1hdGlvbkRpYWxvZyIsIlB1cmVDb21wb25lbnQiLCJ1bmRlZmluZWQiLCJkZWZhdWx0RXhwYW5kQWxsIiwic2luZ2xlUm9vdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBT0EsYUFBUCxNQUEwQixrQ0FBMUI7QUFDQSxTQUFTQyxTQUFULFFBQTBCLGtDQUExQjtBQUNBLFNBQ0VDLFFBREYsRUFDWUMsU0FEWixFQUN1QkMsZUFEdkIsRUFDd0NDLGVBRHhDLFFBRU8sd0JBRlA7QUFHQSxPQUFPQyxhQUFQLE1BQTBCLHVDQUExQjtBQUNBLE9BQU9DLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxNQUFQLE1BQW1CLG1CQUFuQjtBQUNBLFNBQVNDLElBQVQsRUFBZUMsTUFBZixRQUE2QixXQUE3QjtBQUNBLE9BQU9DLGtCQUFQLE1BQStCLDJCQUEvQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxTQUFTQyxPQUFULFFBQXdCLGFBQXhCLEMsQ0FFQTs7QUFDQSxPQUFPQyxVQUFQLE1BQXVCLGlEQUF2QjtBQUNBLE9BQU9DLGFBQVAsTUFBMEIsb0RBQTFCO0FBQ0EsU0FBU0MsbUJBQVQsUUFBb0Msd0JBQXBDO0FBRUEsSUFBTUMsMkJBQTJCLEdBQUcsTUFBcEM7QUFDQSxJQUFNQyxZQUFZLEdBQUc7QUFDbkJDLEVBQUFBLFlBQVksRUFBRSxjQURLO0FBRW5CQyxFQUFBQSxTQUFTLEVBQUUsV0FGUTtBQUdu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QUFBQSxRQUFRLEVBQUV5RixTQVpVO0FBYXBCbkcsRUFBQUEsZUFBZSxFQUFFbUcsU0FiRztBQWNwQkMsRUFBQUEsZ0JBQWdCLEVBQUUsSUFkRTtBQWVwQnRCLEVBQUFBLG1CQUFtQixFQUFFLEVBZkQ7QUFnQnBCdUIsRUFBQUEsVUFBVSxFQUFFLElBaEJRO0FBaUJwQnBDLEVBQUFBLFFBQVEsRUFBRTtBQWpCVSxDO1NBNUJIekUscUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVHJlZUNvbXBvbmVudCBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC10cmVlLWNvbXBvbmVudCc7XG5pbXBvcnQgeyBQcmltaXRpdmUgfSBmcm9tICdAb3B1c2NhcGl0YS9vYy1jbS1jb21tb24tbGF5b3V0cyc7XG5pbXBvcnQge1xuICBEYXRhZ3JpZCwgZ3JpZFNoYXBlLCBncmlkQ29sdW1uU2hhcGUsIERhdGFncmlkQWN0aW9ucyxcbn0gZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtZ3JpZCc7XG5pbXBvcnQgQ29uZmlybURpYWxvZyBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1jb25maXJtYXRpb24tZGlhbG9nJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCB7IExpc3QsIGZyb21KUyB9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgSW1tdXRhYmxlUHJvcFR5cGVzIGZyb20gJ3JlYWN0LWltbXV0YWJsZS1wcm9wdHlwZXMnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbi8vIEFwcCBpbXBvcnRzXG5pbXBvcnQgQ29udHJvbEJhciBmcm9tICcuL2hpZXJhcmNoeS10cmVlLXNlbGVjdG9yLWNvbnRyb2wtYmFyLmNvbXBvbmVudCc7XG5pbXBvcnQgQXJyb3dDb250cm9scyBmcm9tICcuL2hpZXJhcmNoeS10cmVlLXNlbGVjdG9yLWFycm93LWNvbnRyb2xzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBkZWZhdWx0VHJhbnNsYXRpb25zIH0gZnJvbSAnLi9oaWVyYXJjaHktdHJlZS51dGlscyc7XG5cbmNvbnN0IEFDVElPTl9CQVJfQ09OVEFJTkVSX0hFSUdIVCA9ICc1NHB4JztcbmNvbnN0IFRSRUVfQUNUSU9OUyA9IHtcbiAgQUREX0NISUxEUkVOOiAnQUREX0NISUxEUkVOJyxcbiAgTU9WRV9MRUFGOiAnTU9WRV9MRUFGJyxcbiAgUkVOQU1FX1BBUkVOVDogJ1JFTkFNRV9QQVJFTlQnLFxuICBERUxFVEVfUEFSRU5UOiAnREVMRVRFX1BBUkVOVCcsXG59O1xuXG5jb25zdCBHcmlkID0gc3R5bGVkKERhdGFncmlkKWBcbiAgaGVpZ2h0OiAxMDAlO1xuICAmJiYge1xuICAgIHBhZGRpbmc6IDA7XG4gIH1cbmA7XG5cbmNvbnN0IENvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIG1pbi1oZWlnaHQ6IDMwMHB4O1xuICA+IGRpdiB7XG4gICAgd2lkdGg6IDUwJTtcbiAgICBmbGV4OiAxIDEgMTAwJTtcbiAgfVxuYDtcblxuY29uc3QgVHJlZUNvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gIGhlaWdodDogMTAwJTtcbiAgLm9jLXNjcm9sbGJhci1jb250YWluZXIge1xuICAgIGhlaWdodDogY2FsYygxMDAlIC0gJHtBQ1RJT05fQkFSX0NPTlRBSU5FUl9IRUlHSFR9KTtcbiAgICBwYWRkaW5nOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmd1dHRlcldpZHRofTtcbiAgfVxuICAudHJlZS1oZWFkZXIge1xuICAgIG1pbi1oZWlnaHQ6ICR7QUNUSU9OX0JBUl9DT05UQUlORVJfSEVJR0hUfTtcbiAgICAub3JkZXJpbmctYXJyb3dzIHtcbiAgICAgIGZvbnQtd2VpZ2h0OiAyNHB4O1xuICAgIH1cbiAgfVxuICAub2MtcmVhY3QtdHJlZSB7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIC5yYy10cmVlLWljb25FbGUucmMtdHJlZS1pY29uX19jdXN0b21pemUge1xuICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG4gIH1cbmA7XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IHtcbiAgc2V0RGF0YTogRGF0YWdyaWRBY3Rpb25zLnNldERhdGEsXG4gIGNsZWFyU2VsZWN0ZWRJdGVtczogRGF0YWdyaWRBY3Rpb25zLmNsZWFyU2VsZWN0ZWRJdGVtcyxcbn07XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSwgcHJvcHMpID0+IHtcbiAgY29uc3QgZ3JpZElkID0gcHJvcHMuZ3JpZC5pZDtcbiAgcmV0dXJuIHtcbiAgICBzZWxlY3RlZEdyaWRJdGVtczogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW2dyaWRJZCwgJ3NlbGVjdGVkSXRlbXMnXSwgTGlzdCgpKSxcbiAgICBncmlkRGF0YTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW2dyaWRJZCwgJ2FsbERhdGEnXSwgTGlzdCgpKSxcbiAgfTtcbn07XG5cbkBjb25uZWN0KFxuICBtYXBTdGF0ZVRvUHJvcHMsXG4gIG1hcERpc3BhdGNoVG9Qcm9wcyxcbilcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhpZXJhcmNoeVRyZWVTZWxlY3RvciBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGlkS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHZhbHVlS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNoaWxkS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGxvY2tlZEtleTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBsZWFmVmFsdWVLZXk6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgc29ydEtleTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB0cmVlRGF0YTogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnNoYXBlKHt9KSksXG4gICAgZ3JpZDogZ3JpZFNoYXBlLmlzUmVxdWlyZWQsXG4gICAgZ3JpZENvbHVtbnM6IFByb3BUeXBlcy5hcnJheU9mKGdyaWRDb2x1bW5TaGFwZSkuaXNSZXF1aXJlZCxcbiAgICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgc2V0RGF0YTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBjbGVhclNlbGVjdGVkSXRlbXM6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgc2VsZWN0ZWRHcmlkSXRlbXM6IEltbXV0YWJsZVByb3BUeXBlcy5saXN0LmlzUmVxdWlyZWQsXG4gICAgZ3JpZERhdGE6IEltbXV0YWJsZVByb3BUeXBlcy5saXN0LmlzUmVxdWlyZWQsXG4gICAgdHJhbnNsYXRpb25zOiBQcm9wVHlwZXMuc2hhcGUoe30pLFxuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRlZmF1bHRFeHBhbmRBbGw6IFByb3BUeXBlcy5ib29sLFxuICAgIGRlZmF1bHRFeHBhbmRlZEtleXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcpLFxuICAgIHNpbmdsZVJvb3Q6IFByb3BUeXBlcy5ib29sLFxuICAgIG1heExldmVsOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIC8vIENhbGxiYWNrc1xuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25QcmV2ZW50RGVsZXRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGlkS2V5OiAnaWQnLFxuICAgIHZhbHVlS2V5OiAnbmFtZScsXG4gICAgY2hpbGRLZXk6ICdjaGlsZHJlbicsXG4gICAgbG9ja2VkS2V5OiB1bmRlZmluZWQsXG4gICAgbGVhZlZhbHVlS2V5OiB1bmRlZmluZWQsXG4gICAgc29ydEtleTogdW5kZWZpbmVkLFxuICAgIHRyZWVEYXRhOiBbXSxcbiAgICBjbGFzc05hbWU6ICcnLFxuICAgIHRyYW5zbGF0aW9uczogZGVmYXVsdFRyYW5zbGF0aW9ucyxcbiAgICBpZDogJ2hpZXJhcmNoeS10cmVlJyxcbiAgICBvblNlbGVjdDogdW5kZWZpbmVkLFxuICAgIG9uQ2hhbmdlOiB1bmRlZmluZWQsXG4gICAgb25QcmV2ZW50RGVsZXRlOiB1bmRlZmluZWQsXG4gICAgZGVmYXVsdEV4cGFuZEFsbDogdHJ1ZSxcbiAgICBkZWZhdWx0RXhwYW5kZWRLZXlzOiBbXSxcbiAgICBzaW5nbGVSb290OiB0cnVlLFxuICAgIG1heExldmVsOiAwLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzZWxlY3RlZEtleXM6IFtdLFxuICAgICAgZXhwYW5kZWRLZXlzOiBbXSxcbiAgICAgIHNob3dEZWxldGVDb25maXJtYXRpb246IGZhbHNlLFxuICAgIH07XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5kZWZhdWx0RXhwYW5kZWRLZXlzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMub25FeHBhbmQodGhpcy5wcm9wcy5kZWZhdWx0RXhwYW5kZWRLZXlzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0cyBhIHRyZWUgaXRlbVxuICAgKiBAcGFyYW0gc2VsZWN0ZWRLZXlzIChhcnJheSlcbiAgICovXG4gIG9uVHJlZUl0ZW1TZWxlY3QgPSAoc2VsZWN0ZWRLZXlzKSA9PiB7XG4gICAgY29uc3QgeyBvblNlbGVjdCwgbG9ja2VkS2V5IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHNlbGVjdGVkSXRlbSA9IHRoaXMuZ2V0VHJlZUl0ZW0oc2VsZWN0ZWRLZXlzWzBdKTtcbiAgICBpZiAobG9ja2VkS2V5ICYmIHNlbGVjdGVkSXRlbSAmJiBzZWxlY3RlZEl0ZW1bbG9ja2VkS2V5XSkgcmV0dXJuO1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZEtleXMgfSwgKCkgPT4ge1xuICAgICAgaWYgKG9uU2VsZWN0KSBvblNlbGVjdChzZWxlY3RlZEtleXMpO1xuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBEaXNwbGF5cyBhIGNvbmZpcm1hdGlvbiBkaWFsb2dcbiAgICovXG4gIG9uRGVsZXRlQ2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBjaGlsZEtleSwgbG9ja2VkS2V5LCBvblByZXZlbnREZWxldGUgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgaXRlbSA9IHRoaXMuZ2V0VHJlZUl0ZW0odGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF0pO1xuICAgIC8vIElmIGl0ZW0gaXMgbm90IGEgcGFyZW50LCB3ZSB3b24ndCBzaG93IHRoZSBkZWxldGUgY29uZmlybWF0aW9uIGRpYWxvZ1xuICAgIGlmICghaXRlbVtjaGlsZEtleV0pIHtcbiAgICAgIHRoaXMubW92ZUl0ZW1Ub0dyaWQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAobG9ja2VkS2V5KSB7XG4gICAgICAvLyBJZiBpdCBpcyBhIHBhcmVudCwgd2Ugd2FudCB0byBjaGVjayB0aGF0IGl0IGRvZXNuJ3QgY29udGFpbiBhbnkgbG9ja2VkIGl0ZW1zXG4gICAgICBjb25zdCBsZWFmcyA9IHRoaXMuZ2V0QWxsTGVhZnMoaXRlbVtjaGlsZEtleV0pO1xuICAgICAgaWYgKGxlYWZzLmZpbmQobGVhZiA9PiBsZWFmW2xvY2tlZEtleV0pICYmIG9uUHJldmVudERlbGV0ZSkge1xuICAgICAgICBvblByZXZlbnREZWxldGUoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuc2V0U3RhdGUoeyBzaG93RGVsZXRlQ29uZmlybWF0aW9uOiB0cnVlIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBZGRzIGEgbmV3IG5vZGUgdG8gdGhlIHJvb3Qgb2YgdGhlIHRyZWUsIG9yIHVuZGVyIGEgc2VsZWN0ZWQgdHJlZSBub2RlIHVzaW5nXG4gICAqIEFERF9DSElMRFJFTiBhY3Rpb25cbiAgICogQHBhcmFtIGRhdGEgLSBkYXRhIHRvIGJlIGFkZGVkXG4gICAqIEBwYXJhbSBjYWxsYmFja1xuICAgKi9cbiAgb25BZGROZXdDbGljayA9IChkYXRhLCBjYWxsYmFjaykgPT4ge1xuICAgIGNvbnN0IHsgb25DaGFuZ2UsIHRyZWVEYXRhLCBpZEtleSB9ID0gdGhpcy5wcm9wcztcbiAgICBsZXQgbmV3SXRlbXMgPSB0cmVlRGF0YS5zbGljZSgpO1xuXG4gICAgLy8gSWYgbm8gdHJlZSBub2RlIGlzIHNlbGVjdGVkLCB3ZSdsbCBwbGFjZSB0aGUgbmV3IGl0ZW0gdG8gdGhlIHJvb3RcbiAgICAvLyBvZiB0aGUgdHJlZVxuICAgIGlmICghdGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF0pIHtcbiAgICAgIG5ld0l0ZW1zLnB1c2goZGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGFjdGlvbiA9IHtcbiAgICAgICAgdHlwZTogVFJFRV9BQ1RJT05TLkFERF9DSElMRFJFTixcbiAgICAgICAgZGF0YSxcbiAgICAgIH07XG4gICAgICBuZXdJdGVtcyA9IHRoaXMuZ2V0VXBkYXRlZFRyZWUodGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF0sIHRyZWVEYXRhLCBhY3Rpb24pO1xuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRLZXlzOiBbZGF0YVtpZEtleV1dIH0sICgpID0+IHtcbiAgICAgIC8vIElmIHRoZSBwYXJlbnQgaXMgbm90IHlldCBleHBhbmRlZCwgd2Ugd2lsbCBleHBhbmQgaXQgbm93XG4gICAgICBjb25zdCBwYXJlbnQgPSB0aGlzLmdldFRyZWVJdGVtKGRhdGFbaWRLZXldLCB0cmVlRGF0YSwgdHJ1ZSkgfHwge307XG4gICAgICB0aGlzLmV4cGFuZFBhcmVudChwYXJlbnRbaWRLZXldKTtcblxuICAgICAgaWYgKG9uQ2hhbmdlKSBvbkNoYW5nZShuZXdJdGVtcyk7XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH0pO1xuICB9O1xuXG4gIG9uTW92ZVRvR3JpZENsaWNrID0gKCkgPT4ge1xuICAgIHRoaXMubW92ZUl0ZW1Ub0dyaWQoKTtcbiAgfTtcblxuICAvKipcbiAgICogQ2FsbHMgb25DaGFuZ2UgY2FsbGJhY2sgd2hlbmV2ZXIgdXNlciByZW9yZGVycyB0cmVlIGl0ZW1zIHVzaW5nIG9yZGVyaW5nIGFycm93c1xuICAgKiBAcGFyYW0gaXRlbXNcbiAgICovXG4gIG9uT3JkZXJDbGljayA9IChpdGVtcykgPT4ge1xuICAgIHRoaXMucHJvcHMub25DaGFuZ2UoaXRlbXMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBZGRzIHNlbGVjdGVkIGdyaWQgaXRlbXMgdG8gdGhlIGNob3NlbiB0cmVlIG5vZGUgdXNpbmcgQUREX0NISUxEUkVOIGFjdGlvblxuICAgKi9cbiAgb25Nb3ZlVG9UcmVlQ2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgb25DaGFuZ2UsIHNlbGVjdGVkR3JpZEl0ZW1zLCBncmlkRGF0YSwgdHJlZURhdGEsIGlkS2V5LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHNlbGVjdGVkSWQgPSB0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXTtcblxuICAgIGNvbnN0IGFjdGlvbiA9IHtcbiAgICAgIHR5cGU6IFRSRUVfQUNUSU9OUy5BRERfQ0hJTERSRU4sXG4gICAgICBkYXRhOiBncmlkRGF0YS5maWx0ZXIoaSA9PiBzZWxlY3RlZEdyaWRJdGVtcy5pbmNsdWRlcyhpLmdldChpZEtleSkpKS50b0pTKCksXG4gICAgfTtcbiAgICBjb25zdCBuZXdJdGVtcyA9IHRoaXMuZ2V0VXBkYXRlZFRyZWUoc2VsZWN0ZWRJZCwgdHJlZURhdGEsIGFjdGlvbik7XG4gICAgY29uc3QgbmV3R3JpZEl0ZW1zID0gZ3JpZERhdGEuZmlsdGVyKGl0ZW0gPT4gIXNlbGVjdGVkR3JpZEl0ZW1zLmluY2x1ZGVzKGl0ZW0uZ2V0KGlkS2V5KSkpO1xuXG4gICAgdGhpcy5leHBhbmRQYXJlbnQoc2VsZWN0ZWRJZCwgdHJ1ZSk7XG4gICAgdGhpcy5zZXREYXRhVG9HcmlkKG5ld0dyaWRJdGVtcywgdHJ1ZSk7XG4gICAgaWYgKG9uQ2hhbmdlKSBvbkNoYW5nZShuZXdJdGVtcyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlbmFtZXMgdGhlIGNob3NlbiB0cmVlIG5vZGUgdXNpbmcgYSBSRU5BTUVfUEFSRU5UIGFjdGlvblxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICovXG4gIG9uSW5wdXRDaGFuZ2UgPSAodmFsdWUpID0+IHtcbiAgICBjb25zdCB7IHRyZWVEYXRhLCBvbkNoYW5nZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBhY3Rpb24gPSB7XG4gICAgICB0eXBlOiBUUkVFX0FDVElPTlMuUkVOQU1FX1BBUkVOVCxcbiAgICAgIGRhdGE6IHZhbHVlLFxuICAgIH07XG4gICAgY29uc3QgbmV3SXRlbXMgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdLCB0cmVlRGF0YSwgYWN0aW9uKTtcbiAgICBpZiAob25DaGFuZ2UpIG9uQ2hhbmdlKG5ld0l0ZW1zKTtcbiAgfTtcblxuICAvKipcbiAgICogRmlyZWQgb24gZXhwYW5kXG4gICAqIEBwYXJhbSBpZHNcbiAgICovXG4gIG9uRXhwYW5kID0gKGlkcykgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZXhwYW5kZWRLZXlzOiBpZHMsXG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdXBkYXRlZCB0cmVlIGl0ZW1zLlxuICAgKiBAcGFyYW0gaWQgLSB0YXJnZXQgaXRlbVxuICAgKiBAcGFyYW0gYXJyYXkgLSBhcnJheSB3aGVyZSB0YXJnZXQgaXRlbSBpcyBiZWluZyBzZWFyY2hlZFxuICAgKiBAcGFyYW0gYWN0aW9uIC0gYWN0aW9uIHRvIGJlIHBlcmZvcm1lZCB7dHlwZSwgZGF0YX1cbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBnZXRVcGRhdGVkVHJlZSA9IChpZCwgYXJyYXkgPSB0aGlzLnByb3BzLnRyZWVEYXRhLCBhY3Rpb24pID0+IHtcbiAgICBpZiAodGhpcy5pc1NlbGVjdGVkRGlzYWJsZWQoKSkgcmV0dXJuIGFycmF5O1xuXG4gICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgY29uc3QgeyBpZEtleSwgY2hpbGRLZXksIHZhbHVlS2V5IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IG5ld0l0ZW1zID0gYXJyYXkuc2xpY2UoKTtcbiAgICBjb25zdCByZW1vdmVBY3Rpb25zID0gW1RSRUVfQUNUSU9OUy5NT1ZFX0xFQUYsIFRSRUVfQUNUSU9OUy5ERUxFVEVfUEFSRU5UXTtcblxuICAgIC8vIElmIGRlbGV0ZWQgcGFyZW50IGl0ZW0gaXMgaW4gdGhlIHJvb3Qgbm9kZVxuICAgIGlmIChhY3Rpb24udHlwZSA9PT0gVFJFRV9BQ1RJT05TLkRFTEVURV9QQVJFTlQpIHtcbiAgICAgIGNvbnN0IHJvb3RJdGVtID0gYXJyYXkuZmluZChpdGVtID0+IGl0ZW1baWRLZXldID09PSBpZCk7XG4gICAgICBpZiAocm9vdEl0ZW0pIHtcbiAgICAgICAgaWYgKHJvb3RJdGVtW2NoaWxkS2V5XS5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLnNldERhdGFUb0dyaWQoZnJvbUpTKHRoaXMuZ2V0QWxsTGVhZnMocm9vdEl0ZW1bY2hpbGRLZXldKSkpO1xuICAgICAgICAgIHRoaXMuZGVzZWxlY3RJdGVtKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ld0l0ZW1zLmZpbHRlcihpdGVtID0+IGl0ZW1baWRLZXldICE9PSBpZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdJdGVtcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3QgaXRlbSA9IG5ld0l0ZW1zW2ldO1xuICAgICAgaWYgKHJlbW92ZUFjdGlvbnMuaW5jbHVkZXMoYWN0aW9uLnR5cGUpICYmIGl0ZW1bY2hpbGRLZXldICYmICFmb3VuZCkge1xuICAgICAgICBmb3VuZCA9ICEhaXRlbVtjaGlsZEtleV0uZmluZChjaGlsZCA9PiBjaGlsZFtpZEtleV0gPT09IGlkKTtcbiAgICAgICAgaWYgKGZvdW5kKSB7XG4gICAgICAgICAgLy8gV2hlbiByZW1vdmluZyBhbiBpdGVtIHdlIG11c3QgZmlyc3QgZmluZCBpdHMgcGFyZW50IGFuZCBhbHRlciBpdHMgY2hpbGRyZW4gYXJyYXlcbiAgICAgICAgICBpZiAoYWN0aW9uLnR5cGUgPT09IFRSRUVfQUNUSU9OUy5NT1ZFX0xFQUYpIHtcbiAgICAgICAgICAgIGl0ZW1bY2hpbGRLZXldID0gaXRlbVtjaGlsZEtleV0uZmlsdGVyKGNoaWxkID0+IGNoaWxkW2lkS2V5XSAhPT0gaWQpO1xuICAgICAgICAgICAgdGhpcy5kZXNlbGVjdEl0ZW0oKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGFjdGlvbi50eXBlID09PSBUUkVFX0FDVElPTlMuREVMRVRFX1BBUkVOVCkge1xuICAgICAgICAgICAgLy8gd2UgbXVzdCBmaXJzdCBmaWx0ZXIgdGhlIGNoaWxkcmVuLCBzbyB0aGF0IHdlIHdvbid0IGdldCBsZWFmcyBmcm9tXG4gICAgICAgICAgICAvLyBvdGhlciBjaGlsZCBicmFuY2hlc1xuICAgICAgICAgICAgY29uc3QgZmlsdGVyZWRDaGlsZHJlbiA9IGl0ZW1bY2hpbGRLZXldLmZpbHRlcihjaGlsZEl0ZW0gPT4gY2hpbGRJdGVtW2lkS2V5XSA9PT0gaWQpO1xuICAgICAgICAgICAgdGhpcy5zZXREYXRhVG9HcmlkKGZyb21KUyh0aGlzLmdldEFsbExlYWZzKGZpbHRlcmVkQ2hpbGRyZW4pKSk7XG4gICAgICAgICAgICB0aGlzLmRlc2VsZWN0SXRlbSgpO1xuICAgICAgICAgICAgaXRlbVtjaGlsZEtleV0gPSBpdGVtW2NoaWxkS2V5XS5maWx0ZXIoY2hpbGRJdGVtID0+IGNoaWxkSXRlbVtpZEtleV0gIT09IGlkKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1baWRLZXldID09PSBpZCAmJiAhZm91bmQpIHtcbiAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgICAgY2FzZSBUUkVFX0FDVElPTlMuQUREX0NISUxEUkVOOlxuICAgICAgICAgICAgaXRlbVtjaGlsZEtleV0gPSAoaXRlbVtjaGlsZEtleV0gfHwgW10pLmNvbmNhdChhY3Rpb24uZGF0YSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIFRSRUVfQUNUSU9OUy5SRU5BTUVfUEFSRU5UOlxuICAgICAgICAgICAgaXRlbVt2YWx1ZUtleV0gPSBhY3Rpb24uZGF0YTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBY3Rpb24gdHlwZSBpcyB1bmRlZmluZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtW2NoaWxkS2V5XSAmJiAhZm91bmQpIGZvdW5kID0gdGhpcy5nZXRVcGRhdGVkVHJlZShpZCwgaXRlbVtjaGlsZEtleV0sIGFjdGlvbik7XG4gICAgfVxuXG4gICAgaWYgKCFmb3VuZCkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiBuZXdJdGVtcztcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyByZWN1cnNpdmVseSBhbGwgbGVhZiBpdGVtcyBmcm9tIGEgZ2l2ZW4gYXJyYXlcbiAgICogQHBhcmFtIGFycmF5XG4gICAqIEBwYXJhbSBhbHJlYWR5Rm91bmQgKHVzZWQgcmVjdXJzaXZlbHkpXG4gICAqL1xuICBnZXRBbGxMZWFmcyA9IChhcnJheSwgYWxyZWFkeUZvdW5kID0gW10pID0+IHtcbiAgICBjb25zdCB7IGNoaWxkS2V5IH0gPSB0aGlzLnByb3BzO1xuICAgIGxldCBsZWFmcyA9IGFscmVhZHlGb3VuZDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSBhcnJheVtpXTtcbiAgICAgIGlmIChpdGVtW2NoaWxkS2V5XSkge1xuICAgICAgICBsZWFmcyA9IHRoaXMuZ2V0QWxsTGVhZnMoaXRlbVtjaGlsZEtleV0sIGFscmVhZHlGb3VuZCk7XG4gICAgICB9XG4gICAgICBpZiAoIWl0ZW1bY2hpbGRLZXldKSBsZWFmcy5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgICByZXR1cm4gbGVhZnM7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSB0cmVlIGl0ZW0gYnkgSURcbiAgICogQHBhcmFtIGlkXG4gICAqIEBwYXJhbSBhcnJheVxuICAgKiBAcGFyYW0gcmV0dXJuUGFyZW50IC0gcmV0dXJuIGl0ZW0ncyBwYXJlbnQgaW5zdGVhZCBvZiB0aGUgaXRlbVxuICAgKiBAcGFyYW0gcGFyZW50IC0gcGFyZW50IGl0ZW0gKHVzZWQgcmVjdXJzaXZlbHkpXG4gICAqIEByZXR1cm5zIHt7fX1cbiAgICovXG4gIGdldFRyZWVJdGVtID0gKGlkLCBhcnJheSA9IHRoaXMucHJvcHMudHJlZURhdGEsIHJldHVyblBhcmVudCA9IGZhbHNlLCBwYXJlbnQgPSBudWxsKSA9PiB7XG4gICAgY29uc3QgeyBjaGlsZEtleSwgaWRLZXkgfSA9IHRoaXMucHJvcHM7XG4gICAgbGV0IGZvdW5kID0gYXJyYXkuZmluZChpdGVtID0+IGl0ZW1baWRLZXldID09PSBpZCk7XG5cbiAgICBpZiAoZm91bmQgJiYgcmV0dXJuUGFyZW50KSBmb3VuZCA9IHBhcmVudDtcblxuICAgIGlmICghZm91bmQpIHtcbiAgICAgIGFycmF5LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgaWYgKGl0ZW1bY2hpbGRLZXldICYmICFmb3VuZCkge1xuICAgICAgICAgIGZvdW5kID0gdGhpcy5nZXRUcmVlSXRlbShpZCwgaXRlbVtjaGlsZEtleV0sIHJldHVyblBhcmVudCwgaXRlbSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gZm91bmQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIEdldCBhZGphY2VudCBpdGVtIChpZCkgaW4gcGFyZW50IGFycmF5LiBVc2VkIHdoZW4gbW92aW5nIGl0ZW1zIGZyb20gdHJlZVxuICAgKiB0byBncmlkL2RlbGV0aW5nIGFuIGl0ZW1cbiAgICogQHBhcmFtIGlkXG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgZ2V0QWRqYWNlbnRJdGVtID0gKGlkKSA9PiB7XG4gICAgaWYgKCFpZCkgcmV0dXJuIG51bGw7XG4gICAgY29uc3QgeyBjaGlsZEtleSwgaWRLZXksIHRyZWVEYXRhIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgZ2V0QWRqYWNlbnRJdGVtSWQgPSAocGFyZW50KSA9PiB7XG4gICAgICBjb25zdCBwYXJlbnRBcnIgPSBBcnJheS5pc0FycmF5KHBhcmVudCkgPyBwYXJlbnQgOiBwYXJlbnRbY2hpbGRLZXldO1xuICAgICAgY29uc3QgaW5kZXggPSBwYXJlbnRBcnIuZmluZEluZGV4KGNoaWxkID0+IGNoaWxkW2lkS2V5XSA9PT0gaWQpO1xuICAgICAgbGV0IGFkamFjZW50SXRlbSA9IHBhcmVudEFycltpbmRleCArIDFdO1xuICAgICAgaWYgKCFhZGphY2VudEl0ZW0pIGFkamFjZW50SXRlbSA9IHBhcmVudEFycltpbmRleCAtIDFdO1xuICAgICAgaWYgKCFhZGphY2VudEl0ZW0gJiYgIUFycmF5LmlzQXJyYXkocGFyZW50KSkgYWRqYWNlbnRJdGVtID0gcGFyZW50O1xuICAgICAgaWYgKCFhZGphY2VudEl0ZW0pIHJldHVybiBudWxsO1xuXG4gICAgICByZXR1cm4gYWRqYWNlbnRJdGVtW2lkS2V5XTtcbiAgICB9O1xuXG4gICAgY29uc3QgcGFyZW50ID0gdGhpcy5nZXRUcmVlSXRlbShpZCwgdGhpcy5wcm9wcy50cmVlRGF0YSwgdHJ1ZSk7XG4gICAgcmV0dXJuIHBhcmVudCA/IGdldEFkamFjZW50SXRlbUlkKHBhcmVudCkgOiBnZXRBZGphY2VudEl0ZW1JZCh0cmVlRGF0YSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEFwcGVuZHMgcHJvdmlkZWQgaXRlbXMgdG8gdGhlIGdyaWRcbiAgICogQHBhcmFtIGl0ZW1zIC0gaW1tdXRhYmxlIGFycmF5IG9mIGl0ZW1zIHRvIGJlIGFwcGVuZGVkIHRvIGdyaWRcbiAgICogQHBhcmFtIHNldE5ld0l0ZW1zIC0gc2V0IGNvbXBsZXRlbHkgYSBuZXcgYXJyYXkgb2YgaXRlbXNcbiAgICovXG4gIHNldERhdGFUb0dyaWQgPSAoaXRlbXMsIHNldE5ld0l0ZW1zID0gZmFsc2UpID0+IHtcbiAgICBsZXQgZGF0YSA9IExpc3QoKTtcbiAgICBjb25zdCB7XG4gICAgICBncmlkLCBncmlkQ29sdW1ucywgZ3JpZERhdGEsIHNvcnRLZXksXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFzZXROZXdJdGVtcykgZGF0YSA9IGdyaWREYXRhLnNsaWNlKCk7XG4gICAgbGV0IG5ld0dyaWRJdGVtcyA9IGRhdGEuY29uY2F0KGl0ZW1zKTtcbiAgICBpZiAoc29ydEtleSkgbmV3R3JpZEl0ZW1zID0gbmV3R3JpZEl0ZW1zLnNvcnRCeShpID0+IGkuZ2V0KHNvcnRLZXkpKTtcblxuICAgIHRoaXMucHJvcHMuc2V0RGF0YShncmlkLCBncmlkQ29sdW1ucywgbmV3R3JpZEl0ZW1zKTtcbiAgICB0aGlzLnByb3BzLmNsZWFyU2VsZWN0ZWRJdGVtcyhncmlkKTtcbiAgfTtcblxuICBjb3VudFBhcmVudHMgPSAoc2VsZWN0ZWRLZXksIGNvdW50ZXIpID0+IHtcbiAgICBjb25zdCB7IGlkS2V5LCB0cmVlRGF0YSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBuZXdQYXJlbnQgPSB0aGlzLmdldFRyZWVJdGVtKHNlbGVjdGVkS2V5LCB0cmVlRGF0YSwgdHJ1ZSk7XG4gICAgaWYgKG5ld1BhcmVudCkge1xuICAgICAgcmV0dXJuIHRoaXMuY291bnRQYXJlbnRzKG5ld1BhcmVudFtpZEtleV0sIGNvdW50ZXIgKyAxKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvdW50ZXI7XG4gIH1cblxuICBoYXNMZXZlbFJlYWNoZWRNYXggPSAoc2VsZWN0ZWRMZXZlbCkgPT4ge1xuICAgIGNvbnN0IHsgbWF4TGV2ZWwgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFzZWxlY3RlZExldmVsIHx8ICFtYXhMZXZlbCkgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IG51bWJlck9mUGFyZW50cyA9IHRoaXMuY291bnRQYXJlbnRzKHNlbGVjdGVkTGV2ZWwsIDApO1xuICAgIHJldHVybiBudW1iZXJPZlBhcmVudHMgPj0gbWF4TGV2ZWw7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIHdoZXRoZXIgb3Igbm90IGdpdmVuIG5vZGUgaXMgZGlzYWJsZWRcbiAgICovXG4gIGlzU2VsZWN0ZWREaXNhYmxlZCA9ICgpID0+IHtcbiAgICBjb25zdCB7IGxvY2tlZEtleSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBpdGVtID0gISF0aGlzLmdldFRyZWVJdGVtKHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdKTtcbiAgICBpZiAoIWl0ZW0pIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gaXRlbVtsb2NrZWRLZXldO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZW1vdmVzIHRoZSBjaG9zZW4gaXRlbSBmcm9tIGEgdHJlZSBhbmQgdXBkYXRlcyB0aGUgZ3JpZCB1c2luZyBNT1ZFX0xFQUZcbiAgICogYWN0aW9uXG4gICAqL1xuICBtb3ZlSXRlbVRvR3JpZCA9ICgpID0+IHtcbiAgICBjb25zdCB7IHRyZWVEYXRhLCBvbkNoYW5nZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzZWxlY3RlZEtleSA9IHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdO1xuICAgIGNvbnN0IGFjdGlvbiA9IHtcbiAgICAgIHR5cGU6IFRSRUVfQUNUSU9OUy5NT1ZFX0xFQUYsXG4gICAgICBkYXRhOiB0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXSxcbiAgICB9O1xuICAgIGNvbnN0IG5leHRTZWxlY3RlZEtleSA9IHRoaXMuZ2V0QWRqYWNlbnRJdGVtKHNlbGVjdGVkS2V5KTtcbiAgICBjb25zdCBuZXdHcmlkSXRlbXMgPSBmcm9tSlMoW3RoaXMuZ2V0VHJlZUl0ZW0oc2VsZWN0ZWRLZXkpXSk7XG4gICAgY29uc3QgbmV3SXRlbXMgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKHNlbGVjdGVkS2V5LCB0cmVlRGF0YSwgYWN0aW9uKTtcblxuICAgIHRoaXMuc2V0RGF0YVRvR3JpZChuZXdHcmlkSXRlbXMpO1xuICAgIGlmIChvbkNoYW5nZSkgb25DaGFuZ2UobmV3SXRlbXMpO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2VsZWN0ZWRLZXlzOiBbbmV4dFNlbGVjdGVkS2V5XSxcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogRXhwYW5kcyBhIHBhcmVudFxuICAgKiBAcGFyYW0gcGFyZW50SWRcbiAgICovXG4gIGV4cGFuZFBhcmVudCA9IChwYXJlbnRJZCkgPT4ge1xuICAgIGlmIChwYXJlbnRJZCAmJiAhdGhpcy5zdGF0ZS5leHBhbmRlZEtleXMuZmluZChleHBhbmRlZElkID0+IGV4cGFuZGVkSWQgPT09IHBhcmVudElkKSkge1xuICAgICAgY29uc3QgbmV3RXhwYW5kZWRLZXlzID0gdGhpcy5zdGF0ZS5leHBhbmRlZEtleXMuc2xpY2UoKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgbmV3RXhwYW5kZWRLZXlzLnB1c2gocGFyZW50SWQpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGV4cGFuZGVkS2V5czogbmV3RXhwYW5kZWRLZXlzIH0pO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogQ2xvc2VzIGRlbGV0ZSBjb25maXJtYXRpb24gZGlhbG9nXG4gICAqL1xuICBjbG9zZURlbGV0ZUNvbmZpcm1hdGlvbkRpYWxvZyA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2hvd0RlbGV0ZUNvbmZpcm1hdGlvbjogZmFsc2UgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIERlbGV0ZXMgYSBwYXJlbnQgbm9kZVxuICAgKi9cbiAgZGVsZXRlUGFyZW50ID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgb25DaGFuZ2UsIHRyZWVEYXRhIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHNlbGVjdGVkS2V5ID0gdGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF07XG4gICAgY29uc3QgYWN0aW9uID0ge1xuICAgICAgdHlwZTogVFJFRV9BQ1RJT05TLkRFTEVURV9QQVJFTlQsXG4gICAgfTtcbiAgICBjb25zdCBuZXh0U2VsZWN0ZWRLZXkgPSB0aGlzLmdldEFkamFjZW50SXRlbShzZWxlY3RlZEtleSk7XG4gICAgY29uc3QgbmV3SXRlbXMgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKHNlbGVjdGVkS2V5LCB0cmVlRGF0YSwgYWN0aW9uKTtcbiAgICBpZiAob25DaGFuZ2UpIG9uQ2hhbmdlKG5ld0l0ZW1zKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNlbGVjdGVkS2V5czogW25leHRTZWxlY3RlZEtleV0sXG4gICAgICBzaG93RGVsZXRlQ29uZmlybWF0aW9uOiBmYWxzZSxcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogRGVzZWxlY3RzIGFuIGl0ZW0sIGlmIGl0IGlzIGUuZy4gcmVtb3ZlZFxuICAgKi9cbiAgZGVzZWxlY3RJdGVtID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZEtleXM6IFtdIH0pO1xuICB9O1xuXG4gIHJlbmRlckhlYWRlclJpZ2h0ID0gdHJhbnNsYXRpb25zID0+IChcbiAgICA8Q29udHJvbEJhclxuICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICBvbkFkZE5ld0NsaWNrPXt0aGlzLm9uQWRkTmV3Q2xpY2t9XG4gICAgICBvbkRlbGV0ZUNsaWNrPXt0aGlzLm9uRGVsZXRlQ2xpY2t9XG4gICAgICBvbklucHV0Q2hhbmdlPXt0aGlzLm9uSW5wdXRDaGFuZ2V9XG4gICAgICBzZWxlY3RlZFRyZWVJdGVtPXt0aGlzLmdldFRyZWVJdGVtKHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdKX1cbiAgICAgIGhlaWdodD17QUNUSU9OX0JBUl9DT05UQUlORVJfSEVJR0hUfVxuICAgICAgdHJhbnNsYXRpb25zPXt0cmFuc2xhdGlvbnN9XG4gICAgICBpc0FkZERpc2FibGVkPXt0aGlzLmhhc0xldmVsUmVhY2hlZE1heCh0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXSl9XG4gICAgLz5cbiAgKTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgdmFsdWVLZXksXG4gICAgICBsZWFmVmFsdWVLZXksXG4gICAgICBpZEtleSxcbiAgICAgIHRyZWVEYXRhLFxuICAgICAgZ3JpZCxcbiAgICAgIGdyaWRDb2x1bW5zLFxuICAgICAgY2xhc3NOYW1lLFxuICAgICAgdHJhbnNsYXRpb25zLFxuICAgICAgY2hpbGRLZXksXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBtZXJnZWRHcmlkID0gT2JqZWN0LmFzc2lnbih7fSwgZ3JpZCwgeyBkZWZhdWx0U2hvd0ZpbHRlcmluZ1JvdzogdHJ1ZSB9KTtcbiAgICBjb25zdCBtZXJnZWRUcmFuc2xhdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0VHJhbnNsYXRpb25zLCB0cmFuc2xhdGlvbnMpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxSZWFjdC5GcmFnbWVudD5cbiAgICAgICAgPENvbnRhaW5lciBjbGFzc05hbWU9e2NsYXNzTmFtZX0+XG4gICAgICAgICAgPFRyZWVDb250YWluZXI+XG4gICAgICAgICAgICA8VHJlZUNvbXBvbmVudFxuICAgICAgICAgICAgICB0cmVlRGF0YT17dHJlZURhdGF9XG4gICAgICAgICAgICAgIGRhdGFMb29rVXBLZXk9e2lkS2V5fVxuICAgICAgICAgICAgICBkYXRhTG9va1VwVmFsdWU9e3ZhbHVlS2V5fVxuICAgICAgICAgICAgICBkYXRhTG9va1VwTGVhZlZhbHVlPXtsZWFmVmFsdWVLZXl9XG4gICAgICAgICAgICAgIGRhdGFMb29rVXBDaGlsZHJlbj17Y2hpbGRLZXl9XG4gICAgICAgICAgICAgIG9uU2VsZWN0PXt0aGlzLm9uVHJlZUl0ZW1TZWxlY3R9XG4gICAgICAgICAgICAgIG9uRXhwYW5kPXt0aGlzLm9uRXhwYW5kfVxuICAgICAgICAgICAgICBjaGVja2FibGU9e2ZhbHNlfVxuICAgICAgICAgICAgICBzZWxlY3RlZEtleXM9e3RoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzfVxuICAgICAgICAgICAgICBleHBhbmRlZEtleXM9e3RoaXMuc3RhdGUuZXhwYW5kZWRLZXlzfVxuICAgICAgICAgICAgICBvbk9yZGVyQnV0dG9uQ2xpY2s9e3RoaXMub25PcmRlckNsaWNrfVxuICAgICAgICAgICAgICB0aXRsZT17bWVyZ2VkVHJhbnNsYXRpb25zLnRyZWVUaXRsZX1cbiAgICAgICAgICAgICAgc2VsZWN0YWJsZVxuICAgICAgICAgICAgICBzaG93T3JkZXJpbmdBcnJvd3NcbiAgICAgICAgICAgICAgc2hvd0V4cGFuZEFsbFxuICAgICAgICAgICAgICBoZWFkZXJSaWdodD17dGhpcy5yZW5kZXJIZWFkZXJSaWdodChtZXJnZWRUcmFuc2xhdGlvbnMpfVxuICAgICAgICAgICAgICBoYW5kbGVFeHBhbmRlZEtleXNNYW51YWxseVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L1RyZWVDb250YWluZXI+XG4gICAgICAgICAgPEFycm93Q29udHJvbHNcbiAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgc2VsZWN0ZWRUcmVlSXRlbT17dGhpcy5nZXRUcmVlSXRlbSh0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXSl9XG4gICAgICAgICAgICBvbk1vdmVUb1RyZWVDbGljaz17dGhpcy5vbk1vdmVUb1RyZWVDbGlja31cbiAgICAgICAgICAgIG9uTW92ZVRvR3JpZENsaWNrPXt0aGlzLm9uTW92ZVRvR3JpZENsaWNrfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPEdyaWRcbiAgICAgICAgICAgIGdyaWQ9e21lcmdlZEdyaWR9XG4gICAgICAgICAgICBjb2x1bW5zPXtncmlkQ29sdW1uc31cbiAgICAgICAgICAgIG11bHRpU2VsZWN0XG4gICAgICAgICAgICBmaWx0ZXJpbmdcbiAgICAgICAgICAgIHJvd1NlbGVjdENoZWNrYm94Q29sdW1uXG4gICAgICAgICAgICBncmlkSGVhZGVyPXs8UHJpbWl0aXZlLlN1YnRpdGxlPnttZXJnZWRUcmFuc2xhdGlvbnMuZ3JpZFRpdGxlfTwvUHJpbWl0aXZlLlN1YnRpdGxlPn1cbiAgICAgICAgICAvPlxuICAgICAgICA8L0NvbnRhaW5lcj5cbiAgICAgICAge3RoaXMuc3RhdGUuc2hvd0RlbGV0ZUNvbmZpcm1hdGlvbiAmJiAoXG4gICAgICAgICAgPENvbmZpcm1EaWFsb2dcbiAgICAgICAgICAgIHRyYW5zbGF0aW9ucz17bWVyZ2VkVHJhbnNsYXRpb25zLmRlbGV0ZUNvbmZpcm1EaWFsb2d9XG4gICAgICAgICAgICBjb25maXJtQ2FsbGJhY2s9e3RoaXMuZGVsZXRlUGFyZW50fVxuICAgICAgICAgICAgY2FuY2VsQ2FsbGJhY2s9e3RoaXMuY2xvc2VEZWxldGVDb25maXJtYXRpb25EaWFsb2d9XG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cbiAgICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gICAgKTtcbiAgfVxufVxuIl19