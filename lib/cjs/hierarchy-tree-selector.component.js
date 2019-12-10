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

    _defineProperty(_assertThisInitialized(_this), "isSelectedDisabled", function () {
      var lockedKey = _this.props.lockedKey;
      var item = !!_this.getTreeItem(_this.state.selectedKeys[0]);
      if (!item) return false;
      return item[lockedKey];
    });

    _defineProperty(_assertThisInitialized(_this), "moveItemToGrid", function () {
      var _this$props10 = _this.props,
          treeData = _this$props10.treeData,
          onChange = _this$props10.onChange;
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
      var _this$props11 = _this.props,
          onChange = _this$props11.onChange,
          treeData = _this$props11.treeData;
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
        translations: translations
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
    var _this$props12 = this.props,
        valueKey = _this$props12.valueKey,
        leafValueKey = _this$props12.leafValueKey,
        idKey = _this$props12.idKey,
        treeData = _this$props12.treeData,
        grid = _this$props12.grid,
        gridColumns = _this$props12.gridColumns,
        className = _this$props12.className,
        translations = _this$props12.translations,
        childKey = _this$props12.childKey;
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
  singleRoot: true
}), _temp)) || _class);
exports["default"] = HierarchyTreeSelector;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIkFDVElPTl9CQVJfQ09OVEFJTkVSX0hFSUdIVCIsIlRSRUVfQUNUSU9OUyIsIkFERF9DSElMRFJFTiIsIk1PVkVfTEVBRiIsIlJFTkFNRV9QQVJFTlQiLCJERUxFVEVfUEFSRU5UIiwiR3JpZCIsIkRhdGFncmlkIiwiQ29udGFpbmVyIiwic3R5bGVkIiwiZGl2IiwiVHJlZUNvbnRhaW5lciIsInByb3BzIiwidGhlbWUiLCJndXR0ZXJXaWR0aCIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsInNldERhdGEiLCJEYXRhZ3JpZEFjdGlvbnMiLCJjbGVhclNlbGVjdGVkSXRlbXMiLCJtYXBTdGF0ZVRvUHJvcHMiLCJzdGF0ZSIsImdyaWRJZCIsImdyaWQiLCJpZCIsInNlbGVjdGVkR3JpZEl0ZW1zIiwiZGF0YWdyaWQiLCJnZXRJbiIsImdyaWREYXRhIiwiSGllcmFyY2h5VHJlZVNlbGVjdG9yIiwic2VsZWN0ZWRLZXlzIiwib25TZWxlY3QiLCJsb2NrZWRLZXkiLCJzZWxlY3RlZEl0ZW0iLCJnZXRUcmVlSXRlbSIsInNldFN0YXRlIiwiY2hpbGRLZXkiLCJvblByZXZlbnREZWxldGUiLCJpdGVtIiwibW92ZUl0ZW1Ub0dyaWQiLCJsZWFmcyIsImdldEFsbExlYWZzIiwiZmluZCIsImxlYWYiLCJzaG93RGVsZXRlQ29uZmlybWF0aW9uIiwiZGF0YSIsImNhbGxiYWNrIiwib25DaGFuZ2UiLCJ0cmVlRGF0YSIsImlkS2V5IiwibmV3SXRlbXMiLCJzbGljZSIsInB1c2giLCJhY3Rpb24iLCJ0eXBlIiwiZ2V0VXBkYXRlZFRyZWUiLCJwYXJlbnQiLCJleHBhbmRQYXJlbnQiLCJpdGVtcyIsInNlbGVjdGVkSWQiLCJmaWx0ZXIiLCJpIiwiaW5jbHVkZXMiLCJnZXQiLCJ0b0pTIiwibmV3R3JpZEl0ZW1zIiwic2V0RGF0YVRvR3JpZCIsInZhbHVlIiwiaWRzIiwiZXhwYW5kZWRLZXlzIiwiYXJyYXkiLCJpc1NlbGVjdGVkRGlzYWJsZWQiLCJmb3VuZCIsInZhbHVlS2V5IiwicmVtb3ZlQWN0aW9ucyIsInJvb3RJdGVtIiwibGVuZ3RoIiwiZGVzZWxlY3RJdGVtIiwiY2hpbGQiLCJmaWx0ZXJlZENoaWxkcmVuIiwiY2hpbGRJdGVtIiwiY29uY2F0IiwiVHlwZUVycm9yIiwiYWxyZWFkeUZvdW5kIiwicmV0dXJuUGFyZW50IiwiZm9yRWFjaCIsImdldEFkamFjZW50SXRlbUlkIiwicGFyZW50QXJyIiwiQXJyYXkiLCJpc0FycmF5IiwiaW5kZXgiLCJmaW5kSW5kZXgiLCJhZGphY2VudEl0ZW0iLCJzZXROZXdJdGVtcyIsImdyaWRDb2x1bW5zIiwic29ydEtleSIsInNvcnRCeSIsInNlbGVjdGVkS2V5IiwibmV4dFNlbGVjdGVkS2V5IiwiZ2V0QWRqYWNlbnRJdGVtIiwicGFyZW50SWQiLCJleHBhbmRlZElkIiwibmV3RXhwYW5kZWRLZXlzIiwidHJhbnNsYXRpb25zIiwib25BZGROZXdDbGljayIsIm9uRGVsZXRlQ2xpY2siLCJvbklucHV0Q2hhbmdlIiwiY29tcG9uZW50RGlkTW91bnQiLCJkZWZhdWx0RXhwYW5kZWRLZXlzIiwib25FeHBhbmQiLCJyZW5kZXIiLCJsZWFmVmFsdWVLZXkiLCJjbGFzc05hbWUiLCJtZXJnZWRHcmlkIiwiT2JqZWN0IiwiYXNzaWduIiwiZGVmYXVsdFNob3dGaWx0ZXJpbmdSb3ciLCJtZXJnZWRUcmFuc2xhdGlvbnMiLCJkZWZhdWx0VHJhbnNsYXRpb25zIiwib25UcmVlSXRlbVNlbGVjdCIsIm9uT3JkZXJDbGljayIsInRyZWVUaXRsZSIsInJlbmRlckhlYWRlclJpZ2h0Iiwib25Nb3ZlVG9UcmVlQ2xpY2siLCJvbk1vdmVUb0dyaWRDbGljayIsImdyaWRUaXRsZSIsImRlbGV0ZUNvbmZpcm1EaWFsb2ciLCJkZWxldGVQYXJlbnQiLCJjbG9zZURlbGV0ZUNvbmZpcm1hdGlvbkRpYWxvZyIsIlJlYWN0IiwiUHVyZUNvbXBvbmVudCIsInVu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TUFBQSxlQUFlLEVBQUUsS0FBS0MsWUFGeEI7QUFHRSxNQUFBLGNBQWMsRUFBRSxLQUFLQztBQUh2QixNQXZDSixDQURGO0FBZ0RELEc7OztFQTllZ0RDLGtCQUFNQyxhLDRDQTJCakM7QUFDcEJqRixFQUFBQSxLQUFLLEVBQUUsSUFEYTtBQUVwQndCLEVBQUFBLFFBQVEsRUFBRSxNQUZVO0FBR3BCckMsRUFBQUEsUUFBUSxFQUFFLFVBSFU7QUFJcEJKLEVBQUFBLFNBQVMsRUFBRW1HLFNBSlM7QUFLcEJwQixFQUFBQSxZQUFZLEVBQUVvQixTQUxNO0FBTXBCcEMsRUFBQUEsT0FBTyxFQUFFb0MsU0FOVztBQU9wQm5GLEVBQUFBLFFBQVEsRUFBRSxFQVBVO0FBUXBCZ0UsRUFBQUEsU0FBUyxFQUFFLEVBUlM7QUFTcEJULEVBQUFBLFlBQVksRUFBRWUsa0NBVE07QUFVcEI5RixFQUFBQSxFQUFFLEVBQUUsZ0JBVmdCO0FBV3BCTyxFQUFBQSxRQUFRLEVBQUVvRyxTQVhVO0FBWXBCcEYsRUFBQUEsUUFBUSxFQUFFb0YsU0FaVTtBQWFwQjlGLEVBQUFBLGVBQWUsRUFBRThGLFNBYkc7QUFjcEJDLEVBQUFBLGdCQUFnQixFQUFFLElBZEU7QUFlcEJ4QixFQUFBQSxtQkFBbUIsRUFBRSxFQWZEO0FBZ0JwQnlCLEVBQUFBLFVBQVUsRUFBRTtBQWhCUSxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRyZWVDb21wb25lbnQgZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtdHJlZS1jb21wb25lbnQnO1xuaW1wb3J0IHsgUHJpbWl0aXZlIH0gZnJvbSAnQG9wdXNjYXBpdGEvb2MtY20tY29tbW9uLWxheW91dHMnO1xuaW1wb3J0IHtcbiAgRGF0YWdyaWQsIGdyaWRTaGFwZSwgZ3JpZENvbHVtblNoYXBlLCBEYXRhZ3JpZEFjdGlvbnMsXG59IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWdyaWQnO1xuaW1wb3J0IENvbmZpcm1EaWFsb2cgZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtY29uZmlybWF0aW9uLWRpYWxvZyc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgeyBMaXN0LCBmcm9tSlMgfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IEltbXV0YWJsZVByb3BUeXBlcyBmcm9tICdyZWFjdC1pbW11dGFibGUtcHJvcHR5cGVzJztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG4vLyBBcHAgaW1wb3J0c1xuaW1wb3J0IENvbnRyb2xCYXIgZnJvbSAnLi9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci1jb250cm9sLWJhci5jb21wb25lbnQnO1xuaW1wb3J0IEFycm93Q29udHJvbHMgZnJvbSAnLi9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci1hcnJvdy1jb250cm9scy5jb21wb25lbnQnO1xuaW1wb3J0IHsgZGVmYXVsdFRyYW5zbGF0aW9ucyB9IGZyb20gJy4vaGllcmFyY2h5LXRyZWUudXRpbHMnO1xuXG5jb25zdCBBQ1RJT05fQkFSX0NPTlRBSU5FUl9IRUlHSFQgPSAnNTRweCc7XG5jb25zdCBUUkVFX0FDVElPTlMgPSB7XG4gIEFERF9DSElMRFJFTjogJ0FERF9DSElMRFJFTicsXG4gIE1PVkVfTEVBRjogJ01PVkVfTEVBRicsXG4gIFJFTkFNRV9QQVJFTlQ6ICdSRU5BTUVfUEFSRU5UJyxcbiAgREVMRVRFX1BBUkVOVDogJ0RFTEVURV9QQVJFTlQnLFxufTtcblxuY29uc3QgR3JpZCA9IHN0eWxlZChEYXRhZ3JpZClgXG4gIGhlaWdodDogMTAwJTtcbiAgJiYmIHtcbiAgICBwYWRkaW5nOiAwO1xuICB9XG5gO1xuXG5jb25zdCBDb250YWluZXIgPSBzdHlsZWQuZGl2YFxuICBkaXNwbGF5OiBmbGV4O1xuICBtaW4taGVpZ2h0OiAzMDBweDtcbiAgPiBkaXYge1xuICAgIHdpZHRoOiA1MCU7XG4gICAgZmxleDogMSAxIDEwMCU7XG4gIH1cbmA7XG5cbmNvbnN0IFRyZWVDb250YWluZXIgPSBzdHlsZWQuZGl2YFxuICBoZWlnaHQ6IDEwMCU7XG4gIC5vYy1zY3JvbGxiYXItY29udGFpbmVyIHtcbiAgICBoZWlnaHQ6IGNhbGMoMTAwJSAtICR7QUNUSU9OX0JBUl9DT05UQUlORVJfSEVJR0hUfSk7XG4gICAgcGFkZGluZzogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5ndXR0ZXJXaWR0aH07XG4gIH1cbiAgLnRyZWUtaGVhZGVyIHtcbiAgICBtaW4taGVpZ2h0OiAke0FDVElPTl9CQVJfQ09OVEFJTkVSX0hFSUdIVH07XG4gICAgLm9yZGVyaW5nLWFycm93cyB7XG4gICAgICBmb250LXdlaWdodDogMjRweDtcbiAgICB9XG4gIH1cbiAgLm9jLXJlYWN0LXRyZWUge1xuICAgIGhlaWdodDogMTAwJTtcbiAgICAucmMtdHJlZS1pY29uRWxlLnJjLXRyZWUtaWNvbl9fY3VzdG9taXplIHtcbiAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgfVxuICB9XG5gO1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSB7XG4gIHNldERhdGE6IERhdGFncmlkQWN0aW9ucy5zZXREYXRhLFxuICBjbGVhclNlbGVjdGVkSXRlbXM6IERhdGFncmlkQWN0aW9ucy5jbGVhclNlbGVjdGVkSXRlbXMsXG59O1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUsIHByb3BzKSA9PiB7XG4gIGNvbnN0IGdyaWRJZCA9IHByb3BzLmdyaWQuaWQ7XG4gIHJldHVybiB7XG4gICAgc2VsZWN0ZWRHcmlkSXRlbXM6IHN0YXRlLmRhdGFncmlkLmdldEluKFtncmlkSWQsICdzZWxlY3RlZEl0ZW1zJ10sIExpc3QoKSksXG4gICAgZ3JpZERhdGE6IHN0YXRlLmRhdGFncmlkLmdldEluKFtncmlkSWQsICdhbGxEYXRhJ10sIExpc3QoKSksXG4gIH07XG59O1xuXG5AY29ubmVjdChcbiAgbWFwU3RhdGVUb1Byb3BzLFxuICBtYXBEaXNwYXRjaFRvUHJvcHMsXG4pXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIaWVyYXJjaHlUcmVlU2VsZWN0b3IgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBpZEtleTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB2YWx1ZUtleTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjaGlsZEtleTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBsb2NrZWRLZXk6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbGVhZlZhbHVlS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHNvcnRLZXk6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdHJlZURhdGE6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zaGFwZSh7fSkpLFxuICAgIGdyaWQ6IGdyaWRTaGFwZS5pc1JlcXVpcmVkLFxuICAgIGdyaWRDb2x1bW5zOiBQcm9wVHlwZXMuYXJyYXlPZihncmlkQ29sdW1uU2hhcGUpLmlzUmVxdWlyZWQsXG4gICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHNldERhdGE6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgY2xlYXJTZWxlY3RlZEl0ZW1zOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHNlbGVjdGVkR3JpZEl0ZW1zOiBJbW11dGFibGVQcm9wVHlwZXMubGlzdC5pc1JlcXVpcmVkLFxuICAgIGdyaWREYXRhOiBJbW11dGFibGVQcm9wVHlwZXMubGlzdC5pc1JlcXVpcmVkLFxuICAgIHRyYW5zbGF0aW9uczogUHJvcFR5cGVzLnNoYXBlKHt9KSxcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkZWZhdWx0RXhwYW5kQWxsOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkZWZhdWx0RXhwYW5kZWRLZXlzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKSxcbiAgICBzaW5nbGVSb290OiBQcm9wVHlwZXMuYm9vbCxcbiAgICAvLyBDYWxsYmFja3NcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uUHJldmVudERlbGV0ZTogUHJvcFR5cGVzLmZ1bmMsXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBpZEtleTogJ2lkJyxcbiAgICB2YWx1ZUtleTogJ25hbWUnLFxuICAgIGNoaWxkS2V5OiAnY2hpbGRyZW4nLFxuICAgIGxvY2tlZEtleTogdW5kZWZpbmVkLFxuICAgIGxlYWZWYWx1ZUtleTogdW5kZWZpbmVkLFxuICAgIHNvcnRLZXk6IHVuZGVmaW5lZCxcbiAgICB0cmVlRGF0YTogW10sXG4gICAgY2xhc3NOYW1lOiAnJyxcbiAgICB0cmFuc2xhdGlvbnM6IGRlZmF1bHRUcmFuc2xhdGlvbnMsXG4gICAgaWQ6ICdoaWVyYXJjaHktdHJlZScsXG4gICAgb25TZWxlY3Q6IHVuZGVmaW5lZCxcbiAgICBvbkNoYW5nZTogdW5kZWZpbmVkLFxuICAgIG9uUHJldmVudERlbGV0ZTogdW5kZWZpbmVkLFxuICAgIGRlZmF1bHRFeHBhbmRBbGw6IHRydWUsXG4gICAgZGVmYXVsdEV4cGFuZGVkS2V5czogW10sXG4gICAgc2luZ2xlUm9vdDogdHJ1ZSxcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgc2VsZWN0ZWRLZXlzOiBbXSxcbiAgICAgIGV4cGFuZGVkS2V5czogW10sXG4gICAgICBzaG93RGVsZXRlQ29uZmlybWF0aW9uOiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgaWYgKHRoaXMucHJvcHMuZGVmYXVsdEV4cGFuZGVkS2V5cy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLm9uRXhwYW5kKHRoaXMucHJvcHMuZGVmYXVsdEV4cGFuZGVkS2V5cyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdHMgYSB0cmVlIGl0ZW1cbiAgICogQHBhcmFtIHNlbGVjdGVkS2V5cyAoYXJyYXkpXG4gICAqL1xuICBvblRyZWVJdGVtU2VsZWN0ID0gKHNlbGVjdGVkS2V5cykgPT4ge1xuICAgIGNvbnN0IHsgb25TZWxlY3QsIGxvY2tlZEtleSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzZWxlY3RlZEl0ZW0gPSB0aGlzLmdldFRyZWVJdGVtKHNlbGVjdGVkS2V5c1swXSk7XG4gICAgaWYgKGxvY2tlZEtleSAmJiBzZWxlY3RlZEl0ZW0gJiYgc2VsZWN0ZWRJdGVtW2xvY2tlZEtleV0pIHJldHVybjtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRLZXlzIH0sICgpID0+IHtcbiAgICAgIGlmIChvblNlbGVjdCkgb25TZWxlY3Qoc2VsZWN0ZWRLZXlzKTtcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogRGlzcGxheXMgYSBjb25maXJtYXRpb24gZGlhbG9nXG4gICAqL1xuICBvbkRlbGV0ZUNsaWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgY2hpbGRLZXksIGxvY2tlZEtleSwgb25QcmV2ZW50RGVsZXRlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmdldFRyZWVJdGVtKHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdKTtcbiAgICAvLyBJZiBpdGVtIGlzIG5vdCBhIHBhcmVudCwgd2Ugd29uJ3Qgc2hvdyB0aGUgZGVsZXRlIGNvbmZpcm1hdGlvbiBkaWFsb2dcbiAgICBpZiAoIWl0ZW1bY2hpbGRLZXldKSB7XG4gICAgICB0aGlzLm1vdmVJdGVtVG9HcmlkKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGxvY2tlZEtleSkge1xuICAgICAgLy8gSWYgaXQgaXMgYSBwYXJlbnQsIHdlIHdhbnQgdG8gY2hlY2sgdGhhdCBpdCBkb2Vzbid0IGNvbnRhaW4gYW55IGxvY2tlZCBpdGVtc1xuICAgICAgY29uc3QgbGVhZnMgPSB0aGlzLmdldEFsbExlYWZzKGl0ZW1bY2hpbGRLZXldKTtcbiAgICAgIGlmIChsZWFmcy5maW5kKGxlYWYgPT4gbGVhZltsb2NrZWRLZXldKSAmJiBvblByZXZlbnREZWxldGUpIHtcbiAgICAgICAgb25QcmV2ZW50RGVsZXRlKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnNldFN0YXRlKHsgc2hvd0RlbGV0ZUNvbmZpcm1hdGlvbjogdHJ1ZSB9KTtcbiAgfTtcblxuICAvKipcbiAgICogQWRkcyBhIG5ldyBub2RlIHRvIHRoZSByb290IG9mIHRoZSB0cmVlLCBvciB1bmRlciBhIHNlbGVjdGVkIHRyZWUgbm9kZSB1c2luZ1xuICAgKiBBRERfQ0hJTERSRU4gYWN0aW9uXG4gICAqIEBwYXJhbSBkYXRhIC0gZGF0YSB0byBiZSBhZGRlZFxuICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICovXG4gIG9uQWRkTmV3Q2xpY2sgPSAoZGF0YSwgY2FsbGJhY2spID0+IHtcbiAgICBjb25zdCB7IG9uQ2hhbmdlLCB0cmVlRGF0YSwgaWRLZXkgfSA9IHRoaXMucHJvcHM7XG4gICAgbGV0IG5ld0l0ZW1zID0gdHJlZURhdGEuc2xpY2UoKTtcblxuICAgIC8vIElmIG5vIHRyZWUgbm9kZSBpcyBzZWxlY3RlZCwgd2UnbGwgcGxhY2UgdGhlIG5ldyBpdGVtIHRvIHRoZSByb290XG4gICAgLy8gb2YgdGhlIHRyZWVcbiAgICBpZiAoIXRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdKSB7XG4gICAgICBuZXdJdGVtcy5wdXNoKGRhdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBhY3Rpb24gPSB7XG4gICAgICAgIHR5cGU6IFRSRUVfQUNUSU9OUy5BRERfQ0hJTERSRU4sXG4gICAgICAgIGRhdGEsXG4gICAgICB9O1xuICAgICAgbmV3SXRlbXMgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdLCB0cmVlRGF0YSwgYWN0aW9uKTtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkS2V5czogW2RhdGFbaWRLZXldXSB9LCAoKSA9PiB7XG4gICAgICAvLyBJZiB0aGUgcGFyZW50IGlzIG5vdCB5ZXQgZXhwYW5kZWQsIHdlIHdpbGwgZXhwYW5kIGl0IG5vd1xuICAgICAgY29uc3QgcGFyZW50ID0gdGhpcy5nZXRUcmVlSXRlbShkYXRhW2lkS2V5XSwgdHJlZURhdGEsIHRydWUpIHx8IHt9O1xuICAgICAgdGhpcy5leHBhbmRQYXJlbnQocGFyZW50W2lkS2V5XSk7XG5cbiAgICAgIGlmIChvbkNoYW5nZSkgb25DaGFuZ2UobmV3SXRlbXMpO1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9KTtcbiAgfTtcblxuICBvbk1vdmVUb0dyaWRDbGljayA9ICgpID0+IHtcbiAgICB0aGlzLm1vdmVJdGVtVG9HcmlkKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIENhbGxzIG9uQ2hhbmdlIGNhbGxiYWNrIHdoZW5ldmVyIHVzZXIgcmVvcmRlcnMgdHJlZSBpdGVtcyB1c2luZyBvcmRlcmluZyBhcnJvd3NcbiAgICogQHBhcmFtIGl0ZW1zXG4gICAqL1xuICBvbk9yZGVyQ2xpY2sgPSAoaXRlbXMpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKGl0ZW1zKTtcbiAgfTtcblxuICAvKipcbiAgICogQWRkcyBzZWxlY3RlZCBncmlkIGl0ZW1zIHRvIHRoZSBjaG9zZW4gdHJlZSBub2RlIHVzaW5nIEFERF9DSElMRFJFTiBhY3Rpb25cbiAgICovXG4gIG9uTW92ZVRvVHJlZUNsaWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIG9uQ2hhbmdlLCBzZWxlY3RlZEdyaWRJdGVtcywgZ3JpZERhdGEsIHRyZWVEYXRhLCBpZEtleSxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzZWxlY3RlZElkID0gdGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF07XG5cbiAgICBjb25zdCBhY3Rpb24gPSB7XG4gICAgICB0eXBlOiBUUkVFX0FDVElPTlMuQUREX0NISUxEUkVOLFxuICAgICAgZGF0YTogZ3JpZERhdGEuZmlsdGVyKGkgPT4gc2VsZWN0ZWRHcmlkSXRlbXMuaW5jbHVkZXMoaS5nZXQoaWRLZXkpKSkudG9KUygpLFxuICAgIH07XG4gICAgY29uc3QgbmV3SXRlbXMgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKHNlbGVjdGVkSWQsIHRyZWVEYXRhLCBhY3Rpb24pO1xuICAgIGNvbnN0IG5ld0dyaWRJdGVtcyA9IGdyaWREYXRhLmZpbHRlcihpdGVtID0+ICFzZWxlY3RlZEdyaWRJdGVtcy5pbmNsdWRlcyhpdGVtLmdldChpZEtleSkpKTtcblxuICAgIHRoaXMuZXhwYW5kUGFyZW50KHNlbGVjdGVkSWQsIHRydWUpO1xuICAgIHRoaXMuc2V0RGF0YVRvR3JpZChuZXdHcmlkSXRlbXMsIHRydWUpO1xuICAgIGlmIChvbkNoYW5nZSkgb25DaGFuZ2UobmV3SXRlbXMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZW5hbWVzIHRoZSBjaG9zZW4gdHJlZSBub2RlIHVzaW5nIGEgUkVOQU1FX1BBUkVOVCBhY3Rpb25cbiAgICogQHBhcmFtIHZhbHVlXG4gICAqL1xuICBvbklucHV0Q2hhbmdlID0gKHZhbHVlKSA9PiB7XG4gICAgY29uc3QgeyB0cmVlRGF0YSwgb25DaGFuZ2UgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgYWN0aW9uID0ge1xuICAgICAgdHlwZTogVFJFRV9BQ1RJT05TLlJFTkFNRV9QQVJFTlQsXG4gICAgICBkYXRhOiB2YWx1ZSxcbiAgICB9O1xuICAgIGNvbnN0IG5ld0l0ZW1zID0gdGhpcy5nZXRVcGRhdGVkVHJlZSh0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXSwgdHJlZURhdGEsIGFjdGlvbik7XG4gICAgaWYgKG9uQ2hhbmdlKSBvbkNoYW5nZShuZXdJdGVtcyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEZpcmVkIG9uIGV4cGFuZFxuICAgKiBAcGFyYW0gaWRzXG4gICAqL1xuICBvbkV4cGFuZCA9IChpZHMpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGV4cGFuZGVkS2V5czogaWRzLFxuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHVwZGF0ZWQgdHJlZSBpdGVtcy5cbiAgICogQHBhcmFtIGlkIC0gdGFyZ2V0IGl0ZW1cbiAgICogQHBhcmFtIGFycmF5IC0gYXJyYXkgd2hlcmUgdGFyZ2V0IGl0ZW0gaXMgYmVpbmcgc2VhcmNoZWRcbiAgICogQHBhcmFtIGFjdGlvbiAtIGFjdGlvbiB0byBiZSBwZXJmb3JtZWQge3R5cGUsIGRhdGF9XG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgZ2V0VXBkYXRlZFRyZWUgPSAoaWQsIGFycmF5ID0gdGhpcy5wcm9wcy50cmVlRGF0YSwgYWN0aW9uKSA9PiB7XG4gICAgaWYgKHRoaXMuaXNTZWxlY3RlZERpc2FibGVkKCkpIHJldHVybiBhcnJheTtcblxuICAgIGxldCBmb3VuZCA9IGZhbHNlO1xuICAgIGNvbnN0IHsgaWRLZXksIGNoaWxkS2V5LCB2YWx1ZUtleSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBuZXdJdGVtcyA9IGFycmF5LnNsaWNlKCk7XG4gICAgY29uc3QgcmVtb3ZlQWN0aW9ucyA9IFtUUkVFX0FDVElPTlMuTU9WRV9MRUFGLCBUUkVFX0FDVElPTlMuREVMRVRFX1BBUkVOVF07XG5cbiAgICAvLyBJZiBkZWxldGVkIHBhcmVudCBpdGVtIGlzIGluIHRoZSByb290IG5vZGVcbiAgICBpZiAoYWN0aW9uLnR5cGUgPT09IFRSRUVfQUNUSU9OUy5ERUxFVEVfUEFSRU5UKSB7XG4gICAgICBjb25zdCByb290SXRlbSA9IGFycmF5LmZpbmQoaXRlbSA9PiBpdGVtW2lkS2V5XSA9PT0gaWQpO1xuICAgICAgaWYgKHJvb3RJdGVtKSB7XG4gICAgICAgIGlmIChyb290SXRlbVtjaGlsZEtleV0ubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5zZXREYXRhVG9HcmlkKGZyb21KUyh0aGlzLmdldEFsbExlYWZzKHJvb3RJdGVtW2NoaWxkS2V5XSkpKTtcbiAgICAgICAgICB0aGlzLmRlc2VsZWN0SXRlbSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXdJdGVtcy5maWx0ZXIoaXRlbSA9PiBpdGVtW2lkS2V5XSAhPT0gaWQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmV3SXRlbXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSBuZXdJdGVtc1tpXTtcbiAgICAgIGlmIChyZW1vdmVBY3Rpb25zLmluY2x1ZGVzKGFjdGlvbi50eXBlKSAmJiBpdGVtW2NoaWxkS2V5XSAmJiAhZm91bmQpIHtcbiAgICAgICAgZm91bmQgPSAhIWl0ZW1bY2hpbGRLZXldLmZpbmQoY2hpbGQgPT4gY2hpbGRbaWRLZXldID09PSBpZCk7XG4gICAgICAgIGlmIChmb3VuZCkge1xuICAgICAgICAgIC8vIFdoZW4gcmVtb3ZpbmcgYW4gaXRlbSB3ZSBtdXN0IGZpcnN0IGZpbmQgaXRzIHBhcmVudCBhbmQgYWx0ZXIgaXRzIGNoaWxkcmVuIGFycmF5XG4gICAgICAgICAgaWYgKGFjdGlvbi50eXBlID09PSBUUkVFX0FDVElPTlMuTU9WRV9MRUFGKSB7XG4gICAgICAgICAgICBpdGVtW2NoaWxkS2V5XSA9IGl0ZW1bY2hpbGRLZXldLmZpbHRlcihjaGlsZCA9PiBjaGlsZFtpZEtleV0gIT09IGlkKTtcbiAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RJdGVtKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChhY3Rpb24udHlwZSA9PT0gVFJFRV9BQ1RJT05TLkRFTEVURV9QQVJFTlQpIHtcbiAgICAgICAgICAgIC8vIHdlIG11c3QgZmlyc3QgZmlsdGVyIHRoZSBjaGlsZHJlbiwgc28gdGhhdCB3ZSB3b24ndCBnZXQgbGVhZnMgZnJvbVxuICAgICAgICAgICAgLy8gb3RoZXIgY2hpbGQgYnJhbmNoZXNcbiAgICAgICAgICAgIGNvbnN0IGZpbHRlcmVkQ2hpbGRyZW4gPSBpdGVtW2NoaWxkS2V5XS5maWx0ZXIoY2hpbGRJdGVtID0+IGNoaWxkSXRlbVtpZEtleV0gPT09IGlkKTtcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YVRvR3JpZChmcm9tSlModGhpcy5nZXRBbGxMZWFmcyhmaWx0ZXJlZENoaWxkcmVuKSkpO1xuICAgICAgICAgICAgdGhpcy5kZXNlbGVjdEl0ZW0oKTtcbiAgICAgICAgICAgIGl0ZW1bY2hpbGRLZXldID0gaXRlbVtjaGlsZEtleV0uZmlsdGVyKGNoaWxkSXRlbSA9PiBjaGlsZEl0ZW1baWRLZXldICE9PSBpZCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtW2lkS2V5XSA9PT0gaWQgJiYgIWZvdW5kKSB7XG4gICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICAgIGNhc2UgVFJFRV9BQ1RJT05TLkFERF9DSElMRFJFTjpcbiAgICAgICAgICAgIGl0ZW1bY2hpbGRLZXldID0gKGl0ZW1bY2hpbGRLZXldIHx8IFtdKS5jb25jYXQoYWN0aW9uLmRhdGEpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBUUkVFX0FDVElPTlMuUkVOQU1FX1BBUkVOVDpcbiAgICAgICAgICAgIGl0ZW1bdmFsdWVLZXldID0gYWN0aW9uLmRhdGE7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQWN0aW9uIHR5cGUgaXMgdW5kZWZpbmVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVtjaGlsZEtleV0gJiYgIWZvdW5kKSBmb3VuZCA9IHRoaXMuZ2V0VXBkYXRlZFRyZWUoaWQsIGl0ZW1bY2hpbGRLZXldLCBhY3Rpb24pO1xuICAgIH1cblxuICAgIGlmICghZm91bmQpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gbmV3SXRlbXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybnMgcmVjdXJzaXZlbHkgYWxsIGxlYWYgaXRlbXMgZnJvbSBhIGdpdmVuIGFycmF5XG4gICAqIEBwYXJhbSBhcnJheVxuICAgKiBAcGFyYW0gYWxyZWFkeUZvdW5kICh1c2VkIHJlY3Vyc2l2ZWx5KVxuICAgKi9cbiAgZ2V0QWxsTGVhZnMgPSAoYXJyYXksIGFscmVhZHlGb3VuZCA9IFtdKSA9PiB7XG4gICAgY29uc3QgeyBjaGlsZEtleSB9ID0gdGhpcy5wcm9wcztcbiAgICBsZXQgbGVhZnMgPSBhbHJlYWR5Rm91bmQ7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBpdGVtID0gYXJyYXlbaV07XG4gICAgICBpZiAoaXRlbVtjaGlsZEtleV0pIHtcbiAgICAgICAgbGVhZnMgPSB0aGlzLmdldEFsbExlYWZzKGl0ZW1bY2hpbGRLZXldLCBhbHJlYWR5Rm91bmQpO1xuICAgICAgfVxuICAgICAgaWYgKCFpdGVtW2NoaWxkS2V5XSkgbGVhZnMucHVzaChpdGVtKTtcbiAgICB9XG4gICAgcmV0dXJuIGxlYWZzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgdHJlZSBpdGVtIGJ5IElEXG4gICAqIEBwYXJhbSBpZFxuICAgKiBAcGFyYW0gYXJyYXlcbiAgICogQHBhcmFtIHJldHVyblBhcmVudCAtIHJldHVybiBpdGVtJ3MgcGFyZW50IGluc3RlYWQgb2YgdGhlIGl0ZW1cbiAgICogQHBhcmFtIHBhcmVudCAtIHBhcmVudCBpdGVtICh1c2VkIHJlY3Vyc2l2ZWx5KVxuICAgKiBAcmV0dXJucyB7e319XG4gICAqL1xuICBnZXRUcmVlSXRlbSA9IChpZCwgYXJyYXkgPSB0aGlzLnByb3BzLnRyZWVEYXRhLCByZXR1cm5QYXJlbnQgPSBmYWxzZSwgcGFyZW50ID0gbnVsbCkgPT4ge1xuICAgIGNvbnN0IHsgY2hpbGRLZXksIGlkS2V5IH0gPSB0aGlzLnByb3BzO1xuICAgIGxldCBmb3VuZCA9IGFycmF5LmZpbmQoaXRlbSA9PiBpdGVtW2lkS2V5XSA9PT0gaWQpO1xuXG4gICAgaWYgKGZvdW5kICYmIHJldHVyblBhcmVudCkgZm91bmQgPSBwYXJlbnQ7XG5cbiAgICBpZiAoIWZvdW5kKSB7XG4gICAgICBhcnJheS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGlmIChpdGVtW2NoaWxkS2V5XSAmJiAhZm91bmQpIHtcbiAgICAgICAgICBmb3VuZCA9IHRoaXMuZ2V0VHJlZUl0ZW0oaWQsIGl0ZW1bY2hpbGRLZXldLCByZXR1cm5QYXJlbnQsIGl0ZW0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGZvdW5kO1xuICB9O1xuXG4gIC8qKlxuICAgKiBHZXQgYWRqYWNlbnQgaXRlbSAoaWQpIGluIHBhcmVudCBhcnJheS4gVXNlZCB3aGVuIG1vdmluZyBpdGVtcyBmcm9tIHRyZWVcbiAgICogdG8gZ3JpZC9kZWxldGluZyBhbiBpdGVtXG4gICAqIEBwYXJhbSBpZFxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIGdldEFkamFjZW50SXRlbSA9IChpZCkgPT4ge1xuICAgIGlmICghaWQpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IHsgY2hpbGRLZXksIGlkS2V5LCB0cmVlRGF0YSB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IGdldEFkamFjZW50SXRlbUlkID0gKHBhcmVudCkgPT4ge1xuICAgICAgY29uc3QgcGFyZW50QXJyID0gQXJyYXkuaXNBcnJheShwYXJlbnQpID8gcGFyZW50IDogcGFyZW50W2NoaWxkS2V5XTtcbiAgICAgIGNvbnN0IGluZGV4ID0gcGFyZW50QXJyLmZpbmRJbmRleChjaGlsZCA9PiBjaGlsZFtpZEtleV0gPT09IGlkKTtcbiAgICAgIGxldCBhZGphY2VudEl0ZW0gPSBwYXJlbnRBcnJbaW5kZXggKyAxXTtcbiAgICAgIGlmICghYWRqYWNlbnRJdGVtKSBhZGphY2VudEl0ZW0gPSBwYXJlbnRBcnJbaW5kZXggLSAxXTtcbiAgICAgIGlmICghYWRqYWNlbnRJdGVtICYmICFBcnJheS5pc0FycmF5KHBhcmVudCkpIGFkamFjZW50SXRlbSA9IHBhcmVudDtcbiAgICAgIGlmICghYWRqYWNlbnRJdGVtKSByZXR1cm4gbnVsbDtcblxuICAgICAgcmV0dXJuIGFkamFjZW50SXRlbVtpZEtleV07XG4gICAgfTtcblxuICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuZ2V0VHJlZUl0ZW0oaWQsIHRoaXMucHJvcHMudHJlZURhdGEsIHRydWUpO1xuICAgIHJldHVybiBwYXJlbnQgPyBnZXRBZGphY2VudEl0ZW1JZChwYXJlbnQpIDogZ2V0QWRqYWNlbnRJdGVtSWQodHJlZURhdGEpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBcHBlbmRzIHByb3ZpZGVkIGl0ZW1zIHRvIHRoZSBncmlkXG4gICAqIEBwYXJhbSBpdGVtcyAtIGltbXV0YWJsZSBhcnJheSBvZiBpdGVtcyB0byBiZSBhcHBlbmRlZCB0byBncmlkXG4gICAqIEBwYXJhbSBzZXROZXdJdGVtcyAtIHNldCBjb21wbGV0ZWx5IGEgbmV3IGFycmF5IG9mIGl0ZW1zXG4gICAqL1xuICBzZXREYXRhVG9HcmlkID0gKGl0ZW1zLCBzZXROZXdJdGVtcyA9IGZhbHNlKSA9PiB7XG4gICAgbGV0IGRhdGEgPSBMaXN0KCk7XG4gICAgY29uc3Qge1xuICAgICAgZ3JpZCwgZ3JpZENvbHVtbnMsIGdyaWREYXRhLCBzb3J0S2V5LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghc2V0TmV3SXRlbXMpIGRhdGEgPSBncmlkRGF0YS5zbGljZSgpO1xuICAgIGxldCBuZXdHcmlkSXRlbXMgPSBkYXRhLmNvbmNhdChpdGVtcyk7XG4gICAgaWYgKHNvcnRLZXkpIG5ld0dyaWRJdGVtcyA9IG5ld0dyaWRJdGVtcy5zb3J0QnkoaSA9PiBpLmdldChzb3J0S2V5KSk7XG5cbiAgICB0aGlzLnByb3BzLnNldERhdGEoZ3JpZCwgZ3JpZENvbHVtbnMsIG5ld0dyaWRJdGVtcyk7XG4gICAgdGhpcy5wcm9wcy5jbGVhclNlbGVjdGVkSXRlbXMoZ3JpZCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIENoZWNrcyB3aGV0aGVyIG9yIG5vdCBnaXZlbiBub2RlIGlzIGRpc2FibGVkXG4gICAqL1xuICBpc1NlbGVjdGVkRGlzYWJsZWQgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBsb2NrZWRLZXkgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgaXRlbSA9ICEhdGhpcy5nZXRUcmVlSXRlbSh0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXSk7XG4gICAgaWYgKCFpdGVtKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIGl0ZW1bbG9ja2VkS2V5XTtcbiAgfTtcblxuICAvKipcbiAgICogUmVtb3ZlcyB0aGUgY2hvc2VuIGl0ZW0gZnJvbSBhIHRyZWUgYW5kIHVwZGF0ZXMgdGhlIGdyaWQgdXNpbmcgTU9WRV9MRUFGXG4gICAqIGFjdGlvblxuICAgKi9cbiAgbW92ZUl0ZW1Ub0dyaWQgPSAoKSA9PiB7XG4gICAgY29uc3QgeyB0cmVlRGF0YSwgb25DaGFuZ2UgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgc2VsZWN0ZWRLZXkgPSB0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXTtcbiAgICBjb25zdCBhY3Rpb24gPSB7XG4gICAgICB0eXBlOiBUUkVFX0FDVElPTlMuTU9WRV9MRUFGLFxuICAgICAgZGF0YTogdGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF0sXG4gICAgfTtcbiAgICBjb25zdCBuZXh0U2VsZWN0ZWRLZXkgPSB0aGlzLmdldEFkamFjZW50SXRlbShzZWxlY3RlZEtleSk7XG4gICAgY29uc3QgbmV3R3JpZEl0ZW1zID0gZnJvbUpTKFt0aGlzLmdldFRyZWVJdGVtKHNlbGVjdGVkS2V5KV0pO1xuICAgIGNvbnN0IG5ld0l0ZW1zID0gdGhpcy5nZXRVcGRhdGVkVHJlZShzZWxlY3RlZEtleSwgdHJlZURhdGEsIGFjdGlvbik7XG5cbiAgICB0aGlzLnNldERhdGFUb0dyaWQobmV3R3JpZEl0ZW1zKTtcbiAgICBpZiAob25DaGFuZ2UpIG9uQ2hhbmdlKG5ld0l0ZW1zKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNlbGVjdGVkS2V5czogW25leHRTZWxlY3RlZEtleV0sXG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEV4cGFuZHMgYSBwYXJlbnRcbiAgICogQHBhcmFtIHBhcmVudElkXG4gICAqL1xuICBleHBhbmRQYXJlbnQgPSAocGFyZW50SWQpID0+IHtcbiAgICBpZiAocGFyZW50SWQgJiYgIXRoaXMuc3RhdGUuZXhwYW5kZWRLZXlzLmZpbmQoZXhwYW5kZWRJZCA9PiBleHBhbmRlZElkID09PSBwYXJlbnRJZCkpIHtcbiAgICAgIGNvbnN0IG5ld0V4cGFuZGVkS2V5cyA9IHRoaXMuc3RhdGUuZXhwYW5kZWRLZXlzLnNsaWNlKCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgIG5ld0V4cGFuZGVkS2V5cy5wdXNoKHBhcmVudElkKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBleHBhbmRlZEtleXM6IG5ld0V4cGFuZGVkS2V5cyB9KTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIENsb3NlcyBkZWxldGUgY29uZmlybWF0aW9uIGRpYWxvZ1xuICAgKi9cbiAgY2xvc2VEZWxldGVDb25maXJtYXRpb25EaWFsb2cgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNob3dEZWxldGVDb25maXJtYXRpb246IGZhbHNlIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBEZWxldGVzIGEgcGFyZW50IG5vZGVcbiAgICovXG4gIGRlbGV0ZVBhcmVudCA9ICgpID0+IHtcbiAgICBjb25zdCB7IG9uQ2hhbmdlLCB0cmVlRGF0YSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzZWxlY3RlZEtleSA9IHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdO1xuICAgIGNvbnN0IGFjdGlvbiA9IHtcbiAgICAgIHR5cGU6IFRSRUVfQUNUSU9OUy5ERUxFVEVfUEFSRU5ULFxuICAgIH07XG4gICAgY29uc3QgbmV4dFNlbGVjdGVkS2V5ID0gdGhpcy5nZXRBZGphY2VudEl0ZW0oc2VsZWN0ZWRLZXkpO1xuICAgIGNvbnN0IG5ld0l0ZW1zID0gdGhpcy5nZXRVcGRhdGVkVHJlZShzZWxlY3RlZEtleSwgdHJlZURhdGEsIGFjdGlvbik7XG4gICAgaWYgKG9uQ2hhbmdlKSBvbkNoYW5nZShuZXdJdGVtcyk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzZWxlY3RlZEtleXM6IFtuZXh0U2VsZWN0ZWRLZXldLFxuICAgICAgc2hvd0RlbGV0ZUNvbmZpcm1hdGlvbjogZmFsc2UsXG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIERlc2VsZWN0cyBhbiBpdGVtLCBpZiBpdCBpcyBlLmcuIHJlbW92ZWRcbiAgICovXG4gIGRlc2VsZWN0SXRlbSA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRLZXlzOiBbXSB9KTtcbiAgfTtcblxuICByZW5kZXJIZWFkZXJSaWdodCA9IHRyYW5zbGF0aW9ucyA9PiAoXG4gICAgPENvbnRyb2xCYXJcbiAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgb25BZGROZXdDbGljaz17dGhpcy5vbkFkZE5ld0NsaWNrfVxuICAgICAgb25EZWxldGVDbGljaz17dGhpcy5vbkRlbGV0ZUNsaWNrfVxuICAgICAgb25JbnB1dENoYW5nZT17dGhpcy5vbklucHV0Q2hhbmdlfVxuICAgICAgc2VsZWN0ZWRUcmVlSXRlbT17dGhpcy5nZXRUcmVlSXRlbSh0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXSl9XG4gICAgICBoZWlnaHQ9e0FDVElPTl9CQVJfQ09OVEFJTkVSX0hFSUdIVH1cbiAgICAgIHRyYW5zbGF0aW9ucz17dHJhbnNsYXRpb25zfVxuICAgIC8+XG4gICk7XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHZhbHVlS2V5LFxuICAgICAgbGVhZlZhbHVlS2V5LFxuICAgICAgaWRLZXksXG4gICAgICB0cmVlRGF0YSxcbiAgICAgIGdyaWQsXG4gICAgICBncmlkQ29sdW1ucyxcbiAgICAgIGNsYXNzTmFtZSxcbiAgICAgIHRyYW5zbGF0aW9ucyxcbiAgICAgIGNoaWxkS2V5LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgbWVyZ2VkR3JpZCA9IE9iamVjdC5hc3NpZ24oe30sIGdyaWQsIHsgZGVmYXVsdFNob3dGaWx0ZXJpbmdSb3c6IHRydWUgfSk7XG4gICAgY29uc3QgbWVyZ2VkVHJhbnNsYXRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdFRyYW5zbGF0aW9ucywgdHJhbnNsYXRpb25zKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8UmVhY3QuRnJhZ21lbnQ+XG4gICAgICAgIDxDb250YWluZXIgY2xhc3NOYW1lPXtjbGFzc05hbWV9PlxuICAgICAgICAgIDxUcmVlQ29udGFpbmVyPlxuICAgICAgICAgICAgPFRyZWVDb21wb25lbnRcbiAgICAgICAgICAgICAgdHJlZURhdGE9e3RyZWVEYXRhfVxuICAgICAgICAgICAgICBkYXRhTG9va1VwS2V5PXtpZEtleX1cbiAgICAgICAgICAgICAgZGF0YUxvb2tVcFZhbHVlPXt2YWx1ZUtleX1cbiAgICAgICAgICAgICAgZGF0YUxvb2tVcExlYWZWYWx1ZT17bGVhZlZhbHVlS2V5fVxuICAgICAgICAgICAgICBkYXRhTG9va1VwQ2hpbGRyZW49e2NoaWxkS2V5fVxuICAgICAgICAgICAgICBvblNlbGVjdD17dGhpcy5vblRyZWVJdGVtU2VsZWN0fVxuICAgICAgICAgICAgICBvbkV4cGFuZD17dGhpcy5vbkV4cGFuZH1cbiAgICAgICAgICAgICAgY2hlY2thYmxlPXtmYWxzZX1cbiAgICAgICAgICAgICAgc2VsZWN0ZWRLZXlzPXt0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c31cbiAgICAgICAgICAgICAgZXhwYW5kZWRLZXlzPXt0aGlzLnN0YXRlLmV4cGFuZGVkS2V5c31cbiAgICAgICAgICAgICAgb25PcmRlckJ1dHRvbkNsaWNrPXt0aGlzLm9uT3JkZXJDbGlja31cbiAgICAgICAgICAgICAgdGl0bGU9e21lcmdlZFRyYW5zbGF0aW9ucy50cmVlVGl0bGV9XG4gICAgICAgICAgICAgIHNlbGVjdGFibGVcbiAgICAgICAgICAgICAgc2hvd09yZGVyaW5nQXJyb3dzXG4gICAgICAgICAgICAgIHNob3dFeHBhbmRBbGxcbiAgICAgICAgICAgICAgaGVhZGVyUmlnaHQ9e3RoaXMucmVuZGVySGVhZGVyUmlnaHQobWVyZ2VkVHJhbnNsYXRpb25zKX1cbiAgICAgICAgICAgICAgaGFuZGxlRXhwYW5kZWRLZXlzTWFudWFsbHlcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9UcmVlQ29udGFpbmVyPlxuICAgICAgICAgIDxBcnJvd0NvbnRyb2xzXG4gICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgIHNlbGVjdGVkVHJlZUl0ZW09e3RoaXMuZ2V0VHJlZUl0ZW0odGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF0pfVxuICAgICAgICAgICAgb25Nb3ZlVG9UcmVlQ2xpY2s9e3RoaXMub25Nb3ZlVG9UcmVlQ2xpY2t9XG4gICAgICAgICAgICBvbk1vdmVUb0dyaWRDbGljaz17dGhpcy5vbk1vdmVUb0dyaWRDbGlja31cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxHcmlkXG4gICAgICAgICAgICBncmlkPXttZXJnZWRHcmlkfVxuICAgICAgICAgICAgY29sdW1ucz17Z3JpZENvbHVtbnN9XG4gICAgICAgICAgICBtdWx0aVNlbGVjdFxuICAgICAgICAgICAgZmlsdGVyaW5nXG4gICAgICAgICAgICByb3dTZWxlY3RDaGVja2JveENvbHVtblxuICAgICAgICAgICAgZ3JpZEhlYWRlcj17PFByaW1pdGl2ZS5TdWJ0aXRsZT57bWVyZ2VkVHJhbnNsYXRpb25zLmdyaWRUaXRsZX08L1ByaW1pdGl2ZS5TdWJ0aXRsZT59XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9Db250YWluZXI+XG4gICAgICAgIHt0aGlzLnN0YXRlLnNob3dEZWxldGVDb25maXJtYXRpb24gJiYgKFxuICAgICAgICAgIDxDb25maXJtRGlhbG9nXG4gICAgICAgICAgICB0cmFuc2xhdGlvbnM9e21lcmdlZFRyYW5zbGF0aW9ucy5kZWxldGVDb25maXJtRGlhbG9nfVxuICAgICAgICAgICAgY29uZmlybUNhbGxiYWNrPXt0aGlzLmRlbGV0ZVBhcmVudH1cbiAgICAgICAgICAgIGNhbmNlbENhbGxiYWNrPXt0aGlzLmNsb3NlRGVsZXRlQ29uZmlybWF0aW9uRGlhbG9nfVxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG4gICAgICA8L1JlYWN0LkZyYWdtZW50PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==