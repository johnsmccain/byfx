import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import { bscTestnet } from 'viem/chains';
import { binanceWallet, metaMaskWallet, rainbowWallet, trustWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets';
import { createConfig, http } from 'wagmi';
const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [rainbowWallet, walletConnectWallet, trustWallet, metaMaskWallet, binanceWallet],
  },
],
{
  appName: 'By_forex',
  projectId: '296924cdb9a40ac2bfe6b78e60779e09',
})
export const config = createConfig({
  connectors,
  chains: [bscTestnet],
  transports: {
    [bscTestnet.id]: http(),
  },
});