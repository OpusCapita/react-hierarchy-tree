import React from 'react';
import PropTypes from 'prop-types';
import { Primitive } from '@opuscapita/oc-cm-common-layouts';
import { FaCaretDown, FaCaretRight } from 'react-icons/fa';
import styled from 'styled-components';

const Button = styled(Primitive.BorderlessButton)`
  margin-right: ${props => props.theme.gutterWidth};
  font-size: 18px;
  align-items: center;
  display: flex;
  line-height: 1;
`;

export default class HierarchyTreeSelectorExpandAllToggle extends React.PureComponent {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    expandAll: PropTypes.bool.isRequired,
  };

  static defaultProps = {};


  render() {
    const { onClick, expandAll } = this.props;
    return (

      <Button onClick={onClick}>
        {expandAll ? <FaCaretDown /> : <FaCaretRight />}
      </Button>
    );
  }
}
