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
  addTag(recipes);
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
 * ON AJOUTE LES TAGS SUIVANT LE CLICKs
 */
function addTag(array) {
  const items = document.querySelectorAll(".dropdown__list__item");
  items.forEach((item) => {
    item.addEventListener("click", () => {
      item.parentNode.parentNode.classList.remove("showDropdown");
      item.parentNode.classList.add("reduceList");
      item.parentNode.previousElementSibling.classList.add("hiddenIcon");
      item.parentNode.previousElementSibling.previousElementSibling.classList.remove(
        "hiddenIcon"
      );
      if (!tagsSeleted.includes(item.textContent)) {
        new CreateTag(tagBox, item.textContent, item.parentNode);
        recipesToShow(filterRecipeWithTag(array, item.textContent));
        tagsSeleted.push(item.textContent);
        desactiveItem();
      }
      console.log(tagsSeleted);
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
      //main.innerHTML = "";
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

// GESTION DES INPUTS DANS LES DROPDOWNS
const inputUstensils = document.querySelector(
  "input[placeholder='Ustensiles']"
);
const inputAppareils = document.querySelector("input[placeholder='Appareils']");

const selectAppareil = document.querySelector(".dropdown.appareil>p");
const selectUstensil = document.querySelector(".dropdown.ustensil>p");
const selectIngredient = document.querySelector(".dropdown.ingredient>p");
const inputIngredients = document.querySelector(
  "input[placeholder='Ingrédients']"
);

// Ingredient
inputIngredients.addEventListener("input", () => {
  const list = Array.from(document.querySelectorAll("#dropdowningredient>p"));
  if (
    inputIngredients.parentNode
      .getAttribute("class")
      .includes("showDropdown") === true
  ) {
    if (inputIngredients.value.length > 2) {
      list.forEach((item) => {
        if (
          item.innerText
            .toLowerCase()
            .includes(inputIngredients.value.toLowerCase())
        ) {
          selectIngredient.textContent = item.innerText;
        }
      });
    } else {
      selectIngredient.textContent = "";
    }
  } else {
    if (inputIngredients.value.length > 2) {
      list.forEach((item) => {
        if (
          item.innerText
            .toLowerCase()
            .includes(inputIngredients.value.toLowerCase())
        ) {
          selectIngredient.textContent = item.innerText;
          inputIngredients.parentNode.classList.add("showSelect");
        }
      });
    } else {
      selectIngredient.textContent = "";
      inputIngredients.parentNode.classList.remove("showSelect");
    }
  }
});
selectIngredient.addEventListener("click", () => {
  new CreateTag(
    tagBox,
    selectIngredient.textContent,
    selectIngredient.parentNode
  );
  tagsSeleted.push(selectIngredient.textContent);
  console.log(tagsSeleted);
  if (recipesFiltered.length === 0) {
    recipesToShow(filterRecipeWithTag(recipes, selectIngredient.textContent));
  } else {
    recipesToShow(
      filterRecipeWithTag(recipesFiltered, selectIngredient.textContent)
    );
  }
  selectIngredient.textContent = "";
  inputIngredients.value = "";
  inputIngredients.parentNode.classList.remove("showSelect");
  desactiveItem();
});

// Appareil
inputAppareils.addEventListener("input", () => {
  const list = Array.from(document.querySelectorAll("#dropdownappareil>p"));
  if (
    inputAppareils.parentNode.getAttribute("class").includes("showDropdown") ===
    true
  ) {
    if (inputAppareils.value.length > 2) {
      list.forEach((item) => {
        if (
          item.innerText
            .toLowerCase()
            .includes(inputAppareils.value.toLowerCase())
        ) {
          selectAppareil.textContent = item.innerText;
        }
      });
    } else {
      selectAppareil.textContent = "";
    }
  } else {
    if (inputAppareils.value.length > 2) {
      list.forEach((item) => {
        if (
          item.innerText
            .toLowerCase()
            .includes(inputAppareils.value.toLowerCase())
        ) {
          selectAppareil.textContent = item.innerText;
          inputAppareils.parentNode.classList.add("showSelect");
        }
      });
    } else {
      selectAppareil.textContent = "";
      inputAppareils.parentNode.classList.remove("showSelect");
    }
  }
});
selectAppareil.addEventListener("click", () => {
  new CreateTag(tagBox, selectAppareil.textContent, selectAppareil.parentNode);
  tagsSeleted.push(selectAppareil.textContent);
  console.log(tagsSeleted);
  if (recipesFiltered.length === 0) {
    recipesToShow(filterRecipeWithTag(recipes, selectAppareil.textContent));
  } else {
    recipesToShow(
      filterRecipeWithTag(recipesFiltered, selectAppareil.textContent)
    );
  }
  selectAppareil.textContent = "";
  inputAppareils.value = "";
  inputAppareils.parentNode.classList.remove("showSelect");
  desactiveItem();
});

// Ustensils
inputUstensils.addEventListener("input", () => {
  const list = Array.from(document.querySelectorAll("#dropdownustensil>p"));
  if (
    inputUstensils.parentNode.getAttribute("class").includes("showDropdown") ===
    true
  ) {
    if (inputUstensils.value.length > 2) {
      list.forEach((item) => {
        if (
          item.innerText
            .toLowerCase()
            .includes(inputUstensils.value.toLowerCase())
        ) {
          selectUstensil.textContent = item.innerText;
        }
      });
    } else {
      selectUstensil.textContent = "";
    }
  } else {
    if (inputUstensils.value.length > 2) {
      list.forEach((item) => {
        if (
          item.innerText
            .toLowerCase()
            .includes(inputUstensils.value.toLowerCase())
        ) {
          selectUstensil.textContent = item.innerText;
          inputUstensils.parentNode.classList.add("showSelect");
        }
      });
    } else {
      selectUstensil.textContent = "";
      inputUstensils.parentNode.classList.remove("showSelect");
    }
  }
});
selectUstensil.addEventListener("click", () => {
  new CreateTag(tagBox, selectUstensil.textContent, selectUstensil.parentNode);
  tagsSeleted.push(selectUstensil.textContent);
  console.log(tagsSeleted);
  if (recipesFiltered.length === 0) {
    recipesToShow(filterRecipeWithTag(recipes, selectUstensil.textContent));
  } else {
    recipesToShow(
      filterRecipeWithTag(recipesFiltered, selectUstensil.textContent)
    );
  }
  selectUstensil.textContent = "";
  inputUstensils.value = "";
  inputUstensils.parentNode.classList.remove("showSelect");
  desactiveItem();
});
