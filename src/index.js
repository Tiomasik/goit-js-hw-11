import './css/styles.css';

import { fetchCountries } from "./fetchCountries";

const refs = {
    formEl: document.querySelector('.search-form'),
    
}

refs.formEl.addEventListener('submit', sendForm)

function sendForm(evt) {
    evt.preventDefault();
    console.log(evt.currentTarget.elements.searchQuery.value)
}