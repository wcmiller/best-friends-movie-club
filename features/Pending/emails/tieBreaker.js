import { sendEmail } from '@/utils';

export default function tieBreaker(week){
  const { movies: moviesRaw, picker, pickerEmail } = week;
  const movies = moviesRaw
   .sort((movA, movB) => movB.votes.length - movA.votes.length)
   .map(movie => movie.title);

  const url = process.env.ROOT;
  const subject = 'You Need to Break a Tie';
  const html = `
  <p>Uh-oh ${picker}, it looks like all the regular votes are in, and we're deadlocked between ${movies[0]} and ${movies[1]}.</p>
  <p>You've been made a voter and can now go break the tie <a href='${url}' target='_blank' rel='noreferrer'>here</a></p>`;
  const text = `
Uh-oh ${picker}, it looks like all the votes are in, and we're deadlocked between ${movies[0]} and ${movies[1]}.

You've been made a voter and can now go break the tie here: ${url}`;
  sendEmail(subject, html, text, [{ name: picker, email: pickerEmail }], week.messageId)
  return { html, text, subject }
};
