'use strict';

exports.__esModule = true;
exports.default = undefined;

var _templateObject = _taggedTemplateLiteralLoose(['\n  flex: 1 1 100%;\n'], ['\n  flex: 1 1 100%;\n']),
    _templateObject2 = _taggedTemplateLiteralLoose(['\n  margin: 0 ', ' 0 0;\n'], ['\n  margin: 0 ', ' 0 0;\n']),
    _templateObject3 = _taggedTemplateLiteralLoose(['\n  height: ', ';\n  display: flex;\n  align-items: center;\n'], ['\n  height: ', ';\n  display: flex;\n  align-items: center;\n']),
    _templateObject4 = _taggedTemplateLiteralLoose(['\n  margin-left: ', ';\n  min-width: 120px;\n'], ['\n  margin-left: ', ';\n  min-width: 120px;\n']),
    _templateObject5 = _taggedTemplateLiteralLoose(['\n  display: flex;\n  align-items: center;\n'], ['\n  display: flex;\n  align-items: center;\n']),
    _templateObject6 = _taggedTemplateLiteralLoose(['\n  min-width: 200px;\n'], ['\n  min-width: 200px;\n']);

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


var Title = (0, _styledComponents2.default)(_ocCmCommonLayouts.Primitive.Subtitle)(_templateObject);

var RenameLabel = _styledComponents2.default.label(_templateObject2, function (props) {
  return props.theme.halfGutterWidth;
});

var Container = _styledComponents2.default.div(_templateObject3, function (props) {
  return props.height;
});

var Button = (0, _styledComponents2.default)(_ocCmCommonLayouts.Primitive.Button)(_templateObject4, function (props) {
  return props.theme.halfGutterWidth;
});

var Controls = _styledComponents2.default.div(_templateObject5);

