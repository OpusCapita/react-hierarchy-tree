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

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
          singleRoot = _this$props2.singleRoot,
          isAddDisabled = _this$props2.isAddDisabled;
      if (isAddDisabled) return true; // If only a single root is allowed, we can't add new items if no items are selected

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
        height = _this$props3.height,
        maxValueLength = _this$props3.maxValueLength;
    var otherProps = {};

    if (maxValueLength) {
      otherProps.maxLength = maxValueLength;
    }

    return _react["default"].createElement(Container, {
      height: height
    }, _react["default"].createElement(Controls, null, _react["default"].createElement(RenameLabel, {
      htmlFor: id + "-node-name-input"
    }, translations.rename), _react["default"].createElement(RenameField, _extends({
      onChange: this.onInputChange,
      id: id + "-node-name-input",
      value: this.state.value,
      disabled: !(0, _hierarchyTree.isSelectedTreeItemParent)(this.props),
      ref: function ref(input) {
        _this2.input = input;
      },
      onKeyDown: this.onRenameFieldKeyDown
    }, otherProps)), _react["default"].createElement(Button, {
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
  selectedTreeItem: null,
  isAddDisabled: false,
  maxValueLength: undefined
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci1jb250cm9sLWJhci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlbmFtZUxhYmVsIiwic3R5bGVkIiwibGFiZWwiLCJwcm9wcyIsInRoZW1lIiwiaGFsZkd1dHRlcldpZHRoIiwiQ29udGFpbmVyIiwiZGl2IiwiaGVpZ2h0IiwiQnV0dG9uIiwiUHJpbWl0aXZlIiwiQ29udHJvbHMiLCJSZW5hbWVGaWVsZCIsIklucHV0IiwiSGllcmFyY2h5VHJlZVNlbGVjdG9yQ29udHJvbEJhciIsImUiLCJzZXRTdGF0ZSIsInZhbHVlIiwidGFyZ2V0Iiwib25JbnB1dENoYW5nZSIsInN0YXRlIiwib25BZGROZXdDbGljayIsInRyYW5zbGF0aW9ucyIsImlkS2V5IiwidmFsdWVLZXkiLCJjaGlsZEtleSIsImRlZmF1bHROZXdOb2RlIiwic2V0VGltZW91dCIsImlucHV0Iiwic2VsZWN0IiwiZm9jdXMiLCJvbkRlbGV0ZUNsaWNrIiwia2V5Q29kZSIsImJsdXIiLCJzZWxlY3RlZFRyZWVJdGVtIiwic2luZ2xlUm9vdCIsImlzQWRkRGlzYWJsZWQiLCJmaW5kIiwiY2hpbGRJdGVtIiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsIm5leHRQcm9wcyIsImlucHV0VmFsdWUiLCJyZW5kZXIiLCJpZCIsIm1heFZhbHVlTGVuZ3RoIiwib3RoZXJQcm9wcyIsIm1heExlbmd0aCIsInJlbmFtZSIsIm9uUmVuYW1lRmllbGRLZXlEb3duIiwib25BZGRCdXR0b25DbGljayIsImFkZCIsIm9uRGVsZXRlQnV0dG9uQ2xpY2siLCJpc0RlbGV0ZURpc2FibGVkIiwiUmVhY3QiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIiwidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUdBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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S21DLEVBQUw7QUFBcEIsT0FBZ0RyQixZQUFZLENBQUN5QixNQUE3RCxDQURGLEVBRUUsZ0NBQUMsV0FBRDtBQUNFLE1BQUEsUUFBUSxFQUFFLEtBQUs1QixhQURqQjtBQUVFLE1BQUEsRUFBRSxFQUFLd0IsRUFBTCxxQkFGSjtBQUdFLE1BQUEsS0FBSyxFQUFFLEtBQUt2QixLQUFMLENBQVdILEtBSHBCO0FBSUUsTUFBQSxRQUFRLEVBQUUsQ0FBQyw2Q0FBeUIsS0FBS2QsS0FBOUIsQ0FKYjtBQUtFLE1BQUEsR0FBRyxFQUFFLGFBQUN5QixLQUFELEVBQVc7QUFDZCxRQUFBLE1BQUksQ0FBQ0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0QsT0FQSDtBQVFFLE1BQUEsU0FBUyxFQUFFLEtBQUtvQjtBQVJsQixPQVNNSCxVQVROLEVBRkYsRUFjRSxnQ0FBQyxNQUFEO0FBQ0UsTUFBQSxPQUFPLEVBQUUsS0FBS0ksZ0JBRGhCO0FBRUUsTUFBQSxRQUFRLEVBQUUsS0FBS2IsYUFBTCxFQUZaO0FBR0UsTUFBQSxJQUFJLEVBQUM7QUFIUCxPQUtHZCxZQUFZLENBQUM0QixHQUxoQixDQWRGLEVBcUJFLGdDQUFDLE1BQUQ7QUFDRSxNQUFBLE9BQU8sRUFBRSxLQUFLQyxtQkFEaEI7QUFFRSxNQUFBLFFBQVEsRUFBRSxLQUFLQyxnQkFBTCxFQUZaO0FBR0UsTUFBQSxJQUFJLEVBQUM7QUFIUCxPQUtHOUIsWUFBWSxVQUxmLENBckJGLENBREYsQ0FERjtBQWlDRCxHOzs7RUE3SDBEK0Isa0JBQU1DLGE7OztBQXFKbkV4QywrQkFBK0IsQ0FBQ3lDLFlBQWhDLEdBQStDO0FBQzdDckIsRUFBQUEsZ0JBQWdCLEVBQUUsSUFEMkI7QUFFN0NFLEVBQUFBLGFBQWEsRUFBRSxLQUY4QjtBQUc3Q1EsRUFBQUEsY0FBYyxFQUFFWTtBQUg2QixDQUEvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgUHJpbWl0aXZlIH0gZnJvbSAnQG9wdXNjYXBpdGEvb2MtY20tY29tbW9uLWxheW91dHMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgdXVpZCBmcm9tICd1dWlkJztcblxuLy8gQXBwIGltcG9ydHNcbmltcG9ydCB7IGlzU2VsZWN0ZWRUcmVlSXRlbVBhcmVudCwgaXNTZWxlY3RlZFRyZWVJdGVtUm9vdCB9IGZyb20gJy4vaGllcmFyY2h5LXRyZWUudXRpbHMnO1xuXG5jb25zdCBSZW5hbWVMYWJlbCA9IHN0eWxlZC5sYWJlbGBcbiAgbWFyZ2luOiAwICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuaGFsZkd1dHRlcldpZHRofSAwIDA7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG5gO1xuXG5jb25zdCBDb250YWluZXIgPSBzdHlsZWQuZGl2YFxuICBoZWlnaHQ6ICR7cHJvcHMgPT4gcHJvcHMuaGVpZ2h0fTtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbmA7XG5cbmNvbnN0IEJ1dHRvbiA9IHN0eWxlZChQcmltaXRpdmUuQnV0dG9uKWBcbiAgbWFyZ2luLWxlZnQ6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuaGFsZkd1dHRlcldpZHRofTtcbiAgbWluLXdpZHRoOiAxMjRweDtcbiAgcGFkZGluZzogMC41cmVtO1xuYDtcblxuY29uc3QgQ29udHJvbHMgPSBzdHlsZWQuZGl2YFxuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBtYXJnaW4tbGVmdDogYXV0bztcbiAgbWFyZ2luLXJpZ2h0OiAwO1xuYDtcblxuY29uc3QgUmVuYW1lRmllbGQgPSBzdHlsZWQoUHJpbWl0aXZlLklucHV0KWBcbiAgbWluLXdpZHRoOiAyMDBweDtcbiAgbWFyZ2luLXJpZ2h0OiA0cmVtO1xuYDtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhpZXJhcmNoeVRyZWVTZWxlY3RvckNvbnRyb2xCYXIgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHZhbHVlOiAnJyxcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RlZFRyZWVJdGVtICE9PSBuZXh0UHJvcHMuc2VsZWN0ZWRUcmVlSXRlbSkge1xuICAgICAgY29uc3QgaW5wdXRWYWx1ZSA9IG5leHRQcm9wcy5zZWxlY3RlZFRyZWVJdGVtXG4gICAgICAmJiBpc1NlbGVjdGVkVHJlZUl0ZW1QYXJlbnQobmV4dFByb3BzKVxuICAgICAgICA/IG5leHRQcm9wcy5zZWxlY3RlZFRyZWVJdGVtW25leHRQcm9wcy52YWx1ZUtleV0gOiAnJztcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyB2YWx1ZTogaW5wdXRWYWx1ZSB9KTtcbiAgICB9XG4gIH1cblxuICBvbklucHV0Q2hhbmdlID0gKGUpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgdmFsdWU6IGUudGFyZ2V0LnZhbHVlIH0sICgpID0+IHtcbiAgICAgIHRoaXMucHJvcHMub25JbnB1dENoYW5nZSh0aGlzLnN0YXRlLnZhbHVlKTtcbiAgICB9KTtcbiAgfTtcblxuICBvbkFkZEJ1dHRvbkNsaWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIG9uQWRkTmV3Q2xpY2ssIHRyYW5zbGF0aW9ucywgaWRLZXksIHZhbHVlS2V5LCBjaGlsZEtleSxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIG9uQWRkTmV3Q2xpY2soe1xuICAgICAgW2lkS2V5XTogdXVpZCgpLFxuICAgICAgW3ZhbHVlS2V5XTogdHJhbnNsYXRpb25zLmRlZmF1bHROZXdOb2RlLFxuICAgICAgW2NoaWxkS2V5XTogW10sXG4gICAgfSwgKCkgPT4ge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuaW5wdXQuc2VsZWN0KCk7XG4gICAgICAgIHRoaXMuaW5wdXQuZm9jdXMoKTtcbiAgICAgIH0sIDUwKTtcbiAgICB9KTtcbiAgfTtcblxuICBvbkRlbGV0ZUJ1dHRvbkNsaWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgb25EZWxldGVDbGljayB9ID0gdGhpcy5wcm9wcztcbiAgICBvbkRlbGV0ZUNsaWNrKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEJsdXIgb24gZW50ZXIga2V5IHByZXNzXG4gICAqIEBwYXJhbSBlXG4gICAqL1xuICBvblJlbmFtZUZpZWxkS2V5RG93biA9IChlKSA9PiB7XG4gICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHRoaXMuaW5wdXQuYmx1cigpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBJcyBhZGQgYnV0dG9uIGRpc2FibGVkLiBBZGQgYnV0dG9uIGlzIGRpc2FibGVkLCBpZjpcbiAgICogLSBzZWxlY3RlZCB0cmVlIG5vZGUgaXMgYSBsZWFmXG4gICAqIC0gY29udGFpbnMgbGVhZnNcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBpc0FkZERpc2FibGVkID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIHNlbGVjdGVkVHJlZUl0ZW0sIGNoaWxkS2V5LCBzaW5nbGVSb290LCBpc0FkZERpc2FibGVkLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKGlzQWRkRGlzYWJsZWQpIHJldHVybiB0cnVlO1xuICAgIC8vIElmIG9ubHkgYSBzaW5nbGUgcm9vdCBpcyBhbGxvd2VkLCB3ZSBjYW4ndCBhZGQgbmV3IGl0ZW1zIGlmIG5vIGl0ZW1zIGFyZSBzZWxlY3RlZFxuICAgIGlmICghc2VsZWN0ZWRUcmVlSXRlbSkgcmV0dXJuIHNpbmdsZVJvb3Q7XG4gICAgcmV0dXJuICFpc1NlbGVjdGVkVHJlZUl0ZW1QYXJlbnQodGhpcy5wcm9wcylcbiAgICB8fCAhIXNlbGVjdGVkVHJlZUl0ZW1bY2hpbGRLZXldLmZpbmQoY2hpbGRJdGVtID0+ICFjaGlsZEl0ZW1bY2hpbGRLZXldKTtcbiAgfTtcblxuICAvKipcbiAgICogSXMgZGVsZXRlIGJ1dHRvbiBkaXNhYmxlZC4gRGVsZXRlIGJ1dHRvbiBpcyBkaXNhYmxlZCwgaWY6XG4gICAqIC0gc2luZ2xlIHJvb3QgaXMgZW5hYmxlZCBhbmQgc2VsZWN0ZWQgaXRlbSBpcyBhIHJvb3RcbiAgICogLSBzZWxlY3RlZCBpdGVtIGlzIGEgbGVhZlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIGlzRGVsZXRlRGlzYWJsZWQgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBzaW5nbGVSb290IH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghdGhpcy5wcm9wcy5zZWxlY3RlZFRyZWVJdGVtKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gISEoc2luZ2xlUm9vdCAmJiBpc1NlbGVjdGVkVHJlZUl0ZW1Sb290KHRoaXMucHJvcHMpKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgdHJhbnNsYXRpb25zLCBpZCwgaGVpZ2h0LCBtYXhWYWx1ZUxlbmd0aCxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBvdGhlclByb3BzID0ge307XG4gICAgaWYgKG1heFZhbHVlTGVuZ3RoKSB7XG4gICAgICBvdGhlclByb3BzLm1heExlbmd0aCA9IG1heFZhbHVlTGVuZ3RoO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8Q29udGFpbmVyIGhlaWdodD17aGVpZ2h0fT5cbiAgICAgICAgPENvbnRyb2xzPlxuICAgICAgICAgIDxSZW5hbWVMYWJlbCBodG1sRm9yPXtgJHtpZH0tbm9kZS1uYW1lLWlucHV0YH0+e3RyYW5zbGF0aW9ucy5yZW5hbWV9PC9SZW5hbWVMYWJlbD5cbiAgICAgICAgICA8UmVuYW1lRmllbGRcbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uSW5wdXRDaGFuZ2V9XG4gICAgICAgICAgICBpZD17YCR7aWR9LW5vZGUtbmFtZS1pbnB1dGB9XG4gICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX1cbiAgICAgICAgICAgIGRpc2FibGVkPXshaXNTZWxlY3RlZFRyZWVJdGVtUGFyZW50KHRoaXMucHJvcHMpfVxuICAgICAgICAgICAgcmVmPXsoaW5wdXQpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5pbnB1dCA9IGlucHV0O1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5vblJlbmFtZUZpZWxkS2V5RG93bn1cbiAgICAgICAgICAgIHsuLi5vdGhlclByb3BzfVxuICAgICAgICAgIC8+XG5cbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQWRkQnV0dG9uQ2xpY2t9XG4gICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5pc0FkZERpc2FibGVkKCl9XG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICB7dHJhbnNsYXRpb25zLmFkZH1cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uRGVsZXRlQnV0dG9uQ2xpY2t9XG4gICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5pc0RlbGV0ZURpc2FibGVkKCl9XG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICB7dHJhbnNsYXRpb25zLmRlbGV0ZX1cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgPC9Db250cm9scz5cbiAgICAgIDwvQ29udGFpbmVyPlxuICAgICk7XG4gIH1cbn1cblxuSGllcmFyY2h5VHJlZVNlbGVjdG9yQ29udHJvbEJhci5wcm9wVHlwZXMgPSB7XG4gIG9uQWRkTmV3Q2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG9uRGVsZXRlQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG9uSW5wdXRDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGlkS2V5OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIHZhbHVlS2V5OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIGNoaWxkS2V5OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIHRyYW5zbGF0aW9uczogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBhZGQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGVsZXRlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHJlbmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkZWZhdWx0TmV3Tm9kZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgfSkuaXNSZXF1aXJlZCxcbiAgc2VsZWN0ZWRUcmVlSXRlbTogUHJvcFR5cGVzLnNoYXBlKHt9KSxcbiAgaWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgaGVpZ2h0OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIHNpbmdsZVJvb3Q6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIGlzQWRkRGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxuICBtYXhWYWx1ZUxlbmd0aDogUHJvcFR5cGVzLm51bWJlcixcbn07XG5cbkhpZXJhcmNoeVRyZWVTZWxlY3RvckNvbnRyb2xCYXIuZGVmYXVsdFByb3BzID0ge1xuICBzZWxlY3RlZFRyZWVJdGVtOiBudWxsLFxuICBpc0FkZERpc2FibGVkOiBmYWxzZSxcbiAgbWF4VmFsdWVMZW5ndGg6IHVuZGVmaW5lZCxcbn07XG4iXX0=