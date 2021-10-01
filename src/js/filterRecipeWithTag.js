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
  array.filter((element) => {
    if (
      element.appliance.toLowerCase().includes(filter) ||
      testIngredient(element.ingredients, filter) === true ||
      testUstensils(element.ustensils, filter) === true
    ) {
      arrayfiltered.push(element);
    }
  });
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
  array.forEach((element) => {
    if (element.toLowerCase().includes(string.toLowerCase())) {
      resp = true;
    }
  });
  return resp;
}
