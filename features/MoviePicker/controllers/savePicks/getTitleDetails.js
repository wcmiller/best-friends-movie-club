export default function getTitleDetails(imdb){
return fetch(`https://watchmode.p.rapidapi.com/title/${imdb}/details/?language=EN`, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.WATCHMODE_KEY,
      'X-RapidAPI-Host': 'watchmode.p.rapidapi.com'
    }
  }).then(resp => resp.json())
    .then(resp => ({
      title: resp.title,
      year: resp.year,
      genres: resp.genre_names,
      poster: resp.poster || '',
      trailer: resp.trailer.split('?v=')[1] || '',
      mpaaRating: resp.us_rating || ''
    }));
}