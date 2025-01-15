import React, { useState } from "react";
import {FaChevronDown} from "react-icons/fa"

const SwapCard = () => {
  const [fromInput, setFromInput] = useState();
  const [toInput, setToInput] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery,setSearchQuery] = useState();

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
    <div className="flex-column mx-auto w-2/3 mt-12 bg-gray-800 p-11 rounded-lg">
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
          className="p-2 m-2 rounded transition"
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
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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
      <div className="bg-gradient-to-r from-cyan-500 to-emerald-900 p-6 ml-14 w-10.5/12 mt-5 mx-auto text-center rounded-lg font-black">
        <button>Swap</button>
      </div>
    </div>
  );
};

export default SwapCard;
