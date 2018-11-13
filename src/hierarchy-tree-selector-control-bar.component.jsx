import React from 'react';
import PropTypes from 'prop-types';
import { Primitive } from '@opuscapita/oc-cm-common-layouts';
import styled from 'styled-components';
import uuid from 'uuid';

// App imports
import { isSelectedTreeItemParent } from './hierarchy-tree.utils';
import ExpandAllToggle from './hierarchy-tree-selector-expand-all-toggle.component';

const RenameLabel = styled.label`
  margin: 0 ${props => props.theme.halfGutterWidth} 0 0;
`;

const Container = styled.div`
  height: ${props => props.height};
  display: flex;
  align-items: center;
`;

const Button = styled(Primitive.Button)`
  margin-left: ${props => props.theme.halfGutterWidth};
  min-width: 120px;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: 0;
`;

const RenameField = styled(Primitive.Input)`
  min-width: 200px;
`;
export default class HierarchyTreeSelectorControlBar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedTreeItem !== nextProps.selectedTreeItem) {
      const inputValue = nextProps.selectedTreeItem &&
      isSelectedTreeItemParent(nextProps) ?
        nextProps.selectedTreeItem[nextProps.valueKey] : '';
      this.setState({ value: inputValue });
    }
  }

  onInputChange = (e) => {
    this.setState({ value: e.target.value }, () => {
      this.props.onInputChange(this.state.value);
    });
  };

  onAddButtonClick = () => {
    const {
      onAddNewClick, translations, idKey, valueKey, childKey,
    } = this.props;

    onAddNewClick({
      [idKey]: uuid(),
      [valueKey]: translations.defaultNewNode,
      [childKey]: [],
    }, () => {
      this.input.select();
      this.input.focus();
    });
  };

  onDeleteButtonClick = () => {
    const { onDeleteClick } = this.props;
    onDeleteClick();
  };

  /**
   * Is add button disabled. Add button is disabled, if:
   * - selected tree node is a leaf
   * - contains leafs
   * @returns {boolean}
   */
  isAddDisabled = () => {
    const { selectedTreeItem, childKey } = this.props;
    if (!selectedTreeItem) return false;
    return !isSelectedTreeItemParent(this.props) ||
      !!selectedTreeItem[childKey].find(childItem => !childItem[childKey]);
  };

  render() {
    const {
      translations, id, height, onExpandAllClick, expandAll,
    } = this.props;

    return (
      <Container height={height}>
        <ExpandAllToggle expandAll={expandAll} onClick={onExpandAllClick} />
        <Primitive.Subtitle>{translations.treeTitle}</Primitive.Subtitle>
        <Controls>
          <RenameLabel htmlFor={`${id}-node-name-input`}>{translations.rename}</RenameLabel>
          <RenameField
            onChange={this.onInputChange}
            id={`${id}-node-name-input`}
            value={this.state.value}
            disabled={!isSelectedTreeItemParent(this.props)}
            innerRef={(input) => {
              this.input = input;
            }}
          />
          <Button
            onClick={this.onAddButtonClick}
            disabled={this.isAddDisabled()}
          >
            {translations.add}
          </Button>
          <Button
            onClick={this.onDeleteButtonClick}
            disabled={!isSelectedTreeItemParent(this.props)}
          >
            {translations.delete}
          </Button>
        </Controls>
      </Container>
    );
  }
}

HierarchyTreeSelectorControlBar.propTypes = {
  onAddNewClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onExpandAllClick: PropTypes.func.isRequired,
  idKey: PropTypes.string.isRequired,
  valueKey: PropTypes.string.isRequired,
  childKey: PropTypes.string.isRequired,
  translations: PropTypes.shape({}).isRequired,
  selectedTreeItem: PropTypes.shape({}),
  id: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  expandAll: PropTypes.bool.isRequired,
};

HierarchyTreeSelectorControlBar.defaultProps = {
  selectedTreeItem: null,
};

