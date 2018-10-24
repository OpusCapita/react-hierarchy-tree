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
    if (this.props.selectedValue !== nextProps.selectedValue) {
      this.setState({ value: nextProps.selectedValue || '' });
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
    });
  };

  onDeleteButtonClick = () => {
    const { onDeleteClick } = this.props;
    onDeleteClick();
  };

  render() {
    const {
      addDisabled, inputDisabled, deleteDisabled, translations,
    } = this.props;

    return (
      <Container>
        <Primitive.Input
          onChange={this.onInputChange}
          value={this.state.value}
          disabled={inputDisabled}
        />
        <Button onClick={this.onAddButtonClick} disabled={addDisabled}>{translations.add}</Button>
        <Button
          onClick={this.onDeleteButtonClick}
          disabled={deleteDisabled}
        >
          {translations.delete}
        </Button>
      </Container>
    );
  }
}

HierarchyTreeSelectorControlBar.propTypes = {
  addDisabled: PropTypes.bool,
  deleteDisabled: PropTypes.bool,
  inputDisabled: PropTypes.bool,
  onAddNewClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  defaultNewNodeValue: PropTypes.string.isRequired,
  selectedValue: PropTypes.string,
  onInputChange: PropTypes.func.isRequired,
  idKey: PropTypes.string.isRequired,
  valueKey: PropTypes.string.isRequired,
  childKey: PropTypes.string.isRequired,
  translations: PropTypes.shape({}).isRequired,
};

HierarchyTreeSelectorControlBar.defaultProps = {
  addDisabled: false,
  deleteDisabled: false,
  inputDisabled: false,
  selectedValue: null,
};

