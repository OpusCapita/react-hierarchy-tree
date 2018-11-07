'use strict';

exports.__esModule = true;
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _dec, _class, _class2, _temp;

var _templateObject = _taggedTemplateLiteralLoose(['\n  height: 100%;\n  padding: 0;\n  .oc-datagrid-main-container {\n    border: 1px solid ', ';\n    border-top:none;\n  }\n'], ['\n  height: 100%;\n  padding: 0;\n  .oc-datagrid-main-container {\n    border: 1px solid ', ';\n    border-top:none;\n  }\n']),
    _templateObject2 = _taggedTemplateLiteralLoose(['\n  display: flex;\n  > div {\n    width: 50%;\n    flex: 1 1 100%;\n  }\n'], ['\n  display: flex;\n  > div {\n    width: 50%;\n    flex: 1 1 100%;\n  }\n']),
    _templateObject3 = _taggedTemplateLiteralLoose(['\n  height:100%;\n  .oc-scrollbar-container {\n    border: 1px solid ', ';\n    height: calc(100% - ', ');\n    padding: ', ';\n  }\n  .oc-react-tree {\n    height: 100%;\n    .rc-tree-iconEle.rc-tree-icon__customize {\n        display:none;\n    }\n  }\n'], ['\n  height:100%;\n  .oc-scrollbar-container {\n    border: 1px solid ', ';\n    height: calc(100% - ', ');\n    padding: ', ';\n  }\n  .oc-react-tree {\n    height: 100%;\n    .rc-tree-iconEle.rc-tree-icon__customize {\n        display:none;\n    }\n  }\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTreeview = require('@opuscapita/react-treeview');

var _reactTreeview2 = _interopRequireDefault(_reactTreeview);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _immutable = require('immutable');

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _reactGrid = require('@opuscapita/react-grid');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _reactPerfectScrollbar = require('@opuscapita/react-perfect-scrollbar');

var _reactPerfectScrollbar2 = _interopRequireDefault(_reactPerfectScrollbar);

var _ocCmCommonLayouts = require('@opuscapita/oc-cm-common-layouts');

var _hierarchyTreeSelectorControlBar = require('./hierarchy-tree-selector-control-bar.component');

var _hierarchyTreeSelectorControlBar2 = _interopRequireDefault(_hierarchyTreeSelectorControlBar);

var _hierarchyTreeSelectorArrowControls = require('./hierarchy-tree-selector-arrow-controls.component');

var _hierarchyTreeSelectorArrowControls2 = _interopRequireDefault(_hierarchyTreeSelectorArrowControls);

var _hierarchyTree = require('./hierarchy-tree.utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }
// App imports


var ACTION_BAR_CONTAINER_HEIGHT = '57px';
var TREE_ACTIONS = {
  ADD_CHILDREN: 'ADD_CHILDREN',
  MOVE_LEAF: 'MOVE_LEAF',
  RENAME_PARENT: 'RENAME_PARENT',
  DELETE_PARENT: 'DELETE_PARENT'
};

var Grid = (0, _styledComponents2.default)(_reactGrid.Datagrid)(_templateObject, function (props) {
  return props.theme.colors.colorLightGray;
});

var Container = _styledComponents2.default.div(_templateObject2);

var TreeContainer = _styledComponents2.default.div(_templateObject3, function (props) {
  return props.theme.colors.colorLightGray;
}, ACTION_BAR_CONTAINER_HEIGHT, function (props) {
  return props.theme.gutterWidth;
});

var mapDispatchToProps = {
  setData: _reactGrid.DatagridActions.setData
};

var mapStateToProps = function mapStateToProps(state, props) {
  var gridId = props.grid.id;
  return {
    selectedGridItems: state.datagrid.getIn([gridId, 'selectedItems'], (0, _immutable.List)()),
    gridData: state.datagrid.getIn([gridId, 'allData'], (0, _immutable.List)())
  };
};

var HierarchyTreeSelector = (_dec = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), _dec(_class = (_temp = _class2 = function (_React$PureComponent) {
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
      var newGridItems = (0, _immutable.fromJS)([_this.getTreeItem(_this.state.selectedKeys[0])]);
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
            _this.setDataToGrid((0, _immutable.fromJS)(_this.getAllLeafs(rootItem[childKey])));
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
              _this.setDataToGrid((0, _immutable.fromJS)(_this.getAllLeafs(filteredChildren)));
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

      var data = (0, _immutable.List)();
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
    var mergedTranslations = Object.assign({}, _hierarchyTree.defaultTranslations, translations);

    return _react2.default.createElement(
      Container,
      { className: className },
      _react2.default.createElement(
        TreeContainer,
        null,
        _react2.default.createElement(_hierarchyTreeSelectorControlBar2.default, _extends({}, this.props, {
          onAddNewClick: this.onAddNewClick,
          onDeleteClick: this.onDeleteClick,
          onInputChange: this.onInputChange,
          selectedTreeItem: this.getTreeItem(this.state.selectedKeys[0]),
          height: ACTION_BAR_CONTAINER_HEIGHT,
          translations: mergedTranslations
        })),
        _react2.default.createElement(
          _reactPerfectScrollbar2.default,
          null,
          _react2.default.createElement(_reactTreeview2.default, {
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
      _react2.default.createElement(_hierarchyTreeSelectorArrowControls2.default, _extends({}, this.props, {
        selectedTreeItem: this.getTreeItem(this.state.selectedKeys[0]),
        onMoveToTreeClick: this.onMoveToTreeClick,
        onMoveToGridClick: this.onMoveToGridClick
      })),
      _react2.default.createElement(Grid, {
        grid: mergedGrid,
        columns: gridColumns,
        rowSelect: true,
        multiSelect: true,
        filtering: true,
        gridHeader: _react2.default.createElement(
          _ocCmCommonLayouts.Primitive.Subtitle,
          null,
          mergedTranslations.gridTitle
        )
      })
    );
  };

  return HierarchyTreeSelector;
}(_react2.default.PureComponent), _class2.defaultProps = {
  idKey: 'id',
  valueKey: 'name',
  childKey: 'children',
  treeData: [],
  className: '',
  translations: _hierarchyTree.defaultTranslations,
  id: 'hierarchy-tree',
  onDragDropPrevent: undefined
}, _temp)) || _class);
exports.default = HierarchyTreeSelector;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIkFDVElPTl9CQVJfQ09OVEFJTkVSX0hFSUdIVCIsIlRSRUVfQUNUSU9OUyIsIkFERF9DSElMRFJFTiIsIk1PVkVfTEVBRiIsIlJFTkFNRV9QQVJFTlQiLCJERUxFVEVfUEFSRU5UIiwiR3JpZCIsIkRhdGFncmlkIiwicHJvcHMiLCJ0aGVtZSIsImNvbG9ycyIsImNvbG9yTGlnaHRHcmF5IiwiQ29udGFpbmVyIiwic3R5bGVkIiwiZGl2IiwiVHJlZUNvbnRhaW5lciIsImd1dHRlcldpZHRoIiwibWFwRGlzcGF0Y2hUb1Byb3BzIiwic2V0RGF0YSIsIkRhdGFncmlkQWN0aW9ucyIsIm1hcFN0YXRlVG9Qcm9wcyIsInN0YXRlIiwiZ3JpZElkIiwiZ3JpZCIsImlkIiwic2VsZWN0ZWRHcmlkSXRlbXMiLCJkYXRhZ3JpZCIsImdldEluIiwiZ3JpZERhdGEiLCJIaWVyYXJjaHlUcmVlU2VsZWN0b3IiLCJvblRyZWVJdGVtU2VsZWN0Iiwic2VsZWN0ZWRLZXlzIiwic2V0U3RhdGUiLCJvblRyZWVJdGVtRHJhZ0Ryb3AiLCJpdGVtcyIsIm9uQ2hhbmdlIiwib25EZWxldGVDbGljayIsInRyZWVEYXRhIiwiYWN0aW9uIiwidHlwZSIsIm5ld0l0ZW1zIiwiZ2V0VXBkYXRlZFRyZWUiLCJvbkFkZE5ld0NsaWNrIiwiZGF0YSIsImNhbGxiYWNrIiwiaWRLZXkiLCJzbGljZSIsInB1c2giLCJvbk1vdmVUb0dyaWRDbGljayIsIm5ld0dyaWRJdGVtcyIsImdldFRyZWVJdGVtIiwic2V0RGF0YVRvR3JpZCIsIm9uTW92ZVRvVHJlZUNsaWNrIiwiZmlsdGVyIiwiaW5jbHVkZXMiLCJpIiwiZ2V0IiwidG9KUyIsIml0ZW0iLCJvbklucHV0Q2hhbmdlIiwidmFsdWUiLCJhcnJheSIsImZvdW5kIiwiY2hpbGRLZXkiLCJ2YWx1ZUtleSIsInJlbW92ZUFjdGlvbnMiLCJyb290SXRlbSIsImZpbmQiLCJsZW5ndGgiLCJnZXRBbGxMZWFmcyIsImRlc2VsZWN0SXRlbSIsImNoaWxkIiwiZmlsdGVyZWRDaGlsZHJlbiIsImNoaWxkSXRlbSIsImNvbmNhdCIsIlR5cGVFcnJvciIsImFscmVhZHlGb3VuZCIsImxlYWZzIiwicmV0dXJuUGFyZW50IiwicGFyZW50IiwiZm9yRWFjaCIsInNldE5ld0l0ZW1zIiwiZ3JpZENvbHVtbnMiLCJpc0RyYWdEcm9wTGVnYWwiLCJlIiwib25EcmFnRHJvcFByZXZlbnQiLCJkcm9wSXRlbSIsIm5vZGUiLCJldmVudEtleSIsImRyYWdJdGVtIiwiZHJhZ05vZGUiLCJkcm9wSXRlbVBhcmVudCIsImRyb3BUb0dhcCIsImhhc0xlYWZzIiwiaGFzUGFyZW50cyIsInJlbmRlciIsImNsYXNzTmFtZSIsInRyYW5zbGF0aW9ucyIsIm1lcmdlZEdyaWQiLCJPYmplY3QiLCJhc3NpZ24iLCJkZWZhdWx0U2hvd0ZpbHRlcmluZ1JvdyIsIm1lcmdlZFRyYW5zbGF0aW9ucyIsImRlZmF1bHRUcmFuc2xhdGlvbnMiLCJncmlkVGl0bGUiLCJSZWFjdCIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiLCJ1bmRlZmluZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7O0FBSEE7OztBQUtBLElBQU1BLDhCQUE4QixNQUFwQztBQUNBLElBQU1DLGVBQWU7QUFDbkJDLGdCQUFjLGNBREs7QUFFbkJDLGFBQVcsV0FGUTtBQUduQkMsaUJBQWUsZUFISTtBQUluQkMsaUJBQWU7QUFKSSxDQUFyQjs7QUFPQSxJQUFNQyxPQUFPLGdDQUFPQyxtQkFBUCxDQUFQLGtCQUlrQjtBQUFBLFNBQVNDLE1BQU1DLEtBQU4sQ0FBWUMsTUFBWixDQUFtQkMsY0FBNUI7QUFBQSxDQUpsQixDQUFOOztB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LFVBRFI7QUFFRSxpQkFBU2hCLFdBRlg7QUFHRSx1QkFIRjtBQUlFLHlCQUpGO0FBS0UsdUJBTEY7QUFNRSxvQkFBWTtBQUFDLHNDQUFELENBQVcsUUFBWDtBQUFBO0FBQXFCb0IsNkJBQW1CRTtBQUF4QztBQU5kO0FBakNGLEtBREY7QUE0Q0QsRzs7O0VBdlhnREMsZ0JBQU1DLGEsV0FrQmhEQyxZLEdBQWU7QUFDcEI5RCxTQUFPLElBRGE7QUFFcEJtQixZQUFVLE1BRlU7QUFHcEJELFlBQVUsVUFIVTtBQUlwQjFCLFlBQVUsRUFKVTtBQUtwQjJELGFBQVcsRUFMUztBQU1wQkMsZ0JBQWNNLGtDQU5NO0FBT3BCL0UsTUFBSSxnQkFQZ0I7QUFRcEI2RCxxQkFBbUJ1QjtBQVJDLEM7a0JBbEJIL0UscUIiLCJmaWxlIjoiaGllcmFyY2h5LXRyZWUtc2VsZWN0b3IuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBUcmVlQ29tcG9uZW50IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LXRyZWV2aWV3JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHsgTGlzdCwgZnJvbUpTIH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCBJbW11dGFibGVQcm9wVHlwZXMgZnJvbSAncmVhY3QtaW1tdXRhYmxlLXByb3B0eXBlcyc7XG5pbXBvcnQgeyBEYXRhZ3JpZCwgZ3JpZFNoYXBlLCBncmlkQ29sdW1uU2hhcGUsIERhdGFncmlkQWN0aW9ucyB9IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWdyaWQnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgUGVyZmVjdFNjcm9sbGJhciBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1wZXJmZWN0LXNjcm9sbGJhcic7XG5pbXBvcnQgeyBQcmltaXRpdmUgfSBmcm9tICdAb3B1c2NhcGl0YS9vYy1jbS1jb21tb24tbGF5b3V0cyc7XG4vLyBBcHAgaW1wb3J0c1xuaW1wb3J0IENvbnRyb2xCYXIgZnJvbSAnLi9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci1jb250cm9sLWJhci5jb21wb25lbnQnO1xuaW1wb3J0IEFycm93Q29udHJvbHMgZnJvbSAnLi9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci1hcnJvdy1jb250cm9scy5jb21wb25lbnQnO1xuaW1wb3J0IHsgZGVmYXVsdFRyYW5zbGF0aW9ucyB9IGZyb20gJy4vaGllcmFyY2h5LXRyZWUudXRpbHMnO1xuXG5jb25zdCBBQ1RJT05fQkFSX0NPTlRBSU5FUl9IRUlHSFQgPSAnNTdweCc7XG5jb25zdCBUUkVFX0FDVElPTlMgPSB7XG4gIEFERF9DSElMRFJFTjogJ0FERF9DSElMRFJFTicsXG4gIE1PVkVfTEVBRjogJ01PVkVfTEVBRicsXG4gIFJFTkFNRV9QQVJFTlQ6ICdSRU5BTUVfUEFSRU5UJyxcbiAgREVMRVRFX1BBUkVOVDogJ0RFTEVURV9QQVJFTlQnLFxufTtcblxuY29uc3QgR3JpZCA9IHN0eWxlZChEYXRhZ3JpZClgXG4gIGhlaWdodDogMTAwJTtcbiAgcGFkZGluZzogMDtcbiAgLm9jLWRhdGFncmlkLW1haW4tY29udGFpbmVyIHtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAke3Byb3BzID0+IHByb3BzLnRoZW1lLmNvbG9ycy5jb2xvckxpZ2h0R3JheX07XG4gICAgYm9yZGVyLXRvcDpub25lO1xuICB9XG5gO1xuXG5jb25zdCBDb250YWluZXIgPSBzdHlsZWQuZGl2YFxuICBkaXNwbGF5OiBmbGV4O1xuICA+IGRpdiB7XG4gICAgd2lkdGg6IDUwJTtcbiAgICBmbGV4OiAxIDEgMTAwJTtcbiAgfVxuYDtcblxuY29uc3QgVHJlZUNvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gIGhlaWdodDoxMDAlO1xuICAub2Mtc2Nyb2xsYmFyLWNvbnRhaW5lciB7XG4gICAgYm9yZGVyOiAxcHggc29saWQgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5jb2xvcnMuY29sb3JMaWdodEdyYXl9O1xuICAgIGhlaWdodDogY2FsYygxMDAlIC0gJHtBQ1RJT05fQkFSX0NPTlRBSU5FUl9IRUlHSFR9KTtcbiAgICBwYWRkaW5nOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmd1dHRlcldpZHRofTtcbiAgfVxuICAub2MtcmVhY3QtdHJlZSB7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIC5yYy10cmVlLWljb25FbGUucmMtdHJlZS1pY29uX19jdXN0b21pemUge1xuICAgICAgICBkaXNwbGF5Om5vbmU7XG4gICAgfVxuICB9XG5gO1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSB7XG4gIHNldERhdGE6IERhdGFncmlkQWN0aW9ucy5zZXREYXRhLFxufTtcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlLCBwcm9wcykgPT4ge1xuICBjb25zdCBncmlkSWQgPSBwcm9wcy5ncmlkLmlkO1xuICByZXR1cm4ge1xuICAgIHNlbGVjdGVkR3JpZEl0ZW1zOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbZ3JpZElkLCAnc2VsZWN0ZWRJdGVtcyddLCBMaXN0KCkpLFxuICAgIGdyaWREYXRhOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbZ3JpZElkLCAnYWxsRGF0YSddLCBMaXN0KCkpLFxuICB9O1xufTtcblxuQGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIaWVyYXJjaHlUcmVlU2VsZWN0b3IgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBpZEtleTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB2YWx1ZUtleTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjaGlsZEtleTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB0cmVlRGF0YTogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnNoYXBlKHt9KSksXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgZ3JpZDogZ3JpZFNoYXBlLmlzUmVxdWlyZWQsXG4gICAgZ3JpZENvbHVtbnM6IFByb3BUeXBlcy5hcnJheU9mKGdyaWRDb2x1bW5TaGFwZSkuaXNSZXF1aXJlZCxcbiAgICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgc2V0RGF0YTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBzZWxlY3RlZEdyaWRJdGVtczogSW1tdXRhYmxlUHJvcFR5cGVzLmxpc3QuaXNSZXF1aXJlZCxcbiAgICBncmlkRGF0YTogSW1tdXRhYmxlUHJvcFR5cGVzLmxpc3QuaXNSZXF1aXJlZCxcbiAgICB0cmFuc2xhdGlvbnM6IFByb3BUeXBlcy5zaGFwZSh7fSksXG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgb25EcmFnRHJvcFByZXZlbnQ6IFByb3BUeXBlcy5mdW5jLFxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgaWRLZXk6ICdpZCcsXG4gICAgdmFsdWVLZXk6ICduYW1lJyxcbiAgICBjaGlsZEtleTogJ2NoaWxkcmVuJyxcbiAgICB0cmVlRGF0YTogW10sXG4gICAgY2xhc3NOYW1lOiAnJyxcbiAgICB0cmFuc2xhdGlvbnM6IGRlZmF1bHRUcmFuc2xhdGlvbnMsXG4gICAgaWQ6ICdoaWVyYXJjaHktdHJlZScsXG4gICAgb25EcmFnRHJvcFByZXZlbnQ6IHVuZGVmaW5lZCxcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgc2VsZWN0ZWRLZXlzOiBbXSxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdHMgYSB0cmVlIGl0ZW1cbiAgICogQHBhcmFtIHNlbGVjdGVkS2V5cyAoYXJyYXkpXG4gICAqL1xuICBvblRyZWVJdGVtU2VsZWN0ID0gKHNlbGVjdGVkS2V5cykgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZEtleXMgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEZpcmVkIG9uIGRyYWcgbicgZHJvcFxuICAgKiBAcGFyYW0gaXRlbXNcbiAgICovXG4gIG9uVHJlZUl0ZW1EcmFnRHJvcCA9IChpdGVtcykgPT4ge1xuICAgIGNvbnN0IHsgb25DaGFuZ2UgfSA9IHRoaXMucHJvcHM7XG4gICAgb25DaGFuZ2UoaXRlbXMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBEZWxldGVzIGEgcGFyZW50IG5vZGVcbiAgICovXG4gIG9uRGVsZXRlQ2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBvbkNoYW5nZSwgdHJlZURhdGEgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgYWN0aW9uID0ge1xuICAgICAgdHlwZTogVFJFRV9BQ1RJT05TLkRFTEVURV9QQVJFTlQsXG4gICAgfTtcbiAgICBjb25zdCBuZXdJdGVtcyA9IHRoaXMuZ2V0VXBkYXRlZFRyZWUodGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF0sIHRyZWVEYXRhLCBhY3Rpb24pO1xuICAgIG9uQ2hhbmdlKG5ld0l0ZW1zKTtcbiAgfTtcblxuICAvKipcbiAgICogQWRkcyBhIG5ldyBub2RlIHRvIHRoZSByb290IG9mIHRoZSB0cmVlLCBvciB1bmRlciBhIHNlbGVjdGVkIHRyZWUgbm9kZSB1c2luZ1xuICAgKiBBRERfQ0hJTERSRU4gYWN0aW9uXG4gICAqIEBwYXJhbSBkYXRhXG4gICAqL1xuICBvbkFkZE5ld0NsaWNrID0gKGRhdGEsIGNhbGxiYWNrKSA9PiB7XG4gICAgY29uc3QgeyBvbkNoYW5nZSwgdHJlZURhdGEsIGlkS2V5IH0gPSB0aGlzLnByb3BzO1xuICAgIGxldCBuZXdJdGVtcyA9IHRyZWVEYXRhLnNsaWNlKCk7XG5cbiAgICAvLyBJZiBubyB0cmVlIG5vZGUgaXMgc2VsZWN0ZWQsIHdlJ2xsIHBsYWNlIHRoZSBuZXcgaXRlbSB0byB0aGUgcm9vdFxuICAgIC8vIG9mIHRoZSB0cmVlXG4gICAgaWYgKCF0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXSkge1xuICAgICAgbmV3SXRlbXMucHVzaChkYXRhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgYWN0aW9uID0ge1xuICAgICAgICB0eXBlOiBUUkVFX0FDVElPTlMuQUREX0NISUxEUkVOLFxuICAgICAgICBkYXRhLFxuICAgICAgfTtcbiAgICAgIG5ld0l0ZW1zID0gdGhpcy5nZXRVcGRhdGVkVHJlZSh0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXSwgdHJlZURhdGEsIGFjdGlvbik7XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZEtleXM6IFtkYXRhW2lkS2V5XV0gfSwgKCkgPT4ge1xuICAgICAgb25DaGFuZ2UobmV3SXRlbXMpO1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogUmVtb3ZlcyB0aGUgY2hvc2VuIGl0ZW0gZnJvbSBhIHRyZWUgYW5kIHVwZGF0ZXMgdGhlIGdyaWQgdXNpbmcgTU9WRV9MRUFGXG4gICAqIGFjdGlvblxuICAgKi9cbiAgb25Nb3ZlVG9HcmlkQ2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3QgeyB0cmVlRGF0YSwgb25DaGFuZ2UgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgYWN0aW9uID0ge1xuICAgICAgdHlwZTogVFJFRV9BQ1RJT05TLk1PVkVfTEVBRixcbiAgICAgIGRhdGE6IHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdLFxuICAgIH07XG4gICAgY29uc3QgbmV3R3JpZEl0ZW1zID0gZnJvbUpTKFt0aGlzLmdldFRyZWVJdGVtKHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdKV0pO1xuICAgIGNvbnN0IG5ld0l0ZW1zID0gdGhpcy5nZXRVcGRhdGVkVHJlZSh0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXSwgdHJlZURhdGEsIGFjdGlvbik7XG5cbiAgICB0aGlzLnNldERhdGFUb0dyaWQobmV3R3JpZEl0ZW1zKTtcbiAgICBvbkNoYW5nZShuZXdJdGVtcyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEFkZHMgc2VsZWN0ZWQgZ3JpZCBpdGVtcyB0byB0aGUgY2hvc2VuIHRyZWUgbm9kZSB1c2luZyBBRERfQ0hJTERSRU4gYWN0aW9uXG4gICAqL1xuICBvbk1vdmVUb1RyZWVDbGljayA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBvbkNoYW5nZSwgc2VsZWN0ZWRHcmlkSXRlbXMsIGdyaWREYXRhLCB0cmVlRGF0YSxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IGFjdGlvbiA9IHtcbiAgICAgIHR5cGU6IFRSRUVfQUNUSU9OUy5BRERfQ0hJTERSRU4sXG4gICAgICBkYXRhOiBncmlkRGF0YVxuICAgICAgICAuZmlsdGVyKGkgPT4gc2VsZWN0ZWRHcmlkSXRlbXMuaW5jbHVkZXMoaS5nZXQoJ2lkJykpKVxuICAgICAgICAudG9KUygpLFxuICAgIH07XG4gICAgY29uc3QgbmV3SXRlbXMgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdLCB0cmVlRGF0YSwgYWN0aW9uKTtcbiAgICBjb25zdCBuZXdHcmlkSXRlbXMgPSBncmlkRGF0YS5maWx0ZXIoaXRlbSA9PiAhc2VsZWN0ZWRHcmlkSXRlbXMuaW5jbHVkZXMoaXRlbS5nZXQoJ2lkJykpKTtcblxuICAgIHRoaXMuc2V0RGF0YVRvR3JpZChuZXdHcmlkSXRlbXMsIHRydWUpO1xuICAgIG9uQ2hhbmdlKG5ld0l0ZW1zKTtcbiAgfTtcblxuICAvKipcbiAgICogUmVuYW1lcyB0aGUgY2hvc2VuIHRyZWUgbm9kZSB1c2luZyBhIFJFTkFNRV9QQVJFTlQgYWN0aW9uXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKi9cbiAgb25JbnB1dENoYW5nZSA9ICh2YWx1ZSkgPT4ge1xuICAgIGNvbnN0IHsgdHJlZURhdGEsIG9uQ2hhbmdlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGFjdGlvbiA9IHtcbiAgICAgIHR5cGU6IFRSRUVfQUNUSU9OUy5SRU5BTUVfUEFSRU5ULFxuICAgICAgZGF0YTogdmFsdWUsXG4gICAgfTtcbiAgICBjb25zdCBuZXdJdGVtcyA9IHRoaXMuZ2V0VXBkYXRlZFRyZWUodGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF0sIHRyZWVEYXRhLCBhY3Rpb24pO1xuICAgIG9uQ2hhbmdlKG5ld0l0ZW1zKTtcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyB1cGRhdGVkIHRyZWUgaXRlbXMuXG4gICAqIEBwYXJhbSBpZCAtIHRhcmdldCBpdGVtXG4gICAqIEBwYXJhbSBhcnJheSAtIGFycmF5IHdoZXJlIHRhcmdldCBpdGVtIGlzIGJlaW5nIHNlYXJjaGVkXG4gICAqIEBwYXJhbSBhY3Rpb24gLSBhY3Rpb24gdG8gYmUgcGVyZm9ybWVkIHt0eXBlLCBkYXRhfVxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIGdldFVwZGF0ZWRUcmVlID0gKGlkLCBhcnJheSA9IHRoaXMucHJvcHMudHJlZURhdGEsIGFjdGlvbikgPT4ge1xuICAgIGxldCBmb3VuZCA9IGZhbHNlO1xuICAgIGNvbnN0IHsgaWRLZXksIGNoaWxkS2V5LCB2YWx1ZUtleSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBuZXdJdGVtcyA9IGFycmF5LnNsaWNlKCk7XG4gICAgY29uc3QgcmVtb3ZlQWN0aW9ucyA9IFtUUkVFX0FDVElPTlMuTU9WRV9MRUFGLCBUUkVFX0FDVElPTlMuREVMRVRFX1BBUkVOVF07XG5cbiAgICAvLyBJZiBkZWxldGVkIHBhcmVudCBpdGVtIGlzIGluIHRoZSByb290IG5vZGVcbiAgICBpZiAoYWN0aW9uLnR5cGUgPT09IFRSRUVfQUNUSU9OUy5ERUxFVEVfUEFSRU5UKSB7XG4gICAgICBjb25zdCByb290SXRlbSA9IGFycmF5LmZpbmQoaXRlbSA9PiBpdGVtW2lkS2V5XSA9PT0gaWQpO1xuICAgICAgaWYgKHJvb3RJdGVtKSB7XG4gICAgICAgIGlmIChyb290SXRlbVtjaGlsZEtleV0ubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5zZXREYXRhVG9HcmlkKGZyb21KUyh0aGlzLmdldEFsbExlYWZzKHJvb3RJdGVtW2NoaWxkS2V5XSkpKTtcbiAgICAgICAgICB0aGlzLmRlc2VsZWN0SXRlbSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXdJdGVtcy5maWx0ZXIoaXRlbSA9PiBpdGVtW2lkS2V5XSAhPT0gaWQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmV3SXRlbXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSBuZXdJdGVtc1tpXTtcbiAgICAgIGlmIChyZW1vdmVBY3Rpb25zLmluY2x1ZGVzKGFjdGlvbi50eXBlKSAmJiBpdGVtW2NoaWxkS2V5XSAmJiAhZm91bmQpIHtcbiAgICAgICAgZm91bmQgPSAhIWl0ZW1bY2hpbGRLZXldLmZpbmQoY2hpbGQgPT4gY2hpbGRbaWRLZXldID09PSBpZCk7XG4gICAgICAgIGlmIChmb3VuZCkge1xuICAgICAgICAgIC8vIFdoZW4gcmVtb3ZpbmcgYW4gaXRlbSB3ZSBtdXN0IGZpcnN0IGZpbmQgaXRzIHBhcmVudCBhbmQgYWx0ZXIgaXRzIGNoaWxkcmVuIGFycmF5XG4gICAgICAgICAgaWYgKGFjdGlvbi50eXBlID09PSBUUkVFX0FDVElPTlMuTU9WRV9MRUFGKSB7XG4gICAgICAgICAgICBpdGVtW2NoaWxkS2V5XSA9IGl0ZW1bY2hpbGRLZXldLmZpbHRlcihjaGlsZCA9PiBjaGlsZFtpZEtleV0gIT09IGlkKTtcbiAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RJdGVtKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChhY3Rpb24udHlwZSA9PT0gVFJFRV9BQ1RJT05TLkRFTEVURV9QQVJFTlQpIHtcbiAgICAgICAgICAgIC8vIHdlIG11c3QgZmlyc3QgZmlsdGVyIHRoZSBjaGlsZHJlbiwgc28gdGhhdCB3ZSB3b24ndCBnZXQgbGVhZnMgZnJvbVxuICAgICAgICAgICAgLy8gb3RoZXIgY2hpbGQgYnJhbmNoZXNcbiAgICAgICAgICAgIGNvbnN0IGZpbHRlcmVkQ2hpbGRyZW4gPSBpdGVtW2NoaWxkS2V5XS5maWx0ZXIoY2hpbGRJdGVtID0+IGNoaWxkSXRlbVtpZEtleV0gPT09IGlkKTtcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YVRvR3JpZChmcm9tSlModGhpcy5nZXRBbGxMZWFmcyhmaWx0ZXJlZENoaWxkcmVuKSkpO1xuICAgICAgICAgICAgdGhpcy5kZXNlbGVjdEl0ZW0oKTtcbiAgICAgICAgICAgIGl0ZW1bY2hpbGRLZXldID0gaXRlbVtjaGlsZEtleV0uZmlsdGVyKGNoaWxkSXRlbSA9PiBjaGlsZEl0ZW1baWRLZXldICE9PSBpZCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtW2lkS2V5XSA9PT0gaWQgJiYgIWZvdW5kKSB7XG4gICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICAgIGNhc2UgVFJFRV9BQ1RJT05TLkFERF9DSElMRFJFTjpcbiAgICAgICAgICAgIGl0ZW1bY2hpbGRLZXldID0gKGl0ZW1bY2hpbGRLZXldIHx8IFtdKS5jb25jYXQoYWN0aW9uLmRhdGEpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBUUkVFX0FDVElPTlMuUkVOQU1FX1BBUkVOVDpcbiAgICAgICAgICAgIGl0ZW1bdmFsdWVLZXldID0gYWN0aW9uLmRhdGE7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQWN0aW9uIHR5cGUgaXMgdW5kZWZpbmVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVtjaGlsZEtleV0gJiYgIWZvdW5kKSBmb3VuZCA9IHRoaXMuZ2V0VXBkYXRlZFRyZWUoaWQsIGl0ZW1bY2hpbGRLZXldLCBhY3Rpb24pO1xuICAgIH1cblxuICAgIGlmICghZm91bmQpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gbmV3SXRlbXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybnMgcmVjdXJzaXZlbHkgYWxsIGxlYWYgaXRlbXMgZnJvbSBhIGdpdmVuIGFycmF5XG4gICAqIEBwYXJhbSBhcnJheVxuICAgKiBAcGFyYW0gYWxyZWFkeUZvdW5kICh1c2VkIHJlY3Vyc2l2ZWx5KVxuICAgKi9cbiAgZ2V0QWxsTGVhZnMgPSAoYXJyYXksIGFscmVhZHlGb3VuZCA9IFtdKSA9PiB7XG4gICAgY29uc3QgeyBjaGlsZEtleSB9ID0gdGhpcy5wcm9wcztcbiAgICBsZXQgbGVhZnMgPSBhbHJlYWR5Rm91bmQ7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBpdGVtID0gYXJyYXlbaV07XG4gICAgICBpZiAoaXRlbVtjaGlsZEtleV0pIHtcbiAgICAgICAgbGVhZnMgPSB0aGlzLmdldEFsbExlYWZzKGl0ZW1bY2hpbGRLZXldLCBhbHJlYWR5Rm91bmQpO1xuICAgICAgfVxuICAgICAgaWYgKCFpdGVtW2NoaWxkS2V5XSkgbGVhZnMucHVzaChpdGVtKTtcbiAgICB9XG4gICAgcmV0dXJuIGxlYWZzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgdHJlZSBpdGVtIGJ5IElEXG4gICAqIEBwYXJhbSBpZFxuICAgKiBAcGFyYW0gYXJyYXlcbiAgICogQHBhcmFtIHJldHVyblBhcmVudCAtIHJldHVybiBpdGVtJ3MgcGFyZW50IGluc3RlYWQgb2YgdGhlIGl0ZW1cbiAgICogQHBhcmFtIHBhcmVudCAtIHBhcmVudCBpdGVtICh1c2VkIHJlY3Vyc2l2ZWx5KVxuICAgKiBAcmV0dXJucyB7e319XG4gICAqL1xuICBnZXRUcmVlSXRlbSA9IChpZCwgYXJyYXkgPSB0aGlzLnByb3BzLnRyZWVEYXRhLCByZXR1cm5QYXJlbnQgPSBmYWxzZSwgcGFyZW50ID0gbnVsbCkgPT4ge1xuICAgIGNvbnN0IHsgY2hpbGRLZXksIGlkS2V5IH0gPSB0aGlzLnByb3BzO1xuICAgIGxldCBmb3VuZCA9IGFycmF5LmZpbmQoaXRlbSA9PiBpdGVtW2lkS2V5XSA9PT0gaWQpO1xuXG4gICAgaWYgKGZvdW5kICYmIHJldHVyblBhcmVudCkgZm91bmQgPSBwYXJlbnQ7XG5cbiAgICBpZiAoIWZvdW5kKSB7XG4gICAgICBhcnJheS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGlmIChpdGVtW2NoaWxkS2V5XSAmJiAhZm91bmQpIHtcbiAgICAgICAgICBmb3VuZCA9IHRoaXMuZ2V0VHJlZUl0ZW0oaWQsIGl0ZW1bY2hpbGRLZXldLCByZXR1cm5QYXJlbnQsIGl0ZW0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGZvdW5kO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBcHBlbmRzIHByb3ZpZGVkIGl0ZW1zIHRvIHRoZSBncmlkXG4gICAqIEBwYXJhbSBpdGVtcyAtIGltbXV0YWJsZSBhcnJheSBvZiBpdGVtcyB0byBiZSBhcHBlbmRlZCB0byBncmlkXG4gICAqIEBwYXJhbSBzZXROZXdJdGVtcyAtIHNldCBjb21wbGV0ZWx5IGEgbmV3IGFycmF5IG9mIGl0ZW1zXG4gICAqL1xuICBzZXREYXRhVG9HcmlkID0gKGl0ZW1zLCBzZXROZXdJdGVtcyA9IGZhbHNlKSA9PiB7XG4gICAgbGV0IGRhdGEgPSBMaXN0KCk7XG4gICAgY29uc3QgeyBncmlkLCBncmlkQ29sdW1ucywgZ3JpZERhdGEgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFzZXROZXdJdGVtcykgZGF0YSA9IGdyaWREYXRhLnNsaWNlKCk7XG4gICAgY29uc3QgbmV3R3JpZEl0ZW1zID0gZGF0YS5jb25jYXQoaXRlbXMpO1xuICAgIHRoaXMucHJvcHMuc2V0RGF0YShncmlkLCBncmlkQ29sdW1ucywgbmV3R3JpZEl0ZW1zKTtcbiAgfTtcblxuICBpc0RyYWdEcm9wTGVnYWwgPSAoaXRlbXMsIGUpID0+IHtcbiAgICBjb25zdCB7IGNoaWxkS2V5LCB0cmVlRGF0YSwgb25EcmFnRHJvcFByZXZlbnQgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgZHJvcEl0ZW0gPSB0aGlzLmdldFRyZWVJdGVtKGUubm9kZS5wcm9wcy5ldmVudEtleSk7XG4gICAgY29uc3QgZHJhZ0l0ZW0gPSB0aGlzLmdldFRyZWVJdGVtKGUuZHJhZ05vZGUucHJvcHMuZXZlbnRLZXkpO1xuICAgIGNvbnN0IGRyb3BJdGVtUGFyZW50ID0gdGhpcy5nZXRUcmVlSXRlbShlLm5vZGUucHJvcHMuZXZlbnRLZXksIHRyZWVEYXRhLCB0cnVlKTtcblxuICAgIC8qKlxuICAgICAqIFdlIHdhbnQgdG8gcHJldmVudCB0aGUgbW92ZSwgaWY6XG4gICAgICogLSBTZWxlY3RlZCBpdGVtIGlzIGEgcGFyZW50LCBhbmQgLi5cbiAgICAgKiAgICAtIERyb3BwaW5nIG92ZXIgYW4gaXRlbSwgYW5kIC4uXG4gICAgICogICAgICAtIE5ldyBwYXJlbnQgaGFzIGxlYWZzIE9SIG5ldyBwYXJlbnQgaXMgYSBsZWFmXG4gICAgICogICAgLSBEcm9wcGluZyBiZXR3ZWVuIGl0ZW1zLCBhbmQgLi5cbiAgICAgKiAgICAgICAgLSBOZXcgcGFyZW50J3MgcGFyZW50IGhhcyBsZWFmc1xuICAgICAqICAtIFNlbGVjdGVkIGl0ZW0gaXMgYSBsZWFmLCBhbmQgLi4uXG4gICAgICovXG4gICAgaWYgKGRyYWdJdGVtW2NoaWxkS2V5XSkge1xuICAgICAgaWYgKFxuICAgICAgICAoIWUuZHJvcFRvR2FwICYmICh0aGlzLmhhc0xlYWZzKGRyb3BJdGVtKSB8fCAhZHJvcEl0ZW1bY2hpbGRLZXldKSkgfHxcbiAgICAgICAgKGRyb3BJdGVtUGFyZW50ICYmIGUuZHJvcFRvR2FwICYmICh0aGlzLmhhc0xlYWZzKGRyb3BJdGVtUGFyZW50KSkpXG4gICAgICApIHtcbiAgICAgICAgaWYgKG9uRHJhZ0Ryb3BQcmV2ZW50KSBvbkRyYWdEcm9wUHJldmVudCgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIChkcm9wSXRlbSAmJiAhZS5kcm9wVG9HYXAgJiYgdGhpcy5oYXNQYXJlbnRzKGRyb3BJdGVtKSkgfHxcbiAgICAgIChkcm9wSXRlbVBhcmVudCAmJiBlLmRyb3BUb0dhcCAmJiB0aGlzLmhhc1BhcmVudHMoZHJvcEl0ZW1QYXJlbnQpKSB8fFxuICAgICAgKGUuZHJvcFRvR2FwICYmICFkcm9wSXRlbVBhcmVudCkgfHxcbiAgICAgICghZS5kcm9wVG9HYXAgJiYgIWRyb3BJdGVtW2NoaWxkS2V5XSlcbiAgICApIHtcbiAgICAgIC8vIEl0ZW0gaGFzIGdvdCBwYXJlbnQgYXMgYSBjaGlsZCAtIGxlYWYgY2Fubm90IGJlIGRyb3BwZWQgaGVyZVxuICAgICAgaWYgKG9uRHJhZ0Ryb3BQcmV2ZW50KSBvbkRyYWdEcm9wUHJldmVudCgpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuXG4gIGhhc0xlYWZzID0gKGl0ZW0pID0+IHtcbiAgICBjb25zdCB7IGNoaWxkS2V5IH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghaXRlbVtjaGlsZEtleV0pIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gISFpdGVtW2NoaWxkS2V5XS5maW5kKGNoaWxkID0+ICFjaGlsZFtjaGlsZEtleV0pO1xuICB9O1xuXG4gIGhhc1BhcmVudHMgPSAoaXRlbSkgPT4ge1xuICAgIGNvbnN0IHsgY2hpbGRLZXkgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFpdGVtW2NoaWxkS2V5XSkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiAhIWl0ZW1bY2hpbGRLZXldLmZpbmQoY2hpbGQgPT4gY2hpbGRbY2hpbGRLZXldKTtcbiAgfTtcblxuICAvKipcbiAgICogRGVzZWxlY3RzIGFuIGl0ZW0sIGlmIGl0IGlzIGUuZy4gcmVtb3ZlZFxuICAgKi9cbiAgZGVzZWxlY3RJdGVtID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZEtleXM6IFtdIH0pO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICB2YWx1ZUtleSwgaWRLZXksIHRyZWVEYXRhLCBncmlkLCBncmlkQ29sdW1ucywgY2xhc3NOYW1lLCB0cmFuc2xhdGlvbnMsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBtZXJnZWRHcmlkID0gT2JqZWN0LmFzc2lnbih7fSwgZ3JpZCwgeyBkZWZhdWx0U2hvd0ZpbHRlcmluZ1JvdzogdHJ1ZSB9KTtcbiAgICBjb25zdCBtZXJnZWRUcmFuc2xhdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0VHJhbnNsYXRpb25zLCB0cmFuc2xhdGlvbnMpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxDb250YWluZXIgY2xhc3NOYW1lPXtjbGFzc05hbWV9PlxuICAgICAgICA8VHJlZUNvbnRhaW5lcj5cbiAgICAgICAgICA8Q29udHJvbEJhclxuICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICBvbkFkZE5ld0NsaWNrPXt0aGlzLm9uQWRkTmV3Q2xpY2t9XG4gICAgICAgICAgICBvbkRlbGV0ZUNsaWNrPXt0aGlzLm9uRGVsZXRlQ2xpY2t9XG4gICAgICAgICAgICBvbklucHV0Q2hhbmdlPXt0aGlzLm9uSW5wdXRDaGFuZ2V9XG4gICAgICAgICAgICBzZWxlY3RlZFRyZWVJdGVtPXt0aGlzLmdldFRyZWVJdGVtKHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdKX1cbiAgICAgICAgICAgIGhlaWdodD17QUNUSU9OX0JBUl9DT05UQUlORVJfSEVJR0hUfVxuICAgICAgICAgICAgdHJhbnNsYXRpb25zPXttZXJnZWRUcmFuc2xhdGlvbnN9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8UGVyZmVjdFNjcm9sbGJhcj5cbiAgICAgICAgICAgIDxUcmVlQ29tcG9uZW50XG4gICAgICAgICAgICAgIHRyZWVEYXRhPXt0cmVlRGF0YX1cbiAgICAgICAgICAgICAgZGF0YUxvb2tVcEtleT17aWRLZXl9XG4gICAgICAgICAgICAgIGRhdGFMb29rVXBWYWx1ZT17dmFsdWVLZXl9XG4gICAgICAgICAgICAgIG9uU2VsZWN0PXt0aGlzLm9uVHJlZUl0ZW1TZWxlY3R9XG4gICAgICAgICAgICAgIG9uRHJhZ0Ryb3A9e3RoaXMub25UcmVlSXRlbURyYWdEcm9wfVxuICAgICAgICAgICAgICBjaGVja2FibGU9e2ZhbHNlfVxuICAgICAgICAgICAgICBzZWxlY3RlZEtleXM9e3RoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzfVxuICAgICAgICAgICAgICBpc0RyYWdEcm9wTGVnYWw9e3RoaXMuaXNEcmFnRHJvcExlZ2FsfVxuICAgICAgICAgICAgICBzZWxlY3RhYmxlXG4gICAgICAgICAgICAgIGRyYWdnYWJsZVxuICAgICAgICAgICAgICBkZWZhdWx0RXhwYW5kQWxsXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvUGVyZmVjdFNjcm9sbGJhcj5cbiAgICAgICAgPC9UcmVlQ29udGFpbmVyPlxuICAgICAgICA8QXJyb3dDb250cm9sc1xuICAgICAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgIHNlbGVjdGVkVHJlZUl0ZW09e3RoaXMuZ2V0VHJlZUl0ZW0odGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF0pfVxuICAgICAgICAgIG9uTW92ZVRvVHJlZUNsaWNrPXt0aGlzLm9uTW92ZVRvVHJlZUNsaWNrfVxuICAgICAgICAgIG9uTW92ZVRvR3JpZENsaWNrPXt0aGlzLm9uTW92ZVRvR3JpZENsaWNrfVxuICAgICAgICAvPlxuICAgICAgICA8R3JpZFxuICAgICAgICAgIGdyaWQ9e21lcmdlZEdyaWR9XG4gICAgICAgICAgY29sdW1ucz17Z3JpZENvbHVtbnN9XG4gICAgICAgICAgcm93U2VsZWN0XG4gICAgICAgICAgbXVsdGlTZWxlY3RcbiAgICAgICAgICBmaWx0ZXJpbmdcbiAgICAgICAgICBncmlkSGVhZGVyPXs8UHJpbWl0aXZlLlN1YnRpdGxlPnttZXJnZWRUcmFuc2xhdGlvbnMuZ3JpZFRpdGxlfTwvUHJpbWl0aXZlLlN1YnRpdGxlPn1cbiAgICAgICAgLz5cbiAgICAgIDwvQ29udGFpbmVyPlxuICAgICk7XG4gIH1cbn1cbiJdfQ==