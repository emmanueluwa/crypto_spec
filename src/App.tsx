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
  const [selected, setSelected] = useState<Crypto[]>([]);

  const [range, setRange] = useState<number>(30);

  /*
  //chartjs
  const [data, setData] = useState<ChartData<"line">>();
  const [options, setOptions] = useState<ChartOptions<"line">>({
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  });
  */

  useEffect(() => {
    const url =
      // "";
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en";

    axios.get(url).then((res) => {
      setCryptos(res.data);
    });
  }, []);

  /*

  useEffect(() => {
    if (!selected) return;
    // make new request and update data state
    const url =
      // "";
      `https://api.coingecko.com/api/v3/coins/${
        selected?.id
      }/market_chart?vs_currency=usd&days=${range}&${
        range === 1 ? `precision=hourly` : `precision=daily`
      }`;
    // `https://api.coingecko.com/api/v3/coins/${selected?.id}/market_chart?vs_currency=usd&days=${range}&precision=daily`;

    axios.get(url).then((res) => {
      console.log("getting prices!", res.data);
      setData({
        labels: res.data.prices.map((price: number[]) => {
          // /1000 to work with milliseconds
          return moment
            .unix(price[0] / 1000)
            .format(range === 1 ? "HH:MM" : "MM-DD");
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
      setOptions({
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text:
              `Price of ${selected?.name} over the last ` +
              range +
              (range === 1 ? ` day` : ` days`),
          },
        },
      });
    });
  }, [selected, range]);
  */

  useEffect(() => {
    console.log("SELECTED: ", selected);
  }, [selected]);

  function updateOwned(crypto: Crypto, amount: number): void {
    console.log("selected", selected);
    console.log("KEEEP GOING, updateOwned", crypto, amount);
    let temp = [...selected];
    //get the amounts owned of each selcted crypto currency
    let tempObject = temp.find((c) => c.id === crypto.id);
    if (tempObject) {
      tempObject.owned = amount;
      setSelected(temp);
    }
  }

  return (
    <>
      <select
        onChange={(e) => {
          const c = cryptos?.find((x) => x.id === e.target.value) as Crypto;
          setSelected([...selected, c]);
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
      {/* <select
        onChange={(e) => {
          setRange(parseInt(e.target.value));
        }}
      >
        <option value={30}>30days</option>
        <option value={7}>7days</option>
        <option value={1}>1day</option>
      </select> */}

      {selected.map((s) => {
        return <CryptoSummary updateOwned={updateOwned} crypto={s} />;
      })}

      {/* {selected ? <CryptoSummary crypto={selected} /> : null} */}
      {/* {data ? (
        <div style={{ width: 600 }}>
          <Line options={options} data={data} />
        </div>
      ) : null} */}

      {/* AGGREGATING TOTAL VALUE OF OWNED COINS  */}
      {selected
        ? "Your portfolio is worth: $" +
          selected
            .map((selectedCoin) => {
              if (isNaN(selectedCoin.owned)) {
                return 0;
              }

              return selectedCoin.current_price * selectedCoin.owned;
            })
            .reduce((prev, current) => {
              // add up value and return it, next iteration is asigned to previous
              console.log("prev + current", prev, current);
              return prev + current;
            }, 0)
            .toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
        : null}
    </>
  );
}

export default App;
