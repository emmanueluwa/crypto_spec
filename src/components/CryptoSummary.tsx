import { Crypto } from "../types/Crypto";
import { useState, useEffect } from "react";

export type AppProps = {
  crypto: Crypto;
};

export default function CrptoSummary({ crypto }: AppProps): JSX.Element {
  const [amount, setAmount] = useState<string>("0");

  useEffect(() => {
    console.log(crypto.name, amount, crypto.current_price * parseFloat(amount));
  });

  return (
    <>
      <div>
        <span>{crypto.name + " $" + crypto.current_price} </span>
        <input
          type="number"
          style={{ margin: 10 }}
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />
        <p>
          $
          {(crypto.current_price * parseFloat(amount)).toLocaleString(
            undefined,
            { minimumFractionDigits: 2, maximumFractionDigits: 2 }
          )}
        </p>
      </div>
    </>
  );
}
