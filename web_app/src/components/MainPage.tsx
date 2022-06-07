import Header from './Header'
import { Card } from './Card'
import ConnectButton from './ConnectButton'
import Countries from './CountriesButton'
import Map from './MapButton'
import ParalaxBackground from './Paralax'
import GetEthers from './GetStoredEthers'
import {useEthers } from "@usedapp/core"
import Africa from './Africa'
import Footer from './Footer'
let cardsOnSite = 14
export default function MainPage(){
    const{account ,active} = useEthers() 
    const isConnected = active;
    console.log({account}, isConnected) 
    return(
        <>
        <ParalaxBackground />
        <div className="mainTitle">DECENTRALIZED POLITICS</div>
        <ConnectButton />
        <GetEthers />
        <div className="mainCointainer">
            <Header />
            <Countries /><Map />
            <br></br>
            <Africa />

        </div>
        <br></br><br></br>
        <Footer/>
        </>
    )
}