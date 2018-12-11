'use strict';

exports.__esModule = true;
exports.default = undefined;

var _templateObject = _taggedTemplateLiteralLoose(['\n  margin: 0 ', ' 0 0;\n'], ['\n  margin: 0 ', ' 0 0;\n']),
    _templateObject2 = _taggedTemplateLiteralLoose(['\n  height: ', ';\n  display: flex;\n  align-items: center;\n'], ['\n  height: ', ';\n  display: flex;\n  align-items: center;\n']),
    _templateObject3 = _taggedTemplateLiteralLoose(['\n  margin-left: ', ';\n  min-width: 120px;\n'], ['\n  margin-left: ', ';\n  min-width: 120px;\n']),
    _templateObject4 = _taggedTemplateLiteralLoose(['\n  display: flex;\n  align-items: center;\n  margin-left: auto;\n  margin-right: 0;\n'], ['\n  display: flex;\n  align-items: center;\n  margin-left: auto;\n  margin-right: 0;\n']),
    _templateObject5 = _taggedTemplateLiteralLoose(['\n  min-width: 200px;\n'], ['\n  min-width: 200px;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ocCmCommonLayouts = require('@opuscapita/oc-cm-common-layouts');

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _hierarchyTree = require('./hierarchy-tree.utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

// App imports


var RenameLabel = _styledComponents2.default.label(_templateObject, function (props) {
  return props.theme.halfGutterWidth;
});

var Container = _styledComponents2.default.div(_templateObject2, function (props) {
  return props.height;
});

var Button = (0, _styledComponents2.default)(_ocCmCommonLayouts.Primitive.Button)(_templateObject3, function (props) {
  return props.theme.halfGutterWidth;
});

var Controls = _styledComponents2.default.div(_templateObject4);

var RenameField = (0, _styledComponents2.default)(_ocCmCommonLayouts.Primitive.Input)(_templateObject5);

var HierarchyTreeSelectorControlBar = function (_React$PureComponent) {
  _inherits(HierarchyTreeSelectorControlBar, _React$PureComponent);

  function HierarchyTreeSelectorControlBar(props) {
    _classCallCheck(this, HierarchyTreeSelectorControlBar);

    var _this = _possibleConstructorReturn(this, _React$PureComponent.call(this, props));

    _this.onInputChange = function (e) {
      _this.setState({ value: e.target.value }, function () {
        _this.props.onInputChange(_this.state.value);
      });
    };

    _this.onAddButtonClick = function () {
      var _onAddNewClick;

      var _this$props = _this.props,
          onAddNewClick = _this$props.onAddNewClick,
          translations = _this$props.translations,
          idKey = _this$props.idKey,
          valueKey = _this$props.valueKey,
          childKey = _this$props.childKey;


      onAddNewClick((_onAddNewClick = {}, _onAddNewClick[idKey] = (0, _uuid2.default)(), _onAddNewClick[valueKey] = translations.defaultNewNode, _onAddNewClick[childKey] = [], _onAddNewClick), function () {
        setTimeout(function () {
          _this.input.select();
          _this.input.focus();
        }, 0);
      });
    };

    _this.onDeleteButtonClick = function () {
      var onDeleteClick = _this.props.onDeleteClick;

      onDeleteClick();
    };

    _this.isAddDisabled = function () {
      var _this$props2 = _this.props,
          selectedTreeItem = _this$props2.selectedTreeItem,
          childKey = _this$props2.childKey;

      if (!selectedTreeItem) return false;
      return !(0, _hierarchyTree.isSelectedTreeItemParent)(_this.props) || !!selectedTreeItem[childKey].find(function (childItem) {
        return !childItem[childKey];
      });
    };

    _this.state = {
      value: ''
    };
    return _this;
  }

  HierarchyTreeSelectorControlBar.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (this.props.selectedTreeItem !== nextProps.selectedTreeItem) {
      var inputValue = nextProps.selectedTreeItem && (0, _hierarchyTree.isSelectedTreeItemParent)(nextProps) ? nextProps.selectedTreeItem[nextProps.valueKey] : '';
      this.setState({ value: inputValue });
    }
  };

  /**
   * Is add button disabled. Add button is disabled, if:
   * - selected tree node is a leaf
   * - contains leafs
   * @returns {boolean}
   */


  HierarchyTreeSelectorControlBar.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        translations = _props.translations,
        id = _props.id,
        height = _props.height;


    return _react2.default.createElement(
      Container,
      { height: height },
      _react2.default.createElement(
        Controls,
        null,
        _react2.default.createElement(
          RenameLabel,
          { htmlFor: id + '-node-name-input' },
          translations.rename
        ),
        _react2.default.createElement(RenameField, {
          onChange: this.onInputChange,
          id: id + '-node-name-input',
          value: this.state.value,
          disabled: !(0, _hierarchyTree.isSelectedTreeItemParent)(this.props),
          innerRef: function innerRef(input) {
            _this2.input = input;
          }
        }),
        _react2.default.createElement(
          Button,
          {
            onClick: this.onAddButtonClick,
            disabled: this.isAddDisabled()
          },
          translations.add
        ),
        _react2.default.createElement(
          Button,
          {
            onClick: this.onDeleteButtonClick,
            disabled: !(0, _hierarchyTree.isSelectedTreeItemParent)(this.props)
          },
          translations.delete
        )
      )
    );
  };

  return HierarchyTreeSelectorControlBar;
}(_react2.default.PureComponent);

exports.default = HierarchyTreeSelectorControlBar;


HierarchyTreeSelectorControlBar.defaultProps = {
  selectedTreeItem: null
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci1jb250cm9sLWJhci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlbmFtZUxhYmVsIiwic3R5bGVkIiwibGFiZWwiLCJwcm9wcyIsInRoZW1lIiwiaGFsZkd1dHRlcldpZHRoIiwiQ29udGFpbmVyIiwiZGl2IiwiaGVpZ2h0IiwiQnV0dG9uIiwiUHJpbWl0aXZlIiwiQ29udHJvbHMiLCJSZW5hbWVGaWVsZCIsIklucHV0IiwiSGllcmFyY2h5VHJlZVNlbGVjdG9yQ29udHJvbEJhciIsIm9uSW5wdXRDaGFuZ2UiLCJlIiwic2V0U3RhdGUiLCJ2YWx1ZSIsInRhcmdldCIsInN0YXRlIiwib25BZGRCdXR0b25DbGljayIsIm9uQWRkTmV3Q2xpY2siLCJ0cmFuc2xhdGlvbnMiLCJpZEtleSIsInZhbHVlS2V5IiwiY2hpbGRLZXkiLCJkZWZhdWx0TmV3Tm9kZSIsInNldFRpbWVvdXQiLCJpbnB1dCIsInNlbGVjdCIsImZvY3VzIiwib25EZWxldGVCdXR0b25DbGljayIsIm9uRGVsZXRlQ2xpY2siLCJpc0FkZERpc2FibGVkIiwic2VsZWN0ZWRUcmVlSXRlbSIsImZpbmQiLCJjaGlsZEl0ZW0iLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwibmV4dFByb3BzIiwiaW5wdXRWYWx1ZSIsInJlbmRlciIsImlkIiwicmVuYW1lIiwiYWRkIiwiZGVsZXRlIiwiUmVhY3QiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBR0E7Ozs7Ozs7Ozs7OztBQURBOzs7QUFHQSxJQUFNQSxjQUFjQywyQkFBT0MsS0FBckIsa0JBQ1E7QUFBQSxTQUFTQyxNQUFNQyxLQUFOLENBQVlDLGVBQXJCO0FBQUEsQ0FEUixDQUFOOztBQUlBLElBQU1DLFlBQVlMLDJCQUFPTSxHQUFuQixtQkFDTTtBQUFB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QUFRQSxNQUFuQjtBQUNFO0FBQUMsZ0JBQUQ7QUFBQTtBQUNFO0FBQUMscUJBQUQ7QUFBQSxZQUFhLFNBQVlrQyxFQUFaLHFCQUFiO0FBQWdEbkIsdUJBQWFvQjtBQUE3RCxTQURGO0FBRUUsc0NBQUMsV0FBRDtBQUNFLG9CQUFVLEtBQUs1QixhQURqQjtBQUVFLGNBQU8yQixFQUFQLHFCQUZGO0FBR0UsaUJBQU8sS0FBS3RCLEtBQUwsQ0FBV0YsS0FIcEI7QUFJRSxvQkFBVSxDQUFDLDZDQUF5QixLQUFLZixLQUE5QixDQUpiO0FBS0Usb0JBQVUsa0JBQUMwQixLQUFELEVBQVc7QUFDbkIsbUJBQUtBLEtBQUwsR0FBYUEsS0FBYjtBQUNEO0FBUEgsVUFGRjtBQVlFO0FBQUMsZ0JBQUQ7QUFBQTtBQUNFLHFCQUFTLEtBQUtSLGdCQURoQjtBQUVFLHNCQUFVLEtBQUthLGFBQUw7QUFGWjtBQUlHWCx1QkFBYXFCO0FBSmhCLFNBWkY7QUFrQkU7QUFBQyxnQkFBRDtBQUFBO0FBQ0UscUJBQVMsS0FBS1osbUJBRGhCO0FBRUUsc0JBQVUsQ0FBQyw2Q0FBeUIsS0FBSzdCLEtBQTlCO0FBRmI7QUFJR29CLHVCQUFhc0I7QUFKaEI7QUFsQkY7QUFERixLQURGO0FBNkJELEc7OztFQTlGMERDLGdCQUFNQyxhOztrQkFBOUNqQywrQjs7O0FBOEdyQkEsZ0NBQWdDa0MsWUFBaEMsR0FBK0M7QUFDN0NiLG9CQUFrQjtBQUQyQixDQUEvQyIsImZpbGUiOiJoaWVyYXJjaHktdHJlZS1zZWxlY3Rvci1jb250cm9sLWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IFByaW1pdGl2ZSB9IGZyb20gJ0BvcHVzY2FwaXRhL29jLWNtLWNvbW1vbi1sYXlvdXRzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHV1aWQgZnJvbSAndXVpZCc7XG5cbi8vIEFwcCBpbXBvcnRzXG5pbXBvcnQgeyBpc1NlbGVjdGVkVHJlZUl0ZW1QYXJlbnQgfSBmcm9tICcuL2hpZXJhcmNoeS10cmVlLnV0aWxzJztcblxuY29uc3QgUmVuYW1lTGFiZWwgPSBzdHlsZWQubGFiZWxgXG4gIG1hcmdpbjogMCAke3Byb3BzID0+IHByb3BzLnRoZW1lLmhhbGZHdXR0ZXJXaWR0aH0gMCAwO1xuYDtcblxuY29uc3QgQ29udGFpbmVyID0gc3R5bGVkLmRpdmBcbiAgaGVpZ2h0OiAke3Byb3BzID0+IHByb3BzLmhlaWdodH07XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5gO1xuXG5jb25zdCBCdXR0b24gPSBzdHlsZWQoUHJpbWl0aXZlLkJ1dHRvbilgXG4gIG1hcmdpbi1sZWZ0OiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmhhbGZHdXR0ZXJXaWR0aH07XG4gIG1pbi13aWR0aDogMTIwcHg7XG5gO1xuXG5jb25zdCBDb250cm9scyA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICBtYXJnaW4tcmlnaHQ6IDA7XG5gO1xuXG5jb25zdCBSZW5hbWVGaWVsZCA9IHN0eWxlZChQcmltaXRpdmUuSW5wdXQpYFxuICBtaW4td2lkdGg6IDIwMHB4O1xuYDtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhpZXJhcmNoeVRyZWVTZWxlY3RvckNvbnRyb2xCYXIgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHZhbHVlOiAnJyxcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RlZFRyZWVJdGVtICE9PSBuZXh0UHJvcHMuc2VsZWN0ZWRUcmVlSXRlbSkge1xuICAgICAgY29uc3QgaW5wdXRWYWx1ZSA9IG5leHRQcm9wcy5zZWxlY3RlZFRyZWVJdGVtICYmXG4gICAgICBpc1NlbGVjdGVkVHJlZUl0ZW1QYXJlbnQobmV4dFByb3BzKSA/XG4gICAgICAgIG5leHRQcm9wcy5zZWxlY3RlZFRyZWVJdGVtW25leHRQcm9wcy52YWx1ZUtleV0gOiAnJztcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyB2YWx1ZTogaW5wdXRWYWx1ZSB9KTtcbiAgICB9XG4gIH1cblxuICBvbklucHV0Q2hhbmdlID0gKGUpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgdmFsdWU6IGUudGFyZ2V0LnZhbHVlIH0sICgpID0+IHtcbiAgICAgIHRoaXMucHJvcHMub25JbnB1dENoYW5nZSh0aGlzLnN0YXRlLnZhbHVlKTtcbiAgICB9KTtcbiAgfTtcblxuICBvbkFkZEJ1dHRvbkNsaWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIG9uQWRkTmV3Q2xpY2ssIHRyYW5zbGF0aW9ucywgaWRLZXksIHZhbHVlS2V5LCBjaGlsZEtleSxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIG9uQWRkTmV3Q2xpY2soe1xuICAgICAgW2lkS2V5XTogdXVpZCgpLFxuICAgICAgW3ZhbHVlS2V5XTogdHJhbnNsYXRpb25zLmRlZmF1bHROZXdOb2RlLFxuICAgICAgW2NoaWxkS2V5XTogW10sXG4gICAgfSwgKCkgPT4ge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuaW5wdXQuc2VsZWN0KCk7XG4gICAgICAgIHRoaXMuaW5wdXQuZm9jdXMoKTtcbiAgICAgIH0sIDApO1xuICAgIH0pO1xuICB9O1xuXG4gIG9uRGVsZXRlQnV0dG9uQ2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBvbkRlbGV0ZUNsaWNrIH0gPSB0aGlzLnByb3BzO1xuICAgIG9uRGVsZXRlQ2xpY2soKTtcbiAgfTtcblxuICAvKipcbiAgICogSXMgYWRkIGJ1dHRvbiBkaXNhYmxlZC4gQWRkIGJ1dHRvbiBpcyBkaXNhYmxlZCwgaWY6XG4gICAqIC0gc2VsZWN0ZWQgdHJlZSBub2RlIGlzIGEgbGVhZlxuICAgKiAtIGNvbnRhaW5zIGxlYWZzXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgaXNBZGREaXNhYmxlZCA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBzZWxlY3RlZFRyZWVJdGVtLCBjaGlsZEtleSxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIXNlbGVjdGVkVHJlZUl0ZW0pIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gIWlzU2VsZWN0ZWRUcmVlSXRlbVBhcmVudCh0aGlzLnByb3BzKSB8fFxuICAgICAgISFzZWxlY3RlZFRyZWVJdGVtW2NoaWxkS2V5XS5maW5kKGNoaWxkSXRlbSA9PiAhY2hpbGRJdGVtW2NoaWxkS2V5XSk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHRyYW5zbGF0aW9ucywgaWQsIGhlaWdodCxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiAoXG4gICAgICA8Q29udGFpbmVyIGhlaWdodD17aGVpZ2h0fT5cbiAgICAgICAgPENvbnRyb2xzPlxuICAgICAgICAgIDxSZW5hbWVMYWJlbCBodG1sRm9yPXtgJHtpZH0tbm9kZS1uYW1lLWlucHV0YH0+e3RyYW5zbGF0aW9ucy5yZW5hbWV9PC9SZW5hbWVMYWJlbD5cbiAgICAgICAgICA8UmVuYW1lRmllbGRcbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uSW5wdXRDaGFuZ2V9XG4gICAgICAgICAgICBpZD17YCR7aWR9LW5vZGUtbmFtZS1pbnB1dGB9XG4gICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX1cbiAgICAgICAgICAgIGRpc2FibGVkPXshaXNTZWxlY3RlZFRyZWVJdGVtUGFyZW50KHRoaXMucHJvcHMpfVxuICAgICAgICAgICAgaW5uZXJSZWY9eyhpbnB1dCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgIC8+XG5cbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQWRkQnV0dG9uQ2xpY2t9XG4gICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5pc0FkZERpc2FibGVkKCl9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge3RyYW5zbGF0aW9ucy5hZGR9XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkRlbGV0ZUJ1dHRvbkNsaWNrfVxuICAgICAgICAgICAgZGlzYWJsZWQ9eyFpc1NlbGVjdGVkVHJlZUl0ZW1QYXJlbnQodGhpcy5wcm9wcyl9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge3RyYW5zbGF0aW9ucy5kZWxldGV9XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDwvQ29udHJvbHM+XG4gICAgICA8L0NvbnRhaW5lcj5cbiAgICApO1xuICB9XG59XG5cbkhpZXJhcmNoeVRyZWVTZWxlY3RvckNvbnRyb2xCYXIucHJvcFR5cGVzID0ge1xuICBvbkFkZE5ld0NsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBvbkRlbGV0ZUNsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBvbklucHV0Q2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBpZEtleTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICB2YWx1ZUtleTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBjaGlsZEtleTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICB0cmFuc2xhdGlvbnM6IFByb3BUeXBlcy5zaGFwZSh7fSkuaXNSZXF1aXJlZCxcbiAgc2VsZWN0ZWRUcmVlSXRlbTogUHJvcFR5cGVzLnNoYXBlKHt9KSxcbiAgaWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgaGVpZ2h0OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG59O1xuXG5IaWVyYXJjaHlUcmVlU2VsZWN0b3JDb250cm9sQmFyLmRlZmF1bHRQcm9wcyA9IHtcbiAgc2VsZWN0ZWRUcmVlSXRlbTogbnVsbCxcbn07XG5cbiJdfQ==