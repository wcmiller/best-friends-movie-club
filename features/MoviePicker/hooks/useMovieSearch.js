import { useContext } from 'react';
import { MovieSearchCtx } from '../context/Provider';

function useMovieSearch(){
  return useContext(MovieSearchCtx);
}

export default useMovieSearch;