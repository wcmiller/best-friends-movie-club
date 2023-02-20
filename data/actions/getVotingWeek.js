import { guard } from '@/auth';
import { PrismaClient } from '@prisma/client';
import moment from 'moment';

export default async function getVotingWeek(ctx){
  const prisma = new PrismaClient();
  const user = await guard(ctx);
  const week = await prisma.week.findFirst({
    where: {
      id: 6
    },
    include: {
      picker: true,
      movies: {
        include: {
          movie: true,
          vote: {
            include: {
              user: true
            }
          },
        }
      }
    }
  });
  return {
    user,
    currentWeek: {
      number: week.number,
      date: moment(week.date).format('MMM do'), // 'Dec 31',
      picker: week.picker.name,
      pickerId: week.picker.id
    },
    movies: week.movies.map(movie => ({
      ...movie,
      voteLoading: false,
    }))
  }
}