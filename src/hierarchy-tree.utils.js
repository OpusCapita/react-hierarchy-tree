/**
 * Is selected item a parent (has a [childKey])
 * @returns {boolean}
 */
export const isSelectedTreeItemParent = (props) => {
  const { childKey, selectedTreeItem } = props;
  return selectedTreeItem ? !!selectedTreeItem[childKey] : false;
};

export const defaultTranslations = {
  add: 'Add level',
  delete: 'Delete',
  rename: 'Rename',
  gridTitle: 'Grid',
  treeTitle: 'Hierarchy',
  defaultNewNode: 'New node',
};
