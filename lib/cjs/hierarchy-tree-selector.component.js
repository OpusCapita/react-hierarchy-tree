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
  onChange: undefined,
  defaultExpandAll: true
}, _temp)) || _class);
exports.default = HierarchyTreeSelector;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIkFDVElPTl9CQVJfQ09OVEFJTkVSX0hFSUdIVCIsIlRSRUVfQUNUSU9OUyIsIkFERF9DSElMRFJFTiIsIk1PVkVfTEVBRiIsIlJFTkFNRV9QQVJFTlQiLCJERUxFVEVfUEFSRU5UIiwiR3JpZCIsIkRhdGFncmlkIiwicHJvcHMiLCJ0aGVtZSIsImNvbG9ycyIsImNvbG9yTGlnaHRHcmF5IiwiQ29udGFpbmVyIiwic3R5bGVkIiwiZGl2IiwiVHJlZUNvbnRhaW5lciIsImd1dHRlcldpZHRoIiwiTm9JdGVtc1RleHQiLCJwIiwibWFwRGlzcGF0Y2hUb1Byb3BzIiwic2V0RGF0YSIsIkRhdGFncmlkQWN0aW9ucyIsImNsZWFyU2VsZWN0ZWRJdGVtcyIsIm1hcFN0YXRlVG9Qcm9wcyIsInN0YXRlIiwiZ3JpZElkIiwiZ3JpZCIsImlkIiwic2VsZWN0ZWRHcmlkSXRlbXMiLCJkYXRhZ3JpZCIsImdldEluIiwiZ3JpZERhdGEiLCJIaWVyYXJjaHlUcmVlU2VsZWN0b3IiLCJvblRyZWVJdGVtU2VsZWN0Iiwic2VsZWN0ZWRLZXlzIiwib25TZWxlY3QiLCJzZXRTdGF0ZSIsIm9uVHJlZUl0ZW1EcmFnRHJvcCIsIml0ZW1zIiwib25DaGFuZ2UiLCJvbkRlbGV0ZUNsaWNrIiwic2hvd0RlbGV0ZUNvbmZpcm1hdGlvbiIsIm9uQWRkTmV3Q2xpY2siLCJkYXRhIiwiY2FsbGJhY2siLCJ0cmVlRGF0YSIsImlkS2V5IiwibmV3SXRlbXMiLCJzbGljZSIsInB1c2giLCJhY3Rpb24iLCJ0eXBlIiwiZ2V0VXBkYXRlZFRyZWUiLCJwYXJlbnQiLCJnZXRUcmVlSXRlbSIsImV4cGFuZFBhcmVudCIsIm9uTW92ZVRvR3JpZENsaWNrIiwic2VsZWN0ZWRLZXkiLCJuZXh0U2VsZWN0ZWRLZXkiLCJnZXRBZGphY2VudEl0ZW0iLCJuZXdHcmlkSXRlbXMiLCJzZXREYXRhVG9HcmlkIiwib25Nb3ZlVG9UcmVlQ2xpY2siLCJzZWxlY3RlZElkIiwiZmlsdGVyIiwiaW5jbHVkZXMiLCJpIiwiZ2V0IiwidG9KUyIsIml0ZW0iLCJvbklucHV0Q2hhbmdlIiwidmFsdWUiLCJvbkV4cGFuZCIsImlkcyIsImV4cGFuZGVkS2V5cyIsIm9uRXhwYW5kQWxsIiwibmV3RXhwYW5kZWRJdGVtcyIsImlzQWxsRXhwYW5kZWQiLCJnZXRBbGxQYXJlbnRJZHMiLCJhcnJheSIsImZvdW5kIiwiY2hpbGRLZXkiLCJ2YWx1ZUtleSIsInJlbW92ZUFjdGlvbnMiLCJyb290SXRlbSIsImZpbmQiLCJsZW5ndGgiLCJnZXRBbGxMZWFmcyIsImRlc2VsZWN0SXRlbSIsImNoaWxkIiwiZmlsdGVyZWRDaGlsZHJlbiIsImNoaWxkSXRlbSIsImNvbmNhdCIsIlR5cGVFcnJvciIsImFscmVhZHlGb3VuZCIsImxlYWZzIiwicmV0dXJuUGFyZW50IiwiZm9yRWFjaCIsImdldEFkamFjZW50SXRlbUlkIiwicGFyZW50QXJyIiwiQXJyYXkiLCJpc0FycmF5IiwiaW5kZXgiLCJmaW5kSW5kZXgiLCJhZGphY2VudEl0ZW0iLCJjYiIsImFjYyIsInRvdGFsIiwicmVkdWNlIiwic2V0TmV3SXRlbXMiLCJncmlkQ29sdW1ucyIsInBhcmVudElkIiwiZXhwYW5kZWRJZCIsIm5ld0V4cGFuZGVkS2V5cyIsImNsb3NlRGVsZXRlQ29uZmlybWF0aW9uRGlhbG9nIiwiZGVsZXRlUGFyZW50IiwiaXNEcmFnRHJvcExlZ2FsIiwiZSIsIm9uRHJhZ0Ryb3BQcmV2ZW50IiwiZHJvcEl0ZW0iLCJub2RlIiwiZXZlbnRLZXkiLCJkcmFnSXRlbSIsImRyYWdOb2RlIiwiZHJvcEl0ZW1QYXJlbnQiLCJkcm9wVG9HYXAiLCJoYXNMZWFmcyIsImhhc1BhcmVudHMiLCJkZWZhdWx0RXhwYW5kQWxsIiwiY29tcG9uZW50RGlkTW91bnQiLCJyZW5kZXIiLCJjbGFzc05hbWUiLCJ0cmFuc2xhdGlvbnMiLCJtZXJnZWRHcmlkIiwiT2JqZWN0IiwiYXNzaWduIiwiZGVmYXVsdFNob3dGaWx0ZXJpbmdSb3ciLCJtZXJnZWRUcmFuc2xhdGlvbnMiLCJkZWZhdWx0VHJhbnNsYXRpb25zIiwibm9UcmVlSXRlbXMiLCJncmlkVGl0bGUiLCJkZWxldGVDb25maXJtRGlhbG9nIiwidGl0bGVUZXh0IiwiYm9keVRleHQiLCJva0J1dHRvblRleHQiLCJjYW5jZWxCdXR0b25UZXh0IiwiUmVhY3QiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIiwidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUlBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBSEE7OztBQUtBLElBQU1BLDhCQUE4QixNQUFwQztBQUNBLElBQU1DLGVBQWU7QUFDbkJDLGdCQUFjLGNBREs7QUFFbkJDLGFBQVcsV0FGUTtBQUduQkMsaUJBQWUsZUFISTtBQUluQkMsaUJBQWU7QUFKSSxDQUFyQjs7QUFPQSxJQUFNQyxPQUFPLGdDQUFPQyxtQkFBUCxDQUFQLGtCQU1rQjtBQUFBLFNBQVNDLE1BQU1DLEtBQU4sQ0FBWUMsTUFBWixDQUFtQkMsY0FBNUI7QUFBQSxDQU5sQixDQUFOOztBQVdBLElBQU1DLFlBQVlDLDJCQUFPQyxHQUFuQixrQkFBTjs7QUFTQSxJQUFNQyxnQkFBZ0JGLDJCQUFPQyxHQUF2QixtQkFHa0I7QUFBQSxTQUFTTixNQUFNQyxLQUFOLENBQVlDLE1BQVosQ0FBbUJDLGNBQTVCO0FBQUEsQ0FIbEIsRUFJb0JYLDJCQUpwQixFQUtTO0FBQUEsU0FBU1EsTUFBTUMsS0FBTixDQUFZTyxXQUFyQjtBQUFBLENBTFQsQ0FBTjs7QUFlQSxJQUFNQyxjQUFjSiwyQkFBT0ssQ0FBckIsa0JBQU47O0FBTUEsSUFBTUMscUJBQXFCO0FBQ3pCQyxXQUFTQywyQkFBZ0JELE9BREE7QUFFekJFLHNCQUFvQkQsMkJBQWdCQztB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OEJBQUMsc0NBQUQ7QUFDRSxtQkFBV2dHLG1CQUFtQkksbUJBQW5CLENBQXVDQyxTQURwRDtBQUVFLGtCQUFVTCxtQkFBbUJJLG1CQUFuQixDQUF1Q0UsUUFGbkQ7QUFHRSxzQkFBY04sbUJBQW1CSSxtQkFBbkIsQ0FBdUNHLFlBSHZEO0FBSUUsMEJBQWtCUCxtQkFBbUJJLG1CQUFuQixDQUF1Q0ksZ0JBSjNEO0FBS0UseUJBQWlCLEtBQUs5QixZQUx4QjtBQU1FLHdCQUFnQixLQUFLRDtBQU52QjtBQWxERixLQURGO0FBOERELEc7OztFQXRoQmdEZ0MsZ0JBQU1DLGEsV0F1QmhEQyxZLEdBQWU7QUFDcEJ0RyxTQUFPLElBRGE7QUFFcEJvQyxZQUFVLE1BRlU7QUFHcEJELFlBQVUsVUFIVTtBQUlwQnBDLFlBQVUsRUFKVTtBQUtwQnNGLGFBQVcsRUFMUztBQU1wQkMsZ0JBQWNNLGtDQU5NO0FBT3BCL0csTUFBSSxnQkFQZ0I7QUFRcEIyRixxQkFBbUIrQixTQVJDO0FBU3BCbEgsWUFBVWtILFNBVFU7QUFVcEI5RyxZQUFVOEcsU0FWVTtBQVdwQnJCLG9CQUFrQjtBQVhFLEM7a0JBdkJIaEcscUIiLCJmaWxlIjoiaGllcmFyY2h5LXRyZWUtc2VsZWN0b3IuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRyZWVDb21wb25lbnQgZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtdHJlZS1jb21wb25lbnQnO1xuaW1wb3J0IFBlcmZlY3RTY3JvbGxiYXIgZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtcGVyZmVjdC1zY3JvbGxiYXInO1xuaW1wb3J0IHsgUHJpbWl0aXZlIH0gZnJvbSAnQG9wdXNjYXBpdGEvb2MtY20tY29tbW9uLWxheW91dHMnO1xuaW1wb3J0IHsgRGF0YWdyaWQsIGdyaWRTaGFwZSwgZ3JpZENvbHVtblNoYXBlLCBEYXRhZ3JpZEFjdGlvbnMgfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1ncmlkJztcbmltcG9ydCB7IENvbmZpcm1EaWFsb2cgfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1jb25maXJtYXRpb24tZGlhbG9nJztcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHsgTGlzdCwgZnJvbUpTIH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCBJbW11dGFibGVQcm9wVHlwZXMgZnJvbSAncmVhY3QtaW1tdXRhYmxlLXByb3B0eXBlcyc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuXG4vLyBBcHAgaW1wb3J0c1xuaW1wb3J0IENvbnRyb2xCYXIgZnJvbSAnLi9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci1jb250cm9sLWJhci5jb21wb25lbnQnO1xuaW1wb3J0IEFycm93Q29udHJvbHMgZnJvbSAnLi9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci1hcnJvdy1jb250cm9scy5jb21wb25lbnQnO1xuaW1wb3J0IHsgZGVmYXVsdFRyYW5zbGF0aW9ucyB9IGZyb20gJy4vaGllcmFyY2h5LXRyZWUudXRpbHMnO1xuXG5jb25zdCBBQ1RJT05fQkFSX0NPTlRBSU5FUl9IRUlHSFQgPSAnNTdweCc7XG5jb25zdCBUUkVFX0FDVElPTlMgPSB7XG4gIEFERF9DSElMRFJFTjogJ0FERF9DSElMRFJFTicsXG4gIE1PVkVfTEVBRjogJ01PVkVfTEVBRicsXG4gIFJFTkFNRV9QQVJFTlQ6ICdSRU5BTUVfUEFSRU5UJyxcbiAgREVMRVRFX1BBUkVOVDogJ0RFTEVURV9QQVJFTlQnLFxufTtcblxuY29uc3QgR3JpZCA9IHN0eWxlZChEYXRhZ3JpZClgXG4gIGhlaWdodDogMTAwJTtcbiAgJiYmIHtcbiAgICBwYWRkaW5nOiAwO1xuICB9XG4gIC5vYy1kYXRhZ3JpZC1tYWluLWNvbnRhaW5lciB7XG4gICAgYm9yZGVyOiAxcHggc29saWQgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5jb2xvcnMuY29sb3JMaWdodEdyYXl9O1xuICAgIGJvcmRlci10b3A6bm9uZTtcbiAgfVxuYDtcblxuY29uc3QgQ29udGFpbmVyID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogZmxleDtcbiAgbWluLWhlaWdodDogMzAwcHg7XG4gID4gZGl2IHtcbiAgICB3aWR0aDogNTAlO1xuICAgIGZsZXg6IDEgMSAxMDAlO1xuICB9XG5gO1xuXG5jb25zdCBUcmVlQ29udGFpbmVyID0gc3R5bGVkLmRpdmBcbiAgaGVpZ2h0OjEwMCU7XG4gIC5vYy1zY3JvbGxiYXItY29udGFpbmVyIHtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAke3Byb3BzID0+IHByb3BzLnRoZW1lLmNvbG9ycy5jb2xvckxpZ2h0R3JheX07XG4gICAgaGVpZ2h0OiBjYWxjKDEwMCUgLSAke0FDVElPTl9CQVJfQ09OVEFJTkVSX0hFSUdIVH0pO1xuICAgIHBhZGRpbmc6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuZ3V0dGVyV2lkdGh9O1xuICB9XG4gIC5vYy1yZWFjdC10cmVlIHtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgLnJjLXRyZWUtaWNvbkVsZS5yYy10cmVlLWljb25fX2N1c3RvbWl6ZSB7XG4gICAgICAgIGRpc3BsYXk6bm9uZTtcbiAgICB9XG4gIH1cbmA7XG5cbmNvbnN0IE5vSXRlbXNUZXh0ID0gc3R5bGVkLnBgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBmb250LXdlaWdodDogYm9sZDtcbmA7XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IHtcbiAgc2V0RGF0YTogRGF0YWdyaWRBY3Rpb25zLnNldERhdGEsXG4gIGNsZWFyU2VsZWN0ZWRJdGVtczogRGF0YWdyaWRBY3Rpb25zLmNsZWFyU2VsZWN0ZWRJdGVtcyxcbn07XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSwgcHJvcHMpID0+IHtcbiAgY29uc3QgZ3JpZElkID0gcHJvcHMuZ3JpZC5pZDtcbiAgcmV0dXJuIHtcbiAgICBzZWxlY3RlZEdyaWRJdGVtczogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW2dyaWRJZCwgJ3NlbGVjdGVkSXRlbXMnXSwgTGlzdCgpKSxcbiAgICBncmlkRGF0YTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW2dyaWRJZCwgJ2FsbERhdGEnXSwgTGlzdCgpKSxcbiAgfTtcbn07XG5cbkBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGllcmFyY2h5VHJlZVNlbGVjdG9yIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgaWRLZXk6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdmFsdWVLZXk6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2hpbGRLZXk6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdHJlZURhdGE6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zaGFwZSh7fSkpLFxuICAgIGdyaWQ6IGdyaWRTaGFwZS5pc1JlcXVpcmVkLFxuICAgIGdyaWRDb2x1bW5zOiBQcm9wVHlwZXMuYXJyYXlPZihncmlkQ29sdW1uU2hhcGUpLmlzUmVxdWlyZWQsXG4gICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHNldERhdGE6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgY2xlYXJTZWxlY3RlZEl0ZW1zOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHNlbGVjdGVkR3JpZEl0ZW1zOiBJbW11dGFibGVQcm9wVHlwZXMubGlzdC5pc1JlcXVpcmVkLFxuICAgIGdyaWREYXRhOiBJbW11dGFibGVQcm9wVHlwZXMubGlzdC5pc1JlcXVpcmVkLFxuICAgIHRyYW5zbGF0aW9uczogUHJvcFR5cGVzLnNoYXBlKHt9KSxcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkZWZhdWx0RXhwYW5kQWxsOiBQcm9wVHlwZXMuYm9vbCxcblxuICAgIC8vIENhbGxiYWNrc1xuICAgIG9uRHJhZ0Ryb3BQcmV2ZW50OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgaWRLZXk6ICdpZCcsXG4gICAgdmFsdWVLZXk6ICduYW1lJyxcbiAgICBjaGlsZEtleTogJ2NoaWxkcmVuJyxcbiAgICB0cmVlRGF0YTogW10sXG4gICAgY2xhc3NOYW1lOiAnJyxcbiAgICB0cmFuc2xhdGlvbnM6IGRlZmF1bHRUcmFuc2xhdGlvbnMsXG4gICAgaWQ6ICdoaWVyYXJjaHktdHJlZScsXG4gICAgb25EcmFnRHJvcFByZXZlbnQ6IHVuZGVmaW5lZCxcbiAgICBvblNlbGVjdDogdW5kZWZpbmVkLFxuICAgIG9uQ2hhbmdlOiB1bmRlZmluZWQsXG4gICAgZGVmYXVsdEV4cGFuZEFsbDogdHJ1ZSxcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIGxldCBleHBhbmRlZEtleXMgPSBbXTtcbiAgICBpZiAocHJvcHMuZGVmYXVsdEV4cGFuZEFsbCAmJiBwcm9wcy50cmVlRGF0YSkge1xuICAgICAgZXhwYW5kZWRLZXlzID0gdGhpcy5nZXRBbGxQYXJlbnRJZHMocHJvcHMudHJlZURhdGEpO1xuICAgIH1cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgc2VsZWN0ZWRLZXlzOiBbXSxcbiAgICAgIGV4cGFuZGVkS2V5cyxcbiAgICAgIHNob3dEZWxldGVDb25maXJtYXRpb246IGZhbHNlLFxuICAgIH07XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBjb25zdCB7IGRlZmF1bHRFeHBhbmRBbGwgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKGRlZmF1bHRFeHBhbmRBbGwpIHtcbiAgICAgIHRoaXMub25FeHBhbmQodGhpcy5nZXRBbGxQYXJlbnRJZHMoKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdHMgYSB0cmVlIGl0ZW1cbiAgICogQHBhcmFtIHNlbGVjdGVkS2V5cyAoYXJyYXkpXG4gICAqL1xuICBvblRyZWVJdGVtU2VsZWN0ID0gKHNlbGVjdGVkS2V5cykgPT4ge1xuICAgIGNvbnN0IHsgb25TZWxlY3QgfSA9IHRoaXMucHJvcHM7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkS2V5cyB9LCAoKSA9PiB7XG4gICAgICBpZiAob25TZWxlY3QpIG9uU2VsZWN0KHNlbGVjdGVkS2V5cyk7XG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEZpcmVkIG9uIGRyYWcgbicgZHJvcFxuICAgKiBAcGFyYW0gaXRlbXNcbiAgICovXG4gIG9uVHJlZUl0ZW1EcmFnRHJvcCA9IChpdGVtcykgPT4ge1xuICAgIGNvbnN0IHsgb25DaGFuZ2UgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKG9uQ2hhbmdlKSBvbkNoYW5nZShpdGVtcyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIERpc3BsYXlzIGEgY29uZmlybWF0aW9uIGRpYWxvZ1xuICAgKi9cbiAgb25EZWxldGVDbGljayA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2hvd0RlbGV0ZUNvbmZpcm1hdGlvbjogdHJ1ZSB9KTtcbiAgfTtcblxuXG4gIC8qKlxuICAgKiBBZGRzIGEgbmV3IG5vZGUgdG8gdGhlIHJvb3Qgb2YgdGhlIHRyZWUsIG9yIHVuZGVyIGEgc2VsZWN0ZWQgdHJlZSBub2RlIHVzaW5nXG4gICAqIEFERF9DSElMRFJFTiBhY3Rpb25cbiAgICogQHBhcmFtIGRhdGEgLSBkYXRhIHRvIGJlIGFkZGVkXG4gICAqIEBwYXJhbSBjYWxsYmFja1xuICAgKi9cbiAgb25BZGROZXdDbGljayA9IChkYXRhLCBjYWxsYmFjaykgPT4ge1xuICAgIGNvbnN0IHsgb25DaGFuZ2UsIHRyZWVEYXRhLCBpZEtleSB9ID0gdGhpcy5wcm9wcztcbiAgICBsZXQgbmV3SXRlbXMgPSB0cmVlRGF0YS5zbGljZSgpO1xuXG4gICAgLy8gSWYgbm8gdHJlZSBub2RlIGlzIHNlbGVjdGVkLCB3ZSdsbCBwbGFjZSB0aGUgbmV3IGl0ZW0gdG8gdGhlIHJvb3RcbiAgICAvLyBvZiB0aGUgdHJlZVxuICAgIGlmICghdGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF0pIHtcbiAgICAgIG5ld0l0ZW1zLnB1c2goZGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGFjdGlvbiA9IHtcbiAgICAgICAgdHlwZTogVFJFRV9BQ1RJT05TLkFERF9DSElMRFJFTixcbiAgICAgICAgZGF0YSxcbiAgICAgIH07XG4gICAgICBuZXdJdGVtcyA9IHRoaXMuZ2V0VXBkYXRlZFRyZWUodGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF0sIHRyZWVEYXRhLCBhY3Rpb24pO1xuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRLZXlzOiBbZGF0YVtpZEtleV1dIH0sICgpID0+IHtcbiAgICAgIC8vIElmIHRoZSBwYXJlbnQgaXMgbm90IHlldCBleHBhbmRlZCwgd2Ugd2lsbCBleHBhbmQgaXQgbm93XG4gICAgICBjb25zdCBwYXJlbnQgPSB0aGlzLmdldFRyZWVJdGVtKGRhdGFbaWRLZXldLCB0cmVlRGF0YSwgdHJ1ZSkgfHwge307XG4gICAgICB0aGlzLmV4cGFuZFBhcmVudChwYXJlbnRbaWRLZXldKTtcblxuICAgICAgaWYgKG9uQ2hhbmdlKSBvbkNoYW5nZShuZXdJdGVtcyk7XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZW1vdmVzIHRoZSBjaG9zZW4gaXRlbSBmcm9tIGEgdHJlZSBhbmQgdXBkYXRlcyB0aGUgZ3JpZCB1c2luZyBNT1ZFX0xFQUZcbiAgICogYWN0aW9uXG4gICAqL1xuICBvbk1vdmVUb0dyaWRDbGljayA9ICgpID0+IHtcbiAgICBjb25zdCB7IHRyZWVEYXRhLCBvbkNoYW5nZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzZWxlY3RlZEtleSA9IHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdO1xuICAgIGNvbnN0IGFjdGlvbiA9IHtcbiAgICAgIHR5cGU6IFRSRUVfQUNUSU9OUy5NT1ZFX0xFQUYsXG4gICAgICBkYXRhOiB0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXSxcbiAgICB9O1xuICAgIGNvbnN0IG5leHRTZWxlY3RlZEtleSA9IHRoaXMuZ2V0QWRqYWNlbnRJdGVtKHNlbGVjdGVkS2V5KTtcbiAgICBjb25zdCBuZXdHcmlkSXRlbXMgPSBmcm9tSlMoW3RoaXMuZ2V0VHJlZUl0ZW0oc2VsZWN0ZWRLZXkpXSk7XG4gICAgY29uc3QgbmV3SXRlbXMgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKHNlbGVjdGVkS2V5LCB0cmVlRGF0YSwgYWN0aW9uKTtcblxuICAgIHRoaXMuc2V0RGF0YVRvR3JpZChuZXdHcmlkSXRlbXMpO1xuICAgIGlmIChvbkNoYW5nZSkgb25DaGFuZ2UobmV3SXRlbXMpO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2VsZWN0ZWRLZXlzOiBbbmV4dFNlbGVjdGVkS2V5XSxcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogQWRkcyBzZWxlY3RlZCBncmlkIGl0ZW1zIHRvIHRoZSBjaG9zZW4gdHJlZSBub2RlIHVzaW5nIEFERF9DSElMRFJFTiBhY3Rpb25cbiAgICovXG4gIG9uTW92ZVRvVHJlZUNsaWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIG9uQ2hhbmdlLCBzZWxlY3RlZEdyaWRJdGVtcywgZ3JpZERhdGEsIHRyZWVEYXRhLCBpZEtleSxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzZWxlY3RlZElkID0gdGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF07XG5cbiAgICBjb25zdCBhY3Rpb24gPSB7XG4gICAgICB0eXBlOiBUUkVFX0FDVElPTlMuQUREX0NISUxEUkVOLFxuICAgICAgZGF0YTogZ3JpZERhdGFcbiAgICAgICAgLmZpbHRlcihpID0+IHNlbGVjdGVkR3JpZEl0ZW1zLmluY2x1ZGVzKGkuZ2V0KGlkS2V5KSkpXG4gICAgICAgIC50b0pTKCksXG4gICAgfTtcbiAgICBjb25zdCBuZXdJdGVtcyA9IHRoaXMuZ2V0VXBkYXRlZFRyZWUoc2VsZWN0ZWRJZCwgdHJlZURhdGEsIGFjdGlvbik7XG4gICAgY29uc3QgbmV3R3JpZEl0ZW1zID0gZ3JpZERhdGEuZmlsdGVyKGl0ZW0gPT4gIXNlbGVjdGVkR3JpZEl0ZW1zLmluY2x1ZGVzKGl0ZW0uZ2V0KGlkS2V5KSkpO1xuXG4gICAgdGhpcy5leHBhbmRQYXJlbnQoc2VsZWN0ZWRJZCwgdHJ1ZSk7XG4gICAgdGhpcy5zZXREYXRhVG9HcmlkKG5ld0dyaWRJdGVtcywgdHJ1ZSk7XG4gICAgaWYgKG9uQ2hhbmdlKSBvbkNoYW5nZShuZXdJdGVtcyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlbmFtZXMgdGhlIGNob3NlbiB0cmVlIG5vZGUgdXNpbmcgYSBSRU5BTUVfUEFSRU5UIGFjdGlvblxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICovXG4gIG9uSW5wdXRDaGFuZ2UgPSAodmFsdWUpID0+IHtcbiAgICBjb25zdCB7IHRyZWVEYXRhLCBvbkNoYW5nZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBhY3Rpb24gPSB7XG4gICAgICB0eXBlOiBUUkVFX0FDVElPTlMuUkVOQU1FX1BBUkVOVCxcbiAgICAgIGRhdGE6IHZhbHVlLFxuICAgIH07XG4gICAgY29uc3QgbmV3SXRlbXMgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdLCB0cmVlRGF0YSwgYWN0aW9uKTtcbiAgICBpZiAob25DaGFuZ2UpIG9uQ2hhbmdlKG5ld0l0ZW1zKTtcbiAgfTtcblxuICAvKipcbiAgICogRmlyZWQgb24gZXhwYW5kXG4gICAqIEBwYXJhbSBpZHNcbiAgICovXG4gIG9uRXhwYW5kID0gKGlkcykgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZXhwYW5kZWRLZXlzOiBpZHMsXG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEV4cGFuZCBhbGwgdGhlIGl0ZW1zXG4gICAqL1xuICBvbkV4cGFuZEFsbCA9ICgpID0+IHtcbiAgICBjb25zdCBuZXdFeHBhbmRlZEl0ZW1zID0gdGhpcy5pc0FsbEV4cGFuZGVkKCkgPyBbXSA6IHRoaXMuZ2V0QWxsUGFyZW50SWRzKCk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGV4cGFuZGVkS2V5czogbmV3RXhwYW5kZWRJdGVtcyB9KTtcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyB1cGRhdGVkIHRyZWUgaXRlbXMuXG4gICAqIEBwYXJhbSBpZCAtIHRhcmdldCBpdGVtXG4gICAqIEBwYXJhbSBhcnJheSAtIGFycmF5IHdoZXJlIHRhcmdldCBpdGVtIGlzIGJlaW5nIHNlYXJjaGVkXG4gICAqIEBwYXJhbSBhY3Rpb24gLSBhY3Rpb24gdG8gYmUgcGVyZm9ybWVkIHt0eXBlLCBkYXRhfVxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIGdldFVwZGF0ZWRUcmVlID0gKGlkLCBhcnJheSA9IHRoaXMucHJvcHMudHJlZURhdGEsIGFjdGlvbikgPT4ge1xuICAgIGxldCBmb3VuZCA9IGZhbHNlO1xuICAgIGNvbnN0IHsgaWRLZXksIGNoaWxkS2V5LCB2YWx1ZUtleSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBuZXdJdGVtcyA9IGFycmF5LnNsaWNlKCk7XG4gICAgY29uc3QgcmVtb3ZlQWN0aW9ucyA9IFtUUkVFX0FDVElPTlMuTU9WRV9MRUFGLCBUUkVFX0FDVElPTlMuREVMRVRFX1BBUkVOVF07XG5cbiAgICAvLyBJZiBkZWxldGVkIHBhcmVudCBpdGVtIGlzIGluIHRoZSByb290IG5vZGVcbiAgICBpZiAoYWN0aW9uLnR5cGUgPT09IFRSRUVfQUNUSU9OUy5ERUxFVEVfUEFSRU5UKSB7XG4gICAgICBjb25zdCByb290SXRlbSA9IGFycmF5LmZpbmQoaXRlbSA9PiBpdGVtW2lkS2V5XSA9PT0gaWQpO1xuICAgICAgaWYgKHJvb3RJdGVtKSB7XG4gICAgICAgIGlmIChyb290SXRlbVtjaGlsZEtleV0ubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5zZXREYXRhVG9HcmlkKGZyb21KUyh0aGlzLmdldEFsbExlYWZzKHJvb3RJdGVtW2NoaWxkS2V5XSkpKTtcbiAgICAgICAgICB0aGlzLmRlc2VsZWN0SXRlbSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXdJdGVtcy5maWx0ZXIoaXRlbSA9PiBpdGVtW2lkS2V5XSAhPT0gaWQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmV3SXRlbXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSBuZXdJdGVtc1tpXTtcbiAgICAgIGlmIChyZW1vdmVBY3Rpb25zLmluY2x1ZGVzKGFjdGlvbi50eXBlKSAmJiBpdGVtW2NoaWxkS2V5XSAmJiAhZm91bmQpIHtcbiAgICAgICAgZm91bmQgPSAhIWl0ZW1bY2hpbGRLZXldLmZpbmQoY2hpbGQgPT4gY2hpbGRbaWRLZXldID09PSBpZCk7XG4gICAgICAgIGlmIChmb3VuZCkge1xuICAgICAgICAgIC8vIFdoZW4gcmVtb3ZpbmcgYW4gaXRlbSB3ZSBtdXN0IGZpcnN0IGZpbmQgaXRzIHBhcmVudCBhbmQgYWx0ZXIgaXRzIGNoaWxkcmVuIGFycmF5XG4gICAgICAgICAgaWYgKGFjdGlvbi50eXBlID09PSBUUkVFX0FDVElPTlMuTU9WRV9MRUFGKSB7XG4gICAgICAgICAgICBpdGVtW2NoaWxkS2V5XSA9IGl0ZW1bY2hpbGRLZXldLmZpbHRlcihjaGlsZCA9PiBjaGlsZFtpZEtleV0gIT09IGlkKTtcbiAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RJdGVtKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChhY3Rpb24udHlwZSA9PT0gVFJFRV9BQ1RJT05TLkRFTEVURV9QQVJFTlQpIHtcbiAgICAgICAgICAgIC8vIHdlIG11c3QgZmlyc3QgZmlsdGVyIHRoZSBjaGlsZHJlbiwgc28gdGhhdCB3ZSB3b24ndCBnZXQgbGVhZnMgZnJvbVxuICAgICAgICAgICAgLy8gb3RoZXIgY2hpbGQgYnJhbmNoZXNcbiAgICAgICAgICAgIGNvbnN0IGZpbHRlcmVkQ2hpbGRyZW4gPSBpdGVtW2NoaWxkS2V5XS5maWx0ZXIoY2hpbGRJdGVtID0+IGNoaWxkSXRlbVtpZEtleV0gPT09IGlkKTtcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YVRvR3JpZChmcm9tSlModGhpcy5nZXRBbGxMZWFmcyhmaWx0ZXJlZENoaWxkcmVuKSkpO1xuICAgICAgICAgICAgdGhpcy5kZXNlbGVjdEl0ZW0oKTtcbiAgICAgICAgICAgIGl0ZW1bY2hpbGRLZXldID0gaXRlbVtjaGlsZEtleV0uZmlsdGVyKGNoaWxkSXRlbSA9PiBjaGlsZEl0ZW1baWRLZXldICE9PSBpZCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtW2lkS2V5XSA9PT0gaWQgJiYgIWZvdW5kKSB7XG4gICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICAgIGNhc2UgVFJFRV9BQ1RJT05TLkFERF9DSElMRFJFTjpcbiAgICAgICAgICAgIGl0ZW1bY2hpbGRLZXldID0gKGl0ZW1bY2hpbGRLZXldIHx8IFtdKS5jb25jYXQoYWN0aW9uLmRhdGEpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBUUkVFX0FDVElPTlMuUkVOQU1FX1BBUkVOVDpcbiAgICAgICAgICAgIGl0ZW1bdmFsdWVLZXldID0gYWN0aW9uLmRhdGE7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQWN0aW9uIHR5cGUgaXMgdW5kZWZpbmVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVtjaGlsZEtleV0gJiYgIWZvdW5kKSBmb3VuZCA9IHRoaXMuZ2V0VXBkYXRlZFRyZWUoaWQsIGl0ZW1bY2hpbGRLZXldLCBhY3Rpb24pO1xuICAgIH1cblxuICAgIGlmICghZm91bmQpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gbmV3SXRlbXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybnMgcmVjdXJzaXZlbHkgYWxsIGxlYWYgaXRlbXMgZnJvbSBhIGdpdmVuIGFycmF5XG4gICAqIEBwYXJhbSBhcnJheVxuICAgKiBAcGFyYW0gYWxyZWFkeUZvdW5kICh1c2VkIHJlY3Vyc2l2ZWx5KVxuICAgKi9cbiAgZ2V0QWxsTGVhZnMgPSAoYXJyYXksIGFscmVhZHlGb3VuZCA9IFtdKSA9PiB7XG4gICAgY29uc3QgeyBjaGlsZEtleSB9ID0gdGhpcy5wcm9wcztcbiAgICBsZXQgbGVhZnMgPSBhbHJlYWR5Rm91bmQ7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBpdGVtID0gYXJyYXlbaV07XG4gICAgICBpZiAoaXRlbVtjaGlsZEtleV0pIHtcbiAgICAgICAgbGVhZnMgPSB0aGlzLmdldEFsbExlYWZzKGl0ZW1bY2hpbGRLZXldLCBhbHJlYWR5Rm91bmQpO1xuICAgICAgfVxuICAgICAgaWYgKCFpdGVtW2NoaWxkS2V5XSkgbGVhZnMucHVzaChpdGVtKTtcbiAgICB9XG4gICAgcmV0dXJuIGxlYWZzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgdHJlZSBpdGVtIGJ5IElEXG4gICAqIEBwYXJhbSBpZFxuICAgKiBAcGFyYW0gYXJyYXlcbiAgICogQHBhcmFtIHJldHVyblBhcmVudCAtIHJldHVybiBpdGVtJ3MgcGFyZW50IGluc3RlYWQgb2YgdGhlIGl0ZW1cbiAgICogQHBhcmFtIHBhcmVudCAtIHBhcmVudCBpdGVtICh1c2VkIHJlY3Vyc2l2ZWx5KVxuICAgKiBAcmV0dXJucyB7e319XG4gICAqL1xuICBnZXRUcmVlSXRlbSA9IChpZCwgYXJyYXkgPSB0aGlzLnByb3BzLnRyZWVEYXRhLCByZXR1cm5QYXJlbnQgPSBmYWxzZSwgcGFyZW50ID0gbnVsbCkgPT4ge1xuICAgIGNvbnN0IHsgY2hpbGRLZXksIGlkS2V5IH0gPSB0aGlzLnByb3BzO1xuICAgIGxldCBmb3VuZCA9IGFycmF5LmZpbmQoaXRlbSA9PiBpdGVtW2lkS2V5XSA9PT0gaWQpO1xuXG4gICAgaWYgKGZvdW5kICYmIHJldHVyblBhcmVudCkgZm91bmQgPSBwYXJlbnQ7XG5cbiAgICBpZiAoIWZvdW5kKSB7XG4gICAgICBhcnJheS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGlmIChpdGVtW2NoaWxkS2V5XSAmJiAhZm91bmQpIHtcbiAgICAgICAgICBmb3VuZCA9IHRoaXMuZ2V0VHJlZUl0ZW0oaWQsIGl0ZW1bY2hpbGRLZXldLCByZXR1cm5QYXJlbnQsIGl0ZW0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGZvdW5kO1xuICB9O1xuXG4gIC8qKlxuICAgKiBHZXQgYWRqYWNlbnQgaXRlbSAoaWQpIGluIHBhcmVudCBhcnJheS4gVXNlZCB3aGVuIG1vdmluZyBpdGVtcyBmcm9tIHRyZWVcbiAgICogdG8gZ3JpZC9kZWxldGluZyBhbiBpdGVtXG4gICAqIEBwYXJhbSBpZFxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIGdldEFkamFjZW50SXRlbSA9IChpZCkgPT4ge1xuICAgIGlmICghaWQpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IHsgY2hpbGRLZXksIGlkS2V5LCB0cmVlRGF0YSB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IGdldEFkamFjZW50SXRlbUlkID0gKHBhcmVudCkgPT4ge1xuICAgICAgY29uc3QgcGFyZW50QXJyID0gQXJyYXkuaXNBcnJheShwYXJlbnQpID8gcGFyZW50IDogcGFyZW50W2NoaWxkS2V5XTtcbiAgICAgIGNvbnN0IGluZGV4ID0gcGFyZW50QXJyLmZpbmRJbmRleChjaGlsZCA9PiBjaGlsZFtpZEtleV0gPT09IGlkKTtcbiAgICAgIGxldCBhZGphY2VudEl0ZW0gPSBwYXJlbnRBcnJbaW5kZXggKyAxXTtcbiAgICAgIGlmICghYWRqYWNlbnRJdGVtKSBhZGphY2VudEl0ZW0gPSBwYXJlbnRBcnJbaW5kZXggLSAxXTtcbiAgICAgIGlmICghYWRqYWNlbnRJdGVtICYmICFBcnJheS5pc0FycmF5KHBhcmVudCkpIGFkamFjZW50SXRlbSA9IHBhcmVudDtcbiAgICAgIGlmICghYWRqYWNlbnRJdGVtKSByZXR1cm4gbnVsbDtcblxuICAgICAgcmV0dXJuIGFkamFjZW50SXRlbVtpZEtleV07XG4gICAgfTtcblxuICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuZ2V0VHJlZUl0ZW0oaWQsIHRoaXMucHJvcHMudHJlZURhdGEsIHRydWUpO1xuICAgIHJldHVybiBwYXJlbnQgPyBnZXRBZGphY2VudEl0ZW1JZChwYXJlbnQpIDogZ2V0QWRqYWNlbnRJdGVtSWQodHJlZURhdGEpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFsbCBJRHMgaW4gdGhlIHRyZWVcbiAgICogQHBhcmFtIGFycmF5XG4gICAqL1xuICBnZXRBbGxQYXJlbnRJZHMgPSAoYXJyYXkgPSB0aGlzLnByb3BzLnRyZWVEYXRhKSA9PiB7XG4gICAgY29uc3QgeyBpZEtleSwgY2hpbGRLZXkgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgY2IgPSAoYWNjLCBpdGVtKSA9PiB7XG4gICAgICBsZXQgdG90YWwgPSBhY2M7XG4gICAgICBpZiAoaXRlbVtjaGlsZEtleV0gJiYgaXRlbVtjaGlsZEtleV0ubGVuZ3RoID4gMCkge1xuICAgICAgICB0b3RhbCA9IGFjYy5jb25jYXQoaXRlbVtpZEtleV0pO1xuICAgICAgICByZXR1cm4gaXRlbVtjaGlsZEtleV0ucmVkdWNlKGNiLCB0b3RhbCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdG90YWw7XG4gICAgfTtcbiAgICByZXR1cm4gYXJyYXkucmVkdWNlKGNiLCBbXSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEFwcGVuZHMgcHJvdmlkZWQgaXRlbXMgdG8gdGhlIGdyaWRcbiAgICogQHBhcmFtIGl0ZW1zIC0gaW1tdXRhYmxlIGFycmF5IG9mIGl0ZW1zIHRvIGJlIGFwcGVuZGVkIHRvIGdyaWRcbiAgICogQHBhcmFtIHNldE5ld0l0ZW1zIC0gc2V0IGNvbXBsZXRlbHkgYSBuZXcgYXJyYXkgb2YgaXRlbXNcbiAgICovXG4gIHNldERhdGFUb0dyaWQgPSAoaXRlbXMsIHNldE5ld0l0ZW1zID0gZmFsc2UpID0+IHtcbiAgICBsZXQgZGF0YSA9IExpc3QoKTtcbiAgICBjb25zdCB7IGdyaWQsIGdyaWRDb2x1bW5zLCBncmlkRGF0YSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIXNldE5ld0l0ZW1zKSBkYXRhID0gZ3JpZERhdGEuc2xpY2UoKTtcbiAgICBjb25zdCBuZXdHcmlkSXRlbXMgPSBkYXRhLmNvbmNhdChpdGVtcyk7XG5cbiAgICB0aGlzLnByb3BzLnNldERhdGEoZ3JpZCwgZ3JpZENvbHVtbnMsIG5ld0dyaWRJdGVtcyk7XG4gICAgdGhpcy5wcm9wcy5jbGVhclNlbGVjdGVkSXRlbXMoZ3JpZCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEV4cGFuZHMgYSBwYXJlbnRcbiAgICogQHBhcmFtIHBhcmVudElkXG4gICAqL1xuICBleHBhbmRQYXJlbnQgPSAocGFyZW50SWQpID0+IHtcbiAgICBpZiAocGFyZW50SWQgJiYgIXRoaXMuc3RhdGUuZXhwYW5kZWRLZXlzLmZpbmQoZXhwYW5kZWRJZCA9PiBleHBhbmRlZElkID09PSBwYXJlbnRJZCkpIHtcbiAgICAgIGNvbnN0IG5ld0V4cGFuZGVkS2V5cyA9IHRoaXMuc3RhdGUuZXhwYW5kZWRLZXlzLnNsaWNlKCk7XG4gICAgICBuZXdFeHBhbmRlZEtleXMucHVzaChwYXJlbnRJZCk7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgZXhwYW5kZWRLZXlzOiBuZXdFeHBhbmRlZEtleXMgfSk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBDbG9zZXMgZGVsZXRlIGNvbmZpcm1hdGlvbiBkaWFsb2dcbiAgICovXG4gIGNsb3NlRGVsZXRlQ29uZmlybWF0aW9uRGlhbG9nID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzaG93RGVsZXRlQ29uZmlybWF0aW9uOiBmYWxzZSB9KTtcbiAgfTtcblxuICAvKipcbiAgICogRGVsZXRlcyBhIHBhcmVudCBub2RlXG4gICAqL1xuICBkZWxldGVQYXJlbnQgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBvbkNoYW5nZSwgdHJlZURhdGEgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgc2VsZWN0ZWRLZXkgPSB0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXTtcbiAgICBjb25zdCBhY3Rpb24gPSB7XG4gICAgICB0eXBlOiBUUkVFX0FDVElPTlMuREVMRVRFX1BBUkVOVCxcbiAgICB9O1xuICAgIGNvbnN0IG5leHRTZWxlY3RlZEtleSA9IHRoaXMuZ2V0QWRqYWNlbnRJdGVtKHNlbGVjdGVkS2V5KTtcbiAgICBjb25zdCBuZXdJdGVtcyA9IHRoaXMuZ2V0VXBkYXRlZFRyZWUoc2VsZWN0ZWRLZXksIHRyZWVEYXRhLCBhY3Rpb24pO1xuICAgIGlmIChvbkNoYW5nZSkgb25DaGFuZ2UobmV3SXRlbXMpO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2VsZWN0ZWRLZXlzOiBbbmV4dFNlbGVjdGVkS2V5XSxcbiAgICAgIHNob3dEZWxldGVDb25maXJtYXRpb246IGZhbHNlLFxuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgYSBtb3ZlIGlzIHBlcm1pdHRlZCBiZWZvcmUgY2FsbGluZyBUcmVlIGNvbXBvbmVudCdzIG9uRHJhZ0Ryb3AgY2FsbGJhY2tcbiAgICogQHBhcmFtIGl0ZW1zXG4gICAqIEBwYXJhbSBlXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgaXNEcmFnRHJvcExlZ2FsID0gKGl0ZW1zLCBlKSA9PiB7XG4gICAgY29uc3QgeyBjaGlsZEtleSwgdHJlZURhdGEsIG9uRHJhZ0Ryb3BQcmV2ZW50IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGRyb3BJdGVtID0gdGhpcy5nZXRUcmVlSXRlbShlLm5vZGUucHJvcHMuZXZlbnRLZXkpO1xuICAgIGNvbnN0IGRyYWdJdGVtID0gdGhpcy5nZXRUcmVlSXRlbShlLmRyYWdOb2RlLnByb3BzLmV2ZW50S2V5KTtcbiAgICBjb25zdCBkcm9wSXRlbVBhcmVudCA9IHRoaXMuZ2V0VHJlZUl0ZW0oZS5ub2RlLnByb3BzLmV2ZW50S2V5LCB0cmVlRGF0YSwgdHJ1ZSk7XG5cbiAgICAvKipcbiAgICAgKiBXZSB3YW50IHRvIHByZXZlbnQgdGhlIG1vdmUsIGlmOlxuICAgICAqIC0gU2VsZWN0ZWQgaXRlbSBpcyBhIHBhcmVudCwgYW5kIC4uXG4gICAgICogICAgLSBEcm9wcGluZyBvdmVyIGFuIGl0ZW0sIGFuZCAuLlxuICAgICAqICAgICAgLSBOZXcgcGFyZW50IGhhcyBsZWFmcyBPUiBuZXcgcGFyZW50IGlzIGEgbGVhZlxuICAgICAqICAgIC0gRHJvcHBpbmcgYmV0d2VlbiBpdGVtcywgYW5kIC4uXG4gICAgICogICAgICAgIC0gTmV3IHBhcmVudCdzIHBhcmVudCBoYXMgbGVhZnNcbiAgICAgKiAgLSBTZWxlY3RlZCBpdGVtIGlzIGEgbGVhZiwgYW5kIC4uLlxuICAgICAqL1xuICAgIGlmIChkcmFnSXRlbVtjaGlsZEtleV0pIHtcbiAgICAgIGlmIChcbiAgICAgICAgKCFlLmRyb3BUb0dhcCAmJiAodGhpcy5oYXNMZWFmcyhkcm9wSXRlbSkgfHwgIWRyb3BJdGVtW2NoaWxkS2V5XSkpIHx8XG4gICAgICAgIChkcm9wSXRlbVBhcmVudCAmJiBlLmRyb3BUb0dhcCAmJiAodGhpcy5oYXNMZWFmcyhkcm9wSXRlbVBhcmVudCkpKVxuICAgICAgKSB7XG4gICAgICAgIGlmIChvbkRyYWdEcm9wUHJldmVudCkgb25EcmFnRHJvcFByZXZlbnQoKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoXG4gICAgICAoZHJvcEl0ZW0gJiYgIWUuZHJvcFRvR2FwICYmIHRoaXMuaGFzUGFyZW50cyhkcm9wSXRlbSkpIHx8XG4gICAgICAoZHJvcEl0ZW1QYXJlbnQgJiYgZS5kcm9wVG9HYXAgJiYgdGhpcy5oYXNQYXJlbnRzKGRyb3BJdGVtUGFyZW50KSkgfHxcbiAgICAgIChlLmRyb3BUb0dhcCAmJiAhZHJvcEl0ZW1QYXJlbnQpIHx8XG4gICAgICAoIWUuZHJvcFRvR2FwICYmICFkcm9wSXRlbVtjaGlsZEtleV0pXG4gICAgKSB7XG4gICAgICAvLyBJdGVtIGhhcyBnb3QgcGFyZW50IGFzIGEgY2hpbGQgLSBsZWFmIGNhbm5vdCBiZSBkcm9wcGVkIGhlcmVcbiAgICAgIGlmIChvbkRyYWdEcm9wUHJldmVudCkgb25EcmFnRHJvcFByZXZlbnQoKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cblxuICBpc0FsbEV4cGFuZGVkID0gKCkgPT5cbiAgICB0aGlzLnN0YXRlLmV4cGFuZGVkS2V5cy5sZW5ndGggPT09IHRoaXMuZ2V0QWxsUGFyZW50SWRzKCkubGVuZ3RoO1xuXG4gIGhhc0xlYWZzID0gKGl0ZW0pID0+IHtcbiAgICBjb25zdCB7IGNoaWxkS2V5IH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghaXRlbVtjaGlsZEtleV0pIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gISFpdGVtW2NoaWxkS2V5XS5maW5kKGNoaWxkID0+ICFjaGlsZFtjaGlsZEtleV0pO1xuICB9O1xuXG4gIGhhc1BhcmVudHMgPSAoaXRlbSkgPT4ge1xuICAgIGNvbnN0IHsgY2hpbGRLZXkgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFpdGVtW2NoaWxkS2V5XSkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiAhIWl0ZW1bY2hpbGRLZXldLmZpbmQoY2hpbGQgPT4gY2hpbGRbY2hpbGRLZXldKTtcbiAgfTtcblxuICAvKipcbiAgICogRGVzZWxlY3RzIGFuIGl0ZW0sIGlmIGl0IGlzIGUuZy4gcmVtb3ZlZFxuICAgKi9cbiAgZGVzZWxlY3RJdGVtID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZEtleXM6IFtdIH0pO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICB2YWx1ZUtleSwgaWRLZXksIHRyZWVEYXRhLCBncmlkLCBncmlkQ29sdW1ucywgY2xhc3NOYW1lLCB0cmFuc2xhdGlvbnMsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBtZXJnZWRHcmlkID0gT2JqZWN0LmFzc2lnbih7fSwgZ3JpZCwgeyBkZWZhdWx0U2hvd0ZpbHRlcmluZ1JvdzogdHJ1ZSB9KTtcbiAgICBjb25zdCBtZXJnZWRUcmFuc2xhdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0VHJhbnNsYXRpb25zLCB0cmFuc2xhdGlvbnMpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxSZWFjdC5GcmFnbWVudD5cbiAgICAgICAgPENvbnRhaW5lciBjbGFzc05hbWU9e2NsYXNzTmFtZX0+XG4gICAgICAgICAgPFRyZWVDb250YWluZXI+XG4gICAgICAgICAgICA8Q29udHJvbEJhclxuICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgb25BZGROZXdDbGljaz17dGhpcy5vbkFkZE5ld0NsaWNrfVxuICAgICAgICAgICAgICBvbkRlbGV0ZUNsaWNrPXt0aGlzLm9uRGVsZXRlQ2xpY2t9XG4gICAgICAgICAgICAgIG9uSW5wdXRDaGFuZ2U9e3RoaXMub25JbnB1dENoYW5nZX1cbiAgICAgICAgICAgICAgb25FeHBhbmRBbGxDbGljaz17dGhpcy5vbkV4cGFuZEFsbH1cbiAgICAgICAgICAgICAgZXhwYW5kQWxsPXt0aGlzLmlzQWxsRXhwYW5kZWQoKX1cbiAgICAgICAgICAgICAgc2VsZWN0ZWRUcmVlSXRlbT17dGhpcy5nZXRUcmVlSXRlbSh0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXSl9XG4gICAgICAgICAgICAgIGhlaWdodD17QUNUSU9OX0JBUl9DT05UQUlORVJfSEVJR0hUfVxuICAgICAgICAgICAgICB0cmFuc2xhdGlvbnM9e21lcmdlZFRyYW5zbGF0aW9uc31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8UGVyZmVjdFNjcm9sbGJhcj5cbiAgICAgICAgICAgICAgeyEhdHJlZURhdGEubGVuZ3RoICYmIDxUcmVlQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgdHJlZURhdGE9e3RyZWVEYXRhfVxuICAgICAgICAgICAgICAgIGRhdGFMb29rVXBLZXk9e2lkS2V5fVxuICAgICAgICAgICAgICAgIGRhdGFMb29rVXBWYWx1ZT17dmFsdWVLZXl9XG4gICAgICAgICAgICAgICAgb25TZWxlY3Q9e3RoaXMub25UcmVlSXRlbVNlbGVjdH1cbiAgICAgICAgICAgICAgICBvbkRyYWdEcm9wPXt0aGlzLm9uVHJlZUl0ZW1EcmFnRHJvcH1cbiAgICAgICAgICAgICAgICBvbkV4cGFuZD17dGhpcy5vbkV4cGFuZH1cbiAgICAgICAgICAgICAgICBjaGVja2FibGU9e2ZhbHNlfVxuICAgICAgICAgICAgICAgIHNlbGVjdGVkS2V5cz17dGhpcy5zdGF0ZS5zZWxlY3RlZEtleXN9XG4gICAgICAgICAgICAgICAgZXhwYW5kZWRLZXlzPXt0aGlzLnN0YXRlLmV4cGFuZGVkS2V5c31cbiAgICAgICAgICAgICAgICBpc0RyYWdEcm9wTGVnYWw9e3RoaXMuaXNEcmFnRHJvcExlZ2FsfVxuICAgICAgICAgICAgICAgIHNlbGVjdGFibGVcbiAgICAgICAgICAgICAgICBkcmFnZ2FibGVcbiAgICAgICAgICAgICAgLz59XG4gICAgICAgICAgICAgIHshdHJlZURhdGEubGVuZ3RoICYmIDxOb0l0ZW1zVGV4dD57bWVyZ2VkVHJhbnNsYXRpb25zLm5vVHJlZUl0ZW1zfTwvTm9JdGVtc1RleHQ+fVxuICAgICAgICAgICAgPC9QZXJmZWN0U2Nyb2xsYmFyPlxuICAgICAgICAgIDwvVHJlZUNvbnRhaW5lcj5cbiAgICAgICAgICA8QXJyb3dDb250cm9sc1xuICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICBzZWxlY3RlZFRyZWVJdGVtPXt0aGlzLmdldFRyZWVJdGVtKHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdKX1cbiAgICAgICAgICAgIG9uTW92ZVRvVHJlZUNsaWNrPXt0aGlzLm9uTW92ZVRvVHJlZUNsaWNrfVxuICAgICAgICAgICAgb25Nb3ZlVG9HcmlkQ2xpY2s9e3RoaXMub25Nb3ZlVG9HcmlkQ2xpY2t9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8R3JpZFxuICAgICAgICAgICAgZ3JpZD17bWVyZ2VkR3JpZH1cbiAgICAgICAgICAgIGNvbHVtbnM9e2dyaWRDb2x1bW5zfVxuICAgICAgICAgICAgcm93U2VsZWN0XG4gICAgICAgICAgICBtdWx0aVNlbGVjdFxuICAgICAgICAgICAgZmlsdGVyaW5nXG4gICAgICAgICAgICByb3dTZWxlY3RDaGVja2JveENvbHVtblxuICAgICAgICAgICAgZ3JpZEhlYWRlcj17PFByaW1pdGl2ZS5TdWJ0aXRsZT57bWVyZ2VkVHJhbnNsYXRpb25zLmdyaWRUaXRsZX08L1ByaW1pdGl2ZS5TdWJ0aXRsZT59XG4gICAgICAgICAgLz5cblxuICAgICAgICA8L0NvbnRhaW5lcj5cbiAgICAgICAge3RoaXMuc3RhdGUuc2hvd0RlbGV0ZUNvbmZpcm1hdGlvbiAmJlxuICAgICAgICA8Q29uZmlybURpYWxvZ1xuICAgICAgICAgIHRpdGxlVGV4dD17bWVyZ2VkVHJhbnNsYXRpb25zLmRlbGV0ZUNvbmZpcm1EaWFsb2cudGl0bGVUZXh0fVxuICAgICAgICAgIGJvZHlUZXh0PXttZXJnZWRUcmFuc2xhdGlvbnMuZGVsZXRlQ29uZmlybURpYWxvZy5ib2R5VGV4dH1cbiAgICAgICAgICBva0J1dHRvblRleHQ9e21lcmdlZFRyYW5zbGF0aW9ucy5kZWxldGVDb25maXJtRGlhbG9nLm9rQnV0dG9uVGV4dH1cbiAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0PXttZXJnZWRUcmFuc2xhdGlvbnMuZGVsZXRlQ29uZmlybURpYWxvZy5jYW5jZWxCdXR0b25UZXh0fVxuICAgICAgICAgIGNvbmZpcm1DYWxsYmFjaz17dGhpcy5kZWxldGVQYXJlbnR9XG4gICAgICAgICAgY2FuY2VsQ2FsbGJhY2s9e3RoaXMuY2xvc2VEZWxldGVDb25maXJtYXRpb25EaWFsb2d9XG4gICAgICAgIC8+XG4gICAgICAgIH1cbiAgICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gICAgKTtcbiAgfVxufVxuIl19