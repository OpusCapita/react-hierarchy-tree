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
          singleRoot = _this$props2.singleRoot; // If only a single root is allowed, we can't add new items if no items are selected

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
  selectedTreeItem: null
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci1jb250cm9sLWJhci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiUHJpbWl0aXZlIiwic3R5bGVkIiwidXVpZCIsImlzU2VsZWN0ZWRUcmVlSXRlbVBhcmVudCIsImlzU2VsZWN0ZWRUcmVlSXRlbVJvb3QiLCJSZW5hbWVMYWJlbCIsImxhYmVsIiwicHJvcHMiLCJ0aGVtZSIsImhhbGZHdXR0ZXJXaWR0aCIsIkNvbnRhaW5lciIsImRpdiIsImhlaWdodCIsIkJ1dHRvbiIsIkNvbnRyb2xzIiwiUmVuYW1lRmllbGQiLCJJbnB1dCIsIkhpZXJhcmNoeVRyZWVTZWxlY3RvckNvbnRyb2xCYXIiLCJlIiwic2V0U3RhdGUiLCJ2YWx1ZSIsInRhcmdldCIsIm9uSW5wdXRDaGFuZ2UiLCJzdGF0ZSIsIm9uQWRkTmV3Q2xpY2siLCJ0cmFuc2xhdGlvbnMiLCJpZEtleSIsInZhbHVlS2V5IiwiY2hpbGRLZXkiLCJkZWZhdWx0TmV3Tm9kZSIsInNldFRpbWVvdXQiLCJpbnB1dCIsInNlbGVjdCIsImZvY3VzIiwib25EZWxldGVDbGljayIsImtleUNvZGUiLCJibHVyIiwic2VsZWN0ZWRUcmVlSXRlbSIsInNpbmdsZVJvb3QiLCJmaW5kIiwiY2hpbGRJdGVtIiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsIm5leHRQcm9wcyIsImlucHV0VmFsdWUiLCJyZW5kZXIiLCJpZCIsInJlbmFtZSIsIm9uUmVuYW1lRmllbGRLZXlEb3duIiwib25BZGRCdXR0b25DbGljayIsImlzQWRkRGlzYWJsZWQiLCJhZGQiLCJvbkRlbGV0ZUJ1dHRvbkNsaWNrIiwiaXNEZWxldGVEaXNhYmxlZCIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxP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QUEsT0FBTyxFQUFLaUMsRUFBTDtBQUFwQixPQUFnRHBCLFlBQVksQ0FBQ3FCLE1BQTdELENBREYsRUFFRSxvQkFBQyxXQUFEO0FBQ0UsTUFBQSxRQUFRLEVBQUUsS0FBS3hCLGFBRGpCO0FBRUUsTUFBQSxFQUFFLEVBQUt1QixFQUFMLHFCQUZKO0FBR0UsTUFBQSxLQUFLLEVBQUUsS0FBS3RCLEtBQUwsQ0FBV0gsS0FIcEI7QUFJRSxNQUFBLFFBQVEsRUFBRSxDQUFDakIsd0JBQXdCLENBQUMsS0FBS0ksS0FBTixDQUpyQztBQUtFLE1BQUEsR0FBRyxFQUFFLGFBQUN3QixLQUFELEVBQVc7QUFDZCxRQUFBLE1BQUksQ0FBQ0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0QsT0FQSDtBQVFFLE1BQUEsU0FBUyxFQUFFLEtBQUtnQjtBQVJsQixNQUZGLEVBYUUsb0JBQUMsTUFBRDtBQUNFLE1BQUEsT0FBTyxFQUFFLEtBQUtDLGdCQURoQjtBQUVFLE1BQUEsUUFBUSxFQUFFLEtBQUtDLGFBQUwsRUFGWjtBQUdFLE1BQUEsSUFBSSxFQUFDO0FBSFAsT0FLR3hCLFlBQVksQ0FBQ3lCLEdBTGhCLENBYkYsRUFvQkUsb0JBQUMsTUFBRDtBQUNFLE1BQUEsT0FBTyxFQUFFLEtBQUtDLG1CQURoQjtBQUVFLE1BQUEsUUFBUSxFQUFFLEtBQUtDLGdCQUFMLEVBRlo7QUFHRSxNQUFBLElBQUksRUFBQztBQUhQLE9BS0czQixZQUFZLFVBTGYsQ0FwQkYsQ0FERixDQURGO0FBZ0NELEc7OztFQXZIMEQzQixLQUFLLENBQUN1RCxhOztTQUE5Q3BDLCtCO0FBNklyQkEsK0JBQStCLENBQUNxQyxZQUFoQyxHQUErQztBQUM3Q2pCLEVBQUFBLGdCQUFnQixFQUFFO0FBRDJCLENBQS9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBQcmltaXRpdmUgfSBmcm9tICdAb3B1c2NhcGl0YS9vYy1jbS1jb21tb24tbGF5b3V0cyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCB1dWlkIGZyb20gJ3V1aWQnO1xuXG4vLyBBcHAgaW1wb3J0c1xuaW1wb3J0IHsgaXNTZWxlY3RlZFRyZWVJdGVtUGFyZW50LCBpc1NlbGVjdGVkVHJlZUl0ZW1Sb290IH0gZnJvbSAnLi9oaWVyYXJjaHktdHJlZS51dGlscyc7XG5cbmNvbnN0IFJlbmFtZUxhYmVsID0gc3R5bGVkLmxhYmVsYFxuICBtYXJnaW46IDAgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5oYWxmR3V0dGVyV2lkdGh9IDAgMDtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbmA7XG5cbmNvbnN0IENvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gIGhlaWdodDogJHtwcm9wcyA9PiBwcm9wcy5oZWlnaHR9O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuYDtcblxuY29uc3QgQnV0dG9uID0gc3R5bGVkKFByaW1pdGl2ZS5CdXR0b24pYFxuICBtYXJnaW4tbGVmdDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5oYWxmR3V0dGVyV2lkdGh9O1xuICBtaW4td2lkdGg6IDEyNHB4O1xuICBwYWRkaW5nOiAwLjVyZW07XG5gO1xuXG5jb25zdCBDb250cm9scyA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICBtYXJnaW4tcmlnaHQ6IDA7XG5gO1xuXG5jb25zdCBSZW5hbWVGaWVsZCA9IHN0eWxlZChQcmltaXRpdmUuSW5wdXQpYFxuICBtaW4td2lkdGg6IDIwMHB4O1xuICBtYXJnaW4tcmlnaHQ6IDRyZW07XG5gO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGllcmFyY2h5VHJlZVNlbGVjdG9yQ29udHJvbEJhciBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdmFsdWU6ICcnLFxuICAgIH07XG4gIH1cblxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdGVkVHJlZUl0ZW0gIT09IG5leHRQcm9wcy5zZWxlY3RlZFRyZWVJdGVtKSB7XG4gICAgICBjb25zdCBpbnB1dFZhbHVlID0gbmV4dFByb3BzLnNlbGVjdGVkVHJlZUl0ZW1cbiAgICAgICYmIGlzU2VsZWN0ZWRUcmVlSXRlbVBhcmVudChuZXh0UHJvcHMpXG4gICAgICAgID8gbmV4dFByb3BzLnNlbGVjdGVkVHJlZUl0ZW1bbmV4dFByb3BzLnZhbHVlS2V5XSA6ICcnO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IHZhbHVlOiBpbnB1dFZhbHVlIH0pO1xuICAgIH1cbiAgfVxuXG4gIG9uSW5wdXRDaGFuZ2UgPSAoZSkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyB2YWx1ZTogZS50YXJnZXQudmFsdWUgfSwgKCkgPT4ge1xuICAgICAgdGhpcy5wcm9wcy5vbklucHV0Q2hhbmdlKHRoaXMuc3RhdGUudmFsdWUpO1xuICAgIH0pO1xuICB9O1xuXG4gIG9uQWRkQnV0dG9uQ2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgb25BZGROZXdDbGljaywgdHJhbnNsYXRpb25zLCBpZEtleSwgdmFsdWVLZXksIGNoaWxkS2V5LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgb25BZGROZXdDbGljayh7XG4gICAgICBbaWRLZXldOiB1dWlkKCksXG4gICAgICBbdmFsdWVLZXldOiB0cmFuc2xhdGlvbnMuZGVmYXVsdE5ld05vZGUsXG4gICAgICBbY2hpbGRLZXldOiBbXSxcbiAgICB9LCAoKSA9PiB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5pbnB1dC5zZWxlY3QoKTtcbiAgICAgICAgdGhpcy5pbnB1dC5mb2N1cygpO1xuICAgICAgfSwgNTApO1xuICAgIH0pO1xuICB9O1xuXG4gIG9uRGVsZXRlQnV0dG9uQ2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBvbkRlbGV0ZUNsaWNrIH0gPSB0aGlzLnByb3BzO1xuICAgIG9uRGVsZXRlQ2xpY2soKTtcbiAgfTtcblxuICAvKipcbiAgICogQmx1ciBvbiBlbnRlciBrZXkgcHJlc3NcbiAgICogQHBhcmFtIGVcbiAgICovXG4gIG9uUmVuYW1lRmllbGRLZXlEb3duID0gKGUpID0+IHtcbiAgICBpZiAoZS5rZXlDb2RlID09PSAxMykgdGhpcy5pbnB1dC5ibHVyKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIElzIGFkZCBidXR0b24gZGlzYWJsZWQuIEFkZCBidXR0b24gaXMgZGlzYWJsZWQsIGlmOlxuICAgKiAtIHNlbGVjdGVkIHRyZWUgbm9kZSBpcyBhIGxlYWZcbiAgICogLSBjb250YWlucyBsZWFmc1xuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIGlzQWRkRGlzYWJsZWQgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgc2VsZWN0ZWRUcmVlSXRlbSwgY2hpbGRLZXksIHNpbmdsZVJvb3QsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAvLyBJZiBvbmx5IGEgc2luZ2xlIHJvb3QgaXMgYWxsb3dlZCwgd2UgY2FuJ3QgYWRkIG5ldyBpdGVtcyBpZiBubyBpdGVtcyBhcmUgc2VsZWN0ZWRcbiAgICBpZiAoIXNlbGVjdGVkVHJlZUl0ZW0pIHJldHVybiBzaW5nbGVSb290O1xuICAgIHJldHVybiAhaXNTZWxlY3RlZFRyZWVJdGVtUGFyZW50KHRoaXMucHJvcHMpXG4gICAgfHwgISFzZWxlY3RlZFRyZWVJdGVtW2NoaWxkS2V5XS5maW5kKGNoaWxkSXRlbSA9PiAhY2hpbGRJdGVtW2NoaWxkS2V5XSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIElzIGRlbGV0ZSBidXR0b24gZGlzYWJsZWQuIERlbGV0ZSBidXR0b24gaXMgZGlzYWJsZWQsIGlmOlxuICAgKiAtIHNpbmdsZSByb290IGlzIGVuYWJsZWQgYW5kIHNlbGVjdGVkIGl0ZW0gaXMgYSByb290XG4gICAqIC0gc2VsZWN0ZWQgaXRlbSBpcyBhIGxlYWZcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBpc0RlbGV0ZURpc2FibGVkID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgc2luZ2xlUm9vdCB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIXRoaXMucHJvcHMuc2VsZWN0ZWRUcmVlSXRlbSkgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuICEhKHNpbmdsZVJvb3QgJiYgaXNTZWxlY3RlZFRyZWVJdGVtUm9vdCh0aGlzLnByb3BzKSk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHRyYW5zbGF0aW9ucywgaWQsIGhlaWdodCxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiAoXG4gICAgICA8Q29udGFpbmVyIGhlaWdodD17aGVpZ2h0fT5cbiAgICAgICAgPENvbnRyb2xzPlxuICAgICAgICAgIDxSZW5hbWVMYWJlbCBodG1sRm9yPXtgJHtpZH0tbm9kZS1uYW1lLWlucHV0YH0+e3RyYW5zbGF0aW9ucy5yZW5hbWV9PC9SZW5hbWVMYWJlbD5cbiAgICAgICAgICA8UmVuYW1lRmllbGRcbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uSW5wdXRDaGFuZ2V9XG4gICAgICAgICAgICBpZD17YCR7aWR9LW5vZGUtbmFtZS1pbnB1dGB9XG4gICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX1cbiAgICAgICAgICAgIGRpc2FibGVkPXshaXNTZWxlY3RlZFRyZWVJdGVtUGFyZW50KHRoaXMucHJvcHMpfVxuICAgICAgICAgICAgcmVmPXsoaW5wdXQpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5pbnB1dCA9IGlucHV0O1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5vblJlbmFtZUZpZWxkS2V5RG93bn1cbiAgICAgICAgICAvPlxuXG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkFkZEJ1dHRvbkNsaWNrfVxuICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuaXNBZGREaXNhYmxlZCgpfVxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAge3RyYW5zbGF0aW9ucy5hZGR9XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkRlbGV0ZUJ1dHRvbkNsaWNrfVxuICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuaXNEZWxldGVEaXNhYmxlZCgpfVxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAge3RyYW5zbGF0aW9ucy5kZWxldGV9XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDwvQ29udHJvbHM+XG4gICAgICA8L0NvbnRhaW5lcj5cbiAgICApO1xuICB9XG59XG5cbkhpZXJhcmNoeVRyZWVTZWxlY3RvckNvbnRyb2xCYXIucHJvcFR5cGVzID0ge1xuICBvbkFkZE5ld0NsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBvbkRlbGV0ZUNsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBvbklucHV0Q2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBpZEtleTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICB2YWx1ZUtleTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBjaGlsZEtleTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICB0cmFuc2xhdGlvbnM6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgYWRkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRlbGV0ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICByZW5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGVmYXVsdE5ld05vZGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIH0pLmlzUmVxdWlyZWQsXG4gIHNlbGVjdGVkVHJlZUl0ZW06IFByb3BUeXBlcy5zaGFwZSh7fSksXG4gIGlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIGhlaWdodDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBzaW5nbGVSb290OiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxufTtcblxuSGllcmFyY2h5VHJlZVNlbGVjdG9yQ29udHJvbEJhci5kZWZhdWx0UHJvcHMgPSB7XG4gIHNlbGVjdGVkVHJlZUl0ZW06IG51bGwsXG59O1xuIl19