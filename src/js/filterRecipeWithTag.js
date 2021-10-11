import { testIngredient } from "./filterRecipeWithInput";

/**
 * ON FILTRE LES RECETTES AVEC LE TAG SELECTIONNE
 * @param {array} array -Tableau contenant les recettes
 * @param {string} filter -Valeur du tag
 * @param {array} arrayfiltered -Tableau contenant les recettes suivant les tags
 * @returns Un tableau de recette filtré
 */
export const filterRecipeWithTag = (array, string) => {
  let filter = string.toLowerCase();
  let arrayfiltered = array.filter((element) => testRecipeTag(element, filter));
  return arrayfiltered;
};

function testRecipeTag(element, input) {
  if (
    element.appliance.toLowerCase().includes(input) ||
    testIngredient(element.ingredients, input) === true ||
    testUstensils(element.ustensils, input) === true
  ) {
    return element;
  }
}

/**
 * ON TESTE SI LE TAG EST DANS LA LISTE DES USTENSILES
 * @param {array} array -Tableau contenant les ustensils
 * @param {string} string -Filtre
 * @returns Booleen
 */
function testUstensils(array, string) {
  let resp = null;
  array.forEach((element) => {
    if (element.toLowerCase().includes(string.toLowerCase())) {
      resp = true;
    }
  });
  return resp;
}
