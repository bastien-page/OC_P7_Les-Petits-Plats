import CreateTag from "./CreateTag";
import CreateCard from "./CreateCard";
import { recipes } from "./recipes";
import { pushAppareil } from "./pushElement";
import { pushIngredient } from "./pushElement";
import { pushUstensil } from "./pushElement";
import { filterRecipeWithInput } from "./filterRecipeWithInput";
import { filterRecipeWithTag } from "./filterRecipeWithTag";
import { showDropdownItems } from "./showDropdown";

// VARIABLES GENERALES
const inputSearch = document.getElementById("search");
const main = document.querySelector(".main");
const iconsDropdownDown = document.querySelectorAll(".dropdown__icon.down");
const iconsDropdownUp = document.querySelectorAll(".dropdown__icon.up");
let recipesFiltered = new Array();
let recipesFilteredByTag = new Array();

// AFFICHAGE DE LA PAGE
window.addEventListener("load", () => {
  showDropdownItems(recipes);
});

// SAISI DANS L'INPUT SEARCH
inputSearch.addEventListener("keyup", () => {
  if (inputSearch.value.length >= 3) {
    filterRecipeWithInput(recipes, inputSearch, recipesFiltered);

    console.log(recipesFiltered);
  } else {
    recipesFiltered = [];
  }
  if (recipesFiltered.length != 0) {
    main.innerHTML = "";
    showDropdownItems(recipesFiltered);
    recipesFiltered.map((recipe) => {
      new CreateCard(main, recipe);
    });
  } else {
    showDropdownItems(recipes);
    main.innerHTML = "";
  }
});

// EVENT POUR L'AFFICHAGE DES DROPDOWNS
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
