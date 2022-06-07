import {GetChosenInfo} from "../../components/CountryBoard"
import {useEthers} from "@usedapp/core"

export default function RequireToBeOwner(){
    const{account} = useEthers()
    let info = GetChosenInfo()
    const president = info[3]
    return(
        <>
        {president === account  ?
        <></>
            :
        <div className="popUp">
            You have no permission to this function.
        </div>
        }
        </>
    )
}