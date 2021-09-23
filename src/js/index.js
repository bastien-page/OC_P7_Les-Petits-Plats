import CreateTag from "./CreateTag";
import CreateCard from "./CreateCard";
import { recipes } from "./recipes";

let appareilsTotal = [];
let ustensilsTotal = [];
let ingredientsTotal = [];

// Fonction pour récuperer la liste des appareils avec un tableau en entrée
function pushAppareil(array) {
  array.forEach((element) => {
    if (!appareilsTotal.includes(element.appliance.toLowerCase())) {
      appareilsTotal.push(element.appliance.toLowerCase());
    }
  });
  console.log(appareilsTotal);
  return appareilsTotal;
}

pushAppareil(recipes);

// Fonction pour récuperer la liste des ustensils avec un tableau en entrée
function pushUstensil(array) {
  array.forEach((element) => {
    element.ustensils.forEach((ustensil) => {
      if (!ustensilsTotal.includes(ustensil.toLowerCase())) {
        ustensilsTotal.push(ustensil.toLowerCase());
      }
    });
  });
  console.log(ustensilsTotal);
  return ustensilsTotal;
}

pushUstensil(recipes);

// Fonction pour récuperer la liste des ingredients avec un tableau en entrée
function pushIngredient(array) {
  array.forEach((element) => {
    element.ingredients.forEach((ingredient) => {
      if (!ingredientsTotal.includes(ingredient.ingredient.toLowerCase())) {
        ingredientsTotal.push(ingredient.ingredient.toLowerCase());
      }
    });
  });
  console.log(ingredientsTotal);
  return ingredientsTotal;
}

pushIngredient(recipes);

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
        // On cherche si l'input est inlcus dans le nom de la recette
        element.name.toLowerCase().includes(inputSearch.value.toLowerCase()) ||
        // On cherche si l'input est inlcus dans la description de la recette
        element.description
          .toLowerCase()
          .includes(inputSearch.value.toLowerCase())
      ) {
        total.push(element);
      }
    });
  }
  console.log(total);
  if (total.length == 0) {
    document.querySelector(".main").innerHTML = "";
  } else if (total.length > 0) {
    total.map(
      (element) => new CreateCard(document.querySelector(".main"), element)
    );
    dropdownAppareil.innerHTML = ""; // On vide la l'element html
    addElementInDropdown(dropdownAppareil, pushAppareil(total));
    dropdownIngredient.innerHTML = ""; // On vide la l'element h
    addElementInDropdown(dropdownIngredient, pushIngredient(total));
  }
});

// element.ingredients.forEach((element) => {
//   let ing = element.ingredient;
//   if (ing.toLowerCase().includes(inputSearch.value.toLowerCase()))
//     return true;
// }) == true

/// Dropdown

const dropdownUstensil = document.getElementById("dropdownUstensil");
const dropdownAppareil = document.getElementById("dropdownAppareil");
const dropdownIngredient = document.getElementById("dropdownIngredient");

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

addElementInDropdown(dropdownUstensil, ustensilsTotal);
addElementInDropdown(dropdownAppareil, appareilsTotal);
addElementInDropdown(dropdownIngredient, ingredientsTotal);

// Ajout des tags
const testTag = document.querySelectorAll(".dropdown__list__item"); // A modifier avec les bons inputs

testTag.forEach((tag) => {
  tag.addEventListener("click", () => {
    new CreateTag(document.querySelector(".tags"), tag.textContent);
  });
});

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
  dropdown(ustensilsTotal, dropdownUstensil, inputUstensils);
});
inputAppareils.addEventListener("keyup", () => {
  dropdown(appareilsTotal, dropdownAppareil, inputAppareils);
});
inputIngredients.addEventListener("keyup", () => {
  dropdown(ingredientsTotal, dropdownIngredient, inputIngredients);
});

/**
 *Fonction pour l'affichage des elements dans le dropdown
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
