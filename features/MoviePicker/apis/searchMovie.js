function searchMovie(title){
  if(title === ''){
    return Promise.reject({ message: 'Please enter a title!'})
  }
  return fetch(`/api/search-movie?title=${encodeURIComponent(title)}`)
    .then(response => response.json())
    .then(data => data.movies)
}

export default searchMovie;