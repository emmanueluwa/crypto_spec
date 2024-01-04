import { Crypto } from "../types/Crypto";
import { useState, useEffect } from "react";

export type AppProps = {
  crypto: Crypto;
  updateOwned: (crypto: Crypto, amount: number) => void;
};

export default function CrptoSummary({
  crypto,
  updateOwned,
}: AppProps): JSX.Element {
  const [amount, setAmount] = useState<number>(NaN);

  useEffect(() => {
    console.log(crypto.name, amount, crypto.current_price * amount);
  });

  /* 
  ***pushing value in component to parent
  - pass down a function from the parent
  - take it in as a prop inside child component
  - invoke function when change is needed (SET PARENT STATE)

  */

  return (
    <>
      <div>
        <span>{crypto.name + " $" + crypto.current_price} </span>
        <input
          type="number"
          style={{ margin: 10 }}
          value={amount}
          onChange={(e) => {
            setAmount(parseFloat(e.target.value));
            //***setting parent state
            updateOwned(crypto, parseFloat(e.target.value));
          }}
        />
        <p>
          {isNaN(amount)
            ? "$0.00"
            : "$" +
              (crypto.current_price * amount).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
        </p>
      </div>
    </>
  );
}
