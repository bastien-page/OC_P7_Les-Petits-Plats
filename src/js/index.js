import CreateTag from "./CreateTag";
import CreateCard from "./CreateCard";
import { recipes } from "./recipes";

// Ajout des tags

const testTag = document.querySelectorAll(".test"); // A modifier avec les bons inputs

testTag.forEach((tag) => {
  tag.addEventListener("click", () => {
    new CreateTag(document.querySelector(".tags"), tag.textContent);
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
