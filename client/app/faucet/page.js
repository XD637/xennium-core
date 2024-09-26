'use client';

import React, { useState, useContext, useEffect } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import { ethers } from 'ethers';
import { faucetABI, faucetAddress } from '../utils/FaucetConstants';

const FaucetPage = () => {
  const { connectWallet, currentAccount } = useContext(TransactionContext);
  const [faucetContract, setFaucetContract] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [featureAvailable, setFeatureAvailable] = useState(true); // New state

  useEffect(() => {
    if (currentAccount) {
      loadContract();
    }
  }, [currentAccount]);

  const loadContract = async () => {
    try {
      if (!window.ethereum) {
        setError('Ethereum object not found');
        return;
      }

      if (!currentAccount) {
        setError('Wallet not connected');
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(faucetAddress, faucetABI, signer);

      // Debugging: Check if contract is loaded and functions are available
      console.log('Loaded contract:', contract);

      setFaucetContract(contract);
      setError('');
    } catch (err) {
      console.error('Failed to load contract:', err);
      setError('Failed to load contract. Make sure the contract address and ABI are correct.');
    }
  };

  const claimTokens = async () => {
    if (!faucetContract) {
      setError('Contract not loaded');
      return;
    }

    setLoading(true);
    try {
      const tx = await faucetContract.claimTokens();
      await tx.wait();
      setSuccess('Tokens claimed successfully!');
      setError('');
    } catch (err) {
      console.error('Failed to claim tokens:', err);
      setError('Failed to claim tokens. Please check if the contract function is correctly implemented.');
    }
    setLoading(false);
  };

  // Conditional feature availability check
  useEffect(() => {
    // You can put logic here to determine if the feature should be available
    // For example, if you want to disable the feature temporarily
    setFeatureAvailable(false); // Set to false to simulate feature unavailability
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Xennium Token Faucet</h1>
        {!featureAvailable ? (
          <p className="text-red-500">This feature is not available at the moment. Please check back later.</p>
        ) : (
          <>
            {!currentAccount ? (
              <button
                onClick={connectWallet}
                className="w-full py-2 px-4 bg-black text-white font-medium rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Connect Wallet
              </button>
            ) : (
              <>
                <div className="w-full py-2 px-4 mb-4 bg-gray-100 text-gray-800 font-medium rounded-md break-words">
                  Wallet Address: <span className="truncate">{currentAccount}</span>
                </div>
                <button
                  onClick={loadContract}
                  className="w-full py-2 px-4 bg-black text-white font-medium rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mb-4"
                >
                  Load Contract
                </button>
                <button
                  onClick={claimTokens}
                  disabled={loading}
                  className="w-full py-2 px-4 bg-green-600 text-white font-medium rounded-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400"
                >
                  {loading ? 'Claiming...' : 'Claim Tokens'}
                </button>
              </>
            )}
            {error && <p className="mt-4 text-red-500">{error}</p>}
            {success && <p className="mt-4 text-green-500">{success}</p>}
          </>
        )}
      </div>
    </main>
  );
};

export default FaucetPage;
