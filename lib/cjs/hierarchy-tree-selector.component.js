"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _reactTreeComponent = _interopRequireDefault(require("@opuscapita/react-tree-component"));

var _ocCmCommonLayouts = require("@opuscapita/oc-cm-common-layouts");

var _reactGrid = require("@opuscapita/react-grid");

var _reactConfirmationDialog = _interopRequireDefault(require("@opuscapita/react-confirmation-dialog"));

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _immutable = require("immutable");

var _reactImmutableProptypes = _interopRequireDefault(require("react-immutable-proptypes"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _hierarchyTreeSelectorControlBar = _interopRequireDefault(require("./hierarchy-tree-selector-control-bar.component"));

var _hierarchyTreeSelectorArrowControls = _interopRequireDefault(require("./hierarchy-tree-selector-arrow-controls.component"));

var _hierarchyTree = require("./hierarchy-tree.utils");

var _dec, _class, _class2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject3() {
  var data = _taggedTemplateLiteralLoose(["\n  height: 100%;\n  .oc-scrollbar-container {\n    height: calc(100% - ", ");\n    padding: ", ";\n  }\n  .tree-header {\n    min-height: ", ";\n    .ordering-arrows {\n      font-weight: 24px;\n    }\n  }\n  .oc-react-tree {\n    height: 100%;\n    .rc-tree-iconEle.rc-tree-icon__customize {\n      display: none;\n    }\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteralLoose(["\n  display: flex;\n  min-height: 300px;\n  > div {\n    width: 50%;\n    flex: 1 1 100%;\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteralLoose(["\n  height: 100%;\n  &&& {\n    padding: 0;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteralLoose(strings, raw) { if (!raw) { raw = strings.slice(0); } strings.raw = raw; return strings; }

var ACTION_BAR_CONTAINER_HEIGHT = '54px';
var TREE_ACTIONS = {
  ADD_CHILDREN: 'ADD_CHILDREN',
  MOVE_LEAF: 'MOVE_LEAF',
  RENAME_PARENT: 'RENAME_PARENT',
  DELETE_PARENT: 'DELETE_PARENT'
};
var Grid = (0, _styledComponents["default"])(_reactGrid.Datagrid)(_templateObject());

var Container = _styledComponents["default"].div(_templateObject2());

var TreeContainer = _styledComponents["default"].div(_templateObject3(), ACTION_BAR_CONTAINER_HEIGHT, function (props) {
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

var HierarchyTreeSelector = (_dec = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), _dec(_class = (_temp = _class2 =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(HierarchyTreeSelector, _React$PureComponent);

  function HierarchyTreeSelector(props) {
    var _this;

    _this = _React$PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "onTreeItemSelect", function (selectedKeys) {
      var _this$props = _this.props,
          onSelect = _this$props.onSelect,
          lockedKey = _this$props.lockedKey;

      var selectedItem = _this.getTreeItem(selectedKeys[0]);

      if (lockedKey && selectedItem && selectedItem[lockedKey]) return;

      _this.setState({
        selectedKeys: selectedKeys
      }, function () {
        if (onSelect) onSelect(selectedKeys);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onDeleteClick", function () {
      var _this$props2 = _this.props,
          childKey = _this$props2.childKey,
          lockedKey = _this$props2.lockedKey,
          onPreventDelete = _this$props2.onPreventDelete;

      var item = _this.getTreeItem(_this.state.selectedKeys[0]); // If item is not a parent, we won't show the delete confirmation dialog


      if (!item[childKey]) {
        _this.moveItemToGrid();

        return;
      }

      if (lockedKey) {
        // If it is a parent, we want to check that it doesn't contain any locked items
        var leafs = _this.getAllLeafs(item[childKey]);

        if (leafs.find(function (leaf) {
          return leaf[lockedKey];
        }) && onPreventDelete) {
          onPreventDelete();
          return;
        }
      }

      _this.setState({
        showDeleteConfirmation: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onAddNewClick", function (data, callback) {
      var _this$props3 = _this.props,
          onChange = _this$props3.onChange,
          treeData = _this$props3.treeData,
          idKey = _this$props3.idKey;
      var newItems = treeData.slice(); // If no tree node is selected, we'll place the new item to the root
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

      _this.setState({
        selectedKeys: [data[idKey]]
      }, function () {
        // If the parent is not yet expanded, we will expand it now
        var parent = _this.getTreeItem(data[idKey], treeData, true) || {};

        _this.expandParent(parent[idKey]);

        if (onChange) onChange(newItems);
        callback();
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onMoveToGridClick", function () {
      _this.moveItemToGrid();
    });

    _defineProperty(_assertThisInitialized(_this), "onOrderClick", function (items) {
      _this.props.onChange(items);
    });

    _defineProperty(_assertThisInitialized(_this), "onMoveToTreeClick", function () {
      var _this$props4 = _this.props,
          onChange = _this$props4.onChange,
          selectedGridItems = _this$props4.selectedGridItems,
          gridData = _this$props4.gridData,
          treeData = _this$props4.treeData,
          idKey = _this$props4.idKey;
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
    });

    _defineProperty(_assertThisInitialized(_this), "onInputChange", function (value) {
      var _this$props5 = _this.props,
          treeData = _this$props5.treeData,
          onChange = _this$props5.onChange;
      var action = {
        type: TREE_ACTIONS.RENAME_PARENT,
        data: value
      };

      var newItems = _this.getUpdatedTree(_this.state.selectedKeys[0], treeData, action);

      if (onChange) onChange(newItems);
    });

    _defineProperty(_assertThisInitialized(_this), "onExpand", function (ids) {
      _this.setState({
        expandedKeys: ids
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getUpdatedTree", function (id, array, action) {
      if (array === void 0) {
        array = _this.props.treeData;
      }

      if (_this.isSelectedDisabled()) return array;
      var found = false;
      var _this$props6 = _this.props,
          idKey = _this$props6.idKey,
          childKey = _this$props6.childKey,
          valueKey = _this$props6.valueKey;
      var newItems = array.slice();
      var removeActions = [TREE_ACTIONS.MOVE_LEAF, TREE_ACTIONS.DELETE_PARENT]; // If deleted parent item is in the root node

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
    });

    _defineProperty(_assertThisInitialized(_this), "getAllLeafs", function (array, alreadyFound) {
      if (alreadyFound === void 0) {
        alreadyFound = [];
      }

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
    });

    _defineProperty(_assertThisInitialized(_this), "getTreeItem", function (id, array, returnParent, parent) {
      if (array === void 0) {
        array = _this.props.treeData;
      }

      if (returnParent === void 0) {
        returnParent = false;
      }

      if (parent === void 0) {
        parent = null;
      }

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
    });

    _defineProperty(_assertThisInitialized(_this), "getAdjacentItem", function (id) {
      if (!id) return null;
      var _this$props8 = _this.props,
          childKey = _this$props8.childKey,
          idKey = _this$props8.idKey,
          treeData = _this$props8.treeData;

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
    });

    _defineProperty(_assertThisInitialized(_this), "setDataToGrid", function (items, setNewItems) {
      if (setNewItems === void 0) {
        setNewItems = false;
      }

      var data = (0, _immutable.List)();
      var _this$props9 = _this.props,
          grid = _this$props9.grid,
          gridColumns = _this$props9.gridColumns,
          gridData = _this$props9.gridData,
          sortKey = _this$props9.sortKey;
      if (!setNewItems) data = gridData.slice();
      var newGridItems = data.concat(items);
      if (sortKey) newGridItems = newGridItems.sortBy(function (i) {
        return i.get(sortKey);
      });

      _this.props.setData(grid, gridColumns, newGridItems);

      _this.props.clearSelectedItems(grid);
    });

    _defineProperty(_assertThisInitialized(_this), "countParents", function (selectedKey, counter) {
      var _this$props10 = _this.props,
          idKey = _this$props10.idKey,
          treeData = _this$props10.treeData;

      var newParent = _this.getTreeItem(selectedKey, treeData, true);

      if (newParent) {
        return _this.countParents(newParent[idKey], counter + 1);
      }

      return counter;
    });

    _defineProperty(_assertThisInitialized(_this), "hasLevelReachedMax", function (selectedLevel) {
      var maxLevel = _this.props.maxLevel;
      if (!selectedLevel || !maxLevel) return false;

      var numberOfParents = _this.countParents(selectedLevel, 0);

      return numberOfParents >= maxLevel;
    });

    _defineProperty(_assertThisInitialized(_this), "isSelectedDisabled", function () {
      var lockedKey = _this.props.lockedKey;
      var item = !!_this.getTreeItem(_this.state.selectedKeys[0]);
      if (!item) return false;
      return item[lockedKey];
    });

    _defineProperty(_assertThisInitialized(_this), "moveItemToGrid", function () {
      var _this$props11 = _this.props,
          treeData = _this$props11.treeData,
          onChange = _this$props11.onChange;
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
    });

    _defineProperty(_assertThisInitialized(_this), "expandParent", function (parentId) {
      if (parentId && !_this.state.expandedKeys.find(function (expandedId) {
        return expandedId === parentId;
      })) {
        var newExpandedKeys = _this.state.expandedKeys.slice(); // eslint-disable-line


        newExpandedKeys.push(parentId);

        _this.setState({
          expandedKeys: newExpandedKeys
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "closeDeleteConfirmationDialog", function () {
      _this.setState({
        showDeleteConfirmation: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "deleteParent", function () {
      var _this$props12 = _this.props,
          onChange = _this$props12.onChange,
          treeData = _this$props12.treeData;
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
    });

    _defineProperty(_assertThisInitialized(_this), "deselectItem", function () {
      _this.setState({
        selectedKeys: []
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderHeaderRight", function (translations) {
      return _react["default"].createElement(_hierarchyTreeSelectorControlBar["default"], _extends({}, _this.props, {
        onAddNewClick: _this.onAddNewClick,
        onDeleteClick: _this.onDeleteClick,
        onInputChange: _this.onInputChange,
        selectedTreeItem: _this.getTreeItem(_this.state.selectedKeys[0]),
        height: ACTION_BAR_CONTAINER_HEIGHT,
        translations: translations,
        isAddDisabled: _this.hasLevelReachedMax(_this.state.selectedKeys[0])
      }));
    });

    _this.state = {
      selectedKeys: [],
      expandedKeys: [],
      showDeleteConfirmation: false
    };
    return _this;
  }

  var _proto = HierarchyTreeSelector.prototype;

  _proto.componentDidMount = function componentDidMount() {
    if (this.props.defaultExpandedKeys.length > 0) {
      this.onExpand(this.props.defaultExpandedKeys);
    }
  }
  /**
   * Selects a tree item
   * @param selectedKeys (array)
   */
  ;

  _proto.render = function render() {
    var _this$props13 = this.props,
        valueKey = _this$props13.valueKey,
        leafValueKey = _this$props13.leafValueKey,
        idKey = _this$props13.idKey,
        treeData = _this$props13.treeData,
        grid = _this$props13.grid,
        gridColumns = _this$props13.gridColumns,
        className = _this$props13.className,
        translations = _this$props13.translations,
        childKey = _this$props13.childKey;
    var mergedGrid = Object.assign({}, grid, {
      defaultShowFilteringRow: true
    });
    var mergedTranslations = Object.assign({}, _hierarchyTree.defaultTranslations, translations);
    return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(Container, {
      className: className
    }, _react["default"].createElement(TreeContainer, null, _react["default"].createElement(_reactTreeComponent["default"], {
      treeData: treeData,
      dataLookUpKey: idKey,
      dataLookUpValue: valueKey,
      dataLookUpLeafValue: leafValueKey,
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
    })), _react["default"].createElement(_hierarchyTreeSelectorArrowControls["default"], _extends({}, this.props, {
      selectedTreeItem: this.getTreeItem(this.state.selectedKeys[0]),
      onMoveToTreeClick: this.onMoveToTreeClick,
      onMoveToGridClick: this.onMoveToGridClick
    })), _react["default"].createElement(Grid, {
      grid: mergedGrid,
      columns: gridColumns,
      multiSelect: true,
      filtering: true,
      rowSelectCheckboxColumn: true,
      gridHeader: _react["default"].createElement(_ocCmCommonLayouts.Primitive.Subtitle, null, mergedTranslations.gridTitle)
    })), this.state.showDeleteConfirmation && _react["default"].createElement(_reactConfirmationDialog["default"], {
      translations: mergedTranslations.deleteConfirmDialog,
      confirmCallback: this.deleteParent,
      cancelCallback: this.closeDeleteConfirmationDialog
    }));
  };

  return HierarchyTreeSelector;
}(_react["default"].PureComponent), _defineProperty(_class2, "defaultProps", {
  idKey: 'id',
  valueKey: 'name',
  childKey: 'children',
  lockedKey: undefined,
  leafValueKey: undefined,
  sortKey: undefined,
  treeData: [],
  className: '',
  translations: _hierarchyTree.defaultTranslations,
  id: 'hierarchy-tree',
  onSelect: undefined,
  onChange: undefined,
  onPreventDelete: undefined,
  defaultExpandAll: true,
  defaultExpandedKeys: [],
  singleRoot: true,
  maxLevel: 0
}), _temp)) || _class);
exports["default"] = HierarchyTreeSelector;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIkFDVElPTl9CQVJfQ09OVEFJTkVSX0hFSUdIVCIsIlRSRUVfQUNUSU9OUyIsIkFERF9DSElMRFJFTiIsIk1PVkVfTEVBRiIsIlJFTkFNRV9QQVJFTlQiLCJERUxFVEVfUEFSRU5UIiwiR3JpZCIsIkRhdGFncmlkIiwiQ29udGFpbmVyIiwic3R5bGVkIiwiZGl2IiwiVHJlZUNvbnRhaW5lciIsInByb3BzIiwidGhlbWUiLCJndXR0ZXJXaWR0aCIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsInNldERhdGEiLCJEYXRhZ3JpZEFjdGlvbnMiLCJjbGVhclNlbGVjdGVkSXRlbXMiLCJtYXBTdGF0ZVRvUHJvcHMiLCJzdGF0ZSIsImdyaWRJZCIsImdyaWQiLCJpZCIsInNlbGVjdGVkR3JpZEl0ZW1zIiwiZGF0YWdyaWQiLCJnZXRJbiIsImdyaWREYXRhIiwiSGllcmFyY2h5VHJlZVNlbGVjdG9yIiwic2VsZWN0ZWRLZXlzIiwib25TZWxlY3QiLCJsb2NrZWRLZXkiLCJzZWxlY3RlZEl0ZW0iLCJnZXRUcmVlSXRlbSIsInNldFN0YXRlIiwiY2hpbGRLZXkiLCJvblByZXZlbnREZWxldGUiLCJpdGVtIiwibW92ZUl0ZW1Ub0dyaWQiLCJsZWFmcyIsImdldEFsbExlYWZzIiwiZmluZCIsImxlYWYiLCJzaG93RGVsZXRlQ29uZmlybWF0aW9uIiwiZGF0YSIsImNhbGxiYWNrIiwib25DaGFuZ2UiLCJ0cmVlRGF0YSIsImlkS2V5IiwibmV3SXRlbXMiLCJzbGljZSIsInB1c2giLCJhY3Rpb24iLCJ0eXBlIiwiZ2V0VXBkYXRlZFRyZWUiLCJwYXJlbnQiLCJleHBhbmRQYXJlbnQiLCJpdGVtcyIsInNlbGVjdGVkSWQiLCJmaWx0ZXIiLCJpIiwiaW5jbHVkZXMiLCJnZXQiLCJ0b0pTIiwibmV3R3JpZEl0ZW1zIiwic2V0RGF0YVRvR3JpZCIsInZhbHVlIiwiaWRzIiwiZXhwYW5kZWRLZXlzIiwiYXJyYXkiLCJpc1NlbGVjdGVkRGlzYWJsZWQiLCJmb3VuZCIsInZhbHVlS2V5IiwicmVtb3ZlQWN0aW9ucyIsInJvb3RJdGVtIiwibGVuZ3RoIiwiZGVzZWxlY3RJdGVtIiwiY2hpbGQiLCJmaWx0ZXJlZENoaWxkcmVuIiwiY2hpbGRJdGVtIiwiY29uY2F0IiwiVHlwZUVycm9yIiwiYWxyZWFkeUZvdW5kIiwicmV0dXJuUGFyZW50IiwiZm9yRWFjaCIsImdldEFkamFjZW50SXRlbUlkIiwicGFyZW50QXJyIiwiQXJyYXkiLCJpc0FycmF5IiwiaW5kZXgiLCJmaW5kSW5kZXgiLCJhZGphY2VudEl0ZW0iLCJzZXROZXdJdGVtcyIsImdyaWRDb2x1bW5zIiwic29ydEtleSIsInNvcnRCeSIsInNlbGVjdGVkS2V5IiwiY291bnRlciIsIm5ld1BhcmVudCIsImNvdW50UGFyZW50cyIsInNlbGVjdGVkTGV2ZWwiLCJtYXhMZXZlbCIsIm51bWJlck9mUGFyZW50cyIsIm5leHRTZWxlY3RlZEtleSIsImdldEFkamFjZW50SXRlbSIsInBhcmVudElkIiwiZXhwYW5kZWRJZCIsIm5ld0V4cGFuZGVkS2V5cyIsInRyYW5zbGF0aW9ucyIsIm9uQWRkTmV3Q2xpY2siLCJvbkRlbGV0ZUNsaWNrIiwib25JbnB1dENoYW5nZSIsImhhc0xldmVsUmVhY2hlZE1heCIsImNvbXBvbmVudERpZE1vdW50IiwiZGVmYXVsdEV4cGFuZGVkS2V5cyIsIm9uRXhwYW5kIiwicmVuZGVyIiwibGVhZlZhbHVlS2V5IiwiY2xhc3NOYW1lIiwibWVyZ2VkR3JpZCIsIk9iamVjdCIsImFzc2lnbiIsImRlZmF1bHRTaG93RmlsdGVyaW5nUm93IiwibWVyZ2VkVHJhbnNsYXRpb25zIiwiZGVmYXVsdFRyYW5zbGF0aW9ucyIsIm9uVHJlZUl0ZW1TZWxlY3QiLCJvbk9yZGVyQ2xpY2siLCJ0cmVlVGl0bGUiLCJyZW5kZXJIZWFkZXJSaWdodCIsIm9uTW92ZVRvVHJlZUNsaWNrIiwib25Nb3ZlVG9HcmlkQ2xpY2siLCJncmlkVGl0bGUiLCJkZWxldGVDb25maXJtRGlhbG9nIiwiZGVsZXRlUGFyZW50IiwiY2xvc2VEZWxldGVDb25maXJtYXRpb25EaWFsb2ciLCJSZWFjdCIsIlB1cmVDb21wb25lbnQiLCJ1bmRlZmluZWQiLCJkZWZhdWx0RXhwYW5kQWxsIiwic2luZ2xlUm9vdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFHQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFHQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLDJCQUEyQixHQUFHLE1BQXBDO0FBQ0EsSUFBTUMsWUFBWSxHQUFHO0FBQ25CQyxFQUFBQSxZQUFZLEVBQUUsY0FESztBQUVuQkMsRUFBQUEsU0FBUyxFQUFFLFdBRlE7QUFHbkJDLEVBQUFBLGFBQWEsRUFBRSxlQUhJO0FBSW5CQyxFQUFBQSxhQUFhLEVBQUU7QUFKSSxDQUFyQjtBQU9BLElBQU1DLElBQUksR0FBRyxrQ0FBT0MsbUJBQVAsQ0FBSCxtQkFBVjs7QUFPQSxJQUFNQyxTQUFTLEdBQUdDLDZCQUFPQyxHQUFWLG9CQUFmOztBQVNBLElBQU1DLGFBQWEsR0FBR0YsNkJBQU9DLEdBQVYscUJBR09WLDJCQUhQLEVBSUosVUFBQVksS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZQyxXQUFoQjtBQUFBLENBSkQsRUFPRGQsMkJBUEMsQ0FBbkI7O0FBb0JBLElBQU1lLGtCQUFrQixHQUFHO0FBQ3pCQyxFQUFBQSxPQUFPLEVBQUVDLDJCQUFnQkQsT0FEQTtBQUV6QkUsRUFBQUEsa0JBQWtCLEVBQUVELDJCQUFnQkM7QUFGWCxDQUEzQjs7QUFLQSxJQUFNQyxlQUFlLEdBQUcsU0FBbEJBLGVBQWtCLENBQUNDLEtBQUQsRUFBUVIsS0FBUixFQUFrQjtBQUN4QyxNQUFNUyxNQUFNLEdBQUdULEtBQUssQ0FBQ1UsSUFBTixDQUFXQyxFQUExQjtBQUNBLFNBQU87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S0FBSyxFQUFFLElBRGE7QUFFcEJ3QixFQUFBQSxRQUFRLEVBQUUsTUFGVTtBQUdwQnJDLEVBQUFBLFFBQVEsRUFBRSxVQUhVO0FBSXBCSixFQUFBQSxTQUFTLEVBQUUwRyxTQUpTO0FBS3BCcEIsRUFBQUEsWUFBWSxFQUFFb0IsU0FMTTtBQU1wQjNDLEVBQUFBLE9BQU8sRUFBRTJDLFNBTlc7QUFPcEIxRixFQUFBQSxRQUFRLEVBQUUsRUFQVTtBQVFwQnVFLEVBQUFBLFNBQVMsRUFBRSxFQVJTO0FBU3BCVixFQUFBQSxZQUFZLEVBQUVnQixrQ0FUTTtBQVVwQnJHLEVBQUFBLEVBQUUsRUFBRSxnQkFWZ0I7QUFXcEJPLEVBQUFBLFFBQVEsRUFBRTJHLFNBWFU7QUFZcEIzRixFQUFBQSxRQUFRLEVBQUUyRixTQVpVO0FBYXBCckcsRUFBQUEsZUFBZSxFQUFFcUcsU0FiRztBQWNwQkMsRUFBQUEsZ0JBQWdCLEVBQUUsSUFkRTtBQWVwQnhCLEVBQUFBLG1CQUFtQixFQUFFLEVBZkQ7QUFnQnBCeUIsRUFBQUEsVUFBVSxFQUFFLElBaEJRO0FBaUJwQnRDLEVBQUFBLFFBQVEsRUFBRTtBQWpCVSxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRyZWVDb21wb25lbnQgZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtdHJlZS1jb21wb25lbnQnO1xuaW1wb3J0IHsgUHJpbWl0aXZlIH0gZnJvbSAnQG9wdXNjYXBpdGEvb2MtY20tY29tbW9uLWxheW91dHMnO1xuaW1wb3J0IHtcbiAgRGF0YWdyaWQsIGdyaWRTaGFwZSwgZ3JpZENvbHVtblNoYXBlLCBEYXRhZ3JpZEFjdGlvbnMsXG59IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWdyaWQnO1xuaW1wb3J0IENvbmZpcm1EaWFsb2cgZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtY29uZmlybWF0aW9uLWRpYWxvZyc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgeyBMaXN0LCBmcm9tSlMgfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IEltbXV0YWJsZVByb3BUeXBlcyBmcm9tICdyZWFjdC1pbW11dGFibGUtcHJvcHR5cGVzJztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG4vLyBBcHAgaW1wb3J0c1xuaW1wb3J0IENvbnRyb2xCYXIgZnJvbSAnLi9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci1jb250cm9sLWJhci5jb21wb25lbnQnO1xuaW1wb3J0IEFycm93Q29udHJvbHMgZnJvbSAnLi9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci1hcnJvdy1jb250cm9scy5jb21wb25lbnQnO1xuaW1wb3J0IHsgZGVmYXVsdFRyYW5zbGF0aW9ucyB9IGZyb20gJy4vaGllcmFyY2h5LXRyZWUudXRpbHMnO1xuXG5jb25zdCBBQ1RJT05fQkFSX0NPTlRBSU5FUl9IRUlHSFQgPSAnNTRweCc7XG5jb25zdCBUUkVFX0FDVElPTlMgPSB7XG4gIEFERF9DSElMRFJFTjogJ0FERF9DSElMRFJFTicsXG4gIE1PVkVfTEVBRjogJ01PVkVfTEVBRicsXG4gIFJFTkFNRV9QQVJFTlQ6ICdSRU5BTUVfUEFSRU5UJyxcbiAgREVMRVRFX1BBUkVOVDogJ0RFTEVURV9QQVJFTlQnLFxufTtcblxuY29uc3QgR3JpZCA9IHN0eWxlZChEYXRhZ3JpZClgXG4gIGhlaWdodDogMTAwJTtcbiAgJiYmIHtcbiAgICBwYWRkaW5nOiAwO1xuICB9XG5gO1xuXG5jb25zdCBDb250YWluZXIgPSBzdHlsZWQuZGl2YFxuICBkaXNwbGF5OiBmbGV4O1xuICBtaW4taGVpZ2h0OiAzMDBweDtcbiAgPiBkaXYge1xuICAgIHdpZHRoOiA1MCU7XG4gICAgZmxleDogMSAxIDEwMCU7XG4gIH1cbmA7XG5cbmNvbnN0IFRyZWVDb250YWluZXIgPSBzdHlsZWQuZGl2YFxuICBoZWlnaHQ6IDEwMCU7XG4gIC5vYy1zY3JvbGxiYXItY29udGFpbmVyIHtcbiAgICBoZWlnaHQ6IGNhbGMoMTAwJSAtICR7QUNUSU9OX0JBUl9DT05UQUlORVJfSEVJR0hUfSk7XG4gICAgcGFkZGluZzogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5ndXR0ZXJXaWR0aH07XG4gIH1cbiAgLnRyZWUtaGVhZGVyIHtcbiAgICBtaW4taGVpZ2h0OiAke0FDVElPTl9CQVJfQ09OVEFJTkVSX0hFSUdIVH07XG4gICAgLm9yZGVyaW5nLWFycm93cyB7XG4gICAgICBmb250LXdlaWdodDogMjRweDtcbiAgICB9XG4gIH1cbiAgLm9jLXJlYWN0LXRyZWUge1xuICAgIGhlaWdodDogMTAwJTtcbiAgICAucmMtdHJlZS1pY29uRWxlLnJjLXRyZWUtaWNvbl9fY3VzdG9taXplIHtcbiAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgfVxuICB9XG5gO1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSB7XG4gIHNldERhdGE6IERhdGFncmlkQWN0aW9ucy5zZXREYXRhLFxuICBjbGVhclNlbGVjdGVkSXRlbXM6IERhdGFncmlkQWN0aW9ucy5jbGVhclNlbGVjdGVkSXRlbXMsXG59O1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUsIHByb3BzKSA9PiB7XG4gIGNvbnN0IGdyaWRJZCA9IHByb3BzLmdyaWQuaWQ7XG4gIHJldHVybiB7XG4gICAgc2VsZWN0ZWRHcmlkSXRlbXM6IHN0YXRlLmRhdGFncmlkLmdldEluKFtncmlkSWQsICdzZWxlY3RlZEl0ZW1zJ10sIExpc3QoKSksXG4gICAgZ3JpZERhdGE6IHN0YXRlLmRhdGFncmlkLmdldEluKFtncmlkSWQsICdhbGxEYXRhJ10sIExpc3QoKSksXG4gIH07XG59O1xuXG5AY29ubmVjdChcbiAgbWFwU3RhdGVUb1Byb3BzLFxuICBtYXBEaXNwYXRjaFRvUHJvcHMsXG4pXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIaWVyYXJjaHlUcmVlU2VsZWN0b3IgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBpZEtleTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB2YWx1ZUtleTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjaGlsZEtleTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBsb2NrZWRLZXk6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbGVhZlZhbHVlS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHNvcnRLZXk6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdHJlZURhdGE6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zaGFwZSh7fSkpLFxuICAgIGdyaWQ6IGdyaWRTaGFwZS5pc1JlcXVpcmVkLFxuICAgIGdyaWRDb2x1bW5zOiBQcm9wVHlwZXMuYXJyYXlPZihncmlkQ29sdW1uU2hhcGUpLmlzUmVxdWlyZWQsXG4gICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHNldERhdGE6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgY2xlYXJTZWxlY3RlZEl0ZW1zOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHNlbGVjdGVkR3JpZEl0ZW1zOiBJbW11dGFibGVQcm9wVHlwZXMubGlzdC5pc1JlcXVpcmVkLFxuICAgIGdyaWREYXRhOiBJbW11dGFibGVQcm9wVHlwZXMubGlzdC5pc1JlcXVpcmVkLFxuICAgIHRyYW5zbGF0aW9uczogUHJvcFR5cGVzLnNoYXBlKHt9KSxcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkZWZhdWx0RXhwYW5kQWxsOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkZWZhdWx0RXhwYW5kZWRLZXlzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKSxcbiAgICBzaW5nbGVSb290OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBtYXhMZXZlbDogUHJvcFR5cGVzLm51bWJlcixcbiAgICAvLyBDYWxsYmFja3NcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uUHJldmVudERlbGV0ZTogUHJvcFR5cGVzLmZ1bmMsXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBpZEtleTogJ2lkJyxcbiAgICB2YWx1ZUtleTogJ25hbWUnLFxuICAgIGNoaWxkS2V5OiAnY2hpbGRyZW4nLFxuICAgIGxvY2tlZEtleTogdW5kZWZpbmVkLFxuICAgIGxlYWZWYWx1ZUtleTogdW5kZWZpbmVkLFxuICAgIHNvcnRLZXk6IHVuZGVmaW5lZCxcbiAgICB0cmVlRGF0YTogW10sXG4gICAgY2xhc3NOYW1lOiAnJyxcbiAgICB0cmFuc2xhdGlvbnM6IGRlZmF1bHRUcmFuc2xhdGlvbnMsXG4gICAgaWQ6ICdoaWVyYXJjaHktdHJlZScsXG4gICAgb25TZWxlY3Q6IHVuZGVmaW5lZCxcbiAgICBvbkNoYW5nZTogdW5kZWZpbmVkLFxuICAgIG9uUHJldmVudERlbGV0ZTogdW5kZWZpbmVkLFxuICAgIGRlZmF1bHRFeHBhbmRBbGw6IHRydWUsXG4gICAgZGVmYXVsdEV4cGFuZGVkS2V5czogW10sXG4gICAgc2luZ2xlUm9vdDogdHJ1ZSxcbiAgICBtYXhMZXZlbDogMCxcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgc2VsZWN0ZWRLZXlzOiBbXSxcbiAgICAgIGV4cGFuZGVkS2V5czogW10sXG4gICAgICBzaG93RGVsZXRlQ29uZmlybWF0aW9uOiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgaWYgKHRoaXMucHJvcHMuZGVmYXVsdEV4cGFuZGVkS2V5cy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLm9uRXhwYW5kKHRoaXMucHJvcHMuZGVmYXVsdEV4cGFuZGVkS2V5cyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdHMgYSB0cmVlIGl0ZW1cbiAgICogQHBhcmFtIHNlbGVjdGVkS2V5cyAoYXJyYXkpXG4gICAqL1xuICBvblRyZWVJdGVtU2VsZWN0ID0gKHNlbGVjdGVkS2V5cykgPT4ge1xuICAgIGNvbnN0IHsgb25TZWxlY3QsIGxvY2tlZEtleSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzZWxlY3RlZEl0ZW0gPSB0aGlzLmdldFRyZWVJdGVtKHNlbGVjdGVkS2V5c1swXSk7XG4gICAgaWYgKGxvY2tlZEtleSAmJiBzZWxlY3RlZEl0ZW0gJiYgc2VsZWN0ZWRJdGVtW2xvY2tlZEtleV0pIHJldHVybjtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRLZXlzIH0sICgpID0+IHtcbiAgICAgIGlmIChvblNlbGVjdCkgb25TZWxlY3Qoc2VsZWN0ZWRLZXlzKTtcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogRGlzcGxheXMgYSBjb25maXJtYXRpb24gZGlhbG9nXG4gICAqL1xuICBvbkRlbGV0ZUNsaWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgY2hpbGRLZXksIGxvY2tlZEtleSwgb25QcmV2ZW50RGVsZXRlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmdldFRyZWVJdGVtKHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdKTtcbiAgICAvLyBJZiBpdGVtIGlzIG5vdCBhIHBhcmVudCwgd2Ugd29uJ3Qgc2hvdyB0aGUgZGVsZXRlIGNvbmZpcm1hdGlvbiBkaWFsb2dcbiAgICBpZiAoIWl0ZW1bY2hpbGRLZXldKSB7XG4gICAgICB0aGlzLm1vdmVJdGVtVG9HcmlkKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGxvY2tlZEtleSkge1xuICAgICAgLy8gSWYgaXQgaXMgYSBwYXJlbnQsIHdlIHdhbnQgdG8gY2hlY2sgdGhhdCBpdCBkb2Vzbid0IGNvbnRhaW4gYW55IGxvY2tlZCBpdGVtc1xuICAgICAgY29uc3QgbGVhZnMgPSB0aGlzLmdldEFsbExlYWZzKGl0ZW1bY2hpbGRLZXldKTtcbiAgICAgIGlmIChsZWFmcy5maW5kKGxlYWYgPT4gbGVhZltsb2NrZWRLZXldKSAmJiBvblByZXZlbnREZWxldGUpIHtcbiAgICAgICAgb25QcmV2ZW50RGVsZXRlKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnNldFN0YXRlKHsgc2hvd0RlbGV0ZUNvbmZpcm1hdGlvbjogdHJ1ZSB9KTtcbiAgfTtcblxuICAvKipcbiAgICogQWRkcyBhIG5ldyBub2RlIHRvIHRoZSByb290IG9mIHRoZSB0cmVlLCBvciB1bmRlciBhIHNlbGVjdGVkIHRyZWUgbm9kZSB1c2luZ1xuICAgKiBBRERfQ0hJTERSRU4gYWN0aW9uXG4gICAqIEBwYXJhbSBkYXRhIC0gZGF0YSB0byBiZSBhZGRlZFxuICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICovXG4gIG9uQWRkTmV3Q2xpY2sgPSAoZGF0YSwgY2FsbGJhY2spID0+IHtcbiAgICBjb25zdCB7IG9uQ2hhbmdlLCB0cmVlRGF0YSwgaWRLZXkgfSA9IHRoaXMucHJvcHM7XG4gICAgbGV0IG5ld0l0ZW1zID0gdHJlZURhdGEuc2xpY2UoKTtcblxuICAgIC8vIElmIG5vIHRyZWUgbm9kZSBpcyBzZWxlY3RlZCwgd2UnbGwgcGxhY2UgdGhlIG5ldyBpdGVtIHRvIHRoZSByb290XG4gICAgLy8gb2YgdGhlIHRyZWVcbiAgICBpZiAoIXRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdKSB7XG4gICAgICBuZXdJdGVtcy5wdXNoKGRhdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBhY3Rpb24gPSB7XG4gICAgICAgIHR5cGU6IFRSRUVfQUNUSU9OUy5BRERfQ0hJTERSRU4sXG4gICAgICAgIGRhdGEsXG4gICAgICB9O1xuICAgICAgbmV3SXRlbXMgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdLCB0cmVlRGF0YSwgYWN0aW9uKTtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkS2V5czogW2RhdGFbaWRLZXldXSB9LCAoKSA9PiB7XG4gICAgICAvLyBJZiB0aGUgcGFyZW50IGlzIG5vdCB5ZXQgZXhwYW5kZWQsIHdlIHdpbGwgZXhwYW5kIGl0IG5vd1xuICAgICAgY29uc3QgcGFyZW50ID0gdGhpcy5nZXRUcmVlSXRlbShkYXRhW2lkS2V5XSwgdHJlZURhdGEsIHRydWUpIHx8IHt9O1xuICAgICAgdGhpcy5leHBhbmRQYXJlbnQocGFyZW50W2lkS2V5XSk7XG5cbiAgICAgIGlmIChvbkNoYW5nZSkgb25DaGFuZ2UobmV3SXRlbXMpO1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9KTtcbiAgfTtcblxuICBvbk1vdmVUb0dyaWRDbGljayA9ICgpID0+IHtcbiAgICB0aGlzLm1vdmVJdGVtVG9HcmlkKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIENhbGxzIG9uQ2hhbmdlIGNhbGxiYWNrIHdoZW5ldmVyIHVzZXIgcmVvcmRlcnMgdHJlZSBpdGVtcyB1c2luZyBvcmRlcmluZyBhcnJvd3NcbiAgICogQHBhcmFtIGl0ZW1zXG4gICAqL1xuICBvbk9yZGVyQ2xpY2sgPSAoaXRlbXMpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKGl0ZW1zKTtcbiAgfTtcblxuICAvKipcbiAgICogQWRkcyBzZWxlY3RlZCBncmlkIGl0ZW1zIHRvIHRoZSBjaG9zZW4gdHJlZSBub2RlIHVzaW5nIEFERF9DSElMRFJFTiBhY3Rpb25cbiAgICovXG4gIG9uTW92ZVRvVHJlZUNsaWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIG9uQ2hhbmdlLCBzZWxlY3RlZEdyaWRJdGVtcywgZ3JpZERhdGEsIHRyZWVEYXRhLCBpZEtleSxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzZWxlY3RlZElkID0gdGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF07XG5cbiAgICBjb25zdCBhY3Rpb24gPSB7XG4gICAgICB0eXBlOiBUUkVFX0FDVElPTlMuQUREX0NISUxEUkVOLFxuICAgICAgZGF0YTogZ3JpZERhdGEuZmlsdGVyKGkgPT4gc2VsZWN0ZWRHcmlkSXRlbXMuaW5jbHVkZXMoaS5nZXQoaWRLZXkpKSkudG9KUygpLFxuICAgIH07XG4gICAgY29uc3QgbmV3SXRlbXMgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKHNlbGVjdGVkSWQsIHRyZWVEYXRhLCBhY3Rpb24pO1xuICAgIGNvbnN0IG5ld0dyaWRJdGVtcyA9IGdyaWREYXRhLmZpbHRlcihpdGVtID0+ICFzZWxlY3RlZEdyaWRJdGVtcy5pbmNsdWRlcyhpdGVtLmdldChpZEtleSkpKTtcblxuICAgIHRoaXMuZXhwYW5kUGFyZW50KHNlbGVjdGVkSWQsIHRydWUpO1xuICAgIHRoaXMuc2V0RGF0YVRvR3JpZChuZXdHcmlkSXRlbXMsIHRydWUpO1xuICAgIGlmIChvbkNoYW5nZSkgb25DaGFuZ2UobmV3SXRlbXMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZW5hbWVzIHRoZSBjaG9zZW4gdHJlZSBub2RlIHVzaW5nIGEgUkVOQU1FX1BBUkVOVCBhY3Rpb25cbiAgICogQHBhcmFtIHZhbHVlXG4gICAqL1xuICBvbklucHV0Q2hhbmdlID0gKHZhbHVlKSA9PiB7XG4gICAgY29uc3QgeyB0cmVlRGF0YSwgb25DaGFuZ2UgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgYWN0aW9uID0ge1xuICAgICAgdHlwZTogVFJFRV9BQ1RJT05TLlJFTkFNRV9QQVJFTlQsXG4gICAgICBkYXRhOiB2YWx1ZSxcbiAgICB9O1xuICAgIGNvbnN0IG5ld0l0ZW1zID0gdGhpcy5nZXRVcGRhdGVkVHJlZSh0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXSwgdHJlZURhdGEsIGFjdGlvbik7XG4gICAgaWYgKG9uQ2hhbmdlKSBvbkNoYW5nZShuZXdJdGVtcyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEZpcmVkIG9uIGV4cGFuZFxuICAgKiBAcGFyYW0gaWRzXG4gICAqL1xuICBvbkV4cGFuZCA9IChpZHMpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGV4cGFuZGVkS2V5czogaWRzLFxuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHVwZGF0ZWQgdHJlZSBpdGVtcy5cbiAgICogQHBhcmFtIGlkIC0gdGFyZ2V0IGl0ZW1cbiAgICogQHBhcmFtIGFycmF5IC0gYXJyYXkgd2hlcmUgdGFyZ2V0IGl0ZW0gaXMgYmVpbmcgc2VhcmNoZWRcbiAgICogQHBhcmFtIGFjdGlvbiAtIGFjdGlvbiB0byBiZSBwZXJmb3JtZWQge3R5cGUsIGRhdGF9XG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgZ2V0VXBkYXRlZFRyZWUgPSAoaWQsIGFycmF5ID0gdGhpcy5wcm9wcy50cmVlRGF0YSwgYWN0aW9uKSA9PiB7XG4gICAgaWYgKHRoaXMuaXNTZWxlY3RlZERpc2FibGVkKCkpIHJldHVybiBhcnJheTtcblxuICAgIGxldCBmb3VuZCA9IGZhbHNlO1xuICAgIGNvbnN0IHsgaWRLZXksIGNoaWxkS2V5LCB2YWx1ZUtleSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBuZXdJdGVtcyA9IGFycmF5LnNsaWNlKCk7XG4gICAgY29uc3QgcmVtb3ZlQWN0aW9ucyA9IFtUUkVFX0FDVElPTlMuTU9WRV9MRUFGLCBUUkVFX0FDVElPTlMuREVMRVRFX1BBUkVOVF07XG5cbiAgICAvLyBJZiBkZWxldGVkIHBhcmVudCBpdGVtIGlzIGluIHRoZSByb290IG5vZGVcbiAgICBpZiAoYWN0aW9uLnR5cGUgPT09IFRSRUVfQUNUSU9OUy5ERUxFVEVfUEFSRU5UKSB7XG4gICAgICBjb25zdCByb290SXRlbSA9IGFycmF5LmZpbmQoaXRlbSA9PiBpdGVtW2lkS2V5XSA9PT0gaWQpO1xuICAgICAgaWYgKHJvb3RJdGVtKSB7XG4gICAgICAgIGlmIChyb290SXRlbVtjaGlsZEtleV0ubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5zZXREYXRhVG9HcmlkKGZyb21KUyh0aGlzLmdldEFsbExlYWZzKHJvb3RJdGVtW2NoaWxkS2V5XSkpKTtcbiAgICAgICAgICB0aGlzLmRlc2VsZWN0SXRlbSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXdJdGVtcy5maWx0ZXIoaXRlbSA9PiBpdGVtW2lkS2V5XSAhPT0gaWQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmV3SXRlbXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSBuZXdJdGVtc1tpXTtcbiAgICAgIGlmIChyZW1vdmVBY3Rpb25zLmluY2x1ZGVzKGFjdGlvbi50eXBlKSAmJiBpdGVtW2NoaWxkS2V5XSAmJiAhZm91bmQpIHtcbiAgICAgICAgZm91bmQgPSAhIWl0ZW1bY2hpbGRLZXldLmZpbmQoY2hpbGQgPT4gY2hpbGRbaWRLZXldID09PSBpZCk7XG4gICAgICAgIGlmIChmb3VuZCkge1xuICAgICAgICAgIC8vIFdoZW4gcmVtb3ZpbmcgYW4gaXRlbSB3ZSBtdXN0IGZpcnN0IGZpbmQgaXRzIHBhcmVudCBhbmQgYWx0ZXIgaXRzIGNoaWxkcmVuIGFycmF5XG4gICAgICAgICAgaWYgKGFjdGlvbi50eXBlID09PSBUUkVFX0FDVElPTlMuTU9WRV9MRUFGKSB7XG4gICAgICAgICAgICBpdGVtW2NoaWxkS2V5XSA9IGl0ZW1bY2hpbGRLZXldLmZpbHRlcihjaGlsZCA9PiBjaGlsZFtpZEtleV0gIT09IGlkKTtcbiAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RJdGVtKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChhY3Rpb24udHlwZSA9PT0gVFJFRV9BQ1RJT05TLkRFTEVURV9QQVJFTlQpIHtcbiAgICAgICAgICAgIC8vIHdlIG11c3QgZmlyc3QgZmlsdGVyIHRoZSBjaGlsZHJlbiwgc28gdGhhdCB3ZSB3b24ndCBnZXQgbGVhZnMgZnJvbVxuICAgICAgICAgICAgLy8gb3RoZXIgY2hpbGQgYnJhbmNoZXNcbiAgICAgICAgICAgIGNvbnN0IGZpbHRlcmVkQ2hpbGRyZW4gPSBpdGVtW2NoaWxkS2V5XS5maWx0ZXIoY2hpbGRJdGVtID0+IGNoaWxkSXRlbVtpZEtleV0gPT09IGlkKTtcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YVRvR3JpZChmcm9tSlModGhpcy5nZXRBbGxMZWFmcyhmaWx0ZXJlZENoaWxkcmVuKSkpO1xuICAgICAgICAgICAgdGhpcy5kZXNlbGVjdEl0ZW0oKTtcbiAgICAgICAgICAgIGl0ZW1bY2hpbGRLZXldID0gaXRlbVtjaGlsZEtleV0uZmlsdGVyKGNoaWxkSXRlbSA9PiBjaGlsZEl0ZW1baWRLZXldICE9PSBpZCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtW2lkS2V5XSA9PT0gaWQgJiYgIWZvdW5kKSB7XG4gICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICAgIGNhc2UgVFJFRV9BQ1RJT05TLkFERF9DSElMRFJFTjpcbiAgICAgICAgICAgIGl0ZW1bY2hpbGRLZXldID0gKGl0ZW1bY2hpbGRLZXldIHx8IFtdKS5jb25jYXQoYWN0aW9uLmRhdGEpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBUUkVFX0FDVElPTlMuUkVOQU1FX1BBUkVOVDpcbiAgICAgICAgICAgIGl0ZW1bdmFsdWVLZXldID0gYWN0aW9uLmRhdGE7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQWN0aW9uIHR5cGUgaXMgdW5kZWZpbmVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVtjaGlsZEtleV0gJiYgIWZvdW5kKSBmb3VuZCA9IHRoaXMuZ2V0VXBkYXRlZFRyZWUoaWQsIGl0ZW1bY2hpbGRLZXldLCBhY3Rpb24pO1xuICAgIH1cblxuICAgIGlmICghZm91bmQpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gbmV3SXRlbXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybnMgcmVjdXJzaXZlbHkgYWxsIGxlYWYgaXRlbXMgZnJvbSBhIGdpdmVuIGFycmF5XG4gICAqIEBwYXJhbSBhcnJheVxuICAgKiBAcGFyYW0gYWxyZWFkeUZvdW5kICh1c2VkIHJlY3Vyc2l2ZWx5KVxuICAgKi9cbiAgZ2V0QWxsTGVhZnMgPSAoYXJyYXksIGFscmVhZHlGb3VuZCA9IFtdKSA9PiB7XG4gICAgY29uc3QgeyBjaGlsZEtleSB9ID0gdGhpcy5wcm9wcztcbiAgICBsZXQgbGVhZnMgPSBhbHJlYWR5Rm91bmQ7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBpdGVtID0gYXJyYXlbaV07XG4gICAgICBpZiAoaXRlbVtjaGlsZEtleV0pIHtcbiAgICAgICAgbGVhZnMgPSB0aGlzLmdldEFsbExlYWZzKGl0ZW1bY2hpbGRLZXldLCBhbHJlYWR5Rm91bmQpO1xuICAgICAgfVxuICAgICAgaWYgKCFpdGVtW2NoaWxkS2V5XSkgbGVhZnMucHVzaChpdGVtKTtcbiAgICB9XG4gICAgcmV0dXJuIGxlYWZzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgdHJlZSBpdGVtIGJ5IElEXG4gICAqIEBwYXJhbSBpZFxuICAgKiBAcGFyYW0gYXJyYXlcbiAgICogQHBhcmFtIHJldHVyblBhcmVudCAtIHJldHVybiBpdGVtJ3MgcGFyZW50IGluc3RlYWQgb2YgdGhlIGl0ZW1cbiAgICogQHBhcmFtIHBhcmVudCAtIHBhcmVudCBpdGVtICh1c2VkIHJlY3Vyc2l2ZWx5KVxuICAgKiBAcmV0dXJucyB7e319XG4gICAqL1xuICBnZXRUcmVlSXRlbSA9IChpZCwgYXJyYXkgPSB0aGlzLnByb3BzLnRyZWVEYXRhLCByZXR1cm5QYXJlbnQgPSBmYWxzZSwgcGFyZW50ID0gbnVsbCkgPT4ge1xuICAgIGNvbnN0IHsgY2hpbGRLZXksIGlkS2V5IH0gPSB0aGlzLnByb3BzO1xuICAgIGxldCBmb3VuZCA9IGFycmF5LmZpbmQoaXRlbSA9PiBpdGVtW2lkS2V5XSA9PT0gaWQpO1xuXG4gICAgaWYgKGZvdW5kICYmIHJldHVyblBhcmVudCkgZm91bmQgPSBwYXJlbnQ7XG5cbiAgICBpZiAoIWZvdW5kKSB7XG4gICAgICBhcnJheS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGlmIChpdGVtW2NoaWxkS2V5XSAmJiAhZm91bmQpIHtcbiAgICAgICAgICBmb3VuZCA9IHRoaXMuZ2V0VHJlZUl0ZW0oaWQsIGl0ZW1bY2hpbGRLZXldLCByZXR1cm5QYXJlbnQsIGl0ZW0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGZvdW5kO1xuICB9O1xuXG4gIC8qKlxuICAgKiBHZXQgYWRqYWNlbnQgaXRlbSAoaWQpIGluIHBhcmVudCBhcnJheS4gVXNlZCB3aGVuIG1vdmluZyBpdGVtcyBmcm9tIHRyZWVcbiAgICogdG8gZ3JpZC9kZWxldGluZyBhbiBpdGVtXG4gICAqIEBwYXJhbSBpZFxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIGdldEFkamFjZW50SXRlbSA9IChpZCkgPT4ge1xuICAgIGlmICghaWQpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IHsgY2hpbGRLZXksIGlkS2V5LCB0cmVlRGF0YSB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IGdldEFkamFjZW50SXRlbUlkID0gKHBhcmVudCkgPT4ge1xuICAgICAgY29uc3QgcGFyZW50QXJyID0gQXJyYXkuaXNBcnJheShwYXJlbnQpID8gcGFyZW50IDogcGFyZW50W2NoaWxkS2V5XTtcbiAgICAgIGNvbnN0IGluZGV4ID0gcGFyZW50QXJyLmZpbmRJbmRleChjaGlsZCA9PiBjaGlsZFtpZEtleV0gPT09IGlkKTtcbiAgICAgIGxldCBhZGphY2VudEl0ZW0gPSBwYXJlbnRBcnJbaW5kZXggKyAxXTtcbiAgICAgIGlmICghYWRqYWNlbnRJdGVtKSBhZGphY2VudEl0ZW0gPSBwYXJlbnRBcnJbaW5kZXggLSAxXTtcbiAgICAgIGlmICghYWRqYWNlbnRJdGVtICYmICFBcnJheS5pc0FycmF5KHBhcmVudCkpIGFkamFjZW50SXRlbSA9IHBhcmVudDtcbiAgICAgIGlmICghYWRqYWNlbnRJdGVtKSByZXR1cm4gbnVsbDtcblxuICAgICAgcmV0dXJuIGFkamFjZW50SXRlbVtpZEtleV07XG4gICAgfTtcblxuICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuZ2V0VHJlZUl0ZW0oaWQsIHRoaXMucHJvcHMudHJlZURhdGEsIHRydWUpO1xuICAgIHJldHVybiBwYXJlbnQgPyBnZXRBZGphY2VudEl0ZW1JZChwYXJlbnQpIDogZ2V0QWRqYWNlbnRJdGVtSWQodHJlZURhdGEpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBcHBlbmRzIHByb3ZpZGVkIGl0ZW1zIHRvIHRoZSBncmlkXG4gICAqIEBwYXJhbSBpdGVtcyAtIGltbXV0YWJsZSBhcnJheSBvZiBpdGVtcyB0byBiZSBhcHBlbmRlZCB0byBncmlkXG4gICAqIEBwYXJhbSBzZXROZXdJdGVtcyAtIHNldCBjb21wbGV0ZWx5IGEgbmV3IGFycmF5IG9mIGl0ZW1zXG4gICAqL1xuICBzZXREYXRhVG9HcmlkID0gKGl0ZW1zLCBzZXROZXdJdGVtcyA9IGZhbHNlKSA9PiB7XG4gICAgbGV0IGRhdGEgPSBMaXN0KCk7XG4gICAgY29uc3Qge1xuICAgICAgZ3JpZCwgZ3JpZENvbHVtbnMsIGdyaWREYXRhLCBzb3J0S2V5LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghc2V0TmV3SXRlbXMpIGRhdGEgPSBncmlkRGF0YS5zbGljZSgpO1xuICAgIGxldCBuZXdHcmlkSXRlbXMgPSBkYXRhLmNvbmNhdChpdGVtcyk7XG4gICAgaWYgKHNvcnRLZXkpIG5ld0dyaWRJdGVtcyA9IG5ld0dyaWRJdGVtcy5zb3J0QnkoaSA9PiBpLmdldChzb3J0S2V5KSk7XG5cbiAgICB0aGlzLnByb3BzLnNldERhdGEoZ3JpZCwgZ3JpZENvbHVtbnMsIG5ld0dyaWRJdGVtcyk7XG4gICAgdGhpcy5wcm9wcy5jbGVhclNlbGVjdGVkSXRlbXMoZ3JpZCk7XG4gIH07XG5cbiAgY291bnRQYXJlbnRzID0gKHNlbGVjdGVkS2V5LCBjb3VudGVyKSA9PiB7XG4gICAgY29uc3QgeyBpZEtleSwgdHJlZURhdGEgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgbmV3UGFyZW50ID0gdGhpcy5nZXRUcmVlSXRlbShzZWxlY3RlZEtleSwgdHJlZURhdGEsIHRydWUpO1xuICAgIGlmIChuZXdQYXJlbnQpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvdW50UGFyZW50cyhuZXdQYXJlbnRbaWRLZXldLCBjb3VudGVyICsgMSk7XG4gICAgfVxuICAgIHJldHVybiBjb3VudGVyO1xuICB9XG5cbiAgaGFzTGV2ZWxSZWFjaGVkTWF4ID0gKHNlbGVjdGVkTGV2ZWwpID0+IHtcbiAgICBjb25zdCB7IG1heExldmVsIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghc2VsZWN0ZWRMZXZlbCB8fCAhbWF4TGV2ZWwpIHJldHVybiBmYWxzZTtcbiAgICBjb25zdCBudW1iZXJPZlBhcmVudHMgPSB0aGlzLmNvdW50UGFyZW50cyhzZWxlY3RlZExldmVsLCAwKTtcbiAgICByZXR1cm4gbnVtYmVyT2ZQYXJlbnRzID49IG1heExldmVsO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyB3aGV0aGVyIG9yIG5vdCBnaXZlbiBub2RlIGlzIGRpc2FibGVkXG4gICAqL1xuICBpc1NlbGVjdGVkRGlzYWJsZWQgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBsb2NrZWRLZXkgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgaXRlbSA9ICEhdGhpcy5nZXRUcmVlSXRlbSh0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXSk7XG4gICAgaWYgKCFpdGVtKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIGl0ZW1bbG9ja2VkS2V5XTtcbiAgfTtcblxuICAvKipcbiAgICogUmVtb3ZlcyB0aGUgY2hvc2VuIGl0ZW0gZnJvbSBhIHRyZWUgYW5kIHVwZGF0ZXMgdGhlIGdyaWQgdXNpbmcgTU9WRV9MRUFGXG4gICAqIGFjdGlvblxuICAgKi9cbiAgbW92ZUl0ZW1Ub0dyaWQgPSAoKSA9PiB7XG4gICAgY29uc3QgeyB0cmVlRGF0YSwgb25DaGFuZ2UgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgc2VsZWN0ZWRLZXkgPSB0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXTtcbiAgICBjb25zdCBhY3Rpb24gPSB7XG4gICAgICB0eXBlOiBUUkVFX0FDVElPTlMuTU9WRV9MRUFGLFxuICAgICAgZGF0YTogdGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF0sXG4gICAgfTtcbiAgICBjb25zdCBuZXh0U2VsZWN0ZWRLZXkgPSB0aGlzLmdldEFkamFjZW50SXRlbShzZWxlY3RlZEtleSk7XG4gICAgY29uc3QgbmV3R3JpZEl0ZW1zID0gZnJvbUpTKFt0aGlzLmdldFRyZWVJdGVtKHNlbGVjdGVkS2V5KV0pO1xuICAgIGNvbnN0IG5ld0l0ZW1zID0gdGhpcy5nZXRVcGRhdGVkVHJlZShzZWxlY3RlZEtleSwgdHJlZURhdGEsIGFjdGlvbik7XG5cbiAgICB0aGlzLnNldERhdGFUb0dyaWQobmV3R3JpZEl0ZW1zKTtcbiAgICBpZiAob25DaGFuZ2UpIG9uQ2hhbmdlKG5ld0l0ZW1zKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNlbGVjdGVkS2V5czogW25leHRTZWxlY3RlZEtleV0sXG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEV4cGFuZHMgYSBwYXJlbnRcbiAgICogQHBhcmFtIHBhcmVudElkXG4gICAqL1xuICBleHBhbmRQYXJlbnQgPSAocGFyZW50SWQpID0+IHtcbiAgICBpZiAocGFyZW50SWQgJiYgIXRoaXMuc3RhdGUuZXhwYW5kZWRLZXlzLmZpbmQoZXhwYW5kZWRJZCA9PiBleHBhbmRlZElkID09PSBwYXJlbnRJZCkpIHtcbiAgICAgIGNvbnN0IG5ld0V4cGFuZGVkS2V5cyA9IHRoaXMuc3RhdGUuZXhwYW5kZWRLZXlzLnNsaWNlKCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgIG5ld0V4cGFuZGVkS2V5cy5wdXNoKHBhcmVudElkKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBleHBhbmRlZEtleXM6IG5ld0V4cGFuZGVkS2V5cyB9KTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIENsb3NlcyBkZWxldGUgY29uZmlybWF0aW9uIGRpYWxvZ1xuICAgKi9cbiAgY2xvc2VEZWxldGVDb25maXJtYXRpb25EaWFsb2cgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNob3dEZWxldGVDb25maXJtYXRpb246IGZhbHNlIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBEZWxldGVzIGEgcGFyZW50IG5vZGVcbiAgICovXG4gIGRlbGV0ZVBhcmVudCA9ICgpID0+IHtcbiAgICBjb25zdCB7IG9uQ2hhbmdlLCB0cmVlRGF0YSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzZWxlY3RlZEtleSA9IHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdO1xuICAgIGNvbnN0IGFjdGlvbiA9IHtcbiAgICAgIHR5cGU6IFRSRUVfQUNUSU9OUy5ERUxFVEVfUEFSRU5ULFxuICAgIH07XG4gICAgY29uc3QgbmV4dFNlbGVjdGVkS2V5ID0gdGhpcy5nZXRBZGphY2VudEl0ZW0oc2VsZWN0ZWRLZXkpO1xuICAgIGNvbnN0IG5ld0l0ZW1zID0gdGhpcy5nZXRVcGRhdGVkVHJlZShzZWxlY3RlZEtleSwgdHJlZURhdGEsIGFjdGlvbik7XG4gICAgaWYgKG9uQ2hhbmdlKSBvbkNoYW5nZShuZXdJdGVtcyk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzZWxlY3RlZEtleXM6IFtuZXh0U2VsZWN0ZWRLZXldLFxuICAgICAgc2hvd0RlbGV0ZUNvbmZpcm1hdGlvbjogZmFsc2UsXG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIERlc2VsZWN0cyBhbiBpdGVtLCBpZiBpdCBpcyBlLmcuIHJlbW92ZWRcbiAgICovXG4gIGRlc2VsZWN0SXRlbSA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRLZXlzOiBbXSB9KTtcbiAgfTtcblxuICByZW5kZXJIZWFkZXJSaWdodCA9IHRyYW5zbGF0aW9ucyA9PiAoXG4gICAgPENvbnRyb2xCYXJcbiAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgb25BZGROZXdDbGljaz17dGhpcy5vbkFkZE5ld0NsaWNrfVxuICAgICAgb25EZWxldGVDbGljaz17dGhpcy5vbkRlbGV0ZUNsaWNrfVxuICAgICAgb25JbnB1dENoYW5nZT17dGhpcy5vbklucHV0Q2hhbmdlfVxuICAgICAgc2VsZWN0ZWRUcmVlSXRlbT17dGhpcy5nZXRUcmVlSXRlbSh0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXSl9XG4gICAgICBoZWlnaHQ9e0FDVElPTl9CQVJfQ09OVEFJTkVSX0hFSUdIVH1cbiAgICAgIHRyYW5zbGF0aW9ucz17dHJhbnNsYXRpb25zfVxuICAgICAgaXNBZGREaXNhYmxlZD17dGhpcy5oYXNMZXZlbFJlYWNoZWRNYXgodGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF0pfVxuICAgIC8+XG4gICk7XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHZhbHVlS2V5LFxuICAgICAgbGVhZlZhbHVlS2V5LFxuICAgICAgaWRLZXksXG4gICAgICB0cmVlRGF0YSxcbiAgICAgIGdyaWQsXG4gICAgICBncmlkQ29sdW1ucyxcbiAgICAgIGNsYXNzTmFtZSxcbiAgICAgIHRyYW5zbGF0aW9ucyxcbiAgICAgIGNoaWxkS2V5LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgbWVyZ2VkR3JpZCA9IE9iamVjdC5hc3NpZ24oe30sIGdyaWQsIHsgZGVmYXVsdFNob3dGaWx0ZXJpbmdSb3c6IHRydWUgfSk7XG4gICAgY29uc3QgbWVyZ2VkVHJhbnNsYXRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdFRyYW5zbGF0aW9ucywgdHJhbnNsYXRpb25zKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8UmVhY3QuRnJhZ21lbnQ+XG4gICAgICAgIDxDb250YWluZXIgY2xhc3NOYW1lPXtjbGFzc05hbWV9PlxuICAgICAgICAgIDxUcmVlQ29udGFpbmVyPlxuICAgICAgICAgICAgPFRyZWVDb21wb25lbnRcbiAgICAgICAgICAgICAgdHJlZURhdGE9e3RyZWVEYXRhfVxuICAgICAgICAgICAgICBkYXRhTG9va1VwS2V5PXtpZEtleX1cbiAgICAgICAgICAgICAgZGF0YUxvb2tVcFZhbHVlPXt2YWx1ZUtleX1cbiAgICAgICAgICAgICAgZGF0YUxvb2tVcExlYWZWYWx1ZT17bGVhZlZhbHVlS2V5fVxuICAgICAgICAgICAgICBkYXRhTG9va1VwQ2hpbGRyZW49e2NoaWxkS2V5fVxuICAgICAgICAgICAgICBvblNlbGVjdD17dGhpcy5vblRyZWVJdGVtU2VsZWN0fVxuICAgICAgICAgICAgICBvbkV4cGFuZD17dGhpcy5vbkV4cGFuZH1cbiAgICAgICAgICAgICAgY2hlY2thYmxlPXtmYWxzZX1cbiAgICAgICAgICAgICAgc2VsZWN0ZWRLZXlzPXt0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c31cbiAgICAgICAgICAgICAgZXhwYW5kZWRLZXlzPXt0aGlzLnN0YXRlLmV4cGFuZGVkS2V5c31cbiAgICAgICAgICAgICAgb25PcmRlckJ1dHRvbkNsaWNrPXt0aGlzLm9uT3JkZXJDbGlja31cbiAgICAgICAgICAgICAgdGl0bGU9e21lcmdlZFRyYW5zbGF0aW9ucy50cmVlVGl0bGV9XG4gICAgICAgICAgICAgIHNlbGVjdGFibGVcbiAgICAgICAgICAgICAgc2hvd09yZGVyaW5nQXJyb3dzXG4gICAgICAgICAgICAgIHNob3dFeHBhbmRBbGxcbiAgICAgICAgICAgICAgaGVhZGVyUmlnaHQ9e3RoaXMucmVuZGVySGVhZGVyUmlnaHQobWVyZ2VkVHJhbnNsYXRpb25zKX1cbiAgICAgICAgICAgICAgaGFuZGxlRXhwYW5kZWRLZXlzTWFudWFsbHlcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9UcmVlQ29udGFpbmVyPlxuICAgICAgICAgIDxBcnJvd0NvbnRyb2xzXG4gICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgIHNlbGVjdGVkVHJlZUl0ZW09e3RoaXMuZ2V0VHJlZUl0ZW0odGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF0pfVxuICAgICAgICAgICAgb25Nb3ZlVG9UcmVlQ2xpY2s9e3RoaXMub25Nb3ZlVG9UcmVlQ2xpY2t9XG4gICAgICAgICAgICBvbk1vdmVUb0dyaWRDbGljaz17dGhpcy5vbk1vdmVUb0dyaWRDbGlja31cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxHcmlkXG4gICAgICAgICAgICBncmlkPXttZXJnZWRHcmlkfVxuICAgICAgICAgICAgY29sdW1ucz17Z3JpZENvbHVtbnN9XG4gICAgICAgICAgICBtdWx0aVNlbGVjdFxuICAgICAgICAgICAgZmlsdGVyaW5nXG4gICAgICAgICAgICByb3dTZWxlY3RDaGVja2JveENvbHVtblxuICAgICAgICAgICAgZ3JpZEhlYWRlcj17PFByaW1pdGl2ZS5TdWJ0aXRsZT57bWVyZ2VkVHJhbnNsYXRpb25zLmdyaWRUaXRsZX08L1ByaW1pdGl2ZS5TdWJ0aXRsZT59XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9Db250YWluZXI+XG4gICAgICAgIHt0aGlzLnN0YXRlLnNob3dEZWxldGVDb25maXJtYXRpb24gJiYgKFxuICAgICAgICAgIDxDb25maXJtRGlhbG9nXG4gICAgICAgICAgICB0cmFuc2xhdGlvbnM9e21lcmdlZFRyYW5zbGF0aW9ucy5kZWxldGVDb25maXJtRGlhbG9nfVxuICAgICAgICAgICAgY29uZmlybUNhbGxiYWNrPXt0aGlzLmRlbGV0ZVBhcmVudH1cbiAgICAgICAgICAgIGNhbmNlbENhbGxiYWNrPXt0aGlzLmNsb3NlRGVsZXRlQ29uZmlybWF0aW9uRGlhbG9nfVxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG4gICAgICA8L1JlYWN0LkZyYWdtZW50PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==