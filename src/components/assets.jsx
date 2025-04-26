import React, { useState } from 'react';

const CryptoOverview = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const cryptoData = {
    totalAssets: 95308612.17,
    assets: [
      {
        symbol: 'BTC',
        name: 'Bitcoin',
        value: 94336.8796,
        amount: 1.002093,
        change: -0.43,
      },
      {
        symbol: 'ETH',
        name: 'Ethereum',
        value: 1804.5854,
        amount: 283.4307,
        change: 0.67,
      },
      {
        symbol: 'USDT',
        name: 'Tether USD',
        value: 1.0001,
        amount: 270687.9666,
        change: 0.00,
      },
      {
        symbol: 'XRP',
        name: 'XRP',
        value: 2.2017,
        amount: 0.0000,
        change: 0,
      },
    ],
  };

  return (
    <div className="w-[calc(100%-15rem)] ml-auto pt-30 min-h-screen bg-[#1e1e20] p-4 max-[600px]:w-full max-[600px]:pb-30">
      {/* Navigation Tabs */}
      <div className="flex border-b mb-6 overflow-x-auto">
        <button
          className={`px-6 py-2 ${activeTab === 'overview' ? 'border-b-2 border-yellow-400 text-yellow-400' : 'text-gray-600'}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`px-6 py-2 ${activeTab === 'crypto' ? 'border-b-2 border-yellow-400 text-yellow-400' : 'text-gray-600'}`}
          onClick={() => setActiveTab('crypto')}
        >
          Crypto
        </button>
        <button className="px-6 py-2 text-gray-600">New Coin</button>
        <button className="px-6 py-2 text-gray-600">Listed Coin</button>
      </div>

      {/* Overview Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="bg-[#0f0f0f] rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-xl text-emerald-500 font-medium">Total Assets</h2>
              <svg
                className="w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
            <p className="text-3xl font-bold mt-2 text-white">${cryptoData.totalAssets.toLocaleString()}</p>
          </div>

          {cryptoData.assets.map((asset) => (
            <div key={asset.symbol} className="bg-[#0f0f0f] rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white">
                    {asset.symbol === 'BTC' && '₿'}
                    {asset.symbol === 'ETH' && 'Ξ'}
                    {asset.symbol === 'USDT' && '₮'}
                    {asset.symbol === 'XRP' && 'X'}
                  </div>
                  <div>
                    <p className="font-medium text-white">{asset.symbol}</p>
                    <p className="text-sm text-gray-600">{asset.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-white">${asset.value.toLocaleString()}</p>
                  <p className={`text-sm ${asset.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {asset.change >= 0 ? '+' : ''}{asset.change}%
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-white">{asset.amount.toLocaleString()} {asset.symbol}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Crypto Tab Content */}
      {activeTab === 'crypto' && (
        <div>
          <h1 className="text-3xl text-emerald-500 font-bold mb-6">Your Crypto Assets</h1>
          <div className="grid grid-cols-2 gap-4">
            {cryptoData.assets.map((asset) => (
              <div key={asset.symbol} className="bg-[#0f0f0f] rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white">
                    {asset.symbol === 'BTC' && '₿'}
                    {asset.symbol === 'ETH' && 'Ξ'}
                    {asset.symbol === 'USDT' && '₮'}
                    {asset.symbol === 'XRP' && 'X'}
                  </div>
                  <span className="font-medium text-white">{asset.symbol}</span>
                </div>
                <p className="text-xl font-bold text-white">${asset.value.toLocaleString()}</p>
                <p className="text-gray-600 text-white">{asset.amount.toLocaleString()} {asset.symbol}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <button className="flex items-center justify-center gap-2 bg-[#0f0f0f] rounded-lg p-6 shadow-sm">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="text-white">Deposit</span>
            </button>
            <button className="flex items-center justify-center gap-2 bg-[#0f0f0f] rounded-lg p-6 shadow-sm">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="text-white">Withdraw</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CryptoOverview;
