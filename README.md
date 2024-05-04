# React + TypeScript + Vite

The simple demo app is based on [Streamflow sdk](https://github.com/streamflow-finance/js-sdk).

## Stack

- [@solana/web3.js](https://solana-labs.github.io/solana-web3.js/) (for working with wallet);
- [@streamflow/stream](https://github.com/streamflow-finance/js-sdk) (for stream creation)
- [@metaplex-foundation/js](https://www.npmjs.com/package/@metaplex-foundation/js) (for getting meta data of tokens).

## Development

```
npm install
npm run dev
```

## Fake token generation

1. $SOL: https://solfaucet.com/
2. $USDC/ $SOL: https://spl-token-faucet.com/?token-name=USDC-Dev

## Notes

There is a hardcoded Solana mint address, ideally it should be managed via api.
https://solscan.io/token/So11111111111111111111111111111111111111112

Stream creation is not working for this token.

Error:

```
failed to simulate transaction: {"InstructionError":[0,"InvalidAccountData"]}
```

Reason: Probably the reason is fake coin creation

## Screenshots

![Welcome screen](https://github.com/Tkach7/streamflow-demo/blob/main/examples/screen-1.png)

![Dashboard](https://github.com/Tkach7/streamflow-demo/blob/main/examples/screen-2.png)
