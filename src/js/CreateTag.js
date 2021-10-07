export default class CreateTag {
  constructor(selector, string, elementParent) {
    this.selector = selector;
    this.string = string;
    this.elementParent = elementParent;
    this.element = this.buildTag(string);
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
    if (
      this.elementParent.id === "dropdowningredient" ||
      this.elementParent.classList.contains("ingredient")
    ) {
      tag.classList.add("ingredient");
    } else if (
      this.elementParent.id === "dropdownappareil" ||
      this.elementParent.classList.contains("appareil")
    ) {
      tag.classList.add("appareil");
    } else if (
      this.elementParent.id === "dropdownustensil" ||
      this.elementParent.classList.contains("ustensil")
    ) {
      tag.classList.add("ustensil");
    }

    return tag;
  }
}
