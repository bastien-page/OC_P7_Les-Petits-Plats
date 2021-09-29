// Fonction pour récuperer la liste des appareils avec un tableau en entrée
export const pushAppareil = (array) => {
  let item = [];
  array.forEach((element) => {
    if (!item.includes(element.appliance.toLowerCase().replace(".", ""))) {
      item.push(element.appliance.toLowerCase().replace(".", ""));
    }
  });
  item.sort();
  return item;
};

// Fonction pour récuperer la liste des ustensiles avec un tableau en entrée
export const pushUstensil = (array) => {
  let item = [];
  array.forEach((element) => {
    element.ustensils.forEach((ustensil) => {
      if (!item.includes(ustensil.toLowerCase().replace(".", ""))) {
        item.push(ustensil.toLowerCase().replace(".", ""));
      }
    });
  });
  item.sort();
  return item;
};

// Fonction pour récuperer la liste des ingredients avec un tableau en entrée
export const pushIngredient = (array) => {
  let item = [];
  array.forEach((element) => {
    element.ingredients.forEach((ingredient) => {
      if (
        !item.includes(ingredient.ingredient.toLowerCase().replace(".", ""))
      ) {
        item.push(ingredient.ingredient.toLowerCase().replace(".", ""));
      }
    });
  });
  item.sort();
  return item;
};
