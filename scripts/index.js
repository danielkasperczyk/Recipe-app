import { submitHanlder, showRecipe, openFav } from './handlers';
import { pageLoadToFav } from './util';
import '../style/main.scss';

document.getElementById('formSearch').addEventListener('submit', submitHanlder);

//CLOSING MODAL FUNCTIONALITY
document.addEventListener('click', showRecipe);
document.querySelector('.footer__button').addEventListener('click', openFav);
document.addEventListener('DOMContentLoaded', pageLoadToFav, false);