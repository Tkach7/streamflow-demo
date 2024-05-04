import { SOLANA_CLUSTER } from "../../config";
import { usePhantom } from "../../lib/phantom";
import styles from "./styles.module.css";

export const Header = () => {
  const { publicKey, handleDisconnect } = usePhantom();
  const strKey = publicKey?.toString() ?? "";
  return (
    <div className={styles.container}>
      <h1>Web3 home task</h1>
      <div className={styles.panel}>
        {publicKey && (
          <div>
            Connected as ...{strKey.toUpperCase().substring(strKey.length - 7)}
          </div>
        )}
        <div className={styles.controls}>
          Network: <span>Solana ({SOLANA_CLUSTER})</span>
          {publicKey && (
            <button onClick={handleDisconnect} className={styles.cta}>
              Disconnect
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
