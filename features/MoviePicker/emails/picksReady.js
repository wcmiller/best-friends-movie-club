import { sendEmail } from '@/utils';

export default function picksReady(week){
  const { picker, weekNumber, movies, url, notes } = week;
  const subject = 'Time to vote'
  const html = `
  <p>${picker}'s picks for week ${weekNumber} have been made and are ready for your vote. This week, your picks are:</p>
  <ul>
    <li>${movies[0].title} (${movies[0].year}): ${movies[0].description}</li>
    <li>${movies[1].title} (${movies[1].year}): ${movies[1].description}</li>
    <li>${movies[2].title} (${movies[2].year}): ${movies[2].description}</li>
  </ul>
  ${notes !== ''? `<p>"${notes}"<br />- ${picker}</p>` : ''}
  <p>Vote for your choice <a target='_blank' rel='noreferrer' href='${url}'>here</a>.</p>
  `;

  const text = `
${picker}'s picks for week ${weekNumber} have been made and are ready for your vote. This week, your picks are:

* ${movies[0].title} (${movies[0].year}): ${movies[0].description}
* ${movies[1].title} (${movies[1].year}): ${movies[1].description}
* ${movies[2].title} (${movies[2].year}): ${movies[2].description}
${notes !== ''? `"${notes}"
- ${picker}` : ''}

Vote for your choice here: ${url}
`;
  sendEmail(subject, html, text, [{ name: picker, email: pickerEmail }], week.messageId)
  return { html, text, subject }
};
