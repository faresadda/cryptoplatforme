import { FaUser } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { MdAccountBalanceWallet } from "react-icons/md";
import { FaHeadphones } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function NavbarUser() {
  return (
    <nav className="bg-black text-white px-6 py-5 shadow-lg fixed top-0 w-full z-20">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-yellow-400 font-bold text-2xl flex items-center gap-3">
          GMP Exchange <img src="../../public/logo.png" className="w-10" />
        </div>

        <div className="flex gap-5 items-center">
          {/* Search Bar */}
          <div className="hidden md:flex items-center bg-[#333333] px-3 py-1 rounded">
            <FiSearch className="text-gray-400" />
            <input
              type="search"
              placeholder="Search"
              className="bg-transparent text-white ml-2 focus:outline-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <FaHeadphones className="text-2xl" />
            <Link className="flex items-center gap-2" to="/user/profile">
              <FaUser className="text-2xl" />
              <span className="hidden md:inline">Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
