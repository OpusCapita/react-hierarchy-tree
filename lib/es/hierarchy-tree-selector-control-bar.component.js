function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject5() {
  var data = _taggedTemplateLiteralLoose(["\n  min-width: 200px;\n  margin-right: 4rem;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteralLoose(["\n  display: flex;\n  align-items: center;\n  margin-left: auto;\n  margin-right: 0;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteralLoose(["\n  margin-left: ", ";\n  min-width: 124px;\n  padding: 0.5rem;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteralLoose(["\n  height: ", ";\n  display: flex;\n  align-items: center;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteralLoose(["\n  margin: 0 ", " 0 0;\n  white-space: nowrap;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteralLoose(strings, raw) { if (!raw) { raw = strings.slice(0); } strings.raw = raw; return strings; }

import React from 'react';
import PropTypes from 'prop-types';
import { Primitive } from '@opuscapita/oc-cm-common-layouts';
import styled from 'styled-components';
import uuid from 'uuid'; // App imports

import { isSelectedTreeItemParent, isSelectedTreeItemRoot } from './hierarchy-tree.utils';
var RenameLabel = styled.label(_templateObject(), function (props) {
  return props.theme.halfGutterWidth;
});
var Container = styled.div(_templateObject2(), function (props) {
  return props.height;
});
var Button = styled(Primitive.Button)(_templateObject3(), function (props) {
  return props.theme.halfGutterWidth;
});
var Controls = styled.div(_templateObject4());
var RenameField = styled(Primitive.Input)(_templateObject5());

var HierarchyTreeSelectorControlBar =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(HierarchyTreeSelectorControlBar, _React$PureComponent);

  function HierarchyTreeSelectorControlBar(props) {
    var _this;

    _this = _React$PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "onInputChange", function (e) {
      _this.setState({
        value: e.target.value
      }, function () {
        _this.props.onInputChange(_this.state.value);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onAddButtonClick", function () {
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
    });

    _defineProperty(_assertThisInitialized(_this), "onDeleteButtonClick", function () {
      var onDeleteClick = _this.props.onDeleteClick;
      onDeleteClick();
    });

    _defineProperty(_assertThisInitialized(_this), "onRenameFieldKeyDown", function (e) {
      if (e.keyCode === 13) _this.input.blur();
    });

    _defineProperty(_assertThisInitialized(_this), "isAddDisabled", function () {
      var _this$props2 = _this.props,
          selectedTreeItem = _this$props2.selectedTreeItem,
          childKey = _this$props2.childKey,
          singleRoot = _this$props2.singleRoot,
          isAddDisabled = _this$props2.isAddDisabled;
      if (isAddDisabled) return true; // If only a single root is allowed, we can't add new items if no items are selected

      if (!selectedTreeItem) return singleRoot;
      return !isSelectedTreeItemParent(_this.props) || !!selectedTreeItem[childKey].find(function (childItem) {
        return !childItem[childKey];
      });
    });

    _defineProperty(_assertThisInitialized(_this), "isDeleteDisabled", function () {
      var singleRoot = _this.props.singleRoot;
      if (!_this.props.selectedTreeItem) return true;
      return !!(singleRoot && isSelectedTreeItemRoot(_this.props));
    });

    _this.state = {
      value: ''
    };
    return _this;
  }

  var _proto = HierarchyTreeSelectorControlBar.prototype;

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (this.props.selectedTreeItem !== nextProps.selectedTreeItem) {
      var inputValue = nextProps.selectedTreeItem && isSelectedTreeItemParent(nextProps) ? nextProps.selectedTreeItem[nextProps.valueKey] : '';
      this.setState({
        value: inputValue
      });
    }
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props3 = this.props,
        translations = _this$props3.translations,
        id = _this$props3.id,
        height = _this$props3.height,
        maxValueLength = _this$props3.maxValueLength;
    var otherProps = {};

    if (maxValueLength) {
      otherProps.maxLength = maxValueLength;
    }

    return React.createElement(Container, {
      height: height
    }, React.createElement(Controls, null, React.createElement(RenameLabel, {
      htmlFor: id + "-node-name-input"
    }, translations.rename), React.createElement(RenameField, _extends({
      onChange: this.onInputChange,
      id: id + "-node-name-input",
      value: this.state.value,
      disabled: !isSelectedTreeItemParent(this.props),
      ref: function ref(input) {
        _this2.input = input;
      },
      onKeyDown: this.onRenameFieldKeyDown
    }, otherProps)), React.createElement(Button, {
      onClick: this.onAddButtonClick,
      disabled: this.isAddDisabled(),
      type: "button"
    }, translations.add), React.createElement(Button, {
      onClick: this.onDeleteButtonClick,
      disabled: this.isDeleteDisabled(),
      type: "button"
    }, translations["delete"])));
  };

  return HierarchyTreeSelectorControlBar;
}(React.PureComponent);

export { HierarchyTreeSelectorControlBar as default };
HierarchyTreeSelectorControlBar.defaultProps = {
  selectedTreeItem: null,
  isAddDisabled: false,
  maxValueLength: undefined
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci1jb250cm9sLWJhci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiUHJpbWl0aXZlIiwic3R5bGVkIiwidXVpZCIsImlzU2VsZWN0ZWRUcmVlSXRlbVBhcmVudCIsImlzU2VsZWN0ZWRUcmVlSXRlbVJvb3QiLCJSZW5hbWVMYWJlbCIsImxhYmVsIiwicHJvcHMiLCJ0aGVtZSIsImhhbGZHdXR0ZXJXaWR0aCIsIkNvbnRhaW5lciIsImRpdiIsImhlaWdodCIsIkJ1dHRvbiIsIkNvbnRyb2xzIiwiUmVuYW1lRmllbGQiLCJJbnB1dCIsIkhpZXJhcmNoeVRyZWVTZWxlY3RvckNvbnRyb2xCYXIiLCJlIiwic2V0U3RhdGUiLCJ2YWx1ZSIsInRhcmdldCIsIm9uSW5wdXRDaGFuZ2UiLCJzdGF0ZSIsIm9uQWRkTmV3Q2xpY2siLCJ0cmFuc2xhdGlvbnMiLCJpZEtleSIsInZhbHVlS2V5IiwiY2hpbGRLZXkiLCJkZWZhdWx0TmV3Tm9kZSIsInNldFRpbWVvdXQiLCJpbnB1dCIsInNlbGVjdCIsImZvY3VzIiwib25EZWxldGVDbGljayIsImtleUNvZGUiLCJibHVyIiwic2VsZWN0ZWRUcmVlSXRlbSIsInNpbmdsZVJvb3QiLCJpc0FkZERpc2FibGVkIiwiZmluZCIsImNoaWxkSXRlbSIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJuZXh0UHJvcHMiLCJpbnB1dFZhbHVlIiwicmVuZGVyIiwiaWQiLCJtYXhWYWx1ZUxlbmd0aCIsIm90aGVyUHJvcHMiLCJtYXhMZW5ndGgiLCJyZW5hbWUiLCJvblJlbmFtZUZpZWxkS2V5RG93biIsIm9uQWRkQnV0dG9uQ2xpY2siLCJhZGQiLCJvbkRlbGV0ZUJ1dHRvbkNsaWNrIiwiaXNEZWxldGVEaXNhYmxlZCIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiLCJ1bmRlZmluZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7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QXJCRixDQURGLENBREY7QUFpQ0QsRzs7O0VBN0gwRDNCLEtBQUssQ0FBQzBELGE7O1NBQTlDdkMsK0I7QUFxSnJCQSwrQkFBK0IsQ0FBQ3dDLFlBQWhDLEdBQStDO0FBQzdDcEIsRUFBQUEsZ0JBQWdCLEVBQUUsSUFEMkI7QUFFN0NFLEVBQUFBLGFBQWEsRUFBRSxLQUY4QjtBQUc3Q1EsRUFBQUEsY0FBYyxFQUFFVztBQUg2QixDQUEvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgUHJpbWl0aXZlIH0gZnJvbSAnQG9wdXNjYXBpdGEvb2MtY20tY29tbW9uLWxheW91dHMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgdXVpZCBmcm9tICd1dWlkJztcblxuLy8gQXBwIGltcG9ydHNcbmltcG9ydCB7IGlzU2VsZWN0ZWRUcmVlSXRlbVBhcmVudCwgaXNTZWxlY3RlZFRyZWVJdGVtUm9vdCB9IGZyb20gJy4vaGllcmFyY2h5LXRyZWUudXRpbHMnO1xuXG5jb25zdCBSZW5hbWVMYWJlbCA9IHN0eWxlZC5sYWJlbGBcbiAgbWFyZ2luOiAwICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuaGFsZkd1dHRlcldpZHRofSAwIDA7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG5gO1xuXG5jb25zdCBDb250YWluZXIgPSBzdHlsZWQuZGl2YFxuICBoZWlnaHQ6ICR7cHJvcHMgPT4gcHJvcHMuaGVpZ2h0fTtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbmA7XG5cbmNvbnN0IEJ1dHRvbiA9IHN0eWxlZChQcmltaXRpdmUuQnV0dG9uKWBcbiAgbWFyZ2luLWxlZnQ6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuaGFsZkd1dHRlcldpZHRofTtcbiAgbWluLXdpZHRoOiAxMjRweDtcbiAgcGFkZGluZzogMC41cmVtO1xuYDtcblxuY29uc3QgQ29udHJvbHMgPSBzdHlsZWQuZGl2YFxuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBtYXJnaW4tbGVmdDogYXV0bztcbiAgbWFyZ2luLXJpZ2h0OiAwO1xuYDtcblxuY29uc3QgUmVuYW1lRmllbGQgPSBzdHlsZWQoUHJpbWl0aXZlLklucHV0KWBcbiAgbWluLXdpZHRoOiAyMDBweDtcbiAgbWFyZ2luLXJpZ2h0OiA0cmVtO1xuYDtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhpZXJhcmNoeVRyZWVTZWxlY3RvckNvbnRyb2xCYXIgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHZhbHVlOiAnJyxcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RlZFRyZWVJdGVtICE9PSBuZXh0UHJvcHMuc2VsZWN0ZWRUcmVlSXRlbSkge1xuICAgICAgY29uc3QgaW5wdXRWYWx1ZSA9IG5leHRQcm9wcy5zZWxlY3RlZFRyZWVJdGVtXG4gICAgICAmJiBpc1NlbGVjdGVkVHJlZUl0ZW1QYXJlbnQobmV4dFByb3BzKVxuICAgICAgICA/IG5leHRQcm9wcy5zZWxlY3RlZFRyZWVJdGVtW25leHRQcm9wcy52YWx1ZUtleV0gOiAnJztcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyB2YWx1ZTogaW5wdXRWYWx1ZSB9KTtcbiAgICB9XG4gIH1cblxuICBvbklucHV0Q2hhbmdlID0gKGUpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgdmFsdWU6IGUudGFyZ2V0LnZhbHVlIH0sICgpID0+IHtcbiAgICAgIHRoaXMucHJvcHMub25JbnB1dENoYW5nZSh0aGlzLnN0YXRlLnZhbHVlKTtcbiAgICB9KTtcbiAgfTtcblxuICBvbkFkZEJ1dHRvbkNsaWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIG9uQWRkTmV3Q2xpY2ssIHRyYW5zbGF0aW9ucywgaWRLZXksIHZhbHVlS2V5LCBjaGlsZEtleSxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIG9uQWRkTmV3Q2xpY2soe1xuICAgICAgW2lkS2V5XTogdXVpZCgpLFxuICAgICAgW3ZhbHVlS2V5XTogdHJhbnNsYXRpb25zLmRlZmF1bHROZXdOb2RlLFxuICAgICAgW2NoaWxkS2V5XTogW10sXG4gICAgfSwgKCkgPT4ge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuaW5wdXQuc2VsZWN0KCk7XG4gICAgICAgIHRoaXMuaW5wdXQuZm9jdXMoKTtcbiAgICAgIH0sIDUwKTtcbiAgICB9KTtcbiAgfTtcblxuICBvbkRlbGV0ZUJ1dHRvbkNsaWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgb25EZWxldGVDbGljayB9ID0gdGhpcy5wcm9wcztcbiAgICBvbkRlbGV0ZUNsaWNrKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEJsdXIgb24gZW50ZXIga2V5IHByZXNzXG4gICAqIEBwYXJhbSBlXG4gICAqL1xuICBvblJlbmFtZUZpZWxkS2V5RG93biA9IChlKSA9PiB7XG4gICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHRoaXMuaW5wdXQuYmx1cigpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBJcyBhZGQgYnV0dG9uIGRpc2FibGVkLiBBZGQgYnV0dG9uIGlzIGRpc2FibGVkLCBpZjpcbiAgICogLSBzZWxlY3RlZCB0cmVlIG5vZGUgaXMgYSBsZWFmXG4gICAqIC0gY29udGFpbnMgbGVhZnNcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBpc0FkZERpc2FibGVkID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIHNlbGVjdGVkVHJlZUl0ZW0sIGNoaWxkS2V5LCBzaW5nbGVSb290LCBpc0FkZERpc2FibGVkLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKGlzQWRkRGlzYWJsZWQpIHJldHVybiB0cnVlO1xuICAgIC8vIElmIG9ubHkgYSBzaW5nbGUgcm9vdCBpcyBhbGxvd2VkLCB3ZSBjYW4ndCBhZGQgbmV3IGl0ZW1zIGlmIG5vIGl0ZW1zIGFyZSBzZWxlY3RlZFxuICAgIGlmICghc2VsZWN0ZWRUcmVlSXRlbSkgcmV0dXJuIHNpbmdsZVJvb3Q7XG4gICAgcmV0dXJuICFpc1NlbGVjdGVkVHJlZUl0ZW1QYXJlbnQodGhpcy5wcm9wcylcbiAgICB8fCAhIXNlbGVjdGVkVHJlZUl0ZW1bY2hpbGRLZXldLmZpbmQoY2hpbGRJdGVtID0+ICFjaGlsZEl0ZW1bY2hpbGRLZXldKTtcbiAgfTtcblxuICAvKipcbiAgICogSXMgZGVsZXRlIGJ1dHRvbiBkaXNhYmxlZC4gRGVsZXRlIGJ1dHRvbiBpcyBkaXNhYmxlZCwgaWY6XG4gICAqIC0gc2luZ2xlIHJvb3QgaXMgZW5hYmxlZCBhbmQgc2VsZWN0ZWQgaXRlbSBpcyBhIHJvb3RcbiAgICogLSBzZWxlY3RlZCBpdGVtIGlzIGEgbGVhZlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIGlzRGVsZXRlRGlzYWJsZWQgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBzaW5nbGVSb290IH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghdGhpcy5wcm9wcy5zZWxlY3RlZFRyZWVJdGVtKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gISEoc2luZ2xlUm9vdCAmJiBpc1NlbGVjdGVkVHJlZUl0ZW1Sb290KHRoaXMucHJvcHMpKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgdHJhbnNsYXRpb25zLCBpZCwgaGVpZ2h0LCBtYXhWYWx1ZUxlbmd0aCxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBvdGhlclByb3BzID0ge307XG4gICAgaWYgKG1heFZhbHVlTGVuZ3RoKSB7XG4gICAgICBvdGhlclByb3BzLm1heExlbmd0aCA9IG1heFZhbHVlTGVuZ3RoO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8Q29udGFpbmVyIGhlaWdodD17aGVpZ2h0fT5cbiAgICAgICAgPENvbnRyb2xzPlxuICAgICAgICAgIDxSZW5hbWVMYWJlbCBodG1sRm9yPXtgJHtpZH0tbm9kZS1uYW1lLWlucHV0YH0+e3RyYW5zbGF0aW9ucy5yZW5hbWV9PC9SZW5hbWVMYWJlbD5cbiAgICAgICAgICA8UmVuYW1lRmllbGRcbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uSW5wdXRDaGFuZ2V9XG4gICAgICAgICAgICBpZD17YCR7aWR9LW5vZGUtbmFtZS1pbnB1dGB9XG4gICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX1cbiAgICAgICAgICAgIGRpc2FibGVkPXshaXNTZWxlY3RlZFRyZWVJdGVtUGFyZW50KHRoaXMucHJvcHMpfVxuICAgICAgICAgICAgcmVmPXsoaW5wdXQpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5pbnB1dCA9IGlucHV0O1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5vblJlbmFtZUZpZWxkS2V5RG93bn1cbiAgICAgICAgICAgIHsuLi5vdGhlclByb3BzfVxuICAgICAgICAgIC8+XG5cbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQWRkQnV0dG9uQ2xpY2t9XG4gICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5pc0FkZERpc2FibGVkKCl9XG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICB7dHJhbnNsYXRpb25zLmFkZH1cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uRGVsZXRlQnV0dG9uQ2xpY2t9XG4gICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5pc0RlbGV0ZURpc2FibGVkKCl9XG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICB7dHJhbnNsYXRpb25zLmRlbGV0ZX1cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgPC9Db250cm9scz5cbiAgICAgIDwvQ29udGFpbmVyPlxuICAgICk7XG4gIH1cbn1cblxuSGllcmFyY2h5VHJlZVNlbGVjdG9yQ29udHJvbEJhci5wcm9wVHlwZXMgPSB7XG4gIG9uQWRkTmV3Q2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG9uRGVsZXRlQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG9uSW5wdXRDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGlkS2V5OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIHZhbHVlS2V5OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIGNoaWxkS2V5OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIHRyYW5zbGF0aW9uczogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBhZGQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGVsZXRlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHJlbmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkZWZhdWx0TmV3Tm9kZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgfSkuaXNSZXF1aXJlZCxcbiAgc2VsZWN0ZWRUcmVlSXRlbTogUHJvcFR5cGVzLnNoYXBlKHt9KSxcbiAgaWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgaGVpZ2h0OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIHNpbmdsZVJvb3Q6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIGlzQWRkRGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxuICBtYXhWYWx1ZUxlbmd0aDogUHJvcFR5cGVzLm51bWJlcixcbn07XG5cbkhpZXJhcmNoeVRyZWVTZWxlY3RvckNvbnRyb2xCYXIuZGVmYXVsdFByb3BzID0ge1xuICBzZWxlY3RlZFRyZWVJdGVtOiBudWxsLFxuICBpc0FkZERpc2FibGVkOiBmYWxzZSxcbiAgbWF4VmFsdWVMZW5ndGg6IHVuZGVmaW5lZCxcbn07XG4iXX0=