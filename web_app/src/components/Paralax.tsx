import { useEffect, useState } from "react"
export default function ParalaxBackground(){
    const [offsetY, setOffsetY] = useState(0);

    const handleScroll = () =>{
        setOffsetY(window.pageYOffset)
    }
    useEffect(()=>{
        window.addEventListener("scroll", handleScroll);

        return () =>window.removeEventListener("scroll", handleScroll);
    },[])


    return(
        <div className="paralaxBackground">
            <img src="./stars/stars_tiny.png" alt="_"   className= "center" id="tinyStars"
            style={{transform: `translateY(${offsetY * 0.3}px)`}}/>
            <img src="./stars/stars_medium.png" alt="_" className= "center"
             style={{transform: `translateY(${offsetY * 0.5}px)`}}/>
            <img src="./stars/stars_big.png" alt="_"    className= "center"
             style={{transform: `translateY(${offsetY * 0.6}px)`}}/>
        </div>

    )
}