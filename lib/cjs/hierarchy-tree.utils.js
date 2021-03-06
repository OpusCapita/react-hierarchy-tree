"use strict";

exports.__esModule = true;
exports.defaultTranslations = exports.isSelectedTreeItemRoot = exports.isSelectedTreeItemParent = void 0;

/**
 * Is selected item a parent (has a [childKey])
 * @returns {boolean}
 */
var isSelectedTreeItemParent = function isSelectedTreeItemParent(props) {
  var childKey = props.childKey,
      selectedTreeItem = props.selectedTreeItem;
  return selectedTreeItem ? !!selectedTreeItem[childKey] : false;
};

exports.isSelectedTreeItemParent = isSelectedTreeItemParent;

var isSelectedTreeItemRoot = function isSelectedTreeItemRoot(props) {
  var selectedTreeItem = props.selectedTreeItem,
      treeData = props.treeData,
      idKey = props.idKey;
  if (!selectedTreeItem) return false;
  return treeData.find(function (item) {
    return item[idKey] === selectedTreeItem[idKey];
  });
};

exports.isSelectedTreeItemRoot = isSelectedTreeItemRoot;
var defaultTranslations = {
  add: 'Add level',
  defaultNewNode: 'New node',
  "delete": 'Delete',
  gridTitle: 'Grid',
  noTreeItems: 'No tree items',
  rename: 'Level name',
  treeTitle: 'Hierarchy',
  deleteConfirmDialog: {
    title: 'Delete',
    body: 'Do you want to delete this item?',
    ok: 'Delete',
    cancel: 'Cancel'
  }
};
exports.defaultTranslations = defaultTranslations;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWVyYXJjaHktdHJlZS51dGlscy5qcyJdLCJuYW1lcyI6WyJpc1NlbGVjdGVkVHJlZUl0ZW1QYXJlbnQiLCJwcm9wcyIsImNoaWxkS2V5Iiwic2VsZWN0ZWRUcmVlSXRlbSIsImlzU2VsZWN0ZWRUcmVlSXRlbVJvb3QiLCJ0cmVlRGF0YSIsImlkS2V5IiwiZmluZCIsIml0ZW0iLCJkZWZhdWx0VHJhbnNsYXRpb25zIiwiYWRkIiwiZGVmYXVsdE5ld05vZGUiLCJncmlkVGl0bGUiLCJub1RyZWVJdGVtcyIsInJlbmFtZSIsInRyZWVUaXRsZSIsImRlbGV0ZUNvbmZpcm1EaWFsb2ciLCJ0aXRsZSIsImJvZHkiLCJvayIsImNhbmNlbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7OztBQUlPLElBQU1BLHdCQUF3QixHQUFHLFNBQTNCQSx3QkFBMkIsQ0FBQ0MsS0FBRCxFQUFXO0FBQUEsTUFDekNDLFFBRHlDLEdBQ1ZELEtBRFUsQ0FDekNDLFFBRHlDO0FBQUEsTUFDL0JDLGdCQUQrQixHQUNWRixLQURVLENBQy9CRSxnQkFEK0I7QUFFakQsU0FBT0EsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDQSxnQkFBZ0IsQ0FBQ0QsUUFBRCxDQUFyQixHQUFrQyxLQUF6RDtBQUNELENBSE07Ozs7QUFLQSxJQUFNRSxzQkFBc0IsR0FBRyxTQUF6QkEsc0JBQXlCLENBQUNILEtBQUQsRUFBVztBQUFBLE1BQ3ZDRSxnQkFEdUMsR0FDREYsS0FEQyxDQUN2Q0UsZ0JBRHVDO0FBQUEsTUFDckJFLFFBRHFCLEdBQ0RKLEtBREMsQ0FDckJJLFFBRHFCO0FBQUEsTUFDWEMsS0FEVyxHQUNETCxLQURDLENBQ1hLLEtBRFc7QUFFL0MsTUFBSSxDQUFDSCxnQkFBTCxFQUF1QixPQUFPLEtBQVA7QUFDdkIsU0FBT0UsUUFBUSxDQUFDRSxJQUFULENBQWMsVUFBQUMsSUFBSTtBQUFBLFdBQUlBLElBQUksQ0FBQ0YsS0FBRCxDQUFKLEtBQWdCSCxnQkFBZ0IsQ0FBQ0csS0FBRCxDQUFwQztBQUFBLEdBQWxCLENBQVA7QUFDRCxDQUpNOzs7QUFNQSxJQUFNRyxtQkFBbUIsR0FBRztBQUNqQ0MsRUFBQUEsR0FBRyxFQUFFLFdBRDRCO0FBRWpDQyxFQUFBQSxjQUFjLEVBQUUsVUFGaUI7QUFHakMsWUFBUSxRQUh5QjtBQUlqQ0MsRUFBQUEsU0FBUyxFQUFFLE1BSnNCO0FBS2pDQyxFQUFBQSxXQUFXLEVBQUUsZUFMb0I7QUFNakNDLEVBQUFBLE1BQU0sRUFBRSxZQU55QjtBQU9qQ0MsRUFBQUEsU0FBUyxFQUFFLFdBUHNCO0FBUWpDQyxFQUFBQSxtQkFBbUIsRUFBRTtBQUNuQkMsSUFBQUEsS0FBSyxFQUFFLFFBRFk7QUFFbkJDLElBQUFBLElBQUksRUFBRSxrQ0FGYTtBQUduQkMsSUFBQUEsRUFBRSxFQUFFLFFBSGU7QUFJbkJDLElBQUFBLE1BQU0sRUFBRTtBQUpXO0FBUlksQ0FBNUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIElzIHNlbGVjdGVkIGl0ZW0gYSBwYXJlbnQgKGhhcyBhIFtjaGlsZEtleV0pXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGlzU2VsZWN0ZWRUcmVlSXRlbVBhcmVudCA9IChwcm9wcykgPT4ge1xuICBjb25zdCB7IGNoaWxkS2V5LCBzZWxlY3RlZFRyZWVJdGVtIH0gPSBwcm9wcztcbiAgcmV0dXJuIHNlbGVjdGVkVHJlZUl0ZW0gPyAhIXNlbGVjdGVkVHJlZUl0ZW1bY2hpbGRLZXldIDogZmFsc2U7XG59O1xuXG5leHBvcnQgY29uc3QgaXNTZWxlY3RlZFRyZWVJdGVtUm9vdCA9IChwcm9wcykgPT4ge1xuICBjb25zdCB7IHNlbGVjdGVkVHJlZUl0ZW0sIHRyZWVEYXRhLCBpZEtleSB9ID0gcHJvcHM7XG4gIGlmICghc2VsZWN0ZWRUcmVlSXRlbSkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gdHJlZURhdGEuZmluZChpdGVtID0+IGl0ZW1baWRLZXldID09PSBzZWxlY3RlZFRyZWVJdGVtW2lkS2V5XSk7XG59O1xuXG5leHBvcnQgY29uc3QgZGVmYXVsdFRyYW5zbGF0aW9ucyA9IHtcbiAgYWRkOiAnQWRkIGxldmVsJyxcbiAgZGVmYXVsdE5ld05vZGU6ICdOZXcgbm9kZScsXG4gIGRlbGV0ZTogJ0RlbGV0ZScsXG4gIGdyaWRUaXRsZTogJ0dyaWQnLFxuICBub1RyZWVJdGVtczogJ05vIHRyZWUgaXRlbXMnLFxuICByZW5hbWU6ICdMZXZlbCBuYW1lJyxcbiAgdHJlZVRpdGxlOiAnSGllcmFyY2h5JyxcbiAgZGVsZXRlQ29uZmlybURpYWxvZzoge1xuICAgIHRpdGxlOiAnRGVsZXRlJyxcbiAgICBib2R5OiAnRG8geW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgaXRlbT8nLFxuICAgIG9rOiAnRGVsZXRlJyxcbiAgICBjYW5jZWw6ICdDYW5jZWwnLFxuICB9LFxufTtcbiJdfQ==