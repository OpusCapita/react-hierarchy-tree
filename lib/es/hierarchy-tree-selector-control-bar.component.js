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
import { isSelectedTreeItemParent } from './hierarchy-tree.utils';
import ExpandAllToggle from './hierarchy-tree-selector-expand-all-toggle.component';

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
        _this.input.select();
        _this.input.focus();
      });
    };

    _this.onDeleteButtonClick = function () {
      var onDeleteClick = _this.props.onDeleteClick;

      onDeleteClick();
    };

    _this.isAddDisabled = function () {
      var _this$props2 = _this.props,
          selectedTreeItem = _this$props2.selectedTreeItem,
          childKey = _this$props2.childKey;

      if (!selectedTreeItem) return false;
      return !isSelectedTreeItemParent(_this.props) || !!selectedTreeItem[childKey].find(function (childItem) {
        return !childItem[childKey];
      });
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
   * Is add button disabled. Add button is disabled, if:
   * - selected tree node is a leaf
   * - contains leafs
   * @returns {boolean}
   */


  HierarchyTreeSelectorControlBar.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        translations = _props.translations,
        id = _props.id,
        height = _props.height,
        onExpandAllClick = _props.onExpandAllClick,
        expandAll = _props.expandAll;


    return React.createElement(
      Container,
      { height: height },
      React.createElement(ExpandAllToggle, { expandAll: expandAll, onClick: onExpandAllClick }),
      React.createElement(
        Primitive.Subtitle,
        null,
        translations.treeTitle
      ),
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
          innerRef: function innerRef(input) {
            _this2.input = input;
          }
        }),
        React.createElement(
          Button,
          {
            onClick: this.onAddButtonClick,
            disabled: this.isAddDisabled()
          },
          translations.add
        ),
        React.createElement(
          Button,
          {
            onClick: this.onDeleteButtonClick,
            disabled: !isSelectedTreeItemParent(this.props)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci1jb250cm9sLWJhci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiUHJpbWl0aXZlIiwic3R5bGVkIiwidXVpZCIsImlzU2VsZWN0ZWRUcmVlSXRlbVBhcmVudCIsIkV4cGFuZEFsbFRvZ2dsZSIsIlJlbmFtZUxhYmVsIiwibGFiZWwiLCJwcm9wcyIsInRoZW1lIiwiaGFsZkd1dHRlcldpZHRoIiwiQ29udGFpbmVyIiwiZGl2IiwiaGVpZ2h0IiwiQnV0dG9uIiwiQ29udHJvbHMiLCJSZW5hbWVGaWVsZCIsIklucHV0IiwiSGllcmFyY2h5VHJlZVNlbGVjdG9yQ29udHJvbEJhciIsIm9uSW5wdXRDaGFuZ2UiLCJlIiwic2V0U3RhdGUiLCJ2YWx1ZSIsInRhcmdldCIsInN0YXRlIiwib25BZGRCdXR0b25DbGljayIsIm9uQWRkTmV3Q2xpY2siLCJ0cmFuc2xhdGlvbnMiLCJpZEtleSIsInZhbHVlS2V5IiwiY2hpbGRLZXkiLCJkZWZhdWx0TmV3Tm9kZSIsImlucHV0Iiwic2VsZWN0IiwiZm9jdXMiLCJvbkRlbGV0ZUJ1dHRvbkNsaWNrIiwib25EZWxldGVDbGljayIsImlzQWRkRGlzYWJsZWQiLCJzZWxlY3RlZFRyZWVJdGVtIiwiZmluZCIsImNoaWxkSXRlbSIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJuZXh0UHJvcHMiLCJpbnB1dFZhbHVlIiwicmVuZGVyIiwiaWQiLCJvbkV4cGFuZEFsbENsaWNrIiwiZXhwYW5kQWxsIiwidHJlZVRpdGxlIiwicmVuYW1lIiwiYWRkIiwiZGVsZXRlIiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLFNBQVNDLFNBQVQsUUFBMEIsa0NBQTFCO0FBQ0Es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QjtBQUpoQjtBQWpCRjtBQUhGLEtBREY7QUE4QkQsRzs7O0VBM0YwRHBELE1BQU1xRCxhOztTQUE5Q2xDLCtCOzs7QUE2R3JCQSxnQ0FBZ0NtQyxZQUFoQyxHQUErQztBQUM3Q2Ysb0JBQWtCO0FBRDJCLENBQS9DIiwiZmlsZSI6ImhpZXJhcmNoeS10cmVlLXNlbGVjdG9yLWNvbnRyb2wtYmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgUHJpbWl0aXZlIH0gZnJvbSAnQG9wdXNjYXBpdGEvb2MtY20tY29tbW9uLWxheW91dHMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgdXVpZCBmcm9tICd1dWlkJztcblxuLy8gQXBwIGltcG9ydHNcbmltcG9ydCB7IGlzU2VsZWN0ZWRUcmVlSXRlbVBhcmVudCB9IGZyb20gJy4vaGllcmFyY2h5LXRyZWUudXRpbHMnO1xuaW1wb3J0IEV4cGFuZEFsbFRvZ2dsZSBmcm9tICcuL2hpZXJhcmNoeS10cmVlLXNlbGVjdG9yLWV4cGFuZC1hbGwtdG9nZ2xlLmNvbXBvbmVudCc7XG5cbmNvbnN0IFJlbmFtZUxhYmVsID0gc3R5bGVkLmxhYmVsYFxuICBtYXJnaW46IDAgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5oYWxmR3V0dGVyV2lkdGh9IDAgMDtcbmA7XG5cbmNvbnN0IENvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gIGhlaWdodDogJHtwcm9wcyA9PiBwcm9wcy5oZWlnaHR9O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuYDtcblxuY29uc3QgQnV0dG9uID0gc3R5bGVkKFByaW1pdGl2ZS5CdXR0b24pYFxuICBtYXJnaW4tbGVmdDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5oYWxmR3V0dGVyV2lkdGh9O1xuICBtaW4td2lkdGg6IDEyMHB4O1xuYDtcblxuY29uc3QgQ29udHJvbHMgPSBzdHlsZWQuZGl2YFxuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBtYXJnaW4tbGVmdDogYXV0bztcbiAgbWFyZ2luLXJpZ2h0OiAwO1xuYDtcblxuY29uc3QgUmVuYW1lRmllbGQgPSBzdHlsZWQoUHJpbWl0aXZlLklucHV0KWBcbiAgbWluLXdpZHRoOiAyMDBweDtcbmA7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIaWVyYXJjaHlUcmVlU2VsZWN0b3JDb250cm9sQmFyIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB2YWx1ZTogJycsXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0ZWRUcmVlSXRlbSAhPT0gbmV4dFByb3BzLnNlbGVjdGVkVHJlZUl0ZW0pIHtcbiAgICAgIGNvbnN0IGlucHV0VmFsdWUgPSBuZXh0UHJvcHMuc2VsZWN0ZWRUcmVlSXRlbSAmJlxuICAgICAgaXNTZWxlY3RlZFRyZWVJdGVtUGFyZW50KG5leHRQcm9wcykgP1xuICAgICAgICBuZXh0UHJvcHMuc2VsZWN0ZWRUcmVlSXRlbVtuZXh0UHJvcHMudmFsdWVLZXldIDogJyc7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgdmFsdWU6IGlucHV0VmFsdWUgfSk7XG4gICAgfVxuICB9XG5cbiAgb25JbnB1dENoYW5nZSA9IChlKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHZhbHVlOiBlLnRhcmdldC52YWx1ZSB9LCAoKSA9PiB7XG4gICAgICB0aGlzLnByb3BzLm9uSW5wdXRDaGFuZ2UodGhpcy5zdGF0ZS52YWx1ZSk7XG4gICAgfSk7XG4gIH07XG5cbiAgb25BZGRCdXR0b25DbGljayA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBvbkFkZE5ld0NsaWNrLCB0cmFuc2xhdGlvbnMsIGlkS2V5LCB2YWx1ZUtleSwgY2hpbGRLZXksXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBvbkFkZE5ld0NsaWNrKHtcbiAgICAgIFtpZEtleV06IHV1aWQoKSxcbiAgICAgIFt2YWx1ZUtleV06IHRyYW5zbGF0aW9ucy5kZWZhdWx0TmV3Tm9kZSxcbiAgICAgIFtjaGlsZEtleV06IFtdLFxuICAgIH0sICgpID0+IHtcbiAgICAgIHRoaXMuaW5wdXQuc2VsZWN0KCk7XG4gICAgICB0aGlzLmlucHV0LmZvY3VzKCk7XG4gICAgfSk7XG4gIH07XG5cbiAgb25EZWxldGVCdXR0b25DbGljayA9ICgpID0+IHtcbiAgICBjb25zdCB7IG9uRGVsZXRlQ2xpY2sgfSA9IHRoaXMucHJvcHM7XG4gICAgb25EZWxldGVDbGljaygpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBJcyBhZGQgYnV0dG9uIGRpc2FibGVkLiBBZGQgYnV0dG9uIGlzIGRpc2FibGVkLCBpZjpcbiAgICogLSBzZWxlY3RlZCB0cmVlIG5vZGUgaXMgYSBsZWFmXG4gICAqIC0gY29udGFpbnMgbGVhZnNcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBpc0FkZERpc2FibGVkID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgc2VsZWN0ZWRUcmVlSXRlbSwgY2hpbGRLZXkgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFzZWxlY3RlZFRyZWVJdGVtKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuICFpc1NlbGVjdGVkVHJlZUl0ZW1QYXJlbnQodGhpcy5wcm9wcykgfHxcbiAgICAgICEhc2VsZWN0ZWRUcmVlSXRlbVtjaGlsZEtleV0uZmluZChjaGlsZEl0ZW0gPT4gIWNoaWxkSXRlbVtjaGlsZEtleV0pO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICB0cmFuc2xhdGlvbnMsIGlkLCBoZWlnaHQsIG9uRXhwYW5kQWxsQ2xpY2ssIGV4cGFuZEFsbCxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiAoXG4gICAgICA8Q29udGFpbmVyIGhlaWdodD17aGVpZ2h0fT5cbiAgICAgICAgPEV4cGFuZEFsbFRvZ2dsZSBleHBhbmRBbGw9e2V4cGFuZEFsbH0gb25DbGljaz17b25FeHBhbmRBbGxDbGlja30gLz5cbiAgICAgICAgPFByaW1pdGl2ZS5TdWJ0aXRsZT57dHJhbnNsYXRpb25zLnRyZWVUaXRsZX08L1ByaW1pdGl2ZS5TdWJ0aXRsZT5cbiAgICAgICAgPENvbnRyb2xzPlxuICAgICAgICAgIDxSZW5hbWVMYWJlbCBodG1sRm9yPXtgJHtpZH0tbm9kZS1uYW1lLWlucHV0YH0+e3RyYW5zbGF0aW9ucy5yZW5hbWV9PC9SZW5hbWVMYWJlbD5cbiAgICAgICAgICA8UmVuYW1lRmllbGRcbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uSW5wdXRDaGFuZ2V9XG4gICAgICAgICAgICBpZD17YCR7aWR9LW5vZGUtbmFtZS1pbnB1dGB9XG4gICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX1cbiAgICAgICAgICAgIGRpc2FibGVkPXshaXNTZWxlY3RlZFRyZWVJdGVtUGFyZW50KHRoaXMucHJvcHMpfVxuICAgICAgICAgICAgaW5uZXJSZWY9eyhpbnB1dCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkFkZEJ1dHRvbkNsaWNrfVxuICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuaXNBZGREaXNhYmxlZCgpfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHt0cmFuc2xhdGlvbnMuYWRkfVxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25EZWxldGVCdXR0b25DbGlja31cbiAgICAgICAgICAgIGRpc2FibGVkPXshaXNTZWxlY3RlZFRyZWVJdGVtUGFyZW50KHRoaXMucHJvcHMpfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHt0cmFuc2xhdGlvbnMuZGVsZXRlfVxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICA8L0NvbnRyb2xzPlxuICAgICAgPC9Db250YWluZXI+XG4gICAgKTtcbiAgfVxufVxuXG5IaWVyYXJjaHlUcmVlU2VsZWN0b3JDb250cm9sQmFyLnByb3BUeXBlcyA9IHtcbiAgb25BZGROZXdDbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgb25EZWxldGVDbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgb25JbnB1dENoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgb25FeHBhbmRBbGxDbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgaWRLZXk6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgdmFsdWVLZXk6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgY2hpbGRLZXk6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgdHJhbnNsYXRpb25zOiBQcm9wVHlwZXMuc2hhcGUoe30pLmlzUmVxdWlyZWQsXG4gIHNlbGVjdGVkVHJlZUl0ZW06IFByb3BUeXBlcy5zaGFwZSh7fSksXG4gIGlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIGhlaWdodDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBleHBhbmRBbGw6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG59O1xuXG5IaWVyYXJjaHlUcmVlU2VsZWN0b3JDb250cm9sQmFyLmRlZmF1bHRQcm9wcyA9IHtcbiAgc2VsZWN0ZWRUcmVlSXRlbTogbnVsbCxcbn07XG5cbiJdfQ==