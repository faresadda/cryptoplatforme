import { useState } from "react";
import {
  ChevronLeft,
  Search,
  Headphones,
  Settings,
  ChevronDown,
  PlusCircle,
  ArrowUpDown,
  Repeat,
  Plus,
  Wallet,
  Landmark,
  Database,
  BarChart2,
  User,
  Key,
  Users,
  Gift,
  HelpCircle,
  LogOut,
  Menu,
  X,
  TrendingUp,
} from "lucide-react";
import avatar from "../assets/react.svg";

// ========== CENTRALIZED COLOR THEME ==========
// All colors are defined here in one place for easy modification
const colors = {
  // Main colors
  background: "bg-[#1e1e20]",
  cardBg: "bg-[#0f0f0f]",
  primary: "bg-yellow-400",
  primaryText: "text-yellow-400",
  secondary: "bg-orange-400",
  secondaryText: "text-orange-400",

  // Text colors
  textPrimary: "text-white",
  textSecondary: "text-[#a3a3a3]", // Lighter black instead of gray
  textMuted: "text-[#666666]", // Lighter black instead of gray

  // Border colors
  border: "border-[#333333]", // Lighter black instead of gray

  // Input and hover colors
  inputBg: "bg-[#282828]", // Lighter black instead of gray
  hoverBg: "hover:bg-[#333333]", // Lighter black instead of gray

  // Status colors
  success: "bg-yellow-400",
  successText: "text-yellow-400",
  neutral: "bg-[#666666]", // Lighter black instead of gray
  neutralText: "text-[#666666]", // Lighter black instead of gray
};

