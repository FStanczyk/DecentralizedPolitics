import Header from "../components/Header";
import Back from "../components/Back";
import ConnectButton from "../components/ConnectButton";
import Africa from "../components/Africa";
import { useState } from "react";
import ParalaxBackground from '../components/Paralax'
import networkMapping from "../chain-info/deployments/map.json";

interface FullName {
  question: string;
  answer: string;
}

function Question(props: FullName) {

  let [showAnswer, setShowAnswer] = useState(false);

  return (
    <div
      className="questionContainer"
      onMouseOver={() => setShowAnswer(true)}
      onMouseLeave={() => setShowAnswer(false)}
    >
      <div className="question">{props.question}</div>
      {showAnswer === true && <div className="answer">{props.answer}</div>}
    </div>
  );
}
export default function About() {
  
    //gets the hash of deployment of the contract
    const CountriesAddress = networkMapping[String(4)]["Politics"][0]
  return (
    <>
    <ParalaxBackground />
      <div className="mainTitle">DECENTRALIZED POLITICS</div>
      <ConnectButton />
      <div className="mainCointainer">
        <Header />
        <Back />
        <br></br>
        <br></br>
        <Question question={"What is Decentralized Politics?"} answer={"Decentralized Politics is a project made by Filip Stanczyk. It stands as a platform to buy and sell abstract countries. It works only on testnet Rinkeby, so please feel free to try ot on!"} />
        <Question question={"How can I start?"} answer={"Simply connect your metamask and start buying countries, then you can change their price and maybe put in on sale again? There is not to much to do to be honset, however I plan to add some more functionalities."} />
        <Question question={"Why it is NOT a NFT?"} answer={"Because it is created with different standards than ERC721 or other NFT standards. You can read more in the next question..."} />
        <Question question={"Rules?"} answer={"Well, the most rigid one is that only the owner of the contract can mint countries (no, you can not add your own). After the mint, country is by default set on 'onSale' and it belongs to the contract address. After it is sold, contract recieves ether and the president changes. Owner of the contract can then withdraw stored ether with a button 'Get stored ethers'. Country bought from other address than contracts of course makes ether being transfered to the seller."}/>
        <Question question={"Are countries always available to buy?"} answer={"No. You can choose to put on/of sale your country."}/>
        <Question question={"What is the address of the contract? Is it verified on Etherscan?"} answer={`The address is ${CountriesAddress}, and yes, it is verified on Etherscan`}/>
        <Africa />
      </div>
    </>
  );
}
