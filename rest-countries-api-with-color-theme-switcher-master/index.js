'use strict';

let cards = document.querySelectorAll('.card-skeleton');
const mainContainer = document.querySelector('.main-container');
const darkMode = document.querySelector('.dark-mode');
const navbar = document.querySelector('.navbar');
const searchbar = document.querySelector('.searchbar');
const searchInput = document.querySelector("input[type='text']");
const countryName = document.querySelectorAll('.country-name');
const filter = document.querySelector("#filter");
const region = document.querySelectorAll(".region");
let selectedRegion = filter.value;
const cardInfoContainer = document.querySelector('.card-info-container');

const cardContainer = document.querySelector('.card-container');

// darkMode
darkMode.addEventListener('click', () => {
    navbar.classList.toggle('active');

    darkMode.classList.toggle('active');
    if (darkMode.innerHTML === "Dark Mode") {
        navbar.parentElement.style.background = 'White';
        darkMode.innerHTML = "Light Mode";
        searchbar.classList.toggle('active');
        searchInput.classList.toggle('active');
        filter.classList.toggle('active');
        //card
        document.querySelectorAll('.card-skeleton').forEach((card) => {
            card.classList.toggle('active');
        })
        //cardInfo
        cardInfoDetails.classList.toggle('active');
        dataTag.forEach((element) => {
            element.classList.toggle('active');
        })
        backBtn.classList.toggle('active');

    } else {
        navbar.parentElement.style.background = 'hsl(207, 26%, 17%)';
        darkMode.innerHTML = "Dark Mode";
        searchbar.classList.toggle('active');
        searchInput.classList.toggle('active');
        filter.classList.toggle('active');
        //card
        document.querySelectorAll('.card-skeleton').forEach((card) => {
            card.classList.toggle('active');
        })
        //cardInfo
        cardInfoDetails.classList.toggle('active');
        dataTag.forEach((element) => {
            element.classList.toggle('active');
        })
        backBtn.classList.toggle('active');
    }
})

//fetch api
async function getCard() {
    const res = await fetch("https://restcountries.com/v3.1/all");
    const data = await res.json();

    data.forEach(element => {
        addCountry(element);
    });

    // console.log(data);
}
getCard();

function addCountry(data) {
    const card = document.createElement("div");
    card.classList.add("card-skeleton");
    card.innerHTML = `
    <img class='country-flag' src= ${data.flags.png}>
    <div class='inner-container'>
        <h3 class='country-name'>${data.name.common}</h3>
        <div class='country-data'>
            <p class='population'>Population: <span class='data'>${data.population}</span></p>
            <p class='region'>Region: <span class='data'>${data.region}</span></p>
            <p class='capital'>Capital: <span class='data'>${data.capital}</span></p>
        </div>
    </div>`
    cardContainer.appendChild(card);

    // add click event to each card 
    card.addEventListener('click',()=>{
        showCountryData(data);
    });
    
}

//for region filter 
filter.addEventListener("change", () => {
    selectedRegion = filter.value;

    Array.from(document.querySelectorAll(".region")).forEach((element) => {
        // console.log(element.textContent);
        if (element.textContent === `Region: ${selectedRegion}` || selectedRegion === "All") {
            element.parentElement.parentElement.parentElement.style.display = "grid";
        } else {
            element.parentElement.parentElement.parentElement.style.display = "none";
        }
    })
});

//for name filter
searchInput.addEventListener("input", () => {
    let searchedText = searchInput.value;
    //  console.log(searchedText);
    Array.from(document.querySelectorAll('.country-name')).forEach((element) => {
        // console.log(element.textContent);
        if (element.textContent.toLowerCase().includes(searchedText.toLowerCase())) {
            element.parentElement.parentElement.style.display = "grid";
        } else {
            element.parentElement.parentElement.style.display = "none";
        }
    })
});

function showCountryData(data){
    cardInfoContainer.style.display = "block";
    mainContainer.style.display = "none";

    cardInfoContainer.innerHTML = `
    <button class="back-btn"><span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg></span> 
                Back
        </button>
        <div class="card-info-inner-container">
            <div class="card-info-image"><img src="${data.flags.png}" alt=""></div>
            <div class="card-info-details">
                <h1 class="info-coutry-name">${data.name.common}</h1>
                <div class="data-container">
                    <div class="left info-country-data">
                        <p class="data-tag">Native Name: <span class="info-data">${Object.values(data.name.nativeName)[0].official}</span> </p>
                        <p class="data-tag">Population: <span class="info-data">${data.population}</span> </p>
                        <p class="data-tag">Region: <span class="info-data">${data.region}</span> </p>
                        <p class="data-tag">Sub Region: <span class="info-data">${data.subregion}</span> </p>
                        <p class="data-tag">Capital: <span class="info-data">${data.capital}</span> </p>
                    </div>
                    <div class="right info-country-data">
                        <p class="data-tag">Top level domain: <span class="info-data">${data.tld}</span> </p>
                        <p class="data-tag">Currencies: <span class="info-data">${Object.values(data.currencies)[0].name}</span> </p>
                        <p class="data-tag">Languages: <span class="info-data">${Object.values(data.languages)}</span> </p>
                    </div>
                </div>
            </div>
        </div>`

        const backBtn = document.querySelector('.back-btn');
        const cardDetailText = document.querySelector('.card-info-details');

        darkMode.addEventListener('click', () => {
            backBtn.classList.toggle('active');
            cardDetailText.classList.toggle('active');
        })

        backBtn.addEventListener("click", () => {
            mainContainer.style.display = "block";
            cardInfoContainer.style.display = "none";
        })
};

// issues:
// map method while fetching the data is not working
// also the dark mode is not working for back button in info Container


