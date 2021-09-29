import { testIngredient } from "./filterRecipeWithInput";

export const filterRecipeWithTag = (array, filter, arrayfiltered) => {
  array.filter((element) => {
    if (
      element.appliance.toLowerCase().includes(filter) ||
      testIngredient(element.ingredients, filter) === true ||
      testUstensils(element.ustensils, filter) === true
    ) {
      arrayfiltered.push(element);
      console.log(arrayfiltered);
    }
  });
  return arrayfiltered;
};

//On test si l'ustensil est présent
function testUstensils(array, string) {
  let resp = null;
  array.forEach((element) => {
    if (element.toLowerCase().includes(string.toLowerCase())) {
      resp = true;
    }
  });
  return resp;
}
