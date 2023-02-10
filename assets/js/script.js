// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

var apiKey = "463ce473edf257f39d0880275aa13e0d";
var SearchesSaved = [];

// cities that were searched already by the user
var searchHistoryNames = function(cityName) {
    ('.earlier-search:contains("' + cityName + '")').remove();

    // the entry can be put in with the city name
    var historySearch = $("<p>");
    historySearch.addClass("earlier-search");
    historySearch.text(cityName);

    //creating container that holds the entry that is submitted by pressing the button
    var containerSearch = $("<div>");
    containerSearch.addClass("earlier-search-container");

    // use append to make sure entry goes into the container
    containerSearch.append(historySearch);

    //connecting search history to container with append to correctly display
    var historySearchContainerEl = $("#last-search-container");
    historySearchContainerEl.append(containerSearch);

    if(SearchesSaved.length > 0){
        // putting previous searches into the array that were saved
        var pastSavedSearch = localStorage.getItem("SearchesSaved");
        SearchesSaved = JSON.parse(pastSavedSearch);
    }

    // putting the city name into the array of saved searches
    SearchesSaved.push(cityName);
    localStorage.setItem("SearchesSaved", JSON.stringify(SearchesSaved));

    // restarting the search when a new user comes to the page
    $("#search-in").val("");
};

// actually getting searches to show up in container 
var loadingSearchHistory = function() {
    var searchHistoryData = localStorage.getItem("SearchesSaved");

    // if there are no previous searches, return false
    if(!searchHistoryData) {
        return false;
    }

    searchHistoryData = JSON.parse(searchHistoryData);

    for (var i = 0; i < searchHistoryData.length; i++) {
        searchHistoryNames(searchHistoryData[i]);
    }
};

// using the open weather api to get and call data based on current weather
var WeatherNowSection = function(cityName) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}')
    // getting response from api and turn it into objects on page
    .then(function(response) {
        return response.json();
    })

    .then(function(response) {
        // latitude and longitude 
        var cityLong = response.coord.lon;
        var cityLat = response.coord.lat;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLong}&exclude=minutely,hourly,alerts&units=imperial&appid=${apiKey}`)
        // getting response data from calling this API
        .then(function(response) {
            return response.json();
        })

        //  apply responses to the current weather area
        .then(function(response) {
            searchHistoryNames(cityName);

            // current weather container with border made in bootstrap
            var WeatherNowContainer = $("#weather-now-container");
            WeatherNowContainer.addClass("weather-now-container");

            // icons
            var nowTitle = $("#title-now");
            var currentDay = moment().format("M/D/YYYY");
            nowTitle.text(`${cityName} (${currentDay})`);
            var IconNow = $("#weather-now-icon");
            IconNow.addClass("weather-now-icon");
            var IconNowCode = response.current.weather[0].icon;
            IconNow.attr("src", `https://openweathermap.org/img/wn/${IconNowCode}@2x.png`);

            // temperature section
            var currentTemperature = $("#temperature-now");
            currentTemperature.text("Temperature: " + response.current.temp + " \u00B0F");

            //humidity
            var currentHumidity = $("#humidity-now");
            currentHumidity.text("Humidity: " + response.current.humidity + "%");

            // wind speed
            var WindSpeedNow = $("#wind-now");
            WindSpeedNow.text("Wind Speed: " + response.current.wind_speed + " MPH");
        })
    })
    .catch(function(err) {
        // resetting the information that is searched
        $("#search-in").val("");

        alert("Cannot find city you searched for. Please try searching for valid city.");
    });
};

// starting 5 day forecast section
var fiveDayForecast = function(cityName) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
    // turn response into object
    .then(function(response) {
        return response.json()
    })

    .then(function(response) {
        var cityLong = response.coord.lon;
        var cityLat = response.coord.lat;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLong}&exclude=minutely,hourly,alerts&units=imperial&appid=${apiKey}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            console.log(response);

            var WeatherForecastTitle = $("#weather-forecast-title");
            WeatherForecastTitle.text("See Five Day Forecast:")

            for (var i = 1; i <= 5; i++) {
                var UpcomingCard = $(".forecast-card");
                UpcomingCard.addClass("forecast-card-info");

                var forecastDate = $("#forecast-date-" + i);
                date = moment().add(i, "d").format("M/D/YYYY");
                forecastDate.text(date);

                var forecastIcon = $("#future-icon-" + i);
                forecastIcon.addClass("future-icon");
                var forecastIconCode = response.daily[i].weather[0].icon;
                forecastIcon.attr("src", `https://openweathermap.org/img/wn/${forecastIconCode}@2x.png`);


            }

    })
}




