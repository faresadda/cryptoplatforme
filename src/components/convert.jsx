import React, { useState, useEffect } from "react";
import { ArrowUpDown, Info, AlertCircle } from "lucide-react";

const Convert = () => {
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("BTC");
  const [toCurrency, setToCurrency] = useState("USDT");
  const [conversionRate, setConversionRate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Color scheme
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
    textSecondary: "text-[#a3a3a3]",
    textMuted: "text-[#666666]",

    // Border colors
    border: "border-[#333333]",

    // Input and hover colors
    inputBg: "bg-[#282828]",
    hoverBg: "hover:bg-[#333333]",

    // Status colors
    success: "bg-yellow-400",
    successText: "text-yellow-400",
    neutral: "bg-[#666666]",
    neutralText: "text-[#666666]",
  };

  // Mock data for available balances
  const availableBalances = {
    BTC: 1.00201,
    ETH: 15.5432,
    USDT: 270937.97,
    SOL: 245.8,
    ADA: 5230.45,
  };

  // Currency icons, colors, and mock rates mapping
  const currencyConfig = {
    BTC: {
      symbol: "₿",
      bgColor: "bg-orange-500",
      fullName: "Bitcoin",
      rates: { ETH: 14.5, USDT: 58450, SOL: 240, ADA: 5000 },
    },
    ETH: {
      symbol: "Ξ",
      bgColor: "bg-blue-500",
      fullName: "Ethereum",
      rates: { BTC: 0.069, USDT: 4025, SOL: 16.5, ADA: 344 },
    },
    USDT: {
      symbol: "₮",
      bgColor: "bg-teal-500",
      fullName: "Tether USDT",
      rates: { BTC: 0.000017, ETH: 0.00025, SOL: 0.0041, ADA: 0.085 },
    },
    SOL: {
      symbol: "◎",
      bgColor: "bg-purple-500",
      fullName: "Solana",
      rates: { BTC: 0.0042, ETH: 0.06, USDT: 243.75, ADA: 21 },
    },
    ADA: {
      symbol: "₳",
      bgColor: "bg-blue-400",
      fullName: "Cardano",
      rates: { BTC: 0.0002, ETH: 0.0029, USDT: 11.75, SOL: 0.048 },
    },
  };

  // Calculate conversion rate
  useEffect(() => {
    if (fromCurrency === toCurrency) {
      setConversionRate(1);
    } else {
      const rate = currencyConfig[fromCurrency].rates[toCurrency];
      setConversionRate(rate);
    }
  }, [fromCurrency, toCurrency]);

  // Calculate toAmount whenever fromAmount or conversion rate changes
  useEffect(() => {
    if (fromAmount && conversionRate) {
      setToAmount((parseFloat(fromAmount) * conversionRate).toFixed(8));
    } else {
      setToAmount("");
    }
  }, [fromAmount, conversionRate]);

  const handleMaxClick = () => {
    setFromAmount(availableBalances[fromCurrency].toString());
  };

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setFromAmount(toAmount);
  };

  const handleContinue = () => {
    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      return;
    }

    if (parseFloat(fromAmount) > availableBalances[fromCurrency]) {
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setShowConfirmation(true);
    }, 1000);
  };

  const resetForm = () => {
    setFromAmount("");
    setToAmount("");
    setShowConfirmation(false);
  };

  const confirmConversion = () => {
    // Here you would handle the actual conversion
    setShowConfirmation(false);
    resetForm();
    // Show success message or notification (not implemented)
  };

  // Format number with thousands separators
  const formatNumber = (value) => {
    if (!value) return "";
    return parseFloat(value).toLocaleString(undefined, {
      maximumFractionDigits: 8,
    });
  };

  // Calculate if user has enough balance
  const hasEnoughBalance =
    !fromAmount || parseFloat(fromAmount) <= availableBalances[fromCurrency];

  return (
    <div
      className={`min-h-screen ${colors.background} flex items-center justify-center px-4 py-6 sm:px-6 lg:px-8 w-[calc(100%-15rem)] ml-auto pt-30 max-[600px]:w-full max-[600px]:pb-30`}
    >
      <div
        className={`w-full max-w-lg mx-auto px-6 py-8 rounded-xl ${colors.cardBg} shadow-xl space-y-6`}
      >
        <h2 className={`text-2xl font-bold ${colors.textPrimary} text-center`}>
          Convert Crypto Assets
        </h2>

        {!showConfirmation ? (
          <>
            {/* From Currency Section */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className={`text-sm ${colors.textSecondary}`}>From</span>
                <span
                  className={`text-sm ${colors.secondaryText} font-medium flex items-center gap-1`}
                >
                  <span>Available:</span>
                  <span className="font-semibold">
                    {formatNumber(availableBalances[fromCurrency])}{" "}
                    {fromCurrency}
                  </span>
                </span>
              </div>
              <div
                className={`flex flex-col sm:flex-row items-center gap-3 p-4 rounded-lg ${colors.border} border ${colors.cardBg}`}
              >
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div
                    className={`w-10 h-10 rounded-full ${currencyConfig[fromCurrency].bgColor} flex items-center justify-center shrink-0`}
                  >
                    <span
                      className={`${colors.textPrimary} text-lg font-medium`}
                    >
                      {currencyConfig[fromCurrency].symbol}
                    </span>
                  </div>
                  <select
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                    className={`${colors.inputBg} ${colors.textPrimary} px-3 py-2 rounded-md outline-none ${colors.border} border w-full sm:w-auto focus:border-yellow-400 transition-colors`}
                  >
                    {Object.keys(currencyConfig).map((currency) => (
                      <option key={`from-${currency}`} value={currency}>
                        {currencyConfig[currency].fullName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-1 relative w-full">
                  <input
                    type="number"
                    value={fromAmount}
                    onChange={(e) => setFromAmount(e.target.value)}
                    placeholder="0.00"
                    className={`w-full ${colors.inputBg} border ${
                      hasEnoughBalance ? colors.border : "border-red-500"
                    } rounded-md px-3 py-2 text-right pr-16 ${
                      colors.textPrimary
                    } placeholder-gray-500 focus:border-yellow-400 transition-colors`}
                  />
                  <button
                    onClick={handleMaxClick}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 text-sm ${colors.primaryText} hover:text-yellow-300 ${colors.neutral} px-2 py-1 rounded`}
                  >
                    Max
                  </button>
                </div>
              </div>
              {!hasEnoughBalance && (
                <div className="flex items-center gap-2 text-red-500 text-sm mt-1">
                  <AlertCircle size={16} />
                  <span>Insufficient balance</span>
                </div>
              )}
            </div>

            {/* Swap Button */}
            <div className="flex justify-center">
              <button
                onClick={handleSwapCurrencies}
                className={`p-2 rounded-full ${colors.inputBg} ${colors.hoverBg} transition-colors`}
              >
                <ArrowUpDown size={20} className={colors.primaryText} />
              </button>
            </div>

            {/* To Currency Section */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className={`text-sm ${colors.textSecondary}`}>To</span>
                <span
                  className={`text-sm ${colors.secondaryText} font-medium flex items-center gap-1`}
                >
                  <span>Available:</span>
                  <span className="font-semibold">
                    {formatNumber(availableBalances[toCurrency])} {toCurrency}
                  </span>
                </span>
              </div>
              <div
                className={`flex flex-col sm:flex-row items-center gap-3 p-4 rounded-lg ${colors.border} border ${colors.cardBg}`}
              >
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div
                    className={`w-10 h-10 rounded-full ${currencyConfig[toCurrency].bgColor} flex items-center justify-center shrink-0`}
                  >
                    <span
                      className={`${colors.textPrimary} text-lg font-medium`}
                    >
                      {currencyConfig[toCurrency].symbol}
                    </span>
                  </div>
                  <select
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                    className={`${colors.inputBg} ${colors.textPrimary} px-3 py-2 rounded-md outline-none ${colors.border} border w-full sm:w-auto focus:border-yellow-400 transition-colors`}
                  >
                    {Object.keys(currencyConfig).map(
                      (currency) =>
                        currency !== fromCurrency && (
                          <option key={`to-${currency}`} value={currency}>
                            {currencyConfig[currency].fullName}
                          </option>
                        )
                    )}
                  </select>
                </div>
                <div className="flex-1 relative w-full">
                  <input
                    type="text"
                    value={formatNumber(toAmount)}
                    readOnly
                    className={`w-full ${colors.inputBg} ${colors.border} border rounded-md px-3 py-2 text-right ${colors.textPrimary}`}
                  />
                </div>
              </div>
            </div>

            {/* Exchange Rate Info */}
            {conversionRate && (
              <div
                className={`flex items-center justify-center gap-2 text-sm ${colors.textMuted} py-2`}
              >
                <Info size={16} />
                <span>
                  1 {fromCurrency} = {formatNumber(conversionRate)} {toCurrency}
                </span>
              </div>
            )}

            {/* Continue Button */}
            <button
              className={`w-full py-4 rounded-lg text-lg font-medium shadow-sm transition-all ${
                hasEnoughBalance && fromAmount && parseFloat(fromAmount) > 0
                  ? `${colors.primary} hover:bg-yellow-500 text-black`
                  : `${colors.neutral} ${colors.textMuted} cursor-not-allowed`
              }`}
              onClick={handleContinue}
              disabled={
                !hasEnoughBalance ||
                !fromAmount ||
                parseFloat(fromAmount) <= 0 ||
                loading
              }
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing
                </span>
              ) : (
                "Convert"
              )}
            </button>
          </>
        ) : (
          // Confirmation Screen
          <div className="space-y-6">
            <div className="text-center">
              <h3
                className={`text-xl font-semibold ${colors.textPrimary} mb-4`}
              >
                Confirm Conversion
              </h3>
              <div
                className={`p-4 rounded-lg ${colors.cardBg} ${colors.border} border`}
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full ${currencyConfig[fromCurrency].bgColor} flex items-center justify-center`}
                    >
                      <span className={colors.textPrimary}>
                        {currencyConfig[fromCurrency].symbol}
                      </span>
                    </div>
                    <span className={colors.textPrimary}>{fromCurrency}</span>
                  </div>
                  <span className={`${colors.textPrimary} font-medium`}>
                    {formatNumber(fromAmount)}
                  </span>
                </div>

                <div className="flex justify-center my-2">
                  <ArrowUpDown size={20} className={colors.textMuted} />
                </div>

                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full ${currencyConfig[toCurrency].bgColor} flex items-center justify-center`}
                    >
                      <span className={colors.textPrimary}>
                        {currencyConfig[toCurrency].symbol}
                      </span>
                    </div>
                    <span className={colors.textPrimary}>{toCurrency}</span>
                  </div>
                  <span className={`${colors.textPrimary} font-medium`}>
                    {formatNumber(toAmount)}
                  </span>
                </div>
              </div>

              <div className={`mt-4 text-sm ${colors.textMuted}`}>
                <p>
                  Exchange rate: 1 {fromCurrency} ={" "}
                  {formatNumber(conversionRate)} {toCurrency}
                </p>
                <p className="mt-1">Estimated fee: 0.0005 {fromCurrency}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                className={`flex-1 py-3 rounded-lg ${colors.inputBg} ${colors.hoverBg} ${colors.textPrimary} font-medium transition-colors`}
                onClick={resetForm}
              >
                Cancel
              </button>
              <button
                className={`flex-1 py-3 rounded-lg ${colors.primary} hover:bg-yellow-500 text-black font-medium transition-colors`}
                onClick={confirmConversion}
              >
                Confirm
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Convert;
