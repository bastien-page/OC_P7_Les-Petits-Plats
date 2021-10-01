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

// AFFICHAGE DE LA PAGE
window.addEventListener("load", () => {
  showDropdownItems(recipes);
  addTag(recipes);
});

// SAISI DANS L'INPUT SEARCH
inputSearch.addEventListener("input", () => {
  if (inputSearch.value.length >= 3) {
    recipesToShow(filterRecipeWithInput(recipes, inputSearch));
    console.log(recipesFiltered);
  } else {
    recipesFiltered = [];
    showDropdownItems(recipes);
    main.innerHTML = "";
  }
  addTag(recipesFiltered);
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

/**
 * ON AJOUTE LES TAGS SUIVANT LE CLICK
 */
function addTag(array) {
  const tagBox = document.querySelector(".tags");
  const items = document.querySelectorAll(".dropdown__list__item");
  items.forEach((item) => {
    item.addEventListener("click", () => {
      new CreateTag(tagBox, item.textContent, item.parentNode);
      recipesToShow(filterRecipeWithTag(array, item.textContent));
    });
  });
}

function deletedTag() {
  const icons = document.querySelectorAll(".tag__icon");
  icons.forEach((icon) => {
    icon.addEventListener("click", () => {
      let tag = icon.parentElement;
      tag.remove();
      const tagsSeleted = Array.from(document.querySelectorAll(".tag"));
      tagsSeleted.forEach((element) => {
        console.log(element.innerText);
      });
    });
  });
}

/**
 * ON VIDE LE MAIN, ON AFFICHE LES CARDS ET LES DROPDOWNS
 * @param {array} array -Tableau filtré à afficher
 */
function recipesToShow(array) {
  recipesFiltered = array;
  showDropdownItems(recipesFiltered);
  main.innerHTML = "";
  recipesFiltered.map((recipe) => {
    new CreateCard(main, recipe);
  });
  addTag(recipesFiltered);
  console.log(recipesFiltered);
  deletedTag();
}

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
