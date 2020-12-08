
export function recipeMarkup (image, label, ing){
    return `<div class="recipes__recipe" data-ingredients="${ing}">
    <img src="${image}" alt="food">
    <p>${label}</p>
    </div>`
}

export function modalMarkup(obj){
    return `<div class="modal__box"  data-ing="${obj.ingredients.join(',')}">
        <div class="modal__box_content">
            <img src="${obj.image}" alt="food">
            <div class="modal__box_content_description">
                <h3 data-title="${obj.title}">${obj.title}</h3>

                <p>Ingridients</p>
                <ul class="modal__box__content_description-text">${obj.ingredients.map(ing =>`<li>${ing}</li>`).join('')}</ul>
            </div>
        </div>
        <div class="modal__box_events">
            <div class="modal__box_events-icon">
                <button class="modal__box_events-icon--fav addToFavorite">
                    <i class="far fa-heart"></i>
                </button>
            </div>
            <div class="modal__box_events-icon">
                <button class="modal__box_events-icon-exit">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
    </div>`
}

export function favoriteModal(fav){
    return `<li class="footer__favorite_item" data-id="${fav.title}" data-ing="${fav.ing}">
    <img src="${fav.image}" alt="food" data-image>
    <div class="footer__favorite_item_events">
        <p data-title>${fav.title}</p>
        <button class="footer__favorite_item_events-unfav">
            <i class="fas fa-heart"></i>
        </button>
    </div>
</li>`
}