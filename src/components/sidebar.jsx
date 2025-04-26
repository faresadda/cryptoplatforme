import { FaHome, FaCoins } from "react-icons/fa";
import { RiExchangeLine } from "react-icons/ri";
import { GiMining } from "react-icons/gi";
import { FaChartLine } from "react-icons/fa";

const sidebarItems = [
  { name: "Home", icon: <FaHome />, href: "#" },
  { name: "Convert", icon: <RiExchangeLine />, href: "#" },
  { name: "Markets", icon: <FaChartLine />, href: "#" },
  { name: "Mining", icon: <GiMining />, href: "#" },
  { name: "Assets", icon: <FaCoins />, href: "#" },
];

export default function Sidebar() {
  return (
    <div className="fixed top-0 left-0 h-full w-60 bg-[rgb(15,15,15)] text-white shadow-lg p-10 space-y-6 z-10 pt-30">
      <h2 className="text-yellow-400 text-xl font-bold mb-10">Dashboard</h2>
      <ul className="space-y-5">
        {sidebarItems.map((item) => (
          <li key={item.name}>
            <a
              href={item.href}
              className="flex items-center gap-3 hover:text-yellow-400 transition"
            >
              {item.icon}
              <span>{item.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
