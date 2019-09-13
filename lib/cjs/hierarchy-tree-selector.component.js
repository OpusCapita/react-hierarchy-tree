'use strict';

exports.__esModule = true;
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _dec, _class, _class2, _temp;

var _templateObject = _taggedTemplateLiteralLoose(['\n  height: 100%;\n  &&& {\n    padding: 0;\n  }\n'], ['\n  height: 100%;\n  &&& {\n    padding: 0;\n  }\n']),
    _templateObject2 = _taggedTemplateLiteralLoose(['\n  display: flex;\n  min-height: 300px;\n  > div {\n    width: 50%;\n    flex: 1 1 100%;\n  }\n'], ['\n  display: flex;\n  min-height: 300px;\n  > div {\n    width: 50%;\n    flex: 1 1 100%;\n  }\n']),
    _templateObject3 = _taggedTemplateLiteralLoose(['\n  height: 100%;\n  .oc-scrollbar-container {\n    height: calc(100% - ', ');\n    padding: ', ';\n  }\n  .tree-header {\n    min-height: ', ';\n    .ordering-arrows {\n      font-weight: 24px;\n    }\n  }\n  .oc-react-tree {\n    height: 100%;\n    .rc-tree-iconEle.rc-tree-icon__customize {\n      display: none;\n    }\n  }\n'], ['\n  height: 100%;\n  .oc-scrollbar-container {\n    height: calc(100% - ', ');\n    padding: ', ';\n  }\n  .tree-header {\n    min-height: ', ';\n    .ordering-arrows {\n      font-weight: 24px;\n    }\n  }\n  .oc-react-tree {\n    height: 100%;\n    .rc-tree-iconEle.rc-tree-icon__customize {\n      display: none;\n    }\n  }\n']);

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


var ACTION_BAR_CONTAINER_HEIGHT = '54px';
var TREE_ACTIONS = {
  ADD_CHILDREN: 'ADD_CHILDREN',
  MOVE_LEAF: 'MOVE_LEAF',
  RENAME_PARENT: 'RENAME_PARENT',
  DELETE_PARENT: 'DELETE_PARENT'
};

var Grid = (0, _styledComponents2.default)(_reactGrid.Datagrid)(_templateObject);

var Container = _styledComponents2.default.div(_templateObject2);

