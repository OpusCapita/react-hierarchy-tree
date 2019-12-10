# react-hierarchy-tree

### Description
Describe the component here

### Installation
```
npm install @opuscapita/react-hierarchy-tree
```

### Demo
View the [DEMO](https://opuscapita.github.io/react-hierarchy-tree)

### Builds
#### UMD
The default build with compiled styles in the .js file. Also minified version available in the lib/umd directory.
#### CommonJS/ES Module
You need to configure your module loader to use `cjs` or `es` fields of the package.json to use these module types.
Also you need to configure sass loader, since all the styles are in sass format.
* With webpack use [resolve.mainFields](https://webpack.js.org/configuration/resolve/#resolve-mainfields) to configure the module type.
* Add [SASS loader](https://github.com/webpack-contrib/sass-loader) to support importing of SASS styles.

### API
| Prop name                | Type             | Default                                  | Description                              |
| ------------------------ | ---------------- | ---------------------------------------- | ---------------------------------------- |
| idKey                    | string           | 'id'                                     | Tree item's unique identifier property   |
| valueKey                 | string           | 'name'                                   | Tree item's name property                |
| childKey                 | string           | 'children'                               | Property where you'll find tree item's children |
| defaultExpandedKeys      | array            | []                                       | Array of items that are expanded by default (ids).  |
| lockedKey                | string           | undefined                                | Property that tells whether node or it's parents can be deleted, moved, etc. |
| sortKey                  | string           | undefined                                | Tree item's property used for grid sorting (if needed) |
| treeData                 | array            | []                                       | Array of tree items |
| onChange                 | func             | required                                 | onChange callback |
| onPreventDelete          | func             | undefined                                | Function that's called when deleting a locked item |
| grid                     | gridShape        | required                                 | @opuscapita/react-grid. See documentation for details |
| gridColumns              | gridColumnShape  | required                                 | @opuscapita/react-grid. See documentation for details |

### Code example
```jsx
import React from 'react';
import HierarchyTree from '@opuscapita/react-hierarchy-tree';

export default class TreeExample extends React.Component {
  render() {
    return (
      <HierarchyTree
        propName="propValue"
      />
    );
  }
}
```
