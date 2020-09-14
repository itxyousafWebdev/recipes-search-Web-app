import { domstrings } from "./domStrings";
import {titleLimit} from './viewSearch';
export const likeButtonToggleUI = isLiked => {
    let str = "";
    isLiked ? str = "icon-heart" : str = "icon-heart-outlined";
    document.querySelector(".recipe__love use").setAttribute("href", `img/icons.svg#${str}`);
}

export const likesMenuToggle = numLikes => {
        document.querySelector(".likes__icon").style.visibility = (numLikes>0 ? "visible" : "hidden");
}

export const renderLikesList = likes => {
    const likeItemHtml = `<li>
                            <a class="likes__link" href="#${likes.id}">
                                <figure class="likes__fig">
                                    <img src=${likes.imgUrl} alt=${likes.title}>
                                </figure>
                                <div class="likes__data">
                                    <h4 class="likes__name">${titleLimit(likes.title)}</h4>
                                    <p class="likes__author">${likes.auther}</p>
                                </div>
                            </a>
                        </li>`
    domstrings.likeList.insertAdjacentHTML("beforeend", likeItemHtml);
}

export const clearLikeList = () => {
    domstrings.likeList.innerHTML = "";
}