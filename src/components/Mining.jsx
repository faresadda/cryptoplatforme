import { useState } from "react";
import { Headphones, Settings } from "lucide-react";
import avatar from "../assets/react.svg"; // Replace with your avatar image path
const colors = {
  // Main colors
  background: "bg-[#1e1e20]",
  cardBg: "bg-[#0f0f0f]",
  primary: "bg-yellow-400",
  primaryText: "text-yellow-400",
  secondary: "bg-orange-400",
  secondaryText: "text-orange-400",

  // Text colors
  textPrimary: "text-white",
  textSecondary: "text-[#a3a3a3]",
  textMuted: "text-[#666666]",

  // Border colors
  border: "border-[#333333]",

  // Input and hover colors
  inputBg: "bg-[#282828]",
  hoverBg: "hover:bg-[#333333]",

  // Status colors
  success: "bg-yellow-400",
  successText: "text-yellow-400",
  neutral: "bg-[#666666]",
  neutralText: "text-[#666666]",
};

export default function Mining() {
  const [selectedTab, setSelectedTab] = useState("weekly");
  const [myInvestments, setMyInvestments] = useState([]);
  const [showInvestmentHistory, setShowInvestmentHistory] = useState(true);

  const investmentPlans = {
    weekly: [
      {
        id: 1,
        title: "Weekly for 7 Days",
        type: "Normal",
        days: 7,
        returnRate: "2.00%",
        minDeposit: 100,
        maxDeposit: 50000,
        principalReturns: true,
      },
      {
        id: 2,
        title: "Weekly for 7 Days",
        type: "Basic",
        days: 7,
        returnRate: "4.00%",
        minDeposit: 50000,
        maxDeposit: 100000,
        principalReturns: true,
      },
      {
        id: 3,
        title: "Weekly for 7 Days",
        type: "Standard",
        days: 7,
        returnRate: "6.00%",
        minDeposit: 100000,
        maxDeposit: 200000,
        principalReturns: true,
      },
      {
        id: 4,
        title: "Weekly for 7 Days",
        type: "Premium",
        days: 7,
        returnRate: "7.00%",
        minDeposit: 200000,
        maxDeposit: 500000,
        principalReturns: true,
      },
      {
        id: 5,
        title: "Weekly for 7 Days",
        type: "Premium Plus",
        days: 7,
        returnRate: "9.00%",
        minDeposit: 500000,
        maxDeposit: 1000000,
        principalReturns: true,
      },
    ],
    daily: [
      {
        id: 6,
        title: "Daily for 15 Days",
        type: "Normal",
        days: 15,
        returnRate: "8.00%",
        minDeposit: 100,
        maxDeposit: 50000,
        principalReturns: true,
      },
      {
        id: 7,
        title: "Daily for 15 Days",
        type: "Basic",
        days: 15,
        returnRate: "11.00%",
        minDeposit: 50000,
        maxDeposit: 100000,
        principalReturns: true,
      },
      {
        id: 8,
        title: "Daily for 15 Days",
        type: "Standard",
        days: 15,
        returnRate: "14.00%",
        minDeposit: 100000,
        maxDeposit: 200000,
        principalReturns: true,
      },
    ],
    monthly: [
      {
        id: 9,
        title: "Monthly for 30 Days",
        type: "Standard",
        days: 30,
        returnRate: "18.00%",
        minDeposit: 100000,
        maxDeposit: 200000,
        principalReturns: true,
      },
      {
        id: 10,
        title: "Monthly for 30 Days",
        type: "Premium",
        days: 30,
        returnRate: "22.00%",
        minDeposit: 200000,
        maxDeposit: 500000,
        principalReturns: true,
      },
      {
        id: 11,
        title: "Monthly for 30 Days",
        type: "Premium Plus",
        days: 30,
        returnRate: "25.00%",
        minDeposit: 500000,
        maxDeposit: 1000000,
        principalReturns: true,
      },
    ],
  };

  const tabs = [
    { id: "weekly", label: "Weekly Plans" },
    { id: "daily", label: "Daily Plans" },
    { id: "monthly", label: "Monthly Plans" },
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    })
      .format(amount)
      .replace("$", "");
  };

  const handleInvest = (plan, amount) => {
    if (amount < plan.minDeposit || amount > plan.maxDeposit) {
      alert(
        `Please enter an amount between ${formatCurrency(
          plan.minDeposit
        )} and ${formatCurrency(plan.maxDeposit)}`
      );
      return;
    }

    const today = new Date();
    const endDate = new Date();
    endDate.setDate(today.getDate() + plan.days);

    const newInvestment = {
      id: Date.now(),
      date: today.toLocaleDateString(),
      amount: amount,
      plan: plan.title,
      type: plan.type,
      returnRate: plan.returnRate,
      totalReturn: amount * (1 + parseFloat(plan.returnRate) / 100),
      profit: (amount * parseFloat(plan.returnRate)) / 100,
      status: "Active",
      endDate: endDate.toLocaleDateString(),
    };

    setMyInvestments([newInvestment, ...myInvestments]);
  };

  return (
    <div className={`min-h-screen ${colors.background} ${colors.textPrimary} w-[calc(100%-15rem)] ml-auto pt-20 max-[600px]:w-full max-[600px]:pb-30`}>
      <header className="p-4 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img src={avatar} alt="avatar" className="h-8 w-8 rounded-full " />
          <h1 className="text-xl font-bold">Invest</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Headphones className={`w-6 h-6 text-white cursor-pointer`} />
          <Settings className={`w-6 h-6 text-white cursor-pointer`} />
        </div>
      </header>

      <main className="container mx-auto py-6 px-4">
        <div className="mb-6">
          <div className="flex space-x-4 mb-4 border-b border-gray-800">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`px-4 py-2 font-medium ${
                  selectedTab === tab.id
                    ? `${colors.primaryText} border-b-2 border-yellow-400`
                    : colors.textSecondary
                }`}
                onClick={() => setSelectedTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {investmentPlans[selectedTab].map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              colors={colors}
              formatCurrency={formatCurrency}
              onInvest={handleInvest}
            />
          ))}
        </div>

        <div className="mt-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold flex items-center">
              <span>My Investments</span>
              <span
                className={`ml-2 px-2 text-xs rounded ${colors.primary} text-black`}
              >
                {myInvestments.length}
              </span>
            </h2>
            <button
              className={`text-sm ${colors.primaryText}`}
              onClick={() => setShowInvestmentHistory(!showInvestmentHistory)}
            >
              {showInvestmentHistory ? "Hide" : "Show"}
            </button>
          </div>

          {showInvestmentHistory && (
            <div
              className={`${colors.cardBg} rounded-lg overflow-hidden shadow-lg border ${colors.border}`}
            >
              {myInvestments.length === 0 ? (
                <div className="p-8 text-center">
                  <p className={colors.textSecondary}>
                    No investment history yet
                  </p>
                  <p className="mt-2 text-sm">
                    Select a plan above to start investing
                  </p>
                </div>
              ) : (
                <table className="w-full text-sm">
                  <thead
                    className={`${colors.inputBg} border-b ${colors.border}`}
                  >
                    <tr>
                      <th className="text-left p-4">Invest Date</th>
                      <th className="text-left p-4">Invest Amount</th>
                      <th className="text-left p-4">Total Return</th>
                      <th className="text-left p-4">Profit</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-left p-4">End Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myInvestments.map((investment) => (
                      <tr
                        key={investment.id}
                        className={`border-b ${colors.border} hover:bg-gray-900`}
                      >
                        <td className="p-4">{investment.date}</td>
                        <td className="p-4">
                          {formatCurrency(investment.amount)}
                        </td>
                        <td className="p-4">
                          {formatCurrency(investment.totalReturn)}
                        </td>
                        <td className={`p-4 ${colors.successText}`}>
                          +{formatCurrency(investment.profit)}
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${colors.primary} text-black`}
                          >
                            {investment.status}
                          </span>
                        </td>
                        <td className="p-4">{investment.endDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function PlanCard({ plan, colors, formatCurrency, onInvest }) {
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount) return;
    onInvest(plan, parseFloat(amount));
    setAmount("");
  };

  return (
    <div
      className={`${colors.cardBg} rounded-lg overflow-hidden shadow-lg border ${colors.border}`}
    >
      <div className="p-4 border-b border-gray-800 flex justify-between items-center">
        <div>
          <h3 className={`font-medium ${colors.primaryText}`}>{plan.title}</h3>
          <p className="text-sm text-gray-400">
            {plan.type} - {plan.days}
          </p>
        </div>
        <div
          className={`px-3 py-1 rounded font-bold ${colors.primary} text-black`}
        >
          {plan.returnRate}
        </div>
      </div>

      <div className="p-4 space-y-2">
        <div className="flex justify-between">
          <span className={colors.textSecondary}>Min Deposit:</span>
          <span className={colors.textPrimary}>
            {formatCurrency(plan.minDeposit)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className={colors.textSecondary}>Max Deposit:</span>
          <span className={colors.textPrimary}>
            {formatCurrency(plan.maxDeposit)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className={colors.textSecondary}>Principal:</span>
          <span
            className={
              plan.principalReturns ? colors.successText : colors.textMuted
            }
          >
            {plan.principalReturns ? "Returns" : "Not Returned"}
          </span>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-4 space-y-3 border-t border-gray-800"
      >
        <div>
          <label className="block mb-1 text-sm" htmlFor={`amount-${plan.id}`}>
            Amount
          </label>
          <input
            id={`amount-${plan.id}`}
            type="text"
            inputmode="numeric"
            pattern="[0-9]*"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={`Enter amount Eg. 5000`}
            className={`w-full px-3 py-2 rounded-md ${colors.inputBg} ${colors.border} border focus:outline-none focus:ring-1 focus:ring-yellow-400`}
            min={plan.minDeposit}
            max={plan.maxDeposit}
          />
        </div>
        <button
          type="submit"
          className={`w-full py-2 rounded-md font-medium ${colors.primary} text-black hover:bg-yellow-300 transition-colors`}
        >
          Invest Now
        </button>
      </form>
    </div>
  );
}
