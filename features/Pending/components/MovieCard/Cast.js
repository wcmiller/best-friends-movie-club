import styles from './Cast.module.scss';
import Image from 'next/image';

function Cast({ movie }){
  return (
    <section className={styles.cast}>
      <h2>Cast</h2>
      <ul className={styles.actor__list}>
          { movie.cast.map((cast) => (
            <li key={cast.actor} className={styles.actor}>
              <Image 
                width={150} 
                height={150} 
                alt={cast.actor} 
                src={cast.image} 
                className={styles.actor__image}
              /> 
              <div>
                <div className={styles.actor__name}>{cast.actor}</div>
                <div className={styles.actor__role}>{cast.characters}</div>
              </div>
            </li>
          ))}
        </ul>
    </section>
  );
}

export default Cast;