
const countryName = new URLSearchParams(location.search).get('name')
const flagImage = document.querySelector('.country-details img')
const detailContainer = document.querySelector('.detail-text-container h1')
const nativeName = document.querySelector('.Native-name')
const population = document.querySelector('.population')
const region = document.querySelector('.Region')
const subRegion = document.querySelector('.sub-region')
const capital = document.querySelector('.capital')
const topleveldomain = document.querySelector('.top-level-domain')
const currencies = document.querySelector('.Currencies')
const Languages = document.querySelector('.Languages')
const borderCountries = document.querySelector('.border-country')

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then(([country]) => {
    console.log(country)
    flagImage.src = country.flags.svg
    detailContainer.innerText = country.name.common
    if (country.name.nativeName) {
      nativeName.innerHTML = Object.values(country.name.nativeName)[0].common
    }
    population.innerHTML = country.population.toLocaleString('en-IN')
    region.innerHTML = country.region
    if (country.subregion) {
      subRegion.innerHTML = country.subregion
    }
    if (country.capital) {
      capital.innerHTML = country.capital?.[0]
    }
    topleveldomain.innerHTML = country.tld[0]
    if (country.currencies) {
      currencies.innerHTML = Object.values(country.currencies).map((currency) => currency.name).join(', ')
    }
    Languages.innerHTML = Object.values(country.languages).join(', ')
    if (country.borders) {
      country.borders.forEach((border) => {
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([bordercountry]) => {
            // console.log(bordercountry)
            const bordercountryTag = document.createElement('a')
            bordercountryTag.innerText = bordercountry.name.common
            bordercountryTag.href = `/country.html?name=${bordercountry.name.common}`
            borderCountries.append(bordercountryTag)
         })
      }
     )
    }
  })