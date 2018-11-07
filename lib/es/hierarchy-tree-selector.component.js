var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _dec, _class, _class2, _temp;

var _templateObject = _taggedTemplateLiteralLoose(['\n  height: 100%;\n  padding: 0;\n  .oc-datagrid-main-container {\n    border: 1px solid ', ';\n    border-top:none;\n  }\n'], ['\n  height: 100%;\n  padding: 0;\n  .oc-datagrid-main-container {\n    border: 1px solid ', ';\n    border-top:none;\n  }\n']),
    _templateObject2 = _taggedTemplateLiteralLoose(['\n  display: flex;\n  > div {\n    width: 50%;\n    flex: 1 1 100%;\n  }\n'], ['\n  display: flex;\n  > div {\n    width: 50%;\n    flex: 1 1 100%;\n  }\n']),
    _templateObject3 = _taggedTemplateLiteralLoose(['\n  height:100%;\n  .oc-scrollbar-container {\n    border: 1px solid ', ';\n    height: calc(100% - ', ');\n    padding: ', ';\n  }\n  .oc-react-tree {\n    height: 100%;\n    .rc-tree-iconEle.rc-tree-icon__customize {\n        display:none;\n    }\n  }\n'], ['\n  height:100%;\n  .oc-scrollbar-container {\n    border: 1px solid ', ';\n    height: calc(100% - ', ');\n    padding: ', ';\n  }\n  .oc-react-tree {\n    height: 100%;\n    .rc-tree-iconEle.rc-tree-icon__customize {\n        display:none;\n    }\n  }\n']);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

import React from 'react';
import TreeComponent from '@opuscapita/react-treeview';
import styled from 'styled-components';
import { List, fromJS } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Datagrid, gridShape, gridColumnShape, DatagridActions } from '@opuscapita/react-grid';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PerfectScrollbar from '@opuscapita/react-perfect-scrollbar';
import { Primitive } from '@opuscapita/oc-cm-common-layouts';
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

var TreeContainer = styled.div(_templateObject3, function (props) {
  return props.theme.colors.colorLightGray;
}, ACTION_BAR_CONTAINER_HEIGHT, function (props) {
  return props.theme.gutterWidth;
});

