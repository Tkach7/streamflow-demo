import { useCallback, useEffect, useState } from "react";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { clusterApiUrl, Connection } from "@solana/web3.js";
import { usePhantom } from "../phantom/usePhantom.tsx";
import { SOLANA_CLUSTER } from "../../config.ts";
import { injectNameAndSymbolIntoTokens, toToken } from "./utils.ts";
import { Token } from "./types.ts";
import { getSolanaToken } from "./consts.ts";

const connection = new Connection(clusterApiUrl(SOLANA_CLUSTER), "confirmed");

export const useTokens = (): Token[] => {
  const [availableTokens, setAvailableTokens] = useState<Token[]>([]);
  const { publicKey } = usePhantom();

  const getTokenAccounts = useCallback(async () => {
    if (!publicKey) return [];

    const [solanBalance, response] = await Promise.all([
      connection.getBalance(publicKey),
      connection.getParsedTokenAccountsByOwner(publicKey, {
        programId: TOKEN_PROGRAM_ID,
      }),
    ]);

    const accountTokens = response.value.map(toToken);
    const tokenWithNames = await injectNameAndSymbolIntoTokens(
      accountTokens,
      connection
    );

    return tokenWithNames
      .concat(getSolanaToken(solanBalance))
      .filter((t) => t.amount > 0);
  }, [publicKey]);

  useEffect(() => {
    if (!publicKey) return;
    getTokenAccounts().then((tokens) => setAvailableTokens(tokens));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicKey]);

  useEffect(() => {
    const interval = setInterval(() => {
      (async () => {
        getTokenAccounts().then((tokens) => setAvailableTokens(tokens));
      })();
    }, 10000);
    return () => clearInterval(interval);
  }, [getTokenAccounts]);

  return availableTokens;
};
