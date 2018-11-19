'use strict';

exports.__esModule = true;
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _dec, _class, _class2, _temp;

var _templateObject = _taggedTemplateLiteralLoose(['\n  height: 100%;\n  &&& {\n    padding: 0;\n  }\n  .oc-datagrid-main-container {\n    border: 1px solid ', ';\n    border-top:none;\n  }\n'], ['\n  height: 100%;\n  &&& {\n    padding: 0;\n  }\n  .oc-datagrid-main-container {\n    border: 1px solid ', ';\n    border-top:none;\n  }\n']),
    _templateObject2 = _taggedTemplateLiteralLoose(['\n  display: flex;\n  min-height: 300px;\n  > div {\n    width: 50%;\n    flex: 1 1 100%;\n  }\n'], ['\n  display: flex;\n  min-height: 300px;\n  > div {\n    width: 50%;\n    flex: 1 1 100%;\n  }\n']),
    _templateObject3 = _taggedTemplateLiteralLoose(['\n  height:100%;\n  .oc-scrollbar-container {\n    border: 1px solid ', ';\n    height: calc(100% - ', ');\n    padding: ', ';\n  }\n  .oc-react-tree {\n    height: 100%;\n    .rc-tree-iconEle.rc-tree-icon__customize {\n        display:none;\n    }\n  }\n'], ['\n  height:100%;\n  .oc-scrollbar-container {\n    border: 1px solid ', ';\n    height: calc(100% - ', ');\n    padding: ', ';\n  }\n  .oc-react-tree {\n    height: 100%;\n    .rc-tree-iconEle.rc-tree-icon__customize {\n        display:none;\n    }\n  }\n']),
    _templateObject4 = _taggedTemplateLiteralLoose(['\n  display: flex;\n  justify-content: center;\n  font-weight: bold;\n'], ['\n  display: flex;\n  justify-content: center;\n  font-weight: bold;\n']);

var _reactTreeview = require('@opuscapita/react-treeview');

var _reactTreeview2 = _interopRequireDefault(_reactTreeview);

var _reactPerfectScrollbar = require('@opuscapita/react-perfect-scrollbar');

var _reactPerfectScrollbar2 = _interopRequireDefault(_reactPerfectScrollbar);

var _ocCmCommonLayouts = require('@opuscapita/oc-cm-common-layouts');

var _reactGrid = require('@opuscapita/react-grid');

