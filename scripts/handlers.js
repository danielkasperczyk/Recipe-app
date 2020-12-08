import { fetchData } from './fetchData';
import { showRecipes, showModal, addToFavorite, removeFromFav, checkIfExist, fromFavList } from './util'

const loader = `<div class="loader"></div>`;


export async function submitHanlder(e) {
    e.preventDefault();
    const recipeContainer = document.querySelector('.recipes');
    const recipeName = e.target.elements['input'].value;

    if(recipeName === '') return;
    // LOADER WHILE FETCHING DATA
    recipeContainer.insertAdjacentHTML('beforebegin', loader)
    const recipesFetch = await fetchData(recipeName);
    // REMOVING LOADER 
    document.querySelector('.loader').remove();

    const recipes = recipesFetch.data.hits;
    showRecipes(recipes);
}
function clickHandler(recipe){
    const recipeObj = {
        ingredients: recipe.dataset.ingredients.split(','),
        image: recipe.children[0].src,
        title: recipe.children[1].textContent
    }
    showModal(recipeObj);
}

export function showRecipe(e){
    const recipe = e.target.closest('.recipes__recipe') ? e.target.closest('.recipes__recipe') : null;
    recipe !== null && clickHandler(recipe); 
}

 export function closeModal(e){
    const query = document.querySelector('.modal')

    if(query){
        (e.target == query || e.target.closest('.modal__box_events-icon-exit')) && document.body.removeChild(query);
        query === false ? query.removeEventListener('click', closeModal) : null
    }
}

export function handleFavorite(e){
    const button = e.target.closest('.addToFavorite');
    const buttonText = button.closest('.modal__box').querySelector('[data-title]').textContent;
    if(checkIfExist(buttonText)){
        button.classList.remove('addedToFav');
        removeFromFav(buttonText);
    }
    else{
        button.classList.add('addedToFav');
        addToFavorite(button);
    }
    document.removeEventListener('click', handleFavorite);
}

export function openFav(){
    const fav = document.querySelector('.footer__favorite');
    fav.classList.toggle('hide__fav');
        if(!fav.classList.contains('hide__fav')){
        fav.addEventListener('click', fromFavList)
    }
    else {
        fav.removeEventListener('click', fromFavList)
    }
}