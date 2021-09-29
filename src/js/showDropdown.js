import CreateTag from "./CreateTag";

/**
 * ON AJOUTE LES ITEMS DANS LES DROPDOWNS SUIVANT LE TABLEAU DE RECETTE
 * @param {array} array -tableau de recette
 */
export const showDropdownItems = (array) => {
  addItemInDropdown(recupItem(array));
  addTag();
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

  array.forEach((element) => {
    if (!appareils.includes(element.appliance.toLowerCase().replace(".", ""))) {
      appareils.push(element.appliance.toLowerCase().replace(".", ""));
      appareils.sort();
    }
    element.ustensils.forEach((ustensil) => {
      if (!ustensils.includes(ustensil.toLowerCase().replace(".", ""))) {
        ustensils.push(ustensil.toLowerCase().replace(".", ""));
        ustensils.sort();
      }
    });
    element.ingredients.forEach((ingredient) => {
      if (
        !ingredients.includes(
          ingredient.ingredient.toLowerCase().replace(".", "")
        )
      ) {
        ingredients.push(ingredient.ingredient.toLowerCase().replace(".", ""));
        ingredients.sort();
      }
    });
  });
  let items = { appareils, ustensils, ingredients };
  return items;
}

/**
 * ON AJOUTE LES ITEMS DANS LA LISTE DES DROPDOWNS
 * @param {obj} obj -Object contenu la liste des élements
 */
function addItemInDropdown(obj) {
  const dropdownIngredient = document.getElementById("dropdownIngredient");
  const dropdownUstensil = document.getElementById("dropdownUstensil");
  const dropdownAppareil = document.getElementById("dropdownAppareil");

  dropdownIngredient.innerHTML = "";
  dropdownUstensil.innerHTML = "";
  dropdownAppareil.innerHTML = "";

  obj.appareils.forEach((appareil) => {
    createElement(appareil, dropdownAppareil);
  });
  obj.ustensils.forEach((ustensil) => {
    createElement(ustensil, dropdownUstensil);
  });
  obj.ingredients.forEach((ingredient) => {
    createElement(ingredient, dropdownIngredient);
  });
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

function addTag() {
  const tagBox = document.querySelector(".tags");
  const items = document.querySelectorAll(".dropdown__list__item");
  items.forEach((item) => {
    item.addEventListener("click", () => {
      new CreateTag(tagBox, item.textContent, item.parentNode);
    });
  });
}
