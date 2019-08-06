var _templateObject = _taggedTemplateLiteralLoose(['\n  display: flex;\n  max-width: 5rem;\n  min-width: 5rem;\n  flex-direction: column;\n  justify-content: center;\n'], ['\n  display: flex;\n  max-width: 5rem;\n  min-width: 5rem;\n  flex-direction: column;\n  justify-content: center;\n']),
    _templateObject2 = _taggedTemplateLiteralLoose(['\n  opacity: ', ';\n  font-size: 24px;\n'], ['\n  opacity: ', ';\n  font-size: 24px;\n']);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { Primitive } from '@opuscapita/oc-cm-common-layouts';

// App imports
import { isSelectedTreeItemParent } from './hierarchy-tree.utils';

var Controls = styled.div(_templateObject);

var Button = styled(Primitive.BorderlessButton)(_templateObject2, function (props) {
  return props.disabled ? '0.5' : '1';
});

var HierarchyTreeSelectorArrowControls = function (_React$PureComponent) {
  _inherits(HierarchyTreeSelectorArrowControls, _React$PureComponent);

  function HierarchyTreeSelectorArrowControls() {
    var _temp, _this, _ret;

    _classCallCheck(this, HierarchyTreeSelectorArrowControls);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.isMoveToTreeDisabled = function () {
      var _this$props = _this.props,
          selectedGridItems = _this$props.selectedGridItems,
          childKey = _this$props.childKey,
          selectedTreeItem = _this$props.selectedTreeItem;

      return !isSelectedTreeItemParent(_this.props) || !selectedGridItems.size || !!selectedTreeItem[childKey].find(function (childItem) {
        return childItem[childKey];
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }
  /**
   * Is "move to tree" caret disabled. Button is disabled, if:
   *  - selected tree item is not a parent
   *  - no grid items are selected
   *  - item already has parents as a child
   * @returns {boolean}
   */


  HierarchyTreeSelectorArrowControls.prototype.render = function render() {
    var _props = this.props,
        onMoveToGridClick = _props.onMoveToGridClick,
        onMoveToTreeClick = _props.onMoveToTreeClick,
        selectedTreeItem = _props.selectedTreeItem;

    return React.createElement(
      Controls,
      null,
      React.createElement(
        Button,
        {
          type: 'button',
          onClick: onMoveToTreeClick,
          disabled: this.isMoveToTreeDisabled()
        },
        React.createElement(FaChevronLeft, null)
      ),
      React.createElement(
        Button,
        {
          type: 'button',
          onClick: onMoveToGridClick,
          disabled: !selectedTreeItem || isSelectedTreeItemParent(this.props)
        },
        React.createElement(FaChevronRight, null)
      )
    );
  };

  return HierarchyTreeSelectorArrowControls;
}(React.PureComponent);

export { HierarchyTreeSelectorArrowControls as default };


HierarchyTreeSelectorArrowControls.propTypes = {
  selectedTreeItem: PropTypes.shape({}),
  childKey: PropTypes.string.isRequired,
  selectedGridItems: ImmutablePropTypes.list.isRequired,
  onMoveToGridClick: PropTypes.func.isRequired,
  onMoveToTreeClick: PropTypes.func.isRequired
};

HierarchyTreeSelectorArrowControls.defaultProps = {
  selectedTreeItem: null
};