import {
  AccountInfo,
  Connection,
  ParsedAccountData,
  PublicKey,
} from "@solana/web3.js";
import { Metaplex } from "@metaplex-foundation/js";
import { Token, TokenBase } from "./types";

export const injectNameAndSymbolIntoTokens = async (
  tokens: TokenBase[],
  connection: Connection
): Promise<Token[]> => {
  const metaplex = new Metaplex(connection);
  const promisesWithMeta = tokens.map((t) => {
    const mintAddress = new PublicKey(t.mint);
    return connection.getAccountInfo(
      metaplex.nfts().pdas().metadata({ mint: mintAddress })
    );
  });
  const metaArray = await Promise.all(promisesWithMeta);
  const tokenPromises = metaArray.map((meta, index) => {
    if (meta === null) {
      return Promise.resolve({ ...tokens[index], name: `token-${index}` }); // todo: ex usdt has no address :(
    }

    return metaplex
      .nfts()
      .findByMint({ mintAddress: new PublicKey(tokens[index].mint) })
      .then((t) => ({
        ...tokens[index],
        name: t.name,
      }));
  });

  return Promise.all(tokenPromises);
};

export const toToken = (token: {
  pubkey: PublicKey;
  account: AccountInfo<ParsedAccountData>;
}) => {
  const mint = token.account.data.parsed.info.mint;
  const isNative = token.account.data.parsed.info.isNative;
  const amount = token.account.data.parsed.info.tokenAmount.uiAmount;
  const uiAmount = token.account.data.parsed.info.tokenAmount.uiAmountString;
  const decimals = token.account.data.parsed.info.tokenAmount.decimals;

  return { mint, amount, uiAmount, decimals, isNative };
};
