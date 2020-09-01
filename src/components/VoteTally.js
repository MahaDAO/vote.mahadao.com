import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { kFormat } from '../utils/misc';
import StatusBar from './StatusBar';
import Loader from './Loader';

const StyledVoteTally = styled.div`
  line-height: 20px;
  font-size: 18px;
  margin-top: -10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
`;

const VoteInfo = styled.div`
  display: flex;
  &::after {
    margin-left: 4px;
    font-size: 16px;
    color: ${({ theme }) => theme.text.dim_grey};
    content: ${({ content }) => `"${content}"`};
  }
`;

const StyledStatusBar = styled(StatusBar)`
  margin-bottom: 15px;
  margin-top: -15px;
`;

const GreyedText = styled.p`
  color: ${({ theme }) => theme.text.dim_grey};
`;

const PercentageWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${({ noMargins }) => (noMargins ? '' : '8px')};
  margin-top: ${({ noMargins }) => (noMargins ? '' : '-8px')};
`;

export const VotePercentage = ({ loadingPercentage, percentage, ...props }) => (
  <Fragment>
    <PercentageWrapper {...props}>
      <GreyedText>PERCENT OF VOTES</GreyedText>
      <div style={{ marginLeft: '8px' }}>
        {loadingPercentage ? (
          <Loader size={20} color="light_grey" background="white" />
        ) : (
          <p>{percentage}%</p>
        )}
      </div>
    </PercentageWrapper>
  </Fragment>
);

const VoteTally = ({
  statusBar,
  loadingApprovals,
  percentage,
  approvals,
  ...props
}) => (
  <Fragment>
    {statusBar ? <StyledStatusBar percentage={percentage} {...props} /> : null}
    <StyledVoteTally>
      <VoteInfo content="VOTES">
        {loadingApprovals ? (
          <Loader size={20} color="light_grey" background="white" />
        ) : (
          `${percentage}%`
        )}
      </VoteInfo>
      <VoteInfo content="MAHA">
        {loadingApprovals ? (
          <Loader size={20} color="light_grey" background="white" />
        ) : (
          `${kFormat(approvals)}`
        )}
      </VoteInfo>
    </StyledVoteTally>
  </Fragment>
);

VoteTally.propTypes = {
  statusBar: PropTypes.bool,
  loadingPercentage: PropTypes.bool,
  loadingApprovals: PropTypes.bool,
  approvals: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  percentage: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

VoteTally.defaultProps = {
  statusBar: false,
  loadingPercentage: false,
  loadingApprovals: false,
  approvals: 0,
  percentage: 0
};

export default VoteTally;
