class CreateDropdown {
  constructor(selector, array) {
    this.selector = selector;
    this.array = array;
    this.buildDropdown();
  }

  buildDropdown() {
    const dropdown = createElement("div");
    dropdown.classList.add("dropdown");
    const dropdownInput = createElement("input");
    dropdownInput.classList.add("dropdown__input");
    const dropdownSelect = createElement("p");
    dropdownSelect.classList.add("dropdown__select");
    const dropdownIconDown = createElement("em");
    dropdownIconDown.classList.add("fas", "fa-chevron-down");
    const dropdownList = createElement("div");

    dropdown.appendChild(dropdownInput);
    dropdown.appendChild(dropdownSelect);
    dropdown.appendChild(dropdownIconDown);
    dropdown.appendChild(dropdownList);

    this.selector.appendChild(dropdown);
    return dropdown;
  }
}
