'use strict';

exports.__esModule = true;
exports.default = undefined;

var _templateObject = _taggedTemplateLiteralLoose(['\n  display: flex;\n  max-width: 5rem;\n  flex-direction: column;\n  justify-content: center;\n'], ['\n  display: flex;\n  max-width: 5rem;\n  flex-direction: column;\n  justify-content: center;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _hierarchyTree = require('./hierarchy-tree.utils');

var _hierarchyTreeSelectorArrow = require('./hierarchy-tree-selector-arrow.component');

var _hierarchyTreeSelectorArrow2 = _interopRequireDefault(_hierarchyTreeSelectorArrow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }
// App imports


var Controls = _styledComponents2.default.div(_templateObject);

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
      _react2.default.createElement(_hierarchyTreeSelectorArrow2.default, {
        icon: 'CaretLeft',
        onClick: onMoveToTreeClick,
        disabled: this.isMoveToTreeDisabled()
      }),
      _react2.default.createElement(_hierarchyTreeSelectorArrow2.default, {
        icon: 'CaretRight',
        onClick: onMoveToGridClick,
        disabled: !selectedTreeItem || (0, _hierarchyTree.isSelectedTreeItemParent)(this.props)
      })
    );
  };

  return HierarchyTreeSelectorArrowControls;
}(_react2.default.PureComponent);

exports.default = HierarchyTreeSelectorArrowControls;


