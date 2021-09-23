// Fonction pour récuperer la liste des ingredients avec un tableau en entrée
function pushIngredient(array) {
  array.forEach((element) => {
    element.ingredients.forEach((ingredient) => {
      if (!ingredientsTotal.includes(ingredient.ingredient.toLowerCase())) {
        ingredientsTotal.push(ingredient.ingredient.toLowerCase());
      }
    });
  });
  console.log(ingredientsTotal);
  return ingredientsTotal;
}
