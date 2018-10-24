import React from 'react';
import { Icon } from '@opuscapita/react-icons';
import PropTypes from 'prop-types';
import { Primitive } from '@opuscapita/oc-cm-common-layouts';
import styled from 'styled-components';
// App imports

const Arrow = styled(Icon)`
  opacity: ${props => (props.disabled ? '0.5' : '1')};
`;
const HierarchyTreeSelectorArrows = ({ icon, onClick, disabled }) => (
  <Primitive.BorderlessButton onClick={onClick} disabled={disabled}>
    <Arrow type="indicator" name={icon} disabled={disabled} />
  </Primitive.BorderlessButton>
);

HierarchyTreeSelectorArrows.propTypes = {
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

HierarchyTreeSelectorArrows.defaultProps = {
  disabled: true,
};

export default HierarchyTreeSelectorArrows;
