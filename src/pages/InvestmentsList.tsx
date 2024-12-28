// import React from 'react';
// import { DataTable } from '../components/DataTable';
import { Wallet } from 'lucide-react';
// import { DataTable } from '../components/DataTable';
import {  useUserId, useUserInfo } from '../hooks/useContract';
// import { parseUserInfo } from '../utils/helper';
import { useAccount } from 'wagmi';




export function InvestmentsList() {
      const { address } = useAccount()
      const {data:userId} = useUserId(address as `0x${string}`)
      // const {data:userInfo} = useUserInfo(userId as bigint)
      // const parsedUserInfo = parseUserInfo([userInfo][0] || [])
    // const {data:getRecentActivities} = useGetRecentActivities(parsedUserInfo.id)
  return (
    <div className="">
    <div className="space-y-6 mt-20 container mx-auto">
      <div className="flex items-center space-x-3">
        <Wallet className="w-8 h-8 text-blue-600" />
        <h1 className="text-2xl font-bold text-white">Recent Activities</h1>
      </div>

    </div>
    </div>
  );
}

