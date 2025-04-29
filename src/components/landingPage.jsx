import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBitcoin } from "react-icons/fa";
import { FaHeadphones } from "react-icons/fa6";
import { MdOutlineSecurity } from "react-icons/md";
import { FaBoltLightning } from "react-icons/fa6";
import { IoDiamond } from "react-icons/io5";

const LandingPage = () => {
  const features = [
    {
      title: "Secure Trading",
      description: "Enterprise-grade security for your digital assets",
      icon: <MdOutlineSecurity />,
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock customer service and support",
      icon: <FaHeadphones />,
    },
    {
      title: "Low Fees",
      description: "Competitive trading fees and free deposits",
      icon: <IoDiamond />,
    },
    {
      title: "Instant Transfers",
      description: "Lightning-fast cryptocurrency transfers",
      icon: <FaBoltLightning />,
    },
  ];

  const stats = [
    { value: "$12B+", label: "Trading Volume" },
    { value: "120+", label: "Countries" },
    { value: "10M+", label: "Users" },
    { value: "99.9%", label: "Uptime" },
  ];

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <nav className="absolute top-0 w-full z-50 px-6 py-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="text-2xl font-bold text-yellow-400">
            GMP Exchange
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#" className="hover:text-yellow-400 transition-colors">
                Features
              </a>
              <a href="#" className="hover:text-yellow-400 transition-colors">
                Markets
              </a>
              <a href="#" className="hover:text-yellow-400 transition-colors">
                About
              </a>
              <a href="#" className="hover:text-yellow-400 transition-colors">
                Support
              </a>
            </div>
            <div className="flex space-x-4">
              <button
                className="px-4 py-2 rounded-lg text-yellow-400 hover:text-yellow-300 transition-colors"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition-colors"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
            </div>
          </div>
        </nav>

        <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-center gap-10 max-[945px]:flex-wrap max-[945px]:justify-center">
              <div className="space-y-8">
                <h1 className="text-4xl sm:text-6xl font-bold leading-tight max-w-150">
                  Trade Crypto with
                  <span className="text-yellow-400"> Confidence</span>
                </h1>
                <p className="text-gray-400 text-lg sm:text-xl max-w-lg">
                  Experience seamless cryptocurrency trading with advanced
                  features, competitive fees, and institutional-grade security.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="px-8 py-4 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition-colors text-lg font-medium">
                    Start Trading
                  </button>
                  <button className="px-8 py-4 border border-gray-700 rounded-lg hover:border-yellow-400 transition-colors text-lg font-medium">
                    View Markets
                  </button>
                </div>
              </div>
              <FaBitcoin className="text-yellow-400 text-[15rem] mr-40" />
            </div>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="py-20 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-yellow-400">
                  {stat.value}
                </div>
                <div className="text-gray-400 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            Why Choose <span className="text-yellow-400">GMP Exchange</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-gray-900 rounded-xl border border-gray-800 hover:border-yellow-400 transition-colors flex flex-col items-center"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">
            Ready to Start Trading?
          </h2>
          <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
            Join millions of users worldwide and start trading cryptocurrencies
            with our secure and user-friendly platform.
          </p>
          <button className="px-8 py-4 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition-colors text-lg font-medium">
            Create Free Account
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Products</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-yellow-400">
                    Exchange
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400">
                    Wallet
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400">
                    Card
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400">
                    NFT
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-yellow-400">
                    Trading
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400">
                    Staking
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400">
                    Lending
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400">
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-yellow-400">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400">
                    Guides
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-yellow-400">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400">
                    Press
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© 2024 CryptoTrade. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
