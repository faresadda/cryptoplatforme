import { FaUser } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { MdAccountBalanceWallet } from "react-icons/md";
import { FaHeadphones } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function BinanceNavbar() {
  return (
    <nav className="bg-black text-white px-6 py-5 shadow-lg fixed top-0 w-full z-20">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-yellow-400 font-bold text-2xl">CryptoTrade</div>

        <div className="flex gap-5 items-center">
        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-gray-900 px-3 py-1 rounded">
          <FiSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent text-white ml-2 focus:outline-none"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <FaHeadphones className="text-2xl"/>
          <button className="flex items-center gap-1 bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-300">
            <MdAccountBalanceWallet /> Deposit
          </button>
          <Link className="flex items-center gap-2" to='/dashboard/profile'>
            <FaUser className="text-yellow-400" />
            <span className="hidden md:inline">Profile</span>
          </Link>
        </div>
        </div>

      </div>
    </nav>
  );
}

