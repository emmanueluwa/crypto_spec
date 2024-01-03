import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

export type Crypto = {
  ath: number;
  atl: number;
  current_price: number;
  id: string;
  name: string;
  high_24h: number;
  low_24h: number;
};

function App() {
  const [cryptos, setCryptos] = useState<Crypto[] | null>(null);

  useEffect(() => {
    const url =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en";

    axios.get(url).then((res) => {
      setCryptos(res.data);
    });
  }, []);

  return (
    <>
      <h1>
        {cryptos
          ? cryptos.map((crypto) => {
              return <p>{crypto.name + " $" + crypto.current_price}</p>;
            })
          : null}{" "}
      </h1>
    </>
  );
}

export default App;