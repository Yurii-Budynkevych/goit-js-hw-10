const BASE_URL = 'https://restcountries.com/v3.1';
const SETTINGS = '?fields=name.official,capital,population,flags.svg,languages';

export const fetchCountries = function (name) {
  fetch(`${BASE_URL}/name/${name}${SETTINGS}`)
    .then(response => response.json)
    .then(console.log());
};
