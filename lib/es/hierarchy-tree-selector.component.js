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
import PerfectScrollbar from '@opuscapita/react-perfect-scrollbar';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlRyZWVDb21wb25lbnQiLCJQZXJmZWN0U2Nyb2xsYmFyIiwiUHJpbWl0aXZlIiwiRGF0YWdyaWQiLCJncmlkU2hhcGUiLCJncmlkQ29sdW1uU2hhcGUiLCJEYXRhZ3JpZEFjdGlvbnMiLCJDb25maXJtRGlhbG9nIiwiUmVhY3QiLCJzdHlsZWQiLCJMaXN0IiwiZnJvbUpTIiwiSW1tdXRhYmxlUHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwiY29ubmVjdCIsIkNvbnRyb2xCYXIiLCJBcnJvd0NvbnRyb2xzIiwiZGVmYXVsdFRyYW5zbGF0aW9ucyIsIkFDVElPTl9CQVJfQ09OVEFJTkVSX0hFSUdIVCIsIlRSRUVfQUNUSU9OUyIsIkFERF9DSElMRFJFTiIsIk1PVkVfTEVBRiIsIlJFTkFNRV9QQVJFTlQiLCJERUxFVEVfUEFSRU5UIiwiR3JpZCIsInByb3BzIiwidGhlbWUiLCJjb2xvcnMiLCJjb2xvckxpZ2h0R3JheSIsIkNvbnRhaW5lciIsImRpdiIsIlRyZWVDb250YWluZXIiLCJndXR0ZXJXaWR0aCIsIk5vSXRlbXNUZXh0IiwicCIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsInNldERhdGEiLCJjbGVhclNlbGVjdGVkSXRlbXMiLCJtYXBTdGF0ZVRvUHJvcHMiLCJzdGF0ZSIsImdyaWRJZCIsImdyaWQiLCJpZCIsInNlbGVjdGVkR3JpZEl0ZW1zIiwiZGF0YWdyaWQiLCJnZXRJbiIsImdyaWREYXRhIiwiSGllcmFyY2h5VHJlZVNlbGVjdG9yIiwib25UcmVlSXRlbVNlbGVjdCIsInNlbGVjdGVkS2V5cyIsIm9uU2VsZWN0Iiwic2V0U3RhdGUiLCJvbkRlbGV0ZUNsaWNrIiwic2hvd0RlbGV0ZUNvbmZpcm1hdGlvbiIsIm9uQWRkTmV3Q2xpY2siLCJkYXRhIiwiY2FsbGJhY2siLCJvbkNoYW5nZSIsInRyZWVEYXRhIiwiaWRLZXkiLCJuZXdJdGVtcyIsInNsaWNlIiwicHVzaCIsImFjdGlvbiIsInR5cGUiLCJnZXRVcGRhdGVkVHJlZSIsInBhcmVudCIsImdldFRyZWVJdGVtIiwiZXhwYW5kUGFyZW50Iiwib25Nb3ZlVG9HcmlkQ2xpY2siLCJzZWxlY3RlZEtleSIsIm5leHRTZWxlY3RlZEtleSIsImdldEFkamFjZW50SXRlbSIsIm5ld0dyaWRJdGVtcyIsInNldERhdGFUb0dyaWQiLCJvbk9yZGVyQ2xpY2siLCJpdGVtcyIsIm9uTW92ZVRvVHJlZUNsaWNrIiwic2VsZWN0ZWRJZCIsImZpbHRlciIsImluY2x1ZGVzIiwiaSIsImdldCIsInRvSlMiLCJpdGVtIiwib25JbnB1dENoYW5nZSIsInZhbHVlIiwib25FeHBhbmQiLCJpZHMiLCJleHBhbmRlZEtleXMiLCJhcnJheSIsImZvdW5kIiwiY2hpbGRLZXkiLCJ2YWx1ZUtleSIsInJlbW92ZUFjdGlvbnMiLCJyb290SXRlbSIsImZpbmQiLCJsZW5ndGgiLCJnZXRBbGxMZWFmcyIsImRlc2VsZWN0SXRlbSIsImNoaWxkIiwiZmlsdGVyZWRDaGlsZHJlbiIsImNoaWxkSXRlbSIsImNvbmNhdCIsIlR5cGVFcnJvciIsImFscmVhZHlGb3VuZCIsImxlYWZzIiwicmV0dXJuUGFyZW50IiwiZm9yRWFjaCIsImdldEFkamFjZW50SXRlbUlkIiwicGFyZW50QXJyIiwiQXJyYXkiLCJpc0FycmF5IiwiaW5kZXgiLCJmaW5kSW5kZXgiLCJhZGphY2VudEl0ZW0iLCJnZXRBbGxQYXJlbnRJZHMiLCJjYiIsImFjYyIsInRvdGFsIiwicmVkdWNlIiwic2V0TmV3SXRlbXMiLCJncmlkQ29sdW1ucyIsInBhcmVudElkIiwiZXhwYW5kZWRJZCIsIm5ld0V4cGFuZGVkS2V5cyIsImNsb3NlRGVsZXRlQ29uZmlybWF0aW9uRGlhbG9nIiwiZGVsZXRlUGFyZW50IiwicmVuZGVySGVhZGVyUmlnaHQiLCJ0cmFuc2xhdGlvbnMiLCJyZW5kZXIiLCJjbGFzc05hbWUiLCJtZXJnZWRHcmlkIiwiT2JqZWN0IiwiYXNzaWduIiwiZGVmYXVsdFNob3dGaWx0ZXJpbmdSb3ciLCJtZXJnZWRUcmFuc2xhdGlvbnMiLCJub1RyZWVJdGVtcyIsImdyaWRUaXRsZSIsImRlbGV0ZUNvbmZpcm1EaWFsb2ciLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIiwidW5kZWZpbmVkIiwiZGVmYXVsdEV4cGFuZEFsbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPQSxhQUFQLE1BQTBCLGtDQUExQjtBQUNBLE9BQU9DLGdCQUFQLE1BQTZCLHFDQUE3QjtBQUNBLFNBQVNDLFNBQVQsUUFBMEIsa0NBQTFCO0FBQ0EsU0FBU0MsUUFBVCxFQUFtQkMsU0FBbkIsRUFBOEJDLGVBQTlCLEVBQStDQyxlQUEvQyxRQUFzRSx3QkFBdEU7QUFDQSxPQUFPQyxhQUFQLE1BQTBCLHVDQUExQjs7QUFFQSxPQUFPQyxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsTUFBUCxNQUFtQixtQkFBbkI7QUFDQSxTQUFTQyxJQUFULEVBQWVDLE1BQWYsUUFBNkIsV0FBN0I7QUFDQSxPQUFPQyxrQkFBUCxNQUErQiwyQkFBL0I7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsU0FBU0MsT0FBVCxRQUF3QixhQUF4Qjs7QUFHQTtBQUNBLE9BQU9DLFVBQVAsTUFBdUIsaURBQXZCO0FBQ0EsT0FBT0MsYUFBUCxNQUEwQixvREFBMUI7QUFDQSxTQUFTQyxtQkFBVCxRQUFvQyx3QkFBcEM7O0FBRUEsSUFBTUMsOEJBQThCLE1BQXBDO0FBQ0EsSUFBTUMsZUFBZTtBQUNuQkMsZ0JBQWMsY0FESztBQUVuQkMsYUFBVyxXQUZRO0FBR25CQyxpQkFBZSxlQUhJO0FBSW5CQyxpQkFBZTtBQUpJLENBQXJCOztBQU9BLElBQU1DLE9BQU9mLE9BQU9OLFFBQVAsQ0FBUCxrQkFNa0I7QUFBQSxTQUFTc0IsTUFBTUMsS0FBTixDQUFZQyxNQUFaLENBQW1CQyxjQUE1QjtBQUFBLENBTmxCLENBQU47O0FBV0EsSUFBTUMsWUFBWXBCLE9BQU9xQixHQUFuQixrQkFB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QStDRCxHOzs7RUFyY2dEdEgsTUFBTW9JLGEsV0FzQmhEQyxZLEdBQWU7QUFDcEJsRixTQUFPLElBRGE7QUFFcEJrQyxZQUFVLE1BRlU7QUFHcEJELFlBQVUsVUFIVTtBQUlwQmxDLFlBQVUsRUFKVTtBQUtwQnlFLGFBQVcsRUFMUztBQU1wQkYsZ0JBQWNoSCxtQkFOTTtBQU9wQnlCLE1BQUksZ0JBUGdCO0FBUXBCUSxZQUFVNEYsU0FSVTtBQVNwQnJGLFlBQVVxRixTQVRVO0FBVXBCQyxvQkFBa0I7QUFWRSxDO1NBdEJIaEcscUIiLCJmaWxlIjoiaGllcmFyY2h5LXRyZWUtc2VsZWN0b3IuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRyZWVDb21wb25lbnQgZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtdHJlZS1jb21wb25lbnQnO1xuaW1wb3J0IFBlcmZlY3RTY3JvbGxiYXIgZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtcGVyZmVjdC1zY3JvbGxiYXInO1xuaW1wb3J0IHsgUHJpbWl0aXZlIH0gZnJvbSAnQG9wdXNjYXBpdGEvb2MtY20tY29tbW9uLWxheW91dHMnO1xuaW1wb3J0IHsgRGF0YWdyaWQsIGdyaWRTaGFwZSwgZ3JpZENvbHVtblNoYXBlLCBEYXRhZ3JpZEFjdGlvbnMgfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1ncmlkJztcbmltcG9ydCBDb25maXJtRGlhbG9nIGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWNvbmZpcm1hdGlvbi1kaWFsb2cnO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgeyBMaXN0LCBmcm9tSlMgfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IEltbXV0YWJsZVByb3BUeXBlcyBmcm9tICdyZWFjdC1pbW11dGFibGUtcHJvcHR5cGVzJztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5cbi8vIEFwcCBpbXBvcnRzXG5pbXBvcnQgQ29udHJvbEJhciBmcm9tICcuL2hpZXJhcmNoeS10cmVlLXNlbGVjdG9yLWNvbnRyb2wtYmFyLmNvbXBvbmVudCc7XG5pbXBvcnQgQXJyb3dDb250cm9scyBmcm9tICcuL2hpZXJhcmNoeS10cmVlLXNlbGVjdG9yLWFycm93LWNvbnRyb2xzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBkZWZhdWx0VHJhbnNsYXRpb25zIH0gZnJvbSAnLi9oaWVyYXJjaHktdHJlZS51dGlscyc7XG5cbmNvbnN0IEFDVElPTl9CQVJfQ09OVEFJTkVSX0hFSUdIVCA9ICc1N3B4JztcbmNvbnN0IFRSRUVfQUNUSU9OUyA9IHtcbiAgQUREX0NISUxEUkVOOiAnQUREX0NISUxEUkVOJyxcbiAgTU9WRV9MRUFGOiAnTU9WRV9MRUFGJyxcbiAgUkVOQU1FX1BBUkVOVDogJ1JFTkFNRV9QQVJFTlQnLFxuICBERUxFVEVfUEFSRU5UOiAnREVMRVRFX1BBUkVOVCcsXG59O1xuXG5jb25zdCBHcmlkID0gc3R5bGVkKERhdGFncmlkKWBcbiAgaGVpZ2h0OiAxMDAlO1xuICAmJiYge1xuICAgIHBhZGRpbmc6IDA7XG4gIH1cbiAgLm9jLWRhdGFncmlkLW1haW4tY29udGFpbmVyIHtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAke3Byb3BzID0+IHByb3BzLnRoZW1lLmNvbG9ycy5jb2xvckxpZ2h0R3JheX07XG4gICAgYm9yZGVyLXRvcDpub25lO1xuICB9XG5gO1xuXG5jb25zdCBDb250YWluZXIgPSBzdHlsZWQuZGl2YFxuICBkaXNwbGF5OiBmbGV4O1xuICBtaW4taGVpZ2h0OiAzMDBweDtcbiAgPiBkaXYge1xuICAgIHdpZHRoOiA1MCU7XG4gICAgZmxleDogMSAxIDEwMCU7XG4gIH1cbmA7XG5cbmNvbnN0IFRyZWVDb250YWluZXIgPSBzdHlsZWQuZGl2YFxuICBoZWlnaHQ6MTAwJTtcbiAgLm9jLXNjcm9sbGJhci1jb250YWluZXIge1xuICAgIGhlaWdodDogY2FsYygxMDAlIC0gJHtBQ1RJT05fQkFSX0NPTlRBSU5FUl9IRUlHSFR9KTtcbiAgICBwYWRkaW5nOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmd1dHRlcldpZHRofTtcbiAgfVxuICAudGl0bGUtY29udGFpbmVyIHtcbiAgICBtaW4taGVpZ2h0OiAke0FDVElPTl9CQVJfQ09OVEFJTkVSX0hFSUdIVH07XG4gIH1cbiAgLm9jLXJlYWN0LXRyZWUge1xuICAgIGhlaWdodDogMTAwJTtcbiAgICAucmMtdHJlZS1pY29uRWxlLnJjLXRyZWUtaWNvbl9fY3VzdG9taXplIHtcbiAgICAgICAgZGlzcGxheTpub25lO1xuICAgIH1cbiAgfVxuYDtcblxuY29uc3QgTm9JdGVtc1RleHQgPSBzdHlsZWQucGBcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuYDtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0ge1xuICBzZXREYXRhOiBEYXRhZ3JpZEFjdGlvbnMuc2V0RGF0YSxcbiAgY2xlYXJTZWxlY3RlZEl0ZW1zOiBEYXRhZ3JpZEFjdGlvbnMuY2xlYXJTZWxlY3RlZEl0ZW1zLFxufTtcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlLCBwcm9wcykgPT4ge1xuICBjb25zdCBncmlkSWQgPSBwcm9wcy5ncmlkLmlkO1xuICByZXR1cm4ge1xuICAgIHNlbGVjdGVkR3JpZEl0ZW1zOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbZ3JpZElkLCAnc2VsZWN0ZWRJdGVtcyddLCBMaXN0KCkpLFxuICAgIGdyaWREYXRhOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbZ3JpZElkLCAnYWxsRGF0YSddLCBMaXN0KCkpLFxuICB9O1xufTtcblxuQGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIaWVyYXJjaHlUcmVlU2VsZWN0b3IgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBpZEtleTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB2YWx1ZUtleTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjaGlsZEtleTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB0cmVlRGF0YTogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnNoYXBlKHt9KSksXG4gICAgZ3JpZDogZ3JpZFNoYXBlLmlzUmVxdWlyZWQsXG4gICAgZ3JpZENvbHVtbnM6IFByb3BUeXBlcy5hcnJheU9mKGdyaWRDb2x1bW5TaGFwZSkuaXNSZXF1aXJlZCxcbiAgICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgc2V0RGF0YTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBjbGVhclNlbGVjdGVkSXRlbXM6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgc2VsZWN0ZWRHcmlkSXRlbXM6IEltbXV0YWJsZVByb3BUeXBlcy5saXN0LmlzUmVxdWlyZWQsXG4gICAgZ3JpZERhdGE6IEltbXV0YWJsZVByb3BUeXBlcy5saXN0LmlzUmVxdWlyZWQsXG4gICAgdHJhbnNsYXRpb25zOiBQcm9wVHlwZXMuc2hhcGUoe30pLFxuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRlZmF1bHRFeHBhbmRBbGw6IFByb3BUeXBlcy5ib29sLFxuXG4gICAgLy8gQ2FsbGJhY2tzXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGlkS2V5OiAnaWQnLFxuICAgIHZhbHVlS2V5OiAnbmFtZScsXG4gICAgY2hpbGRLZXk6ICdjaGlsZHJlbicsXG4gICAgdHJlZURhdGE6IFtdLFxuICAgIGNsYXNzTmFtZTogJycsXG4gICAgdHJhbnNsYXRpb25zOiBkZWZhdWx0VHJhbnNsYXRpb25zLFxuICAgIGlkOiAnaGllcmFyY2h5LXRyZWUnLFxuICAgIG9uU2VsZWN0OiB1bmRlZmluZWQsXG4gICAgb25DaGFuZ2U6IHVuZGVmaW5lZCxcbiAgICBkZWZhdWx0RXhwYW5kQWxsOiB0cnVlLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHNlbGVjdGVkS2V5czogW10sXG4gICAgICBzaG93RGVsZXRlQ29uZmlybWF0aW9uOiBmYWxzZSxcbiAgICB9O1xuICB9XG5cblxuICAvKipcbiAgICogU2VsZWN0cyBhIHRyZWUgaXRlbVxuICAgKiBAcGFyYW0gc2VsZWN0ZWRLZXlzIChhcnJheSlcbiAgICovXG4gIG9uVHJlZUl0ZW1TZWxlY3QgPSAoc2VsZWN0ZWRLZXlzKSA9PiB7XG4gICAgY29uc3QgeyBvblNlbGVjdCB9ID0gdGhpcy5wcm9wcztcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRLZXlzIH0sICgpID0+IHtcbiAgICAgIGlmIChvblNlbGVjdCkgb25TZWxlY3Qoc2VsZWN0ZWRLZXlzKTtcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogRGlzcGxheXMgYSBjb25maXJtYXRpb24gZGlhbG9nXG4gICAqL1xuICBvbkRlbGV0ZUNsaWNrID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzaG93RGVsZXRlQ29uZmlybWF0aW9uOiB0cnVlIH0pO1xuICB9O1xuXG5cbiAgLyoqXG4gICAqIEFkZHMgYSBuZXcgbm9kZSB0byB0aGUgcm9vdCBvZiB0aGUgdHJlZSwgb3IgdW5kZXIgYSBzZWxlY3RlZCB0cmVlIG5vZGUgdXNpbmdcbiAgICogQUREX0NISUxEUkVOIGFjdGlvblxuICAgKiBAcGFyYW0gZGF0YSAtIGRhdGEgdG8gYmUgYWRkZWRcbiAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAqL1xuICBvbkFkZE5ld0NsaWNrID0gKGRhdGEsIGNhbGxiYWNrKSA9PiB7XG4gICAgY29uc3QgeyBvbkNoYW5nZSwgdHJlZURhdGEsIGlkS2V5IH0gPSB0aGlzLnByb3BzO1xuICAgIGxldCBuZXdJdGVtcyA9IHRyZWVEYXRhLnNsaWNlKCk7XG5cbiAgICAvLyBJZiBubyB0cmVlIG5vZGUgaXMgc2VsZWN0ZWQsIHdlJ2xsIHBsYWNlIHRoZSBuZXcgaXRlbSB0byB0aGUgcm9vdFxuICAgIC8vIG9mIHRoZSB0cmVlXG4gICAgaWYgKCF0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXSkge1xuICAgICAgbmV3SXRlbXMucHVzaChkYXRhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgYWN0aW9uID0ge1xuICAgICAgICB0eXBlOiBUUkVFX0FDVElPTlMuQUREX0NISUxEUkVOLFxuICAgICAgICBkYXRhLFxuICAgICAgfTtcbiAgICAgIG5ld0l0ZW1zID0gdGhpcy5nZXRVcGRhdGVkVHJlZSh0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXSwgdHJlZURhdGEsIGFjdGlvbik7XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZEtleXM6IFtkYXRhW2lkS2V5XV0gfSwgKCkgPT4ge1xuICAgICAgLy8gSWYgdGhlIHBhcmVudCBpcyBub3QgeWV0IGV4cGFuZGVkLCB3ZSB3aWxsIGV4cGFuZCBpdCBub3dcbiAgICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuZ2V0VHJlZUl0ZW0oZGF0YVtpZEtleV0sIHRyZWVEYXRhLCB0cnVlKSB8fCB7fTtcbiAgICAgIHRoaXMuZXhwYW5kUGFyZW50KHBhcmVudFtpZEtleV0pO1xuXG4gICAgICBpZiAob25DaGFuZ2UpIG9uQ2hhbmdlKG5ld0l0ZW1zKTtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgdGhlIGNob3NlbiBpdGVtIGZyb20gYSB0cmVlIGFuZCB1cGRhdGVzIHRoZSBncmlkIHVzaW5nIE1PVkVfTEVBRlxuICAgKiBhY3Rpb25cbiAgICovXG4gIG9uTW92ZVRvR3JpZENsaWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgdHJlZURhdGEsIG9uQ2hhbmdlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHNlbGVjdGVkS2V5ID0gdGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF07XG4gICAgY29uc3QgYWN0aW9uID0ge1xuICAgICAgdHlwZTogVFJFRV9BQ1RJT05TLk1PVkVfTEVBRixcbiAgICAgIGRhdGE6IHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdLFxuICAgIH07XG4gICAgY29uc3QgbmV4dFNlbGVjdGVkS2V5ID0gdGhpcy5nZXRBZGphY2VudEl0ZW0oc2VsZWN0ZWRLZXkpO1xuICAgIGNvbnN0IG5ld0dyaWRJdGVtcyA9IGZyb21KUyhbdGhpcy5nZXRUcmVlSXRlbShzZWxlY3RlZEtleSldKTtcbiAgICBjb25zdCBuZXdJdGVtcyA9IHRoaXMuZ2V0VXBkYXRlZFRyZWUoc2VsZWN0ZWRLZXksIHRyZWVEYXRhLCBhY3Rpb24pO1xuXG4gICAgdGhpcy5zZXREYXRhVG9HcmlkKG5ld0dyaWRJdGVtcyk7XG4gICAgaWYgKG9uQ2hhbmdlKSBvbkNoYW5nZShuZXdJdGVtcyk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzZWxlY3RlZEtleXM6IFtuZXh0U2VsZWN0ZWRLZXldLFxuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDYWxscyBvbkNoYW5nZSBjYWxsYmFjayB3aGVuZXZlciB1c2VyIHJlb3JkZXJzIHRyZWUgaXRlbXMgdXNpbmcgb3JkZXJpbmcgYXJyb3dzXG4gICAqIEBwYXJhbSBpdGVtc1xuICAgKi9cbiAgb25PcmRlckNsaWNrID0gKGl0ZW1zKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5vbkNoYW5nZShpdGVtcyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEFkZHMgc2VsZWN0ZWQgZ3JpZCBpdGVtcyB0byB0aGUgY2hvc2VuIHRyZWUgbm9kZSB1c2luZyBBRERfQ0hJTERSRU4gYWN0aW9uXG4gICAqL1xuICBvbk1vdmVUb1RyZWVDbGljayA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBvbkNoYW5nZSwgc2VsZWN0ZWRHcmlkSXRlbXMsIGdyaWREYXRhLCB0cmVlRGF0YSwgaWRLZXksXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgc2VsZWN0ZWRJZCA9IHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdO1xuXG4gICAgY29uc3QgYWN0aW9uID0ge1xuICAgICAgdHlwZTogVFJFRV9BQ1RJT05TLkFERF9DSElMRFJFTixcbiAgICAgIGRhdGE6IGdyaWREYXRhXG4gICAgICAgIC5maWx0ZXIoaSA9PiBzZWxlY3RlZEdyaWRJdGVtcy5pbmNsdWRlcyhpLmdldChpZEtleSkpKVxuICAgICAgICAudG9KUygpLFxuICAgIH07XG4gICAgY29uc3QgbmV3SXRlbXMgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKHNlbGVjdGVkSWQsIHRyZWVEYXRhLCBhY3Rpb24pO1xuICAgIGNvbnN0IG5ld0dyaWRJdGVtcyA9IGdyaWREYXRhLmZpbHRlcihpdGVtID0+ICFzZWxlY3RlZEdyaWRJdGVtcy5pbmNsdWRlcyhpdGVtLmdldChpZEtleSkpKTtcblxuICAgIHRoaXMuZXhwYW5kUGFyZW50KHNlbGVjdGVkSWQsIHRydWUpO1xuICAgIHRoaXMuc2V0RGF0YVRvR3JpZChuZXdHcmlkSXRlbXMsIHRydWUpO1xuICAgIGlmIChvbkNoYW5nZSkgb25DaGFuZ2UobmV3SXRlbXMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZW5hbWVzIHRoZSBjaG9zZW4gdHJlZSBub2RlIHVzaW5nIGEgUkVOQU1FX1BBUkVOVCBhY3Rpb25cbiAgICogQHBhcmFtIHZhbHVlXG4gICAqL1xuICBvbklucHV0Q2hhbmdlID0gKHZhbHVlKSA9PiB7XG4gICAgY29uc3QgeyB0cmVlRGF0YSwgb25DaGFuZ2UgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgYWN0aW9uID0ge1xuICAgICAgdHlwZTogVFJFRV9BQ1RJT05TLlJFTkFNRV9QQVJFTlQsXG4gICAgICBkYXRhOiB2YWx1ZSxcbiAgICB9O1xuICAgIGNvbnN0IG5ld0l0ZW1zID0gdGhpcy5nZXRVcGRhdGVkVHJlZSh0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXSwgdHJlZURhdGEsIGFjdGlvbik7XG4gICAgaWYgKG9uQ2hhbmdlKSBvbkNoYW5nZShuZXdJdGVtcyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEZpcmVkIG9uIGV4cGFuZFxuICAgKiBAcGFyYW0gaWRzXG4gICAqL1xuICBvbkV4cGFuZCA9IChpZHMpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGV4cGFuZGVkS2V5czogaWRzLFxuICAgIH0pO1xuICB9O1xuXG5cbiAgLyoqXG4gICAqIFJldHVybnMgdXBkYXRlZCB0cmVlIGl0ZW1zLlxuICAgKiBAcGFyYW0gaWQgLSB0YXJnZXQgaXRlbVxuICAgKiBAcGFyYW0gYXJyYXkgLSBhcnJheSB3aGVyZSB0YXJnZXQgaXRlbSBpcyBiZWluZyBzZWFyY2hlZFxuICAgKiBAcGFyYW0gYWN0aW9uIC0gYWN0aW9uIHRvIGJlIHBlcmZvcm1lZCB7dHlwZSwgZGF0YX1cbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBnZXRVcGRhdGVkVHJlZSA9IChpZCwgYXJyYXkgPSB0aGlzLnByb3BzLnRyZWVEYXRhLCBhY3Rpb24pID0+IHtcbiAgICBsZXQgZm91bmQgPSBmYWxzZTtcbiAgICBjb25zdCB7IGlkS2V5LCBjaGlsZEtleSwgdmFsdWVLZXkgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgbmV3SXRlbXMgPSBhcnJheS5zbGljZSgpO1xuICAgIGNvbnN0IHJlbW92ZUFjdGlvbnMgPSBbVFJFRV9BQ1RJT05TLk1PVkVfTEVBRiwgVFJFRV9BQ1RJT05TLkRFTEVURV9QQVJFTlRdO1xuXG4gICAgLy8gSWYgZGVsZXRlZCBwYXJlbnQgaXRlbSBpcyBpbiB0aGUgcm9vdCBub2RlXG4gICAgaWYgKGFjdGlvbi50eXBlID09PSBUUkVFX0FDVElPTlMuREVMRVRFX1BBUkVOVCkge1xuICAgICAgY29uc3Qgcm9vdEl0ZW0gPSBhcnJheS5maW5kKGl0ZW0gPT4gaXRlbVtpZEtleV0gPT09IGlkKTtcbiAgICAgIGlmIChyb290SXRlbSkge1xuICAgICAgICBpZiAocm9vdEl0ZW1bY2hpbGRLZXldLmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuc2V0RGF0YVRvR3JpZChmcm9tSlModGhpcy5nZXRBbGxMZWFmcyhyb290SXRlbVtjaGlsZEtleV0pKSk7XG4gICAgICAgICAgdGhpcy5kZXNlbGVjdEl0ZW0oKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3SXRlbXMuZmlsdGVyKGl0ZW0gPT4gaXRlbVtpZEtleV0gIT09IGlkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5ld0l0ZW1zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBpdGVtID0gbmV3SXRlbXNbaV07XG4gICAgICBpZiAocmVtb3ZlQWN0aW9ucy5pbmNsdWRlcyhhY3Rpb24udHlwZSkgJiYgaXRlbVtjaGlsZEtleV0gJiYgIWZvdW5kKSB7XG4gICAgICAgIGZvdW5kID0gISFpdGVtW2NoaWxkS2V5XS5maW5kKGNoaWxkID0+IGNoaWxkW2lkS2V5XSA9PT0gaWQpO1xuICAgICAgICBpZiAoZm91bmQpIHtcbiAgICAgICAgICAvLyBXaGVuIHJlbW92aW5nIGFuIGl0ZW0gd2UgbXVzdCBmaXJzdCBmaW5kIGl0cyBwYXJlbnQgYW5kIGFsdGVyIGl0cyBjaGlsZHJlbiBhcnJheVxuICAgICAgICAgIGlmIChhY3Rpb24udHlwZSA9PT0gVFJFRV9BQ1RJT05TLk1PVkVfTEVBRikge1xuICAgICAgICAgICAgaXRlbVtjaGlsZEtleV0gPSBpdGVtW2NoaWxkS2V5XS5maWx0ZXIoY2hpbGQgPT4gY2hpbGRbaWRLZXldICE9PSBpZCk7XG4gICAgICAgICAgICB0aGlzLmRlc2VsZWN0SXRlbSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYWN0aW9uLnR5cGUgPT09IFRSRUVfQUNUSU9OUy5ERUxFVEVfUEFSRU5UKSB7XG4gICAgICAgICAgICAvLyB3ZSBtdXN0IGZpcnN0IGZpbHRlciB0aGUgY2hpbGRyZW4sIHNvIHRoYXQgd2Ugd29uJ3QgZ2V0IGxlYWZzIGZyb21cbiAgICAgICAgICAgIC8vIG90aGVyIGNoaWxkIGJyYW5jaGVzXG4gICAgICAgICAgICBjb25zdCBmaWx0ZXJlZENoaWxkcmVuID0gaXRlbVtjaGlsZEtleV0uZmlsdGVyKGNoaWxkSXRlbSA9PiBjaGlsZEl0ZW1baWRLZXldID09PSBpZCk7XG4gICAgICAgICAgICB0aGlzLnNldERhdGFUb0dyaWQoZnJvbUpTKHRoaXMuZ2V0QWxsTGVhZnMoZmlsdGVyZWRDaGlsZHJlbikpKTtcbiAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RJdGVtKCk7XG4gICAgICAgICAgICBpdGVtW2NoaWxkS2V5XSA9IGl0ZW1bY2hpbGRLZXldLmZpbHRlcihjaGlsZEl0ZW0gPT4gY2hpbGRJdGVtW2lkS2V5XSAhPT0gaWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVtpZEtleV0gPT09IGlkICYmICFmb3VuZCkge1xuICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgICBjYXNlIFRSRUVfQUNUSU9OUy5BRERfQ0hJTERSRU46XG4gICAgICAgICAgICBpdGVtW2NoaWxkS2V5XSA9IChpdGVtW2NoaWxkS2V5XSB8fCBbXSkuY29uY2F0KGFjdGlvbi5kYXRhKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgVFJFRV9BQ1RJT05TLlJFTkFNRV9QQVJFTlQ6XG4gICAgICAgICAgICBpdGVtW3ZhbHVlS2V5XSA9IGFjdGlvbi5kYXRhO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FjdGlvbiB0eXBlIGlzIHVuZGVmaW5lZCcpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bY2hpbGRLZXldICYmICFmb3VuZCkgZm91bmQgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKGlkLCBpdGVtW2NoaWxkS2V5XSwgYWN0aW9uKTtcbiAgICB9XG5cbiAgICBpZiAoIWZvdW5kKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIG5ld0l0ZW1zO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHJlY3Vyc2l2ZWx5IGFsbCBsZWFmIGl0ZW1zIGZyb20gYSBnaXZlbiBhcnJheVxuICAgKiBAcGFyYW0gYXJyYXlcbiAgICogQHBhcmFtIGFscmVhZHlGb3VuZCAodXNlZCByZWN1cnNpdmVseSlcbiAgICovXG4gIGdldEFsbExlYWZzID0gKGFycmF5LCBhbHJlYWR5Rm91bmQgPSBbXSkgPT4ge1xuICAgIGNvbnN0IHsgY2hpbGRLZXkgfSA9IHRoaXMucHJvcHM7XG4gICAgbGV0IGxlYWZzID0gYWxyZWFkeUZvdW5kO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3QgaXRlbSA9IGFycmF5W2ldO1xuICAgICAgaWYgKGl0ZW1bY2hpbGRLZXldKSB7XG4gICAgICAgIGxlYWZzID0gdGhpcy5nZXRBbGxMZWFmcyhpdGVtW2NoaWxkS2V5XSwgYWxyZWFkeUZvdW5kKTtcbiAgICAgIH1cbiAgICAgIGlmICghaXRlbVtjaGlsZEtleV0pIGxlYWZzLnB1c2goaXRlbSk7XG4gICAgfVxuICAgIHJldHVybiBsZWFmcztcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyBhIHRyZWUgaXRlbSBieSBJRFxuICAgKiBAcGFyYW0gaWRcbiAgICogQHBhcmFtIGFycmF5XG4gICAqIEBwYXJhbSByZXR1cm5QYXJlbnQgLSByZXR1cm4gaXRlbSdzIHBhcmVudCBpbnN0ZWFkIG9mIHRoZSBpdGVtXG4gICAqIEBwYXJhbSBwYXJlbnQgLSBwYXJlbnQgaXRlbSAodXNlZCByZWN1cnNpdmVseSlcbiAgICogQHJldHVybnMge3t9fVxuICAgKi9cbiAgZ2V0VHJlZUl0ZW0gPSAoaWQsIGFycmF5ID0gdGhpcy5wcm9wcy50cmVlRGF0YSwgcmV0dXJuUGFyZW50ID0gZmFsc2UsIHBhcmVudCA9IG51bGwpID0+IHtcbiAgICBjb25zdCB7IGNoaWxkS2V5LCBpZEtleSB9ID0gdGhpcy5wcm9wcztcbiAgICBsZXQgZm91bmQgPSBhcnJheS5maW5kKGl0ZW0gPT4gaXRlbVtpZEtleV0gPT09IGlkKTtcblxuICAgIGlmIChmb3VuZCAmJiByZXR1cm5QYXJlbnQpIGZvdW5kID0gcGFyZW50O1xuXG4gICAgaWYgKCFmb3VuZCkge1xuICAgICAgYXJyYXkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBpZiAoaXRlbVtjaGlsZEtleV0gJiYgIWZvdW5kKSB7XG4gICAgICAgICAgZm91bmQgPSB0aGlzLmdldFRyZWVJdGVtKGlkLCBpdGVtW2NoaWxkS2V5XSwgcmV0dXJuUGFyZW50LCBpdGVtKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBmb3VuZDtcbiAgfTtcblxuICAvKipcbiAgICogR2V0IGFkamFjZW50IGl0ZW0gKGlkKSBpbiBwYXJlbnQgYXJyYXkuIFVzZWQgd2hlbiBtb3ZpbmcgaXRlbXMgZnJvbSB0cmVlXG4gICAqIHRvIGdyaWQvZGVsZXRpbmcgYW4gaXRlbVxuICAgKiBAcGFyYW0gaWRcbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBnZXRBZGphY2VudEl0ZW0gPSAoaWQpID0+IHtcbiAgICBpZiAoIWlkKSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCB7IGNoaWxkS2V5LCBpZEtleSwgdHJlZURhdGEgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBnZXRBZGphY2VudEl0ZW1JZCA9IChwYXJlbnQpID0+IHtcbiAgICAgIGNvbnN0IHBhcmVudEFyciA9IEFycmF5LmlzQXJyYXkocGFyZW50KSA/IHBhcmVudCA6IHBhcmVudFtjaGlsZEtleV07XG4gICAgICBjb25zdCBpbmRleCA9IHBhcmVudEFyci5maW5kSW5kZXgoY2hpbGQgPT4gY2hpbGRbaWRLZXldID09PSBpZCk7XG4gICAgICBsZXQgYWRqYWNlbnRJdGVtID0gcGFyZW50QXJyW2luZGV4ICsgMV07XG4gICAgICBpZiAoIWFkamFjZW50SXRlbSkgYWRqYWNlbnRJdGVtID0gcGFyZW50QXJyW2luZGV4IC0gMV07XG4gICAgICBpZiAoIWFkamFjZW50SXRlbSAmJiAhQXJyYXkuaXNBcnJheShwYXJlbnQpKSBhZGphY2VudEl0ZW0gPSBwYXJlbnQ7XG4gICAgICBpZiAoIWFkamFjZW50SXRlbSkgcmV0dXJuIG51bGw7XG5cbiAgICAgIHJldHVybiBhZGphY2VudEl0ZW1baWRLZXldO1xuICAgIH07XG5cbiAgICBjb25zdCBwYXJlbnQgPSB0aGlzLmdldFRyZWVJdGVtKGlkLCB0aGlzLnByb3BzLnRyZWVEYXRhLCB0cnVlKTtcbiAgICByZXR1cm4gcGFyZW50ID8gZ2V0QWRqYWNlbnRJdGVtSWQocGFyZW50KSA6IGdldEFkamFjZW50SXRlbUlkKHRyZWVEYXRhKTtcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyBhbGwgSURzIGluIHRoZSB0cmVlXG4gICAqIEBwYXJhbSBhcnJheVxuICAgKi9cbiAgZ2V0QWxsUGFyZW50SWRzID0gKGFycmF5ID0gdGhpcy5wcm9wcy50cmVlRGF0YSkgPT4ge1xuICAgIGNvbnN0IHsgaWRLZXksIGNoaWxkS2V5IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGNiID0gKGFjYywgaXRlbSkgPT4ge1xuICAgICAgbGV0IHRvdGFsID0gYWNjO1xuICAgICAgaWYgKGl0ZW1bY2hpbGRLZXldICYmIGl0ZW1bY2hpbGRLZXldLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdG90YWwgPSBhY2MuY29uY2F0KGl0ZW1baWRLZXldKTtcbiAgICAgICAgcmV0dXJuIGl0ZW1bY2hpbGRLZXldLnJlZHVjZShjYiwgdG90YWwpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRvdGFsO1xuICAgIH07XG4gICAgcmV0dXJuIGFycmF5LnJlZHVjZShjYiwgW10pO1xuICB9O1xuXG5cbiAgLyoqXG4gICAqIEFwcGVuZHMgcHJvdmlkZWQgaXRlbXMgdG8gdGhlIGdyaWRcbiAgICogQHBhcmFtIGl0ZW1zIC0gaW1tdXRhYmxlIGFycmF5IG9mIGl0ZW1zIHRvIGJlIGFwcGVuZGVkIHRvIGdyaWRcbiAgICogQHBhcmFtIHNldE5ld0l0ZW1zIC0gc2V0IGNvbXBsZXRlbHkgYSBuZXcgYXJyYXkgb2YgaXRlbXNcbiAgICovXG4gIHNldERhdGFUb0dyaWQgPSAoaXRlbXMsIHNldE5ld0l0ZW1zID0gZmFsc2UpID0+IHtcbiAgICBsZXQgZGF0YSA9IExpc3QoKTtcbiAgICBjb25zdCB7IGdyaWQsIGdyaWRDb2x1bW5zLCBncmlkRGF0YSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIXNldE5ld0l0ZW1zKSBkYXRhID0gZ3JpZERhdGEuc2xpY2UoKTtcbiAgICBjb25zdCBuZXdHcmlkSXRlbXMgPSBkYXRhLmNvbmNhdChpdGVtcyk7XG5cbiAgICB0aGlzLnByb3BzLnNldERhdGEoZ3JpZCwgZ3JpZENvbHVtbnMsIG5ld0dyaWRJdGVtcyk7XG4gICAgdGhpcy5wcm9wcy5jbGVhclNlbGVjdGVkSXRlbXMoZ3JpZCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEV4cGFuZHMgYSBwYXJlbnRcbiAgICogQHBhcmFtIHBhcmVudElkXG4gICAqL1xuICBleHBhbmRQYXJlbnQgPSAocGFyZW50SWQpID0+IHtcbiAgICBpZiAocGFyZW50SWQgJiYgIXRoaXMuc3RhdGUuZXhwYW5kZWRLZXlzLmZpbmQoZXhwYW5kZWRJZCA9PiBleHBhbmRlZElkID09PSBwYXJlbnRJZCkpIHtcbiAgICAgIGNvbnN0IG5ld0V4cGFuZGVkS2V5cyA9IHRoaXMuc3RhdGUuZXhwYW5kZWRLZXlzLnNsaWNlKCk7XG4gICAgICBuZXdFeHBhbmRlZEtleXMucHVzaChwYXJlbnRJZCk7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgZXhwYW5kZWRLZXlzOiBuZXdFeHBhbmRlZEtleXMgfSk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBDbG9zZXMgZGVsZXRlIGNvbmZpcm1hdGlvbiBkaWFsb2dcbiAgICovXG4gIGNsb3NlRGVsZXRlQ29uZmlybWF0aW9uRGlhbG9nID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzaG93RGVsZXRlQ29uZmlybWF0aW9uOiBmYWxzZSB9KTtcbiAgfTtcblxuICAvKipcbiAgICogRGVsZXRlcyBhIHBhcmVudCBub2RlXG4gICAqL1xuICBkZWxldGVQYXJlbnQgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBvbkNoYW5nZSwgdHJlZURhdGEgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgc2VsZWN0ZWRLZXkgPSB0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXTtcbiAgICBjb25zdCBhY3Rpb24gPSB7XG4gICAgICB0eXBlOiBUUkVFX0FDVElPTlMuREVMRVRFX1BBUkVOVCxcbiAgICB9O1xuICAgIGNvbnN0IG5leHRTZWxlY3RlZEtleSA9IHRoaXMuZ2V0QWRqYWNlbnRJdGVtKHNlbGVjdGVkS2V5KTtcbiAgICBjb25zdCBuZXdJdGVtcyA9IHRoaXMuZ2V0VXBkYXRlZFRyZWUoc2VsZWN0ZWRLZXksIHRyZWVEYXRhLCBhY3Rpb24pO1xuICAgIGlmIChvbkNoYW5nZSkgb25DaGFuZ2UobmV3SXRlbXMpO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2VsZWN0ZWRLZXlzOiBbbmV4dFNlbGVjdGVkS2V5XSxcbiAgICAgIHNob3dEZWxldGVDb25maXJtYXRpb246IGZhbHNlLFxuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBEZXNlbGVjdHMgYW4gaXRlbSwgaWYgaXQgaXMgZS5nLiByZW1vdmVkXG4gICAqL1xuICBkZXNlbGVjdEl0ZW0gPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkS2V5czogW10gfSk7XG4gIH07XG5cbiAgcmVuZGVySGVhZGVyUmlnaHQgPSB0cmFuc2xhdGlvbnMgPT4gKFxuICAgIDxDb250cm9sQmFyXG4gICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgIG9uQWRkTmV3Q2xpY2s9e3RoaXMub25BZGROZXdDbGlja31cbiAgICAgIG9uRGVsZXRlQ2xpY2s9e3RoaXMub25EZWxldGVDbGlja31cbiAgICAgIG9uSW5wdXRDaGFuZ2U9e3RoaXMub25JbnB1dENoYW5nZX1cbiAgICAgIHNlbGVjdGVkVHJlZUl0ZW09e3RoaXMuZ2V0VHJlZUl0ZW0odGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF0pfVxuICAgICAgaGVpZ2h0PXtBQ1RJT05fQkFSX0NPTlRBSU5FUl9IRUlHSFR9XG4gICAgICB0cmFuc2xhdGlvbnM9e3RyYW5zbGF0aW9uc31cbiAgICAvPlxuICApO1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICB2YWx1ZUtleSwgaWRLZXksIHRyZWVEYXRhLCBncmlkLCBncmlkQ29sdW1ucywgY2xhc3NOYW1lLCB0cmFuc2xhdGlvbnMsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBtZXJnZWRHcmlkID0gT2JqZWN0LmFzc2lnbih7fSwgZ3JpZCwgeyBkZWZhdWx0U2hvd0ZpbHRlcmluZ1JvdzogdHJ1ZSB9KTtcbiAgICBjb25zdCBtZXJnZWRUcmFuc2xhdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0VHJhbnNsYXRpb25zLCB0cmFuc2xhdGlvbnMpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxSZWFjdC5GcmFnbWVudD5cbiAgICAgICAgPENvbnRhaW5lciBjbGFzc05hbWU9e2NsYXNzTmFtZX0+XG4gICAgICAgICAgPFRyZWVDb250YWluZXI+XG4gICAgICAgICAgICB7ISF0cmVlRGF0YS5sZW5ndGggJiYgPFRyZWVDb21wb25lbnRcbiAgICAgICAgICAgICAgdHJlZURhdGE9e3RyZWVEYXRhfVxuICAgICAgICAgICAgICBkYXRhTG9va1VwS2V5PXtpZEtleX1cbiAgICAgICAgICAgICAgZGF0YUxvb2tVcFZhbHVlPXt2YWx1ZUtleX1cbiAgICAgICAgICAgICAgb25TZWxlY3Q9e3RoaXMub25UcmVlSXRlbVNlbGVjdH1cbiAgICAgICAgICAgICAgb25FeHBhbmQ9e3RoaXMub25FeHBhbmR9XG4gICAgICAgICAgICAgIGNoZWNrYWJsZT17ZmFsc2V9XG4gICAgICAgICAgICAgIHNlbGVjdGVkS2V5cz17dGhpcy5zdGF0ZS5zZWxlY3RlZEtleXN9XG4gICAgICAgICAgICAgIGV4cGFuZGVkS2V5cz17dGhpcy5zdGF0ZS5leHBhbmRlZEtleXN9XG4gICAgICAgICAgICAgIG9uT3JkZXJCdXR0b25DbGljaz17dGhpcy5vbk9yZGVyQ2xpY2t9XG4gICAgICAgICAgICAgIHNlbGVjdGFibGVcbiAgICAgICAgICAgICAgc2hvd09yZGVyaW5nQXJyb3dzXG4gICAgICAgICAgICAgIHNob3dFeHBhbmRBbGxcbiAgICAgICAgICAgICAgaGVhZGVyUmlnaHQ9e3RoaXMucmVuZGVySGVhZGVyUmlnaHQobWVyZ2VkVHJhbnNsYXRpb25zKX1cbiAgICAgICAgICAgIC8+fVxuICAgICAgICAgICAgeyF0cmVlRGF0YS5sZW5ndGggJiYgPE5vSXRlbXNUZXh0PnttZXJnZWRUcmFuc2xhdGlvbnMubm9UcmVlSXRlbXN9PC9Ob0l0ZW1zVGV4dD59XG4gICAgICAgICAgPC9UcmVlQ29udGFpbmVyPlxuICAgICAgICAgIDxBcnJvd0NvbnRyb2xzXG4gICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgIHNlbGVjdGVkVHJlZUl0ZW09e3RoaXMuZ2V0VHJlZUl0ZW0odGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF0pfVxuICAgICAgICAgICAgb25Nb3ZlVG9UcmVlQ2xpY2s9e3RoaXMub25Nb3ZlVG9UcmVlQ2xpY2t9XG4gICAgICAgICAgICBvbk1vdmVUb0dyaWRDbGljaz17dGhpcy5vbk1vdmVUb0dyaWRDbGlja31cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxHcmlkXG4gICAgICAgICAgICBncmlkPXttZXJnZWRHcmlkfVxuICAgICAgICAgICAgY29sdW1ucz17Z3JpZENvbHVtbnN9XG4gICAgICAgICAgICByb3dTZWxlY3RcbiAgICAgICAgICAgIG11bHRpU2VsZWN0XG4gICAgICAgICAgICBmaWx0ZXJpbmdcbiAgICAgICAgICAgIHJvd1NlbGVjdENoZWNrYm94Q29sdW1uXG4gICAgICAgICAgICBncmlkSGVhZGVyPXs8UHJpbWl0aXZlLlN1YnRpdGxlPnttZXJnZWRUcmFuc2xhdGlvbnMuZ3JpZFRpdGxlfTwvUHJpbWl0aXZlLlN1YnRpdGxlPn1cbiAgICAgICAgICAvPlxuXG4gICAgICAgIDwvQ29udGFpbmVyPlxuICAgICAgICB7dGhpcy5zdGF0ZS5zaG93RGVsZXRlQ29uZmlybWF0aW9uICYmXG4gICAgICAgIDxDb25maXJtRGlhbG9nXG4gICAgICAgICAgdHJhbnNsYXRpb25zPXttZXJnZWRUcmFuc2xhdGlvbnMuZGVsZXRlQ29uZmlybURpYWxvZ31cbiAgICAgICAgICBjb25maXJtQ2FsbGJhY2s9e3RoaXMuZGVsZXRlUGFyZW50fVxuICAgICAgICAgIGNhbmNlbENhbGxiYWNrPXt0aGlzLmNsb3NlRGVsZXRlQ29uZmlybWF0aW9uRGlhbG9nfVxuICAgICAgICAvPlxuICAgICAgICB9XG4gICAgICA8L1JlYWN0LkZyYWdtZW50PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==