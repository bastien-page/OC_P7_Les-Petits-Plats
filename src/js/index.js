import CreateTag from "./CreateTag";
import CreateCard from "./CreateCard";
import { recipes } from "./recipes";
import { filterRecipeWithInput } from "./filterRecipeWithInput";
import { filterRecipeWithTag } from "./filterRecipeWithTag";
import { showDropdownItems } from "./showDropdown";
import Dropdown from "./Dropdown";

// VARIABLES GENERALES
const inputSearch = document.getElementById("search");
const tagBox = document.querySelector(".tags");
const main = document.querySelector(".main");
const dropdownBox = document.querySelector(".dropdowns");
let recipesFiltered = new Array();
let tagsSeleted = new Array();

new Dropdown(dropdownBox, "ingredient");
new Dropdown(dropdownBox, "appareil");
new Dropdown(dropdownBox, "ustensil");

// AFFICHAGE DE LA PAGE
window.addEventListener("load", () => {
  showDropdownItems(recipes);
  //addTag(recipes);
});

// SAISI DANS L'INPUT SEARCH
inputSearch.addEventListener("input", () => {
  if (
    tagsSeleted.length === 0 &&
    recipesFiltered.length === 0 &&
    inputSearch.value.length < 3
  ) {
    main.innerHTML = "";
    showDropdownItems(recipes);
  } else if (inputSearch.value.length >= 3 && tagsSeleted.length === 0) {
    recipesToShow(filterRecipeWithInput(recipes, inputSearch));
  } else if (inputSearch.value.length >= 3 && tagsSeleted.length != 0) {
    recipesToShow(filterRecipeWithInput(recipesFiltered, inputSearch));
  } else if (inputSearch.value.length < 3 && tagsSeleted.length != 0) {
    recipesToShow(filterRecipeWithTag(recipes, tagsSeleted[0])); /// A revoir
  }
});

/**
 * ON AJOUTE LES TAGS SUIVANT LE CLICK
 */
function addTag(array) {
  const items = document.querySelectorAll(".dropdown__list__item");
  items.forEach((item) => {
    item.addEventListener("click", () => {
      if (!tagsSeleted.includes(item.textContent)) {
        new CreateTag(tagBox, item.textContent, item.parentNode);
        recipesToShow(filterRecipeWithTag(array, item.textContent));
        tagsSeleted.push(item.textContent);
        desactiveItem();
      }
    });
  });
  deletedTag();
}

/**
 * ON MODIFIE LE STYLE DE L'ITEM APRES LE CLICK
 */
function desactiveItem() {
  const items = document.querySelectorAll(".dropdown__list__item");
  tagsSeleted.forEach((tag) => {
    items.forEach((item) => {
      if (tag === item.textContent) {
        item.classList.add("selectedItem");
      }
    });
  });
}

/**
 * ON SUPPRIME LE TAG
 */
