/**
 *
 * @param {array} array -Tableau de recette
 * @param {string} input -Saisi de l'utilisateur
 * @param {array} arrayfiltered -Tableau de recette filtrer suivant la saisie
 */
export const filterRecipeWithInput = (array, input) => {
  let arrayfiltered = new Array();
  let filter = input.value.toLowerCase();
  arrayfiltered = array.filter((element) => testRecipeInput(element, filter));
  return arrayfiltered;
};

function testRecipeInput(element, input) {
  if (
    element.name.toLowerCase().includes(input) ||
    element.description.toLowerCase().includes(input) ||
    testIngredient(element.ingredients, input) === true
  ) {
    return element;
  }
}

/**
 * ON TESTE SI LE TAG EST DANS LA LISTE DES INGREDIENTS
 * @param {array} array -Tableau contenant les ingrédients
 * @param {string} string -Filtre
 * @returns Booleen
 */
export function testIngredient(array, string) {
  let resp = null;
  array.forEach((element) => {
    if (element.ingredient.toLowerCase().includes(string.toLowerCase())) {
      resp = true;
    }
  });
  return resp;
}
