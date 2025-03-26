// TEST libreria dayjs
const oggi = dayjs();
console.log(oggi.format("DD/MM/YYYY"))


async function getChefBirthday(id) {

  let recipe
  let chefId
  let chef
  // NB:try/catch creano uno scope locale
  try{
    const recipeResponse = await fetch(`https://dummyjson.com/recipes/${id}`)
    recipe = await recipeResponse.json();
    chefId = recipe.userId;
  } 
  catch(error){
    throw new Error(`Non posso trovare la ricetta con ID: ${id}`)
  } 
  try{
      if(!chefId){
        throw new Error (`Non posso trovare uno chef con ID ${chefId}`)
      }
      const chefResponse = await fetch(`https://dummyjson.com/users/${chefId}`)
      chef = await chefResponse.json();
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

(async () =>{
 try{
  const birthday = await getChefBirthday(1)
  console.log("Data di nascita dello chef:", birthday)
 } catch(error) {
  console.error("Errore:", error.message);
 }
}) ();
