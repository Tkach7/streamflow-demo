import styles from "./styles.module.css";

export const NoPhantom = () => {
  return (
    <div className={styles.container}>
      <img src="sadPhantom.png" alt="Sad phantom" width="250px" />
      <h1>No Phantom wallet found</h1>
    </div>
  );
};
