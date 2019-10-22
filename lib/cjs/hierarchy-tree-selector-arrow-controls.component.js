"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactImmutableProptypes = _interopRequireDefault(require("react-immutable-proptypes"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _fa = require("react-icons/fa");

var _ocCmCommonLayouts = require("@opuscapita/oc-cm-common-layouts");

var _hierarchyTree = require("./hierarchy-tree.utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject2() {
  var data = _taggedTemplateLiteralLoose(["\n  opacity: ", ";\n  font-size: 24px;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteralLoose(["\n  display: flex;\n  max-width: 5rem;\n  min-width: 5rem;\n  flex-direction: column;\n  justify-content: center;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteralLoose(strings, raw) { if (!raw) { raw = strings.slice(0); } strings.raw = raw; return strings; }

var Controls = _styledComponents["default"].div(_templateObject());

var Button = (0, _styledComponents["default"])(_ocCmCommonLayouts.Primitive.BorderlessButton)(_templateObject2(), function (props) {
  return props.disabled ? '0.5' : '1';
});

var HierarchyTreeSelectorArrowControls =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(HierarchyTreeSelectorArrowControls, _React$PureComponent);

  function HierarchyTreeSelectorArrowControls() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "isMoveToTreeDisabled", function () {
      var _this$props = _this.props,
          selectedGridItems = _this$props.selectedGridItems,
          childKey = _this$props.childKey,
          selectedTreeItem = _this$props.selectedTreeItem;
      return !(0, _hierarchyTree.isSelectedTreeItemParent)(_this.props) || !selectedGridItems.size || !!selectedTreeItem[childKey].find(function (childItem) {
        return childItem[childKey];
      });
    });

    return _this;
  }

  var _proto = HierarchyTreeSelectorArrowControls.prototype;

  _proto.render = function render() {
    var _this$props2 = this.props,
        onMoveToGridClick = _this$props2.onMoveToGridClick,
        onMoveToTreeClick = _this$props2.onMoveToTreeClick,
        selectedTreeItem = _this$props2.selectedTreeItem;
    return _react["default"].createElement(Controls, null, _react["default"].createElement(Button, {
      type: "button",
      onClick: onMoveToTreeClick,
      disabled: this.isMoveToTreeDisabled()
    }, _react["default"].createElement(_fa.FaChevronLeft, null)), _react["default"].createElement(Button, {
      type: "button",
      onClick: onMoveToGridClick,
      disabled: !selectedTreeItem || (0, _hierarchyTree.isSelectedTreeItemParent)(this.props)
    }, _react["default"].createElement(_fa.FaChevronRight, null)));
  };

  return HierarchyTreeSelectorArrowControls;
}(_react["default"].PureComponent);

