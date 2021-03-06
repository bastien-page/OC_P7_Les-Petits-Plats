export default class Dropdown {
  constructor(selector, dropdownName) {
    this.selector = selector;
    this.dropdownName = dropdownName;
    this.buildDropdown();
    this.open();
    this.close();
  }

  buildDropdown() {
    const dropdown = document.createElement("div");
    dropdown.classList.add("dropdown");
    dropdown.classList.add(this.dropdownName);
    const input = document.createElement("input");
    input.classList.add("dropdown__input");
    input.setAttribute("type", "search");
    input.setAttribute("placeholder", this.placeholder(this.dropdownName));
    const select = document.createElement("p");
    select.classList.add("dropdown__select");
    const iconDown = document.createElement("em");
    iconDown.classList.add("dropdown__icon", "down", "fas", "fa-chevron-down");
    const iconUp = document.createElement("em");
    iconUp.classList.add(
      "dropdown__icon",
      "up",
      "fas",
      "fa-chevron-up",
      "hiddenIcon"
    );
    const list = document.createElement("div");
    list.classList.add("dropdown__list", "reduceList");
    list.setAttribute("id", "dropdown" + this.dropdownName);

    this.selector.appendChild(dropdown);
    dropdown.appendChild(input);
    dropdown.appendChild(select);
    dropdown.appendChild(iconDown);
    dropdown.appendChild(iconUp);
    dropdown.appendChild(list);

    return dropdown;
  }

  placeholder() {
    let placeholder;
    if (this.dropdownName == "ingredient") {
      placeholder = "Ingrédients";
    } else if (this.dropdownName == "appareil") {
      placeholder = "Appareils";
    } else if (this.dropdownName == "ustensil") {
      placeholder = "Ustensiles";
    }
    return placeholder;
  }

  open() {
    let icons = document.querySelectorAll(".down");
    icons.forEach((icon) => {
      icon.addEventListener("click", () => {
        icon.parentElement.classList.add("showDropdown");
        icon.nextElementSibling.nextElementSibling.classList.remove(
          "reduceList"
        );
        icon.nextElementSibling.classList.remove("hiddenIcon");
        icon.classList.add("hiddenIcon");
      });
    });
  }

  close() {
    let icons = document.querySelectorAll(".up");
    icons.forEach((icon) => {
      icon.addEventListener("click", () => {
        icon.parentElement.classList.remove("showDropdown");
        icon.nextElementSibling.classList.add("reduceList");
        icon.classList.add("hiddenIcon");
        icon.previousElementSibling.classList.remove("hiddenIcon");
      });
    });
  }
}
