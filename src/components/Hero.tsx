import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect } from "react";

const Hero = () => {
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const referralCode = searchParams.get('referral') || '1000';
    localStorage.setItem('referralCode', referralCode);
  }, []);

  return (
    <div className="py-2 md:py-0 px-3 overflow-y-auto min-h-[calc(100vh-6rem)] w-full container mx-auto flex flex-col items-center justify-center">
      <div className="flex flex-col gap-5 items-center md:p-20 max-w-[900px] p-5 border-green-400 border rounded-lg border-opacity-20 bg-black bg-opacity-70 backdrop-blur-md">
        <h1 className="font-bold text-3xl md:text-5xl text-center text-white">
          Welcome to <span className="text-green-400">GRich</span>
        </h1>
        <p className="text-gray-300 text-center text-sm md:text-base leading-relaxed">
          Experience a fully decentralized platform with no admin control, where all income is automatically distributed through smart contracts. Transparent, secure, and fair – our system empowers you to grow your network and earn in real time without intermediaries.
        </p>
        <div className="mt-4">
          <ConnectButton />
        </div>
      </div>
      <div className="absolute bottom-4 text-center">
        <p className="text-yellow-400/60 text-sm">&copy; {new Date().getFullYear()} GRich. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Hero;