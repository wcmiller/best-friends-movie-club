import { PrismaClient } from '@prisma/client';
import weekFormatter from '../formatter/weekFormatter';
import { validate } from '@/auth';
import { tieBreaker, weHaveAWinner } from '../emails';

const queries = {
  week(weekId){
    return {
      where: { id: weekId },
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
    };
  },
  vote(weekId, userId){
    return {
      where: {
        AND : [
          { userId: { equals: userId } },
          { weekId: { equals: weekId } }
        ]
      }
    };
  },
  vote_create(userId, pickId, weekId){
    return {
      data: {
        userId: userId,
        pickId,
        weekId
      }
    }
  }
}

export default async function vote(request){
  const { pickId, weekId } = request.body;
  const prisma = new PrismaClient();
  // VALIDATE USER
  const user = await validate(request);
  if(!user){ throw new Error('Invalid user'); }
  // GET CURRENT WEEK STATUS
  const oldWeek = weekFormatter(await prisma.week.findFirst(queries.week(weekId)), user );

  // CHECK FOR EXISTING VOTE BY USER
  const oldVote = await prisma.vote.findFirst(queries.vote(weekId, user.id));
  if(oldVote){ throw new Error('Already voted'); }
  
  // REGISTER NEW VOTE
  await prisma.vote.create(queries.vote_create(user.id, pickId, weekId));

  // GET UPDATED WEEK TO SEND BACK
  const updatedWeek = weekFormatter(await prisma.week.findFirst(queries.week(weekId)), user);


  // CHECK FOR WINNER AND SEND EMAIL IF SO
  if(!oldWeek.winnerId && !!updatedWeek.winnerId){
    // SEND EMAIL
    weHaveAWinner(updatedWeek);
  }

  // CHECK FOR TIE AND SEND EMAIL IF SO
  if(updatedWeek.isTied){
    // SEND EMAIL
    tieBreaker(updatedWeek);
  }

  // RETURN NEW WEEK
  return updatedWeek;
}