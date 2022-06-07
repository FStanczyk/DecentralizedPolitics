import WorkWithContract from "./WorkWithContract"
import {GetClearPrice} from "../../components/CountryBoard"
import {useContractFunction } from "@usedapp/core";
import {utils} from "ethers"
import {GetChosenInfo} from "../../components/CountryBoard"
import {useEthers} from "@usedapp/core"
import { useState } from "react";

function PopUpInfo(){
    let info = GetChosenInfo()
    const onSales = info[4]
    return(
        <>{onSales === true ? 
        <div className="popUp">
            Are you sure you want to buy YOUR  OWN country?
        </div>:
        <></>
        }
        </>
    )
}
export default function BuyCountry( {id}:{id:number} ){
    const[busy, setBusy] = useState(false)
    const{account} = useEthers() 
    let info = GetChosenInfo()
    const president = info[3]
    const onSales = info[4]

    let CON = WorkWithContract()
     
     const {send} = useContractFunction(CON, "buyCountry")

     const etherAmount = GetClearPrice()

     const handleClick = async () => {
         setBusy(true)
         if(id){
            await send(id, { value: utils.parseEther(etherAmount.toString())})
         }
         setBusy(false)
         setModal(false)
     }

     const [modal, setModal] = useState(false)

     return (
    <>  
        {busy === false ?   //If the transaction is not pending
        
        <>
        { president === account ?
        <>
        <span className={onSales===true ? "buyButton" : "buyButtonNotActive"}
        onClick={handleClick} 
        onMouseOver={()=>setModal(true)}
        onMouseLeave={()=>setModal(false)}>
            buy
        </span>
        {modal===true && <PopUpInfo />}
        </>
        : 

         <span className={onSales===true ? "buyButton" : "buyButtonNotActive"}  onClick={handleClick} >
             buy 
        </span>
        }
        </>:
        //if the transaction is pending
        <span className={onSales===true ? "buyButton" : "buyButtonNotActive"}>pending...</span>
        }
    </>
     )
 }