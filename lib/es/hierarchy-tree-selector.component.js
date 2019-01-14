var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _dec, _class, _class2, _temp;

var _templateObject = _taggedTemplateLiteralLoose(['\n  height: 100%;\n  &&& {\n    padding: 0;\n  }\n'], ['\n  height: 100%;\n  &&& {\n    padding: 0;\n  }\n']),
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

    _this.setDataToGrid = function (items) {
      var setNewItems = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var data = List();
      var _this$props8 = _this.props,
          grid = _this$props8.grid,
          gridColumns = _this$props8.gridColumns,
          gridData = _this$props8.gridData;

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
  defaultExpandAll: true,
  singleRoot: true
}, _temp)) || _class);
export { HierarchyTreeSelector as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlRyZWVDb21wb25lbnQiLCJQcmltaXRpdmUiLCJEYXRhZ3JpZCIsImdyaWRTaGFwZSIsImdyaWRDb2x1bW5TaGFwZSIsIkRhdGFncmlkQWN0aW9ucyIsIkNvbmZpcm1EaWFsb2ciLCJSZWFjdCIsInN0eWxlZCIsIkxpc3QiLCJmcm9tSlMiLCJJbW11dGFibGVQcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJjb25uZWN0IiwiQ29udHJvbEJhciIsIkFycm93Q29udHJvbHMiLCJkZWZhdWx0VHJhbnNsYXRpb25zIiwiQUNUSU9OX0JBUl9DT05UQUlORVJfSEVJR0hUIiwiVFJFRV9BQ1RJT05TIiwiQUREX0NISUxEUkVOIiwiTU9WRV9MRUFGIiwiUkVOQU1FX1BBUkVOVCIsIkRFTEVURV9QQVJFTlQiLCJHcmlkIiwiQ29udGFpbmVyIiwiZGl2IiwiVHJlZUNvbnRhaW5lciIsInByb3BzIiwidGhlbWUiLCJndXR0ZXJXaWR0aCIsIk5vSXRlbXNUZXh0IiwicCIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsInNldERhdGEiLCJjbGVhclNlbGVjdGVkSXRlbXMiLCJtYXBTdGF0ZVRvUHJvcHMiLCJzdGF0ZSIsImdyaWRJZCIsImdyaWQiLCJpZCIsInNlbGVjdGVkR3JpZEl0ZW1zIiwiZGF0YWdyaWQiLCJnZXRJbiIsImdyaWREYXRhIiwiSGllcmFyY2h5VHJlZVNlbGVjdG9yIiwib25UcmVlSXRlbVNlbGVjdCIsInNlbGVjdGVkS2V5cyIsIm9uU2VsZWN0Iiwic2V0U3RhdGUiLCJvbkRlbGV0ZUNsaWNrIiwic2hvd0RlbGV0ZUNvbmZpcm1hdGlvbiIsIm9uQWRkTmV3Q2xpY2siLCJkYXRhIiwiY2FsbGJhY2siLCJvbkNoYW5nZSIsInRyZWVEYXRhIiwiaWRLZXkiLCJuZXdJdGVtcyIsInNsaWNlIiwicHVzaCIsImFjdGlvbiIsInR5cGUiLCJnZXRVcGRhdGVkVHJlZSIsInBhcmVudCIsImdldFRyZWVJdGVtIiwiZXhwYW5kUGFyZW50Iiwib25Nb3ZlVG9HcmlkQ2xpY2siLCJzZWxlY3RlZEtleSIsIm5leHRTZWxlY3RlZEtleSIsImdldEFkamFjZW50SXRlbSIsIm5ld0dyaWRJdGVtcyIsInNldERhdGFUb0dyaWQiLCJvbk9yZGVyQ2xpY2siLCJpdGVtcyIsIm9uTW92ZVRvVHJlZUNsaWNrIiwic2VsZWN0ZWRJZCIsImZpbHRlciIsImluY2x1ZGVzIiwiaSIsImdldCIsInRvSlMiLCJpdGVtIiwib25JbnB1dENoYW5nZSIsInZhbHVlIiwib25FeHBhbmQiLCJpZHMiLCJleHBhbmRlZEtleXMiLCJhcnJheSIsImZvdW5kIiwiY2hpbGRLZXkiLCJ2YWx1ZUtleSIsInJlbW92ZUFjdGlvbnMiLCJyb290SXRlbSIsImZpbmQiLCJsZW5ndGgiLCJnZXRBbGxMZWFmcyIsImRlc2VsZWN0SXRlbSIsImNoaWxkIiwiZmlsdGVyZWRDaGlsZHJlbiIsImNoaWxkSXRlbSIsImNvbmNhdCIsIlR5cGVFcnJvciIsImFscmVhZHlGb3VuZCIsImxlYWZzIiwicmV0dXJuUGFyZW50IiwiZm9yRWFjaCIsImdldEFkamFjZW50SXRlbUlkIiwicGFyZW50QXJyIiwiQXJyYXkiLCJpc0FycmF5IiwiaW5kZXgiLCJmaW5kSW5kZXgiLCJhZGphY2VudEl0ZW0iLCJzZXROZXdJdGVtcyIsImdyaWRDb2x1bW5zIiwicGFyZW50SWQiLCJleHBhbmRlZElkIiwibmV3RXhwYW5kZWRLZXlzIiwiY2xvc2VEZWxldGVDb25maXJtYXRpb25EaWFsb2ciLCJkZWxldGVQYXJlbnQiLCJyZW5kZXJIZWFkZXJSaWdodCIsInRyYW5zbGF0aW9ucyIsInJlbmRlciIsImNsYXNzTmFtZSIsIm1lcmdlZEdyaWQiLCJPYmplY3QiLCJhc3NpZ24iLCJkZWZhdWx0U2hvd0ZpbHRlcmluZ1JvdyIsIm1lcmdlZFRyYW5zbGF0aW9ucyIsInRyZWVUaXRsZSIsIm5vVHJlZUl0ZW1zIiwiZ3JpZFRpdGxlIiwiZGVsZXRlQ29uZmlybURpYWxvZyIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiLCJ1bmRlZmluZWQiLCJkZWZhdWx0RXhwYW5kQWxsIiwic2luZ2xlUm9vdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPQSxhQUFQLE1BQTBCLGtDQUExQjtBQUNBLFNBQVNDLFNBQVQsUUFBMEIsa0NBQTFCO0FBQ0EsU0FBU0MsUUFBVCxFQUFtQkMsU0FBbkIsRUFBOEJDLGVBQTlCLEVBQStDQyxlQUEvQyxRQUFzRSx3QkFBdEU7QUFDQSxPQUFPQyxhQUFQLE1BQTBCLHVDQUExQjtBQUNBLE9BQU9DLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxNQUFQLE1BQW1CLG1CQUFuQjtBQUNBLFNBQVNDLElBQVQsRUFBZUMsTUFBZixRQUE2QixXQUE3QjtBQUNBLE9BQU9DLGtCQUFQLE1BQStCLDJCQUEvQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxTQUFTQyxPQUFULFFBQXdCLGFBQXhCOztBQUVBO0FBQ0EsT0FBT0MsVUFBUCxNQUF1QixpREFBdkI7QUFDQSxPQUFPQyxhQUFQLE1BQTBCLG9EQUExQjtBQUNBLFNBQVNDLG1CQUFULFFBQW9DLHdCQUFwQzs7QUFFQSxJQUFNQyw4QkFBOEIsTUFBcEM7QUFDQSxJQUFNQyxlQUFlO0FBQ25CQyxnQkFBYyxjQURLO0FBRW5CQyxhQUFXLFdBRlE7QUFHbkJDLGlCQUFlLGVBSEk7QUFJbkJDLGlCQUFlO0FBSkksQ0FBckI7O0FBT0EsSUFBTUMsT0FBT2YsT0FBT04sUUFBUCxDQUFQLGlCQUFOOztBQU9BLElBQU1zQixZQUFZaEIsT0FBT2lCLEdBQW5CLGtCQUFOOztBQVNBLElBQU1DLGdCQUFnQmxCLE9BQU9pQixHQUF2QixtQkFHb0JSLDJCQUhwQixFQUlTO0FBQUEsU0FBU1UsTUFBTUMsS0FBTixDQUFZQyxXQUFyQjtBQUFBLENBSlQsRUFPWVosMkJBUFosQ0FBTjs7QUFpQkEsSUFBTWEsY0FBY3RCLE9BQU91QixDQUFyQixrQkFBTjs7QUFN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QUFBQyxxQkFBRCxDQUFXLFFBQVg7QUFBQTtBQUFxQmMsK0JBQW1CRztBQUF4QztBQU5kO0FBMUJGLE9BREY7QUFvQ0csV0FBSy9GLEtBQUwsQ0FBV2Msc0JBQVgsSUFDRCxvQkFBQyxhQUFEO0FBQ0Usc0JBQWM4RSxtQkFBbUJJLG1CQURuQztBQUVFLHlCQUFpQixLQUFLYixZQUZ4QjtBQUdFLHdCQUFnQixLQUFLRDtBQUh2QjtBQXJDRixLQURGO0FBOENELEc7OztFQXBiZ0QvRyxNQUFNOEgsYSxXQXVCaERDLFksR0FBZTtBQUNwQjlFLFNBQU8sSUFEYTtBQUVwQmtDLFlBQVUsTUFGVTtBQUdwQkQsWUFBVSxVQUhVO0FBSXBCbEMsWUFBVSxFQUpVO0FBS3BCb0UsYUFBVyxFQUxTO0FBTXBCRixnQkFBY3pHLG1CQU5NO0FBT3BCdUIsTUFBSSxnQkFQZ0I7QUFRcEJRLFlBQVV3RixTQVJVO0FBU3BCakYsWUFBVWlGLFNBVFU7QUFVcEJDLG9CQUFrQixJQVZFO0FBV3BCQyxjQUFZO0FBWFEsQztTQXZCSDdGLHFCIiwiZmlsZSI6ImhpZXJhcmNoeS10cmVlLXNlbGVjdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUcmVlQ29tcG9uZW50IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LXRyZWUtY29tcG9uZW50JztcbmltcG9ydCB7IFByaW1pdGl2ZSB9IGZyb20gJ0BvcHVzY2FwaXRhL29jLWNtLWNvbW1vbi1sYXlvdXRzJztcbmltcG9ydCB7IERhdGFncmlkLCBncmlkU2hhcGUsIGdyaWRDb2x1bW5TaGFwZSwgRGF0YWdyaWRBY3Rpb25zIH0gZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtZ3JpZCc7XG5pbXBvcnQgQ29uZmlybURpYWxvZyBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1jb25maXJtYXRpb24tZGlhbG9nJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCB7IExpc3QsIGZyb21KUyB9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgSW1tdXRhYmxlUHJvcFR5cGVzIGZyb20gJ3JlYWN0LWltbXV0YWJsZS1wcm9wdHlwZXMnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbi8vIEFwcCBpbXBvcnRzXG5pbXBvcnQgQ29udHJvbEJhciBmcm9tICcuL2hpZXJhcmNoeS10cmVlLXNlbGVjdG9yLWNvbnRyb2wtYmFyLmNvbXBvbmVudCc7XG5pbXBvcnQgQXJyb3dDb250cm9scyBmcm9tICcuL2hpZXJhcmNoeS10cmVlLXNlbGVjdG9yLWFycm93LWNvbnRyb2xzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBkZWZhdWx0VHJhbnNsYXRpb25zIH0gZnJvbSAnLi9oaWVyYXJjaHktdHJlZS51dGlscyc7XG5cbmNvbnN0IEFDVElPTl9CQVJfQ09OVEFJTkVSX0hFSUdIVCA9ICc1N3B4JztcbmNvbnN0IFRSRUVfQUNUSU9OUyA9IHtcbiAgQUREX0NISUxEUkVOOiAnQUREX0NISUxEUkVOJyxcbiAgTU9WRV9MRUFGOiAnTU9WRV9MRUFGJyxcbiAgUkVOQU1FX1BBUkVOVDogJ1JFTkFNRV9QQVJFTlQnLFxuICBERUxFVEVfUEFSRU5UOiAnREVMRVRFX1BBUkVOVCcsXG59O1xuXG5jb25zdCBHcmlkID0gc3R5bGVkKERhdGFncmlkKWBcbiAgaGVpZ2h0OiAxMDAlO1xuICAmJiYge1xuICAgIHBhZGRpbmc6IDA7XG4gIH1cbmA7XG5cbmNvbnN0IENvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIG1pbi1oZWlnaHQ6IDMwMHB4O1xuICA+IGRpdiB7XG4gICAgd2lkdGg6IDUwJTtcbiAgICBmbGV4OiAxIDEgMTAwJTtcbiAgfVxuYDtcblxuY29uc3QgVHJlZUNvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gIGhlaWdodDoxMDAlO1xuICAub2Mtc2Nyb2xsYmFyLWNvbnRhaW5lciB7XG4gICAgaGVpZ2h0OiBjYWxjKDEwMCUgLSAke0FDVElPTl9CQVJfQ09OVEFJTkVSX0hFSUdIVH0pO1xuICAgIHBhZGRpbmc6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuZ3V0dGVyV2lkdGh9O1xuICB9XG4gIC50aXRsZS1jb250YWluZXIge1xuICAgIG1pbi1oZWlnaHQ6ICR7QUNUSU9OX0JBUl9DT05UQUlORVJfSEVJR0hUfTtcbiAgfVxuICAub2MtcmVhY3QtdHJlZSB7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIC5yYy10cmVlLWljb25FbGUucmMtdHJlZS1pY29uX19jdXN0b21pemUge1xuICAgICAgICBkaXNwbGF5Om5vbmU7XG4gICAgfVxuICB9XG5gO1xuXG5jb25zdCBOb0l0ZW1zVGV4dCA9IHN0eWxlZC5wYFxuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG5gO1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSB7XG4gIHNldERhdGE6IERhdGFncmlkQWN0aW9ucy5zZXREYXRhLFxuICBjbGVhclNlbGVjdGVkSXRlbXM6IERhdGFncmlkQWN0aW9ucy5jbGVhclNlbGVjdGVkSXRlbXMsXG59O1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUsIHByb3BzKSA9PiB7XG4gIGNvbnN0IGdyaWRJZCA9IHByb3BzLmdyaWQuaWQ7XG4gIHJldHVybiB7XG4gICAgc2VsZWN0ZWRHcmlkSXRlbXM6IHN0YXRlLmRhdGFncmlkLmdldEluKFtncmlkSWQsICdzZWxlY3RlZEl0ZW1zJ10sIExpc3QoKSksXG4gICAgZ3JpZERhdGE6IHN0YXRlLmRhdGFncmlkLmdldEluKFtncmlkSWQsICdhbGxEYXRhJ10sIExpc3QoKSksXG4gIH07XG59O1xuXG5AY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcylcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhpZXJhcmNoeVRyZWVTZWxlY3RvciBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGlkS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHZhbHVlS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNoaWxkS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHRyZWVEYXRhOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc2hhcGUoe30pKSxcbiAgICBncmlkOiBncmlkU2hhcGUuaXNSZXF1aXJlZCxcbiAgICBncmlkQ29sdW1uczogUHJvcFR5cGVzLmFycmF5T2YoZ3JpZENvbHVtblNoYXBlKS5pc1JlcXVpcmVkLFxuICAgIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBzZXREYXRhOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGNsZWFyU2VsZWN0ZWRJdGVtczogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBzZWxlY3RlZEdyaWRJdGVtczogSW1tdXRhYmxlUHJvcFR5cGVzLmxpc3QuaXNSZXF1aXJlZCxcbiAgICBncmlkRGF0YTogSW1tdXRhYmxlUHJvcFR5cGVzLmxpc3QuaXNSZXF1aXJlZCxcbiAgICB0cmFuc2xhdGlvbnM6IFByb3BUeXBlcy5zaGFwZSh7fSksXG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGVmYXVsdEV4cGFuZEFsbDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2luZ2xlUm9vdDogUHJvcFR5cGVzLmJvb2wsXG5cbiAgICAvLyBDYWxsYmFja3NcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgaWRLZXk6ICdpZCcsXG4gICAgdmFsdWVLZXk6ICduYW1lJyxcbiAgICBjaGlsZEtleTogJ2NoaWxkcmVuJyxcbiAgICB0cmVlRGF0YTogW10sXG4gICAgY2xhc3NOYW1lOiAnJyxcbiAgICB0cmFuc2xhdGlvbnM6IGRlZmF1bHRUcmFuc2xhdGlvbnMsXG4gICAgaWQ6ICdoaWVyYXJjaHktdHJlZScsXG4gICAgb25TZWxlY3Q6IHVuZGVmaW5lZCxcbiAgICBvbkNoYW5nZTogdW5kZWZpbmVkLFxuICAgIGRlZmF1bHRFeHBhbmRBbGw6IHRydWUsXG4gICAgc2luZ2xlUm9vdDogdHJ1ZSxcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzZWxlY3RlZEtleXM6IFtdLFxuICAgICAgc2hvd0RlbGV0ZUNvbmZpcm1hdGlvbjogZmFsc2UsXG4gICAgfTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFNlbGVjdHMgYSB0cmVlIGl0ZW1cbiAgICogQHBhcmFtIHNlbGVjdGVkS2V5cyAoYXJyYXkpXG4gICAqL1xuICBvblRyZWVJdGVtU2VsZWN0ID0gKHNlbGVjdGVkS2V5cykgPT4ge1xuICAgIGNvbnN0IHsgb25TZWxlY3QgfSA9IHRoaXMucHJvcHM7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkS2V5cyB9LCAoKSA9PiB7XG4gICAgICBpZiAob25TZWxlY3QpIG9uU2VsZWN0KHNlbGVjdGVkS2V5cyk7XG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIERpc3BsYXlzIGEgY29uZmlybWF0aW9uIGRpYWxvZ1xuICAgKi9cbiAgb25EZWxldGVDbGljayA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2hvd0RlbGV0ZUNvbmZpcm1hdGlvbjogdHJ1ZSB9KTtcbiAgfTtcblxuXG4gIC8qKlxuICAgKiBBZGRzIGEgbmV3IG5vZGUgdG8gdGhlIHJvb3Qgb2YgdGhlIHRyZWUsIG9yIHVuZGVyIGEgc2VsZWN0ZWQgdHJlZSBub2RlIHVzaW5nXG4gICAqIEFERF9DSElMRFJFTiBhY3Rpb25cbiAgICogQHBhcmFtIGRhdGEgLSBkYXRhIHRvIGJlIGFkZGVkXG4gICAqIEBwYXJhbSBjYWxsYmFja1xuICAgKi9cbiAgb25BZGROZXdDbGljayA9IChkYXRhLCBjYWxsYmFjaykgPT4ge1xuICAgIGNvbnN0IHsgb25DaGFuZ2UsIHRyZWVEYXRhLCBpZEtleSB9ID0gdGhpcy5wcm9wcztcbiAgICBsZXQgbmV3SXRlbXMgPSB0cmVlRGF0YS5zbGljZSgpO1xuXG4gICAgLy8gSWYgbm8gdHJlZSBub2RlIGlzIHNlbGVjdGVkLCB3ZSdsbCBwbGFjZSB0aGUgbmV3IGl0ZW0gdG8gdGhlIHJvb3RcbiAgICAvLyBvZiB0aGUgdHJlZVxuICAgIGlmICghdGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF0pIHtcbiAgICAgIG5ld0l0ZW1zLnB1c2goZGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGFjdGlvbiA9IHtcbiAgICAgICAgdHlwZTogVFJFRV9BQ1RJT05TLkFERF9DSElMRFJFTixcbiAgICAgICAgZGF0YSxcbiAgICAgIH07XG4gICAgICBuZXdJdGVtcyA9IHRoaXMuZ2V0VXBkYXRlZFRyZWUodGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF0sIHRyZWVEYXRhLCBhY3Rpb24pO1xuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRLZXlzOiBbZGF0YVtpZEtleV1dIH0sICgpID0+IHtcbiAgICAgIC8vIElmIHRoZSBwYXJlbnQgaXMgbm90IHlldCBleHBhbmRlZCwgd2Ugd2lsbCBleHBhbmQgaXQgbm93XG4gICAgICBjb25zdCBwYXJlbnQgPSB0aGlzLmdldFRyZWVJdGVtKGRhdGFbaWRLZXldLCB0cmVlRGF0YSwgdHJ1ZSkgfHwge307XG4gICAgICB0aGlzLmV4cGFuZFBhcmVudChwYXJlbnRbaWRLZXldKTtcblxuICAgICAgaWYgKG9uQ2hhbmdlKSBvbkNoYW5nZShuZXdJdGVtcyk7XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZW1vdmVzIHRoZSBjaG9zZW4gaXRlbSBmcm9tIGEgdHJlZSBhbmQgdXBkYXRlcyB0aGUgZ3JpZCB1c2luZyBNT1ZFX0xFQUZcbiAgICogYWN0aW9uXG4gICAqL1xuICBvbk1vdmVUb0dyaWRDbGljayA9ICgpID0+IHtcbiAgICBjb25zdCB7IHRyZWVEYXRhLCBvbkNoYW5nZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzZWxlY3RlZEtleSA9IHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdO1xuICAgIGNvbnN0IGFjdGlvbiA9IHtcbiAgICAgIHR5cGU6IFRSRUVfQUNUSU9OUy5NT1ZFX0xFQUYsXG4gICAgICBkYXRhOiB0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXSxcbiAgICB9O1xuICAgIGNvbnN0IG5leHRTZWxlY3RlZEtleSA9IHRoaXMuZ2V0QWRqYWNlbnRJdGVtKHNlbGVjdGVkS2V5KTtcbiAgICBjb25zdCBuZXdHcmlkSXRlbXMgPSBmcm9tSlMoW3RoaXMuZ2V0VHJlZUl0ZW0oc2VsZWN0ZWRLZXkpXSk7XG4gICAgY29uc3QgbmV3SXRlbXMgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKHNlbGVjdGVkS2V5LCB0cmVlRGF0YSwgYWN0aW9uKTtcblxuICAgIHRoaXMuc2V0RGF0YVRvR3JpZChuZXdHcmlkSXRlbXMpO1xuICAgIGlmIChvbkNoYW5nZSkgb25DaGFuZ2UobmV3SXRlbXMpO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2VsZWN0ZWRLZXlzOiBbbmV4dFNlbGVjdGVkS2V5XSxcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogQ2FsbHMgb25DaGFuZ2UgY2FsbGJhY2sgd2hlbmV2ZXIgdXNlciByZW9yZGVycyB0cmVlIGl0ZW1zIHVzaW5nIG9yZGVyaW5nIGFycm93c1xuICAgKiBAcGFyYW0gaXRlbXNcbiAgICovXG4gIG9uT3JkZXJDbGljayA9IChpdGVtcykgPT4ge1xuICAgIHRoaXMucHJvcHMub25DaGFuZ2UoaXRlbXMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBZGRzIHNlbGVjdGVkIGdyaWQgaXRlbXMgdG8gdGhlIGNob3NlbiB0cmVlIG5vZGUgdXNpbmcgQUREX0NISUxEUkVOIGFjdGlvblxuICAgKi9cbiAgb25Nb3ZlVG9UcmVlQ2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgb25DaGFuZ2UsIHNlbGVjdGVkR3JpZEl0ZW1zLCBncmlkRGF0YSwgdHJlZURhdGEsIGlkS2V5LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHNlbGVjdGVkSWQgPSB0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXTtcblxuICAgIGNvbnN0IGFjdGlvbiA9IHtcbiAgICAgIHR5cGU6IFRSRUVfQUNUSU9OUy5BRERfQ0hJTERSRU4sXG4gICAgICBkYXRhOiBncmlkRGF0YVxuICAgICAgICAuZmlsdGVyKGkgPT4gc2VsZWN0ZWRHcmlkSXRlbXMuaW5jbHVkZXMoaS5nZXQoaWRLZXkpKSlcbiAgICAgICAgLnRvSlMoKSxcbiAgICB9O1xuICAgIGNvbnN0IG5ld0l0ZW1zID0gdGhpcy5nZXRVcGRhdGVkVHJlZShzZWxlY3RlZElkLCB0cmVlRGF0YSwgYWN0aW9uKTtcbiAgICBjb25zdCBuZXdHcmlkSXRlbXMgPSBncmlkRGF0YS5maWx0ZXIoaXRlbSA9PiAhc2VsZWN0ZWRHcmlkSXRlbXMuaW5jbHVkZXMoaXRlbS5nZXQoaWRLZXkpKSk7XG5cbiAgICB0aGlzLmV4cGFuZFBhcmVudChzZWxlY3RlZElkLCB0cnVlKTtcbiAgICB0aGlzLnNldERhdGFUb0dyaWQobmV3R3JpZEl0ZW1zLCB0cnVlKTtcbiAgICBpZiAob25DaGFuZ2UpIG9uQ2hhbmdlKG5ld0l0ZW1zKTtcbiAgfTtcblxuICAvKipcbiAgICogUmVuYW1lcyB0aGUgY2hvc2VuIHRyZWUgbm9kZSB1c2luZyBhIFJFTkFNRV9QQVJFTlQgYWN0aW9uXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKi9cbiAgb25JbnB1dENoYW5nZSA9ICh2YWx1ZSkgPT4ge1xuICAgIGNvbnN0IHsgdHJlZURhdGEsIG9uQ2hhbmdlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGFjdGlvbiA9IHtcbiAgICAgIHR5cGU6IFRSRUVfQUNUSU9OUy5SRU5BTUVfUEFSRU5ULFxuICAgICAgZGF0YTogdmFsdWUsXG4gICAgfTtcbiAgICBjb25zdCBuZXdJdGVtcyA9IHRoaXMuZ2V0VXBkYXRlZFRyZWUodGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF0sIHRyZWVEYXRhLCBhY3Rpb24pO1xuICAgIGlmIChvbkNoYW5nZSkgb25DaGFuZ2UobmV3SXRlbXMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBGaXJlZCBvbiBleHBhbmRcbiAgICogQHBhcmFtIGlkc1xuICAgKi9cbiAgb25FeHBhbmQgPSAoaWRzKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBleHBhbmRlZEtleXM6IGlkcyxcbiAgICB9KTtcbiAgfTtcblxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHVwZGF0ZWQgdHJlZSBpdGVtcy5cbiAgICogQHBhcmFtIGlkIC0gdGFyZ2V0IGl0ZW1cbiAgICogQHBhcmFtIGFycmF5IC0gYXJyYXkgd2hlcmUgdGFyZ2V0IGl0ZW0gaXMgYmVpbmcgc2VhcmNoZWRcbiAgICogQHBhcmFtIGFjdGlvbiAtIGFjdGlvbiB0byBiZSBwZXJmb3JtZWQge3R5cGUsIGRhdGF9XG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgZ2V0VXBkYXRlZFRyZWUgPSAoaWQsIGFycmF5ID0gdGhpcy5wcm9wcy50cmVlRGF0YSwgYWN0aW9uKSA9PiB7XG4gICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgY29uc3QgeyBpZEtleSwgY2hpbGRLZXksIHZhbHVlS2V5IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IG5ld0l0ZW1zID0gYXJyYXkuc2xpY2UoKTtcbiAgICBjb25zdCByZW1vdmVBY3Rpb25zID0gW1RSRUVfQUNUSU9OUy5NT1ZFX0xFQUYsIFRSRUVfQUNUSU9OUy5ERUxFVEVfUEFSRU5UXTtcblxuICAgIC8vIElmIGRlbGV0ZWQgcGFyZW50IGl0ZW0gaXMgaW4gdGhlIHJvb3Qgbm9kZVxuICAgIGlmIChhY3Rpb24udHlwZSA9PT0gVFJFRV9BQ1RJT05TLkRFTEVURV9QQVJFTlQpIHtcbiAgICAgIGNvbnN0IHJvb3RJdGVtID0gYXJyYXkuZmluZChpdGVtID0+IGl0ZW1baWRLZXldID09PSBpZCk7XG4gICAgICBpZiAocm9vdEl0ZW0pIHtcbiAgICAgICAgaWYgKHJvb3RJdGVtW2NoaWxkS2V5XS5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLnNldERhdGFUb0dyaWQoZnJvbUpTKHRoaXMuZ2V0QWxsTGVhZnMocm9vdEl0ZW1bY2hpbGRLZXldKSkpO1xuICAgICAgICAgIHRoaXMuZGVzZWxlY3RJdGVtKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ld0l0ZW1zLmZpbHRlcihpdGVtID0+IGl0ZW1baWRLZXldICE9PSBpZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdJdGVtcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3QgaXRlbSA9IG5ld0l0ZW1zW2ldO1xuICAgICAgaWYgKHJlbW92ZUFjdGlvbnMuaW5jbHVkZXMoYWN0aW9uLnR5cGUpICYmIGl0ZW1bY2hpbGRLZXldICYmICFmb3VuZCkge1xuICAgICAgICBmb3VuZCA9ICEhaXRlbVtjaGlsZEtleV0uZmluZChjaGlsZCA9PiBjaGlsZFtpZEtleV0gPT09IGlkKTtcbiAgICAgICAgaWYgKGZvdW5kKSB7XG4gICAgICAgICAgLy8gV2hlbiByZW1vdmluZyBhbiBpdGVtIHdlIG11c3QgZmlyc3QgZmluZCBpdHMgcGFyZW50IGFuZCBhbHRlciBpdHMgY2hpbGRyZW4gYXJyYXlcbiAgICAgICAgICBpZiAoYWN0aW9uLnR5cGUgPT09IFRSRUVfQUNUSU9OUy5NT1ZFX0xFQUYpIHtcbiAgICAgICAgICAgIGl0ZW1bY2hpbGRLZXldID0gaXRlbVtjaGlsZEtleV0uZmlsdGVyKGNoaWxkID0+IGNoaWxkW2lkS2V5XSAhPT0gaWQpO1xuICAgICAgICAgICAgdGhpcy5kZXNlbGVjdEl0ZW0oKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGFjdGlvbi50eXBlID09PSBUUkVFX0FDVElPTlMuREVMRVRFX1BBUkVOVCkge1xuICAgICAgICAgICAgLy8gd2UgbXVzdCBmaXJzdCBmaWx0ZXIgdGhlIGNoaWxkcmVuLCBzbyB0aGF0IHdlIHdvbid0IGdldCBsZWFmcyBmcm9tXG4gICAgICAgICAgICAvLyBvdGhlciBjaGlsZCBicmFuY2hlc1xuICAgICAgICAgICAgY29uc3QgZmlsdGVyZWRDaGlsZHJlbiA9IGl0ZW1bY2hpbGRLZXldLmZpbHRlcihjaGlsZEl0ZW0gPT4gY2hpbGRJdGVtW2lkS2V5XSA9PT0gaWQpO1xuICAgICAgICAgICAgdGhpcy5zZXREYXRhVG9HcmlkKGZyb21KUyh0aGlzLmdldEFsbExlYWZzKGZpbHRlcmVkQ2hpbGRyZW4pKSk7XG4gICAgICAgICAgICB0aGlzLmRlc2VsZWN0SXRlbSgpO1xuICAgICAgICAgICAgaXRlbVtjaGlsZEtleV0gPSBpdGVtW2NoaWxkS2V5XS5maWx0ZXIoY2hpbGRJdGVtID0+IGNoaWxkSXRlbVtpZEtleV0gIT09IGlkKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1baWRLZXldID09PSBpZCAmJiAhZm91bmQpIHtcbiAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgICAgY2FzZSBUUkVFX0FDVElPTlMuQUREX0NISUxEUkVOOlxuICAgICAgICAgICAgaXRlbVtjaGlsZEtleV0gPSAoaXRlbVtjaGlsZEtleV0gfHwgW10pLmNvbmNhdChhY3Rpb24uZGF0YSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIFRSRUVfQUNUSU9OUy5SRU5BTUVfUEFSRU5UOlxuICAgICAgICAgICAgaXRlbVt2YWx1ZUtleV0gPSBhY3Rpb24uZGF0YTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBY3Rpb24gdHlwZSBpcyB1bmRlZmluZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtW2NoaWxkS2V5XSAmJiAhZm91bmQpIGZvdW5kID0gdGhpcy5nZXRVcGRhdGVkVHJlZShpZCwgaXRlbVtjaGlsZEtleV0sIGFjdGlvbik7XG4gICAgfVxuXG4gICAgaWYgKCFmb3VuZCkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiBuZXdJdGVtcztcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyByZWN1cnNpdmVseSBhbGwgbGVhZiBpdGVtcyBmcm9tIGEgZ2l2ZW4gYXJyYXlcbiAgICogQHBhcmFtIGFycmF5XG4gICAqIEBwYXJhbSBhbHJlYWR5Rm91bmQgKHVzZWQgcmVjdXJzaXZlbHkpXG4gICAqL1xuICBnZXRBbGxMZWFmcyA9IChhcnJheSwgYWxyZWFkeUZvdW5kID0gW10pID0+IHtcbiAgICBjb25zdCB7IGNoaWxkS2V5IH0gPSB0aGlzLnByb3BzO1xuICAgIGxldCBsZWFmcyA9IGFscmVhZHlGb3VuZDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSBhcnJheVtpXTtcbiAgICAgIGlmIChpdGVtW2NoaWxkS2V5XSkge1xuICAgICAgICBsZWFmcyA9IHRoaXMuZ2V0QWxsTGVhZnMoaXRlbVtjaGlsZEtleV0sIGFscmVhZHlGb3VuZCk7XG4gICAgICB9XG4gICAgICBpZiAoIWl0ZW1bY2hpbGRLZXldKSBsZWFmcy5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgICByZXR1cm4gbGVhZnM7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSB0cmVlIGl0ZW0gYnkgSURcbiAgICogQHBhcmFtIGlkXG4gICAqIEBwYXJhbSBhcnJheVxuICAgKiBAcGFyYW0gcmV0dXJuUGFyZW50IC0gcmV0dXJuIGl0ZW0ncyBwYXJlbnQgaW5zdGVhZCBvZiB0aGUgaXRlbVxuICAgKiBAcGFyYW0gcGFyZW50IC0gcGFyZW50IGl0ZW0gKHVzZWQgcmVjdXJzaXZlbHkpXG4gICAqIEByZXR1cm5zIHt7fX1cbiAgICovXG4gIGdldFRyZWVJdGVtID0gKGlkLCBhcnJheSA9IHRoaXMucHJvcHMudHJlZURhdGEsIHJldHVyblBhcmVudCA9IGZhbHNlLCBwYXJlbnQgPSBudWxsKSA9PiB7XG4gICAgY29uc3QgeyBjaGlsZEtleSwgaWRLZXkgfSA9IHRoaXMucHJvcHM7XG4gICAgbGV0IGZvdW5kID0gYXJyYXkuZmluZChpdGVtID0+IGl0ZW1baWRLZXldID09PSBpZCk7XG5cbiAgICBpZiAoZm91bmQgJiYgcmV0dXJuUGFyZW50KSBmb3VuZCA9IHBhcmVudDtcblxuICAgIGlmICghZm91bmQpIHtcbiAgICAgIGFycmF5LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgaWYgKGl0ZW1bY2hpbGRLZXldICYmICFmb3VuZCkge1xuICAgICAgICAgIGZvdW5kID0gdGhpcy5nZXRUcmVlSXRlbShpZCwgaXRlbVtjaGlsZEtleV0sIHJldHVyblBhcmVudCwgaXRlbSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gZm91bmQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIEdldCBhZGphY2VudCBpdGVtIChpZCkgaW4gcGFyZW50IGFycmF5LiBVc2VkIHdoZW4gbW92aW5nIGl0ZW1zIGZyb20gdHJlZVxuICAgKiB0byBncmlkL2RlbGV0aW5nIGFuIGl0ZW1cbiAgICogQHBhcmFtIGlkXG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgZ2V0QWRqYWNlbnRJdGVtID0gKGlkKSA9PiB7XG4gICAgaWYgKCFpZCkgcmV0dXJuIG51bGw7XG4gICAgY29uc3QgeyBjaGlsZEtleSwgaWRLZXksIHRyZWVEYXRhIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgZ2V0QWRqYWNlbnRJdGVtSWQgPSAocGFyZW50KSA9PiB7XG4gICAgICBjb25zdCBwYXJlbnRBcnIgPSBBcnJheS5pc0FycmF5KHBhcmVudCkgPyBwYXJlbnQgOiBwYXJlbnRbY2hpbGRLZXldO1xuICAgICAgY29uc3QgaW5kZXggPSBwYXJlbnRBcnIuZmluZEluZGV4KGNoaWxkID0+IGNoaWxkW2lkS2V5XSA9PT0gaWQpO1xuICAgICAgbGV0IGFkamFjZW50SXRlbSA9IHBhcmVudEFycltpbmRleCArIDFdO1xuICAgICAgaWYgKCFhZGphY2VudEl0ZW0pIGFkamFjZW50SXRlbSA9IHBhcmVudEFycltpbmRleCAtIDFdO1xuICAgICAgaWYgKCFhZGphY2VudEl0ZW0gJiYgIUFycmF5LmlzQXJyYXkocGFyZW50KSkgYWRqYWNlbnRJdGVtID0gcGFyZW50O1xuICAgICAgaWYgKCFhZGphY2VudEl0ZW0pIHJldHVybiBudWxsO1xuXG4gICAgICByZXR1cm4gYWRqYWNlbnRJdGVtW2lkS2V5XTtcbiAgICB9O1xuXG4gICAgY29uc3QgcGFyZW50ID0gdGhpcy5nZXRUcmVlSXRlbShpZCwgdGhpcy5wcm9wcy50cmVlRGF0YSwgdHJ1ZSk7XG4gICAgcmV0dXJuIHBhcmVudCA/IGdldEFkamFjZW50SXRlbUlkKHBhcmVudCkgOiBnZXRBZGphY2VudEl0ZW1JZCh0cmVlRGF0YSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEFwcGVuZHMgcHJvdmlkZWQgaXRlbXMgdG8gdGhlIGdyaWRcbiAgICogQHBhcmFtIGl0ZW1zIC0gaW1tdXRhYmxlIGFycmF5IG9mIGl0ZW1zIHRvIGJlIGFwcGVuZGVkIHRvIGdyaWRcbiAgICogQHBhcmFtIHNldE5ld0l0ZW1zIC0gc2V0IGNvbXBsZXRlbHkgYSBuZXcgYXJyYXkgb2YgaXRlbXNcbiAgICovXG4gIHNldERhdGFUb0dyaWQgPSAoaXRlbXMsIHNldE5ld0l0ZW1zID0gZmFsc2UpID0+IHtcbiAgICBsZXQgZGF0YSA9IExpc3QoKTtcbiAgICBjb25zdCB7IGdyaWQsIGdyaWRDb2x1bW5zLCBncmlkRGF0YSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIXNldE5ld0l0ZW1zKSBkYXRhID0gZ3JpZERhdGEuc2xpY2UoKTtcbiAgICBjb25zdCBuZXdHcmlkSXRlbXMgPSBkYXRhLmNvbmNhdChpdGVtcyk7XG5cbiAgICB0aGlzLnByb3BzLnNldERhdGEoZ3JpZCwgZ3JpZENvbHVtbnMsIG5ld0dyaWRJdGVtcyk7XG4gICAgdGhpcy5wcm9wcy5jbGVhclNlbGVjdGVkSXRlbXMoZ3JpZCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEV4cGFuZHMgYSBwYXJlbnRcbiAgICogQHBhcmFtIHBhcmVudElkXG4gICAqL1xuICBleHBhbmRQYXJlbnQgPSAocGFyZW50SWQpID0+IHtcbiAgICBpZiAocGFyZW50SWQgJiYgIXRoaXMuc3RhdGUuZXhwYW5kZWRLZXlzLmZpbmQoZXhwYW5kZWRJZCA9PiBleHBhbmRlZElkID09PSBwYXJlbnRJZCkpIHtcbiAgICAgIGNvbnN0IG5ld0V4cGFuZGVkS2V5cyA9IHRoaXMuc3RhdGUuZXhwYW5kZWRLZXlzLnNsaWNlKCk7XG4gICAgICBuZXdFeHBhbmRlZEtleXMucHVzaChwYXJlbnRJZCk7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgZXhwYW5kZWRLZXlzOiBuZXdFeHBhbmRlZEtleXMgfSk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBDbG9zZXMgZGVsZXRlIGNvbmZpcm1hdGlvbiBkaWFsb2dcbiAgICovXG4gIGNsb3NlRGVsZXRlQ29uZmlybWF0aW9uRGlhbG9nID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzaG93RGVsZXRlQ29uZmlybWF0aW9uOiBmYWxzZSB9KTtcbiAgfTtcblxuICAvKipcbiAgICogRGVsZXRlcyBhIHBhcmVudCBub2RlXG4gICAqL1xuICBkZWxldGVQYXJlbnQgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBvbkNoYW5nZSwgdHJlZURhdGEgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgc2VsZWN0ZWRLZXkgPSB0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXTtcbiAgICBjb25zdCBhY3Rpb24gPSB7XG4gICAgICB0eXBlOiBUUkVFX0FDVElPTlMuREVMRVRFX1BBUkVOVCxcbiAgICB9O1xuICAgIGNvbnN0IG5leHRTZWxlY3RlZEtleSA9IHRoaXMuZ2V0QWRqYWNlbnRJdGVtKHNlbGVjdGVkS2V5KTtcbiAgICBjb25zdCBuZXdJdGVtcyA9IHRoaXMuZ2V0VXBkYXRlZFRyZWUoc2VsZWN0ZWRLZXksIHRyZWVEYXRhLCBhY3Rpb24pO1xuICAgIGlmIChvbkNoYW5nZSkgb25DaGFuZ2UobmV3SXRlbXMpO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2VsZWN0ZWRLZXlzOiBbbmV4dFNlbGVjdGVkS2V5XSxcbiAgICAgIHNob3dEZWxldGVDb25maXJtYXRpb246IGZhbHNlLFxuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBEZXNlbGVjdHMgYW4gaXRlbSwgaWYgaXQgaXMgZS5nLiByZW1vdmVkXG4gICAqL1xuICBkZXNlbGVjdEl0ZW0gPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkS2V5czogW10gfSk7XG4gIH07XG5cbiAgcmVuZGVySGVhZGVyUmlnaHQgPSB0cmFuc2xhdGlvbnMgPT4gKFxuICAgIDxDb250cm9sQmFyXG4gICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgIG9uQWRkTmV3Q2xpY2s9e3RoaXMub25BZGROZXdDbGlja31cbiAgICAgIG9uRGVsZXRlQ2xpY2s9e3RoaXMub25EZWxldGVDbGlja31cbiAgICAgIG9uSW5wdXRDaGFuZ2U9e3RoaXMub25JbnB1dENoYW5nZX1cbiAgICAgIHNlbGVjdGVkVHJlZUl0ZW09e3RoaXMuZ2V0VHJlZUl0ZW0odGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF0pfVxuICAgICAgaGVpZ2h0PXtBQ1RJT05fQkFSX0NPTlRBSU5FUl9IRUlHSFR9XG4gICAgICB0cmFuc2xhdGlvbnM9e3RyYW5zbGF0aW9uc31cbiAgICAvPlxuICApO1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICB2YWx1ZUtleSwgaWRLZXksIHRyZWVEYXRhLCBncmlkLCBncmlkQ29sdW1ucywgY2xhc3NOYW1lLCB0cmFuc2xhdGlvbnMsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBtZXJnZWRHcmlkID0gT2JqZWN0LmFzc2lnbih7fSwgZ3JpZCwgeyBkZWZhdWx0U2hvd0ZpbHRlcmluZ1JvdzogdHJ1ZSB9KTtcbiAgICBjb25zdCBtZXJnZWRUcmFuc2xhdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0VHJhbnNsYXRpb25zLCB0cmFuc2xhdGlvbnMpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxSZWFjdC5GcmFnbWVudD5cbiAgICAgICAgPENvbnRhaW5lciBjbGFzc05hbWU9e2NsYXNzTmFtZX0+XG4gICAgICAgICAgPFRyZWVDb250YWluZXI+XG4gICAgICAgICAgICB7ISF0cmVlRGF0YS5sZW5ndGggJiYgPFRyZWVDb21wb25lbnRcbiAgICAgICAgICAgICAgdHJlZURhdGE9e3RyZWVEYXRhfVxuICAgICAgICAgICAgICBkYXRhTG9va1VwS2V5PXtpZEtleX1cbiAgICAgICAgICAgICAgZGF0YUxvb2tVcFZhbHVlPXt2YWx1ZUtleX1cbiAgICAgICAgICAgICAgb25TZWxlY3Q9e3RoaXMub25UcmVlSXRlbVNlbGVjdH1cbiAgICAgICAgICAgICAgb25FeHBhbmQ9e3RoaXMub25FeHBhbmR9XG4gICAgICAgICAgICAgIGNoZWNrYWJsZT17ZmFsc2V9XG4gICAgICAgICAgICAgIHNlbGVjdGVkS2V5cz17dGhpcy5zdGF0ZS5zZWxlY3RlZEtleXN9XG4gICAgICAgICAgICAgIGV4cGFuZGVkS2V5cz17dGhpcy5zdGF0ZS5leHBhbmRlZEtleXN9XG4gICAgICAgICAgICAgIG9uT3JkZXJCdXR0b25DbGljaz17dGhpcy5vbk9yZGVyQ2xpY2t9XG4gICAgICAgICAgICAgIHRpdGxlPXttZXJnZWRUcmFuc2xhdGlvbnMudHJlZVRpdGxlfVxuICAgICAgICAgICAgICBzZWxlY3RhYmxlXG4gICAgICAgICAgICAgIHNob3dPcmRlcmluZ0Fycm93c1xuICAgICAgICAgICAgICBzaG93RXhwYW5kQWxsXG4gICAgICAgICAgICAgIGhlYWRlclJpZ2h0PXt0aGlzLnJlbmRlckhlYWRlclJpZ2h0KG1lcmdlZFRyYW5zbGF0aW9ucyl9XG4gICAgICAgICAgICAvPn1cbiAgICAgICAgICAgIHshdHJlZURhdGEubGVuZ3RoICYmIDxOb0l0ZW1zVGV4dD57bWVyZ2VkVHJhbnNsYXRpb25zLm5vVHJlZUl0ZW1zfTwvTm9JdGVtc1RleHQ+fVxuICAgICAgICAgIDwvVHJlZUNvbnRhaW5lcj5cbiAgICAgICAgICA8QXJyb3dDb250cm9sc1xuICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICBzZWxlY3RlZFRyZWVJdGVtPXt0aGlzLmdldFRyZWVJdGVtKHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdKX1cbiAgICAgICAgICAgIG9uTW92ZVRvVHJlZUNsaWNrPXt0aGlzLm9uTW92ZVRvVHJlZUNsaWNrfVxuICAgICAgICAgICAgb25Nb3ZlVG9HcmlkQ2xpY2s9e3RoaXMub25Nb3ZlVG9HcmlkQ2xpY2t9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8R3JpZFxuICAgICAgICAgICAgZ3JpZD17bWVyZ2VkR3JpZH1cbiAgICAgICAgICAgIGNvbHVtbnM9e2dyaWRDb2x1bW5zfVxuICAgICAgICAgICAgbXVsdGlTZWxlY3RcbiAgICAgICAgICAgIGZpbHRlcmluZ1xuICAgICAgICAgICAgcm93U2VsZWN0Q2hlY2tib3hDb2x1bW5cbiAgICAgICAgICAgIGdyaWRIZWFkZXI9ezxQcmltaXRpdmUuU3VidGl0bGU+e21lcmdlZFRyYW5zbGF0aW9ucy5ncmlkVGl0bGV9PC9QcmltaXRpdmUuU3VidGl0bGU+fVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvQ29udGFpbmVyPlxuICAgICAgICB7dGhpcy5zdGF0ZS5zaG93RGVsZXRlQ29uZmlybWF0aW9uICYmXG4gICAgICAgIDxDb25maXJtRGlhbG9nXG4gICAgICAgICAgdHJhbnNsYXRpb25zPXttZXJnZWRUcmFuc2xhdGlvbnMuZGVsZXRlQ29uZmlybURpYWxvZ31cbiAgICAgICAgICBjb25maXJtQ2FsbGJhY2s9e3RoaXMuZGVsZXRlUGFyZW50fVxuICAgICAgICAgIGNhbmNlbENhbGxiYWNrPXt0aGlzLmNsb3NlRGVsZXRlQ29uZmlybWF0aW9uRGlhbG9nfVxuICAgICAgICAvPlxuICAgICAgICB9XG4gICAgICA8L1JlYWN0LkZyYWdtZW50PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==