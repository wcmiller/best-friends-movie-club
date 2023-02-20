import axios from "axios";



export default async function checkServices(id){
  try{
    const { data: sources } = await axios.get(`/api/checkServices?id=${id}`);
    return {
      id,
      service: SERVICE_NAMES[sources.name],
      serviceLink: sources.web_url.replace('?&autoplay=1', ''),
    }
  } catch(error){
    return {
      id,
      service: '',
      serviceLink: ''
    };
  }
}