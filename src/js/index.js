import CreateTag from "./CreateTag";
import CreateCard from "./CreateCard";
import { recipes } from "./recipes";

// On recupère tous les éléments pour les afficher dans les dropdowns
let appareilsTotal = [];
let ustensilsTotal = [];
let ingredientsTotal = [];
recipes.forEach((element) => {
  if (!appareilsTotal.includes(element.appliance.toLowerCase())) {
    appareilsTotal.push(element.appliance.toLowerCase());
  }
  element.ustensils.forEach((ustensil) => {
    if (!ustensilsTotal.includes(ustensil.toLowerCase())) {
      ustensilsTotal.push(ustensil.toLowerCase());
    }
  });
  element.ingredients.forEach((ingredient) => {
    if (!ingredientsTotal.includes(ingredient.ingredient.toLowerCase())) {
      ingredientsTotal.push(ingredient.ingredient.toLowerCase());
    }
  });
});

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
//addElementInDropdown(dropdownAppareil, appareilsTotal);
//addElementInDropdown(dropdownIngredient, ingredientsTotal);

// Ajout des tags
const testTag = document.querySelectorAll(".dropdown__list__item"); // A modifier avec les bons inputs

testTag.forEach((tag) => {
  tag.addEventListener("click", () => {
    new CreateTag(document.querySelector(".tags"), tag.textContent);
  });
});

const iconDown = document.querySelectorAll(".down");

const inputUstensils = document.querySelector(
  "input[placeholder='Ustensiles']"
);

inputUstensils.addEventListener("keyup", () => {
  let ustensil = [];
  if (inputUstensils.value.length >= 3) {
    dropdownUstensil.innerHTML = ""; // On vide la l'element html
    ustensilsTotal.forEach((element) => {
      if (element.includes(inputUstensils.value.toLowerCase())) {
        ustensil.push(element);
      }
    });
  } else if (inputUstensils.value.length < 3) {
    dropdownUstensil.innerHTML = ""; // On vide la l'element html
    addElementInDropdown(dropdownUstensil, ustensilsTotal); // On affiche les eléments du départ
  }
  addElementInDropdown(dropdownUstensil, ustensil); // On affiche les éléments correspond à l'entrée utilisateur
});
