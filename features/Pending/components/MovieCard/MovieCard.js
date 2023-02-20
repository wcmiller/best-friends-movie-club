import styles from './MovieCard.module.scss';
import Trailer from './Trailer';
import Cast from './Cast';
import Description from './Description';
import Sidebar from './Sidebar';
import Votes from './Votes';
import { Card } from '@/design-system';

export default function MovieCard({ movie }) {
  return (
    <Card className={styles.card}>
      <h2 className={styles.title}>
        <span>{movie.title} ({movie.year})</span>
        {movie.isWinner && (<span title='Winner' className={styles.winnerStar}>&#9733;</span>)}
      </h2>
      <Description movie={movie} />
      <Sidebar movie={movie}/>
      <Cast movie={movie} />
      <Trailer movie={movie} />
      <Votes movie={movie} />
    </Card>
  )
}