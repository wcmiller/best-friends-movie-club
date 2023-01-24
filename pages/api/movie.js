import { PrismaClient } from "@prisma/client";

export default async function handler(req, res){
  const prisma = new PrismaClient();
  const { method } = req;
  switch(method){
    case 'GET':
      // await prisma.movie.create({
      //   data: {
      //     imdb: 'tt4154756',
      //     title: 'Avengers: Infinity War',
      //     year: 2018,
      //     runtime: 149,
      //     directors: directors,
      //     cast: cast,
      //     genres: genres,
      //     poster: 'https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_.jpg',
      //     summary: 'As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality. Everything the Avengers have fought for has led up to this moment, the fate of Earth and existence has never been more uncertain.',
      //     trailer: 'KU2APpDcTjI',
      //     imdbRating: 8.4,
      //     mpaaRating: 'PG-13',
      //   }
      // });
     const movies = await prisma.movie.findMany();
      return res.status(200).json(movies);
      break;
    default:
      return res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}