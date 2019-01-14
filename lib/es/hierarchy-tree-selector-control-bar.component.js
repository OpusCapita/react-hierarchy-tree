var _templateObject = _taggedTemplateLiteralLoose(['\n  margin: 0 ', ' 0 0;\n'], ['\n  margin: 0 ', ' 0 0;\n']),
    _templateObject2 = _taggedTemplateLiteralLoose(['\n  height: ', ';\n  display: flex;\n  align-items: center;\n'], ['\n  height: ', ';\n  display: flex;\n  align-items: center;\n']),
    _templateObject3 = _taggedTemplateLiteralLoose(['\n  margin-left: ', ';\n  min-width: 120px;\n'], ['\n  margin-left: ', ';\n  min-width: 120px;\n']),
    _templateObject4 = _taggedTemplateLiteralLoose(['\n  display: flex;\n  align-items: center;\n  margin-left: auto;\n  margin-right: 0;\n'], ['\n  display: flex;\n  align-items: center;\n  margin-left: auto;\n  margin-right: 0;\n']),
    _templateObject5 = _taggedTemplateLiteralLoose(['\n  min-width: 200px;\n'], ['\n  min-width: 200px;\n']);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

import React from 'react';
import PropTypes from 'prop-types';
import { Primitive } from '@opuscapita/oc-cm-common-layouts';
import styled from 'styled-components';
import uuid from 'uuid';

// App imports
import { isSelectedTreeItemParent, isSelectedTreeItemRoot } from './hierarchy-tree.utils';

var RenameLabel = styled.label(_templateObject, function (props) {
  return props.theme.halfGutterWidth;
});

var Container = styled.div(_templateObject2, function (props) {
  return props.height;
});

var Button = styled(Primitive.Button)(_templateObject3, function (props) {
  return props.theme.halfGutterWidth;
});

var Controls = styled.div(_templateObject4);

var RenameField = styled(Primitive.Input)(_templateObject5);

