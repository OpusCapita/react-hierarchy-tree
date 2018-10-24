function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import './example.component.scss';

var Example = function (_React$PureComponent) {
  _inherits(Example, _React$PureComponent);

  function Example() {
    _classCallCheck(this, Example);

    return _possibleConstructorReturn(this, _React$PureComponent.apply(this, arguments));
  }

  Example.prototype.render = function render() {
    return React.createElement(
      'div',
      null,
      'Example component'
    );
  };

  return Example;
}(React.PureComponent);

export { Example as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9leGFtcGxlLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJFeGFtcGxlIiwicmVuZGVyIiwiUHVyZUNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU8sMEJBQVA7O0lBRXFCQyxPOzs7Ozs7Ozs7b0JBQ25CQyxNLHFCQUFTO0FBQ1AsV0FDRTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBREY7QUFLRCxHOzs7RUFQa0NGLE1BQU1HLGE7O1NBQXRCRixPIiwiZmlsZSI6ImV4YW1wbGUuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCAnLi9leGFtcGxlLmNvbXBvbmVudC5zY3NzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXhhbXBsZSBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIEV4YW1wbGUgY29tcG9uZW50XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0=