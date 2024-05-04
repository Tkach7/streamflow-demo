import styles from "./styles.module.css";

export const Loader = () => {
  return (
    <div className={styles.container}>
      <img src="animatedCoin.gif" alt="this slowpoke moves" width="50" />
    </div>
  );
};
