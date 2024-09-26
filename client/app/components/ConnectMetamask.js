'use client';

import React, { useContext, useEffect, useState, useRef } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import SaveUser from './SaveUser';

const ConnectWallet = () => {
  const { connectWallet, currentAccount } = useContext(TransactionContext);
  const [account, setAccount] = useState(currentAccount);
  const saveUserButtonRef = useRef(null);

  useEffect(() => {
    if (currentAccount) {
      setAccount(currentAccount);
    }
  }, [currentAccount]);

  useEffect(() => {
    if (account && saveUserButtonRef.current) {
      saveUserButtonRef.current.click(); // Programmatically click the SaveUser button
    }
  }, [account]);

  const handleConnect = async (e) => {
    e.preventDefault();

    try {
      await connectWallet();
    } catch (error) {
      console.error('Error during wallet connection:', error);
    }
  };

  return (
    <div>
      {!account ? (
        <button onClick={handleConnect}>
          <p className="m-0 max-w-[30ch] text-sm opacity-50 text-balance">
            Connect to your wallet.
          </p>
        </button>
      ) : (
        <div>
          <p className="m-0 max-w-[30ch] text-sm opacity-50 text-balance overflow-hidden text-ellipsis">
            Wallet Connected: {account}
          </p>
          <SaveUser ref={saveUserButtonRef} account={account} />
        </div>
      )}
    </div>
  );
};

export default ConnectWallet;
