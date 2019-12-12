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
        height = _this$props3.height;
    return React.createElement(Container, {
      height: height
    }, React.createElement(Controls, null, React.createElement(RenameLabel, {
      htmlFor: id + "-node-name-input"
    }, translations.rename), React.createElement(RenameField, {
      onChange: this.onInputChange,
      id: id + "-node-name-input",
      value: this.state.value,
      disabled: !isSelectedTreeItemParent(this.props),
      ref: function ref(input) {
        _this2.input = input;
      },
      onKeyDown: this.onRenameFieldKeyDown
    }), React.createElement(Button, {
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
  isAddDisabled: false
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci1jb250cm9sLWJhci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiUHJpbWl0aXZlIiwic3R5bGVkIiwidXVpZCIsImlzU2VsZWN0ZWRUcmVlSXRlbVBhcmVudCIsImlzU2VsZWN0ZWRUcmVlSXRlbVJvb3QiLCJSZW5hbWVMYWJlbCIsImxhYmVsIiwicHJvcHMiLCJ0aGVtZSIsImhhbGZHdXR0ZXJXaWR0aCIsIkNvbnRhaW5lciIsImRpdiIsImhlaWdodCIsIkJ1dHRvbiIsIkNvbnRyb2xzIiwiUmVuYW1lRmllbGQiLCJJbnB1dCIsIkhpZXJhcmNoeVRyZWVTZWxlY3RvckNvbnRyb2xCYXIiLCJlIiwic2V0U3RhdGUiLCJ2YWx1ZSIsInRhcmdldCIsIm9uSW5wdXRDaGFuZ2UiLCJzdGF0ZSIsIm9uQWRkTmV3Q2xpY2siLCJ0cmFuc2xhdGlvbnMiLCJpZEtleSIsInZhbHVlS2V5IiwiY2hpbGRLZXkiLCJkZWZhdWx0TmV3Tm9kZSIsInNldFRpbWVvdXQiLCJpbnB1dCIsInNlbGVjdCIsImZvY3VzIiwib25EZWxldGVDbGljayIsImtleUNvZGUiLCJibHVyIiwic2VsZWN0ZWRUcmVlSXRlbSIsInNpbmdsZVJvb3QiLCJpc0FkZERpc2FibGVkIiwiZmluZCIsImNoaWxkSXRlbSIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJuZXh0UHJvcHMiLCJpbnB1dFZhbHVlIiwicmVuZGVyIiwiaWQiLCJyZW5hbWUiLCJvblJlbmFtZUZpZWxkS2V5RG93biIsIm9uQWRkQnV0dG9uQ2xpY2siLCJhZGQiLCJvbkRlbGV0ZUJ1dHRvbkNsaWNrIiwiaXNEZWxldGVEaXNhYmxlZCIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxP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J3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBQcmltaXRpdmUgfSBmcm9tICdAb3B1c2NhcGl0YS9vYy1jbS1jb21tb24tbGF5b3V0cyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCB1dWlkIGZyb20gJ3V1aWQnO1xuXG4vLyBBcHAgaW1wb3J0c1xuaW1wb3J0IHsgaXNTZWxlY3RlZFRyZWVJdGVtUGFyZW50LCBpc1NlbGVjdGVkVHJlZUl0ZW1Sb290IH0gZnJvbSAnLi9oaWVyYXJjaHktdHJlZS51dGlscyc7XG5cbmNvbnN0IFJlbmFtZUxhYmVsID0gc3R5bGVkLmxhYmVsYFxuICBtYXJnaW46IDAgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5oYWxmR3V0dGVyV2lkdGh9IDAgMDtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbmA7XG5cbmNvbnN0IENvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gIGhlaWdodDogJHtwcm9wcyA9PiBwcm9wcy5oZWlnaHR9O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuYDtcblxuY29uc3QgQnV0dG9uID0gc3R5bGVkKFByaW1pdGl2ZS5CdXR0b24pYFxuICBtYXJnaW4tbGVmdDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5oYWxmR3V0dGVyV2lkdGh9O1xuICBtaW4td2lkdGg6IDEyNHB4O1xuICBwYWRkaW5nOiAwLjVyZW07XG5gO1xuXG5jb25zdCBDb250cm9scyA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICBtYXJnaW4tcmlnaHQ6IDA7XG5gO1xuXG5jb25zdCBSZW5hbWVGaWVsZCA9IHN0eWxlZChQcmltaXRpdmUuSW5wdXQpYFxuICBtaW4td2lkdGg6IDIwMHB4O1xuICBtYXJnaW4tcmlnaHQ6IDRyZW07XG5gO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGllcmFyY2h5VHJlZVNlbGVjdG9yQ29udHJvbEJhciBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdmFsdWU6ICcnLFxuICAgIH07XG4gIH1cblxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdGVkVHJlZUl0ZW0gIT09IG5leHRQcm9wcy5zZWxlY3RlZFRyZWVJdGVtKSB7XG4gICAgICBjb25zdCBpbnB1dFZhbHVlID0gbmV4dFByb3BzLnNlbGVjdGVkVHJlZUl0ZW1cbiAgICAgICYmIGlzU2VsZWN0ZWRUcmVlSXRlbVBhcmVudChuZXh0UHJvcHMpXG4gICAgICAgID8gbmV4dFByb3BzLnNlbGVjdGVkVHJlZUl0ZW1bbmV4dFByb3BzLnZhbHVlS2V5XSA6ICcnO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IHZhbHVlOiBpbnB1dFZhbHVlIH0pO1xuICAgIH1cbiAgfVxuXG4gIG9uSW5wdXRDaGFuZ2UgPSAoZSkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyB2YWx1ZTogZS50YXJnZXQudmFsdWUgfSwgKCkgPT4ge1xuICAgICAgdGhpcy5wcm9wcy5vbklucHV0Q2hhbmdlKHRoaXMuc3RhdGUudmFsdWUpO1xuICAgIH0pO1xuICB9O1xuXG4gIG9uQWRkQnV0dG9uQ2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgb25BZGROZXdDbGljaywgdHJhbnNsYXRpb25zLCBpZEtleSwgdmFsdWVLZXksIGNoaWxkS2V5LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgb25BZGROZXdDbGljayh7XG4gICAgICBbaWRLZXldOiB1dWlkKCksXG4gICAgICBbdmFsdWVLZXldOiB0cmFuc2xhdGlvbnMuZGVmYXVsdE5ld05vZGUsXG4gICAgICBbY2hpbGRLZXldOiBbXSxcbiAgICB9LCAoKSA9PiB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5pbnB1dC5zZWxlY3QoKTtcbiAgICAgICAgdGhpcy5pbnB1dC5mb2N1cygpO1xuICAgICAgfSwgNTApO1xuICAgIH0pO1xuICB9O1xuXG4gIG9uRGVsZXRlQnV0dG9uQ2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBvbkRlbGV0ZUNsaWNrIH0gPSB0aGlzLnByb3BzO1xuICAgIG9uRGVsZXRlQ2xpY2soKTtcbiAgfTtcblxuICAvKipcbiAgICogQmx1ciBvbiBlbnRlciBrZXkgcHJlc3NcbiAgICogQHBhcmFtIGVcbiAgICovXG4gIG9uUmVuYW1lRmllbGRLZXlEb3duID0gKGUpID0+IHtcbiAgICBpZiAoZS5rZXlDb2RlID09PSAxMykgdGhpcy5pbnB1dC5ibHVyKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIElzIGFkZCBidXR0b24gZGlzYWJsZWQuIEFkZCBidXR0b24gaXMgZGlzYWJsZWQsIGlmOlxuICAgKiAtIHNlbGVjdGVkIHRyZWUgbm9kZSBpcyBhIGxlYWZcbiAgICogLSBjb250YWlucyBsZWFmc1xuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIGlzQWRkRGlzYWJsZWQgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgc2VsZWN0ZWRUcmVlSXRlbSwgY2hpbGRLZXksIHNpbmdsZVJvb3QsIGlzQWRkRGlzYWJsZWQsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAoaXNBZGREaXNhYmxlZCkgcmV0dXJuIHRydWU7XG4gICAgLy8gSWYgb25seSBhIHNpbmdsZSByb290IGlzIGFsbG93ZWQsIHdlIGNhbid0IGFkZCBuZXcgaXRlbXMgaWYgbm8gaXRlbXMgYXJlIHNlbGVjdGVkXG4gICAgaWYgKCFzZWxlY3RlZFRyZWVJdGVtKSByZXR1cm4gc2luZ2xlUm9vdDtcbiAgICByZXR1cm4gIWlzU2VsZWN0ZWRUcmVlSXRlbVBhcmVudCh0aGlzLnByb3BzKVxuICAgIHx8ICEhc2VsZWN0ZWRUcmVlSXRlbVtjaGlsZEtleV0uZmluZChjaGlsZEl0ZW0gPT4gIWNoaWxkSXRlbVtjaGlsZEtleV0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBJcyBkZWxldGUgYnV0dG9uIGRpc2FibGVkLiBEZWxldGUgYnV0dG9uIGlzIGRpc2FibGVkLCBpZjpcbiAgICogLSBzaW5nbGUgcm9vdCBpcyBlbmFibGVkIGFuZCBzZWxlY3RlZCBpdGVtIGlzIGEgcm9vdFxuICAgKiAtIHNlbGVjdGVkIGl0ZW0gaXMgYSBsZWFmXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgaXNEZWxldGVEaXNhYmxlZCA9ICgpID0+IHtcbiAgICBjb25zdCB7IHNpbmdsZVJvb3QgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCF0aGlzLnByb3BzLnNlbGVjdGVkVHJlZUl0ZW0pIHJldHVybiB0cnVlO1xuICAgIHJldHVybiAhIShzaW5nbGVSb290ICYmIGlzU2VsZWN0ZWRUcmVlSXRlbVJvb3QodGhpcy5wcm9wcykpO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICB0cmFuc2xhdGlvbnMsIGlkLCBoZWlnaHQsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPENvbnRhaW5lciBoZWlnaHQ9e2hlaWdodH0+XG4gICAgICAgIDxDb250cm9scz5cbiAgICAgICAgICA8UmVuYW1lTGFiZWwgaHRtbEZvcj17YCR7aWR9LW5vZGUtbmFtZS1pbnB1dGB9Pnt0cmFuc2xhdGlvbnMucmVuYW1lfTwvUmVuYW1lTGFiZWw+XG4gICAgICAgICAgPFJlbmFtZUZpZWxkXG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbklucHV0Q2hhbmdlfVxuICAgICAgICAgICAgaWQ9e2Ake2lkfS1ub2RlLW5hbWUtaW5wdXRgfVxuICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUudmFsdWV9XG4gICAgICAgICAgICBkaXNhYmxlZD17IWlzU2VsZWN0ZWRUcmVlSXRlbVBhcmVudCh0aGlzLnByb3BzKX1cbiAgICAgICAgICAgIHJlZj17KGlucHV0KSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuaW5wdXQgPSBpbnB1dDtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvbktleURvd249e3RoaXMub25SZW5hbWVGaWVsZEtleURvd259XG4gICAgICAgICAgLz5cblxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25BZGRCdXR0b25DbGlja31cbiAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLmlzQWRkRGlzYWJsZWQoKX1cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIHt0cmFuc2xhdGlvbnMuYWRkfVxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25EZWxldGVCdXR0b25DbGlja31cbiAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLmlzRGVsZXRlRGlzYWJsZWQoKX1cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIHt0cmFuc2xhdGlvbnMuZGVsZXRlfVxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICA8L0NvbnRyb2xzPlxuICAgICAgPC9Db250YWluZXI+XG4gICAgKTtcbiAgfVxufVxuXG5IaWVyYXJjaHlUcmVlU2VsZWN0b3JDb250cm9sQmFyLnByb3BUeXBlcyA9IHtcbiAgb25BZGROZXdDbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgb25EZWxldGVDbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgb25JbnB1dENoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgaWRLZXk6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgdmFsdWVLZXk6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgY2hpbGRLZXk6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgdHJhbnNsYXRpb25zOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIGFkZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkZWxldGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcmVuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRlZmF1bHROZXdOb2RlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICB9KS5pc1JlcXVpcmVkLFxuICBzZWxlY3RlZFRyZWVJdGVtOiBQcm9wVHlwZXMuc2hhcGUoe30pLFxuICBpZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBoZWlnaHQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgc2luZ2xlUm9vdDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgaXNBZGREaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXG59O1xuXG5IaWVyYXJjaHlUcmVlU2VsZWN0b3JDb250cm9sQmFyLmRlZmF1bHRQcm9wcyA9IHtcbiAgc2VsZWN0ZWRUcmVlSXRlbTogbnVsbCxcbiAgaXNBZGREaXNhYmxlZDogZmFsc2UsXG59O1xuIl19