import { FaHome, FaCoins } from "react-icons/fa";
import { RiExchangeLine } from "react-icons/ri";
import { GiMining } from "react-icons/gi";
import { FaChartLine } from "react-icons/fa";
import { Link } from "react-router-dom";

const sidebarItems = [
  { name: "Home", icon: <FaHome />, href: "/dashboard" },
  { name: "Convert", icon: <RiExchangeLine />, href: "/dashboard/convert" },
  { name: "Markets", icon: <FaChartLine />, href: "/dashboard/markets" },
  { name: "Mining", icon: <GiMining />, href: "/dashboard/mining" },
  { name: "Assets", icon: <FaCoins />, href: "/dashboard/assets" },
];

export default function Sidebar() {
    
  return (
    <div className="fixed left-0 h-full w-60 bg-[rgb(15,15,15)] text-white shadow-lg p-10 space-y-6 z-10 pt-30 
    max-[600px]:bottom-0 max-[600px]:w-full max-[600px]:h-20 max-[600px]:pt-5 max-[600px]:p-4">
      {innerWidth>600 && <h2 className="text-yellow-400 text-xl font-bold mb-10">Dashboard</h2>}
      <ul className="space-y-5 max-[600px]:flex max-[600px]:justify-between">
        {sidebarItems.map((item) => (
          <li key={item.name}>
            <Link
              to={item.href}
              className="flex items-center gap-3 hover:text-yellow-400 transition max-[600px]:flex-col max-[600px]:items-center"
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
