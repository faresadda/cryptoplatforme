import { useState } from "react";
import { FaBitcoin, FaEthereum, FaDollarSign, FaCoins } from "react-icons/fa";
import { SiSolana, SiXrp, SiDogecoin } from "react-icons/si";

// أيقونات لكل عملة
const coinIcons = {
  BTC: <FaBitcoin className="text-yellow-400 text-2xl" />,
  ETH: <FaEthereum className="text-blue-400 text-2xl" />,
  USDT: <FaDollarSign className="text-green-400 text-2xl" />,
  XRP: <SiXrp className="text-blue-300 text-2xl" />,
  BNB: <FaCoins className="text-yellow-500 text-2xl" />,
  SOL: <SiSolana className="text-purple-400 text-2xl" />,
  USDC: <FaDollarSign className="text-blue-400 text-2xl" />,
  DOGE: <SiDogecoin className="text-yellow-300 text-2xl" />,
};

const TABS = ["Crypto", "New Coins", "Listed Coins", "Stock & Indices", "Metal & Energy", "Forex"];

const CRYPTO_DATA = [
  { symbol: "BTC/USDT", name: "Bitcoin", price: 94308.0318, change: -0.72 },
  { symbol: "ETH/USDT", name: "Ethereum", price: 1800.3402, change: 0.14 },
  { symbol: "USDT/USDT", name: "Tether USD", price: 1.0001, change: 0.01 },
  { symbol: "XRP/USDT", name: "XRP", price: 2.2001, change: 0.23 },
  { symbol: "BNB/USDT", name: "BNB", price: 609.1140, change: 0.74 },
  { symbol: "SOL/USDT", name: "Solana", price: 149.2437, change: -1.89 },
  { symbol: "USDC/USDT", name: "USDC", price: 0.9995, change: 0.02 },
  { symbol: "DOGE/USDT", name: "DOGE", price: 0.1821, change: 0.09 },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="p-6 w-[calc(100%-15rem)] ml-auto pt-30 bg-[#1e1e20] min-h-screen text-white max-[600px]:w-full max-[600px]:pb-30">
      {/* Main Tabs */}
      <div className="relative">
        <div className="flex overflow-x-auto">
          {TABS.map((tab, idx) => (
            <button
              key={idx}
              className={classNames(
                "px-4 py-2 font-semibold focus:outline-none",
                idx === activeTab
                  ? "text-yellow-400 border-b-2 border-yellow-400"
                  : "text-gray-400"
              )}
              onClick={() => setActiveTab(idx)}
            >
              {tab}
            </button>
          ))}
        </div>
        {/* الخط تحت كامل الشاشة */}
        <div className="absolute bottom-0 left-0 w-full border-b border-gray-500 opacity-30"></div>
      </div>

      {/* Content */}
      <div className="mt-6">
        {activeTab === 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="relative">
                <tr>
                  <th className="text-left py-2">Pair</th>
                  <th className="text-right py-2">Price</th>
                  <th className="text-right py-2">Change</th>
                </tr>
                <td className="absolute bottom-0 left-0 w-full border-b border-gray-500 opacity-30"></td>
              </thead>

              <tbody>
                {CRYPTO_DATA.map((coin) => {
                  const baseSymbol = coin.symbol.split('/')[0];
                  return (
                    <tr key={coin.symbol} className="border-none">
                      <td className="py-4 flex items-center gap-3">
                        {coinIcons[baseSymbol] || <FaCoins />}
                        <div className="flex flex-col">
                          <span className="font-bold">{coin.symbol}</span>
                          <span className="text-sm text-gray-400">{coin.name}</span>
                        </div>
                      </td>
                      <td className="py-4 text-right font-mono">
                        ${coin.price.toLocaleString()}
                      </td>
                      <td className="py-4 text-right">
                        <span
                          className={classNames(
                            "px-2 py-1 rounded text-white font-semibold",
                            coin.change > 0
                              ? "bg-green-600"
                              : "bg-red-600"
                          )}
                        >
                          {coin.change > 0 ? "+" : ""}
                          {coin.change}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Placeholder for other tabs */}
        {activeTab !== 0 && (
          <div className="text-gray-400 text-center py-10">
            Coming soon...
          </div>
        )}
      </div>
    </div>
  );
}
