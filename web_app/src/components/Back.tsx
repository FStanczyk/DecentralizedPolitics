import { Link } from "react-router-dom";
import {useState}from"react"
export default function Back(){
    return(
        <span className="countriesButton" >
           <Link to="/">back</Link>
        </span>
    )
}

export  function Back2(){
    const entrance = Date.now()
    const [text, setText] = useState("back")

    const [able, setAble] = useState(false);
    const handleClick =  () =>{
        if(Date.now() < entrance + 10000){
            setAble(false);
            setText("wait 10 sec and click again")
        }
    }
    const handleOver =   () =>{
        if(Date.now() > entrance + 10000){
            setText("back")
            setAble(true);
        }
    }
    
    return(
        <span className="countriesButton" style={{float: 'right'}}onClick={handleClick} onMouseOver={handleOver}>       
           <Link to={able === true ? "/" : "/countries"}>{text}</Link>
        </span>
    )
}