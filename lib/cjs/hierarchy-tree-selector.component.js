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

  var _proto = HierarchyTreeSelector.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (this.props.defaultExpandedKeys.length > 0 && prevProps.defaultExpandedKeys.length === 0) {
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
  defaultExpandedKeys: [],
  singleRoot: true
}), _temp)) || _class);
exports["default"] = HierarchyTreeSelector;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIkFDVElPTl9CQVJfQ09OVEFJTkVSX0hFSUdIVCIsIlRSRUVfQUNUSU9OUyIsIkFERF9DSElMRFJFTiIsIk1PVkVfTEVBRiIsIlJFTkFNRV9QQVJFTlQiLCJERUxFVEVfUEFSRU5UIiwiR3JpZCIsIkRhdGFncmlkIiwiQ29udGFpbmVyIiwic3R5bGVkIiwiZGl2IiwiVHJlZUNvbnRhaW5lciIsInByb3BzIiwidGhlbWUiLCJndXR0ZXJXaWR0aCIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsInNldERhdGEiLCJEYXRhZ3JpZEFjdGlvbnMiLCJjbGVhclNlbGVjdGVkSXRlbXMiLCJtYXBTdGF0ZVRvUHJvcHMiLCJzdGF0ZSIsImdyaWRJZCIsImdyaWQiLCJpZCIsInNlbGVjdGVkR3JpZEl0ZW1zIiwiZGF0YWdyaWQiLCJnZXRJbiIsImdyaWREYXRhIiwiSGllcmFyY2h5VHJlZVNlbGVjdG9yIiwic2VsZWN0ZWRLZXlzIiwib25TZWxlY3QiLCJsb2NrZWRLZXkiLCJzZWxlY3RlZEl0ZW0iLCJnZXRUcmVlSXRlbSIsInNldFN0YXRlIiwiY2hpbGRLZXkiLCJvblByZXZlbnREZWxldGUiLCJpdGVtIiwibW92ZUl0ZW1Ub0dyaWQiLCJsZWFmcyIsImdldEFsbExlYWZzIiwiZmluZCIsImxlYWYiLCJzaG93RGVsZXRlQ29uZmlybWF0aW9uIiwiZGF0YSIsImNhbGxiYWNrIiwib25DaGFuZ2UiLCJ0cmVlRGF0YSIsImlkS2V5IiwibmV3SXRlbXMiLCJzbGljZSIsInB1c2giLCJhY3Rpb24iLCJ0eXBlIiwiZ2V0VXBkYXRlZFRyZWUiLCJwYXJlbnQiLCJleHBhbmRQYXJlbnQiLCJpdGVtcyIsInNlbGVjdGVkSWQiLCJmaWx0ZXIiLCJpIiwiaW5jbHVkZXMiLCJnZXQiLCJ0b0pTIiwibmV3R3JpZEl0ZW1zIiwic2V0RGF0YVRvR3JpZCIsInZhbHVlIiwiaWRzIiwiZXhwYW5kZWRLZXlzIiwiYXJyYXkiLCJpc1NlbGVjdGVkRGlzYWJsZWQiLCJmb3VuZCIsInZhbHVlS2V5IiwicmVtb3ZlQWN0aW9ucyIsInJvb3RJdGVtIiwibGVuZ3RoIiwiZGVzZWxlY3RJdGVtIiwiY2hpbGQiLCJmaWx0ZXJlZENoaWxkcmVuIiwiY2hpbGRJdGVtIiwiY29uY2F0IiwiVHlwZUVycm9yIiwiYWxyZWFkeUZvdW5kIiwicmV0dXJuUGFyZW50IiwiZm9yRWFjaCIsImdldEFkamFjZW50SXRlbUlkIiwicGFyZW50QXJyIiwiQXJyYXkiLCJpc0FycmF5IiwiaW5kZXgiLCJmaW5kSW5kZXgiLCJhZGphY2VudEl0ZW0iLCJzZXROZXdJdGVtcyIsImdyaWRDb2x1bW5zIiwic2VsZWN0ZWRLZXkiLCJuZXh0U2VsZWN0ZWRLZXkiLCJnZXRBZGphY2VudEl0ZW0iLCJwYXJlbnRJZCIsImV4cGFuZGVkSWQiLCJuZXdFeHBhbmRlZEtleXMiLCJ0cmFuc2xhdGlvbnMiLCJvbkFkZE5ld0NsaWNrIiwib25EZWxldGVDbGljayIsIm9uSW5wdXRDaGFuZ2UiLCJjb21wb25lbnREaWRVcGRhdGUiLCJwcmV2UHJvcHMiLCJkZWZhdWx0RXhwYW5kZWRLZXlzIiwib25FeHBhbmQiLCJyZW5kZXIiLCJjbGFzc05hbWUiLCJtZXJnZWRHcmlkIiwiT2JqZWN0IiwiYXNzaWduIiwiZGVmYXVsdFNob3dGaWx0ZXJpbmdSb3ciLCJtZXJnZWRUcmFuc2xhdGlvbnMiLCJkZWZhdWx0VHJhbnNsYXRpb25zIiwib25UcmVlSXRlbVNlbGVjdCIsIm9uT3JkZXJDbGljayIsInRyZWVUaXRsZSIsInJlbmRlckhlYWRlclJpZ2h0Iiwib25Nb3ZlVG9UcmVlQ2xpY2siLCJvbk1vdmVUb0dyaWRDbGljayIsImdyaWRUaXRsZSIsImRlbGV0ZUNvbmZpcm1EaWFsb2ciLCJkZWxldGVQYXJlbnQiLCJjbG9zZURlbGV0ZUNvbmZpcm1hdGlvbkRpYWxvZyIsIlJlYWN0IiwiUHVyZUNvbXBvbmVudCIsInVuZGVmaW5lZCIsImRlZmF1bHRFeHBh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QUFRLEVBQUUsVUFIVTtBQUlwQkosRUFBQUEsU0FBUyxFQUFFaUcsU0FKUztBQUtwQmpGLEVBQUFBLFFBQVEsRUFBRSxFQUxVO0FBTXBCOEQsRUFBQUEsU0FBUyxFQUFFLEVBTlM7QUFPcEJULEVBQUFBLFlBQVksRUFBRWUsa0NBUE07QUFRcEI1RixFQUFBQSxFQUFFLEVBQUUsZ0JBUmdCO0FBU3BCTyxFQUFBQSxRQUFRLEVBQUVrRyxTQVRVO0FBVXBCbEYsRUFBQUEsUUFBUSxFQUFFa0YsU0FWVTtBQVdwQjVGLEVBQUFBLGVBQWUsRUFBRTRGLFNBWEc7QUFZcEJDLEVBQUFBLGdCQUFnQixFQUFFLElBWkU7QUFhcEJ2QixFQUFBQSxtQkFBbUIsRUFBRSxFQWJEO0FBY3BCd0IsRUFBQUEsVUFBVSxFQUFFO0FBZFEsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUcmVlQ29tcG9uZW50IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LXRyZWUtY29tcG9uZW50JztcbmltcG9ydCB7IFByaW1pdGl2ZSB9IGZyb20gJ0BvcHVzY2FwaXRhL29jLWNtLWNvbW1vbi1sYXlvdXRzJztcbmltcG9ydCB7XG4gIERhdGFncmlkLCBncmlkU2hhcGUsIGdyaWRDb2x1bW5TaGFwZSwgRGF0YWdyaWRBY3Rpb25zLFxufSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1ncmlkJztcbmltcG9ydCBDb25maXJtRGlhbG9nIGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWNvbmZpcm1hdGlvbi1kaWFsb2cnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHsgTGlzdCwgZnJvbUpTIH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCBJbW11dGFibGVQcm9wVHlwZXMgZnJvbSAncmVhY3QtaW1tdXRhYmxlLXByb3B0eXBlcyc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuLy8gQXBwIGltcG9ydHNcbmltcG9ydCBDb250cm9sQmFyIGZyb20gJy4vaGllcmFyY2h5LXRyZWUtc2VsZWN0b3ItY29udHJvbC1iYXIuY29tcG9uZW50JztcbmltcG9ydCBBcnJvd0NvbnRyb2xzIGZyb20gJy4vaGllcmFyY2h5LXRyZWUtc2VsZWN0b3ItYXJyb3ctY29udHJvbHMuY29tcG9uZW50JztcbmltcG9ydCB7IGRlZmF1bHRUcmFuc2xhdGlvbnMgfSBmcm9tICcuL2hpZXJhcmNoeS10cmVlLnV0aWxzJztcblxuY29uc3QgQUNUSU9OX0JBUl9DT05UQUlORVJfSEVJR0hUID0gJzU0cHgnO1xuY29uc3QgVFJFRV9BQ1RJT05TID0ge1xuICBBRERfQ0hJTERSRU46ICdBRERfQ0hJTERSRU4nLFxuICBNT1ZFX0xFQUY6ICdNT1ZFX0xFQUYnLFxuICBSRU5BTUVfUEFSRU5UOiAnUkVOQU1FX1BBUkVOVCcsXG4gIERFTEVURV9QQVJFTlQ6ICdERUxFVEVfUEFSRU5UJyxcbn07XG5cbmNvbnN0IEdyaWQgPSBzdHlsZWQoRGF0YWdyaWQpYFxuICBoZWlnaHQ6IDEwMCU7XG4gICYmJiB7XG4gICAgcGFkZGluZzogMDtcbiAgfVxuYDtcblxuY29uc3QgQ29udGFpbmVyID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogZmxleDtcbiAgbWluLWhlaWdodDogMzAwcHg7XG4gID4gZGl2IHtcbiAgICB3aWR0aDogNTAlO1xuICAgIGZsZXg6IDEgMSAxMDAlO1xuICB9XG5gO1xuXG5jb25zdCBUcmVlQ29udGFpbmVyID0gc3R5bGVkLmRpdmBcbiAgaGVpZ2h0OiAxMDAlO1xuICAub2Mtc2Nyb2xsYmFyLWNvbnRhaW5lciB7XG4gICAgaGVpZ2h0OiBjYWxjKDEwMCUgLSAke0FDVElPTl9CQVJfQ09OVEFJTkVSX0hFSUdIVH0pO1xuICAgIHBhZGRpbmc6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuZ3V0dGVyV2lkdGh9O1xuICB9XG4gIC50cmVlLWhlYWRlciB7XG4gICAgbWluLWhlaWdodDogJHtBQ1RJT05fQkFSX0NPTlRBSU5FUl9IRUlHSFR9O1xuICAgIC5vcmRlcmluZy1hcnJvd3Mge1xuICAgICAgZm9udC13ZWlnaHQ6IDI0cHg7XG4gICAgfVxuICB9XG4gIC5vYy1yZWFjdC10cmVlIHtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgLnJjLXRyZWUtaWNvbkVsZS5yYy10cmVlLWljb25fX2N1c3RvbWl6ZSB7XG4gICAgICBkaXNwbGF5OiBub25lO1xuICAgIH1cbiAgfVxuYDtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0ge1xuICBzZXREYXRhOiBEYXRhZ3JpZEFjdGlvbnMuc2V0RGF0YSxcbiAgY2xlYXJTZWxlY3RlZEl0ZW1zOiBEYXRhZ3JpZEFjdGlvbnMuY2xlYXJTZWxlY3RlZEl0ZW1zLFxufTtcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlLCBwcm9wcykgPT4ge1xuICBjb25zdCBncmlkSWQgPSBwcm9wcy5ncmlkLmlkO1xuICByZXR1cm4ge1xuICAgIHNlbGVjdGVkR3JpZEl0ZW1zOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbZ3JpZElkLCAnc2VsZWN0ZWRJdGVtcyddLCBMaXN0KCkpLFxuICAgIGdyaWREYXRhOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbZ3JpZElkLCAnYWxsRGF0YSddLCBMaXN0KCkpLFxuICB9O1xufTtcblxuQGNvbm5lY3QoXG4gIG1hcFN0YXRlVG9Qcm9wcyxcbiAgbWFwRGlzcGF0Y2hUb1Byb3BzLFxuKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGllcmFyY2h5VHJlZVNlbGVjdG9yIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgaWRLZXk6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdmFsdWVLZXk6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2hpbGRLZXk6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbG9ja2VkS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHRyZWVEYXRhOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc2hhcGUoe30pKSxcbiAgICBncmlkOiBncmlkU2hhcGUuaXNSZXF1aXJlZCxcbiAgICBncmlkQ29sdW1uczogUHJvcFR5cGVzLmFycmF5T2YoZ3JpZENvbHVtblNoYXBlKS5pc1JlcXVpcmVkLFxuICAgIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBzZXREYXRhOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGNsZWFyU2VsZWN0ZWRJdGVtczogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBzZWxlY3RlZEdyaWRJdGVtczogSW1tdXRhYmxlUHJvcFR5cGVzLmxpc3QuaXNSZXF1aXJlZCxcbiAgICBncmlkRGF0YTogSW1tdXRhYmxlUHJvcFR5cGVzLmxpc3QuaXNSZXF1aXJlZCxcbiAgICB0cmFuc2xhdGlvbnM6IFByb3BUeXBlcy5zaGFwZSh7fSksXG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGVmYXVsdEV4cGFuZEFsbDogUHJvcFR5cGVzLmJvb2wsXG4gICAgZGVmYXVsdEV4cGFuZGVkS2V5czogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZyksXG4gICAgc2luZ2xlUm9vdDogUHJvcFR5cGVzLmJvb2wsXG4gICAgLy8gQ2FsbGJhY2tzXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblByZXZlbnREZWxldGU6IFByb3BUeXBlcy5mdW5jLFxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgaWRLZXk6ICdpZCcsXG4gICAgdmFsdWVLZXk6ICduYW1lJyxcbiAgICBjaGlsZEtleTogJ2NoaWxkcmVuJyxcbiAgICBsb2NrZWRLZXk6IHVuZGVmaW5lZCxcbiAgICB0cmVlRGF0YTogW10sXG4gICAgY2xhc3NOYW1lOiAnJyxcbiAgICB0cmFuc2xhdGlvbnM6IGRlZmF1bHRUcmFuc2xhdGlvbnMsXG4gICAgaWQ6ICdoaWVyYXJjaHktdHJlZScsXG4gICAgb25TZWxlY3Q6IHVuZGVmaW5lZCxcbiAgICBvbkNoYW5nZTogdW5kZWZpbmVkLFxuICAgIG9uUHJldmVudERlbGV0ZTogdW5kZWZpbmVkLFxuICAgIGRlZmF1bHRFeHBhbmRBbGw6IHRydWUsXG4gICAgZGVmYXVsdEV4cGFuZGVkS2V5czogW10sXG4gICAgc2luZ2xlUm9vdDogdHJ1ZSxcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgc2VsZWN0ZWRLZXlzOiBbXSxcbiAgICAgIGV4cGFuZGVkS2V5czogW10sXG4gICAgICBzaG93RGVsZXRlQ29uZmlybWF0aW9uOiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xuICAgIGlmICh0aGlzLnByb3BzLmRlZmF1bHRFeHBhbmRlZEtleXMubGVuZ3RoID4gMCAmJiBwcmV2UHJvcHMuZGVmYXVsdEV4cGFuZGVkS2V5cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMub25FeHBhbmQodGhpcy5wcm9wcy5kZWZhdWx0RXhwYW5kZWRLZXlzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0cyBhIHRyZWUgaXRlbVxuICAgKiBAcGFyYW0gc2VsZWN0ZWRLZXlzIChhcnJheSlcbiAgICovXG4gIG9uVHJlZUl0ZW1TZWxlY3QgPSAoc2VsZWN0ZWRLZXlzKSA9PiB7XG4gICAgY29uc3QgeyBvblNlbGVjdCwgbG9ja2VkS2V5IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHNlbGVjdGVkSXRlbSA9IHRoaXMuZ2V0VHJlZUl0ZW0oc2VsZWN0ZWRLZXlzWzBdKTtcbiAgICBpZiAobG9ja2VkS2V5ICYmIHNlbGVjdGVkSXRlbSAmJiBzZWxlY3RlZEl0ZW1bbG9ja2VkS2V5XSkgcmV0dXJuO1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZEtleXMgfSwgKCkgPT4ge1xuICAgICAgaWYgKG9uU2VsZWN0KSBvblNlbGVjdChzZWxlY3RlZEtleXMpO1xuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBEaXNwbGF5cyBhIGNvbmZpcm1hdGlvbiBkaWFsb2dcbiAgICovXG4gIG9uRGVsZXRlQ2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBjaGlsZEtleSwgbG9ja2VkS2V5LCBvblByZXZlbnREZWxldGUgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgaXRlbSA9IHRoaXMuZ2V0VHJlZUl0ZW0odGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF0pO1xuICAgIC8vIElmIGl0ZW0gaXMgbm90IGEgcGFyZW50LCB3ZSB3b24ndCBzaG93IHRoZSBkZWxldGUgY29uZmlybWF0aW9uIGRpYWxvZ1xuICAgIGlmICghaXRlbVtjaGlsZEtleV0pIHtcbiAgICAgIHRoaXMubW92ZUl0ZW1Ub0dyaWQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAobG9ja2VkS2V5KSB7XG4gICAgICAvLyBJZiBpdCBpcyBhIHBhcmVudCwgd2Ugd2FudCB0byBjaGVjayB0aGF0IGl0IGRvZXNuJ3QgY29udGFpbiBhbnkgbG9ja2VkIGl0ZW1zXG4gICAgICBjb25zdCBsZWFmcyA9IHRoaXMuZ2V0QWxsTGVhZnMoaXRlbVtjaGlsZEtleV0pO1xuICAgICAgaWYgKGxlYWZzLmZpbmQobGVhZiA9PiBsZWFmW2xvY2tlZEtleV0pICYmIG9uUHJldmVudERlbGV0ZSkge1xuICAgICAgICBvblByZXZlbnREZWxldGUoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuc2V0U3RhdGUoeyBzaG93RGVsZXRlQ29uZmlybWF0aW9uOiB0cnVlIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBZGRzIGEgbmV3IG5vZGUgdG8gdGhlIHJvb3Qgb2YgdGhlIHRyZWUsIG9yIHVuZGVyIGEgc2VsZWN0ZWQgdHJlZSBub2RlIHVzaW5nXG4gICAqIEFERF9DSElMRFJFTiBhY3Rpb25cbiAgICogQHBhcmFtIGRhdGEgLSBkYXRhIHRvIGJlIGFkZGVkXG4gICAqIEBwYXJhbSBjYWxsYmFja1xuICAgKi9cbiAgb25BZGROZXdDbGljayA9IChkYXRhLCBjYWxsYmFjaykgPT4ge1xuICAgIGNvbnN0IHsgb25DaGFuZ2UsIHRyZWVEYXRhLCBpZEtleSB9ID0gdGhpcy5wcm9wcztcbiAgICBsZXQgbmV3SXRlbXMgPSB0cmVlRGF0YS5zbGljZSgpO1xuXG4gICAgLy8gSWYgbm8gdHJlZSBub2RlIGlzIHNlbGVjdGVkLCB3ZSdsbCBwbGFjZSB0aGUgbmV3IGl0ZW0gdG8gdGhlIHJvb3RcbiAgICAvLyBvZiB0aGUgdHJlZVxuICAgIGlmICghdGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF0pIHtcbiAgICAgIG5ld0l0ZW1zLnB1c2goZGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGFjdGlvbiA9IHtcbiAgICAgICAgdHlwZTogVFJFRV9BQ1RJT05TLkFERF9DSElMRFJFTixcbiAgICAgICAgZGF0YSxcbiAgICAgIH07XG4gICAgICBuZXdJdGVtcyA9IHRoaXMuZ2V0VXBkYXRlZFRyZWUodGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF0sIHRyZWVEYXRhLCBhY3Rpb24pO1xuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRLZXlzOiBbZGF0YVtpZEtleV1dIH0sICgpID0+IHtcbiAgICAgIC8vIElmIHRoZSBwYXJlbnQgaXMgbm90IHlldCBleHBhbmRlZCwgd2Ugd2lsbCBleHBhbmQgaXQgbm93XG4gICAgICBjb25zdCBwYXJlbnQgPSB0aGlzLmdldFRyZWVJdGVtKGRhdGFbaWRLZXldLCB0cmVlRGF0YSwgdHJ1ZSkgfHwge307XG4gICAgICB0aGlzLmV4cGFuZFBhcmVudChwYXJlbnRbaWRLZXldKTtcblxuICAgICAgaWYgKG9uQ2hhbmdlKSBvbkNoYW5nZShuZXdJdGVtcyk7XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH0pO1xuICB9O1xuXG4gIG9uTW92ZVRvR3JpZENsaWNrID0gKCkgPT4ge1xuICAgIHRoaXMubW92ZUl0ZW1Ub0dyaWQoKTtcbiAgfTtcblxuICAvKipcbiAgICogQ2FsbHMgb25DaGFuZ2UgY2FsbGJhY2sgd2hlbmV2ZXIgdXNlciByZW9yZGVycyB0cmVlIGl0ZW1zIHVzaW5nIG9yZGVyaW5nIGFycm93c1xuICAgKiBAcGFyYW0gaXRlbXNcbiAgICovXG4gIG9uT3JkZXJDbGljayA9IChpdGVtcykgPT4ge1xuICAgIHRoaXMucHJvcHMub25DaGFuZ2UoaXRlbXMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBZGRzIHNlbGVjdGVkIGdyaWQgaXRlbXMgdG8gdGhlIGNob3NlbiB0cmVlIG5vZGUgdXNpbmcgQUREX0NISUxEUkVOIGFjdGlvblxuICAgKi9cbiAgb25Nb3ZlVG9UcmVlQ2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgb25DaGFuZ2UsIHNlbGVjdGVkR3JpZEl0ZW1zLCBncmlkRGF0YSwgdHJlZURhdGEsIGlkS2V5LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHNlbGVjdGVkSWQgPSB0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXTtcblxuICAgIGNvbnN0IGFjdGlvbiA9IHtcbiAgICAgIHR5cGU6IFRSRUVfQUNUSU9OUy5BRERfQ0hJTERSRU4sXG4gICAgICBkYXRhOiBncmlkRGF0YS5maWx0ZXIoaSA9PiBzZWxlY3RlZEdyaWRJdGVtcy5pbmNsdWRlcyhpLmdldChpZEtleSkpKS50b0pTKCksXG4gICAgfTtcbiAgICBjb25zdCBuZXdJdGVtcyA9IHRoaXMuZ2V0VXBkYXRlZFRyZWUoc2VsZWN0ZWRJZCwgdHJlZURhdGEsIGFjdGlvbik7XG4gICAgY29uc3QgbmV3R3JpZEl0ZW1zID0gZ3JpZERhdGEuZmlsdGVyKGl0ZW0gPT4gIXNlbGVjdGVkR3JpZEl0ZW1zLmluY2x1ZGVzKGl0ZW0uZ2V0KGlkS2V5KSkpO1xuXG4gICAgdGhpcy5leHBhbmRQYXJlbnQoc2VsZWN0ZWRJZCwgdHJ1ZSk7XG4gICAgdGhpcy5zZXREYXRhVG9HcmlkKG5ld0dyaWRJdGVtcywgdHJ1ZSk7XG4gICAgaWYgKG9uQ2hhbmdlKSBvbkNoYW5nZShuZXdJdGVtcyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlbmFtZXMgdGhlIGNob3NlbiB0cmVlIG5vZGUgdXNpbmcgYSBSRU5BTUVfUEFSRU5UIGFjdGlvblxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICovXG4gIG9uSW5wdXRDaGFuZ2UgPSAodmFsdWUpID0+IHtcbiAgICBjb25zdCB7IHRyZWVEYXRhLCBvbkNoYW5nZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBhY3Rpb24gPSB7XG4gICAgICB0eXBlOiBUUkVFX0FDVElPTlMuUkVOQU1FX1BBUkVOVCxcbiAgICAgIGRhdGE6IHZhbHVlLFxuICAgIH07XG4gICAgY29uc3QgbmV3SXRlbXMgPSB0aGlzLmdldFVwZGF0ZWRUcmVlKHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdLCB0cmVlRGF0YSwgYWN0aW9uKTtcbiAgICBpZiAob25DaGFuZ2UpIG9uQ2hhbmdlKG5ld0l0ZW1zKTtcbiAgfTtcblxuICAvKipcbiAgICogRmlyZWQgb24gZXhwYW5kXG4gICAqIEBwYXJhbSBpZHNcbiAgICovXG4gIG9uRXhwYW5kID0gKGlkcykgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZXhwYW5kZWRLZXlzOiBpZHMsXG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdXBkYXRlZCB0cmVlIGl0ZW1zLlxuICAgKiBAcGFyYW0gaWQgLSB0YXJnZXQgaXRlbVxuICAgKiBAcGFyYW0gYXJyYXkgLSBhcnJheSB3aGVyZSB0YXJnZXQgaXRlbSBpcyBiZWluZyBzZWFyY2hlZFxuICAgKiBAcGFyYW0gYWN0aW9uIC0gYWN0aW9uIHRvIGJlIHBlcmZvcm1lZCB7dHlwZSwgZGF0YX1cbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBnZXRVcGRhdGVkVHJlZSA9IChpZCwgYXJyYXkgPSB0aGlzLnByb3BzLnRyZWVEYXRhLCBhY3Rpb24pID0+IHtcbiAgICBpZiAodGhpcy5pc1NlbGVjdGVkRGlzYWJsZWQoKSkgcmV0dXJuIGFycmF5O1xuXG4gICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgY29uc3QgeyBpZEtleSwgY2hpbGRLZXksIHZhbHVlS2V5IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IG5ld0l0ZW1zID0gYXJyYXkuc2xpY2UoKTtcbiAgICBjb25zdCByZW1vdmVBY3Rpb25zID0gW1RSRUVfQUNUSU9OUy5NT1ZFX0xFQUYsIFRSRUVfQUNUSU9OUy5ERUxFVEVfUEFSRU5UXTtcblxuICAgIC8vIElmIGRlbGV0ZWQgcGFyZW50IGl0ZW0gaXMgaW4gdGhlIHJvb3Qgbm9kZVxuICAgIGlmIChhY3Rpb24udHlwZSA9PT0gVFJFRV9BQ1RJT05TLkRFTEVURV9QQVJFTlQpIHtcbiAgICAgIGNvbnN0IHJvb3RJdGVtID0gYXJyYXkuZmluZChpdGVtID0+IGl0ZW1baWRLZXldID09PSBpZCk7XG4gICAgICBpZiAocm9vdEl0ZW0pIHtcbiAgICAgICAgaWYgKHJvb3RJdGVtW2NoaWxkS2V5XS5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLnNldERhdGFUb0dyaWQoZnJvbUpTKHRoaXMuZ2V0QWxsTGVhZnMocm9vdEl0ZW1bY2hpbGRLZXldKSkpO1xuICAgICAgICAgIHRoaXMuZGVzZWxlY3RJdGVtKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ld0l0ZW1zLmZpbHRlcihpdGVtID0+IGl0ZW1baWRLZXldICE9PSBpZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdJdGVtcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3QgaXRlbSA9IG5ld0l0ZW1zW2ldO1xuICAgICAgaWYgKHJlbW92ZUFjdGlvbnMuaW5jbHVkZXMoYWN0aW9uLnR5cGUpICYmIGl0ZW1bY2hpbGRLZXldICYmICFmb3VuZCkge1xuICAgICAgICBmb3VuZCA9ICEhaXRlbVtjaGlsZEtleV0uZmluZChjaGlsZCA9PiBjaGlsZFtpZEtleV0gPT09IGlkKTtcbiAgICAgICAgaWYgKGZvdW5kKSB7XG4gICAgICAgICAgLy8gV2hlbiByZW1vdmluZyBhbiBpdGVtIHdlIG11c3QgZmlyc3QgZmluZCBpdHMgcGFyZW50IGFuZCBhbHRlciBpdHMgY2hpbGRyZW4gYXJyYXlcbiAgICAgICAgICBpZiAoYWN0aW9uLnR5cGUgPT09IFRSRUVfQUNUSU9OUy5NT1ZFX0xFQUYpIHtcbiAgICAgICAgICAgIGl0ZW1bY2hpbGRLZXldID0gaXRlbVtjaGlsZEtleV0uZmlsdGVyKGNoaWxkID0+IGNoaWxkW2lkS2V5XSAhPT0gaWQpO1xuICAgICAgICAgICAgdGhpcy5kZXNlbGVjdEl0ZW0oKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGFjdGlvbi50eXBlID09PSBUUkVFX0FDVElPTlMuREVMRVRFX1BBUkVOVCkge1xuICAgICAgICAgICAgLy8gd2UgbXVzdCBmaXJzdCBmaWx0ZXIgdGhlIGNoaWxkcmVuLCBzbyB0aGF0IHdlIHdvbid0IGdldCBsZWFmcyBmcm9tXG4gICAgICAgICAgICAvLyBvdGhlciBjaGlsZCBicmFuY2hlc1xuICAgICAgICAgICAgY29uc3QgZmlsdGVyZWRDaGlsZHJlbiA9IGl0ZW1bY2hpbGRLZXldLmZpbHRlcihjaGlsZEl0ZW0gPT4gY2hpbGRJdGVtW2lkS2V5XSA9PT0gaWQpO1xuICAgICAgICAgICAgdGhpcy5zZXREYXRhVG9HcmlkKGZyb21KUyh0aGlzLmdldEFsbExlYWZzKGZpbHRlcmVkQ2hpbGRyZW4pKSk7XG4gICAgICAgICAgICB0aGlzLmRlc2VsZWN0SXRlbSgpO1xuICAgICAgICAgICAgaXRlbVtjaGlsZEtleV0gPSBpdGVtW2NoaWxkS2V5XS5maWx0ZXIoY2hpbGRJdGVtID0+IGNoaWxkSXRlbVtpZEtleV0gIT09IGlkKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1baWRLZXldID09PSBpZCAmJiAhZm91bmQpIHtcbiAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgICAgY2FzZSBUUkVFX0FDVElPTlMuQUREX0NISUxEUkVOOlxuICAgICAgICAgICAgaXRlbVtjaGlsZEtleV0gPSAoaXRlbVtjaGlsZEtleV0gfHwgW10pLmNvbmNhdChhY3Rpb24uZGF0YSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIFRSRUVfQUNUSU9OUy5SRU5BTUVfUEFSRU5UOlxuICAgICAgICAgICAgaXRlbVt2YWx1ZUtleV0gPSBhY3Rpb24uZGF0YTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBY3Rpb24gdHlwZSBpcyB1bmRlZmluZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtW2NoaWxkS2V5XSAmJiAhZm91bmQpIGZvdW5kID0gdGhpcy5nZXRVcGRhdGVkVHJlZShpZCwgaXRlbVtjaGlsZEtleV0sIGFjdGlvbik7XG4gICAgfVxuXG4gICAgaWYgKCFmb3VuZCkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiBuZXdJdGVtcztcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyByZWN1cnNpdmVseSBhbGwgbGVhZiBpdGVtcyBmcm9tIGEgZ2l2ZW4gYXJyYXlcbiAgICogQHBhcmFtIGFycmF5XG4gICAqIEBwYXJhbSBhbHJlYWR5Rm91bmQgKHVzZWQgcmVjdXJzaXZlbHkpXG4gICAqL1xuICBnZXRBbGxMZWFmcyA9IChhcnJheSwgYWxyZWFkeUZvdW5kID0gW10pID0+IHtcbiAgICBjb25zdCB7IGNoaWxkS2V5IH0gPSB0aGlzLnByb3BzO1xuICAgIGxldCBsZWFmcyA9IGFscmVhZHlGb3VuZDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSBhcnJheVtpXTtcbiAgICAgIGlmIChpdGVtW2NoaWxkS2V5XSkge1xuICAgICAgICBsZWFmcyA9IHRoaXMuZ2V0QWxsTGVhZnMoaXRlbVtjaGlsZEtleV0sIGFscmVhZHlGb3VuZCk7XG4gICAgICB9XG4gICAgICBpZiAoIWl0ZW1bY2hpbGRLZXldKSBsZWFmcy5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgICByZXR1cm4gbGVhZnM7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSB0cmVlIGl0ZW0gYnkgSURcbiAgICogQHBhcmFtIGlkXG4gICAqIEBwYXJhbSBhcnJheVxuICAgKiBAcGFyYW0gcmV0dXJuUGFyZW50IC0gcmV0dXJuIGl0ZW0ncyBwYXJlbnQgaW5zdGVhZCBvZiB0aGUgaXRlbVxuICAgKiBAcGFyYW0gcGFyZW50IC0gcGFyZW50IGl0ZW0gKHVzZWQgcmVjdXJzaXZlbHkpXG4gICAqIEByZXR1cm5zIHt7fX1cbiAgICovXG4gIGdldFRyZWVJdGVtID0gKGlkLCBhcnJheSA9IHRoaXMucHJvcHMudHJlZURhdGEsIHJldHVyblBhcmVudCA9IGZhbHNlLCBwYXJlbnQgPSBudWxsKSA9PiB7XG4gICAgY29uc3QgeyBjaGlsZEtleSwgaWRLZXkgfSA9IHRoaXMucHJvcHM7XG4gICAgbGV0IGZvdW5kID0gYXJyYXkuZmluZChpdGVtID0+IGl0ZW1baWRLZXldID09PSBpZCk7XG5cbiAgICBpZiAoZm91bmQgJiYgcmV0dXJuUGFyZW50KSBmb3VuZCA9IHBhcmVudDtcblxuICAgIGlmICghZm91bmQpIHtcbiAgICAgIGFycmF5LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgaWYgKGl0ZW1bY2hpbGRLZXldICYmICFmb3VuZCkge1xuICAgICAgICAgIGZvdW5kID0gdGhpcy5nZXRUcmVlSXRlbShpZCwgaXRlbVtjaGlsZEtleV0sIHJldHVyblBhcmVudCwgaXRlbSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gZm91bmQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIEdldCBhZGphY2VudCBpdGVtIChpZCkgaW4gcGFyZW50IGFycmF5LiBVc2VkIHdoZW4gbW92aW5nIGl0ZW1zIGZyb20gdHJlZVxuICAgKiB0byBncmlkL2RlbGV0aW5nIGFuIGl0ZW1cbiAgICogQHBhcmFtIGlkXG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgZ2V0QWRqYWNlbnRJdGVtID0gKGlkKSA9PiB7XG4gICAgaWYgKCFpZCkgcmV0dXJuIG51bGw7XG4gICAgY29uc3QgeyBjaGlsZEtleSwgaWRLZXksIHRyZWVEYXRhIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgZ2V0QWRqYWNlbnRJdGVtSWQgPSAocGFyZW50KSA9PiB7XG4gICAgICBjb25zdCBwYXJlbnRBcnIgPSBBcnJheS5pc0FycmF5KHBhcmVudCkgPyBwYXJlbnQgOiBwYXJlbnRbY2hpbGRLZXldO1xuICAgICAgY29uc3QgaW5kZXggPSBwYXJlbnRBcnIuZmluZEluZGV4KGNoaWxkID0+IGNoaWxkW2lkS2V5XSA9PT0gaWQpO1xuICAgICAgbGV0IGFkamFjZW50SXRlbSA9IHBhcmVudEFycltpbmRleCArIDFdO1xuICAgICAgaWYgKCFhZGphY2VudEl0ZW0pIGFkamFjZW50SXRlbSA9IHBhcmVudEFycltpbmRleCAtIDFdO1xuICAgICAgaWYgKCFhZGphY2VudEl0ZW0gJiYgIUFycmF5LmlzQXJyYXkocGFyZW50KSkgYWRqYWNlbnRJdGVtID0gcGFyZW50O1xuICAgICAgaWYgKCFhZGphY2VudEl0ZW0pIHJldHVybiBudWxsO1xuXG4gICAgICByZXR1cm4gYWRqYWNlbnRJdGVtW2lkS2V5XTtcbiAgICB9O1xuXG4gICAgY29uc3QgcGFyZW50ID0gdGhpcy5nZXRUcmVlSXRlbShpZCwgdGhpcy5wcm9wcy50cmVlRGF0YSwgdHJ1ZSk7XG4gICAgcmV0dXJuIHBhcmVudCA/IGdldEFkamFjZW50SXRlbUlkKHBhcmVudCkgOiBnZXRBZGphY2VudEl0ZW1JZCh0cmVlRGF0YSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEFwcGVuZHMgcHJvdmlkZWQgaXRlbXMgdG8gdGhlIGdyaWRcbiAgICogQHBhcmFtIGl0ZW1zIC0gaW1tdXRhYmxlIGFycmF5IG9mIGl0ZW1zIHRvIGJlIGFwcGVuZGVkIHRvIGdyaWRcbiAgICogQHBhcmFtIHNldE5ld0l0ZW1zIC0gc2V0IGNvbXBsZXRlbHkgYSBuZXcgYXJyYXkgb2YgaXRlbXNcbiAgICovXG4gIHNldERhdGFUb0dyaWQgPSAoaXRlbXMsIHNldE5ld0l0ZW1zID0gZmFsc2UpID0+IHtcbiAgICBsZXQgZGF0YSA9IExpc3QoKTtcbiAgICBjb25zdCB7IGdyaWQsIGdyaWRDb2x1bW5zLCBncmlkRGF0YSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIXNldE5ld0l0ZW1zKSBkYXRhID0gZ3JpZERhdGEuc2xpY2UoKTtcbiAgICBjb25zdCBuZXdHcmlkSXRlbXMgPSBkYXRhLmNvbmNhdChpdGVtcyk7XG5cbiAgICB0aGlzLnByb3BzLnNldERhdGEoZ3JpZCwgZ3JpZENvbHVtbnMsIG5ld0dyaWRJdGVtcyk7XG4gICAgdGhpcy5wcm9wcy5jbGVhclNlbGVjdGVkSXRlbXMoZ3JpZCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIENoZWNrcyB3aGV0aGVyIG9yIG5vdCBnaXZlbiBub2RlIGlzIGRpc2FibGVkXG4gICAqL1xuICBpc1NlbGVjdGVkRGlzYWJsZWQgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBsb2NrZWRLZXkgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgaXRlbSA9ICEhdGhpcy5nZXRUcmVlSXRlbSh0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXSk7XG4gICAgaWYgKCFpdGVtKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIGl0ZW1bbG9ja2VkS2V5XTtcbiAgfTtcblxuICAvKipcbiAgICogUmVtb3ZlcyB0aGUgY2hvc2VuIGl0ZW0gZnJvbSBhIHRyZWUgYW5kIHVwZGF0ZXMgdGhlIGdyaWQgdXNpbmcgTU9WRV9MRUFGXG4gICAqIGFjdGlvblxuICAgKi9cbiAgbW92ZUl0ZW1Ub0dyaWQgPSAoKSA9PiB7XG4gICAgY29uc3QgeyB0cmVlRGF0YSwgb25DaGFuZ2UgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgc2VsZWN0ZWRLZXkgPSB0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXTtcbiAgICBjb25zdCBhY3Rpb24gPSB7XG4gICAgICB0eXBlOiBUUkVFX0FDVElPTlMuTU9WRV9MRUFGLFxuICAgICAgZGF0YTogdGhpcy5zdGF0ZS5zZWxlY3RlZEtleXNbMF0sXG4gICAgfTtcbiAgICBjb25zdCBuZXh0U2VsZWN0ZWRLZXkgPSB0aGlzLmdldEFkamFjZW50SXRlbShzZWxlY3RlZEtleSk7XG4gICAgY29uc3QgbmV3R3JpZEl0ZW1zID0gZnJvbUpTKFt0aGlzLmdldFRyZWVJdGVtKHNlbGVjdGVkS2V5KV0pO1xuICAgIGNvbnN0IG5ld0l0ZW1zID0gdGhpcy5nZXRVcGRhdGVkVHJlZShzZWxlY3RlZEtleSwgdHJlZURhdGEsIGFjdGlvbik7XG5cbiAgICB0aGlzLnNldERhdGFUb0dyaWQobmV3R3JpZEl0ZW1zKTtcbiAgICBpZiAob25DaGFuZ2UpIG9uQ2hhbmdlKG5ld0l0ZW1zKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNlbGVjdGVkS2V5czogW25leHRTZWxlY3RlZEtleV0sXG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEV4cGFuZHMgYSBwYXJlbnRcbiAgICogQHBhcmFtIHBhcmVudElkXG4gICAqL1xuICBleHBhbmRQYXJlbnQgPSAocGFyZW50SWQpID0+IHtcbiAgICBpZiAocGFyZW50SWQgJiYgIXRoaXMuc3RhdGUuZXhwYW5kZWRLZXlzLmZpbmQoZXhwYW5kZWRJZCA9PiBleHBhbmRlZElkID09PSBwYXJlbnRJZCkpIHtcbiAgICAgIGNvbnN0IG5ld0V4cGFuZGVkS2V5cyA9IHRoaXMuc3RhdGUuZXhwYW5kZWRLZXlzLnNsaWNlKCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgIG5ld0V4cGFuZGVkS2V5cy5wdXNoKHBhcmVudElkKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBleHBhbmRlZEtleXM6IG5ld0V4cGFuZGVkS2V5cyB9KTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIENsb3NlcyBkZWxldGUgY29uZmlybWF0aW9uIGRpYWxvZ1xuICAgKi9cbiAgY2xvc2VEZWxldGVDb25maXJtYXRpb25EaWFsb2cgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNob3dEZWxldGVDb25maXJtYXRpb246IGZhbHNlIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBEZWxldGVzIGEgcGFyZW50IG5vZGVcbiAgICovXG4gIGRlbGV0ZVBhcmVudCA9ICgpID0+IHtcbiAgICBjb25zdCB7IG9uQ2hhbmdlLCB0cmVlRGF0YSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzZWxlY3RlZEtleSA9IHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdO1xuICAgIGNvbnN0IGFjdGlvbiA9IHtcbiAgICAgIHR5cGU6IFRSRUVfQUNUSU9OUy5ERUxFVEVfUEFSRU5ULFxuICAgIH07XG4gICAgY29uc3QgbmV4dFNlbGVjdGVkS2V5ID0gdGhpcy5nZXRBZGphY2VudEl0ZW0oc2VsZWN0ZWRLZXkpO1xuICAgIGNvbnN0IG5ld0l0ZW1zID0gdGhpcy5nZXRVcGRhdGVkVHJlZShzZWxlY3RlZEtleSwgdHJlZURhdGEsIGFjdGlvbik7XG4gICAgaWYgKG9uQ2hhbmdlKSBvbkNoYW5nZShuZXdJdGVtcyk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzZWxlY3RlZEtleXM6IFtuZXh0U2VsZWN0ZWRLZXldLFxuICAgICAgc2hvd0RlbGV0ZUNvbmZpcm1hdGlvbjogZmFsc2UsXG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIERlc2VsZWN0cyBhbiBpdGVtLCBpZiBpdCBpcyBlLmcuIHJlbW92ZWRcbiAgICovXG4gIGRlc2VsZWN0SXRlbSA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRLZXlzOiBbXSB9KTtcbiAgfTtcblxuICByZW5kZXJIZWFkZXJSaWdodCA9IHRyYW5zbGF0aW9ucyA9PiAoXG4gICAgPENvbnRyb2xCYXJcbiAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgb25BZGROZXdDbGljaz17dGhpcy5vbkFkZE5ld0NsaWNrfVxuICAgICAgb25EZWxldGVDbGljaz17dGhpcy5vbkRlbGV0ZUNsaWNrfVxuICAgICAgb25JbnB1dENoYW5nZT17dGhpcy5vbklucHV0Q2hhbmdlfVxuICAgICAgc2VsZWN0ZWRUcmVlSXRlbT17dGhpcy5nZXRUcmVlSXRlbSh0aGlzLnN0YXRlLnNlbGVjdGVkS2V5c1swXSl9XG4gICAgICBoZWlnaHQ9e0FDVElPTl9CQVJfQ09OVEFJTkVSX0hFSUdIVH1cbiAgICAgIHRyYW5zbGF0aW9ucz17dHJhbnNsYXRpb25zfVxuICAgIC8+XG4gICk7XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHZhbHVlS2V5LFxuICAgICAgaWRLZXksXG4gICAgICB0cmVlRGF0YSxcbiAgICAgIGdyaWQsXG4gICAgICBncmlkQ29sdW1ucyxcbiAgICAgIGNsYXNzTmFtZSxcbiAgICAgIHRyYW5zbGF0aW9ucyxcbiAgICAgIGNoaWxkS2V5LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgbWVyZ2VkR3JpZCA9IE9iamVjdC5hc3NpZ24oe30sIGdyaWQsIHsgZGVmYXVsdFNob3dGaWx0ZXJpbmdSb3c6IHRydWUgfSk7XG4gICAgY29uc3QgbWVyZ2VkVHJhbnNsYXRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdFRyYW5zbGF0aW9ucywgdHJhbnNsYXRpb25zKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8UmVhY3QuRnJhZ21lbnQ+XG4gICAgICAgIDxDb250YWluZXIgY2xhc3NOYW1lPXtjbGFzc05hbWV9PlxuICAgICAgICAgIDxUcmVlQ29udGFpbmVyPlxuICAgICAgICAgICAgPFRyZWVDb21wb25lbnRcbiAgICAgICAgICAgICAgdHJlZURhdGE9e3RyZWVEYXRhfVxuICAgICAgICAgICAgICBkYXRhTG9va1VwS2V5PXtpZEtleX1cbiAgICAgICAgICAgICAgZGF0YUxvb2tVcFZhbHVlPXt2YWx1ZUtleX1cbiAgICAgICAgICAgICAgZGF0YUxvb2tVcENoaWxkcmVuPXtjaGlsZEtleX1cbiAgICAgICAgICAgICAgb25TZWxlY3Q9e3RoaXMub25UcmVlSXRlbVNlbGVjdH1cbiAgICAgICAgICAgICAgb25FeHBhbmQ9e3RoaXMub25FeHBhbmR9XG4gICAgICAgICAgICAgIGNoZWNrYWJsZT17ZmFsc2V9XG4gICAgICAgICAgICAgIHNlbGVjdGVkS2V5cz17dGhpcy5zdGF0ZS5zZWxlY3RlZEtleXN9XG4gICAgICAgICAgICAgIGV4cGFuZGVkS2V5cz17dGhpcy5zdGF0ZS5leHBhbmRlZEtleXN9XG4gICAgICAgICAgICAgIG9uT3JkZXJCdXR0b25DbGljaz17dGhpcy5vbk9yZGVyQ2xpY2t9XG4gICAgICAgICAgICAgIHRpdGxlPXttZXJnZWRUcmFuc2xhdGlvbnMudHJlZVRpdGxlfVxuICAgICAgICAgICAgICBzZWxlY3RhYmxlXG4gICAgICAgICAgICAgIHNob3dPcmRlcmluZ0Fycm93c1xuICAgICAgICAgICAgICBzaG93RXhwYW5kQWxsXG4gICAgICAgICAgICAgIGhlYWRlclJpZ2h0PXt0aGlzLnJlbmRlckhlYWRlclJpZ2h0KG1lcmdlZFRyYW5zbGF0aW9ucyl9XG4gICAgICAgICAgICAgIGhhbmRsZUV4cGFuZGVkS2V5c01hbnVhbGx5XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvVHJlZUNvbnRhaW5lcj5cbiAgICAgICAgICA8QXJyb3dDb250cm9sc1xuICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICBzZWxlY3RlZFRyZWVJdGVtPXt0aGlzLmdldFRyZWVJdGVtKHRoaXMuc3RhdGUuc2VsZWN0ZWRLZXlzWzBdKX1cbiAgICAgICAgICAgIG9uTW92ZVRvVHJlZUNsaWNrPXt0aGlzLm9uTW92ZVRvVHJlZUNsaWNrfVxuICAgICAgICAgICAgb25Nb3ZlVG9HcmlkQ2xpY2s9e3RoaXMub25Nb3ZlVG9HcmlkQ2xpY2t9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8R3JpZFxuICAgICAgICAgICAgZ3JpZD17bWVyZ2VkR3JpZH1cbiAgICAgICAgICAgIGNvbHVtbnM9e2dyaWRDb2x1bW5zfVxuICAgICAgICAgICAgbXVsdGlTZWxlY3RcbiAgICAgICAgICAgIGZpbHRlcmluZ1xuICAgICAgICAgICAgcm93U2VsZWN0Q2hlY2tib3hDb2x1bW5cbiAgICAgICAgICAgIGdyaWRIZWFkZXI9ezxQcmltaXRpdmUuU3VidGl0bGU+e21lcmdlZFRyYW5zbGF0aW9ucy5ncmlkVGl0bGV9PC9QcmltaXRpdmUuU3VidGl0bGU+fVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvQ29udGFpbmVyPlxuICAgICAgICB7dGhpcy5zdGF0ZS5zaG93RGVsZXRlQ29uZmlybWF0aW9uICYmIChcbiAgICAgICAgICA8Q29uZmlybURpYWxvZ1xuICAgICAgICAgICAgdHJhbnNsYXRpb25zPXttZXJnZWRUcmFuc2xhdGlvbnMuZGVsZXRlQ29uZmlybURpYWxvZ31cbiAgICAgICAgICAgIGNvbmZpcm1DYWxsYmFjaz17dGhpcy5kZWxldGVQYXJlbnR9XG4gICAgICAgICAgICBjYW5jZWxDYWxsYmFjaz17dGhpcy5jbG9zZURlbGV0ZUNvbmZpcm1hdGlvbkRpYWxvZ31cbiAgICAgICAgICAvPlxuICAgICAgICApfVxuICAgICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgICApO1xuICB9XG59XG4iXX0=