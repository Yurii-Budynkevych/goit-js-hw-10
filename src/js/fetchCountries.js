const BASE_URL = 'https://restcountries.com/v3.1';
const SETTINGS = '?fields=name,capital,population,flags,languages';

export const fetchCountries = function (name) {
  return fetch(`${BASE_URL}/name/${name}${SETTINGS}`).then(response => {
    if (!response.ok) {
      throw new Error('mistake');
    }
    return response.json();
  });
};
