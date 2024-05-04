import { FC, PropsWithChildren, createContext, useMemo, useState } from "react";
import { Token } from "./types";
import { useTokens } from "./useTokens";

type TokensContext = {
  tokens: Token[];
  activeToken: Token | null;
  setActiveToken: (t: Token | null) => void;
};

const contextDefaultValue: TokensContext = {
  tokens: [],
  activeToken: null,
  setActiveToken: () => undefined,
};

export const TokensContext = createContext<TokensContext>(contextDefaultValue);

export const TokensContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [activeToken, setActiveToken] = useState<Token | null>(null);
  const tokens = useTokens();

  const value = useMemo(
    () => ({ activeToken, setActiveToken, tokens }),
    [activeToken, tokens]
  );

  return (
    <TokensContext.Provider value={value}>{children}</TokensContext.Provider>
  );
};
