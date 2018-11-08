import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';
import {isSelectedTreeItemParent} from './hierarchy-tree.utils';
// App imports
import Arrow from './hierarchy-tree-selector-arrow.component';

const Controls = styled.div`
  display: flex;
  max-width: 5rem;
  min-width: 5rem;
  flex-direction: column;
  justify-content: center;
`;
export default class HierarchyTreeSelectorArrowControls extends React.PureComponent {


  /**
   * Is "move to tree" caret disabled. Button is disabled, if:
   *  - selected tree item is not a parent
   *  - no grid items are selected
   *  - item already has parents as a child
   * @returns {boolean}
   */
  isMoveToTreeDisabled = () => {
    const { selectedGridItems, childKey, selectedTreeItem } = this.props;
    return !isSelectedTreeItemParent(this.props) ||
      !selectedGridItems.size ||
      !!selectedTreeItem[childKey].find(childItem => childItem[childKey]);
  };

  render() {
    const { onMoveToGridClick, onMoveToTreeClick, selectedTreeItem } = this.props;
    return (
      <Controls>
        <Arrow
          icon="CaretLeft"
          onClick={onMoveToTreeClick}
          disabled={this.isMoveToTreeDisabled()}
        />
        <Arrow
          icon="CaretRight"
          onClick={onMoveToGridClick}
          disabled={!selectedTreeItem || isSelectedTreeItemParent(this.props)}
        />
      </Controls>
    );
  }
}

HierarchyTreeSelectorArrowControls.propTypes = {
  selectedTreeItem: PropTypes.shape({}),
  childKey: PropTypes.string.isRequired,
  selectedGridItems: ImmutablePropTypes.list.isRequired,
  onMoveToGridClick: PropTypes.func.isRequired,
  onMoveToTreeClick: PropTypes.func.isRequired,
};

HierarchyTreeSelectorArrowControls.defaultProps = {
  selectedTreeItem: null,
};

