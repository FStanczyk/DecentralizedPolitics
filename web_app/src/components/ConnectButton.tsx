import React from 'react'
import { useEthers } from "@usedapp/core"

export default function ConnectButton(){
    const{account, activateBrowserWallet } = useEthers()

    const isConnected = account !== undefined

    return(
        <div>
            <div className="connectButton">
                {isConnected ?  (
                <div className="connectButtonBorder"> 
                <img className="walletImg" alt = "not loaded" src="./img/wallet.png"></img>
                    metamask! 
                </div>
            ) : (
            <div className="connectButtonBorder"  onClick={()=>activateBrowserWallet()}> 
            <img className="walletImg" alt = "not loaded" src="./img/wallet.png"></img>
                    connect wallet
            </div>)
            }   
            </div>
        </div>
    )
}