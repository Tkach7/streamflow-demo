import { useContext } from "react";
import styles from "./styles.module.css";
import { TokensContext } from "../../lib/tokens/TokenProvider";

export const SelectToken = () => {
  const { tokens, setActiveToken, activeToken } = useContext(TokensContext);
  const hasTokens = Boolean(Array.isArray(tokens) && tokens.length);

  return (
    <div className={styles.container}>
      {!hasTokens && <h1>No any tokens</h1>}

      {hasTokens && (
        <>
          <h2>Select token</h2>
          <br />
          <div className={styles.tokens}>
            {tokens.map((token) => (
              <label
                key={token.mint}
                htmlFor={`${token.mint}`}
                className={`${styles.radioContainer} ${
                  token.mint === activeToken?.mint && styles.checked
                }`}
              >
                <input
                  type="radio"
                  id={`${token.mint}`}
                  name={`${token.mint}`}
                  value={token.mint}
                  onChange={() => setActiveToken(token)}
                  checked={token.mint === activeToken?.mint}
                />
                Name: {token.name}
                <br />
                Amount: {token.uiAmount}
              </label>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
