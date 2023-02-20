import { Button } from '@/design-system';
import styles from './SearchForm.module.scss';
import useMovieSearch from '@/features/MoviePicker/hooks/useMovieSearch';

export default function SearchForm(){
  const { state, actions } = useMovieSearch();
  return (
    <section className={styles.wrapper}>
      <h3>Search</h3>
      <form 
        className={styles.searchForm}
        onSubmit={(evt) => { evt.preventDefault(); actions.search(state.searchString) }}
      >
        <input 
          type='search' 
          name='search' 
          value={state.searchString}
          className={styles.searchField} 
          placeholder='Movie Title' 
          onChange={actions.updateSearch}
        />
        <Button isLoading={state.isSearchLoading} type='submit'>
          Search
        </Button>
      </form>
    </section>
  )
}