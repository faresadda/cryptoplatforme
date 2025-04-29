import { useState, useEffect, useRef } from "react";
import { Loader } from "lucide-react";
import axios from "axios";

export default function TrendingCoins() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const wsRef = useRef(null);

  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    let isMounted = true;

    const fetchTrendingAndSubscribe = async () => {
      try {
        // 1) جلب العملات الشائعة
        const { data } = await axios.get(
          "https://api.coinranking.com/v2/coins/trending",
          {
            headers: { "x-access-token": API_KEY },
          }
        );

        if (!isMounted) return;

        // 2) بناء مصفوفة العملات مع حقول التحديث اللحظي
        const list = data.data.coins.map((coin, idx) => ({
          uuid: coin.uuid,
          rank: idx + 1,
          name: coin.name,
          symbol: coin.symbol,
          iconUrl: coin.iconUrl,
          price: coin.price || "0",
          change: coin.change || "0",
          marketCap: coin.marketCap || "0",
          volume: coin["24hVolume"] || "0",
          priceChanged: false,
          priceIncreased: false,
        }));

        setCoins(list);
        setLoading(false);
        setLastUpdated(new Date().toLocaleTimeString());

        // 3) فتح WebSocket للتحديث اللحظي
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
                  change: msg.change,
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
        setError("Failed to load live data.");
        setLoading(false);
      }
    };

    fetchTrendingAndSubscribe();

    return () => {
      isMounted = false;
      if (wsRef.current) wsRef.current.close();
    };
  }, []);

  // إعادة ضبط علامة priceChanged بعد ثانية لتفادي الوميض المستمر
  useEffect(() => {
    if (coins.length === 0) return;
    const timer = setTimeout(() => {
      setCoins((prev) => prev.map((c) => ({ ...c, priceChanged: false })));
    }, 1000);
    return () => clearTimeout(timer);
  }, [coins]);

  const formatNumber = (num) => {
    if (!num || isNaN(num)) return "0";
    const n = parseFloat(num);
    if (n >= 1e12) return (n / 1e12).toFixed(2) + "T";
    if (n >= 1e9) return (n / 1e9).toFixed(2) + "B";
    if (n >= 1e6) return (n / 1e6).toFixed(2) + "M";
    if (n >= 1e3) return (n / 1e3).toFixed(2) + "K";
    return n.toFixed(2);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48 sm:h-64 bg-[#1e1e20]">
        <Loader className="animate-spin text-yellow-400" size={32} />
        <p className="ml-3 text-sm sm:text-lg font-medium text-white">
          Loading trending coins...
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-4 gap-2">
        <h1 className="text-xl sm:text-2xl font-bold text-white">
          Trending Coins
        </h1>
        {lastUpdated && (
          <div className="text-xs sm:text-sm text-gray-400">
            Last Updated: {lastUpdated}
          </div>
        )}
      </div>

      <div className="bg-[#0f0f0f] rounded-lg border border-gray-800 overflow-hidden">
        {/* Table header - visible only on md screens and up */}
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

        {/* Coin list with responsive design */}
        {coins.map((coin) => (
          <div
            key={coin.uuid}
            className={`border-b border-gray-800 hover:bg-[#2d2d30] transition-colors ${
              coin.priceChanged
                ? coin.priceIncreased
                  ? "bg-green-900/20"
                  : "bg-red-900/20"
                : ""
            }`}
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
                  ${formatNumber(coin.price)}
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
                    ${formatNumber(coin.volume)}
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
                ${formatNumber(coin.price)}
              </div>
              <div
                className={`col-span-2 text-right flex items-center justify-end text-sm sm:text-base ${
                  parseFloat(coin.change) >= 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {parseFloat(coin.change).toFixed(2)}%
              </div>
              <div className="col-span-2 text-right text-sm sm:text-base text-white">
                ${formatNumber(coin.marketCap)}
              </div>
              <div className="col-span-2 text-right text-sm sm:text-base text-white">
                ${formatNumber(coin.volume)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
