function formatDirectors(acc, crewMember){
  return {
    ...acc,
    directors: [
      ...acc.directors,
      crewMember.full_name
    ]
  };
}

function formatActor(acc, crewMember){
  const newAcc = [ ...acc ];
  newAcc.cast = [
    ...acc.cast,
    {
      actor: crewMember.full_name,
      image: crewMember.headshot_url,
      characters: crewMember.role.split(' / ').join(', '),
      order: crewMember.order 
    }
  ].sort((a,b) => a.order - b.order);
  return newAcc;
}

export default function getCastAndCrew(imdb){
  return fetch(`https://watchmode.p.rapidapi.com/title/${imdb}/cast-crew/`, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.WATCHMODE_KEY,
      'X-RapidAPI-Host': 'watchmode.p.rapidapi.com'
    }
  }).then(resp => resp.json())
    .then(crew => (
      crew.reduce(
        (acc, crewMember) => {
          if(crewMember.role === 'Director') return formatDirectors(acc, crewMember)
          if(crewMember.type === 'Cast' && crewMember.order < 4) return formatActor(acc, crewMember);
          return acc;
        },
        { directors: [], cast: [] }
      )
    ));
}