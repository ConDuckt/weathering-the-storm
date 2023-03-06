// setting global variables
let cityForm = document.querySelector("#city-form");
let searchInput = document.querySelector("#search-input");
let mainContainer = document.querySelector("#main-card");
let subContainer = document.querySelector("#under-cards");
let locationIcon = document.querySelector(".weather-icon");
// webapp main function
function displayWeather(event) {
    event.preventDefault();
// getting a city's coordinates via an initial API call
    let locationUrl = ("http://api.openweathermap.org/geo/1.0/direct?q=" + searchInput.value + "&appid=13fc8a4828ae1fb9669507e9c2cc39cf");

    fetch(locationUrl)
        .then(function (location) {
            return location.json();
        })
// plugging the coordinates into a second API call
        .then(function (coordinates) {
            let latitude = (coordinates[0].lat);
            let longitude = (coordinates[0].lon);
            let weatherUrl =  ("https://api.openweathermap.org/data/2.5/forecast?lat=" +  latitude + "&lon=" + longitude + "&units=imperial&appid=13fc8a4828ae1fb9669507e9c2cc39cf");

            fetch(weatherUrl)
                .then(function (weather) {
                    return weather.json();
                    })
// using the second call JSON
            .then(function (result) {
// creating a button for new cities entered into form
                if (!document.getElementById(searchInput.value)) {
                    let button = document.createElement("button");
                    button.id = searchInput.value;
                    button.value = searchInput.value;
                    button.textContent = searchInput.value;
                    button.onclick = event;
            
                    cityForm.appendChild(button);
// getting JSON data for current weather
                    let currentWeather = [
                        (result.city.name),
                        (result.list[0].dt_txt),
                        ("Temperature: " + result.list[0].main.temp + "°F"),
                        ("Humidity: " + result.list[0].main.humidity + "%"),
                        ("Windspeed: " + result.list[0].wind.speed + "mi/h")
                    ];
// getting JSON data for 5-day forecast
                    let forecastArray = [];
// using for loop to specify every 8th indexed item since JSON returns 8 timestamps/day
                    for (var i = 7; i < result.list.length; i+=8) {
                        forecastArray.push([
                            (result.city.name),
                            (result.list[i].dt_txt),
                            ("Temperature: " + result.list[i].main.temp + "°F"),
                            ("Humidity: " + result.list[i].main.humidity + "%"),
                            ("Windspeed: " + result.list[i].wind.speed + "mi/h"),
                        ]);
                    };
                
                    console.log(currentWeather);
                    console.log(forecastArray);

                  }});
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