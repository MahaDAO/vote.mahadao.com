import React from 'react';
import { Flex } from '@makerdao/ui-components-core';
import Intro from './Intro';
import Step0 from './Step0';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from '../InProgress';
import Step4a from '../Confirmed';
import Step4b from '../Failed';

export default props => {
  const {
    onClose,
    account,
    burnAmount,
    setBurnAmount,
    depositsInChief,
    step,
    setStep,
    totalMkrInEsm,
    txHash,
    setTxHash,
    setIntroSeen,
    introSeen
  } = props;

  const renderStep = step => {
    switch (step) {
      case 0:
        return <Step0 onClose={onClose} onContinue={setStep} />;
      case 1:
        return (
          <Step1
            onClose={onClose}
            onContinue={setStep}
            mkrBalance={account.mkrBalance}
            update={setBurnAmount}
            value={burnAmount}
            deposits={depositsInChief}
          />
        );
      case 2:
        return (
          <Step2
            setStep={setStep}
            burnAmount={burnAmount}
            totalMkrInEsm={totalMkrInEsm}
            address={account.address}
            setTxHash={setTxHash}
          />
        );
      case 3:
        return (
          <Step3
            txHash={txHash}
            onClose={onClose}
            title={'Your MAHA is being burned'}
          />
        );
      case 4:
        return (
          <Step4a title={'MAHA Burned'} txHash={txHash} onClose={onClose} />
        );
      case 5:
        return (
          <Step4b
            title={'Burn MAHA Tx Failed'}
            txHash={txHash}
            onClose={onClose}
          />
        );
      default:
        return <Step0 onClose={onClose} onContinue={setStep} />;
    }
  };

  const renderedStep = renderStep(step);
  return (
    <Flex flexDirection="column" alignItems="center">
      {introSeen ? (
        renderedStep
      ) : (
        <Intro
          onClose={() => {
            setIntroSeen(true);
            onClose();
          }}
        />
      )}
    </Flex>
  );
};
