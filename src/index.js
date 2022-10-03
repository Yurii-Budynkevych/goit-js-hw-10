// import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;
const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  card: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));
function onInput(e) {
  removeInnerHtml();
  let serchQuery = e.target.value;
  fetchCountries(serchQuery)
    .then(data => {
      console.log(data);
      if (data.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (data.length < 10 && data.length >= 2) {
        const mapedData = data
          .map(function (country) {
            return `<li><img class="mini-flag" src="${country.flags.svg}" alt="flag" />${country.name.official}</li>`;
          })
          .join('');
        refs.list.insertAdjacentHTML('afterbegin', mapedData);
      } else if (data.length === 1) {
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
    })
    .catch(erro => {
      Notiflix.Notify.failure('Oops, there is no country with name');
      console.log(erro);
    });
}

function removeInnerHtml() {
  refs.list.innerHTML = '';
  refs.card.innerHTML = '';
}
