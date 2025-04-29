import { useState } from "react";
import CryptoTab from "./tabs/CryptoTab";
import NewCoinsTab from "./tabs/TrendingCoins";
import ListedCoinsTab from "./tabs/ListedCoinsTab";
import StockTab from "./tabs/StockTab";
import MetalTab from "./tabs/MetalTab";
import ForexTab from "./tabs/ForexTab";

const TABS = [
  "Crypto",
  "Trending Coins",
  "Listed Coins",
  "Stock & Indices",
  "Metal & Energy",
  "Forex",
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState(0);

  const renderTab = () => {
    switch (activeTab) {
      case 0:
        return <CryptoTab />;
      case 1:
        return <NewCoinsTab />;
      case 2:
        return <ListedCoinsTab />;
      case 3:
        return <StockTab />;
      case 4:
        return <MetalTab />;
      case 5:
        return <ForexTab />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 w-[calc(100%-15rem)] ml-auto pt-30 bg-[#1e1e20] min-h-screen text-white max-[600px]:w-full max-[600px]:pb-30">
      <div className="relative">
        <div className="flex overflow-x-auto">
          {TABS.map((tab, idx) => (
            <button
              key={idx}
              className={`px-4 py-2 font-semibold focus:outline-none ${
                idx === activeTab
                  ? "text-yellow-400 border-b-2 border-yellow-400"
                  : "text-gray-400"
              }`}
              onClick={() => setActiveTab(idx)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="absolute bottom-0 left-0 w-full border-b border-gray-500 opacity-30"></div>
      </div>
      <div className="mt-6">{renderTab()}</div>
    </div>
  );
}
