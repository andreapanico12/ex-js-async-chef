async function fetchJason(url){
  const response = await fetch(url);
  const object = await response.json();
  return object;
}

async function getChefBirthday(id) {
  const responseRecipe= await fetch(`https://dummyjson.com/recipes/${id}`)
  const recipe = await responseRecipe.json();
  let chefId = recipe.userId;
  const responseChef = await fetch(`https://dummyjson.com/users/${chefId}`)
  const chef = await responseChef.json()
  
  let birthday = chef.birthDate;

  return birthday

}

getChefBirthday(1)
.then(birthday => console.log("Data di nascita dello chef:", birthday))
.catch(error => console.error("Errore:", error.message));