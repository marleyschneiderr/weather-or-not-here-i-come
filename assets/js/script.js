// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

var apiKey = "7ff1d8af886ebe90b5084ef41fcbb528";
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

    
}


