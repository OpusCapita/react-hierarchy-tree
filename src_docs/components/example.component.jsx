import React from 'react';
import { connect } from 'react-redux';
import { DatagridActions } from '@opuscapita/react-grid';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import { OCAlert } from '@opuscapita/react-alerts';

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

  onDragDropPrevent = () => {
    OCAlert.alertError('I\'m afraid I cannot do that..', { timeOut: 3000 });
  };

  render() {
    const { treeData } = this.state;
    const translations = {
      gridTitle: 'Example persons',
      treeTitle: 'Example hierarchy',
      defaultNewNode: 'New parent item',
    };

    return (
      <HierarchySelector
        onChange={this.onChange}
        treeData={[]}
        grid={GRID}
        gridColumns={GRID_COLUMNS}
        id="test-grid"
        onDragDropPrevent={this.onDragDropPrevent}
        translations={translations}
      />
    );
  }
}
