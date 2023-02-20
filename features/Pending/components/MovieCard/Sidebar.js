import styles from './Sidebar.module.scss';
import Image from 'next/image';
import { useMemo } from 'react';

function getService(service){
  switch(service){
    case 'HBO':
      return 'HBO Max';
    case 'AMAZON':
      return 'Amazon Prime';
    default:
      return 'Netflix';
  }
}

function Sidebar({ movie, service, link }){
  const watchOn = getService(movie.service);
  return (
    <section className={styles.poster}>
      <Image src={movie.poster} width={210} height={310} alt={movie.title} className={styles.posterImg} />
      <div className={styles.stats}>
        <div className={styles.statsBox}>
          <span className={styles.statsLabel}>Runtime: </span> 
          <span className={styles.statsData}>{movie.runtime} min</span>
        </div>
        <div className={styles.statsBox}>
          <span className={styles.statsLabel}>IMDB: </span> 
          <span className={styles.statsData}>{movie.imdbRating}/10</span>
        </div>
        <div className={styles.statsBox}>
          <span className={styles.statsLabel}>Rating: </span> 
          <span className={styles.statsData}>{movie.mpaaRating || 'Not Rated'}</span>
        </div>
        <div className={styles.statsBox}>
          <span className={styles.statsLabel}>Service: </span> 
          <span className={styles.statsData}>
            <a href={movie.link} target='_blank' rel='noreferrer' title={`Watch on ${watchOn}`} >
              {watchOn}
            </a>
          </span>
        </div>
      </div>
    </section>
  );
}

export default Sidebar;
