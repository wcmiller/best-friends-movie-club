import { vote } from "@/features/Pending/actions";

export default async function handler(request, response){
  switch(request.method){
    case 'POST':
      try {
        const result = await vote(request);
        return response.status(200).json(result);
      } catch(error){
        return response.status(500).json({ msg: error.message });
      }
    default:
      return response.status(405).end(`Method ${request.method} Not Allowed`);
  }
}