import { Crypto } from "../types/Crypto";

export type AppProps = {
  crypto: Crypto;
};

export default function CrptoSummary({ crypto }: AppProps): JSX.Element {
  return <p>{crypto.name + " $" + crypto.current_price}</p>;
}
