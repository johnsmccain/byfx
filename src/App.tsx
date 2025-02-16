import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { Copy } from 'lucide-react';
import { useUserInfo,  useInvestment } from './hooks/useContract';
import { formatEther } from 'viem';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import ReferralList from './components/ReferralList';
import TransactionList from './components/TransactionList';

function App() {
  const { isConnected } = useAccount();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'referrals' | 'transactions'>('dashboard');
  const [investAmount, setInvestAmount] = useState<string>('6');
  const [useTopUpWallet, setUseTopUpWallet] = useState(false);
  const [Temp, setTemp] = useState(false);
  const [loading, setLoading] = useState(false);
  const { userInfo, userTopUpWallet } = useUserInfo();
  // const { royaltyPool, totalRoyaltyPool } = useRoyaltyPool();
  const { invest, approve, waitForTransactionReceipt, waitForApprovalTransactionReceipt } = useInvestment();


const handleCopyReferral = () => {
  const baseUrl = window.location.origin; // Get the current domain dynamically
  const url = `${baseUrl}?referral=${userInfo?.id || '0'}`;
  navigator.clipboard.writeText(url).then(() => {
    console.log('Referral link copied:', url);
  }).catch(err => {
    console.error('Failed to copy:', err);
  });
};

  const handleInvest = () => {
    if(useTopUpWallet){
      invest(investAmount, true);
    } else {      
      approve(investAmount);
    }
    setLoading(true);
    setTemp(true);
  };

  useEffect(() => {
    if (!isAccountActivated && waitForApprovalTransactionReceipt && Temp) {
      invest('6', false);
      setTemp(false);
    } else if (investAmount && waitForApprovalTransactionReceipt && Temp) {
      invest(investAmount, useTopUpWallet);
      setTemp(false);
    }
  }, [waitForApprovalTransactionReceipt]);

  useEffect(() => {
    if (waitForTransactionReceipt && loading) {
      setLoading(false);
    }
  }, [waitForTransactionReceipt]);

  const formatUSD = (value: bigint | undefined) => {
    if (!value) return '$0';
    return `$${parseFloat(formatEther(value)).toFixed(2)}`;
  };

  const formatToken = (value: bigint | undefined) => {
    if (!value) return '0';
    return `${parseFloat(formatEther(value)).toFixed(2)}`;
  };

  const isAccountActivated = Number(userInfo?.id || '0') > 1000;

  const renderContent = () => {
    switch (activeTab) {
      case 'referrals':
        return <ReferralList />;
      case 'transactions':
        return <TransactionList />;
      default:
        return (
          <div className="space-y-8 mt-20">
            <section className="bg-white rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-6">Make Your Mark</h2>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div 
                  onClick={() => setUseTopUpWallet(false)}
                  className={`rounded-lg p-6 ${!useTopUpWallet
                    ? 'border-2 border-yellow-400 text-black'
                    : ' text-gray-600'
                  }`}
                >
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold mb-2">
                      {isAccountActivated ? 'Invest' : '6$'}
                    </div>
                    <div className="text-gray-600">
                      {isAccountActivated ? 'Enter Amount' : 'Activate Your Account'}
                    </div>
                  </div>
                  {isAccountActivated ? (
                    <div className="space-y-4">
                      <input
                        type="number"
                        value={investAmount}
                        onChange={(e) => setInvestAmount(e.target.value)}
                        placeholder="Enter Amount to Invest"
                        className="w-full p-2 border rounded-lg text-center"
                        min="1"
                      />
                    </div>
                  ) : (
                    <div className="text-center text-gray-600">
                      Inactive
                    </div>
                  )}
                </div>
                <div 
                  className={`text-center flex flex-col items-center justify-center rounded-lg p-4 ${
                    useTopUpWallet
                      ? 'border-2 border-yellow-400 text-black'
                      : ' text-gray-600'
                  }`}
                  onClick={() => setUseTopUpWallet(true)}
                >
                  <div className="text-3xl font-bold mb-2">
                    { Number(userInfo?.id) > Number(1000) ? formatUSD(userTopUpWallet as bigint) : 0}
                  </div>
                  <div className="text-gray-600">TopUp Wallet</div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-100 p-3 rounded-lg flex justify-between items-center">
                  <span>Total Investment</span>
                  <span className="text-yellow-600">
                    { Number(userInfo?.id) > Number(1000) ? formatUSD(userInfo?.totalDepositUSDT): 0}
                  </span>
                </div>
              </div>
              <button
                onClick={handleInvest}
                disabled={loading || !isConnected}
                className="w-full bg-green-400 text-black py-3 rounded-lg font-semibold hover:bg-green-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <span>Processing...</span>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : isAccountActivated ? 
                 (
                  `Approve ${investAmount || '0'}$ USDT${useTopUpWallet ? ' (Using Topup)' : ''}`
                ) : (
                  'Approve 6$ USDT'
                )}
              </button>
            </section>

            <section className="bg-white rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4">Royalty Claim</h2>
              <div className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
                <span>Royalty Pool</span>
                <div className="flex items-center gap-4">
                  <span>
                    {formatUSD(userInfo?.currentRoyaltyIncomeUSDT as bigint)} / {formatUSD(userInfo?.royaltyIncomeUSDT as bigint)}
                  </span>
                  <span className="bg-gray-200 px-3 py-1 rounded-lg text-sm">
                    {userInfo?.currentRoyaltyIncomeUSDT as bigint > 0n ? 'Eligible' : 'Not Eligible'}
                  </span>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4">Income claim</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Total Level income claimed</span>
                  <span>{formatUSD(userInfo?.refIncomeUSDT)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Total Cashback claimed</span>
                  <span>{formatToken(userInfo?.totalTokensClaimed)} GRich</span>
                </div>
              </div>
            </section>

            {isAccountActivated && (
              <section className="bg-white rounded-xl p-6">
                <h2 className="text-2xl font-bold mb-4">Referral link</h2>
                <div className="bg-white border rounded-lg p-3 mb-4">
                  <input
                    type="text"
                    readOnly
                    value={`https://grich.cloud?referral=${userInfo?.id || '0'}`}
                    className="w-full text-center text-gray-600"
                  />
                </div>
                <button
                  onClick={handleCopyReferral}
                  className="w-full bg-yellow-400 text-black py-3 rounded-lg font-semibold hover:bg-green-500 transition-colors flex items-center justify-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  Copy
                </button>
              </section>
            )}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2DC6FE] via-[#2DC1FC] to-[#2DC1FC]">
      <div className="container mx-auto px-4 py-6">
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        {isConnected ? (
          renderContent()
        ) : (
          <Hero />
        )}
      </div>
    </div>
  );
}

export default App;