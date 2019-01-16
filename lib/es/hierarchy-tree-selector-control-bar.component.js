var _templateObject = _taggedTemplateLiteralLoose(['\n  margin: 0 ', ' 0 0;\n  white-space: nowrap;\n'], ['\n  margin: 0 ', ' 0 0;\n  white-space: nowrap;\n']),
    _templateObject2 = _taggedTemplateLiteralLoose(['\n  height: ', ';\n  display: flex;\n  align-items: center;\n'], ['\n  height: ', ';\n  display: flex;\n  align-items: center;\n']),
    _templateObject3 = _taggedTemplateLiteralLoose(['\n  margin-left: ', ';\n  min-width: 120px;\n'], ['\n  margin-left: ', ';\n  min-width: 120px;\n']),
    _templateObject4 = _taggedTemplateLiteralLoose(['\n  display: flex;\n  align-items: center;\n  margin-left: auto;\n  margin-right: 0;\n'], ['\n  display: flex;\n  align-items: center;\n  margin-left: auto;\n  margin-right: 0;\n']),
    _templateObject5 = _taggedTemplateLiteralLoose(['\n  min-width: 200px;\n  margin-right: 4rem;\n'], ['\n  min-width: 200px;\n  margin-right: 4rem;\n']);

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

      if (!_this.props.selectedTreeItem) return true;
      return !!(singleRoot && isSelectedTreeItemRoot(_this.props));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci1jb250cm9sLWJhci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiUHJpbWl0aXZlIiwic3R5bGVkIiwidXVpZCIsImlzU2VsZWN0ZWRUcmVlSXRlbVBhcmVudCIsImlzU2VsZWN0ZWRUcmVlSXRlbVJvb3QiLCJSZW5hbWVMYWJlbCIsImxhYmVsIiwicHJvcHMiLCJ0aGVtZSIsImhhbGZHdXR0ZXJXaWR0aCIsIkNvbnRhaW5lciIsImRpdiIsImhlaWdodCIsIkJ1dHRvbiIsIkNvbnRyb2xzIiwiUmVuYW1lRmllbGQiLCJJbnB1dCIsIkhpZXJhcmNoeVRyZWVTZWxlY3RvckNvbnRyb2xCYXIiLCJvbklucHV0Q2hhbmdlIiwiZSIsInNldFN0YXRlIiwidmFsdWUiLCJ0YXJnZXQiLCJzdGF0ZSIsIm9uQWRkQnV0dG9uQ2xpY2siLCJvbkFkZE5ld0NsaWNrIiwidHJhbnNsYXRpb25zIiwiaWRLZXkiLCJ2YWx1ZUtleSIsImNoaWxkS2V5IiwiZGVmYXVsdE5ld05vZGUiLCJzZXRUaW1lb3V0IiwiY29uc29sZSIsImxvZyIsImlucHV0Iiwic2VsZWN0IiwiZm9jdXMiLCJvbkRlbGV0ZUJ1dHRvbkNsaWNrIiwib25EZWxldGVDbGljayIsIm9uUmVuYW1lRmllbGRLZXlEb3duIiwia2V5Q29kZSIsImJsdXIiLCJpc0FkZERpc2FibGVkIiwic2VsZWN0ZWRUcmVlSXRlbSIsInNpbmdsZVJvb3QiLCJmaW5kIiwiY2hpbGRJdGVtIiwiaXNEZWxldGVEaXNhYmxlZCIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJuZXh0UHJvcHMiLCJpbnB1dFZhbHVlIiwicmVuZGVyIiwiaWQiLCJyZW5hbWUiLCJhZGQiLCJkZWxldGUiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU9BLEtBQVAsTUFBa0IsT0FB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O0FBR0UsaUJBQU8sS0FBSzdCLEtBQUwsQ0FBV0YsS0FIcEI7QUFJRSxvQkFBVSxDQUFDbEIseUJBQXlCLEtBQUtJLEtBQTlCLENBSmI7QUFLRSxlQUFLLGFBQUMyQixLQUFELEVBQVc7QUFDZCxtQkFBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0QsV0FQSDtBQVFFLHFCQUFXLEtBQUtLO0FBUmxCLFVBRkY7QUFhRTtBQUFDLGdCQUFEO0FBQUE7QUFDRSxxQkFBUyxLQUFLZixnQkFEaEI7QUFFRSxzQkFBVSxLQUFLa0IsYUFBTCxFQUZaO0FBR0Usa0JBQUs7QUFIUDtBQUtHaEIsdUJBQWE0QjtBQUxoQixTQWJGO0FBb0JFO0FBQUMsZ0JBQUQ7QUFBQTtBQUNFLHFCQUFTLEtBQUtqQixtQkFEaEI7QUFFRSxzQkFBVSxLQUFLVSxnQkFBTCxFQUZaO0FBR0Usa0JBQUs7QUFIUDtBQUtHckIsdUJBQWE2QjtBQUxoQjtBQXBCRjtBQURGLEtBREY7QUFnQ0QsRzs7O0VBekgwRHpELE1BQU0wRCxhOztTQUE5Q3ZDLCtCOzs7QUEwSXJCQSxnQ0FBZ0N3QyxZQUFoQyxHQUErQztBQUM3Q2Qsb0JBQWtCO0FBRDJCLENBQS9DIiwiZmlsZSI6ImhpZXJhcmNoeS10cmVlLXNlbGVjdG9yLWNvbnRyb2wtYmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgUHJpbWl0aXZlIH0gZnJvbSAnQG9wdXNjYXBpdGEvb2MtY20tY29tbW9uLWxheW91dHMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgdXVpZCBmcm9tICd1dWlkJztcblxuLy8gQXBwIGltcG9ydHNcbmltcG9ydCB7IGlzU2VsZWN0ZWRUcmVlSXRlbVBhcmVudCwgaXNTZWxlY3RlZFRyZWVJdGVtUm9vdCB9IGZyb20gJy4vaGllcmFyY2h5LXRyZWUudXRpbHMnO1xuXG5jb25zdCBSZW5hbWVMYWJlbCA9IHN0eWxlZC5sYWJlbGBcbiAgbWFyZ2luOiAwICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuaGFsZkd1dHRlcldpZHRofSAwIDA7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG5gO1xuXG5jb25zdCBDb250YWluZXIgPSBzdHlsZWQuZGl2YFxuICBoZWlnaHQ6ICR7cHJvcHMgPT4gcHJvcHMuaGVpZ2h0fTtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbmA7XG5cbmNvbnN0IEJ1dHRvbiA9IHN0eWxlZChQcmltaXRpdmUuQnV0dG9uKWBcbiAgbWFyZ2luLWxlZnQ6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuaGFsZkd1dHRlcldpZHRofTtcbiAgbWluLXdpZHRoOiAxMjBweDtcbmA7XG5cbmNvbnN0IENvbnRyb2xzID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gIG1hcmdpbi1yaWdodDogMDtcbmA7XG5cbmNvbnN0IFJlbmFtZUZpZWxkID0gc3R5bGVkKFByaW1pdGl2ZS5JbnB1dClgXG4gIG1pbi13aWR0aDogMjAwcHg7XG4gIG1hcmdpbi1yaWdodDogNHJlbTtcbmA7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIaWVyYXJjaHlUcmVlU2VsZWN0b3JDb250cm9sQmFyIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB2YWx1ZTogJycsXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0ZWRUcmVlSXRlbSAhPT0gbmV4dFByb3BzLnNlbGVjdGVkVHJlZUl0ZW0pIHtcbiAgICAgIGNvbnN0IGlucHV0VmFsdWUgPSBuZXh0UHJvcHMuc2VsZWN0ZWRUcmVlSXRlbSAmJlxuICAgICAgaXNTZWxlY3RlZFRyZWVJdGVtUGFyZW50KG5leHRQcm9wcykgP1xuICAgICAgICBuZXh0UHJvcHMuc2VsZWN0ZWRUcmVlSXRlbVtuZXh0UHJvcHMudmFsdWVLZXldIDogJyc7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgdmFsdWU6IGlucHV0VmFsdWUgfSk7XG4gICAgfVxuICB9XG5cbiAgb25JbnB1dENoYW5nZSA9IChlKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHZhbHVlOiBlLnRhcmdldC52YWx1ZSB9LCAoKSA9PiB7XG4gICAgICB0aGlzLnByb3BzLm9uSW5wdXRDaGFuZ2UodGhpcy5zdGF0ZS52YWx1ZSk7XG4gICAgfSk7XG4gIH07XG5cbiAgb25BZGRCdXR0b25DbGljayA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBvbkFkZE5ld0NsaWNrLCB0cmFuc2xhdGlvbnMsIGlkS2V5LCB2YWx1ZUtleSwgY2hpbGRLZXksXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBvbkFkZE5ld0NsaWNrKHtcbiAgICAgIFtpZEtleV06IHV1aWQoKSxcbiAgICAgIFt2YWx1ZUtleV06IHRyYW5zbGF0aW9ucy5kZWZhdWx0TmV3Tm9kZSxcbiAgICAgIFtjaGlsZEtleV06IFtdLFxuICAgIH0sICgpID0+IHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnSEVSUkUnLCB0aGlzLmlucHV0KVxuXG4gICAgICAgIHRoaXMuaW5wdXQuc2VsZWN0KCk7XG4gICAgICAgIHRoaXMuaW5wdXQuZm9jdXMoKTtcbiAgICAgIH0sIDUwKTtcbiAgICB9KTtcbiAgfTtcblxuICBvbkRlbGV0ZUJ1dHRvbkNsaWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgb25EZWxldGVDbGljayB9ID0gdGhpcy5wcm9wcztcbiAgICBvbkRlbGV0ZUNsaWNrKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEJsdXIgb24gZW50ZXIga2V5IHByZXNzXG4gICAqIEBwYXJhbSBlXG4gICAqL1xuICBvblJlbmFtZUZpZWxkS2V5RG93biA9IChlKSA9PiB7XG4gICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHRoaXMuaW5wdXQuYmx1cigpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBJcyBhZGQgYnV0dG9uIGRpc2FibGVkLiBBZGQgYnV0dG9uIGlzIGRpc2FibGVkLCBpZjpcbiAgICogLSBzZWxlY3RlZCB0cmVlIG5vZGUgaXMgYSBsZWFmXG4gICAqIC0gY29udGFpbnMgbGVhZnNcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBpc0FkZERpc2FibGVkID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIHNlbGVjdGVkVHJlZUl0ZW0sIGNoaWxkS2V5LCBzaW5nbGVSb290LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgLy8gSWYgb25seSBhIHNpbmdsZSByb290IGlzIGFsbG93ZWQsIHdlIGNhbid0IGFkZCBuZXcgaXRlbXMgaWYgbm8gaXRlbXMgYXJlIHNlbGVjdGVkXG4gICAgaWYgKCFzZWxlY3RlZFRyZWVJdGVtKSByZXR1cm4gc2luZ2xlUm9vdDtcbiAgICByZXR1cm4gIWlzU2VsZWN0ZWRUcmVlSXRlbVBhcmVudCh0aGlzLnByb3BzKSB8fFxuICAgICAgISFzZWxlY3RlZFRyZWVJdGVtW2NoaWxkS2V5XS5maW5kKGNoaWxkSXRlbSA9PiAhY2hpbGRJdGVtW2NoaWxkS2V5XSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIElzIGRlbGV0ZSBidXR0b24gZGlzYWJsZWQuIERlbGV0ZSBidXR0b24gaXMgZGlzYWJsZWQsIGlmOlxuICAgKiAtIHNpbmdsZSByb290IGlzIGVuYWJsZWQgYW5kIHNlbGVjdGVkIGl0ZW0gaXMgYSByb290XG4gICAqIC0gc2VsZWN0ZWQgaXRlbSBpcyBhIGxlYWZcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBpc0RlbGV0ZURpc2FibGVkID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgc2luZ2xlUm9vdCB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIXRoaXMucHJvcHMuc2VsZWN0ZWRUcmVlSXRlbSkgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuICEhKHNpbmdsZVJvb3QgJiYgaXNTZWxlY3RlZFRyZWVJdGVtUm9vdCh0aGlzLnByb3BzKSk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHRyYW5zbGF0aW9ucywgaWQsIGhlaWdodCxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiAoXG4gICAgICA8Q29udGFpbmVyIGhlaWdodD17aGVpZ2h0fT5cbiAgICAgICAgPENvbnRyb2xzPlxuICAgICAgICAgIDxSZW5hbWVMYWJlbCBodG1sRm9yPXtgJHtpZH0tbm9kZS1uYW1lLWlucHV0YH0+e3RyYW5zbGF0aW9ucy5yZW5hbWV9PC9SZW5hbWVMYWJlbD5cbiAgICAgICAgICA8UmVuYW1lRmllbGRcbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uSW5wdXRDaGFuZ2V9XG4gICAgICAgICAgICBpZD17YCR7aWR9LW5vZGUtbmFtZS1pbnB1dGB9XG4gICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX1cbiAgICAgICAgICAgIGRpc2FibGVkPXshaXNTZWxlY3RlZFRyZWVJdGVtUGFyZW50KHRoaXMucHJvcHMpfVxuICAgICAgICAgICAgcmVmPXsoaW5wdXQpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5pbnB1dCA9IGlucHV0O1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5vblJlbmFtZUZpZWxkS2V5RG93bn1cbiAgICAgICAgICAvPlxuXG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkFkZEJ1dHRvbkNsaWNrfVxuICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuaXNBZGREaXNhYmxlZCgpfVxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAge3RyYW5zbGF0aW9ucy5hZGR9XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkRlbGV0ZUJ1dHRvbkNsaWNrfVxuICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuaXNEZWxldGVEaXNhYmxlZCgpfVxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAge3RyYW5zbGF0aW9ucy5kZWxldGV9XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDwvQ29udHJvbHM+XG4gICAgICA8L0NvbnRhaW5lcj5cbiAgICApO1xuICB9XG59XG5cbkhpZXJhcmNoeVRyZWVTZWxlY3RvckNvbnRyb2xCYXIucHJvcFR5cGVzID0ge1xuICBvbkFkZE5ld0NsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBvbkRlbGV0ZUNsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBvbklucHV0Q2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBpZEtleTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICB2YWx1ZUtleTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBjaGlsZEtleTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICB0cmFuc2xhdGlvbnM6IFByb3BUeXBlcy5zaGFwZSh7fSkuaXNSZXF1aXJlZCxcbiAgc2VsZWN0ZWRUcmVlSXRlbTogUHJvcFR5cGVzLnNoYXBlKHt9KSxcbiAgaWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgaGVpZ2h0OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIHNpbmdsZVJvb3Q6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG59O1xuXG5IaWVyYXJjaHlUcmVlU2VsZWN0b3JDb250cm9sQmFyLmRlZmF1bHRQcm9wcyA9IHtcbiAgc2VsZWN0ZWRUcmVlSXRlbTogbnVsbCxcbn07XG5cbiJdfQ==