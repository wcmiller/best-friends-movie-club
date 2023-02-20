import { createContext } from "react";
import { useMovieSearchData } from "../hooks/useMovieSearchData";

const MovieSearchCtx = createContext({})

function MovieSearchProvider({ children, initialValue = {
  searchString: '',
  isVotingWeek: true,
  isSearchLoading: false,
  searchResults: [],
  searchError: '',
  picks: [ false, false, false ]
} }){
  const [ state, actions ] = useMovieSearchData(initialValue)
  return (
    <MovieSearchCtx.Provider value={ { state, actions }}>
      {children}
    </MovieSearchCtx.Provider>
  );
}

export {  MovieSearchCtx, MovieSearchProvider };