import { List } from "antd";
import { useEventListener } from "eth-hooks/events/useEventListener";
import { Address, TokenBalance } from "../components";
import { useStaticJsonRPC } from "../hooks";
import { NETWORKS } from "../constants";

const targetNetwork = NETWORKS.goerli;




 

  // <Events
  //   contracts="0x2F6A34a7EFf558e3735D68548C0de20e378e6f3F"
  //   contractName="Balloons"
  //   eventName="approve"
  //   localProvider="https://goerli.infura.io/v3/183e2faa9f0448dda81629460b3d40e8"
   
  //   startBlock={1}
  // />


export default function Events({ contracts, contractName, eventName, localProvider, mainnetProvider, startBlock }) {
  // 📟 Listen for broadcast events
  
  const events = useEventListener(contracts, contractName, eventName, localProvider, startBlock);
 
  return (
    <div style={{ width: 600, margin: "auto", marginTop: 32, paddingBottom: 32 }}>
      <h2>
        {eventName} Events
        <br />
        {
          eventName === "EthToTokenSwap"
          ? " ⟠ -->🎈 Address | Trade | AmountIn | AmountOut"
          : eventName === "TokenToEthSwap"
          ? "🎈-->⟠ Address | Trade | AmountOut | AmountIn"
          : eventName === "LiquidityProvided"
          ? "➕ Address | Liquidity Minted | Eth In | Balloons In"
          : "➖ Address | Liquidity Withdrawn | ETH out | Balloons Out "
          ? eventName === "approve" :
          "Address | Approval | Amount" }
      </h2>
      <List
        bordered
        dataSource={events}
        renderItem={item => {
          if (!item || !item.args || item.args.length === 0) {
            return (
              <List.Item key={item.blockNumber + "_"}>
                Event without arguments
              </List.Item>
            );
          }
          return (
            <List.Item key={item.blockNumber + "_" + item.args[0].toString()}>
              <Address address={item.args[0]} ensProvider={mainnetProvider} fontSize={16} />
              {item.args[1].toString().indexOf("E") == -1 ? (
                <TokenBalance balance={item.args[1]} provider={localProvider} />
              ) : (
                `${item.args[1].toString()}`
              )}
              <TokenBalance balance={item.args[2]} provider={localProvider} />
              <TokenBalance balance={item.args[3]} provider={localProvider} />
            </List.Item>
          );
        }}
      />
    </div>
  );
}
