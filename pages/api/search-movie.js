import axios from 'axios';

export default async function handler(req, res){
  const { method, query: { title, page = '1' } } = req;
  switch(method){
    case 'GET':
      const options = {
        method: 'GET',  
        url: 'https://movie-database-alternative.p.rapidapi.com/',
        params: {s: title, r: 'json', page: page, type: 'movie'},
        headers: {
          'X-RapidAPI-Key': process.env.MDBA_KEY,
          'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
        }
      };
      try {
        const { data } = await axios.request(options);
        if(data.Response === 'False'){
          return res.status(404).json({ msg: data.Error })
        }
        return res.status(200).json({ 
          movies: data.Search,
          total_results: data.totalResults,
          page: page
        });
      } catch (error){
        return res.status(404).json(error);
      }
      break;
    default:
      return res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}