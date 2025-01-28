
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { bsc } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'By_forex',
  projectId: '296924cdb9a40ac2bfe6b78e60779e09',
  chains: [ bsc],
});
