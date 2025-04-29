import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Headphones,
  Settings,
  Wallet2,
  FileText,
  Briefcase,
  Banknote,
  UploadCloud,
  Bitcoin,
  Gem,
  Plus,
  BadgeDollarSign,
  Repeat,
  UserCircle,
  LockKeyhole,
  UsersRound,
  ShieldCheck,
} from "lucide-react";

const Profile = () => {
  const userData = {
    id: "200064",
    name: "Ashrafujiaman Babu",
    creditScore: 100,
    vipLevel: 1,
  };

  const shortcuts = [
    { id: 1, title: "Add Fund", icon: Wallet2 },
    { id: 2, title: "Fund Logs", icon: FileText },
    { id: 3, title: "Assets", icon: Briefcase },
    { id: 4, title: "Withdraw", icon: Banknote },
    { id: 5, title: "Withdraw Logs", icon: UploadCloud },
    { id: 6, title: "Crypto Mining", icon: Bitcoin },
    { id: 7, title: "Mineral Mining", icon: Gem },
    { id: 8, title: "New Coin", icon: Plus },
    { id: 9, title: "Listed Coin", icon: BadgeDollarSign },
    { id: 10, title: "Transactions", icon: Repeat },
    { id: 11, title: "Convert", icon: Repeat },
  ];

  const recommendations = [
    { id: 1, title: "Account", icon: UserCircle },
    { id: 2, title: "Change Password", icon: LockKeyhole },
    { id: 3, title: "Refer", icon: UsersRound },
    { id: 4, title: "KYC Verification", icon: ShieldCheck },
  ];

  const navigate = useNavigate();

  return (
    <div className="w-[calc(100%-15rem)] ml-auto pt-30 min-h-screen bg-[#1e1e20] p-4 py-8 max-[600px]:w-full max-[600px]:pb-30">
      {/* User Profile Header */}
      <div className="bg-[#0f0f0f] text-white rounded-lg p-6 shadow-sm mb-6">
        <div className="flex items-center gap-4">
          <img
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.name}`}
            alt="Profile"
            className="w-16 h-16 rounded-lg"
          />
          <div>
            <div className="flex items-center gap-3 max-[500px]:flex-col max-[500px]:items-start mb-3">
              <h1 className="text-xl font-bold">{userData.name}</h1>
              <span className="text-sm text-gray-600">ID: {userData.id}</span>
            </div>
            <div className="flex items-center gap-3 mt-1">
              <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-2.5 py-0.5 rounded">
                Credit Score: {userData.creditScore}
              </span>
              <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded">
                VIP-{userData.vipLevel}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Buttons */}
      <div className="flex items-center gap-5 mb-5">
        <Headphones className="w-6 h-6 text-white cursor-pointer" />
        <Settings
          className="w-6 h-6 text-white cursor-pointer"
          onClick={() => navigate("/dashboard/settings")}
        />
      </div>

      {/* Shortcuts Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-10 text-white">Shortcut</h2>
        <div className="grid grid-cols-4 gap-6">
          {shortcuts.map((item) => (
            <button
              key={item.id}
              className="flex flex-col items-center text-white hover:text-yellow-500 transition-all"
            >
              <item.icon className="w-8 h-8 mb-2" />
              <span className="text-sm text-gray-400">{item.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recommendations Section */}
      <div>
        <h2 className="text-xl font-bold mb-10 text-white">Recommend</h2>
        <div className="grid grid-cols-4 gap-6">
          {recommendations.map((item) => (
            <button
              key={item.id}
              className="flex flex-col items-center text-white hover:text-yellow-500 transition-all"
            >
              <item.icon className="w-8 h-8 mb-2" />
              <span className="text-sm text-gray-400">{item.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
