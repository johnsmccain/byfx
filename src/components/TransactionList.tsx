import { useAccount } from 'wagmi';
import { useState } from 'react';
import { formatEther } from 'viem';
import { useUserActivities } from '../hooks/useContract';
import { Loader2 } from 'lucide-react';

interface Activity {
  id: bigint;
  usdtAmt: bigint;
  tokenAmt: bigint;
  mode: bigint;
  refId: bigint;
}

const TransactionList = () => {
  const { address } = useAccount();
  const [currentPage, setCurrentPage] = useState(1);
  const { activities, isLoading, isError, hasMore } = useUserActivities(currentPage);
console.log(activities)
  const formatUSD = (value: bigint) => {
    return `$${parseFloat(formatEther(value)).toFixed(2)}`;
  };

  const formatToken = (value: bigint) => {
    return `${parseFloat(formatEther(value)).toFixed(2)} GRich`;
  };

  const getTransactionType = (mode: bigint) => {
    switch (Number(mode)) {
      case 1:
        return { label: 'Investment', color: 'text-green-600' };
      case 2:
        return { label: 'Referral Reward', color: 'text-blue-600' };
      case 3:
        return { label: 'Royalty Distribution', color: 'text-purple-600' };
      default:
        return { label: 'Direct Investment', color: 'text-gray-600' };
    }
  };

  if (!address) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <p className="text-white">Please connect your wallet to view transactions</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="bg-white rounded-xl p-6">
          <div className="text-center py-8 text-red-500">
            Error loading transactions. Please try again later.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="bg-white rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6">Transaction History</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4 px-4">Type</th>
                <th className="text-left py-4 px-4">Amount (USDT)</th>
                <th className="text-left py-4 px-4">Tokens</th>
                <th className="text-left py-4 px-4">Reference</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="text-center py-8">
                    <div className="flex items-center justify-center">
                      <Loader2 className="w-6 h-6 animate-spin" />
                      <span className="ml-2">Loading transactions...</span>
                    </div>
                  </td>
                </tr>
              ) : activities && activities.length > 0 ? (
                activities.map((activity: Activity) => (
                  <tr key={`${activity.id}-${activity.refId}`} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <span className={getTransactionType(activity.mode).color}>
                        {getTransactionType(activity.mode).label}
                      </span>
                    </td>
                    <td className="py-4 px-4">{formatUSD(activity?.usdtAmt)}</td>
                    <td className="py-4 px-4">{formatToken(activity.tokenAmt)}</td>
                    <td className="py-4 px-4">#{activity.refId.toString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-gray-500">
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1 || isLoading}
            className="px-4 py-2 bg-gray-100 rounded-lg disabled:opacity-50 hover:bg-gray-200 transition-colors"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(prev => prev + 1)}
            disabled={!hasMore || isLoading}
            className="px-4 py-2 bg-gray-100 rounded-lg disabled:opacity-50 hover:bg-gray-200 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionList;