// Global app controller
import {domstrings, renderLoader, clearloader} from './views/domStrings';
import * as searchview from './views/viewSearch';
import * as recipeView from './views/viewRecipe';
import * as listView from './views/listView';
import * as LikesView from './views/likesView';

import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Like from './models/Likes';


const state = {};
domstrings.searchbtn.addEventListener("submit", e => {
    e.preventDefault();
    controlSearch();
    
});

domstrings.pagesButton.addEventListener("click", e => {
    
    const btn = e.target.closest('.btn-inline');
    if(btn){
        let pageNo = btn.dataset.goto;
        pageNo = parseInt(pageNo);

        searchview.clearButtons();

        searchview.clearResultList();

        searchview.showSearchResult(state.searchObj.result, pageNo);
    }
});



let controlRecipe = async () => {
    let id = window.location.hash.replace("#", "");
    if(id){

        if(state.searchObj){
            recipeView.highLightSelected(id);
        }

        recipeView.clearRecipe(domstrings.recipe);
        renderLoader(domstrings.recipe);

         state.recipeObj = new Recipe(id);
         await state.recipeObj.getRecipeData();
         
         state.recipeObj.parseIngredients();
         
         recipeView.renderRecipe(state.recipeObj, state.likeObj.isLiked(id));
         clearloader();
    }   
}

window.addEventListener("hashchange", controlRecipe);
window,addEventListener("load", controlRecipe);

let controlSearch = async () => {
    let query = searchview.getInput();
    if(query){
        searchview.clearResultList();
        searchview.clearButtons();

        renderLoader(domstrings.results);

        state.searchObj = new Search(query);

        await state.searchObj.getData();

        searchview.showSearchResult(state.searchObj.result);

        clearloader();

        searchview.clearInputFiled();
    }
}

const controlList = () => {
    if(!state.listObj){
        state.listObj = new List();
    }
    state.recipeObj.ingredients.forEach(cur => {
        const item = state.listObj.addItem(cur.count, cur.unit, cur.ingredient);
        listView.renderShoppingListItem(item);
    });
}

window.addEventListener("load", () => {
    state.likeObj = new Like();

    state.likeObj.readLikesDataFromLocalStorage();

    LikesView.likesMenuToggle(state.likeObj.getNumOfLiked());

    state.likeObj.likes.forEach(cur => {
        LikesView.renderLikesList(cur);
    })
});


const controlLikes = () => {
    if(!state.likeObj){
        state.likeObj = new Like();
    }

    const curID = state.recipeObj.id;
    if(!state.likeObj.isLiked(curID)){
        state.likeObj.addLikes(curID, state.recipeObj.title, state.recipeObj.publisher, state.recipeObj.imgURL);
        LikesView.likeButtonToggleUI(true);

    }
    else{
        state.likeObj.deleteItem(curID);
        LikesView.likeButtonToggleUI(false);
    }
    
    LikesView.likesMenuToggle(state.likeObj.getNumOfLiked());

    LikesView.clearLikeList();
    state.likeObj.likes.forEach(cur => {
        LikesView.renderLikesList(cur);
    })

}

        
domstrings.recipe.addEventListener("click", e => {
    if (e.target.matches(".btn-increase, .btn-increase *")){
        state.recipeObj.updateRecipe("inc");
        recipeView.updateServingAndIngredientd(state.recipeObj);
    } 
    else if (e.target.matches(".btn-decrease, .btn-decrease *")){
        if (state.recipeObj.servings > 1) {
            state.recipeObj.updateRecipe("dec");
            recipeView.updateServingAndIngredientd(state.recipeObj);
        }       
    } 
    else if (e.target.matches("#recipe__btn-add, #recipe__btn-add *")){
        controlList();
    }
    else if (e.target.matches(".recipe__love, .recipe__love *")){
        controlLikes();
    }
});

domstrings.shoppingList.addEventListener("click", e => {
    const id = e.target.closest(".shopping__item").dataset.itemid;
   
    if (e.target.matches(".shopping__delete, .shopping__delete *")){
        state.listObj.deleteItem(id);

        listView.deleteItemFromList(id);
    }
    else if (e.target.matches(".shopping__count-value")){
        const val = parseFloat(e.target.value);
        state.listObj.updateCount(val, id);
    }
});