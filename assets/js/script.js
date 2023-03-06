

let cityForm = document.querySelector("#city-form");
let searchInput = document.querySelector("#search-input");
let mainContainer = document.querySelector("#main-card");
let subContainer = document.querySelector("#under-cards");
let locationIcon = document.querySelector(".weather-icon");


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
            let weatherUrl =  ("https://api.openweathermap.org/data/2.5/forecast?lat=" +  latitude + "&lon=" + longitude + "&units=imperial&appid=13fc8a4828ae1fb9669507e9c2cc39cf");

            console.log("weatherUrl", weatherUrl);

            fetch(weatherUrl)
                .then(function (weather) {
                    return weather.json();
                    })

            .then(function (result) {

                if (!document.getElementById(searchInput.value)) {
                    let button = document.createElement("button");
                    button.id = searchInput.value;
                    button.value = searchInput.value;
                    button.textContent = searchInput.value;
                    button.onclick = event;
            
                    cityForm.appendChild(button);

                    let currentWeather = [
                        (result.city.name),
                        (result.list[0].dt_txt),
                        ("Temperature: " + result.list[0].main.temp + "°F"),
                        ("Humidity: " + result.list[0].main.humidity + "%"),
                        ("Windspeed: " + result.list[0].wind.speed + "mi/h")
                    ];

                    let dayTwo = [
                        (result.city.name),
                        (result.list[7].dt_txt),
                        ("Temperature: " + result.list[7].main.temp + "°F"),
                        ("Humidity: " + result.list[7].main.humidity + "%"),
                        ("Windspeed: " + result.list[7].wind.speed + "mi/h")
                    ];

                    let dayThree = [
                        (result.city.name),
                        (result.list[15].dt_txt),
                        ("Temperature: " + result.list[15].main.temp + "°F"),
                        ("Humidity: " + result.list[15].main.humidity + "%"),
                        ("Windspeed: " + result.list[15].wind.speed + "mi/h")
                    ];

                    let dayFour = [
                        (result.city.name),
                        (result.list[23].dt_txt),
                        ("Temperature: " + result.list[23].main.temp + "°F"),
                        ("Humidity: " + result.list[23].main.humidity + "%"),
                        ("Windspeed: " + result.list[23].wind.speed + "mi/h")
                    ];

                    let dayFive = [
                        (result.city.name),
                        (result.list[31].dt_txt),
                        ("Temperature: " + result.list[31].main.temp + "°F"),
                        ("Humidity: " + result.list[31].main.humidity + "%"),
                        ("Windspeed: " + result.list[31].wind.speed + "mi/h")
                    ];
                    
                    let daySix = [
                        (result.city.name),
                        (result.list[39].dt_txt),
                        ("Temperature: " + result.list[39].main.temp + "°F"),
                        ("Humidity: " + result.list[39].main.humidity + "%"),
                        ("Windspeed: " + result.list[39].wind.speed + "mi/h")
                    ];

                
                    console.log(currentWeather);
                    console.log(dayTwo);
                    console.log(dayThree);
                    console.log(dayFour);
                    console.log(dayFive);
                    console.log(daySix);

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