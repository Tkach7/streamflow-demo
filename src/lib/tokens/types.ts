export type TokenBase = {
  mint: string;
  amount: number;
  uiAmount: string;
  decimals: number;
  isNative: boolean;
};

export type Token = TokenBase & {
  name: string;
};
