import React from 'react'
import { Link } from "react-router-dom";

function About(){
    return(
        <span className="aboutButton">
            <Link to="/about">about</Link>
        </span>
    )
}
function FaQ(){
    return(
        <span className="aboutButton">
            <Link to="/faq">FAQ</Link>
        </span>
    )
}
function GitHub(){
    return(
        <span className="gitHubButton" >
            <a href="https://github.com/FStanczyk">GitHub </a>
        </span>
    )
}

export default function Header(){

    return(
        <header className="Header">
        <About /> <FaQ /> <GitHub />
        </header>
    )
}