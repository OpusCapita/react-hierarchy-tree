/**
 * Is selected item a parent (has a [childKey])
 * @returns {boolean}
 */
export const isSelectedTreeItemParent = (props) => {
  const { childKey, selectedTreeItem } = props;
  return selectedTreeItem ? !!selectedTreeItem[childKey] : false;
};

export const isSelectedTreeItemRoot = (props) => {
  const { selectedTreeItem, treeData, idKey } = props;
  if (!selectedTreeItem) return false;
  return treeData.find(item => item[idKey] === selectedTreeItem[idKey]);
};

export const defaultTranslations = {
  add: 'Add level',
  defaultNewNode: 'New node',
  delete: 'Delete',
  gridTitle: 'Grid',
  noTreeItems: 'No tree items',
  rename: 'Rename',
  treeTitle: 'Hierarchy',
  deleteConfirmDialog: {
    title: 'Delete',
    body: 'Do you want to delete this item?',
    ok: 'Delete',
    cancel: 'Cancel',
  },
};
