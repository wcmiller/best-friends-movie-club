function MovieFormatter(movie, canVote, winnerId){
  return {
    ...movie.movie,
    pickId: movie.id,
    votes: movie.vote,
    directors: movie.movie.directors.join(', '),
    genres: movie.movie.genres.join(', '),
    service: movie.service,
    link: movie.link,
    canVote,
    isWinner: movie.movieId === winnerId,
    isVoteLoading: false
  }
}

export default MovieFormatter;