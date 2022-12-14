import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;
const MSG = 'Too many matches found. Please enter a more specific name.';
const ERROR_MSG = 'Oops, there is no country with name';
const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  card: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));
function onInput(e) {
  removeInnerHtml();
  let serchQuery = e.target.value.trim();
  if (serchQuery === '') {
    return;
  }
  fetchCountries(serchQuery)
    .then(data => {
      if (data.length > 10) {
        Notiflix.Notify.info(MSG);
      } else if (data.length <= 10 && data.length >= 2) {
        createList(data);
      } else if (data.length === 1) {
        createCard(data);
      }
    })
    .catch(erro => {
      Notiflix.Notify.failure(ERROR_MSG);
      console.log(erro);
    });
}

function removeInnerHtml() {
  refs.list.innerHTML = '';
  refs.card.innerHTML = '';
}

function createList(data) {
  const mapedData = data
    .map(function (country) {
      return `<li><img class="mini-flag" src="${country.flags.svg}" alt="flag" />${country.name.official}</li>`;
    })
    .join('');
  refs.list.insertAdjacentHTML('afterbegin', mapedData);
}

function createCard(data) {
  const stringedData = `<h1>
  <img
    class="maxi-flag"
    src="${data[0].flags.svg}"
    alt="flag"
  />${data[0].name.official}
</h1><ul>
  <li>Capital: ${data[0].capital}</li>
  <li>Population: ${data[0].population}</li>
  <li>Languages: ${Object.values(data[0].languages)}</li>
</ul>`;
  refs.card.insertAdjacentHTML('afterbegin', stringedData);
}
