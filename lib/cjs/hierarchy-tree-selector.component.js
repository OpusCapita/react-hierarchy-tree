'use strict';

exports.__esModule = true;
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _dec, _class, _class2, _temp;

var _templateObject = _taggedTemplateLiteralLoose(['\n  height: 100%;\n  &&& {\n    padding: 0;\n  }\n  .oc-datagrid-main-container {\n    border: 1px solid ', ';\n  }\n'], ['\n  height: 100%;\n  &&& {\n    padding: 0;\n  }\n  .oc-datagrid-main-container {\n    border: 1px solid ', ';\n  }\n']),
    _templateObject2 = _taggedTemplateLiteralLoose(['\n  display: flex;\n  min-height: 300px;\n  > div {\n    width: 50%;\n    flex: 1 1 100%;\n  }\n'], ['\n  display: flex;\n  min-height: 300px;\n  > div {\n    width: 50%;\n    flex: 1 1 100%;\n  }\n']),
    _templateObject3 = _taggedTemplateLiteralLoose(['\n  height:100%;\n  .oc-scrollbar-container {\n    height: calc(100% - ', ');\n    padding: ', ';\n  }\n  .title-container {\n    min-height: ', ';\n  }\n  .oc-react-tree {\n    height: 100%;\n    .rc-tree-iconEle.rc-tree-icon__customize {\n        display:none;\n    }\n  }\n'], ['\n  height:100%;\n  .oc-scrollbar-container {\n    height: calc(100% - ', ');\n    padding: ', ';\n  }\n  .title-container {\n    min-height: ', ';\n  }\n  .oc-react-tree {\n    height: 100%;\n    .rc-tree-iconEle.rc-tree-icon__customize {\n        display:none;\n    }\n  }\n']),
    _templateObject4 = _taggedTemplateLiteralLoose(['\n  display: flex;\n  justify-content: center;\n  font-weight: bold;\n'], ['\n  display: flex;\n  justify-content: center;\n  font-weight: bold;\n']);

var _reactTreeComponent = require('@opuscapita/react-tree-component');

