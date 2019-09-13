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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci1jb250cm9sLWJhci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiUHJpbWl0aXZlIiwic3R5bGVkIiwidXVpZCIsImlzU2VsZWN0ZWRUcmVlSXRlbVBhcmVudCIsImlzU2VsZWN0ZWRUcmVlSXRlbVJvb3QiLCJSZW5hbWVMYWJlbCIsImxhYmVsIiwicHJvcHMiLCJ0aGVtZSIsImhhbGZHdXR0ZXJXaWR0aCIsIkNvbnRhaW5lciIsImRpdiIsImhlaWdodCIsIkJ1dHRvbiIsIkNvbnRyb2xzIiwiUmVuYW1lRmllbGQiLCJJbnB1dCIsIkhpZXJhcmNoeVRyZWVTZWxlY3RvckNvbnRyb2xCYXIiLCJvbklucHV0Q2hhbmdlIiwiZSIsInNldFN0YXRlIiwidmFsdWUiLCJ0YXJnZXQiLCJzdGF0ZSIsIm9uQWRkQnV0dG9uQ2xpY2siLCJvbkFkZE5ld0NsaWNrIiwidHJhbnNsYXRpb25zIiwiaWRLZXkiLCJ2YWx1ZUtleSIsImNoaWxkS2V5IiwiZGVmYXVsdE5ld05vZGUiLCJzZXRUaW1lb3V0IiwiaW5wdXQiLCJzZWxlY3QiLCJmb2N1cyIsIm9uRGVsZXRlQnV0dG9uQ2xpY2siLCJvbkRlbGV0ZUNsaWNrIiwib25SZW5hbWVGaWVsZEtleURvd24iLCJrZXlDb2RlIiwiYmx1ciIsImlzQWRkRGlzYWJsZWQiLCJzZWxlY3RlZFRyZWVJdGVtIiwic2luZ2xlUm9vdCIsImZpbmQiLCJjaGlsZEl0ZW0iLCJpc0RlbGV0ZURpc2FibGVkIiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsIm5leHRQcm9wcyIsImlucHV0VmFsdWUiLCJyZW5kZXIiLCJpZCIsInJlbmFtZSIsImFkZCIsImRlbGV0ZSIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNB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SSxLQUE5QixDQUpiO0FBS0UsZUFBSyxhQUFDeUIsS0FBRCxFQUFXO0FBQ2QsbUJBQUtBLEtBQUwsR0FBYUEsS0FBYjtBQUNELFdBUEg7QUFRRSxxQkFBVyxLQUFLSztBQVJsQixVQUZGO0FBYUU7QUFBQyxnQkFBRDtBQUFBO0FBQ0UscUJBQVMsS0FBS2IsZ0JBRGhCO0FBRUUsc0JBQVUsS0FBS2dCLGFBQUwsRUFGWjtBQUdFLGtCQUFLO0FBSFA7QUFLR2QsdUJBQWEwQjtBQUxoQixTQWJGO0FBb0JFO0FBQUMsZ0JBQUQ7QUFBQTtBQUNFLHFCQUFTLEtBQUtqQixtQkFEaEI7QUFFRSxzQkFBVSxLQUFLVSxnQkFBTCxFQUZaO0FBR0Usa0JBQUs7QUFIUDtBQUtHbkIsdUJBQWEyQjtBQUxoQjtBQXBCRjtBQURGLEtBREY7QUFnQ0QsRzs7O0VBdkgwRHZELE1BQU13RCxhOztTQUE5Q3JDLCtCOzs7QUF3SXJCQSxnQ0FBZ0NzQyxZQUFoQyxHQUErQztBQUM3Q2Qsb0JBQWtCO0FBRDJCLENBQS9DIiwiZmlsZSI6ImhpZXJhcmNoeS10cmVlLXNlbGVjdG9yLWNvbnRyb2wtYmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgUHJpbWl0aXZlIH0gZnJvbSAnQG9wdXNjYXBpdGEvb2MtY20tY29tbW9uLWxheW91dHMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgdXVpZCBmcm9tICd1dWlkJztcblxuLy8gQXBwIGltcG9ydHNcbmltcG9ydCB7IGlzU2VsZWN0ZWRUcmVlSXRlbVBhcmVudCwgaXNTZWxlY3RlZFRyZWVJdGVtUm9vdCB9IGZyb20gJy4vaGllcmFyY2h5LXRyZWUudXRpbHMnO1xuXG5jb25zdCBSZW5hbWVMYWJlbCA9IHN0eWxlZC5sYWJlbGBcbiAgbWFyZ2luOiAwICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuaGFsZkd1dHRlcldpZHRofSAwIDA7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG5gO1xuXG5jb25zdCBDb250YWluZXIgPSBzdHlsZWQuZGl2YFxuICBoZWlnaHQ6ICR7cHJvcHMgPT4gcHJvcHMuaGVpZ2h0fTtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbmA7XG5cbmNvbnN0IEJ1dHRvbiA9IHN0eWxlZChQcmltaXRpdmUuQnV0dG9uKWBcbiAgbWFyZ2luLWxlZnQ6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuaGFsZkd1dHRlcldpZHRofTtcbiAgbWluLXdpZHRoOiAxMjBweDtcbmA7XG5cbmNvbnN0IENvbnRyb2xzID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gIG1hcmdpbi1yaWdodDogMDtcbmA7XG5cbmNvbnN0IFJlbmFtZUZpZWxkID0gc3R5bGVkKFByaW1pdGl2ZS5JbnB1dClgXG4gIG1pbi13aWR0aDogMjAwcHg7XG4gIG1hcmdpbi1yaWdodDogNHJlbTtcbmA7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIaWVyYXJjaHlUcmVlU2VsZWN0b3JDb250cm9sQmFyIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB2YWx1ZTogJycsXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0ZWRUcmVlSXRlbSAhPT0gbmV4dFByb3BzLnNlbGVjdGVkVHJlZUl0ZW0pIHtcbiAgICAgIGNvbnN0IGlucHV0VmFsdWUgPSBuZXh0UHJvcHMuc2VsZWN0ZWRUcmVlSXRlbSAmJlxuICAgICAgaXNTZWxlY3RlZFRyZWVJdGVtUGFyZW50KG5leHRQcm9wcykgP1xuICAgICAgICBuZXh0UHJvcHMuc2VsZWN0ZWRUcmVlSXRlbVtuZXh0UHJvcHMudmFsdWVLZXldIDogJyc7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgdmFsdWU6IGlucHV0VmFsdWUgfSk7XG4gICAgfVxuICB9XG5cbiAgb25JbnB1dENoYW5nZSA9IChlKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHZhbHVlOiBlLnRhcmdldC52YWx1ZSB9LCAoKSA9PiB7XG4gICAgICB0aGlzLnByb3BzLm9uSW5wdXRDaGFuZ2UodGhpcy5zdGF0ZS52YWx1ZSk7XG4gICAgfSk7XG4gIH07XG5cbiAgb25BZGRCdXR0b25DbGljayA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBvbkFkZE5ld0NsaWNrLCB0cmFuc2xhdGlvbnMsIGlkS2V5LCB2YWx1ZUtleSwgY2hpbGRLZXksXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBvbkFkZE5ld0NsaWNrKHtcbiAgICAgIFtpZEtleV06IHV1aWQoKSxcbiAgICAgIFt2YWx1ZUtleV06IHRyYW5zbGF0aW9ucy5kZWZhdWx0TmV3Tm9kZSxcbiAgICAgIFtjaGlsZEtleV06IFtdLFxuICAgIH0sICgpID0+IHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmlucHV0LnNlbGVjdCgpO1xuICAgICAgICB0aGlzLmlucHV0LmZvY3VzKCk7XG4gICAgICB9LCA1MCk7XG4gICAgfSk7XG4gIH07XG5cbiAgb25EZWxldGVCdXR0b25DbGljayA9ICgpID0+IHtcbiAgICBjb25zdCB7IG9uRGVsZXRlQ2xpY2sgfSA9IHRoaXMucHJvcHM7XG4gICAgb25EZWxldGVDbGljaygpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBCbHVyIG9uIGVudGVyIGtleSBwcmVzc1xuICAgKiBAcGFyYW0gZVxuICAgKi9cbiAgb25SZW5hbWVGaWVsZEtleURvd24gPSAoZSkgPT4ge1xuICAgIGlmIChlLmtleUNvZGUgPT09IDEzKSB0aGlzLmlucHV0LmJsdXIoKTtcbiAgfTtcblxuICAvKipcbiAgICogSXMgYWRkIGJ1dHRvbiBkaXNhYmxlZC4gQWRkIGJ1dHRvbiBpcyBkaXNhYmxlZCwgaWY6XG4gICAqIC0gc2VsZWN0ZWQgdHJlZSBub2RlIGlzIGEgbGVhZlxuICAgKiAtIGNvbnRhaW5zIGxlYWZzXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgaXNBZGREaXNhYmxlZCA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBzZWxlY3RlZFRyZWVJdGVtLCBjaGlsZEtleSwgc2luZ2xlUm9vdCxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIC8vIElmIG9ubHkgYSBzaW5nbGUgcm9vdCBpcyBhbGxvd2VkLCB3ZSBjYW4ndCBhZGQgbmV3IGl0ZW1zIGlmIG5vIGl0ZW1zIGFyZSBzZWxlY3RlZFxuICAgIGlmICghc2VsZWN0ZWRUcmVlSXRlbSkgcmV0dXJuIHNpbmdsZVJvb3Q7XG4gICAgcmV0dXJuICFpc1NlbGVjdGVkVHJlZUl0ZW1QYXJlbnQodGhpcy5wcm9wcykgfHxcbiAgICAgICEhc2VsZWN0ZWRUcmVlSXRlbVtjaGlsZEtleV0uZmluZChjaGlsZEl0ZW0gPT4gIWNoaWxkSXRlbVtjaGlsZEtleV0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBJcyBkZWxldGUgYnV0dG9uIGRpc2FibGVkLiBEZWxldGUgYnV0dG9uIGlzIGRpc2FibGVkLCBpZjpcbiAgICogLSBzaW5nbGUgcm9vdCBpcyBlbmFibGVkIGFuZCBzZWxlY3RlZCBpdGVtIGlzIGEgcm9vdFxuICAgKiAtIHNlbGVjdGVkIGl0ZW0gaXMgYSBsZWFmXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgaXNEZWxldGVEaXNhYmxlZCA9ICgpID0+IHtcbiAgICBjb25zdCB7IHNpbmdsZVJvb3QgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCF0aGlzLnByb3BzLnNlbGVjdGVkVHJlZUl0ZW0pIHJldHVybiB0cnVlO1xuICAgIHJldHVybiAhIShzaW5nbGVSb290ICYmIGlzU2VsZWN0ZWRUcmVlSXRlbVJvb3QodGhpcy5wcm9wcykpO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICB0cmFuc2xhdGlvbnMsIGlkLCBoZWlnaHQsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPENvbnRhaW5lciBoZWlnaHQ9e2hlaWdodH0+XG4gICAgICAgIDxDb250cm9scz5cbiAgICAgICAgICA8UmVuYW1lTGFiZWwgaHRtbEZvcj17YCR7aWR9LW5vZGUtbmFtZS1pbnB1dGB9Pnt0cmFuc2xhdGlvbnMucmVuYW1lfTwvUmVuYW1lTGFiZWw+XG4gICAgICAgICAgPFJlbmFtZUZpZWxkXG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbklucHV0Q2hhbmdlfVxuICAgICAgICAgICAgaWQ9e2Ake2lkfS1ub2RlLW5hbWUtaW5wdXRgfVxuICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUudmFsdWV9XG4gICAgICAgICAgICBkaXNhYmxlZD17IWlzU2VsZWN0ZWRUcmVlSXRlbVBhcmVudCh0aGlzLnByb3BzKX1cbiAgICAgICAgICAgIHJlZj17KGlucHV0KSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuaW5wdXQgPSBpbnB1dDtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvbktleURvd249e3RoaXMub25SZW5hbWVGaWVsZEtleURvd259XG4gICAgICAgICAgLz5cblxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25BZGRCdXR0b25DbGlja31cbiAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLmlzQWRkRGlzYWJsZWQoKX1cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIHt0cmFuc2xhdGlvbnMuYWRkfVxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25EZWxldGVCdXR0b25DbGlja31cbiAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLmlzRGVsZXRlRGlzYWJsZWQoKX1cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIHt0cmFuc2xhdGlvbnMuZGVsZXRlfVxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICA8L0NvbnRyb2xzPlxuICAgICAgPC9Db250YWluZXI+XG4gICAgKTtcbiAgfVxufVxuXG5IaWVyYXJjaHlUcmVlU2VsZWN0b3JDb250cm9sQmFyLnByb3BUeXBlcyA9IHtcbiAgb25BZGROZXdDbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgb25EZWxldGVDbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgb25JbnB1dENoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgaWRLZXk6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgdmFsdWVLZXk6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgY2hpbGRLZXk6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgdHJhbnNsYXRpb25zOiBQcm9wVHlwZXMuc2hhcGUoe30pLmlzUmVxdWlyZWQsXG4gIHNlbGVjdGVkVHJlZUl0ZW06IFByb3BUeXBlcy5zaGFwZSh7fSksXG4gIGlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIGhlaWdodDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBzaW5nbGVSb290OiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxufTtcblxuSGllcmFyY2h5VHJlZVNlbGVjdG9yQ29udHJvbEJhci5kZWZhdWx0UHJvcHMgPSB7XG4gIHNlbGVjdGVkVHJlZUl0ZW06IG51bGwsXG59O1xuXG4iXX0=