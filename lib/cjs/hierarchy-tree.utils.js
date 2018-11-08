'use strict';

exports.__esModule = true;
/**
 * Is selected item a parent (has a [childKey])
 * @returns {boolean}
 */
var isSelectedTreeItemParent = exports.isSelectedTreeItemParent = function isSelectedTreeItemParent(props) {
  var childKey = props.childKey,
      selectedTreeItem = props.selectedTreeItem;

  return selectedTreeItem ? !!selectedTreeItem[childKey] : false;
};

var defaultTranslations = exports.defaultTranslations = {
  add: 'Add level',
  defaultNewNode: 'New node',
  delete: 'Delete',
  gridTitle: 'Grid',
  noTreeItems: 'No tree items',
  rename: 'Rename',
  treeTitle: 'Hierarchy'
};