var _reactTreeComponent2 = _interopRequireDefault(_reactTreeComponent);

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
            title: mergedTranslations.treeTitle,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIkFDVElPTl9CQVJfQ09OVEFJTkVSX0hFSUdIVCIsIlRSRUVfQUNUSU9OUyIsIkFERF9DSElMRFJFTiIsIk1PVkVfTEVBRiIsIlJFTkFNRV9QQVJFTlQiLCJERUxFVEVfUEFSRU5UIiwiR3JpZCIsIkRhdGFncmlkIiwicHJvcHMiLCJ0aGVtZSIsImNvbG9ycyIsImNvbG9yTGlnaHRHcmF5IiwiQ29udGFpbmVyIiwic3R5bGVkIiwiZGl2IiwiVHJlZUNvbnRhaW5lciIsImd1dHRlcldpZHRoIiwiTm9JdGVtc1RleHQiLCJwIiwibWFwRGlzcGF0Y2hUb1Byb3BzIiwic2V0RGF0YSIsIkRhdGFncmlkQWN0aW9ucyIsImNsZWFyU2VsZWN0ZWRJdGVtcyIsIm1hcFN0YXRlVG9Qcm9wcyIsInN0YXRlIiwiZ3JpZElkIiwiZ3JpZCIsImlkIiwic2VsZWN0ZWRHcmlkSXRlbXMiLCJkYXRhZ3JpZCIsImdldEluIiwiZ3JpZERhdGEiLCJIaWVyYXJjaHlUcmVlU2VsZWN0b3IiLCJvblRyZWVJdGVtU2VsZWN0Iiwic2VsZWN0ZWRLZXlzIiwib25TZWxlY3QiLCJzZXRTdGF0ZSIsIm9uRGVsZXRlQ2xpY2siLCJzaG93RGVsZXRlQ29uZmlybWF0aW9uIiwib25BZGROZXdDbGljayIsImRhdGEiLCJjYWxsYmFjayIsIm9uQ2hhbmdlIiwidHJlZURhdGEiLCJpZEtleSIsIm5ld0l0ZW1zIiwic2xpY2UiLCJwdXNoIiwiYWN0aW9uIiwidHlwZSIsImdldFVwZGF0ZWRUcmVlIiwicGFyZW50IiwiZ2V0VHJlZUl0ZW0iLCJleHBhbmRQYXJlbnQiLCJvbk1vdmVUb0dyaWRDbGljayIsInNlbGVjdGVkS2V5IiwibmV4dFNlbGVjdGVkS2V5IiwiZ2V0QWRqYWNlbnRJdGVtIiwibmV3R3JpZEl0ZW1zIiwic2V0RGF0YVRvR3JpZCIsIm9uT3JkZXJDbGljayIsIml0ZW1zIiwib25Nb3ZlVG9UcmVlQ2xpY2siLCJzZWxlY3RlZElkIiwiZmlsdGVyIiwiaW5jbHVkZXMiLCJpIiwiZ2V0IiwidG9KUyIsIml0ZW0iLCJvbklucHV0Q2hhbmdlIiwidmFsdWUiLCJvbkV4cGFuZCIsImlkcyIsImV4cGFuZGVkS2V5cyIsImFycmF5IiwiZm91bmQiLCJjaGlsZEtleSIsInZhbHVlS2V5IiwicmVtb3ZlQWN0aW9ucyIsInJvb3RJdGVtIiwiZmluZCIsImxlbmd0aCIsImdldEFsbExlYWZzIiwiZGVzZWxlY3RJdGVtIiwiY2hpbGQiLCJmaWx0ZXJlZENoaWxkcmVuIiwiY2hpbGRJdGVtIiwiY29uY2F0IiwiVHlwZUVycm9yIiwiYWxyZWFkeUZvdW5kIiwibGVhZnMiLCJyZXR1cm5QYXJlbnQiLCJmb3JFYWNoIiwiZ2V0QWRqYWNlbnRJdGVtSWQiLCJwYXJlbnRBcnIiLCJBcnJheSIsImlzQXJyYXkiLCJpbmRleCIsImZpbmRJbmRleCIsImFkamFjZW50SXRlbSIsInNldE5ld0l0ZW1zIiwiZ3JpZENvbHVtbnMiLCJwYXJlbnRJZCIsImV4cGFuZGVkSWQiLCJuZXdFeHBhbmRlZEtleXMiLCJjbG9zZURlbGV0ZUNvbmZpcm1hdGlvbkRpYWxvZyIsImRlbGV0ZVBhcmVudCIsInJlbmRlckhlYWRlclJpZ2h0IiwidHJhbnNsYXRpb25zIiwicmVuZGVyIiwiY2xhc3NOYW1lIiwibWVyZ2VkR3JpZCIsIk9iamVjdCIsImFzc2lnbiIsImRlZmF1bHRTaG93RmlsdGVyaW5nUm93IiwibWVyZ2VkVHJhbnNsYXRpb25zIiwiZGVmYXVsdFRyYW5zbGF0aW9ucyIsInRyZWVUaXRsZSIsIm5vVHJlZUl0ZW1zIiwiZ3JpZFRpdGxlIiwiZGVsZXRlQ29uZmlybURpYWxvZyIsIlJlYWN0IiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyIsInVuZGVmaW5lZCIsImRlZmF1bHRFeHBhbmRBbGwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBR0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFIQTs7O0FBS0EsSUFBTUEsOEJBQThCLE1BQXBDO0FBQ0EsSUFBTUMsZUFBZTtBQUNuQkMsZ0JBQWMsY0FESztBQUVuQkMsYUFBVyxXQUZRO0FBR25CQyxpQkFBZSxlQUhJO0FBSW5CQyxpQkFBZTtBQUpJLENBQXJCOztBQU9BLElBQU1DLE9BQU8sZ0NBQU9DLG1CQUFQLENBQVAsa0JBTWtCO0FBQUEsU0FBU0MsTUFBTUMsS0FBTixDQUFZQyxNQUFaLENBQW1CQyxjQUE1QjtBQUFBLENBTmxCLENBQU47O0FBVUEsSUFBTUMsWUFBWUMsMkJBQU9DLEdBQW5CLGtCQUFOOztBQVNBLElBQU1DLGdCQUFnQkYsMkJBQU9DLEdBQXZCLG1CQUdvQmQsMkJBSHBCLEVBSVM7QUFBQSxTQUFTUSxNQUFNQyxLQUFOLENBQVlPLFdBQXJCO0FBQUEsQ0FKVCxFQU9ZaEIsMkJBUFosQ0FBTjs7QUFpQkEsSUFBTWlCLGNBQWNKLDJCQUFPSyxDQUFyQixrQkFBTjs7QUFNQSxJQUFNQyxxQkFBcUI7QUFDekJDLFdBQVNDLDJCQUFnQkQsT0FEQTtBQUV6QkUsc0JBQW9CRCwyQkFBZ0JDO0FBRlgsQ0FBM0I7O0FBS0EsSUFBTUMsa0JBQWtCLFNBQWxCQSxlQUFrQixDQUFDQyxLQUFELEVBQVFoQixLQUFSLEVBQWtCO0FBQ3hDLE1BQU1pQixTQUFTakIsTUFBTWtCLElBQU4sQ0FBV0MsRUFBMUI7QUFDQSxTQUFPO0FBQ0xDLHVCQUFtQkosTUFBTUssUUFBTixDQUFlQyxLQUFmLENBQXFCLENBQUNMLE1BQUQsRUFBUyxlQUFULENBQXJCLEVBQWdELHNCQUFoRCxDQURkO0FBRUxNLGNBQVVQLE1BQU1LLFFBQU4sQ0FBZUMsS0FBZixDQUFxQixDQUFDTCxNQUFELEVBQVMsU0FBVCxDQUFyQixFQUEwQyxzQkFBMUM7QUFGTCxHQUFQO0FBSUQsQ0FORDs7SUFTcUJPLHFCLFdBRHBCLHlCQUFRVCxlQUFSLEVBQXlCSixrQkFBekIsQzs7O0FBb0NDLGlDQUFZWCxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsaURBQ2pCLGdDQUFNQSxLQUFOLENBRGlCOztBQUFBLFVBY25CeUIsZ0JBZG1CLEdBY0EsVUFBQ0MsWUFBRCxFQUFrQjtBQUFBLFVBQzNCQyxRQUQyQixHQUNkLE1BQUszQixLQURTLENBQzNCMkIsUUFEMkI7O0FBRW5DLFlBQUtDLFFBQUwsQ0FBYyxFQUFFRiwwQkFBRixFQUFkLEVBQWdDLFlBQU07QUFDcEMsWUFBSUMsUUFBSixFQUFjQSxTQUFTRCxZQUFUO0FBQ2YsT0FGRDtBQUdELEtBbkJrQjs7QUFBQSxVQXdCbkJHLGFBeEJtQixHQXdCSCxZQUFNO0FBQ3BCLFlBQUtELFFBQUwsQ0FBYyxFQUFFRSx3QkFBd0IsSUFBMUIsRUFBZDtBQUNELEtBMUJrQjs7QUFBQSxVQW1DbkJDLGFBbkNtQixHQW1DSCxVQUFDQyxJQUFELEVBQU9DLFFBQVAsRUFBb0I7QUFBQSx3QkFDSSxNQUFLakMsS0FEVDtBQUFBLFVBQzFCa0MsUUFEMEIsZUFDMUJBLFFBRDBCO0FBQUEsVUFDaEJDLFFBRGdCLGVBQ2hCQSxRQURnQjtBQUFBLFVBQ05DLEtBRE0sZUFDTkEsS0FETTs7QUFFbEMsVUFBSUMsV0FBV0YsU0FBU0csS0FBVCxFQUFmOztBQUVBO0FBQ0E7QUFDQSxVQUFJLENBQUMsTUFBS3RCLEtBQUwsQ0FBV1UsWUFBWCxDQUF3QixDQUF4QixDQUFMLEVBQWlDO0FBQy9CVyxpQkFBU0UsSUFBVCxDQUFjUCxJQUFkO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsWUFBTVEsU0FBUztBQUNiQyxnQkFBTWhELGFBQWFDLFlBRE47QUFFYnNDO0FBRmEsU0FBZjtBQUlBSyxtQkFBVyxNQUFLSyxjQUFMLENBQW9CLE1BQUsxQixLQUFMLENBQVdVLFlBQVgsQ0FBd0IsQ0FBeEIsQ0FBcEIsRUFBZ0RTLFFBQWhELEVBQTBESyxNQUExRCxDQUFYO0FBQ0Q7QUFDRCxZQUFLWixRQUFMLENBQWMsRUFBRUYsY0FBYyxDQUFDTSxLQUFLSSxLQUFMLENBQUQsQ0FBaEIsRUFBZCxFQUErQyxZQUFNO0FBQ25EO0FBQ0EsWUFBTU8sU0FBUyxNQUFLQyxXQUFMLENBQWlCWixLQUFLSSxLQUFMLENBQWpCLEVBQThCRCxRQUE5QixFQUF3QyxJQUF4QyxLQUFpRCxFQUFoRTtBQUNBLGNBQUtVLFlBQUwsQ0FBa0JGLE9BQU9QLEtBQVAsQ0FBbEI7O0FBRUEsWUFBSUYsUUFBSixFQUFjQSxTQUFTRyxRQUFUO0FBQ2RKO0FBQ0QsT0FQRDtBQVFELEtBMURrQjs7QUFBQSxVQWdFbkJhLGlCQWhFbUIsR0FnRUMsWUFBTTtBQUFBLHlCQUNPLE1BQUs5QyxLQURaO0FBQUEsVUFDaEJtQyxRQURnQixnQkFDaEJBLFFBRGdCO0FBQUEsVUFDTkQsUUFETSxnQkFDTkEsUUFETTs7QUFFeEIsVUFBTWEsY0FBYyxNQUFLL0IsS0FBTCxDQUFXVSxZQUFYLENBQXdCLENBQXhCLENBQXBCO0FBQ0EsVUFBTWMsU0FBUztBQUNiQyxjQUFNaEQsYUFBYUUsU0FETjtBQUVicUMsY0FBTSxNQUFLaEIsS0FBTCxDQUFXVSxZQUFYLENBQXdCLENBQXhCO0FBRk8sT0FBZjtBQUlBLFVBQU1zQixrQkFBa0IsTUFBS0MsZUFBTCxDQUFxQkYsV0FBckIsQ0FBeEI7QUFDQSxVQUFNRyxlQUFlLHVCQUFPLENBQUMsTUFBS04sV0FBTCxDQUFpQkcsV0FBakIsQ0FBRCxDQUFQLENBQXJCO0FBQ0EsVUFBTVYsV0FBVyxNQUFLSyxjQUFMLENBQW9CSyxXQUFwQixFQUFpQ1osUUFBakMsRUFBMkNLLE1BQTNDLENBQWpCOztBQUVBLFlBQUtXLGFBQUwsQ0FBbUJELFlBQW5CO0FBQ0EsVUFBSWhCLFFBQUosRUFBY0EsU0FBU0csUUFBVDtBQUNkLFlBQUtULFFBQUwsQ0FBYztBQUNaRixzQkFBYyxDQUFDc0IsZUFBRDtBQURGLE9BQWQ7QUFHRCxLQWhGa0I7O0FBQUEsVUFzRm5CSSxZQXRGbUIsR0FzRkosVUFBQ0MsS0FBRCxFQUFXO0FBQ3hCLFlBQUtyRCxLQUFMLENBQVdrQyxRQUFYLENBQW9CbUIsS0FBcEI7QUFDRCxLQXhGa0I7O0FBQUEsVUE2Rm5CQyxpQkE3Rm1CLEdBNkZDLFlBQU07QUFBQSx5QkFHcEIsTUFBS3RELEtBSGU7QUFBQSxVQUV0QmtDLFFBRnNCLGdCQUV0QkEsUUFGc0I7QUFBQSxVQUVaZCxpQkFGWSxnQkFFWkEsaUJBRlk7QUFBQSxVQUVPRyxRQUZQLGdCQUVPQSxRQUZQO0FBQUEsVUFFaUJZLFFBRmpCLGdCQUVpQkEsUUFGakI7QUFBQSxVQUUyQkMsS0FGM0IsZ0JBRTJCQSxLQUYzQjs7QUFJeEIsVUFBTW1CLGFBQWEsTUFBS3ZDLEtBQUwsQ0FBV1UsWUFBWCxDQUF3QixDQUF4QixDQUFuQjs7QUFFQSxVQUFNYyxTQUFTO0FBQ2JDLGNBQU1oRCxhQUFhQyxZQUROO0FBRWJzQyxjQUFNVCxTQUNIaUMsTUFERyxDQUNJO0FBQUEsaUJBQUtwQyxrQkFBa0JxQyxRQUFsQixDQUEyQkMsRUFBRUMsR0FBRixDQUFNdkIsS0FBTixDQUEzQixDQUFMO0FBQUEsU0FESixFQUVId0IsSUFGRztBQUZPLE9BQWY7QUFNQSxVQUFNdkIsV0FBVyxNQUFLSyxjQUFMLENBQW9CYSxVQUFwQixFQUFnQ3BCLFFBQWhDLEVBQTBDSyxNQUExQyxDQUFqQjtBQUNBLFVBQU1VLGVBQWUzQixTQUFTaUMsTUFBVCxDQUFnQjtBQUFBLGVBQVEsQ0FBQ3BDLGtCQUFrQnFDLFFBQWxCLENBQTJCSSxLQUFLRixHQUFMLENBQVN2QixLQUFULENBQTNCLENBQVQ7QUFBQSxPQUFoQixDQUFyQjs7QUFFQSxZQUFLUyxZQUFMLENBQWtCVSxVQUFsQixFQUE4QixJQUE5QjtBQUNBLFlBQUtKLGFBQUwsQ0FBbUJELFlBQW5CLEVBQWlDLElBQWpDO0FBQ0EsVUFBSWhCLFFBQUosRUFBY0EsU0FBU0csUUFBVDtBQUNmLEtBL0drQjs7QUFBQSxVQXFIbkJ5QixhQXJIbUIsR0FxSEgsVUFBQ0MsS0FBRCxFQUFXO0FBQUEseUJBQ00sTUFBSy9ELEtBRFg7QUFBQSxVQUNqQm1DLFFBRGlCLGdCQUNqQkEsUUFEaUI7QUFBQSxVQUNQRCxRQURPLGdCQUNQQSxRQURPOztBQUV6QixVQUFNTSxTQUFTO0FBQ2JDLGNBQU1oRCxhQUFhRyxhQUROO0FBRWJvQyxjQUFNK0I7QUFGTyxPQUFmO0FBSUEsVUFBTTFCLFdBQVcsTUFBS0ssY0FBTCxDQUFvQixNQUFLMUIsS0FBTCxDQUFXVSxZQUFYLENBQXdCLENBQXhCLENBQXBCLEVBQWdEUyxRQUFoRCxFQUEwREssTUFBMUQsQ0FBakI7QUFDQSxVQUFJTixRQUFKLEVBQWNBLFNBQVNHLFFBQVQ7QUFDZixLQTdIa0I7O0FBQUEsVUFtSW5CMkIsUUFuSW1CLEdBbUlSLFVBQUNDLEdBQUQsRUFBUztBQUNsQixZQUFLckMsUUFBTCxDQUFjO0FBQ1pzQyxzQkFBY0Q7QUFERixPQUFkO0FBR0QsS0F2SWtCOztBQUFBLFVBaUpuQnZCLGNBakptQixHQWlKRixVQUFDdkIsRUFBRCxFQUE2QztBQUFBLFVBQXhDZ0QsS0FBd0MsdUVBQWhDLE1BQUtuRSxLQUFMLENBQVdtQyxRQUFxQjtBQUFBLFVBQVhLLE1BQVc7O0FBQzVELFVBQUk0QixRQUFRLEtBQVo7QUFENEQseUJBRXRCLE1BQUtwRSxLQUZpQjtBQUFBLFVBRXBEb0MsS0FGb0QsZ0JBRXBEQSxLQUZvRDtBQUFBLFVBRTdDaUMsUUFGNkMsZ0JBRTdDQSxRQUY2QztBQUFBLFVBRW5DQyxRQUZtQyxnQkFFbkNBLFFBRm1DOztBQUc1RCxVQUFNakMsV0FBVzhCLE1BQU03QixLQUFOLEVBQWpCO0FBQ0EsVUFBTWlDLGdCQUFnQixDQUFDOUUsYUFBYUUsU0FBZCxFQUF5QkYsYUFBYUksYUFBdEMsQ0FBdEI7O0FBRUE7QUFDQSxVQUFJMkMsT0FBT0MsSUFBUCxLQUFnQmhELGFBQWFJLGFBQWpDLEVBQWdEO0FBQzlDLFlBQU0yRSxXQUFXTCxNQUFNTSxJQUFOLENBQVc7QUFBQSxpQkFBUVosS0FBS3pCLEtBQUwsTUFBZ0JqQixFQUF4QjtBQUFBLFNBQVgsQ0FBakI7QUFDQSxZQUFJcUQsUUFBSixFQUFjO0FBQ1osY0FBSUEsU0FBU0gsUUFBVCxFQUFtQkssTUFBdkIsRUFBK0I7QUFDN0Isa0JBQUt2QixhQUFMLENBQW1CLHVCQUFPLE1BQUt3QixXQUFMLENBQWlCSCxTQUFTSCxRQUFULENBQWpCLENBQVAsQ0FBbkI7QUFDQSxrQkFBS08sWUFBTDtBQUNEO0FBQ0QsaUJBQU92QyxTQUFTbUIsTUFBVCxDQUFnQjtBQUFBLG1CQUFRSyxLQUFLekIsS0FBTCxNQUFnQmpCLEVBQXhCO0FBQUEsV0FBaEIsQ0FBUDtBQUNEO0FBQ0Y7O0FBRUQsV0FBSyxJQUFJdUMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJckIsU0FBU3FDLE1BQTdCLEVBQXFDaEIsS0FBSyxDQUExQyxFQUE2QztBQUMzQyxZQUFNRyxPQUFPeEIsU0FBU3FCLENBQVQsQ0FBYjtBQUNBLFlBQUlhLGNBQWNkLFFBQWQsQ0FBdUJqQixPQUFPQyxJQUE5QixLQUF1Q29CLEtBQUtRLFFBQUwsQ0FBdkMsSUFBeUQsQ0FBQ0QsS0FBOUQsRUFBcUU7QUFDbkVBLGtCQUFRLENBQUMsQ0FBQ1AsS0FBS1EsUUFBTCxFQUFlSSxJQUFmLENBQW9CO0FBQUEsbUJBQVNJLE1BQU16QyxLQUFOLE1BQWlCakIsRUFBMUI7QUFBQSxXQUFwQixDQUFWO0FBQ0EsY0FBSWlELEtBQUosRUFBVztBQUNUO0FBQ0EsZ0JBQUk1QixPQUFPQyxJQUFQLEtBQWdCaEQsYUFBYUUsU0FBakMsRUFBNEM7QUFDMUNrRSxtQkFBS1EsUUFBTCxJQUFpQlIsS0FBS1EsUUFBTCxFQUFlYixNQUFmLENBQXNCO0FBQUEsdUJBQVNxQixNQUFNekMsS0FBTixNQUFpQmpCLEVBQTFCO0FBQUEsZUFBdEIsQ0FBakI7QUFDQSxvQkFBS3lELFlBQUw7QUFDRDtBQUNELGdCQUFJcEMsT0FBT0MsSUFBUCxLQUFnQmhELGFBQWFJLGFBQWpDLEVBQWdEO0FBQzlDO0FBQ0E7QUFDQSxrQkFBTWlGLG1CQUFtQmpCLEtBQUtRLFFBQUwsRUFBZWIsTUFBZixDQUFzQjtBQUFBLHVCQUFhdUIsVUFBVTNDLEtBQVYsTUFBcUJqQixFQUFsQztBQUFBLGVBQXRCLENBQXpCO0FBQ0Esb0JBQUtnQyxhQUFMLENBQW1CLHVCQUFPLE1BQUt3QixXQUFMLENBQWlCRyxnQkFBakIsQ0FBUCxDQUFuQjtBQUNBLG9CQUFLRixZQUFMO0FBQ0FmLG1CQUFLUSxRQUFMLElBQWlCUixLQUFLUSxRQUFMLEVBQWViLE1BQWYsQ0FBc0I7QUFBQSx1QkFBYXVCLFVBQVUzQyxLQUFWLE1BQXFCakIsRUFBbEM7QUFBQSxlQUF0QixDQUFqQjtBQUNEO0FBQ0Q7QUFDRDtBQUNGOztBQUVELFlBQUkwQyxLQUFLekIsS0FBTCxNQUFnQmpCLEVBQWhCLElBQXNCLENBQUNpRCxLQUEzQixFQUFrQztBQUNoQ0Esa0JBQVEsSUFBUjtBQUNBLGtCQUFRNUIsT0FBT0MsSUFBZjtBQUNFLGlCQUFLaEQsYUFBYUMsWUFBbEI7QUFDRW1FLG1CQUFLUSxRQUFMLElBQWlCLENBQUNSLEtBQUtRLFFBQUwsS0FBa0IsRUFBbkIsRUFBdUJXLE1BQXZCLENBQThCeEMsT0FBT1IsSUFBckMsQ0FBakI7QUFDQTtBQUNGLGlCQUFLdkMsYUFBYUcsYUFBbEI7QUFDRWlFLG1CQUFLUyxRQUFMLElBQWlCOUIsT0FBT1IsSUFBeEI7QUFDQTtBQUNGO0FBQ0Usb0JBQU0sSUFBSWlELFNBQUosQ0FBYywwQkFBZCxDQUFOO0FBUko7QUFVQTtBQUNEO0FBQ0QsWUFBSXBCLEtBQUtRLFFBQUwsS0FBa0IsQ0FBQ0QsS0FBdkIsRUFBOEJBLFFBQVEsTUFBSzFCLGNBQUwsQ0FBb0J2QixFQUFwQixFQUF3QjBDLEtBQUtRLFFBQUwsQ0FBeEIsRUFBd0M3QixNQUF4QyxDQUFSO0FBQy9COztBQUVELFVBQUksQ0FBQzRCLEtBQUwsRUFBWSxPQUFPLEtBQVA7QUFDWixhQUFPL0IsUUFBUDtBQUNELEtBNU1rQjs7QUFBQSxVQW1ObkJzQyxXQW5ObUIsR0FtTkwsVUFBQ1IsS0FBRCxFQUE4QjtBQUFBLFVBQXRCZSxZQUFzQix1RUFBUCxFQUFPO0FBQUEsVUFDbENiLFFBRGtDLEdBQ3JCLE1BQUtyRSxLQURnQixDQUNsQ3FFLFFBRGtDOztBQUUxQyxVQUFJYyxRQUFRRCxZQUFaOztBQUVBLFdBQUssSUFBSXhCLElBQUksQ0FBYixFQUFnQkEsSUFBSVMsTUFBTU8sTUFBMUIsRUFBa0NoQixLQUFLLENBQXZDLEVBQTBDO0FBQ3hDLFlBQU1HLE9BQU9NLE1BQU1ULENBQU4sQ0FBYjtBQUNBLFlBQUlHLEtBQUtRLFFBQUwsQ0FBSixFQUFvQjtBQUNsQmMsa0JBQVEsTUFBS1IsV0FBTCxDQUFpQmQsS0FBS1EsUUFBTCxDQUFqQixFQUFpQ2EsWUFBakMsQ0FBUjtBQUNEO0FBQ0QsWUFBSSxDQUFDckIsS0FBS1EsUUFBTCxDQUFMLEVBQXFCYyxNQUFNNUMsSUFBTixDQUFXc0IsSUFBWDtBQUN0QjtBQUNELGFBQU9zQixLQUFQO0FBQ0QsS0EvTmtCOztBQUFBLFVBeU9uQnZDLFdBek9tQixHQXlPTCxVQUFDekIsRUFBRCxFQUEwRTtBQUFBLFVBQXJFZ0QsS0FBcUUsdUVBQTdELE1BQUtuRSxLQUFMLENBQVdtQyxRQUFrRDtBQUFBLFVBQXhDaUQsWUFBd0MsdUVBQXpCLEtBQXlCO0FBQUEsVUFBbEJ6QyxNQUFrQix1RUFBVCxJQUFTO0FBQUEseUJBQzFELE1BQUszQyxLQURxRDtBQUFBLFVBQzlFcUUsUUFEOEUsZ0JBQzlFQSxRQUQ4RTtBQUFBLFVBQ3BFakMsS0FEb0UsZ0JBQ3BFQSxLQURvRTs7QUFFdEYsVUFBSWdDLFFBQVFELE1BQU1NLElBQU4sQ0FBVztBQUFBLGVBQVFaLEtBQUt6QixLQUFMLE1BQWdCakIsRUFBeEI7QUFBQSxPQUFYLENBQVo7O0FBRUEsVUFBSWlELFNBQVNnQixZQUFiLEVBQTJCaEIsUUFBUXpCLE1BQVI7O0FBRTNCLFVBQUksQ0FBQ3lCLEtBQUwsRUFBWTtBQUNWRCxjQUFNa0IsT0FBTixDQUFjLFVBQUN4QixJQUFELEVBQVU7QUFDdEIsY0FBSUEsS0FBS1EsUUFBTCxLQUFrQixDQUFDRCxLQUF2QixFQUE4QjtBQUM1QkEsb0JBQVEsTUFBS3hCLFdBQUwsQ0FBaUJ6QixFQUFqQixFQUFxQjBDLEtBQUtRLFFBQUwsQ0FBckIsRUFBcUNlLFlBQXJDLEVBQW1EdkIsSUFBbkQsQ0FBUjtBQUNEO0FBQ0YsU0FKRDtBQUtEO0FBQ0QsYUFBT08sS0FBUDtBQUNELEtBdlBrQjs7QUFBQSxVQStQbkJuQixlQS9QbUIsR0ErUEQsVUFBQzlCLEVBQUQsRUFBUTtBQUN4QixVQUFJLENBQUNBLEVBQUwsRUFBUyxPQUFPLElBQVA7QUFEZSx5QkFFYyxNQUFLbkIsS0FGbkI7QUFBQSxVQUVoQnFFLFFBRmdCLGdCQUVoQkEsUUFGZ0I7QUFBQSxVQUVOakMsS0FGTSxnQkFFTkEsS0FGTTtBQUFBLFVBRUNELFFBRkQsZ0JBRUNBLFFBRkQ7OztBQUl4QixVQUFNbUQsb0JBQW9CLFNBQXBCQSxpQkFBb0IsQ0FBQzNDLE1BQUQsRUFBWTtBQUNwQyxZQUFNNEMsWUFBWUMsTUFBTUMsT0FBTixDQUFjOUMsTUFBZCxJQUF3QkEsTUFBeEIsR0FBaUNBLE9BQU8wQixRQUFQLENBQW5EO0FBQ0EsWUFBTXFCLFFBQVFILFVBQVVJLFNBQVYsQ0FBb0I7QUFBQSxpQkFBU2QsTUFBTXpDLEtBQU4sTUFBaUJqQixFQUExQjtBQUFBLFNBQXBCLENBQWQ7QUFDQSxZQUFJeUUsZUFBZUwsVUFBVUcsUUFBUSxDQUFsQixDQUFuQjtBQUNBLFlBQUksQ0FBQ0UsWUFBTCxFQUFtQkEsZUFBZUwsVUFBVUcsUUFBUSxDQUFsQixDQUFmO0FBQ25CLFlBQUksQ0FBQ0UsWUFBRCxJQUFpQixDQUFDSixNQUFNQyxPQUFOLENBQWM5QyxNQUFkLENBQXRCLEVBQTZDaUQsZUFBZWpELE1BQWY7QUFDN0MsWUFBSSxDQUFDaUQsWUFBTCxFQUFtQixPQUFPLElBQVA7O0FBRW5CLGVBQU9BLGFBQWF4RCxLQUFiLENBQVA7QUFDRCxPQVREOztBQVdBLFVBQU1PLFNBQVMsTUFBS0MsV0FBTCxDQUFpQnpCLEVBQWpCLEVBQXFCLE1BQUtuQixLQUFMLENBQVdtQyxRQUFoQyxFQUEwQyxJQUExQyxDQUFmO0FBQ0EsYUFBT1EsU0FBUzJDLGtCQUFrQjNDLE1BQWxCLENBQVQsR0FBcUMyQyxrQkFBa0JuRCxRQUFsQixDQUE1QztBQUNELEtBaFJrQjs7QUFBQSxVQXVSbkJnQixhQXZSbUIsR0F1UkgsVUFBQ0UsS0FBRCxFQUFnQztBQUFBLFVBQXhCd0MsV0FBd0IsdUVBQVYsS0FBVTs7QUFDOUMsVUFBSTdELE9BQU8sc0JBQVg7QUFEOEMseUJBRU4sTUFBS2hDLEtBRkM7QUFBQSxVQUV0Q2tCLElBRnNDLGdCQUV0Q0EsSUFGc0M7QUFBQSxVQUVoQzRFLFdBRmdDLGdCQUVoQ0EsV0FGZ0M7QUFBQSxVQUVuQnZFLFFBRm1CLGdCQUVuQkEsUUFGbUI7O0FBRzlDLFVBQUksQ0FBQ3NFLFdBQUwsRUFBa0I3RCxPQUFPVCxTQUFTZSxLQUFULEVBQVA7QUFDbEIsVUFBTVksZUFBZWxCLEtBQUtnRCxNQUFMLENBQVkzQixLQUFaLENBQXJCOztBQUVBLFlBQUtyRCxLQUFMLENBQVdZLE9BQVgsQ0FBbUJNLElBQW5CLEVBQXlCNEUsV0FBekIsRUFBc0M1QyxZQUF0QztBQUNBLFlBQUtsRCxLQUFMLENBQVdjLGtCQUFYLENBQThCSSxJQUE5QjtBQUNELEtBL1JrQjs7QUFBQSxVQXFTbkIyQixZQXJTbUIsR0FxU0osVUFBQ2tELFFBQUQsRUFBYztBQUMzQixVQUFJQSxZQUFZLENBQUMsTUFBSy9FLEtBQUwsQ0FBV2tELFlBQVgsQ0FBd0JPLElBQXhCLENBQTZCO0FBQUEsZUFBY3VCLGVBQWVELFFBQTdCO0FBQUEsT0FBN0IsQ0FBakIsRUFBc0Y7QUFDcEYsWUFBTUUsa0JBQWtCLE1BQUtqRixLQUFMLENBQVdrRCxZQUFYLENBQXdCNUIsS0FBeEIsRUFBeEI7QUFDQTJELHdCQUFnQjFELElBQWhCLENBQXFCd0QsUUFBckI7QUFDQSxjQUFLbkUsUUFBTCxDQUFjLEVBQUVzQyxjQUFjK0IsZUFBaEIsRUFBZDtBQUNEO0FBQ0YsS0EzU2tCOztBQUFBLFVBZ1RuQkMsNkJBaFRtQixHQWdUYSxZQUFNO0FBQ3BDLFlBQUt0RSxRQUFMLENBQWMsRUFBRUUsd0JBQXdCLEtBQTFCLEVBQWQ7QUFDRCxLQWxUa0I7O0FBQUEsVUF1VG5CcUUsWUF2VG1CLEdBdVRKLFlBQU07QUFBQSx5QkFDWSxNQUFLbkcsS0FEakI7QUFBQSxVQUNYa0MsUUFEVyxnQkFDWEEsUUFEVztBQUFBLFVBQ0RDLFFBREMsZ0JBQ0RBLFFBREM7O0FBRW5CLFVBQU1ZLGNBQWMsTUFBSy9CLEtBQUwsQ0FBV1UsWUFBWCxDQUF3QixDQUF4QixDQUFwQjtBQUNBLFVBQU1jLFNBQVM7QUFDYkMsY0FBTWhELGFBQWFJO0FBRE4sT0FBZjtBQUdBLFVBQU1tRCxrQkFBa0IsTUFBS0MsZUFBTCxDQUFxQkYsV0FBckIsQ0FBeEI7QUFDQSxVQUFNVixXQUFXLE1BQUtLLGNBQUwsQ0FBb0JLLFdBQXBCLEVBQWlDWixRQUFqQyxFQUEyQ0ssTUFBM0MsQ0FBakI7QUFDQSxVQUFJTixRQUFKLEVBQWNBLFNBQVNHLFFBQVQ7QUFDZCxZQUFLVCxRQUFMLENBQWM7QUFDWkYsc0JBQWMsQ0FBQ3NCLGVBQUQsQ0FERjtBQUVabEIsZ0NBQXdCO0FBRlosT0FBZDtBQUlELEtBcFVrQjs7QUFBQSxVQXlVbkI4QyxZQXpVbUIsR0F5VUosWUFBTTtBQUNuQixZQUFLaEQsUUFBTCxDQUFjLEVBQUVGLGNBQWMsRUFBaEIsRUFBZDtBQUNELEtBM1VrQjs7QUFBQSxVQTZVbkIwRSxpQkE3VW1CLEdBNlVDO0FBQUEsYUFDbEIsOEJBQUMseUNBQUQsZUFDTSxNQUFLcEcsS0FEWDtBQUVFLHVCQUFlLE1BQUsrQixhQUZ0QjtBQUdFLHVCQUFlLE1BQUtGLGFBSHRCO0FBSUUsdUJBQWUsTUFBS2lDLGFBSnRCO0FBS0UsMEJBQWtCLE1BQUtsQixXQUFMLENBQWlCLE1BQUs1QixLQUFMLENBQVdVLFlBQVgsQ0FBd0IsQ0FBeEIsQ0FBakIsQ0FMcEI7QUFNRSxnQkFBUWxDLDJCQU5WO0FBT0Usc0JBQWM2RztBQVBoQixTQURrQjtBQUFBLEtBN1VEOztBQUdqQixVQUFLckYsS0FBTCxHQUFhO0FBQ1hVLG9CQUFjLEVBREg7QUFFWEksOEJBQXdCO0FBRmIsS0FBYjtBQUhpQjtBQU9sQjs7QUFHRDs7Ozs7O0FBV0E7Ozs7O0FBUUE7Ozs7Ozs7O0FBK0JBOzs7Ozs7QUFzQkE7Ozs7OztBQVFBOzs7OztBQXVCQTs7Ozs7O0FBY0E7Ozs7OztBQVdBOzs7Ozs7Ozs7QUFvRUE7Ozs7Ozs7QUFtQkE7Ozs7Ozs7Ozs7QUF3QkE7Ozs7Ozs7O0FBeUJBOzs7Ozs7O0FBZUE7Ozs7OztBQVlBOzs7OztBQU9BOzs7OztBQWtCQTs7Ozs7a0NBbUJBd0UsTSxxQkFBUztBQUFBLGlCQUdILEtBQUt0RyxLQUhGO0FBQUEsUUFFTHNFLFFBRkssVUFFTEEsUUFGSztBQUFBLFFBRUtsQyxLQUZMLFVBRUtBLEtBRkw7QUFBQSxRQUVZRCxRQUZaLFVBRVlBLFFBRlo7QUFBQSxRQUVzQmpCLElBRnRCLFVBRXNCQSxJQUZ0QjtBQUFBLFFBRTRCNEUsV0FGNUIsVUFFNEJBLFdBRjVCO0FBQUEsUUFFeUNTLFNBRnpDLFVBRXlDQSxTQUZ6QztBQUFBLFFBRW9ERixZQUZwRCxVQUVvREEsWUFGcEQ7OztBQUtQLFFBQU1HLGFBQWFDLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCeEYsSUFBbEIsRUFBd0IsRUFBRXlGLHlCQUF5QixJQUEzQixFQUF4QixDQUFuQjtBQUNBLFFBQU1DLHFCQUFxQkgsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0JHLGtDQUFsQixFQUF1Q1IsWUFBdkMsQ0FBM0I7O0FBRUEsV0FDRTtBQUFDLHFCQUFELENBQU8sUUFBUDtBQUFBO0FBQ0U7QUFBQyxpQkFBRDtBQUFBLFVBQVcsV0FBV0UsU0FBdEI7QUFDRTtBQUFDLHVCQUFEO0FBQUE7QUFDRyxXQUFDLENBQUNwRSxTQUFTdUMsTUFBWCxJQUFxQiw4QkFBQyw0QkFBRDtBQUNwQixzQkFBVXZDLFFBRFU7QUFFcEIsMkJBQWVDLEtBRks7QUFHcEIsNkJBQWlCa0MsUUFIRztBQUlwQixzQkFBVSxLQUFLN0MsZ0JBSks7QUFLcEIsc0JBQVUsS0FBS3VDLFFBTEs7QUFNcEIsdUJBQVcsS0FOUztBQU9wQiwwQkFBYyxLQUFLaEQsS0FBTCxDQUFXVSxZQVBMO0FBUXBCLDBCQUFjLEtBQUtWLEtBQUwsQ0FBV2tELFlBUkw7QUFTcEIsZ0NBQW9CLEtBQUtkLFlBVEw7QUFVcEIsbUJBQU93RCxtQkFBbUJFLFNBVk47QUFXcEIsNEJBWG9CO0FBWXBCLG9DQVpvQjtBQWFwQiwrQkFib0I7QUFjcEIseUJBQWEsS0FBS1YsaUJBQUwsQ0FBdUJRLGtCQUF2QjtBQWRPLFlBRHhCO0FBaUJHLFdBQUN6RSxTQUFTdUMsTUFBVixJQUFvQjtBQUFDLHVCQUFEO0FBQUE7QUFBY2tDLCtCQUFtQkc7QUFBakM7QUFqQnZCLFNBREY7QUFvQkUsc0NBQUMsNENBQUQsZUFDTSxLQUFLL0csS0FEWDtBQUVFLDRCQUFrQixLQUFLNEMsV0FBTCxDQUFpQixLQUFLNUIsS0FBTCxDQUFXVSxZQUFYLENBQXdCLENBQXhCLENBQWpCLENBRnBCO0FBR0UsNkJBQW1CLEtBQUs0QixpQkFIMUI7QUFJRSw2QkFBbUIsS0FBS1I7QUFKMUIsV0FwQkY7QUEwQkUsc0NBQUMsSUFBRDtBQUNFLGdCQUFNMEQsVUFEUjtBQUVFLG1CQUFTVixXQUZYO0FBR0UsMkJBSEY7QUFJRSx5QkFKRjtBQUtFLHVDQUxGO0FBTUUsc0JBQVk7QUFBQyx3Q0FBRCxDQUFXLFFBQVg7QUFBQTtBQUFxQmMsK0JBQW1CSTtBQUF4QztBQU5kO0FBMUJGLE9BREY7QUFxQ0csV0FBS2hHLEtBQUwsQ0FBV2Msc0JBQVgsSUFDRCw4QkFBQyxpQ0FBRDtBQUNFLHNCQUFjOEUsbUJBQW1CSyxtQkFEbkM7QUFFRSx5QkFBaUIsS0FBS2QsWUFGeEI7QUFHRSx3QkFBZ0IsS0FBS0Q7QUFIdkI7QUF0Q0YsS0FERjtBQStDRCxHOzs7RUFuYmdEZ0IsZ0JBQU1DLGEsV0FzQmhEQyxZLEdBQWU7QUFDcEJoRixTQUFPLElBRGE7QUFFcEJrQyxZQUFVLE1BRlU7QUFHcEJELFlBQVUsVUFIVTtBQUlwQmxDLFlBQVUsRUFKVTtBQUtwQm9FLGFBQVcsRUFMUztBQU1wQkYsZ0JBQWNRLGtDQU5NO0FBT3BCMUYsTUFBSSxnQkFQZ0I7QUFRcEJRLFlBQVUwRixTQVJVO0FBU3BCbkYsWUFBVW1GLFNBVFU7QUFVcEJDLG9CQUFrQjtBQVZFLEM7a0JBdEJIOUYscUIiLCJmaWxlIjoiaGllcmFyY2h5LXRyZWUtc2VsZWN0b3IuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRyZWVDb21wb25lbnQgZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtdHJlZS1jb21wb25lbnQnO1xuaW1wb3J0IHsgUHJpbWl0aXZlIH0gZnJvbSAnQG9wdXNjYXBpdGEvb2MtY20tY29tbW9uLWxheW91dHMnO1xuaW1wb3J0IHsgRGF0YWdyaWQsIGdyaWRTaGFwZSwgZ3JpZENvbHVtblNoYXBlLCBEYXRhZ3JpZEFjdGlvbnMgfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1ncmlkJztcbmltcG9ydCBDb25maXJtRGlhbG9nIGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWNvbmZpcm1hdGlvbi1kaWFsb2cnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHsgTGlzdCwgZnJvbUpTIH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCBJbW11dGFibGVQcm9wVHlwZXMgZnJvbSAncmVhY3QtaW1tdXRhYmxlLXByb3B0eXBlcyc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuLy8gQXBwIGltcG9ydHNcbmltcG9ydCBDb250cm9sQmFyIGZyb20gJy4vaGllcmFyY2h5LXRyZWUtc2VsZWN0b3ItY29udHJvbC1iYXIuY29tcG9uZW50JztcbmltcG9ydCBBcnJvd0NvbnRyb2xzIGZyb20gJy4vaGllcmFyY2h5LXRyZWUtc2VsZWN0b3ItYXJyb3ctY29udHJvbHMuY29tcG9uZW50JztcbmltcG9ydCB7IGRlZmF1bHRUcmFuc2xhdGlvbnMgfSBmcm9tICcuL2hpZXJhcmNoeS10cmVlLnV0aWxzJztcblxuY29uc3QgQUNUSU9OX0JBUl9DT05UQUlORVJfSEVJR0hUID0gJzU3cHgnO1xuY29uc3QgVFJFRV9BQ1RJT05TID0ge1xuICBBRERfQ0hJTERSRU46ICdBRERfQ0hJTERSRU4nLFxuICBNT1ZFX0xFQUY6ICdNT1ZFX0xFQUYnLFxuICBSRU5BTUVfUEFSRU5UOiAnUkVOQU1FX1BBUkVOVCcsXG4gIERFTEVURV9QQVJFTlQ6ICdERUxFVEVfUEFSRU5UJyxcbn07XG5cbmNvbnN0IEdyaWQgPSBzdHlsZWQoRGF0YWdyaWQpYFxuICBoZWlnaHQ6IDEwMCU7XG4gICYmJiB7XG4gICAgcGFkZGluZzogMDtcbiAgfVxuICAub2MtZGF0YWdyaWQtbWFpbi1jb250YWluZXIge1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuY29sb3JzLmNvbG9yTGlnaHRHcmF5fTtcbiAgfVxuYDtcblxuY29uc3QgQ29udGFpbmVyID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogZmxleDtcbiAgbWluLWhlaWdodDogMzAwcHg7XG4gID4gZGl2IHtcbiAgICB3aWR0aDogNTAlO1xuICAgIGZsZXg6IDEgMSAxMDAlO1xuICB9XG5gO1xuXG5jb25zdCBUcmVlQ29udGFpbmVyID0gc3R5bGVkLmRpdmBcbiAgaGVpZ2h0OjEwMCU7XG4gIC5vYy1zY3JvbGxiYXItY29udGFpbmVyIHtcbiAgICBoZWlnaHQ6IGNhbGMoMTAwJSAtICR7QUNUSU9OX0JBUl9DT05UQUlORVJfSEVJR0hUfSk7XG4gICAgcGFkZGluZzogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5ndXR0ZXJXaWR0aH07XG4gIH1cbiAgLnRpdGxlLWNvbnRhaW5lciB7XG4gICAgbWluLWhlaWdodDogJHtBQ1RJT05fQkFSX0NPTlRBSU5FUl9IRUlHSFR9O1xuICB9XG4gIC5vYy1yZWFjdC10cmVlIHtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgLnJjLXRyZWUtaWNvbkVsZS5yYy10cmVlLWljb25fX2N1c3RvbWl6ZSB7XG4gICAgICAgIGRpc3BsYXk6bm9uZTtcbiAgICB9XG4gIH1cbmA7XG5cbmNvbnN0IE5vSXRlbXNUZXh0ID0gc3R5bGVkLnBgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBmb250LXdlaWdodDogYm9sZDtcbmA7XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IHtcbiAgc2V0RGF0YTogRGF0YWdyaWRBY3Rpb25zLnNldERhdGEsXG4gIGNsZWFyU2VsZWN0ZWRJdGVtczogRGF0YWdyaWRBY3Rpb25zLmNsZWFyU2VsZWN0ZWRJdGVtcyxcbn07XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSwgcHJvcHMpID0+IHtcbiAgY29uc3QgZ3JpZElkID0gcHJvcHMuZ3JpZC5pZDtcbiAgcmV0dXJuIHtcbiAgICBzZWxlY3RlZEdyaWRJdGVtczogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW2dyaWRJZCwgJ3NlbGVjdGVkSXRlbXMnXSwgTGlzdCgpKSxcbiAgICBncmlkRGF0YTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW2dyaWRJZCwgJ2FsbERhdGEnXSwgTGlzdCgpKSxcbiAgfTtcbn07XG5cbkBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGllcmFyY2h5VHJlZVNlbGVjdG9yIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgaWRLZXk6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdmFsdWVLZXk6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2hpbGRLZXk6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdHJlZURhdGE6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zaGFwZSh7fSkpLFxuICAgIGdyaWQ6IGdyaWRTaGFwZS5pc1JlcXVpcmVkLFxuICAgIGdyaWRDb2x1bW5zOiBQcm9wVHlwZXMuYXJyYXlPZihncmlkQ29sdW1uU2hhcGUpLmlzUmVxdWlyZWQsXG4gICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHNldERhdGE6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgY2xlYXJTZWxlY3RlZEl0ZW1zOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHNlbGVjdGVkR3JpZEl0ZW1zOiBJbW11dGFibGVQcm9wVHlwZXMubGlzdC5pc1JlcXVpcmVkLFxuICAgIGdyaWREYXRhOiBJbW11dGFibGVQcm9wVHlwZXMubGlzdC5pc1JlcXVpcmVkLFxuICAgIHRyYW5zbGF0aW9uczogUHJvcFR5cGVzLnNoYXBlKHt9KSxcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkZWZhdWx0RXhwYW5kQWxsOiBQcm9wVHlwZXMuYm9vbCxcblxuICAgIC8vIENhbGxiYWNrc1xuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBpZEtleTogJ2lkJyxcbiAgICB2YWx1ZUtleTogJ25hbWUnLFxuICAgIGNoaWxkS2V5OiAnY2hpbGRyZW4nLFxuICAgIHRyZWVEYXRhOiBbXSxcbiAgICBjbGFzc05hbWU6ICcnLFxuICAgIHRyYW5zbGF0aW9uczogZGVmYXVsdFRyYW5zbGF0aW9ucyxcbiAgICBpZDogJ2hpZXJhcmNoeS10cmVlJyxcbiAgICBvblNlbGVjdDogdW5kZWZpbmVkLFxuICAgIG9uQ2hhbmdlOiB1bmRlZmluZWQsXG4gICAgZGVmYXVsdEV4cGFuZEFsbDogdHJ1ZSxcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzZWxlY3RlZEtleXM6IFtdLFxuICAgICAgc2hvd0RlbGV0ZUNvbmZpcm1hdGlvbjogZmFsc2UsXG4gICAgfTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFNlbGVjdHMgYSB0cmVlIGl0ZW1cbiAgICogQHBhcmFtIHNlbGVjdGVkS2V5cyAoYXJyYXkpXG4gICAqL1xuICBvblRyZWVJdGVtU2VsZWN0ID0gKHNlbGVjdGVkS2V5cykgPT4ge1xuICAgIGNvbnN0IHsgb25TZWxlY3QgfSA9IHRoaXMucHJvcHM7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkS2V5cyB9LCAoKSA9PiB7XG4gICAgICBpZiAob25TZWxlY3QpIG9uU2VsZWN0KHNlbGVjdGVkS2V5cyk7XG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIERpc3BsYXlzIGEgY29uZmlybWF0aW9uIGRpYWxvZ1xuICAgKi9cbiAgb25EZWxldGVDbGljayA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2hvd0RlbGV0ZUNvbmZpcm1hdGlvbjogdHJ1ZSB9KTtcbiAgfTtcblxuXG4gIC8qKlxuICAgKiBBZGRzIGEgbmV3IG5vZGUgdG8gdGhlIHJvb3Qgb2YgdGhlIHRyZWUsIG9yIHVuZGVyIGEgc2VsZWN0ZWQgdHJlZSBub2RlIHVzaW5nXG4gICAqIEFERF9DSElMRFJFTiBhY3Rpb25cbiAgICogQHBhcmFtIGRhdGEgLSBkYXRhIHRvIGJlIGFkZGVkXG4gICAqIEBwYXJhbSBjYWxsYmFja1xuICAgKi9cbiAgb25BZGROZXdDbGljayA9IChkYXRhLCBjYWxsYmFjaykgPT4ge1xuICAgIGNvbnN0IHsgb25DaGFuZ2UsIHRyZWVEYXRhLCBpZEtleSB9ID0gdGhpcy5wcm9wcztcbiAgICBsZXQgbmV3SXRlbXMgPSB0cmVlRGF0YS5zbGljZSgpO1xuXG4gICAgLy8gSWYgbm8gdHJlZSBub2RlIGlzIHNlbGVjdGVkLCB3ZSdsbCBwbGFjZSB0aGUgbmV3IGl0ZW0gdG8gdGhlIHJvb3RcbiAgICAvLyBvZiB0aGUgdHJlZVxuICAgIGlmICghdGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF0pIHtcbiAgICAgIG5ld0l0ZW1zLnB1c2goZGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGFjdGlvbiA9IHtcbiAgICAgICAgdHlwZTogVFJFRV9BQ1RJT05TLkFERF9DSElMRFJFTixcbiAgICAgICAgZGF0YSxcbiAgICAgIH07XG4gICAgICBuZXdJdGVtcyA9IHRoaXMuZ2V0VXBkYXRlZFRyZWUodGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF0sIHRyZWVEYXRhLCBhY3Rpb24pO1xuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRLZXlzOiBbZGF0YVtpZEtleV1dIH0sICgpID0+IHtcbiAgICAgIC8vIElmIHRoZSBwYXJlbnQgaXMgbm90IHlldCBleHBhbmRlZCwgd2Ugd2lsbCBleHBhbmQgaXQgbm93XG4gICAgICBjb25zdCBwYXJlbnQgPSB0aGlzLmdldFRyZWVJdGVtKGRhdGFbaWRLZXldLCB0cmVlRGF0YSwgdHJ1ZSkgfHwge307XG4gICAgICB0aGlzLmV4cGFuZFBhcmVudChwYXJlbnRbaWRLZXldKTtcblxuICAgICAgaWYgKG9uQ2hhbmdlKSBvbkNoYW5nZShuZXdJdGVtcyk7XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZW1vdmVzIHRoZSBjaG9zZW4gaXRlbSBmcm9tIGEgdHJlZSBhbmQgdXBkYXRlcyB0aGUgZ3JpZCB1c2luZyBNT1ZFX0xFQUZcbiAgICogYWN0aW9uXG4gICAqL1xuICBvbk1vdmVUb0dyaWRDbGljayA9ICgpID0+IHtcbiAgICBjb25zdCB7IHRyZWVEYXRhLCBvbkNoYW5nZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzZWxlY3RlZEtleSA9IHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdO1xuICAgIGNvbnN0IGFjdGlvbiA9IHtcbiAgICAgIHR5cGU6IFRSRUVfQUNUSU9OUy5NT1ZFX0xFQUYsXG4gICAgICBkYXRhOiB0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXSxcbiAgICB9O1xuICAgIGNvbnN0IG5leHRTZWxlY3RlZEtleSA9IHRoaXMuZ2V0QWRqYWNlbnRJdGVtKHNlbGVjdGVkS2V5KTtcbiAgICBjb25zdCBuZXdHcmlkSXRlbXMgPSBmcm9tSlMoW3RoaXMuZ2V0VHJlZUl0ZW0oc2VsZWN0ZWRLZXkpXSk7XG4gICAgY29uc3QgbmV3SXRlbXMgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKHNlbGVjdGVkS2V5LCB0cmVlRGF0YSwgYWN0aW9uKTtcblxuICAgIHRoaXMuc2V0RGF0YVRvR3JpZChuZXdHcmlkSXRlbXMpO1xuICAgIGlmIChvbkNoYW5nZSkgb25DaGFuZ2UobmV3SXRlbXMpO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2VsZWN0ZWRLZXlzOiBbbmV4dFNlbGVjdGVkS2V5XSxcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogQ2FsbHMgb25DaGFuZ2UgY2FsbGJhY2sgd2hlbmV2ZXIgdXNlciByZW9yZGVycyB0cmVlIGl0ZW1zIHVzaW5nIG9yZGVyaW5nIGFycm93c1xuICAgKiBAcGFyYW0gaXRlbXNcbiAgICovXG4gIG9uT3JkZXJDbGljayA9IChpdGVtcykgPT4ge1xuICAgIHRoaXMucHJvcHMub25DaGFuZ2UoaXRlbXMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBZGRzIHNlbGVjdGVkIGdyaWQgaXRlbXMgdG8gdGhlIGNob3NlbiB0cmVlIG5vZGUgdXNpbmcgQUREX0NISUxEUkVOIGFjdGlvblxuICAgKi9cbiAgb25Nb3ZlVG9UcmVlQ2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgb25DaGFuZ2UsIHNlbGVjdGVkR3JpZEl0ZW1zLCBncmlkRGF0YSwgdHJlZURhdGEsIGlkS2V5LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHNlbGVjdGVkSWQgPSB0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXTtcblxuICAgIGNvbnN0IGFjdGlvbiA9IHtcbiAgICAgIHR5cGU6IFRSRUVfQUNUSU9OUy5BRERfQ0hJTERSRU4sXG4gICAgICBkYXRhOiBncmlkRGF0YVxuICAgICAgICAuZmlsdGVyKGkgPT4gc2VsZWN0ZWRHcmlkSXRlbXMuaW5jbHVkZXMoaS5nZXQoaWRLZXkpKSlcbiAgICAgICAgLnRvSlMoKSxcbiAgICB9O1xuICAgIGNvbnN0IG5ld0l0ZW1zID0gdGhpcy5nZXRVcGRhdGVkVHJlZShzZWxlY3RlZElkLCB0cmVlRGF0YSwgYWN0aW9uKTtcbiAgICBjb25zdCBuZXdHcmlkSXRlbXMgPSBncmlkRGF0YS5maWx0ZXIoaXRlbSA9PiAhc2VsZWN0ZWRHcmlkSXRlbXMuaW5jbHVkZXMoaXRlbS5nZXQoaWRLZXkpKSk7XG5cbiAgICB0aGlzLmV4cGFuZFBhcmVudChzZWxlY3RlZElkLCB0cnVlKTtcbiAgICB0aGlzLnNldERhdGFUb0dyaWQobmV3R3JpZEl0ZW1zLCB0cnVlKTtcbiAgICBpZiAob25DaGFuZ2UpIG9uQ2hhbmdlKG5ld0l0ZW1zKTtcbiAgfTtcblxuICAvKipcbiAgICogUmVuYW1lcyB0aGUgY2hvc2VuIHRyZWUgbm9kZSB1c2luZyBhIFJFTkFNRV9QQVJFTlQgYWN0aW9uXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKi9cbiAgb25JbnB1dENoYW5nZSA9ICh2YWx1ZSkgPT4ge1xuICAgIGNvbnN0IHsgdHJlZURhdGEsIG9uQ2hhbmdlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGFjdGlvbiA9IHtcbiAgICAgIHR5cGU6IFRSRUVfQUNUSU9OUy5SRU5BTUVfUEFSRU5ULFxuICAgICAgZGF0YTogdmFsdWUsXG4gICAgfTtcbiAgICBjb25zdCBuZXdJdGVtcyA9IHRoaXMuZ2V0VXBkYXRlZFRyZWUodGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF0sIHRyZWVEYXRhLCBhY3Rpb24pO1xuICAgIGlmIChvbkNoYW5nZSkgb25DaGFuZ2UobmV3SXRlbXMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBGaXJlZCBvbiBleHBhbmRcbiAgICogQHBhcmFtIGlkc1xuICAgKi9cbiAgb25FeHBhbmQgPSAoaWRzKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBleHBhbmRlZEtleXM6IGlkcyxcbiAgICB9KTtcbiAgfTtcblxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHVwZGF0ZWQgdHJlZSBpdGVtcy5cbiAgICogQHBhcmFtIGlkIC0gdGFyZ2V0IGl0ZW1cbiAgICogQHBhcmFtIGFycmF5IC0gYXJyYXkgd2hlcmUgdGFyZ2V0IGl0ZW0gaXMgYmVpbmcgc2VhcmNoZWRcbiAgICogQHBhcmFtIGFjdGlvbiAtIGFjdGlvbiB0byBiZSBwZXJmb3JtZWQge3R5cGUsIGRhdGF9XG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgZ2V0VXBkYXRlZFRyZWUgPSAoaWQsIGFycmF5ID0gdGhpcy5wcm9wcy50cmVlRGF0YSwgYWN0aW9uKSA9PiB7XG4gICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgY29uc3QgeyBpZEtleSwgY2hpbGRLZXksIHZhbHVlS2V5IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IG5ld0l0ZW1zID0gYXJyYXkuc2xpY2UoKTtcbiAgICBjb25zdCByZW1vdmVBY3Rpb25zID0gW1RSRUVfQUNUSU9OUy5NT1ZFX0xFQUYsIFRSRUVfQUNUSU9OUy5ERUxFVEVfUEFSRU5UXTtcblxuICAgIC8vIElmIGRlbGV0ZWQgcGFyZW50IGl0ZW0gaXMgaW4gdGhlIHJvb3Qgbm9kZVxuICAgIGlmIChhY3Rpb24udHlwZSA9PT0gVFJFRV9BQ1RJT05TLkRFTEVURV9QQVJFTlQpIHtcbiAgICAgIGNvbnN0IHJvb3RJdGVtID0gYXJyYXkuZmluZChpdGVtID0+IGl0ZW1baWRLZXldID09PSBpZCk7XG4gICAgICBpZiAocm9vdEl0ZW0pIHtcbiAgICAgICAgaWYgKHJvb3RJdGVtW2NoaWxkS2V5XS5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLnNldERhdGFUb0dyaWQoZnJvbUpTKHRoaXMuZ2V0QWxsTGVhZnMocm9vdEl0ZW1bY2hpbGRLZXldKSkpO1xuICAgICAgICAgIHRoaXMuZGVzZWxlY3RJdGVtKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ld0l0ZW1zLmZpbHRlcihpdGVtID0+IGl0ZW1baWRLZXldICE9PSBpZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdJdGVtcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3QgaXRlbSA9IG5ld0l0ZW1zW2ldO1xuICAgICAgaWYgKHJlbW92ZUFjdGlvbnMuaW5jbHVkZXMoYWN0aW9uLnR5cGUpICYmIGl0ZW1bY2hpbGRLZXldICYmICFmb3VuZCkge1xuICAgICAgICBmb3VuZCA9ICEhaXRlbVtjaGlsZEtleV0uZmluZChjaGlsZCA9PiBjaGlsZFtpZEtleV0gPT09IGlkKTtcbiAgICAgICAgaWYgKGZvdW5kKSB7XG4gICAgICAgICAgLy8gV2hlbiByZW1vdmluZyBhbiBpdGVtIHdlIG11c3QgZmlyc3QgZmluZCBpdHMgcGFyZW50IGFuZCBhbHRlciBpdHMgY2hpbGRyZW4gYXJyYXlcbiAgICAgICAgICBpZiAoYWN0aW9uLnR5cGUgPT09IFRSRUVfQUNUSU9OUy5NT1ZFX0xFQUYpIHtcbiAgICAgICAgICAgIGl0ZW1bY2hpbGRLZXldID0gaXRlbVtjaGlsZEtleV0uZmlsdGVyKGNoaWxkID0+IGNoaWxkW2lkS2V5XSAhPT0gaWQpO1xuICAgICAgICAgICAgdGhpcy5kZXNlbGVjdEl0ZW0oKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGFjdGlvbi50eXBlID09PSBUUkVFX0FDVElPTlMuREVMRVRFX1BBUkVOVCkge1xuICAgICAgICAgICAgLy8gd2UgbXVzdCBmaXJzdCBmaWx0ZXIgdGhlIGNoaWxkcmVuLCBzbyB0aGF0IHdlIHdvbid0IGdldCBsZWFmcyBmcm9tXG4gICAgICAgICAgICAvLyBvdGhlciBjaGlsZCBicmFuY2hlc1xuICAgICAgICAgICAgY29uc3QgZmlsdGVyZWRDaGlsZHJlbiA9IGl0ZW1bY2hpbGRLZXldLmZpbHRlcihjaGlsZEl0ZW0gPT4gY2hpbGRJdGVtW2lkS2V5XSA9PT0gaWQpO1xuICAgICAgICAgICAgdGhpcy5zZXREYXRhVG9HcmlkKGZyb21KUyh0aGlzLmdldEFsbExlYWZzKGZpbHRlcmVkQ2hpbGRyZW4pKSk7XG4gICAgICAgICAgICB0aGlzLmRlc2VsZWN0SXRlbSgpO1xuICAgICAgICAgICAgaXRlbVtjaGlsZEtleV0gPSBpdGVtW2NoaWxkS2V5XS5maWx0ZXIoY2hpbGRJdGVtID0+IGNoaWxkSXRlbVtpZEtleV0gIT09IGlkKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1baWRLZXldID09PSBpZCAmJiAhZm91bmQpIHtcbiAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgICAgY2FzZSBUUkVFX0FDVElPTlMuQUREX0NISUxEUkVOOlxuICAgICAgICAgICAgaXRlbVtjaGlsZEtleV0gPSAoaXRlbVtjaGlsZEtleV0gfHwgW10pLmNvbmNhdChhY3Rpb24uZGF0YSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIFRSRUVfQUNUSU9OUy5SRU5BTUVfUEFSRU5UOlxuICAgICAgICAgICAgaXRlbVt2YWx1ZUtleV0gPSBhY3Rpb24uZGF0YTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBY3Rpb24gdHlwZSBpcyB1bmRlZmluZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtW2NoaWxkS2V5XSAmJiAhZm91bmQpIGZvdW5kID0gdGhpcy5nZXRVcGRhdGVkVHJlZShpZCwgaXRlbVtjaGlsZEtleV0sIGFjdGlvbik7XG4gICAgfVxuXG4gICAgaWYgKCFmb3VuZCkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiBuZXdJdGVtcztcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyByZWN1cnNpdmVseSBhbGwgbGVhZiBpdGVtcyBmcm9tIGEgZ2l2ZW4gYXJyYXlcbiAgICogQHBhcmFtIGFycmF5XG4gICAqIEBwYXJhbSBhbHJlYWR5Rm91bmQgKHVzZWQgcmVjdXJzaXZlbHkpXG4gICAqL1xuICBnZXRBbGxMZWFmcyA9IChhcnJheSwgYWxyZWFkeUZvdW5kID0gW10pID0+IHtcbiAgICBjb25zdCB7IGNoaWxkS2V5IH0gPSB0aGlzLnByb3BzO1xuICAgIGxldCBsZWFmcyA9IGFscmVhZHlGb3VuZDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSBhcnJheVtpXTtcbiAgICAgIGlmIChpdGVtW2NoaWxkS2V5XSkge1xuICAgICAgICBsZWFmcyA9IHRoaXMuZ2V0QWxsTGVhZnMoaXRlbVtjaGlsZEtleV0sIGFscmVhZHlGb3VuZCk7XG4gICAgICB9XG4gICAgICBpZiAoIWl0ZW1bY2hpbGRLZXldKSBsZWFmcy5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgICByZXR1cm4gbGVhZnM7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSB0cmVlIGl0ZW0gYnkgSURcbiAgICogQHBhcmFtIGlkXG4gICAqIEBwYXJhbSBhcnJheVxuICAgKiBAcGFyYW0gcmV0dXJuUGFyZW50IC0gcmV0dXJuIGl0ZW0ncyBwYXJlbnQgaW5zdGVhZCBvZiB0aGUgaXRlbVxuICAgKiBAcGFyYW0gcGFyZW50IC0gcGFyZW50IGl0ZW0gKHVzZWQgcmVjdXJzaXZlbHkpXG4gICAqIEByZXR1cm5zIHt7fX1cbiAgICovXG4gIGdldFRyZWVJdGVtID0gKGlkLCBhcnJheSA9IHRoaXMucHJvcHMudHJlZURhdGEsIHJldHVyblBhcmVudCA9IGZhbHNlLCBwYXJlbnQgPSBudWxsKSA9PiB7XG4gICAgY29uc3QgeyBjaGlsZEtleSwgaWRLZXkgfSA9IHRoaXMucHJvcHM7XG4gICAgbGV0IGZvdW5kID0gYXJyYXkuZmluZChpdGVtID0+IGl0ZW1baWRLZXldID09PSBpZCk7XG5cbiAgICBpZiAoZm91bmQgJiYgcmV0dXJuUGFyZW50KSBmb3VuZCA9IHBhcmVudDtcblxuICAgIGlmICghZm91bmQpIHtcbiAgICAgIGFycmF5LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgaWYgKGl0ZW1bY2hpbGRLZXldICYmICFmb3VuZCkge1xuICAgICAgICAgIGZvdW5kID0gdGhpcy5nZXRUcmVlSXRlbShpZCwgaXRlbVtjaGlsZEtleV0sIHJldHVyblBhcmVudCwgaXRlbSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gZm91bmQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIEdldCBhZGphY2VudCBpdGVtIChpZCkgaW4gcGFyZW50IGFycmF5LiBVc2VkIHdoZW4gbW92aW5nIGl0ZW1zIGZyb20gdHJlZVxuICAgKiB0byBncmlkL2RlbGV0aW5nIGFuIGl0ZW1cbiAgICogQHBhcmFtIGlkXG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgZ2V0QWRqYWNlbnRJdGVtID0gKGlkKSA9PiB7XG4gICAgaWYgKCFpZCkgcmV0dXJuIG51bGw7XG4gICAgY29uc3QgeyBjaGlsZEtleSwgaWRLZXksIHRyZWVEYXRhIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgZ2V0QWRqYWNlbnRJdGVtSWQgPSAocGFyZW50KSA9PiB7XG4gICAgICBjb25zdCBwYXJlbnRBcnIgPSBBcnJheS5pc0FycmF5KHBhcmVudCkgPyBwYXJlbnQgOiBwYXJlbnRbY2hpbGRLZXldO1xuICAgICAgY29uc3QgaW5kZXggPSBwYXJlbnRBcnIuZmluZEluZGV4KGNoaWxkID0+IGNoaWxkW2lkS2V5XSA9PT0gaWQpO1xuICAgICAgbGV0IGFkamFjZW50SXRlbSA9IHBhcmVudEFycltpbmRleCArIDFdO1xuICAgICAgaWYgKCFhZGphY2VudEl0ZW0pIGFkamFjZW50SXRlbSA9IHBhcmVudEFycltpbmRleCAtIDFdO1xuICAgICAgaWYgKCFhZGphY2VudEl0ZW0gJiYgIUFycmF5LmlzQXJyYXkocGFyZW50KSkgYWRqYWNlbnRJdGVtID0gcGFyZW50O1xuICAgICAgaWYgKCFhZGphY2VudEl0ZW0pIHJldHVybiBudWxsO1xuXG4gICAgICByZXR1cm4gYWRqYWNlbnRJdGVtW2lkS2V5XTtcbiAgICB9O1xuXG4gICAgY29uc3QgcGFyZW50ID0gdGhpcy5nZXRUcmVlSXRlbShpZCwgdGhpcy5wcm9wcy50cmVlRGF0YSwgdHJ1ZSk7XG4gICAgcmV0dXJuIHBhcmVudCA/IGdldEFkamFjZW50SXRlbUlkKHBhcmVudCkgOiBnZXRBZGphY2VudEl0ZW1JZCh0cmVlRGF0YSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEFwcGVuZHMgcHJvdmlkZWQgaXRlbXMgdG8gdGhlIGdyaWRcbiAgICogQHBhcmFtIGl0ZW1zIC0gaW1tdXRhYmxlIGFycmF5IG9mIGl0ZW1zIHRvIGJlIGFwcGVuZGVkIHRvIGdyaWRcbiAgICogQHBhcmFtIHNldE5ld0l0ZW1zIC0gc2V0IGNvbXBsZXRlbHkgYSBuZXcgYXJyYXkgb2YgaXRlbXNcbiAgICovXG4gIHNldERhdGFUb0dyaWQgPSAoaXRlbXMsIHNldE5ld0l0ZW1zID0gZmFsc2UpID0+IHtcbiAgICBsZXQgZGF0YSA9IExpc3QoKTtcbiAgICBjb25zdCB7IGdyaWQsIGdyaWRDb2x1bW5zLCBncmlkRGF0YSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIXNldE5ld0l0ZW1zKSBkYXRhID0gZ3JpZERhdGEuc2xpY2UoKTtcbiAgICBjb25zdCBuZXdHcmlkSXRlbXMgPSBkYXRhLmNvbmNhdChpdGVtcyk7XG5cbiAgICB0aGlzLnByb3BzLnNldERhdGEoZ3JpZCwgZ3JpZENvbHVtbnMsIG5ld0dyaWRJdGVtcyk7XG4gICAgdGhpcy5wcm9wcy5jbGVhclNlbGVjdGVkSXRlbXMoZ3JpZCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEV4cGFuZHMgYSBwYXJlbnRcbiAgICogQHBhcmFtIHBhcmVudElkXG4gICAqL1xuICBleHBhbmRQYXJlbnQgPSAocGFyZW50SWQpID0+IHtcbiAgICBpZiAocGFyZW50SWQgJiYgIXRoaXMuc3RhdGUuZXhwYW5kZWRLZXlzLmZpbmQoZXhwYW5kZWRJZCA9PiBleHBhbmRlZElkID09PSBwYXJlbnRJZCkpIHtcbiAgICAgIGNvbnN0IG5ld0V4cGFuZGVkS2V5cyA9IHRoaXMuc3RhdGUuZXhwYW5kZWRLZXlzLnNsaWNlKCk7XG4gICAgICBuZXdFeHBhbmRlZEtleXMucHVzaChwYXJlbnRJZCk7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgZXhwYW5kZWRLZXlzOiBuZXdFeHBhbmRlZEtleXMgfSk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBDbG9zZXMgZGVsZXRlIGNvbmZpcm1hdGlvbiBkaWFsb2dcbiAgICovXG4gIGNsb3NlRGVsZXRlQ29uZmlybWF0aW9uRGlhbG9nID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzaG93RGVsZXRlQ29uZmlybWF0aW9uOiBmYWxzZSB9KTtcbiAgfTtcblxuICAvKipcbiAgICogRGVsZXRlcyBhIHBhcmVudCBub2RlXG4gICAqL1xuICBkZWxldGVQYXJlbnQgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBvbkNoYW5nZSwgdHJlZURhdGEgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgc2VsZWN0ZWRLZXkgPSB0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXTtcbiAgICBjb25zdCBhY3Rpb24gPSB7XG4gICAgICB0eXBlOiBUUkVFX0FDVElPTlMuREVMRVRFX1BBUkVOVCxcbiAgICB9O1xuICAgIGNvbnN0IG5leHRTZWxlY3RlZEtleSA9IHRoaXMuZ2V0QWRqYWNlbnRJdGVtKHNlbGVjdGVkS2V5KTtcbiAgICBjb25zdCBuZXdJdGVtcyA9IHRoaXMuZ2V0VXBkYXRlZFRyZWUoc2VsZWN0ZWRLZXksIHRyZWVEYXRhLCBhY3Rpb24pO1xuICAgIGlmIChvbkNoYW5nZSkgb25DaGFuZ2UobmV3SXRlbXMpO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2VsZWN0ZWRLZXlzOiBbbmV4dFNlbGVjdGVkS2V5XSxcbiAgICAgIHNob3dEZWxldGVDb25maXJtYXRpb246IGZhbHNlLFxuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBEZXNlbGVjdHMgYW4gaXRlbSwgaWYgaXQgaXMgZS5nLiByZW1vdmVkXG4gICAqL1xuICBkZXNlbGVjdEl0ZW0gPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkS2V5czogW10gfSk7XG4gIH07XG5cbiAgcmVuZGVySGVhZGVyUmlnaHQgPSB0cmFuc2xhdGlvbnMgPT4gKFxuICAgIDxDb250cm9sQmFyXG4gICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgIG9uQWRkTmV3Q2xpY2s9e3RoaXMub25BZGROZXdDbGlja31cbiAgICAgIG9uRGVsZXRlQ2xpY2s9e3RoaXMub25EZWxldGVDbGlja31cbiAgICAgIG9uSW5wdXRDaGFuZ2U9e3RoaXMub25JbnB1dENoYW5nZX1cbiAgICAgIHNlbGVjdGVkVHJlZUl0ZW09e3RoaXMuZ2V0VHJlZUl0ZW0odGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF0pfVxuICAgICAgaGVpZ2h0PXtBQ1RJT05fQkFSX0NPTlRBSU5FUl9IRUlHSFR9XG4gICAgICB0cmFuc2xhdGlvbnM9e3RyYW5zbGF0aW9uc31cbiAgICAvPlxuICApO1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICB2YWx1ZUtleSwgaWRLZXksIHRyZWVEYXRhLCBncmlkLCBncmlkQ29sdW1ucywgY2xhc3NOYW1lLCB0cmFuc2xhdGlvbnMsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBtZXJnZWRHcmlkID0gT2JqZWN0LmFzc2lnbih7fSwgZ3JpZCwgeyBkZWZhdWx0U2hvd0ZpbHRlcmluZ1JvdzogdHJ1ZSB9KTtcbiAgICBjb25zdCBtZXJnZWRUcmFuc2xhdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0VHJhbnNsYXRpb25zLCB0cmFuc2xhdGlvbnMpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxSZWFjdC5GcmFnbWVudD5cbiAgICAgICAgPENvbnRhaW5lciBjbGFzc05hbWU9e2NsYXNzTmFtZX0+XG4gICAgICAgICAgPFRyZWVDb250YWluZXI+XG4gICAgICAgICAgICB7ISF0cmVlRGF0YS5sZW5ndGggJiYgPFRyZWVDb21wb25lbnRcbiAgICAgICAgICAgICAgdHJlZURhdGE9e3RyZWVEYXRhfVxuICAgICAgICAgICAgICBkYXRhTG9va1VwS2V5PXtpZEtleX1cbiAgICAgICAgICAgICAgZGF0YUxvb2tVcFZhbHVlPXt2YWx1ZUtleX1cbiAgICAgICAgICAgICAgb25TZWxlY3Q9e3RoaXMub25UcmVlSXRlbVNlbGVjdH1cbiAgICAgICAgICAgICAgb25FeHBhbmQ9e3RoaXMub25FeHBhbmR9XG4gICAgICAgICAgICAgIGNoZWNrYWJsZT17ZmFsc2V9XG4gICAgICAgICAgICAgIHNlbGVjdGVkS2V5cz17dGhpcy5zdGF0ZS5zZWxlY3RlZEtleXN9XG4gICAgICAgICAgICAgIGV4cGFuZGVkS2V5cz17dGhpcy5zdGF0ZS5leHBhbmRlZEtleXN9XG4gICAgICAgICAgICAgIG9uT3JkZXJCdXR0b25DbGljaz17dGhpcy5vbk9yZGVyQ2xpY2t9XG4gICAgICAgICAgICAgIHRpdGxlPXttZXJnZWRUcmFuc2xhdGlvbnMudHJlZVRpdGxlfVxuICAgICAgICAgICAgICBzZWxlY3RhYmxlXG4gICAgICAgICAgICAgIHNob3dPcmRlcmluZ0Fycm93c1xuICAgICAgICAgICAgICBzaG93RXhwYW5kQWxsXG4gICAgICAgICAgICAgIGhlYWRlclJpZ2h0PXt0aGlzLnJlbmRlckhlYWRlclJpZ2h0KG1lcmdlZFRyYW5zbGF0aW9ucyl9XG4gICAgICAgICAgICAvPn1cbiAgICAgICAgICAgIHshdHJlZURhdGEubGVuZ3RoICYmIDxOb0l0ZW1zVGV4dD57bWVyZ2VkVHJhbnNsYXRpb25zLm5vVHJlZUl0ZW1zfTwvTm9JdGVtc1RleHQ+fVxuICAgICAgICAgIDwvVHJlZUNvbnRhaW5lcj5cbiAgICAgICAgICA8QXJyb3dDb250cm9sc1xuICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICBzZWxlY3RlZFRyZWVJdGVtPXt0aGlzLmdldFRyZWVJdGVtKHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdKX1cbiAgICAgICAgICAgIG9uTW92ZVRvVHJlZUNsaWNrPXt0aGlzLm9uTW92ZVRvVHJlZUNsaWNrfVxuICAgICAgICAgICAgb25Nb3ZlVG9HcmlkQ2xpY2s9e3RoaXMub25Nb3ZlVG9HcmlkQ2xpY2t9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8R3JpZFxuICAgICAgICAgICAgZ3JpZD17bWVyZ2VkR3JpZH1cbiAgICAgICAgICAgIGNvbHVtbnM9e2dyaWRDb2x1bW5zfVxuICAgICAgICAgICAgbXVsdGlTZWxlY3RcbiAgICAgICAgICAgIGZpbHRlcmluZ1xuICAgICAgICAgICAgcm93U2VsZWN0Q2hlY2tib3hDb2x1bW5cbiAgICAgICAgICAgIGdyaWRIZWFkZXI9ezxQcmltaXRpdmUuU3VidGl0bGU+e21lcmdlZFRyYW5zbGF0aW9ucy5ncmlkVGl0bGV9PC9QcmltaXRpdmUuU3VidGl0bGU+fVxuICAgICAgICAgIC8+XG5cbiAgICAgICAgPC9Db250YWluZXI+XG4gICAgICAgIHt0aGlzLnN0YXRlLnNob3dEZWxldGVDb25maXJtYXRpb24gJiZcbiAgICAgICAgPENvbmZpcm1EaWFsb2dcbiAgICAgICAgICB0cmFuc2xhdGlvbnM9e21lcmdlZFRyYW5zbGF0aW9ucy5kZWxldGVDb25maXJtRGlhbG9nfVxuICAgICAgICAgIGNvbmZpcm1DYWxsYmFjaz17dGhpcy5kZWxldGVQYXJlbnR9XG4gICAgICAgICAgY2FuY2VsQ2FsbGJhY2s9e3RoaXMuY2xvc2VEZWxldGVDb25maXJtYXRpb25EaWFsb2d9XG4gICAgICAgIC8+XG4gICAgICAgIH1cbiAgICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gICAgKTtcbiAgfVxufVxuIl19