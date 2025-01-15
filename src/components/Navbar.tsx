import { createAppKit } from "@reown/appkit";
import {SolanaAdapter} from "@reown/appkit-adapter-solana/react";
import { solana, solanaTestnet, solanaDevnet } from '@reown/appkit/networks'
import {PhantomWalletAdapter,SolflareWalletAdapter} from "@solana/wallet-adapter-wallets";

import { AppKitProvider, AppKitAccountButton } from "@reown/appkit";
import { solanaConnectors } from "@reown/appkit/chains";


export const projectId = import.meta.env.VITE_PROJECT_ID

if (!projectId) {
    console.log(projectId)
    throw new Error("Project id not defined")
}

export const networks = [solana, solanaTestnet, solanaDevnet]

export const solanaWeb3JsAdapter = new SolanaAdapter({
    wallets: [new PhantomWalletAdapter(), new SolflareWalletAdapter()]
})

const metadata = {
    name: "SwapGard",
    description: "Swap Program",
    url: "https://exampleapp.com",
    icons: ["https://avatars.githubusercontent.com/u/37784886"]
}

const modal = createAppKit({
  adapters: [solanaWeb3JsAdapter],
  projectId,
  networks: [solana, solanaTestnet, solanaDevnet],
  metadata,
  enableWalletConnect:false,
  features:{
    email:false,
    socials:[]
  },
  themeMode: 'dark',
})


const Navbar = () => {
  return (
    <div className="p-5 flex justify-between items-center">
      <div>
        <p className="font-black text-xl">SwapGard</p>
      </div>
      <div>
      <div>
        <div className="flex justify-center items-center p-4">
        <appkit-account-button/>
      </div> 
       
    </div>
      </div>
    </div>
  );
};

export default Navbar;
