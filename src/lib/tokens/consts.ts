// https://solscan.io/token/So11111111111111111111111111111111111111112
// todo: Find a way to fetch Solana token

import { Token } from "./types";

const SolanaToken: Token = {
  name: "SOL",
  mint: "So11111111111111111111111111111111111111112",
  isNative: false,
  amount: 0,
  decimals: 9,
  uiAmount: "0",
};

export const getSolanaToken = (amount: number): Token => {
  const val = amount / Math.pow(10, SolanaToken.decimals);
  return { ...SolanaToken, amount: val, uiAmount: val.toString() };
};
