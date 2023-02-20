import Image from "next/image";
import styles from './SearchResultCard.module.scss';
import useMovieSearch from "../../hooks/useMovieSearch";

function SearchResultCard({ result }){

  const {
    actions: { pick } 
  } = useMovieSearch();
  return (
    <li className={styles.item} onClick={() => { pick(result); }}>
      <Image src={result.Poster === 'N/A'? '/img/no-poster.png' : result.Poster} width={300} height={450} className={styles.poster} alt={`${result.Title} - ${result.Year}`} />
      <h4 className={styles.title}>
        <span>{result.Title} ({result.Year})</span>
      </h4>
    </li>
  )
}

export default SearchResultCard;