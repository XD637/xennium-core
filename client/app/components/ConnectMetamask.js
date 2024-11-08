'use client';

import React, { useContext, useEffect, useState, useRef } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import SaveUser from './SaveUser';

const ConnectWallet = () => {
  const { connectWallet, currentAccount } = useContext(TransactionContext);
  const [account, setAccount] = useState(currentAccount);
  const saveUserButtonRef = useRef(null);

  // Update account when currentAccount changes in the context
  useEffect(() => {
    if (currentAccount) {
      setAccount(currentAccount);
    }
  }, [currentAccount]);

  // Trigger SaveUser component when account connects
  useEffect(() => {
    if (account && saveUserButtonRef.current) {
      saveUserButtonRef.current.click(); // Automatically save the user
    }
  }, [account]);

  // Handle wallet connection
  const handleConnect = async (e) => {
    e.preventDefault();
    try {
      await connectWallet();
    } catch (error) {
      console.error('Error during wallet connection:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-4">
      {!account ? (
        <button 
          onClick={handleConnect} 
          className="px-10 py-6 border-2 border-black text-black text-xl font-semibold rounded-full hover:bg-gray-100 hover:text-white focus:outline-none focus:ring-4 focus:ring-black transition-all duration-300 transform hover:scale-105 hover:translate-y-1 shadow-sm"
        >
          Connect to Wallet <i class="bi bi-arrow-right-short"></i>
        </button>
      ) : (
        <div className="flex flex-col items-center text-center">
          <p className="text-gray-600 text-sm mb-2">
            Wallet Connected: <span className="font-semibold text-gray-800">{account}</span>
          </p>
          <SaveUser ref={saveUserButtonRef} account={account} />
        </div>
      )}
    </div>
  );
};

export default ConnectWallet;
