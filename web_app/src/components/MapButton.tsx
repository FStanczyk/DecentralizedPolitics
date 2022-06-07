import {useState} from 'react'
export default function Map(){
    const [showModal, setShowModal] = useState(false)

    return(
        <>
        <span className="countriesButton" 
        onMouseOver={()=>setShowModal(true)}
        onMouseLeave={()=>setShowModal(false)}>map</span>
        {showModal === true && 
        <div style={{
            position: 'absolute', 
            backgroundColor: 'white',
            borderStyle: 'solid',
            borderColor: 'black',
            marginLeft: '110px'
            }}>coming soon...
        </div>}
        </>
    )
}