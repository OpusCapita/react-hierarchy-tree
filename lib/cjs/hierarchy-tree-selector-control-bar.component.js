'use strict';

exports.__esModule = true;
exports.default = undefined;

var _templateObject = _taggedTemplateLiteralLoose(['\n  margin: 0 ', ' 0 0;\n'], ['\n  margin: 0 ', ' 0 0;\n']),
    _templateObject2 = _taggedTemplateLiteralLoose(['\n  height: ', ';\n  display: flex;\n  align-items: center;\n'], ['\n  height: ', ';\n  display: flex;\n  align-items: center;\n']),
    _templateObject3 = _taggedTemplateLiteralLoose(['\n  margin-left: ', ';\n  min-width: 120px;\n'], ['\n  margin-left: ', ';\n  min-width: 120px;\n']),
    _templateObject4 = _taggedTemplateLiteralLoose(['\n  display: flex;\n  align-items: center;\n  margin-left: auto;\n  margin-right: 0;\n'], ['\n  display: flex;\n  align-items: center;\n  margin-left: auto;\n  margin-right: 0;\n']),
    _templateObject5 = _taggedTemplateLiteralLoose(['\n  min-width: 200px;\n'], ['\n  min-width: 200px;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ocCmCommonLayouts = require('@opuscapita/oc-cm-common-layouts');

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _hierarchyTree = require('./hierarchy-tree.utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

// App imports


var RenameLabel = _styledComponents2.default.label(_templateObject, function (props) {
  return props.theme.halfGutterWidth;
});

var Container = _styledComponents2.default.div(_templateObject2, function (props) {
  return props.height;
});

var Button = (0, _styledComponents2.default)(_ocCmCommonLayouts.Primitive.Button)(_templateObject3, function (props) {
  return props.theme.halfGutterWidth;
});

var Controls = _styledComponents2.default.div(_templateObject4);

var RenameField = (0, _styledComponents2.default)(_ocCmCommonLayouts.Primitive.Input)(_templateObject5);

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


      onAddNewClick((_onAddNewClick = {}, _onAddNewClick[idKey] = (0, _uuid2.default)(), _onAddNewClick[valueKey] = translations.defaultNewNode, _onAddNewClick[childKey] = [], _onAddNewClick), function () {
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
      return !(0, _hierarchyTree.isSelectedTreeItemParent)(_this.props) || !!selectedTreeItem[childKey].find(function (childItem) {
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
      var inputValue = nextProps.selectedTreeItem && (0, _hierarchyTree.isSelectedTreeItemParent)(nextProps) ? nextProps.selectedTreeItem[nextProps.valueKey] : '';
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


    return _react2.default.createElement(
      Container,
      { height: height },
      _react2.default.createElement(
        Controls,
        null,
        _react2.default.createElement(
          RenameLabel,
          { htmlFor: id + '-node-name-input' },
          translations.rename
        ),
        _react2.default.createElement(RenameField, {
          onChange: this.onInputChange,
          id: id + '-node-name-input',
          value: this.state.value,
          disabled: !(0, _hierarchyTree.isSelectedTreeItemParent)(this.props),
          innerRef: function innerRef(input) {
            _this2.input = input;
          },
          onKeyDown: this.onRenameFieldKeyDown
        }),
        _react2.default.createElement(
          Button,
          {
            onClick: this.onAddButtonClick,
            disabled: this.isAddDisabled()
          },
          translations.add
        ),
        _react2.default.createElement(
          Button,
          {
            onClick: this.onDeleteButtonClick,
            disabled: !(0, _hierarchyTree.isSelectedTreeItemParent)(this.props)
          },
          translations.delete
        )
      )
    );
  };

  return HierarchyTreeSelectorControlBar;
}(_react2.default.PureComponent);

exports.default = HierarchyTreeSelectorControlBar;


HierarchyTreeSelectorControlBar.defaultProps = {
  selectedTreeItem: null
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci1jb250cm9sLWJhci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlbmFtZUxhYmVsIiwic3R5bGVkIiwibGFiZWwiLCJwcm9wcyIsInRoZW1lIiwiaGFsZkd1dHRlcldpZHRoIiwiQ29udGFpbmVyIiwiZGl2IiwiaGVpZ2h0IiwiQnV0dG9uIiwiUHJpbWl0aXZlIiwiQ29udHJvbHMiLCJSZW5hbWVGaWVsZCIsIklucHV0IiwiSGllcmFyY2h5VHJlZVNlbGVjdG9yQ29udHJvbEJhciIsIm9uSW5wdXRDaGFuZ2UiLCJlIiwic2V0U3RhdGUiLCJ2YWx1ZSIsInRhcmdldCIsInN0YXRlIiwib25BZGRCdXR0b25DbGljayIsIm9uQWRkTmV3Q2xpY2siLCJ0cmFuc2xhdGlvbnMiLCJpZEtleSIsInZhbHVlS2V5IiwiY2hpbGRLZXkiLCJkZWZhdWx0TmV3Tm9kZSIsInNldFRpbWVvdXQiLCJpbnB1dCIsInNlbGVjdCIsImZvY3VzIiwib25EZWxldGVCdXR0b25DbGljayIsIm9uRGVsZXRlQ2xpY2siLCJvblJlbmFtZUZpZWxkS2V5RG93biIsImtleUNvZGUiLCJibHVyIiwiaXNBZGREaXNhYmxlZCIsInNlbGVjdGVkVHJlZUl0ZW0iLCJmaW5kIiwiY2hpbGRJdGVtIiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsIm5leHRQcm9wcyIsImlucHV0VmFsdWUiLCJyZW5kZXIiLCJpZCIsInJlbmFtZSIsImFkZCIsImRlbGV0ZSIsIlJlYWN0IiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUdBOzs7Ozs7Ozs7Ozs7QUFEQTs7O0FBR0EsSUFBTUEsY0FBY0MsMkJBQU9DLEtBQXJCLGtCQUNRO0FBQUEsU0FBU0MsTUFBTUMsS0FBTixDQUFZQyxlQUFyQjtBQUFBLENBRFIsQ0FBTjs7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QVFBOzs7Ozs7Ozs0Q0FlQUMsTSxxQkFBUztBQUFBOztBQUFBLGlCQUdILEtBQUt6QyxLQUhGO0FBQUEsUUFFTG9CLFlBRkssVUFFTEEsWUFGSztBQUFBLFFBRVNzQixFQUZULFVBRVNBLEVBRlQ7QUFBQSxRQUVhckMsTUFGYixVQUVhQSxNQUZiOzs7QUFLUCxXQUNFO0FBQUMsZUFBRDtBQUFBLFFBQVcsUUFBUUEsTUFBbkI7QUFDRTtBQUFDLGdCQUFEO0FBQUE7QUFDRTtBQUFDLHFCQUFEO0FBQUEsWUFBYSxTQUFZcUMsRUFBWixxQkFBYjtBQUFnRHRCLHVCQUFhdUI7QUFBN0QsU0FERjtBQUVFLHNDQUFDLFdBQUQ7QUFDRSxvQkFBVSxLQUFLL0IsYUFEakI7QUFFRSxjQUFPOEIsRUFBUCxxQkFGRjtBQUdFLGlCQUFPLEtBQUt6QixLQUFMLENBQVdGLEtBSHBCO0FBSUUsb0JBQVUsQ0FBQyw2Q0FBeUIsS0FBS2YsS0FBOUIsQ0FKYjtBQUtFLG9CQUFVLGtCQUFDMEIsS0FBRCxFQUFXO0FBQ25CLG1CQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDRCxXQVBIO0FBUUUscUJBQVcsS0FBS0s7QUFSbEIsVUFGRjtBQWFFO0FBQUMsZ0JBQUQ7QUFBQTtBQUNFLHFCQUFTLEtBQUtiLGdCQURoQjtBQUVFLHNCQUFVLEtBQUtnQixhQUFMO0FBRlo7QUFJR2QsdUJBQWF3QjtBQUpoQixTQWJGO0FBbUJFO0FBQUMsZ0JBQUQ7QUFBQTtBQUNFLHFCQUFTLEtBQUtmLG1CQURoQjtBQUVFLHNCQUFVLENBQUMsNkNBQXlCLEtBQUs3QixLQUE5QjtBQUZiO0FBSUdvQix1QkFBYXlCO0FBSmhCO0FBbkJGO0FBREYsS0FERjtBQThCRCxHOzs7RUF2RzBEQyxnQkFBTUMsYTs7a0JBQTlDcEMsK0I7OztBQXVIckJBLGdDQUFnQ3FDLFlBQWhDLEdBQStDO0FBQzdDYixvQkFBa0I7QUFEMkIsQ0FBL0MiLCJmaWxlIjoiaGllcmFyY2h5LXRyZWUtc2VsZWN0b3ItY29udHJvbC1iYXIuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBQcmltaXRpdmUgfSBmcm9tICdAb3B1c2NhcGl0YS9vYy1jbS1jb21tb24tbGF5b3V0cyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCB1dWlkIGZyb20gJ3V1aWQnO1xuXG4vLyBBcHAgaW1wb3J0c1xuaW1wb3J0IHsgaXNTZWxlY3RlZFRyZWVJdGVtUGFyZW50IH0gZnJvbSAnLi9oaWVyYXJjaHktdHJlZS51dGlscyc7XG5cbmNvbnN0IFJlbmFtZUxhYmVsID0gc3R5bGVkLmxhYmVsYFxuICBtYXJnaW46IDAgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5oYWxmR3V0dGVyV2lkdGh9IDAgMDtcbmA7XG5cbmNvbnN0IENvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gIGhlaWdodDogJHtwcm9wcyA9PiBwcm9wcy5oZWlnaHR9O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuYDtcblxuY29uc3QgQnV0dG9uID0gc3R5bGVkKFByaW1pdGl2ZS5CdXR0b24pYFxuICBtYXJnaW4tbGVmdDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5oYWxmR3V0dGVyV2lkdGh9O1xuICBtaW4td2lkdGg6IDEyMHB4O1xuYDtcblxuY29uc3QgQ29udHJvbHMgPSBzdHlsZWQuZGl2YFxuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBtYXJnaW4tbGVmdDogYXV0bztcbiAgbWFyZ2luLXJpZ2h0OiAwO1xuYDtcblxuY29uc3QgUmVuYW1lRmllbGQgPSBzdHlsZWQoUHJpbWl0aXZlLklucHV0KWBcbiAgbWluLXdpZHRoOiAyMDBweDtcbmA7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIaWVyYXJjaHlUcmVlU2VsZWN0b3JDb250cm9sQmFyIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB2YWx1ZTogJycsXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0ZWRUcmVlSXRlbSAhPT0gbmV4dFByb3BzLnNlbGVjdGVkVHJlZUl0ZW0pIHtcbiAgICAgIGNvbnN0IGlucHV0VmFsdWUgPSBuZXh0UHJvcHMuc2VsZWN0ZWRUcmVlSXRlbSAmJlxuICAgICAgaXNTZWxlY3RlZFRyZWVJdGVtUGFyZW50KG5leHRQcm9wcykgP1xuICAgICAgICBuZXh0UHJvcHMuc2VsZWN0ZWRUcmVlSXRlbVtuZXh0UHJvcHMudmFsdWVLZXldIDogJyc7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgdmFsdWU6IGlucHV0VmFsdWUgfSk7XG4gICAgfVxuICB9XG5cbiAgb25JbnB1dENoYW5nZSA9IChlKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHZhbHVlOiBlLnRhcmdldC52YWx1ZSB9LCAoKSA9PiB7XG4gICAgICB0aGlzLnByb3BzLm9uSW5wdXRDaGFuZ2UodGhpcy5zdGF0ZS52YWx1ZSk7XG4gICAgfSk7XG4gIH07XG5cbiAgb25BZGRCdXR0b25DbGljayA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBvbkFkZE5ld0NsaWNrLCB0cmFuc2xhdGlvbnMsIGlkS2V5LCB2YWx1ZUtleSwgY2hpbGRLZXksXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBvbkFkZE5ld0NsaWNrKHtcbiAgICAgIFtpZEtleV06IHV1aWQoKSxcbiAgICAgIFt2YWx1ZUtleV06IHRyYW5zbGF0aW9ucy5kZWZhdWx0TmV3Tm9kZSxcbiAgICAgIFtjaGlsZEtleV06IFtdLFxuICAgIH0sICgpID0+IHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmlucHV0LnNlbGVjdCgpO1xuICAgICAgICB0aGlzLmlucHV0LmZvY3VzKCk7XG4gICAgICB9LCAwKTtcbiAgICB9KTtcbiAgfTtcblxuICBvbkRlbGV0ZUJ1dHRvbkNsaWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgb25EZWxldGVDbGljayB9ID0gdGhpcy5wcm9wcztcbiAgICBvbkRlbGV0ZUNsaWNrKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEJsdXIgb24gZW50ZXIga2V5IHByZXNzXG4gICAqIEBwYXJhbSBlXG4gICAqL1xuICBvblJlbmFtZUZpZWxkS2V5RG93biA9IChlKSA9PiB7XG4gICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHRoaXMuaW5wdXQuYmx1cigpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBJcyBhZGQgYnV0dG9uIGRpc2FibGVkLiBBZGQgYnV0dG9uIGlzIGRpc2FibGVkLCBpZjpcbiAgICogLSBzZWxlY3RlZCB0cmVlIG5vZGUgaXMgYSBsZWFmXG4gICAqIC0gY29udGFpbnMgbGVhZnNcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBpc0FkZERpc2FibGVkID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIHNlbGVjdGVkVHJlZUl0ZW0sIGNoaWxkS2V5LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghc2VsZWN0ZWRUcmVlSXRlbSkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiAhaXNTZWxlY3RlZFRyZWVJdGVtUGFyZW50KHRoaXMucHJvcHMpIHx8XG4gICAgICAhIXNlbGVjdGVkVHJlZUl0ZW1bY2hpbGRLZXldLmZpbmQoY2hpbGRJdGVtID0+ICFjaGlsZEl0ZW1bY2hpbGRLZXldKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgdHJhbnNsYXRpb25zLCBpZCwgaGVpZ2h0LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxDb250YWluZXIgaGVpZ2h0PXtoZWlnaHR9PlxuICAgICAgICA8Q29udHJvbHM+XG4gICAgICAgICAgPFJlbmFtZUxhYmVsIGh0bWxGb3I9e2Ake2lkfS1ub2RlLW5hbWUtaW5wdXRgfT57dHJhbnNsYXRpb25zLnJlbmFtZX08L1JlbmFtZUxhYmVsPlxuICAgICAgICAgIDxSZW5hbWVGaWVsZFxuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25JbnB1dENoYW5nZX1cbiAgICAgICAgICAgIGlkPXtgJHtpZH0tbm9kZS1uYW1lLWlucHV0YH1cbiAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnZhbHVlfVxuICAgICAgICAgICAgZGlzYWJsZWQ9eyFpc1NlbGVjdGVkVHJlZUl0ZW1QYXJlbnQodGhpcy5wcm9wcyl9XG4gICAgICAgICAgICBpbm5lclJlZj17KGlucHV0KSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuaW5wdXQgPSBpbnB1dDtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvbktleURvd249e3RoaXMub25SZW5hbWVGaWVsZEtleURvd259XG4gICAgICAgICAgLz5cblxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25BZGRCdXR0b25DbGlja31cbiAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLmlzQWRkRGlzYWJsZWQoKX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7dHJhbnNsYXRpb25zLmFkZH1cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uRGVsZXRlQnV0dG9uQ2xpY2t9XG4gICAgICAgICAgICBkaXNhYmxlZD17IWlzU2VsZWN0ZWRUcmVlSXRlbVBhcmVudCh0aGlzLnByb3BzKX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7dHJhbnNsYXRpb25zLmRlbGV0ZX1cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgPC9Db250cm9scz5cbiAgICAgIDwvQ29udGFpbmVyPlxuICAgICk7XG4gIH1cbn1cblxuSGllcmFyY2h5VHJlZVNlbGVjdG9yQ29udHJvbEJhci5wcm9wVHlwZXMgPSB7XG4gIG9uQWRkTmV3Q2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG9uRGVsZXRlQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG9uSW5wdXRDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGlkS2V5OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIHZhbHVlS2V5OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIGNoaWxkS2V5OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIHRyYW5zbGF0aW9uczogUHJvcFR5cGVzLnNoYXBlKHt9KS5pc1JlcXVpcmVkLFxuICBzZWxlY3RlZFRyZWVJdGVtOiBQcm9wVHlwZXMuc2hhcGUoe30pLFxuICBpZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBoZWlnaHQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbn07XG5cbkhpZXJhcmNoeVRyZWVTZWxlY3RvckNvbnRyb2xCYXIuZGVmYXVsdFByb3BzID0ge1xuICBzZWxlY3RlZFRyZWVJdGVtOiBudWxsLFxufTtcblxuIl19