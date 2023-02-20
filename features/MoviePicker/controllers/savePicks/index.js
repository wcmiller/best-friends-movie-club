import { PrismaClient } from "@prisma/client";
import { sendEmail } from "@/utils";
import getTitleDetails from "./getTitleDetails";
import getOverviewDetails from "./getOverviewDetails";
import getCastAndCrew from "./getCastAndCrew";
const prisma = new PrismaClient();

async function setPick(movieId, weekId, service, link){
  return prisma.pick.create({
    data: {
      movieId,
      weekId,
      service,
      link
    }
  });
}

async function savePicks({ shouldSendPicks, weekId, picks }){
  try{
    const existingMovies = (await prisma.movie.findMany({
      where: { imdb: { in: picks.map(pick => pick.imdbID)} },
      select: { imdb: true }
    })).map(movie => movie.imdb);
    
    const newMovies = picks.filter(pick => existingMovies.indexOf(pick.imdbID) === -1).map(pick => pick.imdbID);
    
    // SAVE MOVIES TO DB
    await Promise.all(newMovies.map((imdb) => {
      return Promise.all([
        getOverviewDetails(imdb),
        getTitleDetails(imdb),
        getCastAndCrew(imdb),
      ])
        .then(([ overview, title, cast]) => {
          return prisma.movie.create({ data: {...overview, ...title, ...cast, imdb}})
        })
    }));
    // DELETE OLD PICKS
    await prisma.pick.deleteMany({ where: { weekId }});

    // ADD NEW PICKS
    await Promise.all(picks.map(pick => setPick(pick.imdbID, weekId, pick.service, pick.serviceLink)));
    const pickMovies = await prisma.pick.findMany({ where: { weekId }, include: { movie: true }});
    if(shouldSendPicks){
      await prisma.week.update({
        where: { id: weekId },
        data: { status: 'VOTING' }
      });
      sendEmail('picksReady', {
        picker, weekNumber, movies, url, notes
      });
    }
    return true;
  } catch (error){
    return error;
  }
};

export default savePicks;
