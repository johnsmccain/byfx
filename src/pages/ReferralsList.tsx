// import React from 'react';
// import { DataTable } from '../components/DataTable';
import { Users } from 'lucide-react';
import { DataTable } from '../components/DataTable';
import Navbar from '../components/Navbar';
import { useAccount } from 'wagmi';
import { useGetDirectTeamUsers, useUserId, useUserInfo } from '../hooks/useContract';
import { parseUserInfo } from '../utils/helper';

// type Referral = {
//   id: string;
//   userId: string;
//   date: string;
//   status: string;
//   earnings: number;
// };

export function ReferralsList() {
     const { address } = useAccount()
          const {data:userId} = useUserId(address as `0x${string}`)
          const {data:userInfo} = useUserInfo(userId as bigint)
          const parsedUserInfo = parseUserInfo([userInfo][0] || [])
        const {data:getDirectTeamUsers} = useGetDirectTeamUsers(parsedUserInfo.id)
  return (
    <div className="">
        <Navbar/>
    <div className="space-y-6 mt-20 container mx-auto">
      <div className="flex items-center space-x-3">
        <Users className="w-8 h-8 text-blue-600" />
        <h1 className="text-2xl font-bold text-white">My Referrals</h1>
      </div>
      <DataTable headers={['User Addr', 'User ID', 'Referrer', 'Level', 'TotalIncome', "referralIncome"]}>
        {getDirectTeamUsers?.map((referral) => (
          <tr key={Number(referral.id)}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {Number(referral.account)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {Number(referral.id)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {Number(referral.referrer)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span 
            //   className={`px-2 py-1 text-xs rounded-full ${
            //     Number(referral.status) === 'Active' 
            //       ? 'bg-green-100 text-green-800' 
            //       : 'bg-gray-100 text-gray-800'
            //   }`} 
              >
                {Number(referral.totalIncome)}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              ${Number(referral.referralIncome)}
            </td>
          </tr>
        ))}
      </DataTable>
    </div>
    </div>
  );
}