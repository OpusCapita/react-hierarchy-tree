import React from 'react';
import PropTypes from 'prop-types';
import { Primitive } from '@opuscapita/oc-cm-common-layouts';
import styled from 'styled-components';
import uuid from 'uuid';
// App imports

const Container = styled.div`
  height:34px;
  display:flex;
  margin-bottom: ${props => props.theme.gutterWidth};
`;

const Button = styled(Primitive.Button)`
  margin-left: ${props => props.theme.halfGutterWidth};
  width: 120px;
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
      const inputValue = nextProps.selectedTreeItem ?
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
      onAddNewClick, defaultNewNodeValue, idKey, valueKey, childKey,
    } = this.props;

    onAddNewClick({
      [idKey]: uuid(),
      [valueKey]: defaultNewNodeValue,
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
   * Is selected item a parent (has a [childKey])
   * @returns {boolean}
   */
  isSelectedTreeItemParent = () => {
    const { childKey, selectedTreeItem } = this.props;
    return selectedTreeItem ? !!selectedTreeItem[childKey] : false;
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
    return !this.isSelectedTreeItemParent() ||
      !!selectedTreeItem[childKey].find(childItem => !childItem[childKey]);
  };

  render() {
    const { translations } = this.props;

    return (
      <Container>
        <Primitive.Input
          onChange={this.onInputChange}
          value={this.state.value}
          disabled={!this.isSelectedTreeItemParent()}
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
          disabled={!this.isSelectedTreeItemParent()}
        >
          {translations.delete}
        </Button>
      </Container>
    );
  }
}

HierarchyTreeSelectorControlBar.propTypes = {
  onAddNewClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  defaultNewNodeValue: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  idKey: PropTypes.string.isRequired,
  valueKey: PropTypes.string.isRequired,
  childKey: PropTypes.string.isRequired,
  translations: PropTypes.shape({}).isRequired,
  selectedTreeItem: PropTypes.shape({}),
};

HierarchyTreeSelectorControlBar.defaultProps = {
  selectedTreeItem: null,
};

