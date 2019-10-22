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

import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { Primitive } from '@opuscapita/oc-cm-common-layouts'; // App imports

import { isSelectedTreeItemParent } from './hierarchy-tree.utils';
var Controls = styled.div(_templateObject());
var Button = styled(Primitive.BorderlessButton)(_templateObject2(), function (props) {
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
      return !isSelectedTreeItemParent(_this.props) || !selectedGridItems.size || !!selectedTreeItem[childKey].find(function (childItem) {
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
    return React.createElement(Controls, null, React.createElement(Button, {
      type: "button",
      onClick: onMoveToTreeClick,
      disabled: this.isMoveToTreeDisabled()
    }, React.createElement(FaChevronLeft, null)), React.createElement(Button, {
      type: "button",
      onClick: onMoveToGridClick,
      disabled: !selectedTreeItem || isSelectedTreeItemParent(this.props)
    }, React.createElement(FaChevronRight, null)));
  };

  return HierarchyTreeSelectorArrowControls;
}(React.PureComponent);

export { HierarchyTreeSelectorArrowControls as default };
HierarchyTreeSelectorArrowControls.defaultProps = {
  selectedTreeItem: null
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci1hcnJvdy1jb250cm9scy5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiSW1tdXRhYmxlUHJvcFR5cGVzIiwic3R5bGVkIiwiRmFDaGV2cm9uUmlnaHQiLCJGYUNoZXZyb25MZWZ0IiwiUHJpbWl0aXZlIiwiaXNTZWxlY3RlZFRyZWVJdGVtUGFyZW50IiwiQ29udHJvbHMiLCJkaXYiLCJCdXR0b24iLCJCb3JkZXJsZXNzQnV0dG9uIiwicHJvcHMiLCJkaXNhYmxlZCIsIkhpZXJhcmNoeVRyZWVTZWxlY3RvckFycm93Q29udHJvbHMiLCJzZWxlY3RlZEdyaWRJdGVtcyIsImNoaWxkS2V5Iiwic2VsZWN0ZWRUcmVlSXRlbSIsInNpemUiLCJmaW5kIiwiY2hpbGRJdGVtIiwicmVuZGVyIiwib25Nb3ZlVG9HcmlkQ2xpY2siLCJvbk1vdmVUb1RyZWVDbGljayIsImlzTW92ZVRvVHJlZURpc2FibGVkIiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsT0FBT0Msa0JBQVAsTUFBK0IsMkJBQS9CO0FBQ0EsT0FBT0MsTUFBUCxNQUFtQixtQkFBbkI7QUFDQSxTQUFTQyxjQUFULEVBQXlCQyxhQUF6QixRQUE4QyxnQkFBOUM7QUFDQSxTQUFTQyxTQUFULFFBQTBCLGtDQUExQixDLENBRUE7O0FBQ0EsU0FBU0Msd0JBQVQsUUFBeUMsd0JBQXpDO0FBRUEsSUFBTUMsUUFBUSxHQUFHTCxNQUFNLENBQUNNLEdBQVYsbUJBQWQ7QUFRQSxJQUFNQyxNQUFNLEdBQUdQLE1BQU0sQ0FBQ0csU0FBUyxDQUFDSyxnQkFBWCxDQUFULHFCQUNDLFVBQUFDLEtBQUs7QUFBQSxTQUFLQSxLQUFLLENBQUNDLFFBQU4sR0FBaUIsS0FBakIsR0FBeUIsR0FBOUI7QUFBQSxDQUROLENBQVo7O0lBS3FCQyxrQzs7Ozs7Ozs7Ozs7Ozs7MkVBUUksWUFBTTtBQUFBLHdCQUMrQixNQUFLRixLQURwQztBQUFBLFVBQ25CRyxpQkFEbUIsZUFDbkJBLGlCQURtQjtBQUFBLFVBQ0FDLFFBREEsZUFDQUEsUUFEQTtBQUFBLFVBQ1VDLGdCQURWLGVBQ1VBLGdCQURWO0FBRTNCLGFBQU8sQ0FBQ1Ysd0JBQXdCLENBQUMsTUFBS0ssS0FBTixDQUF6QixJQUNKLENBQUNHLGlCQUFpQixDQUFDRyxJQURmLElBRUosQ0FBQyxDQUFDRCxnQkFBZ0IsQ0FBQ0QsUUFBRCxDQUFoQixDQUEyQkcsSUFBM0IsQ0FBZ0MsVUFBQUMsU0FBUztBQUFBLGVBQUlBLFNBQVMsQ0FBQ0osUUFBRCxDQUFiO0FBQUEsT0FBekMsQ0FGTDtBQUdELEs7Ozs7Ozs7U0FFREssTSxHQUFBLGtCQUFTO0FBQUEsdUJBQzRELEtBQUtULEtBRGpFO0FBQUEsUUFDQ1UsaUJBREQsZ0JBQ0NBLGlCQUREO0FBQUEsUUFDb0JDLGlCQURwQixnQkFDb0JBLGlCQURwQjtBQUFBLFFBQ3VDTixnQkFEdkMsZ0JBQ3VDQSxnQkFEdkM7QUFFUCxXQUNFLG9CQUFDLFFBQUQsUUFDRSxvQkFBQyxNQUFEO0FBQ0UsTUFBQSxJQUFJLEVBQUMsUUFEUDtBQUVFLE1BQUEsT0FBTyxFQUFFTSxpQkFGWDtBQUdFLE1BQUEsUUFBUSxFQUFFLEtBQUtDLG9CQUFMO0FBSFosT0FLRSxvQkFBQyxhQUFELE9BTEYsQ0FERixFQVFFLG9CQUFDLE1BQUQ7QUFDRSxNQUFBLElBQUksRUFBQyxRQURQO0FBRUUsTUFBQSxPQUFPLEVBQUVGLGlCQUZYO0FBR0UsTUFBQSxRQUFRLEVBQUUsQ0FBQ0wsZ0JBQUQsSUFBcUJWLHdCQUF3QixDQUFDLEtBQUtLLEtBQU47QUFIekQsT0FLRSxvQkFBQyxjQUFELE9BTEYsQ0FSRixDQURGO0FBa0JELEc7OztFQW5DNkRaLEtBQUssQ0FBQ3lCLGE7O1NBQWpEWCxrQztBQThDckJBLGtDQUFrQyxDQUFDWSxZQUFuQyxHQUFrRDtBQUNoRFQsRUFBQUEsZ0JBQWdCLEVBQUU7QUFEOEIsQ0FBbEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBJbW11dGFibGVQcm9wVHlwZXMgZnJvbSAncmVhY3QtaW1tdXRhYmxlLXByb3B0eXBlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCB7IEZhQ2hldnJvblJpZ2h0LCBGYUNoZXZyb25MZWZ0IH0gZnJvbSAncmVhY3QtaWNvbnMvZmEnO1xuaW1wb3J0IHsgUHJpbWl0aXZlIH0gZnJvbSAnQG9wdXNjYXBpdGEvb2MtY20tY29tbW9uLWxheW91dHMnO1xuXG4vLyBBcHAgaW1wb3J0c1xuaW1wb3J0IHsgaXNTZWxlY3RlZFRyZWVJdGVtUGFyZW50IH0gZnJvbSAnLi9oaWVyYXJjaHktdHJlZS51dGlscyc7XG5cbmNvbnN0IENvbnRyb2xzID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogZmxleDtcbiAgbWF4LXdpZHRoOiA1cmVtO1xuICBtaW4td2lkdGg6IDVyZW07XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuYDtcblxuY29uc3QgQnV0dG9uID0gc3R5bGVkKFByaW1pdGl2ZS5Cb3JkZXJsZXNzQnV0dG9uKWBcbiAgb3BhY2l0eTogJHtwcm9wcyA9PiAocHJvcHMuZGlzYWJsZWQgPyAnMC41JyA6ICcxJyl9O1xuICBmb250LXNpemU6IDI0cHg7XG5gO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIaWVyYXJjaHlUcmVlU2VsZWN0b3JBcnJvd0NvbnRyb2xzIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBJcyBcIm1vdmUgdG8gdHJlZVwiIGNhcmV0IGRpc2FibGVkLiBCdXR0b24gaXMgZGlzYWJsZWQsIGlmOlxuICAgKiAgLSBzZWxlY3RlZCB0cmVlIGl0ZW0gaXMgbm90IGEgcGFyZW50XG4gICAqICAtIG5vIGdyaWQgaXRlbXMgYXJlIHNlbGVjdGVkXG4gICAqICAtIGl0ZW0gYWxyZWFkeSBoYXMgcGFyZW50cyBhcyBhIGNoaWxkXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgaXNNb3ZlVG9UcmVlRGlzYWJsZWQgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBzZWxlY3RlZEdyaWRJdGVtcywgY2hpbGRLZXksIHNlbGVjdGVkVHJlZUl0ZW0gfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuICFpc1NlbGVjdGVkVHJlZUl0ZW1QYXJlbnQodGhpcy5wcm9wcylcbiAgICB8fCAhc2VsZWN0ZWRHcmlkSXRlbXMuc2l6ZVxuICAgIHx8ICEhc2VsZWN0ZWRUcmVlSXRlbVtjaGlsZEtleV0uZmluZChjaGlsZEl0ZW0gPT4gY2hpbGRJdGVtW2NoaWxkS2V5XSk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgb25Nb3ZlVG9HcmlkQ2xpY2ssIG9uTW92ZVRvVHJlZUNsaWNrLCBzZWxlY3RlZFRyZWVJdGVtIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8Q29udHJvbHM+XG4gICAgICAgIDxCdXR0b25cbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICBvbkNsaWNrPXtvbk1vdmVUb1RyZWVDbGlja31cbiAgICAgICAgICBkaXNhYmxlZD17dGhpcy5pc01vdmVUb1RyZWVEaXNhYmxlZCgpfVxuICAgICAgICA+XG4gICAgICAgICAgPEZhQ2hldnJvbkxlZnQgLz5cbiAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDxCdXR0b25cbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICBvbkNsaWNrPXtvbk1vdmVUb0dyaWRDbGlja31cbiAgICAgICAgICBkaXNhYmxlZD17IXNlbGVjdGVkVHJlZUl0ZW0gfHwgaXNTZWxlY3RlZFRyZWVJdGVtUGFyZW50KHRoaXMucHJvcHMpfVxuICAgICAgICA+XG4gICAgICAgICAgPEZhQ2hldnJvblJpZ2h0IC8+XG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgPC9Db250cm9scz5cbiAgICApO1xuICB9XG59XG5cbkhpZXJhcmNoeVRyZWVTZWxlY3RvckFycm93Q29udHJvbHMucHJvcFR5cGVzID0ge1xuICBzZWxlY3RlZFRyZWVJdGVtOiBQcm9wVHlwZXMuc2hhcGUoe30pLFxuICBjaGlsZEtleTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBzZWxlY3RlZEdyaWRJdGVtczogSW1tdXRhYmxlUHJvcFR5cGVzLmxpc3QuaXNSZXF1aXJlZCxcbiAgb25Nb3ZlVG9HcmlkQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG9uTW92ZVRvVHJlZUNsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuSGllcmFyY2h5VHJlZVNlbGVjdG9yQXJyb3dDb250cm9scy5kZWZhdWx0UHJvcHMgPSB7XG4gIHNlbGVjdGVkVHJlZUl0ZW06IG51bGwsXG59O1xuIl19