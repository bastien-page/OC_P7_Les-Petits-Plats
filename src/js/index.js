import CreateTag from "./CreateTag";

// Ajout des tags

const testTag = document.querySelectorAll(".test"); // A modifier avec les bons inputs

testTag.forEach((tag) => {
  tag.addEventListener("click", () => {
    new CreateTag(document.querySelector(".tags"), tag.textContent);
  });
});
