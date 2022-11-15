import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import makeCard from "./tamplatea/get-card.hbs";
import { asyncGetAxios } from "./getAxios";

export { getCard, getCardMore, disableBtn, clearAll }

const refs = {
    formEl: document.querySelector('.search-form'),
    cardGallery: document.querySelector('.gallery'),
    btnLoadMore: document.querySelector('.load-more'),
}

let maxOnPage = 40;
let counter = 1;
let valueInput;
let gallery = new SimpleLightbox('.gallery a', { captionDelay: 250, captionsData: `alt`});

refs.btnLoadMore.setAttribute('disabled', 'disabled');
refs.formEl.addEventListener('submit', sendForm);
refs.btnLoadMore.addEventListener('click', sendMore);
refs.cardGallery.addEventListener('click', onTagsClickGallary);

function sendForm(evt) {
    counter = 1;
    evt.preventDefault();
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
    makeNextStep(resulte);
}

function getCardMore(resulte) {
    refs.cardGallery.insertAdjacentHTML("beforeend", resulte.data.hits.map(makeCard).join(''));
    refs.btnLoadMore.removeAttribute('disabled');
    makeNextStep(resulte)
}

function makeNextStep(resulte) {
    if ((counter * maxOnPage) >= resulte.data.totalHits) {
        disableBtn()
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    }
    gallery.refresh();
    counter +=1;
}

function disableBtn() {
    refs.btnLoadMore.setAttribute('disabled', 'disabled');
}

function onTagsClickGallary(evt) {
    if (evt.target.nodeName !== 'IMG') {
        return
    }
    evt.preventDefault()  
};

function clearAll() {
    refs.cardGallery.innerHTML = '';
}





