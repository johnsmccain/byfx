import { formatUnits } from "viem";

// Function to format USDT with 6 decimals
const formatAmount = (amount: bigint, decimals: number = 6): string => {
  const formattedAmount = formatUnits(amount, decimals);
  return formattedAmount;
};

export default formatAmount;
