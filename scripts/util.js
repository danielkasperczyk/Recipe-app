import { recipeMarkup, modalMarkup, favoriteModal } from './markup';
import { closeModal, handleFavorite,  } from './handlers'

const recipesContainer = document.querySelector('.recipes');
const modal = `<div class="modal"></div>`;
const footerFav = document.querySelector('.footer__favorite');
const itemsToLocal = [];

export function showRecipes(recipes) {
    recipesContainer.innerHTML = '';
    recipes.forEach(recipe => {
        const {image, label, ingredientLines: ingredients, } = recipe.recipe;
        recipesContainer.insertAdjacentHTML('beforeend', recipeMarkup(image, label, ingredients))
        
    });
}

export function showModal(obj){
    document.body.insertAdjacentHTML('afterbegin', modal);
    document.querySelector('.modal').insertAdjacentHTML('beforeend', modalMarkup(obj))
    document.querySelector('.modal').addEventListener('click', closeModal);
    document.querySelector('.addToFavorite').addEventListener('click', handleFavorite)
}

export function addToFavorite(button){
    const modal = button.closest('.modal__box').children[0];
    const fav = {
        image: modal.children[0].src,
        title: modal.children[1].children[0].textContent,
        ing: button.closest('.modal__box').dataset.ing
    }

    itemsToLocal.push(fav);
    localStorage.setItem('favRecipes', JSON.stringify(itemsToLocal));
    footerFav.insertAdjacentHTML("beforeend", favoriteModal(fav))
}

export function pageLoadToFav(){
    const fromLocal = JSON.parse(localStorage.getItem('favRecipes'));
    if(fromLocal !== null){
        itemsToLocal.push(...fromLocal)
        fromLocal.forEach(favorite => footerFav.insertAdjacentHTML("beforeend", favoriteModal(favorite)))
    }

}

export function removeFromFav(title){
    const favArray = Array.from(footerFav.childNodes).filter(item => item.dataset.id !== title).map(item=> {
        return {
            image: item.children[0].src,
            title: item.children[1].querySelector('.footer__favorite_item_events p').innerHTML
        }
    });
    localStorage.setItem('favRecipes', JSON.stringify(favArray))
    footerFav.innerHTML = '';
    pageLoadToFav();
}

export function checkIfExist(title) {
    return Array.from(footerFav.childNodes).find(item => item.dataset.id == title);
}

export function fromFavList(e){
    if(e.target.hasAttribute("data-image") || e.target.hasAttribute("data-title")){
        const element = e.target.closest('.footer__favorite_item')
        const recipe = {
            ingredients: element.dataset.ing.split(','),
            image: element.querySelector('[data-image').src,
            title: element.querySelector('[data-title]').textContent
        }
        showModal(recipe);
    }
    else if(e.target.closest('button')){
       const recipeName = e.target.closest('button').previousElementSibling.textContent;
       removeFromFav(recipeName);
    }
}