"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ocCmCommonLayouts = require("@opuscapita/oc-cm-common-layouts");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _uuid = _interopRequireDefault(require("uuid"));

var _hierarchyTree = require("./hierarchy-tree.utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject5() {
  var data = _taggedTemplateLiteralLoose(["\n  min-width: 200px;\n  margin-right: 4rem;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteralLoose(["\n  display: flex;\n  align-items: center;\n  margin-left: auto;\n  margin-right: 0;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteralLoose(["\n  margin-left: ", ";\n  min-width: 124px;\n  padding: 0.5rem;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteralLoose(["\n  height: ", ";\n  display: flex;\n  align-items: center;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteralLoose(["\n  margin: 0 ", " 0 0;\n  white-space: nowrap;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteralLoose(strings, raw) { if (!raw) { raw = strings.slice(0); } strings.raw = raw; return strings; }

var RenameLabel = _styledComponents["default"].label(_templateObject(), function (props) {
  return props.theme.halfGutterWidth;
});

var Container = _styledComponents["default"].div(_templateObject2(), function (props) {
  return props.height;
});

var Button = (0, _styledComponents["default"])(_ocCmCommonLayouts.Primitive.Button)(_templateObject3(), function (props) {
  return props.theme.halfGutterWidth;
});

var Controls = _styledComponents["default"].div(_templateObject4());

var RenameField = (0, _styledComponents["default"])(_ocCmCommonLayouts.Primitive.Input)(_templateObject5());

var HierarchyTreeSelectorControlBar =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(HierarchyTreeSelectorControlBar, _React$PureComponent);

  function HierarchyTreeSelectorControlBar(props) {
    var _this;

    _this = _React$PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "onInputChange", function (e) {
      _this.setState({
        value: e.target.value
      }, function () {
        _this.props.onInputChange(_this.state.value);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onAddButtonClick", function () {
      var _onAddNewClick;

      var _this$props = _this.props,
          onAddNewClick = _this$props.onAddNewClick,
          translations = _this$props.translations,
          idKey = _this$props.idKey,
          valueKey = _this$props.valueKey,
          childKey = _this$props.childKey;
      onAddNewClick((_onAddNewClick = {}, _onAddNewClick[idKey] = (0, _uuid["default"])(), _onAddNewClick[valueKey] = translations.defaultNewNode, _onAddNewClick[childKey] = [], _onAddNewClick), function () {
        setTimeout(function () {
          _this.input.select();

          _this.input.focus();
        }, 50);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onDeleteButtonClick", function () {
      var onDeleteClick = _this.props.onDeleteClick;
      onDeleteClick();
    });

    _defineProperty(_assertThisInitialized(_this), "onRenameFieldKeyDown", function (e) {
      if (e.keyCode === 13) _this.input.blur();
    });

    _defineProperty(_assertThisInitialized(_this), "isAddDisabled", function () {
      var _this$props2 = _this.props,
          selectedTreeItem = _this$props2.selectedTreeItem,
          childKey = _this$props2.childKey,
          singleRoot = _this$props2.singleRoot; // If only a single root is allowed, we can't add new items if no items are selected

      if (!selectedTreeItem) return singleRoot;
      return !(0, _hierarchyTree.isSelectedTreeItemParent)(_this.props) || !!selectedTreeItem[childKey].find(function (childItem) {
        return !childItem[childKey];
      });
    });

    _defineProperty(_assertThisInitialized(_this), "isDeleteDisabled", function () {
      var singleRoot = _this.props.singleRoot;
      if (!_this.props.selectedTreeItem) return true;
      return !!(singleRoot && (0, _hierarchyTree.isSelectedTreeItemRoot)(_this.props));
    });

    _this.state = {
      value: ''
    };
    return _this;
  }

  var _proto = HierarchyTreeSelectorControlBar.prototype;

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (this.props.selectedTreeItem !== nextProps.selectedTreeItem) {
      var inputValue = nextProps.selectedTreeItem && (0, _hierarchyTree.isSelectedTreeItemParent)(nextProps) ? nextProps.selectedTreeItem[nextProps.valueKey] : '';
      this.setState({
        value: inputValue
      });
    }
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props3 = this.props,
        translations = _this$props3.translations,
        id = _this$props3.id,
        height = _this$props3.height;
    return _react["default"].createElement(Container, {
      height: height
    }, _react["default"].createElement(Controls, null, _react["default"].createElement(RenameLabel, {
      htmlFor: id + "-node-name-input"
    }, translations.rename), _react["default"].createElement(RenameField, {
      onChange: this.onInputChange,
      id: id + "-node-name-input",
      value: this.state.value,
      disabled: !(0, _hierarchyTree.isSelectedTreeItemParent)(this.props),
      ref: function ref(input) {
        _this2.input = input;
      },
      onKeyDown: this.onRenameFieldKeyDown
    }), _react["default"].createElement(Button, {
      onClick: this.onAddButtonClick,
      disabled: this.isAddDisabled(),
      type: "button"
    }, translations.add), _react["default"].createElement(Button, {
      onClick: this.onDeleteButtonClick,
      disabled: this.isDeleteDisabled(),
      type: "button"
    }, translations["delete"])));
  };

  return HierarchyTreeSelectorControlBar;
}(_react["default"].PureComponent);

exports["default"] = HierarchyTreeSelectorControlBar;
HierarchyTreeSelectorControlBar.defaultProps = {
  selectedTreeItem: null
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci1jb250cm9sLWJhci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlbmFtZUxhYmVsIiwic3R5bGVkIiwibGFiZWwiLCJwcm9wcyIsInRoZW1lIiwiaGFsZkd1dHRlcldpZHRoIiwiQ29udGFpbmVyIiwiZGl2IiwiaGVpZ2h0IiwiQnV0dG9uIiwiUHJpbWl0aXZlIiwiQ29udHJvbHMiLCJSZW5hbWVGaWVsZCIsIklucHV0IiwiSGllcmFyY2h5VHJlZVNlbGVjdG9yQ29udHJvbEJhciIsImUiLCJzZXRTdGF0ZSIsInZhbHVlIiwidGFyZ2V0Iiwib25JbnB1dENoYW5nZSIsInN0YXRlIiwib25BZGROZXdDbGljayIsInRyYW5zbGF0aW9ucyIsImlkS2V5IiwidmFsdWVLZXkiLCJjaGlsZEtleSIsImRlZmF1bHROZXdOb2RlIiwic2V0VGltZW91dCIsImlucHV0Iiwic2VsZWN0IiwiZm9jdXMiLCJvbkRlbGV0ZUNsaWNrIiwia2V5Q29kZSIsImJsdXIiLCJzZWxlY3RlZFRyZWVJdGVtIiwic2luZ2xlUm9vdCIsImZpbmQiLCJjaGlsZEl0ZW0iLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwibmV4dFByb3BzIiwiaW5wdXRWYWx1ZSIsInJlbmRlciIsImlkIiwicmVuYW1lIiwib25SZW5hbWVGaWVsZEtleURvd24iLCJvbkFkZEJ1dHRvbkNsaWNrIiwiaXNBZGREaXNhYmxlZCIsImFkZCIsIm9uRGVsZXRlQnV0dG9uQ2xpY2siLCJpc0RlbGV0ZURpc2FibGVkIiwiUmVhY3QiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUdBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLFdBQVcsR0FBR0MsNkJBQU9DLEtBQVYs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QUNkLFFBQUEsTUFBSSxDQUFDQSxLQUFMLEdBQWFBLEtBQWI7QUFDRCxPQVBIO0FBUUUsTUFBQSxTQUFTLEVBQUUsS0FBS2dCO0FBUmxCLE1BRkYsRUFhRSxnQ0FBQyxNQUFEO0FBQ0UsTUFBQSxPQUFPLEVBQUUsS0FBS0MsZ0JBRGhCO0FBRUUsTUFBQSxRQUFRLEVBQUUsS0FBS0MsYUFBTCxFQUZaO0FBR0UsTUFBQSxJQUFJLEVBQUM7QUFIUCxPQUtHeEIsWUFBWSxDQUFDeUIsR0FMaEIsQ0FiRixFQW9CRSxnQ0FBQyxNQUFEO0FBQ0UsTUFBQSxPQUFPLEVBQUUsS0FBS0MsbUJBRGhCO0FBRUUsTUFBQSxRQUFRLEVBQUUsS0FBS0MsZ0JBQUwsRUFGWjtBQUdFLE1BQUEsSUFBSSxFQUFDO0FBSFAsT0FLRzNCLFlBQVksVUFMZixDQXBCRixDQURGLENBREY7QUFnQ0QsRzs7O0VBdkgwRDRCLGtCQUFNQyxhOzs7QUE2SW5FckMsK0JBQStCLENBQUNzQyxZQUFoQyxHQUErQztBQUM3Q2xCLEVBQUFBLGdCQUFnQixFQUFFO0FBRDJCLENBQS9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBQcmltaXRpdmUgfSBmcm9tICdAb3B1c2NhcGl0YS9vYy1jbS1jb21tb24tbGF5b3V0cyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCB1dWlkIGZyb20gJ3V1aWQnO1xuXG4vLyBBcHAgaW1wb3J0c1xuaW1wb3J0IHsgaXNTZWxlY3RlZFRyZWVJdGVtUGFyZW50LCBpc1NlbGVjdGVkVHJlZUl0ZW1Sb290IH0gZnJvbSAnLi9oaWVyYXJjaHktdHJlZS51dGlscyc7XG5cbmNvbnN0IFJlbmFtZUxhYmVsID0gc3R5bGVkLmxhYmVsYFxuICBtYXJnaW46IDAgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5oYWxmR3V0dGVyV2lkdGh9IDAgMDtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbmA7XG5cbmNvbnN0IENvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gIGhlaWdodDogJHtwcm9wcyA9PiBwcm9wcy5oZWlnaHR9O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuYDtcblxuY29uc3QgQnV0dG9uID0gc3R5bGVkKFByaW1pdGl2ZS5CdXR0b24pYFxuICBtYXJnaW4tbGVmdDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5oYWxmR3V0dGVyV2lkdGh9O1xuICBtaW4td2lkdGg6IDEyNHB4O1xuICBwYWRkaW5nOiAwLjVyZW07XG5gO1xuXG5jb25zdCBDb250cm9scyA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICBtYXJnaW4tcmlnaHQ6IDA7XG5gO1xuXG5jb25zdCBSZW5hbWVGaWVsZCA9IHN0eWxlZChQcmltaXRpdmUuSW5wdXQpYFxuICBtaW4td2lkdGg6IDIwMHB4O1xuICBtYXJnaW4tcmlnaHQ6IDRyZW07XG5gO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGllcmFyY2h5VHJlZVNlbGVjdG9yQ29udHJvbEJhciBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdmFsdWU6ICcnLFxuICAgIH07XG4gIH1cblxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdGVkVHJlZUl0ZW0gIT09IG5leHRQcm9wcy5zZWxlY3RlZFRyZWVJdGVtKSB7XG4gICAgICBjb25zdCBpbnB1dFZhbHVlID0gbmV4dFByb3BzLnNlbGVjdGVkVHJlZUl0ZW1cbiAgICAgICYmIGlzU2VsZWN0ZWRUcmVlSXRlbVBhcmVudChuZXh0UHJvcHMpXG4gICAgICAgID8gbmV4dFByb3BzLnNlbGVjdGVkVHJlZUl0ZW1bbmV4dFByb3BzLnZhbHVlS2V5XSA6ICcnO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IHZhbHVlOiBpbnB1dFZhbHVlIH0pO1xuICAgIH1cbiAgfVxuXG4gIG9uSW5wdXRDaGFuZ2UgPSAoZSkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyB2YWx1ZTogZS50YXJnZXQudmFsdWUgfSwgKCkgPT4ge1xuICAgICAgdGhpcy5wcm9wcy5vbklucHV0Q2hhbmdlKHRoaXMuc3RhdGUudmFsdWUpO1xuICAgIH0pO1xuICB9O1xuXG4gIG9uQWRkQnV0dG9uQ2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgb25BZGROZXdDbGljaywgdHJhbnNsYXRpb25zLCBpZEtleSwgdmFsdWVLZXksIGNoaWxkS2V5LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgb25BZGROZXdDbGljayh7XG4gICAgICBbaWRLZXldOiB1dWlkKCksXG4gICAgICBbdmFsdWVLZXldOiB0cmFuc2xhdGlvbnMuZGVmYXVsdE5ld05vZGUsXG4gICAgICBbY2hpbGRLZXldOiBbXSxcbiAgICB9LCAoKSA9PiB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5pbnB1dC5zZWxlY3QoKTtcbiAgICAgICAgdGhpcy5pbnB1dC5mb2N1cygpO1xuICAgICAgfSwgNTApO1xuICAgIH0pO1xuICB9O1xuXG4gIG9uRGVsZXRlQnV0dG9uQ2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBvbkRlbGV0ZUNsaWNrIH0gPSB0aGlzLnByb3BzO1xuICAgIG9uRGVsZXRlQ2xpY2soKTtcbiAgfTtcblxuICAvKipcbiAgICogQmx1ciBvbiBlbnRlciBrZXkgcHJlc3NcbiAgICogQHBhcmFtIGVcbiAgICovXG4gIG9uUmVuYW1lRmllbGRLZXlEb3duID0gKGUpID0+IHtcbiAgICBpZiAoZS5rZXlDb2RlID09PSAxMykgdGhpcy5pbnB1dC5ibHVyKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIElzIGFkZCBidXR0b24gZGlzYWJsZWQuIEFkZCBidXR0b24gaXMgZGlzYWJsZWQsIGlmOlxuICAgKiAtIHNlbGVjdGVkIHRyZWUgbm9kZSBpcyBhIGxlYWZcbiAgICogLSBjb250YWlucyBsZWFmc1xuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIGlzQWRkRGlzYWJsZWQgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgc2VsZWN0ZWRUcmVlSXRlbSwgY2hpbGRLZXksIHNpbmdsZVJvb3QsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAvLyBJZiBvbmx5IGEgc2luZ2xlIHJvb3QgaXMgYWxsb3dlZCwgd2UgY2FuJ3QgYWRkIG5ldyBpdGVtcyBpZiBubyBpdGVtcyBhcmUgc2VsZWN0ZWRcbiAgICBpZiAoIXNlbGVjdGVkVHJlZUl0ZW0pIHJldHVybiBzaW5nbGVSb290O1xuICAgIHJldHVybiAhaXNTZWxlY3RlZFRyZWVJdGVtUGFyZW50KHRoaXMucHJvcHMpXG4gICAgfHwgISFzZWxlY3RlZFRyZWVJdGVtW2NoaWxkS2V5XS5maW5kKGNoaWxkSXRlbSA9PiAhY2hpbGRJdGVtW2NoaWxkS2V5XSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIElzIGRlbGV0ZSBidXR0b24gZGlzYWJsZWQuIERlbGV0ZSBidXR0b24gaXMgZGlzYWJsZWQsIGlmOlxuICAgKiAtIHNpbmdsZSByb290IGlzIGVuYWJsZWQgYW5kIHNlbGVjdGVkIGl0ZW0gaXMgYSByb290XG4gICAqIC0gc2VsZWN0ZWQgaXRlbSBpcyBhIGxlYWZcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBpc0RlbGV0ZURpc2FibGVkID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgc2luZ2xlUm9vdCB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIXRoaXMucHJvcHMuc2VsZWN0ZWRUcmVlSXRlbSkgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuICEhKHNpbmdsZVJvb3QgJiYgaXNTZWxlY3RlZFRyZWVJdGVtUm9vdCh0aGlzLnByb3BzKSk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHRyYW5zbGF0aW9ucywgaWQsIGhlaWdodCxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiAoXG4gICAgICA8Q29udGFpbmVyIGhlaWdodD17aGVpZ2h0fT5cbiAgICAgICAgPENvbnRyb2xzPlxuICAgICAgICAgIDxSZW5hbWVMYWJlbCBodG1sRm9yPXtgJHtpZH0tbm9kZS1uYW1lLWlucHV0YH0+e3RyYW5zbGF0aW9ucy5yZW5hbWV9PC9SZW5hbWVMYWJlbD5cbiAgICAgICAgICA8UmVuYW1lRmllbGRcbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uSW5wdXRDaGFuZ2V9XG4gICAgICAgICAgICBpZD17YCR7aWR9LW5vZGUtbmFtZS1pbnB1dGB9XG4gICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX1cbiAgICAgICAgICAgIGRpc2FibGVkPXshaXNTZWxlY3RlZFRyZWVJdGVtUGFyZW50KHRoaXMucHJvcHMpfVxuICAgICAgICAgICAgcmVmPXsoaW5wdXQpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5pbnB1dCA9IGlucHV0O1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5vblJlbmFtZUZpZWxkS2V5RG93bn1cbiAgICAgICAgICAvPlxuXG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkFkZEJ1dHRvbkNsaWNrfVxuICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuaXNBZGREaXNhYmxlZCgpfVxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAge3RyYW5zbGF0aW9ucy5hZGR9XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkRlbGV0ZUJ1dHRvbkNsaWNrfVxuICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuaXNEZWxldGVEaXNhYmxlZCgpfVxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAge3RyYW5zbGF0aW9ucy5kZWxldGV9XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDwvQ29udHJvbHM+XG4gICAgICA8L0NvbnRhaW5lcj5cbiAgICApO1xuICB9XG59XG5cbkhpZXJhcmNoeVRyZWVTZWxlY3RvckNvbnRyb2xCYXIucHJvcFR5cGVzID0ge1xuICBvbkFkZE5ld0NsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBvbkRlbGV0ZUNsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBvbklucHV0Q2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBpZEtleTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICB2YWx1ZUtleTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBjaGlsZEtleTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICB0cmFuc2xhdGlvbnM6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgYWRkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRlbGV0ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICByZW5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGVmYXVsdE5ld05vZGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIH0pLmlzUmVxdWlyZWQsXG4gIHNlbGVjdGVkVHJlZUl0ZW06IFByb3BUeXBlcy5zaGFwZSh7fSksXG4gIGlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIGhlaWdodDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBzaW5nbGVSb290OiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxufTtcblxuSGllcmFyY2h5VHJlZVNlbGVjdG9yQ29udHJvbEJhci5kZWZhdWx0UHJvcHMgPSB7XG4gIHNlbGVjdGVkVHJlZUl0ZW06IG51bGwsXG59O1xuIl19