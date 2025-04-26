import React from 'react';

const Profile = () => {
  const userProfile = {
    name: "John Doe",
    email: "john.doe@example.com",
    joinDate: "Jan 2024",
    verificationLevel: 2,
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    activities: [
      {
        id: 1,
        type: "Deposit",
        amount: "0.05 BTC",
        date: "2024-03-15",
        status: "completed"
      },
      {
        id: 2,
        type: "Withdrawal",
        amount: "1.2 ETH",
        date: "2024-03-14",
        status: "pending"
      },
      {
        id: 3,
        type: "Trade",
        amount: "500 USDT",
        date: "2024-03-13",
        status: "completed"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#1e1e20] p-4 w-[calc(100%-15rem)] ml-auto pt-30 max-[600px]:w-full max-[600px]:pb-30">
      {/* Profile Header */}
      <div className="bg-[#1e1e20] rounded-lg p-6 shadow-sm mb-6">
        <div className="flex items-center gap-6">
          <img
            src={userProfile.profileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-yellow-400"
          />
          <div>
            <h1 className="text-2xl font-bold text-white">{userProfile.name}</h1>
            <p className="text-white">{userProfile.email}</p>
            <p className="text-sm text-white">Member since {userProfile.joinDate}</p>
          </div>
          <div className="ml-auto">
            <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-500">
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Verification Status */}
      <div className="bg-[#1e1e20] rounded-lg p-6 shadow-sm mb-6">
        <h2 className="text-xl font-semibold mb-4 text-white">Verification Level</h2>
        <div className="flex gap-4 mb-4">
          {[1, 2, 3].map((level) => (
            <div
              key={level}
              className={`flex-1 p-4 rounded-lg border ${
                level <= userProfile.verificationLevel
                  ? 'bg-[#2d2d30] border-emerald-500'
                  : 'bg-[#2d2d30] border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-white">Level {level}</span>
                {level <= userProfile.verificationLevel && (
                  <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </div>
          ))}
        </div>
        {userProfile.verificationLevel < 3 && (
          <button className="text-yellow-400 font-medium hover:text-yellow-500">
            Complete Verification →
          </button>
        )}
      </div>

      {/* Recent Activity */}
      <div className="bg-[#1e1e20] rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-white">Recent Activity</h2>
        <div className="space-y-4">
          {userProfile.activities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-4 rounded-lg bg-[#2d2d30]">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center
                  ${activity.type === 'Deposit' ? 'bg-green-100 text-green-600' :
                    activity.type === 'Withdrawal' ? 'bg-red-100 text-red-600' :
                    'bg-blue-100 text-blue-600'}`}>
                  {activity.type === 'Deposit' && (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  )}
                  {activity.type === 'Withdrawal' && (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  )}
                  {activity.type === 'Trade' && (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  )}
                </div>
                <div>
                  <p className="font-medium text-white">{activity.type}</p>
                  <p className="text-sm text-white">{activity.amount}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-white">{activity.date}</p>
                <p className={`text-sm ${
                  activity.status === 'completed' ? 'text-emerald-500' : 'text-orange-500'
                }`}>
                  {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
