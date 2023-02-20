import guard from '@/auth/guard';
import moment from 'moment';
import { PrismaClient } from '@prisma/client';

export default async function getProfile(ctx){
  
  const user = await guard(ctx);
  return { 
    user,
    isLoggedInUser: true,
    page: 'Profile'
  };
}