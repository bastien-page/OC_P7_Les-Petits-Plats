export const filterRecipeWithInput = (array, input, arrayfiltered) => {
  let filter = input.value.toLowerCase();
  array.filter((element) => {
    if (
      element.name.toLowerCase().includes(filter) ||
      element.description.toLowerCase().includes(filter) ||
      testIngredient(element.ingredients, filter) === true
    ) {
      if (!arrayfiltered.includes(element)) arrayfiltered.push(element);
    }
  });
};

// On test si l'ingredient est présent
export function testIngredient(array, string) {
  let resp = null;
  array.forEach((element) => {
    if (element.ingredient.toLowerCase().includes(string.toLowerCase())) {
      resp = true;
    }
  });
  return resp;
}
