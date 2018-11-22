'use strict';

exports.__esModule = true;
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _dec, _class, _class2, _temp;

var _templateObject = _taggedTemplateLiteralLoose(['\n  height: 100%;\n  &&& {\n    padding: 0;\n  }\n  .oc-datagrid-main-container {\n    border: 1px solid ', ';\n    border-top:none;\n  }\n'], ['\n  height: 100%;\n  &&& {\n    padding: 0;\n  }\n  .oc-datagrid-main-container {\n    border: 1px solid ', ';\n    border-top:none;\n  }\n']),
    _templateObject2 = _taggedTemplateLiteralLoose(['\n  display: flex;\n  min-height: 300px;\n  > div {\n    width: 50%;\n    flex: 1 1 100%;\n  }\n'], ['\n  display: flex;\n  min-height: 300px;\n  > div {\n    width: 50%;\n    flex: 1 1 100%;\n  }\n']),
    _templateObject3 = _taggedTemplateLiteralLoose(['\n  height:100%;\n  .oc-scrollbar-container {\n    border: 1px solid ', ';\n    height: calc(100% - ', ');\n    padding: ', ';\n  }\n  .oc-react-tree {\n    height: 100%;\n    .rc-tree-iconEle.rc-tree-icon__customize {\n        display:none;\n    }\n  }\n'], ['\n  height:100%;\n  .oc-scrollbar-container {\n    border: 1px solid ', ';\n    height: calc(100% - ', ');\n    padding: ', ';\n  }\n  .oc-react-tree {\n    height: 100%;\n    .rc-tree-iconEle.rc-tree-icon__customize {\n        display:none;\n    }\n  }\n']),
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

