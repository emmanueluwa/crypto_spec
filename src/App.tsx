import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import CryptoSummary from "./components/CryptoSummary";
import { Crypto } from "./types/Crypto";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
// import faker from "faker";
import type { ChartData, ChartOptions } from "chart.js";
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [cryptos, setCryptos] = useState<Crypto[] | null>(null);
  const [selected, setSelected] = useState<Crypto | null>();

  //chartjs
  const [data, setData] = useState<ChartData<"line">>();
  const [options, setOptions] = useState<ChartOptions<"line">>({
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  });

  useEffect(() => {
    const url = "";
    // "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en";

    axios.get(url).then((res) => {
      setCryptos(res.data);
    });
  }, []);

  return (
    <>
      <select
        onChange={(e) => {
          const c = cryptos?.find((x) => x.id === e.target.value);
          setSelected(c);
          // make new request and update data state
          const url = "";
          // `https://api.coingecko.com/api/v3/coins/${c?.id}/market_chart?vs_currency=usd&days=30&precision=daily`;
          axios.get(url).then((res) => {
            console.log("getting prices!", res.data);
            setData({
              labels: res.data.prices.map((price: number[]) => {
                // /1000 to work with milliseconds
                return moment.unix(price[0] / 1000).format("MM-DD");
              }),
              datasets: [
                {
                  label: "Dataset 1",
                  data: res.data.prices.map((price: number[]) => {
                    return price[1];
                  }),
                  borderColor: "rgb(255, 99, 132)",
                  backgroundColor: "rgba(255, 99, 132, 0.5)",
                },
              ],
            });
          });
        }}
        defaultValue="default"
      >
        {cryptos
          ? cryptos.map((crypto) => {
              return (
                <option key={crypto.id} value={crypto.id}>
                  {crypto.name}
                </option>
              );
            })
          : null}
        <option value="default">Choose an option</option>
      </select>
      {selected ? <CryptoSummary crypto={selected} /> : null}
      {data ? (
        <div style={{ width: 600 }}>
          <Line options={options} data={data} />
        </div>
      ) : null}
    </>
  );
}

export default App;
