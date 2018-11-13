/**
 * Is selected item a parent (has a [childKey])
 * @returns {boolean}
 */
export var isSelectedTreeItemParent = function isSelectedTreeItemParent(props) {
  var childKey = props.childKey,
      selectedTreeItem = props.selectedTreeItem;

  return selectedTreeItem ? !!selectedTreeItem[childKey] : false;
};

export var defaultTranslations = {
  add: 'Add level',
  defaultNewNode: 'New node',
  delete: 'Delete',
  gridTitle: 'Grid',
  noTreeItems: 'No tree items',
  rename: 'Rename',
  treeTitle: 'Hierarchy',
  deleteConfirmDialog: {
    titleText: 'Delete',
    bodyText: 'Do you want to delete this item?',
    okButtonText: 'Delete',
    cancelButtonText: 'Cancel'
  }
};