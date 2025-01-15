const countrieseCard = document.querySelector('.countries-container')
const filterRegion = document.querySelector('.filter-by-region')
const searchInput = document.querySelector('.search-container')
const themeMode = document.querySelector('.theme')


let allCountriesData

fetch('https://restcountries.com/v3.1/all')
  .then((res) => res.json())
  .then((data) => {
    rendercountries(data)
    allCountriesData = data
  })


filterRegion.addEventListener('change', (e) => {

  fetch(`https://restcountries.com/v3.1/region/${filterRegion.value}`)
    .then((res) => res.json())
    .then(rendercountries)
})
function rendercountries(data) {
  countrieseCard.innerHTML = ''
  data.forEach((country) => {
    //   console.log(country);

    const countryCard = document.createElement('a')
    countryCard.classList.add('country-card')
    countryCard.href = `/country.html?name=${country.name.common}`
    countryCard.innerHTML = `
     <img src=" ${country.flags.svg}" alt="${country.name.common}flag">
     <div class="card-text">
                       <h3 class="card-title">${country.name.common}</h3>
                       <p><b>population: </b>${country.population.toLocaleString('en-IN')}</p>
                       <p><b>Region: </b>${country.region}</p>
                       <p><b>Capital: </b>${country.capital}</p>
                  </div>
   `
    countrieseCard.append(countryCard)


  })
};

searchInput.addEventListener('input', (e) => {
  const filteredCountries = allCountriesData.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
  rendercountries(filteredCountries)
})

themeMode.addEventListener('click', () => {
  document.body.classList.toggle('dark')
  themeMode.innerHTML =  'Dark mode'
})