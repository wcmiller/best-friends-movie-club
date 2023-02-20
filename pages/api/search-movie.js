import { searchMovie } from "@/features/MoviePicker/controllers";

export default async function handler(req, res){
  const { method, query } = req;
  switch(method){
    case 'GET':
        const results = await searchMovie(query);
        if(!!results.errorMessage) return res.status(404).json({ message: results.errorMessage})
        return res.status(200).json(results);
    default:
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}