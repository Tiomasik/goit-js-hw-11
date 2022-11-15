import Notiflix from 'notiflix';
import axios from 'axios';
import { getCard, getCardMore, disableBtn, clearAll } from "./index";

export { asyncGetAxios }



function getAxios(valueInput, counter, maxOnPage) {
    const url = "https://pixabay.com/api/";
    const parameters = {
    key: '31299915-b383d5b151d1dc364952a6f73',
    lang: 'en',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: counter,
    per_page: maxOnPage,
    }
    const { key, lang, image_type, orientation, safesearch, page, per_page } = parameters;
    disableBtn()
    return axios.get(`${url}?key=${key}&q=${valueInput}&page=${page}&per_page=${per_page}&lang=${lang}&image_type=${image_type}&orientation=${orientation}&safesearch=${safesearch}`)
};

async function asyncGetAxios(valueInput, counter, maxOnPage) {
    try {
        const dataCard = await getAxios(valueInput, counter, maxOnPage)

        if (!dataCard.data.hits.length) {
            throw new Error("Alarm!!!");
        }
        if (counter < 2) {
            getCard(dataCard)
        return    
        }
        getCardMore(dataCard)
    } catch(error) {
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        clearAll()
    }
}
