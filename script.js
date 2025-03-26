

async function getChefBirthday(id) {
  const responseRicetta = await fetch(`https://dummyjson.com/recipes/${id}`)
  const ricetta = await responseRicetta.json();
  let chefId = ricetta.userId;
  const responseChef = await fetch(`https://dummyjson.com/users/${chefId}`)
  const chef = await responseChef.json()
  
  let dataNascitaChef = chef.birthDate;

  return dataNascitaChef

}

(async () => {
  const dataNascitaChef = await getChefBirthday(1);
  console.log(dataNascitaChef)
}) ();