// TEST libreria dayjs
const oggi = dayjs();
console.log(oggi.format("DD/MM/YYYY"))


async function fetchJason(url){
  const response = await fetch(url);
  // response.ok è una proprietà dell'oggetto response per verificare che la chiamata sia andata a buon fine o restituisca un errore 400. In questo caso gestisco l'errore manualmente.
  if (!response.ok) {
    throw new Error(`Errore HTTP ${response.status} su ${url}`);
  }
  const object = await response.json();
  return object;
}

async function getChefBirthday(id) {

  let recipe
  let chefId
  let chef
  // NB:try/catch creano uno scope locale
  try{
    recipe = await fetchJason(`https://dummyjson.com/recipes/${id}`)
    chefId = recipe.userId;
  } 
  catch(error) {
    throw new Error(`Non posso trovare la ricetta con ID: ${id}`)
  } 
  try{
      if(!chefId){
        throw new Error (`Non posso trovare uno chef con ID ${chefId}`)
      }
      chef = await fetchJason(`https://dummyjson.com/users/${chefId}`)
      const birthday = dayjs(chef.birthDate);


      if (!birthday){
        throw new Error(`Lo chef con ID ${chefId} non ha una data di nascita valida`)
      }
      return birthday.format("DD/MM/YYYY")
    }
    
  catch(error){
      throw error
    }

  

  // posizionare il return all'interno del finally non permetteva al secondo catch di fare il throw dell'errore.

}

getChefBirthday(1)
.then(birthday => console.log("Data di nascita dello chef:", birthday))
.catch(error => console.error("Errore:", error.message));