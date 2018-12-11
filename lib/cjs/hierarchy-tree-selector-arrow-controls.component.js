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


HierarchyTreeSelectorArrowControls.defaultProps = {
  selectedTreeItem: null
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci1hcnJvdy1jb250cm9scy5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIkNvbnRyb2xzIiwic3R5bGVkIiwiZGl2IiwiQnV0dG9uIiwiUHJpbWl0aXZlIiwiQm9yZGVybGVzc0J1dHRvbiIsInByb3BzIiwiZGlzYWJsZWQiLCJIaWVyYXJjaHlUcmVlU2VsZWN0b3JBcnJvd0NvbnRyb2xzIiwiaXNNb3ZlVG9UcmVlRGlzYWJsZWQiLCJzZWxlY3RlZEdyaWRJdGVtcyIsImNoaWxkS2V5Iiwic2VsZWN0ZWRUcmVlSXRlbSIsInNpemUiLCJmaW5kIiwiY2hpbGRJdGVtIiwicmVuZGVyIiwib25Nb3ZlVG9HcmlkQ2xpY2siLCJvbk1vdmVUb1RyZWVDbGljayIsIlJlYWN0IiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUdBOzs7Ozs7Ozs7Ozs7QUFEQTs7O0FBR0EsSUFBTUEsV0FBV0MsMkJBQU9DLEdBQWxCLGlCQUFOOztBQVFBLElBQU1DLFNBQVMsZ0NBQU9DLDZCQUFVQyxnQkFBakIsQ0FBVCxtQkFDTztBQUFBLFNBQVVDLE1BQU1DLFFBQU4sR0FBaUIsS0FBakIsR0FBeUIsR0FBbkM7QUFBQSxDQURQLENBQU47O0lBS3FCQyxrQzs7Ozs7Ozs7Ozs7O2dLQVFuQkMsb0IsR0FBdUIsWUFBTTtBQUFBLHdCQUMrQixNQUFLSCxLQURwQztBQUFBLFVBQ25CSSxpQkFEbUIsZUFDbkJBLGlCQURtQjtBQUFBLFVBQ0FDLFFBREEsZUFDQUEsUUFEQTtBQUFBLFVBQ1VDLGdCQURWLGVBQ1VBLGdCQURWOztBQUUzQixhQUFPLENBQUMsNkNBQXlCLE1BQUtOLEtBQTlCLENBQUQsSUFDTCxDQUFDSSxrQkFBa0JHLElBRGQsSUFFTCxDQUFDLENBQUNELGlCQUFpQkQsUUFBakIsRUFBMkJHLElBQTNCLENBQWdDO0FBQUEsZUFBYUMsVUFBVUosUUFBVixDQUFiO0FBQUEsT0FBaEMsQ0FGSjtBQUdELEs7O0FBWkQ7Ozs7Ozs7OzsrQ0FjQUssTSxxQkFBUztBQUFBLGlCQUM0RCxLQUFLVixLQURqRTtBQUFBLFFBQ0NXLGlCQURELFVBQ0NBLGlCQUREO0FBQUEsUUFDb0JDLGlCQURwQixVQUNvQkEsaUJBRHBCO0FBQUEsUUFDdUNOLGdCQUR2QyxVQUN1Q0EsZ0JBRHZDOztBQUVQLFdBQ0U7QUFBQyxjQUFEO0FBQUE7QUFDRTtBQUFDLGNBQUQ7QUFBQTtBQUNFLG1CQUFTTSxpQkFEWDtBQUVFLG9CQUFVLEtBQUtULG9CQUFMO0FBRlo7QUFHQyxzQ0FBQyxpQkFBRDtBQUhELE9BREY7QUFNRTtBQUFDLGNBQUQ7QUFBQTtBQUNFLG1CQUFTUSxpQkFEWDtBQUVFLG9CQUFVLENBQUNMLGdCQUFELElBQXFCLDZDQUF5QixLQUFLTixLQUE5QjtBQUZqQztBQUdDLHNDQUFDLGtCQUFEO0FBSEQ7QUFORixLQURGO0FBY0QsRzs7O0VBL0I2RGEsZ0JBQU1DLGE7O2tCQUFqRFosa0M7OztBQTBDckJBLG1DQUFtQ2EsWUFBbkMsR0FBa0Q7QUFDaERULG9CQUFrQjtBQUQ4QixDQUFsRCIsImZpbGUiOiJoaWVyYXJjaHktdHJlZS1zZWxlY3Rvci1hcnJvdy1jb250cm9scy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xyXG5pbXBvcnQgSW1tdXRhYmxlUHJvcFR5cGVzIGZyb20gJ3JlYWN0LWltbXV0YWJsZS1wcm9wdHlwZXMnO1xyXG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcclxuaW1wb3J0IHsgRmFDaGV2cm9uUmlnaHQsIEZhQ2hldnJvbkxlZnQgfSBmcm9tICdyZWFjdC1pY29ucy9mYSc7XHJcbmltcG9ydCB7IFByaW1pdGl2ZSB9IGZyb20gJ0BvcHVzY2FwaXRhL29jLWNtLWNvbW1vbi1sYXlvdXRzJztcclxuXHJcbi8vIEFwcCBpbXBvcnRzXHJcbmltcG9ydCB7IGlzU2VsZWN0ZWRUcmVlSXRlbVBhcmVudCB9IGZyb20gJy4vaGllcmFyY2h5LXRyZWUudXRpbHMnO1xyXG5cclxuY29uc3QgQ29udHJvbHMgPSBzdHlsZWQuZGl2YFxyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgbWF4LXdpZHRoOiA1cmVtO1xyXG4gIG1pbi13aWR0aDogNXJlbTtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG5gO1xyXG5cclxuY29uc3QgQnV0dG9uID0gc3R5bGVkKFByaW1pdGl2ZS5Cb3JkZXJsZXNzQnV0dG9uKWBcclxuICBvcGFjaXR5OiAke3Byb3BzID0+IChwcm9wcy5kaXNhYmxlZCA/ICcwLjUnIDogJzEnKX07XHJcbiAgZm9udC1zaXplOiAyNHB4O1xyXG5gO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGllcmFyY2h5VHJlZVNlbGVjdG9yQXJyb3dDb250cm9scyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xyXG4gIC8qKlxyXG4gICAqIElzIFwibW92ZSB0byB0cmVlXCIgY2FyZXQgZGlzYWJsZWQuIEJ1dHRvbiBpcyBkaXNhYmxlZCwgaWY6XHJcbiAgICogIC0gc2VsZWN0ZWQgdHJlZSBpdGVtIGlzIG5vdCBhIHBhcmVudFxyXG4gICAqICAtIG5vIGdyaWQgaXRlbXMgYXJlIHNlbGVjdGVkXHJcbiAgICogIC0gaXRlbSBhbHJlYWR5IGhhcyBwYXJlbnRzIGFzIGEgY2hpbGRcclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgKi9cclxuICBpc01vdmVUb1RyZWVEaXNhYmxlZCA9ICgpID0+IHtcclxuICAgIGNvbnN0IHsgc2VsZWN0ZWRHcmlkSXRlbXMsIGNoaWxkS2V5LCBzZWxlY3RlZFRyZWVJdGVtIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgcmV0dXJuICFpc1NlbGVjdGVkVHJlZUl0ZW1QYXJlbnQodGhpcy5wcm9wcykgfHxcclxuICAgICAgIXNlbGVjdGVkR3JpZEl0ZW1zLnNpemUgfHxcclxuICAgICAgISFzZWxlY3RlZFRyZWVJdGVtW2NoaWxkS2V5XS5maW5kKGNoaWxkSXRlbSA9PiBjaGlsZEl0ZW1bY2hpbGRLZXldKTtcclxuICB9O1xyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7IG9uTW92ZVRvR3JpZENsaWNrLCBvbk1vdmVUb1RyZWVDbGljaywgc2VsZWN0ZWRUcmVlSXRlbSB9ID0gdGhpcy5wcm9wcztcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxDb250cm9scz5cclxuICAgICAgICA8QnV0dG9uXHJcbiAgICAgICAgICBvbkNsaWNrPXtvbk1vdmVUb1RyZWVDbGlja31cclxuICAgICAgICAgIGRpc2FibGVkPXt0aGlzLmlzTW92ZVRvVHJlZURpc2FibGVkKCl9XHJcbiAgICAgICAgPjxGYUNoZXZyb25MZWZ0IC8+XHJcbiAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgPEJ1dHRvblxyXG4gICAgICAgICAgb25DbGljaz17b25Nb3ZlVG9HcmlkQ2xpY2t9XHJcbiAgICAgICAgICBkaXNhYmxlZD17IXNlbGVjdGVkVHJlZUl0ZW0gfHwgaXNTZWxlY3RlZFRyZWVJdGVtUGFyZW50KHRoaXMucHJvcHMpfVxyXG4gICAgICAgID48RmFDaGV2cm9uUmlnaHQgLz5cclxuICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgPC9Db250cm9scz5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5IaWVyYXJjaHlUcmVlU2VsZWN0b3JBcnJvd0NvbnRyb2xzLnByb3BUeXBlcyA9IHtcclxuICBzZWxlY3RlZFRyZWVJdGVtOiBQcm9wVHlwZXMuc2hhcGUoe30pLFxyXG4gIGNoaWxkS2V5OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgc2VsZWN0ZWRHcmlkSXRlbXM6IEltbXV0YWJsZVByb3BUeXBlcy5saXN0LmlzUmVxdWlyZWQsXHJcbiAgb25Nb3ZlVG9HcmlkQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgb25Nb3ZlVG9UcmVlQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbn07XHJcblxyXG5IaWVyYXJjaHlUcmVlU2VsZWN0b3JBcnJvd0NvbnRyb2xzLmRlZmF1bHRQcm9wcyA9IHtcclxuICBzZWxlY3RlZFRyZWVJdGVtOiBudWxsLFxyXG59O1xyXG5cclxuIl19