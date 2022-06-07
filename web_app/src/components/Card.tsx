import {useEthers } from "@usedapp/core"
import helperConfig from "../helper-config.json"
import networkMapping from "../chain-info/deployments/map.json"
import { constants, ethers } from "ethers"
import {useState} from "react"
     //ABIof the smart contract
     const ABI =[
        "function getName(uint256 id) view returns(string)",
        "function getPrice(uint256 id) view  returns(uint256)",
        "function getPower(uint256 id) view  returns(uint256)",
        "function getHash(uint256 id) view  returns(bytes32)",
        "function getPresident(uint256 id) view  returns(address)",
        "function getOnSale(uint256 id) view  returns(bool)",
    ]
export const Card = ({i}:{i:number}) =>{
        //gets the chainId
        const { chainId } = useEthers() 
    
        //gets the name of network connected
        const networkName = chainId ? helperConfig[chainId] : "dev"
    
         //gets the hash of deployment of the contract
        const CountriesAddress = chainId ? networkMapping[String(chainId)]["Politics"][0] : constants.AddressZero
    
    
    
        const [cInfo, setcInfo] = useState({
            name:"_",
            price: 0,
            power: 0,
            president: "_",
            id: 0,
            onSale: false,
            hash: 0     
        })
    
        const getCountryInfo = async ()=>{
           //inufura Provider
            const provider = new ethers.providers.InfuraProvider(networkName,{
                projectId: process.env.WEB3_INFURA_PROJECT_ID,
                projectSecret: process.env.WEB3_INFURA_SECRET
            })
             //Calling the contract via address of the deployment, ABI and provider (address ofsome node)
            const CON = new ethers.Contract(CountriesAddress, ABI, provider )
            const cName = await CON.getName(i)
            const cPres= await CON.getPresident(i)
            const cPower = await CON.getPower(i)
            const cPrice = await CON.getPrice(i)
            const cHash = await CON.getHash(i)
            const cSale = await CON.getOnSale(i)
             setcInfo({
                name: cName,
                price: cPrice,
                power: cPower,
                president:cPres,
                id: 1,
                onSale: cSale,
                hash: cHash
            })
        }
    if(cInfo.name==="_"){
     getCountryInfo()
    }
    return(
   
        <div className="cardContainer">
            {cInfo.onSale===true && <div className="onSale">on sale</div>}
            <div className="main">
                <div className="title>">{cInfo.name}</div>
                <br></br>
                <div className="price>"> {ethers.utils.formatEther(cInfo.price).toString()}
                <img className= "eth" alt='not loaded' src='./img/eth.png'/> 
                </div>
            </div>
            <div className="power">power: {cInfo.power.toString()}</div>
            <div className="president">
                {cInfo.president}
            </div>
        </div>
    )
}