// Fonction pour récuperer la liste des appareils avec un tableau en entrée
export const pushAppareil = (array) => {
  let item = [];
  array.forEach((element) => {
    if (!item.includes(element.appliance.toLowerCase())) {
      item.push(element.appliance.toLowerCase());
    }
  });
  return item;
};

// Fonction pour récuperer la liste des ustensiles avec un tableau en entrée
export const pushUstensil = (array) => {
  let item = [];
  array.forEach((element) => {
    element.ustensils.forEach((ustensil) => {
      if (!item.includes(ustensil.toLowerCase())) {
        item.push(ustensil.toLowerCase());
      }
    });
  });
  return item;
};

// Fonction pour récuperer la liste des ingredients avec un tableau en entrée
export const pushIngredient = (array) => {
  let item = [];
  array.forEach((element) => {
    element.ingredients.forEach((ingredient) => {
      if (!item.includes(ingredient.ingredient.toLowerCase())) {
        item.push(ingredient.ingredient.toLowerCase());
      }
    });
  });
  return item;
};
