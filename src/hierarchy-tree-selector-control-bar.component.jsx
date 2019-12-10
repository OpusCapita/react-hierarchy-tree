import React from 'react';
import PropTypes from 'prop-types';
import { Primitive } from '@opuscapita/oc-cm-common-layouts';
import styled from 'styled-components';
import uuid from 'uuid';

// App imports
import { isSelectedTreeItemParent, isSelectedTreeItemRoot } from './hierarchy-tree.utils';

const RenameLabel = styled.label`
  margin: 0 ${props => props.theme.halfGutterWidth} 0 0;
  white-space: nowrap;
`;

const Container = styled.div`
  height: ${props => props.height};
  display: flex;
  align-items: center;
`;

const Button = styled(Primitive.Button)`
  margin-left: ${props => props.theme.halfGutterWidth};
  min-width: 124px;
  padding: 0.5rem;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: 0;
`;

const RenameField = styled(Primitive.Input)`
  min-width: 200px;
  margin-right: 4rem;
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
      const inputValue = nextProps.selectedTreeItem
      && isSelectedTreeItemParent(nextProps)
        ? nextProps.selectedTreeItem[nextProps.valueKey] : '';
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
      setTimeout(() => {
        this.input.select();
        this.input.focus();
      }, 50);
    });
  };

  onDeleteButtonClick = () => {
    const { onDeleteClick } = this.props;
    onDeleteClick();
  };

  /**
   * Blur on enter key press
   * @param e
   */
  onRenameFieldKeyDown = (e) => {
    if (e.keyCode === 13) this.input.blur();
  };

  /**
   * Is add button disabled. Add button is disabled, if:
   * - selected tree node is a leaf
   * - contains leafs
   * @returns {boolean}
   */
  isAddDisabled = () => {
    const {
      selectedTreeItem, childKey, singleRoot,
    } = this.props;

    // If only a single root is allowed, we can't add new items if no items are selected
    if (!selectedTreeItem) return singleRoot;
    return !isSelectedTreeItemParent(this.props)
    || !!selectedTreeItem[childKey].find(childItem => !childItem[childKey]);
  };

  /**
   * Is delete button disabled. Delete button is disabled, if:
   * - single root is enabled and selected item is a root
   * - selected item is a leaf
   * @returns {boolean}
   */
  isDeleteDisabled = () => {
    const { singleRoot } = this.props;
    if (!this.props.selectedTreeItem) return true;
    return !!(singleRoot && isSelectedTreeItemRoot(this.props));
  };

  render() {
    const {
      translations, id, height,
    } = this.props;

    return (
      <Container height={height}>
        <Controls>
          <RenameLabel htmlFor={`${id}-node-name-input`}>{translations.rename}</RenameLabel>
          <RenameField
            onChange={this.onInputChange}
            id={`${id}-node-name-input`}
            value={this.state.value}
            disabled={!isSelectedTreeItemParent(this.props)}
            ref={(input) => {
              this.input = input;
            }}
            onKeyDown={this.onRenameFieldKeyDown}
          />

          <Button
            onClick={this.onAddButtonClick}
            disabled={this.isAddDisabled()}
            type="button"
          >
            {translations.add}
          </Button>
          <Button
            onClick={this.onDeleteButtonClick}
            disabled={this.isDeleteDisabled()}
            type="button"
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
  idKey: PropTypes.string.isRequired,
  valueKey: PropTypes.string.isRequired,
  childKey: PropTypes.string.isRequired,
  translations: PropTypes.shape({
    add: PropTypes.string,
    delete: PropTypes.string,
    rename: PropTypes.string,
    defaultNewNode: PropTypes.string,
  }).isRequired,
  selectedTreeItem: PropTypes.shape({}),
  id: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  singleRoot: PropTypes.bool.isRequired,
};

HierarchyTreeSelectorControlBar.defaultProps = {
  selectedTreeItem: null,
};
