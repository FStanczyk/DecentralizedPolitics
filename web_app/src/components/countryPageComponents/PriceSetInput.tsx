import WorkWithContract from "./WorkWithContract"
import {useContractFunction } from "@usedapp/core";
import { useState } from "react";
import {utils} from "ethers"
let price = 0;
function PriceHandler({i}:{i:number}){

    const [Price, SetPrice] = useState(0);  
    if(Price === 0 && price!== 0){price = 0}
    function handlePricePlus(){
        if(Price < 9){
        SetPrice(prev => prev + 1)
        price = price+ i;
        }
    }

    function handlePriceMinus(){
        if(Price>0){
        SetPrice(prev => prev - 1)
        price = price- i;
        }
    }

    return(
        <span className="priceHandler">
            <button className="plusMinus" onClick={handlePricePlus}> + </button>
            <div className="number">{Price}</div>
            <button className="plusMinus" onClick={handlePriceMinus}> - </button>
        </span>
    )
}

function SetPriceButton({id}:{id:number}){
    const[busy, setBusy] = useState(false)

    let CON = WorkWithContract()
    const {send} = useContractFunction(CON, "changePrice")

    const handleClick = async () => {
        setBusy(true)
        let ethPrice = price/1000
        if(id && ethPrice){
           await send(id, utils.parseEther(ethPrice.toString()))
        }
        setBusy(false)
        console.log(ethPrice);
    }

    return(
        <>
        {busy === false ?
        <div className="setPriceButton" onClick={handleClick}>
            set
        </div>:
        <div className="setPriceButton">pending...</div>

        }
        </>
    )
}
export default function SetPrice({id}:{id:number}){

    return (
        <div className="containerPrice">
            <PriceHandler i = {10000} />
            <PriceHandler i = {1000}/>
            <div id="dot"> </div>
            <PriceHandler i = {100} />
            <PriceHandler i = {10}/>
            <PriceHandler i = {1}/>
            <div className="currency">ETH</div>
            <SetPriceButton id = {id}/>
        </div>     
    )
}