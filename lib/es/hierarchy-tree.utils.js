/**
 * Is selected item a parent (has a [childKey])
 * @returns {boolean}
 */
export var isSelectedTreeItemParent = function isSelectedTreeItemParent(props) {
  var childKey = props.childKey,
      selectedTreeItem = props.selectedTreeItem;
  return selectedTreeItem ? !!selectedTreeItem[childKey] : false;
};
export var isSelectedTreeItemRoot = function isSelectedTreeItemRoot(props) {
  var selectedTreeItem = props.selectedTreeItem,
      treeData = props.treeData,
      idKey = props.idKey;
  if (!selectedTreeItem) return false;
  return treeData.find(function (item) {
    return item[idKey] === selectedTreeItem[idKey];
  });
};
export var defaultTranslations = {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWVyYXJjaHktdHJlZS51dGlscy5qcyJdLCJuYW1lcyI6WyJpc1NlbGVjdGVkVHJlZUl0ZW1QYXJlbnQiLCJwcm9wcyIsImNoaWxkS2V5Iiwic2VsZWN0ZWRUcmVlSXRlbSIsImlzU2VsZWN0ZWRUcmVlSXRlbVJvb3QiLCJ0cmVlRGF0YSIsImlkS2V5IiwiZmluZCIsIml0ZW0iLCJkZWZhdWx0VHJhbnNsYXRpb25zIiwiYWRkIiwiZGVmYXVsdE5ld05vZGUiLCJncmlkVGl0bGUiLCJub1RyZWVJdGVtcyIsInJlbmFtZSIsInRyZWVUaXRsZSIsImRlbGV0ZUNvbmZpcm1EaWFsb2ciLCJ0aXRsZSIsImJvZHkiLCJvayIsImNhbmNlbCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7QUFJQSxPQUFPLElBQU1BLHdCQUF3QixHQUFHLFNBQTNCQSx3QkFBMkIsQ0FBQ0MsS0FBRCxFQUFXO0FBQUEsTUFDekNDLFFBRHlDLEdBQ1ZELEtBRFUsQ0FDekNDLFFBRHlDO0FBQUEsTUFDL0JDLGdCQUQrQixHQUNWRixLQURVLENBQy9CRSxnQkFEK0I7QUFFakQsU0FBT0EsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDQSxnQkFBZ0IsQ0FBQ0QsUUFBRCxDQUFyQixHQUFrQyxLQUF6RDtBQUNELENBSE07QUFLUCxPQUFPLElBQU1FLHNCQUFzQixHQUFHLFNBQXpCQSxzQkFBeUIsQ0FBQ0gsS0FBRCxFQUFXO0FBQUEsTUFDdkNFLGdCQUR1QyxHQUNERixLQURDLENBQ3ZDRSxnQkFEdUM7QUFBQSxNQUNyQkUsUUFEcUIsR0FDREosS0FEQyxDQUNyQkksUUFEcUI7QUFBQSxNQUNYQyxLQURXLEdBQ0RMLEtBREMsQ0FDWEssS0FEVztBQUUvQyxNQUFJLENBQUNILGdCQUFMLEVBQXVCLE9BQU8sS0FBUDtBQUN2QixTQUFPRSxRQUFRLENBQUNFLElBQVQsQ0FBYyxVQUFBQyxJQUFJO0FBQUEsV0FBSUEsSUFBSSxDQUFDRixLQUFELENBQUosS0FBZ0JILGdCQUFnQixDQUFDRyxLQUFELENBQXBDO0FBQUEsR0FBbEIsQ0FBUDtBQUNELENBSk07QUFNUCxPQUFPLElBQU1HLG1CQUFtQixHQUFHO0FBQ2pDQyxFQUFBQSxHQUFHLEVBQUUsV0FENEI7QUFFakNDLEVBQUFBLGNBQWMsRUFBRSxVQUZpQjtBQUdqQyxZQUFRLFFBSHlCO0FBSWpDQyxFQUFBQSxTQUFTLEVBQUUsTUFKc0I7QUFLakNDLEVBQUFBLFdBQVcsRUFBRSxlQUxvQjtBQU1qQ0MsRUFBQUEsTUFBTSxFQUFFLFlBTnlCO0FBT2pDQyxFQUFBQSxTQUFTLEVBQUUsV0FQc0I7QUFRakNDLEVBQUFBLG1CQUFtQixFQUFFO0FBQ25CQyxJQUFBQSxLQUFLLEVBQUUsUUFEWTtBQUVuQkMsSUFBQUEsSUFBSSxFQUFFLGtDQUZhO0FBR25CQyxJQUFBQSxFQUFFLEVBQUUsUUFIZTtBQUluQkMsSUFBQUEsTUFBTSxFQUFFO0FBSlc7QUFSWSxDQUE1QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogSXMgc2VsZWN0ZWQgaXRlbSBhIHBhcmVudCAoaGFzIGEgW2NoaWxkS2V5XSlcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5leHBvcnQgY29uc3QgaXNTZWxlY3RlZFRyZWVJdGVtUGFyZW50ID0gKHByb3BzKSA9PiB7XG4gIGNvbnN0IHsgY2hpbGRLZXksIHNlbGVjdGVkVHJlZUl0ZW0gfSA9IHByb3BzO1xuICByZXR1cm4gc2VsZWN0ZWRUcmVlSXRlbSA/ICEhc2VsZWN0ZWRUcmVlSXRlbVtjaGlsZEtleV0gOiBmYWxzZTtcbn07XG5cbmV4cG9ydCBjb25zdCBpc1NlbGVjdGVkVHJlZUl0ZW1Sb290ID0gKHByb3BzKSA9PiB7XG4gIGNvbnN0IHsgc2VsZWN0ZWRUcmVlSXRlbSwgdHJlZURhdGEsIGlkS2V5IH0gPSBwcm9wcztcbiAgaWYgKCFzZWxlY3RlZFRyZWVJdGVtKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiB0cmVlRGF0YS5maW5kKGl0ZW0gPT4gaXRlbVtpZEtleV0gPT09IHNlbGVjdGVkVHJlZUl0ZW1baWRLZXldKTtcbn07XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0VHJhbnNsYXRpb25zID0ge1xuICBhZGQ6ICdBZGQgbGV2ZWwnLFxuICBkZWZhdWx0TmV3Tm9kZTogJ05ldyBub2RlJyxcbiAgZGVsZXRlOiAnRGVsZXRlJyxcbiAgZ3JpZFRpdGxlOiAnR3JpZCcsXG4gIG5vVHJlZUl0ZW1zOiAnTm8gdHJlZSBpdGVtcycsXG4gIHJlbmFtZTogJ0xldmVsIG5hbWUnLFxuICB0cmVlVGl0bGU6ICdIaWVyYXJjaHknLFxuICBkZWxldGVDb25maXJtRGlhbG9nOiB7XG4gICAgdGl0bGU6ICdEZWxldGUnLFxuICAgIGJvZHk6ICdEbyB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyBpdGVtPycsXG4gICAgb2s6ICdEZWxldGUnLFxuICAgIGNhbmNlbDogJ0NhbmNlbCcsXG4gIH0sXG59O1xuIl19