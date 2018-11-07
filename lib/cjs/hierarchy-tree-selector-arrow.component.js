'use strict';

exports.__esModule = true;

var _templateObject = _taggedTemplateLiteralLoose(['\n  opacity: ', ';\n'], ['\n  opacity: ', ';\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIcons = require('@opuscapita/react-icons');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ocCmCommonLayouts = require('@opuscapita/oc-cm-common-layouts');

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

// App imports

var Arrow = (0, _styledComponents2.default)(_reactIcons.Icon)(_templateObject, function (props) {
  return props.disabled ? '0.5' : '1';
});
var HierarchyTreeSelectorArrow = function HierarchyTreeSelectorArrow(_ref) {
  var icon = _ref.icon,
      onClick = _ref.onClick,
      disabled = _ref.disabled;
  return _react2.default.createElement(
    _ocCmCommonLayouts.Primitive.BorderlessButton,
    { onClick: onClick, disabled: disabled },
    _react2.default.createElement(Arrow, { type: 'indicator', name: icon, disabled: disabled })
  );
};

HierarchyTreeSelectorArrow.propTypes = {
  icon: _propTypes2.default.string.isRequired,
  onClick: _propTypes2.default.func.isRequired,
  disabled: _propTypes2.default.bool
};

HierarchyTreeSelectorArrow.defaultProps = {
  disabled: true
};

exports.default = HierarchyTreeSelectorArrow;