export default function getOverviewDetails(imdb){
  return fetch(`https://imdb8.p.rapidapi.com/title/get-overview-details?tconst=${imdb}&currentCountry=US`, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.MDBA_KEY,
      'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
    }
  }).then(resp => resp.json())
    .then(resp => ({
      summary: resp.plotSummary.text,
      runtime: resp.title.runningTimeInMinutes,
      imdbRating: resp.ratings.rating,
    }));
}