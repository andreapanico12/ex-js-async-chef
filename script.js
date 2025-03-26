async function fetchJason(url){
  const response = await fetch(url);
  const object = await response.json();
  return object;
}

async function getChefBirthday(id) {

  let recipe
  let chefId
  let chef
  let birthday
  // NB:try/catch creano uno scope locale
  try{
    recipe = await fetchJason(`https://dummyjson.com/recipes/${id}`)
    chefId = recipe.userId;
  } 
  catch(error) {
    throw new Error(`Non posso trovare la ricetta con ID: ${id}`)
  }
  try{
    chef = await fetchJason(`https://dummyjson.com/users/${chefId}`)
    birthday = chef.birthDate;
  }
  catch(error){
    console.log("Entrato nel secondo catch!")
    throw new Error(`Non posso trovare lo chef con ID :${chefId}`)
  }
  // posizionare il return all'interno del finally non permetteva al secondo catch di fare il throw dell'errore.
  return birthday

}

getChefBirthday(1)
.then(birthday => console.log("Data di nascita dello chef:", birthday))
.catch(error => console.error("Errore:", error.message));