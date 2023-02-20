import guard from '@/auth/guard';
import moment from 'moment';
import { PrismaClient } from '@prisma/client';

export default async function getUserWeek(ctx){
  const prisma = new PrismaClient();
  const user = await guard(ctx);
  const users = await prisma.user.findMany({
    where: {
      id: { not: user.id }
    }
  });
  const week = await prisma.week.findFirst({
    where: {
      pickerId: { equals: user.id },
      status: { not: 'COMPLETE' }
    },
    include: {
      movies: {
        include: {
          movie: true
        }
      },
      picker: true,
      absentees: {
        include:{
          user: true
        }
      },
    }
  });
  week.date.setHours(36);
  return {
    user,
    users: users,
    week: {
      ...week,
      date: moment(week.date).format("MMM Do"),
      dateVal: moment(week.date).format('YYYY-MM-DD'),
    },
  }
}