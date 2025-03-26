async function fetchJason(url){
  const response = await fetch(url);
  const object = await response.json();
  return object;
}

async function getChefBirthday(id) {
  const recipe = await fetchJason(`https://dummyjson.com/recipes/${id}`)
  let chefId = recipe.userId;
  const chef = await fetchJason(`https://dummyjson.com/users/${chefId}`)
  let birthday = chef.birthDate;

  return birthday

}

getChefBirthday(1)
.then(birthday => console.log("Data di nascita dello chef:", birthday))
.catch(error => console.error("Errore:", error.message));