HierarchyTreeSelectorArrowControls.defaultProps = {
  selectedTreeItem: null
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci1hcnJvdy1jb250cm9scy5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIkNvbnRyb2xzIiwic3R5bGVkIiwiZGl2IiwiSGllcmFyY2h5VHJlZVNlbGVjdG9yQXJyb3dDb250cm9scyIsImlzTW92ZVRvVHJlZURpc2FibGVkIiwicHJvcHMiLCJzZWxlY3RlZEdyaWRJdGVtcyIsImNoaWxkS2V5Iiwic2VsZWN0ZWRUcmVlSXRlbSIsInNpemUiLCJmaW5kIiwiY2hpbGRJdGVtIiwicmVuZGVyIiwib25Nb3ZlVG9HcmlkQ2xpY2siLCJvbk1vdmVUb1RyZWVDbGljayIsIlJlYWN0IiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7QUFEQTs7O0FBR0EsSUFBTUEsV0FBV0MsMkJBQU9DLEdBQWxCLGlCQUFOOztJQU1xQkMsa0M7Ozs7Ozs7Ozs7OztnS0FVbkJDLG9CLEdBQXVCLFlBQU07QUFBQSx3QkFDK0IsTUFBS0MsS0FEcEM7QUFBQSxVQUNuQkMsaUJBRG1CLGVBQ25CQSxpQkFEbUI7QUFBQSxVQUNBQyxRQURBLGVBQ0FBLFFBREE7QUFBQSxVQUNVQyxnQkFEVixlQUNVQSxnQkFEVjs7QUFFM0IsYUFBTyxDQUFDLDZDQUF5QixNQUFLSCxLQUE5QixDQUFELElBQ0wsQ0FBQ0Msa0JBQWtCRyxJQURkLElBRUwsQ0FBQyxDQUFDRCxpQkFBaUJELFFBQWpCLEVBQTJCRyxJQUEzQixDQUFnQztBQUFBLGVBQWFDLFVBQVVKLFFBQVYsQ0FBYjtBQUFBLE9BQWhDLENBRko7QUFHRCxLOzs7QUFaRDs7Ozs7Ozs7OytDQWNBSyxNLHFCQUFTO0FBQUEsaUJBQzRELEtBQUtQLEtBRGpFO0FBQUEsUUFDQ1EsaUJBREQsVUFDQ0EsaUJBREQ7QUFBQSxRQUNvQkMsaUJBRHBCLFVBQ29CQSxpQkFEcEI7QUFBQSxRQUN1Q04sZ0JBRHZDLFVBQ3VDQSxnQkFEdkM7O0FBRVAsV0FDRTtBQUFDLGNBQUQ7QUFBQTtBQUNFLG9DQUFDLG9DQUFEO0FBQ0UsY0FBSyxXQURQO0FBRUUsaUJBQVNNLGlCQUZYO0FBR0Usa0JBQVUsS0FBS1Ysb0JBQUw7QUFIWixRQURGO0FBTUUsb0NBQUMsb0NBQUQ7QUFDRSxjQUFLLFlBRFA7QUFFRSxpQkFBU1MsaUJBRlg7QUFHRSxrQkFBVSxDQUFDTCxnQkFBRCxJQUFxQiw2Q0FBeUIsS0FBS0gsS0FBOUI7QUFIakM7QUFORixLQURGO0FBY0QsRzs7O0VBakM2RFUsZ0JBQU1DLGE7O2tCQUFqRGIsa0M7OztBQTRDckJBLG1DQUFtQ2MsWUFBbkMsR0FBa0Q7QUFDaERULG9CQUFrQjtBQUQ4QixDQUFsRCIsImZpbGUiOiJoaWVyYXJjaHktdHJlZS1zZWxlY3Rvci1hcnJvdy1jb250cm9scy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBJbW11dGFibGVQcm9wVHlwZXMgZnJvbSAncmVhY3QtaW1tdXRhYmxlLXByb3B0eXBlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCB7aXNTZWxlY3RlZFRyZWVJdGVtUGFyZW50fSBmcm9tICcuL2hpZXJhcmNoeS10cmVlLnV0aWxzJztcbi8vIEFwcCBpbXBvcnRzXG5pbXBvcnQgQXJyb3cgZnJvbSAnLi9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci1hcnJvdy5jb21wb25lbnQnO1xuXG5jb25zdCBDb250cm9scyA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIG1heC13aWR0aDogNXJlbTtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG5gO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGllcmFyY2h5VHJlZVNlbGVjdG9yQXJyb3dDb250cm9scyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuXG5cbiAgLyoqXG4gICAqIElzIFwibW92ZSB0byB0cmVlXCIgY2FyZXQgZGlzYWJsZWQuIEJ1dHRvbiBpcyBkaXNhYmxlZCwgaWY6XG4gICAqICAtIHNlbGVjdGVkIHRyZWUgaXRlbSBpcyBub3QgYSBwYXJlbnRcbiAgICogIC0gbm8gZ3JpZCBpdGVtcyBhcmUgc2VsZWN0ZWRcbiAgICogIC0gaXRlbSBhbHJlYWR5IGhhcyBwYXJlbnRzIGFzIGEgY2hpbGRcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBpc01vdmVUb1RyZWVEaXNhYmxlZCA9ICgpID0+IHtcbiAgICBjb25zdCB7IHNlbGVjdGVkR3JpZEl0ZW1zLCBjaGlsZEtleSwgc2VsZWN0ZWRUcmVlSXRlbSB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gIWlzU2VsZWN0ZWRUcmVlSXRlbVBhcmVudCh0aGlzLnByb3BzKSB8fFxuICAgICAgIXNlbGVjdGVkR3JpZEl0ZW1zLnNpemUgfHxcbiAgICAgICEhc2VsZWN0ZWRUcmVlSXRlbVtjaGlsZEtleV0uZmluZChjaGlsZEl0ZW0gPT4gY2hpbGRJdGVtW2NoaWxkS2V5XSk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgb25Nb3ZlVG9HcmlkQ2xpY2ssIG9uTW92ZVRvVHJlZUNsaWNrLCBzZWxlY3RlZFRyZWVJdGVtIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8Q29udHJvbHM+XG4gICAgICAgIDxBcnJvd1xuICAgICAgICAgIGljb249XCJDYXJldExlZnRcIlxuICAgICAgICAgIG9uQ2xpY2s9e29uTW92ZVRvVHJlZUNsaWNrfVxuICAgICAgICAgIGRpc2FibGVkPXt0aGlzLmlzTW92ZVRvVHJlZURpc2FibGVkKCl9XG4gICAgICAgIC8+XG4gICAgICAgIDxBcnJvd1xuICAgICAgICAgIGljb249XCJDYXJldFJpZ2h0XCJcbiAgICAgICAgICBvbkNsaWNrPXtvbk1vdmVUb0dyaWRDbGlja31cbiAgICAgICAgICBkaXNhYmxlZD17IXNlbGVjdGVkVHJlZUl0ZW0gfHwgaXNTZWxlY3RlZFRyZWVJdGVtUGFyZW50KHRoaXMucHJvcHMpfVxuICAgICAgICAvPlxuICAgICAgPC9Db250cm9scz5cbiAgICApO1xuICB9XG59XG5cbkhpZXJhcmNoeVRyZWVTZWxlY3RvckFycm93Q29udHJvbHMucHJvcFR5cGVzID0ge1xuICBzZWxlY3RlZFRyZWVJdGVtOiBQcm9wVHlwZXMuc2hhcGUoe30pLFxuICBjaGlsZEtleTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBzZWxlY3RlZEdyaWRJdGVtczogSW1tdXRhYmxlUHJvcFR5cGVzLmxpc3QuaXNSZXF1aXJlZCxcbiAgb25Nb3ZlVG9HcmlkQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG9uTW92ZVRvVHJlZUNsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuSGllcmFyY2h5VHJlZVNlbGVjdG9yQXJyb3dDb250cm9scy5kZWZhdWx0UHJvcHMgPSB7XG4gIHNlbGVjdGVkVHJlZUl0ZW06IG51bGwsXG59O1xuXG4iXX0=