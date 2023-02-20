import styles from './Trailer.module.scss';

function Trailer({ movie }){
  return (
    <section className={styles.trailerBox}>
      <h2>Trailer</h2>
      {!!movie.trailer? (
        <iframe 
          className={styles.trailer}
          src={`https://www.youtube.com/embed/${movie.trailer}`} 
          title={movie.title} 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowFullScreen 
        />
      ) : (<p>No trailer available</p>)}
    </section>
  )
};

export default Trailer;