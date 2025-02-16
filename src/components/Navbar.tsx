import { ConnectButton } from "@rainbow-me/rainbowkit";
import { MenuIcon } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
  activeTab: 'dashboard' | 'referrals' | 'transactions';
  setActiveTab: (tab: 'dashboard' | 'referrals' | 'transactions') => void;
}

const Navbar = ({ activeTab, setActiveTab }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="fixed h-16 top-0 left-0 right-0 w-full flex justify-between py-3 px-3 md:px-28 backdrop-blur-md z-40">
      <div className="flex items-center gap-8">
        <div className="text-2xl md:text-4xl font-bold">
          <span className="text-2xl font-bold text-white">
            <span className="text-green-400">G</span>Rich
          </span>
        </div>
        
        <div className="hidden md:flex gap-4">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-1.5 rounded-lg font-medium transition-colors ${
              activeTab === 'dashboard'
                ? 'bg-green-400 text-black'
                : 'text-white hover:bg-gray-800'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('referrals')}
            className={`px-4 py-1.5 rounded-lg font-medium transition-colors ${
              activeTab === 'referrals'
                ? 'bg-green-400 text-black'
                : 'text-white hover:bg-gray-800'
            }`}
          >
            Referrals
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`px-4 py-1.5 rounded-lg font-medium transition-colors ${
              activeTab === 'transactions'
                ? 'bg-green-400 text-black'
                : 'text-white hover:bg-gray-800'
            }`}
          >
            Transactions
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:block">
          <ConnectButton />
        </div>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden"
        >
          <MenuIcon size={25} className="text-white" />
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-black bg-opacity-95 border-t border-gray-800">
          <div className="flex flex-col p-4 gap-2">
            <button
              onClick={() => {
                setActiveTab('dashboard');
                setIsMenuOpen(false);
              }}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'dashboard'
                  ? 'bg-green-400 text-black'
                  : 'text-white hover:bg-gray-800'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => {
                setActiveTab('referrals');
                setIsMenuOpen(false);
              }}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'referrals'
                  ? 'bg-green-400 text-black'
                  : 'text-white hover:bg-gray-800'
              }`}
            >
              Referrals
            </button>
            <button
              onClick={() => {
                setActiveTab('transactions');
                setIsMenuOpen(false);
              }}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'transactions'
                  ? 'bg-green-400 text-black'
                  : 'text-white hover:bg-gray-800'
              }`}
            >
              Transactions
            </button>
            <div className="pt-2">
              <ConnectButton />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;