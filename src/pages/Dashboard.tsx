import { useAccount } from "wagmi"
import { byForexConfig } from "../../abi"
import {
  useGetDividendIncome,
  // useDistributeDividend,
  // useGetDividendPool,
  useGetDividendTime,
  // useGetDividendTime, useGetTotalUsers,
  useRegister,
  useUpgrade,
  useUserId,
  useUserInfo
} from "../hooks/useContract";
import React, { useEffect, useState } from "react";
import { useAllowance, useApprove } from "../hooks/useERC20Contract";
import { formatEther, parseEther } from "viem";
import {  parseIncomeData, parseUserInfo } from "../utils/helper";
import toast from "react-hot-toast";
import { convertTimestampToDate } from "../utils";
import Navbar from "../components/Navbar";
// import formatAmount from "../utils";
const packages = ["20", "40", "80", "160", "320", "640", "1280", "2560", "5120", "10240", "20480", "40960"]
const Dashboard = () => {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [referralCode, setReferralCode] = useState(1000);
  const [errorMessage, setErrorMessage] = useState('');
  
  const { address } = useAccount()
  
  const { upgrade: upgradeLevel,isPending:isUpgradePending, isSuccess:isUpgradeSuccess, isError:isUpgradeError } = useUpgrade();
  // const {distributeDividend} = useDistributeDividend()
  // const [value, setValue] = useState<bigint>(BigInt(0));
  const { data: isApproved } = useAllowance(address, byForexConfig.address as `0x${string}`);
  const {data:userId} = useUserId(address as `0x${string}`)
  const {data:userInfo} = useUserInfo(userId as bigint)
  const parsedUserInfo = parseUserInfo([userInfo][0] || [])
  // const {data:getDividendPool} = useGetDividendPool()
  // const parsedFinancialData = parseFinancialData([getDividendPool][0] || [])
  const [packageId, setPackageId] = useState<number>((Number(parsedUserInfo.level)));
  const [investmentAmount, setInvestmentAmount] = useState<string>(packages[packageId]);
  const { approve,isPending:isApprovePending, } = useApprove(byForexConfig.address,  parseEther(investmentAmount));
  const { register, isPending:isRegisterPending, isSuccess:isRegisterSuccess, isError:isRegisterError } = useRegister(BigInt(referralCode), address as `0x${string}`, parseEther(investmentAmount));
  const {data:getDividendTime} = useGetDividendTime()
  const {data:getDividendIncome} = useGetDividendIncome(parsedUserInfo.id);
  const parsedUserIncome = parseIncomeData([getDividendIncome][0] || [])


  //   const [isLoading, setIsLoading,] = useState(false)
  

console.log(convertTimestampToDate(Number(getDividendTime)))

  // Get the full URL
  // const fullURL = `${window.location.origin}${location.search}`;
  const getfullURL = `${window.location.origin}?referral=${parsedUserInfo.id}`;

  const isApprove =() => Number(isApproved) < Number(parseEther(investmentAmount))
  // alert(Number(isApproved) < Number(parseEther(investmentAmount)))
/**
 * Handles the investment process by determining the user's level and either
 * upgrading their level or registering them. If the user's level is greater
 * than or equal to 1, it attempts to upgrade their level with the current 
 * investment amount. Otherwise, it registers the user. Logs the packageId as 
 * a BigInt for debugging purposes.
 */

  const handleInvest = async () => {
    //og(parseUserInfo([userInfo[0]]))
    // Number(parseUserInfo([userInfo][0]).level) >= 1? await register(): 
    Number(parsedUserInfo.level) >= 1? await upgradeLevel(BigInt(userId as bigint), BigInt("1"), parseEther(investmentAmount)) : setIsModalOpen(true) 

  };

  const handleRegister = async ()=>{
    await register()

    // alert(balance)
  }


  /**
   * Approves the ERC20 contract to spend the user's investment amount
   */
 const handleApprove = () => {
    approve();
  }
  const handleCopy = () => {
    navigator.clipboard.writeText(getfullURL).then(() => {
      toast.success('Referral link copied to clipboard!');
    });
  };



  const storedCode = localStorage.getItem('referralCode')
  useEffect(() => {
    if(storedCode){
      setReferralCode(JSON.parse(storedCode))
    }
  }, [storedCode])

  useEffect(() => {
    if(isUpgradeSuccess){
      toast.success("Upgrading successful")
    }
    else  if(isRegisterSuccess){
      toast.success("Registration successful")
    } 
  },[isUpgradeSuccess, isRegisterSuccess, isUpgradePending, isRegisterPending, isRegisterError, isUpgradeError])
useEffect(() => {
  // setPackageId(Number(parsedUserInfo.level))
  setInvestmentAmount(packages[Number(parsedUserInfo.level)])
  
},[parsedUserInfo.level])
// console.log(packageId)
useEffect(() => {
  
})

  return (
    <div className="">
      <Navbar/>
    <div className="px-3 md:px-28 py-20 flex flex-col  pt-20">
      <div className="h-screen w-full fixed top-0 left-0 flex justify-center flex-col items-center">
        <div className="md:-top-10 -top-5 absolute">
          <img src="/svgs/OFF.svg" alt="off img" />
        </div>
        <div className="md:-bottom-10 -bottom-5 absolute">
          <img src="/svgs/25%.svg" alt="off img" />
        </div>
        <div className="absolute top-0 left-0 h-screen w-full -z-50">
          <img src="/svgs/bg.svg" alt="bg-galaxy" />
          <img src="/svgs/bg.svg" className="h-full" alt="bg-galaxy" />
          <img src="/svgs/bg.svg" alt="bg-galaxy" />
        </div>
      </div>


      <div className="flex gap-5 z-20 flex-col">
        <div>
          <p className="text-2xl py-4 md:text-4xl text-white font-bold">Purchase Slot</p>
          <div className="bg-white w-full rounded-lg py-5 px-3 flex flex-col gap-5">
            <div className="w-full gap-2 justify-evenly flex flex-wrap">

              {packages.map((item, index) => (
                <button
                  key={index}
                  onClick={() => { setInvestmentAmount(item); setPackageId(index + 1); }}
                  // onClick={() => { }}
                  disabled={(Number(parsedUserInfo.level)) !== (index )}
                  className={`py-2 px-4 rounded-md text-white font-semibold ${
                    Number(parsedUserInfo.level) === (index ) ? 'bg-primary cursor-pointer' : 'bg-gray-400 cursor-not-allowed'
                  }`}
                  // className={`text-black font-semibold p-4 cursor-pointer bg-neutral-400`}
                >
                  ${item}
                </button>
                
              ))}

            </div>
            <div className="flex bg-neutral-200 rounded-md p-2 justify-between">
              <p>Total slot Purchased</p>
              <p className="text-primary">${formatEther(parsedUserInfo.totalDeposit)}</p>
            </div>
            <button
              onClick={isApprove() ? handleApprove : handleInvest}
              // disabled={  Number(parseEther(investmentAmount)) === 0}
              className={`w-full py-2 rounded-lg text-lg font-semibold bg-primary ${isApprovePending || isRegisterPending || isUpgradePending?"outline-none opacity-50 cursor-not-allowed":"  text-white cursor-pointer"}`}
            >
              {isApprovePending || isRegisterPending || isUpgradePending
                ? 'Confirming...'
                : isApprove()
                  ? `Approve ${investmentAmount} USDT`
                  : `Invest ${investmentAmount} USDT`}

              {/* Approve */}

            </button>
          </div>
        </div>
        {/* <button className="bg-green-700 cursor-pointer w-full py-2 rounded-lg text-lg font-semibold text-white outline-none" onClick={distributeDividend}>distributeDividend</button> */}
        {/* transferOwnership */}
        {/* <button className="bg-green-700 cursor-pointer w-full py-2 rounded-lg text-lg font-semibold text-white outline-none" onClick={transferOwnership}>transferOwnership</button> */}
        <div>
          <div className="flex items-center justify-between">
          <p className="text-2xl py-4 md:text-4xl text-white font-bold">Pool Claim</p>
          <p className="text-2xl py-4 md:text-4xl text-white font-bold">Pool Closes At {convertTimestampToDate(Number(getDividendTime))}</p>
          </div>
          <div className="bg-white w-full rounded-lg py-5 px-3">
            <div className="flex flex-col gap-3">
              {[parsedUserIncome.firstValue, parsedUserIncome.secondValue, parsedUserIncome.thirdValue, parsedUserIncome.fourthValue].map((poolBalance, index) => (
                <div key={index} className="bg-neutral-200 flex justify-between p-2 rounded-lg">
                  <p className="text-lg font-semibold my-auto">Pool {index +1}</p>
                  <p className="text-primary">
                    {/* ${dashInfo?.poolsClaim ? formatBigInt(dashInfo.poolsClaim[poolId - 1]) : 0} */}
                    {formatEther(poolBalance)}
                  </p>
                  <button
                    className="rounded-lg border-2 border-primary text-primary py-1 px-3 font-semibold"
                  
                  >
                    {formatEther(poolBalance) === '0' ? 'Ineligible' : 'Eligible'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <p className="text-2xl py-4 md:text-4xl text-white font-bold">Income claim</p>
          <div className="flex flex-col gap-3">
            <div className=" bg-white w-full rounded-lg py-5 px-3 flex flex-col gap-5 ">
              <div className="flex justify-between">
                <p className="font-bold text-lg">Total income claimed</p>
                <p className="text-primary">${Number(parsedUserInfo.totalIncome)}</p>
                {/* <p className="text-primary">${Number(parsedUserInfo.totalIncome)}</p> */}
              </div>
              {/* <div className="flex justify-between">
                <p className="font-bold text-lg">Available income claim</p>
                <p className="text-primary"></p>
                <p className="text-primary">${}</p>
              </div> */}
              {/* <div className="flex w-full justify-end"><button onClick={() => distributeDividend()} className="text-white text-xl font-semibold bg-primary w-fit py-1 px-4 rounded-md">Eligible</button></div> */}
            </div>
          </div>
        </div>

        <div>
      <p className="text-2xl py-4 md:text-4xl text-white font-bold">Referral link</p>
      <div className="bg-white w-full rounded-lg py-5 px-3 flex flex-col md:flex-row gap-5">
        <div className="w-full">
          <input
            type="text"
            value={getfullURL}
            readOnly
            className="h-12 border-2 border-black rounded-lg w-full px-3 text-center font-semibold"
          />
        </div>
        <div className="flex w-full justify-end">
          <button
            onClick={handleCopy}
            className="text-white text-xl font-semibold bg-primary w-full md:w-fit py-2 px-4 rounded-md"
          >
            Copy
          </button>
        </div>
      </div>
    </div>
      </div>

         {/* Modal */}
         {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-11/12 max-w-md p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-4">Enter Referral Code</h2>
            <p className="text-gray-600 text-sm mb-4 text-center">
              Please enter your referral code. Use <strong>"1000"</strong> if you don’t have one.
            </p>
            <input
              type="number"
              value={referralCode}
              onChange={(e:React.ChangeEvent<HTMLInputElement>) => setReferralCode(Number(e.target.value) )}
              placeholder="Enter your referral code"
              className="w-full h-12 border-2 border-black rounded-lg px-3 text-center font-semibold mb-2"
              required
            />
            {errorMessage && (
              <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
            )}
            <div className="flex justify-end gap-4">
              <button

                onClick={handleRegister}
                className="bg-primary text-white py-2 px-4 rounded-md font-semibold"
              >
                Register
              </button>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setErrorMessage('');
                }}
                className="bg-gray-300 py-2 px-4 rounded-md font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
    </div>

  )
}

export default Dashboard