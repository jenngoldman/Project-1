$(document).ready(function() {
    // Initiate carousel.
    $(".carousel.carousel-slider").carousel({
        fullWidth: true,
        indicators: true
    });

    $("#info-button").on("click", function(event) {
        event.preventDefault();
        
        if (!$("#city-input").val()) {
            M.toast({html: 'Error: Cannot leave city name blank.'})
            return;
        }

       // Clear the search results everytime this button is clicked.
        $("#search-results").empty();

        getCityInfo();
    });
});


function getCityInfo() {
    var city = $("#city-input").val();

    $.ajax({
        url: "https://api.teleport.org/api/cities/?search=" + city,
        method: "GET"
    }).then(function(response) {
        var searchResults = response._embedded["city:search-results"];
        var searchResultsLabel = $("<div/>");

        // Add the search results label.
        searchResultsLabel.addClass("search-results-label");
        searchResultsLabel.text("Search Results: " + searchResults.length);
        $("#search-results").append(searchResultsLabel);

        // Create a link for all city matches.
        for (x = 0; x < searchResults.length; x++) {
            var currentResult = searchResults[x];
            var matchingName = currentResult.matching_full_name;
            var cityLink = currentResult._links["city:item"].href;
            var link = $('<a href="#"></a>');

            // Save the the endpoint url for each city in the link's data-url attribute.
            link.addClass("city-link");
            link.attr("data-url", cityLink);
            link.text(matchingName);
            $("#search-results").append(link);

            // Add separator after each link except for the last.
            if (x < searchResults.length - 1) {
                var separator = $("<span/>");

                separator.text(" | ");
                $("#search-results").append(separator);
            }
        }

        // When clicked, make an ajax call to the url we saved in the link's data-url attribute.
        $(".city-link").on("click", function() {
            var url = $(this).attr("data-url");
            var cityNameHeader = $("#city-name-header");

            // Clear the header and city score info.
            cityNameHeader.empty();
            $("#scores").empty();

            $.ajax({
                url: url,
                method: "GET"
            }).then(function(response) {
                console.log(response);
                var urbanAreaUrl = response._links["city:urban_area"] ? response._links["city:urban_area"].href : "";
                var fullCityName = response.full_name;
                var population = response.population;
                var fullCityNameArray = fullCityName.split(", ");
                var cityName = fullCityNameArray[0];
                
                // Get weather info on city name of the search result link clicked.
                getWeatherInfo(cityName);

                // Add the city name header.
                cityNameHeader.text(fullCityName);
                $("#city-info-container").before(cityNameHeader);

                // Smoothly scrolls to top of the city name header.
                $("html, body").animate({
                    scrollTop: cityNameHeader.offset().top
                }, 1000)

                // The url to get the scores for the city may not exist.
                if (urbanAreaUrl === "") {
                    var noInfoMessage = $("<div/>");
                    noInfoMessage.text("Sorry, no urban area data found for this city.");
                    $("#scores").append(noInfoMessage);
                    return;
                }

                $.ajax({
                    url: urbanAreaUrl + "scores/",
                    method: "GET"
                }).then(function(response) {
                    console.log(response);
                    var overviewHeader = $("<h3>").text("Overview");
                    var categories = response.categories;
                    var summary = $("<p>");
                    var divider = $("<hr>");
                    var populationContainer = $("<div>");

                    // Add the summary and a divider.
                    summary.html(response.summary);
                    $("#scores").append(overviewHeader);
                    $("#scores").append(summary);
                    $("#scores").append(divider);
                    
                    // Add the population.
                    populationContainer.addClass("population-container");

                    // toLocaleString() will format the population with commas.
                    populationContainer.html("<b>" + "Population: " + population.toLocaleString() + "</b>");
                    $("#scores").append(populationContainer);

                    // Create a progress bar for each category.
                    for (x = 0; x < categories.length; x++) {
                        var category = categories[x];
                        var categoryContainer = $("<div>");
                        var categorySpan = $("<span>");
                        var progressBarContainer = $("<div>");
                        var progressBar = $("<div>");
                        var scoreSpan = $("<span>");
                        var score = category.score_out_of_10;
                        var scorePretty = score.toFixed(1);

                        categorySpan.html("<b>" + category.name + ": " + "</b>");
                        scoreSpan.text(scorePretty + " / 10");
                        categoryContainer.append(categorySpan);
                        categoryContainer.append(scoreSpan);

                        progressBarContainer.addClass("progress");

                        progressBar.addClass("progress-bar");
                        progressBar.addClass("determinate")
                        progressBar.attr("role", "progressbar");
                        progressBar.css("width", (score * 10) + "%");
                        progressBar.css("background-color", category.color);
                        

                        progressBarContainer.append(progressBar);
                        categoryContainer.append(progressBarContainer);
                        $("#scores").append(categoryContainer);
                    }
                })
            })
        })
    });
}

function getWeatherInfo(cityName) {
    $("#weather-container").empty();

    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial" + "&APPID=93b0b95ebf8ba899a59fbabc484138f0",
        method: "GET"
    }).then(function(response) {
        console.log(response);

        for (i = 0; i < response.weather.length; i++) {
            var weather = response.weather[i];
            var mainText = weather.main;
            var iconCode = weather.icon;

            // Create html elements and append to page.
            var weatherHeader = $("<h3>").text("Local Weather");
            weatherHeader.addClass("weather-header");
            
            var weatherMainContainer = $("<span>");
            weatherMainContainer.addClass("weather-main-container");
            weatherMainContainer.html( "Currently: " + mainText);

            var iconImage = $("<img>");
            iconImage.attr("src", "http://openweathermap.org/img/w/" + iconCode + ".png");

            $("#weather-container").append(weatherHeader);
            $("#weather-container").append(weatherMainContainer);
            weatherMainContainer.append(iconImage); 
        }
 
        var details = response.main;
        var temp = details.temp;
        var humidity = details.humidity;

        var detailsContainer = $("<div>");
        var tempDiv = $("<div>");
        var humidityDiv = $("<div>");
        
        tempDiv.text("Temperature: " + temp + " °F");
        humidityDiv.text("Humidity: " + humidity + "%");
        
        detailsContainer.append(tempDiv);
        detailsContainer.append(humidityDiv);
         
        $("#weather-container").append(detailsContainer);
    }); 
};
