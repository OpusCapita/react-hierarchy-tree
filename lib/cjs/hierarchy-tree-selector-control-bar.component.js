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

var _hierarchyTreeSelectorExpandAllToggle = require('./hierarchy-tree-selector-expand-all-toggle.component');

var _hierarchyTreeSelectorExpandAllToggle2 = _interopRequireDefault(_hierarchyTreeSelectorExpandAllToggle);

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


    return _react2.default.createElement(
      Container,
      { height: height },
      _react2.default.createElement(_hierarchyTreeSelectorExpandAllToggle2.default, { expandAll: expandAll, onClick: onExpandAllClick }),
      _react2.default.createElement(
        _ocCmCommonLayouts.Primitive.Subtitle,
        null,
        translations.treeTitle
      ),
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
          }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci1jb250cm9sLWJhci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlbmFtZUxhYmVsIiwic3R5bGVkIiwibGFiZWwiLCJwcm9wcyIsInRoZW1lIiwiaGFsZkd1dHRlcldpZHRoIiwiQ29udGFpbmVyIiwiZGl2IiwiaGVpZ2h0IiwiQnV0dG9uIiwiUHJpbWl0aXZlIiwiQ29udHJvbHMiLCJSZW5hbWVGaWVsZCIsIklucHV0IiwiSGllcmFyY2h5VHJlZVNlbGVjdG9yQ29udHJvbEJhciIsIm9uSW5wdXRDaGFuZ2UiLCJlIiwic2V0U3RhdGUiLCJ2YWx1ZSIsInRhcmdldCIsInN0YXRlIiwib25BZGRCdXR0b25DbGljayIsIm9uQWRkTmV3Q2xpY2siLCJ0cmFuc2xhdGlvbnMiLCJpZEtleSIsInZhbHVlS2V5IiwiY2hpbGRLZXkiLCJkZWZhdWx0TmV3Tm9kZSIsImlucHV0Iiwic2VsZWN0IiwiZm9jdXMiLCJvbkRlbGV0ZUJ1dHRvbkNsaWNrIiwib25EZWxldGVDbGljayIsImlzQWRkRGlzYWJsZWQiLCJzZWxlY3RlZFRyZWVJdGVtIiwiZmluZCIsImNoaWxkSXRlbSIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJuZXh0UHJvcHMiLCJpbnB1dFZhbHVlIiwicmVuZGVyIiwiaWQiLCJvbkV4cGFuZEFsbENsaWNrIiwiZXhwYW5kQWxsIiwidHJlZVRpdGxlIiwicmVuYW1lIiwiYWRkIiwiZGVsZXRlIiwiUmVhY3QiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBR0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBRkE7OztBQUlBLElBQU1BLGNBQWNDLDJCQUFPQyxLQUFyQixrQkFDUTtBQUFBLFNBQVNDLE1BQU1DLEtBQU4sQ0FBWUMsZUFBckI7QUFBQSxDQURSLENBQU47O0FB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QSxRQUV1Q0MsU0FGdkMsVUFFdUNBLFNBRnZDOzs7QUFLUCxXQUNFO0FBQUMsZUFBRDtBQUFBLFFBQVcsUUFBUW5DLE1BQW5CO0FBQ0Usb0NBQUMsOENBQUQsSUFBaUIsV0FBV21DLFNBQTVCLEVBQXVDLFNBQVNELGdCQUFoRCxHQURGO0FBRUU7QUFBQyxvQ0FBRCxDQUFXLFFBQVg7QUFBQTtBQUFxQm5CLHFCQUFhcUI7QUFBbEMsT0FGRjtBQUdFO0FBQUMsZ0JBQUQ7QUFBQTtBQUNFO0FBQUMscUJBQUQ7QUFBQSxZQUFhLFNBQVlILEVBQVoscUJBQWI7QUFBZ0RsQix1QkFBYXNCO0FBQTdELFNBREY7QUFFRSxzQ0FBQyxXQUFEO0FBQ0Usb0JBQVUsS0FBSzlCLGFBRGpCO0FBRUUsY0FBTzBCLEVBQVAscUJBRkY7QUFHRSxpQkFBTyxLQUFLckIsS0FBTCxDQUFXRixLQUhwQjtBQUlFLG9CQUFVLENBQUMsNkNBQXlCLEtBQUtmLEtBQTlCLENBSmI7QUFLRSxvQkFBVSxrQkFBQ3lCLEtBQUQsRUFBVztBQUNuQixtQkFBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0Q7QUFQSCxVQUZGO0FBV0U7QUFBQyxnQkFBRDtBQUFBO0FBQ0UscUJBQVMsS0FBS1AsZ0JBRGhCO0FBRUUsc0JBQVUsS0FBS1ksYUFBTDtBQUZaO0FBSUdWLHVCQUFhdUI7QUFKaEIsU0FYRjtBQWlCRTtBQUFDLGdCQUFEO0FBQUE7QUFDRSxxQkFBUyxLQUFLZixtQkFEaEI7QUFFRSxzQkFBVSxDQUFDLDZDQUF5QixLQUFLNUIsS0FBOUI7QUFGYjtBQUlHb0IsdUJBQWF3QjtBQUpoQjtBQWpCRjtBQUhGLEtBREY7QUE4QkQsRzs7O0VBM0YwREMsZ0JBQU1DLGE7O2tCQUE5Q25DLCtCOzs7QUE2R3JCQSxnQ0FBZ0NvQyxZQUFoQyxHQUErQztBQUM3Q2hCLG9CQUFrQjtBQUQyQixDQUEvQyIsImZpbGUiOiJoaWVyYXJjaHktdHJlZS1zZWxlY3Rvci1jb250cm9sLWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IFByaW1pdGl2ZSB9IGZyb20gJ0BvcHVzY2FwaXRhL29jLWNtLWNvbW1vbi1sYXlvdXRzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHV1aWQgZnJvbSAndXVpZCc7XG5cbi8vIEFwcCBpbXBvcnRzXG5pbXBvcnQgeyBpc1NlbGVjdGVkVHJlZUl0ZW1QYXJlbnQgfSBmcm9tICcuL2hpZXJhcmNoeS10cmVlLnV0aWxzJztcbmltcG9ydCBFeHBhbmRBbGxUb2dnbGUgZnJvbSAnLi9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci1leHBhbmQtYWxsLXRvZ2dsZS5jb21wb25lbnQnO1xuXG5jb25zdCBSZW5hbWVMYWJlbCA9IHN0eWxlZC5sYWJlbGBcbiAgbWFyZ2luOiAwICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuaGFsZkd1dHRlcldpZHRofSAwIDA7XG5gO1xuXG5jb25zdCBDb250YWluZXIgPSBzdHlsZWQuZGl2YFxuICBoZWlnaHQ6ICR7cHJvcHMgPT4gcHJvcHMuaGVpZ2h0fTtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbmA7XG5cbmNvbnN0IEJ1dHRvbiA9IHN0eWxlZChQcmltaXRpdmUuQnV0dG9uKWBcbiAgbWFyZ2luLWxlZnQ6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuaGFsZkd1dHRlcldpZHRofTtcbiAgbWluLXdpZHRoOiAxMjBweDtcbmA7XG5cbmNvbnN0IENvbnRyb2xzID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gIG1hcmdpbi1yaWdodDogMDtcbmA7XG5cbmNvbnN0IFJlbmFtZUZpZWxkID0gc3R5bGVkKFByaW1pdGl2ZS5JbnB1dClgXG4gIG1pbi13aWR0aDogMjAwcHg7XG5gO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGllcmFyY2h5VHJlZVNlbGVjdG9yQ29udHJvbEJhciBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdmFsdWU6ICcnLFxuICAgIH07XG4gIH1cblxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdGVkVHJlZUl0ZW0gIT09IG5leHRQcm9wcy5zZWxlY3RlZFRyZWVJdGVtKSB7XG4gICAgICBjb25zdCBpbnB1dFZhbHVlID0gbmV4dFByb3BzLnNlbGVjdGVkVHJlZUl0ZW0gJiZcbiAgICAgIGlzU2VsZWN0ZWRUcmVlSXRlbVBhcmVudChuZXh0UHJvcHMpID9cbiAgICAgICAgbmV4dFByb3BzLnNlbGVjdGVkVHJlZUl0ZW1bbmV4dFByb3BzLnZhbHVlS2V5XSA6ICcnO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IHZhbHVlOiBpbnB1dFZhbHVlIH0pO1xuICAgIH1cbiAgfVxuXG4gIG9uSW5wdXRDaGFuZ2UgPSAoZSkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyB2YWx1ZTogZS50YXJnZXQudmFsdWUgfSwgKCkgPT4ge1xuICAgICAgdGhpcy5wcm9wcy5vbklucHV0Q2hhbmdlKHRoaXMuc3RhdGUudmFsdWUpO1xuICAgIH0pO1xuICB9O1xuXG4gIG9uQWRkQnV0dG9uQ2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgb25BZGROZXdDbGljaywgdHJhbnNsYXRpb25zLCBpZEtleSwgdmFsdWVLZXksIGNoaWxkS2V5LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgb25BZGROZXdDbGljayh7XG4gICAgICBbaWRLZXldOiB1dWlkKCksXG4gICAgICBbdmFsdWVLZXldOiB0cmFuc2xhdGlvbnMuZGVmYXVsdE5ld05vZGUsXG4gICAgICBbY2hpbGRLZXldOiBbXSxcbiAgICB9LCAoKSA9PiB7XG4gICAgICB0aGlzLmlucHV0LnNlbGVjdCgpO1xuICAgICAgdGhpcy5pbnB1dC5mb2N1cygpO1xuICAgIH0pO1xuICB9O1xuXG4gIG9uRGVsZXRlQnV0dG9uQ2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBvbkRlbGV0ZUNsaWNrIH0gPSB0aGlzLnByb3BzO1xuICAgIG9uRGVsZXRlQ2xpY2soKTtcbiAgfTtcblxuICAvKipcbiAgICogSXMgYWRkIGJ1dHRvbiBkaXNhYmxlZC4gQWRkIGJ1dHRvbiBpcyBkaXNhYmxlZCwgaWY6XG4gICAqIC0gc2VsZWN0ZWQgdHJlZSBub2RlIGlzIGEgbGVhZlxuICAgKiAtIGNvbnRhaW5zIGxlYWZzXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgaXNBZGREaXNhYmxlZCA9ICgpID0+IHtcbiAgICBjb25zdCB7IHNlbGVjdGVkVHJlZUl0ZW0sIGNoaWxkS2V5IH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghc2VsZWN0ZWRUcmVlSXRlbSkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiAhaXNTZWxlY3RlZFRyZWVJdGVtUGFyZW50KHRoaXMucHJvcHMpIHx8XG4gICAgICAhIXNlbGVjdGVkVHJlZUl0ZW1bY2hpbGRLZXldLmZpbmQoY2hpbGRJdGVtID0+ICFjaGlsZEl0ZW1bY2hpbGRLZXldKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgdHJhbnNsYXRpb25zLCBpZCwgaGVpZ2h0LCBvbkV4cGFuZEFsbENsaWNrLCBleHBhbmRBbGwsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPENvbnRhaW5lciBoZWlnaHQ9e2hlaWdodH0+XG4gICAgICAgIDxFeHBhbmRBbGxUb2dnbGUgZXhwYW5kQWxsPXtleHBhbmRBbGx9IG9uQ2xpY2s9e29uRXhwYW5kQWxsQ2xpY2t9IC8+XG4gICAgICAgIDxQcmltaXRpdmUuU3VidGl0bGU+e3RyYW5zbGF0aW9ucy50cmVlVGl0bGV9PC9QcmltaXRpdmUuU3VidGl0bGU+XG4gICAgICAgIDxDb250cm9scz5cbiAgICAgICAgICA8UmVuYW1lTGFiZWwgaHRtbEZvcj17YCR7aWR9LW5vZGUtbmFtZS1pbnB1dGB9Pnt0cmFuc2xhdGlvbnMucmVuYW1lfTwvUmVuYW1lTGFiZWw+XG4gICAgICAgICAgPFJlbmFtZUZpZWxkXG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbklucHV0Q2hhbmdlfVxuICAgICAgICAgICAgaWQ9e2Ake2lkfS1ub2RlLW5hbWUtaW5wdXRgfVxuICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUudmFsdWV9XG4gICAgICAgICAgICBkaXNhYmxlZD17IWlzU2VsZWN0ZWRUcmVlSXRlbVBhcmVudCh0aGlzLnByb3BzKX1cbiAgICAgICAgICAgIGlubmVyUmVmPXsoaW5wdXQpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5pbnB1dCA9IGlucHV0O1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25BZGRCdXR0b25DbGlja31cbiAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLmlzQWRkRGlzYWJsZWQoKX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7dHJhbnNsYXRpb25zLmFkZH1cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uRGVsZXRlQnV0dG9uQ2xpY2t9XG4gICAgICAgICAgICBkaXNhYmxlZD17IWlzU2VsZWN0ZWRUcmVlSXRlbVBhcmVudCh0aGlzLnByb3BzKX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7dHJhbnNsYXRpb25zLmRlbGV0ZX1cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgPC9Db250cm9scz5cbiAgICAgIDwvQ29udGFpbmVyPlxuICAgICk7XG4gIH1cbn1cblxuSGllcmFyY2h5VHJlZVNlbGVjdG9yQ29udHJvbEJhci5wcm9wVHlwZXMgPSB7XG4gIG9uQWRkTmV3Q2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG9uRGVsZXRlQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG9uSW5wdXRDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG9uRXhwYW5kQWxsQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGlkS2V5OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIHZhbHVlS2V5OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIGNoaWxkS2V5OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIHRyYW5zbGF0aW9uczogUHJvcFR5cGVzLnNoYXBlKHt9KS5pc1JlcXVpcmVkLFxuICBzZWxlY3RlZFRyZWVJdGVtOiBQcm9wVHlwZXMuc2hhcGUoe30pLFxuICBpZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBoZWlnaHQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgZXhwYW5kQWxsOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxufTtcblxuSGllcmFyY2h5VHJlZVNlbGVjdG9yQ29udHJvbEJhci5kZWZhdWx0UHJvcHMgPSB7XG4gIHNlbGVjdGVkVHJlZUl0ZW06IG51bGwsXG59O1xuXG4iXX0=