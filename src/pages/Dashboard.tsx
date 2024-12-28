import { useAccount,  useWaitForTransactionReceipt } from "wagmi"
import {
  useGetDividendIncome,
  // useDistributeDividend,
  // useGetDividendPool,
  // useGetDividendTime,
  // useGetDividendTime, useGetTotalUsers,
  useRegister,
  useUpgrade,
  useUserId,
  useUserInfo
} from "../hooks/useContract";
import { useEffect, useState } from "react";
import { useApprove } from "../hooks/useERC20Contract";
import { formatEther, parseEther } from "viem";
import { parseIncomeData, parseUserInfo } from "../utils/helper";
import toast from "react-hot-toast";
// import { convertTimestampToDate } from "../utils";
import { byForexConfig } from "../abi";
import { readContract} from "wagmi/actions";
import { config } from "../utils/wagmi";
const packages = ["20", "40", "80", "160", "320", "640", "1280", "2560", "5120", "10240", "20480", "40960"]
const Dashboard = () => {

  const [referralCode, setReferralCode] = useState(1000);
  const { address } = useAccount()
  const { upgrade: upgradeLevel, isPending: isUpgradePending, isError: isUpgradeError, data: upgradeTxHash } = useUpgrade();
  const { data: userId } = useUserId(address as `0x${string}`)
  const { data: userInfo } = useUserInfo(userId as bigint)
  // const parsedUserInfo = parseUserInfo([userInfo][0] || [])
  const [parsedUserInfo, setParsedUserInfo] = useState(parseUserInfo([userInfo][0] || []));
  const [packageId, setPackageId] = useState<number>((Number(parsedUserInfo.level)));
  const [investmentAmount, setInvestmentAmount] = useState<string>(packages[packageId]);
  const { approve, isPending: isApprovePending, data: approveTxHash, isError: isApproveError,  } = useApprove(byForexConfig.address, parseEther(investmentAmount));
  const { register, isPending: isRegisterPending,  isError: isRegisterError, data: registerTxHash } = useRegister(BigInt(referralCode), address as `0x${string}`, parseEther(investmentAmount));
  const { data: getDividendIncome } = useGetDividendIncome(parsedUserInfo.id);
  const parsedUserIncome = parseIncomeData([getDividendIncome][0] || [])

  // Get the full URL
  const getfullURL = `${window.location.origin}?referral=${parsedUserInfo.id}`;

  const handleRegister = async () => {
    await register()
  }
  const handleInvest = async () => {
    Number(parsedUserInfo.level) >= 1 ? await upgradeLevel(BigInt(userId as bigint), BigInt("1"), parseEther(investmentAmount)) : handleRegister()

  };

  const [isAllowed, setIsAllowed] = useState(false);
  /**
   * Approves the ERC20 contract to spend the user's investment amount
   */
  const handleApprove = () => {
    setIsAllowed(true)
    approve();
  }
  const handleCopy = () => {
    navigator.clipboard.writeText(getfullURL).then(() => {
      toast.success('Referral link copied to clipboard!');
    });
  };

  const storedCode = localStorage.getItem('referralCode')

  useEffect(() => {
    if (storedCode) {
      setReferralCode(JSON.parse(storedCode))
    }
  }, [storedCode])



  // console.log(`approveTransactionConfirmations ${approveTransactionisFetched} transactionTransactionConfirmations ${transactionisFetched}`)
  const { isFetched: upgradeWaitForTransactionReceipt} = useWaitForTransactionReceipt({
    hash: registerTxHash,
  })
  const {isFetched: registerWaitForTransactionReceipt} = useWaitForTransactionReceipt({
    hash: upgradeTxHash,
  })
  const { isFetched: approveWaitForTransactionReceipt } = useWaitForTransactionReceipt({
    hash: approveTxHash,
  })
  // console.log(`approveWaitForTransactionReceipt ${approveWaitForTransactionReceipt} transactionWaitForTransactionReceipt ${transactionWaitForTransactionReceipt}`)
  const [currentLevel, setCurrentLevel,] = useState<number>(0)
  useEffect(() => {
    if (registerWaitForTransactionReceipt) {
      toast.success("Registration successful")
    }else if (upgradeWaitForTransactionReceipt) {
      toast.success("Upgrading successful")
    }else if (approveWaitForTransactionReceipt) {
      toast.success("Approval successful")
    }
  }, [upgradeWaitForTransactionReceipt, registerWaitForTransactionReceipt, approveWaitForTransactionReceipt])



  useEffect(() => {
    if (isRegisterError) {
      toast.error("Check Your Wallet balance and Try Again")
    }
    if (isApproveError) {
      setIsAllowed(false)
      toast.error("Check Your Wallet balance and Try Again")
    }
  }, [isRegisterError, isApproveError])


  const userInfomation = async () => {
    try {
      const res = await readContract(config,{
      address: byForexConfig.address as `0x${string}`,
      abi: byForexConfig.abi,
      functionName: 'userInfo',
      args: [userId as bigint],
    })
    // toast.success(Number(c.totalDeposit) as any)
    return res
  } catch (error) {
    console.error('Error fetching blockchain data:', error);
  }
  }
  useEffect(() => {
    userInfomation().then((e) => {
      const c = parseUserInfo(e as any || [])
      setCurrentLevel(Number(c.level))
      setInvestmentAmount(packages[Number(c.level)])
      setParsedUserInfo(c);
      setIsAllowed(false)
    })
  }, [userId])

  useEffect(() => {
    userInfomation().then((e) => {
      const c = parseUserInfo(e as any || [])
      setInvestmentAmount(packages[Number(c.level)])
      setCurrentLevel(Number(c.level))
      setParsedUserInfo(c);
      setIsAllowed(false)
    })
  }, [registerWaitForTransactionReceipt, upgradeWaitForTransactionReceipt]);
  
  useEffect(() => {
      if (approveWaitForTransactionReceipt) {
        handleInvest()
      }
  }, [approveWaitForTransactionReceipt]);
  

  return (
    <div className="">
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
            <p className="text-2xl py-4 text-white font-bold">Purchase Slot</p>
            <div className="bg-white w-full rounded-lg py-5 px-3 flex flex-col gap-5">
              <div className="w-full gap-2 justify-evenly flex flex-wrap">

                {packages.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => { setInvestmentAmount(item); setPackageId(index + 1); }}
                    disabled={(Number(parsedUserInfo.level)) !== (index)}
                    className={`py-2 px-4 rounded-md  font-semibold ${currentLevel === (index) ? 'bg-primary cursor-pointer text-white' : currentLevel > (index) ? 'bg-gray-300 text-gray-500 cursor-not-allowed bg-opacity-40' : 'bg-gray-400 cursor-not-allowed text-white'
                      }`}
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
                onClick={handleApprove}
                disabled={Number(parseEther(investmentAmount)) === 0 || isApprovePending || isRegisterPending || isUpgradePending || isAllowed}
                className={`w-full py-2 rounded-lg text-lg font-semibold bg-primary ${Number(parseEther(investmentAmount)) === 0 || isApprovePending || isRegisterPending || isUpgradePending ? "outline-none opacity-50 cursor-not-allowed" : isUpgradeError || isRegisterError ? "outline-none cursor-not-allowed bg-red-500 text-white" : "text-white cursor-pointer"}`}
              >
                {isApprovePending || isRegisterPending || isUpgradePending || isAllowed? "Processing..." : `Approve ${investmentAmount} USDT`}
              </button>
                {/* <p className="">{`${approveWaitForTransactionReceipt? "Approved" : "Not Approved"} ${approveWaitForTransactionReceipt}` }</p> */}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <p className="text-2xl py-4 text-white font-bold">Pool Claim</p>
            </div>
            <div className="bg-white w-full rounded-lg py-5 px-3">
              <div className="flex flex-col gap-3">
                {[parsedUserIncome.firstValue, parsedUserIncome.secondValue, parsedUserIncome.thirdValue, parsedUserIncome.fourthValue].map((poolBalance, index) => (
                  <div key={index} className="bg-neutral-200 flex justify-between p-2 rounded-lg">
                    <p className="text-lg font-semibold my-auto">Pool {index + 1}</p>
                    <p className="text-primary">
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
            <p className="text-2xl py-4  text-white font-bold">Income claim</p>
            <div className="flex flex-col gap-3">
              <div className=" bg-white w-full rounded-lg py-5 px-3 flex flex-col gap-5 ">
                <div className="flex justify-between">
                  <p className="font-bold text-lg">Total income claimed</p>
                  <p className="text-primary">${formatEther(parsedUserInfo.totalIncome)}</p>
                </div>
               
              </div>
            </div>
          </div>

          <div>
            <p className="text-2xl py-4  text-white font-bold">Referral link</p>
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

      </div>
    </div>

  )
}

export default Dashboard