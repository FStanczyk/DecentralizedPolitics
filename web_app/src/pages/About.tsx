import Header from '../components/Header'
import Back from '../components/Back'
import ConnectButton from '../components/ConnectButton'
import Africa from '../components/Africa'
import ParalaxBackground from '../components/Paralax'
export default function About(){

    return(
        <>
        <ParalaxBackground />
        <div className="mainTitle">DECENTRALIZED POLITICS</div>
        <ConnectButton />
        <div className="mainCointainer">
            <Header />
            <Back />
            <br></br>
            <div className="aboutText">
                Decentralized Politics is a basic platform to buy virtual assets called "Countries". However it is 
                not a NFT. The main concept is that owner off the contract mints a country and sets it's starting price, name and
                power. Then anyone can buy the country and set the new price. You can also list on/off sale, so 
                you don't have to be afraid that someone buys your Country.
                <br></br>
                <br></br>
                So the name, price and power are initially set by the owner but only the name will remain unchanged.
                For now (version 0.0.1), the power can be only decremented and it happens when the president is 
                changed. The price can be freely changed by the president of Country.
                <br></br>
                <br></br>
                This platform works on Rinkeby testnet, and the website may be actualized to newer versions of the 
                conract (which means a "restart" of the website data). 
                <br></br>
                <br></br>
                Created by Filip Stanczyk
                </div>
            <Africa />
        </div>
        
        </>
    )
}