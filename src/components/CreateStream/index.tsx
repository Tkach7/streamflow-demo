import { useCreateStream } from "../../lib/streamflow";
import { usePhantom } from "../../lib/phantom";
import styles from "./styles.module.css";
import { FormEvent, useCallback, useContext, useState } from "react";
import { TokensContext } from "../../lib/tokens/TokenProvider";

export const CreateStream = () => {
  const { activeToken } = useContext(TokensContext);
  const { wallet } = usePhantom();
  const { create } = useCreateStream();

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!wallet) return;
      if (!activeToken) return;

      const data = new FormData(e.target as HTMLFormElement);

      const recipient = data.get("recipient") as string;
      const amount = data.get("amount") as string;
      const streamName = data.get("streamName") as string;

      if (!recipient || !amount || !streamName) {
        setError("Payload is invalid");
        return;
      }

      try {
        await create(wallet.adapter, {
          recipient,
          amount,
          decimals: activeToken?.decimals,
          streamName,
          tokenId: activeToken?.mint,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        console.log("fds", e);
        setError(e?.message || e);
      }
    },
    [activeToken, create, wallet]
  );

  return (
    <div className={`${styles.container} ${!activeToken && styles.disabled}`}>
      <h2>Stream creation</h2>
      <form
        onSubmit={handleSubmit}
        className={styles.form}
        onChange={() => setError(null)}
      >
        <label>
          Recipient:
          <br />
          <input
            type="text"
            name="recipient"
            required
            className={styles.input}
            readOnly={!activeToken}
          />
        </label>
        <label>
          Amount:
          <br />
          <input
            type="number"
            name="amount"
            placeholder="0.0005"
            step="any"
            required
            className={styles.input}
            readOnly={!activeToken}
          />
        </label>
        <label>
          Stream name:
          <br />
          <input
            type="text"
            name="streamName"
            placeholder="Fill the name"
            required
            className={styles.input}
            readOnly={!activeToken}
          />
        </label>
        <button
          type="submit"
          className={styles.createCta}
          disabled={!activeToken}
        >
          Create
        </button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};
