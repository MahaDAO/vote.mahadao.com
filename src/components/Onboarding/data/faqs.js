export default {
  hotWallet: [
    {
      title: 'What is a hot wallet?',
      body:
        'Your Hot Wallet is connected to the internet. It only has permission to vote within the system, reduce your voting power, or increase your voting power.'
    },
    {
      title: 'Why do I need a voting wallet?',
      body:
        'Your voting wallet enables you to participate in Maker Governance without exposing your cold wallet online for every vote.'
    }
  ],
  ledger: [
    {
      title: 'What is the difference between Ledger live and legacy?',
      body:
        '"legacy" in Ledger Live is a generic term for all currencies to mean “different from new standard Ledger Live derivation.”'
    }
  ],
  coldWallet: [
    {
      title: 'Am I giving up control of my MAHA?',
      body:
        'No. The voting contract is only able to vote on your behalf. Also, you will be able to withdraw your MAHA at any time.'
    }
  ],
  selectMKRBalance: [
    {
      title: 'Can I combine balances with different addresses?',
      body:
        'No. You can only link one cold wallet address and its corresponding MAHA balance. Choose the address with the highest MAHA balance to have the most impact.'
    }
  ],
  approveLink: [
    {
      title: 'Why do I have to sign this transaction?',
      body:
        'By signing this transaction you will be proving that you control your cold wallet.'
    }
  ],
  grantHotWalletPermissions: [
    {
      title: 'What am I granting permission to?',
      body:
        'By granting permissions in this transaction, you are allowing your proxy voting contract to lock your MAHA. You are not relinquishing control of your MAHA and can withdraw it at anytime.'
    }
  ],
  lockMKR: [
    {
      title: 'Who controls my MAHA when it is Locked?',
      body:
        'You do. Locking MAHA deposits your MAHA to your secure voting contract but you still control it and can withdraw at anytime.'
    },
    {
      title: 'How long does it take to withdraw my MAHA?',
      body:
        'Depending on the network speed, withdrawing your MAHA usually takes less than 5 minutes. '
    }
  ]
};
