/**
 * ON FILTRE LES RECETTES SUIVANT LA SAISI DE L'UTILISATEUR
 * @param {array} array -Tableau de recette
 * @param {string} input -Saisi de l'utilisateur
 * @param {array} arrayfiltered -Tableau de recette filtrer suivant la saisie
 */
export const filterRecipeWithInput = (array, input) => {
  let arrayfiltered = new Array();
  let filter = input.value.toLowerCase();

  for (let i = 0; i < array.length; i++) {
    if (
      array[i].name.toLowerCase().includes(filter) ||
      array[i].description.toLowerCase().includes(filter) ||
      testIngredient(array[i].ingredients, filter) === true
    ) {
      if (!arrayfiltered.includes(array[i])) arrayfiltered.push(array[i]);
    }
  }

  return arrayfiltered;
};

/**
 * ON TESTE SI LE TAG EST DANS LA LISTE DES INGREDIENTS
 * @param {array} array -Tableau contenant les ingrédients
 * @param {string} string -Filtre
 * @returns Booleen
 */
export function testIngredient(array, string) {
  let resp = null;

  for (let i = 0; i < array.length; i++) {
    if (array[i].ingredient.toLowerCase().includes(string.toLowerCase())) {
      resp = true;
    }
  }
  return resp;
}
