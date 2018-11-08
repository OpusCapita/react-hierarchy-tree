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
  defaultNewNode: 'New node',
  delete: 'Delete',
  gridTitle: 'Grid',
  noTreeItems: 'No tree items',
  rename: 'Rename',
  treeTitle: 'Hierarchy',
};
