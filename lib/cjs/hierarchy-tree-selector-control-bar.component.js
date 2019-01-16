'use strict';

exports.__esModule = true;
exports.default = undefined;

var _templateObject = _taggedTemplateLiteralLoose(['\n  margin: 0 ', ' 0 0;\n  white-space: nowrap;\n'], ['\n  margin: 0 ', ' 0 0;\n  white-space: nowrap;\n']),
    _templateObject2 = _taggedTemplateLiteralLoose(['\n  height: ', ';\n  display: flex;\n  align-items: center;\n'], ['\n  height: ', ';\n  display: flex;\n  align-items: center;\n']),
    _templateObject3 = _taggedTemplateLiteralLoose(['\n  margin-left: ', ';\n  min-width: 120px;\n'], ['\n  margin-left: ', ';\n  min-width: 120px;\n']),
    _templateObject4 = _taggedTemplateLiteralLoose(['\n  display: flex;\n  align-items: center;\n  margin-left: auto;\n  margin-right: 0;\n'], ['\n  display: flex;\n  align-items: center;\n  margin-left: auto;\n  margin-right: 0;\n']),
    _templateObject5 = _taggedTemplateLiteralLoose(['\n  min-width: 200px;\n  margin-right: 4rem;\n'], ['\n  min-width: 200px;\n  margin-right: 4rem;\n']);

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

      if (!_this.props.selectedTreeItem) return true;
      return !!(singleRoot && (0, _hierarchyTree.isSelectedTreeItemRoot)(_this.props));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci1jb250cm9sLWJhci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlbmFtZUxhYmVsIiwic3R5bGVkIiwibGFiZWwiLCJwcm9wcyIsInRoZW1lIiwiaGFsZkd1dHRlcldpZHRoIiwiQ29udGFpbmVyIiwiZGl2IiwiaGVpZ2h0IiwiQnV0dG9uIiwiUHJpbWl0aXZlIiwiQ29udHJvbHMiLCJSZW5hbWVGaWVsZCIsIklucHV0IiwiSGllcmFyY2h5VHJlZVNlbGVjdG9yQ29udHJvbEJhciIsIm9uSW5wdXRDaGFuZ2UiLCJlIiwic2V0U3RhdGUiLCJ2YWx1ZSIsInRhcmdldCIsInN0YXRlIiwib25BZGRCdXR0b25DbGljayIsIm9uQWRkTmV3Q2xpY2siLCJ0cmFuc2xhdGlvbnMiLCJpZEtleSIsInZhbHVlS2V5IiwiY2hpbGRLZXkiLCJkZWZhdWx0TmV3Tm9kZSIsInNldFRpbWVvdXQiLCJjb25zb2xlIiwibG9nIiwiaW5wdXQiLCJzZWxlY3QiLCJmb2N1cyIsIm9uRGVsZXRlQnV0dG9uQ2xpY2siLCJvbkRlbGV0ZUNsaWNrIiwib25SZW5hbWVGaWVsZEtleURvd24iLCJrZXlDb2RlIiwiYmx1ciIsImlzQWRkRGlzYWJsZWQiLCJzZWxlY3RlZFRyZWVJdGVtIiwic2luZ2xlUm9vdCIsImZpbmQiLCJjaGlsZEl0ZW0iLCJpc0RlbGV0ZURpc2FibGVkIiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsIm5leHRQcm9wcyIsImlucHV0VmFsdWUiLCJyZW5kZXIiLCJpZCIsInJlbmFtZSIsImFkZCIsImRlbGV0ZSIsIlJlYWN0IiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUdBOzs7Ozs7Ozs7Ozs7QUFEQTs7O0FBR0EsSUFBTUEsY0FBY0MsMkJBQU9DLEtBQXJCLGtCQUNRO0FB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QURoQjtBQUVFLHNCQUFVLEtBQUtrQixhQUFMLEVBRlo7QUFHRSxrQkFBSztBQUhQO0FBS0doQix1QkFBYTRCO0FBTGhCLFNBYkY7QUFvQkU7QUFBQyxnQkFBRDtBQUFBO0FBQ0UscUJBQVMsS0FBS2pCLG1CQURoQjtBQUVFLHNCQUFVLEtBQUtVLGdCQUFMLEVBRlo7QUFHRSxrQkFBSztBQUhQO0FBS0dyQix1QkFBYTZCO0FBTGhCO0FBcEJGO0FBREYsS0FERjtBQWdDRCxHOzs7RUF6SDBEQyxnQkFBTUMsYTs7a0JBQTlDeEMsK0I7OztBQTBJckJBLGdDQUFnQ3lDLFlBQWhDLEdBQStDO0FBQzdDZixvQkFBa0I7QUFEMkIsQ0FBL0MiLCJmaWxlIjoiaGllcmFyY2h5LXRyZWUtc2VsZWN0b3ItY29udHJvbC1iYXIuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBQcmltaXRpdmUgfSBmcm9tICdAb3B1c2NhcGl0YS9vYy1jbS1jb21tb24tbGF5b3V0cyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCB1dWlkIGZyb20gJ3V1aWQnO1xuXG4vLyBBcHAgaW1wb3J0c1xuaW1wb3J0IHsgaXNTZWxlY3RlZFRyZWVJdGVtUGFyZW50LCBpc1NlbGVjdGVkVHJlZUl0ZW1Sb290IH0gZnJvbSAnLi9oaWVyYXJjaHktdHJlZS51dGlscyc7XG5cbmNvbnN0IFJlbmFtZUxhYmVsID0gc3R5bGVkLmxhYmVsYFxuICBtYXJnaW46IDAgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5oYWxmR3V0dGVyV2lkdGh9IDAgMDtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbmA7XG5cbmNvbnN0IENvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gIGhlaWdodDogJHtwcm9wcyA9PiBwcm9wcy5oZWlnaHR9O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuYDtcblxuY29uc3QgQnV0dG9uID0gc3R5bGVkKFByaW1pdGl2ZS5CdXR0b24pYFxuICBtYXJnaW4tbGVmdDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5oYWxmR3V0dGVyV2lkdGh9O1xuICBtaW4td2lkdGg6IDEyMHB4O1xuYDtcblxuY29uc3QgQ29udHJvbHMgPSBzdHlsZWQuZGl2YFxuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBtYXJnaW4tbGVmdDogYXV0bztcbiAgbWFyZ2luLXJpZ2h0OiAwO1xuYDtcblxuY29uc3QgUmVuYW1lRmllbGQgPSBzdHlsZWQoUHJpbWl0aXZlLklucHV0KWBcbiAgbWluLXdpZHRoOiAyMDBweDtcbiAgbWFyZ2luLXJpZ2h0OiA0cmVtO1xuYDtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhpZXJhcmNoeVRyZWVTZWxlY3RvckNvbnRyb2xCYXIgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHZhbHVlOiAnJyxcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RlZFRyZWVJdGVtICE9PSBuZXh0UHJvcHMuc2VsZWN0ZWRUcmVlSXRlbSkge1xuICAgICAgY29uc3QgaW5wdXRWYWx1ZSA9IG5leHRQcm9wcy5zZWxlY3RlZFRyZWVJdGVtICYmXG4gICAgICBpc1NlbGVjdGVkVHJlZUl0ZW1QYXJlbnQobmV4dFByb3BzKSA/XG4gICAgICAgIG5leHRQcm9wcy5zZWxlY3RlZFRyZWVJdGVtW25leHRQcm9wcy52YWx1ZUtleV0gOiAnJztcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyB2YWx1ZTogaW5wdXRWYWx1ZSB9KTtcbiAgICB9XG4gIH1cblxuICBvbklucHV0Q2hhbmdlID0gKGUpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgdmFsdWU6IGUudGFyZ2V0LnZhbHVlIH0sICgpID0+IHtcbiAgICAgIHRoaXMucHJvcHMub25JbnB1dENoYW5nZSh0aGlzLnN0YXRlLnZhbHVlKTtcbiAgICB9KTtcbiAgfTtcblxuICBvbkFkZEJ1dHRvbkNsaWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIG9uQWRkTmV3Q2xpY2ssIHRyYW5zbGF0aW9ucywgaWRLZXksIHZhbHVlS2V5LCBjaGlsZEtleSxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIG9uQWRkTmV3Q2xpY2soe1xuICAgICAgW2lkS2V5XTogdXVpZCgpLFxuICAgICAgW3ZhbHVlS2V5XTogdHJhbnNsYXRpb25zLmRlZmF1bHROZXdOb2RlLFxuICAgICAgW2NoaWxkS2V5XTogW10sXG4gICAgfSwgKCkgPT4ge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdIRVJSRScsIHRoaXMuaW5wdXQpXG5cbiAgICAgICAgdGhpcy5pbnB1dC5zZWxlY3QoKTtcbiAgICAgICAgdGhpcy5pbnB1dC5mb2N1cygpO1xuICAgICAgfSwgNTApO1xuICAgIH0pO1xuICB9O1xuXG4gIG9uRGVsZXRlQnV0dG9uQ2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBvbkRlbGV0ZUNsaWNrIH0gPSB0aGlzLnByb3BzO1xuICAgIG9uRGVsZXRlQ2xpY2soKTtcbiAgfTtcblxuICAvKipcbiAgICogQmx1ciBvbiBlbnRlciBrZXkgcHJlc3NcbiAgICogQHBhcmFtIGVcbiAgICovXG4gIG9uUmVuYW1lRmllbGRLZXlEb3duID0gKGUpID0+IHtcbiAgICBpZiAoZS5rZXlDb2RlID09PSAxMykgdGhpcy5pbnB1dC5ibHVyKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIElzIGFkZCBidXR0b24gZGlzYWJsZWQuIEFkZCBidXR0b24gaXMgZGlzYWJsZWQsIGlmOlxuICAgKiAtIHNlbGVjdGVkIHRyZWUgbm9kZSBpcyBhIGxlYWZcbiAgICogLSBjb250YWlucyBsZWFmc1xuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIGlzQWRkRGlzYWJsZWQgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgc2VsZWN0ZWRUcmVlSXRlbSwgY2hpbGRLZXksIHNpbmdsZVJvb3QsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAvLyBJZiBvbmx5IGEgc2luZ2xlIHJvb3QgaXMgYWxsb3dlZCwgd2UgY2FuJ3QgYWRkIG5ldyBpdGVtcyBpZiBubyBpdGVtcyBhcmUgc2VsZWN0ZWRcbiAgICBpZiAoIXNlbGVjdGVkVHJlZUl0ZW0pIHJldHVybiBzaW5nbGVSb290O1xuICAgIHJldHVybiAhaXNTZWxlY3RlZFRyZWVJdGVtUGFyZW50KHRoaXMucHJvcHMpIHx8XG4gICAgICAhIXNlbGVjdGVkVHJlZUl0ZW1bY2hpbGRLZXldLmZpbmQoY2hpbGRJdGVtID0+ICFjaGlsZEl0ZW1bY2hpbGRLZXldKTtcbiAgfTtcblxuICAvKipcbiAgICogSXMgZGVsZXRlIGJ1dHRvbiBkaXNhYmxlZC4gRGVsZXRlIGJ1dHRvbiBpcyBkaXNhYmxlZCwgaWY6XG4gICAqIC0gc2luZ2xlIHJvb3QgaXMgZW5hYmxlZCBhbmQgc2VsZWN0ZWQgaXRlbSBpcyBhIHJvb3RcbiAgICogLSBzZWxlY3RlZCBpdGVtIGlzIGEgbGVhZlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIGlzRGVsZXRlRGlzYWJsZWQgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBzaW5nbGVSb290IH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghdGhpcy5wcm9wcy5zZWxlY3RlZFRyZWVJdGVtKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gISEoc2luZ2xlUm9vdCAmJiBpc1NlbGVjdGVkVHJlZUl0ZW1Sb290KHRoaXMucHJvcHMpKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgdHJhbnNsYXRpb25zLCBpZCwgaGVpZ2h0LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxDb250YWluZXIgaGVpZ2h0PXtoZWlnaHR9PlxuICAgICAgICA8Q29udHJvbHM+XG4gICAgICAgICAgPFJlbmFtZUxhYmVsIGh0bWxGb3I9e2Ake2lkfS1ub2RlLW5hbWUtaW5wdXRgfT57dHJhbnNsYXRpb25zLnJlbmFtZX08L1JlbmFtZUxhYmVsPlxuICAgICAgICAgIDxSZW5hbWVGaWVsZFxuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25JbnB1dENoYW5nZX1cbiAgICAgICAgICAgIGlkPXtgJHtpZH0tbm9kZS1uYW1lLWlucHV0YH1cbiAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnZhbHVlfVxuICAgICAgICAgICAgZGlzYWJsZWQ9eyFpc1NlbGVjdGVkVHJlZUl0ZW1QYXJlbnQodGhpcy5wcm9wcyl9XG4gICAgICAgICAgICByZWY9eyhpbnB1dCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLm9uUmVuYW1lRmllbGRLZXlEb3dufVxuICAgICAgICAgIC8+XG5cbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQWRkQnV0dG9uQ2xpY2t9XG4gICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5pc0FkZERpc2FibGVkKCl9XG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICB7dHJhbnNsYXRpb25zLmFkZH1cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uRGVsZXRlQnV0dG9uQ2xpY2t9XG4gICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5pc0RlbGV0ZURpc2FibGVkKCl9XG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICB7dHJhbnNsYXRpb25zLmRlbGV0ZX1cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgPC9Db250cm9scz5cbiAgICAgIDwvQ29udGFpbmVyPlxuICAgICk7XG4gIH1cbn1cblxuSGllcmFyY2h5VHJlZVNlbGVjdG9yQ29udHJvbEJhci5wcm9wVHlwZXMgPSB7XG4gIG9uQWRkTmV3Q2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG9uRGVsZXRlQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG9uSW5wdXRDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGlkS2V5OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIHZhbHVlS2V5OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIGNoaWxkS2V5OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIHRyYW5zbGF0aW9uczogUHJvcFR5cGVzLnNoYXBlKHt9KS5pc1JlcXVpcmVkLFxuICBzZWxlY3RlZFRyZWVJdGVtOiBQcm9wVHlwZXMuc2hhcGUoe30pLFxuICBpZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBoZWlnaHQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgc2luZ2xlUm9vdDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbn07XG5cbkhpZXJhcmNoeVRyZWVTZWxlY3RvckNvbnRyb2xCYXIuZGVmYXVsdFByb3BzID0ge1xuICBzZWxlY3RlZFRyZWVJdGVtOiBudWxsLFxufTtcblxuIl19