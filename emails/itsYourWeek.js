export default function itsYourWeek({ picker, url}){
  const subject = `BFMC - It's Your Week`
  const html = `
  <p>Hey ${picker}, it's your turn to pick movies for the rest of us to vote on.</p>
  <p>Click <a href='${url}' target='_blank' rel='noreferrer'>here</a> to make your choices and send 'em out.</p>
  `;
  const text = `
Hey ${picker}, it's your turn to pick movies for the rest of us to vote on

You can make your choices and send 'em out here: ${url}
  `;
  return { html, text, subject }
};

