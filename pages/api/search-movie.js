import axios from 'axios';

export default async function handler(req, res){
  const { method, query: { title } } = req;
  switch(method){
    case 'GET':
      const options = {
        method: 'GET',  
        url: 'https://movie-database-alternative.p.rapidapi.com/',
        params: {s: title, r: 'json', page: '1', type: 'movie'},
        headers: {
          'X-RapidAPI-Key': "",
          'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
        }
      };
      try {
        const { data } = await axios.request(options);
        if(data.Response === 'False'){
          return res.status(404).json({ msg: data.Error })
        }
        return res.status(200).json(data.Search);
      } catch (error){
        return res.status(404).json(error);
      }
      break;
    default:
      return res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}