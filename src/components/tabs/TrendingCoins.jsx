// src/components/TrendingCoins.jsx
import { useState, useEffect, useRef, useCallback } from "react";
import { Loader } from "lucide-react";
import axios from "axios";
import DataCard from "./Datacard"; // Ensure correct path

export default function TrendingCoins() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const [selectedCoin, setSelectedCoin] = useState(null);
  const [coinHistory, setCoinHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [timePeriod, setTimePeriod] = useState("24h");

  const wsRef = useRef(null);
  const API_KEY = "coinrankingf124825f201d03abf8b032c2050f0ad64a6a409a774bfd9e";

  // 1) Fetch trending coins & open WebSocket for real-time updates
  useEffect(() => {
    let isMounted = true;
    const fetchTrendingAndSubscribe = async () => {
      try {
        const { data } = await axios.get(
          "https://api.coinranking.com/v2/coins/trending",
          { headers: { "x-access-token": API_KEY } }
        );
        if (!isMounted) return;

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

        const uuidsParam = list.map((c) => `uuids[]=${c.uuid}`).join("&");
        const ws = new WebSocket(
          `wss://api.coinranking.com/v2/real-time/rates?x-access-token=${API_KEY}&throttle=1s&${uuidsParam}`
        );
        wsRef.current = ws;
        ws.onmessage = (ev) => {
          const msg = JSON.parse(ev.data);
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
        ws.onerror = () => console.error("WebSocket error");
      } catch (err) {
        if (!isMounted) return;
        setError("Failed to load data.");
        setLoading(false);
      }
    };
    fetchTrendingAndSubscribe();
    return () => {
      isMounted = false;
      wsRef.current?.close();
    };
  }, []);

  // 2) Reset price flash
  useEffect(() => {
    if (!coins.length) return;
    const t = setTimeout(() => {
      setCoins((prev) => prev.map((c) => ({ ...c, priceChanged: false })));
    }, 1000);
    return () => clearTimeout(t);
  }, [coins]);

  // 3) Fetch coin details and price history on selection
  useEffect(() => {
    if (!selectedCoin) return;
    let isActive = true;
    const fetchDetails = async () => {
      setHistoryLoading(true);
      try {
        // Coin details
        const detailRes = await axios.get(
          `https://api.coinranking.com/v2/coin/${selectedCoin.uuid}`,
          { headers: { "x-access-token": API_KEY } }
        );
        const coinData = detailRes.data.data.coin;
        // Normalize supply value if object
        let supplyValue =
          coinData.supply?.circulating ||
          coinData.supply?.total ||
          coinData.supply;
        if (typeof supplyValue === "object" && !supplyValue.confirmed) {
          supplyValue = supplyValue.total || supplyValue.circulating;
        }
        if (isActive) {
          setSelectedCoin((prev) => ({
            ...prev,
            ...coinData,
            supplyFormatted: supplyValue,
          }));
        }

        // Price history
        const histRes = await axios.get(
          `https://api.coinranking.com/v2/coin/${selectedCoin.uuid}/history`,
          {
            headers: { "x-access-token": API_KEY },
            params: { timePeriod },
          }
        );
        const history = histRes.data.data.history
          .filter((p) => p.price && parseFloat(p.price) > 0)
          .map((p) => ({
            timestamp: new Date(p.timestamp * 1000).toLocaleDateString(),
            price: parseFloat(p.price),
          }));
        if (isActive) setCoinHistory(history);
      } catch (e) {
        console.error(e);
        if (isActive) setCoinHistory([]);
      } finally {
        if (isActive) setHistoryLoading(false);
      }
    };
    fetchDetails();
    return () => {
      isActive = false;
    };
  }, [selectedCoin?.uuid, timePeriod]);

  const formatNumber = useCallback((num) => {
    if (!num || isNaN(num)) return "0";
    const n = parseFloat(num);
    if (n >= 1e12) return (n / 1e12).toFixed(2) + "T";
    if (n >= 1e9) return (n / 1e9).toFixed(2) + "B";
    if (n >= 1e6) return (n / 1e6).toFixed(2) + "M";
    if (n >= 1e3) return (n / 1e3).toFixed(2) + "K";
    if (n < 0.01) return n.toFixed(6);
    return n.toFixed(2);
  }, []);

  const handleCoinClick = (coin) => {
    setSelectedCoin({ ...coin });
    setHistoryLoading(true);
    setCoinHistory([]);
  };
  const closeModal = () => setSelectedCoin(null);
  const changePeriod = (p) => setTimePeriod(p);

  if (loading)
    return (
      <div className="flex justify-center items-center h-48 bg-[#1e1e20]">
        <Loader className="animate-spin text-yellow-400" size={32} />
        <p className="ml-3 text-white">Loading trending coins…</p>
      </div>
    );
  if (error)
    return (
      <div className="bg-[#2d2d30] text-white p-3 rounded border border-red-500">
        <p className="text-red-400">{error}</p>
      </div>
    );

  return (
    <div className="w-full max-w-7xl mx-auto bg-[#1e1e20] p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-white">Trending Coins</h1>
        {lastUpdated && (
          <div className="text-sm text-gray-400">
            Last updated: {lastUpdated}
          </div>
        )}
      </div>

      <div className="bg-[#0f0f0f] rounded-lg border border-gray-800 overflow-hidden">
        <div className="hidden md:grid grid-cols-12 bg-[#2d2d30] p-3 border-b border-gray-800">
          {["#", "Coin", "Price", "24h Change", "Market Cap", "Volume"].map(
            (h, i) => (
              <div
                key={i}
                className={`col-span-${
                  i === 1 ? 3 : 2
                } text-gray-400 text-sm font-medium`}
              >
                {h}
              </div>
            )
          )}
        </div>

        {coins.map((coin) => (
          <div
            key={coin.uuid}
            onClick={() => handleCoinClick(coin)}
            className={`border-b border-gray-800 hover:bg-[#2d2d30] cursor-pointer transition-colors ${
              coin.priceChanged
                ? coin.priceIncreased
                  ? "bg-green-900/20"
                  : "bg-red-900/20"
                : ""
            }`}
          >
            {/* mobile */}
            <div className="md:hidden p-3 flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <span className="text-gray-400 mr-2">{coin.rank}</span>
                  <img
                    src={coin.iconUrl}
                    alt={coin.name}
                    className="w-6 h-6 mr-2"
                    onError={(e) => (e.target.src = "/api/placeholder/32/32")}
                  />
                  <div>
                    <p className="text-white font-medium">{coin.name}</p>
                    <p className="text-gray-400 text-xs">{coin.symbol}</p>
                  </div>
                </div>
                <div
                  className={`font-medium ${
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
            {/* desktop */}
            <div className="hidden md:grid grid-cols-12 p-4 items-center">
              <div className="col-span-1 text-gray-400">{coin.rank}</div>
              <div className="col-span-3 flex items-center">
                <img
                  src={coin.iconUrl}
                  alt={coin.name}
                  className="w-8 h-8 mr-3"
                  onError={(e) => (e.target.src = "/api/placeholder/32/32")}
                />
                <div>
                  <p className="text-white font-medium">{coin.name}</p>
                  <p className="text-gray-400 text-xs">{coin.symbol}</p>
                </div>
              </div>
              <div
                className={`col-span-2 text-right font-medium ${
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
                className={`col-span-2 text-right ${
                  parseFloat(coin.change) >= 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {parseFloat(coin.change).toFixed(2)}%
              </div>
              <div className="col-span-2 text-right text-white">
                ${formatNumber(coin.marketCap)}
              </div>
              <div className="col-span-2 text-right text-white">
                ${formatNumber(coin.volume)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DataCard Modal */}
      {selectedCoin && (
        <DataCard
          selectedCoin={selectedCoin}
          coinHistory={coinHistory}
          historyLoading={historyLoading}
          timePeriod={timePeriod}
          onClose={closeModal}
          onChangePeriod={changePeriod}
          formatNumber={formatNumber}
        />
      )}
    </div>
  );
}
