// import React from 'react';
// import { DataTable } from '../components/DataTable';
import { Wallet } from 'lucide-react';
import { DataTable } from '../components/DataTable';
import Navbar from '../components/Navbar';
import { useGetRecentActivities, useUserId, useUserInfo } from '../hooks/useContract';
import { parseUserInfo } from '../utils/helper';
import { useAccount } from 'wagmi';




export function InvestmentsList() {
      const { address } = useAccount()
      const {data:userId} = useUserId(address as `0x${string}`)
      const {data:userInfo} = useUserInfo(userId as bigint)
      const parsedUserInfo = parseUserInfo([userInfo][0] || [])
    const {data:getRecentActivities} = useGetRecentActivities(parsedUserInfo.id)
  return (
    <div className="">
        <Navbar/>
    <div className="space-y-6 mt-20 container mx-auto">
      <div className="flex items-center space-x-3">
        <Wallet className="w-8 h-8 text-blue-600" />
        <h1 className="text-2xl font-bold text-white">My Investments</h1>
      </div>
      <DataTable headers={['User Id', 'Level']}>
        
        {getRecentActivities?.map((investment) => (
          <tr key={investment.id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              ${Number(investment.id)}
            </td>
            {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {investment.date}
            </td> */}
            {/* <td className="px-6 py-4 whitespace-nowrap">
              <span className={`px-2 py-1 text-xs rounded-full ${
                investment.status === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {investment.status.charAt(0).toUpperCase() + investment.status.slice(1)}
              </span>
            </td> */}
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              ${Number(investment.level)}
            </td>
          </tr>
        ))}
      </DataTable>
    </div>
    </div>
  );
}