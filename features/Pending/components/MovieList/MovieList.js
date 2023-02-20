import usePending from "../../hooks/usePending";
import styles from './MovieList.module.scss';
import MovieCard from "../MovieCard/MovieCard";

export default function MovieList() {
  const { state } = usePending();
  return (
    <main className={styles.movies}>
    {
      state.movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))
    }
  </main>
  )
}
