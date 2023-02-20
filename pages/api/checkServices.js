import { checkServices } from '@/features/MoviePicker/controllers';

export default async function handler(req, res){
  const { method, query: { id } } = req;
  switch(method){
    case 'GET':
      try{
        const results = await checkServices(id);
        return res.status(200).json(results);
      } catch(error) {
        return res.status(500).json(error);
      }
    default:
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}