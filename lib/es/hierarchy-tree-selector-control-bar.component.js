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
        }, 0);
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
   * Blur on enter key press
   * @param e
   */


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
          innerRef: function innerRef(input) {
            _this2.input = input;
          },
          onKeyDown: this.onRenameFieldKeyDown
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci1jb250cm9sLWJhci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiUHJpbWl0aXZlIiwic3R5bGVkIiwidXVpZCIsImlzU2VsZWN0ZWRUcmVlSXRlbVBhcmVudCIsIlJlbmFtZUxhYmVsIiwibGFiZWwiLCJwcm9wcyIsInRoZW1lIiwiaGFsZkd1dHRlcldpZHRoIiwiQ29udGFpbmVyIiwiZGl2IiwiaGVpZ2h0IiwiQnV0dG9uIiwiQ29udHJvbHMiLCJSZW5hbWVGaWVsZCIsIklucHV0IiwiSGllcmFyY2h5VHJlZVNlbGVjdG9yQ29udHJvbEJhciIsIm9uSW5wdXRDaGFuZ2UiLCJlIiwic2V0U3RhdGUiLCJ2YWx1ZSIsInRhcmdldCIsInN0YXRlIiwib25BZGRCdXR0b25DbGljayIsIm9uQWRkTmV3Q2xpY2siLCJ0cmFuc2xhdGlvbnMiLCJpZEtleSIsInZhbHVlS2V5IiwiY2hpbGRLZXkiLCJkZWZhdWx0TmV3Tm9kZSIsInNldFRpbWVvdXQiLCJpbnB1dCIsInNlbGVjdCIsImZvY3VzIiwib25EZWxldGVCdXR0b25DbGljayIsIm9uRGVsZXRlQ2xpY2siLCJvblJlbmFtZUZpZWxkS2V5RG93biIsImtleUNvZGUiLCJibHVyIiwiaXNBZGREaXNhYmxlZCIsInNlbGVjdGVkVHJlZUl0ZW0iLCJmaW5kIiwiY2hpbGRJdGVtIiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsIm5leHRQcm9wcyIsImlucHV0VmFsdWUiLCJyZW5kZXIiLCJpZCIsInJlbmFtZSIsImFkZCIsImRlbGV0ZSIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxTQUFTQyxTQUFULFFBQTBCLGtDQUExQjtBQUNBLE9BQU9DLE1B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RjtBQThCRCxHOzs7RUF2RzBEcEQsTUFBTXFELGE7O1NBQTlDbkMsK0I7OztBQXVIckJBLGdDQUFnQ29DLFlBQWhDLEdBQStDO0FBQzdDWixvQkFBa0I7QUFEMkIsQ0FBL0MiLCJmaWxlIjoiaGllcmFyY2h5LXRyZWUtc2VsZWN0b3ItY29udHJvbC1iYXIuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBQcmltaXRpdmUgfSBmcm9tICdAb3B1c2NhcGl0YS9vYy1jbS1jb21tb24tbGF5b3V0cyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCB1dWlkIGZyb20gJ3V1aWQnO1xuXG4vLyBBcHAgaW1wb3J0c1xuaW1wb3J0IHsgaXNTZWxlY3RlZFRyZWVJdGVtUGFyZW50IH0gZnJvbSAnLi9oaWVyYXJjaHktdHJlZS51dGlscyc7XG5cbmNvbnN0IFJlbmFtZUxhYmVsID0gc3R5bGVkLmxhYmVsYFxuICBtYXJnaW46IDAgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5oYWxmR3V0dGVyV2lkdGh9IDAgMDtcbmA7XG5cbmNvbnN0IENvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gIGhlaWdodDogJHtwcm9wcyA9PiBwcm9wcy5oZWlnaHR9O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuYDtcblxuY29uc3QgQnV0dG9uID0gc3R5bGVkKFByaW1pdGl2ZS5CdXR0b24pYFxuICBtYXJnaW4tbGVmdDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5oYWxmR3V0dGVyV2lkdGh9O1xuICBtaW4td2lkdGg6IDEyMHB4O1xuYDtcblxuY29uc3QgQ29udHJvbHMgPSBzdHlsZWQuZGl2YFxuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBtYXJnaW4tbGVmdDogYXV0bztcbiAgbWFyZ2luLXJpZ2h0OiAwO1xuYDtcblxuY29uc3QgUmVuYW1lRmllbGQgPSBzdHlsZWQoUHJpbWl0aXZlLklucHV0KWBcbiAgbWluLXdpZHRoOiAyMDBweDtcbmA7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIaWVyYXJjaHlUcmVlU2VsZWN0b3JDb250cm9sQmFyIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB2YWx1ZTogJycsXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0ZWRUcmVlSXRlbSAhPT0gbmV4dFByb3BzLnNlbGVjdGVkVHJlZUl0ZW0pIHtcbiAgICAgIGNvbnN0IGlucHV0VmFsdWUgPSBuZXh0UHJvcHMuc2VsZWN0ZWRUcmVlSXRlbSAmJlxuICAgICAgaXNTZWxlY3RlZFRyZWVJdGVtUGFyZW50KG5leHRQcm9wcykgP1xuICAgICAgICBuZXh0UHJvcHMuc2VsZWN0ZWRUcmVlSXRlbVtuZXh0UHJvcHMudmFsdWVLZXldIDogJyc7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgdmFsdWU6IGlucHV0VmFsdWUgfSk7XG4gICAgfVxuICB9XG5cbiAgb25JbnB1dENoYW5nZSA9IChlKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHZhbHVlOiBlLnRhcmdldC52YWx1ZSB9LCAoKSA9PiB7XG4gICAgICB0aGlzLnByb3BzLm9uSW5wdXRDaGFuZ2UodGhpcy5zdGF0ZS52YWx1ZSk7XG4gICAgfSk7XG4gIH07XG5cbiAgb25BZGRCdXR0b25DbGljayA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBvbkFkZE5ld0NsaWNrLCB0cmFuc2xhdGlvbnMsIGlkS2V5LCB2YWx1ZUtleSwgY2hpbGRLZXksXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBvbkFkZE5ld0NsaWNrKHtcbiAgICAgIFtpZEtleV06IHV1aWQoKSxcbiAgICAgIFt2YWx1ZUtleV06IHRyYW5zbGF0aW9ucy5kZWZhdWx0TmV3Tm9kZSxcbiAgICAgIFtjaGlsZEtleV06IFtdLFxuICAgIH0sICgpID0+IHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmlucHV0LnNlbGVjdCgpO1xuICAgICAgICB0aGlzLmlucHV0LmZvY3VzKCk7XG4gICAgICB9LCAwKTtcbiAgICB9KTtcbiAgfTtcblxuICBvbkRlbGV0ZUJ1dHRvbkNsaWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgb25EZWxldGVDbGljayB9ID0gdGhpcy5wcm9wcztcbiAgICBvbkRlbGV0ZUNsaWNrKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEJsdXIgb24gZW50ZXIga2V5IHByZXNzXG4gICAqIEBwYXJhbSBlXG4gICAqL1xuICBvblJlbmFtZUZpZWxkS2V5RG93biA9IChlKSA9PiB7XG4gICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHRoaXMuaW5wdXQuYmx1cigpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBJcyBhZGQgYnV0dG9uIGRpc2FibGVkLiBBZGQgYnV0dG9uIGlzIGRpc2FibGVkLCBpZjpcbiAgICogLSBzZWxlY3RlZCB0cmVlIG5vZGUgaXMgYSBsZWFmXG4gICAqIC0gY29udGFpbnMgbGVhZnNcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBpc0FkZERpc2FibGVkID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIHNlbGVjdGVkVHJlZUl0ZW0sIGNoaWxkS2V5LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghc2VsZWN0ZWRUcmVlSXRlbSkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiAhaXNTZWxlY3RlZFRyZWVJdGVtUGFyZW50KHRoaXMucHJvcHMpIHx8XG4gICAgICAhIXNlbGVjdGVkVHJlZUl0ZW1bY2hpbGRLZXldLmZpbmQoY2hpbGRJdGVtID0+ICFjaGlsZEl0ZW1bY2hpbGRLZXldKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgdHJhbnNsYXRpb25zLCBpZCwgaGVpZ2h0LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxDb250YWluZXIgaGVpZ2h0PXtoZWlnaHR9PlxuICAgICAgICA8Q29udHJvbHM+XG4gICAgICAgICAgPFJlbmFtZUxhYmVsIGh0bWxGb3I9e2Ake2lkfS1ub2RlLW5hbWUtaW5wdXRgfT57dHJhbnNsYXRpb25zLnJlbmFtZX08L1JlbmFtZUxhYmVsPlxuICAgICAgICAgIDxSZW5hbWVGaWVsZFxuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25JbnB1dENoYW5nZX1cbiAgICAgICAgICAgIGlkPXtgJHtpZH0tbm9kZS1uYW1lLWlucHV0YH1cbiAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnZhbHVlfVxuICAgICAgICAgICAgZGlzYWJsZWQ9eyFpc1NlbGVjdGVkVHJlZUl0ZW1QYXJlbnQodGhpcy5wcm9wcyl9XG4gICAgICAgICAgICBpbm5lclJlZj17KGlucHV0KSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuaW5wdXQgPSBpbnB1dDtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvbktleURvd249e3RoaXMub25SZW5hbWVGaWVsZEtleURvd259XG4gICAgICAgICAgLz5cblxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25BZGRCdXR0b25DbGlja31cbiAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLmlzQWRkRGlzYWJsZWQoKX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7dHJhbnNsYXRpb25zLmFkZH1cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uRGVsZXRlQnV0dG9uQ2xpY2t9XG4gICAgICAgICAgICBkaXNhYmxlZD17IWlzU2VsZWN0ZWRUcmVlSXRlbVBhcmVudCh0aGlzLnByb3BzKX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7dHJhbnNsYXRpb25zLmRlbGV0ZX1cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgPC9Db250cm9scz5cbiAgICAgIDwvQ29udGFpbmVyPlxuICAgICk7XG4gIH1cbn1cblxuSGllcmFyY2h5VHJlZVNlbGVjdG9yQ29udHJvbEJhci5wcm9wVHlwZXMgPSB7XG4gIG9uQWRkTmV3Q2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG9uRGVsZXRlQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG9uSW5wdXRDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGlkS2V5OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIHZhbHVlS2V5OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIGNoaWxkS2V5OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIHRyYW5zbGF0aW9uczogUHJvcFR5cGVzLnNoYXBlKHt9KS5pc1JlcXVpcmVkLFxuICBzZWxlY3RlZFRyZWVJdGVtOiBQcm9wVHlwZXMuc2hhcGUoe30pLFxuICBpZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBoZWlnaHQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbn07XG5cbkhpZXJhcmNoeVRyZWVTZWxlY3RvckNvbnRyb2xCYXIuZGVmYXVsdFByb3BzID0ge1xuICBzZWxlY3RlZFRyZWVJdGVtOiBudWxsLFxufTtcblxuIl19