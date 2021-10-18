/**
 * ON AJOUTE LES ITEMS DANS LES DROPDOWNS SUIVANT LE TABLEAU DE RECETTE
 * @param {array} array -tableau de recette
 */
export const showDropdownItems = (array) => {
  addItemInDropdown(recupItem(array));
};

/**
 * ON RECUPERE LES ITEMS DEPUIS LE TABLEAU DE RECETTE
 * @param {array} array -Tableau contenant les recettes
 * @returns -Un object contenant la liste des items
 */
function recupItem(array) {
  let appareils = [];
  let ustensils = [];
  let ingredients = [];

  for (let i = 0; i < array.length; i++) {
    if (
      !appareils.includes(array[i].appliance.toLowerCase().replace(".", ""))
    ) {
      appareils.push(array[i].appliance.toLowerCase().replace(".", ""));
      appareils.sort();
    }
    let ustensilArray = array[i].ustensils;
    for (let i = 0; i < ustensilArray.length; i++) {
      if (
        !ustensils.includes(ustensilArray[i].toLowerCase().replace(".", ""))
      ) {
        ustensils.push(ustensilArray[i].toLowerCase().replace(".", ""));
        ustensils.sort();
      }
    }
    let ingredientArray = array[i].ingredients;
    for (let i = 0; i < ingredientArray.length; i++) {
      if (
        !ingredients.includes(
          ingredientArray[i].ingredient.toLowerCase().replace(".", "")
        )
      ) {
        ingredients.push(
          ingredientArray[i].ingredient.toLowerCase().replace(".", "")
        );
        ingredients.sort();
      }
    }
  }
  let items = { appareils, ustensils, ingredients };
  return items;
}

/**
 * ON AJOUTE LES ITEMS DANS LA LISTE DES DROPDOWNS
 * @param {obj} obj -Object contenu la liste des élements
 */
function addItemInDropdown(obj) {
  const dropdownIngredient = document.getElementById("dropdowningredient");
  const dropdownUstensil = document.getElementById("dropdownustensil");
  const dropdownAppareil = document.getElementById("dropdownappareil");

  dropdownIngredient.innerHTML = "";
  dropdownUstensil.innerHTML = "";
  dropdownAppareil.innerHTML = "";

  let appareils = obj.appareils;
  let ustensils = obj.ustensils;
  let ingredients = obj.ingredients;

  for (let i = 0; i < appareils.length; i++) {
    createElement(appareils[i], dropdownAppareil);
  }
  for (let i = 0; i < ustensils.length; i++) {
    createElement(ustensils[i], dropdownUstensil);
  }
  for (let i = 0; i < ingredients.length; i++) {
    createElement(ingredients[i], dropdownIngredient);
  }
}

/**
 * ON CREER LES ELEMENTS HTML
 * @param {string} item
 * @param {HTMLElement} selector
 */
function createElement(item, selector) {
  const addItem = document.createElement("p");
  addItem.classList.add("dropdown__list__item");
  addItem.innerText = item.slice(0, 1).toUpperCase() + item.slice(1); //Permet de mettre la première lettre en Maj
  selector.appendChild(addItem);
}
