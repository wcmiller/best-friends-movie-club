import styles from './Description.module.scss';

function Description({ movie }){
  return (
    <section className={styles.info}>
      <p className={styles.directors}>Director: {movie.directors}</p>
      <p className={styles.genres}>{movie.genres}</p>
      <p className={styles.description}>{movie.summary}</p>
    </section>
  );
}

export default Description;