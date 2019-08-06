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
  delete: 'Delete',
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