var HierarchyTreeSelectorControlBar = function (_React$PureComponent) {
  _inherits(HierarchyTreeSelectorControlBar, _React$PureComponent);

  function HierarchyTreeSelectorControlBar(props) {
    _classCallCheck(this, HierarchyTreeSelectorControlBar);

    var _this = _possibleConstructorReturn(this, _React$PureComponent.call(this, props));

    _this.onInputChange = function (e) {
      _this.setState({ value: e.target.value }, function () {
        _this.props.onInputChange(_this.state.value);
      });
    };

    _this.onAddButtonClick = function () {
      var _onAddNewClick;

      var _this$props = _this.props,
          onAddNewClick = _this$props.onAddNewClick,
          translations = _this$props.translations,
          idKey = _this$props.idKey,
          valueKey = _this$props.valueKey,
          childKey = _this$props.childKey;


      onAddNewClick((_onAddNewClick = {}, _onAddNewClick[idKey] = uuid(), _onAddNewClick[valueKey] = translations.defaultNewNode, _onAddNewClick[childKey] = [], _onAddNewClick), function () {
        setTimeout(function () {
          console.log('HERRE', _this.input);

          _this.input.select();
          _this.input.focus();
        }, 50);
      });
    };

    _this.onDeleteButtonClick = function () {
      var onDeleteClick = _this.props.onDeleteClick;

      onDeleteClick();
    };

    _this.onRenameFieldKeyDown = function (e) {
      if (e.keyCode === 13) _this.input.blur();
    };

    _this.isAddDisabled = function () {
      var _this$props2 = _this.props,
          selectedTreeItem = _this$props2.selectedTreeItem,
          childKey = _this$props2.childKey,
          singleRoot = _this$props2.singleRoot;

      // If only a single root is allowed, we can't add new items if no items are selected

      if (!selectedTreeItem) return singleRoot;
      return !isSelectedTreeItemParent(_this.props) || !!selectedTreeItem[childKey].find(function (childItem) {
        return !childItem[childKey];
      });
    };

    _this.isDeleteDisabled = function () {
      var singleRoot = _this.props.singleRoot;

      if (singleRoot && isSelectedTreeItemRoot(_this.props)) return true;
      return !isSelectedTreeItemParent(_this.props);
    };

    _this.state = {
      value: ''
    };
    return _this;
  }

  HierarchyTreeSelectorControlBar.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (this.props.selectedTreeItem !== nextProps.selectedTreeItem) {
      var inputValue = nextProps.selectedTreeItem && isSelectedTreeItemParent(nextProps) ? nextProps.selectedTreeItem[nextProps.valueKey] : '';
      this.setState({ value: inputValue });
    }
  };

  /**
   * Blur on enter key press
   * @param e
   */


  /**
   * Is add button disabled. Add button is disabled, if:
   * - selected tree node is a leaf
   * - contains leafs
   * @returns {boolean}
   */


  /**
   * Is delete button disabled. Delete button is disabled, if:
   * - single root is enabled and selected item is a root
   * - selected item is a leaf
   * @returns {boolean}
   */


  HierarchyTreeSelectorControlBar.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        translations = _props.translations,
        id = _props.id,
        height = _props.height;


    return React.createElement(
      Container,
      { height: height },
      React.createElement(
        Controls,
        null,
        React.createElement(
          RenameLabel,
          { htmlFor: id + '-node-name-input' },
          translations.rename
        ),
        React.createElement(RenameField, {
          onChange: this.onInputChange,
          id: id + '-node-name-input',
          value: this.state.value,
          disabled: !isSelectedTreeItemParent(this.props),
          ref: function ref(input) {
            _this2.input = input;
          },
          onKeyDown: this.onRenameFieldKeyDown
        }),
        React.createElement(
          Button,
          {
            onClick: this.onAddButtonClick,
            disabled: this.isAddDisabled(),
            type: 'button'
          },
          translations.add
        ),
        React.createElement(
          Button,
          {
            onClick: this.onDeleteButtonClick,
            disabled: this.isDeleteDisabled(),
            type: 'button'
          },
          translations.delete
        )
      )
    );
  };

  return HierarchyTreeSelectorControlBar;
}(React.PureComponent);

export { HierarchyTreeSelectorControlBar as default };


