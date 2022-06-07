import { useEthers } from "@usedapp/core";

export default function UserPanel() {
  const { account } = useEthers();

  return (
    <div className="userPanelContainer">
      <div className="account">
        {" "}
        Connected account: <br></br>
        {account}{" "}
      </div>   
       </div>
  );
}
