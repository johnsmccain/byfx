# byfx - GRich Investment Platform

A decentralized investment and referral platform built on Binance Smart Chain (BSC) that enables users to invest in USDT, earn cashback in GRich tokens, and participate in a multi-level referral system with royalty rewards.

## Features

- **Wallet Integration**: Connect with MetaMask, Trust Wallet, Rainbow, Binance Wallet, and WalletConnect
- **Investment System**: Invest USDT with a minimum $6 activation fee
- **TopUp Wallet**: Use accumulated rewards for reinvestment
- **Referral Program**: Multi-level referral system with unique referral links
- **Royalty Pool**: Earn from the global royalty pool based on eligibility
- **Cashback Rewards**: Receive GRich tokens as cashback on investments
- **Transaction History**: Track all investments and referral activities
- **Real-time Updates**: Live blockchain data synchronization

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: TailwindCSS + Framer Motion
- **Web3**: Wagmi + Viem + RainbowKit
- **Blockchain**: Binance Smart Chain Testnet
- **State Management**: TanStack Query
- **Icons**: Lucide React + React Icons
- **Notifications**: React Hot Toast

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- MetaMask or compatible Web3 wallet
- BSC Testnet USDT tokens

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Project Structure

```
src/
├── components/       # React components (Hero, Navbar, ReferralList, TransactionList)
├── hooks/           # Custom hooks (useContract)
├── abi.ts           # Smart contract ABIs
├── wagmi.ts         # Wagmi configuration
└── App.tsx          # Main application component
```

## Smart Contract Integration

The platform interacts with two main contracts:
- **Investment Contract**: Handles deposits, referrals, and reward distribution
- **USDT Token Contract**: ERC-20 token for investments

## Environment

- **Network**: BSC Testnet
- **RPC**: Default BSC Testnet RPC
- **WalletConnect Project ID**: Configured in wagmi.ts

## License

MIT
