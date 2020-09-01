import React, { Component } from 'react';
import { Bold } from './styles';
import { cutMiddle, copyToClipboard } from '../../../utils/misc';
import styled from 'styled-components';
import copy from '../../../imgs/copy.svg';

export const Table = styled.table`
  width: 100%;
  tr {
    border-bottom: 1px solid #e9e9e9;
  }
  tbody tr:last-child {
    border-bottom: none;
  }
  th,
  td {
    padding: 10px 18px;
  }
  th {
    font-weight: bold;
    opacity: 0.5;
  }
  .radio {
    text-align: center;
  }
`;

export const AddressContainer = styled.div`
  border: 1px solid #d7d7d7;
  border-radius: 4px;
  width: 100%;
`;

export const InlineTd = styled.td`
  display: inline-flex;
`;

export const CopyBtn = styled.div`
  margin-left: 8px;
  margin-right: -8px;
  width: 24px;
  height: 24px;
  display: flex;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;

export const CopyBtnIcon = styled.p`
  height: 14px;
  width: 14px;
  margin: auto;
  background: url(${copy}) no-repeat;
`;

class HotColdTable extends Component {
  render() {
    const {
      hotAddress,
      coldAddress,
      mkrBalanceCold,
      mkrBalanceHot,
      ethBalanceHot,
      ethBalanceCold
    } = this.props;
    return (
      <AddressContainer style={{ marginTop: '10px' }}>
        <Table>
          <thead>
            <tr>
              <th> Wallet </th>
              <th>Address</th>
              <th>MAHA</th>
              <th>ETH</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Bold> Cold </Bold>
              </td>
              <InlineTd title={coldAddress}>
                {cutMiddle(coldAddress, 7, 5)}
                <CopyBtn onClick={() => copyToClipboard(coldAddress)}>
                  <CopyBtnIcon />
                </CopyBtn>
              </InlineTd>
              <td>{mkrBalanceCold} MAHA</td>
              <td> {ethBalanceCold} ETH </td>
            </tr>
            <tr>
              <td>
                <Bold> Hot </Bold>
              </td>
              <InlineTd title={hotAddress}>
                {cutMiddle(hotAddress, 7, 5)}
                <CopyBtn onClick={() => copyToClipboard(hotAddress)}>
                  <CopyBtnIcon />
                </CopyBtn>
              </InlineTd>
              <td>{mkrBalanceHot} MAHA</td>
              <td> {ethBalanceHot} ETH </td>
            </tr>
          </tbody>
        </Table>
      </AddressContainer>
    );
  }
}

export default HotColdTable;
