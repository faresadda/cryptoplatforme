import React, { useState } from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);
import { IoMenu } from "react-icons/io5";
import { IoMdNotifications } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";

export default function NavbarAdmin () {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [goldMining,setGoldMining]=useState(false)
  const [staff,setStaff]=useState(false)
  const [manageMining,setManageMining]=useState(false)
  const [newCoin,setNewCoin]=useState(false)
  const [manageOption,setManageOption]=useState(false)
  const [loans,setLoans]=useState(false)
  const [tradeLog,setTradeLog]=useState(false)
  const [manageUsers,setManageUsers]=useState(false)
  const [paymentGateways,setPaymentGatways]=useState(false)
  const [deposits,setDeposits]=useState(false)
  const [withdrawals,setWithdrawals]=useState(false)
  const [supportTicket,setSupportTicket]=useState(false)
  const [report,setReport]=useState(false)
  const [notificationSetting,setNotificationSetting]=useState(false)


  return (
    <nav className="bg-[#0f0f0f] text-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-5">
            <IoMenu className="text-3xl" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}/>
            <input className="bg-gray-800 py-1 px-3" placeholder="Search"/>
            
          </div>
          <div className="flex items-center gap-5">
            <button
              type="button"
              className="text-gray-400 hover:text-yellow-400"
            >
              <span className="sr-only">View notifications</span>
              <IoMdNotifications className="text-3xl text-white"/>
            </button>

            <div className="ml-3 relative">
              <div>
                <button
                  type="button"
                  className="flex text-sm"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8"
                    src="../../public/logo.png"
                    alt=""
                  />
                </button>
              </div>
              {isProfileOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Your Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </a>
                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed bg-[#0f0f0f] text-white left-0 h-screen overflow-y-auto pb-20">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to=""
              className="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              Dashboard
            </Link>
            <Link
              to=""
              className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              My Team
            </Link>
            <Link
              to=""
              className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              Live Chat
            </Link>

            <p className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 pl-3 pr-4 py-2 border-l-4 
            text-base font-medium flex items-center gap-5" onClick={()=>{setGoldMining(!goldMining)}}>
              Gold Mining <FaAngleDown className="2xl"/>
            </p>
            {goldMining && <div className="flex flex-col pl-8 gap-2 text-gray-500">
               <Link to=''>
                 Gold Mining Plans
              </Link>
              <Link to=''>
                 All Minings
              </Link>
              </div>}

            
            <p className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 pl-3 pr-4 py-2 border-l-4 
            text-base font-medium flex items-center gap-5" onClick={()=>{setStaff(!staff)}}>
              Staff <FaAngleDown className="2xl"/>
            </p>
            {staff && <div className="flex flex-col pl-8 gap-2 text-gray-500">
               <Link to=''>
                 All Staff
              </Link>
              <Link to=''>
                 Roles && Permisions
              </Link>
              </div>}
              <p className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 pl-3 pr-4 py-2 border-l-4 
            text-base font-medium flex items-center gap-5" onClick={()=>{setManageMining(!manageMining)}}>
              Manage Mining <FaAngleDown className="2xl"/>
            </p>
            {manageMining && <div className="flex flex-col pl-8 gap-2 text-gray-500">
               <Link to=''>
                 Mining Plans
              </Link>
              <Link to=''>
                 Mining Invest
              </Link>
              </div>}
            
            <p className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 pl-3 pr-4 py-2 border-l-4 
            text-base font-medium flex items-center gap-5" onClick={()=>{setNewCoin(!newCoin)}}>
              New Coin <FaAngleDown className="2xl"/>
            </p>
            {newCoin && <div className="flex flex-col pl-8 gap-2 text-gray-500">
               <Link to=''>
                 Manage Coins
              </Link>
              <Link to=''>
                 Coin Sales
              </Link>
              </div>}
            
              <p className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 pl-3 pr-4 py-2 border-l-4 
            text-base font-medium flex items-center gap-5" onClick={()=>{setManageOption(!manageOption)}}>
              Manage Option Coin <FaAngleDown className="2xl"/>
            </p>
            {manageOption && <div className="flex flex-col pl-8 gap-2 text-gray-500">
               <Link to=''>
                 Option Coins
              </Link>
              <Link to=''>
                 Sales & Buy
              </Link>
              </div>}

            <Link
              to=""
              className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              Loan Plans
            </Link>

            <p className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 pl-3 pr-4 py-2 border-l-4 
            text-base font-medium flex items-center gap-5" onClick={()=>{setLoans(!loans)}}>
              Loans <FaAngleDown className="2xl"/>
            </p>
            {loans && <div className="flex flex-col pl-8 gap-2 text-gray-500">
               <Link to=''>
                 Pending Loans
              </Link>
              <Link to=''>
                 Running Loans
              </Link>
              <Link to=''>
                 Due Loans
              </Link>
              <Link to=''>
                 Paid Loans
              </Link>
              <Link to=''>
                 Rejected Loans
              </Link>
              <Link to=''>
                 All Loans
              </Link>
              </div>}

              <Link
              to=""
              className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              Trade Setting
            </Link>

            <p className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 pl-3 pr-4 py-2 border-l-4 
            text-base font-medium flex items-center gap-5" onClick={()=>{setTradeLog(!tradeLog)}}>
              Trade Log <FaAngleDown className="2xl"/>
            </p>
            {tradeLog && <div className="flex flex-col pl-8 gap-2 text-gray-500">
               <Link to=''>
                 All
              </Link>
              <Link to=''>
                 Wining
              </Link>
              <Link to=''>
                 Losing
              </Link>
              </div>}

            <p className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 pl-3 pr-4 py-2 border-l-4 
            text-base font-medium flex items-center gap-5" onClick={()=>{setManageUsers(!manageUsers)}}>
              Manage Users <FaAngleDown className="2xl"/>
            </p>
            {manageUsers && <div className="flex flex-col pl-8 gap-2 text-gray-500">
               <Link to=''>
                 Active Users
              </Link>
              <Link to=''>
                 Baned Users
              </Link>
              <Link to=''>
                 Email Unverified
              </Link>
              <Link to=''>
                 MobileUnverified
              </Link>
              <Link to=''>
                KYC Unverified
              </Link>
              <Link to=''>
                 KYC Pending
              </Link>
              <Link to=''>
                 With Balance
              </Link>
              <Link to=''>
                 All Users
              </Link>
              <Link to=''>
                 Notification to ALL
              </Link>
              <Link to=''>
                 Deposit Address
              </Link>
              </div>}

            <p className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 pl-3 pr-4 py-2 border-l-4 
            text-base font-medium flex items-center gap-5" onClick={()=>{setPaymentGatways(!paymentGateways)}}>
              Payment Gateways <FaAngleDown className="2xl"/>
            </p>
            {paymentGateways && <div className="flex flex-col pl-8 gap-2 text-gray-500">
               <Link to=''>
                 Automatic Gateways
              </Link>
              <Link to=''>
                 Manual Gateways
              </Link>
              </div>}

              <Link
              to=""
              className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              Popup Offer
            </Link>

            <p className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 pl-3 pr-4 py-2 border-l-4 
            text-base font-medium flex items-center gap-5" onClick={()=>{setDeposits(!deposits)}}>
              Deposits <FaAngleDown className="2xl"/>
            </p>
            {deposits && <div className="flex flex-col pl-8 gap-2 text-gray-500">
               <Link to=''>
                 Pending Deposits
              </Link>
              <Link to=''>
                 Approved Deposits
              </Link>
              <Link to=''>
                 Successfull Deposits
              </Link>
              <Link to=''>
                 Rejected Deposits
              </Link>
              <Link to=''>
                 Initiated Deposits
              </Link>
              <Link to=''>
                 All Deposits
              </Link>
              </div>}

              <p className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 pl-3 pr-4 py-2 border-l-4 
            text-base font-medium flex items-center gap-5" onClick={()=>{setWithdrawals(!withdrawals)}}>
              Withdrawals <FaAngleDown className="2xl"/>
            </p>
            {withdrawals && <div className="flex flex-col pl-8 gap-2 text-gray-500">
               <Link to=''>
               Withdrawals Methods
              </Link>
              <Link to=''>
                 Pending Withdrawals
              </Link>
              <Link to=''>
                 Approved Withdrawals
              </Link>
              <Link to=''>
                 Rejected  Withdrawals
              </Link>
              <Link to=''>
                 All  Withdrawals
              </Link>
              </div>}

              <p className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 pl-3 pr-4 py-2 border-l-4 
            text-base font-medium flex items-center gap-5" onClick={()=>{setSupportTicket(!supportTicket)}}>
              Support Ticket <FaAngleDown className="2xl"/>
            </p>
            {supportTicket && <div className="flex flex-col pl-8 gap-2 text-gray-500">
               <Link to=''>
                 Pending Ticket
              </Link>
              <Link to=''>
                 Closed Ticket
              </Link>
              <Link to=''>
                 Ansewred Ticket
              </Link>
              <Link to=''>
                 All Ticket
              </Link>
              </div>}

              <p className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 pl-3 pr-4 py-2 border-l-4 
            text-base font-medium flex items-center gap-5" onClick={()=>{setReport(!report)}}>
              Report <FaAngleDown className="2xl"/>
            </p>
            {report && <div className="flex flex-col pl-8 gap-2 text-gray-500">
               <Link to=''>
                 Transaction Log
              </Link>
              <Link to=''>
                 Login History
              </Link>
              <Link to=''>
                 Notification History
              </Link>
              </div>}

              <Link
              to=""
              className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              Subscibers
            </Link>

            <Link
              to=""
              className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              General Setting
            </Link>

            <Link
              to=""
              className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              System Configuration
            </Link>

            <Link
              to=""
              className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              Logo & Favicon
            </Link>

            <Link
              to=""
              className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              Extensions
            </Link>
              
            <Link
              to=""
              className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              Language
            </Link>

            <Link
              to=""
              className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              Sliders
            </Link>

            <Link
              to=""
              className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              SEO Manager
            </Link>

            <Link
              to=""
              className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              KYC Manager
            </Link>


              <p className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 pl-3 pr-4 py-2 border-l-4 
            text-base font-medium flex items-center gap-5" onClick={()=>{setGoldMining(!goldMining)}}>
              Notification Setting <FaAngleDown className="2xl"/>
            </p>
            {goldMining && <div className="flex flex-col pl-8">
               <Link to=''>
                 Global Template
              </Link>
              <Link to=''>
                 Email Setting
              </Link>
              <Link to=''>
                 SMS Setting
              </Link>
              <Link to=''>
                 Notification Templates
              </Link>
              </div>}

            
          </div>
        
        </div>
      )}
    </nav>
  );
};
