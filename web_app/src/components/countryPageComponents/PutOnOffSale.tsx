import WorkWithContract from "./WorkWithContract"
import {useContractFunction } from "@usedapp/core";
import {GetChosenInfo} from "../../components/CountryBoard"
import {useEthers} from "@usedapp/core"
import { useState } from "react";
import RequireToBeOwner from "./Requirement"

export default function PutOnOffSale({id}:{id:number} ){
    const[busy, setBusy] = useState(false)
    const{account} = useEthers() 
    let info = GetChosenInfo()
    const president = info[3]
    //console.log(president)
    const onSales = info[4]

    let CON = WorkWithContract()
    const {send} = useContractFunction(CON, "putOnSaleOrOffSale")
    const handleClick = async () => {
        setBusy(true)
        if(id){
           await send(id)
        }
        setBusy(false)
        setModal(false)
    }
    const [modal, setModal] = useState(false)
    return(
        <>
        {busy === false ? 
        <>
        {onSales===true ?
        <>
        <span className = {president === account ? "changeButton": "changeButtonNotActive" } onClick={handleClick}
        onMouseOver={()=>setModal(true)}
        onMouseLeave={()=>setModal(false)}>
            put of sale
        </span>
        {modal===true && <RequireToBeOwner />}
        </>
        :
        <>
        <span className =  {president === account ? "changeButton": "changeButtonNotActive" } onClick={handleClick}
        onMouseOver={()=>setModal(true)}
        onMouseLeave={()=>setModal(false)}>
            put on sale
        </span>
        {modal===true && <RequireToBeOwner />}
        </>
        }
        </>:
        <span className =  {president === account ? "changeButton": "changeButtonNotActive" }>pending...</span>
        }     
        </>
    )
}