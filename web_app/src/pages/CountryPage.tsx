import Header from '../components/Header'   
import { Link } from "react-router-dom";
import {GetChosenInfo} from "../components/CountryBoard"
import {GetClearId} from "../components/CountryBoard"
import PutOnOffSale from "../components/countryPageComponents/PutOnOffSale"
import BuyCountryButton from "../components/countryPageComponents/BuyButton"
import SetPrice from "../components/countryPageComponents/PriceSetInput"
import {useEthers} from "@usedapp/core"
import{useState} from 'react'


export function BackToCountries(){
    const entrance = Date.now()
    const [text, setText] = useState("back")

    const [able, setAble] = useState(false);
    const handleClick =  () =>{
        if(Date.now() < entrance + 5000){
            setAble(false);
            setText("wait 5 sec and click again")
        }
    }
    const handleOver =   () =>{
        if(Date.now() > entrance + 5000){
            setText("back")
            setAble(true);
        }
    }
    
    return(
        <span className="countriesButton" style={{float: 'right'}}onClick={handleClick} onMouseOver={handleOver}>       
           <Link to={able === true ? "/countries" : "/country"}>{text}</Link>
        </span>
    )
}


export default function CountryPage(){
    const{account} = useEthers() 


    let info = GetChosenInfo()
    const name = info[0]
    const price = info[1]
    const power = info[2]
    const president = info[3]
    const onSales = info[4]
    const hash = info[5]
    const id = GetClearId();
    return(

        <div className="mainCointainer">
        <Header />
        <BackToCountries />
        <span className="namex">{name}</span>
        {onSales && <span className="onSale" id="xsale">on sale</span>}
        <div className="pricexpower">price: {price}
        <img className= "eth" alt='not loaded' src='../img/eth.png'/>
        </div>
        
        <div className="pricexpower">power: {power}</div>
        <div className="presidentxhash">current president:  {president}</div>
        <div className="presidentxhash">country hash: {hash}</div>
        <BuyCountryButton id={id}/>
        <PutOnOffSale id={id}/>
        {account === president &&  <SetPrice id={id}/>}       
        </div>
    )
}