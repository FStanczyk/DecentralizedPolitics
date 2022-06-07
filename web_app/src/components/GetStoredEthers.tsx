import { useContractFunction } from "@usedapp/core";
import { useState } from "react";
import WorkWithContract from "./countryPageComponents/WorkWithContract";
import { useEthers } from "@usedapp/core";

export default function GetEthers() {
  const [busy, setBusy] = useState(false);

  const { active } = useEthers();
  const isConnected = active;

  let CON = WorkWithContract();
  const { send } = useContractFunction(CON, "getStoredEther");

  const handleClick = async () => {
    setBusy(true);
    await send();
    setBusy(false);
    setModal(false);
  };
  const [modal, setModal] = useState(false);
  return (
    <>
      {isConnected === true ? (
        <>
          {busy === false ? (
            <>
              <div
                className="getEtherButton"
                onClick={handleClick}
                onMouseOver={() => setModal(true)}
                onMouseLeave={() => setModal(false)}
              >
                Get stored ethers
              </div>
              {modal === true && (
                <div className="popUp" id="getEtherModal">
                  If you are the owner, this function will allow
                  <br></br>you to get all ether stored in the contract
                </div>
              )}
            </>
          ) : (
            <div className="getEtherButton">pending...</div>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
}
