import { useAccount, useWaitForTransactionReceipt, useReadContract, useWriteContract } from 'wagmi';
import { CONTRACT_ABI, TOKEN_ABI } from '../abi';
import { parseEther } from 'viem';

export function useUserInfo() {
  const { address } = useAccount();

  const { data: userInfo } = useReadContract({
    address: CONTRACT_ABI.address as `0x${string}`,
    abi: CONTRACT_ABI.abi,
    functionName: 'getUserDetail',
    args: [address as `0x${string}`],
    // enabled: !!address,
  });

  // console.log(userInfo)
  const { data: userTopUpWallet } = useReadContract({
    address: CONTRACT_ABI.address as `0x${string}`,
    abi: CONTRACT_ABI.abi,
    functionName: 'userTopUpWallet',
    args: [userInfo?.id || 0n],
    // enabled: !!userInfo?.id,
  });

  return { userInfo, userTopUpWallet };
}

export function useRoyaltyPool() {
  const { data: royaltyPool } = useReadContract({
    address: CONTRACT_ABI.address as `0x${string}`,
    abi: CONTRACT_ABI.abi,
    functionName: 'royaltyPool',
  });

  const { data: totalRoyaltyPool } = useReadContract({
    address: CONTRACT_ABI.address as `0x${string}`,
    abi: CONTRACT_ABI.abi,
    functionName: 'totalRoyaltyPool',
  });

  return { royaltyPool, totalRoyaltyPool };
}

export function useUserActivities(page: number = 1) {
  const { userInfo } = useUserInfo() as any;

  const { data: activities, isError, isLoading } = useReadContract({
    address: CONTRACT_ABI.address as `0x${string}`,
    abi: CONTRACT_ABI.abi,
    functionName: 'getRecentActivities',
    args: [userInfo?.id || 0n, BigInt(page)],
    // enabled: !!userInfo?.id,
    // watch: true,
  }) as any;

  console.log(activities)

  // Transform the activities into a more usable format
  // const formattedActivities = activities ? activities?.map((activity: any) => ({
  //   id: activity[0],           // User ID
  //   usdtAmount: activity[1],   // USDT Amount
  //   tokenAmount: activity[2],  // Token Amount
  //   mode: activity[3],         // Transaction Mode
  //   refId: activity[4]         // Reference ID
  // })) : [];

  return {
    activities,
    isLoading,
    isError,
    hasMore: activities?.length > 0
  };
}

export function useInvestment() {
  const { address } = useAccount();
  const { writeContract, data: txHash } = useWriteContract()
  const { isFetched: waitForTransactionReceipt } = useWaitForTransactionReceipt({
    hash: txHash,
  })

  const { writeContract: approveContract, data: txHashApprove } = useWriteContract()
  const { isFetched: waitForApprovalTransactionReceipt } = useWaitForTransactionReceipt({
    hash: txHashApprove,
  })

  // console.log(allowance)
  const approve = async (amount: string) => {
    if (!address) return;
    // console.log(address, parseEther(amount))
    try {
      approveContract({
        abi: TOKEN_ABI.abi,
        address: TOKEN_ABI.address as `0x${string}`,
        functionName: 'approve',
        args: [CONTRACT_ABI.address as `0x${string}`, parseEther(String(Number(amount) + 0.1))],
      })

    } catch (error) {
      console.error('Investment failed:', error);
    }
  };
  const invest = async (amount: string, useTopUpWallet = false) => {
    if (!address) return;
    // Get referral from URL or use default
    const urlParams = new URLSearchParams(window.location.search);
    const referral = urlParams.get('referral');
    const refId = referral && !isNaN(Number(referral)) ? BigInt(referral) : 1000n;
    const parsedAmount = amount && !isNaN(Number(amount)) ? parseEther(amount) : 0n;

    console.log(address, refId, parseEther(amount), useTopUpWallet)
    try {
      await writeContract({
        abi: CONTRACT_ABI.abi,
        address: CONTRACT_ABI.address as `0x${string}`,
        functionName: 'buy',
        args: [address, refId, parsedAmount, useTopUpWallet],
        value: 0n,
      })

    } catch (error) {
      console.error('Investment failed:', error);
    }
  };


  return { invest, waitForTransactionReceipt, waitForApprovalTransactionReceipt, approve };
}