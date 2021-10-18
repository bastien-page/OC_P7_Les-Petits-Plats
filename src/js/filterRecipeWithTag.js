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
  let arrayfiltered = new Array();

  for (let i = 0; i < array.length; i++) {
    if (
      array[i].appliance.toLowerCase().includes(filter) ||
      testIngredient(array[i].ingredients, filter) === true ||
      testUstensils(array[i].ustensils, filter) === true
    ) {
      arrayfiltered.push(array[i]);
    }
  }
  return arrayfiltered;
};

/**
 * ON TESTE SI LE TAG EST DANS LA LISTE DES USTENSILES
 * @param {array} array -Tableau contenant les ustensils
 * @param {string} string -Filtre
 * @returns Booleen
 */
function testUstensils(array, string) {
  let resp = null;

  for (let i = 0; i < array.length; i++) {
    if (array[i].toLowerCase().includes(string.toLowerCase())) {
      resp = true;
    }
  }

  return resp;
}
