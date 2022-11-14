import './css/styles.css';
import Notiflix from 'notiflix';
import makeCard from "./tamplatea/get-card.hbs";
import { asyncGetAxios } from "./getAxios";

export { getCard, getCardMore, disableBtn }

const refs = {
    formEl: document.querySelector('.search-form'),
    cardGallery: document.querySelector('.gallery'),
    btnLoadMore: document.querySelector('.load-more'),
}

let maxOnPage = 20;
let counter = 1;
let valueInput;

refs.btnLoadMore.setAttribute('disabled', 'disabled');

refs.formEl.addEventListener('submit', sendForm);
refs.btnLoadMore.addEventListener('click', sendMore);

function sendForm(evt) {
    counter = 1;
    evt.preventDefault();
    console.log(evt.currentTarget.elements.searchQuery.value);
    valueInput = evt.currentTarget.elements.searchQuery.value;
    asyncGetAxios(valueInput, counter, maxOnPage)
}

function sendMore() {
    asyncGetAxios(valueInput, counter, maxOnPage)
}

function getCard(resulte) {
    refs.cardGallery.innerHTML = '';
    refs.cardGallery.innerHTML = resulte.data.hits.map(makeCard).join('');
    refs.btnLoadMore.removeAttribute('disabled');
    Notiflix.Notify.info(`Hooray! We found ${resulte.data.totalHits} images.`);
    if ((counter * maxOnPage) >= resulte.data.totalHits) {
        disableBtn()
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    }
    counter +=1;
    console.log(counter);
}

function getCardMore(resulte) {
    console.log(resulte)
    refs.cardGallery.insertAdjacentHTML("beforeend", resulte.data.hits.map(makeCard).join(''));
    refs.btnLoadMore.removeAttribute('disabled');
    if ((counter * maxOnPage) >= resulte.data.totalHits) {
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
        disableBtn()
    }
    counter += 1;
    console.log(counter)
}

function disableBtn() {
    refs.btnLoadMore.setAttribute('disabled', 'disabled');
}