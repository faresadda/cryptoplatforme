// src/components/DataCard.jsx
import { TrendingUp, TrendingDown, Loader, X, ChevronLeft } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function DataCard({
  selectedCoin,
  coinHistory,
  historyLoading,
  timePeriod,
  onClose,
  onChangePeriod,
  formatNumber,
}) {
  if (!selectedCoin) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1e1e20] rounded-lg border border-gray-800 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center">
            <button
              onClick={onClose}
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
              <p className="text-sm text-gray-400">Rank #{selectedCoin.rank}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Price & stats */}
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
            {/** Market Cap **/}
            <div>
              <p className="text-sm text-gray-400">Market Cap</p>
              <p className="text-white font-medium">
                {selectedCoin.marketCap && selectedCoin.marketCap !== "0"
                  ? formatNumber(selectedCoin.marketCap)
                  : "غير متوفر"}
              </p>
            </div>
            {/** 24h Volume **/}
            <div>
              <p className="text-sm text-gray-400">24h Volume</p>
              <p className="text-white font-medium">
                {selectedCoin["24hVolume"] && selectedCoin["24hVolume"] !== "0"
                  ? formatNumber(selectedCoin["24hVolume"])
                  : "غير متوفر"}
              </p>
            </div>
            {/** Supply **/}
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
            {/** All Time High **/}
            <div>
              <p className="text-sm text-gray-400">All Time High</p>
              <p className="text-white font-medium">
                {selectedCoin.allTimeHigh?.price &&
                selectedCoin.allTimeHigh.price !== "0"
                  ? `${parseFloat(selectedCoin.allTimeHigh.price).toFixed(2)} $`
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
                  onClick={() => onChangePeriod(period)}
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
                    tickFormatter={(value) =>
                      timePeriod === "24h" ? value.split("/")[1] : value
                    }
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

        {/* Description & Links */}
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
        {selectedCoin.links?.length > 0 && (
          <div className="p-4 border-t border-gray-800">
            <h3 className="font-medium text-lg text-white mb-2">Resources</h3>
            <div className="flex flex-wrap gap-2">
              {selectedCoin.links.map((link, i) => (
                <a
                  key={i}
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
  );
}
