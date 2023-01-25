import styles from './MovieCard.module.scss';
import Image from 'next/image';

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

export default function MovieCard({ movie: { movie, service, vote } }) {
  const watchOn = getService(service);
  return (
    <article className={styles.card}>
      <section className={styles.title}>
        <h2>{movie.title} ({movie.year})</h2>
      </section>
      <section className={styles.info}>
        <p className={styles.directors}>Director{movie.directors.length > 1? 's' : ''}: {movie.directors.join(', ')}</p>
        <p className={styles.genres}>{movie.genres.join(', ')}</p>
        <p className={styles.description}>{movie.summary}</p>
      </section>
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
            <span className={styles.statsLabel}>MPAA: </span> 
            <span className={styles.statsData}>{movie.mpaaRating}</span>
          </div>
          <div className={styles.statsBox}>
            <span className={styles.statsLabel}>Service: </span> 
            <span className={styles.statsData}>{watchOn}</span>
          </div>
        </div>
      </section>
      <section className={styles.cast}>
        <h2>Cast</h2>
        <ul className={styles.actor__list}>
            { movie.cast.map((cast) => (
              <li key={cast.actor} className={styles.actor}>
                <Image width={150} height={150} alt={cast.actor} src={cast.image} className={styles.actor__image}/> 
                <div>
                  <div className={styles.actor__name}>{cast.actor}</div>
                  <div className={styles.actor__role}>{cast.characters.join(' / ')}</div>
                </div>
              </li>
            ))}
          </ul>
      </section>
      <section className={styles.trailerBox}>
        <h2>Trailer</h2>
        <iframe 
          className={styles.trailer}
          src={`https://www.youtube.com/embed/${movie.trailer}`} 
          title={movie.title} 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowFullScreen 
        />
      </section>
      <section className={styles.votes}>
        <h2>Votes</h2>
          <ul className={styles.voteList}>
            {vote.map(vt => (
              <li key={vt.id}>{vt.user.name}</li>
            ))}
          </ul>
          <button className={styles.voteButton} type='button' disabled>Vote</button>
      </section>
    </article>
  )
} 