var mapDispatchToProps = {
  setData: DatagridActions.setData
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
      _this.setState({ selectedKeys: selectedKeys });
    };

    _this.onTreeItemDragDrop = function (items) {
      var onChange = _this.props.onChange;

      onChange(items);
    };

    _this.onDeleteClick = function () {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          treeData = _this$props.treeData;

      var action = {
        type: TREE_ACTIONS.DELETE_PARENT
      };
      var newItems = _this.getUpdatedTree(_this.state.selectedKeys[0], treeData, action);
      onChange(newItems);
    };

    _this.onAddNewClick = function (data, callback) {
      var _this$props2 = _this.props,
          onChange = _this$props2.onChange,
          treeData = _this$props2.treeData,
          idKey = _this$props2.idKey;

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
        onChange(newItems);
        callback();
      });
    };

    _this.onMoveToGridClick = function () {
      var _this$props3 = _this.props,
          treeData = _this$props3.treeData,
          onChange = _this$props3.onChange;

      var action = {
        type: TREE_ACTIONS.MOVE_LEAF,
        data: _this.state.selectedKeys[0]
      };
      var newGridItems = fromJS([_this.getTreeItem(_this.state.selectedKeys[0])]);
      var newItems = _this.getUpdatedTree(_this.state.selectedKeys[0], treeData, action);

      _this.setDataToGrid(newGridItems);
      onChange(newItems);
    };

    _this.onMoveToTreeClick = function () {
      var _this$props4 = _this.props,
          onChange = _this$props4.onChange,
          selectedGridItems = _this$props4.selectedGridItems,
          gridData = _this$props4.gridData,
          treeData = _this$props4.treeData;


      var action = {
        type: TREE_ACTIONS.ADD_CHILDREN,
        data: gridData.filter(function (i) {
          return selectedGridItems.includes(i.get('id'));
        }).toJS()
      };
      var newItems = _this.getUpdatedTree(_this.state.selectedKeys[0], treeData, action);
      var newGridItems = gridData.filter(function (item) {
        return !selectedGridItems.includes(item.get('id'));
      });

      _this.setDataToGrid(newGridItems, true);
      onChange(newItems);
    };

    _this.onInputChange = function (value) {
      var _this$props5 = _this.props,
          treeData = _this$props5.treeData,
          onChange = _this$props5.onChange;

      var action = {
        type: TREE_ACTIONS.RENAME_PARENT,
        data: value
      };
      var newItems = _this.getUpdatedTree(_this.state.selectedKeys[0], treeData, action);
      onChange(newItems);
    };

    _this.getUpdatedTree = function (id) {
      var array = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.props.treeData;
      var action = arguments[2];

      var found = false;
      var _this$props6 = _this.props,
          idKey = _this$props6.idKey,
          childKey = _this$props6.childKey,
          valueKey = _this$props6.valueKey;

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
    };

    _this.isDragDropLegal = function (items, e) {
      var _this$props9 = _this.props,
          childKey = _this$props9.childKey,
          treeData = _this$props9.treeData,
          onDragDropPrevent = _this$props9.onDragDropPrevent;

      var dropItem = _this.getTreeItem(e.node.props.eventKey);
      var dragItem = _this.getTreeItem(e.dragNode.props.eventKey);
      var dropItemParent = _this.getTreeItem(e.node.props.eventKey, treeData, true);

      /**
       * We want to prevent the move, if:
       * - Selected item is a parent, and ..
       *    - Dropping over an item, and ..
       *      - New parent has leafs OR new parent is a leaf
       *    - Dropping between items, and ..
       *        - New parent's parent has leafs
       *  - Selected item is a leaf, and ...
       */
      if (dragItem[childKey]) {
        if (!e.dropToGap && (_this.hasLeafs(dropItem) || !dropItem[childKey]) || dropItemParent && e.dropToGap && _this.hasLeafs(dropItemParent)) {
          if (onDragDropPrevent) onDragDropPrevent();
          return false;
        }
      } else if (dropItem && !e.dropToGap && _this.hasParents(dropItem) || dropItemParent && e.dropToGap && _this.hasParents(dropItemParent) || e.dropToGap && !dropItemParent || !e.dropToGap && !dropItem[childKey]) {
        // Item has got parent as a child - leaf cannot be dropped here
        if (onDragDropPrevent) onDragDropPrevent();
        return false;
      }
      return true;
    };

    _this.hasLeafs = function (item) {
      var childKey = _this.props.childKey;

      if (!item[childKey]) return false;
      return !!item[childKey].find(function (child) {
        return !child[childKey];
      });
    };

    _this.hasParents = function (item) {
      var childKey = _this.props.childKey;

      if (!item[childKey]) return false;
      return !!item[childKey].find(function (child) {
        return child[childKey];
      });
    };

    _this.deselectItem = function () {
      _this.setState({ selectedKeys: [] });
    };

    _this.state = {
      selectedKeys: []
    };
    return _this;
  }

  /**
   * Selects a tree item
   * @param selectedKeys (array)
   */


  /**
   * Fired on drag n' drop
   * @param items
   */


  /**
   * Deletes a parent node
   */


  /**
   * Adds a new node to the root of the tree, or under a selected tree node using
   * ADD_CHILDREN action
   * @param data
   */


  /**
   * Removes the chosen item from a tree and updates the grid using MOVE_LEAF
   * action
   */


  /**
   * Adds selected grid items to the chosen tree node using ADD_CHILDREN action
   */


  /**
   * Renames the chosen tree node using a RENAME_PARENT action
   * @param value
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
   * Appends provided items to the grid
   * @param items - immutable array of items to be appended to grid
   * @param setNewItems - set completely a new array of items
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
      Container,
      { className: className },
      React.createElement(
        TreeContainer,
        null,
        React.createElement(ControlBar, _extends({}, this.props, {
          onAddNewClick: this.onAddNewClick,
          onDeleteClick: this.onDeleteClick,
          onInputChange: this.onInputChange,
          selectedTreeItem: this.getTreeItem(this.state.selectedKeys[0]),
          height: ACTION_BAR_CONTAINER_HEIGHT,
          translations: mergedTranslations
        })),
        React.createElement(
          PerfectScrollbar,
          null,
          React.createElement(TreeComponent, {
            treeData: treeData,
            dataLookUpKey: idKey,
            dataLookUpValue: valueKey,
            onSelect: this.onTreeItemSelect,
            onDragDrop: this.onTreeItemDragDrop,
            checkable: false,
            selectedKeys: this.state.selectedKeys,
            isDragDropLegal: this.isDragDropLegal,
            selectable: true,
            draggable: true,
            defaultExpandAll: true
          })
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
        gridHeader: React.createElement(
          Primitive.Subtitle,
          null,
          mergedTranslations.gridTitle
        )
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
  onDragDropPrevent: undefined
}, _temp)) || _class);
export { HierarchyTreeSelector as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiVHJlZUNvbXBvbmVudCIsInN0eWxlZCIsIkxpc3QiLCJmcm9tSlMiLCJJbW11dGFibGVQcm9wVHlwZXMiLCJEYXRhZ3JpZCIsImdyaWRTaGFwZSIsImdyaWRDb2x1bW5TaGFwZSIsIkRhdGFncmlkQWN0aW9ucyIsIlByb3BUeXBlcyIsImNvbm5lY3QiLCJQZXJmZWN0U2Nyb2xsYmFyIiwiUHJpbWl0aXZlIiwiQ29udHJvbEJhciIsIkFycm93Q29udHJvbHMiLCJkZWZhdWx0VHJhbnNsYXRpb25zIiwiQUNUSU9OX0JBUl9DT05UQUlORVJfSEVJR0hUIiwiVFJFRV9BQ1RJT05TIiwiQUREX0NISUxEUkVOIiwiTU9WRV9MRUFGIiwiUkVOQU1FX1BBUkVOVCIsIkRFTEVURV9QQVJFTlQiLCJHcmlkIiwicHJvcHMiLCJ0aGVtZSIsImNvbG9ycyIsImNvbG9yTGlnaHRHcmF5IiwiQ29udGFpbmVyIiwiZGl2IiwiVHJlZUNvbnRhaW5lciIsImd1dHRlcldpZHRoIiwibWFwRGlzcGF0Y2hUb1Byb3BzIiwic2V0RGF0YSIsIm1hcFN0YXRlVG9Qcm9wcyIsInN0YXRlIiwiZ3JpZElkIiwiZ3JpZCIsImlkIiwic2VsZWN0ZWRHcmlkSXRlbXMiLCJkYXRhZ3JpZCIsImdldEluIiwiZ3JpZERhdGEiLCJIaWVyYXJjaHlUcmVlU2VsZWN0b3IiLCJvblRyZWVJdGVtU2VsZWN0Iiwic2VsZWN0ZWRLZXlzIiwic2V0U3RhdGUiLCJvblRyZWVJdGVtRHJhZ0Ryb3AiLCJpdGVtcyIsIm9uQ2hhbmdlIiwib25EZWxldGVDbGljayIsInRyZWVEYXRhIiwiYWN0aW9uIiwidHlwZSIsIm5ld0l0ZW1zIiwiZ2V0VXBkYXRlZFRyZWUiLCJvbkFkZE5ld0NsaWNrIiwiZGF0YSIsImNhbGxiYWNrIiwiaWRLZXkiLCJzbGljZSIsInB1c2giLCJvbk1vdmVUb0dyaWRDbGljayIsIm5ld0dyaWRJdGVtcyIsImdldFRyZWVJdGVtIiwic2V0RGF0YVRvR3JpZCIsIm9uTW92ZVRvVHJlZUNsaWNrIiwiZmlsdGVyIiwiaW5jbHVkZXMiLCJpIiwiZ2V0IiwidG9KUyIsIml0ZW0iLCJvbklucHV0Q2hhbmdlIiwidmFsdWUiLCJhcnJheSIsImZvdW5kIiwiY2hpbGRLZXkiLCJ2YWx1ZUtleSIsInJlbW92ZUFjdGlvbnMiLCJyb290SXRlbSIsImZpbmQiLCJsZW5ndGgiLCJnZXRBbGxMZWFmcyIsImRlc2VsZWN0SXRlbSIsImNoaWxkIiwiZmlsdGVyZWRDaGlsZHJlbiIsImNoaWxkSXRlbSIsImNvbmNhdCIsIlR5cGVFcnJvciIsImFscmVhZHlGb3VuZCIsImxlYWZzIiwicmV0dXJuUGFyZW50IiwicGFyZW50IiwiZm9yRWFjaCIsInNldE5ld0l0ZW1zIiwiZ3JpZENvbHVtbnMiLCJpc0RyYWdEcm9wTGVnYWwiLCJlIiwib25EcmFnRHJvcFByZXZlbnQiLCJkcm9wSXRlbSIsIm5vZGUiLCJldmVudEtleSIsImRyYWdJdGVtIiwiZHJhZ05vZGUiLCJkcm9wSXRlbVBhcmVudCIsImRyb3BUb0dhcCIsImhhc0xlYWZzIiwiaGFzUGFyZW50cyIsInJlbmRlciIsImNsYXNzTmFtZSIsInRyYW5zbGF0aW9ucyIsIm1lcmdlZEdyaWQiLCJPYmplY3QiLCJhc3NpZ24iLCJkZWZhdWx0U2hvd0ZpbHRlcmluZ1JvdyIsIm1lcmdlZFRyYW5zbGF0aW9ucyIsImdyaWRUaXRsZSIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiLCJ1bmRlZmluZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsYUFBUCxNQUEwQiw0QkFBMUI7QUFDQSxPQUFPQyxNQUFQLE1BQW1CLG1CQUFuQjtBQUNBLFNBQVNDLElBQVQsRUFBZUMsTUFBZixRQUE2QixXQUE3QjtBQUNBLE9BQU9DLGtCQUFQLE1BQStCLDJCQUEvQjtBQUNBLFNBQVND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Q29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFRyZWVDb21wb25lbnQgZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtdHJlZXZpZXcnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgeyBMaXN0LCBmcm9tSlMgfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IEltbXV0YWJsZVByb3BUeXBlcyBmcm9tICdyZWFjdC1pbW11dGFibGUtcHJvcHR5cGVzJztcbmltcG9ydCB7IERhdGFncmlkLCBncmlkU2hhcGUsIGdyaWRDb2x1bW5TaGFwZSwgRGF0YWdyaWRBY3Rpb25zIH0gZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtZ3JpZCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBQZXJmZWN0U2Nyb2xsYmFyIGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LXBlcmZlY3Qtc2Nyb2xsYmFyJztcbmltcG9ydCB7IFByaW1pdGl2ZSB9IGZyb20gJ0BvcHVzY2FwaXRhL29jLWNtLWNvbW1vbi1sYXlvdXRzJztcbi8vIEFwcCBpbXBvcnRzXG5pbXBvcnQgQ29udHJvbEJhciBmcm9tICcuL2hpZXJhcmNoeS10cmVlLXNlbGVjdG9yLWNvbnRyb2wtYmFyLmNvbXBvbmVudCc7XG5pbXBvcnQgQXJyb3dDb250cm9scyBmcm9tICcuL2hpZXJhcmNoeS10cmVlLXNlbGVjdG9yLWFycm93LWNvbnRyb2xzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBkZWZhdWx0VHJhbnNsYXRpb25zIH0gZnJvbSAnLi9oaWVyYXJjaHktdHJlZS51dGlscyc7XG5cbmNvbnN0IEFDVElPTl9CQVJfQ09OVEFJTkVSX0hFSUdIVCA9ICc1N3B4JztcbmNvbnN0IFRSRUVfQUNUSU9OUyA9IHtcbiAgQUREX0NISUxEUkVOOiAnQUREX0NISUxEUkVOJyxcbiAgTU9WRV9MRUFGOiAnTU9WRV9MRUFGJyxcbiAgUkVOQU1FX1BBUkVOVDogJ1JFTkFNRV9QQVJFTlQnLFxuICBERUxFVEVfUEFSRU5UOiAnREVMRVRFX1BBUkVOVCcsXG59O1xuXG5jb25zdCBHcmlkID0gc3R5bGVkKERhdGFncmlkKWBcbiAgaGVpZ2h0OiAxMDAlO1xuICBwYWRkaW5nOiAwO1xuICAub2MtZGF0YWdyaWQtbWFpbi1jb250YWluZXIge1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuY29sb3JzLmNvbG9yTGlnaHRHcmF5fTtcbiAgICBib3JkZXItdG9wOm5vbmU7XG4gIH1cbmA7XG5cbmNvbnN0IENvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGZsZXg7XG4gID4gZGl2IHtcbiAgICB3aWR0aDogNTAlO1xuICAgIGZsZXg6IDEgMSAxMDAlO1xuICB9XG5gO1xuXG5jb25zdCBUcmVlQ29udGFpbmVyID0gc3R5bGVkLmRpdmBcbiAgaGVpZ2h0OjEwMCU7XG4gIC5vYy1zY3JvbGxiYXItY29udGFpbmVyIHtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAke3Byb3BzID0+IHByb3BzLnRoZW1lLmNvbG9ycy5jb2xvckxpZ2h0R3JheX07XG4gICAgaGVpZ2h0OiBjYWxjKDEwMCUgLSAke0FDVElPTl9CQVJfQ09OVEFJTkVSX0hFSUdIVH0pO1xuICAgIHBhZGRpbmc6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuZ3V0dGVyV2lkdGh9O1xuICB9XG4gIC5vYy1yZWFjdC10cmVlIHtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgLnJjLXRyZWUtaWNvbkVsZS5yYy10cmVlLWljb25fX2N1c3RvbWl6ZSB7XG4gICAgICAgIGRpc3BsYXk6bm9uZTtcbiAgICB9XG4gIH1cbmA7XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IHtcbiAgc2V0RGF0YTogRGF0YWdyaWRBY3Rpb25zLnNldERhdGEsXG59O1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUsIHByb3BzKSA9PiB7XG4gIGNvbnN0IGdyaWRJZCA9IHByb3BzLmdyaWQuaWQ7XG4gIHJldHVybiB7XG4gICAgc2VsZWN0ZWRHcmlkSXRlbXM6IHN0YXRlLmRhdGFncmlkLmdldEluKFtncmlkSWQsICdzZWxlY3RlZEl0ZW1zJ10sIExpc3QoKSksXG4gICAgZ3JpZERhdGE6IHN0YXRlLmRhdGFncmlkLmdldEluKFtncmlkSWQsICdhbGxEYXRhJ10sIExpc3QoKSksXG4gIH07XG59O1xuXG5AY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcylcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhpZXJhcmNoeVRyZWVTZWxlY3RvciBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGlkS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHZhbHVlS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNoaWxkS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHRyZWVEYXRhOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc2hhcGUoe30pKSxcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBncmlkOiBncmlkU2hhcGUuaXNSZXF1aXJlZCxcbiAgICBncmlkQ29sdW1uczogUHJvcFR5cGVzLmFycmF5T2YoZ3JpZENvbHVtblNoYXBlKS5pc1JlcXVpcmVkLFxuICAgIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBzZXREYXRhOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHNlbGVjdGVkR3JpZEl0ZW1zOiBJbW11dGFibGVQcm9wVHlwZXMubGlzdC5pc1JlcXVpcmVkLFxuICAgIGdyaWREYXRhOiBJbW11dGFibGVQcm9wVHlwZXMubGlzdC5pc1JlcXVpcmVkLFxuICAgIHRyYW5zbGF0aW9uczogUHJvcFR5cGVzLnNoYXBlKHt9KSxcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBvbkRyYWdEcm9wUHJldmVudDogUHJvcFR5cGVzLmZ1bmMsXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBpZEtleTogJ2lkJyxcbiAgICB2YWx1ZUtleTogJ25hbWUnLFxuICAgIGNoaWxkS2V5OiAnY2hpbGRyZW4nLFxuICAgIHRyZWVEYXRhOiBbXSxcbiAgICBjbGFzc05hbWU6ICcnLFxuICAgIHRyYW5zbGF0aW9uczogZGVmYXVsdFRyYW5zbGF0aW9ucyxcbiAgICBpZDogJ2hpZXJhcmNoeS10cmVlJyxcbiAgICBvbkRyYWdEcm9wUHJldmVudDogdW5kZWZpbmVkLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzZWxlY3RlZEtleXM6IFtdLFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0cyBhIHRyZWUgaXRlbVxuICAgKiBAcGFyYW0gc2VsZWN0ZWRLZXlzIChhcnJheSlcbiAgICovXG4gIG9uVHJlZUl0ZW1TZWxlY3QgPSAoc2VsZWN0ZWRLZXlzKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkS2V5cyB9KTtcbiAgfTtcblxuICAvKipcbiAgICogRmlyZWQgb24gZHJhZyBuJyBkcm9wXG4gICAqIEBwYXJhbSBpdGVtc1xuICAgKi9cbiAgb25UcmVlSXRlbURyYWdEcm9wID0gKGl0ZW1zKSA9PiB7XG4gICAgY29uc3QgeyBvbkNoYW5nZSB9ID0gdGhpcy5wcm9wcztcbiAgICBvbkNoYW5nZShpdGVtcyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIERlbGV0ZXMgYSBwYXJlbnQgbm9kZVxuICAgKi9cbiAgb25EZWxldGVDbGljayA9ICgpID0+IHtcbiAgICBjb25zdCB7IG9uQ2hhbmdlLCB0cmVlRGF0YSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBhY3Rpb24gPSB7XG4gICAgICB0eXBlOiBUUkVFX0FDVElPTlMuREVMRVRFX1BBUkVOVCxcbiAgICB9O1xuICAgIGNvbnN0IG5ld0l0ZW1zID0gdGhpcy5nZXRVcGRhdGVkVHJlZSh0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXSwgdHJlZURhdGEsIGFjdGlvbik7XG4gICAgb25DaGFuZ2UobmV3SXRlbXMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBZGRzIGEgbmV3IG5vZGUgdG8gdGhlIHJvb3Qgb2YgdGhlIHRyZWUsIG9yIHVuZGVyIGEgc2VsZWN0ZWQgdHJlZSBub2RlIHVzaW5nXG4gICAqIEFERF9DSElMRFJFTiBhY3Rpb25cbiAgICogQHBhcmFtIGRhdGFcbiAgICovXG4gIG9uQWRkTmV3Q2xpY2sgPSAoZGF0YSwgY2FsbGJhY2spID0+IHtcbiAgICBjb25zdCB7IG9uQ2hhbmdlLCB0cmVlRGF0YSwgaWRLZXkgfSA9IHRoaXMucHJvcHM7XG4gICAgbGV0IG5ld0l0ZW1zID0gdHJlZURhdGEuc2xpY2UoKTtcblxuICAgIC8vIElmIG5vIHRyZWUgbm9kZSBpcyBzZWxlY3RlZCwgd2UnbGwgcGxhY2UgdGhlIG5ldyBpdGVtIHRvIHRoZSByb290XG4gICAgLy8gb2YgdGhlIHRyZWVcbiAgICBpZiAoIXRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdKSB7XG4gICAgICBuZXdJdGVtcy5wdXNoKGRhdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBhY3Rpb24gPSB7XG4gICAgICAgIHR5cGU6IFRSRUVfQUNUSU9OUy5BRERfQ0hJTERSRU4sXG4gICAgICAgIGRhdGEsXG4gICAgICB9O1xuICAgICAgbmV3SXRlbXMgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdLCB0cmVlRGF0YSwgYWN0aW9uKTtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkS2V5czogW2RhdGFbaWRLZXldXSB9LCAoKSA9PiB7XG4gICAgICBvbkNoYW5nZShuZXdJdGVtcyk7XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZW1vdmVzIHRoZSBjaG9zZW4gaXRlbSBmcm9tIGEgdHJlZSBhbmQgdXBkYXRlcyB0aGUgZ3JpZCB1c2luZyBNT1ZFX0xFQUZcbiAgICogYWN0aW9uXG4gICAqL1xuICBvbk1vdmVUb0dyaWRDbGljayA9ICgpID0+IHtcbiAgICBjb25zdCB7IHRyZWVEYXRhLCBvbkNoYW5nZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBhY3Rpb24gPSB7XG4gICAgICB0eXBlOiBUUkVFX0FDVElPTlMuTU9WRV9MRUFGLFxuICAgICAgZGF0YTogdGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF0sXG4gICAgfTtcbiAgICBjb25zdCBuZXdHcmlkSXRlbXMgPSBmcm9tSlMoW3RoaXMuZ2V0VHJlZUl0ZW0odGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF0pXSk7XG4gICAgY29uc3QgbmV3SXRlbXMgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdLCB0cmVlRGF0YSwgYWN0aW9uKTtcblxuICAgIHRoaXMuc2V0RGF0YVRvR3JpZChuZXdHcmlkSXRlbXMpO1xuICAgIG9uQ2hhbmdlKG5ld0l0ZW1zKTtcbiAgfTtcblxuICAvKipcbiAgICogQWRkcyBzZWxlY3RlZCBncmlkIGl0ZW1zIHRvIHRoZSBjaG9zZW4gdHJlZSBub2RlIHVzaW5nIEFERF9DSElMRFJFTiBhY3Rpb25cbiAgICovXG4gIG9uTW92ZVRvVHJlZUNsaWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIG9uQ2hhbmdlLCBzZWxlY3RlZEdyaWRJdGVtcywgZ3JpZERhdGEsIHRyZWVEYXRhLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgYWN0aW9uID0ge1xuICAgICAgdHlwZTogVFJFRV9BQ1RJT05TLkFERF9DSElMRFJFTixcbiAgICAgIGRhdGE6IGdyaWREYXRhXG4gICAgICAgIC5maWx0ZXIoaSA9PiBzZWxlY3RlZEdyaWRJdGVtcy5pbmNsdWRlcyhpLmdldCgnaWQnKSkpXG4gICAgICAgIC50b0pTKCksXG4gICAgfTtcbiAgICBjb25zdCBuZXdJdGVtcyA9IHRoaXMuZ2V0VXBkYXRlZFRyZWUodGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF0sIHRyZWVEYXRhLCBhY3Rpb24pO1xuICAgIGNvbnN0IG5ld0dyaWRJdGVtcyA9IGdyaWREYXRhLmZpbHRlcihpdGVtID0+ICFzZWxlY3RlZEdyaWRJdGVtcy5pbmNsdWRlcyhpdGVtLmdldCgnaWQnKSkpO1xuXG4gICAgdGhpcy5zZXREYXRhVG9HcmlkKG5ld0dyaWRJdGVtcywgdHJ1ZSk7XG4gICAgb25DaGFuZ2UobmV3SXRlbXMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZW5hbWVzIHRoZSBjaG9zZW4gdHJlZSBub2RlIHVzaW5nIGEgUkVOQU1FX1BBUkVOVCBhY3Rpb25cbiAgICogQHBhcmFtIHZhbHVlXG4gICAqL1xuICBvbklucHV0Q2hhbmdlID0gKHZhbHVlKSA9PiB7XG4gICAgY29uc3QgeyB0cmVlRGF0YSwgb25DaGFuZ2UgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgYWN0aW9uID0ge1xuICAgICAgdHlwZTogVFJFRV9BQ1RJT05TLlJFTkFNRV9QQVJFTlQsXG4gICAgICBkYXRhOiB2YWx1ZSxcbiAgICB9O1xuICAgIGNvbnN0IG5ld0l0ZW1zID0gdGhpcy5nZXRVcGRhdGVkVHJlZSh0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXSwgdHJlZURhdGEsIGFjdGlvbik7XG4gICAgb25DaGFuZ2UobmV3SXRlbXMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHVwZGF0ZWQgdHJlZSBpdGVtcy5cbiAgICogQHBhcmFtIGlkIC0gdGFyZ2V0IGl0ZW1cbiAgICogQHBhcmFtIGFycmF5IC0gYXJyYXkgd2hlcmUgdGFyZ2V0IGl0ZW0gaXMgYmVpbmcgc2VhcmNoZWRcbiAgICogQHBhcmFtIGFjdGlvbiAtIGFjdGlvbiB0byBiZSBwZXJmb3JtZWQge3R5cGUsIGRhdGF9XG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgZ2V0VXBkYXRlZFRyZWUgPSAoaWQsIGFycmF5ID0gdGhpcy5wcm9wcy50cmVlRGF0YSwgYWN0aW9uKSA9PiB7XG4gICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgY29uc3QgeyBpZEtleSwgY2hpbGRLZXksIHZhbHVlS2V5IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IG5ld0l0ZW1zID0gYXJyYXkuc2xpY2UoKTtcbiAgICBjb25zdCByZW1vdmVBY3Rpb25zID0gW1RSRUVfQUNUSU9OUy5NT1ZFX0xFQUYsIFRSRUVfQUNUSU9OUy5ERUxFVEVfUEFSRU5UXTtcblxuICAgIC8vIElmIGRlbGV0ZWQgcGFyZW50IGl0ZW0gaXMgaW4gdGhlIHJvb3Qgbm9kZVxuICAgIGlmIChhY3Rpb24udHlwZSA9PT0gVFJFRV9BQ1RJT05TLkRFTEVURV9QQVJFTlQpIHtcbiAgICAgIGNvbnN0IHJvb3RJdGVtID0gYXJyYXkuZmluZChpdGVtID0+IGl0ZW1baWRLZXldID09PSBpZCk7XG4gICAgICBpZiAocm9vdEl0ZW0pIHtcbiAgICAgICAgaWYgKHJvb3RJdGVtW2NoaWxkS2V5XS5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLnNldERhdGFUb0dyaWQoZnJvbUpTKHRoaXMuZ2V0QWxsTGVhZnMocm9vdEl0ZW1bY2hpbGRLZXldKSkpO1xuICAgICAgICAgIHRoaXMuZGVzZWxlY3RJdGVtKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ld0l0ZW1zLmZpbHRlcihpdGVtID0+IGl0ZW1baWRLZXldICE9PSBpZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdJdGVtcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3QgaXRlbSA9IG5ld0l0ZW1zW2ldO1xuICAgICAgaWYgKHJlbW92ZUFjdGlvbnMuaW5jbHVkZXMoYWN0aW9uLnR5cGUpICYmIGl0ZW1bY2hpbGRLZXldICYmICFmb3VuZCkge1xuICAgICAgICBmb3VuZCA9ICEhaXRlbVtjaGlsZEtleV0uZmluZChjaGlsZCA9PiBjaGlsZFtpZEtleV0gPT09IGlkKTtcbiAgICAgICAgaWYgKGZvdW5kKSB7XG4gICAgICAgICAgLy8gV2hlbiByZW1vdmluZyBhbiBpdGVtIHdlIG11c3QgZmlyc3QgZmluZCBpdHMgcGFyZW50IGFuZCBhbHRlciBpdHMgY2hpbGRyZW4gYXJyYXlcbiAgICAgICAgICBpZiAoYWN0aW9uLnR5cGUgPT09IFRSRUVfQUNUSU9OUy5NT1ZFX0xFQUYpIHtcbiAgICAgICAgICAgIGl0ZW1bY2hpbGRLZXldID0gaXRlbVtjaGlsZEtleV0uZmlsdGVyKGNoaWxkID0+IGNoaWxkW2lkS2V5XSAhPT0gaWQpO1xuICAgICAgICAgICAgdGhpcy5kZXNlbGVjdEl0ZW0oKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGFjdGlvbi50eXBlID09PSBUUkVFX0FDVElPTlMuREVMRVRFX1BBUkVOVCkge1xuICAgICAgICAgICAgLy8gd2UgbXVzdCBmaXJzdCBmaWx0ZXIgdGhlIGNoaWxkcmVuLCBzbyB0aGF0IHdlIHdvbid0IGdldCBsZWFmcyBmcm9tXG4gICAgICAgICAgICAvLyBvdGhlciBjaGlsZCBicmFuY2hlc1xuICAgICAgICAgICAgY29uc3QgZmlsdGVyZWRDaGlsZHJlbiA9IGl0ZW1bY2hpbGRLZXldLmZpbHRlcihjaGlsZEl0ZW0gPT4gY2hpbGRJdGVtW2lkS2V5XSA9PT0gaWQpO1xuICAgICAgICAgICAgdGhpcy5zZXREYXRhVG9HcmlkKGZyb21KUyh0aGlzLmdldEFsbExlYWZzKGZpbHRlcmVkQ2hpbGRyZW4pKSk7XG4gICAgICAgICAgICB0aGlzLmRlc2VsZWN0SXRlbSgpO1xuICAgICAgICAgICAgaXRlbVtjaGlsZEtleV0gPSBpdGVtW2NoaWxkS2V5XS5maWx0ZXIoY2hpbGRJdGVtID0+IGNoaWxkSXRlbVtpZEtleV0gIT09IGlkKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1baWRLZXldID09PSBpZCAmJiAhZm91bmQpIHtcbiAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgICAgY2FzZSBUUkVFX0FDVElPTlMuQUREX0NISUxEUkVOOlxuICAgICAgICAgICAgaXRlbVtjaGlsZEtleV0gPSAoaXRlbVtjaGlsZEtleV0gfHwgW10pLmNvbmNhdChhY3Rpb24uZGF0YSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIFRSRUVfQUNUSU9OUy5SRU5BTUVfUEFSRU5UOlxuICAgICAgICAgICAgaXRlbVt2YWx1ZUtleV0gPSBhY3Rpb24uZGF0YTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBY3Rpb24gdHlwZSBpcyB1bmRlZmluZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtW2NoaWxkS2V5XSAmJiAhZm91bmQpIGZvdW5kID0gdGhpcy5nZXRVcGRhdGVkVHJlZShpZCwgaXRlbVtjaGlsZEtleV0sIGFjdGlvbik7XG4gICAgfVxuXG4gICAgaWYgKCFmb3VuZCkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiBuZXdJdGVtcztcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyByZWN1cnNpdmVseSBhbGwgbGVhZiBpdGVtcyBmcm9tIGEgZ2l2ZW4gYXJyYXlcbiAgICogQHBhcmFtIGFycmF5XG4gICAqIEBwYXJhbSBhbHJlYWR5Rm91bmQgKHVzZWQgcmVjdXJzaXZlbHkpXG4gICAqL1xuICBnZXRBbGxMZWFmcyA9IChhcnJheSwgYWxyZWFkeUZvdW5kID0gW10pID0+IHtcbiAgICBjb25zdCB7IGNoaWxkS2V5IH0gPSB0aGlzLnByb3BzO1xuICAgIGxldCBsZWFmcyA9IGFscmVhZHlGb3VuZDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSBhcnJheVtpXTtcbiAgICAgIGlmIChpdGVtW2NoaWxkS2V5XSkge1xuICAgICAgICBsZWFmcyA9IHRoaXMuZ2V0QWxsTGVhZnMoaXRlbVtjaGlsZEtleV0sIGFscmVhZHlGb3VuZCk7XG4gICAgICB9XG4gICAgICBpZiAoIWl0ZW1bY2hpbGRLZXldKSBsZWFmcy5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgICByZXR1cm4gbGVhZnM7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSB0cmVlIGl0ZW0gYnkgSURcbiAgICogQHBhcmFtIGlkXG4gICAqIEBwYXJhbSBhcnJheVxuICAgKiBAcGFyYW0gcmV0dXJuUGFyZW50IC0gcmV0dXJuIGl0ZW0ncyBwYXJlbnQgaW5zdGVhZCBvZiB0aGUgaXRlbVxuICAgKiBAcGFyYW0gcGFyZW50IC0gcGFyZW50IGl0ZW0gKHVzZWQgcmVjdXJzaXZlbHkpXG4gICAqIEByZXR1cm5zIHt7fX1cbiAgICovXG4gIGdldFRyZWVJdGVtID0gKGlkLCBhcnJheSA9IHRoaXMucHJvcHMudHJlZURhdGEsIHJldHVyblBhcmVudCA9IGZhbHNlLCBwYXJlbnQgPSBudWxsKSA9PiB7XG4gICAgY29uc3QgeyBjaGlsZEtleSwgaWRLZXkgfSA9IHRoaXMucHJvcHM7XG4gICAgbGV0IGZvdW5kID0gYXJyYXkuZmluZChpdGVtID0+IGl0ZW1baWRLZXldID09PSBpZCk7XG5cbiAgICBpZiAoZm91bmQgJiYgcmV0dXJuUGFyZW50KSBmb3VuZCA9IHBhcmVudDtcblxuICAgIGlmICghZm91bmQpIHtcbiAgICAgIGFycmF5LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgaWYgKGl0ZW1bY2hpbGRLZXldICYmICFmb3VuZCkge1xuICAgICAgICAgIGZvdW5kID0gdGhpcy5nZXRUcmVlSXRlbShpZCwgaXRlbVtjaGlsZEtleV0sIHJldHVyblBhcmVudCwgaXRlbSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gZm91bmQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIEFwcGVuZHMgcHJvdmlkZWQgaXRlbXMgdG8gdGhlIGdyaWRcbiAgICogQHBhcmFtIGl0ZW1zIC0gaW1tdXRhYmxlIGFycmF5IG9mIGl0ZW1zIHRvIGJlIGFwcGVuZGVkIHRvIGdyaWRcbiAgICogQHBhcmFtIHNldE5ld0l0ZW1zIC0gc2V0IGNvbXBsZXRlbHkgYSBuZXcgYXJyYXkgb2YgaXRlbXNcbiAgICovXG4gIHNldERhdGFUb0dyaWQgPSAoaXRlbXMsIHNldE5ld0l0ZW1zID0gZmFsc2UpID0+IHtcbiAgICBsZXQgZGF0YSA9IExpc3QoKTtcbiAgICBjb25zdCB7IGdyaWQsIGdyaWRDb2x1bW5zLCBncmlkRGF0YSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIXNldE5ld0l0ZW1zKSBkYXRhID0gZ3JpZERhdGEuc2xpY2UoKTtcbiAgICBjb25zdCBuZXdHcmlkSXRlbXMgPSBkYXRhLmNvbmNhdChpdGVtcyk7XG4gICAgdGhpcy5wcm9wcy5zZXREYXRhKGdyaWQsIGdyaWRDb2x1bW5zLCBuZXdHcmlkSXRlbXMpO1xuICB9O1xuXG4gIGlzRHJhZ0Ryb3BMZWdhbCA9IChpdGVtcywgZSkgPT4ge1xuICAgIGNvbnN0IHsgY2hpbGRLZXksIHRyZWVEYXRhLCBvbkRyYWdEcm9wUHJldmVudCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBkcm9wSXRlbSA9IHRoaXMuZ2V0VHJlZUl0ZW0oZS5ub2RlLnByb3BzLmV2ZW50S2V5KTtcbiAgICBjb25zdCBkcmFnSXRlbSA9IHRoaXMuZ2V0VHJlZUl0ZW0oZS5kcmFnTm9kZS5wcm9wcy5ldmVudEtleSk7XG4gICAgY29uc3QgZHJvcEl0ZW1QYXJlbnQgPSB0aGlzLmdldFRyZWVJdGVtKGUubm9kZS5wcm9wcy5ldmVudEtleSwgdHJlZURhdGEsIHRydWUpO1xuXG4gICAgLyoqXG4gICAgICogV2Ugd2FudCB0byBwcmV2ZW50IHRoZSBtb3ZlLCBpZjpcbiAgICAgKiAtIFNlbGVjdGVkIGl0ZW0gaXMgYSBwYXJlbnQsIGFuZCAuLlxuICAgICAqICAgIC0gRHJvcHBpbmcgb3ZlciBhbiBpdGVtLCBhbmQgLi5cbiAgICAgKiAgICAgIC0gTmV3IHBhcmVudCBoYXMgbGVhZnMgT1IgbmV3IHBhcmVudCBpcyBhIGxlYWZcbiAgICAgKiAgICAtIERyb3BwaW5nIGJldHdlZW4gaXRlbXMsIGFuZCAuLlxuICAgICAqICAgICAgICAtIE5ldyBwYXJlbnQncyBwYXJlbnQgaGFzIGxlYWZzXG4gICAgICogIC0gU2VsZWN0ZWQgaXRlbSBpcyBhIGxlYWYsIGFuZCAuLi5cbiAgICAgKi9cbiAgICBpZiAoZHJhZ0l0ZW1bY2hpbGRLZXldKSB7XG4gICAgICBpZiAoXG4gICAgICAgICghZS5kcm9wVG9HYXAgJiYgKHRoaXMuaGFzTGVhZnMoZHJvcEl0ZW0pIHx8ICFkcm9wSXRlbVtjaGlsZEtleV0pKSB8fFxuICAgICAgICAoZHJvcEl0ZW1QYXJlbnQgJiYgZS5kcm9wVG9HYXAgJiYgKHRoaXMuaGFzTGVhZnMoZHJvcEl0ZW1QYXJlbnQpKSlcbiAgICAgICkge1xuICAgICAgICBpZiAob25EcmFnRHJvcFByZXZlbnQpIG9uRHJhZ0Ryb3BQcmV2ZW50KCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKFxuICAgICAgKGRyb3BJdGVtICYmICFlLmRyb3BUb0dhcCAmJiB0aGlzLmhhc1BhcmVudHMoZHJvcEl0ZW0pKSB8fFxuICAgICAgKGRyb3BJdGVtUGFyZW50ICYmIGUuZHJvcFRvR2FwICYmIHRoaXMuaGFzUGFyZW50cyhkcm9wSXRlbVBhcmVudCkpIHx8XG4gICAgICAoZS5kcm9wVG9HYXAgJiYgIWRyb3BJdGVtUGFyZW50KSB8fFxuICAgICAgKCFlLmRyb3BUb0dhcCAmJiAhZHJvcEl0ZW1bY2hpbGRLZXldKVxuICAgICkge1xuICAgICAgLy8gSXRlbSBoYXMgZ290IHBhcmVudCBhcyBhIGNoaWxkIC0gbGVhZiBjYW5ub3QgYmUgZHJvcHBlZCBoZXJlXG4gICAgICBpZiAob25EcmFnRHJvcFByZXZlbnQpIG9uRHJhZ0Ryb3BQcmV2ZW50KCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG5cbiAgaGFzTGVhZnMgPSAoaXRlbSkgPT4ge1xuICAgIGNvbnN0IHsgY2hpbGRLZXkgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFpdGVtW2NoaWxkS2V5XSkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiAhIWl0ZW1bY2hpbGRLZXldLmZpbmQoY2hpbGQgPT4gIWNoaWxkW2NoaWxkS2V5XSk7XG4gIH07XG5cbiAgaGFzUGFyZW50cyA9IChpdGVtKSA9PiB7XG4gICAgY29uc3QgeyBjaGlsZEtleSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIWl0ZW1bY2hpbGRLZXldKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuICEhaXRlbVtjaGlsZEtleV0uZmluZChjaGlsZCA9PiBjaGlsZFtjaGlsZEtleV0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBEZXNlbGVjdHMgYW4gaXRlbSwgaWYgaXQgaXMgZS5nLiByZW1vdmVkXG4gICAqL1xuICBkZXNlbGVjdEl0ZW0gPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkS2V5czogW10gfSk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHZhbHVlS2V5LCBpZEtleSwgdHJlZURhdGEsIGdyaWQsIGdyaWRDb2x1bW5zLCBjbGFzc05hbWUsIHRyYW5zbGF0aW9ucyxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IG1lcmdlZEdyaWQgPSBPYmplY3QuYXNzaWduKHt9LCBncmlkLCB7IGRlZmF1bHRTaG93RmlsdGVyaW5nUm93OiB0cnVlIH0pO1xuICAgIGNvbnN0IG1lcmdlZFRyYW5zbGF0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRUcmFuc2xhdGlvbnMsIHRyYW5zbGF0aW9ucyk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPENvbnRhaW5lciBjbGFzc05hbWU9e2NsYXNzTmFtZX0+XG4gICAgICAgIDxUcmVlQ29udGFpbmVyPlxuICAgICAgICAgIDxDb250cm9sQmFyXG4gICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgIG9uQWRkTmV3Q2xpY2s9e3RoaXMub25BZGROZXdDbGlja31cbiAgICAgICAgICAgIG9uRGVsZXRlQ2xpY2s9e3RoaXMub25EZWxldGVDbGlja31cbiAgICAgICAgICAgIG9uSW5wdXRDaGFuZ2U9e3RoaXMub25JbnB1dENoYW5nZX1cbiAgICAgICAgICAgIHNlbGVjdGVkVHJlZUl0ZW09e3RoaXMuZ2V0VHJlZUl0ZW0odGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF0pfVxuICAgICAgICAgICAgaGVpZ2h0PXtBQ1RJT05fQkFSX0NPTlRBSU5FUl9IRUlHSFR9XG4gICAgICAgICAgICB0cmFuc2xhdGlvbnM9e21lcmdlZFRyYW5zbGF0aW9uc31cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxQZXJmZWN0U2Nyb2xsYmFyPlxuICAgICAgICAgICAgPFRyZWVDb21wb25lbnRcbiAgICAgICAgICAgICAgdHJlZURhdGE9e3RyZWVEYXRhfVxuICAgICAgICAgICAgICBkYXRhTG9va1VwS2V5PXtpZEtleX1cbiAgICAgICAgICAgICAgZGF0YUxvb2tVcFZhbHVlPXt2YWx1ZUtleX1cbiAgICAgICAgICAgICAgb25TZWxlY3Q9e3RoaXMub25UcmVlSXRlbVNlbGVjdH1cbiAgICAgICAgICAgICAgb25EcmFnRHJvcD17dGhpcy5vblRyZWVJdGVtRHJhZ0Ryb3B9XG4gICAgICAgICAgICAgIGNoZWNrYWJsZT17ZmFsc2V9XG4gICAgICAgICAgICAgIHNlbGVjdGVkS2V5cz17dGhpcy5zdGF0ZS5zZWxlY3RlZEtleXN9XG4gICAgICAgICAgICAgIGlzRHJhZ0Ryb3BMZWdhbD17dGhpcy5pc0RyYWdEcm9wTGVnYWx9XG4gICAgICAgICAgICAgIHNlbGVjdGFibGVcbiAgICAgICAgICAgICAgZHJhZ2dhYmxlXG4gICAgICAgICAgICAgIGRlZmF1bHRFeHBhbmRBbGxcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9QZXJmZWN0U2Nyb2xsYmFyPlxuICAgICAgICA8L1RyZWVDb250YWluZXI+XG4gICAgICAgIDxBcnJvd0NvbnRyb2xzXG4gICAgICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgc2VsZWN0ZWRUcmVlSXRlbT17dGhpcy5nZXRUcmVlSXRlbSh0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXSl9XG4gICAgICAgICAgb25Nb3ZlVG9UcmVlQ2xpY2s9e3RoaXMub25Nb3ZlVG9UcmVlQ2xpY2t9XG4gICAgICAgICAgb25Nb3ZlVG9HcmlkQ2xpY2s9e3RoaXMub25Nb3ZlVG9HcmlkQ2xpY2t9XG4gICAgICAgIC8+XG4gICAgICAgIDxHcmlkXG4gICAgICAgICAgZ3JpZD17bWVyZ2VkR3JpZH1cbiAgICAgICAgICBjb2x1bW5zPXtncmlkQ29sdW1uc31cbiAgICAgICAgICByb3dTZWxlY3RcbiAgICAgICAgICBtdWx0aVNlbGVjdFxuICAgICAgICAgIGZpbHRlcmluZ1xuICAgICAgICAgIGdyaWRIZWFkZXI9ezxQcmltaXRpdmUuU3VidGl0bGU+e21lcmdlZFRyYW5zbGF0aW9ucy5ncmlkVGl0bGV9PC9QcmltaXRpdmUuU3VidGl0bGU+fVxuICAgICAgICAvPlxuICAgICAgPC9Db250YWluZXI+XG4gICAgKTtcbiAgfVxufVxuIl19