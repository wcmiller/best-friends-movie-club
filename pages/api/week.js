import { PrismaClient } from "@prisma/client";

export default async function handler(req, res){
  const prisma = new PrismaClient();
  const { method } = req;
  switch(method){
    case 'GET':
      const week = await prisma.week.findUnique({
        where: { id: 1 },
        include: { picker: true }
      });
      return res.status(200).json(week);
    default:
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}