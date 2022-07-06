import styles from './card.module.css';
function Card({ title, sub }) {
  return (
    <div className={styles.card}>
      <h2 className={styles.cardTitle}>{title}</h2>
      <p className={styles.cardSub}>{sub}</p>
    </div>
  );
}

export default Card;
