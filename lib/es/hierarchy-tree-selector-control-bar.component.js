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
  var data = _taggedTemplateLiteralLoose(["\n  margin-left: ", ";\n  min-width: 120px;\n"]);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWVyYXJjaHktdHJlZS1zZWxlY3Rvci1jb250cm9sLWJhci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiUHJpbWl0aXZlIiwic3R5bGVkIiwidXVpZCIsImlzU2VsZWN0ZWRUcmVlSXRlbVBhcmVudCIsImlzU2VsZWN0ZWRUcmVlSXRlbVJvb3QiLCJSZW5hbWVMYWJlbCIsImxhYmVsIiwicHJvcHMiLCJ0aGVtZSIsImhhbGZHdXR0ZXJXaWR0aCIsIkNvbnRhaW5lciIsImRpdiIsImhlaWdodCIsIkJ1dHRvbiIsIkNvbnRyb2xzIiwiUmVuYW1lRmllbGQiLCJJbnB1dCIsIkhpZXJhcmNoeVRyZWVTZWxlY3RvckNvbnRyb2xCYXIiLCJlIiwic2V0U3RhdGUiLCJ2YWx1ZSIsInRhcmdldCIsIm9uSW5wdXRDaGFuZ2UiLCJzdGF0ZSIsIm9uQWRkTmV3Q2xpY2siLCJ0cmFuc2xhdGlvbnMiLCJpZEtleSIsInZhbHVlS2V5IiwiY2hpbGRLZXkiLCJkZWZhdWx0TmV3Tm9kZSIsInNldFRpbWVvdXQiLCJpbnB1dCIsInNlbGVjdCIsImZvY3VzIiwib25EZWxldGVDbGljayIsImtleUNvZGUiLCJibHVyIiwic2VsZWN0ZWRUcmVlSXRlbSIsInNpbmdsZVJvb3QiLCJmaW5kIiwiY2hpbGRJdGVtIiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsIm5leHRQcm9wcyIsImlucHV0VmFsdWUiLCJyZW5kZXIiLCJpZCIsInJlbmFtZSIsIm9uUmVuYW1lRmllbGRLZXlEb3duIiwib25BZGRCdXR0b25DbGljayIsImlzQWRkRGlzYWJsZWQiLCJhZGQiLCJvbkRlbGV0ZUJ1dHRvbkNsaWNrIiwiaXNEZWxldGVEaXNhYmxlZCIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxP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QUEsT0FBTyxFQUFLaUMsRUFBTDtBQUFwQixPQUFnRHBCLFlBQVksQ0FBQ3FCLE1BQTdELENBREYsRUFFRSxvQkFBQyxXQUFEO0FBQ0UsTUFBQSxRQUFRLEVBQUUsS0FBS3hCLGFBRGpCO0FBRUUsTUFBQSxFQUFFLEVBQUt1QixFQUFMLHFCQUZKO0FBR0UsTUFBQSxLQUFLLEVBQUUsS0FBS3RCLEtBQUwsQ0FBV0gsS0FIcEI7QUFJRSxNQUFBLFFBQVEsRUFBRSxDQUFDakIsd0JBQXdCLENBQUMsS0FBS0ksS0FBTixDQUpyQztBQUtFLE1BQUEsR0FBRyxFQUFFLGFBQUN3QixLQUFELEVBQVc7QUFDZCxRQUFBLE1BQUksQ0FBQ0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0QsT0FQSDtBQVFFLE1BQUEsU0FBUyxFQUFFLEtBQUtnQjtBQVJsQixNQUZGLEVBYUUsb0JBQUMsTUFBRDtBQUNFLE1BQUEsT0FBTyxFQUFFLEtBQUtDLGdCQURoQjtBQUVFLE1BQUEsUUFBUSxFQUFFLEtBQUtDLGFBQUwsRUFGWjtBQUdFLE1BQUEsSUFBSSxFQUFDO0FBSFAsT0FLR3hCLFlBQVksQ0FBQ3lCLEdBTGhCLENBYkYsRUFvQkUsb0JBQUMsTUFBRDtBQUNFLE1BQUEsT0FBTyxFQUFFLEtBQUtDLG1CQURoQjtBQUVFLE1BQUEsUUFBUSxFQUFFLEtBQUtDLGdCQUFMLEVBRlo7QUFHRSxNQUFBLElBQUksRUFBQztBQUhQLE9BS0czQixZQUFZLFVBTGYsQ0FwQkYsQ0FERixDQURGO0FBZ0NELEc7OztFQXZIMEQzQixLQUFLLENBQUN1RCxhOztTQUE5Q3BDLCtCO0FBNklyQkEsK0JBQStCLENBQUNxQyxZQUFoQyxHQUErQztBQUM3Q2pCLEVBQUFBLGdCQUFnQixFQUFFO0FBRDJCLENBQS9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBQcmltaXRpdmUgfSBmcm9tICdAb3B1c2NhcGl0YS9vYy1jbS1jb21tb24tbGF5b3V0cyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCB1dWlkIGZyb20gJ3V1aWQnO1xuXG4vLyBBcHAgaW1wb3J0c1xuaW1wb3J0IHsgaXNTZWxlY3RlZFRyZWVJdGVtUGFyZW50LCBpc1NlbGVjdGVkVHJlZUl0ZW1Sb290IH0gZnJvbSAnLi9oaWVyYXJjaHktdHJlZS51dGlscyc7XG5cbmNvbnN0IFJlbmFtZUxhYmVsID0gc3R5bGVkLmxhYmVsYFxuICBtYXJnaW46IDAgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5oYWxmR3V0dGVyV2lkdGh9IDAgMDtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbmA7XG5cbmNvbnN0IENvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gIGhlaWdodDogJHtwcm9wcyA9PiBwcm9wcy5oZWlnaHR9O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuYDtcblxuY29uc3QgQnV0dG9uID0gc3R5bGVkKFByaW1pdGl2ZS5CdXR0b24pYFxuICBtYXJnaW4tbGVmdDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5oYWxmR3V0dGVyV2lkdGh9O1xuICBtaW4td2lkdGg6IDEyMHB4O1xuYDtcblxuY29uc3QgQ29udHJvbHMgPSBzdHlsZWQuZGl2YFxuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBtYXJnaW4tbGVmdDogYXV0bztcbiAgbWFyZ2luLXJpZ2h0OiAwO1xuYDtcblxuY29uc3QgUmVuYW1lRmllbGQgPSBzdHlsZWQoUHJpbWl0aXZlLklucHV0KWBcbiAgbWluLXdpZHRoOiAyMDBweDtcbiAgbWFyZ2luLXJpZ2h0OiA0cmVtO1xuYDtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhpZXJhcmNoeVRyZWVTZWxlY3RvckNvbnRyb2xCYXIgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHZhbHVlOiAnJyxcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RlZFRyZWVJdGVtICE9PSBuZXh0UHJvcHMuc2VsZWN0ZWRUcmVlSXRlbSkge1xuICAgICAgY29uc3QgaW5wdXRWYWx1ZSA9IG5leHRQcm9wcy5zZWxlY3RlZFRyZWVJdGVtXG4gICAgICAmJiBpc1NlbGVjdGVkVHJlZUl0ZW1QYXJlbnQobmV4dFByb3BzKVxuICAgICAgICA/IG5leHRQcm9wcy5zZWxlY3RlZFRyZWVJdGVtW25leHRQcm9wcy52YWx1ZUtleV0gOiAnJztcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyB2YWx1ZTogaW5wdXRWYWx1ZSB9KTtcbiAgICB9XG4gIH1cblxuICBvbklucHV0Q2hhbmdlID0gKGUpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgdmFsdWU6IGUudGFyZ2V0LnZhbHVlIH0sICgpID0+IHtcbiAgICAgIHRoaXMucHJvcHMub25JbnB1dENoYW5nZSh0aGlzLnN0YXRlLnZhbHVlKTtcbiAgICB9KTtcbiAgfTtcblxuICBvbkFkZEJ1dHRvbkNsaWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIG9uQWRkTmV3Q2xpY2ssIHRyYW5zbGF0aW9ucywgaWRLZXksIHZhbHVlS2V5LCBjaGlsZEtleSxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIG9uQWRkTmV3Q2xpY2soe1xuICAgICAgW2lkS2V5XTogdXVpZCgpLFxuICAgICAgW3ZhbHVlS2V5XTogdHJhbnNsYXRpb25zLmRlZmF1bHROZXdOb2RlLFxuICAgICAgW2NoaWxkS2V5XTogW10sXG4gICAgfSwgKCkgPT4ge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuaW5wdXQuc2VsZWN0KCk7XG4gICAgICAgIHRoaXMuaW5wdXQuZm9jdXMoKTtcbiAgICAgIH0sIDUwKTtcbiAgICB9KTtcbiAgfTtcblxuICBvbkRlbGV0ZUJ1dHRvbkNsaWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgb25EZWxldGVDbGljayB9ID0gdGhpcy5wcm9wcztcbiAgICBvbkRlbGV0ZUNsaWNrKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEJsdXIgb24gZW50ZXIga2V5IHByZXNzXG4gICAqIEBwYXJhbSBlXG4gICAqL1xuICBvblJlbmFtZUZpZWxkS2V5RG93biA9IChlKSA9PiB7XG4gICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHRoaXMuaW5wdXQuYmx1cigpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBJcyBhZGQgYnV0dG9uIGRpc2FibGVkLiBBZGQgYnV0dG9uIGlzIGRpc2FibGVkLCBpZjpcbiAgICogLSBzZWxlY3RlZCB0cmVlIG5vZGUgaXMgYSBsZWFmXG4gICAqIC0gY29udGFpbnMgbGVhZnNcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBpc0FkZERpc2FibGVkID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIHNlbGVjdGVkVHJlZUl0ZW0sIGNoaWxkS2V5LCBzaW5nbGVSb290LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgLy8gSWYgb25seSBhIHNpbmdsZSByb290IGlzIGFsbG93ZWQsIHdlIGNhbid0IGFkZCBuZXcgaXRlbXMgaWYgbm8gaXRlbXMgYXJlIHNlbGVjdGVkXG4gICAgaWYgKCFzZWxlY3RlZFRyZWVJdGVtKSByZXR1cm4gc2luZ2xlUm9vdDtcbiAgICByZXR1cm4gIWlzU2VsZWN0ZWRUcmVlSXRlbVBhcmVudCh0aGlzLnByb3BzKVxuICAgIHx8ICEhc2VsZWN0ZWRUcmVlSXRlbVtjaGlsZEtleV0uZmluZChjaGlsZEl0ZW0gPT4gIWNoaWxkSXRlbVtjaGlsZEtleV0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBJcyBkZWxldGUgYnV0dG9uIGRpc2FibGVkLiBEZWxldGUgYnV0dG9uIGlzIGRpc2FibGVkLCBpZjpcbiAgICogLSBzaW5nbGUgcm9vdCBpcyBlbmFibGVkIGFuZCBzZWxlY3RlZCBpdGVtIGlzIGEgcm9vdFxuICAgKiAtIHNlbGVjdGVkIGl0ZW0gaXMgYSBsZWFmXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgaXNEZWxldGVEaXNhYmxlZCA9ICgpID0+IHtcbiAgICBjb25zdCB7IHNpbmdsZVJvb3QgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCF0aGlzLnByb3BzLnNlbGVjdGVkVHJlZUl0ZW0pIHJldHVybiB0cnVlO1xuICAgIHJldHVybiAhIShzaW5nbGVSb290ICYmIGlzU2VsZWN0ZWRUcmVlSXRlbVJvb3QodGhpcy5wcm9wcykpO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICB0cmFuc2xhdGlvbnMsIGlkLCBoZWlnaHQsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPENvbnRhaW5lciBoZWlnaHQ9e2hlaWdodH0+XG4gICAgICAgIDxDb250cm9scz5cbiAgICAgICAgICA8UmVuYW1lTGFiZWwgaHRtbEZvcj17YCR7aWR9LW5vZGUtbmFtZS1pbnB1dGB9Pnt0cmFuc2xhdGlvbnMucmVuYW1lfTwvUmVuYW1lTGFiZWw+XG4gICAgICAgICAgPFJlbmFtZUZpZWxkXG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbklucHV0Q2hhbmdlfVxuICAgICAgICAgICAgaWQ9e2Ake2lkfS1ub2RlLW5hbWUtaW5wdXRgfVxuICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUudmFsdWV9XG4gICAgICAgICAgICBkaXNhYmxlZD17IWlzU2VsZWN0ZWRUcmVlSXRlbVBhcmVudCh0aGlzLnByb3BzKX1cbiAgICAgICAgICAgIHJlZj17KGlucHV0KSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuaW5wdXQgPSBpbnB1dDtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvbktleURvd249e3RoaXMub25SZW5hbWVGaWVsZEtleURvd259XG4gICAgICAgICAgLz5cblxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25BZGRCdXR0b25DbGlja31cbiAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLmlzQWRkRGlzYWJsZWQoKX1cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIHt0cmFuc2xhdGlvbnMuYWRkfVxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25EZWxldGVCdXR0b25DbGlja31cbiAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLmlzRGVsZXRlRGlzYWJsZWQoKX1cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIHt0cmFuc2xhdGlvbnMuZGVsZXRlfVxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICA8L0NvbnRyb2xzPlxuICAgICAgPC9Db250YWluZXI+XG4gICAgKTtcbiAgfVxufVxuXG5IaWVyYXJjaHlUcmVlU2VsZWN0b3JDb250cm9sQmFyLnByb3BUeXBlcyA9IHtcbiAgb25BZGROZXdDbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgb25EZWxldGVDbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgb25JbnB1dENoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgaWRLZXk6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgdmFsdWVLZXk6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgY2hpbGRLZXk6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgdHJhbnNsYXRpb25zOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIGFkZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkZWxldGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcmVuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRlZmF1bHROZXdOb2RlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICB9KS5pc1JlcXVpcmVkLFxuICBzZWxlY3RlZFRyZWVJdGVtOiBQcm9wVHlwZXMuc2hhcGUoe30pLFxuICBpZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBoZWlnaHQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgc2luZ2xlUm9vdDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbn07XG5cbkhpZXJhcmNoeVRyZWVTZWxlY3RvckNvbnRyb2xCYXIuZGVmYXVsdFByb3BzID0ge1xuICBzZWxlY3RlZFRyZWVJdGVtOiBudWxsLFxufTtcbiJdfQ==