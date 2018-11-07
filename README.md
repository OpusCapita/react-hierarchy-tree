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
| propName                 | string           |                                          | Describe the prop here                   |

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
