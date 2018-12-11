'use strict';

exports.__esModule = true;
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _dec, _class, _class2, _temp;

var _templateObject = _taggedTemplateLiteralLoose(['\n  height: 100%;\n  &&& {\n    padding: 0;\n  }\n  .oc-datagrid-main-container {\n    border: 1px solid ', ';\n    border-top:none;\n  }\n'], ['\n  height: 100%;\n  &&& {\n    padding: 0;\n  }\n  .oc-datagrid-main-container {\n    border: 1px solid ', ';\n    border-top:none;\n  }\n']),
    _templateObject2 = _taggedTemplateLiteralLoose(['\n  display: flex;\n  min-height: 300px;\n  > div {\n    width: 50%;\n    flex: 1 1 100%;\n  }\n'], ['\n  display: flex;\n  min-height: 300px;\n  > div {\n    width: 50%;\n    flex: 1 1 100%;\n  }\n']),
    _templateObject3 = _taggedTemplateLiteralLoose(['\n  height:100%;\n  .oc-scrollbar-container {\n    height: calc(100% - ', ');\n    padding: ', ';\n  }\n  .title-container {\n    min-height: ', ';\n  }\n  .oc-react-tree {\n    height: 100%;\n    .rc-tree-iconEle.rc-tree-icon__customize {\n        display:none;\n    }\n  }\n'], ['\n  height:100%;\n  .oc-scrollbar-container {\n    height: calc(100% - ', ');\n    padding: ', ';\n  }\n  .title-container {\n    min-height: ', ';\n  }\n  .oc-react-tree {\n    height: 100%;\n    .rc-tree-iconEle.rc-tree-icon__customize {\n        display:none;\n    }\n  }\n']),
    _templateObject4 = _taggedTemplateLiteralLoose(['\n  display: flex;\n  justify-content: center;\n  font-weight: bold;\n'], ['\n  display: flex;\n  justify-content: center;\n  font-weight: bold;\n']);

var _reactTreeComponent = require('@opuscapita/react-tree-component');

var _reactTreeComponent2 = _interopRequireDefault(_reactTreeComponent);

var _reactPerfectScrollbar = require('@opuscapita/react-perfect-scrollbar');

var _reactPerfectScrollbar2 = _interopRequireDefault(_reactPerfectScrollbar);

var _ocCmCommonLayouts = require('@opuscapita/oc-cm-common-layouts');

var _reactGrid = require('@opuscapita/react-grid');

var _reactConfirmationDialog = require('@opuscapita/react-confirmation-dialog');

var _reactConfirmationDialog2 = _interopRequireDefault(_reactConfirmationDialog);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _immutable = require('immutable');

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

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

var TreeContainer = _styledComponents2.default.div(_templateObject3, ACTION_BAR_CONTAINER_HEIGHT, function (props) {
  return props.theme.gutterWidth;
}, ACTION_BAR_CONTAINER_HEIGHT);

var NoItemsText = _styledComponents2.default.p(_templateObject4);