var TreeContainer = _styledComponents2.default.div(_templateObject3, ACTION_BAR_CONTAINER_HEIGHT, function (props) {
  return props.theme.gutterWidth;
}, ACTION_BAR_CONTAINER_HEIGHT);

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
      var childKey = _this.props.childKey;

      // If item is not a parent, we won't show the delete confirmation dialog

      if (!_this.getTreeItem(_this.state.selectedKeys[0])[childKey]) {
        _this.moveItemToGrid();
        return;
      }
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
      _this.moveItemToGrid();
    };

    _this.onOrderClick = function (items) {
      _this.props.onChange(items);
    };

    _this.onMoveToTreeClick = function () {
      var _this$props2 = _this.props,
          onChange = _this$props2.onChange,
          selectedGridItems = _this$props2.selectedGridItems,
          gridData = _this$props2.gridData,
          treeData = _this$props2.treeData,
          idKey = _this$props2.idKey;

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
      var _this$props3 = _this.props,
          treeData = _this$props3.treeData,
          onChange = _this$props3.onChange;

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
      var _this$props4 = _this.props,
          idKey = _this$props4.idKey,
          childKey = _this$props4.childKey,
          valueKey = _this$props4.valueKey;

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
      var _this$props5 = _this.props,
          childKey = _this$props5.childKey,
          idKey = _this$props5.idKey;

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
      var _this$props6 = _this.props,
          childKey = _this$props6.childKey,
          idKey = _this$props6.idKey,
          treeData = _this$props6.treeData;


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
      var _this$props7 = _this.props,
          grid = _this$props7.grid,
          gridColumns = _this$props7.gridColumns,
          gridData = _this$props7.gridData;

      if (!setNewItems) data = gridData.slice();
      var newGridItems = data.concat(items);

      _this.props.setData(grid, gridColumns, newGridItems);
      _this.props.clearSelectedItems(grid);
    };

    _this.moveItemToGrid = function () {
      var _this$props8 = _this.props,
          treeData = _this$props8.treeData,
          onChange = _this$props8.onChange;

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
      expandedKeys: [],
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
   * Removes the chosen item from a tree and updates the grid using MOVE_LEAF
   * action
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
        translations = _props.translations,
        childKey = _props.childKey;


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
          _react2.default.createElement(_reactTreeComponent2.default, {
            treeData: treeData,
            dataLookUpKey: idKey,
            dataLookUpValue: valueKey,
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
          })
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
  defaultExpandAll: true,
  singleRoot: true
}, _temp)) || _class);
exports.default = HierarchyTreeSelector;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIkFDVElPTl9CQVJfQ09OVEFJTkVSX0hFSUdIVCIsIlRSRUVfQUNUSU9OUyIsIkFERF9DSElMRFJFTiIsIk1PVkVfTEVBRiIsIlJFTkFNRV9QQVJFTlQiLCJERUxFVEVfUEFSRU5UIiwiR3JpZCIsIkRhdGFncmlkIiwiQ29udGFpbmVyIiwic3R5bGVkIiwiZGl2IiwiVHJlZUNvbnRhaW5lciIsInByb3BzIiwidGhlbWUiLCJndXR0ZXJXaWR0aCIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsInNldERhdGEiLCJEYXRhZ3JpZEFjdGlvbnMiLCJjbGVhclNlbGVjdGVkSXRlbXMiLCJtYXBTdGF0ZVRvUHJvcHMiLCJzdGF0ZSIsImdyaWRJZCIsImdyaWQiLCJpZCIsInNlbGVjdGVkR3JpZEl0ZW1zIiwiZGF0YWdyaWQiLCJnZXRJbiIsImdyaWREYXRhIiwiSGllcmFyY2h5VHJlZVNlbGVjdG9yIiwib25UcmVlSXRlbVNlbGVjdCIsInNlbGVjdGVkS2V5cyIsIm9uU2VsZWN0Iiwic2V0U3RhdGUiLCJvbkRlbGV0ZUNsaWNrIiwiY2hpbGRLZXkiLCJnZXRUcmVlSXRlbSIsIm1vdmVJdGVtVG9HcmlkIiwic2hvd0RlbGV0ZUNvbmZpcm1hdGlvbiIsIm9uQWRkTmV3Q2xpY2siLCJkYXRhIiwiY2FsbGJhY2siLCJvbkNoYW5nZSIsInRyZWVEYXRhIiwiaWRLZXkiLCJuZXdJdGVtcyIsInNsaWNlIiwicHVzaCIsImFjdGlvbiIsInR5cGUiLCJnZXRVcGRhdGVkVHJlZSIsInBhcmVudCIsImV4cGFuZFBhcmVudCIsIm9uTW92ZVRvR3JpZENsaWNrIiwib25PcmRlckNsaWNrIiwiaXRlbXMiLCJvbk1vdmVUb1RyZWVDbGljayIsInNlbGVjdGVkSWQiLCJmaWx0ZXIiLCJpbmNsdWRlcyIsImkiLCJnZXQiLCJ0b0pTIiwibmV3R3JpZEl0ZW1zIiwiaXRlbSIsInNldERhdGFUb0dyaWQiLCJvbklucHV0Q2hhbmdlIiwidmFsdWUiLCJvbkV4cGFuZCIsImlkcyIsImV4cGFuZGVkS2V5cyIsImFycmF5IiwiZm91bmQiLCJ2YWx1ZUtleSIsInJlbW92ZUFjdGlvbnMiLCJyb290SXRlbSIsImZpbmQiLCJsZW5ndGgiLCJnZXRBbGxMZWFmcyIsImRlc2VsZWN0SXRlbSIsImNoaWxkIiwiZmlsdGVyZWRDaGlsZHJlbiIsImNoaWxkSXRlbSIsImNvbmNhdCIsIlR5cGVFcnJvciIsImFscmVhZHlGb3VuZCIsImxlYWZzIiwicmV0dXJuUGFyZW50IiwiZm9yRWFjaCIsImdldEFkamFjZW50SXRlbSIsImdldEFkamFjZW50SXRlbUlkIiwicGFyZW50QXJyIiwiQXJyYXkiLCJpc0FycmF5IiwiaW5kZXgiLCJmaW5kSW5kZXgiLCJhZGphY2VudEl0ZW0iLCJzZXROZXdJdGVtcyIsImdyaWRDb2x1bW5zIiwic2VsZWN0ZWRLZXkiLCJuZXh0U2VsZWN0ZWRLZXkiLCJwYXJlbnRJZCIsImV4cGFuZGVkSWQiLCJuZXdFeHBhbmRlZEtleXMiLCJjbG9zZURlbGV0ZUNvbmZpcm1hdGlvbkRpYWxvZyIsImRlbGV0ZVBhcmVudCIsInJlbmRlckhlYWRlclJpZ2h0IiwidHJhbnNsYXRpb25zIiwicmVuZGVyIiwiY2xhc3NOYW1lIiwibWVyZ2VkR3JpZCIsIk9iamVjdCIsImFzc2lnbiIsImRlZmF1bHRTaG93RmlsdGVyaW5nUm93IiwibWVyZ2VkVHJhbnNsYXRpb25zIiwiZGVmYXVsdFRyYW5zbGF0aW9ucyIsInRyZWVUaXRsZSIsImdyaWRUaXRsZSIsImRlbGV0ZUNvbmZpcm1EaWFsb2ciLCJSZWFjdCIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiLCJ1bmRlZmluZWQiLCJkZWZhdWx0RXhwYW5kQWxsIiwic2luZ2xlUm9vdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztB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LGdCQUFjUSxrQ0FOTTtBQU9wQjNGLE1BQUksZ0JBUGdCO0FBUXBCUSxZQUFVMEYsU0FSVTtBQVNwQmhGLFlBQVVnRixTQVRVO0FBVXBCQyxvQkFBa0IsSUFWRTtBQVdwQkMsY0FBWTtBQVhRLEM7a0JBdkJIL0YscUIiLCJmaWxlIjoiaGllcmFyY2h5LXRyZWUtc2VsZWN0b3IuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRyZWVDb21wb25lbnQgZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtdHJlZS1jb21wb25lbnQnO1xuaW1wb3J0IHsgUHJpbWl0aXZlIH0gZnJvbSAnQG9wdXNjYXBpdGEvb2MtY20tY29tbW9uLWxheW91dHMnO1xuaW1wb3J0IHsgRGF0YWdyaWQsIGdyaWRTaGFwZSwgZ3JpZENvbHVtblNoYXBlLCBEYXRhZ3JpZEFjdGlvbnMgfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1ncmlkJztcbmltcG9ydCBDb25maXJtRGlhbG9nIGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWNvbmZpcm1hdGlvbi1kaWFsb2cnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHsgTGlzdCwgZnJvbUpTIH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCBJbW11dGFibGVQcm9wVHlwZXMgZnJvbSAncmVhY3QtaW1tdXRhYmxlLXByb3B0eXBlcyc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuLy8gQXBwIGltcG9ydHNcbmltcG9ydCBDb250cm9sQmFyIGZyb20gJy4vaGllcmFyY2h5LXRyZWUtc2VsZWN0b3ItY29udHJvbC1iYXIuY29tcG9uZW50JztcbmltcG9ydCBBcnJvd0NvbnRyb2xzIGZyb20gJy4vaGllcmFyY2h5LXRyZWUtc2VsZWN0b3ItYXJyb3ctY29udHJvbHMuY29tcG9uZW50JztcbmltcG9ydCB7IGRlZmF1bHRUcmFuc2xhdGlvbnMgfSBmcm9tICcuL2hpZXJhcmNoeS10cmVlLnV0aWxzJztcblxuY29uc3QgQUNUSU9OX0JBUl9DT05UQUlORVJfSEVJR0hUID0gJzU0cHgnO1xuY29uc3QgVFJFRV9BQ1RJT05TID0ge1xuICBBRERfQ0hJTERSRU46ICdBRERfQ0hJTERSRU4nLFxuICBNT1ZFX0xFQUY6ICdNT1ZFX0xFQUYnLFxuICBSRU5BTUVfUEFSRU5UOiAnUkVOQU1FX1BBUkVOVCcsXG4gIERFTEVURV9QQVJFTlQ6ICdERUxFVEVfUEFSRU5UJyxcbn07XG5cbmNvbnN0IEdyaWQgPSBzdHlsZWQoRGF0YWdyaWQpYFxuICBoZWlnaHQ6IDEwMCU7XG4gICYmJiB7XG4gICAgcGFkZGluZzogMDtcbiAgfVxuYDtcblxuY29uc3QgQ29udGFpbmVyID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogZmxleDtcbiAgbWluLWhlaWdodDogMzAwcHg7XG4gID4gZGl2IHtcbiAgICB3aWR0aDogNTAlO1xuICAgIGZsZXg6IDEgMSAxMDAlO1xuICB9XG5gO1xuXG5jb25zdCBUcmVlQ29udGFpbmVyID0gc3R5bGVkLmRpdmBcbiAgaGVpZ2h0OiAxMDAlO1xuICAub2Mtc2Nyb2xsYmFyLWNvbnRhaW5lciB7XG4gICAgaGVpZ2h0OiBjYWxjKDEwMCUgLSAke0FDVElPTl9CQVJfQ09OVEFJTkVSX0hFSUdIVH0pO1xuICAgIHBhZGRpbmc6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuZ3V0dGVyV2lkdGh9O1xuICB9XG4gIC50cmVlLWhlYWRlciB7XG4gICAgbWluLWhlaWdodDogJHtBQ1RJT05fQkFSX0NPTlRBSU5FUl9IRUlHSFR9O1xuICAgIC5vcmRlcmluZy1hcnJvd3Mge1xuICAgICAgZm9udC13ZWlnaHQ6IDI0cHg7XG4gICAgfVxuICB9XG4gIC5vYy1yZWFjdC10cmVlIHtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgLnJjLXRyZWUtaWNvbkVsZS5yYy10cmVlLWljb25fX2N1c3RvbWl6ZSB7XG4gICAgICBkaXNwbGF5OiBub25lO1xuICAgIH1cbiAgfVxuYDtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0ge1xuICBzZXREYXRhOiBEYXRhZ3JpZEFjdGlvbnMuc2V0RGF0YSxcbiAgY2xlYXJTZWxlY3RlZEl0ZW1zOiBEYXRhZ3JpZEFjdGlvbnMuY2xlYXJTZWxlY3RlZEl0ZW1zLFxufTtcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlLCBwcm9wcykgPT4ge1xuICBjb25zdCBncmlkSWQgPSBwcm9wcy5ncmlkLmlkO1xuICByZXR1cm4ge1xuICAgIHNlbGVjdGVkR3JpZEl0ZW1zOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbZ3JpZElkLCAnc2VsZWN0ZWRJdGVtcyddLCBMaXN0KCkpLFxuICAgIGdyaWREYXRhOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbZ3JpZElkLCAnYWxsRGF0YSddLCBMaXN0KCkpLFxuICB9O1xufTtcblxuQGNvbm5lY3QoXG4gIG1hcFN0YXRlVG9Qcm9wcyxcbiAgbWFwRGlzcGF0Y2hUb1Byb3BzLFxuKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGllcmFyY2h5VHJlZVNlbGVjdG9yIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgaWRLZXk6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdmFsdWVLZXk6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2hpbGRLZXk6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdHJlZURhdGE6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zaGFwZSh7fSkpLFxuICAgIGdyaWQ6IGdyaWRTaGFwZS5pc1JlcXVpcmVkLFxuICAgIGdyaWRDb2x1bW5zOiBQcm9wVHlwZXMuYXJyYXlPZihncmlkQ29sdW1uU2hhcGUpLmlzUmVxdWlyZWQsXG4gICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHNldERhdGE6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgY2xlYXJTZWxlY3RlZEl0ZW1zOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHNlbGVjdGVkR3JpZEl0ZW1zOiBJbW11dGFibGVQcm9wVHlwZXMubGlzdC5pc1JlcXVpcmVkLFxuICAgIGdyaWREYXRhOiBJbW11dGFibGVQcm9wVHlwZXMubGlzdC5pc1JlcXVpcmVkLFxuICAgIHRyYW5zbGF0aW9uczogUHJvcFR5cGVzLnNoYXBlKHt9KSxcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkZWZhdWx0RXhwYW5kQWxsOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaW5nbGVSb290OiBQcm9wVHlwZXMuYm9vbCxcblxuICAgIC8vIENhbGxiYWNrc1xuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBpZEtleTogJ2lkJyxcbiAgICB2YWx1ZUtleTogJ25hbWUnLFxuICAgIGNoaWxkS2V5OiAnY2hpbGRyZW4nLFxuICAgIHRyZWVEYXRhOiBbXSxcbiAgICBjbGFzc05hbWU6ICcnLFxuICAgIHRyYW5zbGF0aW9uczogZGVmYXVsdFRyYW5zbGF0aW9ucyxcbiAgICBpZDogJ2hpZXJhcmNoeS10cmVlJyxcbiAgICBvblNlbGVjdDogdW5kZWZpbmVkLFxuICAgIG9uQ2hhbmdlOiB1bmRlZmluZWQsXG4gICAgZGVmYXVsdEV4cGFuZEFsbDogdHJ1ZSxcbiAgICBzaW5nbGVSb290OiB0cnVlLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzZWxlY3RlZEtleXM6IFtdLFxuICAgICAgZXhwYW5kZWRLZXlzOiBbXSxcbiAgICAgIHNob3dEZWxldGVDb25maXJtYXRpb246IGZhbHNlLFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0cyBhIHRyZWUgaXRlbVxuICAgKiBAcGFyYW0gc2VsZWN0ZWRLZXlzIChhcnJheSlcbiAgICovXG4gIG9uVHJlZUl0ZW1TZWxlY3QgPSAoc2VsZWN0ZWRLZXlzKSA9PiB7XG4gICAgY29uc3QgeyBvblNlbGVjdCB9ID0gdGhpcy5wcm9wcztcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRLZXlzIH0sICgpID0+IHtcbiAgICAgIGlmIChvblNlbGVjdCkgb25TZWxlY3Qoc2VsZWN0ZWRLZXlzKTtcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogRGlzcGxheXMgYSBjb25maXJtYXRpb24gZGlhbG9nXG4gICAqL1xuICBvbkRlbGV0ZUNsaWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgY2hpbGRLZXkgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAvLyBJZiBpdGVtIGlzIG5vdCBhIHBhcmVudCwgd2Ugd29uJ3Qgc2hvdyB0aGUgZGVsZXRlIGNvbmZpcm1hdGlvbiBkaWFsb2dcbiAgICBpZiAoIXRoaXMuZ2V0VHJlZUl0ZW0odGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF0pW2NoaWxkS2V5XSkge1xuICAgICAgdGhpcy5tb3ZlSXRlbVRvR3JpZCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHsgc2hvd0RlbGV0ZUNvbmZpcm1hdGlvbjogdHJ1ZSB9KTtcbiAgfTtcblxuICAvKipcbiAgICogQWRkcyBhIG5ldyBub2RlIHRvIHRoZSByb290IG9mIHRoZSB0cmVlLCBvciB1bmRlciBhIHNlbGVjdGVkIHRyZWUgbm9kZSB1c2luZ1xuICAgKiBBRERfQ0hJTERSRU4gYWN0aW9uXG4gICAqIEBwYXJhbSBkYXRhIC0gZGF0YSB0byBiZSBhZGRlZFxuICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICovXG4gIG9uQWRkTmV3Q2xpY2sgPSAoZGF0YSwgY2FsbGJhY2spID0+IHtcbiAgICBjb25zdCB7IG9uQ2hhbmdlLCB0cmVlRGF0YSwgaWRLZXkgfSA9IHRoaXMucHJvcHM7XG4gICAgbGV0IG5ld0l0ZW1zID0gdHJlZURhdGEuc2xpY2UoKTtcblxuICAgIC8vIElmIG5vIHRyZWUgbm9kZSBpcyBzZWxlY3RlZCwgd2UnbGwgcGxhY2UgdGhlIG5ldyBpdGVtIHRvIHRoZSByb290XG4gICAgLy8gb2YgdGhlIHRyZWVcbiAgICBpZiAoIXRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdKSB7XG4gICAgICBuZXdJdGVtcy5wdXNoKGRhdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBhY3Rpb24gPSB7XG4gICAgICAgIHR5cGU6IFRSRUVfQUNUSU9OUy5BRERfQ0hJTERSRU4sXG4gICAgICAgIGRhdGEsXG4gICAgICB9O1xuICAgICAgbmV3SXRlbXMgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdLCB0cmVlRGF0YSwgYWN0aW9uKTtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkS2V5czogW2RhdGFbaWRLZXldXSB9LCAoKSA9PiB7XG4gICAgICAvLyBJZiB0aGUgcGFyZW50IGlzIG5vdCB5ZXQgZXhwYW5kZWQsIHdlIHdpbGwgZXhwYW5kIGl0IG5vd1xuICAgICAgY29uc3QgcGFyZW50ID0gdGhpcy5nZXRUcmVlSXRlbShkYXRhW2lkS2V5XSwgdHJlZURhdGEsIHRydWUpIHx8IHt9O1xuICAgICAgdGhpcy5leHBhbmRQYXJlbnQocGFyZW50W2lkS2V5XSk7XG5cbiAgICAgIGlmIChvbkNoYW5nZSkgb25DaGFuZ2UobmV3SXRlbXMpO1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9KTtcbiAgfTtcblxuICBvbk1vdmVUb0dyaWRDbGljayA9ICgpID0+IHtcbiAgICB0aGlzLm1vdmVJdGVtVG9HcmlkKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIENhbGxzIG9uQ2hhbmdlIGNhbGxiYWNrIHdoZW5ldmVyIHVzZXIgcmVvcmRlcnMgdHJlZSBpdGVtcyB1c2luZyBvcmRlcmluZyBhcnJvd3NcbiAgICogQHBhcmFtIGl0ZW1zXG4gICAqL1xuICBvbk9yZGVyQ2xpY2sgPSAoaXRlbXMpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKGl0ZW1zKTtcbiAgfTtcblxuICAvKipcbiAgICogQWRkcyBzZWxlY3RlZCBncmlkIGl0ZW1zIHRvIHRoZSBjaG9zZW4gdHJlZSBub2RlIHVzaW5nIEFERF9DSElMRFJFTiBhY3Rpb25cbiAgICovXG4gIG9uTW92ZVRvVHJlZUNsaWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIG9uQ2hhbmdlLCBzZWxlY3RlZEdyaWRJdGVtcywgZ3JpZERhdGEsIHRyZWVEYXRhLCBpZEtleSxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzZWxlY3RlZElkID0gdGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF07XG5cbiAgICBjb25zdCBhY3Rpb24gPSB7XG4gICAgICB0eXBlOiBUUkVFX0FDVElPTlMuQUREX0NISUxEUkVOLFxuICAgICAgZGF0YTogZ3JpZERhdGEuZmlsdGVyKGkgPT4gc2VsZWN0ZWRHcmlkSXRlbXMuaW5jbHVkZXMoaS5nZXQoaWRLZXkpKSkudG9KUygpLFxuICAgIH07XG4gICAgY29uc3QgbmV3SXRlbXMgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKHNlbGVjdGVkSWQsIHRyZWVEYXRhLCBhY3Rpb24pO1xuICAgIGNvbnN0IG5ld0dyaWRJdGVtcyA9IGdyaWREYXRhLmZpbHRlcihpdGVtID0+ICFzZWxlY3RlZEdyaWRJdGVtcy5pbmNsdWRlcyhpdGVtLmdldChpZEtleSkpKTtcblxuICAgIHRoaXMuZXhwYW5kUGFyZW50KHNlbGVjdGVkSWQsIHRydWUpO1xuICAgIHRoaXMuc2V0RGF0YVRvR3JpZChuZXdHcmlkSXRlbXMsIHRydWUpO1xuICAgIGlmIChvbkNoYW5nZSkgb25DaGFuZ2UobmV3SXRlbXMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZW5hbWVzIHRoZSBjaG9zZW4gdHJlZSBub2RlIHVzaW5nIGEgUkVOQU1FX1BBUkVOVCBhY3Rpb25cbiAgICogQHBhcmFtIHZhbHVlXG4gICAqL1xuICBvbklucHV0Q2hhbmdlID0gKHZhbHVlKSA9PiB7XG4gICAgY29uc3QgeyB0cmVlRGF0YSwgb25DaGFuZ2UgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgYWN0aW9uID0ge1xuICAgICAgdHlwZTogVFJFRV9BQ1RJT05TLlJFTkFNRV9QQVJFTlQsXG4gICAgICBkYXRhOiB2YWx1ZSxcbiAgICB9O1xuICAgIGNvbnN0IG5ld0l0ZW1zID0gdGhpcy5nZXRVcGRhdGVkVHJlZSh0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXSwgdHJlZURhdGEsIGFjdGlvbik7XG4gICAgaWYgKG9uQ2hhbmdlKSBvbkNoYW5nZShuZXdJdGVtcyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEZpcmVkIG9uIGV4cGFuZFxuICAgKiBAcGFyYW0gaWRzXG4gICAqL1xuICBvbkV4cGFuZCA9IChpZHMpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGV4cGFuZGVkS2V5czogaWRzLFxuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHVwZGF0ZWQgdHJlZSBpdGVtcy5cbiAgICogQHBhcmFtIGlkIC0gdGFyZ2V0IGl0ZW1cbiAgICogQHBhcmFtIGFycmF5IC0gYXJyYXkgd2hlcmUgdGFyZ2V0IGl0ZW0gaXMgYmVpbmcgc2VhcmNoZWRcbiAgICogQHBhcmFtIGFjdGlvbiAtIGFjdGlvbiB0byBiZSBwZXJmb3JtZWQge3R5cGUsIGRhdGF9XG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgZ2V0VXBkYXRlZFRyZWUgPSAoaWQsIGFycmF5ID0gdGhpcy5wcm9wcy50cmVlRGF0YSwgYWN0aW9uKSA9PiB7XG4gICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgY29uc3QgeyBpZEtleSwgY2hpbGRLZXksIHZhbHVlS2V5IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IG5ld0l0ZW1zID0gYXJyYXkuc2xpY2UoKTtcbiAgICBjb25zdCByZW1vdmVBY3Rpb25zID0gW1RSRUVfQUNUSU9OUy5NT1ZFX0xFQUYsIFRSRUVfQUNUSU9OUy5ERUxFVEVfUEFSRU5UXTtcblxuICAgIC8vIElmIGRlbGV0ZWQgcGFyZW50IGl0ZW0gaXMgaW4gdGhlIHJvb3Qgbm9kZVxuICAgIGlmIChhY3Rpb24udHlwZSA9PT0gVFJFRV9BQ1RJT05TLkRFTEVURV9QQVJFTlQpIHtcbiAgICAgIGNvbnN0IHJvb3RJdGVtID0gYXJyYXkuZmluZChpdGVtID0+IGl0ZW1baWRLZXldID09PSBpZCk7XG4gICAgICBpZiAocm9vdEl0ZW0pIHtcbiAgICAgICAgaWYgKHJvb3RJdGVtW2NoaWxkS2V5XS5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLnNldERhdGFUb0dyaWQoZnJvbUpTKHRoaXMuZ2V0QWxsTGVhZnMocm9vdEl0ZW1bY2hpbGRLZXldKSkpO1xuICAgICAgICAgIHRoaXMuZGVzZWxlY3RJdGVtKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ld0l0ZW1zLmZpbHRlcihpdGVtID0+IGl0ZW1baWRLZXldICE9PSBpZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdJdGVtcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3QgaXRlbSA9IG5ld0l0ZW1zW2ldO1xuICAgICAgaWYgKHJlbW92ZUFjdGlvbnMuaW5jbHVkZXMoYWN0aW9uLnR5cGUpICYmIGl0ZW1bY2hpbGRLZXldICYmICFmb3VuZCkge1xuICAgICAgICBmb3VuZCA9ICEhaXRlbVtjaGlsZEtleV0uZmluZChjaGlsZCA9PiBjaGlsZFtpZEtleV0gPT09IGlkKTtcbiAgICAgICAgaWYgKGZvdW5kKSB7XG4gICAgICAgICAgLy8gV2hlbiByZW1vdmluZyBhbiBpdGVtIHdlIG11c3QgZmlyc3QgZmluZCBpdHMgcGFyZW50IGFuZCBhbHRlciBpdHMgY2hpbGRyZW4gYXJyYXlcbiAgICAgICAgICBpZiAoYWN0aW9uLnR5cGUgPT09IFRSRUVfQUNUSU9OUy5NT1ZFX0xFQUYpIHtcbiAgICAgICAgICAgIGl0ZW1bY2hpbGRLZXldID0gaXRlbVtjaGlsZEtleV0uZmlsdGVyKGNoaWxkID0+IGNoaWxkW2lkS2V5XSAhPT0gaWQpO1xuICAgICAgICAgICAgdGhpcy5kZXNlbGVjdEl0ZW0oKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGFjdGlvbi50eXBlID09PSBUUkVFX0FDVElPTlMuREVMRVRFX1BBUkVOVCkge1xuICAgICAgICAgICAgLy8gd2UgbXVzdCBmaXJzdCBmaWx0ZXIgdGhlIGNoaWxkcmVuLCBzbyB0aGF0IHdlIHdvbid0IGdldCBsZWFmcyBmcm9tXG4gICAgICAgICAgICAvLyBvdGhlciBjaGlsZCBicmFuY2hlc1xuICAgICAgICAgICAgY29uc3QgZmlsdGVyZWRDaGlsZHJlbiA9IGl0ZW1bY2hpbGRLZXldLmZpbHRlcihjaGlsZEl0ZW0gPT4gY2hpbGRJdGVtW2lkS2V5XSA9PT0gaWQpO1xuICAgICAgICAgICAgdGhpcy5zZXREYXRhVG9HcmlkKGZyb21KUyh0aGlzLmdldEFsbExlYWZzKGZpbHRlcmVkQ2hpbGRyZW4pKSk7XG4gICAgICAgICAgICB0aGlzLmRlc2VsZWN0SXRlbSgpO1xuICAgICAgICAgICAgaXRlbVtjaGlsZEtleV0gPSBpdGVtW2NoaWxkS2V5XS5maWx0ZXIoY2hpbGRJdGVtID0+IGNoaWxkSXRlbVtpZEtleV0gIT09IGlkKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1baWRLZXldID09PSBpZCAmJiAhZm91bmQpIHtcbiAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgICAgY2FzZSBUUkVFX0FDVElPTlMuQUREX0NISUxEUkVOOlxuICAgICAgICAgICAgaXRlbVtjaGlsZEtleV0gPSAoaXRlbVtjaGlsZEtleV0gfHwgW10pLmNvbmNhdChhY3Rpb24uZGF0YSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIFRSRUVfQUNUSU9OUy5SRU5BTUVfUEFSRU5UOlxuICAgICAgICAgICAgaXRlbVt2YWx1ZUtleV0gPSBhY3Rpb24uZGF0YTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBY3Rpb24gdHlwZSBpcyB1bmRlZmluZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtW2NoaWxkS2V5XSAmJiAhZm91bmQpIGZvdW5kID0gdGhpcy5nZXRVcGRhdGVkVHJlZShpZCwgaXRlbVtjaGlsZEtleV0sIGFjdGlvbik7XG4gICAgfVxuXG4gICAgaWYgKCFmb3VuZCkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiBuZXdJdGVtcztcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyByZWN1cnNpdmVseSBhbGwgbGVhZiBpdGVtcyBmcm9tIGEgZ2l2ZW4gYXJyYXlcbiAgICogQHBhcmFtIGFycmF5XG4gICAqIEBwYXJhbSBhbHJlYWR5Rm91bmQgKHVzZWQgcmVjdXJzaXZlbHkpXG4gICAqL1xuICBnZXRBbGxMZWFmcyA9IChhcnJheSwgYWxyZWFkeUZvdW5kID0gW10pID0+IHtcbiAgICBjb25zdCB7IGNoaWxkS2V5IH0gPSB0aGlzLnByb3BzO1xuICAgIGxldCBsZWFmcyA9IGFscmVhZHlGb3VuZDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSBhcnJheVtpXTtcbiAgICAgIGlmIChpdGVtW2NoaWxkS2V5XSkge1xuICAgICAgICBsZWFmcyA9IHRoaXMuZ2V0QWxsTGVhZnMoaXRlbVtjaGlsZEtleV0sIGFscmVhZHlGb3VuZCk7XG4gICAgICB9XG4gICAgICBpZiAoIWl0ZW1bY2hpbGRLZXldKSBsZWFmcy5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgICByZXR1cm4gbGVhZnM7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSB0cmVlIGl0ZW0gYnkgSURcbiAgICogQHBhcmFtIGlkXG4gICAqIEBwYXJhbSBhcnJheVxuICAgKiBAcGFyYW0gcmV0dXJuUGFyZW50IC0gcmV0dXJuIGl0ZW0ncyBwYXJlbnQgaW5zdGVhZCBvZiB0aGUgaXRlbVxuICAgKiBAcGFyYW0gcGFyZW50IC0gcGFyZW50IGl0ZW0gKHVzZWQgcmVjdXJzaXZlbHkpXG4gICAqIEByZXR1cm5zIHt7fX1cbiAgICovXG4gIGdldFRyZWVJdGVtID0gKGlkLCBhcnJheSA9IHRoaXMucHJvcHMudHJlZURhdGEsIHJldHVyblBhcmVudCA9IGZhbHNlLCBwYXJlbnQgPSBudWxsKSA9PiB7XG4gICAgY29uc3QgeyBjaGlsZEtleSwgaWRLZXkgfSA9IHRoaXMucHJvcHM7XG4gICAgbGV0IGZvdW5kID0gYXJyYXkuZmluZChpdGVtID0+IGl0ZW1baWRLZXldID09PSBpZCk7XG5cbiAgICBpZiAoZm91bmQgJiYgcmV0dXJuUGFyZW50KSBmb3VuZCA9IHBhcmVudDtcblxuICAgIGlmICghZm91bmQpIHtcbiAgICAgIGFycmF5LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgaWYgKGl0ZW1bY2hpbGRLZXldICYmICFmb3VuZCkge1xuICAgICAgICAgIGZvdW5kID0gdGhpcy5nZXRUcmVlSXRlbShpZCwgaXRlbVtjaGlsZEtleV0sIHJldHVyblBhcmVudCwgaXRlbSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gZm91bmQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIEdldCBhZGphY2VudCBpdGVtIChpZCkgaW4gcGFyZW50IGFycmF5LiBVc2VkIHdoZW4gbW92aW5nIGl0ZW1zIGZyb20gdHJlZVxuICAgKiB0byBncmlkL2RlbGV0aW5nIGFuIGl0ZW1cbiAgICogQHBhcmFtIGlkXG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgZ2V0QWRqYWNlbnRJdGVtID0gKGlkKSA9PiB7XG4gICAgaWYgKCFpZCkgcmV0dXJuIG51bGw7XG4gICAgY29uc3QgeyBjaGlsZEtleSwgaWRLZXksIHRyZWVEYXRhIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgZ2V0QWRqYWNlbnRJdGVtSWQgPSAocGFyZW50KSA9PiB7XG4gICAgICBjb25zdCBwYXJlbnRBcnIgPSBBcnJheS5pc0FycmF5KHBhcmVudCkgPyBwYXJlbnQgOiBwYXJlbnRbY2hpbGRLZXldO1xuICAgICAgY29uc3QgaW5kZXggPSBwYXJlbnRBcnIuZmluZEluZGV4KGNoaWxkID0+IGNoaWxkW2lkS2V5XSA9PT0gaWQpO1xuICAgICAgbGV0IGFkamFjZW50SXRlbSA9IHBhcmVudEFycltpbmRleCArIDFdO1xuICAgICAgaWYgKCFhZGphY2VudEl0ZW0pIGFkamFjZW50SXRlbSA9IHBhcmVudEFycltpbmRleCAtIDFdO1xuICAgICAgaWYgKCFhZGphY2VudEl0ZW0gJiYgIUFycmF5LmlzQXJyYXkocGFyZW50KSkgYWRqYWNlbnRJdGVtID0gcGFyZW50O1xuICAgICAgaWYgKCFhZGphY2VudEl0ZW0pIHJldHVybiBudWxsO1xuXG4gICAgICByZXR1cm4gYWRqYWNlbnRJdGVtW2lkS2V5XTtcbiAgICB9O1xuXG4gICAgY29uc3QgcGFyZW50ID0gdGhpcy5nZXRUcmVlSXRlbShpZCwgdGhpcy5wcm9wcy50cmVlRGF0YSwgdHJ1ZSk7XG4gICAgcmV0dXJuIHBhcmVudCA/IGdldEFkamFjZW50SXRlbUlkKHBhcmVudCkgOiBnZXRBZGphY2VudEl0ZW1JZCh0cmVlRGF0YSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEFwcGVuZHMgcHJvdmlkZWQgaXRlbXMgdG8gdGhlIGdyaWRcbiAgICogQHBhcmFtIGl0ZW1zIC0gaW1tdXRhYmxlIGFycmF5IG9mIGl0ZW1zIHRvIGJlIGFwcGVuZGVkIHRvIGdyaWRcbiAgICogQHBhcmFtIHNldE5ld0l0ZW1zIC0gc2V0IGNvbXBsZXRlbHkgYSBuZXcgYXJyYXkgb2YgaXRlbXNcbiAgICovXG4gIHNldERhdGFUb0dyaWQgPSAoaXRlbXMsIHNldE5ld0l0ZW1zID0gZmFsc2UpID0+IHtcbiAgICBsZXQgZGF0YSA9IExpc3QoKTtcbiAgICBjb25zdCB7IGdyaWQsIGdyaWRDb2x1bW5zLCBncmlkRGF0YSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIXNldE5ld0l0ZW1zKSBkYXRhID0gZ3JpZERhdGEuc2xpY2UoKTtcbiAgICBjb25zdCBuZXdHcmlkSXRlbXMgPSBkYXRhLmNvbmNhdChpdGVtcyk7XG5cbiAgICB0aGlzLnByb3BzLnNldERhdGEoZ3JpZCwgZ3JpZENvbHVtbnMsIG5ld0dyaWRJdGVtcyk7XG4gICAgdGhpcy5wcm9wcy5jbGVhclNlbGVjdGVkSXRlbXMoZ3JpZCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgdGhlIGNob3NlbiBpdGVtIGZyb20gYSB0cmVlIGFuZCB1cGRhdGVzIHRoZSBncmlkIHVzaW5nIE1PVkVfTEVBRlxuICAgKiBhY3Rpb25cbiAgICovXG4gIG1vdmVJdGVtVG9HcmlkID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgdHJlZURhdGEsIG9uQ2hhbmdlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHNlbGVjdGVkS2V5ID0gdGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF07XG4gICAgY29uc3QgYWN0aW9uID0ge1xuICAgICAgdHlwZTogVFJFRV9BQ1RJT05TLk1PVkVfTEVBRixcbiAgICAgIGRhdGE6IHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdLFxuICAgIH07XG4gICAgY29uc3QgbmV4dFNlbGVjdGVkS2V5ID0gdGhpcy5nZXRBZGphY2VudEl0ZW0oc2VsZWN0ZWRLZXkpO1xuICAgIGNvbnN0IG5ld0dyaWRJdGVtcyA9IGZyb21KUyhbdGhpcy5nZXRUcmVlSXRlbShzZWxlY3RlZEtleSldKTtcbiAgICBjb25zdCBuZXdJdGVtcyA9IHRoaXMuZ2V0VXBkYXRlZFRyZWUoc2VsZWN0ZWRLZXksIHRyZWVEYXRhLCBhY3Rpb24pO1xuXG4gICAgdGhpcy5zZXREYXRhVG9HcmlkKG5ld0dyaWRJdGVtcyk7XG4gICAgaWYgKG9uQ2hhbmdlKSBvbkNoYW5nZShuZXdJdGVtcyk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzZWxlY3RlZEtleXM6IFtuZXh0U2VsZWN0ZWRLZXldLFxuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBFeHBhbmRzIGEgcGFyZW50XG4gICAqIEBwYXJhbSBwYXJlbnRJZFxuICAgKi9cbiAgZXhwYW5kUGFyZW50ID0gKHBhcmVudElkKSA9PiB7XG4gICAgaWYgKHBhcmVudElkICYmICF0aGlzLnN0YXRlLmV4cGFuZGVkS2V5cy5maW5kKGV4cGFuZGVkSWQgPT4gZXhwYW5kZWRJZCA9PT0gcGFyZW50SWQpKSB7XG4gICAgICBjb25zdCBuZXdFeHBhbmRlZEtleXMgPSB0aGlzLnN0YXRlLmV4cGFuZGVkS2V5cy5zbGljZSgpO1xuICAgICAgbmV3RXhwYW5kZWRLZXlzLnB1c2gocGFyZW50SWQpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGV4cGFuZGVkS2V5czogbmV3RXhwYW5kZWRLZXlzIH0pO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogQ2xvc2VzIGRlbGV0ZSBjb25maXJtYXRpb24gZGlhbG9nXG4gICAqL1xuICBjbG9zZURlbGV0ZUNvbmZpcm1hdGlvbkRpYWxvZyA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2hvd0RlbGV0ZUNvbmZpcm1hdGlvbjogZmFsc2UgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIERlbGV0ZXMgYSBwYXJlbnQgbm9kZVxuICAgKi9cbiAgZGVsZXRlUGFyZW50ID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgb25DaGFuZ2UsIHRyZWVEYXRhIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHNlbGVjdGVkS2V5ID0gdGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF07XG4gICAgY29uc3QgYWN0aW9uID0ge1xuICAgICAgdHlwZTogVFJFRV9BQ1RJT05TLkRFTEVURV9QQVJFTlQsXG4gICAgfTtcbiAgICBjb25zdCBuZXh0U2VsZWN0ZWRLZXkgPSB0aGlzLmdldEFkamFjZW50SXRlbShzZWxlY3RlZEtleSk7XG4gICAgY29uc3QgbmV3SXRlbXMgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKHNlbGVjdGVkS2V5LCB0cmVlRGF0YSwgYWN0aW9uKTtcbiAgICBpZiAob25DaGFuZ2UpIG9uQ2hhbmdlKG5ld0l0ZW1zKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNlbGVjdGVkS2V5czogW25leHRTZWxlY3RlZEtleV0sXG4gICAgICBzaG93RGVsZXRlQ29uZmlybWF0aW9uOiBmYWxzZSxcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogRGVzZWxlY3RzIGFuIGl0ZW0sIGlmIGl0IGlzIGUuZy4gcmVtb3ZlZFxuICAgKi9cbiAgZGVzZWxlY3RJdGVtID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZEtleXM6IFtdIH0pO1xuICB9O1xuXG4gIHJlbmRlckhlYWRlclJpZ2h0ID0gdHJhbnNsYXRpb25zID0+IChcbiAgICA8Q29udHJvbEJhclxuICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICBvbkFkZE5ld0NsaWNrPXt0aGlzLm9uQWRkTmV3Q2xpY2t9XG4gICAgICBvbkRlbGV0ZUNsaWNrPXt0aGlzLm9uRGVsZXRlQ2xpY2t9XG4gICAgICBvbklucHV0Q2hhbmdlPXt0aGlzLm9uSW5wdXRDaGFuZ2V9XG4gICAgICBzZWxlY3RlZFRyZWVJdGVtPXt0aGlzLmdldFRyZWVJdGVtKHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdKX1cbiAgICAgIGhlaWdodD17QUNUSU9OX0JBUl9DT05UQUlORVJfSEVJR0hUfVxuICAgICAgdHJhbnNsYXRpb25zPXt0cmFuc2xhdGlvbnN9XG4gICAgLz5cbiAgKTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgdmFsdWVLZXksXG4gICAgICBpZEtleSxcbiAgICAgIHRyZWVEYXRhLFxuICAgICAgZ3JpZCxcbiAgICAgIGdyaWRDb2x1bW5zLFxuICAgICAgY2xhc3NOYW1lLFxuICAgICAgdHJhbnNsYXRpb25zLFxuICAgICAgY2hpbGRLZXksXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBtZXJnZWRHcmlkID0gT2JqZWN0LmFzc2lnbih7fSwgZ3JpZCwgeyBkZWZhdWx0U2hvd0ZpbHRlcmluZ1JvdzogdHJ1ZSB9KTtcbiAgICBjb25zdCBtZXJnZWRUcmFuc2xhdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0VHJhbnNsYXRpb25zLCB0cmFuc2xhdGlvbnMpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxSZWFjdC5GcmFnbWVudD5cbiAgICAgICAgPENvbnRhaW5lciBjbGFzc05hbWU9e2NsYXNzTmFtZX0+XG4gICAgICAgICAgPFRyZWVDb250YWluZXI+XG4gICAgICAgICAgICA8VHJlZUNvbXBvbmVudFxuICAgICAgICAgICAgICB0cmVlRGF0YT17dHJlZURhdGF9XG4gICAgICAgICAgICAgIGRhdGFMb29rVXBLZXk9e2lkS2V5fVxuICAgICAgICAgICAgICBkYXRhTG9va1VwVmFsdWU9e3ZhbHVlS2V5fVxuICAgICAgICAgICAgICBkYXRhTG9va1VwQ2hpbGRyZW49e2NoaWxkS2V5fVxuICAgICAgICAgICAgICBvblNlbGVjdD17dGhpcy5vblRyZWVJdGVtU2VsZWN0fVxuICAgICAgICAgICAgICBvbkV4cGFuZD17dGhpcy5vbkV4cGFuZH1cbiAgICAgICAgICAgICAgY2hlY2thYmxlPXtmYWxzZX1cbiAgICAgICAgICAgICAgc2VsZWN0ZWRLZXlzPXt0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c31cbiAgICAgICAgICAgICAgZXhwYW5kZWRLZXlzPXt0aGlzLnN0YXRlLmV4cGFuZGVkS2V5c31cbiAgICAgICAgICAgICAgb25PcmRlckJ1dHRvbkNsaWNrPXt0aGlzLm9uT3JkZXJDbGlja31cbiAgICAgICAgICAgICAgdGl0bGU9e21lcmdlZFRyYW5zbGF0aW9ucy50cmVlVGl0bGV9XG4gICAgICAgICAgICAgIHNlbGVjdGFibGVcbiAgICAgICAgICAgICAgc2hvd09yZGVyaW5nQXJyb3dzXG4gICAgICAgICAgICAgIHNob3dFeHBhbmRBbGxcbiAgICAgICAgICAgICAgaGVhZGVyUmlnaHQ9e3RoaXMucmVuZGVySGVhZGVyUmlnaHQobWVyZ2VkVHJhbnNsYXRpb25zKX1cbiAgICAgICAgICAgICAgaGFuZGxlRXhwYW5kZWRLZXlzTWFudWFsbHlcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9UcmVlQ29udGFpbmVyPlxuICAgICAgICAgIDxBcnJvd0NvbnRyb2xzXG4gICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgIHNlbGVjdGVkVHJlZUl0ZW09e3RoaXMuZ2V0VHJlZUl0ZW0odGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF0pfVxuICAgICAgICAgICAgb25Nb3ZlVG9UcmVlQ2xpY2s9e3RoaXMub25Nb3ZlVG9UcmVlQ2xpY2t9XG4gICAgICAgICAgICBvbk1vdmVUb0dyaWRDbGljaz17dGhpcy5vbk1vdmVUb0dyaWRDbGlja31cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxHcmlkXG4gICAgICAgICAgICBncmlkPXttZXJnZWRHcmlkfVxuICAgICAgICAgICAgY29sdW1ucz17Z3JpZENvbHVtbnN9XG4gICAgICAgICAgICBtdWx0aVNlbGVjdFxuICAgICAgICAgICAgZmlsdGVyaW5nXG4gICAgICAgICAgICByb3dTZWxlY3RDaGVja2JveENvbHVtblxuICAgICAgICAgICAgZ3JpZEhlYWRlcj17PFByaW1pdGl2ZS5TdWJ0aXRsZT57bWVyZ2VkVHJhbnNsYXRpb25zLmdyaWRUaXRsZX08L1ByaW1pdGl2ZS5TdWJ0aXRsZT59XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9Db250YWluZXI+XG4gICAgICAgIHt0aGlzLnN0YXRlLnNob3dEZWxldGVDb25maXJtYXRpb24gJiYgKFxuICAgICAgICAgIDxDb25maXJtRGlhbG9nXG4gICAgICAgICAgICB0cmFuc2xhdGlvbnM9e21lcmdlZFRyYW5zbGF0aW9ucy5kZWxldGVDb25maXJtRGlhbG9nfVxuICAgICAgICAgICAgY29uZmlybUNhbGxiYWNrPXt0aGlzLmRlbGV0ZVBhcmVudH1cbiAgICAgICAgICAgIGNhbmNlbENhbGxiYWNrPXt0aGlzLmNsb3NlRGVsZXRlQ29uZmlybWF0aW9uRGlhbG9nfVxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG4gICAgICA8L1JlYWN0LkZyYWdtZW50PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==