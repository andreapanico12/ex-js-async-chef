// TEST libreria dayjs
const oggi = dayjs();
console.log(oggi.format("DD/MM/YYYY"))


async function getChefBirthday(id) {

  let recipe
  let chefId

  // NB:try/catch creano uno scope locale
  try{
    const recipeResponse = await fetch(`https://dummyjson.com/recipes/${id}`)
    recipe = await recipeResponse.json();
    console.log(recipe)
    chefId = recipe.userId;
  } 
  catch(error){
    throw new Error(`Non posso recuperare la ricetta con ID: ${id}`)
  }
  if(recipe.message){
    throw new Error(`Non esiste una ricetta con ID ${id}`);
  } 

 
  let chef
  let birthday

  try{
      const chefResponse = await fetch(`https://dummyjson.com/users/${chefId}`)
      chef = await chefResponse.json();
      console.log(chef)
      birthday = dayjs(chef.birthDate);
      
    }    
  catch(error){
      throw new Error(`Non posso trovare uno chef con ID ${chefId}`)
    }
  if(chef.message){
    throw new Error(`Non esiste uno chef con ID ${chefId}`)
  }
  if(!birthday){
    throw new Error(`Lo chef con ID ${chefId} non ha una data di nascita valida`)
  }  
  return birthday.format("DD/MM/YYYY")

  // posizionare il return all'interno del finally non permetteva al secondo catch di fare il throw dell'errore.

}

(async () =>{
 try{
  const birthday = await getChefBirthday(100202)
  console.log("Data di nascita dello chef:", birthday)
 } catch(error) {
  console.error("Errore:", error.message);
 }
}) ();