var RenameField = (0, _styledComponents2.default)(_ocCmCommonLayouts.Primitive.Input)(_templateObject6);

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
      var inputValue = nextProps.selectedTreeItem ? nextProps.selectedTreeItem[nextProps.valueKey] : '';
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
        height = _props.height;


    return _react2.default.createElement(
      Container,
      { height: height },
      _react2.default.createElement(
        Title,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci1jb250cm9sLWJhci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlRpdGxlIiwiUHJpbWl0aXZlIiwiU3VidGl0bGUiLCJSZW5hbWVMYWJlbCIsInN0eWxlZCIsImxhYmVsIiwicHJvcHMiLCJ0aGVtZSIsImhhbGZHdXR0ZXJXaWR0aCIsIkNvbnRhaW5lciIsImRpdiIsImhlaWdodCIsIkJ1dHRvbiIsIkNvbnRyb2xzIiwiUmVuYW1lRmllbGQiLCJJbnB1dCIsIkhpZXJhcmNoeVRyZWVTZWxlY3RvckNvbnRyb2xCYXIiLCJvbklucHV0Q2hhbmdlIiwiZSIsInNldFN0YXRlIiwidmFsdWUiLCJ0YXJnZXQiLCJzdGF0ZSIsIm9uQWRkQnV0dG9uQ2xpY2siLCJvbkFkZE5ld0NsaWNrIiwidHJhbnNsYXRpb25zIiwiaWRLZXkiLCJ2YWx1ZUtleSIsImNoaWxkS2V5IiwiZGVmYXVsdE5ld05vZGUiLCJpbnB1dCIsInNlbGVjdCIsImZvY3VzIiwib25EZWxldGVCdXR0b25DbGljayIsIm9uRGVsZXRlQ2xpY2siLCJpc0FkZERpc2FibGVkIiwic2VsZWN0ZWRUcmVlSXRlbSIsImZpbmQiLCJjaGlsZEl0ZW0iLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwibmV4dFByb3BzIiwiaW5wdXRWYWx1ZSIsInJlbmRlciIsImlkIiwidHJlZVRpdGxlIiwicmVuYW1lIiwiYWRkIiwiZGVsZXRlIiwiUmVhY3QiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUdBOzs7Ozs7Ozs7Ozs7QUFEQTs7O0FBR0EsSUFBTUEsUUFBUSxnQ0FBT0MsNkJBQVVDLFFBQWpCLENBQVIsaUJBQU47O0FBSUEsSUFBTUMsY0FBY0MsMkJBQU9DLEtBQXJCLG1CQUNRO0FBQUEsU0FBU0MsTUFBTUMsS0FBTixD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LE1BQW5CO0FBQ0U7QUFBQyxhQUFEO0FBQUE7QUFBUWMscUJBQWFtQjtBQUFyQixPQURGO0FBRUU7QUFBQyxnQkFBRDtBQUFBO0FBQ0U7QUFBQyxxQkFBRDtBQUFBLFlBQWEsU0FBWUQsRUFBWixxQkFBYjtBQUFnRGxCLHVCQUFhb0I7QUFBN0QsU0FERjtBQUVFLHNDQUFDLFdBQUQ7QUFDRSxvQkFBVSxLQUFLNUIsYUFEakI7QUFFRSxjQUFPMEIsRUFBUCxxQkFGRjtBQUdFLGlCQUFPLEtBQUtyQixLQUFMLENBQVdGLEtBSHBCO0FBSUUsb0JBQVUsQ0FBQyw2Q0FBeUIsS0FBS2QsS0FBOUIsQ0FKYjtBQUtFLG9CQUFVLGtCQUFDd0IsS0FBRCxFQUFXO0FBQ25CLG1CQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDRDtBQVBILFVBRkY7QUFXRTtBQUFDLGdCQUFEO0FBQUE7QUFDRSxxQkFBUyxLQUFLUCxnQkFEaEI7QUFFRSxzQkFBVSxLQUFLWSxhQUFMO0FBRlo7QUFJR1YsdUJBQWFxQjtBQUpoQixTQVhGO0FBaUJFO0FBQUMsZ0JBQUQ7QUFBQTtBQUNFLHFCQUFTLEtBQUtiLG1CQURoQjtBQUVFLHNCQUFVLENBQUMsNkNBQXlCLEtBQUszQixLQUE5QjtBQUZiO0FBSUdtQix1QkFBYXNCO0FBSmhCO0FBakJGO0FBRkYsS0FERjtBQTZCRCxHOzs7RUF6RjBEQyxnQkFBTUMsYTs7a0JBQTlDakMsK0I7OztBQXlHckJBLGdDQUFnQ2tDLFlBQWhDLEdBQStDO0FBQzdDZCxvQkFBa0I7QUFEMkIsQ0FBL0MiLCJmaWxlIjoiaGllcmFyY2h5LXRyZWUtc2VsZWN0b3ItY29udHJvbC1iYXIuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBQcmltaXRpdmUgfSBmcm9tICdAb3B1c2NhcGl0YS9vYy1jbS1jb21tb24tbGF5b3V0cyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCB1dWlkIGZyb20gJ3V1aWQnO1xuXG4vLyBBcHAgaW1wb3J0c1xuaW1wb3J0IHsgaXNTZWxlY3RlZFRyZWVJdGVtUGFyZW50IH0gZnJvbSAnLi9oaWVyYXJjaHktdHJlZS51dGlscyc7XG5cbmNvbnN0IFRpdGxlID0gc3R5bGVkKFByaW1pdGl2ZS5TdWJ0aXRsZSlgXG4gIGZsZXg6IDEgMSAxMDAlO1xuYDtcblxuY29uc3QgUmVuYW1lTGFiZWwgPSBzdHlsZWQubGFiZWxgXG4gIG1hcmdpbjogMCAke3Byb3BzID0+IHByb3BzLnRoZW1lLmhhbGZHdXR0ZXJXaWR0aH0gMCAwO1xuYDtcblxuY29uc3QgQ29udGFpbmVyID0gc3R5bGVkLmRpdmBcbiAgaGVpZ2h0OiAke3Byb3BzID0+IHByb3BzLmhlaWdodH07XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5gO1xuXG5jb25zdCBCdXR0b24gPSBzdHlsZWQoUHJpbWl0aXZlLkJ1dHRvbilgXG4gIG1hcmdpbi1sZWZ0OiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmhhbGZHdXR0ZXJXaWR0aH07XG4gIG1pbi13aWR0aDogMTIwcHg7XG5gO1xuXG5jb25zdCBDb250cm9scyA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5gO1xuXG5jb25zdCBSZW5hbWVGaWVsZCA9IHN0eWxlZChQcmltaXRpdmUuSW5wdXQpYFxuICBtaW4td2lkdGg6IDIwMHB4O1xuYDtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhpZXJhcmNoeVRyZWVTZWxlY3RvckNvbnRyb2xCYXIgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHZhbHVlOiAnJyxcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RlZFRyZWVJdGVtICE9PSBuZXh0UHJvcHMuc2VsZWN0ZWRUcmVlSXRlbSkge1xuICAgICAgY29uc3QgaW5wdXRWYWx1ZSA9IG5leHRQcm9wcy5zZWxlY3RlZFRyZWVJdGVtID9cbiAgICAgICAgbmV4dFByb3BzLnNlbGVjdGVkVHJlZUl0ZW1bbmV4dFByb3BzLnZhbHVlS2V5XSA6ICcnO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IHZhbHVlOiBpbnB1dFZhbHVlIH0pO1xuICAgIH1cbiAgfVxuXG4gIG9uSW5wdXRDaGFuZ2UgPSAoZSkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyB2YWx1ZTogZS50YXJnZXQudmFsdWUgfSwgKCkgPT4ge1xuICAgICAgdGhpcy5wcm9wcy5vbklucHV0Q2hhbmdlKHRoaXMuc3RhdGUudmFsdWUpO1xuICAgIH0pO1xuICB9O1xuXG4gIG9uQWRkQnV0dG9uQ2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgb25BZGROZXdDbGljaywgdHJhbnNsYXRpb25zLCBpZEtleSwgdmFsdWVLZXksIGNoaWxkS2V5LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgb25BZGROZXdDbGljayh7XG4gICAgICBbaWRLZXldOiB1dWlkKCksXG4gICAgICBbdmFsdWVLZXldOiB0cmFuc2xhdGlvbnMuZGVmYXVsdE5ld05vZGUsXG4gICAgICBbY2hpbGRLZXldOiBbXSxcbiAgICB9LCAoKSA9PiB7XG4gICAgICB0aGlzLmlucHV0LnNlbGVjdCgpO1xuICAgICAgdGhpcy5pbnB1dC5mb2N1cygpO1xuICAgIH0pO1xuICB9O1xuXG4gIG9uRGVsZXRlQnV0dG9uQ2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBvbkRlbGV0ZUNsaWNrIH0gPSB0aGlzLnByb3BzO1xuICAgIG9uRGVsZXRlQ2xpY2soKTtcbiAgfTtcblxuICAvKipcbiAgICogSXMgYWRkIGJ1dHRvbiBkaXNhYmxlZC4gQWRkIGJ1dHRvbiBpcyBkaXNhYmxlZCwgaWY6XG4gICAqIC0gc2VsZWN0ZWQgdHJlZSBub2RlIGlzIGEgbGVhZlxuICAgKiAtIGNvbnRhaW5zIGxlYWZzXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgaXNBZGREaXNhYmxlZCA9ICgpID0+IHtcbiAgICBjb25zdCB7IHNlbGVjdGVkVHJlZUl0ZW0sIGNoaWxkS2V5IH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghc2VsZWN0ZWRUcmVlSXRlbSkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiAhaXNTZWxlY3RlZFRyZWVJdGVtUGFyZW50KHRoaXMucHJvcHMpIHx8XG4gICAgICAhIXNlbGVjdGVkVHJlZUl0ZW1bY2hpbGRLZXldLmZpbmQoY2hpbGRJdGVtID0+ICFjaGlsZEl0ZW1bY2hpbGRLZXldKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgdHJhbnNsYXRpb25zLCBpZCwgaGVpZ2h0LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxDb250YWluZXIgaGVpZ2h0PXtoZWlnaHR9PlxuICAgICAgICA8VGl0bGU+e3RyYW5zbGF0aW9ucy50cmVlVGl0bGV9PC9UaXRsZT5cbiAgICAgICAgPENvbnRyb2xzPlxuICAgICAgICAgIDxSZW5hbWVMYWJlbCBodG1sRm9yPXtgJHtpZH0tbm9kZS1uYW1lLWlucHV0YH0+e3RyYW5zbGF0aW9ucy5yZW5hbWV9PC9SZW5hbWVMYWJlbD5cbiAgICAgICAgICA8UmVuYW1lRmllbGRcbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uSW5wdXRDaGFuZ2V9XG4gICAgICAgICAgICBpZD17YCR7aWR9LW5vZGUtbmFtZS1pbnB1dGB9XG4gICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX1cbiAgICAgICAgICAgIGRpc2FibGVkPXshaXNTZWxlY3RlZFRyZWVJdGVtUGFyZW50KHRoaXMucHJvcHMpfVxuICAgICAgICAgICAgaW5uZXJSZWY9eyhpbnB1dCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkFkZEJ1dHRvbkNsaWNrfVxuICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuaXNBZGREaXNhYmxlZCgpfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHt0cmFuc2xhdGlvbnMuYWRkfVxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25EZWxldGVCdXR0b25DbGlja31cbiAgICAgICAgICAgIGRpc2FibGVkPXshaXNTZWxlY3RlZFRyZWVJdGVtUGFyZW50KHRoaXMucHJvcHMpfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHt0cmFuc2xhdGlvbnMuZGVsZXRlfVxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICA8L0NvbnRyb2xzPlxuICAgICAgPC9Db250YWluZXI+XG4gICAgKTtcbiAgfVxufVxuXG5IaWVyYXJjaHlUcmVlU2VsZWN0b3JDb250cm9sQmFyLnByb3BUeXBlcyA9IHtcbiAgb25BZGROZXdDbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgb25EZWxldGVDbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgb25JbnB1dENoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgaWRLZXk6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgdmFsdWVLZXk6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgY2hpbGRLZXk6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgdHJhbnNsYXRpb25zOiBQcm9wVHlwZXMuc2hhcGUoe30pLmlzUmVxdWlyZWQsXG4gIHNlbGVjdGVkVHJlZUl0ZW06IFByb3BUeXBlcy5zaGFwZSh7fSksXG4gIGlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIGhlaWdodDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxufTtcblxuSGllcmFyY2h5VHJlZVNlbGVjdG9yQ29udHJvbEJhci5kZWZhdWx0UHJvcHMgPSB7XG4gIHNlbGVjdGVkVHJlZUl0ZW06IG51bGwsXG59O1xuXG4iXX0=