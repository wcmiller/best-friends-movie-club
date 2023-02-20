import useMovieSearch from "../../hooks/useMovieSearch";
import SearchResultCard from "./SearchResultCard";
import styles from './SearchResults.module.scss';

function SearchResults(){
  const {
    state: { searchResults, searchError }, 
    actions: { pick } 
  } = useMovieSearch();
  return (
    <aside className={styles.wrapper}>
      <h3>Results</h3>
      {searchError === ''
        ? (
          <ul className={styles.list}>
            {searchResults.map((result) => (
              <SearchResultCard result={result} key={result.imdbID} onClick={() => { pick(result); }} />
            ))}
          </ul>
        ) 
        : searchError
      }
    </aside>
  );
}

export default SearchResults;