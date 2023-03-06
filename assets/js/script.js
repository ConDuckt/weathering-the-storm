

let cityForm = document.querySelector("#city-form");
let searchInput = document.querySelector("#search-input");
let mainContainer = document.querySelector("#main-card");
let subContainer = document.querySelector("#under-cards");

function displayWeather(event) {
    event.preventDefault();

    let locationUrl = ("http://api.openweathermap.org/geo/1.0/direct?q=" + searchInput.value + "&appid=13fc8a4828ae1fb9669507e9c2cc39cf");
       
        console.log("locationUrl", locationUrl);
        console.log("searchInput", searchInput.value);

    fetch(locationUrl)
        .then(function (location) {
            return location.json();
        })

        .then(function (coordinates) {
            let latitude = (coordinates[0].lat);
            let longitude = (coordinates[0].lon);
            let weatherUrl =  ("https://api.openweathermap.org/data/2.5/forecast?lat=" +  latitude + "&lon=" + longitude + "&limit=6&appid=13fc8a4828ae1fb9669507e9c2cc39cf");

            console.log("weatherUrl", weatherUrl);

            fetch(weatherUrl)
                .then(function (weather) {
                    return weather.json();
                    })

            .then(function (result) {
                console.log(result);
                
                if (!document.getElementById(searchInput.value)) {
                    var button = document.createElement("button");
                    button.id = searchInput.value;
                    button.value = searchInput.value;
                    button.textContent = searchInput.value;
                    button.onclick = event;
            
                    cityForm.appendChild(button);

            };
        });
    })};


cityForm.addEventListener('submit', displayWeather);




/*


2. Get search history from localStorage.
3. Display past searches as buttons beneath form.
    a. On click, append cards in the manner of 4c and 4d below.
4. On submission: 
    a. Fetch coordinates with weather API.
    b. Set results to localStorage.
    c. Append main card w/ current datapoints for coordinates.
    d. Append 5-day datapoints in separate cards.

*/