var _reactConfirmationDialog = require('@opuscapita/react-confirmation-dialog');

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

      onChange(items);
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

        onChange(newItems);
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
      onChange(newItems);
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
      onChange(newItems);
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
      onChange(newItems);
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
      onChange(newItems);
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
      console.log(this.getAllParentIds());
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
            !!treeData.length && _react2.default.createElement(_reactTreeview2.default, {
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
      this.state.showDeleteConfirmation && _react2.default.createElement(_reactConfirmationDialog.ConfirmDialog, {
        titleText: mergedTranslations.deleteConfirmDialog.titleText,
        bodyText: mergedTranslations.deleteConfirmDialog.bodyText,
        okButtonText: mergedTranslations.deleteConfirmDialog.okButtonText,
        cancelButtonText: mergedTranslations.deleteConfirmDialog.cancelButtonText,
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
  defaultExpandAll: true
}, _temp)) || _class);
exports.default = HierarchyTreeSelector;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIkFDVElPTl9CQVJfQ09OVEFJTkVSX0hFSUdIVCIsIlRSRUVfQUNUSU9OUyIsIkFERF9DSElMRFJFTiIsIk1PVkVfTEVBRiIsIlJFTkFNRV9QQVJFTlQiLCJERUxFVEVfUEFSRU5UIiwiR3JpZCIsIkRhdGFncmlkIiwicHJvcHMiLCJ0aGVtZSIsImNvbG9ycyIsImNvbG9yTGlnaHRHcmF5IiwiQ29udGFpbmVyIiwic3R5bGVkIiwiZGl2IiwiVHJlZUNvbnRhaW5lciIsImd1dHRlcldpZHRoIiwiTm9JdGVtc1RleHQiLCJwIiwibWFwRGlzcGF0Y2hUb1Byb3BzIiwic2V0RGF0YSIsIkRhdGFncmlkQWN0aW9ucyIsImNsZWFyU2VsZWN0ZWRJdGVtcyIsIm1hcFN0YXRlVG9Qcm9wcyIsInN0YXRlIiwiZ3JpZElkIiwiZ3JpZCIsImlkIiwic2VsZWN0ZWRHcmlkSXRlbXMiLCJkYXRhZ3JpZCIsImdldEluIiwiZ3JpZERhdGEiLCJIaWVyYXJjaHlUcmVlU2VsZWN0b3IiLCJvblRyZWVJdGVtU2VsZWN0Iiwic2VsZWN0ZWRLZXlzIiwib25TZWxlY3QiLCJzZXRTdGF0ZSIsIm9uVHJlZUl0ZW1EcmFnRHJvcCIsIml0ZW1zIiwib25DaGFuZ2UiLCJvbkRlbGV0ZUNsaWNrIiwic2hvd0RlbGV0ZUNvbmZpcm1hdGlvbiIsIm9uQWRkTmV3Q2xpY2siLCJkYXRhIiwiY2FsbGJhY2siLCJ0cmVlRGF0YSIsImlkS2V5IiwibmV3SXRlbXMiLCJzbGljZSIsInB1c2giLCJhY3Rpb24iLCJ0eXBlIiwiZ2V0VXBkYXRlZFRyZWUiLCJwYXJlbnQiLCJnZXRUcmVlSXRlbSIsImV4cGFuZFBhcmVudCIsIm9uTW92ZVRvR3JpZENsaWNrIiwic2VsZWN0ZWRLZXkiLCJuZXh0U2VsZWN0ZWRLZXkiLCJnZXRBZGphY2VudEl0ZW0iLCJuZXdHcmlkSXRlbXMiLCJzZXREYXRhVG9HcmlkIiwib25Nb3ZlVG9UcmVlQ2xpY2siLCJzZWxlY3RlZElkIiwiZmlsdGVyIiwiaW5jbHVkZXMiLCJpIiwiZ2V0IiwidG9KUyIsIml0ZW0iLCJvbklucHV0Q2hhbmdlIiwidmFsdWUiLCJvbkV4cGFuZCIsImlkcyIsImV4cGFuZGVkS2V5cyIsIm9uRXhwYW5kQWxsIiwibmV3RXhwYW5kZWRJdGVtcyIsImlzQWxsRXhwYW5kZWQiLCJnZXRBbGxQYXJlbnRJZHMiLCJhcnJheSIsImZvdW5kIiwiY2hpbGRLZXkiLCJ2YWx1ZUtleSIsInJlbW92ZUFjdGlvbnMiLCJyb290SXRlbSIsImZpbmQiLCJsZW5ndGgiLCJnZXRBbGxMZWFmcyIsImRlc2VsZWN0SXRlbSIsImNoaWxkIiwiZmlsdGVyZWRDaGlsZHJlbiIsImNoaWxkSXRlbSIsImNvbmNhdCIsIlR5cGVFcnJvciIsImFscmVhZHlGb3VuZCIsImxlYWZzIiwicmV0dXJuUGFyZW50IiwiZm9yRWFjaCIsImdldEFkamFjZW50SXRlbUlkIiwicGFyZW50QXJyIiwiQXJyYXkiLCJpc0FycmF5IiwiaW5kZXgiLCJmaW5kSW5kZXgiLCJhZGphY2VudEl0ZW0iLCJjYiIsImFjYyIsInRvdGFsIiwicmVkdWNlIiwic2V0TmV3SXRlbXMiLCJncmlkQ29sdW1ucyIsInBhcmVudElkIiwiZXhwYW5kZWRJZCIsIm5ld0V4cGFuZGVkS2V5cyIsImNsb3NlRGVsZXRlQ29uZmlybWF0aW9uRGlhbG9nIiwiZGVsZXRlUGFyZW50IiwiaXNEcmFnRHJvcExlZ2FsIiwiZSIsIm9uRHJhZ0Ryb3BQcmV2ZW50IiwiZHJvcEl0ZW0iLCJub2RlIiwiZXZlbnRLZXkiLCJkcmFnSXRlbSIsImRyYWdOb2RlIiwiZHJvcEl0ZW1QYXJlbnQiLCJkcm9wVG9HYXAiLCJoYXNMZWFmcyIsImhhc1BhcmVudHMiLCJkZWZhdWx0RXhwYW5kQWxsIiwiY29tcG9uZW50RGlkTW91bnQiLCJjb25zb2xlIiwibG9nIiwicmVuZGVyIiwiY2xhc3NOYW1lIiwidHJhbnNsYXRpb25zIiwibWVyZ2VkR3JpZCIsIk9iamVjdCIsImFzc2lnbiIsImRlZmF1bHRTaG93RmlsdGVyaW5nUm93IiwibWVyZ2VkVHJhbnNsYXRpb25zIiwiZGVmYXVsdFRyYW5zbGF0aW9ucyIsIm5vVHJlZUl0ZW1zIiwiZ3JpZFRpdGxlIiwiZGVsZXRlQ29uZmlybURpYWxvZyIsInRpdGxlVGV4dCIsImJvZHlUZXh0Iiwib2tCdXR0b25UZXh0IiwiY2FuY2VsQnV0dG9uVGV4dCIsIlJlYWN0IiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyIsInVuZGVmaW5lZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFJQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUhBOzs7QUFLQSxJQUFNQSw4QkFBOEIsTUFBcEM7QUFDQSxJQUFNQyxlQUFlO0FBQ25CQyxnQkFBYyxjQURLO0FBRW5CQyxhQUFXLFdBRlE7QUFHbkJDLGlCQUFlLGVBSEk7QUFJbkJDLGlCQUFlO0FBSkksQ0FBckI7O0FBT0EsSUFBTUMsT0FBTyxnQ0FBT0MsbUJBQVAsQ0FBUCxrQkFNa0I7QUFBQSxTQUFTQyxNQUFNQyxLQUFOLENBQVlDLE1BQVosQ0FBbUJDLGNBQTVCO0FBQUEsQ0FObEIsQ0FBTjs7QUFXQSxJQUFNQyxZQUFZQywyQkFBT0MsR0FBbkIsa0JBQU47O0FBU0EsSUFBTUMsZ0JBQWdCRiwyQkFBT0MsR0FBdkIsbUJBR2tCO0FBQUEsU0FBU04sTUFBTUMsS0FBTixDQUFZQyxNQUFaLENBQW1CQyxjQUE1QjtBQUFBLENBSGxCLEVBSW9CWCwyQkFKcEIsRUFLUztBQUFBLFNBQVNRLE1BQU1DLEtBQU4sQ0FBWU8sV0FBckI7QUFBQSxDQUxULENBQU47O0FBZUEsSUFBTUMsY0FBY0osMkJBQU9LLENBQXJCLGtCQUFOOztBQU1BLElBQU1DLHFCQUFxQjtBQUN6QkMsV0FBU0MsMkJBQWdCRCxPQURBO0FBRXpCRSxz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QUF1Q0MsU0FEcEQ7QUFFRSxrQkFBVUwsbUJBQW1CSSxtQkFBbkIsQ0FBdUNFLFFBRm5EO0FBR0Usc0JBQWNOLG1CQUFtQkksbUJBQW5CLENBQXVDRyxZQUh2RDtBQUlFLDBCQUFrQlAsbUJBQW1CSSxtQkFBbkIsQ0FBdUNJLGdCQUozRDtBQUtFLHlCQUFpQixLQUFLaEMsWUFMeEI7QUFNRSx3QkFBZ0IsS0FBS0Q7QUFOdkI7QUFsREYsS0FERjtBQThERCxHOzs7RUF0aEJnRGtDLGdCQUFNQyxhLFdBdUJoREMsWSxHQUFlO0FBQ3BCeEcsU0FBTyxJQURhO0FBRXBCb0MsWUFBVSxNQUZVO0FBR3BCRCxZQUFVLFVBSFU7QUFJcEJwQyxZQUFVLEVBSlU7QUFLcEJ3RixhQUFXLEVBTFM7QUFNcEJDLGdCQUFjTSxrQ0FOTTtBQU9wQmpILE1BQUksZ0JBUGdCO0FBUXBCMkYscUJBQW1CaUMsU0FSQztBQVNwQnBILFlBQVVvSCxTQVRVO0FBVXBCdkIsb0JBQWtCO0FBVkUsQztrQkF2QkhoRyxxQiIsImZpbGUiOiJoaWVyYXJjaHktdHJlZS1zZWxlY3Rvci5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVHJlZUNvbXBvbmVudCBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC10cmVldmlldyc7XG5pbXBvcnQgUGVyZmVjdFNjcm9sbGJhciBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1wZXJmZWN0LXNjcm9sbGJhcic7XG5pbXBvcnQgeyBQcmltaXRpdmUgfSBmcm9tICdAb3B1c2NhcGl0YS9vYy1jbS1jb21tb24tbGF5b3V0cyc7XG5pbXBvcnQgeyBEYXRhZ3JpZCwgZ3JpZFNoYXBlLCBncmlkQ29sdW1uU2hhcGUsIERhdGFncmlkQWN0aW9ucyB9IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWdyaWQnO1xuaW1wb3J0IHsgQ29uZmlybURpYWxvZyB9IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWNvbmZpcm1hdGlvbi1kaWFsb2cnO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgeyBMaXN0LCBmcm9tSlMgfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IEltbXV0YWJsZVByb3BUeXBlcyBmcm9tICdyZWFjdC1pbW11dGFibGUtcHJvcHR5cGVzJztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5cbi8vIEFwcCBpbXBvcnRzXG5pbXBvcnQgQ29udHJvbEJhciBmcm9tICcuL2hpZXJhcmNoeS10cmVlLXNlbGVjdG9yLWNvbnRyb2wtYmFyLmNvbXBvbmVudCc7XG5pbXBvcnQgQXJyb3dDb250cm9scyBmcm9tICcuL2hpZXJhcmNoeS10cmVlLXNlbGVjdG9yLWFycm93LWNvbnRyb2xzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBkZWZhdWx0VHJhbnNsYXRpb25zIH0gZnJvbSAnLi9oaWVyYXJjaHktdHJlZS51dGlscyc7XG5cbmNvbnN0IEFDVElPTl9CQVJfQ09OVEFJTkVSX0hFSUdIVCA9ICc1N3B4JztcbmNvbnN0IFRSRUVfQUNUSU9OUyA9IHtcbiAgQUREX0NISUxEUkVOOiAnQUREX0NISUxEUkVOJyxcbiAgTU9WRV9MRUFGOiAnTU9WRV9MRUFGJyxcbiAgUkVOQU1FX1BBUkVOVDogJ1JFTkFNRV9QQVJFTlQnLFxuICBERUxFVEVfUEFSRU5UOiAnREVMRVRFX1BBUkVOVCcsXG59O1xuXG5jb25zdCBHcmlkID0gc3R5bGVkKERhdGFncmlkKWBcbiAgaGVpZ2h0OiAxMDAlO1xuICAmJiYge1xuICAgIHBhZGRpbmc6IDA7XG4gIH1cbiAgLm9jLWRhdGFncmlkLW1haW4tY29udGFpbmVyIHtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAke3Byb3BzID0+IHByb3BzLnRoZW1lLmNvbG9ycy5jb2xvckxpZ2h0R3JheX07XG4gICAgYm9yZGVyLXRvcDpub25lO1xuICB9XG5gO1xuXG5jb25zdCBDb250YWluZXIgPSBzdHlsZWQuZGl2YFxuICBkaXNwbGF5OiBmbGV4O1xuICBtaW4taGVpZ2h0OiAzMDBweDtcbiAgPiBkaXYge1xuICAgIHdpZHRoOiA1MCU7XG4gICAgZmxleDogMSAxIDEwMCU7XG4gIH1cbmA7XG5cbmNvbnN0IFRyZWVDb250YWluZXIgPSBzdHlsZWQuZGl2YFxuICBoZWlnaHQ6MTAwJTtcbiAgLm9jLXNjcm9sbGJhci1jb250YWluZXIge1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuY29sb3JzLmNvbG9yTGlnaHRHcmF5fTtcbiAgICBoZWlnaHQ6IGNhbGMoMTAwJSAtICR7QUNUSU9OX0JBUl9DT05UQUlORVJfSEVJR0hUfSk7XG4gICAgcGFkZGluZzogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5ndXR0ZXJXaWR0aH07XG4gIH1cbiAgLm9jLXJlYWN0LXRyZWUge1xuICAgIGhlaWdodDogMTAwJTtcbiAgICAucmMtdHJlZS1pY29uRWxlLnJjLXRyZWUtaWNvbl9fY3VzdG9taXplIHtcbiAgICAgICAgZGlzcGxheTpub25lO1xuICAgIH1cbiAgfVxuYDtcblxuY29uc3QgTm9JdGVtc1RleHQgPSBzdHlsZWQucGBcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuYDtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0ge1xuICBzZXREYXRhOiBEYXRhZ3JpZEFjdGlvbnMuc2V0RGF0YSxcbiAgY2xlYXJTZWxlY3RlZEl0ZW1zOiBEYXRhZ3JpZEFjdGlvbnMuY2xlYXJTZWxlY3RlZEl0ZW1zLFxufTtcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlLCBwcm9wcykgPT4ge1xuICBjb25zdCBncmlkSWQgPSBwcm9wcy5ncmlkLmlkO1xuICByZXR1cm4ge1xuICAgIHNlbGVjdGVkR3JpZEl0ZW1zOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbZ3JpZElkLCAnc2VsZWN0ZWRJdGVtcyddLCBMaXN0KCkpLFxuICAgIGdyaWREYXRhOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbZ3JpZElkLCAnYWxsRGF0YSddLCBMaXN0KCkpLFxuICB9O1xufTtcblxuQGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIaWVyYXJjaHlUcmVlU2VsZWN0b3IgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBpZEtleTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB2YWx1ZUtleTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjaGlsZEtleTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB0cmVlRGF0YTogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnNoYXBlKHt9KSksXG4gICAgZ3JpZDogZ3JpZFNoYXBlLmlzUmVxdWlyZWQsXG4gICAgZ3JpZENvbHVtbnM6IFByb3BUeXBlcy5hcnJheU9mKGdyaWRDb2x1bW5TaGFwZSkuaXNSZXF1aXJlZCxcbiAgICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgc2V0RGF0YTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBjbGVhclNlbGVjdGVkSXRlbXM6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgc2VsZWN0ZWRHcmlkSXRlbXM6IEltbXV0YWJsZVByb3BUeXBlcy5saXN0LmlzUmVxdWlyZWQsXG4gICAgZ3JpZERhdGE6IEltbXV0YWJsZVByb3BUeXBlcy5saXN0LmlzUmVxdWlyZWQsXG4gICAgdHJhbnNsYXRpb25zOiBQcm9wVHlwZXMuc2hhcGUoe30pLFxuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRlZmF1bHRFeHBhbmRBbGw6IFByb3BUeXBlcy5ib29sLFxuXG4gICAgLy8gQ2FsbGJhY2tzXG4gICAgb25EcmFnRHJvcFByZXZlbnQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGlkS2V5OiAnaWQnLFxuICAgIHZhbHVlS2V5OiAnbmFtZScsXG4gICAgY2hpbGRLZXk6ICdjaGlsZHJlbicsXG4gICAgdHJlZURhdGE6IFtdLFxuICAgIGNsYXNzTmFtZTogJycsXG4gICAgdHJhbnNsYXRpb25zOiBkZWZhdWx0VHJhbnNsYXRpb25zLFxuICAgIGlkOiAnaGllcmFyY2h5LXRyZWUnLFxuICAgIG9uRHJhZ0Ryb3BQcmV2ZW50OiB1bmRlZmluZWQsXG4gICAgb25TZWxlY3Q6IHVuZGVmaW5lZCxcbiAgICBkZWZhdWx0RXhwYW5kQWxsOiB0cnVlLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgbGV0IGV4cGFuZGVkS2V5cyA9IFtdO1xuICAgIGlmIChwcm9wcy5kZWZhdWx0RXhwYW5kQWxsICYmIHByb3BzLnRyZWVEYXRhKSB7XG4gICAgICBleHBhbmRlZEtleXMgPSB0aGlzLmdldEFsbFBhcmVudElkcyhwcm9wcy50cmVlRGF0YSk7XG4gICAgfVxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzZWxlY3RlZEtleXM6IFtdLFxuICAgICAgZXhwYW5kZWRLZXlzLFxuICAgICAgc2hvd0RlbGV0ZUNvbmZpcm1hdGlvbjogZmFsc2UsXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnN0IHsgZGVmYXVsdEV4cGFuZEFsbCB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoZGVmYXVsdEV4cGFuZEFsbCkge1xuICAgICAgY29uc29sZS5sb2codGhpcy5nZXRBbGxQYXJlbnRJZHMoKSk7XG4gICAgICB0aGlzLm9uRXhwYW5kKHRoaXMuZ2V0QWxsUGFyZW50SWRzKCkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3RzIGEgdHJlZSBpdGVtXG4gICAqIEBwYXJhbSBzZWxlY3RlZEtleXMgKGFycmF5KVxuICAgKi9cbiAgb25UcmVlSXRlbVNlbGVjdCA9IChzZWxlY3RlZEtleXMpID0+IHtcbiAgICBjb25zdCB7IG9uU2VsZWN0IH0gPSB0aGlzLnByb3BzO1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZEtleXMgfSwgKCkgPT4ge1xuICAgICAgaWYgKG9uU2VsZWN0KSBvblNlbGVjdChzZWxlY3RlZEtleXMpO1xuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBGaXJlZCBvbiBkcmFnIG4nIGRyb3BcbiAgICogQHBhcmFtIGl0ZW1zXG4gICAqL1xuICBvblRyZWVJdGVtRHJhZ0Ryb3AgPSAoaXRlbXMpID0+IHtcbiAgICBjb25zdCB7IG9uQ2hhbmdlIH0gPSB0aGlzLnByb3BzO1xuICAgIG9uQ2hhbmdlKGl0ZW1zKTtcbiAgfTtcblxuICAvKipcbiAgICogRGlzcGxheXMgYSBjb25maXJtYXRpb24gZGlhbG9nXG4gICAqL1xuICBvbkRlbGV0ZUNsaWNrID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzaG93RGVsZXRlQ29uZmlybWF0aW9uOiB0cnVlIH0pO1xuICB9O1xuXG5cbiAgLyoqXG4gICAqIEFkZHMgYSBuZXcgbm9kZSB0byB0aGUgcm9vdCBvZiB0aGUgdHJlZSwgb3IgdW5kZXIgYSBzZWxlY3RlZCB0cmVlIG5vZGUgdXNpbmdcbiAgICogQUREX0NISUxEUkVOIGFjdGlvblxuICAgKiBAcGFyYW0gZGF0YSAtIGRhdGEgdG8gYmUgYWRkZWRcbiAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAqL1xuICBvbkFkZE5ld0NsaWNrID0gKGRhdGEsIGNhbGxiYWNrKSA9PiB7XG4gICAgY29uc3QgeyBvbkNoYW5nZSwgdHJlZURhdGEsIGlkS2V5IH0gPSB0aGlzLnByb3BzO1xuICAgIGxldCBuZXdJdGVtcyA9IHRyZWVEYXRhLnNsaWNlKCk7XG5cbiAgICAvLyBJZiBubyB0cmVlIG5vZGUgaXMgc2VsZWN0ZWQsIHdlJ2xsIHBsYWNlIHRoZSBuZXcgaXRlbSB0byB0aGUgcm9vdFxuICAgIC8vIG9mIHRoZSB0cmVlXG4gICAgaWYgKCF0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXSkge1xuICAgICAgbmV3SXRlbXMucHVzaChkYXRhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgYWN0aW9uID0ge1xuICAgICAgICB0eXBlOiBUUkVFX0FDVElPTlMuQUREX0NISUxEUkVOLFxuICAgICAgICBkYXRhLFxuICAgICAgfTtcbiAgICAgIG5ld0l0ZW1zID0gdGhpcy5nZXRVcGRhdGVkVHJlZSh0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXSwgdHJlZURhdGEsIGFjdGlvbik7XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZEtleXM6IFtkYXRhW2lkS2V5XV0gfSwgKCkgPT4ge1xuICAgICAgLy8gSWYgdGhlIHBhcmVudCBpcyBub3QgeWV0IGV4cGFuZGVkLCB3ZSB3aWxsIGV4cGFuZCBpdCBub3dcbiAgICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuZ2V0VHJlZUl0ZW0oZGF0YVtpZEtleV0sIHRyZWVEYXRhLCB0cnVlKSB8fCB7fTtcbiAgICAgIHRoaXMuZXhwYW5kUGFyZW50KHBhcmVudFtpZEtleV0pO1xuXG4gICAgICBvbkNoYW5nZShuZXdJdGVtcyk7XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZW1vdmVzIHRoZSBjaG9zZW4gaXRlbSBmcm9tIGEgdHJlZSBhbmQgdXBkYXRlcyB0aGUgZ3JpZCB1c2luZyBNT1ZFX0xFQUZcbiAgICogYWN0aW9uXG4gICAqL1xuICBvbk1vdmVUb0dyaWRDbGljayA9ICgpID0+IHtcbiAgICBjb25zdCB7IHRyZWVEYXRhLCBvbkNoYW5nZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzZWxlY3RlZEtleSA9IHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdO1xuICAgIGNvbnN0IGFjdGlvbiA9IHtcbiAgICAgIHR5cGU6IFRSRUVfQUNUSU9OUy5NT1ZFX0xFQUYsXG4gICAgICBkYXRhOiB0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXSxcbiAgICB9O1xuICAgIGNvbnN0IG5leHRTZWxlY3RlZEtleSA9IHRoaXMuZ2V0QWRqYWNlbnRJdGVtKHNlbGVjdGVkS2V5KTtcbiAgICBjb25zdCBuZXdHcmlkSXRlbXMgPSBmcm9tSlMoW3RoaXMuZ2V0VHJlZUl0ZW0oc2VsZWN0ZWRLZXkpXSk7XG4gICAgY29uc3QgbmV3SXRlbXMgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKHNlbGVjdGVkS2V5LCB0cmVlRGF0YSwgYWN0aW9uKTtcblxuICAgIHRoaXMuc2V0RGF0YVRvR3JpZChuZXdHcmlkSXRlbXMpO1xuICAgIG9uQ2hhbmdlKG5ld0l0ZW1zKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNlbGVjdGVkS2V5czogW25leHRTZWxlY3RlZEtleV0sXG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEFkZHMgc2VsZWN0ZWQgZ3JpZCBpdGVtcyB0byB0aGUgY2hvc2VuIHRyZWUgbm9kZSB1c2luZyBBRERfQ0hJTERSRU4gYWN0aW9uXG4gICAqL1xuICBvbk1vdmVUb1RyZWVDbGljayA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBvbkNoYW5nZSwgc2VsZWN0ZWRHcmlkSXRlbXMsIGdyaWREYXRhLCB0cmVlRGF0YSwgaWRLZXksXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgc2VsZWN0ZWRJZCA9IHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdO1xuXG4gICAgY29uc3QgYWN0aW9uID0ge1xuICAgICAgdHlwZTogVFJFRV9BQ1RJT05TLkFERF9DSElMRFJFTixcbiAgICAgIGRhdGE6IGdyaWREYXRhXG4gICAgICAgIC5maWx0ZXIoaSA9PiBzZWxlY3RlZEdyaWRJdGVtcy5pbmNsdWRlcyhpLmdldChpZEtleSkpKVxuICAgICAgICAudG9KUygpLFxuICAgIH07XG4gICAgY29uc3QgbmV3SXRlbXMgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKHNlbGVjdGVkSWQsIHRyZWVEYXRhLCBhY3Rpb24pO1xuICAgIGNvbnN0IG5ld0dyaWRJdGVtcyA9IGdyaWREYXRhLmZpbHRlcihpdGVtID0+ICFzZWxlY3RlZEdyaWRJdGVtcy5pbmNsdWRlcyhpdGVtLmdldChpZEtleSkpKTtcblxuICAgIHRoaXMuZXhwYW5kUGFyZW50KHNlbGVjdGVkSWQsIHRydWUpO1xuICAgIHRoaXMuc2V0RGF0YVRvR3JpZChuZXdHcmlkSXRlbXMsIHRydWUpO1xuICAgIG9uQ2hhbmdlKG5ld0l0ZW1zKTtcbiAgfTtcblxuICAvKipcbiAgICogUmVuYW1lcyB0aGUgY2hvc2VuIHRyZWUgbm9kZSB1c2luZyBhIFJFTkFNRV9QQVJFTlQgYWN0aW9uXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKi9cbiAgb25JbnB1dENoYW5nZSA9ICh2YWx1ZSkgPT4ge1xuICAgIGNvbnN0IHsgdHJlZURhdGEsIG9uQ2hhbmdlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGFjdGlvbiA9IHtcbiAgICAgIHR5cGU6IFRSRUVfQUNUSU9OUy5SRU5BTUVfUEFSRU5ULFxuICAgICAgZGF0YTogdmFsdWUsXG4gICAgfTtcbiAgICBjb25zdCBuZXdJdGVtcyA9IHRoaXMuZ2V0VXBkYXRlZFRyZWUodGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF0sIHRyZWVEYXRhLCBhY3Rpb24pO1xuICAgIG9uQ2hhbmdlKG5ld0l0ZW1zKTtcbiAgfTtcblxuICAvKipcbiAgICogRmlyZWQgb24gZXhwYW5kXG4gICAqIEBwYXJhbSBpZHNcbiAgICovXG4gIG9uRXhwYW5kID0gKGlkcykgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZXhwYW5kZWRLZXlzOiBpZHMsXG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEV4cGFuZCBhbGwgdGhlIGl0ZW1zXG4gICAqL1xuICBvbkV4cGFuZEFsbCA9ICgpID0+IHtcbiAgICBjb25zdCBuZXdFeHBhbmRlZEl0ZW1zID0gdGhpcy5pc0FsbEV4cGFuZGVkKCkgPyBbXSA6IHRoaXMuZ2V0QWxsUGFyZW50SWRzKCk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGV4cGFuZGVkS2V5czogbmV3RXhwYW5kZWRJdGVtcyB9KTtcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyB1cGRhdGVkIHRyZWUgaXRlbXMuXG4gICAqIEBwYXJhbSBpZCAtIHRhcmdldCBpdGVtXG4gICAqIEBwYXJhbSBhcnJheSAtIGFycmF5IHdoZXJlIHRhcmdldCBpdGVtIGlzIGJlaW5nIHNlYXJjaGVkXG4gICAqIEBwYXJhbSBhY3Rpb24gLSBhY3Rpb24gdG8gYmUgcGVyZm9ybWVkIHt0eXBlLCBkYXRhfVxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIGdldFVwZGF0ZWRUcmVlID0gKGlkLCBhcnJheSA9IHRoaXMucHJvcHMudHJlZURhdGEsIGFjdGlvbikgPT4ge1xuICAgIGxldCBmb3VuZCA9IGZhbHNlO1xuICAgIGNvbnN0IHsgaWRLZXksIGNoaWxkS2V5LCB2YWx1ZUtleSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBuZXdJdGVtcyA9IGFycmF5LnNsaWNlKCk7XG4gICAgY29uc3QgcmVtb3ZlQWN0aW9ucyA9IFtUUkVFX0FDVElPTlMuTU9WRV9MRUFGLCBUUkVFX0FDVElPTlMuREVMRVRFX1BBUkVOVF07XG5cbiAgICAvLyBJZiBkZWxldGVkIHBhcmVudCBpdGVtIGlzIGluIHRoZSByb290IG5vZGVcbiAgICBpZiAoYWN0aW9uLnR5cGUgPT09IFRSRUVfQUNUSU9OUy5ERUxFVEVfUEFSRU5UKSB7XG4gICAgICBjb25zdCByb290SXRlbSA9IGFycmF5LmZpbmQoaXRlbSA9PiBpdGVtW2lkS2V5XSA9PT0gaWQpO1xuICAgICAgaWYgKHJvb3RJdGVtKSB7XG4gICAgICAgIGlmIChyb290SXRlbVtjaGlsZEtleV0ubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5zZXREYXRhVG9HcmlkKGZyb21KUyh0aGlzLmdldEFsbExlYWZzKHJvb3RJdGVtW2NoaWxkS2V5XSkpKTtcbiAgICAgICAgICB0aGlzLmRlc2VsZWN0SXRlbSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXdJdGVtcy5maWx0ZXIoaXRlbSA9PiBpdGVtW2lkS2V5XSAhPT0gaWQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmV3SXRlbXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSBuZXdJdGVtc1tpXTtcbiAgICAgIGlmIChyZW1vdmVBY3Rpb25zLmluY2x1ZGVzKGFjdGlvbi50eXBlKSAmJiBpdGVtW2NoaWxkS2V5XSAmJiAhZm91bmQpIHtcbiAgICAgICAgZm91bmQgPSAhIWl0ZW1bY2hpbGRLZXldLmZpbmQoY2hpbGQgPT4gY2hpbGRbaWRLZXldID09PSBpZCk7XG4gICAgICAgIGlmIChmb3VuZCkge1xuICAgICAgICAgIC8vIFdoZW4gcmVtb3ZpbmcgYW4gaXRlbSB3ZSBtdXN0IGZpcnN0IGZpbmQgaXRzIHBhcmVudCBhbmQgYWx0ZXIgaXRzIGNoaWxkcmVuIGFycmF5XG4gICAgICAgICAgaWYgKGFjdGlvbi50eXBlID09PSBUUkVFX0FDVElPTlMuTU9WRV9MRUFGKSB7XG4gICAgICAgICAgICBpdGVtW2NoaWxkS2V5XSA9IGl0ZW1bY2hpbGRLZXldLmZpbHRlcihjaGlsZCA9PiBjaGlsZFtpZEtleV0gIT09IGlkKTtcbiAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RJdGVtKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChhY3Rpb24udHlwZSA9PT0gVFJFRV9BQ1RJT05TLkRFTEVURV9QQVJFTlQpIHtcbiAgICAgICAgICAgIC8vIHdlIG11c3QgZmlyc3QgZmlsdGVyIHRoZSBjaGlsZHJlbiwgc28gdGhhdCB3ZSB3b24ndCBnZXQgbGVhZnMgZnJvbVxuICAgICAgICAgICAgLy8gb3RoZXIgY2hpbGQgYnJhbmNoZXNcbiAgICAgICAgICAgIGNvbnN0IGZpbHRlcmVkQ2hpbGRyZW4gPSBpdGVtW2NoaWxkS2V5XS5maWx0ZXIoY2hpbGRJdGVtID0+IGNoaWxkSXRlbVtpZEtleV0gPT09IGlkKTtcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YVRvR3JpZChmcm9tSlModGhpcy5nZXRBbGxMZWFmcyhmaWx0ZXJlZENoaWxkcmVuKSkpO1xuICAgICAgICAgICAgdGhpcy5kZXNlbGVjdEl0ZW0oKTtcbiAgICAgICAgICAgIGl0ZW1bY2hpbGRLZXldID0gaXRlbVtjaGlsZEtleV0uZmlsdGVyKGNoaWxkSXRlbSA9PiBjaGlsZEl0ZW1baWRLZXldICE9PSBpZCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtW2lkS2V5XSA9PT0gaWQgJiYgIWZvdW5kKSB7XG4gICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICAgIGNhc2UgVFJFRV9BQ1RJT05TLkFERF9DSElMRFJFTjpcbiAgICAgICAgICAgIGl0ZW1bY2hpbGRLZXldID0gKGl0ZW1bY2hpbGRLZXldIHx8IFtdKS5jb25jYXQoYWN0aW9uLmRhdGEpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBUUkVFX0FDVElPTlMuUkVOQU1FX1BBUkVOVDpcbiAgICAgICAgICAgIGl0ZW1bdmFsdWVLZXldID0gYWN0aW9uLmRhdGE7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQWN0aW9uIHR5cGUgaXMgdW5kZWZpbmVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVtjaGlsZEtleV0gJiYgIWZvdW5kKSBmb3VuZCA9IHRoaXMuZ2V0VXBkYXRlZFRyZWUoaWQsIGl0ZW1bY2hpbGRLZXldLCBhY3Rpb24pO1xuICAgIH1cblxuICAgIGlmICghZm91bmQpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gbmV3SXRlbXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybnMgcmVjdXJzaXZlbHkgYWxsIGxlYWYgaXRlbXMgZnJvbSBhIGdpdmVuIGFycmF5XG4gICAqIEBwYXJhbSBhcnJheVxuICAgKiBAcGFyYW0gYWxyZWFkeUZvdW5kICh1c2VkIHJlY3Vyc2l2ZWx5KVxuICAgKi9cbiAgZ2V0QWxsTGVhZnMgPSAoYXJyYXksIGFscmVhZHlGb3VuZCA9IFtdKSA9PiB7XG4gICAgY29uc3QgeyBjaGlsZEtleSB9ID0gdGhpcy5wcm9wcztcbiAgICBsZXQgbGVhZnMgPSBhbHJlYWR5Rm91bmQ7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBpdGVtID0gYXJyYXlbaV07XG4gICAgICBpZiAoaXRlbVtjaGlsZEtleV0pIHtcbiAgICAgICAgbGVhZnMgPSB0aGlzLmdldEFsbExlYWZzKGl0ZW1bY2hpbGRLZXldLCBhbHJlYWR5Rm91bmQpO1xuICAgICAgfVxuICAgICAgaWYgKCFpdGVtW2NoaWxkS2V5XSkgbGVhZnMucHVzaChpdGVtKTtcbiAgICB9XG4gICAgcmV0dXJuIGxlYWZzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgdHJlZSBpdGVtIGJ5IElEXG4gICAqIEBwYXJhbSBpZFxuICAgKiBAcGFyYW0gYXJyYXlcbiAgICogQHBhcmFtIHJldHVyblBhcmVudCAtIHJldHVybiBpdGVtJ3MgcGFyZW50IGluc3RlYWQgb2YgdGhlIGl0ZW1cbiAgICogQHBhcmFtIHBhcmVudCAtIHBhcmVudCBpdGVtICh1c2VkIHJlY3Vyc2l2ZWx5KVxuICAgKiBAcmV0dXJucyB7e319XG4gICAqL1xuICBnZXRUcmVlSXRlbSA9IChpZCwgYXJyYXkgPSB0aGlzLnByb3BzLnRyZWVEYXRhLCByZXR1cm5QYXJlbnQgPSBmYWxzZSwgcGFyZW50ID0gbnVsbCkgPT4ge1xuICAgIGNvbnN0IHsgY2hpbGRLZXksIGlkS2V5IH0gPSB0aGlzLnByb3BzO1xuICAgIGxldCBmb3VuZCA9IGFycmF5LmZpbmQoaXRlbSA9PiBpdGVtW2lkS2V5XSA9PT0gaWQpO1xuXG4gICAgaWYgKGZvdW5kICYmIHJldHVyblBhcmVudCkgZm91bmQgPSBwYXJlbnQ7XG5cbiAgICBpZiAoIWZvdW5kKSB7XG4gICAgICBhcnJheS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGlmIChpdGVtW2NoaWxkS2V5XSAmJiAhZm91bmQpIHtcbiAgICAgICAgICBmb3VuZCA9IHRoaXMuZ2V0VHJlZUl0ZW0oaWQsIGl0ZW1bY2hpbGRLZXldLCByZXR1cm5QYXJlbnQsIGl0ZW0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGZvdW5kO1xuICB9O1xuXG4gIC8qKlxuICAgKiBHZXQgYWRqYWNlbnQgaXRlbSAoaWQpIGluIHBhcmVudCBhcnJheS4gVXNlZCB3aGVuIG1vdmluZyBpdGVtcyBmcm9tIHRyZWVcbiAgICogdG8gZ3JpZC9kZWxldGluZyBhbiBpdGVtXG4gICAqIEBwYXJhbSBpZFxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIGdldEFkamFjZW50SXRlbSA9IChpZCkgPT4ge1xuICAgIGlmICghaWQpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IHsgY2hpbGRLZXksIGlkS2V5LCB0cmVlRGF0YSB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IGdldEFkamFjZW50SXRlbUlkID0gKHBhcmVudCkgPT4ge1xuICAgICAgY29uc3QgcGFyZW50QXJyID0gQXJyYXkuaXNBcnJheShwYXJlbnQpID8gcGFyZW50IDogcGFyZW50W2NoaWxkS2V5XTtcbiAgICAgIGNvbnN0IGluZGV4ID0gcGFyZW50QXJyLmZpbmRJbmRleChjaGlsZCA9PiBjaGlsZFtpZEtleV0gPT09IGlkKTtcbiAgICAgIGxldCBhZGphY2VudEl0ZW0gPSBwYXJlbnRBcnJbaW5kZXggKyAxXTtcbiAgICAgIGlmICghYWRqYWNlbnRJdGVtKSBhZGphY2VudEl0ZW0gPSBwYXJlbnRBcnJbaW5kZXggLSAxXTtcbiAgICAgIGlmICghYWRqYWNlbnRJdGVtICYmICFBcnJheS5pc0FycmF5KHBhcmVudCkpIGFkamFjZW50SXRlbSA9IHBhcmVudDtcbiAgICAgIGlmICghYWRqYWNlbnRJdGVtKSByZXR1cm4gbnVsbDtcblxuICAgICAgcmV0dXJuIGFkamFjZW50SXRlbVtpZEtleV07XG4gICAgfTtcblxuICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuZ2V0VHJlZUl0ZW0oaWQsIHRoaXMucHJvcHMudHJlZURhdGEsIHRydWUpO1xuICAgIHJldHVybiBwYXJlbnQgPyBnZXRBZGphY2VudEl0ZW1JZChwYXJlbnQpIDogZ2V0QWRqYWNlbnRJdGVtSWQodHJlZURhdGEpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFsbCBJRHMgaW4gdGhlIHRyZWVcbiAgICogQHBhcmFtIGFycmF5XG4gICAqL1xuICBnZXRBbGxQYXJlbnRJZHMgPSAoYXJyYXkgPSB0aGlzLnByb3BzLnRyZWVEYXRhKSA9PiB7XG4gICAgY29uc3QgeyBpZEtleSwgY2hpbGRLZXkgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgY2IgPSAoYWNjLCBpdGVtKSA9PiB7XG4gICAgICBsZXQgdG90YWwgPSBhY2M7XG4gICAgICBpZiAoaXRlbVtjaGlsZEtleV0gJiYgaXRlbVtjaGlsZEtleV0ubGVuZ3RoID4gMCkge1xuICAgICAgICB0b3RhbCA9IGFjYy5jb25jYXQoaXRlbVtpZEtleV0pO1xuICAgICAgICByZXR1cm4gaXRlbVtjaGlsZEtleV0ucmVkdWNlKGNiLCB0b3RhbCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdG90YWw7XG4gICAgfTtcbiAgICByZXR1cm4gYXJyYXkucmVkdWNlKGNiLCBbXSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEFwcGVuZHMgcHJvdmlkZWQgaXRlbXMgdG8gdGhlIGdyaWRcbiAgICogQHBhcmFtIGl0ZW1zIC0gaW1tdXRhYmxlIGFycmF5IG9mIGl0ZW1zIHRvIGJlIGFwcGVuZGVkIHRvIGdyaWRcbiAgICogQHBhcmFtIHNldE5ld0l0ZW1zIC0gc2V0IGNvbXBsZXRlbHkgYSBuZXcgYXJyYXkgb2YgaXRlbXNcbiAgICovXG4gIHNldERhdGFUb0dyaWQgPSAoaXRlbXMsIHNldE5ld0l0ZW1zID0gZmFsc2UpID0+IHtcbiAgICBsZXQgZGF0YSA9IExpc3QoKTtcbiAgICBjb25zdCB7IGdyaWQsIGdyaWRDb2x1bW5zLCBncmlkRGF0YSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIXNldE5ld0l0ZW1zKSBkYXRhID0gZ3JpZERhdGEuc2xpY2UoKTtcbiAgICBjb25zdCBuZXdHcmlkSXRlbXMgPSBkYXRhLmNvbmNhdChpdGVtcyk7XG5cbiAgICB0aGlzLnByb3BzLnNldERhdGEoZ3JpZCwgZ3JpZENvbHVtbnMsIG5ld0dyaWRJdGVtcyk7XG4gICAgdGhpcy5wcm9wcy5jbGVhclNlbGVjdGVkSXRlbXMoZ3JpZCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEV4cGFuZHMgYSBwYXJlbnRcbiAgICogQHBhcmFtIHBhcmVudElkXG4gICAqL1xuICBleHBhbmRQYXJlbnQgPSAocGFyZW50SWQpID0+IHtcbiAgICBpZiAocGFyZW50SWQgJiYgIXRoaXMuc3RhdGUuZXhwYW5kZWRLZXlzLmZpbmQoZXhwYW5kZWRJZCA9PiBleHBhbmRlZElkID09PSBwYXJlbnRJZCkpIHtcbiAgICAgIGNvbnN0IG5ld0V4cGFuZGVkS2V5cyA9IHRoaXMuc3RhdGUuZXhwYW5kZWRLZXlzLnNsaWNlKCk7XG4gICAgICBuZXdFeHBhbmRlZEtleXMucHVzaChwYXJlbnRJZCk7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgZXhwYW5kZWRLZXlzOiBuZXdFeHBhbmRlZEtleXMgfSk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBDbG9zZXMgZGVsZXRlIGNvbmZpcm1hdGlvbiBkaWFsb2dcbiAgICovXG4gIGNsb3NlRGVsZXRlQ29uZmlybWF0aW9uRGlhbG9nID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzaG93RGVsZXRlQ29uZmlybWF0aW9uOiBmYWxzZSB9KTtcbiAgfTtcblxuICAvKipcbiAgICogRGVsZXRlcyBhIHBhcmVudCBub2RlXG4gICAqL1xuICBkZWxldGVQYXJlbnQgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBvbkNoYW5nZSwgdHJlZURhdGEgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgc2VsZWN0ZWRLZXkgPSB0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXTtcbiAgICBjb25zdCBhY3Rpb24gPSB7XG4gICAgICB0eXBlOiBUUkVFX0FDVElPTlMuREVMRVRFX1BBUkVOVCxcbiAgICB9O1xuICAgIGNvbnN0IG5leHRTZWxlY3RlZEtleSA9IHRoaXMuZ2V0QWRqYWNlbnRJdGVtKHNlbGVjdGVkS2V5KTtcbiAgICBjb25zdCBuZXdJdGVtcyA9IHRoaXMuZ2V0VXBkYXRlZFRyZWUoc2VsZWN0ZWRLZXksIHRyZWVEYXRhLCBhY3Rpb24pO1xuICAgIG9uQ2hhbmdlKG5ld0l0ZW1zKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNlbGVjdGVkS2V5czogW25leHRTZWxlY3RlZEtleV0sXG4gICAgICBzaG93RGVsZXRlQ29uZmlybWF0aW9uOiBmYWxzZSxcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGEgbW92ZSBpcyBwZXJtaXR0ZWQgYmVmb3JlIGNhbGxpbmcgVHJlZSBjb21wb25lbnQncyBvbkRyYWdEcm9wIGNhbGxiYWNrXG4gICAqIEBwYXJhbSBpdGVtc1xuICAgKiBAcGFyYW0gZVxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIGlzRHJhZ0Ryb3BMZWdhbCA9IChpdGVtcywgZSkgPT4ge1xuICAgIGNvbnN0IHsgY2hpbGRLZXksIHRyZWVEYXRhLCBvbkRyYWdEcm9wUHJldmVudCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBkcm9wSXRlbSA9IHRoaXMuZ2V0VHJlZUl0ZW0oZS5ub2RlLnByb3BzLmV2ZW50S2V5KTtcbiAgICBjb25zdCBkcmFnSXRlbSA9IHRoaXMuZ2V0VHJlZUl0ZW0oZS5kcmFnTm9kZS5wcm9wcy5ldmVudEtleSk7XG4gICAgY29uc3QgZHJvcEl0ZW1QYXJlbnQgPSB0aGlzLmdldFRyZWVJdGVtKGUubm9kZS5wcm9wcy5ldmVudEtleSwgdHJlZURhdGEsIHRydWUpO1xuXG4gICAgLyoqXG4gICAgICogV2Ugd2FudCB0byBwcmV2ZW50IHRoZSBtb3ZlLCBpZjpcbiAgICAgKiAtIFNlbGVjdGVkIGl0ZW0gaXMgYSBwYXJlbnQsIGFuZCAuLlxuICAgICAqICAgIC0gRHJvcHBpbmcgb3ZlciBhbiBpdGVtLCBhbmQgLi5cbiAgICAgKiAgICAgIC0gTmV3IHBhcmVudCBoYXMgbGVhZnMgT1IgbmV3IHBhcmVudCBpcyBhIGxlYWZcbiAgICAgKiAgICAtIERyb3BwaW5nIGJldHdlZW4gaXRlbXMsIGFuZCAuLlxuICAgICAqICAgICAgICAtIE5ldyBwYXJlbnQncyBwYXJlbnQgaGFzIGxlYWZzXG4gICAgICogIC0gU2VsZWN0ZWQgaXRlbSBpcyBhIGxlYWYsIGFuZCAuLi5cbiAgICAgKi9cbiAgICBpZiAoZHJhZ0l0ZW1bY2hpbGRLZXldKSB7XG4gICAgICBpZiAoXG4gICAgICAgICghZS5kcm9wVG9HYXAgJiYgKHRoaXMuaGFzTGVhZnMoZHJvcEl0ZW0pIHx8ICFkcm9wSXRlbVtjaGlsZEtleV0pKSB8fFxuICAgICAgICAoZHJvcEl0ZW1QYXJlbnQgJiYgZS5kcm9wVG9HYXAgJiYgKHRoaXMuaGFzTGVhZnMoZHJvcEl0ZW1QYXJlbnQpKSlcbiAgICAgICkge1xuICAgICAgICBpZiAob25EcmFnRHJvcFByZXZlbnQpIG9uRHJhZ0Ryb3BQcmV2ZW50KCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKFxuICAgICAgKGRyb3BJdGVtICYmICFlLmRyb3BUb0dhcCAmJiB0aGlzLmhhc1BhcmVudHMoZHJvcEl0ZW0pKSB8fFxuICAgICAgKGRyb3BJdGVtUGFyZW50ICYmIGUuZHJvcFRvR2FwICYmIHRoaXMuaGFzUGFyZW50cyhkcm9wSXRlbVBhcmVudCkpIHx8XG4gICAgICAoZS5kcm9wVG9HYXAgJiYgIWRyb3BJdGVtUGFyZW50KSB8fFxuICAgICAgKCFlLmRyb3BUb0dhcCAmJiAhZHJvcEl0ZW1bY2hpbGRLZXldKVxuICAgICkge1xuICAgICAgLy8gSXRlbSBoYXMgZ290IHBhcmVudCBhcyBhIGNoaWxkIC0gbGVhZiBjYW5ub3QgYmUgZHJvcHBlZCBoZXJlXG4gICAgICBpZiAob25EcmFnRHJvcFByZXZlbnQpIG9uRHJhZ0Ryb3BQcmV2ZW50KCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG5cbiAgaXNBbGxFeHBhbmRlZCA9ICgpID0+XG4gICAgdGhpcy5zdGF0ZS5leHBhbmRlZEtleXMubGVuZ3RoID09PSB0aGlzLmdldEFsbFBhcmVudElkcygpLmxlbmd0aDtcblxuICBoYXNMZWFmcyA9IChpdGVtKSA9PiB7XG4gICAgY29uc3QgeyBjaGlsZEtleSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIWl0ZW1bY2hpbGRLZXldKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuICEhaXRlbVtjaGlsZEtleV0uZmluZChjaGlsZCA9PiAhY2hpbGRbY2hpbGRLZXldKTtcbiAgfTtcblxuICBoYXNQYXJlbnRzID0gKGl0ZW0pID0+IHtcbiAgICBjb25zdCB7IGNoaWxkS2V5IH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghaXRlbVtjaGlsZEtleV0pIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gISFpdGVtW2NoaWxkS2V5XS5maW5kKGNoaWxkID0+IGNoaWxkW2NoaWxkS2V5XSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIERlc2VsZWN0cyBhbiBpdGVtLCBpZiBpdCBpcyBlLmcuIHJlbW92ZWRcbiAgICovXG4gIGRlc2VsZWN0SXRlbSA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRLZXlzOiBbXSB9KTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgdmFsdWVLZXksIGlkS2V5LCB0cmVlRGF0YSwgZ3JpZCwgZ3JpZENvbHVtbnMsIGNsYXNzTmFtZSwgdHJhbnNsYXRpb25zLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgbWVyZ2VkR3JpZCA9IE9iamVjdC5hc3NpZ24oe30sIGdyaWQsIHsgZGVmYXVsdFNob3dGaWx0ZXJpbmdSb3c6IHRydWUgfSk7XG4gICAgY29uc3QgbWVyZ2VkVHJhbnNsYXRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdFRyYW5zbGF0aW9ucywgdHJhbnNsYXRpb25zKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8UmVhY3QuRnJhZ21lbnQ+XG4gICAgICAgIDxDb250YWluZXIgY2xhc3NOYW1lPXtjbGFzc05hbWV9PlxuICAgICAgICAgIDxUcmVlQ29udGFpbmVyPlxuICAgICAgICAgICAgPENvbnRyb2xCYXJcbiAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgIG9uQWRkTmV3Q2xpY2s9e3RoaXMub25BZGROZXdDbGlja31cbiAgICAgICAgICAgICAgb25EZWxldGVDbGljaz17dGhpcy5vbkRlbGV0ZUNsaWNrfVxuICAgICAgICAgICAgICBvbklucHV0Q2hhbmdlPXt0aGlzLm9uSW5wdXRDaGFuZ2V9XG4gICAgICAgICAgICAgIG9uRXhwYW5kQWxsQ2xpY2s9e3RoaXMub25FeHBhbmRBbGx9XG4gICAgICAgICAgICAgIGV4cGFuZEFsbD17dGhpcy5pc0FsbEV4cGFuZGVkKCl9XG4gICAgICAgICAgICAgIHNlbGVjdGVkVHJlZUl0ZW09e3RoaXMuZ2V0VHJlZUl0ZW0odGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF0pfVxuICAgICAgICAgICAgICBoZWlnaHQ9e0FDVElPTl9CQVJfQ09OVEFJTkVSX0hFSUdIVH1cbiAgICAgICAgICAgICAgdHJhbnNsYXRpb25zPXttZXJnZWRUcmFuc2xhdGlvbnN9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPFBlcmZlY3RTY3JvbGxiYXI+XG4gICAgICAgICAgICAgIHshIXRyZWVEYXRhLmxlbmd0aCAmJiA8VHJlZUNvbXBvbmVudFxuICAgICAgICAgICAgICAgIHRyZWVEYXRhPXt0cmVlRGF0YX1cbiAgICAgICAgICAgICAgICBkYXRhTG9va1VwS2V5PXtpZEtleX1cbiAgICAgICAgICAgICAgICBkYXRhTG9va1VwVmFsdWU9e3ZhbHVlS2V5fVxuICAgICAgICAgICAgICAgIG9uU2VsZWN0PXt0aGlzLm9uVHJlZUl0ZW1TZWxlY3R9XG4gICAgICAgICAgICAgICAgb25EcmFnRHJvcD17dGhpcy5vblRyZWVJdGVtRHJhZ0Ryb3B9XG4gICAgICAgICAgICAgICAgb25FeHBhbmQ9e3RoaXMub25FeHBhbmR9XG4gICAgICAgICAgICAgICAgY2hlY2thYmxlPXtmYWxzZX1cbiAgICAgICAgICAgICAgICBzZWxlY3RlZEtleXM9e3RoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzfVxuICAgICAgICAgICAgICAgIGV4cGFuZGVkS2V5cz17dGhpcy5zdGF0ZS5leHBhbmRlZEtleXN9XG4gICAgICAgICAgICAgICAgaXNEcmFnRHJvcExlZ2FsPXt0aGlzLmlzRHJhZ0Ryb3BMZWdhbH1cbiAgICAgICAgICAgICAgICBzZWxlY3RhYmxlXG4gICAgICAgICAgICAgICAgZHJhZ2dhYmxlXG4gICAgICAgICAgICAgIC8+fVxuICAgICAgICAgICAgICB7IXRyZWVEYXRhLmxlbmd0aCAmJiA8Tm9JdGVtc1RleHQ+e21lcmdlZFRyYW5zbGF0aW9ucy5ub1RyZWVJdGVtc308L05vSXRlbXNUZXh0Pn1cbiAgICAgICAgICAgIDwvUGVyZmVjdFNjcm9sbGJhcj5cbiAgICAgICAgICA8L1RyZWVDb250YWluZXI+XG4gICAgICAgICAgPEFycm93Q29udHJvbHNcbiAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgc2VsZWN0ZWRUcmVlSXRlbT17dGhpcy5nZXRUcmVlSXRlbSh0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXSl9XG4gICAgICAgICAgICBvbk1vdmVUb1RyZWVDbGljaz17dGhpcy5vbk1vdmVUb1RyZWVDbGlja31cbiAgICAgICAgICAgIG9uTW92ZVRvR3JpZENsaWNrPXt0aGlzLm9uTW92ZVRvR3JpZENsaWNrfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPEdyaWRcbiAgICAgICAgICAgIGdyaWQ9e21lcmdlZEdyaWR9XG4gICAgICAgICAgICBjb2x1bW5zPXtncmlkQ29sdW1uc31cbiAgICAgICAgICAgIHJvd1NlbGVjdFxuICAgICAgICAgICAgbXVsdGlTZWxlY3RcbiAgICAgICAgICAgIGZpbHRlcmluZ1xuICAgICAgICAgICAgcm93U2VsZWN0Q2hlY2tib3hDb2x1bW5cbiAgICAgICAgICAgIGdyaWRIZWFkZXI9ezxQcmltaXRpdmUuU3VidGl0bGU+e21lcmdlZFRyYW5zbGF0aW9ucy5ncmlkVGl0bGV9PC9QcmltaXRpdmUuU3VidGl0bGU+fVxuICAgICAgICAgIC8+XG5cbiAgICAgICAgPC9Db250YWluZXI+XG4gICAgICAgIHt0aGlzLnN0YXRlLnNob3dEZWxldGVDb25maXJtYXRpb24gJiZcbiAgICAgICAgPENvbmZpcm1EaWFsb2dcbiAgICAgICAgICB0aXRsZVRleHQ9e21lcmdlZFRyYW5zbGF0aW9ucy5kZWxldGVDb25maXJtRGlhbG9nLnRpdGxlVGV4dH1cbiAgICAgICAgICBib2R5VGV4dD17bWVyZ2VkVHJhbnNsYXRpb25zLmRlbGV0ZUNvbmZpcm1EaWFsb2cuYm9keVRleHR9XG4gICAgICAgICAgb2tCdXR0b25UZXh0PXttZXJnZWRUcmFuc2xhdGlvbnMuZGVsZXRlQ29uZmlybURpYWxvZy5va0J1dHRvblRleHR9XG4gICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dD17bWVyZ2VkVHJhbnNsYXRpb25zLmRlbGV0ZUNvbmZpcm1EaWFsb2cuY2FuY2VsQnV0dG9uVGV4dH1cbiAgICAgICAgICBjb25maXJtQ2FsbGJhY2s9e3RoaXMuZGVsZXRlUGFyZW50fVxuICAgICAgICAgIGNhbmNlbENhbGxiYWNrPXt0aGlzLmNsb3NlRGVsZXRlQ29uZmlybWF0aW9uRGlhbG9nfVxuICAgICAgICAvPlxuICAgICAgICB9XG4gICAgICA8L1JlYWN0LkZyYWdtZW50PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==