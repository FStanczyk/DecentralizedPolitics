import {useEthers } from "@usedapp/core"
import helperConfig from "../helper-config.json"
import networkMapping from "../chain-info/deployments/map.json"
import { constants, ethers } from "ethers"
import { Link } from "react-router-dom";
import {useState} from "react"
     //ABIof the smart contract
     const ABI =[
        "function getName(uint256 id) view returns(string)",
        "function getPrice(uint256 id) view  returns(uint256)",
        "function getPower(uint256 id) view  returns(uint256)",
        "function getHash(uint256 id) view  returns(bytes32)",
        "function getPresident(uint256 id) view  returns(address)",
        "function getOnSale(uint256 id) view  returns(bool)",
        "function getId(uint256 id)view returns(uint256)"
    ]

    //holders for actually chosen country specifics
    let pName = "_"
    let pPrice = 0
    let pPower = 0
    let pPresident = "_"
    let pOnSale = false
    let pHash = 0
    let pId = 0
export const Board = ({i}:{i:number}) =>{
    const[pending, setPending] = useState(false)
            //get info if connected to wallet
        const{active} = useEthers() 
        const isConnected = active;
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
            setPending(true)
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
            const cId: number = await CON.getId(i)

             setcInfo({
                name: cName,
                price: cPrice,
                power: cPower,
                president:cPres,
                id: cId,
                onSale: cSale,
                hash: cHash
            })
        }
        
    if(pending === false){
     getCountryInfo()
    }
    console.log(pPrice.toString())
    return(
        (isConnected ?
            <Link to="/country">
                <div className="panelContainer" onClick={()=>{
                    pName = cInfo.name
                    pPrice = cInfo.price
                    pPower = cInfo.power
                    pPresident = cInfo.president
                    pOnSale = cInfo.onSale
                    pHash = cInfo.hash
                    pId = cInfo.id
                     }}>
                    <div className={cInfo.onSale?"panelBorderActive":"panelBorder"}>
                <span className="panelTitle">{cInfo.name}</span>
                    <span className="panelPrice"> {ethers.utils.formatEther(cInfo.price).toString()}
                    <img className= "eth" alt='not loaded' src='./img/eth.png'/> 
                </span>
                    <span className="panelPower">power: {cInfo.power.toString()}</span>
                    <span className="panelPresident"> {cInfo.president}</span>
                    </div>
                </div>
            </Link>:
        <div>Connect to metamask to see countries!</div>)
    )
}

export function GetChosenInfo(){
    const info = [pName, ethers.utils.formatEther(pPrice).toString(), pPower.toString(),
         pPresident, pOnSale, pHash, pPrice]
    return info
}

//we need this function to get id with type "number" (not "string | number | boolean")
export function GetClearId(){
    const id = pId;
    return id;
}
export function GetClearPrice(){
    const price = pPrice;
    return ethers.utils.formatEther(price);
}