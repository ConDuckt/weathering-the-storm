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

        // plugging the coordinates from first API call
        // into a second API call for actual weather data
        .then(function (coordinates) {
            let latitude = (coordinates[0].lat);
            let longitude = (coordinates[0].lon);
            let weatherUrl =  ("https://api.openweathermap.org/data/2.5/forecast?lat=" +  latitude + "&lon=" + longitude + "&units=imperial&appid=13fc8a4828ae1fb9669507e9c2cc39cf");

            fetch(weatherUrl)
                .then(function (weather) {
                    return weather.json();
                })

                .then(function (result) {

                    // clearing any existing container text
                    mainContainer.innerHTML = "";
                    subContainer.innerHTML = "";

                    // separated appended button functionality
                    // from displayWeather(event) so they remain
                    // funtional
                    function buttonClick(clickAgain) {
                        let button = clickAgain.target;
                        let searchTerm = button.value;
                        searchInput.value = searchTerm;
                        displayWeather(clickAgain);
                    };

                    if (!document.getElementById(searchInput.value)) {
                        let button = document.createElement("button");
                        button.id = searchInput.value;
                        button.value = searchInput.value;
                        button.textContent = searchInput.value;
                        button.onclick = buttonClick;
                
                        cityForm.appendChild(button);
                    };

                    // setting JSON data for current weather
                    let currentWeather = [
                        (result.city.name),
                        (result.list[0].dt_txt),
                        ("Temperature: " + result.list[0].main.temp + "°F"),
                        ("Humidity: " + result.list[0].main.humidity + "%"),
                        ("Windspeed: " + result.list[0].wind.speed + "mi/h")
                    ];

                    for (let item of currentWeather) {
                        let listItem = document.createElement("li");
                        let textNode = document.createTextNode(item);
                        listItem.appendChild(textNode);
                        mainContainer.appendChild(listItem);
                    };

                    // setting JSON data for 5-day forecast
                    // using for loop to specify every 8th indexed 
                    // item since JSON returns 8 timestamps/day
                    let forecastArray = [];

                    for (let i = 7; i < result.list.length; i+=8) {
                        forecastArray.push([
                            (result.city.name),
                            (result.list[i].dt_txt),
                            ("Temperature: " + result.list[i].main.temp + "°F"),
                            ("Humidity: " + result.list[i].main.humidity + "%"),
                            ("Windspeed: " + result.list[i].wind.speed + "mi/h"),
                        ]);
                    };

                    for (let item of forecastArray) {
                        let listItem = document.createElement("li");
                        let textNode = document.createTextNode(item);
                        listItem.appendChild(textNode);
                        subContainer.appendChild(listItem);
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