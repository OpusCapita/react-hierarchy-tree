var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _dec, _class, _class2, _temp;

var _templateObject = _taggedTemplateLiteralLoose(['\n  height: 100%;\n  &&& {\n    padding: 0;\n  }\n  .oc-datagrid-main-container {\n    border: 1px solid ', ';\n    border-top:none;\n  }\n'], ['\n  height: 100%;\n  &&& {\n    padding: 0;\n  }\n  .oc-datagrid-main-container {\n    border: 1px solid ', ';\n    border-top:none;\n  }\n']),
    _templateObject2 = _taggedTemplateLiteralLoose(['\n  display: flex;\n  min-height: 300px;\n  > div {\n    width: 50%;\n    flex: 1 1 100%;\n  }\n'], ['\n  display: flex;\n  min-height: 300px;\n  > div {\n    width: 50%;\n    flex: 1 1 100%;\n  }\n']),
    _templateObject3 = _taggedTemplateLiteralLoose(['\n  height:100%;\n  .oc-scrollbar-container {\n    height: calc(100% - ', ');\n    padding: ', ';\n  }\n  .title-container {\n    min-height: ', ';\n  }\n  .oc-react-tree {\n    height: 100%;\n    .rc-tree-iconEle.rc-tree-icon__customize {\n        display:none;\n    }\n  }\n'], ['\n  height:100%;\n  .oc-scrollbar-container {\n    height: calc(100% - ', ');\n    padding: ', ';\n  }\n  .title-container {\n    min-height: ', ';\n  }\n  .oc-react-tree {\n    height: 100%;\n    .rc-tree-iconEle.rc-tree-icon__customize {\n        display:none;\n    }\n  }\n']),
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

    _this.onOrderClick = function (items) {
      _this.props.onChange(items);
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
   * Removes the chosen item from a tree and updates the grid using MOVE_LEAF
   * action
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
            headerRight: this.renderHeaderRight(mergedTranslations)
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
  defaultExpandAll: true
}, _temp)) || _class);
export { HierarchyTreeSelector as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlRyZWVDb21wb25lbnQiLCJQcmltaXRpdmUiLCJEYXRhZ3JpZCIsImdyaWRTaGFwZSIsImdyaWRDb2x1bW5TaGFwZSIsIkRhdGFncmlkQWN0aW9ucyIsIkNvbmZpcm1EaWFsb2ciLCJSZWFjdCIsInN0eWxlZCIsIkxpc3QiLCJmcm9tSlMiLCJJbW11dGFibGVQcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJjb25uZWN0IiwiQ29udHJvbEJhciIsIkFycm93Q29udHJvbHMiLCJkZWZhdWx0VHJhbnNsYXRpb25zIiwiQUNUSU9OX0JBUl9DT05UQUlORVJfSEVJR0hUIiwiVFJFRV9BQ1RJT05TIiwiQUREX0NISUxEUkVOIiwiTU9WRV9MRUFGIiwiUkVOQU1FX1BBUkVOVCIsIkRFTEVURV9QQVJFTlQiLCJHcmlkIiwicHJvcHMiLCJ0aGVtZSIsImNvbG9ycyIsImNvbG9yTGlnaHRHcmF5IiwiQ29udGFpbmVyIiwiZGl2IiwiVHJlZUNvbnRhaW5lciIsImd1dHRlcldpZHRoIiwiTm9JdGVtc1RleHQiLCJwIiwibWFwRGlzcGF0Y2hUb1Byb3BzIiwic2V0RGF0YSIsImNsZWFyU2VsZWN0ZWRJdGVtcyIsIm1hcFN0YXRlVG9Qcm9wcyIsInN0YXRlIiwiZ3JpZElkIiwiZ3JpZCIsImlkIiwic2VsZWN0ZWRHcmlkSXRlbXMiLCJkYXRhZ3JpZCIsImdldEluIiwiZ3JpZERhdGEiLCJIaWVyYXJjaHlUcmVlU2VsZWN0b3IiLCJvblRyZWVJdGVtU2VsZWN0Iiwic2VsZWN0ZWRLZXlzIiwib25TZWxlY3QiLCJzZXRTdGF0ZSIsIm9uRGVsZXRlQ2xpY2siLCJzaG93RGVsZXRlQ29uZmlybWF0aW9uIiwib25BZGROZXdDbGljayIsImRhdGEiLCJjYWxsYmFjayIsIm9uQ2hhbmdlIiwidHJlZURhdGEiLCJpZEtleSIsIm5ld0l0ZW1zIiwic2xpY2UiLCJwdXNoIiwiYWN0aW9uIiwidHlwZSIsImdldFVwZGF0ZWRUcmVlIiwicGFyZW50IiwiZ2V0VHJlZUl0ZW0iLCJleHBhbmRQYXJlbnQiLCJvbk1vdmVUb0dyaWRDbGljayIsInNlbGVjdGVkS2V5IiwibmV4dFNlbGVjdGVkS2V5IiwiZ2V0QWRqYWNlbnRJdGVtIiwibmV3R3JpZEl0ZW1zIiwic2V0RGF0YVRvR3JpZCIsIm9uT3JkZXJDbGljayIsIml0ZW1zIiwib25Nb3ZlVG9UcmVlQ2xpY2siLCJzZWxlY3RlZElkIiwiZmlsdGVyIiwiaW5jbHVkZXMiLCJpIiwiZ2V0IiwidG9KUyIsIml0ZW0iLCJvbklucHV0Q2hhbmdlIiwidmFsdWUiLCJvbkV4cGFuZCIsImlkcyIsImV4cGFuZGVkS2V5cyIsImFycmF5IiwiZm91bmQiLCJjaGlsZEtleSIsInZhbHVlS2V5IiwicmVtb3ZlQWN0aW9ucyIsInJvb3RJdGVtIiwiZmluZCIsImxlbmd0aCIsImdldEFsbExlYWZzIiwiZGVzZWxlY3RJdGVtIiwiY2hpbGQiLCJmaWx0ZXJlZENoaWxkcmVuIiwiY2hpbGRJdGVtIiwiY29uY2F0IiwiVHlwZUVycm9yIiwiYWxyZWFkeUZvdW5kIiwibGVhZnMiLCJyZXR1cm5QYXJlbnQiLCJmb3JFYWNoIiwiZ2V0QWRqYWNlbnRJdGVtSWQiLCJwYXJlbnRBcnIiLCJBcnJheSIsImlzQXJyYXkiLCJpbmRleCIsImZpbmRJbmRleCIsImFkamFjZW50SXRlbSIsImdldEFsbFBhcmVudElkcyIsImNiIiwiYWNjIiwidG90YWwiLCJyZWR1Y2UiLCJzZXROZXdJdGVtcyIsImdyaWRDb2x1bW5zIiwicGFyZW50SWQiLCJleHBhbmRlZElkIiwibmV3RXhwYW5kZWRLZXlzIiwiY2xvc2VEZWxldGVDb25maXJtYXRpb25EaWFsb2ciLCJkZWxldGVQYXJlbnQiLCJyZW5kZXJIZWFkZXJSaWdodCIsInRyYW5zbGF0aW9ucyIsInJlbmRlciIsImNsYXNzTmFtZSIsIm1lcmdlZEdyaWQiLCJPYmplY3QiLCJhc3NpZ24iLCJkZWZhdWx0U2hvd0ZpbHRlcmluZ1JvdyIsIm1lcmdlZFRyYW5zbGF0aW9ucyIsInRyZWVUaXRsZSIsIm5vVHJlZUl0ZW1zIiwiZ3JpZFRpdGxlIiwiZGVsZXRlQ29uZmlybURpYWxvZyIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiLCJ1bmRlZmluZWQiLCJkZWZhdWx0RXhwYW5kQWxsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU9BLGFBQVAsTUFBMEIsa0NBQTFCO0FBQ0EsU0FBU0MsU0FBVCxRQUEwQixrQ0FBMUI7QUFDQSxTQUFTQyxRQUFULEVBQW1CQyxTQUFuQixFQUE4QkMsZUFBOUIsRUFBK0NDLGVBQS9DLFFBQXNFLHdCQUF0RTtBQUNBLE9BQU9DLGFBQVAsTUFBMEIsdUNBQTFCO0FBQ0EsT0FBT0MsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLE1BQVAsTUFBbUIsbUJBQW5CO0FBQ0EsU0FBU0MsSUFBVCxFQUFlQyxNQUFmLFFBQTZCLFdBQTdCO0FBQ0EsT0FBT0Msa0JBQVAsTUFBK0IsMkJBQS9CO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLFNBQVNDLE9BQVQsUUFBd0IsYUFBeEI7O0FBRUE7QUFDQSxPQUFPQyxVQUFQLE1BQXVCLGlEQUF2QjtBQUNBLE9BQU9DLGFBQVAsTUFBMEIsb0RBQTFCO0FBQ0EsU0FBU0MsbUJBQVQsUUFBb0Msd0JBQXBDOztBQUVBLElBQU1DLDhCQUE4QixNQUFwQztBQUNBLElBQU1DLGVBQWU7QUFDbkJDLGdCQUFjLGNBREs7QUFFbkJDLGFBQVcsV0FGUTtBQUduQkMsaUJBQWUsZUFISTtBQUluQkMsaUJBQWU7QUFKSSxDQUFyQjs7QUFPQSxJQUFNQyxPQUFPZixPQUFPTixRQUFQLENBQVAsa0JBTWtCO0FBQUEsU0FBU3NCLE1BQU1DLEtBQU4sQ0FBWUMsTUFBWixDQUFtQkMsY0FBNUI7QUFBQSxDQU5sQixDQUFOOztBQVdBLElBQU1DLFlBQVlwQixPQUFPcUIsR0FBbkIsa0JBQU47O0FBU0EsSUFBTUMsZ0JBQWdCdEIsT0FBT3FCLEdBQXZCLG1C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SSxhLFdBc0JoREMsWSxHQUFlO0FBQ3BCbkYsU0FBTyxJQURhO0FBRXBCa0MsWUFBVSxNQUZVO0FBR3BCRCxZQUFVLFVBSFU7QUFJcEJsQyxZQUFVLEVBSlU7QUFLcEJ5RSxhQUFXLEVBTFM7QUFNcEJGLGdCQUFjaEgsbUJBTk07QUFPcEJ5QixNQUFJLGdCQVBnQjtBQVFwQlEsWUFBVTZGLFNBUlU7QUFTcEJ0RixZQUFVc0YsU0FUVTtBQVVwQkMsb0JBQWtCO0FBVkUsQztTQXRCSGpHLHFCIiwiZmlsZSI6ImhpZXJhcmNoeS10cmVlLXNlbGVjdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUcmVlQ29tcG9uZW50IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LXRyZWUtY29tcG9uZW50JztcbmltcG9ydCB7IFByaW1pdGl2ZSB9IGZyb20gJ0BvcHVzY2FwaXRhL29jLWNtLWNvbW1vbi1sYXlvdXRzJztcbmltcG9ydCB7IERhdGFncmlkLCBncmlkU2hhcGUsIGdyaWRDb2x1bW5TaGFwZSwgRGF0YWdyaWRBY3Rpb25zIH0gZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtZ3JpZCc7XG5pbXBvcnQgQ29uZmlybURpYWxvZyBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1jb25maXJtYXRpb24tZGlhbG9nJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCB7IExpc3QsIGZyb21KUyB9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgSW1tdXRhYmxlUHJvcFR5cGVzIGZyb20gJ3JlYWN0LWltbXV0YWJsZS1wcm9wdHlwZXMnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbi8vIEFwcCBpbXBvcnRzXG5pbXBvcnQgQ29udHJvbEJhciBmcm9tICcuL2hpZXJhcmNoeS10cmVlLXNlbGVjdG9yLWNvbnRyb2wtYmFyLmNvbXBvbmVudCc7XG5pbXBvcnQgQXJyb3dDb250cm9scyBmcm9tICcuL2hpZXJhcmNoeS10cmVlLXNlbGVjdG9yLWFycm93LWNvbnRyb2xzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBkZWZhdWx0VHJhbnNsYXRpb25zIH0gZnJvbSAnLi9oaWVyYXJjaHktdHJlZS51dGlscyc7XG5cbmNvbnN0IEFDVElPTl9CQVJfQ09OVEFJTkVSX0hFSUdIVCA9ICc1N3B4JztcbmNvbnN0IFRSRUVfQUNUSU9OUyA9IHtcbiAgQUREX0NISUxEUkVOOiAnQUREX0NISUxEUkVOJyxcbiAgTU9WRV9MRUFGOiAnTU9WRV9MRUFGJyxcbiAgUkVOQU1FX1BBUkVOVDogJ1JFTkFNRV9QQVJFTlQnLFxuICBERUxFVEVfUEFSRU5UOiAnREVMRVRFX1BBUkVOVCcsXG59O1xuXG5jb25zdCBHcmlkID0gc3R5bGVkKERhdGFncmlkKWBcbiAgaGVpZ2h0OiAxMDAlO1xuICAmJiYge1xuICAgIHBhZGRpbmc6IDA7XG4gIH1cbiAgLm9jLWRhdGFncmlkLW1haW4tY29udGFpbmVyIHtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAke3Byb3BzID0+IHByb3BzLnRoZW1lLmNvbG9ycy5jb2xvckxpZ2h0R3JheX07XG4gICAgYm9yZGVyLXRvcDpub25lO1xuICB9XG5gO1xuXG5jb25zdCBDb250YWluZXIgPSBzdHlsZWQuZGl2YFxuICBkaXNwbGF5OiBmbGV4O1xuICBtaW4taGVpZ2h0OiAzMDBweDtcbiAgPiBkaXYge1xuICAgIHdpZHRoOiA1MCU7XG4gICAgZmxleDogMSAxIDEwMCU7XG4gIH1cbmA7XG5cbmNvbnN0IFRyZWVDb250YWluZXIgPSBzdHlsZWQuZGl2YFxuICBoZWlnaHQ6MTAwJTtcbiAgLm9jLXNjcm9sbGJhci1jb250YWluZXIge1xuICAgIGhlaWdodDogY2FsYygxMDAlIC0gJHtBQ1RJT05fQkFSX0NPTlRBSU5FUl9IRUlHSFR9KTtcbiAgICBwYWRkaW5nOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmd1dHRlcldpZHRofTtcbiAgfVxuICAudGl0bGUtY29udGFpbmVyIHtcbiAgICBtaW4taGVpZ2h0OiAke0FDVElPTl9CQVJfQ09OVEFJTkVSX0hFSUdIVH07XG4gIH1cbiAgLm9jLXJlYWN0LXRyZWUge1xuICAgIGhlaWdodDogMTAwJTtcbiAgICAucmMtdHJlZS1pY29uRWxlLnJjLXRyZWUtaWNvbl9fY3VzdG9taXplIHtcbiAgICAgICAgZGlzcGxheTpub25lO1xuICAgIH1cbiAgfVxuYDtcblxuY29uc3QgTm9JdGVtc1RleHQgPSBzdHlsZWQucGBcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuYDtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0ge1xuICBzZXREYXRhOiBEYXRhZ3JpZEFjdGlvbnMuc2V0RGF0YSxcbiAgY2xlYXJTZWxlY3RlZEl0ZW1zOiBEYXRhZ3JpZEFjdGlvbnMuY2xlYXJTZWxlY3RlZEl0ZW1zLFxufTtcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlLCBwcm9wcykgPT4ge1xuICBjb25zdCBncmlkSWQgPSBwcm9wcy5ncmlkLmlkO1xuICByZXR1cm4ge1xuICAgIHNlbGVjdGVkR3JpZEl0ZW1zOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbZ3JpZElkLCAnc2VsZWN0ZWRJdGVtcyddLCBMaXN0KCkpLFxuICAgIGdyaWREYXRhOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbZ3JpZElkLCAnYWxsRGF0YSddLCBMaXN0KCkpLFxuICB9O1xufTtcblxuQGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIaWVyYXJjaHlUcmVlU2VsZWN0b3IgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBpZEtleTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB2YWx1ZUtleTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjaGlsZEtleTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB0cmVlRGF0YTogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnNoYXBlKHt9KSksXG4gICAgZ3JpZDogZ3JpZFNoYXBlLmlzUmVxdWlyZWQsXG4gICAgZ3JpZENvbHVtbnM6IFByb3BUeXBlcy5hcnJheU9mKGdyaWRDb2x1bW5TaGFwZSkuaXNSZXF1aXJlZCxcbiAgICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgc2V0RGF0YTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBjbGVhclNlbGVjdGVkSXRlbXM6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgc2VsZWN0ZWRHcmlkSXRlbXM6IEltbXV0YWJsZVByb3BUeXBlcy5saXN0LmlzUmVxdWlyZWQsXG4gICAgZ3JpZERhdGE6IEltbXV0YWJsZVByb3BUeXBlcy5saXN0LmlzUmVxdWlyZWQsXG4gICAgdHJhbnNsYXRpb25zOiBQcm9wVHlwZXMuc2hhcGUoe30pLFxuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRlZmF1bHRFeHBhbmRBbGw6IFByb3BUeXBlcy5ib29sLFxuXG4gICAgLy8gQ2FsbGJhY2tzXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGlkS2V5OiAnaWQnLFxuICAgIHZhbHVlS2V5OiAnbmFtZScsXG4gICAgY2hpbGRLZXk6ICdjaGlsZHJlbicsXG4gICAgdHJlZURhdGE6IFtdLFxuICAgIGNsYXNzTmFtZTogJycsXG4gICAgdHJhbnNsYXRpb25zOiBkZWZhdWx0VHJhbnNsYXRpb25zLFxuICAgIGlkOiAnaGllcmFyY2h5LXRyZWUnLFxuICAgIG9uU2VsZWN0OiB1bmRlZmluZWQsXG4gICAgb25DaGFuZ2U6IHVuZGVmaW5lZCxcbiAgICBkZWZhdWx0RXhwYW5kQWxsOiB0cnVlLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHNlbGVjdGVkS2V5czogW10sXG4gICAgICBzaG93RGVsZXRlQ29uZmlybWF0aW9uOiBmYWxzZSxcbiAgICB9O1xuICB9XG5cblxuICAvKipcbiAgICogU2VsZWN0cyBhIHRyZWUgaXRlbVxuICAgKiBAcGFyYW0gc2VsZWN0ZWRLZXlzIChhcnJheSlcbiAgICovXG4gIG9uVHJlZUl0ZW1TZWxlY3QgPSAoc2VsZWN0ZWRLZXlzKSA9PiB7XG4gICAgY29uc3QgeyBvblNlbGVjdCB9ID0gdGhpcy5wcm9wcztcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRLZXlzIH0sICgpID0+IHtcbiAgICAgIGlmIChvblNlbGVjdCkgb25TZWxlY3Qoc2VsZWN0ZWRLZXlzKTtcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogRGlzcGxheXMgYSBjb25maXJtYXRpb24gZGlhbG9nXG4gICAqL1xuICBvbkRlbGV0ZUNsaWNrID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzaG93RGVsZXRlQ29uZmlybWF0aW9uOiB0cnVlIH0pO1xuICB9O1xuXG5cbiAgLyoqXG4gICAqIEFkZHMgYSBuZXcgbm9kZSB0byB0aGUgcm9vdCBvZiB0aGUgdHJlZSwgb3IgdW5kZXIgYSBzZWxlY3RlZCB0cmVlIG5vZGUgdXNpbmdcbiAgICogQUREX0NISUxEUkVOIGFjdGlvblxuICAgKiBAcGFyYW0gZGF0YSAtIGRhdGEgdG8gYmUgYWRkZWRcbiAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAqL1xuICBvbkFkZE5ld0NsaWNrID0gKGRhdGEsIGNhbGxiYWNrKSA9PiB7XG4gICAgY29uc3QgeyBvbkNoYW5nZSwgdHJlZURhdGEsIGlkS2V5IH0gPSB0aGlzLnByb3BzO1xuICAgIGxldCBuZXdJdGVtcyA9IHRyZWVEYXRhLnNsaWNlKCk7XG5cbiAgICAvLyBJZiBubyB0cmVlIG5vZGUgaXMgc2VsZWN0ZWQsIHdlJ2xsIHBsYWNlIHRoZSBuZXcgaXRlbSB0byB0aGUgcm9vdFxuICAgIC8vIG9mIHRoZSB0cmVlXG4gICAgaWYgKCF0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXSkge1xuICAgICAgbmV3SXRlbXMucHVzaChkYXRhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgYWN0aW9uID0ge1xuICAgICAgICB0eXBlOiBUUkVFX0FDVElPTlMuQUREX0NISUxEUkVOLFxuICAgICAgICBkYXRhLFxuICAgICAgfTtcbiAgICAgIG5ld0l0ZW1zID0gdGhpcy5nZXRVcGRhdGVkVHJlZSh0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXSwgdHJlZURhdGEsIGFjdGlvbik7XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZEtleXM6IFtkYXRhW2lkS2V5XV0gfSwgKCkgPT4ge1xuICAgICAgLy8gSWYgdGhlIHBhcmVudCBpcyBub3QgeWV0IGV4cGFuZGVkLCB3ZSB3aWxsIGV4cGFuZCBpdCBub3dcbiAgICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuZ2V0VHJlZUl0ZW0oZGF0YVtpZEtleV0sIHRyZWVEYXRhLCB0cnVlKSB8fCB7fTtcbiAgICAgIHRoaXMuZXhwYW5kUGFyZW50KHBhcmVudFtpZEtleV0pO1xuXG4gICAgICBpZiAob25DaGFuZ2UpIG9uQ2hhbmdlKG5ld0l0ZW1zKTtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgdGhlIGNob3NlbiBpdGVtIGZyb20gYSB0cmVlIGFuZCB1cGRhdGVzIHRoZSBncmlkIHVzaW5nIE1PVkVfTEVBRlxuICAgKiBhY3Rpb25cbiAgICovXG4gIG9uTW92ZVRvR3JpZENsaWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgdHJlZURhdGEsIG9uQ2hhbmdlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHNlbGVjdGVkS2V5ID0gdGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF07XG4gICAgY29uc3QgYWN0aW9uID0ge1xuICAgICAgdHlwZTogVFJFRV9BQ1RJT05TLk1PVkVfTEVBRixcbiAgICAgIGRhdGE6IHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdLFxuICAgIH07XG4gICAgY29uc3QgbmV4dFNlbGVjdGVkS2V5ID0gdGhpcy5nZXRBZGphY2VudEl0ZW0oc2VsZWN0ZWRLZXkpO1xuICAgIGNvbnN0IG5ld0dyaWRJdGVtcyA9IGZyb21KUyhbdGhpcy5nZXRUcmVlSXRlbShzZWxlY3RlZEtleSldKTtcbiAgICBjb25zdCBuZXdJdGVtcyA9IHRoaXMuZ2V0VXBkYXRlZFRyZWUoc2VsZWN0ZWRLZXksIHRyZWVEYXRhLCBhY3Rpb24pO1xuXG4gICAgdGhpcy5zZXREYXRhVG9HcmlkKG5ld0dyaWRJdGVtcyk7XG4gICAgaWYgKG9uQ2hhbmdlKSBvbkNoYW5nZShuZXdJdGVtcyk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzZWxlY3RlZEtleXM6IFtuZXh0U2VsZWN0ZWRLZXldLFxuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDYWxscyBvbkNoYW5nZSBjYWxsYmFjayB3aGVuZXZlciB1c2VyIHJlb3JkZXJzIHRyZWUgaXRlbXMgdXNpbmcgb3JkZXJpbmcgYXJyb3dzXG4gICAqIEBwYXJhbSBpdGVtc1xuICAgKi9cbiAgb25PcmRlckNsaWNrID0gKGl0ZW1zKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5vbkNoYW5nZShpdGVtcyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEFkZHMgc2VsZWN0ZWQgZ3JpZCBpdGVtcyB0byB0aGUgY2hvc2VuIHRyZWUgbm9kZSB1c2luZyBBRERfQ0hJTERSRU4gYWN0aW9uXG4gICAqL1xuICBvbk1vdmVUb1RyZWVDbGljayA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBvbkNoYW5nZSwgc2VsZWN0ZWRHcmlkSXRlbXMsIGdyaWREYXRhLCB0cmVlRGF0YSwgaWRLZXksXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgc2VsZWN0ZWRJZCA9IHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdO1xuXG4gICAgY29uc3QgYWN0aW9uID0ge1xuICAgICAgdHlwZTogVFJFRV9BQ1RJT05TLkFERF9DSElMRFJFTixcbiAgICAgIGRhdGE6IGdyaWREYXRhXG4gICAgICAgIC5maWx0ZXIoaSA9PiBzZWxlY3RlZEdyaWRJdGVtcy5pbmNsdWRlcyhpLmdldChpZEtleSkpKVxuICAgICAgICAudG9KUygpLFxuICAgIH07XG4gICAgY29uc3QgbmV3SXRlbXMgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKHNlbGVjdGVkSWQsIHRyZWVEYXRhLCBhY3Rpb24pO1xuICAgIGNvbnN0IG5ld0dyaWRJdGVtcyA9IGdyaWREYXRhLmZpbHRlcihpdGVtID0+ICFzZWxlY3RlZEdyaWRJdGVtcy5pbmNsdWRlcyhpdGVtLmdldChpZEtleSkpKTtcblxuICAgIHRoaXMuZXhwYW5kUGFyZW50KHNlbGVjdGVkSWQsIHRydWUpO1xuICAgIHRoaXMuc2V0RGF0YVRvR3JpZChuZXdHcmlkSXRlbXMsIHRydWUpO1xuICAgIGlmIChvbkNoYW5nZSkgb25DaGFuZ2UobmV3SXRlbXMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZW5hbWVzIHRoZSBjaG9zZW4gdHJlZSBub2RlIHVzaW5nIGEgUkVOQU1FX1BBUkVOVCBhY3Rpb25cbiAgICogQHBhcmFtIHZhbHVlXG4gICAqL1xuICBvbklucHV0Q2hhbmdlID0gKHZhbHVlKSA9PiB7XG4gICAgY29uc3QgeyB0cmVlRGF0YSwgb25DaGFuZ2UgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgYWN0aW9uID0ge1xuICAgICAgdHlwZTogVFJFRV9BQ1RJT05TLlJFTkFNRV9QQVJFTlQsXG4gICAgICBkYXRhOiB2YWx1ZSxcbiAgICB9O1xuICAgIGNvbnN0IG5ld0l0ZW1zID0gdGhpcy5nZXRVcGRhdGVkVHJlZSh0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXSwgdHJlZURhdGEsIGFjdGlvbik7XG4gICAgaWYgKG9uQ2hhbmdlKSBvbkNoYW5nZShuZXdJdGVtcyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEZpcmVkIG9uIGV4cGFuZFxuICAgKiBAcGFyYW0gaWRzXG4gICAqL1xuICBvbkV4cGFuZCA9IChpZHMpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGV4cGFuZGVkS2V5czogaWRzLFxuICAgIH0pO1xuICB9O1xuXG5cbiAgLyoqXG4gICAqIFJldHVybnMgdXBkYXRlZCB0cmVlIGl0ZW1zLlxuICAgKiBAcGFyYW0gaWQgLSB0YXJnZXQgaXRlbVxuICAgKiBAcGFyYW0gYXJyYXkgLSBhcnJheSB3aGVyZSB0YXJnZXQgaXRlbSBpcyBiZWluZyBzZWFyY2hlZFxuICAgKiBAcGFyYW0gYWN0aW9uIC0gYWN0aW9uIHRvIGJlIHBlcmZvcm1lZCB7dHlwZSwgZGF0YX1cbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBnZXRVcGRhdGVkVHJlZSA9IChpZCwgYXJyYXkgPSB0aGlzLnByb3BzLnRyZWVEYXRhLCBhY3Rpb24pID0+IHtcbiAgICBsZXQgZm91bmQgPSBmYWxzZTtcbiAgICBjb25zdCB7IGlkS2V5LCBjaGlsZEtleSwgdmFsdWVLZXkgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgbmV3SXRlbXMgPSBhcnJheS5zbGljZSgpO1xuICAgIGNvbnN0IHJlbW92ZUFjdGlvbnMgPSBbVFJFRV9BQ1RJT05TLk1PVkVfTEVBRiwgVFJFRV9BQ1RJT05TLkRFTEVURV9QQVJFTlRdO1xuXG4gICAgLy8gSWYgZGVsZXRlZCBwYXJlbnQgaXRlbSBpcyBpbiB0aGUgcm9vdCBub2RlXG4gICAgaWYgKGFjdGlvbi50eXBlID09PSBUUkVFX0FDVElPTlMuREVMRVRFX1BBUkVOVCkge1xuICAgICAgY29uc3Qgcm9vdEl0ZW0gPSBhcnJheS5maW5kKGl0ZW0gPT4gaXRlbVtpZEtleV0gPT09IGlkKTtcbiAgICAgIGlmIChyb290SXRlbSkge1xuICAgICAgICBpZiAocm9vdEl0ZW1bY2hpbGRLZXldLmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuc2V0RGF0YVRvR3JpZChmcm9tSlModGhpcy5nZXRBbGxMZWFmcyhyb290SXRlbVtjaGlsZEtleV0pKSk7XG4gICAgICAgICAgdGhpcy5kZXNlbGVjdEl0ZW0oKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3SXRlbXMuZmlsdGVyKGl0ZW0gPT4gaXRlbVtpZEtleV0gIT09IGlkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5ld0l0ZW1zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBpdGVtID0gbmV3SXRlbXNbaV07XG4gICAgICBpZiAocmVtb3ZlQWN0aW9ucy5pbmNsdWRlcyhhY3Rpb24udHlwZSkgJiYgaXRlbVtjaGlsZEtleV0gJiYgIWZvdW5kKSB7XG4gICAgICAgIGZvdW5kID0gISFpdGVtW2NoaWxkS2V5XS5maW5kKGNoaWxkID0+IGNoaWxkW2lkS2V5XSA9PT0gaWQpO1xuICAgICAgICBpZiAoZm91bmQpIHtcbiAgICAgICAgICAvLyBXaGVuIHJlbW92aW5nIGFuIGl0ZW0gd2UgbXVzdCBmaXJzdCBmaW5kIGl0cyBwYXJlbnQgYW5kIGFsdGVyIGl0cyBjaGlsZHJlbiBhcnJheVxuICAgICAgICAgIGlmIChhY3Rpb24udHlwZSA9PT0gVFJFRV9BQ1RJT05TLk1PVkVfTEVBRikge1xuICAgICAgICAgICAgaXRlbVtjaGlsZEtleV0gPSBpdGVtW2NoaWxkS2V5XS5maWx0ZXIoY2hpbGQgPT4gY2hpbGRbaWRLZXldICE9PSBpZCk7XG4gICAgICAgICAgICB0aGlzLmRlc2VsZWN0SXRlbSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYWN0aW9uLnR5cGUgPT09IFRSRUVfQUNUSU9OUy5ERUxFVEVfUEFSRU5UKSB7XG4gICAgICAgICAgICAvLyB3ZSBtdXN0IGZpcnN0IGZpbHRlciB0aGUgY2hpbGRyZW4sIHNvIHRoYXQgd2Ugd29uJ3QgZ2V0IGxlYWZzIGZyb21cbiAgICAgICAgICAgIC8vIG90aGVyIGNoaWxkIGJyYW5jaGVzXG4gICAgICAgICAgICBjb25zdCBmaWx0ZXJlZENoaWxkcmVuID0gaXRlbVtjaGlsZEtleV0uZmlsdGVyKGNoaWxkSXRlbSA9PiBjaGlsZEl0ZW1baWRLZXldID09PSBpZCk7XG4gICAgICAgICAgICB0aGlzLnNldERhdGFUb0dyaWQoZnJvbUpTKHRoaXMuZ2V0QWxsTGVhZnMoZmlsdGVyZWRDaGlsZHJlbikpKTtcbiAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RJdGVtKCk7XG4gICAgICAgICAgICBpdGVtW2NoaWxkS2V5XSA9IGl0ZW1bY2hpbGRLZXldLmZpbHRlcihjaGlsZEl0ZW0gPT4gY2hpbGRJdGVtW2lkS2V5XSAhPT0gaWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVtpZEtleV0gPT09IGlkICYmICFmb3VuZCkge1xuICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgICBjYXNlIFRSRUVfQUNUSU9OUy5BRERfQ0hJTERSRU46XG4gICAgICAgICAgICBpdGVtW2NoaWxkS2V5XSA9IChpdGVtW2NoaWxkS2V5XSB8fCBbXSkuY29uY2F0KGFjdGlvbi5kYXRhKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgVFJFRV9BQ1RJT05TLlJFTkFNRV9QQVJFTlQ6XG4gICAgICAgICAgICBpdGVtW3ZhbHVlS2V5XSA9IGFjdGlvbi5kYXRhO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FjdGlvbiB0eXBlIGlzIHVuZGVmaW5lZCcpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bY2hpbGRLZXldICYmICFmb3VuZCkgZm91bmQgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKGlkLCBpdGVtW2NoaWxkS2V5XSwgYWN0aW9uKTtcbiAgICB9XG5cbiAgICBpZiAoIWZvdW5kKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIG5ld0l0ZW1zO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHJlY3Vyc2l2ZWx5IGFsbCBsZWFmIGl0ZW1zIGZyb20gYSBnaXZlbiBhcnJheVxuICAgKiBAcGFyYW0gYXJyYXlcbiAgICogQHBhcmFtIGFscmVhZHlGb3VuZCAodXNlZCByZWN1cnNpdmVseSlcbiAgICovXG4gIGdldEFsbExlYWZzID0gKGFycmF5LCBhbHJlYWR5Rm91bmQgPSBbXSkgPT4ge1xuICAgIGNvbnN0IHsgY2hpbGRLZXkgfSA9IHRoaXMucHJvcHM7XG4gICAgbGV0IGxlYWZzID0gYWxyZWFkeUZvdW5kO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3QgaXRlbSA9IGFycmF5W2ldO1xuICAgICAgaWYgKGl0ZW1bY2hpbGRLZXldKSB7XG4gICAgICAgIGxlYWZzID0gdGhpcy5nZXRBbGxMZWFmcyhpdGVtW2NoaWxkS2V5XSwgYWxyZWFkeUZvdW5kKTtcbiAgICAgIH1cbiAgICAgIGlmICghaXRlbVtjaGlsZEtleV0pIGxlYWZzLnB1c2goaXRlbSk7XG4gICAgfVxuICAgIHJldHVybiBsZWFmcztcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyBhIHRyZWUgaXRlbSBieSBJRFxuICAgKiBAcGFyYW0gaWRcbiAgICogQHBhcmFtIGFycmF5XG4gICAqIEBwYXJhbSByZXR1cm5QYXJlbnQgLSByZXR1cm4gaXRlbSdzIHBhcmVudCBpbnN0ZWFkIG9mIHRoZSBpdGVtXG4gICAqIEBwYXJhbSBwYXJlbnQgLSBwYXJlbnQgaXRlbSAodXNlZCByZWN1cnNpdmVseSlcbiAgICogQHJldHVybnMge3t9fVxuICAgKi9cbiAgZ2V0VHJlZUl0ZW0gPSAoaWQsIGFycmF5ID0gdGhpcy5wcm9wcy50cmVlRGF0YSwgcmV0dXJuUGFyZW50ID0gZmFsc2UsIHBhcmVudCA9IG51bGwpID0+IHtcbiAgICBjb25zdCB7IGNoaWxkS2V5LCBpZEtleSB9ID0gdGhpcy5wcm9wcztcbiAgICBsZXQgZm91bmQgPSBhcnJheS5maW5kKGl0ZW0gPT4gaXRlbVtpZEtleV0gPT09IGlkKTtcblxuICAgIGlmIChmb3VuZCAmJiByZXR1cm5QYXJlbnQpIGZvdW5kID0gcGFyZW50O1xuXG4gICAgaWYgKCFmb3VuZCkge1xuICAgICAgYXJyYXkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBpZiAoaXRlbVtjaGlsZEtleV0gJiYgIWZvdW5kKSB7XG4gICAgICAgICAgZm91bmQgPSB0aGlzLmdldFRyZWVJdGVtKGlkLCBpdGVtW2NoaWxkS2V5XSwgcmV0dXJuUGFyZW50LCBpdGVtKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBmb3VuZDtcbiAgfTtcblxuICAvKipcbiAgICogR2V0IGFkamFjZW50IGl0ZW0gKGlkKSBpbiBwYXJlbnQgYXJyYXkuIFVzZWQgd2hlbiBtb3ZpbmcgaXRlbXMgZnJvbSB0cmVlXG4gICAqIHRvIGdyaWQvZGVsZXRpbmcgYW4gaXRlbVxuICAgKiBAcGFyYW0gaWRcbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBnZXRBZGphY2VudEl0ZW0gPSAoaWQpID0+IHtcbiAgICBpZiAoIWlkKSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCB7IGNoaWxkS2V5LCBpZEtleSwgdHJlZURhdGEgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBnZXRBZGphY2VudEl0ZW1JZCA9IChwYXJlbnQpID0+IHtcbiAgICAgIGNvbnN0IHBhcmVudEFyciA9IEFycmF5LmlzQXJyYXkocGFyZW50KSA/IHBhcmVudCA6IHBhcmVudFtjaGlsZEtleV07XG4gICAgICBjb25zdCBpbmRleCA9IHBhcmVudEFyci5maW5kSW5kZXgoY2hpbGQgPT4gY2hpbGRbaWRLZXldID09PSBpZCk7XG4gICAgICBsZXQgYWRqYWNlbnRJdGVtID0gcGFyZW50QXJyW2luZGV4ICsgMV07XG4gICAgICBpZiAoIWFkamFjZW50SXRlbSkgYWRqYWNlbnRJdGVtID0gcGFyZW50QXJyW2luZGV4IC0gMV07XG4gICAgICBpZiAoIWFkamFjZW50SXRlbSAmJiAhQXJyYXkuaXNBcnJheShwYXJlbnQpKSBhZGphY2VudEl0ZW0gPSBwYXJlbnQ7XG4gICAgICBpZiAoIWFkamFjZW50SXRlbSkgcmV0dXJuIG51bGw7XG5cbiAgICAgIHJldHVybiBhZGphY2VudEl0ZW1baWRLZXldO1xuICAgIH07XG5cbiAgICBjb25zdCBwYXJlbnQgPSB0aGlzLmdldFRyZWVJdGVtKGlkLCB0aGlzLnByb3BzLnRyZWVEYXRhLCB0cnVlKTtcbiAgICByZXR1cm4gcGFyZW50ID8gZ2V0QWRqYWNlbnRJdGVtSWQocGFyZW50KSA6IGdldEFkamFjZW50SXRlbUlkKHRyZWVEYXRhKTtcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyBhbGwgSURzIGluIHRoZSB0cmVlXG4gICAqIEBwYXJhbSBhcnJheVxuICAgKi9cbiAgZ2V0QWxsUGFyZW50SWRzID0gKGFycmF5ID0gdGhpcy5wcm9wcy50cmVlRGF0YSkgPT4ge1xuICAgIGNvbnN0IHsgaWRLZXksIGNoaWxkS2V5IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGNiID0gKGFjYywgaXRlbSkgPT4ge1xuICAgICAgbGV0IHRvdGFsID0gYWNjO1xuICAgICAgaWYgKGl0ZW1bY2hpbGRLZXldICYmIGl0ZW1bY2hpbGRLZXldLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdG90YWwgPSBhY2MuY29uY2F0KGl0ZW1baWRLZXldKTtcbiAgICAgICAgcmV0dXJuIGl0ZW1bY2hpbGRLZXldLnJlZHVjZShjYiwgdG90YWwpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRvdGFsO1xuICAgIH07XG4gICAgcmV0dXJuIGFycmF5LnJlZHVjZShjYiwgW10pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBcHBlbmRzIHByb3ZpZGVkIGl0ZW1zIHRvIHRoZSBncmlkXG4gICAqIEBwYXJhbSBpdGVtcyAtIGltbXV0YWJsZSBhcnJheSBvZiBpdGVtcyB0byBiZSBhcHBlbmRlZCB0byBncmlkXG4gICAqIEBwYXJhbSBzZXROZXdJdGVtcyAtIHNldCBjb21wbGV0ZWx5IGEgbmV3IGFycmF5IG9mIGl0ZW1zXG4gICAqL1xuICBzZXREYXRhVG9HcmlkID0gKGl0ZW1zLCBzZXROZXdJdGVtcyA9IGZhbHNlKSA9PiB7XG4gICAgbGV0IGRhdGEgPSBMaXN0KCk7XG4gICAgY29uc3QgeyBncmlkLCBncmlkQ29sdW1ucywgZ3JpZERhdGEgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFzZXROZXdJdGVtcykgZGF0YSA9IGdyaWREYXRhLnNsaWNlKCk7XG4gICAgY29uc3QgbmV3R3JpZEl0ZW1zID0gZGF0YS5jb25jYXQoaXRlbXMpO1xuXG4gICAgdGhpcy5wcm9wcy5zZXREYXRhKGdyaWQsIGdyaWRDb2x1bW5zLCBuZXdHcmlkSXRlbXMpO1xuICAgIHRoaXMucHJvcHMuY2xlYXJTZWxlY3RlZEl0ZW1zKGdyaWQpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBFeHBhbmRzIGEgcGFyZW50XG4gICAqIEBwYXJhbSBwYXJlbnRJZFxuICAgKi9cbiAgZXhwYW5kUGFyZW50ID0gKHBhcmVudElkKSA9PiB7XG4gICAgaWYgKHBhcmVudElkICYmICF0aGlzLnN0YXRlLmV4cGFuZGVkS2V5cy5maW5kKGV4cGFuZGVkSWQgPT4gZXhwYW5kZWRJZCA9PT0gcGFyZW50SWQpKSB7XG4gICAgICBjb25zdCBuZXdFeHBhbmRlZEtleXMgPSB0aGlzLnN0YXRlLmV4cGFuZGVkS2V5cy5zbGljZSgpO1xuICAgICAgbmV3RXhwYW5kZWRLZXlzLnB1c2gocGFyZW50SWQpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGV4cGFuZGVkS2V5czogbmV3RXhwYW5kZWRLZXlzIH0pO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogQ2xvc2VzIGRlbGV0ZSBjb25maXJtYXRpb24gZGlhbG9nXG4gICAqL1xuICBjbG9zZURlbGV0ZUNvbmZpcm1hdGlvbkRpYWxvZyA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2hvd0RlbGV0ZUNvbmZpcm1hdGlvbjogZmFsc2UgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIERlbGV0ZXMgYSBwYXJlbnQgbm9kZVxuICAgKi9cbiAgZGVsZXRlUGFyZW50ID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgb25DaGFuZ2UsIHRyZWVEYXRhIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHNlbGVjdGVkS2V5ID0gdGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF07XG4gICAgY29uc3QgYWN0aW9uID0ge1xuICAgICAgdHlwZTogVFJFRV9BQ1RJT05TLkRFTEVURV9QQVJFTlQsXG4gICAgfTtcbiAgICBjb25zdCBuZXh0U2VsZWN0ZWRLZXkgPSB0aGlzLmdldEFkamFjZW50SXRlbShzZWxlY3RlZEtleSk7XG4gICAgY29uc3QgbmV3SXRlbXMgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKHNlbGVjdGVkS2V5LCB0cmVlRGF0YSwgYWN0aW9uKTtcbiAgICBpZiAob25DaGFuZ2UpIG9uQ2hhbmdlKG5ld0l0ZW1zKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNlbGVjdGVkS2V5czogW25leHRTZWxlY3RlZEtleV0sXG4gICAgICBzaG93RGVsZXRlQ29uZmlybWF0aW9uOiBmYWxzZSxcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogRGVzZWxlY3RzIGFuIGl0ZW0sIGlmIGl0IGlzIGUuZy4gcmVtb3ZlZFxuICAgKi9cbiAgZGVzZWxlY3RJdGVtID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZEtleXM6IFtdIH0pO1xuICB9O1xuXG4gIHJlbmRlckhlYWRlclJpZ2h0ID0gdHJhbnNsYXRpb25zID0+IChcbiAgICA8Q29udHJvbEJhclxuICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICBvbkFkZE5ld0NsaWNrPXt0aGlzLm9uQWRkTmV3Q2xpY2t9XG4gICAgICBvbkRlbGV0ZUNsaWNrPXt0aGlzLm9uRGVsZXRlQ2xpY2t9XG4gICAgICBvbklucHV0Q2hhbmdlPXt0aGlzLm9uSW5wdXRDaGFuZ2V9XG4gICAgICBzZWxlY3RlZFRyZWVJdGVtPXt0aGlzLmdldFRyZWVJdGVtKHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdKX1cbiAgICAgIGhlaWdodD17QUNUSU9OX0JBUl9DT05UQUlORVJfSEVJR0hUfVxuICAgICAgdHJhbnNsYXRpb25zPXt0cmFuc2xhdGlvbnN9XG4gICAgLz5cbiAgKTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgdmFsdWVLZXksIGlkS2V5LCB0cmVlRGF0YSwgZ3JpZCwgZ3JpZENvbHVtbnMsIGNsYXNzTmFtZSwgdHJhbnNsYXRpb25zLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgbWVyZ2VkR3JpZCA9IE9iamVjdC5hc3NpZ24oe30sIGdyaWQsIHsgZGVmYXVsdFNob3dGaWx0ZXJpbmdSb3c6IHRydWUgfSk7XG4gICAgY29uc3QgbWVyZ2VkVHJhbnNsYXRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdFRyYW5zbGF0aW9ucywgdHJhbnNsYXRpb25zKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8UmVhY3QuRnJhZ21lbnQ+XG4gICAgICAgIDxDb250YWluZXIgY2xhc3NOYW1lPXtjbGFzc05hbWV9PlxuICAgICAgICAgIDxUcmVlQ29udGFpbmVyPlxuICAgICAgICAgICAgeyEhdHJlZURhdGEubGVuZ3RoICYmIDxUcmVlQ29tcG9uZW50XG4gICAgICAgICAgICAgIHRyZWVEYXRhPXt0cmVlRGF0YX1cbiAgICAgICAgICAgICAgZGF0YUxvb2tVcEtleT17aWRLZXl9XG4gICAgICAgICAgICAgIGRhdGFMb29rVXBWYWx1ZT17dmFsdWVLZXl9XG4gICAgICAgICAgICAgIG9uU2VsZWN0PXt0aGlzLm9uVHJlZUl0ZW1TZWxlY3R9XG4gICAgICAgICAgICAgIG9uRXhwYW5kPXt0aGlzLm9uRXhwYW5kfVxuICAgICAgICAgICAgICBjaGVja2FibGU9e2ZhbHNlfVxuICAgICAgICAgICAgICBzZWxlY3RlZEtleXM9e3RoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzfVxuICAgICAgICAgICAgICBleHBhbmRlZEtleXM9e3RoaXMuc3RhdGUuZXhwYW5kZWRLZXlzfVxuICAgICAgICAgICAgICBvbk9yZGVyQnV0dG9uQ2xpY2s9e3RoaXMub25PcmRlckNsaWNrfVxuICAgICAgICAgICAgICB0aXRsZT17bWVyZ2VkVHJhbnNsYXRpb25zLnRyZWVUaXRsZX1cbiAgICAgICAgICAgICAgc2VsZWN0YWJsZVxuICAgICAgICAgICAgICBzaG93T3JkZXJpbmdBcnJvd3NcbiAgICAgICAgICAgICAgc2hvd0V4cGFuZEFsbFxuICAgICAgICAgICAgICBoZWFkZXJSaWdodD17dGhpcy5yZW5kZXJIZWFkZXJSaWdodChtZXJnZWRUcmFuc2xhdGlvbnMpfVxuICAgICAgICAgICAgLz59XG4gICAgICAgICAgICB7IXRyZWVEYXRhLmxlbmd0aCAmJiA8Tm9JdGVtc1RleHQ+e21lcmdlZFRyYW5zbGF0aW9ucy5ub1RyZWVJdGVtc308L05vSXRlbXNUZXh0Pn1cbiAgICAgICAgICA8L1RyZWVDb250YWluZXI+XG4gICAgICAgICAgPEFycm93Q29udHJvbHNcbiAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgc2VsZWN0ZWRUcmVlSXRlbT17dGhpcy5nZXRUcmVlSXRlbSh0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXSl9XG4gICAgICAgICAgICBvbk1vdmVUb1RyZWVDbGljaz17dGhpcy5vbk1vdmVUb1RyZWVDbGlja31cbiAgICAgICAgICAgIG9uTW92ZVRvR3JpZENsaWNrPXt0aGlzLm9uTW92ZVRvR3JpZENsaWNrfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPEdyaWRcbiAgICAgICAgICAgIGdyaWQ9e21lcmdlZEdyaWR9XG4gICAgICAgICAgICBjb2x1bW5zPXtncmlkQ29sdW1uc31cbiAgICAgICAgICAgIG11bHRpU2VsZWN0XG4gICAgICAgICAgICBmaWx0ZXJpbmdcbiAgICAgICAgICAgIHJvd1NlbGVjdENoZWNrYm94Q29sdW1uXG4gICAgICAgICAgICBncmlkSGVhZGVyPXs8UHJpbWl0aXZlLlN1YnRpdGxlPnttZXJnZWRUcmFuc2xhdGlvbnMuZ3JpZFRpdGxlfTwvUHJpbWl0aXZlLlN1YnRpdGxlPn1cbiAgICAgICAgICAvPlxuXG4gICAgICAgIDwvQ29udGFpbmVyPlxuICAgICAgICB7dGhpcy5zdGF0ZS5zaG93RGVsZXRlQ29uZmlybWF0aW9uICYmXG4gICAgICAgIDxDb25maXJtRGlhbG9nXG4gICAgICAgICAgdHJhbnNsYXRpb25zPXttZXJnZWRUcmFuc2xhdGlvbnMuZGVsZXRlQ29uZmlybURpYWxvZ31cbiAgICAgICAgICBjb25maXJtQ2FsbGJhY2s9e3RoaXMuZGVsZXRlUGFyZW50fVxuICAgICAgICAgIGNhbmNlbENhbGxiYWNrPXt0aGlzLmNsb3NlRGVsZXRlQ29uZmlybWF0aW9uRGlhbG9nfVxuICAgICAgICAvPlxuICAgICAgICB9XG4gICAgICA8L1JlYWN0LkZyYWdtZW50PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==