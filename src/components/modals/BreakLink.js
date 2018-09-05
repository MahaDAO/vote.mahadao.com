import React, { Fragment } from 'react';
import { getActiveAccount } from '../../reducers/accounts';
import {
  StyledTitle,
  StyledBlurb,
  StyledTop,
  Oblique,
  Bold
} from './shared/styles';
import Button from '../Button';
import { connect } from 'react-redux';
import { breakLink, refreshAccountDataBreak } from '../../reducers/proxy';
import Transaction from './shared/Transaction';
import { modalClose } from '../../reducers/modal';
import Withdraw from './Withdraw';
import { modalOpen } from '../../reducers/modal';
import {
  Table,
  InlineTd,
  AddressContainer,
  CopyBtn,
  CopyBtnIcon
} from './AddressSelection';
import { cutMiddle, copyToClipboard } from '../../utils/misc';

const BreakLink = ({
  refreshAccountDataBreak,
  breakLink,
  modalClose,
  modalOpen,
  account,
  txHash,
  confirming,
  network,
  txSent
}) => {
  if (txSent) {
    return (
      <Transaction
        lastCard
        {...{ txHash, confirming, network, account }}
        nextStep={() => {
          modalClose();
          refreshAccountDataBreak();
        }}
      />
    );
  }
  const { linkedAccount } = account.proxy;
  const isColdWallet = account.proxyRole === 'cold';
  const coldAddress = isColdWallet ? account.address : linkedAccount.address;
  const hotAddress = isColdWallet ? linkedAccount.address : account.address;
  const mkrBalanceCold = isColdWallet
    ? account.mkrBalance
    : linkedAccount.mkrBalance;
  const mkrBalanceHot = isColdWallet
    ? linkedAccount.mkrBalance
    : account.mkrBalance;
  if (account.proxy.votingPower > 0) {
    return (
      <Fragment>
        <StyledTop>
          <StyledTitle>Break Wallet Link</StyledTitle>
        </StyledTop>
        <StyledBlurb style={{ textAlign: 'center', marginTop: '30px' }}>
          <div style={{ marginTop: '20px' }}>
            Before you can break your wallet link, you must withdraw all MKR
            from the voting contract
          </div>
        </StyledBlurb>
        <div
          style={{
            display: 'flex',
            marginTop: '20px',
            justifyContent: 'flex-end'
          }}
        >
          <Button
            slim
            onClick={() => {
              modalOpen(Withdraw);
            }}
          >
            Withdraw MKR
          </Button>
        </div>
      </Fragment>
    );
  }
  return (
    <Fragment>
      <StyledTop>
        <StyledTitle>Break Wallet Link</StyledTitle>
      </StyledTop>
      <StyledBlurb style={{ textAlign: 'center', marginTop: '30px' }}>
        <Bold>Cold wallet:</Bold> <Oblique> {coldAddress} </Oblique>
        <br />
        <Bold>Hot wallet:</Bold> <Oblique> {hotAddress} </Oblique>
        <br />
        <div style={{ marginTop: '20px' }}>
          Either your hot or cold wallet can create the break link transaction
        </div>
      </StyledBlurb>
      <AddressContainer>
        <Table>
          <thead>
            <tr>
              <th> Wallet </th>
              <th>Address</th>
              <th>MKR</th>
              <th>ETH</th>
            </tr>
          </thead>
          <tbody>
            <tr key={coldAddress}>
              <td> Cold </td>
              <InlineTd title={coldAddress}>
                {cutMiddle(coldAddress, 8, 6)}
                <CopyBtn onClick={() => copyToClipboard(coldAddress)}>
                  <CopyBtnIcon />
                </CopyBtn>
              </InlineTd>
              <td>{mkrBalanceCold} MKR</td>
              <td> ?? ETH </td>
            </tr>
          </tbody>
        </Table>
      </AddressContainer>
      <div
        style={{
          display: 'flex',
          marginTop: '20px',
          justifyContent: 'flex-end'
        }}
      >
        <Button
          slim
          onClick={() => {
            breakLink();
          }}
        >
          Break Link
        </Button>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  account: getActiveAccount(state),
  txHash: state.proxy.breakLinkTxHash,
  confirming: state.proxy.confirmingBreakLink,
  network: state.metamask.network,
  txSent: !!state.proxy.breakLinkInitiated
});

export default connect(
  mapStateToProps,
  { breakLink, modalClose, refreshAccountDataBreak, modalOpen }
)(BreakLink);
