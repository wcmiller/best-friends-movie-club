export default async function checkServices(id){
  try{
    return await fetch(`/api/checkServices?id=${id}`)
      .then(response => response.json())      
  } catch(error){
    return {
      id,
      service: '',
      serviceLink: ''
    };
  }
}