HierarchyTreeSelectorControlBar.defaultProps = {
  selectedTreeItem: null
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci1jb250cm9sLWJhci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiUHJpbWl0aXZlIiwic3R5bGVkIiwidXVpZCIsImlzU2VsZWN0ZWRUcmVlSXRlbVBhcmVudCIsImlzU2VsZWN0ZWRUcmVlSXRlbVJvb3QiLCJSZW5hbWVMYWJlbCIsImxhYmVsIiwicHJvcHMiLCJ0aGVtZSIsImhhbGZHdXR0ZXJXaWR0aCIsIkNvbnRhaW5lciIsImRpdiIsImhlaWdodCIsIkJ1dHRvbiIsIkNvbnRyb2xzIiwiUmVuYW1lRmllbGQiLCJJbnB1dCIsIkhpZXJhcmNoeVRyZWVTZWxlY3RvckNvbnRyb2xCYXIiLCJvbklucHV0Q2hhbmdlIiwiZSIsInNldFN0YXRlIiwidmFsdWUiLCJ0YXJnZXQiLCJzdGF0ZSIsIm9uQWRkQnV0dG9uQ2xpY2siLCJvbkFkZE5ld0NsaWNrIiwidHJhbnNsYXRpb25zIiwiaWRLZXkiLCJ2YWx1ZUtleSIsImNoaWxkS2V5IiwiZGVmYXVsdE5ld05vZGUiLCJzZXRUaW1lb3V0IiwiY29uc29sZSIsImxvZyIsImlucHV0Iiwic2VsZWN0IiwiZm9jdXMiLCJvbkRlbGV0ZUJ1dHRvbkNsaWNrIiwib25EZWxldGVDbGljayIsIm9uUmVuYW1lRmllbGRLZXlEb3duIiwia2V5Q29kZSIsImJsdXIiLCJpc0FkZERpc2FibGVkIiwic2VsZWN0ZWRUcmVlSXRlbSIsInNpbmdsZVJvb3QiLCJmaW5kIiwiY2hpbGRJdGVtIiwiaXNEZWxldGVEaXNhYmxlZCIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJuZXh0UHJvcHMiLCJpbnB1dFZhbHVlIiwicmVuZGVyIiwiaWQiLCJyZW5hbWUiLCJhZGQiLCJkZWxldGUiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU9BLEtBQVAsTUFBa0IsT0FB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N0IsS0FBTCxDQUFXRixLQUhwQjtBQUlFLG9CQUFVLENBQUNsQix5QkFBeUIsS0FBS0ksS0FBOUIsQ0FKYjtBQUtFLGVBQUssYUFBQzJCLEtBQUQsRUFBVztBQUNkLG1CQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDRCxXQVBIO0FBUUUscUJBQVcsS0FBS0s7QUFSbEIsVUFGRjtBQWFFO0FBQUMsZ0JBQUQ7QUFBQTtBQUNFLHFCQUFTLEtBQUtmLGdCQURoQjtBQUVFLHNCQUFVLEtBQUtrQixhQUFMLEVBRlo7QUFHRSxrQkFBSztBQUhQO0FBS0doQix1QkFBYTRCO0FBTGhCLFNBYkY7QUFvQkU7QUFBQyxnQkFBRDtBQUFBO0FBQ0UscUJBQVMsS0FBS2pCLG1CQURoQjtBQUVFLHNCQUFVLEtBQUtVLGdCQUFMLEVBRlo7QUFHRSxrQkFBSztBQUhQO0FBS0dyQix1QkFBYTZCO0FBTGhCO0FBcEJGO0FBREYsS0FERjtBQWdDRCxHOzs7RUF6SDBEekQsTUFBTTBELGE7O1NBQTlDdkMsK0I7OztBQTBJckJBLGdDQUFnQ3dDLFlBQWhDLEdBQStDO0FBQzdDZCxvQkFBa0I7QUFEMkIsQ0FBL0MiLCJmaWxlIjoiaGllcmFyY2h5LXRyZWUtc2VsZWN0b3ItY29udHJvbC1iYXIuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBQcmltaXRpdmUgfSBmcm9tICdAb3B1c2NhcGl0YS9vYy1jbS1jb21tb24tbGF5b3V0cyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCB1dWlkIGZyb20gJ3V1aWQnO1xuXG4vLyBBcHAgaW1wb3J0c1xuaW1wb3J0IHsgaXNTZWxlY3RlZFRyZWVJdGVtUGFyZW50LCBpc1NlbGVjdGVkVHJlZUl0ZW1Sb290IH0gZnJvbSAnLi9oaWVyYXJjaHktdHJlZS51dGlscyc7XG5cbmNvbnN0IFJlbmFtZUxhYmVsID0gc3R5bGVkLmxhYmVsYFxuICBtYXJnaW46IDAgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5oYWxmR3V0dGVyV2lkdGh9IDAgMDtcbmA7XG5cbmNvbnN0IENvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gIGhlaWdodDogJHtwcm9wcyA9PiBwcm9wcy5oZWlnaHR9O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuYDtcblxuY29uc3QgQnV0dG9uID0gc3R5bGVkKFByaW1pdGl2ZS5CdXR0b24pYFxuICBtYXJnaW4tbGVmdDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5oYWxmR3V0dGVyV2lkdGh9O1xuICBtaW4td2lkdGg6IDEyMHB4O1xuYDtcblxuY29uc3QgQ29udHJvbHMgPSBzdHlsZWQuZGl2YFxuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBtYXJnaW4tbGVmdDogYXV0bztcbiAgbWFyZ2luLXJpZ2h0OiAwO1xuYDtcblxuY29uc3QgUmVuYW1lRmllbGQgPSBzdHlsZWQoUHJpbWl0aXZlLklucHV0KWBcbiAgbWluLXdpZHRoOiAyMDBweDtcbmA7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIaWVyYXJjaHlUcmVlU2VsZWN0b3JDb250cm9sQmFyIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB2YWx1ZTogJycsXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0ZWRUcmVlSXRlbSAhPT0gbmV4dFByb3BzLnNlbGVjdGVkVHJlZUl0ZW0pIHtcbiAgICAgIGNvbnN0IGlucHV0VmFsdWUgPSBuZXh0UHJvcHMuc2VsZWN0ZWRUcmVlSXRlbSAmJlxuICAgICAgaXNTZWxlY3RlZFRyZWVJdGVtUGFyZW50KG5leHRQcm9wcykgP1xuICAgICAgICBuZXh0UHJvcHMuc2VsZWN0ZWRUcmVlSXRlbVtuZXh0UHJvcHMudmFsdWVLZXldIDogJyc7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgdmFsdWU6IGlucHV0VmFsdWUgfSk7XG4gICAgfVxuICB9XG5cbiAgb25JbnB1dENoYW5nZSA9IChlKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHZhbHVlOiBlLnRhcmdldC52YWx1ZSB9LCAoKSA9PiB7XG4gICAgICB0aGlzLnByb3BzLm9uSW5wdXRDaGFuZ2UodGhpcy5zdGF0ZS52YWx1ZSk7XG4gICAgfSk7XG4gIH07XG5cbiAgb25BZGRCdXR0b25DbGljayA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBvbkFkZE5ld0NsaWNrLCB0cmFuc2xhdGlvbnMsIGlkS2V5LCB2YWx1ZUtleSwgY2hpbGRLZXksXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBvbkFkZE5ld0NsaWNrKHtcbiAgICAgIFtpZEtleV06IHV1aWQoKSxcbiAgICAgIFt2YWx1ZUtleV06IHRyYW5zbGF0aW9ucy5kZWZhdWx0TmV3Tm9kZSxcbiAgICAgIFtjaGlsZEtleV06IFtdLFxuICAgIH0sICgpID0+IHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnSEVSUkUnLCB0aGlzLmlucHV0KVxuXG4gICAgICAgIHRoaXMuaW5wdXQuc2VsZWN0KCk7XG4gICAgICAgIHRoaXMuaW5wdXQuZm9jdXMoKTtcbiAgICAgIH0sIDUwKTtcbiAgICB9KTtcbiAgfTtcblxuICBvbkRlbGV0ZUJ1dHRvbkNsaWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgb25EZWxldGVDbGljayB9ID0gdGhpcy5wcm9wcztcbiAgICBvbkRlbGV0ZUNsaWNrKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEJsdXIgb24gZW50ZXIga2V5IHByZXNzXG4gICAqIEBwYXJhbSBlXG4gICAqL1xuICBvblJlbmFtZUZpZWxkS2V5RG93biA9IChlKSA9PiB7XG4gICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHRoaXMuaW5wdXQuYmx1cigpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBJcyBhZGQgYnV0dG9uIGRpc2FibGVkLiBBZGQgYnV0dG9uIGlzIGRpc2FibGVkLCBpZjpcbiAgICogLSBzZWxlY3RlZCB0cmVlIG5vZGUgaXMgYSBsZWFmXG4gICAqIC0gY29udGFpbnMgbGVhZnNcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBpc0FkZERpc2FibGVkID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIHNlbGVjdGVkVHJlZUl0ZW0sIGNoaWxkS2V5LCBzaW5nbGVSb290LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgLy8gSWYgb25seSBhIHNpbmdsZSByb290IGlzIGFsbG93ZWQsIHdlIGNhbid0IGFkZCBuZXcgaXRlbXMgaWYgbm8gaXRlbXMgYXJlIHNlbGVjdGVkXG4gICAgaWYgKCFzZWxlY3RlZFRyZWVJdGVtKSByZXR1cm4gc2luZ2xlUm9vdDtcbiAgICByZXR1cm4gIWlzU2VsZWN0ZWRUcmVlSXRlbVBhcmVudCh0aGlzLnByb3BzKSB8fFxuICAgICAgISFzZWxlY3RlZFRyZWVJdGVtW2NoaWxkS2V5XS5maW5kKGNoaWxkSXRlbSA9PiAhY2hpbGRJdGVtW2NoaWxkS2V5XSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIElzIGRlbGV0ZSBidXR0b24gZGlzYWJsZWQuIERlbGV0ZSBidXR0b24gaXMgZGlzYWJsZWQsIGlmOlxuICAgKiAtIHNpbmdsZSByb290IGlzIGVuYWJsZWQgYW5kIHNlbGVjdGVkIGl0ZW0gaXMgYSByb290XG4gICAqIC0gc2VsZWN0ZWQgaXRlbSBpcyBhIGxlYWZcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBpc0RlbGV0ZURpc2FibGVkID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgc2luZ2xlUm9vdCB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoc2luZ2xlUm9vdCAmJiBpc1NlbGVjdGVkVHJlZUl0ZW1Sb290KHRoaXMucHJvcHMpKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gIWlzU2VsZWN0ZWRUcmVlSXRlbVBhcmVudCh0aGlzLnByb3BzKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgdHJhbnNsYXRpb25zLCBpZCwgaGVpZ2h0LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxDb250YWluZXIgaGVpZ2h0PXtoZWlnaHR9PlxuICAgICAgICA8Q29udHJvbHM+XG4gICAgICAgICAgPFJlbmFtZUxhYmVsIGh0bWxGb3I9e2Ake2lkfS1ub2RlLW5hbWUtaW5wdXRgfT57dHJhbnNsYXRpb25zLnJlbmFtZX08L1JlbmFtZUxhYmVsPlxuICAgICAgICAgIDxSZW5hbWVGaWVsZFxuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25JbnB1dENoYW5nZX1cbiAgICAgICAgICAgIGlkPXtgJHtpZH0tbm9kZS1uYW1lLWlucHV0YH1cbiAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnZhbHVlfVxuICAgICAgICAgICAgZGlzYWJsZWQ9eyFpc1NlbGVjdGVkVHJlZUl0ZW1QYXJlbnQodGhpcy5wcm9wcyl9XG4gICAgICAgICAgICByZWY9eyhpbnB1dCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLm9uUmVuYW1lRmllbGRLZXlEb3dufVxuICAgICAgICAgIC8+XG5cbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQWRkQnV0dG9uQ2xpY2t9XG4gICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5pc0FkZERpc2FibGVkKCl9XG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICB7dHJhbnNsYXRpb25zLmFkZH1cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uRGVsZXRlQnV0dG9uQ2xpY2t9XG4gICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5pc0RlbGV0ZURpc2FibGVkKCl9XG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICB7dHJhbnNsYXRpb25zLmRlbGV0ZX1cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgPC9Db250cm9scz5cbiAgICAgIDwvQ29udGFpbmVyPlxuICAgICk7XG4gIH1cbn1cblxuSGllcmFyY2h5VHJlZVNlbGVjdG9yQ29udHJvbEJhci5wcm9wVHlwZXMgPSB7XG4gIG9uQWRkTmV3Q2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG9uRGVsZXRlQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG9uSW5wdXRDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGlkS2V5OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIHZhbHVlS2V5OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIGNoaWxkS2V5OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIHRyYW5zbGF0aW9uczogUHJvcFR5cGVzLnNoYXBlKHt9KS5pc1JlcXVpcmVkLFxuICBzZWxlY3RlZFRyZWVJdGVtOiBQcm9wVHlwZXMuc2hhcGUoe30pLFxuICBpZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBoZWlnaHQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgc2luZ2xlUm9vdDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbn07XG5cbkhpZXJhcmNoeVRyZWVTZWxlY3RvckNvbnRyb2xCYXIuZGVmYXVsdFByb3BzID0ge1xuICBzZWxlY3RlZFRyZWVJdGVtOiBudWxsLFxufTtcblxuIl19