var mapDispatchToProps = {
  setData: _reactGrid.DatagridActions.setData,
  clearSelectedItems: _reactGrid.DatagridActions.clearSelectedItems
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
      var newGridItems = (0, _immutable.fromJS)([_this.getTreeItem(selectedKey)]);
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

      var data = (0, _immutable.List)();
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
      return _react2.default.createElement(_hierarchyTreeSelectorControlBar2.default, _extends({}, _this.props, {
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
    var mergedTranslations = Object.assign({}, _hierarchyTree.defaultTranslations, translations);

    return _react2.default.createElement(
      _react2.default.Fragment,
      null,
      _react2.default.createElement(
        Container,
        { className: className },
        _react2.default.createElement(
          TreeContainer,
          null,
          !!treeData.length && _react2.default.createElement(_reactTreeComponent2.default, {
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
          !treeData.length && _react2.default.createElement(
            NoItemsText,
            null,
            mergedTranslations.noTreeItems
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
          rowSelectCheckboxColumn: true,
          gridHeader: _react2.default.createElement(
            _ocCmCommonLayouts.Primitive.Subtitle,
            null,
            mergedTranslations.gridTitle
          )
        })
      ),
      this.state.showDeleteConfirmation && _react2.default.createElement(_reactConfirmationDialog2.default, {
        translations: mergedTranslations.deleteConfirmDialog,
        confirmCallback: this.deleteParent,
        cancelCallback: this.closeDeleteConfirmationDialog
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
  onSelect: undefined,
  onChange: undefined,
  defaultExpandAll: true
}, _temp)) || _class);
exports.default = HierarchyTreeSelector;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIkFDVElPTl9CQVJfQ09OVEFJTkVSX0hFSUdIVCIsIlRSRUVfQUNUSU9OUyIsIkFERF9DSElMRFJFTiIsIk1PVkVfTEVBRiIsIlJFTkFNRV9QQVJFTlQiLCJERUxFVEVfUEFSRU5UIiwiR3JpZCIsIkRhdGFncmlkIiwicHJvcHMiLCJ0aGVtZSIsImNvbG9ycyIsImNvbG9yTGlnaHRHcmF5IiwiQ29udGFpbmVyIiwic3R5bGVkIiwiZGl2IiwiVHJlZUNvbnRhaW5lciIsImd1dHRlcldpZHRoIiwiTm9JdGVtc1RleHQiLCJwIiwibWFwRGlzcGF0Y2hUb1Byb3BzIiwic2V0RGF0YSIsIkRhdGFncmlkQWN0aW9ucyIsImNsZWFyU2VsZWN0ZWRJdGVtcyIsIm1hcFN0YXRlVG9Qcm9wcyIsInN0YXRlIiwiZ3JpZElkIiwiZ3JpZCIsImlkIiwic2VsZWN0ZWRHcmlkSXRlbXMiLCJkYXRhZ3JpZCIsImdldEluIiwiZ3JpZERhdGEiLCJIaWVyYXJjaHlUcmVlU2VsZWN0b3IiLCJvblRyZWVJdGVtU2VsZWN0Iiwic2VsZWN0ZWRLZXlzIiwib25TZWxlY3QiLCJzZXRTdGF0ZSIsIm9uRGVsZXRlQ2xpY2siLCJzaG93RGVsZXRlQ29uZmlybWF0aW9uIiwib25BZGROZXdDbGljayIsImRhdGEiLCJjYWxsYmFjayIsIm9uQ2hhbmdlIiwidHJlZURhdGEiLCJpZEtleSIsIm5ld0l0ZW1zIiwic2xpY2UiLCJwdXNoIiwiYWN0aW9uIiwidHlwZSIsImdldFVwZGF0ZWRUcmVlIiwicGFyZW50IiwiZ2V0VHJlZUl0ZW0iLCJleHBhbmRQYXJlbnQiLCJvbk1vdmVUb0dyaWRDbGljayIsInNlbGVjdGVkS2V5IiwibmV4dFNlbGVjdGVkS2V5IiwiZ2V0QWRqYWNlbnRJdGVtIiwibmV3R3JpZEl0ZW1zIiwic2V0RGF0YVRvR3JpZCIsIm9uT3JkZXJDbGljayIsIml0ZW1zIiwib25Nb3ZlVG9UcmVlQ2xpY2siLCJzZWxlY3RlZElkIiwiZmlsdGVyIiwiaW5jbHVkZXMiLCJpIiwiZ2V0IiwidG9KUyIsIml0ZW0iLCJvbklucHV0Q2hhbmdlIiwidmFsdWUiLCJvbkV4cGFuZCIsImlkcyIsImV4cGFuZGVkS2V5cyIsImFycmF5IiwiZm91bmQiLCJjaGlsZEtleSIsInZhbHVlS2V5IiwicmVtb3ZlQWN0aW9ucyIsInJvb3RJdGVtIiwiZmluZCIsImxlbmd0aCIsImdldEFsbExlYWZzIiwiZGVzZWxlY3RJdGVtIiwiY2hpbGQiLCJmaWx0ZXJlZENoaWxkcmVuIiwiY2hpbGRJdGVtIiwiY29uY2F0IiwiVHlwZUVycm9yIiwiYWxyZWFkeUZvdW5kIiwibGVhZnMiLCJyZXR1cm5QYXJlbnQiLCJmb3JFYWNoIiwiZ2V0QWRqYWNlbnRJdGVtSWQiLCJwYXJlbnRBcnIiLCJBcnJheSIsImlzQXJyYXkiLCJpbmRleCIsImZpbmRJbmRleCIsImFkamFjZW50SXRlbSIsImdldEFsbFBhcmVudElkcyIsImNiIiwiYWNjIiwidG90YWwiLCJyZWR1Y2UiLCJzZXROZXdJdGVtcyIsImdyaWRDb2x1bW5zIiwicGFyZW50SWQiLCJleHBhbmRlZElkIiwibmV3RXhwYW5kZWRLZXlzIiwiY2xvc2VEZWxldGVDb25maXJtYXRpb25EaWFsb2ciLCJkZWxldGVQYXJlbnQiLCJyZW5kZXJIZWFkZXJSaWdodCIsInRyYW5zbGF0aW9ucyIsInJlbmRlciIsImNsYXNzTmFtZSIsIm1lcmdlZEdyaWQiLCJPYmplY3QiLCJhc3NpZ24iLCJkZWZhdWx0U2hvd0ZpbHRlcmluZ1JvdyIsIm1lcmdlZFRyYW5zbGF0aW9ucyIsImRlZmF1bHRUcmFuc2xhdGlvbnMiLCJub1RyZWVJdGVtcyIsImdyaWRUaXRsZSIsImRlbGV0ZUNvbmZpcm1EaWFsb2ciLCJSZWFjdCIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiLCJ1bmRlZmluZWQiLCJkZWZhdWx0RXhwYW5kQWxsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFB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QjtBQUdFLDZCQUFtQixLQUFLNEIsaUJBSDFCO0FBSUUsNkJBQW1CLEtBQUtSO0FBSjFCLFdBbkJGO0FBeUJFLHNDQUFDLElBQUQ7QUFDRSxnQkFBTStELFVBRFI7QUFFRSxtQkFBU1YsV0FGWDtBQUdFLHlCQUhGO0FBSUUsMkJBSkY7QUFLRSx5QkFMRjtBQU1FLHVDQU5GO0FBT0Usc0JBQVk7QUFBQyx3Q0FBRCxDQUFXLFFBQVg7QUFBQTtBQUFxQmMsK0JBQW1CRztBQUF4QztBQVBkO0FBekJGLE9BREY7QUFxQ0csV0FBS3BHLEtBQUwsQ0FBV2Msc0JBQVgsSUFDRCw4QkFBQyxpQ0FBRDtBQUNFLHNCQUFjbUYsbUJBQW1CSSxtQkFEbkM7QUFFRSx5QkFBaUIsS0FBS2IsWUFGeEI7QUFHRSx3QkFBZ0IsS0FBS0Q7QUFIdkI7QUF0Q0YsS0FERjtBQStDRCxHOzs7RUFyY2dEZSxnQkFBTUMsYSxXQXNCaERDLFksR0FBZTtBQUNwQnBGLFNBQU8sSUFEYTtBQUVwQmtDLFlBQVUsTUFGVTtBQUdwQkQsWUFBVSxVQUhVO0FBSXBCbEMsWUFBVSxFQUpVO0FBS3BCeUUsYUFBVyxFQUxTO0FBTXBCRixnQkFBY1Esa0NBTk07QUFPcEIvRixNQUFJLGdCQVBnQjtBQVFwQlEsWUFBVThGLFNBUlU7QUFTcEJ2RixZQUFVdUYsU0FUVTtBQVVwQkMsb0JBQWtCO0FBVkUsQztrQkF0QkhsRyxxQiIsImZpbGUiOiJoaWVyYXJjaHktdHJlZS1zZWxlY3Rvci5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVHJlZUNvbXBvbmVudCBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC10cmVlLWNvbXBvbmVudCc7XG5pbXBvcnQgUGVyZmVjdFNjcm9sbGJhciBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1wZXJmZWN0LXNjcm9sbGJhcic7XG5pbXBvcnQgeyBQcmltaXRpdmUgfSBmcm9tICdAb3B1c2NhcGl0YS9vYy1jbS1jb21tb24tbGF5b3V0cyc7XG5pbXBvcnQgeyBEYXRhZ3JpZCwgZ3JpZFNoYXBlLCBncmlkQ29sdW1uU2hhcGUsIERhdGFncmlkQWN0aW9ucyB9IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWdyaWQnO1xuaW1wb3J0IENvbmZpcm1EaWFsb2cgZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtY29uZmlybWF0aW9uLWRpYWxvZyc7XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCB7IExpc3QsIGZyb21KUyB9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgSW1tdXRhYmxlUHJvcFR5cGVzIGZyb20gJ3JlYWN0LWltbXV0YWJsZS1wcm9wdHlwZXMnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cblxuLy8gQXBwIGltcG9ydHNcbmltcG9ydCBDb250cm9sQmFyIGZyb20gJy4vaGllcmFyY2h5LXRyZWUtc2VsZWN0b3ItY29udHJvbC1iYXIuY29tcG9uZW50JztcbmltcG9ydCBBcnJvd0NvbnRyb2xzIGZyb20gJy4vaGllcmFyY2h5LXRyZWUtc2VsZWN0b3ItYXJyb3ctY29udHJvbHMuY29tcG9uZW50JztcbmltcG9ydCB7IGRlZmF1bHRUcmFuc2xhdGlvbnMgfSBmcm9tICcuL2hpZXJhcmNoeS10cmVlLnV0aWxzJztcblxuY29uc3QgQUNUSU9OX0JBUl9DT05UQUlORVJfSEVJR0hUID0gJzU3cHgnO1xuY29uc3QgVFJFRV9BQ1RJT05TID0ge1xuICBBRERfQ0hJTERSRU46ICdBRERfQ0hJTERSRU4nLFxuICBNT1ZFX0xFQUY6ICdNT1ZFX0xFQUYnLFxuICBSRU5BTUVfUEFSRU5UOiAnUkVOQU1FX1BBUkVOVCcsXG4gIERFTEVURV9QQVJFTlQ6ICdERUxFVEVfUEFSRU5UJyxcbn07XG5cbmNvbnN0IEdyaWQgPSBzdHlsZWQoRGF0YWdyaWQpYFxuICBoZWlnaHQ6IDEwMCU7XG4gICYmJiB7XG4gICAgcGFkZGluZzogMDtcbiAgfVxuICAub2MtZGF0YWdyaWQtbWFpbi1jb250YWluZXIge1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuY29sb3JzLmNvbG9yTGlnaHRHcmF5fTtcbiAgICBib3JkZXItdG9wOm5vbmU7XG4gIH1cbmA7XG5cbmNvbnN0IENvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIG1pbi1oZWlnaHQ6IDMwMHB4O1xuICA+IGRpdiB7XG4gICAgd2lkdGg6IDUwJTtcbiAgICBmbGV4OiAxIDEgMTAwJTtcbiAgfVxuYDtcblxuY29uc3QgVHJlZUNvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gIGhlaWdodDoxMDAlO1xuICAub2Mtc2Nyb2xsYmFyLWNvbnRhaW5lciB7XG4gICAgaGVpZ2h0OiBjYWxjKDEwMCUgLSAke0FDVElPTl9CQVJfQ09OVEFJTkVSX0hFSUdIVH0pO1xuICAgIHBhZGRpbmc6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuZ3V0dGVyV2lkdGh9O1xuICB9XG4gIC50aXRsZS1jb250YWluZXIge1xuICAgIG1pbi1oZWlnaHQ6ICR7QUNUSU9OX0JBUl9DT05UQUlORVJfSEVJR0hUfTtcbiAgfVxuICAub2MtcmVhY3QtdHJlZSB7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIC5yYy10cmVlLWljb25FbGUucmMtdHJlZS1pY29uX19jdXN0b21pemUge1xuICAgICAgICBkaXNwbGF5Om5vbmU7XG4gICAgfVxuICB9XG5gO1xuXG5jb25zdCBOb0l0ZW1zVGV4dCA9IHN0eWxlZC5wYFxuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG5gO1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSB7XG4gIHNldERhdGE6IERhdGFncmlkQWN0aW9ucy5zZXREYXRhLFxuICBjbGVhclNlbGVjdGVkSXRlbXM6IERhdGFncmlkQWN0aW9ucy5jbGVhclNlbGVjdGVkSXRlbXMsXG59O1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUsIHByb3BzKSA9PiB7XG4gIGNvbnN0IGdyaWRJZCA9IHByb3BzLmdyaWQuaWQ7XG4gIHJldHVybiB7XG4gICAgc2VsZWN0ZWRHcmlkSXRlbXM6IHN0YXRlLmRhdGFncmlkLmdldEluKFtncmlkSWQsICdzZWxlY3RlZEl0ZW1zJ10sIExpc3QoKSksXG4gICAgZ3JpZERhdGE6IHN0YXRlLmRhdGFncmlkLmdldEluKFtncmlkSWQsICdhbGxEYXRhJ10sIExpc3QoKSksXG4gIH07XG59O1xuXG5AY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcylcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhpZXJhcmNoeVRyZWVTZWxlY3RvciBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGlkS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHZhbHVlS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNoaWxkS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHRyZWVEYXRhOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc2hhcGUoe30pKSxcbiAgICBncmlkOiBncmlkU2hhcGUuaXNSZXF1aXJlZCxcbiAgICBncmlkQ29sdW1uczogUHJvcFR5cGVzLmFycmF5T2YoZ3JpZENvbHVtblNoYXBlKS5pc1JlcXVpcmVkLFxuICAgIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBzZXREYXRhOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGNsZWFyU2VsZWN0ZWRJdGVtczogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBzZWxlY3RlZEdyaWRJdGVtczogSW1tdXRhYmxlUHJvcFR5cGVzLmxpc3QuaXNSZXF1aXJlZCxcbiAgICBncmlkRGF0YTogSW1tdXRhYmxlUHJvcFR5cGVzLmxpc3QuaXNSZXF1aXJlZCxcbiAgICB0cmFuc2xhdGlvbnM6IFByb3BUeXBlcy5zaGFwZSh7fSksXG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGVmYXVsdEV4cGFuZEFsbDogUHJvcFR5cGVzLmJvb2wsXG5cbiAgICAvLyBDYWxsYmFja3NcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgaWRLZXk6ICdpZCcsXG4gICAgdmFsdWVLZXk6ICduYW1lJyxcbiAgICBjaGlsZEtleTogJ2NoaWxkcmVuJyxcbiAgICB0cmVlRGF0YTogW10sXG4gICAgY2xhc3NOYW1lOiAnJyxcbiAgICB0cmFuc2xhdGlvbnM6IGRlZmF1bHRUcmFuc2xhdGlvbnMsXG4gICAgaWQ6ICdoaWVyYXJjaHktdHJlZScsXG4gICAgb25TZWxlY3Q6IHVuZGVmaW5lZCxcbiAgICBvbkNoYW5nZTogdW5kZWZpbmVkLFxuICAgIGRlZmF1bHRFeHBhbmRBbGw6IHRydWUsXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgc2VsZWN0ZWRLZXlzOiBbXSxcbiAgICAgIHNob3dEZWxldGVDb25maXJtYXRpb246IGZhbHNlLFxuICAgIH07XG4gIH1cblxuXG4gIC8qKlxuICAgKiBTZWxlY3RzIGEgdHJlZSBpdGVtXG4gICAqIEBwYXJhbSBzZWxlY3RlZEtleXMgKGFycmF5KVxuICAgKi9cbiAgb25UcmVlSXRlbVNlbGVjdCA9IChzZWxlY3RlZEtleXMpID0+IHtcbiAgICBjb25zdCB7IG9uU2VsZWN0IH0gPSB0aGlzLnByb3BzO1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZEtleXMgfSwgKCkgPT4ge1xuICAgICAgaWYgKG9uU2VsZWN0KSBvblNlbGVjdChzZWxlY3RlZEtleXMpO1xuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBEaXNwbGF5cyBhIGNvbmZpcm1hdGlvbiBkaWFsb2dcbiAgICovXG4gIG9uRGVsZXRlQ2xpY2sgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNob3dEZWxldGVDb25maXJtYXRpb246IHRydWUgfSk7XG4gIH07XG5cblxuICAvKipcbiAgICogQWRkcyBhIG5ldyBub2RlIHRvIHRoZSByb290IG9mIHRoZSB0cmVlLCBvciB1bmRlciBhIHNlbGVjdGVkIHRyZWUgbm9kZSB1c2luZ1xuICAgKiBBRERfQ0hJTERSRU4gYWN0aW9uXG4gICAqIEBwYXJhbSBkYXRhIC0gZGF0YSB0byBiZSBhZGRlZFxuICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICovXG4gIG9uQWRkTmV3Q2xpY2sgPSAoZGF0YSwgY2FsbGJhY2spID0+IHtcbiAgICBjb25zdCB7IG9uQ2hhbmdlLCB0cmVlRGF0YSwgaWRLZXkgfSA9IHRoaXMucHJvcHM7XG4gICAgbGV0IG5ld0l0ZW1zID0gdHJlZURhdGEuc2xpY2UoKTtcblxuICAgIC8vIElmIG5vIHRyZWUgbm9kZSBpcyBzZWxlY3RlZCwgd2UnbGwgcGxhY2UgdGhlIG5ldyBpdGVtIHRvIHRoZSByb290XG4gICAgLy8gb2YgdGhlIHRyZWVcbiAgICBpZiAoIXRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdKSB7XG4gICAgICBuZXdJdGVtcy5wdXNoKGRhdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBhY3Rpb24gPSB7XG4gICAgICAgIHR5cGU6IFRSRUVfQUNUSU9OUy5BRERfQ0hJTERSRU4sXG4gICAgICAgIGRhdGEsXG4gICAgICB9O1xuICAgICAgbmV3SXRlbXMgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdLCB0cmVlRGF0YSwgYWN0aW9uKTtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkS2V5czogW2RhdGFbaWRLZXldXSB9LCAoKSA9PiB7XG4gICAgICAvLyBJZiB0aGUgcGFyZW50IGlzIG5vdCB5ZXQgZXhwYW5kZWQsIHdlIHdpbGwgZXhwYW5kIGl0IG5vd1xuICAgICAgY29uc3QgcGFyZW50ID0gdGhpcy5nZXRUcmVlSXRlbShkYXRhW2lkS2V5XSwgdHJlZURhdGEsIHRydWUpIHx8IHt9O1xuICAgICAgdGhpcy5leHBhbmRQYXJlbnQocGFyZW50W2lkS2V5XSk7XG5cbiAgICAgIGlmIChvbkNoYW5nZSkgb25DaGFuZ2UobmV3SXRlbXMpO1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogUmVtb3ZlcyB0aGUgY2hvc2VuIGl0ZW0gZnJvbSBhIHRyZWUgYW5kIHVwZGF0ZXMgdGhlIGdyaWQgdXNpbmcgTU9WRV9MRUFGXG4gICAqIGFjdGlvblxuICAgKi9cbiAgb25Nb3ZlVG9HcmlkQ2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3QgeyB0cmVlRGF0YSwgb25DaGFuZ2UgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgc2VsZWN0ZWRLZXkgPSB0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXTtcbiAgICBjb25zdCBhY3Rpb24gPSB7XG4gICAgICB0eXBlOiBUUkVFX0FDVElPTlMuTU9WRV9MRUFGLFxuICAgICAgZGF0YTogdGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF0sXG4gICAgfTtcbiAgICBjb25zdCBuZXh0U2VsZWN0ZWRLZXkgPSB0aGlzLmdldEFkamFjZW50SXRlbShzZWxlY3RlZEtleSk7XG4gICAgY29uc3QgbmV3R3JpZEl0ZW1zID0gZnJvbUpTKFt0aGlzLmdldFRyZWVJdGVtKHNlbGVjdGVkS2V5KV0pO1xuICAgIGNvbnN0IG5ld0l0ZW1zID0gdGhpcy5nZXRVcGRhdGVkVHJlZShzZWxlY3RlZEtleSwgdHJlZURhdGEsIGFjdGlvbik7XG5cbiAgICB0aGlzLnNldERhdGFUb0dyaWQobmV3R3JpZEl0ZW1zKTtcbiAgICBpZiAob25DaGFuZ2UpIG9uQ2hhbmdlKG5ld0l0ZW1zKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNlbGVjdGVkS2V5czogW25leHRTZWxlY3RlZEtleV0sXG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIENhbGxzIG9uQ2hhbmdlIGNhbGxiYWNrIHdoZW5ldmVyIHVzZXIgcmVvcmRlcnMgdHJlZSBpdGVtcyB1c2luZyBvcmRlcmluZyBhcnJvd3NcbiAgICogQHBhcmFtIGl0ZW1zXG4gICAqL1xuICBvbk9yZGVyQ2xpY2sgPSAoaXRlbXMpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKGl0ZW1zKTtcbiAgfTtcblxuICAvKipcbiAgICogQWRkcyBzZWxlY3RlZCBncmlkIGl0ZW1zIHRvIHRoZSBjaG9zZW4gdHJlZSBub2RlIHVzaW5nIEFERF9DSElMRFJFTiBhY3Rpb25cbiAgICovXG4gIG9uTW92ZVRvVHJlZUNsaWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIG9uQ2hhbmdlLCBzZWxlY3RlZEdyaWRJdGVtcywgZ3JpZERhdGEsIHRyZWVEYXRhLCBpZEtleSxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzZWxlY3RlZElkID0gdGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF07XG5cbiAgICBjb25zdCBhY3Rpb24gPSB7XG4gICAgICB0eXBlOiBUUkVFX0FDVElPTlMuQUREX0NISUxEUkVOLFxuICAgICAgZGF0YTogZ3JpZERhdGFcbiAgICAgICAgLmZpbHRlcihpID0+IHNlbGVjdGVkR3JpZEl0ZW1zLmluY2x1ZGVzKGkuZ2V0KGlkS2V5KSkpXG4gICAgICAgIC50b0pTKCksXG4gICAgfTtcbiAgICBjb25zdCBuZXdJdGVtcyA9IHRoaXMuZ2V0VXBkYXRlZFRyZWUoc2VsZWN0ZWRJZCwgdHJlZURhdGEsIGFjdGlvbik7XG4gICAgY29uc3QgbmV3R3JpZEl0ZW1zID0gZ3JpZERhdGEuZmlsdGVyKGl0ZW0gPT4gIXNlbGVjdGVkR3JpZEl0ZW1zLmluY2x1ZGVzKGl0ZW0uZ2V0KGlkS2V5KSkpO1xuXG4gICAgdGhpcy5leHBhbmRQYXJlbnQoc2VsZWN0ZWRJZCwgdHJ1ZSk7XG4gICAgdGhpcy5zZXREYXRhVG9HcmlkKG5ld0dyaWRJdGVtcywgdHJ1ZSk7XG4gICAgaWYgKG9uQ2hhbmdlKSBvbkNoYW5nZShuZXdJdGVtcyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlbmFtZXMgdGhlIGNob3NlbiB0cmVlIG5vZGUgdXNpbmcgYSBSRU5BTUVfUEFSRU5UIGFjdGlvblxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICovXG4gIG9uSW5wdXRDaGFuZ2UgPSAodmFsdWUpID0+IHtcbiAgICBjb25zdCB7IHRyZWVEYXRhLCBvbkNoYW5nZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBhY3Rpb24gPSB7XG4gICAgICB0eXBlOiBUUkVFX0FDVElPTlMuUkVOQU1FX1BBUkVOVCxcbiAgICAgIGRhdGE6IHZhbHVlLFxuICAgIH07XG4gICAgY29uc3QgbmV3SXRlbXMgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdLCB0cmVlRGF0YSwgYWN0aW9uKTtcbiAgICBpZiAob25DaGFuZ2UpIG9uQ2hhbmdlKG5ld0l0ZW1zKTtcbiAgfTtcblxuICAvKipcbiAgICogRmlyZWQgb24gZXhwYW5kXG4gICAqIEBwYXJhbSBpZHNcbiAgICovXG4gIG9uRXhwYW5kID0gKGlkcykgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZXhwYW5kZWRLZXlzOiBpZHMsXG4gICAgfSk7XG4gIH07XG5cblxuICAvKipcbiAgICogUmV0dXJucyB1cGRhdGVkIHRyZWUgaXRlbXMuXG4gICAqIEBwYXJhbSBpZCAtIHRhcmdldCBpdGVtXG4gICAqIEBwYXJhbSBhcnJheSAtIGFycmF5IHdoZXJlIHRhcmdldCBpdGVtIGlzIGJlaW5nIHNlYXJjaGVkXG4gICAqIEBwYXJhbSBhY3Rpb24gLSBhY3Rpb24gdG8gYmUgcGVyZm9ybWVkIHt0eXBlLCBkYXRhfVxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIGdldFVwZGF0ZWRUcmVlID0gKGlkLCBhcnJheSA9IHRoaXMucHJvcHMudHJlZURhdGEsIGFjdGlvbikgPT4ge1xuICAgIGxldCBmb3VuZCA9IGZhbHNlO1xuICAgIGNvbnN0IHsgaWRLZXksIGNoaWxkS2V5LCB2YWx1ZUtleSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBuZXdJdGVtcyA9IGFycmF5LnNsaWNlKCk7XG4gICAgY29uc3QgcmVtb3ZlQWN0aW9ucyA9IFtUUkVFX0FDVElPTlMuTU9WRV9MRUFGLCBUUkVFX0FDVElPTlMuREVMRVRFX1BBUkVOVF07XG5cbiAgICAvLyBJZiBkZWxldGVkIHBhcmVudCBpdGVtIGlzIGluIHRoZSByb290IG5vZGVcbiAgICBpZiAoYWN0aW9uLnR5cGUgPT09IFRSRUVfQUNUSU9OUy5ERUxFVEVfUEFSRU5UKSB7XG4gICAgICBjb25zdCByb290SXRlbSA9IGFycmF5LmZpbmQoaXRlbSA9PiBpdGVtW2lkS2V5XSA9PT0gaWQpO1xuICAgICAgaWYgKHJvb3RJdGVtKSB7XG4gICAgICAgIGlmIChyb290SXRlbVtjaGlsZEtleV0ubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5zZXREYXRhVG9HcmlkKGZyb21KUyh0aGlzLmdldEFsbExlYWZzKHJvb3RJdGVtW2NoaWxkS2V5XSkpKTtcbiAgICAgICAgICB0aGlzLmRlc2VsZWN0SXRlbSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXdJdGVtcy5maWx0ZXIoaXRlbSA9PiBpdGVtW2lkS2V5XSAhPT0gaWQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmV3SXRlbXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSBuZXdJdGVtc1tpXTtcbiAgICAgIGlmIChyZW1vdmVBY3Rpb25zLmluY2x1ZGVzKGFjdGlvbi50eXBlKSAmJiBpdGVtW2NoaWxkS2V5XSAmJiAhZm91bmQpIHtcbiAgICAgICAgZm91bmQgPSAhIWl0ZW1bY2hpbGRLZXldLmZpbmQoY2hpbGQgPT4gY2hpbGRbaWRLZXldID09PSBpZCk7XG4gICAgICAgIGlmIChmb3VuZCkge1xuICAgICAgICAgIC8vIFdoZW4gcmVtb3ZpbmcgYW4gaXRlbSB3ZSBtdXN0IGZpcnN0IGZpbmQgaXRzIHBhcmVudCBhbmQgYWx0ZXIgaXRzIGNoaWxkcmVuIGFycmF5XG4gICAgICAgICAgaWYgKGFjdGlvbi50eXBlID09PSBUUkVFX0FDVElPTlMuTU9WRV9MRUFGKSB7XG4gICAgICAgICAgICBpdGVtW2NoaWxkS2V5XSA9IGl0ZW1bY2hpbGRLZXldLmZpbHRlcihjaGlsZCA9PiBjaGlsZFtpZEtleV0gIT09IGlkKTtcbiAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RJdGVtKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChhY3Rpb24udHlwZSA9PT0gVFJFRV9BQ1RJT05TLkRFTEVURV9QQVJFTlQpIHtcbiAgICAgICAgICAgIC8vIHdlIG11c3QgZmlyc3QgZmlsdGVyIHRoZSBjaGlsZHJlbiwgc28gdGhhdCB3ZSB3b24ndCBnZXQgbGVhZnMgZnJvbVxuICAgICAgICAgICAgLy8gb3RoZXIgY2hpbGQgYnJhbmNoZXNcbiAgICAgICAgICAgIGNvbnN0IGZpbHRlcmVkQ2hpbGRyZW4gPSBpdGVtW2NoaWxkS2V5XS5maWx0ZXIoY2hpbGRJdGVtID0+IGNoaWxkSXRlbVtpZEtleV0gPT09IGlkKTtcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YVRvR3JpZChmcm9tSlModGhpcy5nZXRBbGxMZWFmcyhmaWx0ZXJlZENoaWxkcmVuKSkpO1xuICAgICAgICAgICAgdGhpcy5kZXNlbGVjdEl0ZW0oKTtcbiAgICAgICAgICAgIGl0ZW1bY2hpbGRLZXldID0gaXRlbVtjaGlsZEtleV0uZmlsdGVyKGNoaWxkSXRlbSA9PiBjaGlsZEl0ZW1baWRLZXldICE9PSBpZCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtW2lkS2V5XSA9PT0gaWQgJiYgIWZvdW5kKSB7XG4gICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICAgIGNhc2UgVFJFRV9BQ1RJT05TLkFERF9DSElMRFJFTjpcbiAgICAgICAgICAgIGl0ZW1bY2hpbGRLZXldID0gKGl0ZW1bY2hpbGRLZXldIHx8IFtdKS5jb25jYXQoYWN0aW9uLmRhdGEpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBUUkVFX0FDVElPTlMuUkVOQU1FX1BBUkVOVDpcbiAgICAgICAgICAgIGl0ZW1bdmFsdWVLZXldID0gYWN0aW9uLmRhdGE7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQWN0aW9uIHR5cGUgaXMgdW5kZWZpbmVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVtjaGlsZEtleV0gJiYgIWZvdW5kKSBmb3VuZCA9IHRoaXMuZ2V0VXBkYXRlZFRyZWUoaWQsIGl0ZW1bY2hpbGRLZXldLCBhY3Rpb24pO1xuICAgIH1cblxuICAgIGlmICghZm91bmQpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gbmV3SXRlbXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybnMgcmVjdXJzaXZlbHkgYWxsIGxlYWYgaXRlbXMgZnJvbSBhIGdpdmVuIGFycmF5XG4gICAqIEBwYXJhbSBhcnJheVxuICAgKiBAcGFyYW0gYWxyZWFkeUZvdW5kICh1c2VkIHJlY3Vyc2l2ZWx5KVxuICAgKi9cbiAgZ2V0QWxsTGVhZnMgPSAoYXJyYXksIGFscmVhZHlGb3VuZCA9IFtdKSA9PiB7XG4gICAgY29uc3QgeyBjaGlsZEtleSB9ID0gdGhpcy5wcm9wcztcbiAgICBsZXQgbGVhZnMgPSBhbHJlYWR5Rm91bmQ7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBpdGVtID0gYXJyYXlbaV07XG4gICAgICBpZiAoaXRlbVtjaGlsZEtleV0pIHtcbiAgICAgICAgbGVhZnMgPSB0aGlzLmdldEFsbExlYWZzKGl0ZW1bY2hpbGRLZXldLCBhbHJlYWR5Rm91bmQpO1xuICAgICAgfVxuICAgICAgaWYgKCFpdGVtW2NoaWxkS2V5XSkgbGVhZnMucHVzaChpdGVtKTtcbiAgICB9XG4gICAgcmV0dXJuIGxlYWZzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgdHJlZSBpdGVtIGJ5IElEXG4gICAqIEBwYXJhbSBpZFxuICAgKiBAcGFyYW0gYXJyYXlcbiAgICogQHBhcmFtIHJldHVyblBhcmVudCAtIHJldHVybiBpdGVtJ3MgcGFyZW50IGluc3RlYWQgb2YgdGhlIGl0ZW1cbiAgICogQHBhcmFtIHBhcmVudCAtIHBhcmVudCBpdGVtICh1c2VkIHJlY3Vyc2l2ZWx5KVxuICAgKiBAcmV0dXJucyB7e319XG4gICAqL1xuICBnZXRUcmVlSXRlbSA9IChpZCwgYXJyYXkgPSB0aGlzLnByb3BzLnRyZWVEYXRhLCByZXR1cm5QYXJlbnQgPSBmYWxzZSwgcGFyZW50ID0gbnVsbCkgPT4ge1xuICAgIGNvbnN0IHsgY2hpbGRLZXksIGlkS2V5IH0gPSB0aGlzLnByb3BzO1xuICAgIGxldCBmb3VuZCA9IGFycmF5LmZpbmQoaXRlbSA9PiBpdGVtW2lkS2V5XSA9PT0gaWQpO1xuXG4gICAgaWYgKGZvdW5kICYmIHJldHVyblBhcmVudCkgZm91bmQgPSBwYXJlbnQ7XG5cbiAgICBpZiAoIWZvdW5kKSB7XG4gICAgICBhcnJheS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGlmIChpdGVtW2NoaWxkS2V5XSAmJiAhZm91bmQpIHtcbiAgICAgICAgICBmb3VuZCA9IHRoaXMuZ2V0VHJlZUl0ZW0oaWQsIGl0ZW1bY2hpbGRLZXldLCByZXR1cm5QYXJlbnQsIGl0ZW0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGZvdW5kO1xuICB9O1xuXG4gIC8qKlxuICAgKiBHZXQgYWRqYWNlbnQgaXRlbSAoaWQpIGluIHBhcmVudCBhcnJheS4gVXNlZCB3aGVuIG1vdmluZyBpdGVtcyBmcm9tIHRyZWVcbiAgICogdG8gZ3JpZC9kZWxldGluZyBhbiBpdGVtXG4gICAqIEBwYXJhbSBpZFxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIGdldEFkamFjZW50SXRlbSA9IChpZCkgPT4ge1xuICAgIGlmICghaWQpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IHsgY2hpbGRLZXksIGlkS2V5LCB0cmVlRGF0YSB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IGdldEFkamFjZW50SXRlbUlkID0gKHBhcmVudCkgPT4ge1xuICAgICAgY29uc3QgcGFyZW50QXJyID0gQXJyYXkuaXNBcnJheShwYXJlbnQpID8gcGFyZW50IDogcGFyZW50W2NoaWxkS2V5XTtcbiAgICAgIGNvbnN0IGluZGV4ID0gcGFyZW50QXJyLmZpbmRJbmRleChjaGlsZCA9PiBjaGlsZFtpZEtleV0gPT09IGlkKTtcbiAgICAgIGxldCBhZGphY2VudEl0ZW0gPSBwYXJlbnRBcnJbaW5kZXggKyAxXTtcbiAgICAgIGlmICghYWRqYWNlbnRJdGVtKSBhZGphY2VudEl0ZW0gPSBwYXJlbnRBcnJbaW5kZXggLSAxXTtcbiAgICAgIGlmICghYWRqYWNlbnRJdGVtICYmICFBcnJheS5pc0FycmF5KHBhcmVudCkpIGFkamFjZW50SXRlbSA9IHBhcmVudDtcbiAgICAgIGlmICghYWRqYWNlbnRJdGVtKSByZXR1cm4gbnVsbDtcblxuICAgICAgcmV0dXJuIGFkamFjZW50SXRlbVtpZEtleV07XG4gICAgfTtcblxuICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuZ2V0VHJlZUl0ZW0oaWQsIHRoaXMucHJvcHMudHJlZURhdGEsIHRydWUpO1xuICAgIHJldHVybiBwYXJlbnQgPyBnZXRBZGphY2VudEl0ZW1JZChwYXJlbnQpIDogZ2V0QWRqYWNlbnRJdGVtSWQodHJlZURhdGEpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFsbCBJRHMgaW4gdGhlIHRyZWVcbiAgICogQHBhcmFtIGFycmF5XG4gICAqL1xuICBnZXRBbGxQYXJlbnRJZHMgPSAoYXJyYXkgPSB0aGlzLnByb3BzLnRyZWVEYXRhKSA9PiB7XG4gICAgY29uc3QgeyBpZEtleSwgY2hpbGRLZXkgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgY2IgPSAoYWNjLCBpdGVtKSA9PiB7XG4gICAgICBsZXQgdG90YWwgPSBhY2M7XG4gICAgICBpZiAoaXRlbVtjaGlsZEtleV0gJiYgaXRlbVtjaGlsZEtleV0ubGVuZ3RoID4gMCkge1xuICAgICAgICB0b3RhbCA9IGFjYy5jb25jYXQoaXRlbVtpZEtleV0pO1xuICAgICAgICByZXR1cm4gaXRlbVtjaGlsZEtleV0ucmVkdWNlKGNiLCB0b3RhbCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdG90YWw7XG4gICAgfTtcbiAgICByZXR1cm4gYXJyYXkucmVkdWNlKGNiLCBbXSk7XG4gIH07XG5cblxuICAvKipcbiAgICogQXBwZW5kcyBwcm92aWRlZCBpdGVtcyB0byB0aGUgZ3JpZFxuICAgKiBAcGFyYW0gaXRlbXMgLSBpbW11dGFibGUgYXJyYXkgb2YgaXRlbXMgdG8gYmUgYXBwZW5kZWQgdG8gZ3JpZFxuICAgKiBAcGFyYW0gc2V0TmV3SXRlbXMgLSBzZXQgY29tcGxldGVseSBhIG5ldyBhcnJheSBvZiBpdGVtc1xuICAgKi9cbiAgc2V0RGF0YVRvR3JpZCA9IChpdGVtcywgc2V0TmV3SXRlbXMgPSBmYWxzZSkgPT4ge1xuICAgIGxldCBkYXRhID0gTGlzdCgpO1xuICAgIGNvbnN0IHsgZ3JpZCwgZ3JpZENvbHVtbnMsIGdyaWREYXRhIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghc2V0TmV3SXRlbXMpIGRhdGEgPSBncmlkRGF0YS5zbGljZSgpO1xuICAgIGNvbnN0IG5ld0dyaWRJdGVtcyA9IGRhdGEuY29uY2F0KGl0ZW1zKTtcblxuICAgIHRoaXMucHJvcHMuc2V0RGF0YShncmlkLCBncmlkQ29sdW1ucywgbmV3R3JpZEl0ZW1zKTtcbiAgICB0aGlzLnByb3BzLmNsZWFyU2VsZWN0ZWRJdGVtcyhncmlkKTtcbiAgfTtcblxuICAvKipcbiAgICogRXhwYW5kcyBhIHBhcmVudFxuICAgKiBAcGFyYW0gcGFyZW50SWRcbiAgICovXG4gIGV4cGFuZFBhcmVudCA9IChwYXJlbnRJZCkgPT4ge1xuICAgIGlmIChwYXJlbnRJZCAmJiAhdGhpcy5zdGF0ZS5leHBhbmRlZEtleXMuZmluZChleHBhbmRlZElkID0+IGV4cGFuZGVkSWQgPT09IHBhcmVudElkKSkge1xuICAgICAgY29uc3QgbmV3RXhwYW5kZWRLZXlzID0gdGhpcy5zdGF0ZS5leHBhbmRlZEtleXMuc2xpY2UoKTtcbiAgICAgIG5ld0V4cGFuZGVkS2V5cy5wdXNoKHBhcmVudElkKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBleHBhbmRlZEtleXM6IG5ld0V4cGFuZGVkS2V5cyB9KTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIENsb3NlcyBkZWxldGUgY29uZmlybWF0aW9uIGRpYWxvZ1xuICAgKi9cbiAgY2xvc2VEZWxldGVDb25maXJtYXRpb25EaWFsb2cgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNob3dEZWxldGVDb25maXJtYXRpb246IGZhbHNlIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBEZWxldGVzIGEgcGFyZW50IG5vZGVcbiAgICovXG4gIGRlbGV0ZVBhcmVudCA9ICgpID0+IHtcbiAgICBjb25zdCB7IG9uQ2hhbmdlLCB0cmVlRGF0YSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzZWxlY3RlZEtleSA9IHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdO1xuICAgIGNvbnN0IGFjdGlvbiA9IHtcbiAgICAgIHR5cGU6IFRSRUVfQUNUSU9OUy5ERUxFVEVfUEFSRU5ULFxuICAgIH07XG4gICAgY29uc3QgbmV4dFNlbGVjdGVkS2V5ID0gdGhpcy5nZXRBZGphY2VudEl0ZW0oc2VsZWN0ZWRLZXkpO1xuICAgIGNvbnN0IG5ld0l0ZW1zID0gdGhpcy5nZXRVcGRhdGVkVHJlZShzZWxlY3RlZEtleSwgdHJlZURhdGEsIGFjdGlvbik7XG4gICAgaWYgKG9uQ2hhbmdlKSBvbkNoYW5nZShuZXdJdGVtcyk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzZWxlY3RlZEtleXM6IFtuZXh0U2VsZWN0ZWRLZXldLFxuICAgICAgc2hvd0RlbGV0ZUNvbmZpcm1hdGlvbjogZmFsc2UsXG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIERlc2VsZWN0cyBhbiBpdGVtLCBpZiBpdCBpcyBlLmcuIHJlbW92ZWRcbiAgICovXG4gIGRlc2VsZWN0SXRlbSA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRLZXlzOiBbXSB9KTtcbiAgfTtcblxuICByZW5kZXJIZWFkZXJSaWdodCA9IHRyYW5zbGF0aW9ucyA9PiAoXG4gICAgPENvbnRyb2xCYXJcbiAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgb25BZGROZXdDbGljaz17dGhpcy5vbkFkZE5ld0NsaWNrfVxuICAgICAgb25EZWxldGVDbGljaz17dGhpcy5vbkRlbGV0ZUNsaWNrfVxuICAgICAgb25JbnB1dENoYW5nZT17dGhpcy5vbklucHV0Q2hhbmdlfVxuICAgICAgc2VsZWN0ZWRUcmVlSXRlbT17dGhpcy5nZXRUcmVlSXRlbSh0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXSl9XG4gICAgICBoZWlnaHQ9e0FDVElPTl9CQVJfQ09OVEFJTkVSX0hFSUdIVH1cbiAgICAgIHRyYW5zbGF0aW9ucz17dHJhbnNsYXRpb25zfVxuICAgIC8+XG4gICk7XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHZhbHVlS2V5LCBpZEtleSwgdHJlZURhdGEsIGdyaWQsIGdyaWRDb2x1bW5zLCBjbGFzc05hbWUsIHRyYW5zbGF0aW9ucyxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IG1lcmdlZEdyaWQgPSBPYmplY3QuYXNzaWduKHt9LCBncmlkLCB7IGRlZmF1bHRTaG93RmlsdGVyaW5nUm93OiB0cnVlIH0pO1xuICAgIGNvbnN0IG1lcmdlZFRyYW5zbGF0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRUcmFuc2xhdGlvbnMsIHRyYW5zbGF0aW9ucyk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPFJlYWN0LkZyYWdtZW50PlxuICAgICAgICA8Q29udGFpbmVyIGNsYXNzTmFtZT17Y2xhc3NOYW1lfT5cbiAgICAgICAgICA8VHJlZUNvbnRhaW5lcj5cbiAgICAgICAgICAgIHshIXRyZWVEYXRhLmxlbmd0aCAmJiA8VHJlZUNvbXBvbmVudFxuICAgICAgICAgICAgICB0cmVlRGF0YT17dHJlZURhdGF9XG4gICAgICAgICAgICAgIGRhdGFMb29rVXBLZXk9e2lkS2V5fVxuICAgICAgICAgICAgICBkYXRhTG9va1VwVmFsdWU9e3ZhbHVlS2V5fVxuICAgICAgICAgICAgICBvblNlbGVjdD17dGhpcy5vblRyZWVJdGVtU2VsZWN0fVxuICAgICAgICAgICAgICBvbkV4cGFuZD17dGhpcy5vbkV4cGFuZH1cbiAgICAgICAgICAgICAgY2hlY2thYmxlPXtmYWxzZX1cbiAgICAgICAgICAgICAgc2VsZWN0ZWRLZXlzPXt0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c31cbiAgICAgICAgICAgICAgZXhwYW5kZWRLZXlzPXt0aGlzLnN0YXRlLmV4cGFuZGVkS2V5c31cbiAgICAgICAgICAgICAgb25PcmRlckJ1dHRvbkNsaWNrPXt0aGlzLm9uT3JkZXJDbGlja31cbiAgICAgICAgICAgICAgc2VsZWN0YWJsZVxuICAgICAgICAgICAgICBzaG93T3JkZXJpbmdBcnJvd3NcbiAgICAgICAgICAgICAgc2hvd0V4cGFuZEFsbFxuICAgICAgICAgICAgICBoZWFkZXJSaWdodD17dGhpcy5yZW5kZXJIZWFkZXJSaWdodChtZXJnZWRUcmFuc2xhdGlvbnMpfVxuICAgICAgICAgICAgLz59XG4gICAgICAgICAgICB7IXRyZWVEYXRhLmxlbmd0aCAmJiA8Tm9JdGVtc1RleHQ+e21lcmdlZFRyYW5zbGF0aW9ucy5ub1RyZWVJdGVtc308L05vSXRlbXNUZXh0Pn1cbiAgICAgICAgICA8L1RyZWVDb250YWluZXI+XG4gICAgICAgICAgPEFycm93Q29udHJvbHNcbiAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgc2VsZWN0ZWRUcmVlSXRlbT17dGhpcy5nZXRUcmVlSXRlbSh0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXSl9XG4gICAgICAgICAgICBvbk1vdmVUb1RyZWVDbGljaz17dGhpcy5vbk1vdmVUb1RyZWVDbGlja31cbiAgICAgICAgICAgIG9uTW92ZVRvR3JpZENsaWNrPXt0aGlzLm9uTW92ZVRvR3JpZENsaWNrfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPEdyaWRcbiAgICAgICAgICAgIGdyaWQ9e21lcmdlZEdyaWR9XG4gICAgICAgICAgICBjb2x1bW5zPXtncmlkQ29sdW1uc31cbiAgICAgICAgICAgIHJvd1NlbGVjdFxuICAgICAgICAgICAgbXVsdGlTZWxlY3RcbiAgICAgICAgICAgIGZpbHRlcmluZ1xuICAgICAgICAgICAgcm93U2VsZWN0Q2hlY2tib3hDb2x1bW5cbiAgICAgICAgICAgIGdyaWRIZWFkZXI9ezxQcmltaXRpdmUuU3VidGl0bGU+e21lcmdlZFRyYW5zbGF0aW9ucy5ncmlkVGl0bGV9PC9QcmltaXRpdmUuU3VidGl0bGU+fVxuICAgICAgICAgIC8+XG5cbiAgICAgICAgPC9Db250YWluZXI+XG4gICAgICAgIHt0aGlzLnN0YXRlLnNob3dEZWxldGVDb25maXJtYXRpb24gJiZcbiAgICAgICAgPENvbmZpcm1EaWFsb2dcbiAgICAgICAgICB0cmFuc2xhdGlvbnM9e21lcmdlZFRyYW5zbGF0aW9ucy5kZWxldGVDb25maXJtRGlhbG9nfVxuICAgICAgICAgIGNvbmZpcm1DYWxsYmFjaz17dGhpcy5kZWxldGVQYXJlbnR9XG4gICAgICAgICAgY2FuY2VsQ2FsbGJhY2s9e3RoaXMuY2xvc2VEZWxldGVDb25maXJtYXRpb25EaWFsb2d9XG4gICAgICAgIC8+XG4gICAgICAgIH1cbiAgICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gICAgKTtcbiAgfVxufVxuIl19