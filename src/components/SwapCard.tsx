import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { clusterApiUrl, Connection, PublicKey, Transaction, VersionedTransaction } from "@solana/web3.js";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { useAppKitConnection } from "@reown/appkit-adapter-solana/react";
import type { Provider } from "@reown/appkit-adapter-solana/react";

const SwapCard = () => {
  const { address, isConnected } = useAppKitAccount();
  const { connection } = useAppKitConnection();
  const { walletProvider } = useAppKitProvider<Provider>("solana");

  const [fromInput, setFromInput] = useState();
  const [toInput, setToInput] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState();

  const handleSwap = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const newAddress = new PublicKey(address)

    const quoteResponse = await (
      await fetch(`https://quote-api.jup.ag/v6/quote?inputMint=So11111111111111111111111111111111111111112&outputMint=2qEHjDLDLbuBgRYvsxhc5D6uDWAivNFZGan56P1tpump&amount=10000&slippageBps=50`)
    ).json();
    
    const { swapTransaction } = await (
      await fetch("https://quote-api.jup.ag/v6/swap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quoteResponse,
          userPublicKey:walletProvider.publicKey?.toString(),
          wrapAndUnwrapSol:true,
        }),
      })
    ).json();

    const swapTransactionBuf = Buffer.from(swapTransaction,'base64');
    const transaction = VersionedTransaction.deserialize(swapTransactionBuf)

    const signedTransaction = await walletProvider.signTransaction(transaction)
     
    const latestBlockhash = await connection?.getLatestBlockhash()
    const rawTransaction = signedTransaction.serialize()

    const txid = await connection?.sendRawTransaction(rawTransaction,{
      skipPreflight:true,
      maxRetries:2
    })
    
    await connection?.confirmTransaction(txid)
    console.log(`https://solscan.io/tx/${txid}`);
  };

  const handleFromInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue)) {
      setFromInput(Number(inputValue));
    }
  };

  const handleToInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue)) {
      setToInput(Number(inputValue));
    }
  };

  return (
    <div className="flex-column mx-auto w-3/5 mt-12 bg-gray-800 p-11 rounded-lg">
      <div className="flex w-full mb-5">
        <label htmlFor="fromamount" className="p-4">
          SOl
        </label>
        <input
          type="text"
          id="fromamount"
          className="p-5 bg-gray-900 focus:outline-none rounded-md w-full flex-grow"
          value={fromInput}
          onChange={handleFromInput}
        />
      </div>

      <div className="flex w-full">
        <button
          onClick={() => setIsOpen(true)}
          className="px-2 m-2 rounded transition border border-emerald-900"
        >
          <FaChevronDown />
        </button>
        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gradient-to-r from-gray-500 to-gray-900 p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-semibold mb-4">Search</h2>
              <input
                type="text"
                placeholder="Input contant address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={() => alert(`Searching for: ${searchQuery}`)}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-emerald-900 text-white rounded hover:bg-blue-700"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        )}
        <input
          type="text"
          id="toamount"
          className="p-5 bg-gray-900 focus:outline-none rounded-md w-full flex-grow"
          value={toInput}
          onChange={handleToInput}
        />
      </div>
      <div className="text-emerald-100 bg-gradient-to-r from-cyan-500 to-emerald-900 p-6 ml-14 w-10.5/12 mt-5 mx-auto text-center rounded-lg font-black">
        <button onClick={handleSwap}>Swap</button>
      </div>
    </div>
  );
};

export default SwapCard;
