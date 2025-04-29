import React from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
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
} from 'chart.js';

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

const Dashboard = () => {
  const stats = {
    totalUsers: 26,
    activeUsers: 15,
    emailUnverified: 9,
    mobileUnverified: 5,
    totalTrades: 20,
    winTrades: 9,
    lossTrades: 10,
    drawTrades: 1,
    totalDeposited: 41000.00,
    pendingDeposits: 10,
    rejectedDeposits: 1,
    depositedCharge: 0.00,
    totalWithdrawn: 1001000.00,
    pendingWithdrawals: 2,
    rejectedWithdrawals: 0,
    withdrawalCharge: 50050.00,
  };

  // Login Statistics Data
  const browserData = {
    labels: ['Chrome', 'Firefox', 'Safari'],
    datasets: [{
      data: [45, 35, 20],
      backgroundColor: [
        'rgba(239, 68, 68, 0.8)',
        'rgba(99, 102, 241, 0.8)',
        'rgba(245, 158, 11, 0.8)',
      ],
      borderColor: [
        'rgb(239, 68, 68)',
        'rgb(99, 102, 241)',
        'rgb(245, 158, 11)',
      ],
      borderWidth: 1,
    }],
  };

  const osData = {
    labels: ['Windows', 'MacOS', 'Linux', 'iOS'],
    datasets: [{
      data: [40, 30, 20, 10],
      backgroundColor: [
        'rgba(239, 68, 68, 0.8)',
        'rgba(99, 102, 241, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(34, 197, 94, 0.8)',
      ],
      borderColor: [
        'rgb(239, 68, 68)',
        'rgb(99, 102, 241)',
        'rgb(245, 158, 11)',
        'rgb(34, 197, 94)',
      ],
      borderWidth: 1,
    }],
  };

  const countryData = {
    labels: ['USA', 'UK', 'Germany', 'France', 'Benin'],
    datasets: [{
      data: [35, 25, 20, 15, 5],
      backgroundColor: [
        'rgba(239, 68, 68, 0.8)',
        'rgba(99, 102, 241, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(34, 197, 94, 0.8)',
        'rgba(168, 85, 247, 0.8)',
      ],
      borderColor: [
        'rgb(239, 68, 68)',
        'rgb(99, 102, 241)',
        'rgb(245, 158, 11)',
        'rgb(34, 197, 94)',
        'rgb(168, 85, 247)',
      ],
      borderWidth: 1,
    }],
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#fff', 
        },
      },
    },
    cutout: '60%',
  };

  // Generate dates for transactions chart
  const dates = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0];
  }).reverse();

  const transactionsData = {
    labels: dates,
    datasets: [
      {
        label: 'Plus Transactions',
        data: dates.map(() => 100),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.4,
      },
      {
        label: 'Minus Transactions',
        data: dates.map((date) => date === '2025-04-17' ? 1100 : 0),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        tension: 0.4,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#ffffff',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#fff', 
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', 
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: '#fff', 
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        }
    }}
  }

  const StatCard = ({ icon, value, label, bgColor , textColor = 'text-white' }) => (
    <div className={`${bgColor} rounded-lg p-6 shadow-sm`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {icon}
          <div>
            <p className="text-sm text-white">{label}</p>
            <h3 className={`text-2xl font-bold ${textColor}`}>{value}</h3>
          </div>
        </div>
        <button className="text-sm text-white hover:text-yellow-400">View All</button>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-[#1e1e20] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <div className="text-yellow-400">Last Cron Run: 6 days ago</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* User Statistics */}
        <StatCard
          icon={<div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>}
          value={stats.totalUsers}
          label="Total Users"
          bgColor='bg-indigo-500'
        />

        <StatCard
          icon={<div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>}
          value={stats.activeUsers}
          label="Active Users"
          bgColor='bg-emerald-500'
        />

        <StatCard
          icon={<div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>}
          value={stats.emailUnverified}
          label="Email Unverified Users"
          bgColor='bg-red-500'
        />

        <StatCard
          icon={<div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>}
          value={stats.mobileUnverified}
          label="Mobile Unverified Users"
          bgColor='bg-orange-500'
        />

        {/* Trade Statistics */}
        <StatCard
          icon={<div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>}
          value={stats.totalTrades}
          label="Total Trades"
          bgColor='bg-purple-500'
        />

        <StatCard
          icon={<div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>}
          value={stats.winTrades}
          label="Win Trades"
          bgColor='bg-green-500'
        />

        <StatCard
          icon={<div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
            </svg>
          </div>}
          value={stats.lossTrades}
          label="Loss Trades"
          bgColor='bg-red-500'
        />

        <StatCard
          icon={<div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
            </svg>
          </div>}
          value={stats.drawTrades}
          label="Draw Trades"
          bgColor='bg-gray-500'
        />

        {/* Financial Statistics */}
        <StatCard
          icon={<div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>}
          value={`$${stats.totalDeposited.toLocaleString()}`}
          label="Total Deposited"
          bgColor='bg-green-500'
        />

        <StatCard
          icon={<div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>}
          value={stats.pendingDeposits}
          label="Pending Deposits"
          bgColor='bg-orange-500'
        />

        <StatCard
          icon={<div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>}
          value={stats.rejectedDeposits}
          label="Rejected Deposits"
          bgColor='bg-red-500'
        />

        <StatCard
          icon={<div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>}
          value={`$${stats.depositedCharge.toLocaleString()}`}
          label="Deposited Charge"
          bgColor='bg-blue-500'
        />

        <StatCard
          icon={<div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>}
          value={`$${stats.totalWithdrawn.toLocaleString()}`}
          label="Total Withdrawn"
          bgColor='bg-green-500'
        />

        <StatCard
          icon={<div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>}
          value={stats.pendingWithdrawals}
          label="Pending Withdrawals"
          bgColor='bg-orange-500'
        />

        <StatCard
          icon={<div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>}
          value={`$${stats.withdrawalCharge.toLocaleString()}`}
          label="Withdrawal Charge"
          bgColor='bg-blue-500'
        />
      </div>

      {/* Charts Section */}
      <div className="mt-6 space-y-6">
        {/* Monthly Deposit & Withdraw Report */}
        <div className="bg-[#4e4e4e] text-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Monthly Deposit & Withdraw Report (Last 12 Month)</h2>
          <Line
            data={{
              labels: ['December-2024', 'January-2025', 'February-2025', 'April-2025'],
              datasets: [
                {
                  label: 'Total Deposit',
                  data: [0, 41000, 0, 0],
                  borderColor: 'rgb(59, 130, 246)',
                  backgroundColor: 'rgba(59, 130, 246, 0.5)',
                },
                {
                  label: 'Total Withdraw',
                  data: [0, 0, 0, 1001000],
                  borderColor: 'rgb(34, 197, 94)',
                  backgroundColor: 'rgba(34, 197, 94, 0.5)',
                },
              ],
            }}
            options={lineChartOptions}
          />
        </div>

        {/* Transactions Chart */}
        <div className="bg-[#4e4e4e] text-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Transactions Report (Last 30 Days)</h2>
          <Line data={transactionsData} options={lineChartOptions} />
        </div>

        {/* Login Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#4e4e4e] text-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Login By Browser (Last 30 days)</h3>
            <Doughnut data={browserData} options={doughnutOptions} />
          </div>

          <div className="bg-[#4e4e4e] text-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Login By OS (Last 30 days)</h3>
            <Doughnut data={osData} options={doughnutOptions} />
          </div>

          <div className="bg-[#4e4e4e] text-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Login By Country (Last 30 days)</h3>
            <Doughnut data={countryData} options={doughnutOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;