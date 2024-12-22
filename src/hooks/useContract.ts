// src/hooks/useContract.ts
import { useReadContract,  useWriteContract } from 'wagmi';
import { byForexConfig } from '../../abi';
import { useState } from 'react';


// Hook for 'activity' function
export function useActivity(id: number) {
    return useReadContract({
        address: byForexConfig.address as `0x${string}`,
        abi: byForexConfig.abi,
        functionName: 'activity',
        args: [id],
    });
}

// Hook for 'activity' function
export function useGetDividendPool() {
    return useReadContract({
        address: byForexConfig.address as `0x${string}`,
        abi: byForexConfig.abi,
        functionName: 'getDividendPool'
    }) as any;
}

// Hook for 'getUserId' function
export function useUserId(userAddress:`0x${string}`) {
    return useReadContract({
        address: byForexConfig.address as `0x${string}`,
        abi: byForexConfig.abi,
        functionName: 'id',
        args: [userAddress],
    });
}

// Hook for 'getUserInfo' function
export function useUserInfo(id:number) {
    return useReadContract({
        address: byForexConfig.address as `0x${string}`,
        abi: byForexConfig.abi,
        functionName: 'userInfo',
        args: [id],
    }) as any;
}


// Hook for 'distributeDividend' function
export function useDistributeDividend() {
    const { writeContract, isSuccess, isError } = useWriteContract()
    const [isLoading, setIsLoading,] = useState(false)
    const distributeDividend = async () => {
        setIsLoading(true);
        await writeContract({
            address: byForexConfig.address as `0x${string}`,
            abi: byForexConfig.abi,
            functionName: 'distributeDividend',
        });
        setIsLoading(false);

    }

    return { distributeDividend, isLoading, isSuccess, isError };
}

// Hook for 'getDividendTime' function
export function useGetDividendTime() {
    return useReadContract({
        address: byForexConfig.address as `0x${string}`,
        abi: byForexConfig.abi,
        functionName: 'getDividendTime',
    });
}

// Hook for 'getTotalUsers' function
export function useGetTotalUsers() {
    return useReadContract({
        address: byForexConfig.address as `0x${string}`,
        abi: byForexConfig.abi,
        functionName: 'getTotalUsers',
    });
}

// Hook for 'maxActivities' function
export function useMaxActivities() {
    return useReadContract({
        address: byForexConfig.address as `0x${string}`,
        abi: byForexConfig.abi,
        functionName: 'maxActivities',
    });
}

// Hook for 'timeForNextDividend' function
export function useTimeForNextDividend() {
    return useReadContract({
        address: byForexConfig.address as `0x${string}`,
        abi: byForexConfig.abi,
        functionName: 'timeForNextDividend',
    });
}




// Read Hook Example
export const useGetActivity = (id: number) => {
    return useReadContract({
        address: byForexConfig.address as `0x${string}`,
        abi: byForexConfig.abi,
        functionName: "activity",
        args: [id],
    });
};

// Write Hook Example
export const useRegister = (_ref: BigInt, _newAcc: `0x${string}`, amt: BigInt) => {
    const [txHash, setTxHash] = useState<any>(null);
    const { writeContract, isSuccess, isPending, isError ,error,failureReason} = useWriteContract()
    //   const [isLoading, setIsLoading,] = useState(false)
    const register = async () => {
        const txHashx = writeContract({
            address: byForexConfig.address as `0x${string}`,
            abi: byForexConfig.abi,
            functionName: "register",
            args: [_ref, _newAcc, amt]
        });
        setTxHash(txHashx);
    };
    return { register, txHash, isSuccess, isPending, isError,error,failureReason };
};


// Other Hooks Example
export const useGetDirectTeamUsers = (_user: number) => {
    return useReadContract({
        address: byForexConfig.address as `0x${string}`,
        abi: byForexConfig.abi,
        functionName: "getDirectTeamUsers",
        args: [_user],
    });
};

    /**
     * @description
     * Hook for calling the 'upgrade' function.
     *
     * @example
     * const { upgrade } = useUpgrade()
     * await upgrade(1, 2, 3)
     *
     * @param {number} _id - The id of the user to upgrade.
     * @param {number} _lvls - The number of levels to upgrade.
     * @param {number} amt - The amount to upgrade.
     *
     * @returns {Promise<void>}
     */
export const useUpgrade = () => {
    const { writeContract, isSuccess, isPending, isError,failureReason,error } = useWriteContract()

    const upgrade = async (_id: BigInt, _lvls: BigInt, amt: BigInt) => {
        writeContract({
            address: byForexConfig.address as `0x${string}`,
            abi: byForexConfig.abi,
            functionName: "upgrade",
            args: [_id, _lvls, amt]
        });
    };

    return { upgrade, isSuccess, isPending, isError, failureReason, error };
};

