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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci1hcnJvdy1jb250cm9scy5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIkNvbnRyb2xzIiwic3R5bGVkIiwiZGl2IiwiQnV0dG9uIiwiUHJpbWl0aXZlIiwiQm9yZGVybGVzc0J1dHRvbiIsInByb3BzIiwiZGlzYWJsZWQiLCJIaWVyYXJjaHlUcmVlU2VsZWN0b3JBcnJvd0NvbnRyb2xzIiwiaXNNb3ZlVG9UcmVlRGlzYWJsZWQiLCJzZWxlY3RlZEdyaWRJdGVtcyIsImNoaWxkS2V5Iiwic2VsZWN0ZWRUcmVlSXRlbSIsInNpemUiLCJmaW5kIiwiY2hpbGRJdGVtIiwicmVuZGVyIiwib25Nb3ZlVG9HcmlkQ2xpY2siLCJvbk1vdmVUb1RyZWVDbGljayIsIlJlYWN0IiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUdBOzs7Ozs7Ozs7Ozs7QUFEQTs7O0FBR0EsSUFBTUEsV0FBV0MsMkJBQU9DLEdBQWxCLGlCQUFOOztBQVFBLElBQU1DLFNBQVMsZ0NBQU9DLDZCQUFVQyxnQkFBakIsQ0FBVCxtQkFDTztBQUFBLFNBQVVDLE1BQU1DLFFBQU4sR0FBaUIsS0FBakIsR0FBeUIsR0FBbkM7QUFBQSxDQURQLENBQU47O0lBS3FCQyxrQzs7Ozs7Ozs7Ozs7O2dLQVFuQkMsb0IsR0FBdUIsWUFBTTtBQUFBLHdCQUMrQixNQUFLSCxLQURwQztBQUFBLFVBQ25CSSxpQkFEbUIsZUFDbkJBLGlCQURtQjtBQUFBLFVBQ0FDLFFBREEsZUFDQUEsUUFEQTtBQUFBLFVBQ1VDLGdCQURWLGVBQ1VBLGdCQURWOztBQUUzQixhQUFPLENBQUMsNkNBQXlCLE1BQUtOLEtBQTlCLENBQUQsSUFDTCxDQUFDSSxrQkFBa0JHLElBRGQsSUFFTCxDQUFDLENBQUNELGlCQUFpQkQsUUFBakIsRUFBMkJHLElBQTNCLENBQWdDO0FBQUEsZUFBYUMsVUFBVUosUUFBVixDQUFiO0FBQUEsT0FBaEMsQ0FGSjtBQUdELEs7O0FBWkQ7Ozs7Ozs7OzsrQ0FjQUssTSxxQkFBUztBQUFBLGlCQUM0RCxLQUFLVixLQURqRTtBQUFBLFFBQ0NXLGlCQURELFVBQ0NBLGlCQUREO0FBQUEsUUFDb0JDLGlCQURwQixVQUNvQkEsaUJBRHBCO0FBQUEsUUFDdUNOLGdCQUR2QyxVQUN1Q0EsZ0JBRHZDOztBQUVQLFdBQ0U7QUFBQyxjQUFEO0FBQUE7QUFDRTtBQUFDLGNBQUQ7QUFBQTtBQUNFLG1CQUFTTSxpQkFEWDtBQUVFLG9CQUFVLEtBQUtULG9CQUFMO0FBRlo7QUFHQyxzQ0FBQyxpQkFBRDtBQUhELE9BREY7QUFNRTtBQUFDLGNBQUQ7QUFBQTtBQUNFLG1CQUFTUSxpQkFEWDtBQUVFLG9CQUFVLENBQUNMLGdCQUFELElBQXFCLDZDQUF5QixLQUFLTixLQUE5QjtBQUZqQztBQUdDLHNDQUFDLGtCQUFEO0FBSEQ7QUFORixLQURGO0FBY0QsRzs7O0VBL0I2RGEsZ0JBQU1DLGE7O2tCQUFqRFosa0M7OztBQTBDckJBLG1DQUFtQ2EsWUFBbkMsR0FBa0Q7QUFDaERULG9CQUFrQjtBQUQ4QixDQUFsRCIsImZpbGUiOiJoaWVyYXJjaHktdHJlZS1zZWxlY3Rvci1hcnJvdy1jb250cm9scy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBJbW11dGFibGVQcm9wVHlwZXMgZnJvbSAncmVhY3QtaW1tdXRhYmxlLXByb3B0eXBlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCB7IEZhQ2hldnJvblJpZ2h0LCBGYUNoZXZyb25MZWZ0IH0gZnJvbSAncmVhY3QtaWNvbnMvZmEnO1xuaW1wb3J0IHsgUHJpbWl0aXZlIH0gZnJvbSAnQG9wdXNjYXBpdGEvb2MtY20tY29tbW9uLWxheW91dHMnO1xuXG4vLyBBcHAgaW1wb3J0c1xuaW1wb3J0IHsgaXNTZWxlY3RlZFRyZWVJdGVtUGFyZW50IH0gZnJvbSAnLi9oaWVyYXJjaHktdHJlZS51dGlscyc7XG5cbmNvbnN0IENvbnRyb2xzID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogZmxleDtcbiAgbWF4LXdpZHRoOiA1cmVtO1xuICBtaW4td2lkdGg6IDVyZW07XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuYDtcblxuY29uc3QgQnV0dG9uID0gc3R5bGVkKFByaW1pdGl2ZS5Cb3JkZXJsZXNzQnV0dG9uKWBcbiAgb3BhY2l0eTogJHtwcm9wcyA9PiAocHJvcHMuZGlzYWJsZWQgPyAnMC41JyA6ICcxJyl9O1xuICBmb250LXNpemU6IDI0cHg7XG5gO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIaWVyYXJjaHlUcmVlU2VsZWN0b3JBcnJvd0NvbnRyb2xzIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBJcyBcIm1vdmUgdG8gdHJlZVwiIGNhcmV0IGRpc2FibGVkLiBCdXR0b24gaXMgZGlzYWJsZWQsIGlmOlxuICAgKiAgLSBzZWxlY3RlZCB0cmVlIGl0ZW0gaXMgbm90IGEgcGFyZW50XG4gICAqICAtIG5vIGdyaWQgaXRlbXMgYXJlIHNlbGVjdGVkXG4gICAqICAtIGl0ZW0gYWxyZWFkeSBoYXMgcGFyZW50cyBhcyBhIGNoaWxkXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgaXNNb3ZlVG9UcmVlRGlzYWJsZWQgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBzZWxlY3RlZEdyaWRJdGVtcywgY2hpbGRLZXksIHNlbGVjdGVkVHJlZUl0ZW0gfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuICFpc1NlbGVjdGVkVHJlZUl0ZW1QYXJlbnQodGhpcy5wcm9wcykgfHxcbiAgICAgICFzZWxlY3RlZEdyaWRJdGVtcy5zaXplIHx8XG4gICAgICAhIXNlbGVjdGVkVHJlZUl0ZW1bY2hpbGRLZXldLmZpbmQoY2hpbGRJdGVtID0+IGNoaWxkSXRlbVtjaGlsZEtleV0pO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IG9uTW92ZVRvR3JpZENsaWNrLCBvbk1vdmVUb1RyZWVDbGljaywgc2VsZWN0ZWRUcmVlSXRlbSB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPENvbnRyb2xzPlxuICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgb25DbGljaz17b25Nb3ZlVG9UcmVlQ2xpY2t9XG4gICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuaXNNb3ZlVG9UcmVlRGlzYWJsZWQoKX1cbiAgICAgICAgPjxGYUNoZXZyb25MZWZ0IC8+XG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgb25DbGljaz17b25Nb3ZlVG9HcmlkQ2xpY2t9XG4gICAgICAgICAgZGlzYWJsZWQ9eyFzZWxlY3RlZFRyZWVJdGVtIHx8IGlzU2VsZWN0ZWRUcmVlSXRlbVBhcmVudCh0aGlzLnByb3BzKX1cbiAgICAgICAgPjxGYUNoZXZyb25SaWdodCAvPlxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgIDwvQ29udHJvbHM+XG4gICAgKTtcbiAgfVxufVxuXG5IaWVyYXJjaHlUcmVlU2VsZWN0b3JBcnJvd0NvbnRyb2xzLnByb3BUeXBlcyA9IHtcbiAgc2VsZWN0ZWRUcmVlSXRlbTogUHJvcFR5cGVzLnNoYXBlKHt9KSxcbiAgY2hpbGRLZXk6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgc2VsZWN0ZWRHcmlkSXRlbXM6IEltbXV0YWJsZVByb3BUeXBlcy5saXN0LmlzUmVxdWlyZWQsXG4gIG9uTW92ZVRvR3JpZENsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBvbk1vdmVUb1RyZWVDbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbkhpZXJhcmNoeVRyZWVTZWxlY3RvckFycm93Q29udHJvbHMuZGVmYXVsdFByb3BzID0ge1xuICBzZWxlY3RlZFRyZWVJdGVtOiBudWxsLFxufTtcblxuIl19