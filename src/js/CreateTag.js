export default class CreateTag {
  constructor(selector, string) {
    this.selector = selector;
    this.string = string;
    this.buildTag(string);
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
    return tag;
  }

  deletedTag() {
    const tag = document.querySelectorAll(".tag__icon");
    tag.forEach((icon) => {
      icon.addEventListener("click", () => {
        console.log(icon.parentNode);
        icon.parentNode.parentNode.removeChild(icon.parentNode);
      });
    });
  }
}
