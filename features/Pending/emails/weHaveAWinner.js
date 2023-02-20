import { sendEmail } from "@/utils";
export default function weHaveAWinner(week){
  const  { title, service, link, votes } = week.movies.find(movie => movie.imdb === week.winnerId);
  const voters = votes.map((vote => vote.user.name));
  const voteTotal = voters.length;
  let votersString = voters.reduce((str, voter, index) => {
    const newStr = str += (index === voteTotal - 1)? `and ${voter}` : `${voter}, `;
    return newStr;
  }, '');
  if(voteTotal === 2){
    votersString = `${voters[0]} and ${voters[1]}`;
  }
  const subject = 'We Have A Winner!';
  const html = `
  <h2>We Have A Winner!</h2>
  <p style='font-size: 16px;'>
    This week on BFMC we'll be watching 
    <a href='${link}' target='_blank' rel='noreferrer'>${title}</a> on ${service}, 
    as chosen by ${votersString}.
  </p>
  <p style='font-size: 12px;'>(So if it sucks, blame them!)</p>
  <p style='font-size: 16px;'>If you haven't voted yet, go ahead and do so for posterity's sake; join the bandwagon &ndash; or register a protest vote!</p>
  `;
  const text = `
We have a winner! This week we'll be watching ${title} on ${service}, as chosen by ${votersString}. (So if it sucks, blame them!)

If you haven't voted yet, go ahead and do so for posterity's sake; join the bandwagon - or register a protest vote!

You can watch ${title} by clicking here: ${link}
`;

  const recipients = [
    {
      name: 'Warren',
      email: 'wcameronmiller@gmail.com'
    }
  ];
  sendEmail(subject, html, text, recipients, week.messageId);
  return { html, text, subject }
};
