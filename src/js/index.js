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

// TEST DES CARD

let test = [recipes[0], recipes[1], recipes[2]];
console.log(test);

window.addEventListener(
  "load",
  test.map(
    (element) => new CreateCard(document.querySelector(".main"), element)
  )
);
