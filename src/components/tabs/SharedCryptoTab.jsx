// src/components/CryptoList.jsx
import { useState, useEffect, useRef, useCallback } from "react";
import { TrendingUp, TrendingDown, Loader } from "lucide-react";
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
import DataCard from "./Datacard";

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

  const API_KEY = "coinrankingf124825f201d03abf8b032c2050f0ad64a6a409a774bfd9e";

  // Fetch coins and initialize WebSocket
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

        // WebSocket for real-time price updates
        const uuidsParam = list.map((c) => `uuids[]=${c.uuid}`).join("&");
        const ws = new WebSocket(
          `wss://api.coinranking.com/v2/real-time/rates?x-access-token=${API_KEY}&throttle=1s&${uuidsParam}`
        );
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
        ws.onerror = () => console.error("WebSocket error");
      } catch (err) {
        if (!isMounted) return;
        setError("Failed to fetch coin data.");
        setLoading(false);
      }
    };
    fetchCoins();
    return () => {
      isMounted = false;
      wsRef.current?.close();
    };
  }, []);

  // Reset price change highlight
  useEffect(() => {
    if (!coins.length) return;
    const t = setTimeout(() => {
      setCoins((prev) => prev.map((c) => ({ ...c, priceChanged: false })));
    }, 1000);
    return () => clearTimeout(t);
  }, [coins]);

  // Fetch coin details & history when a coin is selected
  useEffect(() => {
    if (!selectedCoin) return;
    const fetchDetails = async () => {
      setHistoryLoading(true);
      try {
        const detailRes = await axios.get(
          `https://api.coinranking.com/v2/coin/${selectedCoin.uuid}`,
          { headers: { "x-access-token": API_KEY } }
        );
        const coinData = detailRes.data.data.coin;
        let supplyValue =
          coinData.supply?.circulating ||
          coinData.supply?.total ||
          coinData.supply;
        if (typeof supplyValue === "object" && !supplyValue.confirmed) {
          supplyValue = supplyValue.total || supplyValue.circulating;
        }
        setSelectedCoin((prev) => ({
          ...prev,
          ...coinData,
          supplyFormatted: supplyValue,
        }));
      } catch (e) {
        console.error(e);
      }
      try {
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
        setCoinHistory(history);
      } catch (e) {
        console.error(e);
        setCoinHistory([]);
      } finally {
        setHistoryLoading(false);
      }
    };
    fetchDetails();
  }, [selectedCoin?.uuid, timePeriod]);

  const formatNumber = useCallback((num) => {
    if (num == null || num === "" || isNaN(parseFloat(num))) return "0";
    if (typeof num === "object") {
      const val = num.total || num.circulating || num.max || 0;
      return formatNumber(val);
    }
    const v = parseFloat(num);
    if (v === 0) return "0";
    if (v >= 1e12) return (v / 1e12).toFixed(2) + "T";
    if (v >= 1e9) return (v / 1e9).toFixed(2) + "B";
    if (v >= 1e6) return (v / 1e6).toFixed(2) + "M";
    if (v >= 1e3) return (v / 1e3).toFixed(2) + "K";
    if (v < 0.0001) return v.toExponential(2);
    if (v < 0.01) return v.toFixed(6);
    if (v < 1) return v.toFixed(4);
    return v.toFixed(2);
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
      <div className="flex justify-center items-center h-64 bg-[#1e1e20]">
        <Loader className="animate-spin text-yellow-400" size={32} />
        <p className="ml-3 text-base font-medium text-white">Loading…</p>
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
        <h1 className="text-2xl font-bold text-white">
          Cryptocurrency Prices (Live)
        </h1>
        {lastUpdated && (
          <div className="text-sm text-gray-400">
            Last updated: {lastUpdated}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Coins", value: stats.total },
          { label: "Total Markets", value: stats.totalMarkets },
          {
            label: "Market Cap",
            value: `$${formatNumber(stats.totalMarketCap)}`,
          },
          {
            label: "24h Volume",
            value: `$${formatNumber(stats.total24hVolume)}`,
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-[#0f0f0f] p-4 rounded border border-gray-800"
          >
            <p className="text-gray-400 text-sm">{stat.label}</p>
            <p className="text-white font-bold text-xl">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#0f0f0f] rounded-lg border border-gray-800 overflow-hidden">
        <div className="hidden md:grid grid-cols-12 bg-[#2d2d30] p-3 border-b border-gray-800">
          {["#", "Coin", "Price", "24h", "Market Cap", "Volume"].map((h, i) => (
            <div
              key={i}
              className={`col-span-${
                i === 1 ? 3 : 2
              } text-gray-400 text-sm font-medium`}
            >
              {h}
            </div>
          ))}
        </div>
        {coins.map((coin) => (
          <div
            key={coin.uuid}
            onClick={() => handleCoinClick(coin)}
            className={`border-b border-gray-800 hover:bg-[#2d2d30] cursor-pointer ${
              coin.priceChanged
                ? coin.priceIncreased
                  ? "bg-green-900/20"
                  : "bg-red-900/20"
                : ""
            }`}
          >
            {/* mobile view */}
            <div className="md:hidden p-3 flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <span className="text-gray-400 mr-2">{coin.rank}</span>
                  <img src={coin.iconUrl} alt="" className="w-6 h-6 mr-2" />
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
                  ${parseFloat(coin.price).toFixed(2)}
                </div>
              </div>
              <div className="grid grid-cols-3 text-xs">
                <div>
                  <span className="text-gray-400">24h:</span>
                  <span
                    className={`${
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
                  <span className="text-white">
                    ${formatNumber(coin.marketCap)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Vol:</span>
                  <span className="text-white">
                    ${formatNumber(coin["24hVolume"])}
                  </span>
                </div>
              </div>
            </div>
            {/* desktop view */}
            <div className="hidden md:grid grid-cols-12 p-4 items-center">
              <div className="col-span-1 text-gray-400">{coin.rank}</div>
              <div className="col-span-3 flex items-center">
                <img src={coin.iconUrl} alt="" className="w-8 h-8 mr-3" />
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
                ${parseFloat(coin.price).toFixed(2)}
              </div>
              <div
                className={`col-span-2 text-right flex items-center ${
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
              <div className="col-span-2 text-right text-white">
                ${formatNumber(coin.marketCap)}
              </div>
              <div className="col-span-2 text-right text-white">
                ${formatNumber(coin["24hVolume"])}
              </div>
            </div>
          </div>
        ))}
      </div>

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
