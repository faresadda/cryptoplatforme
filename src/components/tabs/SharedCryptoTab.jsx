import { useState, useEffect, useRef } from "react";
import { TrendingUp, TrendingDown, Loader, X, ChevronLeft } from "lucide-react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function CryptoList() {
  const [coins, setCoins] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [coinHistory, setCoinHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [timePeriod, setTimePeriod] = useState("24h");
  const wsRef = useRef(null);

  const API_KEY = import.meta.env.VITE_API_KEY;

  // Fetch coins and init WebSocket for live updates
  useEffect(() => {
    let isMounted = true;
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          "https://api.coinranking.com/v2/coins",
          {
            headers: { "x-access-token": API_KEY },
            params: { limit: 70, timePeriod: "24h" },
          }
        );

        if (!isMounted) return;
        const list = data.data.coins.map((coin) => ({
          ...coin,
          priceChanged: false,
          priceIncreased: false,
        }));

        setCoins(list);
        setStats(data.data.stats);
        setLoading(false);
        setLastUpdated(new Date().toLocaleTimeString());

        // Initialize WebSocket
        const uuidsParam = list.map((c) => `uuids[]=${c.uuid}`).join("&");
        const wsUrl = `wss://api.coinranking.com/v2/real-time/rates?x-access-token=${API_KEY}&throttle=1s&${uuidsParam}`;
        const ws = new WebSocket(wsUrl);
        wsRef.current = ws;

        ws.onmessage = (event) => {
          const msg = JSON.parse(event.data);
          setCoins((prev) =>
            prev.map((c) => {
              if (c.uuid === msg.currencyUuid) {
                const increased = parseFloat(msg.price) > parseFloat(c.price);
                return {
                  ...c,
                  price: msg.price,
                  priceChanged: true,
                  priceIncreased: increased,
                };
              }
              return c;
            })
          );
          setLastUpdated(new Date().toLocaleTimeString());
        };

        ws.onerror = () => {
          console.error("WebSocket error");
        };
      } catch (err) {
        if (!isMounted) return;
        setError("Failed to fetch cryptocurrency data");
        setLoading(false);
      }
    };

    fetchCoins();

    return () => {
      isMounted = false;
      if (wsRef.current) wsRef.current.close();
    };
  }, []);

  // Reset priceChanged flag for animations
  useEffect(() => {
    if (coins.length === 0) return;
    const timer = setTimeout(() => {
      setCoins((prev) => prev.map((c) => ({ ...c, priceChanged: false })));
    }, 1000);
    return () => clearTimeout(timer);
  }, [coins]);

  // Fetch coin details when a coin is selected
  useEffect(() => {
    if (!selectedCoin) return;

    const fetchCoinDetails = async () => {
      setHistoryLoading(true);
      try {
        // Fetch detailed coin information
        const coinDetailsResponse = await axios.get(
          `https://api.coinranking.com/v2/coin/${selectedCoin.uuid}`,
          {
            headers: { "x-access-token": API_KEY },
          }
        );

        // Update the selected coin with more detailed data
        if (
          coinDetailsResponse.data &&
          coinDetailsResponse.data.data &&
          coinDetailsResponse.data.data.coin
        ) {
          // Log the supply data for debugging
          console.log(
            "Supply data:",
            coinDetailsResponse.data.data.coin.supply
          );

          const detailedCoin = coinDetailsResponse.data.data.coin;

          // Fix possible supply issues
          let supplyValue =
            detailedCoin.supply?.circulating ||
            detailedCoin.supply?.total ||
            detailedCoin.supply;
          if (typeof supplyValue === "object" && !supplyValue.confirmed) {
            supplyValue = supplyValue.total || supplyValue.circulating;
          }

          setSelectedCoin((prevCoin) => ({
            ...prevCoin,
            ...detailedCoin,
            supplyFormatted: supplyValue,
          }));
        }

        // Fetch coin price history
        const historyResponse = await axios.get(
          `https://api.coinranking.com/v2/coin/${selectedCoin.uuid}/history`,
          {
            headers: { "x-access-token": API_KEY },
            params: { timePeriod },
          }
        );

        if (
          historyResponse.data &&
          historyResponse.data.data &&
          historyResponse.data.data.history
        ) {
          const history = historyResponse.data.data.history
            .filter(
              (point) => point && point.price && parseFloat(point.price) > 0
            )
            .map((point) => ({
              timestamp: new Date(point.timestamp * 1000).toLocaleDateString(),
              price: parseFloat(point.price),
            }));

          setCoinHistory(history);
        } else {
          setCoinHistory([]);
        }
      } catch (err) {
        console.error("Failed to fetch coin data", err);
        setCoinHistory([]);
      } finally {
        setHistoryLoading(false);
      }
    };

    fetchCoinDetails();
  }, [selectedCoin?.uuid, timePeriod, API_KEY]);

  const formatNumber = (num) => {
    if (
      num === null ||
      num === undefined ||
      num === "" ||
      isNaN(parseFloat(num))
    )
      return "0";

    // For objects (like supply could be)
    if (typeof num === "object") {
      // Try to get a valid number value from the object
      const objNum = num.total || num.circulating || num.max || 0;
      return formatNumber(objNum);
    }

    const value = parseFloat(num);
    if (value === 0) return "0";

    if (value >= 1e12) return (value / 1e12).toFixed(2) + "T";
    if (value >= 1e9) return (value / 1e9).toFixed(2) + "B";
    if (value >= 1e6) return (value / 1e6).toFixed(2) + "M";
    if (value >= 1e3) return (value / 1e3).toFixed(2) + "K";

    // For very small values (like many cryptocurrencies), display with appropriate precision
    if (value < 0.0001) return value.toExponential(2);
    if (value < 0.01) return value.toFixed(6);
    if (value < 1) return value.toFixed(4);

    return value.toFixed(2);
  };

  const handleCoinClick = (coin) => {
    setSelectedCoin({ ...coin });
    setHistoryLoading(true);
    setCoinHistory([]);
  };

  const closeModal = () => {
    setSelectedCoin(null);
    setCoinHistory([]);
  };

  const changePeriod = (period) => {
    setTimePeriod(period);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 bg-[#1e1e20]">
        <Loader className="animate-spin text-yellow-400" size={32} />
        <p className="ml-3 text-base sm:text-lg font-medium text-white">
          Loading cryptocurrency data...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#2d2d30] text-white p-3 sm:px-4 sm:py-3 rounded border border-red-500">
        <p className="font-medium text-sm sm:text-base text-red-400">{error}</p>
        <p className="text-xs sm:text-sm text-gray-400">
          Please check your API key or try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto bg-[#1e1e20] p-3 sm:p-4 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <h1 className="text-xl sm:text-2xl font-bold text-white">
          Cryptocurrency Prices (Live)
        </h1>
        {lastUpdated && (
          <div className="text-xs sm:text-sm text-gray-400">
            Last Updated: {lastUpdated}
          </div>
        )}
      </div>

      <div className="mb-4 sm:mb-6">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
          <div className="bg-[#0f0f0f] rounded-lg p-3 sm:p-4 border border-gray-800">
            <p className="text-xs sm:text-sm text-gray-400">Total Coins</p>
            <p className="font-bold text-lg sm:text-2xl text-white">
              {stats.total}
            </p>
          </div>
          <div className="bg-[#0f0f0f] rounded-lg p-3 sm:p-4 border border-gray-800">
            <p className="text-xs sm:text-sm text-gray-400">Total Markets</p>
            <p className="font-bold text-lg sm:text-2xl text-white">
              {stats.totalMarkets}
            </p>
          </div>
          <div className="bg-[#0f0f0f] rounded-lg p-3 sm:p-4 border border-gray-800">
            <p className="text-xs sm:text-sm text-gray-400">Total Market Cap</p>
            <p className="font-bold text-lg sm:text-2xl text-white">
              ${formatNumber(stats.totalMarketCap)}
            </p>
          </div>
          <div className="bg-[#0f0f0f] rounded-lg p-3 sm:p-4 border border-gray-800">
            <p className="text-xs sm:text-sm text-gray-400">24h Volume</p>
            <p className="font-bold text-lg sm:text-2xl text-white">
              ${formatNumber(stats.total24hVolume)}
            </p>
          </div>
        </div>
      </div>

      {/* Table header - hidden on smallest screens */}
      <div className="bg-[#0f0f0f] rounded-lg border border-gray-800 overflow-hidden">
        <div className="hidden md:grid grid-cols-12 bg-[#2d2d30] p-3 md:p-4 border-b border-gray-800">
          <div className="col-span-1 text-gray-400 text-sm font-medium">#</div>
          <div className="col-span-3 text-gray-400 text-sm font-medium">
            Coin
          </div>
          <div className="col-span-2 text-right text-gray-400 text-sm font-medium">
            Price
          </div>
          <div className="col-span-2 text-right text-gray-400 text-sm font-medium">
            24h Change
          </div>
          <div className="col-span-2 text-right text-gray-400 text-sm font-medium">
            Market Cap
          </div>
          <div className="col-span-2 text-right text-gray-400 text-sm font-medium">
            Volume (24h)
          </div>
        </div>

        {/* Mobile and Desktop coin list */}
        {coins.map((coin) => (
          <div
            key={coin.uuid}
            className={`border-b border-gray-800 hover:bg-[#2d2d30] transition-colors cursor-pointer ${
              coin.priceChanged
                ? coin.priceIncreased
                  ? "bg-green-900/20"
                  : "bg-red-900/20"
                : ""
            }`}
            onClick={() => handleCoinClick(coin)}
          >
            {/* Mobile view (flex layout) */}
            <div className="md:hidden p-3 flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <span className="text-gray-400 text-sm mr-2">
                    {coin.rank}
                  </span>
                  <img
                    src={coin.iconUrl}
                    alt={coin.name}
                    className="w-6 h-6 mr-2"
                    onError={(e) => (e.target.src = "/api/placeholder/32/32")}
                  />
                  <div>
                    <p className="font-medium text-sm text-white">
                      {coin.name}
                    </p>
                    <p className="text-xs text-gray-400">{coin.symbol}</p>
                  </div>
                </div>
                <div
                  className={`font-medium text-sm ${
                    coin.priceChanged
                      ? coin.priceIncreased
                        ? "text-green-400"
                        : "text-red-400"
                      : "text-white"
                  }`}
                >
                  ${parseFloat(coin.price).toFixed(2)}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-1 text-xs">
                <div>
                  <span className="text-gray-400">24h:</span>
                  <span
                    className={`ml-1 ${
                      parseFloat(coin.change) >= 0
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {parseFloat(coin.change).toFixed(2)}%
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Cap:</span>
                  <span className="ml-1 text-white">
                    ${formatNumber(coin.marketCap)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Vol:</span>
                  <span className="ml-1 text-white">
                    ${formatNumber(coin["24hVolume"])}
                  </span>
                </div>
              </div>
            </div>

            {/* Desktop view (grid layout) */}
            <div className="hidden md:grid grid-cols-12 p-4 items-center">
              <div className="col-span-1 text-gray-400 text-sm">
                {coin.rank}
              </div>
              <div className="col-span-3 flex items-center">
                <img
                  src={coin.iconUrl}
                  alt={coin.name}
                  className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3"
                  onError={(e) => (e.target.src = "/api/placeholder/32/32")}
                />
                <div>
                  <p className="font-medium text-sm sm:text-base text-white">
                    {coin.name}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-400">
                    {coin.symbol}
                  </p>
                </div>
              </div>
              <div
                className={`col-span-2 text-right font-medium text-sm sm:text-base ${
                  coin.priceChanged
                    ? coin.priceIncreased
                      ? "text-green-400"
                      : "text-red-400"
                    : "text-white"
                }`}
              >
                ${parseFloat(coin.price).toFixed(2)}
              </div>
              <div
                className={`col-span-2 text-right flex items-center justify-end text-sm sm:text-base ${
                  parseFloat(coin.change) >= 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {parseFloat(coin.change) >= 0 ? (
                  <TrendingUp size={16} className="mr-1" />
                ) : (
                  <TrendingDown size={16} className="mr-1" />
                )}
                {parseFloat(coin.change).toFixed(2)}%
              </div>
              <div className="col-span-2 text-right text-sm sm:text-base text-white">
                ${formatNumber(coin.marketCap)}
              </div>
              <div className="col-span-2 text-right text-sm sm:text-base text-white">
                ${formatNumber(coin["24hVolume"])}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Coin Details Modal */}
      {selectedCoin && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1e1e20] rounded-lg border border-gray-800 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <div className="flex items-center">
                <button
                  onClick={closeModal}
                  className="mr-3 text-gray-400 hover:text-white"
                >
                  <ChevronLeft size={24} />
                </button>
                <img
                  src={selectedCoin.iconUrl}
                  alt={selectedCoin.name}
                  className="w-8 h-8 mr-3"
                  onError={(e) => (e.target.src = "/api/placeholder/32/32")}
                />
                <div>
                  <h2 className="font-bold text-xl text-white">
                    {selectedCoin.name}{" "}
                    <span className="text-gray-400 text-base">
                      {selectedCoin.symbol}
                    </span>
                  </h2>
                  <p className="text-sm text-gray-400">
                    Rank #{selectedCoin.rank}
                  </p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            {/* Price and Stats */}
            <div className="p-4 border-b border-gray-800">
              <div className="flex flex-col md:flex-row md:items-end gap-2 md:gap-4 mb-4">
                <div className="text-3xl font-bold text-white">
                  ${parseFloat(selectedCoin.price).toFixed(2)}
                </div>
                <div
                  className={`text-lg font-medium flex items-center ${
                    parseFloat(selectedCoin.change) >= 0
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {parseFloat(selectedCoin.change) >= 0 ? (
                    <TrendingUp size={20} className="mr-1" />
                  ) : (
                    <TrendingDown size={20} className="mr-1" />
                  )}
                  {parseFloat(selectedCoin.change).toFixed(2)}%
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Market Cap</p>
                  <p className="text-white font-medium">
                    {selectedCoin.marketCap && selectedCoin.marketCap !== "0"
                      ? `${formatNumber(selectedCoin.marketCap)}`
                      : "غير متوفر"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">24h Volume</p>
                  <p className="text-white font-medium">
                    {selectedCoin["24hVolume"] &&
                    selectedCoin["24hVolume"] !== "0"
                      ? `${formatNumber(selectedCoin["24hVolume"])}`
                      : "غير متوفر"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Supply</p>
                  <p className="text-white font-medium">
                    {selectedCoin.supplyFormatted &&
                    selectedCoin.supplyFormatted !== "0"
                      ? `${formatNumber(selectedCoin.supplyFormatted)} ${
                          selectedCoin.symbol
                        }`
                      : selectedCoin.supply?.confirmed === false
                      ? `${formatNumber(
                          selectedCoin.supply?.total ||
                            selectedCoin.supply?.circulating
                        )} ${selectedCoin.symbol} (غير مؤكد)`
                      : "غير متوفر"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">All Time High</p>
                  <p className="text-white font-medium">
                    {selectedCoin.allTimeHigh?.price &&
                    selectedCoin.allTimeHigh.price !== "0"
                      ? `${parseFloat(selectedCoin.allTimeHigh.price).toFixed(
                          2
                        )} $`
                      : "غير متوفر"}
                  </p>
                </div>
              </div>
            </div>

            {/* Price Chart */}
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-lg text-white">Price Chart</h3>
                <div className="flex gap-2">
                  {["24h", "7d", "30d", "3m", "1y"].map((period) => (
                    <button
                      key={period}
                      onClick={() => changePeriod(period)}
                      className={`px-2 py-1 text-xs rounded ${
                        timePeriod === period
                          ? "bg-blue-600 text-white"
                          : "bg-[#2d2d30] text-gray-300 hover:bg-[#3d3d40]"
                      }`}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>

              {historyLoading ? (
                <div className="flex justify-center items-center h-64">
                  <Loader className="animate-spin text-blue-400" size={32} />
                </div>
              ) : coinHistory.length > 0 ? (
                <div className="h-64 md:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={coinHistory}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis
                        dataKey="timestamp"
                        stroke="#888"
                        tick={{ fill: "#888", fontSize: 12 }}
                        tickFormatter={(value) => {
                          if (timePeriod === "24h") {
                            return value.split("/")[1];
                          }
                          return value;
                        }}
                      />
                      <YAxis
                        stroke="#888"
                        tick={{ fill: "#888", fontSize: 12 }}
                        domain={["auto", "auto"]}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#0f0f0f",
                          border: "1px solid #333",
                          borderRadius: "4px",
                          color: "#fff",
                        }}
                        labelStyle={{ fontWeight: "bold", color: "#fff" }}
                      />
                      <Line
                        type="monotone"
                        dataKey="price"
                        stroke={
                          parseFloat(selectedCoin.change) >= 0
                            ? "#4ade80"
                            : "#f87171"
                        }
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-64 flex justify-center items-center border border-gray-800 rounded">
                  <p className="text-gray-400">No historical data available</p>
                </div>
              )}
            </div>

            {/* Coin Description */}
            {selectedCoin.description && (
              <div className="p-4 border-t border-gray-800">
                <h3 className="font-medium text-lg text-white mb-2">
                  About {selectedCoin.name}
                </h3>
                <div
                  className="text-gray-300 text-sm"
                  dangerouslySetInnerHTML={{ __html: selectedCoin.description }}
                />
              </div>
            )}

            {/* Links */}
            {selectedCoin.links && selectedCoin.links.length > 0 && (
              <div className="p-4 border-t border-gray-800">
                <h3 className="font-medium text-lg text-white mb-2">
                  Resources
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCoin.links.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-[#2d2d30] text-blue-400 hover:bg-[#3d3d40] rounded text-sm"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
