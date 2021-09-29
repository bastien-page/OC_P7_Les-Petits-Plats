import CreateTag from "./CreateTag";
import CreateCard from "./CreateCard";
import { recipes } from "./recipes";
import { pushAppareil } from "./pushElement";
import { pushIngredient } from "./pushElement";
import { pushUstensil } from "./pushElement";
import Dropdown from "./Dropdown";

// Variables générales
let arrayfiltered = [];
const dropdownSection = document.querySelector(".dropdowns");

// Affichage des inputs au départ
window.addEventListener("load", () => {
  new Dropdown(dropdownSection, "ingredient");
  new Dropdown(dropdownSection, "appareil");
  new Dropdown(dropdownSection, "ustensil");
});

// Input de recherche
const inputSearch = document.getElementById("search");
inputSearch.addEventListener("keyup", () => {
  inputFilter();
});

//////////////////////////////////
//         DROPDOWN             //
//////////////////////////////////

/**
 * ON AFFICHE LES ELEMENTS DES DROPDOWNS
 * @param {array} array - Tableau à filtrer
 */
function showDropdownMenu(array) {
  dropdownAppareil.innerHTML = ""; // On vide la l'element html
  addElementInDropdown(dropdownAppareil, pushAppareil(array));
  dropdownIngredient.innerHTML = ""; // On vide la l'element html
  addElementInDropdown(dropdownIngredient, pushIngredient(array));
  dropdownUstensil.innerHTML = ""; // On vide la l'element html
  addElementInDropdown(dropdownUstensil, pushUstensil(array).slice(0, 30));
}

/**
 * AFFICHE LES ITEMS DANS LE DROPDOWN
 * @param {HTMLElement} selector - Selecteur parent des items
 * @param {array} array - Tableau comportant la liste des items
 */
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

/**
 *FONCTION DE FILTRE DES DROPDOWN SUIVANT LA SAISIE DANS L'INPUT DROPDWON
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

//////////////////////////////////
//         FILTRE               //
//////////////////////////////////

/**
 * FONCTION POUR FILTRER LES ELEMENTS SUIVANT LA SAISIE DU L'UTILISATEUR DANS L'INPUT
 * @param {string} input - Ce qui est saisi par l'utilisateur
 * @param {array} array  - La tableau de recette à filtrer
 * @returns - Un tableau filtré suivant l'input
 */
function filter(input, array) {
  array.filter((element) => {
    if (
      // On cherche si l'input est inclus dans les appareils
      element.appliance.toLowerCase().includes(input) ||
      // On cherche si l'input est inclus dans le nom de la recette
      element.name.toLowerCase().includes(input) ||
      // On cherche si l'input est inclus dans la description de la recette
      element.description.toLowerCase().includes(input) ||
      // On cherche si l'input est inclus dans les ingrédients
      testIngredient(element.ingredients, input) === true
    ) {
      arrayfiltered.push(element);
    }
  });
  return arrayfiltered;
}

// Fonction lié à l'input
function inputFilter() {
  arrayfiltered = [];
  let input = inputSearch.value.toLowerCase();
  if (inputSearch.value.length >= 3) {
    filter(input, recipes);
  }
  showCard();
}

// Fonction pour l'affichage
function showCard() {
  if (arrayfiltered.length == 0) {
    showDropdownMenu(recipes);
    document.querySelector(".main").innerHTML = "";
  } else if (arrayfiltered.length > 0) {
    showDropdownMenu(arrayfiltered);
    document.querySelector(".main").innerHTML = "";
    arrayfiltered.map(
      (element) => new CreateCard(document.querySelector(".main"), element)
    );
  }
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

//////////////////////////////////
//         TAG                  //
//////////////////////////////////

// Fonction sur les tags
const tags = document.querySelectorAll(".dropdown__list__item");
tags.forEach((tag) => {
  tag.addEventListener("click", () => {
    console.log("jai click");
  });
});

let dataAppareil = [];
let dataUstensil = [];
let dataIngredient = [];

function recupData(array) {
  array.forEach((element) => {
    if (!dataAppareil.includes(element.appliance.toLowerCase())) {
      dataAppareil.push(element.appliance.toLowerCase());
    }
    element.ustensils.forEach((ustensil) => {
      if (!dataUstensil.includes(ustensil.toLowerCase())) {
        dataUstensil.push(ustensil.toLowerCase());
      }
    });
    element.ingredients.forEach((ingredient) => {
      if (!dataIngredient.includes(ingredient.ingredient.toLowerCase())) {
        dataIngredient.push(ingredient.ingredient.toLowerCase());
      }
    });
  });
  console.log(dataAppareil);
  console.log(dataUstensil);
  console.log(dataIngredient);
}

recupData(recipes);
