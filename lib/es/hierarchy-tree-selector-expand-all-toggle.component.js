var _class, _temp;

var _templateObject = _taggedTemplateLiteralLoose(['\n  margin-right: ', ';\n  font-size: 18px;\n  align-items: center;\n  display: flex;\n'], ['\n  margin-right: ', ';\n  font-size: 18px;\n  align-items: center;\n  display: flex;\n']);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

import React from 'react';
import PropTypes from 'prop-types';
import { Primitive } from '@opuscapita/oc-cm-common-layouts';
import { FaCaretDown, FaCaretRight } from 'react-icons/fa';
import styled from 'styled-components';

var Button = styled(Primitive.BorderlessButton)(_templateObject, function (props) {
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

    return React.createElement(
      Button,
      { onClick: onClick },
      expandAll ? React.createElement(FaCaretDown, null) : React.createElement(FaCaretRight, null)
    );
  };

  return HierarchyTreeSelectorExpandAllToggle;
}(React.PureComponent), _class.defaultProps = {}, _temp);
export { HierarchyTreeSelectorExpandAllToggle as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci1leHBhbmQtYWxsLXRvZ2dsZS5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiUHJpbWl0aXZlIiwiRmFDYXJldERvd24iLCJGYUNhcmV0UmlnaHQiLCJzdHlsZWQiLCJCdXR0b24iLCJCb3JkZXJsZXNzQnV0dG9uIiwicHJvcHMiLCJ0aGVtZSIsImd1dHRlcldpZHRoIiwiSGllcmFyY2h5VHJlZVNlbGVjdG9yRXhwYW5kQWxsVG9nZ2xlIiwicmVuZGVyIiwib25DbGljayIsImV4cGFuZEFsbCIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsU0FBU0MsU0FBVCxRQUEwQixrQ0FBMUI7QUFDQSxTQUFTQyxXQUFULEVBQXNCQyxZQUF0QixRQUEwQyxnQkFBMUM7QUFDQSxPQUFPQyxNQUFQLE1BQW1CLG1CQUFuQjs7QUFFQSxJQUFNQyxTQUFTRCxPQUFPSCxVQUFVSyxnQkFBakIsQ0FBVCxrQkFDWTtBQUFBLFNBQVNDLE1BQU1DLEtBQU4sQ0FBWUMsV0FBckI7QUFBQSxDQURaLENBQU47O0lBT3FCQyxvQzs7Ozs7Ozs7O2lEQVNuQkMsTSxxQkFBUztBQUFBLGlCQUN3QixLQUFLSixLQUQ3QjtBQUFBLFFBQ0NLLE9BREQsVUFDQ0EsT0FERDtBQUFBLFFBQ1VDLFNBRFYsVUFDVUEsU0FEVjs7QUFFUCxXQUVFO0FBQUMsWUFBRDtBQUFBLFFBQVEsU0FBU0QsT0FBakI7QUFDR0Msa0JBQVksb0JBQUMsV0FBRCxPQUFaLEdBQThCLG9CQUFDLFlBQUQ7QUFEakMsS0FGRjtBQU1ELEc7OztFQWpCK0RkLE1BQU1lLGEsVUFNL0RDLFksR0FBZSxFO1NBTkhMLG9DIiwiZmlsZSI6ImhpZXJhcmNoeS10cmVlLXNlbGVjdG9yLWV4cGFuZC1hbGwtdG9nZ2xlLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgUHJpbWl0aXZlIH0gZnJvbSAnQG9wdXNjYXBpdGEvb2MtY20tY29tbW9uLWxheW91dHMnO1xuaW1wb3J0IHsgRmFDYXJldERvd24sIEZhQ2FyZXRSaWdodCB9IGZyb20gJ3JlYWN0LWljb25zL2ZhJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuXG5jb25zdCBCdXR0b24gPSBzdHlsZWQoUHJpbWl0aXZlLkJvcmRlcmxlc3NCdXR0b24pYFxuICBtYXJnaW4tcmlnaHQ6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuZ3V0dGVyV2lkdGh9O1xuICBmb250LXNpemU6IDE4cHg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGRpc3BsYXk6IGZsZXg7XG5gO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIaWVyYXJjaHlUcmVlU2VsZWN0b3JFeHBhbmRBbGxUb2dnbGUgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGV4cGFuZEFsbDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge307XG5cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBvbkNsaWNrLCBleHBhbmRBbGwgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcblxuICAgICAgPEJ1dHRvbiBvbkNsaWNrPXtvbkNsaWNrfT5cbiAgICAgICAge2V4cGFuZEFsbCA/IDxGYUNhcmV0RG93biAvPiA6IDxGYUNhcmV0UmlnaHQgLz59XG4gICAgICA8L0J1dHRvbj5cbiAgICApO1xuICB9XG59XG4iXX0=