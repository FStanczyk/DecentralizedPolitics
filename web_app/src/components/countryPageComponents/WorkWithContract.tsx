import { constants, utils } from "ethers"
import {useEthers} from "@usedapp/core"
import {Contract} from "@ethersproject/contracts"
import networkMapping from "../../chain-info/deployments/map.json"

const ABI =[
    "function buyCountry(uint256 id) payable",
    "function putOnSaleOrOffSale(uint256 id)",
    "function changePrice(uint256 id, uint256 _price)",
    "function getStoredEther()external"
]
export default function WorkWithContract(){

    const { chainId } = useEthers() 

    //gets the hash of deployment of the contract
    const CountriesAddress = chainId ? networkMapping[String(chainId)]["Politics"][0] : constants.AddressZero
    const countriesInterface = new utils.Interface(ABI)
    const CON = new Contract(CountriesAddress, countriesInterface)
    return CON
}