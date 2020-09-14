import {Fraction} from 'fractional';
import { domstrings } from "./domStrings";
const renderIngredent = (ingredients) => {
    let allIngredientshtml = ``;
    ingredients.map(cur => {
        let ingredentHtml = `<li class="recipe__item">
                        <svg class="recipe__icon">
                            <use href="img/icons.svg#icon-check"></use>
                        </svg>
                        <div class="recipe__count"> ${toFraction(cur.count.toString()) }</div>
                        <div class="recipe__ingredient">
                            <span class="recipe__unit"> ${cur.unit}</span>
                            ${cur.ingredient}
                        </div>
                    </li>`
        allIngredientshtml = allIngredientshtml + ingredentHtml;
    });
    return allIngredientshtml;
};

const toFraction = num => {
    if(num){
        let [int, dec] = num.split(".");
        int = parseInt(int);
        dec = parseInt(dec);

        if(!dec){
            return num;
        }

        if(int === 0){
            const fr = new Fraction(num);
            return fr.numerator + "/" + fr.denominator;
        }else if(int && dec){
            const fr = new Fraction(num - int);
            return int + " " + fr.numerator + "/" + fr.denominator;
        }
    }
}

export const highLightSelected = id => {
    const arr = Array.from(document.querySelectorAll(".results__link"));
    arr.forEach(cur => {
        cur.classList.remove("results__link--active");
    });
    document.querySelector(`a[href="#${id}"]`).classList.add("results__link--active");
}

export const renderRecipe = (recipe, isliked) => {
    const recipehtml = `
            <figure class="recipe__fig">
                <img src=${recipe.imgURL} alt=${recipe.title} class="recipe__img">
                <h1 class="recipe__title">
                    <span>${recipe.title}</span>
                </h1>
            </figure>

            <div class="recipe__details">
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="img/icons.svg#icon-stopwatch"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--minutes"> ${recipe.time}</span>
                    <span class="recipe__info-text"> minutes</span>
                </div>
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="img/icons.svg#icon-man"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--people"> ${recipe.servings}</span>
                    <span class="recipe__info-text"> servings </span>

                    <div class="recipe__info-buttons">
                        <button class="btn-tiny btn-decrease">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-minus"></use>
                            </svg>
                        </button>
                        <button class="btn-tiny btn-increase">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-plus"></use>
                            </svg>
                        </button>
                    </div>

                </div>
                <button class="recipe__love">
                    <svg class="header__likes">
                        <use href="img/icons.svg#icon-heart${isliked ? "" : "-outlined"}"></use>
                    </svg>
                </button>
            </div>



            <div class="recipe__ingredients">
                <ul class="recipe__ingredient-list">
                    ${renderIngredent(recipe.ingredients)}
                </ul>

                <button class="btn-small recipe__btn" id="recipe__btn-add">
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-shopping-cart"></use>
                    </svg>
                    <span>Add to shopping list</span>
                </button>
            </div>

            <div class="recipe__directions">
                <h2 class="heading-2">How to cook it</h2>
                <p class="recipe__directions-text">
                    This recipe was carefully designed and tested by
                    <span class="recipe__by">${recipe.publisher}</span>. Please check out directions at their website.
                </p>
                <a class="btn-small recipe__btn" href=${recipe.scorceURL} target="_blank">
                    <span>Directions</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-right"></use>
                    </svg>

                </a>
            </div>`;
            domstrings.recipe.insertAdjacentHTML("afterbegin", recipehtml);
        };

export const clearRecipe = parentElement => parentElement.innerHTML = "";

export const updateServingAndIngredientd = recipe => {
    document.querySelector(".recipe__info-data--people").textContent = recipe.servings;

    const arrCount = Array.from(document.querySelectorAll(".recipe__count"));
    arrCount.forEach((cur, i) => {
        cur.textContent = toFraction(recipe.ingredients[i].count.toString());
    });
}