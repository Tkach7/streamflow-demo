import { useGetStreams } from "../../lib/streamflow";
import styles from "./styles.module.css";

export const StreamList = () => {
  const streams = useGetStreams();

  return (
    <div className={styles.container}>
      <h3>Stream list</h3>
      {!streams.length && <h2>No any streams</h2>}
      {!!streams.length && (
        <ul className={styles.list}>
          {streams.map(([metadataId, stream]) => (
            <li className={styles.item} key={metadataId}>
              <span className={styles.name}>{stream.name}</span>:&nbsp;
              <span className={styles.metaId}>{metadataId}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
