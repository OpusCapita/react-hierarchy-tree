var _templateObject = _taggedTemplateLiteralLoose(['\n  opacity: ', ';\n'], ['\n  opacity: ', ';\n']);

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

import React from 'react';
import { Icon } from '@opuscapita/react-icons';
import PropTypes from 'prop-types';
import { Primitive } from '@opuscapita/oc-cm-common-layouts';
import styled from 'styled-components';
// App imports

var Arrow = styled(Icon)(_templateObject, function (props) {
  return props.disabled ? '0.5' : '1';
});
var HierarchyTreeSelectorArrow = function HierarchyTreeSelectorArrow(_ref) {
  var icon = _ref.icon,
      onClick = _ref.onClick,
      disabled = _ref.disabled;
  return React.createElement(
    Primitive.BorderlessButton,
    { onClick: onClick, disabled: disabled },
    React.createElement(Arrow, { type: 'indicator', name: icon, disabled: disabled })
  );
};

HierarchyTreeSelectorArrow.propTypes = {
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

HierarchyTreeSelectorArrow.defaultProps = {
  disabled: true
};

export default HierarchyTreeSelectorArrow;