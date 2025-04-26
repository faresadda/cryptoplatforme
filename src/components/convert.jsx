import React, { useState } from "react";

const Convert = () => {
  const [fromAmount, setFromAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("BTC");
  const [toCurrency, setToCurrency] = useState("USDT");

  // Mock data for available balances
  const availableBalances = {
    BTC: 1.00201,
    ETH: 15.5432,
    USDT: 270937.97,
  };

  // Currency icons and colors mapping
  const currencyConfig = {
    BTC: { symbol: "₿", bgColor: "bg-yellow-500" },
    ETH: { symbol: "Ξ", bgColor: "bg-blue-500" },
    USDT: { symbol: "₮", bgColor: "bg-teal-500" },
  };

  const handleMaxClick = () => {
    setFromAmount(availableBalances[fromCurrency].toString());
  };

  return (
    <div className="min-h-screen bg-[#1e1e20] flex items-center justify-center px-4 py-6 sm:px-6 lg:px-8 w-[calc(100%-15rem)] ml-auto pt-30 max-[600px]:w-full max-[600px]:pb-30">
      <div className="w-[70%] mx-auto px-10 py-10 sm:p-6 space-y-6 max-[872px]:w-[100%]">
        <h2 className="text-xl sm:text-2xl font-semibold text-white text-center">
          Convert Coin Assets
        </h2>

        {/* From Currency Section */}
        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
            <span className="text-sm text-gray-400">From</span>
            <span className="text-sm text-orange-500 font-medium">
              Available: {availableBalances[fromCurrency]} {fromCurrency}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 p-3 sm:p-4 rounded-lg border border-gray-700 bg-[#2d2d30]">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className={`w-8 h-8 rounded-full ${currencyConfig[fromCurrency].bgColor} flex items-center justify-center shrink-0`}>
                <span className="text-white text-sm">{currencyConfig[fromCurrency].symbol}</span>
              </div>
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="bg-gray-800 text-white px-3 py-2 rounded-md outline-none border border-gray-700 w-full sm:w-auto focus:border-gray-600"
              >
                <option value="BTC">Bitcoin</option>
                <option value="ETH">Ethereum</option>
                <option value="USDT">Tether USDT</option>
              </select>
            </div>
            <div className="flex-1 relative w-full">
              <input
                type="number"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
                placeholder="Amount"
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-right pr-12 text-white placeholder-gray-500 focus:border-gray-600"
              />
              <button
                onClick={handleMaxClick}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-blue-400 hover:text-blue-300 bg-gray-800 px-2"
              >
                Max
              </button>
            </div>
          </div>
        </div>

        {/* To Currency Section */}
        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
            <span className="text-sm text-gray-400">To</span>
            <span className="text-sm text-orange-500 font-medium">
              Available: {availableBalances[toCurrency]} {toCurrency}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 p-3 sm:p-4 rounded-lg border border-gray-700 bg-[#2d2d30]">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className={`w-8 h-8 rounded-full ${currencyConfig[toCurrency].bgColor} flex items-center justify-center shrink-0`}>
                <span className="text-white text-sm">{currencyConfig[toCurrency].symbol}</span>
              </div>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="bg-gray-800 text-white px-3 py-2 rounded-md outline-none border border-gray-700 w-full sm:w-auto focus:border-gray-600"
              >
                <option value="BTC">Bitcoin</option>
                <option value="ETH">Ethereum</option>
                <option value="USDT">Tether USDT</option>
              </select>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <button className="w-full bg-yellow-400 text-black py-3 sm:py-4 rounded-lg hover:bg-yellow-500 transition-colors text-base sm:text-lg font-medium shadow-sm hover:shadow-md">
          Continue
        </button>
      </div>
    </div>
  );
};

export default Convert;