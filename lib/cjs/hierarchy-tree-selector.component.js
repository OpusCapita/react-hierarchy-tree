'use strict';

exports.__esModule = true;
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _dec, _class, _class2, _temp;

var _templateObject = _taggedTemplateLiteralLoose(['\n  height: 100%;\n  &&& {\n    padding: 0;\n  }\n'], ['\n  height: 100%;\n  &&& {\n    padding: 0;\n  }\n']),
    _templateObject2 = _taggedTemplateLiteralLoose(['\n  display: flex;\n  min-height: 300px;\n  > div {\n    width: 50%;\n    flex: 1 1 100%;\n  }\n'], ['\n  display: flex;\n  min-height: 300px;\n  > div {\n    width: 50%;\n    flex: 1 1 100%;\n  }\n']),
    _templateObject3 = _taggedTemplateLiteralLoose(['\n  height:100%;\n  .oc-scrollbar-container {\n    height: calc(100% - ', ');\n    padding: ', ';\n  }\n  .tree-header {\n    min-height: ', ';\n    .ordering-arrows {\n      font-weight: 24px;\n    }\n  }\n  .oc-react-tree {\n    height: 100%;\n    .rc-tree-iconEle.rc-tree-icon__customize {\n        display:none;\n    }\n  }\n'], ['\n  height:100%;\n  .oc-scrollbar-container {\n    height: calc(100% - ', ');\n    padding: ', ';\n  }\n  .tree-header {\n    min-height: ', ';\n    .ordering-arrows {\n      font-weight: 24px;\n    }\n  }\n  .oc-react-tree {\n    height: 100%;\n    .rc-tree-iconEle.rc-tree-icon__customize {\n        display:none;\n    }\n  }\n']),
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
  defaultExpandAll: true,
  singleRoot: true
}, _temp)) || _class);
exports.default = HierarchyTreeSelector;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIkFDVElPTl9CQVJfQ09OVEFJTkVSX0hFSUdIVCIsIlRSRUVfQUNUSU9OUyIsIkFERF9DSElMRFJFTiIsIk1PVkVfTEVBRiIsIlJFTkFNRV9QQVJFTlQiLCJERUxFVEVfUEFSRU5UIiwiR3JpZCIsIkRhdGFncmlkIiwiQ29udGFpbmVyIiwic3R5bGVkIiwiZGl2IiwiVHJlZUNvbnRhaW5lciIsInByb3BzIiwidGhlbWUiLCJndXR0ZXJXaWR0aCIsIk5vSXRlbXNUZXh0IiwicCIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsInNldERhdGEiLCJEYXRhZ3JpZEFjdGlvbnMiLCJjbGVhclNlbGVjdGVkSXRlbXMiLCJtYXBTdGF0ZVRvUHJvcHMiLCJzdGF0ZSIsImdyaWRJZCIsImdyaWQiLCJpZCIsInNlbGVjdGVkR3JpZEl0ZW1zIiwiZGF0YWdyaWQiLCJnZXRJbiIsImdyaWREYXRhIiwiSGllcmFyY2h5VHJlZVNlbGVjdG9yIiwib25UcmVlSXRlbVNlbGVjdCIsInNlbGVjdGVkS2V5cyIsIm9uU2VsZWN0Iiwic2V0U3RhdGUiLCJvbkRlbGV0ZUNsaWNrIiwiY2hpbGRLZXkiLCJnZXRUcmVlSXRlbSIsIm1vdmVJdGVtVG9HcmlkIiwic2hvd0RlbGV0ZUNvbmZpcm1hdGlvbiIsIm9uQWRkTmV3Q2xpY2siLCJkYXRhIiwiY2FsbGJhY2siLCJvbkNoYW5nZSIsInRyZWVEYXRhIiwiaWRLZXkiLCJuZXdJdGVtcyIsInNsaWNlIiwicHVzaCIsImFjdGlvbiIsInR5cGUiLCJnZXRVcGRhdGVkVHJlZSIsInBhcmVudCIsImV4cGFuZFBhcmVudCIsIm9uTW92ZVRvR3JpZENsaWNrIiwib25PcmRlckNsaWNrIiwiaXRlbXMiLCJvbk1vdmVUb1RyZWVDbGljayIsInNlbGVjdGVkSWQiLCJmaWx0ZXIiLCJpbmNsdWRlcyIsImkiLCJnZXQiLCJ0b0pTIiwibmV3R3JpZEl0ZW1zIiwiaXRlbSIsInNldERhdGFUb0dyaWQiLCJvbklucHV0Q2hhbmdlIiwidmFsdWUiLCJvbkV4cGFuZCIsImlkcyIsImV4cGFuZGVkS2V5cyIsImFycmF5IiwiZm91bmQiLCJ2YWx1ZUtleSIsInJlbW92ZUFjdGlvbnMiLCJyb290SXRlbSIsImZpbmQiLCJsZW5ndGgiLCJnZXRBbGxMZWFmcyIsImRlc2VsZWN0SXRlbSIsImNoaWxkIiwiZmlsdGVyZWRDaGlsZHJlbiIsImNoaWxkSXRlbSIsImNvbmNhdCIsIlR5cGVFcnJvciIsImFscmVhZHlGb3VuZCIsImxlYWZzIiwicmV0dXJuUGFyZW50IiwiZm9yRWFjaCIsImdldEFkamFjZW50SXRlbSIsImdldEFkamFjZW50SXRlbUlkIiwicGFyZW50QXJyIiwiQXJyYXkiLCJpc0FycmF5IiwiaW5kZXgiLCJmaW5kSW5kZXgiLCJhZGphY2VudEl0ZW0iLCJzZXROZXdJdGVtcyIsImdyaWRDb2x1bW5zIiwic2VsZWN0ZWRLZXkiLCJuZXh0U2VsZWN0ZWRLZXkiLCJwYXJlbnRJZCIsImV4cGFuZGVkSWQiLCJuZXdFeHBhbmRlZEtleXMiLCJjbG9zZURlbGV0ZUNvbmZpcm1hdGlvbkRpYWxvZyIsImRlbGV0ZVBhcmVudCIsInJlbmRlckhlYWRlclJpZ2h0IiwidHJhbnNsYXRpb25zIiwicmVuZGVyIiwiY2xhc3NOYW1lIiwibWVyZ2VkR3JpZCIsIk9iamVjdCIsImFzc2lnbiIsImRlZmF1bHRTaG93RmlsdGVyaW5nUm93IiwibWVyZ2VkVHJhbnNsYXRpb25zIiwiZGVmYXVsdFRyYW5zbGF0aW9ucyIsInRyZWVUaXRsZSIsIm5vVHJlZUl0ZW1zIiwiZ3JpZFRpdGxlIiwiZGVsZXRlQ29uZmlybURpYWxvZyIsIlJlYWN0IiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyIsInVuZGVmaW5lZCIsImRlZmF1bHRFeHBhbmRBbGwiLCJzaW5nbGVSb290Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7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Z0IsZ0JBQU1DLGEsV0F1QmhEQyxZLEdBQWU7QUFDcEI5RSxTQUFPLElBRGE7QUFFcEI2QixZQUFVLE1BRlU7QUFHcEJ0QyxZQUFVLFVBSFU7QUFJcEJRLFlBQVUsRUFKVTtBQUtwQmtFLGFBQVcsRUFMUztBQU1wQkYsZ0JBQWNRLGtDQU5NO0FBT3BCM0YsTUFBSSxnQkFQZ0I7QUFRcEJRLFlBQVUyRixTQVJVO0FBU3BCakYsWUFBVWlGLFNBVFU7QUFVcEJDLG9CQUFrQixJQVZFO0FBV3BCQyxjQUFZO0FBWFEsQztrQkF2QkhoRyxxQiIsImZpbGUiOiJoaWVyYXJjaHktdHJlZS1zZWxlY3Rvci5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVHJlZUNvbXBvbmVudCBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC10cmVlLWNvbXBvbmVudCc7XG5pbXBvcnQgeyBQcmltaXRpdmUgfSBmcm9tICdAb3B1c2NhcGl0YS9vYy1jbS1jb21tb24tbGF5b3V0cyc7XG5pbXBvcnQgeyBEYXRhZ3JpZCwgZ3JpZFNoYXBlLCBncmlkQ29sdW1uU2hhcGUsIERhdGFncmlkQWN0aW9ucyB9IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWdyaWQnO1xuaW1wb3J0IENvbmZpcm1EaWFsb2cgZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtY29uZmlybWF0aW9uLWRpYWxvZyc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgeyBMaXN0LCBmcm9tSlMgfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IEltbXV0YWJsZVByb3BUeXBlcyBmcm9tICdyZWFjdC1pbW11dGFibGUtcHJvcHR5cGVzJztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG4vLyBBcHAgaW1wb3J0c1xuaW1wb3J0IENvbnRyb2xCYXIgZnJvbSAnLi9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci1jb250cm9sLWJhci5jb21wb25lbnQnO1xuaW1wb3J0IEFycm93Q29udHJvbHMgZnJvbSAnLi9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci1hcnJvdy1jb250cm9scy5jb21wb25lbnQnO1xuaW1wb3J0IHsgZGVmYXVsdFRyYW5zbGF0aW9ucyB9IGZyb20gJy4vaGllcmFyY2h5LXRyZWUudXRpbHMnO1xuXG5jb25zdCBBQ1RJT05fQkFSX0NPTlRBSU5FUl9IRUlHSFQgPSAnNTRweCc7XG5jb25zdCBUUkVFX0FDVElPTlMgPSB7XG4gIEFERF9DSElMRFJFTjogJ0FERF9DSElMRFJFTicsXG4gIE1PVkVfTEVBRjogJ01PVkVfTEVBRicsXG4gIFJFTkFNRV9QQVJFTlQ6ICdSRU5BTUVfUEFSRU5UJyxcbiAgREVMRVRFX1BBUkVOVDogJ0RFTEVURV9QQVJFTlQnLFxufTtcblxuY29uc3QgR3JpZCA9IHN0eWxlZChEYXRhZ3JpZClgXG4gIGhlaWdodDogMTAwJTtcbiAgJiYmIHtcbiAgICBwYWRkaW5nOiAwO1xuICB9XG5gO1xuXG5jb25zdCBDb250YWluZXIgPSBzdHlsZWQuZGl2YFxuICBkaXNwbGF5OiBmbGV4O1xuICBtaW4taGVpZ2h0OiAzMDBweDtcbiAgPiBkaXYge1xuICAgIHdpZHRoOiA1MCU7XG4gICAgZmxleDogMSAxIDEwMCU7XG4gIH1cbmA7XG5cbmNvbnN0IFRyZWVDb250YWluZXIgPSBzdHlsZWQuZGl2YFxuICBoZWlnaHQ6MTAwJTtcbiAgLm9jLXNjcm9sbGJhci1jb250YWluZXIge1xuICAgIGhlaWdodDogY2FsYygxMDAlIC0gJHtBQ1RJT05fQkFSX0NPTlRBSU5FUl9IRUlHSFR9KTtcbiAgICBwYWRkaW5nOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmd1dHRlcldpZHRofTtcbiAgfVxuICAudHJlZS1oZWFkZXIge1xuICAgIG1pbi1oZWlnaHQ6ICR7QUNUSU9OX0JBUl9DT05UQUlORVJfSEVJR0hUfTtcbiAgICAub3JkZXJpbmctYXJyb3dzIHtcbiAgICAgIGZvbnQtd2VpZ2h0OiAyNHB4O1xuICAgIH1cbiAgfVxuICAub2MtcmVhY3QtdHJlZSB7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIC5yYy10cmVlLWljb25FbGUucmMtdHJlZS1pY29uX19jdXN0b21pemUge1xuICAgICAgICBkaXNwbGF5Om5vbmU7XG4gICAgfVxuICB9XG5gO1xuXG5jb25zdCBOb0l0ZW1zVGV4dCA9IHN0eWxlZC5wYFxuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG5gO1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSB7XG4gIHNldERhdGE6IERhdGFncmlkQWN0aW9ucy5zZXREYXRhLFxuICBjbGVhclNlbGVjdGVkSXRlbXM6IERhdGFncmlkQWN0aW9ucy5jbGVhclNlbGVjdGVkSXRlbXMsXG59O1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUsIHByb3BzKSA9PiB7XG4gIGNvbnN0IGdyaWRJZCA9IHByb3BzLmdyaWQuaWQ7XG4gIHJldHVybiB7XG4gICAgc2VsZWN0ZWRHcmlkSXRlbXM6IHN0YXRlLmRhdGFncmlkLmdldEluKFtncmlkSWQsICdzZWxlY3RlZEl0ZW1zJ10sIExpc3QoKSksXG4gICAgZ3JpZERhdGE6IHN0YXRlLmRhdGFncmlkLmdldEluKFtncmlkSWQsICdhbGxEYXRhJ10sIExpc3QoKSksXG4gIH07XG59O1xuXG5AY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcylcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhpZXJhcmNoeVRyZWVTZWxlY3RvciBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGlkS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHZhbHVlS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNoaWxkS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHRyZWVEYXRhOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc2hhcGUoe30pKSxcbiAgICBncmlkOiBncmlkU2hhcGUuaXNSZXF1aXJlZCxcbiAgICBncmlkQ29sdW1uczogUHJvcFR5cGVzLmFycmF5T2YoZ3JpZENvbHVtblNoYXBlKS5pc1JlcXVpcmVkLFxuICAgIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBzZXREYXRhOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGNsZWFyU2VsZWN0ZWRJdGVtczogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBzZWxlY3RlZEdyaWRJdGVtczogSW1tdXRhYmxlUHJvcFR5cGVzLmxpc3QuaXNSZXF1aXJlZCxcbiAgICBncmlkRGF0YTogSW1tdXRhYmxlUHJvcFR5cGVzLmxpc3QuaXNSZXF1aXJlZCxcbiAgICB0cmFuc2xhdGlvbnM6IFByb3BUeXBlcy5zaGFwZSh7fSksXG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGVmYXVsdEV4cGFuZEFsbDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2luZ2xlUm9vdDogUHJvcFR5cGVzLmJvb2wsXG5cbiAgICAvLyBDYWxsYmFja3NcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgaWRLZXk6ICdpZCcsXG4gICAgdmFsdWVLZXk6ICduYW1lJyxcbiAgICBjaGlsZEtleTogJ2NoaWxkcmVuJyxcbiAgICB0cmVlRGF0YTogW10sXG4gICAgY2xhc3NOYW1lOiAnJyxcbiAgICB0cmFuc2xhdGlvbnM6IGRlZmF1bHRUcmFuc2xhdGlvbnMsXG4gICAgaWQ6ICdoaWVyYXJjaHktdHJlZScsXG4gICAgb25TZWxlY3Q6IHVuZGVmaW5lZCxcbiAgICBvbkNoYW5nZTogdW5kZWZpbmVkLFxuICAgIGRlZmF1bHRFeHBhbmRBbGw6IHRydWUsXG4gICAgc2luZ2xlUm9vdDogdHJ1ZSxcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzZWxlY3RlZEtleXM6IFtdLFxuICAgICAgc2hvd0RlbGV0ZUNvbmZpcm1hdGlvbjogZmFsc2UsXG4gICAgfTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFNlbGVjdHMgYSB0cmVlIGl0ZW1cbiAgICogQHBhcmFtIHNlbGVjdGVkS2V5cyAoYXJyYXkpXG4gICAqL1xuICBvblRyZWVJdGVtU2VsZWN0ID0gKHNlbGVjdGVkS2V5cykgPT4ge1xuICAgIGNvbnN0IHsgb25TZWxlY3QgfSA9IHRoaXMucHJvcHM7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkS2V5cyB9LCAoKSA9PiB7XG4gICAgICBpZiAob25TZWxlY3QpIG9uU2VsZWN0KHNlbGVjdGVkS2V5cyk7XG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIERpc3BsYXlzIGEgY29uZmlybWF0aW9uIGRpYWxvZ1xuICAgKi9cbiAgb25EZWxldGVDbGljayA9ICgpID0+IHtcbiAgICBjb25zdCB7IGNoaWxkS2V5IH0gPSB0aGlzLnByb3BzO1xuXG4gICAgLy8gSWYgaXRlbSBpcyBub3QgYSBwYXJlbnQsIHdlIHdvbid0IHNob3cgdGhlIGRlbGV0ZSBjb25maXJtYXRpb24gZGlhbG9nXG4gICAgaWYgKCF0aGlzLmdldFRyZWVJdGVtKHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdKVtjaGlsZEtleV0pIHtcbiAgICAgIHRoaXMubW92ZUl0ZW1Ub0dyaWQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNob3dEZWxldGVDb25maXJtYXRpb246IHRydWUgfSk7XG4gIH07XG5cblxuICAvKipcbiAgICogQWRkcyBhIG5ldyBub2RlIHRvIHRoZSByb290IG9mIHRoZSB0cmVlLCBvciB1bmRlciBhIHNlbGVjdGVkIHRyZWUgbm9kZSB1c2luZ1xuICAgKiBBRERfQ0hJTERSRU4gYWN0aW9uXG4gICAqIEBwYXJhbSBkYXRhIC0gZGF0YSB0byBiZSBhZGRlZFxuICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICovXG4gIG9uQWRkTmV3Q2xpY2sgPSAoZGF0YSwgY2FsbGJhY2spID0+IHtcbiAgICBjb25zdCB7IG9uQ2hhbmdlLCB0cmVlRGF0YSwgaWRLZXkgfSA9IHRoaXMucHJvcHM7XG4gICAgbGV0IG5ld0l0ZW1zID0gdHJlZURhdGEuc2xpY2UoKTtcblxuICAgIC8vIElmIG5vIHRyZWUgbm9kZSBpcyBzZWxlY3RlZCwgd2UnbGwgcGxhY2UgdGhlIG5ldyBpdGVtIHRvIHRoZSByb290XG4gICAgLy8gb2YgdGhlIHRyZWVcbiAgICBpZiAoIXRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdKSB7XG4gICAgICBuZXdJdGVtcy5wdXNoKGRhdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBhY3Rpb24gPSB7XG4gICAgICAgIHR5cGU6IFRSRUVfQUNUSU9OUy5BRERfQ0hJTERSRU4sXG4gICAgICAgIGRhdGEsXG4gICAgICB9O1xuICAgICAgbmV3SXRlbXMgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdLCB0cmVlRGF0YSwgYWN0aW9uKTtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkS2V5czogW2RhdGFbaWRLZXldXSB9LCAoKSA9PiB7XG4gICAgICAvLyBJZiB0aGUgcGFyZW50IGlzIG5vdCB5ZXQgZXhwYW5kZWQsIHdlIHdpbGwgZXhwYW5kIGl0IG5vd1xuICAgICAgY29uc3QgcGFyZW50ID0gdGhpcy5nZXRUcmVlSXRlbShkYXRhW2lkS2V5XSwgdHJlZURhdGEsIHRydWUpIHx8IHt9O1xuICAgICAgdGhpcy5leHBhbmRQYXJlbnQocGFyZW50W2lkS2V5XSk7XG5cbiAgICAgIGlmIChvbkNoYW5nZSkgb25DaGFuZ2UobmV3SXRlbXMpO1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9KTtcbiAgfTtcblxuXG4gIG9uTW92ZVRvR3JpZENsaWNrID0gKCkgPT4ge1xuICAgIHRoaXMubW92ZUl0ZW1Ub0dyaWQoKTtcbiAgfTtcblxuICAvKipcbiAgICogQ2FsbHMgb25DaGFuZ2UgY2FsbGJhY2sgd2hlbmV2ZXIgdXNlciByZW9yZGVycyB0cmVlIGl0ZW1zIHVzaW5nIG9yZGVyaW5nIGFycm93c1xuICAgKiBAcGFyYW0gaXRlbXNcbiAgICovXG4gIG9uT3JkZXJDbGljayA9IChpdGVtcykgPT4ge1xuICAgIHRoaXMucHJvcHMub25DaGFuZ2UoaXRlbXMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBZGRzIHNlbGVjdGVkIGdyaWQgaXRlbXMgdG8gdGhlIGNob3NlbiB0cmVlIG5vZGUgdXNpbmcgQUREX0NISUxEUkVOIGFjdGlvblxuICAgKi9cbiAgb25Nb3ZlVG9UcmVlQ2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgb25DaGFuZ2UsIHNlbGVjdGVkR3JpZEl0ZW1zLCBncmlkRGF0YSwgdHJlZURhdGEsIGlkS2V5LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHNlbGVjdGVkSWQgPSB0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXTtcblxuICAgIGNvbnN0IGFjdGlvbiA9IHtcbiAgICAgIHR5cGU6IFRSRUVfQUNUSU9OUy5BRERfQ0hJTERSRU4sXG4gICAgICBkYXRhOiBncmlkRGF0YVxuICAgICAgICAuZmlsdGVyKGkgPT4gc2VsZWN0ZWRHcmlkSXRlbXMuaW5jbHVkZXMoaS5nZXQoaWRLZXkpKSlcbiAgICAgICAgLnRvSlMoKSxcbiAgICB9O1xuICAgIGNvbnN0IG5ld0l0ZW1zID0gdGhpcy5nZXRVcGRhdGVkVHJlZShzZWxlY3RlZElkLCB0cmVlRGF0YSwgYWN0aW9uKTtcbiAgICBjb25zdCBuZXdHcmlkSXRlbXMgPSBncmlkRGF0YS5maWx0ZXIoaXRlbSA9PiAhc2VsZWN0ZWRHcmlkSXRlbXMuaW5jbHVkZXMoaXRlbS5nZXQoaWRLZXkpKSk7XG5cbiAgICB0aGlzLmV4cGFuZFBhcmVudChzZWxlY3RlZElkLCB0cnVlKTtcbiAgICB0aGlzLnNldERhdGFUb0dyaWQobmV3R3JpZEl0ZW1zLCB0cnVlKTtcbiAgICBpZiAob25DaGFuZ2UpIG9uQ2hhbmdlKG5ld0l0ZW1zKTtcbiAgfTtcblxuICAvKipcbiAgICogUmVuYW1lcyB0aGUgY2hvc2VuIHRyZWUgbm9kZSB1c2luZyBhIFJFTkFNRV9QQVJFTlQgYWN0aW9uXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKi9cbiAgb25JbnB1dENoYW5nZSA9ICh2YWx1ZSkgPT4ge1xuICAgIGNvbnN0IHsgdHJlZURhdGEsIG9uQ2hhbmdlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGFjdGlvbiA9IHtcbiAgICAgIHR5cGU6IFRSRUVfQUNUSU9OUy5SRU5BTUVfUEFSRU5ULFxuICAgICAgZGF0YTogdmFsdWUsXG4gICAgfTtcbiAgICBjb25zdCBuZXdJdGVtcyA9IHRoaXMuZ2V0VXBkYXRlZFRyZWUodGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF0sIHRyZWVEYXRhLCBhY3Rpb24pO1xuICAgIGlmIChvbkNoYW5nZSkgb25DaGFuZ2UobmV3SXRlbXMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBGaXJlZCBvbiBleHBhbmRcbiAgICogQHBhcmFtIGlkc1xuICAgKi9cbiAgb25FeHBhbmQgPSAoaWRzKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBleHBhbmRlZEtleXM6IGlkcyxcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyB1cGRhdGVkIHRyZWUgaXRlbXMuXG4gICAqIEBwYXJhbSBpZCAtIHRhcmdldCBpdGVtXG4gICAqIEBwYXJhbSBhcnJheSAtIGFycmF5IHdoZXJlIHRhcmdldCBpdGVtIGlzIGJlaW5nIHNlYXJjaGVkXG4gICAqIEBwYXJhbSBhY3Rpb24gLSBhY3Rpb24gdG8gYmUgcGVyZm9ybWVkIHt0eXBlLCBkYXRhfVxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIGdldFVwZGF0ZWRUcmVlID0gKGlkLCBhcnJheSA9IHRoaXMucHJvcHMudHJlZURhdGEsIGFjdGlvbikgPT4ge1xuICAgIGxldCBmb3VuZCA9IGZhbHNlO1xuICAgIGNvbnN0IHsgaWRLZXksIGNoaWxkS2V5LCB2YWx1ZUtleSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBuZXdJdGVtcyA9IGFycmF5LnNsaWNlKCk7XG4gICAgY29uc3QgcmVtb3ZlQWN0aW9ucyA9IFtUUkVFX0FDVElPTlMuTU9WRV9MRUFGLCBUUkVFX0FDVElPTlMuREVMRVRFX1BBUkVOVF07XG5cbiAgICAvLyBJZiBkZWxldGVkIHBhcmVudCBpdGVtIGlzIGluIHRoZSByb290IG5vZGVcbiAgICBpZiAoYWN0aW9uLnR5cGUgPT09IFRSRUVfQUNUSU9OUy5ERUxFVEVfUEFSRU5UKSB7XG4gICAgICBjb25zdCByb290SXRlbSA9IGFycmF5LmZpbmQoaXRlbSA9PiBpdGVtW2lkS2V5XSA9PT0gaWQpO1xuICAgICAgaWYgKHJvb3RJdGVtKSB7XG4gICAgICAgIGlmIChyb290SXRlbVtjaGlsZEtleV0ubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5zZXREYXRhVG9HcmlkKGZyb21KUyh0aGlzLmdldEFsbExlYWZzKHJvb3RJdGVtW2NoaWxkS2V5XSkpKTtcbiAgICAgICAgICB0aGlzLmRlc2VsZWN0SXRlbSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXdJdGVtcy5maWx0ZXIoaXRlbSA9PiBpdGVtW2lkS2V5XSAhPT0gaWQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmV3SXRlbXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSBuZXdJdGVtc1tpXTtcbiAgICAgIGlmIChyZW1vdmVBY3Rpb25zLmluY2x1ZGVzKGFjdGlvbi50eXBlKSAmJiBpdGVtW2NoaWxkS2V5XSAmJiAhZm91bmQpIHtcbiAgICAgICAgZm91bmQgPSAhIWl0ZW1bY2hpbGRLZXldLmZpbmQoY2hpbGQgPT4gY2hpbGRbaWRLZXldID09PSBpZCk7XG4gICAgICAgIGlmIChmb3VuZCkge1xuICAgICAgICAgIC8vIFdoZW4gcmVtb3ZpbmcgYW4gaXRlbSB3ZSBtdXN0IGZpcnN0IGZpbmQgaXRzIHBhcmVudCBhbmQgYWx0ZXIgaXRzIGNoaWxkcmVuIGFycmF5XG4gICAgICAgICAgaWYgKGFjdGlvbi50eXBlID09PSBUUkVFX0FDVElPTlMuTU9WRV9MRUFGKSB7XG4gICAgICAgICAgICBpdGVtW2NoaWxkS2V5XSA9IGl0ZW1bY2hpbGRLZXldLmZpbHRlcihjaGlsZCA9PiBjaGlsZFtpZEtleV0gIT09IGlkKTtcbiAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RJdGVtKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChhY3Rpb24udHlwZSA9PT0gVFJFRV9BQ1RJT05TLkRFTEVURV9QQVJFTlQpIHtcbiAgICAgICAgICAgIC8vIHdlIG11c3QgZmlyc3QgZmlsdGVyIHRoZSBjaGlsZHJlbiwgc28gdGhhdCB3ZSB3b24ndCBnZXQgbGVhZnMgZnJvbVxuICAgICAgICAgICAgLy8gb3RoZXIgY2hpbGQgYnJhbmNoZXNcbiAgICAgICAgICAgIGNvbnN0IGZpbHRlcmVkQ2hpbGRyZW4gPSBpdGVtW2NoaWxkS2V5XS5maWx0ZXIoY2hpbGRJdGVtID0+IGNoaWxkSXRlbVtpZEtleV0gPT09IGlkKTtcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YVRvR3JpZChmcm9tSlModGhpcy5nZXRBbGxMZWFmcyhmaWx0ZXJlZENoaWxkcmVuKSkpO1xuICAgICAgICAgICAgdGhpcy5kZXNlbGVjdEl0ZW0oKTtcbiAgICAgICAgICAgIGl0ZW1bY2hpbGRLZXldID0gaXRlbVtjaGlsZEtleV0uZmlsdGVyKGNoaWxkSXRlbSA9PiBjaGlsZEl0ZW1baWRLZXldICE9PSBpZCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtW2lkS2V5XSA9PT0gaWQgJiYgIWZvdW5kKSB7XG4gICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICAgIGNhc2UgVFJFRV9BQ1RJT05TLkFERF9DSElMRFJFTjpcbiAgICAgICAgICAgIGl0ZW1bY2hpbGRLZXldID0gKGl0ZW1bY2hpbGRLZXldIHx8IFtdKS5jb25jYXQoYWN0aW9uLmRhdGEpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBUUkVFX0FDVElPTlMuUkVOQU1FX1BBUkVOVDpcbiAgICAgICAgICAgIGl0ZW1bdmFsdWVLZXldID0gYWN0aW9uLmRhdGE7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQWN0aW9uIHR5cGUgaXMgdW5kZWZpbmVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVtjaGlsZEtleV0gJiYgIWZvdW5kKSBmb3VuZCA9IHRoaXMuZ2V0VXBkYXRlZFRyZWUoaWQsIGl0ZW1bY2hpbGRLZXldLCBhY3Rpb24pO1xuICAgIH1cblxuICAgIGlmICghZm91bmQpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gbmV3SXRlbXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybnMgcmVjdXJzaXZlbHkgYWxsIGxlYWYgaXRlbXMgZnJvbSBhIGdpdmVuIGFycmF5XG4gICAqIEBwYXJhbSBhcnJheVxuICAgKiBAcGFyYW0gYWxyZWFkeUZvdW5kICh1c2VkIHJlY3Vyc2l2ZWx5KVxuICAgKi9cbiAgZ2V0QWxsTGVhZnMgPSAoYXJyYXksIGFscmVhZHlGb3VuZCA9IFtdKSA9PiB7XG4gICAgY29uc3QgeyBjaGlsZEtleSB9ID0gdGhpcy5wcm9wcztcbiAgICBsZXQgbGVhZnMgPSBhbHJlYWR5Rm91bmQ7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBpdGVtID0gYXJyYXlbaV07XG4gICAgICBpZiAoaXRlbVtjaGlsZEtleV0pIHtcbiAgICAgICAgbGVhZnMgPSB0aGlzLmdldEFsbExlYWZzKGl0ZW1bY2hpbGRLZXldLCBhbHJlYWR5Rm91bmQpO1xuICAgICAgfVxuICAgICAgaWYgKCFpdGVtW2NoaWxkS2V5XSkgbGVhZnMucHVzaChpdGVtKTtcbiAgICB9XG4gICAgcmV0dXJuIGxlYWZzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgdHJlZSBpdGVtIGJ5IElEXG4gICAqIEBwYXJhbSBpZFxuICAgKiBAcGFyYW0gYXJyYXlcbiAgICogQHBhcmFtIHJldHVyblBhcmVudCAtIHJldHVybiBpdGVtJ3MgcGFyZW50IGluc3RlYWQgb2YgdGhlIGl0ZW1cbiAgICogQHBhcmFtIHBhcmVudCAtIHBhcmVudCBpdGVtICh1c2VkIHJlY3Vyc2l2ZWx5KVxuICAgKiBAcmV0dXJucyB7e319XG4gICAqL1xuICBnZXRUcmVlSXRlbSA9IChpZCwgYXJyYXkgPSB0aGlzLnByb3BzLnRyZWVEYXRhLCByZXR1cm5QYXJlbnQgPSBmYWxzZSwgcGFyZW50ID0gbnVsbCkgPT4ge1xuICAgIGNvbnN0IHsgY2hpbGRLZXksIGlkS2V5IH0gPSB0aGlzLnByb3BzO1xuICAgIGxldCBmb3VuZCA9IGFycmF5LmZpbmQoaXRlbSA9PiBpdGVtW2lkS2V5XSA9PT0gaWQpO1xuXG4gICAgaWYgKGZvdW5kICYmIHJldHVyblBhcmVudCkgZm91bmQgPSBwYXJlbnQ7XG5cbiAgICBpZiAoIWZvdW5kKSB7XG4gICAgICBhcnJheS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGlmIChpdGVtW2NoaWxkS2V5XSAmJiAhZm91bmQpIHtcbiAgICAgICAgICBmb3VuZCA9IHRoaXMuZ2V0VHJlZUl0ZW0oaWQsIGl0ZW1bY2hpbGRLZXldLCByZXR1cm5QYXJlbnQsIGl0ZW0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGZvdW5kO1xuICB9O1xuXG4gIC8qKlxuICAgKiBHZXQgYWRqYWNlbnQgaXRlbSAoaWQpIGluIHBhcmVudCBhcnJheS4gVXNlZCB3aGVuIG1vdmluZyBpdGVtcyBmcm9tIHRyZWVcbiAgICogdG8gZ3JpZC9kZWxldGluZyBhbiBpdGVtXG4gICAqIEBwYXJhbSBpZFxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIGdldEFkamFjZW50SXRlbSA9IChpZCkgPT4ge1xuICAgIGlmICghaWQpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IHsgY2hpbGRLZXksIGlkS2V5LCB0cmVlRGF0YSB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IGdldEFkamFjZW50SXRlbUlkID0gKHBhcmVudCkgPT4ge1xuICAgICAgY29uc3QgcGFyZW50QXJyID0gQXJyYXkuaXNBcnJheShwYXJlbnQpID8gcGFyZW50IDogcGFyZW50W2NoaWxkS2V5XTtcbiAgICAgIGNvbnN0IGluZGV4ID0gcGFyZW50QXJyLmZpbmRJbmRleChjaGlsZCA9PiBjaGlsZFtpZEtleV0gPT09IGlkKTtcbiAgICAgIGxldCBhZGphY2VudEl0ZW0gPSBwYXJlbnRBcnJbaW5kZXggKyAxXTtcbiAgICAgIGlmICghYWRqYWNlbnRJdGVtKSBhZGphY2VudEl0ZW0gPSBwYXJlbnRBcnJbaW5kZXggLSAxXTtcbiAgICAgIGlmICghYWRqYWNlbnRJdGVtICYmICFBcnJheS5pc0FycmF5KHBhcmVudCkpIGFkamFjZW50SXRlbSA9IHBhcmVudDtcbiAgICAgIGlmICghYWRqYWNlbnRJdGVtKSByZXR1cm4gbnVsbDtcblxuICAgICAgcmV0dXJuIGFkamFjZW50SXRlbVtpZEtleV07XG4gICAgfTtcblxuICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuZ2V0VHJlZUl0ZW0oaWQsIHRoaXMucHJvcHMudHJlZURhdGEsIHRydWUpO1xuICAgIHJldHVybiBwYXJlbnQgPyBnZXRBZGphY2VudEl0ZW1JZChwYXJlbnQpIDogZ2V0QWRqYWNlbnRJdGVtSWQodHJlZURhdGEpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBcHBlbmRzIHByb3ZpZGVkIGl0ZW1zIHRvIHRoZSBncmlkXG4gICAqIEBwYXJhbSBpdGVtcyAtIGltbXV0YWJsZSBhcnJheSBvZiBpdGVtcyB0byBiZSBhcHBlbmRlZCB0byBncmlkXG4gICAqIEBwYXJhbSBzZXROZXdJdGVtcyAtIHNldCBjb21wbGV0ZWx5IGEgbmV3IGFycmF5IG9mIGl0ZW1zXG4gICAqL1xuICBzZXREYXRhVG9HcmlkID0gKGl0ZW1zLCBzZXROZXdJdGVtcyA9IGZhbHNlKSA9PiB7XG4gICAgbGV0IGRhdGEgPSBMaXN0KCk7XG4gICAgY29uc3QgeyBncmlkLCBncmlkQ29sdW1ucywgZ3JpZERhdGEgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFzZXROZXdJdGVtcykgZGF0YSA9IGdyaWREYXRhLnNsaWNlKCk7XG4gICAgY29uc3QgbmV3R3JpZEl0ZW1zID0gZGF0YS5jb25jYXQoaXRlbXMpO1xuXG4gICAgdGhpcy5wcm9wcy5zZXREYXRhKGdyaWQsIGdyaWRDb2x1bW5zLCBuZXdHcmlkSXRlbXMpO1xuICAgIHRoaXMucHJvcHMuY2xlYXJTZWxlY3RlZEl0ZW1zKGdyaWQpO1xuICB9O1xuXG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgdGhlIGNob3NlbiBpdGVtIGZyb20gYSB0cmVlIGFuZCB1cGRhdGVzIHRoZSBncmlkIHVzaW5nIE1PVkVfTEVBRlxuICAgKiBhY3Rpb25cbiAgICovXG4gIG1vdmVJdGVtVG9HcmlkID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgdHJlZURhdGEsIG9uQ2hhbmdlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHNlbGVjdGVkS2V5ID0gdGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF07XG4gICAgY29uc3QgYWN0aW9uID0ge1xuICAgICAgdHlwZTogVFJFRV9BQ1RJT05TLk1PVkVfTEVBRixcbiAgICAgIGRhdGE6IHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdLFxuICAgIH07XG4gICAgY29uc3QgbmV4dFNlbGVjdGVkS2V5ID0gdGhpcy5nZXRBZGphY2VudEl0ZW0oc2VsZWN0ZWRLZXkpO1xuICAgIGNvbnN0IG5ld0dyaWRJdGVtcyA9IGZyb21KUyhbdGhpcy5nZXRUcmVlSXRlbShzZWxlY3RlZEtleSldKTtcbiAgICBjb25zdCBuZXdJdGVtcyA9IHRoaXMuZ2V0VXBkYXRlZFRyZWUoc2VsZWN0ZWRLZXksIHRyZWVEYXRhLCBhY3Rpb24pO1xuXG4gICAgdGhpcy5zZXREYXRhVG9HcmlkKG5ld0dyaWRJdGVtcyk7XG4gICAgaWYgKG9uQ2hhbmdlKSBvbkNoYW5nZShuZXdJdGVtcyk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzZWxlY3RlZEtleXM6IFtuZXh0U2VsZWN0ZWRLZXldLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4cGFuZHMgYSBwYXJlbnRcbiAgICogQHBhcmFtIHBhcmVudElkXG4gICAqL1xuICBleHBhbmRQYXJlbnQgPSAocGFyZW50SWQpID0+IHtcbiAgICBpZiAocGFyZW50SWQgJiYgIXRoaXMuc3RhdGUuZXhwYW5kZWRLZXlzLmZpbmQoZXhwYW5kZWRJZCA9PiBleHBhbmRlZElkID09PSBwYXJlbnRJZCkpIHtcbiAgICAgIGNvbnN0IG5ld0V4cGFuZGVkS2V5cyA9IHRoaXMuc3RhdGUuZXhwYW5kZWRLZXlzLnNsaWNlKCk7XG4gICAgICBuZXdFeHBhbmRlZEtleXMucHVzaChwYXJlbnRJZCk7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgZXhwYW5kZWRLZXlzOiBuZXdFeHBhbmRlZEtleXMgfSk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBDbG9zZXMgZGVsZXRlIGNvbmZpcm1hdGlvbiBkaWFsb2dcbiAgICovXG4gIGNsb3NlRGVsZXRlQ29uZmlybWF0aW9uRGlhbG9nID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzaG93RGVsZXRlQ29uZmlybWF0aW9uOiBmYWxzZSB9KTtcbiAgfTtcblxuICAvKipcbiAgICogRGVsZXRlcyBhIHBhcmVudCBub2RlXG4gICAqL1xuICBkZWxldGVQYXJlbnQgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBvbkNoYW5nZSwgdHJlZURhdGEgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgc2VsZWN0ZWRLZXkgPSB0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXTtcbiAgICBjb25zdCBhY3Rpb24gPSB7XG4gICAgICB0eXBlOiBUUkVFX0FDVElPTlMuREVMRVRFX1BBUkVOVCxcbiAgICB9O1xuICAgIGNvbnN0IG5leHRTZWxlY3RlZEtleSA9IHRoaXMuZ2V0QWRqYWNlbnRJdGVtKHNlbGVjdGVkS2V5KTtcbiAgICBjb25zdCBuZXdJdGVtcyA9IHRoaXMuZ2V0VXBkYXRlZFRyZWUoc2VsZWN0ZWRLZXksIHRyZWVEYXRhLCBhY3Rpb24pO1xuICAgIGlmIChvbkNoYW5nZSkgb25DaGFuZ2UobmV3SXRlbXMpO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2VsZWN0ZWRLZXlzOiBbbmV4dFNlbGVjdGVkS2V5XSxcbiAgICAgIHNob3dEZWxldGVDb25maXJtYXRpb246IGZhbHNlLFxuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBEZXNlbGVjdHMgYW4gaXRlbSwgaWYgaXQgaXMgZS5nLiByZW1vdmVkXG4gICAqL1xuICBkZXNlbGVjdEl0ZW0gPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkS2V5czogW10gfSk7XG4gIH07XG5cbiAgcmVuZGVySGVhZGVyUmlnaHQgPSB0cmFuc2xhdGlvbnMgPT4gKFxuICAgIDxDb250cm9sQmFyXG4gICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgIG9uQWRkTmV3Q2xpY2s9e3RoaXMub25BZGROZXdDbGlja31cbiAgICAgIG9uRGVsZXRlQ2xpY2s9e3RoaXMub25EZWxldGVDbGlja31cbiAgICAgIG9uSW5wdXRDaGFuZ2U9e3RoaXMub25JbnB1dENoYW5nZX1cbiAgICAgIHNlbGVjdGVkVHJlZUl0ZW09e3RoaXMuZ2V0VHJlZUl0ZW0odGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF0pfVxuICAgICAgaGVpZ2h0PXtBQ1RJT05fQkFSX0NPTlRBSU5FUl9IRUlHSFR9XG4gICAgICB0cmFuc2xhdGlvbnM9e3RyYW5zbGF0aW9uc31cbiAgICAvPlxuICApO1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICB2YWx1ZUtleSwgaWRLZXksIHRyZWVEYXRhLCBncmlkLCBncmlkQ29sdW1ucywgY2xhc3NOYW1lLCB0cmFuc2xhdGlvbnMsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBtZXJnZWRHcmlkID0gT2JqZWN0LmFzc2lnbih7fSwgZ3JpZCwgeyBkZWZhdWx0U2hvd0ZpbHRlcmluZ1JvdzogdHJ1ZSB9KTtcbiAgICBjb25zdCBtZXJnZWRUcmFuc2xhdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0VHJhbnNsYXRpb25zLCB0cmFuc2xhdGlvbnMpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxSZWFjdC5GcmFnbWVudD5cbiAgICAgICAgPENvbnRhaW5lciBjbGFzc05hbWU9e2NsYXNzTmFtZX0+XG4gICAgICAgICAgPFRyZWVDb250YWluZXI+XG4gICAgICAgICAgICB7ISF0cmVlRGF0YS5sZW5ndGggJiYgPFRyZWVDb21wb25lbnRcbiAgICAgICAgICAgICAgdHJlZURhdGE9e3RyZWVEYXRhfVxuICAgICAgICAgICAgICBkYXRhTG9va1VwS2V5PXtpZEtleX1cbiAgICAgICAgICAgICAgZGF0YUxvb2tVcFZhbHVlPXt2YWx1ZUtleX1cbiAgICAgICAgICAgICAgb25TZWxlY3Q9e3RoaXMub25UcmVlSXRlbVNlbGVjdH1cbiAgICAgICAgICAgICAgb25FeHBhbmQ9e3RoaXMub25FeHBhbmR9XG4gICAgICAgICAgICAgIGNoZWNrYWJsZT17ZmFsc2V9XG4gICAgICAgICAgICAgIHNlbGVjdGVkS2V5cz17dGhpcy5zdGF0ZS5zZWxlY3RlZEtleXN9XG4gICAgICAgICAgICAgIGV4cGFuZGVkS2V5cz17dGhpcy5zdGF0ZS5leHBhbmRlZEtleXN9XG4gICAgICAgICAgICAgIG9uT3JkZXJCdXR0b25DbGljaz17dGhpcy5vbk9yZGVyQ2xpY2t9XG4gICAgICAgICAgICAgIHRpdGxlPXttZXJnZWRUcmFuc2xhdGlvbnMudHJlZVRpdGxlfVxuICAgICAgICAgICAgICBzZWxlY3RhYmxlXG4gICAgICAgICAgICAgIHNob3dPcmRlcmluZ0Fycm93c1xuICAgICAgICAgICAgICBzaG93RXhwYW5kQWxsXG4gICAgICAgICAgICAgIGhlYWRlclJpZ2h0PXt0aGlzLnJlbmRlckhlYWRlclJpZ2h0KG1lcmdlZFRyYW5zbGF0aW9ucyl9XG4gICAgICAgICAgICAvPn1cbiAgICAgICAgICAgIHshdHJlZURhdGEubGVuZ3RoICYmIDxOb0l0ZW1zVGV4dD57bWVyZ2VkVHJhbnNsYXRpb25zLm5vVHJlZUl0ZW1zfTwvTm9JdGVtc1RleHQ+fVxuICAgICAgICAgIDwvVHJlZUNvbnRhaW5lcj5cbiAgICAgICAgICA8QXJyb3dDb250cm9sc1xuICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICBzZWxlY3RlZFRyZWVJdGVtPXt0aGlzLmdldFRyZWVJdGVtKHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdKX1cbiAgICAgICAgICAgIG9uTW92ZVRvVHJlZUNsaWNrPXt0aGlzLm9uTW92ZVRvVHJlZUNsaWNrfVxuICAgICAgICAgICAgb25Nb3ZlVG9HcmlkQ2xpY2s9e3RoaXMub25Nb3ZlVG9HcmlkQ2xpY2t9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8R3JpZFxuICAgICAgICAgICAgZ3JpZD17bWVyZ2VkR3JpZH1cbiAgICAgICAgICAgIGNvbHVtbnM9e2dyaWRDb2x1bW5zfVxuICAgICAgICAgICAgbXVsdGlTZWxlY3RcbiAgICAgICAgICAgIGZpbHRlcmluZ1xuICAgICAgICAgICAgcm93U2VsZWN0Q2hlY2tib3hDb2x1bW5cbiAgICAgICAgICAgIGdyaWRIZWFkZXI9ezxQcmltaXRpdmUuU3VidGl0bGU+e21lcmdlZFRyYW5zbGF0aW9ucy5ncmlkVGl0bGV9PC9QcmltaXRpdmUuU3VidGl0bGU+fVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvQ29udGFpbmVyPlxuICAgICAgICB7dGhpcy5zdGF0ZS5zaG93RGVsZXRlQ29uZmlybWF0aW9uICYmXG4gICAgICAgIDxDb25maXJtRGlhbG9nXG4gICAgICAgICAgdHJhbnNsYXRpb25zPXttZXJnZWRUcmFuc2xhdGlvbnMuZGVsZXRlQ29uZmlybURpYWxvZ31cbiAgICAgICAgICBjb25maXJtQ2FsbGJhY2s9e3RoaXMuZGVsZXRlUGFyZW50fVxuICAgICAgICAgIGNhbmNlbENhbGxiYWNrPXt0aGlzLmNsb3NlRGVsZXRlQ29uZmlybWF0aW9uRGlhbG9nfVxuICAgICAgICAvPlxuICAgICAgICB9XG4gICAgICA8L1JlYWN0LkZyYWdtZW50PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==