exports["default"] = HierarchyTreeSelectorArrowControls;
HierarchyTreeSelectorArrowControls.defaultProps = {
  selectedTreeItem: null
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci1hcnJvdy1jb250cm9scy5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIkNvbnRyb2xzIiwic3R5bGVkIiwiZGl2IiwiQnV0dG9uIiwiUHJpbWl0aXZlIiwiQm9yZGVybGVzc0J1dHRvbiIsInByb3BzIiwiZGlzYWJsZWQiLCJIaWVyYXJjaHlUcmVlU2VsZWN0b3JBcnJvd0NvbnRyb2xzIiwic2VsZWN0ZWRHcmlkSXRlbXMiLCJjaGlsZEtleSIsInNlbGVjdGVkVHJlZUl0ZW0iLCJzaXplIiwiZmluZCIsImNoaWxkSXRlbSIsInJlbmRlciIsIm9uTW92ZVRvR3JpZENsaWNrIiwib25Nb3ZlVG9UcmVlQ2xpY2siLCJpc01vdmVUb1RyZWVEaXNhYmxlZCIsIlJlYWN0IiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxRQUFRLEdBQUdDLDZCQUFPQyxHQUFWLG1CQUFkOztBQVFBLElBQU1DLE1BQU0sR0FBRyxrQ0FBT0MsNkJBQVVDLGdCQUFqQixDQUFILHFCQUNDLFVBQUFDLEtBQUs7QUFBQSxTQUFLQSxLQUFLLENBQUNDLFFBQU4sR0FBaUIsS0FBakIsR0FBeUIsR0FBOUI7QUFBQSxDQUROLENBQVo7O0lBS3FCQyxrQzs7Ozs7Ozs7Ozs7Ozs7MkVBUUksWUFBTTtBQUFBLHdCQUMrQixNQUFLRixLQURwQztBQUFBLFVBQ25CRyxpQkFEbUIsZUFDbkJBLGlCQURtQjtBQUFBLFVBQ0FDLFFBREEsZUFDQUEsUUFEQTtBQUFBLFVBQ1VDLGdCQURWLGVBQ1VBLGdCQURWO0FBRTNCLGFBQU8sQ0FBQyw2Q0FBeUIsTUFBS0wsS0FBOUIsQ0FBRCxJQUNKLENBQUNHLGlCQUFpQixDQUFDRyxJQURmLElBRUosQ0FBQyxDQUFDRCxnQkFBZ0IsQ0FBQ0QsUUFBRCxDQUFoQixDQUEyQkcsSUFBM0IsQ0FBZ0MsVUFBQUMsU0FBUztBQUFBLGVBQUlBLFNBQVMsQ0FBQ0osUUFBRCxDQUFiO0FBQUEsT0FBekMsQ0FGTDtBQUdELEs7Ozs7Ozs7U0FFREssTSxHQUFBLGtCQUFTO0FBQUEsdUJBQzRELEtBQUtULEtBRGpFO0FBQUEsUUFDQ1UsaUJBREQsZ0JBQ0NBLGlCQUREO0FBQUEsUUFDb0JDLGlCQURwQixnQkFDb0JBLGlCQURwQjtBQUFBLFFBQ3VDTixnQkFEdkMsZ0JBQ3VDQSxnQkFEdkM7QUFFUCxXQUNFLGdDQUFDLFFBQUQsUUFDRSxnQ0FBQyxNQUFEO0FBQ0UsTUFBQSxJQUFJLEVBQUMsUUFEUDtBQUVFLE1BQUEsT0FBTyxFQUFFTSxpQkFGWDtBQUdFLE1BQUEsUUFBUSxFQUFFLEtBQUtDLG9CQUFMO0FBSFosT0FLRSxnQ0FBQyxpQkFBRCxPQUxGLENBREYsRUFRRSxnQ0FBQyxNQUFEO0FBQ0UsTUFBQSxJQUFJLEVBQUMsUUFEUDtBQUVFLE1BQUEsT0FBTyxFQUFFRixpQkFGWDtBQUdFLE1BQUEsUUFBUSxFQUFFLENBQUNMLGdCQUFELElBQXFCLDZDQUF5QixLQUFLTCxLQUE5QjtBQUhqQyxPQUtFLGdDQUFDLGtCQUFELE9BTEYsQ0FSRixDQURGO0FBa0JELEc7OztFQW5DNkRhLGtCQUFNQyxhOzs7QUE4Q3RFWixrQ0FBa0MsQ0FBQ2EsWUFBbkMsR0FBa0Q7QUFDaERWLEVBQUFBLGdCQUFnQixFQUFFO0FBRDhCLENBQWxEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgSW1tdXRhYmxlUHJvcFR5cGVzIGZyb20gJ3JlYWN0LWltbXV0YWJsZS1wcm9wdHlwZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgeyBGYUNoZXZyb25SaWdodCwgRmFDaGV2cm9uTGVmdCB9IGZyb20gJ3JlYWN0LWljb25zL2ZhJztcbmltcG9ydCB7IFByaW1pdGl2ZSB9IGZyb20gJ0BvcHVzY2FwaXRhL29jLWNtLWNvbW1vbi1sYXlvdXRzJztcblxuLy8gQXBwIGltcG9ydHNcbmltcG9ydCB7IGlzU2VsZWN0ZWRUcmVlSXRlbVBhcmVudCB9IGZyb20gJy4vaGllcmFyY2h5LXRyZWUudXRpbHMnO1xuXG5jb25zdCBDb250cm9scyA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIG1heC13aWR0aDogNXJlbTtcbiAgbWluLXdpZHRoOiA1cmVtO1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbmA7XG5cbmNvbnN0IEJ1dHRvbiA9IHN0eWxlZChQcmltaXRpdmUuQm9yZGVybGVzc0J1dHRvbilgXG4gIG9wYWNpdHk6ICR7cHJvcHMgPT4gKHByb3BzLmRpc2FibGVkID8gJzAuNScgOiAnMScpfTtcbiAgZm9udC1zaXplOiAyNHB4O1xuYDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGllcmFyY2h5VHJlZVNlbGVjdG9yQXJyb3dDb250cm9scyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAvKipcbiAgICogSXMgXCJtb3ZlIHRvIHRyZWVcIiBjYXJldCBkaXNhYmxlZC4gQnV0dG9uIGlzIGRpc2FibGVkLCBpZjpcbiAgICogIC0gc2VsZWN0ZWQgdHJlZSBpdGVtIGlzIG5vdCBhIHBhcmVudFxuICAgKiAgLSBubyBncmlkIGl0ZW1zIGFyZSBzZWxlY3RlZFxuICAgKiAgLSBpdGVtIGFscmVhZHkgaGFzIHBhcmVudHMgYXMgYSBjaGlsZFxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIGlzTW92ZVRvVHJlZURpc2FibGVkID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgc2VsZWN0ZWRHcmlkSXRlbXMsIGNoaWxkS2V5LCBzZWxlY3RlZFRyZWVJdGVtIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAhaXNTZWxlY3RlZFRyZWVJdGVtUGFyZW50KHRoaXMucHJvcHMpXG4gICAgfHwgIXNlbGVjdGVkR3JpZEl0ZW1zLnNpemVcbiAgICB8fCAhIXNlbGVjdGVkVHJlZUl0ZW1bY2hpbGRLZXldLmZpbmQoY2hpbGRJdGVtID0+IGNoaWxkSXRlbVtjaGlsZEtleV0pO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IG9uTW92ZVRvR3JpZENsaWNrLCBvbk1vdmVUb1RyZWVDbGljaywgc2VsZWN0ZWRUcmVlSXRlbSB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPENvbnRyb2xzPlxuICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgb25DbGljaz17b25Nb3ZlVG9UcmVlQ2xpY2t9XG4gICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuaXNNb3ZlVG9UcmVlRGlzYWJsZWQoKX1cbiAgICAgICAgPlxuICAgICAgICAgIDxGYUNoZXZyb25MZWZ0IC8+XG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgb25DbGljaz17b25Nb3ZlVG9HcmlkQ2xpY2t9XG4gICAgICAgICAgZGlzYWJsZWQ9eyFzZWxlY3RlZFRyZWVJdGVtIHx8IGlzU2VsZWN0ZWRUcmVlSXRlbVBhcmVudCh0aGlzLnByb3BzKX1cbiAgICAgICAgPlxuICAgICAgICAgIDxGYUNoZXZyb25SaWdodCAvPlxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgIDwvQ29udHJvbHM+XG4gICAgKTtcbiAgfVxufVxuXG5IaWVyYXJjaHlUcmVlU2VsZWN0b3JBcnJvd0NvbnRyb2xzLnByb3BUeXBlcyA9IHtcbiAgc2VsZWN0ZWRUcmVlSXRlbTogUHJvcFR5cGVzLnNoYXBlKHt9KSxcbiAgY2hpbGRLZXk6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgc2VsZWN0ZWRHcmlkSXRlbXM6IEltbXV0YWJsZVByb3BUeXBlcy5saXN0LmlzUmVxdWlyZWQsXG4gIG9uTW92ZVRvR3JpZENsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBvbk1vdmVUb1RyZWVDbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbkhpZXJhcmNoeVRyZWVTZWxlY3RvckFycm93Q29udHJvbHMuZGVmYXVsdFByb3BzID0ge1xuICBzZWxlY3RlZFRyZWVJdGVtOiBudWxsLFxufTtcbiJdfQ==