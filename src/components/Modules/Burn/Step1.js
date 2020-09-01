import React, { useState } from 'react';
import {
  Grid,
  Input,
  Flex,
  Button,
  Text,
  Link
} from '@makerdao/ui-components-core';

export default ({
  onClose,
  onContinue,
  mkrBalance,
  update,
  value,
  deposits
}) => {
  const [error, setError] = useState('');
  const [localValue, setLocalValue] = useState(value);
  const setMax = () => {
    setLocalValue(mkrBalance);
  };
  const isNotValid = value => {
    return value >= mkrBalance ? `You don't have enough MAHA` : false;
  };
  const onChange = event => {
    const { value } = event.target;
    setLocalValue(value);
    if (isNaN(parseFloat(value)) || parseFloat(value) <= 0) {
      return setError('Please enter a valid number');
    } else if (isNotValid(value)) {
      return setError(isNotValid(value));
    }
    setError('');
  };
  return (
    <Grid gridRowGap="m" justifyContent="center">
      <Text.h2 mt="m" textAlign="center">
        Burn your MAHA in the ESM
      </Text.h2>
      <Grid
        gridRowGap="s"
        width={'30em'}
        border="1px solid #D4D9E1"
        alignSelf="center"
      >
        <Text.h5 textAlign="left" mt="m" ml="m" fontWeight="500">
          Enter the amount of MAHA to burn.
        </Text.h5>
        <Input
          mx={'m'}
          type="number"
          value={localValue}
          placeholder={`0.00 MAHA`}
          onChange={onChange}
          failureMessage={error}
          after={
            <Link color="blue" fontWeight="medium" onClick={setMax}>
              Set max
            </Link>
          }
        />
        <Flex flexDirection="row" ml="m" alignItems="center" mb="m">
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 11,
              color: '#708390',
              lineHeight: 1
            }}
          >
            MAHA BALANCE IN WALLET
          </Text>
          <Text
            t="caption"
            ml="s"
            style={{ fontSize: 14, color: '#48495F', lineHeight: 1 }}
          >
            {`${mkrBalance && mkrBalance.toString()} MAHA`}
          </Text>
        </Flex>
      </Grid>
      {parseFloat(deposits) > 0 ? (
        <Flex
          mt="xs"
          mb="s"
          border={'1px solid #FBCC5F'}
          style={{ backgroundColor: '#FFF9ED' }}
          borderRadius={6}
          alignItems="center"
          justifyContent="center"
        >
          <Text
            data-testid="voting-power"
            my="s"
            style={{ textAlign: 'center', fontSize: 14, color: '#826318' }}
          >
            {`You have ${deposits} additional MAHA locked in DSChief.`}
            <br />
            {`Withdraw MAHA from DSChief to burn it in the ESM.`}
          </Text>
        </Flex>
      ) : null}
      <Flex flexDirection="row" justifyContent="center" m={'m'}>
        <Button
          variant="secondary-outline"
          color="black"
          onClick={onClose}
          mr="s"
        >
          Cancel
        </Button>
        <Button
          variant="danger"
          disabled={
            error.length > 0 ||
            localValue === '' ||
            localValue <= 0 ||
            localValue > mkrBalance
          }
          onClick={() => {
            onContinue(2);
            update(localValue);
          }}
          ml="s"
        >
          Continue
        </Button>
      </Flex>
    </Grid>
  );
};
