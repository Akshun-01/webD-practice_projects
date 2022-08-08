// to generate maps
var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);
 
// js used 
const button = document.querySelector('.arrow');

let ipAddress = document.querySelector('#ip-address');
let locations = document.querySelector('#locations');
let timezone = document.querySelector('#timezone');
let isp = document.querySelector('#isp');

button.addEventListener('click', displayData);

var marker = L.marker([51.505, -0.09]).addTo(map);
map.setView([lat, lng], 13);

async function displayData() {

    let id = document.querySelector('#search-bar').value;
    const getData = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_7ie4Eyoht723wv5uo53sRbkLnqQPG&ipAddress=${id}`);

    const info = await getData.json();

    ipAddress.innerHTML = info.ip;
    locations.innerHTML = `${info.location.country}, ${info.location.region}`;
    timezone.innerHTML = `UTC ${info.location.timezone}`;
    isp.innerHTML = info.isp;

    // changing markers location 
    const lat = info.location.lat;
    const lng = info.location.lng;

    map.setView([lat, lng], 16);
    var marker = L.marker([lat, lng]).addTo(map);

    console.log(info);
}


