import { usePhantom } from "../../lib/phantom";
import { Header } from "../Header";
import { Layout } from "../Layout";
import { NoPhantom } from "../NoPhantom";
import styles from "./styles.module.css";
import { CreateStream } from "../CreateStream";
import { SelectToken } from "../SelectToken";
import { StreamList } from "../StreamList";

export const Main = () => {
  const { publicKey, handleConnect, noPhantom } = usePhantom();

  if (noPhantom) {
    return <NoPhantom />;
  }

  return (
    <Layout>
      <Header />
      <main className={styles.main}>
        {noPhantom && <NoPhantom />}
        {publicKey && (
          <div className={styles.dashboard}>
            <SelectToken />
            <hr className={styles.divider} />
            <CreateStream />
            <hr className={styles.divider} />
            <StreamList />
          </div>
        )}
        {!publicKey && (
          <button onClick={handleConnect} className={styles.connectCta}>
            Connect to Phantom
          </button>
        )}
      </main>
    </Layout>
  );
};
