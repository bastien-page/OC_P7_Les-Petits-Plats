export default class CreateTag {
  constructor(selector, string, elementParent) {
    this.selector = selector;
    this.string = string;
    this.elementParent = elementParent;
    this.element = this.buildTag(string);
    this.deletedTag();
  }

  buildTag(string) {
    const tag = document.createElement("div");
    tag.classList.add("tag");
    const tagText = document.createElement("p");
    tagText.classList.add("tag__text");
    const tagIcon = document.createElement("em");
    tagIcon.classList.add("tag__icon", "far", "fa-times-circle");

    tag.appendChild(tagText);
    tag.appendChild(tagIcon);

    tagText.innerText = string;

    this.selector.appendChild(tag);

    // On affiche la couleur du tag suivant la catégorie
    if (this.elementParent.id === "dropdownIngredient") {
      tag.classList.add("ingredient");
    } else if (this.elementParent.id === "dropdownAppareil") {
      tag.classList.add("appareil");
    } else if (this.elementParent.id === "dropdownUstensil") {
      tag.classList.add("ustensil");
    }
    return tag;
  }

  deletedTag() {
    const icons = document.querySelectorAll(".tag__icon");
    icons.forEach((icon) => {
      icon.addEventListener("click", () => {
        icon.parentElement.parentNode.removeChild(icon.parentNode);
      });
    });
  }
}
