import { useAccount } from "wagmi"
import { byForexConfig } from "../../abi"
import {
  useGetDividendPool,
  // useGetDividendTime, useGetTotalUsers,
  useRegister,
  useUpgrade,
  useUserId,
  useUserInfo
} from "../hooks/useContract";
import { useState } from "react";
import { useAllowance, useApprove } from "../hooks/useERC20Contract";
import { formatEther, parseEther } from "viem";
import { parseFinancialData, parseUserInfo } from "../utils/helper";
// import formatAmount from "../utils";
const packages = ["20", "40", "80", "160", "320", "640", "1280", "2560", "5120", "10240", "20480", "40960"]
const Investments = () => {
  const [investmentAmount, setInvestmentAmount] = useState<string>("20");
  const [_, setPackageId] = useState<number>(0);
  // const { writeContract } = useWriteContract()

  const { address } = useAccount()
  //og("address")

  // const [ref, setRef] = useState<number>(0);
  // const [newAcc, setNewAcc] = useState<string>("");
  // const [amount, setAmount] = useState<number>(0);
  const { register, isPending:isRegisterPending} = useRegister(BigInt(1000), address as `0x${string}`, parseEther(investmentAmount));
  const { upgrade: upgradeLevel, } = useUpgrade();
  // const [value, setValue] = useState<bigint>(BigInt(0));
  const { approve,isPending:isApprovePending, } = useApprove(byForexConfig.address,  parseEther(investmentAmount));
  const { data: isApproved } = useAllowance(address, byForexConfig.address as `0x${string}`);
  const {data:userId} = useUserId(address as `0x${string}`)
  const {data:userInfo} = useUserInfo(userId as number)
 
 
  //   const [isLoading, setIsLoading,] = useState(false)
  
  const {data:getDividendPool} = useGetDividendPool()
  

  const parsedUserInfo = parseUserInfo([userInfo][0] || [])
  const parsedFinancialData = parseFinancialData([getDividendPool][0] || [])

// distributeDividend
// const distributeDividend =() => {
//   writeContract({ 
//     address: byForexConfig.address as `0x${string}`,
//     abi: byForexConfig.abi,
//     functionName: 'distributeDividend',
//  })
// }


// transferOwnership
// const transferOwnership =() => {
//   writeContract({ 
//     address: byForexConfig.address as `0x${string}`,
//     abi: byForexConfig.abi,
//     functionName: 'transferOwnership',
//     args:[address]
//  })
// }

  const isApprove =() => Number(isApproved) < Number(parseEther(investmentAmount))
  
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
    Number(parsedUserInfo.level) >= 1? await upgradeLevel(BigInt(userId as number), BigInt("1"), parseEther(investmentAmount)): await register()
    // await register();

  };


 const handleApprove = () => {
    approve();
  }


  //og(investmentAmount)

  return (
    <div className="px-3 md:px-28 py-20 flex flex-col ">
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
          <p className="text-2xl py-4 md:text-4xl text-white font-bold">Investments</p>
          <div className="bg-white w-full rounded-lg py-5 px-3 flex flex-col gap-5">
            <div className="w-full gap-2 justify-evenly flex flex-wrap">
              {/* {packages.map((item, index) => (
                <p
                  key={index}
                  onClick={() => { setInvestmentAmount(item); setPackageId(index + 1); }}
                  // onClick={() => { }}
                  className={`text-black font-semibold p-4 cursor-pointer bg-neutral-400`}
                >
                  ${item}
                </p>
              ))} */}
              {packages.map((item, index) => (
                <p
                  key={index}
                  onClick={() => { setInvestmentAmount(item); setPackageId(index + 1); }}
                  // onClick={() => { }}
                  className={`text-black font-semibold p-4 cursor-pointer bg-neutral-400`}
                >
                  ${item}
                </p>
              ))}

            </div>
            <div className="flex bg-neutral-200 rounded-md p-2 justify-between">
              <p>Total investments</p>
              {/* <p className="text-primary">{userInfo ? formatBigInt(userInfo[2]) : 0}</p> */}
            </div>
            <button
              onClick={isApprove() ? handleApprove : handleInvest}
              // disabled={  Number(parseEther(investmentAmount)) === 0}
              className={`bg-primary w-full py-2 rounded-lg text-lg font-semibold text-white outline-none opacity-50 cursor-not-allowed
                }`}
            >
              {isApprovePending || isRegisterPending
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
          <p className="text-2xl py-4 md:text-4xl text-white font-bold">Pool Claim</p>
          <div className="bg-white w-full rounded-lg py-5 px-3">
            <div className="flex flex-col gap-3">
              {[parsedFinancialData.firstValue, parsedFinancialData.secondValue, parsedFinancialData.thirdValue, parsedFinancialData.fourthValue].map((poolBalance, index) => (
                <div key={index} className="bg-neutral-200 flex justify-between p-2 rounded-lg">
                  <p className="text-lg font-semibold my-auto">Pool {index}</p>
                  <p className="text-primary">
                    {/* ${dashInfo?.poolsClaim ? formatBigInt(dashInfo.poolsClaim[poolId - 1]) : 0} */}
                    {formatEther(poolBalance)}
                  </p>
                  <button
                    className="rounded-lg border-2 border-primary text-primary py-1 px-3 font-semibold"
                  // onClick={() => handlePoolClaim(poolId)}
                  >
                    Claim
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
                <p className="font-bold text-lg">Total income claim</p>
                <p className="text-primary">${Number(parsedUserInfo.totalIncome)}</p>
                {/* <p className="text-primary">${dashInfo?.totalIncomeClaim ? formatBigInt(dashInfo?.totalIncomeClaim) : 0}</p> */}
              </div>
              <div className="flex justify-between">
                <p className="font-bold text-lg">Available income claim</p>
                <p className="text-primary"></p>
                {/* <p className="text-primary">${dashInfo?.availableIncomeClaim ? formatBigInt(dashInfo?.availableIncomeClaim) : 0}</p> */}
              </div>
              <div className="flex w-full justify-end"><button className="text-white text-xl font-semibold bg-primary w-fit py-1 px-4 rounded-md">Claim</button></div>
            </div>
          </div>
        </div>

        <div>
          <p className="text-2xl py-4 md:text-4xl text-white font-bold">Referral link</p>
          <div className=" bg-white w-full rounded-lg py-5 px-3 flex flex-col md:flex-row gap-5 ">
            <div className="w-full">
              {/* <div className="w-full border-2 rounded-md border-black h-12 text-lg text-center outline-none font-semibold flex items-center justify-center">
                {generateReferralLink()}
              </div> */}
              <input type="text" className="h-12 border-2  border-black rounded-lg w-full px-3 text-center font-semibold" />
            </div>
            <div className="flex w-full justify-end">
              <button
                // onClick={() => navigator.clipboard.writeText(generateReferralLink())}
                className="text-white text-xl font-semibold bg-primary w-full md:w-fit py-2 px-4 rounded-md"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Investments