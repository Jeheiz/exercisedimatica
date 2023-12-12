const got = require('got'); 


async function getCountUsers() {
  let response;
  try {
    response = await got.get('https://my-webservice.moveecar.com/users/count');
  } catch (error) {
    console.error("Error al obtener el conteo de usuarios:", error);
    return { total: 0 }; // Retornando 0 en caso de error
  }
  const data = JSON.parse(response.body);
  return { total: data.total }; 
}


async function computeResult() {
  let result;
  try {
    result = await getCountUsers(); 
  } catch (error) {
    console.error("Error al calcular el resultado:", error);
    return 20; 
  }
  return result.total + 20;
}

computeResult().then(result => console.log("Resultado:", result));
