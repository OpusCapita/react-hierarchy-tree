var _templateObject = _taggedTemplateLiteralLoose(['\n  display: flex;\n  max-width: 5rem;\n  flex-direction: column;\n  justify-content: center;\n'], ['\n  display: flex;\n  max-width: 5rem;\n  flex-direction: column;\n  justify-content: center;\n']);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';
import { isSelectedTreeItemParent } from './hierarchy-tree.utils';
// App imports
import Arrow from './hierarchy-tree-selector-arrow.component';

var Controls = styled.div(_templateObject);

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
      React.createElement(Arrow, {
        icon: 'CaretLeft',
        onClick: onMoveToTreeClick,
        disabled: this.isMoveToTreeDisabled()
      }),
      React.createElement(Arrow, {
        icon: 'CaretRight',
        onClick: onMoveToGridClick,
        disabled: !selectedTreeItem || isSelectedTreeItemParent(this.props)
      })
    );
  };

  return HierarchyTreeSelectorArrowControls;
}(React.PureComponent);

export { HierarchyTreeSelectorArrowControls as default };


HierarchyTreeSelectorArrowControls.defaultProps = {
  selectedTreeItem: null
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci1hcnJvdy1jb250cm9scy5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiSW1tdXRhYmxlUHJvcFR5cGVzIiwic3R5bGVkIiwiaXNTZWxlY3RlZFRyZWVJdGVtUGFyZW50IiwiQXJyb3ciLCJDb250cm9scyIsImRpdiIsIkhpZXJhcmNoeVRyZWVTZWxlY3RvckFycm93Q29udHJvbHMiLCJpc01vdmVUb1RyZWVEaXNhYmxlZCIsInByb3BzIiwic2VsZWN0ZWRHcmlkSXRlbXMiLCJjaGlsZEtleSIsInNlbGVjdGVkVHJlZUl0ZW0iLCJzaXplIiwiZmluZCIsImNoaWxkSXRlbSIsInJlbmRlciIsIm9uTW92ZVRvR3JpZENsaWNrIiwib25Nb3ZlVG9UcmVlQ2xpY2siLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxPQUFPQyxrQkFBUCxNQUErQiwyQkFBL0I7QUFDQSxPQUFPQyxNQUFQLE1BQW1CLG1CQUFuQjtBQUNBLFNBQVFDLHdCQUFSLFFBQXVDLHdCQUF2QztBQUNBO0FBQ0EsT0FBT0MsS0FBUCxNQUFrQiwyQ0FBbEI7O0FBRUEsSUFBTUMsV0FBV0gsT0FBT0ksR0FBbEIsaUJBQU47O0lBTXFCQyxrQzs7Ozs7Ozs7Ozs7O2dLQVVuQkMsb0IsR0FBdUIsWUFBTTtBQUFBLHdCQUMrQixNQUFLQyxLQURwQztBQUFBLFVBQ25CQyxpQkFEbUIsZUFDbkJBLGlCQURtQjtBQUFBLFVBQ0FDLFFBREEsZUFDQUEsUUFEQTtBQUFBLFVBQ1VDLGdCQURWLGVBQ1VBLGdCQURWOztBQUUzQixhQUFPLENBQUNULHlCQUF5QixNQUFLTSxLQUE5QixDQUFELElBQ0wsQ0FBQ0Msa0JBQWtCRyxJQURkLElBRUwsQ0FBQyxDQUFDRCxpQkFBaUJELFFBQWpCLEVBQTJCRyxJQUEzQixDQUFnQztBQUFBLGVBQWFDLFVBQVVKLFFBQVYsQ0FBYjtBQUFBLE9BQWhDLENBRko7QUFHRCxLOzs7QUFaRDs7Ozs7Ozs7OytDQWNBSyxNLHFCQUFTO0FBQUEsaUJBQzRELEtBQUtQLEtBRGpFO0FBQUEsUUFDQ1EsaUJBREQsVUFDQ0EsaUJBREQ7QUFBQSxRQUNvQkMsaUJBRHBCLFVBQ29CQSxpQkFEcEI7QUFBQSxRQUN1Q04sZ0JBRHZDLFVBQ3VDQSxnQkFEdkM7O0FBRVAsV0FDRTtBQUFDLGNBQUQ7QUFBQTtBQUNFLDBCQUFDLEtBQUQ7QUFDRSxjQUFLLFdBRFA7QUFFRSxpQkFBU00saUJBRlg7QUFHRSxrQkFBVSxLQUFLVixvQkFBTDtBQUhaLFFBREY7QUFNRSwwQkFBQyxLQUFEO0FBQ0UsY0FBSyxZQURQO0FBRUUsaUJBQVNTLGlCQUZYO0FBR0Usa0JBQVUsQ0FBQ0wsZ0JBQUQsSUFBcUJULHlCQUF5QixLQUFLTSxLQUE5QjtBQUhqQztBQU5GLEtBREY7QUFjRCxHOzs7RUFqQzZEVixNQUFNb0IsYTs7U0FBakRaLGtDOzs7QUE0Q3JCQSxtQ0FBbUNhLFlBQW5DLEdBQWtEO0FBQ2hEUixvQkFBa0I7QUFEOEIsQ0FBbEQiLCJmaWxlIjoiaGllcmFyY2h5LXRyZWUtc2VsZWN0b3ItYXJyb3ctY29udHJvbHMuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgSW1tdXRhYmxlUHJvcFR5cGVzIGZyb20gJ3JlYWN0LWltbXV0YWJsZS1wcm9wdHlwZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQge2lzU2VsZWN0ZWRUcmVlSXRlbVBhcmVudH0gZnJvbSAnLi9oaWVyYXJjaHktdHJlZS51dGlscyc7XG4vLyBBcHAgaW1wb3J0c1xuaW1wb3J0IEFycm93IGZyb20gJy4vaGllcmFyY2h5LXRyZWUtc2VsZWN0b3ItYXJyb3cuY29tcG9uZW50JztcblxuY29uc3QgQ29udHJvbHMgPSBzdHlsZWQuZGl2YFxuICBkaXNwbGF5OiBmbGV4O1xuICBtYXgtd2lkdGg6IDVyZW07XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuYDtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhpZXJhcmNoeVRyZWVTZWxlY3RvckFycm93Q29udHJvbHMgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcblxuXG4gIC8qKlxuICAgKiBJcyBcIm1vdmUgdG8gdHJlZVwiIGNhcmV0IGRpc2FibGVkLiBCdXR0b24gaXMgZGlzYWJsZWQsIGlmOlxuICAgKiAgLSBzZWxlY3RlZCB0cmVlIGl0ZW0gaXMgbm90IGEgcGFyZW50XG4gICAqICAtIG5vIGdyaWQgaXRlbXMgYXJlIHNlbGVjdGVkXG4gICAqICAtIGl0ZW0gYWxyZWFkeSBoYXMgcGFyZW50cyBhcyBhIGNoaWxkXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgaXNNb3ZlVG9UcmVlRGlzYWJsZWQgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBzZWxlY3RlZEdyaWRJdGVtcywgY2hpbGRLZXksIHNlbGVjdGVkVHJlZUl0ZW0gfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuICFpc1NlbGVjdGVkVHJlZUl0ZW1QYXJlbnQodGhpcy5wcm9wcykgfHxcbiAgICAgICFzZWxlY3RlZEdyaWRJdGVtcy5zaXplIHx8XG4gICAgICAhIXNlbGVjdGVkVHJlZUl0ZW1bY2hpbGRLZXldLmZpbmQoY2hpbGRJdGVtID0+IGNoaWxkSXRlbVtjaGlsZEtleV0pO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IG9uTW92ZVRvR3JpZENsaWNrLCBvbk1vdmVUb1RyZWVDbGljaywgc2VsZWN0ZWRUcmVlSXRlbSB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPENvbnRyb2xzPlxuICAgICAgICA8QXJyb3dcbiAgICAgICAgICBpY29uPVwiQ2FyZXRMZWZ0XCJcbiAgICAgICAgICBvbkNsaWNrPXtvbk1vdmVUb1RyZWVDbGlja31cbiAgICAgICAgICBkaXNhYmxlZD17dGhpcy5pc01vdmVUb1RyZWVEaXNhYmxlZCgpfVxuICAgICAgICAvPlxuICAgICAgICA8QXJyb3dcbiAgICAgICAgICBpY29uPVwiQ2FyZXRSaWdodFwiXG4gICAgICAgICAgb25DbGljaz17b25Nb3ZlVG9HcmlkQ2xpY2t9XG4gICAgICAgICAgZGlzYWJsZWQ9eyFzZWxlY3RlZFRyZWVJdGVtIHx8IGlzU2VsZWN0ZWRUcmVlSXRlbVBhcmVudCh0aGlzLnByb3BzKX1cbiAgICAgICAgLz5cbiAgICAgIDwvQ29udHJvbHM+XG4gICAgKTtcbiAgfVxufVxuXG5IaWVyYXJjaHlUcmVlU2VsZWN0b3JBcnJvd0NvbnRyb2xzLnByb3BUeXBlcyA9IHtcbiAgc2VsZWN0ZWRUcmVlSXRlbTogUHJvcFR5cGVzLnNoYXBlKHt9KSxcbiAgY2hpbGRLZXk6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgc2VsZWN0ZWRHcmlkSXRlbXM6IEltbXV0YWJsZVByb3BUeXBlcy5saXN0LmlzUmVxdWlyZWQsXG4gIG9uTW92ZVRvR3JpZENsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBvbk1vdmVUb1RyZWVDbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbkhpZXJhcmNoeVRyZWVTZWxlY3RvckFycm93Q29udHJvbHMuZGVmYXVsdFByb3BzID0ge1xuICBzZWxlY3RlZFRyZWVJdGVtOiBudWxsLFxufTtcblxuIl19