import { guard } from '@/auth';
import { PrismaClient } from '@prisma/client';
import weekFormatter from '../formatter/weekFormatter';

export default async function getWeek(ctx){
  const prisma = new PrismaClient();
  const [ user, week ] = await Promise.all([
    guard(ctx),
    prisma.week.findFirst({
      where: { id: 6 },
      include: {
        picker: true,
        absentees: true,
        movies: {
          include: {
            movie: true,
            vote: { include: { user: true } },
          }
        }
      }
    })
  ]);
  return {
    user,
    week: weekFormatter(week, user),
  }
}