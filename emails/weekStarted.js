export default function weekStarted({weekNumber, picker, date, absentee}){
  const subject = `BFMC - Week ${weekNumber}`;
  const html = `
  <h2>Week ${weekNumber} Has Started</h2>
  <p>We'll be assembling on ${date} to watch one of the movies to be selected by ${picker}; let's hope they're good ones.</p>
  ${absentee === ''? '' : `<p>Sadly, we will be without ${absentee} this week.</p>`}
  `;
  const text = `
Week ${weekNumber} has started

We'll be assembling on ${date} to watch one of the movies selected by ${picker}; let's hope they're good ones.

${absentee === ''? '' : `Sadly, we will be without ${absentee} this week.`}

  `;
  return { html, text, subject }
};
