'use strict';

exports.__esModule = true;
exports.default = undefined;

var _templateObject = _taggedTemplateLiteralLoose(['\n  display: flex;\n  max-width: 5rem;\n  min-width: 5rem;\n  flex-direction: column;\n  justify-content: center;\n'], ['\n  display: flex;\n  max-width: 5rem;\n  min-width: 5rem;\n  flex-direction: column;\n  justify-content: center;\n']),
    _templateObject2 = _taggedTemplateLiteralLoose(['\n  opacity: ', ';\n  font-size: 24px;\n'], ['\n  opacity: ', ';\n  font-size: 24px;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _fa = require('react-icons/fa');

var _ocCmCommonLayouts = require('@opuscapita/oc-cm-common-layouts');

var _hierarchyTree = require('./hierarchy-tree.utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

// App imports


var Controls = _styledComponents2.default.div(_templateObject);

var Button = (0, _styledComponents2.default)(_ocCmCommonLayouts.Primitive.BorderlessButton)(_templateObject2, function (props) {
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

      return !(0, _hierarchyTree.isSelectedTreeItemParent)(_this.props) || !selectedGridItems.size || !!selectedTreeItem[childKey].find(function (childItem) {
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

    return _react2.default.createElement(
      Controls,
      null,
      _react2.default.createElement(
        Button,
        {
          onClick: onMoveToTreeClick,
          disabled: this.isMoveToTreeDisabled()
        },
        _react2.default.createElement(_fa.FaChevronLeft, null)
      ),
      _react2.default.createElement(
        Button,
        {
          onClick: onMoveToGridClick,
          disabled: !selectedTreeItem || (0, _hierarchyTree.isSelectedTreeItemParent)(this.props)
        },
        _react2.default.createElement(_fa.FaChevronRight, null)
      )
    );
  };

  return HierarchyTreeSelectorArrowControls;
}(_react2.default.PureComponent);

exports.default = HierarchyTreeSelectorArrowControls;


HierarchyTreeSelectorArrowControls.propTypes = {
  selectedTreeItem: _propTypes2.default.shape({}),
  childKey: _propTypes2.default.string.isRequired,
  selectedGridItems: _reactImmutableProptypes2.default.list.isRequired,
  onMoveToGridClick: _propTypes2.default.func.isRequired,
  onMoveToTreeClick: _propTypes2.default.func.isRequired
};

HierarchyTreeSelectorArrowControls.defaultProps = {
  selectedTreeItem: null
};