var TreeContainer = _styledComponents2.default.div(_templateObject3, function (props) {
  return props.theme.colors.colorLightGray;
}, ACTION_BAR_CONTAINER_HEIGHT, function (props) {
  return props.theme.gutterWidth;
});

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

    _this.onTreeItemDragDrop = function (items) {
      var onChange = _this.props.onChange;

      if (onChange) onChange(items);
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

    _this.onExpandAll = function () {
      var newExpandedItems = _this.isAllExpanded() ? [] : _this.getAllParentIds();
      _this.setState({ expandedKeys: newExpandedItems });
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

    _this.isDragDropLegal = function (items, e) {
      var _this$props11 = _this.props,
          childKey = _this$props11.childKey,
          treeData = _this$props11.treeData,
          onDragDropPrevent = _this$props11.onDragDropPrevent;

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

    _this.isAllExpanded = function () {
      return _this.state.expandedKeys.length === _this.getAllParentIds().length;
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

    var expandedKeys = [];
    if (props.defaultExpandAll && props.treeData) {
      expandedKeys = _this.getAllParentIds(props.treeData);
    }
    _this.state = {
      selectedKeys: [],
      expandedKeys: expandedKeys,
      showDeleteConfirmation: false
    };
    return _this;
  }

  HierarchyTreeSelector.prototype.componentDidMount = function componentDidMount() {
    var defaultExpandAll = this.props.defaultExpandAll;

    if (defaultExpandAll) {
      this.onExpand(this.getAllParentIds());
    }
  };

  /**
   * Selects a tree item
   * @param selectedKeys (array)
   */


  /**
   * Fired on drag n' drop
   * @param items
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
   * Expand all the items
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
   * Checks if a move is permitted before calling Tree component's onDragDrop callback
   * @param items
   * @param e
   * @returns {boolean}
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
          _react2.default.createElement(_hierarchyTreeSelectorControlBar2.default, _extends({}, this.props, {
            onAddNewClick: this.onAddNewClick,
            onDeleteClick: this.onDeleteClick,
            onInputChange: this.onInputChange,
            onExpandAllClick: this.onExpandAll,
            expandAll: this.isAllExpanded(),
            selectedTreeItem: this.getTreeItem(this.state.selectedKeys[0]),
            height: ACTION_BAR_CONTAINER_HEIGHT,
            translations: mergedTranslations
          })),
          _react2.default.createElement(
            _reactPerfectScrollbar2.default,
            null,
            !!treeData.length && _react2.default.createElement(_reactTreeComponent2.default, {
              treeData: treeData,
              dataLookUpKey: idKey,
              dataLookUpValue: valueKey,
              onSelect: this.onTreeItemSelect,
              onDragDrop: this.onTreeItemDragDrop,
              onExpand: this.onExpand,
              checkable: false,
              selectedKeys: this.state.selectedKeys,
              expandedKeys: this.state.expandedKeys,
              isDragDropLegal: this.isDragDropLegal,
              selectable: true,
              draggable: true
            }),
            !treeData.length && _react2.default.createElement(
              NoItemsText,
              null,
              mergedTranslations.noTreeItems
            )
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
  onDragDropPrevent: undefined,
  onSelect: undefined,
  onChange: undefined,
  defaultExpandAll: true
}, _temp)) || _class);
exports.default = HierarchyTreeSelector;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIkFDVElPTl9CQVJfQ09OVEFJTkVSX0hFSUdIVCIsIlRSRUVfQUNUSU9OUyIsIkFERF9DSElMRFJFTiIsIk1PVkVfTEVBRiIsIlJFTkFNRV9QQVJFTlQiLCJERUxFVEVfUEFSRU5UIiwiR3JpZCIsIkRhdGFncmlkIiwicHJvcHMiLCJ0aGVtZSIsImNvbG9ycyIsImNvbG9yTGlnaHRHcmF5IiwiQ29udGFpbmVyIiwic3R5bGVkIiwiZGl2IiwiVHJlZUNvbnRhaW5lciIsImd1dHRlcldpZHRoIiwiTm9JdGVtc1RleHQiLCJwIiwibWFwRGlzcGF0Y2hUb1Byb3BzIiwic2V0RGF0YSIsIkRhdGFncmlkQWN0aW9ucyIsImNsZWFyU2VsZWN0ZWRJdGVtcyIsIm1hcFN0YXRlVG9Qcm9wcyIsInN0YXRlIiwiZ3JpZElkIiwiZ3JpZCIsImlkIiwic2VsZWN0ZWRHcmlkSXRlbXMiLCJkYXRhZ3JpZCIsImdldEluIiwiZ3JpZERhdGEiLCJIaWVyYXJjaHlUcmVlU2VsZWN0b3IiLCJvblRyZWVJdGVtU2VsZWN0Iiwic2VsZWN0ZWRLZXlzIiwib25TZWxlY3QiLCJzZXRTdGF0ZSIsIm9uVHJlZUl0ZW1EcmFnRHJvcCIsIml0ZW1zIiwib25DaGFuZ2UiLCJvbkRlbGV0ZUNsaWNrIiwic2hvd0RlbGV0ZUNvbmZpcm1hdGlvbiIsIm9uQWRkTmV3Q2xpY2siLCJkYXRhIiwiY2FsbGJhY2siLCJ0cmVlRGF0YSIsImlkS2V5IiwibmV3SXRlbXMiLCJzbGljZSIsInB1c2giLCJhY3Rpb24iLCJ0eXBlIiwiZ2V0VXBkYXRlZFRyZWUiLCJwYXJlbnQiLCJnZXRUcmVlSXRlbSIsImV4cGFuZFBhcmVudCIsIm9uTW92ZVRvR3JpZENsaWNrIiwic2VsZWN0ZWRLZXkiLCJuZXh0U2VsZWN0ZWRLZXkiLCJnZXRBZGphY2VudEl0ZW0iLCJuZXdHcmlkSXRlbXMiLCJzZXREYXRhVG9HcmlkIiwib25Nb3ZlVG9UcmVlQ2xpY2siLCJzZWxlY3RlZElkIiwiZmlsdGVyIiwiaW5jbHVkZXMiLCJpIiwiZ2V0IiwidG9KUyIsIml0ZW0iLCJvbklucHV0Q2hhbmdlIiwidmFsdWUiLCJvbkV4cGFuZCIsImlkcyIsImV4cGFuZGVkS2V5cyIsIm9uRXhwYW5kQWxsIiwibmV3RXhwYW5kZWRJdGVtcyIsImlzQWxsRXhwYW5kZWQiLCJnZXRBbGxQYXJlbnRJZHMiLCJhcnJheSIsImZvdW5kIiwiY2hpbGRLZXkiLCJ2YWx1ZUtleSIsInJlbW92ZUFjdGlvbnMiLCJyb290SXRlbSIsImZpbmQiLCJsZW5ndGgiLCJnZXRBbGxMZWFmcyIsImRlc2VsZWN0SXRlbSIsImNoaWxkIiwiZmlsdGVyZWRDaGlsZHJlbiIsImNoaWxkSXRlbSIsImNvbmNhdCIsIlR5cGVFcnJvciIsImFscmVhZHlGb3VuZCIsImxlYWZzIiwicmV0dXJuUGFyZW50IiwiZm9yRWFjaCIsImdldEFkamFjZW50SXRlbUlkIiwicGFyZW50QXJyIiwiQXJyYXkiLCJpc0FycmF5IiwiaW5kZXgiLCJmaW5kSW5kZXgiLCJhZGphY2VudEl0ZW0iLCJjYiIsImFjYyIsInRvdGFsIiwicmVkdWNlIiwic2V0TmV3SXRlbXMiLCJncmlkQ29sdW1ucyIsInBhcmVudElkIiwiZXhwYW5kZWRJZCIsIm5ld0V4cGFuZGVkS2V5cyIsImNsb3NlRGVsZXRlQ29uZmlybWF0aW9uRGlhbG9nIiwiZGVsZXRlUGFyZW50IiwiaXNEcmFnRHJvcExlZ2FsIiwiZSIsIm9uRHJhZ0Ryb3BQcmV2ZW50IiwiZHJvcEl0ZW0iLCJub2RlIiwiZXZlbnRLZXkiLCJkcmFnSXRlbSIsImRyYWdOb2RlIiwiZHJvcEl0ZW1QYXJlbnQiLCJkcm9wVG9HYXAiLCJoYXNMZWFmcyIsImhhc1BhcmVudHMiLCJkZWZhdWx0RXhwYW5kQWxsIiwiY29tcG9uZW50RGlkTW91bnQiLCJyZW5kZXIiLCJjbGFzc05hbWUiLCJ0cmFuc2xhdGlvbnMiLCJtZXJnZWRHcmlkIiwiT2JqZWN0IiwiYXNzaWduIiwiZGVmYXVsdFNob3dGaWx0ZXJpbmdSb3ciLCJtZXJnZWRUcmFuc2xhdGlvbnMiLCJkZWZhdWx0VHJhbnNsYXRpb25zIiwibm9UcmVlSXRlbXMiLCJncmlkVGl0bGUiLCJkZWxldGVDb25maXJtRGlhbG9nIiwiUmVhY3QiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIiwidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBSUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFIQTs7O0FBS0EsSUFBTUEsOEJBQThCLE1BQXBDO0FBQ0EsSUFBTUMsZUFBZTtBQUNuQkMsZ0JBQWMsY0FESztBQUVuQkMsYUFBVyxXQUZRO0FBR25CQyxpQkFBZSxlQUhJO0FBSW5CQyxpQkFBZTtBQUpJLENBQXJCOztBQU9BLElBQU1DLE9BQU8sZ0NBQU9DLG1CQUFQLENBQVAsa0JBTWtCO0FBQUEsU0FBU0MsTUFBTUMsS0FBTixDQUFZQyxNQUFaLENBQW1CQyxjQUE1QjtBQUFBLENBTmxCLENBQU47O0FBV0EsSUFBTUMsWUFBWUMsMkJBQU9DLEdBQW5CLGtCQUFOOztBQVNBLElBQU1DLGdCQUFnQkYsMkJBQU9DLEdBQXZCLG1CQUdrQjtBQUFBLFNBQVNOLE1BQU1DLEtBQU4sQ0FBWUMsTUFBWixDQUFtQkMsY0FBNUI7QUFBQSxDQUhsQixFQUlvQlgsMkJBSnBCLEVBS1M7QUFBQSxTQUFTUSxNQUFNQyxLQUFOLENBQVlPLFdBQXJCO0FBQUEsQ0FMVCxDQUFOOztBQWVBLElBQU1DLGNBQWNKLDJCQUFPSyxDQUFyQixrQkFBTjs7QUFNQSxJQUFNQyxxQkFBcUI7QUFDekJDLFdBQVNDLDJCQUFnQkQsT0FEQTtBQUV6QkUsc0JBQW9CRCwyQkFBZ0JDO0FBRlgsQ0FBM0I7O0FBS0EsSUFBTUMsa0JBQWtCLFNBQWxCQSxlQUFrQixDQUFDQyxLQUFELEVB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SzFCLFlBRnhCO0FBR0Usd0JBQWdCLEtBQUtEO0FBSHZCO0FBbERGLEtBREY7QUEyREQsRzs7O0VBbmhCZ0Q0QixnQkFBTUMsYSxXQXVCaERDLFksR0FBZTtBQUNwQmxHLFNBQU8sSUFEYTtBQUVwQm9DLFlBQVUsTUFGVTtBQUdwQkQsWUFBVSxVQUhVO0FBSXBCcEMsWUFBVSxFQUpVO0FBS3BCc0YsYUFBVyxFQUxTO0FBTXBCQyxnQkFBY00sa0NBTk07QUFPcEIvRyxNQUFJLGdCQVBnQjtBQVFwQjJGLHFCQUFtQjJCLFNBUkM7QUFTcEI5RyxZQUFVOEcsU0FUVTtBQVVwQjFHLFlBQVUwRyxTQVZVO0FBV3BCakIsb0JBQWtCO0FBWEUsQztrQkF2QkhoRyxxQiIsImZpbGUiOiJoaWVyYXJjaHktdHJlZS1zZWxlY3Rvci5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVHJlZUNvbXBvbmVudCBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC10cmVlLWNvbXBvbmVudCc7XG5pbXBvcnQgUGVyZmVjdFNjcm9sbGJhciBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1wZXJmZWN0LXNjcm9sbGJhcic7XG5pbXBvcnQgeyBQcmltaXRpdmUgfSBmcm9tICdAb3B1c2NhcGl0YS9vYy1jbS1jb21tb24tbGF5b3V0cyc7XG5pbXBvcnQgeyBEYXRhZ3JpZCwgZ3JpZFNoYXBlLCBncmlkQ29sdW1uU2hhcGUsIERhdGFncmlkQWN0aW9ucyB9IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWdyaWQnO1xuaW1wb3J0IENvbmZpcm1EaWFsb2cgZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtY29uZmlybWF0aW9uLWRpYWxvZyc7XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCB7IExpc3QsIGZyb21KUyB9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgSW1tdXRhYmxlUHJvcFR5cGVzIGZyb20gJ3JlYWN0LWltbXV0YWJsZS1wcm9wdHlwZXMnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cblxuLy8gQXBwIGltcG9ydHNcbmltcG9ydCBDb250cm9sQmFyIGZyb20gJy4vaGllcmFyY2h5LXRyZWUtc2VsZWN0b3ItY29udHJvbC1iYXIuY29tcG9uZW50JztcbmltcG9ydCBBcnJvd0NvbnRyb2xzIGZyb20gJy4vaGllcmFyY2h5LXRyZWUtc2VsZWN0b3ItYXJyb3ctY29udHJvbHMuY29tcG9uZW50JztcbmltcG9ydCB7IGRlZmF1bHRUcmFuc2xhdGlvbnMgfSBmcm9tICcuL2hpZXJhcmNoeS10cmVlLnV0aWxzJztcblxuY29uc3QgQUNUSU9OX0JBUl9DT05UQUlORVJfSEVJR0hUID0gJzU3cHgnO1xuY29uc3QgVFJFRV9BQ1RJT05TID0ge1xuICBBRERfQ0hJTERSRU46ICdBRERfQ0hJTERSRU4nLFxuICBNT1ZFX0xFQUY6ICdNT1ZFX0xFQUYnLFxuICBSRU5BTUVfUEFSRU5UOiAnUkVOQU1FX1BBUkVOVCcsXG4gIERFTEVURV9QQVJFTlQ6ICdERUxFVEVfUEFSRU5UJyxcbn07XG5cbmNvbnN0IEdyaWQgPSBzdHlsZWQoRGF0YWdyaWQpYFxuICBoZWlnaHQ6IDEwMCU7XG4gICYmJiB7XG4gICAgcGFkZGluZzogMDtcbiAgfVxuICAub2MtZGF0YWdyaWQtbWFpbi1jb250YWluZXIge1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuY29sb3JzLmNvbG9yTGlnaHRHcmF5fTtcbiAgICBib3JkZXItdG9wOm5vbmU7XG4gIH1cbmA7XG5cbmNvbnN0IENvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIG1pbi1oZWlnaHQ6IDMwMHB4O1xuICA+IGRpdiB7XG4gICAgd2lkdGg6IDUwJTtcbiAgICBmbGV4OiAxIDEgMTAwJTtcbiAgfVxuYDtcblxuY29uc3QgVHJlZUNvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gIGhlaWdodDoxMDAlO1xuICAub2Mtc2Nyb2xsYmFyLWNvbnRhaW5lciB7XG4gICAgYm9yZGVyOiAxcHggc29saWQgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5jb2xvcnMuY29sb3JMaWdodEdyYXl9O1xuICAgIGhlaWdodDogY2FsYygxMDAlIC0gJHtBQ1RJT05fQkFSX0NPTlRBSU5FUl9IRUlHSFR9KTtcbiAgICBwYWRkaW5nOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmd1dHRlcldpZHRofTtcbiAgfVxuICAub2MtcmVhY3QtdHJlZSB7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIC5yYy10cmVlLWljb25FbGUucmMtdHJlZS1pY29uX19jdXN0b21pemUge1xuICAgICAgICBkaXNwbGF5Om5vbmU7XG4gICAgfVxuICB9XG5gO1xuXG5jb25zdCBOb0l0ZW1zVGV4dCA9IHN0eWxlZC5wYFxuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG5gO1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSB7XG4gIHNldERhdGE6IERhdGFncmlkQWN0aW9ucy5zZXREYXRhLFxuICBjbGVhclNlbGVjdGVkSXRlbXM6IERhdGFncmlkQWN0aW9ucy5jbGVhclNlbGVjdGVkSXRlbXMsXG59O1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUsIHByb3BzKSA9PiB7XG4gIGNvbnN0IGdyaWRJZCA9IHByb3BzLmdyaWQuaWQ7XG4gIHJldHVybiB7XG4gICAgc2VsZWN0ZWRHcmlkSXRlbXM6IHN0YXRlLmRhdGFncmlkLmdldEluKFtncmlkSWQsICdzZWxlY3RlZEl0ZW1zJ10sIExpc3QoKSksXG4gICAgZ3JpZERhdGE6IHN0YXRlLmRhdGFncmlkLmdldEluKFtncmlkSWQsICdhbGxEYXRhJ10sIExpc3QoKSksXG4gIH07XG59O1xuXG5AY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcylcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhpZXJhcmNoeVRyZWVTZWxlY3RvciBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGlkS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHZhbHVlS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNoaWxkS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHRyZWVEYXRhOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc2hhcGUoe30pKSxcbiAgICBncmlkOiBncmlkU2hhcGUuaXNSZXF1aXJlZCxcbiAgICBncmlkQ29sdW1uczogUHJvcFR5cGVzLmFycmF5T2YoZ3JpZENvbHVtblNoYXBlKS5pc1JlcXVpcmVkLFxuICAgIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBzZXREYXRhOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGNsZWFyU2VsZWN0ZWRJdGVtczogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBzZWxlY3RlZEdyaWRJdGVtczogSW1tdXRhYmxlUHJvcFR5cGVzLmxpc3QuaXNSZXF1aXJlZCxcbiAgICBncmlkRGF0YTogSW1tdXRhYmxlUHJvcFR5cGVzLmxpc3QuaXNSZXF1aXJlZCxcbiAgICB0cmFuc2xhdGlvbnM6IFByb3BUeXBlcy5zaGFwZSh7fSksXG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGVmYXVsdEV4cGFuZEFsbDogUHJvcFR5cGVzLmJvb2wsXG5cbiAgICAvLyBDYWxsYmFja3NcbiAgICBvbkRyYWdEcm9wUHJldmVudDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGlkS2V5OiAnaWQnLFxuICAgIHZhbHVlS2V5OiAnbmFtZScsXG4gICAgY2hpbGRLZXk6ICdjaGlsZHJlbicsXG4gICAgdHJlZURhdGE6IFtdLFxuICAgIGNsYXNzTmFtZTogJycsXG4gICAgdHJhbnNsYXRpb25zOiBkZWZhdWx0VHJhbnNsYXRpb25zLFxuICAgIGlkOiAnaGllcmFyY2h5LXRyZWUnLFxuICAgIG9uRHJhZ0Ryb3BQcmV2ZW50OiB1bmRlZmluZWQsXG4gICAgb25TZWxlY3Q6IHVuZGVmaW5lZCxcbiAgICBvbkNoYW5nZTogdW5kZWZpbmVkLFxuICAgIGRlZmF1bHRFeHBhbmRBbGw6IHRydWUsXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICBsZXQgZXhwYW5kZWRLZXlzID0gW107XG4gICAgaWYgKHByb3BzLmRlZmF1bHRFeHBhbmRBbGwgJiYgcHJvcHMudHJlZURhdGEpIHtcbiAgICAgIGV4cGFuZGVkS2V5cyA9IHRoaXMuZ2V0QWxsUGFyZW50SWRzKHByb3BzLnRyZWVEYXRhKTtcbiAgICB9XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHNlbGVjdGVkS2V5czogW10sXG4gICAgICBleHBhbmRlZEtleXMsXG4gICAgICBzaG93RGVsZXRlQ29uZmlybWF0aW9uOiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgY29uc3QgeyBkZWZhdWx0RXhwYW5kQWxsIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChkZWZhdWx0RXhwYW5kQWxsKSB7XG4gICAgICB0aGlzLm9uRXhwYW5kKHRoaXMuZ2V0QWxsUGFyZW50SWRzKCkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3RzIGEgdHJlZSBpdGVtXG4gICAqIEBwYXJhbSBzZWxlY3RlZEtleXMgKGFycmF5KVxuICAgKi9cbiAgb25UcmVlSXRlbVNlbGVjdCA9IChzZWxlY3RlZEtleXMpID0+IHtcbiAgICBjb25zdCB7IG9uU2VsZWN0IH0gPSB0aGlzLnByb3BzO1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZEtleXMgfSwgKCkgPT4ge1xuICAgICAgaWYgKG9uU2VsZWN0KSBvblNlbGVjdChzZWxlY3RlZEtleXMpO1xuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBGaXJlZCBvbiBkcmFnIG4nIGRyb3BcbiAgICogQHBhcmFtIGl0ZW1zXG4gICAqL1xuICBvblRyZWVJdGVtRHJhZ0Ryb3AgPSAoaXRlbXMpID0+IHtcbiAgICBjb25zdCB7IG9uQ2hhbmdlIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChvbkNoYW5nZSkgb25DaGFuZ2UoaXRlbXMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBEaXNwbGF5cyBhIGNvbmZpcm1hdGlvbiBkaWFsb2dcbiAgICovXG4gIG9uRGVsZXRlQ2xpY2sgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNob3dEZWxldGVDb25maXJtYXRpb246IHRydWUgfSk7XG4gIH07XG5cblxuICAvKipcbiAgICogQWRkcyBhIG5ldyBub2RlIHRvIHRoZSByb290IG9mIHRoZSB0cmVlLCBvciB1bmRlciBhIHNlbGVjdGVkIHRyZWUgbm9kZSB1c2luZ1xuICAgKiBBRERfQ0hJTERSRU4gYWN0aW9uXG4gICAqIEBwYXJhbSBkYXRhIC0gZGF0YSB0byBiZSBhZGRlZFxuICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICovXG4gIG9uQWRkTmV3Q2xpY2sgPSAoZGF0YSwgY2FsbGJhY2spID0+IHtcbiAgICBjb25zdCB7IG9uQ2hhbmdlLCB0cmVlRGF0YSwgaWRLZXkgfSA9IHRoaXMucHJvcHM7XG4gICAgbGV0IG5ld0l0ZW1zID0gdHJlZURhdGEuc2xpY2UoKTtcblxuICAgIC8vIElmIG5vIHRyZWUgbm9kZSBpcyBzZWxlY3RlZCwgd2UnbGwgcGxhY2UgdGhlIG5ldyBpdGVtIHRvIHRoZSByb290XG4gICAgLy8gb2YgdGhlIHRyZWVcbiAgICBpZiAoIXRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdKSB7XG4gICAgICBuZXdJdGVtcy5wdXNoKGRhdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBhY3Rpb24gPSB7XG4gICAgICAgIHR5cGU6IFRSRUVfQUNUSU9OUy5BRERfQ0hJTERSRU4sXG4gICAgICAgIGRhdGEsXG4gICAgICB9O1xuICAgICAgbmV3SXRlbXMgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdLCB0cmVlRGF0YSwgYWN0aW9uKTtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkS2V5czogW2RhdGFbaWRLZXldXSB9LCAoKSA9PiB7XG4gICAgICAvLyBJZiB0aGUgcGFyZW50IGlzIG5vdCB5ZXQgZXhwYW5kZWQsIHdlIHdpbGwgZXhwYW5kIGl0IG5vd1xuICAgICAgY29uc3QgcGFyZW50ID0gdGhpcy5nZXRUcmVlSXRlbShkYXRhW2lkS2V5XSwgdHJlZURhdGEsIHRydWUpIHx8IHt9O1xuICAgICAgdGhpcy5leHBhbmRQYXJlbnQocGFyZW50W2lkS2V5XSk7XG5cbiAgICAgIGlmIChvbkNoYW5nZSkgb25DaGFuZ2UobmV3SXRlbXMpO1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogUmVtb3ZlcyB0aGUgY2hvc2VuIGl0ZW0gZnJvbSBhIHRyZWUgYW5kIHVwZGF0ZXMgdGhlIGdyaWQgdXNpbmcgTU9WRV9MRUFGXG4gICAqIGFjdGlvblxuICAgKi9cbiAgb25Nb3ZlVG9HcmlkQ2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3QgeyB0cmVlRGF0YSwgb25DaGFuZ2UgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgc2VsZWN0ZWRLZXkgPSB0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXTtcbiAgICBjb25zdCBhY3Rpb24gPSB7XG4gICAgICB0eXBlOiBUUkVFX0FDVElPTlMuTU9WRV9MRUFGLFxuICAgICAgZGF0YTogdGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF0sXG4gICAgfTtcbiAgICBjb25zdCBuZXh0U2VsZWN0ZWRLZXkgPSB0aGlzLmdldEFkamFjZW50SXRlbShzZWxlY3RlZEtleSk7XG4gICAgY29uc3QgbmV3R3JpZEl0ZW1zID0gZnJvbUpTKFt0aGlzLmdldFRyZWVJdGVtKHNlbGVjdGVkS2V5KV0pO1xuICAgIGNvbnN0IG5ld0l0ZW1zID0gdGhpcy5nZXRVcGRhdGVkVHJlZShzZWxlY3RlZEtleSwgdHJlZURhdGEsIGFjdGlvbik7XG5cbiAgICB0aGlzLnNldERhdGFUb0dyaWQobmV3R3JpZEl0ZW1zKTtcbiAgICBpZiAob25DaGFuZ2UpIG9uQ2hhbmdlKG5ld0l0ZW1zKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNlbGVjdGVkS2V5czogW25leHRTZWxlY3RlZEtleV0sXG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEFkZHMgc2VsZWN0ZWQgZ3JpZCBpdGVtcyB0byB0aGUgY2hvc2VuIHRyZWUgbm9kZSB1c2luZyBBRERfQ0hJTERSRU4gYWN0aW9uXG4gICAqL1xuICBvbk1vdmVUb1RyZWVDbGljayA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBvbkNoYW5nZSwgc2VsZWN0ZWRHcmlkSXRlbXMsIGdyaWREYXRhLCB0cmVlRGF0YSwgaWRLZXksXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgc2VsZWN0ZWRJZCA9IHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdO1xuXG4gICAgY29uc3QgYWN0aW9uID0ge1xuICAgICAgdHlwZTogVFJFRV9BQ1RJT05TLkFERF9DSElMRFJFTixcbiAgICAgIGRhdGE6IGdyaWREYXRhXG4gICAgICAgIC5maWx0ZXIoaSA9PiBzZWxlY3RlZEdyaWRJdGVtcy5pbmNsdWRlcyhpLmdldChpZEtleSkpKVxuICAgICAgICAudG9KUygpLFxuICAgIH07XG4gICAgY29uc3QgbmV3SXRlbXMgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKHNlbGVjdGVkSWQsIHRyZWVEYXRhLCBhY3Rpb24pO1xuICAgIGNvbnN0IG5ld0dyaWRJdGVtcyA9IGdyaWREYXRhLmZpbHRlcihpdGVtID0+ICFzZWxlY3RlZEdyaWRJdGVtcy5pbmNsdWRlcyhpdGVtLmdldChpZEtleSkpKTtcblxuICAgIHRoaXMuZXhwYW5kUGFyZW50KHNlbGVjdGVkSWQsIHRydWUpO1xuICAgIHRoaXMuc2V0RGF0YVRvR3JpZChuZXdHcmlkSXRlbXMsIHRydWUpO1xuICAgIGlmIChvbkNoYW5nZSkgb25DaGFuZ2UobmV3SXRlbXMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZW5hbWVzIHRoZSBjaG9zZW4gdHJlZSBub2RlIHVzaW5nIGEgUkVOQU1FX1BBUkVOVCBhY3Rpb25cbiAgICogQHBhcmFtIHZhbHVlXG4gICAqL1xuICBvbklucHV0Q2hhbmdlID0gKHZhbHVlKSA9PiB7XG4gICAgY29uc3QgeyB0cmVlRGF0YSwgb25DaGFuZ2UgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgYWN0aW9uID0ge1xuICAgICAgdHlwZTogVFJFRV9BQ1RJT05TLlJFTkFNRV9QQVJFTlQsXG4gICAgICBkYXRhOiB2YWx1ZSxcbiAgICB9O1xuICAgIGNvbnN0IG5ld0l0ZW1zID0gdGhpcy5nZXRVcGRhdGVkVHJlZSh0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXSwgdHJlZURhdGEsIGFjdGlvbik7XG4gICAgaWYgKG9uQ2hhbmdlKSBvbkNoYW5nZShuZXdJdGVtcyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEZpcmVkIG9uIGV4cGFuZFxuICAgKiBAcGFyYW0gaWRzXG4gICAqL1xuICBvbkV4cGFuZCA9IChpZHMpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGV4cGFuZGVkS2V5czogaWRzLFxuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBFeHBhbmQgYWxsIHRoZSBpdGVtc1xuICAgKi9cbiAgb25FeHBhbmRBbGwgPSAoKSA9PiB7XG4gICAgY29uc3QgbmV3RXhwYW5kZWRJdGVtcyA9IHRoaXMuaXNBbGxFeHBhbmRlZCgpID8gW10gOiB0aGlzLmdldEFsbFBhcmVudElkcygpO1xuICAgIHRoaXMuc2V0U3RhdGUoeyBleHBhbmRlZEtleXM6IG5ld0V4cGFuZGVkSXRlbXMgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdXBkYXRlZCB0cmVlIGl0ZW1zLlxuICAgKiBAcGFyYW0gaWQgLSB0YXJnZXQgaXRlbVxuICAgKiBAcGFyYW0gYXJyYXkgLSBhcnJheSB3aGVyZSB0YXJnZXQgaXRlbSBpcyBiZWluZyBzZWFyY2hlZFxuICAgKiBAcGFyYW0gYWN0aW9uIC0gYWN0aW9uIHRvIGJlIHBlcmZvcm1lZCB7dHlwZSwgZGF0YX1cbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBnZXRVcGRhdGVkVHJlZSA9IChpZCwgYXJyYXkgPSB0aGlzLnByb3BzLnRyZWVEYXRhLCBhY3Rpb24pID0+IHtcbiAgICBsZXQgZm91bmQgPSBmYWxzZTtcbiAgICBjb25zdCB7IGlkS2V5LCBjaGlsZEtleSwgdmFsdWVLZXkgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgbmV3SXRlbXMgPSBhcnJheS5zbGljZSgpO1xuICAgIGNvbnN0IHJlbW92ZUFjdGlvbnMgPSBbVFJFRV9BQ1RJT05TLk1PVkVfTEVBRiwgVFJFRV9BQ1RJT05TLkRFTEVURV9QQVJFTlRdO1xuXG4gICAgLy8gSWYgZGVsZXRlZCBwYXJlbnQgaXRlbSBpcyBpbiB0aGUgcm9vdCBub2RlXG4gICAgaWYgKGFjdGlvbi50eXBlID09PSBUUkVFX0FDVElPTlMuREVMRVRFX1BBUkVOVCkge1xuICAgICAgY29uc3Qgcm9vdEl0ZW0gPSBhcnJheS5maW5kKGl0ZW0gPT4gaXRlbVtpZEtleV0gPT09IGlkKTtcbiAgICAgIGlmIChyb290SXRlbSkge1xuICAgICAgICBpZiAocm9vdEl0ZW1bY2hpbGRLZXldLmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuc2V0RGF0YVRvR3JpZChmcm9tSlModGhpcy5nZXRBbGxMZWFmcyhyb290SXRlbVtjaGlsZEtleV0pKSk7XG4gICAgICAgICAgdGhpcy5kZXNlbGVjdEl0ZW0oKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3SXRlbXMuZmlsdGVyKGl0ZW0gPT4gaXRlbVtpZEtleV0gIT09IGlkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5ld0l0ZW1zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBpdGVtID0gbmV3SXRlbXNbaV07XG4gICAgICBpZiAocmVtb3ZlQWN0aW9ucy5pbmNsdWRlcyhhY3Rpb24udHlwZSkgJiYgaXRlbVtjaGlsZEtleV0gJiYgIWZvdW5kKSB7XG4gICAgICAgIGZvdW5kID0gISFpdGVtW2NoaWxkS2V5XS5maW5kKGNoaWxkID0+IGNoaWxkW2lkS2V5XSA9PT0gaWQpO1xuICAgICAgICBpZiAoZm91bmQpIHtcbiAgICAgICAgICAvLyBXaGVuIHJlbW92aW5nIGFuIGl0ZW0gd2UgbXVzdCBmaXJzdCBmaW5kIGl0cyBwYXJlbnQgYW5kIGFsdGVyIGl0cyBjaGlsZHJlbiBhcnJheVxuICAgICAgICAgIGlmIChhY3Rpb24udHlwZSA9PT0gVFJFRV9BQ1RJT05TLk1PVkVfTEVBRikge1xuICAgICAgICAgICAgaXRlbVtjaGlsZEtleV0gPSBpdGVtW2NoaWxkS2V5XS5maWx0ZXIoY2hpbGQgPT4gY2hpbGRbaWRLZXldICE9PSBpZCk7XG4gICAgICAgICAgICB0aGlzLmRlc2VsZWN0SXRlbSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYWN0aW9uLnR5cGUgPT09IFRSRUVfQUNUSU9OUy5ERUxFVEVfUEFSRU5UKSB7XG4gICAgICAgICAgICAvLyB3ZSBtdXN0IGZpcnN0IGZpbHRlciB0aGUgY2hpbGRyZW4sIHNvIHRoYXQgd2Ugd29uJ3QgZ2V0IGxlYWZzIGZyb21cbiAgICAgICAgICAgIC8vIG90aGVyIGNoaWxkIGJyYW5jaGVzXG4gICAgICAgICAgICBjb25zdCBmaWx0ZXJlZENoaWxkcmVuID0gaXRlbVtjaGlsZEtleV0uZmlsdGVyKGNoaWxkSXRlbSA9PiBjaGlsZEl0ZW1baWRLZXldID09PSBpZCk7XG4gICAgICAgICAgICB0aGlzLnNldERhdGFUb0dyaWQoZnJvbUpTKHRoaXMuZ2V0QWxsTGVhZnMoZmlsdGVyZWRDaGlsZHJlbikpKTtcbiAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RJdGVtKCk7XG4gICAgICAgICAgICBpdGVtW2NoaWxkS2V5XSA9IGl0ZW1bY2hpbGRLZXldLmZpbHRlcihjaGlsZEl0ZW0gPT4gY2hpbGRJdGVtW2lkS2V5XSAhPT0gaWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVtpZEtleV0gPT09IGlkICYmICFmb3VuZCkge1xuICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgICBjYXNlIFRSRUVfQUNUSU9OUy5BRERfQ0hJTERSRU46XG4gICAgICAgICAgICBpdGVtW2NoaWxkS2V5XSA9IChpdGVtW2NoaWxkS2V5XSB8fCBbXSkuY29uY2F0KGFjdGlvbi5kYXRhKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgVFJFRV9BQ1RJT05TLlJFTkFNRV9QQVJFTlQ6XG4gICAgICAgICAgICBpdGVtW3ZhbHVlS2V5XSA9IGFjdGlvbi5kYXRhO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FjdGlvbiB0eXBlIGlzIHVuZGVmaW5lZCcpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bY2hpbGRLZXldICYmICFmb3VuZCkgZm91bmQgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKGlkLCBpdGVtW2NoaWxkS2V5XSwgYWN0aW9uKTtcbiAgICB9XG5cbiAgICBpZiAoIWZvdW5kKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIG5ld0l0ZW1zO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHJlY3Vyc2l2ZWx5IGFsbCBsZWFmIGl0ZW1zIGZyb20gYSBnaXZlbiBhcnJheVxuICAgKiBAcGFyYW0gYXJyYXlcbiAgICogQHBhcmFtIGFscmVhZHlGb3VuZCAodXNlZCByZWN1cnNpdmVseSlcbiAgICovXG4gIGdldEFsbExlYWZzID0gKGFycmF5LCBhbHJlYWR5Rm91bmQgPSBbXSkgPT4ge1xuICAgIGNvbnN0IHsgY2hpbGRLZXkgfSA9IHRoaXMucHJvcHM7XG4gICAgbGV0IGxlYWZzID0gYWxyZWFkeUZvdW5kO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3QgaXRlbSA9IGFycmF5W2ldO1xuICAgICAgaWYgKGl0ZW1bY2hpbGRLZXldKSB7XG4gICAgICAgIGxlYWZzID0gdGhpcy5nZXRBbGxMZWFmcyhpdGVtW2NoaWxkS2V5XSwgYWxyZWFkeUZvdW5kKTtcbiAgICAgIH1cbiAgICAgIGlmICghaXRlbVtjaGlsZEtleV0pIGxlYWZzLnB1c2goaXRlbSk7XG4gICAgfVxuICAgIHJldHVybiBsZWFmcztcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyBhIHRyZWUgaXRlbSBieSBJRFxuICAgKiBAcGFyYW0gaWRcbiAgICogQHBhcmFtIGFycmF5XG4gICAqIEBwYXJhbSByZXR1cm5QYXJlbnQgLSByZXR1cm4gaXRlbSdzIHBhcmVudCBpbnN0ZWFkIG9mIHRoZSBpdGVtXG4gICAqIEBwYXJhbSBwYXJlbnQgLSBwYXJlbnQgaXRlbSAodXNlZCByZWN1cnNpdmVseSlcbiAgICogQHJldHVybnMge3t9fVxuICAgKi9cbiAgZ2V0VHJlZUl0ZW0gPSAoaWQsIGFycmF5ID0gdGhpcy5wcm9wcy50cmVlRGF0YSwgcmV0dXJuUGFyZW50ID0gZmFsc2UsIHBhcmVudCA9IG51bGwpID0+IHtcbiAgICBjb25zdCB7IGNoaWxkS2V5LCBpZEtleSB9ID0gdGhpcy5wcm9wcztcbiAgICBsZXQgZm91bmQgPSBhcnJheS5maW5kKGl0ZW0gPT4gaXRlbVtpZEtleV0gPT09IGlkKTtcblxuICAgIGlmIChmb3VuZCAmJiByZXR1cm5QYXJlbnQpIGZvdW5kID0gcGFyZW50O1xuXG4gICAgaWYgKCFmb3VuZCkge1xuICAgICAgYXJyYXkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBpZiAoaXRlbVtjaGlsZEtleV0gJiYgIWZvdW5kKSB7XG4gICAgICAgICAgZm91bmQgPSB0aGlzLmdldFRyZWVJdGVtKGlkLCBpdGVtW2NoaWxkS2V5XSwgcmV0dXJuUGFyZW50LCBpdGVtKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBmb3VuZDtcbiAgfTtcblxuICAvKipcbiAgICogR2V0IGFkamFjZW50IGl0ZW0gKGlkKSBpbiBwYXJlbnQgYXJyYXkuIFVzZWQgd2hlbiBtb3ZpbmcgaXRlbXMgZnJvbSB0cmVlXG4gICAqIHRvIGdyaWQvZGVsZXRpbmcgYW4gaXRlbVxuICAgKiBAcGFyYW0gaWRcbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBnZXRBZGphY2VudEl0ZW0gPSAoaWQpID0+IHtcbiAgICBpZiAoIWlkKSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCB7IGNoaWxkS2V5LCBpZEtleSwgdHJlZURhdGEgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBnZXRBZGphY2VudEl0ZW1JZCA9IChwYXJlbnQpID0+IHtcbiAgICAgIGNvbnN0IHBhcmVudEFyciA9IEFycmF5LmlzQXJyYXkocGFyZW50KSA/IHBhcmVudCA6IHBhcmVudFtjaGlsZEtleV07XG4gICAgICBjb25zdCBpbmRleCA9IHBhcmVudEFyci5maW5kSW5kZXgoY2hpbGQgPT4gY2hpbGRbaWRLZXldID09PSBpZCk7XG4gICAgICBsZXQgYWRqYWNlbnRJdGVtID0gcGFyZW50QXJyW2luZGV4ICsgMV07XG4gICAgICBpZiAoIWFkamFjZW50SXRlbSkgYWRqYWNlbnRJdGVtID0gcGFyZW50QXJyW2luZGV4IC0gMV07XG4gICAgICBpZiAoIWFkamFjZW50SXRlbSAmJiAhQXJyYXkuaXNBcnJheShwYXJlbnQpKSBhZGphY2VudEl0ZW0gPSBwYXJlbnQ7XG4gICAgICBpZiAoIWFkamFjZW50SXRlbSkgcmV0dXJuIG51bGw7XG5cbiAgICAgIHJldHVybiBhZGphY2VudEl0ZW1baWRLZXldO1xuICAgIH07XG5cbiAgICBjb25zdCBwYXJlbnQgPSB0aGlzLmdldFRyZWVJdGVtKGlkLCB0aGlzLnByb3BzLnRyZWVEYXRhLCB0cnVlKTtcbiAgICByZXR1cm4gcGFyZW50ID8gZ2V0QWRqYWNlbnRJdGVtSWQocGFyZW50KSA6IGdldEFkamFjZW50SXRlbUlkKHRyZWVEYXRhKTtcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyBhbGwgSURzIGluIHRoZSB0cmVlXG4gICAqIEBwYXJhbSBhcnJheVxuICAgKi9cbiAgZ2V0QWxsUGFyZW50SWRzID0gKGFycmF5ID0gdGhpcy5wcm9wcy50cmVlRGF0YSkgPT4ge1xuICAgIGNvbnN0IHsgaWRLZXksIGNoaWxkS2V5IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGNiID0gKGFjYywgaXRlbSkgPT4ge1xuICAgICAgbGV0IHRvdGFsID0gYWNjO1xuICAgICAgaWYgKGl0ZW1bY2hpbGRLZXldICYmIGl0ZW1bY2hpbGRLZXldLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdG90YWwgPSBhY2MuY29uY2F0KGl0ZW1baWRLZXldKTtcbiAgICAgICAgcmV0dXJuIGl0ZW1bY2hpbGRLZXldLnJlZHVjZShjYiwgdG90YWwpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRvdGFsO1xuICAgIH07XG4gICAgcmV0dXJuIGFycmF5LnJlZHVjZShjYiwgW10pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBcHBlbmRzIHByb3ZpZGVkIGl0ZW1zIHRvIHRoZSBncmlkXG4gICAqIEBwYXJhbSBpdGVtcyAtIGltbXV0YWJsZSBhcnJheSBvZiBpdGVtcyB0byBiZSBhcHBlbmRlZCB0byBncmlkXG4gICAqIEBwYXJhbSBzZXROZXdJdGVtcyAtIHNldCBjb21wbGV0ZWx5IGEgbmV3IGFycmF5IG9mIGl0ZW1zXG4gICAqL1xuICBzZXREYXRhVG9HcmlkID0gKGl0ZW1zLCBzZXROZXdJdGVtcyA9IGZhbHNlKSA9PiB7XG4gICAgbGV0IGRhdGEgPSBMaXN0KCk7XG4gICAgY29uc3QgeyBncmlkLCBncmlkQ29sdW1ucywgZ3JpZERhdGEgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFzZXROZXdJdGVtcykgZGF0YSA9IGdyaWREYXRhLnNsaWNlKCk7XG4gICAgY29uc3QgbmV3R3JpZEl0ZW1zID0gZGF0YS5jb25jYXQoaXRlbXMpO1xuXG4gICAgdGhpcy5wcm9wcy5zZXREYXRhKGdyaWQsIGdyaWRDb2x1bW5zLCBuZXdHcmlkSXRlbXMpO1xuICAgIHRoaXMucHJvcHMuY2xlYXJTZWxlY3RlZEl0ZW1zKGdyaWQpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBFeHBhbmRzIGEgcGFyZW50XG4gICAqIEBwYXJhbSBwYXJlbnRJZFxuICAgKi9cbiAgZXhwYW5kUGFyZW50ID0gKHBhcmVudElkKSA9PiB7XG4gICAgaWYgKHBhcmVudElkICYmICF0aGlzLnN0YXRlLmV4cGFuZGVkS2V5cy5maW5kKGV4cGFuZGVkSWQgPT4gZXhwYW5kZWRJZCA9PT0gcGFyZW50SWQpKSB7XG4gICAgICBjb25zdCBuZXdFeHBhbmRlZEtleXMgPSB0aGlzLnN0YXRlLmV4cGFuZGVkS2V5cy5zbGljZSgpO1xuICAgICAgbmV3RXhwYW5kZWRLZXlzLnB1c2gocGFyZW50SWQpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGV4cGFuZGVkS2V5czogbmV3RXhwYW5kZWRLZXlzIH0pO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogQ2xvc2VzIGRlbGV0ZSBjb25maXJtYXRpb24gZGlhbG9nXG4gICAqL1xuICBjbG9zZURlbGV0ZUNvbmZpcm1hdGlvbkRpYWxvZyA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2hvd0RlbGV0ZUNvbmZpcm1hdGlvbjogZmFsc2UgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIERlbGV0ZXMgYSBwYXJlbnQgbm9kZVxuICAgKi9cbiAgZGVsZXRlUGFyZW50ID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgb25DaGFuZ2UsIHRyZWVEYXRhIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHNlbGVjdGVkS2V5ID0gdGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF07XG4gICAgY29uc3QgYWN0aW9uID0ge1xuICAgICAgdHlwZTogVFJFRV9BQ1RJT05TLkRFTEVURV9QQVJFTlQsXG4gICAgfTtcbiAgICBjb25zdCBuZXh0U2VsZWN0ZWRLZXkgPSB0aGlzLmdldEFkamFjZW50SXRlbShzZWxlY3RlZEtleSk7XG4gICAgY29uc3QgbmV3SXRlbXMgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKHNlbGVjdGVkS2V5LCB0cmVlRGF0YSwgYWN0aW9uKTtcbiAgICBpZiAob25DaGFuZ2UpIG9uQ2hhbmdlKG5ld0l0ZW1zKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNlbGVjdGVkS2V5czogW25leHRTZWxlY3RlZEtleV0sXG4gICAgICBzaG93RGVsZXRlQ29uZmlybWF0aW9uOiBmYWxzZSxcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGEgbW92ZSBpcyBwZXJtaXR0ZWQgYmVmb3JlIGNhbGxpbmcgVHJlZSBjb21wb25lbnQncyBvbkRyYWdEcm9wIGNhbGxiYWNrXG4gICAqIEBwYXJhbSBpdGVtc1xuICAgKiBAcGFyYW0gZVxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIGlzRHJhZ0Ryb3BMZWdhbCA9IChpdGVtcywgZSkgPT4ge1xuICAgIGNvbnN0IHsgY2hpbGRLZXksIHRyZWVEYXRhLCBvbkRyYWdEcm9wUHJldmVudCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBkcm9wSXRlbSA9IHRoaXMuZ2V0VHJlZUl0ZW0oZS5ub2RlLnByb3BzLmV2ZW50S2V5KTtcbiAgICBjb25zdCBkcmFnSXRlbSA9IHRoaXMuZ2V0VHJlZUl0ZW0oZS5kcmFnTm9kZS5wcm9wcy5ldmVudEtleSk7XG4gICAgY29uc3QgZHJvcEl0ZW1QYXJlbnQgPSB0aGlzLmdldFRyZWVJdGVtKGUubm9kZS5wcm9wcy5ldmVudEtleSwgdHJlZURhdGEsIHRydWUpO1xuXG4gICAgLyoqXG4gICAgICogV2Ugd2FudCB0byBwcmV2ZW50IHRoZSBtb3ZlLCBpZjpcbiAgICAgKiAtIFNlbGVjdGVkIGl0ZW0gaXMgYSBwYXJlbnQsIGFuZCAuLlxuICAgICAqICAgIC0gRHJvcHBpbmcgb3ZlciBhbiBpdGVtLCBhbmQgLi5cbiAgICAgKiAgICAgIC0gTmV3IHBhcmVudCBoYXMgbGVhZnMgT1IgbmV3IHBhcmVudCBpcyBhIGxlYWZcbiAgICAgKiAgICAtIERyb3BwaW5nIGJldHdlZW4gaXRlbXMsIGFuZCAuLlxuICAgICAqICAgICAgICAtIE5ldyBwYXJlbnQncyBwYXJlbnQgaGFzIGxlYWZzXG4gICAgICogIC0gU2VsZWN0ZWQgaXRlbSBpcyBhIGxlYWYsIGFuZCAuLi5cbiAgICAgKi9cbiAgICBpZiAoZHJhZ0l0ZW1bY2hpbGRLZXldKSB7XG4gICAgICBpZiAoXG4gICAgICAgICghZS5kcm9wVG9HYXAgJiYgKHRoaXMuaGFzTGVhZnMoZHJvcEl0ZW0pIHx8ICFkcm9wSXRlbVtjaGlsZEtleV0pKSB8fFxuICAgICAgICAoZHJvcEl0ZW1QYXJlbnQgJiYgZS5kcm9wVG9HYXAgJiYgKHRoaXMuaGFzTGVhZnMoZHJvcEl0ZW1QYXJlbnQpKSlcbiAgICAgICkge1xuICAgICAgICBpZiAob25EcmFnRHJvcFByZXZlbnQpIG9uRHJhZ0Ryb3BQcmV2ZW50KCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKFxuICAgICAgKGRyb3BJdGVtICYmICFlLmRyb3BUb0dhcCAmJiB0aGlzLmhhc1BhcmVudHMoZHJvcEl0ZW0pKSB8fFxuICAgICAgKGRyb3BJdGVtUGFyZW50ICYmIGUuZHJvcFRvR2FwICYmIHRoaXMuaGFzUGFyZW50cyhkcm9wSXRlbVBhcmVudCkpIHx8XG4gICAgICAoZS5kcm9wVG9HYXAgJiYgIWRyb3BJdGVtUGFyZW50KSB8fFxuICAgICAgKCFlLmRyb3BUb0dhcCAmJiAhZHJvcEl0ZW1bY2hpbGRLZXldKVxuICAgICkge1xuICAgICAgLy8gSXRlbSBoYXMgZ290IHBhcmVudCBhcyBhIGNoaWxkIC0gbGVhZiBjYW5ub3QgYmUgZHJvcHBlZCBoZXJlXG4gICAgICBpZiAob25EcmFnRHJvcFByZXZlbnQpIG9uRHJhZ0Ryb3BQcmV2ZW50KCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG5cbiAgaXNBbGxFeHBhbmRlZCA9ICgpID0+XG4gICAgdGhpcy5zdGF0ZS5leHBhbmRlZEtleXMubGVuZ3RoID09PSB0aGlzLmdldEFsbFBhcmVudElkcygpLmxlbmd0aDtcblxuICBoYXNMZWFmcyA9IChpdGVtKSA9PiB7XG4gICAgY29uc3QgeyBjaGlsZEtleSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIWl0ZW1bY2hpbGRLZXldKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuICEhaXRlbVtjaGlsZEtleV0uZmluZChjaGlsZCA9PiAhY2hpbGRbY2hpbGRLZXldKTtcbiAgfTtcblxuICBoYXNQYXJlbnRzID0gKGl0ZW0pID0+IHtcbiAgICBjb25zdCB7IGNoaWxkS2V5IH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghaXRlbVtjaGlsZEtleV0pIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gISFpdGVtW2NoaWxkS2V5XS5maW5kKGNoaWxkID0+IGNoaWxkW2NoaWxkS2V5XSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIERlc2VsZWN0cyBhbiBpdGVtLCBpZiBpdCBpcyBlLmcuIHJlbW92ZWRcbiAgICovXG4gIGRlc2VsZWN0SXRlbSA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRLZXlzOiBbXSB9KTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgdmFsdWVLZXksIGlkS2V5LCB0cmVlRGF0YSwgZ3JpZCwgZ3JpZENvbHVtbnMsIGNsYXNzTmFtZSwgdHJhbnNsYXRpb25zLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgbWVyZ2VkR3JpZCA9IE9iamVjdC5hc3NpZ24oe30sIGdyaWQsIHsgZGVmYXVsdFNob3dGaWx0ZXJpbmdSb3c6IHRydWUgfSk7XG4gICAgY29uc3QgbWVyZ2VkVHJhbnNsYXRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdFRyYW5zbGF0aW9ucywgdHJhbnNsYXRpb25zKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8UmVhY3QuRnJhZ21lbnQ+XG4gICAgICAgIDxDb250YWluZXIgY2xhc3NOYW1lPXtjbGFzc05hbWV9PlxuICAgICAgICAgIDxUcmVlQ29udGFpbmVyPlxuICAgICAgICAgICAgPENvbnRyb2xCYXJcbiAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgIG9uQWRkTmV3Q2xpY2s9e3RoaXMub25BZGROZXdDbGlja31cbiAgICAgICAgICAgICAgb25EZWxldGVDbGljaz17dGhpcy5vbkRlbGV0ZUNsaWNrfVxuICAgICAgICAgICAgICBvbklucHV0Q2hhbmdlPXt0aGlzLm9uSW5wdXRDaGFuZ2V9XG4gICAgICAgICAgICAgIG9uRXhwYW5kQWxsQ2xpY2s9e3RoaXMub25FeHBhbmRBbGx9XG4gICAgICAgICAgICAgIGV4cGFuZEFsbD17dGhpcy5pc0FsbEV4cGFuZGVkKCl9XG4gICAgICAgICAgICAgIHNlbGVjdGVkVHJlZUl0ZW09e3RoaXMuZ2V0VHJlZUl0ZW0odGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF0pfVxuICAgICAgICAgICAgICBoZWlnaHQ9e0FDVElPTl9CQVJfQ09OVEFJTkVSX0hFSUdIVH1cbiAgICAgICAgICAgICAgdHJhbnNsYXRpb25zPXttZXJnZWRUcmFuc2xhdGlvbnN9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPFBlcmZlY3RTY3JvbGxiYXI+XG4gICAgICAgICAgICAgIHshIXRyZWVEYXRhLmxlbmd0aCAmJiA8VHJlZUNvbXBvbmVudFxuICAgICAgICAgICAgICAgIHRyZWVEYXRhPXt0cmVlRGF0YX1cbiAgICAgICAgICAgICAgICBkYXRhTG9va1VwS2V5PXtpZEtleX1cbiAgICAgICAgICAgICAgICBkYXRhTG9va1VwVmFsdWU9e3ZhbHVlS2V5fVxuICAgICAgICAgICAgICAgIG9uU2VsZWN0PXt0aGlzLm9uVHJlZUl0ZW1TZWxlY3R9XG4gICAgICAgICAgICAgICAgb25EcmFnRHJvcD17dGhpcy5vblRyZWVJdGVtRHJhZ0Ryb3B9XG4gICAgICAgICAgICAgICAgb25FeHBhbmQ9e3RoaXMub25FeHBhbmR9XG4gICAgICAgICAgICAgICAgY2hlY2thYmxlPXtmYWxzZX1cbiAgICAgICAgICAgICAgICBzZWxlY3RlZEtleXM9e3RoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzfVxuICAgICAgICAgICAgICAgIGV4cGFuZGVkS2V5cz17dGhpcy5zdGF0ZS5leHBhbmRlZEtleXN9XG4gICAgICAgICAgICAgICAgaXNEcmFnRHJvcExlZ2FsPXt0aGlzLmlzRHJhZ0Ryb3BMZWdhbH1cbiAgICAgICAgICAgICAgICBzZWxlY3RhYmxlXG4gICAgICAgICAgICAgICAgZHJhZ2dhYmxlXG4gICAgICAgICAgICAgIC8+fVxuICAgICAgICAgICAgICB7IXRyZWVEYXRhLmxlbmd0aCAmJiA8Tm9JdGVtc1RleHQ+e21lcmdlZFRyYW5zbGF0aW9ucy5ub1RyZWVJdGVtc308L05vSXRlbXNUZXh0Pn1cbiAgICAgICAgICAgIDwvUGVyZmVjdFNjcm9sbGJhcj5cbiAgICAgICAgICA8L1RyZWVDb250YWluZXI+XG4gICAgICAgICAgPEFycm93Q29udHJvbHNcbiAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgc2VsZWN0ZWRUcmVlSXRlbT17dGhpcy5nZXRUcmVlSXRlbSh0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXSl9XG4gICAgICAgICAgICBvbk1vdmVUb1RyZWVDbGljaz17dGhpcy5vbk1vdmVUb1RyZWVDbGlja31cbiAgICAgICAgICAgIG9uTW92ZVRvR3JpZENsaWNrPXt0aGlzLm9uTW92ZVRvR3JpZENsaWNrfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPEdyaWRcbiAgICAgICAgICAgIGdyaWQ9e21lcmdlZEdyaWR9XG4gICAgICAgICAgICBjb2x1bW5zPXtncmlkQ29sdW1uc31cbiAgICAgICAgICAgIHJvd1NlbGVjdFxuICAgICAgICAgICAgbXVsdGlTZWxlY3RcbiAgICAgICAgICAgIGZpbHRlcmluZ1xuICAgICAgICAgICAgcm93U2VsZWN0Q2hlY2tib3hDb2x1bW5cbiAgICAgICAgICAgIGdyaWRIZWFkZXI9ezxQcmltaXRpdmUuU3VidGl0bGU+e21lcmdlZFRyYW5zbGF0aW9ucy5ncmlkVGl0bGV9PC9QcmltaXRpdmUuU3VidGl0bGU+fVxuICAgICAgICAgIC8+XG5cbiAgICAgICAgPC9Db250YWluZXI+XG4gICAgICAgIHt0aGlzLnN0YXRlLnNob3dEZWxldGVDb25maXJtYXRpb24gJiZcbiAgICAgICAgPENvbmZpcm1EaWFsb2dcbiAgICAgICAgICB0cmFuc2xhdGlvbnM9e21lcmdlZFRyYW5zbGF0aW9ucy5kZWxldGVDb25maXJtRGlhbG9nfVxuICAgICAgICAgIGNvbmZpcm1DYWxsYmFjaz17dGhpcy5kZWxldGVQYXJlbnR9XG4gICAgICAgICAgY2FuY2VsQ2FsbGJhY2s9e3RoaXMuY2xvc2VEZWxldGVDb25maXJtYXRpb25EaWFsb2d9XG4gICAgICAgIC8+XG4gICAgICAgIH1cbiAgICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gICAgKTtcbiAgfVxufVxuIl19