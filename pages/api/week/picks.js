import { savePicks } from "@/features/MoviePicker/controllers";

export default async function handler(req, res){
  const { method, body } = req;
  switch(method){
    case 'PUT':
      const results = await savePicks(body);
      if(results) return res.status(200).json({ success: true });
      return res.status(500).json({ message: 'there was an error saving the picks' });
    default:
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}