import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";

const Navbar = () => {
    const navigate = useNavigate();

    const { isConnected } = useAccount();
  
    
  return (
    <div className="fixed top-0 w-full flex justify-between py-2 px-3 md:py-4 md:px-28 backdrop-blur-md z-40">
      <div className="my-auto">
        <div className="text-2xl md:text-4xl my-auto font-bold">
          <span className="text-primary">By</span><span className="text-white">Forex</span>
        </div>
      </div>{
        isConnected &&
      <div className="flex gap-3 flex-wrap max-sm:hidden">
        <button onClick={()=> navigate('/investments')} className="my-auto hover:text-primary transition-colors text-white cursor-pointer">Investment</button>
        <button onClick={()=> navigate('/referals')} className="my-auto hover:text-primary transition-colors text-white cursor-pointer">Referals</button>
        <button onClick={()=> navigate('/dashboard')} className="my-auto hover:text-primary transition-colors text-white cursor-pointer">Dashboard</button>
      </div>}
      <div className="gap-2 flex">
        <ConnectButton />
      </div>
    </div>
  )
}

export default Navbar;