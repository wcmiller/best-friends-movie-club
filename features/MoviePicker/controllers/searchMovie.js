async function searchMovie({ title, page = 1}){
  try {
    const data = await fetch(`https://movie-database-alternative.p.rapidapi.com/?s=${encodeURIComponent(title)}&r=json&page=${page}&type=movie`, {
      method: 'GET',  
      headers: {
        'X-RapidAPI-Key': process.env.MDBA_KEY,
        'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
      }
    }).then(resp => resp.json());
    
    if(data.Response === 'False') return { errorMessage: data.Error };
    return { 
      movies: data.Search,
      total_results: data.totalResults,
      page: page
    };
  } catch(error){
    return { errorMessage: error };
  }
}

export default searchMovie;