// This function creates class strings with our theme colors
const cls = {
  // Background colors
  bg: (color) => colors[color] || `bg-${color}`,
  hoverBg: (color) =>
    colors[color]?.startsWith("hover:") ? colors[color] : `hover:bg-${color}`,

  // Text colors
  text: (color) => {
    if (color === "primary") return colors.primaryText;
    if (color === "secondary") return colors.secondaryText;
    if (color === "success") return colors.successText;
    if (color === "neutral") return colors.neutralText;
    return colors[color] || `text-${color}`;
  },

  // Border colors
  border: (color) => colors[color] || `border-${color}`,

  // Combined classes
  button: (bgColor, textColor, hoverColor) => {
    const bg = cls.bg(bgColor);
    const text = cls.text(textColor);
    const hover = hoverColor ? cls.hoverBg(hoverColor) : `hover:opacity-80`;
    return `${bg} ${text} ${hover} transition-colors`;
  },

  card: () => `${colors.cardBg} rounded-xl shadow-sm border ${colors.border}`,

  icon: (color) => {
    const textColor = cls.text(color);
    const bgColor =
      color === "primary"
        ? "bg-yellow-400/20"
        : color === "secondary"
        ? "bg-orange-400/20"
        : `bg-${color}/20`;
    return `${textColor} ${bgColor} rounded-full p-2`;
  },
};
import { Link } from "react-router-dom";
export default function Home() {
  const [showAllCoins, setShowAllCoins] = useState(false);

  const cryptoAssets = [
    {
      name: "BTC/USDT",
      fullName: "Bitcoin",
      value: 94714.99,
      percentage: 1.45,
      trend: "up",
    },
    {
      name: "ETH/USDT",
      fullName: "Ethereum",
      value: 1792.05,
      percentage: 1.45,
      trend: "up",
    },
    {
      name: "BNB/USDT",
      fullName: "BNB",
      value: 602.81,
      percentage: 0.87,
      trend: "up",
    },
    {
      name: "USDC/USDT",
      fullName: "USDC",
      value: 1.0,
      percentage: 0.02,
      trend: "neutral",
    },
  ];

  const shortcuts = [
    { name: "Add Fund", icon: <Plus color="black" className="w-5 h-5" /> },
    {
      name: "Fund Logs",
      icon: <ArrowUpDown color="black" className="w-5 h-5" />,
    },
    { name: "Assets", icon: <Wallet color="black" className="w-5 h-5" /> },
    { name: "Withdraw", icon: <Landmark color="black" className="w-5 h-5" /> },
    {
      name: "Material Mining",
      icon: <Database color="black" className="w-5 h-5" />,
    },
    {
      name: "Crypto Mining",
      icon: <BarChart2 color="black" className="w-5 h-5" />,
    },
    {
      name: "Transactions",
      icon: <Repeat color="black" className="w-5 h-5" />,
    },
    { name: "KYC", icon: <Key color="black" className="w-5 h-5" /> },
  ];


  return (
    <div className={`flex flex-col min-h-screen w-[calc(100%-15rem)] ml-auto ${colors.background} pt-30 max-[600px]:w-full max-[600px]:pb-30`}>

        {/* Right Content Area */}
        <div className="w-full p-4 overflow-y-auto">
          {/* Total Assets */}
          <div className={`${cls.card()} p-4 mb-6`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <span className={`text-sm ${colors.textSecondary}`}>
                  Est. Total Value (USD)
                </span>
                <ChevronDown
                  className={`w-4 h-4 ml-1 ${colors.textSecondary}`}
                />
              </div>
              <Link className="flex space-x-2" to='/user/settings'>
                <button
                  className={`${colors.inputBg} ${colors.hoverBg} p-2 rounded-full`}
                >
                  <Settings className={`w-5 h-5 text-white`} />
                </button>
              </Link>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h3 className={`font-medium ${colors.textSecondary}`}>
                  Total Assets:
                </h3>
                <div className={`text-3xl font-bold ${colors.textPrimary}`}>
                  $95,684,280.56
                </div>
              </div>
              <button className="bg-yellow-400 text-black hover:bg-yellow-300 px-4 py-2 rounded-lg flex items-center mt-4 md:mt-0 w-full md:w-auto justify-center transition-colors">
                <Plus className="w-4 h-4 mr-2" /> Add Funds
              </button>
            </div>
          </div>

          {/* Shortcuts Grid */}
          <div className="mb-6">
            <h3 className={`font-semibold mb-3 ${colors.textPrimary}`}>
              Shortcuts
            </h3>
            <div className="grid grid-cols-8 max-[1027px]:grid-cols-4 gap-4">
              {shortcuts.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
                >
                  <div className="bg-white rounded-full p-3 mb-2">
                    {item.icon}
                  </div>
                  <span
                    className={`text-xs text-center ${colors.textSecondary}`}
                  >
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Crypto Assets */}
          <div className={`${cls.card()} p-6`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className={`font-bold ${colors.textPrimary}`}>
                Your Crypto Assets
              </h3>
              <button className={`text-white text-sm flex items-center`}>
                View All <ChevronDown className="w-4 h-4 ml-1" />
              </button>
            </div>
            <div className="space-y-4">
              {cryptoAssets.map((asset, index) => (
                <div
                  key={index}
                  className={`${colors.inputBg} p-4 rounded-lg ${colors.hoverBg} transition-colors`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div
                        className={`${
                          asset.trend === "up"
                            ? "bg-yellow-400"
                            : colors.neutral
                        } rounded-full p-2 mr-3`}
                      >
                        <TrendingUp className="w-5 h-5 text-black" />
                      </div>
                      <div>
                        <div className={`font-semibold ${colors.textPrimary}`}>
                          {asset.name}
                        </div>
                        <div className={`text-sm ${colors.textSecondary}`}>
                          {asset.fullName}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold ${colors.textPrimary}`}>
                        ${asset.value.toLocaleString()}
                      </div>
                      <div
                        className={`text-black text-xs px-2 py-1 rounded inline-flex items-center ${
                          asset.percentage > 0
                            ? "bg-yellow-400"
                            : colors.neutral
                        }`}
                      >
                        {asset.trend === "up" && (
                          <TrendingUp className="w-3 h-3 mr-1" />
                        )}
                        {asset.percentage.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="text-white w-full py-3 rounded-lg mt-6 font-medium"
              onClick={() => setShowAllCoins(!showAllCoins)}
            >
              {showAllCoins ? "Hide" : "Show All"} Coins
            </button>
          </div>
        
      </div>
    </div>
  );
}
