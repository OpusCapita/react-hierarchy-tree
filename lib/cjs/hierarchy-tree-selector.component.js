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
          gridData = _this$props9.gridData;
      if (!setNewItems) data = gridData.slice();
      var newGridItems = data.concat(items);

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
  /**
   * Selects a tree item
   * @param selectedKeys (array)
   */


  var _proto = HierarchyTreeSelector.prototype;

  _proto.render = function render() {
    var _this$props12 = this.props,
        valueKey = _this$props12.valueKey,
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
  treeData: [],
  className: '',
  translations: _hierarchyTree.defaultTranslations,
  id: 'hierarchy-tree',
  onSelect: undefined,
  onChange: undefined,
  onPreventDelete: undefined,
  defaultExpandAll: true,
  singleRoot: true
}), _temp)) || _class);
exports["default"] = HierarchyTreeSelector;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIkFDVElPTl9CQVJfQ09OVEFJTkVSX0hFSUdIVCIsIlRSRUVfQUNUSU9OUyIsIkFERF9DSElMRFJFTiIsIk1PVkVfTEVBRiIsIlJFTkFNRV9QQVJFTlQiLCJERUxFVEVfUEFSRU5UIiwiR3JpZCIsIkRhdGFncmlkIiwiQ29udGFpbmVyIiwic3R5bGVkIiwiZGl2IiwiVHJlZUNvbnRhaW5lciIsInByb3BzIiwidGhlbWUiLCJndXR0ZXJXaWR0aCIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsInNldERhdGEiLCJEYXRhZ3JpZEFjdGlvbnMiLCJjbGVhclNlbGVjdGVkSXRlbXMiLCJtYXBTdGF0ZVRvUHJvcHMiLCJzdGF0ZSIsImdyaWRJZCIsImdyaWQiLCJpZCIsInNlbGVjdGVkR3JpZEl0ZW1zIiwiZGF0YWdyaWQiLCJnZXRJbiIsImdyaWREYXRhIiwiSGllcmFyY2h5VHJlZVNlbGVjdG9yIiwic2VsZWN0ZWRLZXlzIiwib25TZWxlY3QiLCJsb2NrZWRLZXkiLCJzZWxlY3RlZEl0ZW0iLCJnZXRUcmVlSXRlbSIsInNldFN0YXRlIiwiY2hpbGRLZXkiLCJvblByZXZlbnREZWxldGUiLCJpdGVtIiwibW92ZUl0ZW1Ub0dyaWQiLCJsZWFmcyIsImdldEFsbExlYWZzIiwiZmluZCIsImxlYWYiLCJzaG93RGVsZXRlQ29uZmlybWF0aW9uIiwiZGF0YSIsImNhbGxiYWNrIiwib25DaGFuZ2UiLCJ0cmVlRGF0YSIsImlkS2V5IiwibmV3SXRlbXMiLCJzbGljZSIsInB1c2giLCJhY3Rpb24iLCJ0eXBlIiwiZ2V0VXBkYXRlZFRyZWUiLCJwYXJlbnQiLCJleHBhbmRQYXJlbnQiLCJpdGVtcyIsInNlbGVjdGVkSWQiLCJmaWx0ZXIiLCJpIiwiaW5jbHVkZXMiLCJnZXQiLCJ0b0pTIiwibmV3R3JpZEl0ZW1zIiwic2V0RGF0YVRvR3JpZCIsInZhbHVlIiwiaWRzIiwiZXhwYW5kZWRLZXlzIiwiYXJyYXkiLCJpc1NlbGVjdGVkRGlzYWJsZWQiLCJmb3VuZCIsInZhbHVlS2V5IiwicmVtb3ZlQWN0aW9ucyIsInJvb3RJdGVtIiwibGVuZ3RoIiwiZGVzZWxlY3RJdGVtIiwiY2hpbGQiLCJmaWx0ZXJlZENoaWxkcmVuIiwiY2hpbGRJdGVtIiwiY29uY2F0IiwiVHlwZUVycm9yIiwiYWxyZWFkeUZvdW5kIiwicmV0dXJuUGFyZW50IiwiZm9yRWFjaCIsImdldEFkamFjZW50SXRlbUlkIiwicGFyZW50QXJyIiwiQXJyYXkiLCJpc0FycmF5IiwiaW5kZXgiLCJmaW5kSW5kZXgiLCJhZGphY2VudEl0ZW0iLCJzZXROZXdJdGVtcyIsImdyaWRDb2x1bW5zIiwic2VsZWN0ZWRLZXkiLCJuZXh0U2VsZWN0ZWRLZXkiLCJnZXRBZGphY2VudEl0ZW0iLCJwYXJlbnRJZCIsImV4cGFuZGVkSWQiLCJuZXdFeHBhbmRlZEtleXMiLCJ0cmFuc2xhdGlvbnMiLCJvbkFkZE5ld0NsaWNrIiwib25EZWxldGVDbGljayIsIm9uSW5wdXRDaGFuZ2UiLCJyZW5kZXIiLCJjbGFzc05hbWUiLCJtZXJnZWRHcmlkIiwiT2JqZWN0IiwiYXNzaWduIiwiZGVmYXVsdFNob3dGaWx0ZXJpbmdSb3ciLCJtZXJnZWRUcmFuc2xhdGlvbnMiLCJkZWZhdWx0VHJhbnNsYXRpb25zIiwib25UcmVlSXRlbVNlbGVjdCIsIm9uRXhwYW5kIiwib25PcmRlckNsaWNrIiwidHJlZVRpdGxlIiwicmVuZGVySGVhZGVyUmlnaHQiLCJvbk1vdmVUb1RyZWVDbGljayIsIm9uTW92ZVRvR3JpZENsaWNrIiwiZ3JpZFRpdGxlIiwiZGVsZXRlQ29uZmlybURpYWxvZyIsImRlbGV0ZVBhcmVudCIsImNsb3NlRGVsZXRlQ29uZmlybWF0aW9uRGlhbG9nIiwiUmVhY3QiLCJQdXJlQ29tcG9uZW50IiwidW5kZWZpbmVkIiwiZGVmYXVsdEV4cGFuZEFsbCIsInNpbmdsZVJvb3QiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7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QWdCLEVBQUUsSUFaRTtBQWFwQkMsRUFBQUEsVUFBVSxFQUFFO0FBYlEsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUcmVlQ29tcG9uZW50IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LXRyZWUtY29tcG9uZW50JztcbmltcG9ydCB7IFByaW1pdGl2ZSB9IGZyb20gJ0BvcHVzY2FwaXRhL29jLWNtLWNvbW1vbi1sYXlvdXRzJztcbmltcG9ydCB7XG4gIERhdGFncmlkLCBncmlkU2hhcGUsIGdyaWRDb2x1bW5TaGFwZSwgRGF0YWdyaWRBY3Rpb25zLFxufSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1ncmlkJztcbmltcG9ydCBDb25maXJtRGlhbG9nIGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWNvbmZpcm1hdGlvbi1kaWFsb2cnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHsgTGlzdCwgZnJvbUpTIH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCBJbW11dGFibGVQcm9wVHlwZXMgZnJvbSAncmVhY3QtaW1tdXRhYmxlLXByb3B0eXBlcyc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuLy8gQXBwIGltcG9ydHNcbmltcG9ydCBDb250cm9sQmFyIGZyb20gJy4vaGllcmFyY2h5LXRyZWUtc2VsZWN0b3ItY29udHJvbC1iYXIuY29tcG9uZW50JztcbmltcG9ydCBBcnJvd0NvbnRyb2xzIGZyb20gJy4vaGllcmFyY2h5LXRyZWUtc2VsZWN0b3ItYXJyb3ctY29udHJvbHMuY29tcG9uZW50JztcbmltcG9ydCB7IGRlZmF1bHRUcmFuc2xhdGlvbnMgfSBmcm9tICcuL2hpZXJhcmNoeS10cmVlLnV0aWxzJztcblxuY29uc3QgQUNUSU9OX0JBUl9DT05UQUlORVJfSEVJR0hUID0gJzU0cHgnO1xuY29uc3QgVFJFRV9BQ1RJT05TID0ge1xuICBBRERfQ0hJTERSRU46ICdBRERfQ0hJTERSRU4nLFxuICBNT1ZFX0xFQUY6ICdNT1ZFX0xFQUYnLFxuICBSRU5BTUVfUEFSRU5UOiAnUkVOQU1FX1BBUkVOVCcsXG4gIERFTEVURV9QQVJFTlQ6ICdERUxFVEVfUEFSRU5UJyxcbn07XG5cbmNvbnN0IEdyaWQgPSBzdHlsZWQoRGF0YWdyaWQpYFxuICBoZWlnaHQ6IDEwMCU7XG4gICYmJiB7XG4gICAgcGFkZGluZzogMDtcbiAgfVxuYDtcblxuY29uc3QgQ29udGFpbmVyID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogZmxleDtcbiAgbWluLWhlaWdodDogMzAwcHg7XG4gID4gZGl2IHtcbiAgICB3aWR0aDogNTAlO1xuICAgIGZsZXg6IDEgMSAxMDAlO1xuICB9XG5gO1xuXG5jb25zdCBUcmVlQ29udGFpbmVyID0gc3R5bGVkLmRpdmBcbiAgaGVpZ2h0OiAxMDAlO1xuICAub2Mtc2Nyb2xsYmFyLWNvbnRhaW5lciB7XG4gICAgaGVpZ2h0OiBjYWxjKDEwMCUgLSAke0FDVElPTl9CQVJfQ09OVEFJTkVSX0hFSUdIVH0pO1xuICAgIHBhZGRpbmc6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuZ3V0dGVyV2lkdGh9O1xuICB9XG4gIC50cmVlLWhlYWRlciB7XG4gICAgbWluLWhlaWdodDogJHtBQ1RJT05fQkFSX0NPTlRBSU5FUl9IRUlHSFR9O1xuICAgIC5vcmRlcmluZy1hcnJvd3Mge1xuICAgICAgZm9udC13ZWlnaHQ6IDI0cHg7XG4gICAgfVxuICB9XG4gIC5vYy1yZWFjdC10cmVlIHtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgLnJjLXRyZWUtaWNvbkVsZS5yYy10cmVlLWljb25fX2N1c3RvbWl6ZSB7XG4gICAgICBkaXNwbGF5OiBub25lO1xuICAgIH1cbiAgfVxuYDtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0ge1xuICBzZXREYXRhOiBEYXRhZ3JpZEFjdGlvbnMuc2V0RGF0YSxcbiAgY2xlYXJTZWxlY3RlZEl0ZW1zOiBEYXRhZ3JpZEFjdGlvbnMuY2xlYXJTZWxlY3RlZEl0ZW1zLFxufTtcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlLCBwcm9wcykgPT4ge1xuICBjb25zdCBncmlkSWQgPSBwcm9wcy5ncmlkLmlkO1xuICByZXR1cm4ge1xuICAgIHNlbGVjdGVkR3JpZEl0ZW1zOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbZ3JpZElkLCAnc2VsZWN0ZWRJdGVtcyddLCBMaXN0KCkpLFxuICAgIGdyaWREYXRhOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbZ3JpZElkLCAnYWxsRGF0YSddLCBMaXN0KCkpLFxuICB9O1xufTtcblxuQGNvbm5lY3QoXG4gIG1hcFN0YXRlVG9Qcm9wcyxcbiAgbWFwRGlzcGF0Y2hUb1Byb3BzLFxuKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGllcmFyY2h5VHJlZVNlbGVjdG9yIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgaWRLZXk6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdmFsdWVLZXk6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2hpbGRLZXk6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbG9ja2VkS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHRyZWVEYXRhOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc2hhcGUoe30pKSxcbiAgICBncmlkOiBncmlkU2hhcGUuaXNSZXF1aXJlZCxcbiAgICBncmlkQ29sdW1uczogUHJvcFR5cGVzLmFycmF5T2YoZ3JpZENvbHVtblNoYXBlKS5pc1JlcXVpcmVkLFxuICAgIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBzZXREYXRhOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGNsZWFyU2VsZWN0ZWRJdGVtczogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBzZWxlY3RlZEdyaWRJdGVtczogSW1tdXRhYmxlUHJvcFR5cGVzLmxpc3QuaXNSZXF1aXJlZCxcbiAgICBncmlkRGF0YTogSW1tdXRhYmxlUHJvcFR5cGVzLmxpc3QuaXNSZXF1aXJlZCxcbiAgICB0cmFuc2xhdGlvbnM6IFByb3BUeXBlcy5zaGFwZSh7fSksXG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGVmYXVsdEV4cGFuZEFsbDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2luZ2xlUm9vdDogUHJvcFR5cGVzLmJvb2wsXG5cbiAgICAvLyBDYWxsYmFja3NcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uUHJldmVudERlbGV0ZTogUHJvcFR5cGVzLmZ1bmMsXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBpZEtleTogJ2lkJyxcbiAgICB2YWx1ZUtleTogJ25hbWUnLFxuICAgIGNoaWxkS2V5OiAnY2hpbGRyZW4nLFxuICAgIGxvY2tlZEtleTogdW5kZWZpbmVkLFxuICAgIHRyZWVEYXRhOiBbXSxcbiAgICBjbGFzc05hbWU6ICcnLFxuICAgIHRyYW5zbGF0aW9uczogZGVmYXVsdFRyYW5zbGF0aW9ucyxcbiAgICBpZDogJ2hpZXJhcmNoeS10cmVlJyxcbiAgICBvblNlbGVjdDogdW5kZWZpbmVkLFxuICAgIG9uQ2hhbmdlOiB1bmRlZmluZWQsXG4gICAgb25QcmV2ZW50RGVsZXRlOiB1bmRlZmluZWQsXG4gICAgZGVmYXVsdEV4cGFuZEFsbDogdHJ1ZSxcbiAgICBzaW5nbGVSb290OiB0cnVlLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzZWxlY3RlZEtleXM6IFtdLFxuICAgICAgZXhwYW5kZWRLZXlzOiBbXSxcbiAgICAgIHNob3dEZWxldGVDb25maXJtYXRpb246IGZhbHNlLFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0cyBhIHRyZWUgaXRlbVxuICAgKiBAcGFyYW0gc2VsZWN0ZWRLZXlzIChhcnJheSlcbiAgICovXG4gIG9uVHJlZUl0ZW1TZWxlY3QgPSAoc2VsZWN0ZWRLZXlzKSA9PiB7XG4gICAgY29uc3QgeyBvblNlbGVjdCwgbG9ja2VkS2V5IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHNlbGVjdGVkSXRlbSA9IHRoaXMuZ2V0VHJlZUl0ZW0oc2VsZWN0ZWRLZXlzWzBdKTtcbiAgICBpZiAobG9ja2VkS2V5ICYmIHNlbGVjdGVkSXRlbSAmJiBzZWxlY3RlZEl0ZW1bbG9ja2VkS2V5XSkgcmV0dXJuO1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZEtleXMgfSwgKCkgPT4ge1xuICAgICAgaWYgKG9uU2VsZWN0KSBvblNlbGVjdChzZWxlY3RlZEtleXMpO1xuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBEaXNwbGF5cyBhIGNvbmZpcm1hdGlvbiBkaWFsb2dcbiAgICovXG4gIG9uRGVsZXRlQ2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBjaGlsZEtleSwgbG9ja2VkS2V5LCBvblByZXZlbnREZWxldGUgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgaXRlbSA9IHRoaXMuZ2V0VHJlZUl0ZW0odGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF0pO1xuICAgIC8vIElmIGl0ZW0gaXMgbm90IGEgcGFyZW50LCB3ZSB3b24ndCBzaG93IHRoZSBkZWxldGUgY29uZmlybWF0aW9uIGRpYWxvZ1xuICAgIGlmICghaXRlbVtjaGlsZEtleV0pIHtcbiAgICAgIHRoaXMubW92ZUl0ZW1Ub0dyaWQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAobG9ja2VkS2V5KSB7XG4gICAgICAvLyBJZiBpdCBpcyBhIHBhcmVudCwgd2Ugd2FudCB0byBjaGVjayB0aGF0IGl0IGRvZXNuJ3QgY29udGFpbiBhbnkgbG9ja2VkIGl0ZW1zXG4gICAgICBjb25zdCBsZWFmcyA9IHRoaXMuZ2V0QWxsTGVhZnMoaXRlbVtjaGlsZEtleV0pO1xuICAgICAgaWYgKGxlYWZzLmZpbmQobGVhZiA9PiBsZWFmW2xvY2tlZEtleV0pICYmIG9uUHJldmVudERlbGV0ZSkge1xuICAgICAgICBvblByZXZlbnREZWxldGUoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuc2V0U3RhdGUoeyBzaG93RGVsZXRlQ29uZmlybWF0aW9uOiB0cnVlIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBZGRzIGEgbmV3IG5vZGUgdG8gdGhlIHJvb3Qgb2YgdGhlIHRyZWUsIG9yIHVuZGVyIGEgc2VsZWN0ZWQgdHJlZSBub2RlIHVzaW5nXG4gICAqIEFERF9DSElMRFJFTiBhY3Rpb25cbiAgICogQHBhcmFtIGRhdGEgLSBkYXRhIHRvIGJlIGFkZGVkXG4gICAqIEBwYXJhbSBjYWxsYmFja1xuICAgKi9cbiAgb25BZGROZXdDbGljayA9IChkYXRhLCBjYWxsYmFjaykgPT4ge1xuICAgIGNvbnN0IHsgb25DaGFuZ2UsIHRyZWVEYXRhLCBpZEtleSB9ID0gdGhpcy5wcm9wcztcbiAgICBsZXQgbmV3SXRlbXMgPSB0cmVlRGF0YS5zbGljZSgpO1xuXG4gICAgLy8gSWYgbm8gdHJlZSBub2RlIGlzIHNlbGVjdGVkLCB3ZSdsbCBwbGFjZSB0aGUgbmV3IGl0ZW0gdG8gdGhlIHJvb3RcbiAgICAvLyBvZiB0aGUgdHJlZVxuICAgIGlmICghdGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF0pIHtcbiAgICAgIG5ld0l0ZW1zLnB1c2goZGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGFjdGlvbiA9IHtcbiAgICAgICAgdHlwZTogVFJFRV9BQ1RJT05TLkFERF9DSElMRFJFTixcbiAgICAgICAgZGF0YSxcbiAgICAgIH07XG4gICAgICBuZXdJdGVtcyA9IHRoaXMuZ2V0VXBkYXRlZFRyZWUodGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF0sIHRyZWVEYXRhLCBhY3Rpb24pO1xuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRLZXlzOiBbZGF0YVtpZEtleV1dIH0sICgpID0+IHtcbiAgICAgIC8vIElmIHRoZSBwYXJlbnQgaXMgbm90IHlldCBleHBhbmRlZCwgd2Ugd2lsbCBleHBhbmQgaXQgbm93XG4gICAgICBjb25zdCBwYXJlbnQgPSB0aGlzLmdldFRyZWVJdGVtKGRhdGFbaWRLZXldLCB0cmVlRGF0YSwgdHJ1ZSkgfHwge307XG4gICAgICB0aGlzLmV4cGFuZFBhcmVudChwYXJlbnRbaWRLZXldKTtcblxuICAgICAgaWYgKG9uQ2hhbmdlKSBvbkNoYW5nZShuZXdJdGVtcyk7XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH0pO1xuICB9O1xuXG4gIG9uTW92ZVRvR3JpZENsaWNrID0gKCkgPT4ge1xuICAgIHRoaXMubW92ZUl0ZW1Ub0dyaWQoKTtcbiAgfTtcblxuICAvKipcbiAgICogQ2FsbHMgb25DaGFuZ2UgY2FsbGJhY2sgd2hlbmV2ZXIgdXNlciByZW9yZGVycyB0cmVlIGl0ZW1zIHVzaW5nIG9yZGVyaW5nIGFycm93c1xuICAgKiBAcGFyYW0gaXRlbXNcbiAgICovXG4gIG9uT3JkZXJDbGljayA9IChpdGVtcykgPT4ge1xuICAgIHRoaXMucHJvcHMub25DaGFuZ2UoaXRlbXMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBZGRzIHNlbGVjdGVkIGdyaWQgaXRlbXMgdG8gdGhlIGNob3NlbiB0cmVlIG5vZGUgdXNpbmcgQUREX0NISUxEUkVOIGFjdGlvblxuICAgKi9cbiAgb25Nb3ZlVG9UcmVlQ2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgb25DaGFuZ2UsIHNlbGVjdGVkR3JpZEl0ZW1zLCBncmlkRGF0YSwgdHJlZURhdGEsIGlkS2V5LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHNlbGVjdGVkSWQgPSB0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXTtcblxuICAgIGNvbnN0IGFjdGlvbiA9IHtcbiAgICAgIHR5cGU6IFRSRUVfQUNUSU9OUy5BRERfQ0hJTERSRU4sXG4gICAgICBkYXRhOiBncmlkRGF0YS5maWx0ZXIoaSA9PiBzZWxlY3RlZEdyaWRJdGVtcy5pbmNsdWRlcyhpLmdldChpZEtleSkpKS50b0pTKCksXG4gICAgfTtcbiAgICBjb25zdCBuZXdJdGVtcyA9IHRoaXMuZ2V0VXBkYXRlZFRyZWUoc2VsZWN0ZWRJZCwgdHJlZURhdGEsIGFjdGlvbik7XG4gICAgY29uc3QgbmV3R3JpZEl0ZW1zID0gZ3JpZERhdGEuZmlsdGVyKGl0ZW0gPT4gIXNlbGVjdGVkR3JpZEl0ZW1zLmluY2x1ZGVzKGl0ZW0uZ2V0KGlkS2V5KSkpO1xuXG4gICAgdGhpcy5leHBhbmRQYXJlbnQoc2VsZWN0ZWRJZCwgdHJ1ZSk7XG4gICAgdGhpcy5zZXREYXRhVG9HcmlkKG5ld0dyaWRJdGVtcywgdHJ1ZSk7XG4gICAgaWYgKG9uQ2hhbmdlKSBvbkNoYW5nZShuZXdJdGVtcyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlbmFtZXMgdGhlIGNob3NlbiB0cmVlIG5vZGUgdXNpbmcgYSBSRU5BTUVfUEFSRU5UIGFjdGlvblxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICovXG4gIG9uSW5wdXRDaGFuZ2UgPSAodmFsdWUpID0+IHtcbiAgICBjb25zdCB7IHRyZWVEYXRhLCBvbkNoYW5nZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBhY3Rpb24gPSB7XG4gICAgICB0eXBlOiBUUkVFX0FDVElPTlMuUkVOQU1FX1BBUkVOVCxcbiAgICAgIGRhdGE6IHZhbHVlLFxuICAgIH07XG4gICAgY29uc3QgbmV3SXRlbXMgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdLCB0cmVlRGF0YSwgYWN0aW9uKTtcbiAgICBpZiAob25DaGFuZ2UpIG9uQ2hhbmdlKG5ld0l0ZW1zKTtcbiAgfTtcblxuICAvKipcbiAgICogRmlyZWQgb24gZXhwYW5kXG4gICAqIEBwYXJhbSBpZHNcbiAgICovXG4gIG9uRXhwYW5kID0gKGlkcykgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZXhwYW5kZWRLZXlzOiBpZHMsXG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdXBkYXRlZCB0cmVlIGl0ZW1zLlxuICAgKiBAcGFyYW0gaWQgLSB0YXJnZXQgaXRlbVxuICAgKiBAcGFyYW0gYXJyYXkgLSBhcnJheSB3aGVyZSB0YXJnZXQgaXRlbSBpcyBiZWluZyBzZWFyY2hlZFxuICAgKiBAcGFyYW0gYWN0aW9uIC0gYWN0aW9uIHRvIGJlIHBlcmZvcm1lZCB7dHlwZSwgZGF0YX1cbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBnZXRVcGRhdGVkVHJlZSA9IChpZCwgYXJyYXkgPSB0aGlzLnByb3BzLnRyZWVEYXRhLCBhY3Rpb24pID0+IHtcbiAgICBpZiAodGhpcy5pc1NlbGVjdGVkRGlzYWJsZWQoKSkgcmV0dXJuIGFycmF5O1xuXG4gICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgY29uc3QgeyBpZEtleSwgY2hpbGRLZXksIHZhbHVlS2V5IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IG5ld0l0ZW1zID0gYXJyYXkuc2xpY2UoKTtcbiAgICBjb25zdCByZW1vdmVBY3Rpb25zID0gW1RSRUVfQUNUSU9OUy5NT1ZFX0xFQUYsIFRSRUVfQUNUSU9OUy5ERUxFVEVfUEFSRU5UXTtcblxuICAgIC8vIElmIGRlbGV0ZWQgcGFyZW50IGl0ZW0gaXMgaW4gdGhlIHJvb3Qgbm9kZVxuICAgIGlmIChhY3Rpb24udHlwZSA9PT0gVFJFRV9BQ1RJT05TLkRFTEVURV9QQVJFTlQpIHtcbiAgICAgIGNvbnN0IHJvb3RJdGVtID0gYXJyYXkuZmluZChpdGVtID0+IGl0ZW1baWRLZXldID09PSBpZCk7XG4gICAgICBpZiAocm9vdEl0ZW0pIHtcbiAgICAgICAgaWYgKHJvb3RJdGVtW2NoaWxkS2V5XS5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLnNldERhdGFUb0dyaWQoZnJvbUpTKHRoaXMuZ2V0QWxsTGVhZnMocm9vdEl0ZW1bY2hpbGRLZXldKSkpO1xuICAgICAgICAgIHRoaXMuZGVzZWxlY3RJdGVtKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ld0l0ZW1zLmZpbHRlcihpdGVtID0+IGl0ZW1baWRLZXldICE9PSBpZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdJdGVtcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3QgaXRlbSA9IG5ld0l0ZW1zW2ldO1xuICAgICAgaWYgKHJlbW92ZUFjdGlvbnMuaW5jbHVkZXMoYWN0aW9uLnR5cGUpICYmIGl0ZW1bY2hpbGRLZXldICYmICFmb3VuZCkge1xuICAgICAgICBmb3VuZCA9ICEhaXRlbVtjaGlsZEtleV0uZmluZChjaGlsZCA9PiBjaGlsZFtpZEtleV0gPT09IGlkKTtcbiAgICAgICAgaWYgKGZvdW5kKSB7XG4gICAgICAgICAgLy8gV2hlbiByZW1vdmluZyBhbiBpdGVtIHdlIG11c3QgZmlyc3QgZmluZCBpdHMgcGFyZW50IGFuZCBhbHRlciBpdHMgY2hpbGRyZW4gYXJyYXlcbiAgICAgICAgICBpZiAoYWN0aW9uLnR5cGUgPT09IFRSRUVfQUNUSU9OUy5NT1ZFX0xFQUYpIHtcbiAgICAgICAgICAgIGl0ZW1bY2hpbGRLZXldID0gaXRlbVtjaGlsZEtleV0uZmlsdGVyKGNoaWxkID0+IGNoaWxkW2lkS2V5XSAhPT0gaWQpO1xuICAgICAgICAgICAgdGhpcy5kZXNlbGVjdEl0ZW0oKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGFjdGlvbi50eXBlID09PSBUUkVFX0FDVElPTlMuREVMRVRFX1BBUkVOVCkge1xuICAgICAgICAgICAgLy8gd2UgbXVzdCBmaXJzdCBmaWx0ZXIgdGhlIGNoaWxkcmVuLCBzbyB0aGF0IHdlIHdvbid0IGdldCBsZWFmcyBmcm9tXG4gICAgICAgICAgICAvLyBvdGhlciBjaGlsZCBicmFuY2hlc1xuICAgICAgICAgICAgY29uc3QgZmlsdGVyZWRDaGlsZHJlbiA9IGl0ZW1bY2hpbGRLZXldLmZpbHRlcihjaGlsZEl0ZW0gPT4gY2hpbGRJdGVtW2lkS2V5XSA9PT0gaWQpO1xuICAgICAgICAgICAgdGhpcy5zZXREYXRhVG9HcmlkKGZyb21KUyh0aGlzLmdldEFsbExlYWZzKGZpbHRlcmVkQ2hpbGRyZW4pKSk7XG4gICAgICAgICAgICB0aGlzLmRlc2VsZWN0SXRlbSgpO1xuICAgICAgICAgICAgaXRlbVtjaGlsZEtleV0gPSBpdGVtW2NoaWxkS2V5XS5maWx0ZXIoY2hpbGRJdGVtID0+IGNoaWxkSXRlbVtpZEtleV0gIT09IGlkKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1baWRLZXldID09PSBpZCAmJiAhZm91bmQpIHtcbiAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgICAgY2FzZSBUUkVFX0FDVElPTlMuQUREX0NISUxEUkVOOlxuICAgICAgICAgICAgaXRlbVtjaGlsZEtleV0gPSAoaXRlbVtjaGlsZEtleV0gfHwgW10pLmNvbmNhdChhY3Rpb24uZGF0YSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIFRSRUVfQUNUSU9OUy5SRU5BTUVfUEFSRU5UOlxuICAgICAgICAgICAgaXRlbVt2YWx1ZUtleV0gPSBhY3Rpb24uZGF0YTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBY3Rpb24gdHlwZSBpcyB1bmRlZmluZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtW2NoaWxkS2V5XSAmJiAhZm91bmQpIGZvdW5kID0gdGhpcy5nZXRVcGRhdGVkVHJlZShpZCwgaXRlbVtjaGlsZEtleV0sIGFjdGlvbik7XG4gICAgfVxuXG4gICAgaWYgKCFmb3VuZCkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiBuZXdJdGVtcztcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyByZWN1cnNpdmVseSBhbGwgbGVhZiBpdGVtcyBmcm9tIGEgZ2l2ZW4gYXJyYXlcbiAgICogQHBhcmFtIGFycmF5XG4gICAqIEBwYXJhbSBhbHJlYWR5Rm91bmQgKHVzZWQgcmVjdXJzaXZlbHkpXG4gICAqL1xuICBnZXRBbGxMZWFmcyA9IChhcnJheSwgYWxyZWFkeUZvdW5kID0gW10pID0+IHtcbiAgICBjb25zdCB7IGNoaWxkS2V5IH0gPSB0aGlzLnByb3BzO1xuICAgIGxldCBsZWFmcyA9IGFscmVhZHlGb3VuZDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSBhcnJheVtpXTtcbiAgICAgIGlmIChpdGVtW2NoaWxkS2V5XSkge1xuICAgICAgICBsZWFmcyA9IHRoaXMuZ2V0QWxsTGVhZnMoaXRlbVtjaGlsZEtleV0sIGFscmVhZHlGb3VuZCk7XG4gICAgICB9XG4gICAgICBpZiAoIWl0ZW1bY2hpbGRLZXldKSBsZWFmcy5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgICByZXR1cm4gbGVhZnM7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSB0cmVlIGl0ZW0gYnkgSURcbiAgICogQHBhcmFtIGlkXG4gICAqIEBwYXJhbSBhcnJheVxuICAgKiBAcGFyYW0gcmV0dXJuUGFyZW50IC0gcmV0dXJuIGl0ZW0ncyBwYXJlbnQgaW5zdGVhZCBvZiB0aGUgaXRlbVxuICAgKiBAcGFyYW0gcGFyZW50IC0gcGFyZW50IGl0ZW0gKHVzZWQgcmVjdXJzaXZlbHkpXG4gICAqIEByZXR1cm5zIHt7fX1cbiAgICovXG4gIGdldFRyZWVJdGVtID0gKGlkLCBhcnJheSA9IHRoaXMucHJvcHMudHJlZURhdGEsIHJldHVyblBhcmVudCA9IGZhbHNlLCBwYXJlbnQgPSBudWxsKSA9PiB7XG4gICAgY29uc3QgeyBjaGlsZEtleSwgaWRLZXkgfSA9IHRoaXMucHJvcHM7XG4gICAgbGV0IGZvdW5kID0gYXJyYXkuZmluZChpdGVtID0+IGl0ZW1baWRLZXldID09PSBpZCk7XG5cbiAgICBpZiAoZm91bmQgJiYgcmV0dXJuUGFyZW50KSBmb3VuZCA9IHBhcmVudDtcblxuICAgIGlmICghZm91bmQpIHtcbiAgICAgIGFycmF5LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgaWYgKGl0ZW1bY2hpbGRLZXldICYmICFmb3VuZCkge1xuICAgICAgICAgIGZvdW5kID0gdGhpcy5nZXRUcmVlSXRlbShpZCwgaXRlbVtjaGlsZEtleV0sIHJldHVyblBhcmVudCwgaXRlbSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gZm91bmQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIEdldCBhZGphY2VudCBpdGVtIChpZCkgaW4gcGFyZW50IGFycmF5LiBVc2VkIHdoZW4gbW92aW5nIGl0ZW1zIGZyb20gdHJlZVxuICAgKiB0byBncmlkL2RlbGV0aW5nIGFuIGl0ZW1cbiAgICogQHBhcmFtIGlkXG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgZ2V0QWRqYWNlbnRJdGVtID0gKGlkKSA9PiB7XG4gICAgaWYgKCFpZCkgcmV0dXJuIG51bGw7XG4gICAgY29uc3QgeyBjaGlsZEtleSwgaWRLZXksIHRyZWVEYXRhIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgZ2V0QWRqYWNlbnRJdGVtSWQgPSAocGFyZW50KSA9PiB7XG4gICAgICBjb25zdCBwYXJlbnRBcnIgPSBBcnJheS5pc0FycmF5KHBhcmVudCkgPyBwYXJlbnQgOiBwYXJlbnRbY2hpbGRLZXldO1xuICAgICAgY29uc3QgaW5kZXggPSBwYXJlbnRBcnIuZmluZEluZGV4KGNoaWxkID0+IGNoaWxkW2lkS2V5XSA9PT0gaWQpO1xuICAgICAgbGV0IGFkamFjZW50SXRlbSA9IHBhcmVudEFycltpbmRleCArIDFdO1xuICAgICAgaWYgKCFhZGphY2VudEl0ZW0pIGFkamFjZW50SXRlbSA9IHBhcmVudEFycltpbmRleCAtIDFdO1xuICAgICAgaWYgKCFhZGphY2VudEl0ZW0gJiYgIUFycmF5LmlzQXJyYXkocGFyZW50KSkgYWRqYWNlbnRJdGVtID0gcGFyZW50O1xuICAgICAgaWYgKCFhZGphY2VudEl0ZW0pIHJldHVybiBudWxsO1xuXG4gICAgICByZXR1cm4gYWRqYWNlbnRJdGVtW2lkS2V5XTtcbiAgICB9O1xuXG4gICAgY29uc3QgcGFyZW50ID0gdGhpcy5nZXRUcmVlSXRlbShpZCwgdGhpcy5wcm9wcy50cmVlRGF0YSwgdHJ1ZSk7XG4gICAgcmV0dXJuIHBhcmVudCA/IGdldEFkamFjZW50SXRlbUlkKHBhcmVudCkgOiBnZXRBZGphY2VudEl0ZW1JZCh0cmVlRGF0YSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEFwcGVuZHMgcHJvdmlkZWQgaXRlbXMgdG8gdGhlIGdyaWRcbiAgICogQHBhcmFtIGl0ZW1zIC0gaW1tdXRhYmxlIGFycmF5IG9mIGl0ZW1zIHRvIGJlIGFwcGVuZGVkIHRvIGdyaWRcbiAgICogQHBhcmFtIHNldE5ld0l0ZW1zIC0gc2V0IGNvbXBsZXRlbHkgYSBuZXcgYXJyYXkgb2YgaXRlbXNcbiAgICovXG4gIHNldERhdGFUb0dyaWQgPSAoaXRlbXMsIHNldE5ld0l0ZW1zID0gZmFsc2UpID0+IHtcbiAgICBsZXQgZGF0YSA9IExpc3QoKTtcbiAgICBjb25zdCB7IGdyaWQsIGdyaWRDb2x1bW5zLCBncmlkRGF0YSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIXNldE5ld0l0ZW1zKSBkYXRhID0gZ3JpZERhdGEuc2xpY2UoKTtcbiAgICBjb25zdCBuZXdHcmlkSXRlbXMgPSBkYXRhLmNvbmNhdChpdGVtcyk7XG5cbiAgICB0aGlzLnByb3BzLnNldERhdGEoZ3JpZCwgZ3JpZENvbHVtbnMsIG5ld0dyaWRJdGVtcyk7XG4gICAgdGhpcy5wcm9wcy5jbGVhclNlbGVjdGVkSXRlbXMoZ3JpZCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIENoZWNrcyB3aGV0aGVyIG9yIG5vdCBnaXZlbiBub2RlIGlzIGRpc2FibGVkXG4gICAqL1xuICBpc1NlbGVjdGVkRGlzYWJsZWQgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBsb2NrZWRLZXkgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgaXRlbSA9ICEhdGhpcy5nZXRUcmVlSXRlbSh0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXSk7XG4gICAgaWYgKCFpdGVtKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIGl0ZW1bbG9ja2VkS2V5XTtcbiAgfTtcblxuICAvKipcbiAgICogUmVtb3ZlcyB0aGUgY2hvc2VuIGl0ZW0gZnJvbSBhIHRyZWUgYW5kIHVwZGF0ZXMgdGhlIGdyaWQgdXNpbmcgTU9WRV9MRUFGXG4gICAqIGFjdGlvblxuICAgKi9cbiAgbW92ZUl0ZW1Ub0dyaWQgPSAoKSA9PiB7XG4gICAgY29uc3QgeyB0cmVlRGF0YSwgb25DaGFuZ2UgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgc2VsZWN0ZWRLZXkgPSB0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXTtcbiAgICBjb25zdCBhY3Rpb24gPSB7XG4gICAgICB0eXBlOiBUUkVFX0FDVElPTlMuTU9WRV9MRUFGLFxuICAgICAgZGF0YTogdGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF0sXG4gICAgfTtcbiAgICBjb25zdCBuZXh0U2VsZWN0ZWRLZXkgPSB0aGlzLmdldEFkamFjZW50SXRlbShzZWxlY3RlZEtleSk7XG4gICAgY29uc3QgbmV3R3JpZEl0ZW1zID0gZnJvbUpTKFt0aGlzLmdldFRyZWVJdGVtKHNlbGVjdGVkS2V5KV0pO1xuICAgIGNvbnN0IG5ld0l0ZW1zID0gdGhpcy5nZXRVcGRhdGVkVHJlZShzZWxlY3RlZEtleSwgdHJlZURhdGEsIGFjdGlvbik7XG5cbiAgICB0aGlzLnNldERhdGFUb0dyaWQobmV3R3JpZEl0ZW1zKTtcbiAgICBpZiAob25DaGFuZ2UpIG9uQ2hhbmdlKG5ld0l0ZW1zKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNlbGVjdGVkS2V5czogW25leHRTZWxlY3RlZEtleV0sXG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEV4cGFuZHMgYSBwYXJlbnRcbiAgICogQHBhcmFtIHBhcmVudElkXG4gICAqL1xuICBleHBhbmRQYXJlbnQgPSAocGFyZW50SWQpID0+IHtcbiAgICBpZiAocGFyZW50SWQgJiYgIXRoaXMuc3RhdGUuZXhwYW5kZWRLZXlzLmZpbmQoZXhwYW5kZWRJZCA9PiBleHBhbmRlZElkID09PSBwYXJlbnRJZCkpIHtcbiAgICAgIGNvbnN0IG5ld0V4cGFuZGVkS2V5cyA9IHRoaXMuc3RhdGUuZXhwYW5kZWRLZXlzLnNsaWNlKCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgIG5ld0V4cGFuZGVkS2V5cy5wdXNoKHBhcmVudElkKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBleHBhbmRlZEtleXM6IG5ld0V4cGFuZGVkS2V5cyB9KTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIENsb3NlcyBkZWxldGUgY29uZmlybWF0aW9uIGRpYWxvZ1xuICAgKi9cbiAgY2xvc2VEZWxldGVDb25maXJtYXRpb25EaWFsb2cgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNob3dEZWxldGVDb25maXJtYXRpb246IGZhbHNlIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBEZWxldGVzIGEgcGFyZW50IG5vZGVcbiAgICovXG4gIGRlbGV0ZVBhcmVudCA9ICgpID0+IHtcbiAgICBjb25zdCB7IG9uQ2hhbmdlLCB0cmVlRGF0YSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzZWxlY3RlZEtleSA9IHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdO1xuICAgIGNvbnN0IGFjdGlvbiA9IHtcbiAgICAgIHR5cGU6IFRSRUVfQUNUSU9OUy5ERUxFVEVfUEFSRU5ULFxuICAgIH07XG4gICAgY29uc3QgbmV4dFNlbGVjdGVkS2V5ID0gdGhpcy5nZXRBZGphY2VudEl0ZW0oc2VsZWN0ZWRLZXkpO1xuICAgIGNvbnN0IG5ld0l0ZW1zID0gdGhpcy5nZXRVcGRhdGVkVHJlZShzZWxlY3RlZEtleSwgdHJlZURhdGEsIGFjdGlvbik7XG4gICAgaWYgKG9uQ2hhbmdlKSBvbkNoYW5nZShuZXdJdGVtcyk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzZWxlY3RlZEtleXM6IFtuZXh0U2VsZWN0ZWRLZXldLFxuICAgICAgc2hvd0RlbGV0ZUNvbmZpcm1hdGlvbjogZmFsc2UsXG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIERlc2VsZWN0cyBhbiBpdGVtLCBpZiBpdCBpcyBlLmcuIHJlbW92ZWRcbiAgICovXG4gIGRlc2VsZWN0SXRlbSA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRLZXlzOiBbXSB9KTtcbiAgfTtcblxuICByZW5kZXJIZWFkZXJSaWdodCA9IHRyYW5zbGF0aW9ucyA9PiAoXG4gICAgPENvbnRyb2xCYXJcbiAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgb25BZGROZXdDbGljaz17dGhpcy5vbkFkZE5ld0NsaWNrfVxuICAgICAgb25EZWxldGVDbGljaz17dGhpcy5vbkRlbGV0ZUNsaWNrfVxuICAgICAgb25JbnB1dENoYW5nZT17dGhpcy5vbklucHV0Q2hhbmdlfVxuICAgICAgc2VsZWN0ZWRUcmVlSXRlbT17dGhpcy5nZXRUcmVlSXRlbSh0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXSl9XG4gICAgICBoZWlnaHQ9e0FDVElPTl9CQVJfQ09OVEFJTkVSX0hFSUdIVH1cbiAgICAgIHRyYW5zbGF0aW9ucz17dHJhbnNsYXRpb25zfVxuICAgIC8+XG4gICk7XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHZhbHVlS2V5LFxuICAgICAgaWRLZXksXG4gICAgICB0cmVlRGF0YSxcbiAgICAgIGdyaWQsXG4gICAgICBncmlkQ29sdW1ucyxcbiAgICAgIGNsYXNzTmFtZSxcbiAgICAgIHRyYW5zbGF0aW9ucyxcbiAgICAgIGNoaWxkS2V5LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgbWVyZ2VkR3JpZCA9IE9iamVjdC5hc3NpZ24oe30sIGdyaWQsIHsgZGVmYXVsdFNob3dGaWx0ZXJpbmdSb3c6IHRydWUgfSk7XG4gICAgY29uc3QgbWVyZ2VkVHJhbnNsYXRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdFRyYW5zbGF0aW9ucywgdHJhbnNsYXRpb25zKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8UmVhY3QuRnJhZ21lbnQ+XG4gICAgICAgIDxDb250YWluZXIgY2xhc3NOYW1lPXtjbGFzc05hbWV9PlxuICAgICAgICAgIDxUcmVlQ29udGFpbmVyPlxuICAgICAgICAgICAgPFRyZWVDb21wb25lbnRcbiAgICAgICAgICAgICAgdHJlZURhdGE9e3RyZWVEYXRhfVxuICAgICAgICAgICAgICBkYXRhTG9va1VwS2V5PXtpZEtleX1cbiAgICAgICAgICAgICAgZGF0YUxvb2tVcFZhbHVlPXt2YWx1ZUtleX1cbiAgICAgICAgICAgICAgZGF0YUxvb2tVcENoaWxkcmVuPXtjaGlsZEtleX1cbiAgICAgICAgICAgICAgb25TZWxlY3Q9e3RoaXMub25UcmVlSXRlbVNlbGVjdH1cbiAgICAgICAgICAgICAgb25FeHBhbmQ9e3RoaXMub25FeHBhbmR9XG4gICAgICAgICAgICAgIGNoZWNrYWJsZT17ZmFsc2V9XG4gICAgICAgICAgICAgIHNlbGVjdGVkS2V5cz17dGhpcy5zdGF0ZS5zZWxlY3RlZEtleXN9XG4gICAgICAgICAgICAgIGV4cGFuZGVkS2V5cz17dGhpcy5zdGF0ZS5leHBhbmRlZEtleXN9XG4gICAgICAgICAgICAgIG9uT3JkZXJCdXR0b25DbGljaz17dGhpcy5vbk9yZGVyQ2xpY2t9XG4gICAgICAgICAgICAgIHRpdGxlPXttZXJnZWRUcmFuc2xhdGlvbnMudHJlZVRpdGxlfVxuICAgICAgICAgICAgICBzZWxlY3RhYmxlXG4gICAgICAgICAgICAgIHNob3dPcmRlcmluZ0Fycm93c1xuICAgICAgICAgICAgICBzaG93RXhwYW5kQWxsXG4gICAgICAgICAgICAgIGhlYWRlclJpZ2h0PXt0aGlzLnJlbmRlckhlYWRlclJpZ2h0KG1lcmdlZFRyYW5zbGF0aW9ucyl9XG4gICAgICAgICAgICAgIGhhbmRsZUV4cGFuZGVkS2V5c01hbnVhbGx5XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvVHJlZUNvbnRhaW5lcj5cbiAgICAgICAgICA8QXJyb3dDb250cm9sc1xuICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICBzZWxlY3RlZFRyZWVJdGVtPXt0aGlzLmdldFRyZWVJdGVtKHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdKX1cbiAgICAgICAgICAgIG9uTW92ZVRvVHJlZUNsaWNrPXt0aGlzLm9uTW92ZVRvVHJlZUNsaWNrfVxuICAgICAgICAgICAgb25Nb3ZlVG9HcmlkQ2xpY2s9e3RoaXMub25Nb3ZlVG9HcmlkQ2xpY2t9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8R3JpZFxuICAgICAgICAgICAgZ3JpZD17bWVyZ2VkR3JpZH1cbiAgICAgICAgICAgIGNvbHVtbnM9e2dyaWRDb2x1bW5zfVxuICAgICAgICAgICAgbXVsdGlTZWxlY3RcbiAgICAgICAgICAgIGZpbHRlcmluZ1xuICAgICAgICAgICAgcm93U2VsZWN0Q2hlY2tib3hDb2x1bW5cbiAgICAgICAgICAgIGdyaWRIZWFkZXI9ezxQcmltaXRpdmUuU3VidGl0bGU+e21lcmdlZFRyYW5zbGF0aW9ucy5ncmlkVGl0bGV9PC9QcmltaXRpdmUuU3VidGl0bGU+fVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvQ29udGFpbmVyPlxuICAgICAgICB7dGhpcy5zdGF0ZS5zaG93RGVsZXRlQ29uZmlybWF0aW9uICYmIChcbiAgICAgICAgICA8Q29uZmlybURpYWxvZ1xuICAgICAgICAgICAgdHJhbnNsYXRpb25zPXttZXJnZWRUcmFuc2xhdGlvbnMuZGVsZXRlQ29uZmlybURpYWxvZ31cbiAgICAgICAgICAgIGNvbmZpcm1DYWxsYmFjaz17dGhpcy5kZWxldGVQYXJlbnR9XG4gICAgICAgICAgICBjYW5jZWxDYWxsYmFjaz17dGhpcy5jbG9zZURlbGV0ZUNvbmZpcm1hdGlvbkRpYWxvZ31cbiAgICAgICAgICAvPlxuICAgICAgICApfVxuICAgICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgICApO1xuICB9XG59XG4iXX0=