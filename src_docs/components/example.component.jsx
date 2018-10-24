import React from 'react';
import { connect } from 'react-redux';
import { DatagridActions } from '@opuscapita/react-grid';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from '@opuscapita/oc-cm-common-layouts';
import { PropTypes } from 'prop-types';
// App imports
import HierarchyTreeSelector from '../../src/index';
import exampleTreeData from './treedata.json';
import exampleListData from './listdata.json';

const mapDispatchToProps = {
  setData: DatagridActions.setData,
};

const mapStateToProps = () => ({});

const GRID = {
  id: 'example-grid',
  idKeyPath: ['id'],
};

const GRID_COLUMNS = [{
  header: 'Name',
  valueKeyPath: ['name'],
  valueType: 'text',
  componentType: 'text',

}, {
  header: 'Age',
  valueKeyPath: ['age'],
  valueType: 'text',
  componentType: 'text',
}];

const HierarchySelector = styled(HierarchyTreeSelector)`
  height: 500px;
`;

@connect(mapStateToProps, mapDispatchToProps)
export default class ComponentView extends React.PureComponent {
  static propTypes = {
    setData: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      treeData: exampleTreeData,
    };
  }

  componentDidMount() {
    this.props.setData(GRID, GRID_COLUMNS, exampleListData);
  }

  onChange = (treeData) => {
    this.setState({
      treeData,
    });
  };

  render() {
    const { treeData } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <div style={{ padding: '20px' }}>
          <HierarchySelector
            onChange={this.onChange}
            treeData={treeData}
            grid={GRID}
            gridColumns={GRID_COLUMNS}
            defaultNewNodeName="New parent item"
          />
        </div>
      </ThemeProvider>

    );
  }
}
