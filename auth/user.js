import { PrismaClient } from "@prisma/client";
import crypto from 'crypto';


export async function findUser( email ){
  const prisma = new PrismaClient();
  const user = await prisma.user.findFirst({ where: { email: { equals: email } } });
  return user;
}

export function validateUser(user, password){
  return user.hash === crypto.pbkdf2Sync(password, user.salt, 2000, 64, 'sha512').toString('hex');
}