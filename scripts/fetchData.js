import axios from 'axios'

export async function fetchData(recipeName) {
    const api = `https://api.edamam.com/search?q=${recipeName}&app_id=94e50f61&app_key=d7fd732ac4d8920ce2d9579f6160e30f`;

    return await axios.get(`${api}`).catch(errorHandler);
}

function errorHandler() {
    const recipeContainer = document.querySelector('.recipes');
    const error = `<h2>Recipe not found</h2>`;
    recipeContainer.insertAdjacentHTML("beforebegin", error);
}