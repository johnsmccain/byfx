// import React from 'react';
// import { DataTable } from '../components/DataTable';
import { Wallet } from 'lucide-react';
import { DataTable } from '../components/DataTable';
import { useGetRecentActivities, useUserId, useUserInfo } from '../hooks/useContract';
// import { DataTable } from '../components/DataTable';
// import {  useUserId, useUserInfo } from '../hooks/useContract';
import { parseUserInfo } from '../utils/helper';
import { useAccount } from 'wagmi';
import { formatEther } from 'viem';
import { useState } from 'react';




export function InvestmentsList() {
  const { address } = useAccount()
  const { data: userId } = useUserId(address as `0x${string}`)
  const { data: userInfo } = useUserInfo(userId as bigint)
  const parsedUserInfo = parseUserInfo([userInfo][0] || [])
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  
  // Fetch recent activities with pagination
  const { data: getRecentActivities } = useGetRecentActivities(parsedUserInfo.id, BigInt((currentPage)))
  
    // Calculate total pages (assuming getRecentActivities.totalItems exists)
    const totalItems = getRecentActivities?.length || 0;
  
    const handlePageChange = (page: number) => {
      setCurrentPage(page);
    };


  return (
    <div className=" h-[calc(100vh-104px)] p-3">
      <div className=" mt-20 container mx-auto flex flex-col justify-between ">
        <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <Wallet className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-white">Recent Activities</h1>
        </div>
        <DataTable headers={['User ID', "Income Earned", "Mode"]} >
          {getRecentActivities?.map((referral, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {Number(referral.id)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatEther(referral.amt)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {Number(referral.mode) === 0
                  ? 'Registration'
                  : Number(referral.mode) === 1
                  ? 'Upgrade'
                  : Number(referral.mode) === 2
                  ? 'Level Income'
                  : 'Pool Income'}
              </td>
            </tr>
          ))}
        </DataTable>
        </div>
        <div className="flex justify-center space-x-2 mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-primary text-white rounded disabled:bg-gray-400"
          >
            Previous
          </button>
          {/* {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === i + 1 ? 'bg-primary text-white' : 'bg-gray-200 text-black'
              }`}
            >
              {i + 1}
            </button>
          ))} */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={Number(totalItems) < 10}
            className="px-4 py-2 bg-primary text-white rounded disabled:bg-gray-400"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

