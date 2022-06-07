import Header from "../components/Header";
import {Back2} from "../components/Back";
import ConnectButton from "../components/ConnectButton";
import { Board } from "../components/CountryBoard";
import ParalaxBackground from '../components/Paralax'
import { useEthers } from "@usedapp/core";
import helperConfig from "../helper-config.json";
import networkMapping from "../chain-info/deployments/map.json";
import { constants, ethers } from "ethers";
import { useState } from "react";
import UserPanel from "../components/UserInfoPanel"

const ABI = ["function getNonce()view external returns(uint256)"];
const GetNonce = () => {
  const[pending, setPending] = useState(false)
  const { chainId } = useEthers();
  
  //gets the name of network connected
  const networkName = chainId ? helperConfig[chainId] : "dev";

  //gets the hash of deployment of the contract
  const CountriesAddress = chainId
    ? networkMapping[String(chainId)]["Politics"][0]
    : constants.AddressZero;

  const [nonce, setNonce] = useState(0);

  const Nonce = async () => {
    setPending(true)
    //inufura Provider
    const provider = new ethers.providers.InfuraProvider(networkName, {
      projectId: process.env.WEB3_INFURA_PROJECT_ID,
      projectSecret: process.env.WEB3_INFURA_SECRET,
    });
    //Calling the contract via address of the deployment, ABI and provider (address ofsome node)
    const CON = new ethers.Contract(CountriesAddress, ABI, provider);
   
    const x = await CON.getNonce();
    setNonce(x);
  };
  if (pending === false) {
    Nonce();
  }
  return nonce;
};
function List() {
  //creates the list with all the countries
  const currrent_nonce = GetNonce();
  const list = [];
  let j = 0
 
  for (j ; j < currrent_nonce; j++) {
    list.push(<Board key={j} i={j} />);
  }
  return <>{list}</>;
}
export default function Countries() {
  const { active } = useEthers();
  const isConnected = active;

  return (
    <>
      <ParalaxBackground />
      <div className="mainTitle">DECENTRALIZED POLITICS</div>
     <UserPanel />
      <ConnectButton />
      <div className="mainCointainer">
        <Header />
        <Back2 />
        <div id="listText">
          List of countries
          <br></br>
          <span style={{ color: "var(--green)" }}>on sale</span>
          <> -- </>
          <span style={{ color: "var(--blue)" }}> not on sale</span>
        </div>
        <List />
        {!isConnected && (
          <div style={{ color: "var(--white)" }}>
            Connect to metamask rinkeby testnet to see countries here!
          </div>
        )}
      </div>
    </>
  );
}

//<div className = "changeSiteContainer">
//<span className="changeSite" onClick={()=>{site++; console.log(site)}}>{'<'} </span>
//<span className="changeSite">{'>'} </span>
//</div>