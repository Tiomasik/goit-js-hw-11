import Notiflix from 'notiflix';
import axios from 'axios';
import { getCard } from "./index";


function getAxios(valueInput, url, { key, lang, image_type, orientation, safesearch, page, per_page }) {
    axios.get(`${url}?key=${key}&q=${valueInput}&page=${page}&per_page=${per_page}&lang=${lang}&image_type=${image_type}&orientation=${orientation}&safesearch=${safesearch}`)
        .then(resolve => {
            getCard(resolve, valueInput)
        })
        .catch(error => console.log(error))
};

export { getAxios }