function deletedTag() {
  const icons = document.querySelectorAll(".tag__icon");
  let index;
  icons.forEach((icon) => {
    icon.addEventListener("click", () => {
      let tag = icon.parentElement;
      index = tagsSeleted.indexOf(tag.textContent);
      tagsSeleted.splice(index, 1);
      console.log(tagsSeleted);
      tag.remove();
      main.innerHTML = "";
      showDropdownItems(recipes);
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
}

/// Dropdown

// Selecteur des inputs dans les menus dropdown
const inputUstensils = document.querySelector(
  "input[placeholder='Ustensiles']"
);
const inputAppareils = document.querySelector("input[placeholder='Appareils']");
const inputIngredients = document.querySelector(
  "input[placeholder='Ingrédients']"
);

/// Gestion de l'input  dropdown
const selectAppareil = document.querySelector(".dropdown.appareil>p");
const selectUstensil = document.querySelector(".dropdown.ustensil>p");
const selectIngredient = document.querySelector(".dropdown.ingredient>p");

// Appareils
inputAppareils.addEventListener("input", () => {
  const list = Array.from(document.querySelectorAll("#dropdownappareil>p"));
  if (inputAppareils.value.length >= 3) {
    list.forEach((element) => {
      if (
        element.innerText
          .toLowerCase()
          .includes(inputAppareils.value.toLowerCase())
      ) {
        inputAppareils.parentNode.style.height = "90px";
        selectAppareil.textContent = element.innerText;
      }
      //return selectAppareil;
    });
  } else {
    inputAppareils.parentNode.style.height = "60px";
    selectAppareil.textContent = "";
    //main.innerHTML = "";
  }
});
selectAppareil.addEventListener("click", () => {
  console.log(inputAppareils.value);
  new CreateTag(tagBox, selectAppareil.textContent, selectAppareil.parentNode);

  if (recipesFiltered.length === 0) {
    recipesToShow(filterRecipeWithTag(recipes, selectAppareil.innerText));
  } else {
    recipesToShow(
      filterRecipeWithTag(recipesFiltered, selectAppareil.innerText)
    );
  }
  inputAppareils.parentNode.style.height = "60px";
  selectAppareil.textContent = "";
});

// Ustensils
inputUstensils.addEventListener("input", () => {
  const list = Array.from(document.querySelectorAll("#dropdownustensil>p"));
  if (inputUstensils.value.length >= 3) {
    list.forEach((element) => {
      if (
        element.innerText
          .toLowerCase()
          .includes(inputUstensils.value.toLowerCase())
      ) {
        inputUstensils.parentNode.style.height = "90px";
        selectUstensil.textContent = element.innerText;
        if (recipesFiltered.length === 0) {
          recipesToShow(filterRecipeWithTag(recipes, selectUstensil.innerText));
        } else {
          recipesToShow(
            filterRecipeWithTag(recipesFiltered, selectUstensil.innerText)
          );
        }
      }
      return selectUstensil;
    });
  } else {
    inputUstensils.parentNode.style.height = "60px";
    selectUstensil.textContent = "";
    main.innerHTML = "";
  }
});
selectUstensil.addEventListener("click", () => {
  new CreateTag(tagBox, selectUstensil.textContent, selectUstensil.parentNode);
});

// Ingredient
inputIngredients.addEventListener("input", () => {
  const list = Array.from(document.querySelectorAll("#dropdowningredient>p"));
  if (inputIngredients.value.length >= 3) {
    list.forEach((element) => {
      if (
        element.innerText
          .toLowerCase()
          .includes(inputIngredients.value.toLowerCase())
      ) {
        inputIngredients.parentNode.style.height = "90px";
        selectIngredient.textContent = element.innerText;
        if (recipesFiltered.length === 0) {
          recipesToShow(
            filterRecipeWithTag(recipes, selectIngredient.innerText)
          );
        } else {
          recipesToShow(
            filterRecipeWithTag(recipesFiltered, selectIngredient.innerText)
          );
        }
      }
      return selectIngredient;
    });
  } else {
    inputIngredients.parentNode.style.height = "60px";
    selectIngredient.textContent = "";
    main.innerHTML = "";
  }
});
selectIngredient.addEventListener("click", () => {
  new CreateTag(
    tagBox,
    selectIngredient.textContent,
    selectIngredient.parentNode
  );
});

// // Les events liés aux inputs dropdown
// inputUstensils.addEventListener("keyup", () => {
//   dropdown(pushUstensil(recipes), dropdownUstensil, inputUstensils);
// });
// inputAppareils.addEventListener("keyup", () => {
//   dropdown(pushAppareil(recipes), dropdownAppareil, inputAppareils);
// });
// inputIngredients.addEventListener("keyup", () => {
//   dropdown(pushIngredient(recipes), dropdownIngredient, inputIngredients);
// });

// /**
//  *Fonction pour l'affichage des elements dans le dropdown suite à la recherche dans l'input
//  * @param {Tableau à filter} array
//  * @param {HTMLElement} element
//  * @param {Input} input
//  */
// function dropdown(array, element, input) {
//   let filter = [];
//   if (input.value.length >= 3) {
//     element.innerHTML = ""; // On vide la l'element html
//     array.forEach((element) => {
//       if (element.includes(input.value.toLowerCase())) {
//         filter.push(element);
//       }
//     });
//   } else if (input.value.length < 3) {
//     element.innerHTML = ""; // On vide la l'element html
//     addElementInDropdown(element, array); // On affiche les eléments du départ
//   }
//   addElementInDropdown(element, filter); // On affiche les éléments correspond à l'entrée utilisateur
// }

/// A voir si on supprime ou non

// EVENT POUR L'AFFICHAGE DES DROPDOWNS
// iconsDropdownDown.forEach((icon) => {
//   icon.addEventListener("click", () => {
//     icon.parentElement.style.height = "auto";
//     icon.nextElementSibling.nextElementSibling.style.width = "auto";
//     icon.style.display = "none";
//     icon.nextElementSibling.style.display = "initial";
//   });
// });

// iconsDropdownUp.forEach((icon) => {
//   icon.addEventListener("click", () => {
//     icon.parentElement.style.height = "60px";
//     icon.nextElementSibling.style.width = "120px";
//     icon.style.display = "none";
//     icon.previousElementSibling.style.display = "initial";
//   });
// });
