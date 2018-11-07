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
  delete: 'Delete',
  rename: 'Rename',
  gridTitle: 'Grid',
  treeTitle: 'Hierarchy',
  defaultNewNode: 'New node'
};