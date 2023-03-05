// ==============================================================================

let filter = false;
const noneFilter = "Filter by Region";
const filterBox = document.querySelector('.filter');
const filtersBox = document.querySelector('.filters');
const filterText = document.querySelector('.filter #current-filter');
const regions = document.querySelectorAll('.filters span');
const searchInput = document.querySelector('#search')

filterBox.onclick = () => {
    filtersBox.classList.toggle('active');
}


regions.forEach((region, index) => {
    region.onclick = (e) => {
        filterWord = e.currentTarget.getAttribute("data-filter");
        filterText.textContent = filterWord;
        filterByRegion(filterWord)
    }
});

// ==============================================================================
const countriesBox = document.querySelector('.contries');
const renderCountries = (country) => {
    countriesBox.insertAdjacentHTML('beforeend',
        `<div class="country">
<div class="flag">
<img src=${country.flag} alt=${country.name}/>
</div>
<div class="info">
<h2>${country.name}</h2>
<div class="details">
<span>Population: ${country.population}</span>
<span>Region: ${country.region}</span>
<span>Capital: ${country.capital}</span>
<a href="/details.html?numericCode=${country.numericCode}">More details</a>
</div>
</div>
</div>`
    )
}


// ==============================================================================
const getContries = () => {
    countriesBox.innerHTML = "";
    fetch('./data.json').then(res => res.json()).then(data => {
        data.forEach((country, index) => {
            renderCountries(country);
        })
    })
}
getContries();

// ==============================================================================

const convertFirstLetterTobCapital = (word) => {
    if (word != null) {
        word = word.split(' ')
        for (let i = 0; i < word.length; i++) {
            word[i] = word[i].charAt(0).toUpperCase() + word[i].substring(1);
        }
    }
    return word.join(' ');
}

// ==============================================================================


// ==============================================================================
const filterByRegion = (keyWord) => {
    countriesBox.innerHTML = "";
    let found = false;
    fetch('./data.json').then(res => res.json()).then(data => {
        data.forEach((country) => {
            if (
                (keyWord != null && keyWord != undefined && keyWord.length > 0 && country.region == keyWord)) {
                renderCountries(country);
                found = true;
            }
        })
        found ? null : getContries();
    })
}

// ==============================================================================


const searchCountry = (keyWord) => {
    countriesBox.innerHTML = "";
    let found = false;
    fetch('./data.json').then(res => res.json()).then(data => {
        data.forEach((country) => {
            if (keyWord != null && keyWord != undefined && keyWord.length > 0 && country.name.includes(keyWord)) {
                found = true;
                renderCountries(country);
            }
        })
        found ? null : countriesBox.innerHTML = "<p class='found'>Not Found</p>";
    })
}

searchInput.onkeyup = (e) => {
    const keyWord = convertFirstLetterTobCapital(e.currentTarget.value);
    keyWord.length > 0 ? searchCountry(keyWord) : getContries();
}