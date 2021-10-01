export default class CreateCard {
  constructor(selector, array) {
    this.array = array;
    this.selector = selector;
    this.buildCard(array);
  }

  buildCard(array) {
    const card = document.createElement("article");
    card.classList.add("card");
    const cardHeader = document.createElement("div");
    cardHeader.classList.add("card__header");
    const cardTitle = document.createElement("h3");
    cardTitle.classList.add("card__content__title");
    const cardTime = document.createElement("p");
    cardTime.classList.add("card__content__time");
    const cardTimeIcon = document.createElement("em");
    cardTimeIcon.classList.add("far", "fa-clock");
    cardTime.appendChild(cardTimeIcon);
    const listIngredient = document.createElement("ul");
    listIngredient.classList.add("card__content__list");

    const cardDescription = document.createElement("d");
    cardDescription.classList.add("card__content__description");

    card.appendChild(cardHeader);
    card.appendChild(cardTitle);
    card.appendChild(cardTime);
    card.appendChild(listIngredient);
    card.appendChild(cardDescription);

    cardTitle.innerText = array.name;
    cardTime.innerHTML += array.time + " min";
    listIngredient.innerHTML = this.createIngredient(array.ingredients);
    cardDescription.innerText = array.description;

    this.selector.appendChild(card);
    return card;
  }

  createIngredient(array) {
    let addIngredient = "";
    array.forEach((ingredient) => {
      let ing = ingredient.ingredient;
      let qty = ingredient.quantity || ingredient.quantite;
      let unit = ingredient.unit;
      if (qty == undefined) {
        qty = "";
      }
      if (unit == undefined) {
        unit = "";
      }
      if (unit == "" && qty == "") {
        addIngredient += `<li class="card__content__ingredient">${ing}</li>`;
      } else {
        addIngredient += `<li class="card__content__ingredient">${ing} : <span class="card__content__qty">${qty} ${unit}</span>
        </li>`;
      }
    });
    return addIngredient;
  }
}
