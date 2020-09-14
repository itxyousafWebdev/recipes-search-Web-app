import { domstrings } from "./domStrings";
export const renderShoppingListItem = (item) => {
    const listHtml = `<li class="shopping__item" data-itemid=${item.id}>
                    <div class="shopping__count">
                        <input type="number" value=${item.count} step=${item.count} class="shopping__count-value">
                        <p>${item.unit}</p>
                    </div>
                    <p class="shopping__description">${item.ingredient}</p>
                    <button class="shopping__delete btn-tiny" id="shopping__delete-click">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-cross"></use>
                        </svg>
                    </button>
                </li>`

    domstrings.shoppingList.insertAdjacentHTML("beforeend", listHtml);
}

export const deleteItemFromList = id => {
    const item = document.querySelector(`[data-itemid="${id}"]`);
    item.parentElement.removeChild(item);
}

export const clearList = () => {
    domstrings.shoppingList.innerHTML = "";   
}