import CreateTag from "./CreateTag";
import CreateCard from "./CreateCard";
import { recipes } from "./recipes";
import { pushAppareil } from "./pushElement";
import { pushIngredient } from "./pushElement";
import { pushUstensil } from "./pushElement";

// Affichage des inputs au départ
window.addEventListener("load", () => {
  showDropdownMenu(recipes);
});

// On affiche les items dans les dropdowns
function addElementInDropdown(selector, array) {
  for (let i = 0; i < array.length; i++) {
    const elementAdd = document.createElement("p");
    elementAdd.setAttribute("class", "dropdown__list__item");
    selector.appendChild(elementAdd);
    let elementValue = array[i];
    elementAdd.innerText =
      elementValue.slice(0, 1).toUpperCase() + elementValue.slice(1); //Permet de mettre la première lettre en Maj
  }
}

// Gere l'affichage des items dans les dropdowns
function showDropdownMenu(array) {
  dropdownAppareil.innerHTML = ""; // On vide la l'element html
  addElementInDropdown(dropdownAppareil, pushAppareil(array));
  dropdownIngredient.innerHTML = ""; // On vide la l'element html
  addElementInDropdown(dropdownIngredient, pushIngredient(array));
  dropdownUstensil.innerHTML = ""; // On vide la l'element html
  addElementInDropdown(dropdownUstensil, pushUstensil(array).slice(0, 30));

  // Ajout des tags au click
  const tags = document.querySelectorAll(".dropdown__list__item");
  tags.forEach((tag) => {
    tag.addEventListener("click", () => {
      new CreateTag(
        document.querySelector(".tags"),
        tag.textContent,
        tag.parentNode
      );
    });
  });
}

// On test si l'ingredient est présent
function testIngredient(array, string) {
  let resp = null;
  array.forEach((element) => {
    if (element.ingredient.toLowerCase().includes(string.toLowerCase())) {
      resp = true;
    }
  });
  return resp;
}

// On recupère la saisie de l'utilisateur

const inputSearch = document.getElementById("search");
let total = [];

inputSearch.addEventListener("keyup", () => {
  total = []; // On vide le tableau
  if (inputSearch.value.length >= 3) {
    recipes.filter((element) => {
      if (
        // On cherche si l'input est inclus dans les appareils
        element.appliance
          .toLowerCase()
          .includes(inputSearch.value.toLowerCase()) ||
        // On cherche si l'input est inclus dans le nom de la recette
        element.name.toLowerCase().includes(inputSearch.value.toLowerCase()) ||
        // On cherche si l'input est inclus dans la description de la recette
        element.description
          .toLowerCase()
          .includes(inputSearch.value.toLowerCase()) ||
        // On cherche si l'input est inclus dans les ingrédients
        testIngredient(element.ingredients, inputSearch.value) === true
      ) {
        total.push(element);
      }
    });
  }
  console.log(total);
  if (total.length == 0) {
    showDropdownMenu(recipes);
    document.querySelector(".main").innerHTML = "";
  } else if (total.length > 0) {
    showDropdownMenu(total);
    total.map(
      (element) => new CreateCard(document.querySelector(".main"), element)
    );
  }
});

/// Dropdown

const dropdownUstensil = document.getElementById("dropdownUstensil");
const dropdownAppareil = document.getElementById("dropdownAppareil");
const dropdownIngredient = document.getElementById("dropdownIngredient");

// Selecteur des inputs dans les menus dropdown
const inputUstensils = document.querySelector(
  "input[placeholder='Ustensiles']"
);
const inputAppareils = document.querySelector("input[placeholder='Appareils']");
const inputIngredients = document.querySelector(
  "input[placeholder='Ingrédients']"
);

// Les events liés aux inputs dropdown
inputUstensils.addEventListener("keyup", () => {
  dropdown(pushUstensil(recipes), dropdownUstensil, inputUstensils);
});
inputAppareils.addEventListener("keyup", () => {
  dropdown(pushAppareil(recipes), dropdownAppareil, inputAppareils);
});
inputIngredients.addEventListener("keyup", () => {
  dropdown(pushIngredient(recipes), dropdownIngredient, inputIngredients);
});

/**
 *Fonction pour l'affichage des elements dans le dropdown suite à la recherche dans l'input
 * @param {Tableau à filter} array
 * @param {HTMLElement} element
 * @param {Input} input
 */
function dropdown(array, element, input) {
  let filter = [];
  if (input.value.length >= 3) {
    element.innerHTML = ""; // On vide la l'element html
    array.forEach((element) => {
      if (element.includes(input.value.toLowerCase())) {
        filter.push(element);
      }
    });
  } else if (input.value.length < 3) {
    element.innerHTML = ""; // On vide la l'element html
    addElementInDropdown(element, array); // On affiche les eléments du départ
  }
  addElementInDropdown(element, filter); // On affiche les éléments correspond à l'entrée utilisateur
}

// Event pour les dropdowns
const iconsDropdownDown = document.querySelectorAll(".dropdown__icon.down");
const iconsDropdownUp = document.querySelectorAll(".dropdown__icon.up");

iconsDropdownDown.forEach((icon) => {
  icon.addEventListener("click", () => {
    icon.parentElement.style.height = "auto";
    icon.nextElementSibling.nextElementSibling.style.width = "auto";
    icon.style.display = "none";
    icon.nextElementSibling.style.display = "initial";
  });
});

iconsDropdownUp.forEach((icon) => {
  icon.addEventListener("click", () => {
    icon.parentElement.style.height = "60px";
    icon.nextElementSibling.style.width = "120px";
    icon.style.display = "none";
    icon.previousElementSibling.style.display = "initial";
  });
});
