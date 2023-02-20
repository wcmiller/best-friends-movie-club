const services = [ 'Amazon Prime', 'HBO MAX'];

const SERVICE_NAMES = {
  'Amazon Prime' : 'AMAZON',
  'HBO MAX' : 'HBO'
}

async function checkServices (id){
  try{
    const sources = await fetch(`https://watchmode.p.rapidapi.com/title/${id}/sources/`, {
      method: 'GET',
      headers: {
        regions: 'US',
        'X-RapidAPI-Key': process.env.WATCHMODE_KEY,
        'X-RapidAPI-Host': 'watchmode.p.rapidapi.com'
      }
    }).then(resp => resp.json());
    const found = sources.find((src) => {
      return src.type === 'sub' && src.region === 'US' && services.indexOf(src.name) !== -1;
    });
    return {
      id,
      link: found.web_url,
      service: SERVICE_NAMES[found.name]
    }
  } catch (error){
    return { error }
  }
}

export default checkServices;