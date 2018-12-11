'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class, _temp;

var _templateObject = _taggedTemplateLiteralLoose(['\n  margin-right: ', ';\n  font-size: 18px;\n  align-items: center;\n  display: flex;\n'], ['\n  margin-right: ', ';\n  font-size: 18px;\n  align-items: center;\n  display: flex;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ocCmCommonLayouts = require('@opuscapita/oc-cm-common-layouts');

var _fa = require('react-icons/fa');

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

var Button = (0, _styledComponents2.default)(_ocCmCommonLayouts.Primitive.BorderlessButton)(_templateObject, function (props) {
  return props.theme.gutterWidth;
});

var HierarchyTreeSelectorExpandAllToggle = (_temp = _class = function (_React$PureComponent) {
  _inherits(HierarchyTreeSelectorExpandAllToggle, _React$PureComponent);

  function HierarchyTreeSelectorExpandAllToggle() {
    _classCallCheck(this, HierarchyTreeSelectorExpandAllToggle);

    return _possibleConstructorReturn(this, _React$PureComponent.apply(this, arguments));
  }

  HierarchyTreeSelectorExpandAllToggle.prototype.render = function render() {
    var _props = this.props,
        onClick = _props.onClick,
        expandAll = _props.expandAll;

    return _react2.default.createElement(
      Button,
      { onClick: onClick },
      expandAll ? _react2.default.createElement(_fa.FaCaretDown, null) : _react2.default.createElement(_fa.FaCaretRight, null)
    );
  };

  return HierarchyTreeSelectorExpandAllToggle;
}(_react2.default.PureComponent), _class.defaultProps = {}, _temp);
exports.default = HierarchyTreeSelectorExpandAllToggle;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci1leHBhbmQtYWxsLXRvZ2dsZS5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIkJ1dHRvbiIsIlByaW1pdGl2ZSIsIkJvcmRlcmxlc3NCdXR0b24iLCJwcm9wcyIsInRoZW1lIiwiZ3V0dGVyV2lkdGgiLCJIaWVyYXJjaHlUcmVlU2VsZWN0b3JFeHBhbmRBbGxUb2dnbGUiLCJyZW5kZXIiLCJvbkNsaWNrIiwiZXhwYW5kQWxsIiwiUmVhY3QiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsU0FBUyxnQ0FBT0MsNkJBQVVDLGdCQUFqQixDQUFULGtCQUNZO0FBQUEsU0FBU0MsTUFBTUMsS0FBTixDQUFZQyxXQUFyQjtBQUFBLENBRFosQ0FBTjs7SUFPcUJDLG9DOzs7Ozs7Ozs7aURBU25CQyxNLHFCQUFTO0FBQUEsaUJBQ3dCLEtBQUtKLEtBRDdCO0FBQUEsUUFDQ0ssT0FERCxVQUNDQSxPQUREO0FBQUEsUUFDVUMsU0FEVixVQUNVQSxTQURWOztBQUVQLFdBRUU7QUFBQyxZQUFEO0FBQUEsUUFBUSxTQUFTRCxPQUFqQjtBQUNHQyxrQkFBWSw4QkFBQyxlQUFELE9BQVosR0FBOEIsOEJBQUMsZ0JBQUQ7QUFEakMsS0FGRjtBQU1ELEc7OztFQWpCK0RDLGdCQUFNQyxhLFVBTS9EQyxZLEdBQWUsRTtrQkFOSE4sb0MiLCJmaWxlIjoiaGllcmFyY2h5LXRyZWUtc2VsZWN0b3ItZXhwYW5kLWFsbC10b2dnbGUuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcclxuaW1wb3J0IHsgUHJpbWl0aXZlIH0gZnJvbSAnQG9wdXNjYXBpdGEvb2MtY20tY29tbW9uLWxheW91dHMnO1xyXG5pbXBvcnQgeyBGYUNhcmV0RG93biwgRmFDYXJldFJpZ2h0IH0gZnJvbSAncmVhY3QtaWNvbnMvZmEnO1xyXG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcclxuXHJcbmNvbnN0IEJ1dHRvbiA9IHN0eWxlZChQcmltaXRpdmUuQm9yZGVybGVzc0J1dHRvbilgXHJcbiAgbWFyZ2luLXJpZ2h0OiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmd1dHRlcldpZHRofTtcclxuICBmb250LXNpemU6IDE4cHg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG5gO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGllcmFyY2h5VHJlZVNlbGVjdG9yRXhwYW5kQWxsVG9nZ2xlIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XHJcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcclxuICAgIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICBleHBhbmRBbGw6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXHJcbiAgfTtcclxuXHJcbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHt9O1xyXG5cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3QgeyBvbkNsaWNrLCBleHBhbmRBbGwgfSA9IHRoaXMucHJvcHM7XHJcbiAgICByZXR1cm4gKFxyXG5cclxuICAgICAgPEJ1dHRvbiBvbkNsaWNrPXtvbkNsaWNrfT5cclxuICAgICAgICB7ZXhwYW5kQWxsID8gPEZhQ2FyZXREb3duIC8+IDogPEZhQ2FyZXRSaWdodCAvPn1cclxuICAgICAgPC9CdXR0b24+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iXX0=