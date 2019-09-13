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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci1jb250cm9sLWJhci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlbmFtZUxhYmVsIiwic3R5bGVkIiwibGFiZWwiLCJwcm9wcyIsInRoZW1lIiwiaGFsZkd1dHRlcldpZHRoIiwiQ29udGFpbmVyIiwiZGl2IiwiaGVpZ2h0IiwiQnV0dG9uIiwiUHJpbWl0aXZlIiwiQ29udHJvbHMiLCJSZW5hbWVGaWVsZCIsIklucHV0IiwiSGllcmFyY2h5VHJlZVNlbGVjdG9yQ29udHJvbEJhciIsIm9uSW5wdXRDaGFuZ2UiLCJlIiwic2V0U3RhdGUiLCJ2YWx1ZSIsInRhcmdldCIsInN0YXRlIiwib25BZGRCdXR0b25DbGljayIsIm9uQWRkTmV3Q2xpY2siLCJ0cmFuc2xhdGlvbnMiLCJpZEtleSIsInZhbHVlS2V5IiwiY2hpbGRLZXkiLCJkZWZhdWx0TmV3Tm9kZSIsInNldFRpbWVvdXQiLCJpbnB1dCIsInNlbGVjdCIsImZvY3VzIiwib25EZWxldGVCdXR0b25DbGljayIsIm9uRGVsZXRlQ2xpY2siLCJvblJlbmFtZUZpZWxkS2V5RG93biIsImtleUNvZGUiLCJibHVyIiwiaXNBZGREaXNhYmxlZCIsInNlbGVjdGVkVHJlZUl0ZW0iLCJzaW5nbGVSb290IiwiZmluZCIsImNoaWxkSXRlbSIsImlzRGVsZXRlRGlzYWJsZWQiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwibmV4dFByb3BzIiwiaW5wdXRWYWx1ZSIsInJlbmRlciIsImlkIiwicmVuYW1lIiwiYWRkIiwiZGVsZXRlIiwiUmVhY3QiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBR0E7Ozs7Ozs7Ozs7OztBQURBOzs7QUFHQSxJQUFNQSxjQUFjQywyQkFBT0MsS0FBckIsa0JBQ1E7QUFBQSxTQUFTQyxNQUFNQyxL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TGhCLFNBYkY7QUFvQkU7QUFBQyxnQkFBRDtBQUFBO0FBQ0UscUJBQVMsS0FBS2pCLG1CQURoQjtBQUVFLHNCQUFVLEtBQUtVLGdCQUFMLEVBRlo7QUFHRSxrQkFBSztBQUhQO0FBS0duQix1QkFBYTJCO0FBTGhCO0FBcEJGO0FBREYsS0FERjtBQWdDRCxHOzs7RUF2SDBEQyxnQkFBTUMsYTs7a0JBQTlDdEMsK0I7OztBQXdJckJBLGdDQUFnQ3VDLFlBQWhDLEdBQStDO0FBQzdDZixvQkFBa0I7QUFEMkIsQ0FBL0MiLCJmaWxlIjoiaGllcmFyY2h5LXRyZWUtc2VsZWN0b3ItY29udHJvbC1iYXIuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBQcmltaXRpdmUgfSBmcm9tICdAb3B1c2NhcGl0YS9vYy1jbS1jb21tb24tbGF5b3V0cyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCB1dWlkIGZyb20gJ3V1aWQnO1xuXG4vLyBBcHAgaW1wb3J0c1xuaW1wb3J0IHsgaXNTZWxlY3RlZFRyZWVJdGVtUGFyZW50LCBpc1NlbGVjdGVkVHJlZUl0ZW1Sb290IH0gZnJvbSAnLi9oaWVyYXJjaHktdHJlZS51dGlscyc7XG5cbmNvbnN0IFJlbmFtZUxhYmVsID0gc3R5bGVkLmxhYmVsYFxuICBtYXJnaW46IDAgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5oYWxmR3V0dGVyV2lkdGh9IDAgMDtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbmA7XG5cbmNvbnN0IENvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gIGhlaWdodDogJHtwcm9wcyA9PiBwcm9wcy5oZWlnaHR9O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuYDtcblxuY29uc3QgQnV0dG9uID0gc3R5bGVkKFByaW1pdGl2ZS5CdXR0b24pYFxuICBtYXJnaW4tbGVmdDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5oYWxmR3V0dGVyV2lkdGh9O1xuICBtaW4td2lkdGg6IDEyMHB4O1xuYDtcblxuY29uc3QgQ29udHJvbHMgPSBzdHlsZWQuZGl2YFxuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBtYXJnaW4tbGVmdDogYXV0bztcbiAgbWFyZ2luLXJpZ2h0OiAwO1xuYDtcblxuY29uc3QgUmVuYW1lRmllbGQgPSBzdHlsZWQoUHJpbWl0aXZlLklucHV0KWBcbiAgbWluLXdpZHRoOiAyMDBweDtcbiAgbWFyZ2luLXJpZ2h0OiA0cmVtO1xuYDtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhpZXJhcmNoeVRyZWVTZWxlY3RvckNvbnRyb2xCYXIgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHZhbHVlOiAnJyxcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RlZFRyZWVJdGVtICE9PSBuZXh0UHJvcHMuc2VsZWN0ZWRUcmVlSXRlbSkge1xuICAgICAgY29uc3QgaW5wdXRWYWx1ZSA9IG5leHRQcm9wcy5zZWxlY3RlZFRyZWVJdGVtICYmXG4gICAgICBpc1NlbGVjdGVkVHJlZUl0ZW1QYXJlbnQobmV4dFByb3BzKSA/XG4gICAgICAgIG5leHRQcm9wcy5zZWxlY3RlZFRyZWVJdGVtW25leHRQcm9wcy52YWx1ZUtleV0gOiAnJztcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyB2YWx1ZTogaW5wdXRWYWx1ZSB9KTtcbiAgICB9XG4gIH1cblxuICBvbklucHV0Q2hhbmdlID0gKGUpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgdmFsdWU6IGUudGFyZ2V0LnZhbHVlIH0sICgpID0+IHtcbiAgICAgIHRoaXMucHJvcHMub25JbnB1dENoYW5nZSh0aGlzLnN0YXRlLnZhbHVlKTtcbiAgICB9KTtcbiAgfTtcblxuICBvbkFkZEJ1dHRvbkNsaWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIG9uQWRkTmV3Q2xpY2ssIHRyYW5zbGF0aW9ucywgaWRLZXksIHZhbHVlS2V5LCBjaGlsZEtleSxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIG9uQWRkTmV3Q2xpY2soe1xuICAgICAgW2lkS2V5XTogdXVpZCgpLFxuICAgICAgW3ZhbHVlS2V5XTogdHJhbnNsYXRpb25zLmRlZmF1bHROZXdOb2RlLFxuICAgICAgW2NoaWxkS2V5XTogW10sXG4gICAgfSwgKCkgPT4ge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuaW5wdXQuc2VsZWN0KCk7XG4gICAgICAgIHRoaXMuaW5wdXQuZm9jdXMoKTtcbiAgICAgIH0sIDUwKTtcbiAgICB9KTtcbiAgfTtcblxuICBvbkRlbGV0ZUJ1dHRvbkNsaWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgb25EZWxldGVDbGljayB9ID0gdGhpcy5wcm9wcztcbiAgICBvbkRlbGV0ZUNsaWNrKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEJsdXIgb24gZW50ZXIga2V5IHByZXNzXG4gICAqIEBwYXJhbSBlXG4gICAqL1xuICBvblJlbmFtZUZpZWxkS2V5RG93biA9IChlKSA9PiB7XG4gICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHRoaXMuaW5wdXQuYmx1cigpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBJcyBhZGQgYnV0dG9uIGRpc2FibGVkLiBBZGQgYnV0dG9uIGlzIGRpc2FibGVkLCBpZjpcbiAgICogLSBzZWxlY3RlZCB0cmVlIG5vZGUgaXMgYSBsZWFmXG4gICAqIC0gY29udGFpbnMgbGVhZnNcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBpc0FkZERpc2FibGVkID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIHNlbGVjdGVkVHJlZUl0ZW0sIGNoaWxkS2V5LCBzaW5nbGVSb290LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgLy8gSWYgb25seSBhIHNpbmdsZSByb290IGlzIGFsbG93ZWQsIHdlIGNhbid0IGFkZCBuZXcgaXRlbXMgaWYgbm8gaXRlbXMgYXJlIHNlbGVjdGVkXG4gICAgaWYgKCFzZWxlY3RlZFRyZWVJdGVtKSByZXR1cm4gc2luZ2xlUm9vdDtcbiAgICByZXR1cm4gIWlzU2VsZWN0ZWRUcmVlSXRlbVBhcmVudCh0aGlzLnByb3BzKSB8fFxuICAgICAgISFzZWxlY3RlZFRyZWVJdGVtW2NoaWxkS2V5XS5maW5kKGNoaWxkSXRlbSA9PiAhY2hpbGRJdGVtW2NoaWxkS2V5XSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIElzIGRlbGV0ZSBidXR0b24gZGlzYWJsZWQuIERlbGV0ZSBidXR0b24gaXMgZGlzYWJsZWQsIGlmOlxuICAgKiAtIHNpbmdsZSByb290IGlzIGVuYWJsZWQgYW5kIHNlbGVjdGVkIGl0ZW0gaXMgYSByb290XG4gICAqIC0gc2VsZWN0ZWQgaXRlbSBpcyBhIGxlYWZcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBpc0RlbGV0ZURpc2FibGVkID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgc2luZ2xlUm9vdCB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIXRoaXMucHJvcHMuc2VsZWN0ZWRUcmVlSXRlbSkgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuICEhKHNpbmdsZVJvb3QgJiYgaXNTZWxlY3RlZFRyZWVJdGVtUm9vdCh0aGlzLnByb3BzKSk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHRyYW5zbGF0aW9ucywgaWQsIGhlaWdodCxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiAoXG4gICAgICA8Q29udGFpbmVyIGhlaWdodD17aGVpZ2h0fT5cbiAgICAgICAgPENvbnRyb2xzPlxuICAgICAgICAgIDxSZW5hbWVMYWJlbCBodG1sRm9yPXtgJHtpZH0tbm9kZS1uYW1lLWlucHV0YH0+e3RyYW5zbGF0aW9ucy5yZW5hbWV9PC9SZW5hbWVMYWJlbD5cbiAgICAgICAgICA8UmVuYW1lRmllbGRcbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uSW5wdXRDaGFuZ2V9XG4gICAgICAgICAgICBpZD17YCR7aWR9LW5vZGUtbmFtZS1pbnB1dGB9XG4gICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX1cbiAgICAgICAgICAgIGRpc2FibGVkPXshaXNTZWxlY3RlZFRyZWVJdGVtUGFyZW50KHRoaXMucHJvcHMpfVxuICAgICAgICAgICAgcmVmPXsoaW5wdXQpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5pbnB1dCA9IGlucHV0O1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5vblJlbmFtZUZpZWxkS2V5RG93bn1cbiAgICAgICAgICAvPlxuXG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkFkZEJ1dHRvbkNsaWNrfVxuICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuaXNBZGREaXNhYmxlZCgpfVxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAge3RyYW5zbGF0aW9ucy5hZGR9XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkRlbGV0ZUJ1dHRvbkNsaWNrfVxuICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuaXNEZWxldGVEaXNhYmxlZCgpfVxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAge3RyYW5zbGF0aW9ucy5kZWxldGV9XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDwvQ29udHJvbHM+XG4gICAgICA8L0NvbnRhaW5lcj5cbiAgICApO1xuICB9XG59XG5cbkhpZXJhcmNoeVRyZWVTZWxlY3RvckNvbnRyb2xCYXIucHJvcFR5cGVzID0ge1xuICBvbkFkZE5ld0NsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBvbkRlbGV0ZUNsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBvbklucHV0Q2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBpZEtleTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICB2YWx1ZUtleTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBjaGlsZEtleTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICB0cmFuc2xhdGlvbnM6IFByb3BUeXBlcy5zaGFwZSh7fSkuaXNSZXF1aXJlZCxcbiAgc2VsZWN0ZWRUcmVlSXRlbTogUHJvcFR5cGVzLnNoYXBlKHt9KSxcbiAgaWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgaGVpZ2h0OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIHNpbmdsZVJvb3Q6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG59O1xuXG5IaWVyYXJjaHlUcmVlU2VsZWN0b3JDb250cm9sQmFyLmRlZmF1bHRQcm9wcyA9IHtcbiAgc2VsZWN0ZWRUcmVlSXRlbTogbnVsbCxcbn07XG5cbiJdfQ==