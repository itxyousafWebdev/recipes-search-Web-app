import {domstrings, renderLoader} from './domStrings';
export const getInput = () => domstrings.searchInput.value;

export const showSearchResult = (recipes, pageNo=1) => {
    let pages = Math.ceil(recipes.length/10);
    let start = (pageNo-1) * 10;
    let end = pageNo * 10;
    recipes.slice(start, end).forEach( cur => renderRecipe(cur));
    renderButton(pageNo, pages);
};

const createButton = (pageNo, type) => {
    let buttonhtml = `<button class="btn-inline results__btn--${type}" data-goto=${type === "prev" ? pageNo-1 : pageNo+1}>
                            <svg class="search__icon">
                                <use href="img/icons.svg#icon-triangle-${type === "prev" ? "left" : "right"}"></use>
                            </svg>
                            <span>Page ${type === "prev" ? pageNo-1 : pageNo+1}</span>
                      </button>`
    return buttonhtml;
}

const renderButton = (pageNo, pages) => {
    let button;
    if(pageNo === 1 && pages>1){
        button = createButton(pageNo, "next");
    }
    else if(pageNo < pages){
        button = `${createButton(pageNo, "prev")} ${createButton(pageNo, "next")}`;
    }
    else if (pageNo === pages && pages > 1) {
        button = createButton(pageNo, "prev");
    }
    domstrings.pagesButton.insertAdjacentHTML("beforeend", button);
}

export const clearInputFiled = () => {
    domstrings.searchInput.value = '';
}

export const clearResultList = () => {
    domstrings.resultList.innerHTML = "";
}

export const clearButtons = () => {
    domstrings.pagesButton.innerHTML = "";
}

export const titleLimit = (title) => {
    let titleLength = 0;
    let newtitle = [];
    
    title.split(" ").forEach(cur => {
        titleLength = titleLength + cur.length;
        if(titleLength<=18){
            newtitle.push(cur);
        }
    });
    if(titleLength>18){
        newtitle.push("...");
    }
    return newtitle.join(" ");
}

const renderRecipe = (recipe) => {
    let recipeHtml = `<li>
                        <a class = "results__link" href ="#${recipe.recipe_id}">
                            <figure class="results__fig">
                                <img src = "${recipe.image_url}" alt="${recipe.title}">
                            </figure>
                            <div class="results__data">
                                <h4 class="results__name">${titleLimit(recipe.title)}</h4>
                                <p class="results__author">${recipe.publisher}</p>
                            </div>
                        </a>
                    </li>`
    domstrings.resultList.insertAdjacentHTML("beforeend", recipeHtml);
};