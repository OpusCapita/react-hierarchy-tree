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
      return !(0, _hierarchyTree.isSelectedTreeItemParent)(_this.props) || !!selectedTreeItem[childKey].find(function (childItem) {
        return !childItem[childKey];
      });
    };

    _this.isDeleteDisabled = function () {
      var singleRoot = _this.props.singleRoot;

      if (singleRoot && (0, _hierarchyTree.isSelectedTreeItemRoot)(_this.props)) return true;
      return !(0, _hierarchyTree.isSelectedTreeItemParent)(_this.props);
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
          ref: function ref(input) {
            _this2.input = input;
          },
          onKeyDown: this.onRenameFieldKeyDown
        }),
        _react2.default.createElement(
          Button,
          {
            onClick: this.onAddButtonClick,
            disabled: this.isAddDisabled(),
            type: 'button'
          },
          translations.add
        ),
        _react2.default.createElement(
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
}(_react2.default.PureComponent);

exports.default = HierarchyTreeSelectorControlBar;


HierarchyTreeSelectorControlBar.defaultProps = {
  selectedTreeItem: null
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci1jb250cm9sLWJhci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlbmFtZUxhYmVsIiwic3R5bGVkIiwibGFiZWwiLCJwcm9wcyIsInRoZW1lIiwiaGFsZkd1dHRlcldpZHRoIiwiQ29udGFpbmVyIiwiZGl2IiwiaGVpZ2h0IiwiQnV0dG9uIiwiUHJpbWl0aXZlIiwiQ29udHJvbHMiLCJSZW5hbWVGaWVsZCIsIklucHV0IiwiSGllcmFyY2h5VHJlZVNlbGVjdG9yQ29udHJvbEJhciIsIm9uSW5wdXRDaGFuZ2UiLCJlIiwic2V0U3RhdGUiLCJ2YWx1ZSIsInRhcmdldCIsInN0YXRlIiwib25BZGRCdXR0b25DbGljayIsIm9uQWRkTmV3Q2xpY2siLCJ0cmFuc2xhdGlvbnMiLCJpZEtleSIsInZhbHVlS2V5IiwiY2hpbGRLZXkiLCJkZWZhdWx0TmV3Tm9kZSIsInNldFRpbWVvdXQiLCJjb25zb2xlIiwibG9nIiwiaW5wdXQiLCJzZWxlY3QiLCJmb2N1cyIsIm9uRGVsZXRlQnV0dG9uQ2xpY2siLCJvbkRlbGV0ZUNsaWNrIiwib25SZW5hbWVGaWVsZEtleURvd24iLCJrZXlDb2RlIiwiYmx1ciIsImlzQWRkRGlzYWJsZWQiLCJzZWxlY3RlZFRyZWVJdGVtIiwic2luZ2xlUm9vdCIsImZpbmQiLCJjaGlsZEl0ZW0iLCJpc0RlbGV0ZURpc2FibGVkIiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsIm5leHRQcm9wcyIsImlucHV0VmFsdWUiLCJyZW5kZXIiLCJpZCIsInJlbmFtZSIsImFkZCIsImRlbGV0ZSIsIlJlYWN0IiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUdBOzs7Ozs7Ozs7Ozs7QUFEQTs7O0FBR0EsSUFBTUEsY0FBY0MsMkJBQU9DLEtBQXJCLGtCQUNRO0FB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QUFLa0IsYUFBTCxFQUZaO0FBR0Usa0JBQUs7QUFIUDtBQUtHaEIsdUJBQWE0QjtBQUxoQixTQWJGO0FBb0JFO0FBQUMsZ0JBQUQ7QUFBQTtBQUNFLHFCQUFTLEtBQUtqQixtQkFEaEI7QUFFRSxzQkFBVSxLQUFLVSxnQkFBTCxFQUZaO0FBR0Usa0JBQUs7QUFIUDtBQUtHckIsdUJBQWE2QjtBQUxoQjtBQXBCRjtBQURGLEtBREY7QUFnQ0QsRzs7O0VBekgwREMsZ0JBQU1DLGE7O2tCQUE5Q3hDLCtCOzs7QUEwSXJCQSxnQ0FBZ0N5QyxZQUFoQyxHQUErQztBQUM3Q2Ysb0JBQWtCO0FBRDJCLENBQS9DIiwiZmlsZSI6ImhpZXJhcmNoeS10cmVlLXNlbGVjdG9yLWNvbnRyb2wtYmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgUHJpbWl0aXZlIH0gZnJvbSAnQG9wdXNjYXBpdGEvb2MtY20tY29tbW9uLWxheW91dHMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgdXVpZCBmcm9tICd1dWlkJztcblxuLy8gQXBwIGltcG9ydHNcbmltcG9ydCB7IGlzU2VsZWN0ZWRUcmVlSXRlbVBhcmVudCwgaXNTZWxlY3RlZFRyZWVJdGVtUm9vdCB9IGZyb20gJy4vaGllcmFyY2h5LXRyZWUudXRpbHMnO1xuXG5jb25zdCBSZW5hbWVMYWJlbCA9IHN0eWxlZC5sYWJlbGBcbiAgbWFyZ2luOiAwICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuaGFsZkd1dHRlcldpZHRofSAwIDA7XG5gO1xuXG5jb25zdCBDb250YWluZXIgPSBzdHlsZWQuZGl2YFxuICBoZWlnaHQ6ICR7cHJvcHMgPT4gcHJvcHMuaGVpZ2h0fTtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbmA7XG5cbmNvbnN0IEJ1dHRvbiA9IHN0eWxlZChQcmltaXRpdmUuQnV0dG9uKWBcbiAgbWFyZ2luLWxlZnQ6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuaGFsZkd1dHRlcldpZHRofTtcbiAgbWluLXdpZHRoOiAxMjBweDtcbmA7XG5cbmNvbnN0IENvbnRyb2xzID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gIG1hcmdpbi1yaWdodDogMDtcbmA7XG5cbmNvbnN0IFJlbmFtZUZpZWxkID0gc3R5bGVkKFByaW1pdGl2ZS5JbnB1dClgXG4gIG1pbi13aWR0aDogMjAwcHg7XG5gO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGllcmFyY2h5VHJlZVNlbGVjdG9yQ29udHJvbEJhciBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdmFsdWU6ICcnLFxuICAgIH07XG4gIH1cblxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdGVkVHJlZUl0ZW0gIT09IG5leHRQcm9wcy5zZWxlY3RlZFRyZWVJdGVtKSB7XG4gICAgICBjb25zdCBpbnB1dFZhbHVlID0gbmV4dFByb3BzLnNlbGVjdGVkVHJlZUl0ZW0gJiZcbiAgICAgIGlzU2VsZWN0ZWRUcmVlSXRlbVBhcmVudChuZXh0UHJvcHMpID9cbiAgICAgICAgbmV4dFByb3BzLnNlbGVjdGVkVHJlZUl0ZW1bbmV4dFByb3BzLnZhbHVlS2V5XSA6ICcnO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IHZhbHVlOiBpbnB1dFZhbHVlIH0pO1xuICAgIH1cbiAgfVxuXG4gIG9uSW5wdXRDaGFuZ2UgPSAoZSkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyB2YWx1ZTogZS50YXJnZXQudmFsdWUgfSwgKCkgPT4ge1xuICAgICAgdGhpcy5wcm9wcy5vbklucHV0Q2hhbmdlKHRoaXMuc3RhdGUudmFsdWUpO1xuICAgIH0pO1xuICB9O1xuXG4gIG9uQWRkQnV0dG9uQ2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgb25BZGROZXdDbGljaywgdHJhbnNsYXRpb25zLCBpZEtleSwgdmFsdWVLZXksIGNoaWxkS2V5LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgb25BZGROZXdDbGljayh7XG4gICAgICBbaWRLZXldOiB1dWlkKCksXG4gICAgICBbdmFsdWVLZXldOiB0cmFuc2xhdGlvbnMuZGVmYXVsdE5ld05vZGUsXG4gICAgICBbY2hpbGRLZXldOiBbXSxcbiAgICB9LCAoKSA9PiB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ0hFUlJFJywgdGhpcy5pbnB1dClcblxuICAgICAgICB0aGlzLmlucHV0LnNlbGVjdCgpO1xuICAgICAgICB0aGlzLmlucHV0LmZvY3VzKCk7XG4gICAgICB9LCA1MCk7XG4gICAgfSk7XG4gIH07XG5cbiAgb25EZWxldGVCdXR0b25DbGljayA9ICgpID0+IHtcbiAgICBjb25zdCB7IG9uRGVsZXRlQ2xpY2sgfSA9IHRoaXMucHJvcHM7XG4gICAgb25EZWxldGVDbGljaygpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBCbHVyIG9uIGVudGVyIGtleSBwcmVzc1xuICAgKiBAcGFyYW0gZVxuICAgKi9cbiAgb25SZW5hbWVGaWVsZEtleURvd24gPSAoZSkgPT4ge1xuICAgIGlmIChlLmtleUNvZGUgPT09IDEzKSB0aGlzLmlucHV0LmJsdXIoKTtcbiAgfTtcblxuICAvKipcbiAgICogSXMgYWRkIGJ1dHRvbiBkaXNhYmxlZC4gQWRkIGJ1dHRvbiBpcyBkaXNhYmxlZCwgaWY6XG4gICAqIC0gc2VsZWN0ZWQgdHJlZSBub2RlIGlzIGEgbGVhZlxuICAgKiAtIGNvbnRhaW5zIGxlYWZzXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgaXNBZGREaXNhYmxlZCA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBzZWxlY3RlZFRyZWVJdGVtLCBjaGlsZEtleSwgc2luZ2xlUm9vdCxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIC8vIElmIG9ubHkgYSBzaW5nbGUgcm9vdCBpcyBhbGxvd2VkLCB3ZSBjYW4ndCBhZGQgbmV3IGl0ZW1zIGlmIG5vIGl0ZW1zIGFyZSBzZWxlY3RlZFxuICAgIGlmICghc2VsZWN0ZWRUcmVlSXRlbSkgcmV0dXJuIHNpbmdsZVJvb3Q7XG4gICAgcmV0dXJuICFpc1NlbGVjdGVkVHJlZUl0ZW1QYXJlbnQodGhpcy5wcm9wcykgfHxcbiAgICAgICEhc2VsZWN0ZWRUcmVlSXRlbVtjaGlsZEtleV0uZmluZChjaGlsZEl0ZW0gPT4gIWNoaWxkSXRlbVtjaGlsZEtleV0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBJcyBkZWxldGUgYnV0dG9uIGRpc2FibGVkLiBEZWxldGUgYnV0dG9uIGlzIGRpc2FibGVkLCBpZjpcbiAgICogLSBzaW5nbGUgcm9vdCBpcyBlbmFibGVkIGFuZCBzZWxlY3RlZCBpdGVtIGlzIGEgcm9vdFxuICAgKiAtIHNlbGVjdGVkIGl0ZW0gaXMgYSBsZWFmXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgaXNEZWxldGVEaXNhYmxlZCA9ICgpID0+IHtcbiAgICBjb25zdCB7IHNpbmdsZVJvb3QgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKHNpbmdsZVJvb3QgJiYgaXNTZWxlY3RlZFRyZWVJdGVtUm9vdCh0aGlzLnByb3BzKSkgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuICFpc1NlbGVjdGVkVHJlZUl0ZW1QYXJlbnQodGhpcy5wcm9wcyk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHRyYW5zbGF0aW9ucywgaWQsIGhlaWdodCxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiAoXG4gICAgICA8Q29udGFpbmVyIGhlaWdodD17aGVpZ2h0fT5cbiAgICAgICAgPENvbnRyb2xzPlxuICAgICAgICAgIDxSZW5hbWVMYWJlbCBodG1sRm9yPXtgJHtpZH0tbm9kZS1uYW1lLWlucHV0YH0+e3RyYW5zbGF0aW9ucy5yZW5hbWV9PC9SZW5hbWVMYWJlbD5cbiAgICAgICAgICA8UmVuYW1lRmllbGRcbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uSW5wdXRDaGFuZ2V9XG4gICAgICAgICAgICBpZD17YCR7aWR9LW5vZGUtbmFtZS1pbnB1dGB9XG4gICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX1cbiAgICAgICAgICAgIGRpc2FibGVkPXshaXNTZWxlY3RlZFRyZWVJdGVtUGFyZW50KHRoaXMucHJvcHMpfVxuICAgICAgICAgICAgcmVmPXsoaW5wdXQpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5pbnB1dCA9IGlucHV0O1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5vblJlbmFtZUZpZWxkS2V5RG93bn1cbiAgICAgICAgICAvPlxuXG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkFkZEJ1dHRvbkNsaWNrfVxuICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuaXNBZGREaXNhYmxlZCgpfVxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAge3RyYW5zbGF0aW9ucy5hZGR9XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkRlbGV0ZUJ1dHRvbkNsaWNrfVxuICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuaXNEZWxldGVEaXNhYmxlZCgpfVxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAge3RyYW5zbGF0aW9ucy5kZWxldGV9XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDwvQ29udHJvbHM+XG4gICAgICA8L0NvbnRhaW5lcj5cbiAgICApO1xuICB9XG59XG5cbkhpZXJhcmNoeVRyZWVTZWxlY3RvckNvbnRyb2xCYXIucHJvcFR5cGVzID0ge1xuICBvbkFkZE5ld0NsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBvbkRlbGV0ZUNsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBvbklucHV0Q2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBpZEtleTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICB2YWx1ZUtleTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBjaGlsZEtleTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICB0cmFuc2xhdGlvbnM6IFByb3BUeXBlcy5zaGFwZSh7fSkuaXNSZXF1aXJlZCxcbiAgc2VsZWN0ZWRUcmVlSXRlbTogUHJvcFR5cGVzLnNoYXBlKHt9KSxcbiAgaWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgaGVpZ2h0OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIHNpbmdsZVJvb3Q6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG59O1xuXG5IaWVyYXJjaHlUcmVlU2VsZWN0b3JDb250cm9sQmFyLmRlZmF1bHRQcm9wcyA9IHtcbiAgc2VsZWN0ZWRUcmVlSXRlbTogbnVsbCxcbn07XG5cbiJdfQ==