export const CONTRACT_ABI = {
  address: "0xe64DF6C5eaBE649eAB79e55b2Ed22f3BDBA46cA3",
  abi: [{"inputs":[{"internalType":"address","name":"_liq","type":"address"},{"internalType":"address","name":"_approver","type":"address"},{"internalType":"address","name":"_usdt","type":"address"},{"internalType":"address","name":"_crypto","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"amt","type":"uint256"}],"name":"USDTtoCRYPTO","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"activity","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"usdtAmt","type":"uint256"},{"internalType":"uint256","name":"tokenAmt","type":"uint256"},{"internalType":"uint256","name":"mode","type":"uint256"},{"internalType":"uint256","name":"refId","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"approver","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"uint256","name":"_ref","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"bool","name":"_useTopUpWallet","type":"bool"}],"name":"buy","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"}],"name":"changeCryptoAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_liq","type":"address"},{"internalType":"address","name":"_approver","type":"address"}],"name":"changeHolders","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"changeHolders","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"checkRoyaltyEligibility","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimRoyaltyIncome","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"claimStuckTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"cryptoToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"defaultRefer","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"directRefPercent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"distributeRoyalty","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"dividendLastDist","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getAllUsers","outputs":[{"components":[{"internalType":"address","name":"acct","type":"address"},{"internalType":"uint256","name":"ref","type":"uint256"},{"internalType":"uint256","name":"upline","type":"uint256"},{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"totalDepositUSDT","type":"uint256"},{"internalType":"uint256","name":"totalTokensClaimed","type":"uint256"},{"internalType":"uint256","name":"refIncomeUSDT","type":"uint256"},{"internalType":"uint256","name":"currentRoyaltyIncomeUSDT","type":"uint256"},{"internalType":"uint256","name":"royaltyIncomeUSDT","type":"uint256"},{"internalType":"uint256","name":"refCount","type":"uint256"},{"internalType":"uint256","name":"totalMatrixTeam","type":"uint256"}],"internalType":"struct GrichInv.User[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"uint256","name":"_page","type":"uint256"}],"name":"getRecentActivities","outputs":[{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"usdtAmt","type":"uint256"},{"internalType":"uint256","name":"tokenAmt","type":"uint256"},{"internalType":"uint256","name":"mode","type":"uint256"},{"internalType":"uint256","name":"refId","type":"uint256"}],"internalType":"struct GrichInv.Activity[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"getUserActivitiesLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getUserDetail","outputs":[{"components":[{"internalType":"address","name":"acct","type":"address"},{"internalType":"uint256","name":"ref","type":"uint256"},{"internalType":"uint256","name":"upline","type":"uint256"},{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"totalDepositUSDT","type":"uint256"},{"internalType":"uint256","name":"totalTokensClaimed","type":"uint256"},{"internalType":"uint256","name":"refIncomeUSDT","type":"uint256"},{"internalType":"uint256","name":"currentRoyaltyIncomeUSDT","type":"uint256"},{"internalType":"uint256","name":"royaltyIncomeUSDT","type":"uint256"},{"internalType":"uint256","name":"refCount","type":"uint256"},{"internalType":"uint256","name":"totalMatrixTeam","type":"uint256"}],"internalType":"struct GrichInv.User","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"user","type":"uint256"},{"internalType":"uint256","name":"_level","type":"uint256"}],"name":"getUserLevelBusiness","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"user","type":"uint256"},{"internalType":"uint256","name":"_level","type":"uint256"}],"name":"getUserLevelRefs","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"user","type":"uint256"},{"internalType":"uint256","name":"_level","type":"uint256"}],"name":"getUserLevelusersInfo","outputs":[{"components":[{"internalType":"address","name":"acct","type":"address"},{"internalType":"uint256","name":"ref","type":"uint256"},{"internalType":"uint256","name":"upline","type":"uint256"},{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"totalDepositUSDT","type":"uint256"},{"internalType":"uint256","name":"totalTokensClaimed","type":"uint256"},{"internalType":"uint256","name":"refIncomeUSDT","type":"uint256"},{"internalType":"uint256","name":"currentRoyaltyIncomeUSDT","type":"uint256"},{"internalType":"uint256","name":"royaltyIncomeUSDT","type":"uint256"},{"internalType":"uint256","name":"refCount","type":"uint256"},{"internalType":"uint256","name":"totalMatrixTeam","type":"uint256"}],"internalType":"struct GrichInv.User[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_userId","type":"uint256"}],"name":"getUserTeamStats","outputs":[{"internalType":"uint256","name":"totalTeamBusiness","type":"uint256"},{"internalType":"uint256","name":"totalTeamCount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"globalUsers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"id","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastDist","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"levelIncomeRatios","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"liqHolder","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"matrixDirect","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minDeposit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"price","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"royaltyPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"royaltyUsers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"royaltyUsersIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rpFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"minDep","type":"uint256"}],"name":"setMinDeposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amt","type":"uint256"}],"name":"setPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_level","type":"uint256"},{"internalType":"uint256","name":"_fee","type":"uint256"}],"name":"setRefIncomeLevelRatios","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"teams","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"teamsBiz","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenPercent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalInvestmentsUSDT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalRoyaltyPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalUsers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"usdtToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"userActivities","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"userDirectRefs","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"userDirectRefsBiz","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"userTopUpWallet","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"usersInfo","outputs":[{"internalType":"address","name":"acct","type":"address"},{"internalType":"uint256","name":"ref","type":"uint256"},{"internalType":"uint256","name":"upline","type":"uint256"},{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"totalDepositUSDT","type":"uint256"},{"internalType":"uint256","name":"totalTokensClaimed","type":"uint256"},{"internalType":"uint256","name":"refIncomeUSDT","type":"uint256"},{"internalType":"uint256","name":"currentRoyaltyIncomeUSDT","type":"uint256"},{"internalType":"uint256","name":"royaltyIncomeUSDT","type":"uint256"},{"internalType":"uint256","name":"refCount","type":"uint256"},{"internalType":"uint256","name":"totalMatrixTeam","type":"uint256"}],"stateMutability":"view","type":"function"}] as const
}
export const TOKEN_ABI = {
  address: "0x25ed48E0f7B9Be6024866A4eF4a3882333181517",
  abi:[
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address",
          "indexed": true
        },
        {
          "internalType": "address",
          "name": "spender",
          "type": "address",
          "indexed": true
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256",
          "indexed": false
        }
      ],
      "type": "event",
      "name": "Approval",
      "anonymous": false
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address",
          "indexed": true
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address",
          "indexed": true
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256",
          "indexed": false
        }
      ],
      "type": "event",
      "name": "Transfer",
      "anonymous": false
    },
    {
      "inputs": [
        { "internalType": "address", "name": "owner", "type": "address" },
        { "internalType": "address", "name": "spender", "type": "address" }
      ],
      "stateMutability": "view",
      "type": "function",
      "name": "allowance",
      "outputs": [
        { "internalType": "uint256", "name": "", "type": "uint256" }
      ]
    },
    {
      "inputs": [
        { "internalType": "address", "name": "spender", "type": "address" },
        { "internalType": "uint256", "name": "value", "type": "uint256" }
      ],
      "stateMutability": "nonpayable",
      "type": "function",
      "name": "approve",
      "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }]
    },
    {
      "inputs": [
        { "internalType": "address", "name": "account", "type": "address" }
      ],
      "stateMutability": "view",
      "type": "function",
      "name": "balanceOf",
      "outputs": [
        { "internalType": "uint256", "name": "", "type": "uint256" }
      ]
    },
    {
      "inputs": [],
      "stateMutability": "view",
      "type": "function",
      "name": "totalSupply",
      "outputs": [
        { "internalType": "uint256", "name": "", "type": "uint256" }
      ]
    },
    {
      "inputs": [
        { "internalType": "address", "name": "to", "type": "address" },
        { "internalType": "uint256", "name": "value", "type": "uint256" }
      ],
      "stateMutability": "nonpayable",
      "type": "function",
      "name": "transfer",
      "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }]
    },
    {
      "inputs": [
        { "internalType": "address", "name": "from", "type": "address" },
        { "internalType": "address", "name": "to", "type": "address" },
        { "internalType": "uint256", "name": "value", "type": "uint256" }
      ],
      "stateMutability": "nonpayable",
      "type": "function",
      "name": "transferFrom",
      "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }]
    }
  ]
}
