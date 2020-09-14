export const domstrings = {
    searchbtn: document.querySelector(".search"),
    searchInput: document.querySelector(".search__field"),
    resultList: document.querySelector(".results__list"),
    results: document.querySelector(".results"),
    pagesButton: document.querySelector(".results__pages"),
    recipe: document.querySelector(".recipe"),
    shoppingList: document.querySelector(".shopping__list"),
    likeList: document.querySelector(".likes__list")
}

export const renderLoader = parent => {
    const loaderhtml = `<div class="loader" id= "Loader">
                            <svg>
                                <use href="img/icons.svg#icon-cw"> </use>
                            </svg>
                        </div>`

    parent.insertAdjacentHTML("afterbegin", loaderhtml);
}

export const clearloader = () => {
    document.querySelector(".loader").remove();
}
