import { PrismaClient } from "@prisma/client";
import crypto from 'crypto';

export default async function handler(req, res){
  const prisma = new PrismaClient();
  // const salt = crypto.randomBytes(16).toString('hex');
  // const email = 'wcameronmiller@gmail.com'
  // const hash = crypto.pbkdf2Sync(email, salt, 2000, 64, 'sha512').toString('hex');
  const { method } = req;
  switch(method){
    case 'GET':
      // await prisma.user.create({
      //   data: {
      //     name: 'Warren Miller',
      //     email,
      //     salt,
      //     hash,
      //     order: 6
      //   }
      // });
      const allUsers = await prisma.user.findMany();
      return res.status(200).json(allUsers);
      break;
    default:
      return res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}