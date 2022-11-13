import './css/styles.css';
import makeCard from "./tamplatea/get-card.hbs";

import { getAxios } from "./getAxios";

export { getCard }

const url = "https://pixabay.com/api/";
const parameters = {
    key: '31299915-b383d5b151d1dc364952a6f73',
    lang: 'en',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: 1,
    per_page: 5,
}

// console.log(makeCard())

const refs = {
    formEl: document.querySelector('.search-form'),
    cardGallery: document.querySelector('.gallery')
}

// console.log(refs.cardGallery)

refs.formEl.addEventListener('submit', sendForm)

function getCard(resulte) {
    refs.cardGallery.innerHTML = '';
    console.log(resulte)
    refs.cardGallery.innerHTML = resulte.data.hits.map(makeCard).join('');
}

function sendForm(evt) {
    evt.preventDefault();
    console.log(evt.currentTarget.elements.searchQuery.value);
    const valueInput = evt.currentTarget.elements.searchQuery.value;
    getAxios(valueInput, url, parameters)
}