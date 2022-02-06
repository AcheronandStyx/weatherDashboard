var searchEl = document.querySelector("#city-form");
var cityNameEl = document.querySelector("#cityName");
var cityContainerEl = document.querySelector("#city-container");
var cityDetailEl = document.querySelector("#cityDetail");
var fiveDayEl = document.querySelector("#fiveDay");


var formHandler = function (event) {

    // prevent page from refreshing
    event.preventDefault();

    // clear previous content
    removeChildNodes(cityDetailEl);
    removeChildNodes(fiveDayEl);

    var cityName = cityNameEl.value.trim();

    if (cityName) {
        // if cityName is present call getWeatherData
        getCooridnates(cityName);

        cityNameEl.value = "";
    } else {
        var msg = "Please enter a city Name"
        var msgEl = document.createElement("h2");

        msgEl.textContent = (msg);

        document.getElementById("cityDetail").appendChild(msgEl);
        cityNameEl.value = "";
    }
};

var removeChildNodes = function (parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
};

var getCooridnates = function (cityName) {

    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=29ef50d060c47733c354da0cfb28c4e5";

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            var msg = "That city was not found.  Please check your entry and try again."
            var msgEl = document.createElement("h2");

            msgEl.textContent = (msg);

            document.getElementById("cityDetail").appendChild(msgEl);

        }
    }).then(function (data) {
        console.log(data);
        getWeatherData(data);
    });

};

var getWeatherData = function (latLon) {

    // pull out latitude and longitude for a follow up call to get more data to work with
    var lat = latLon.coord.lat;
    var lon = latLon.coord.lon;
    var cityName = latLon.name;
    console.log(cityName);

    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=29ef50d060c47733c354da0cfb28c4e5";

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            var msg = "That city was not found.  Please check your entry and try again."
            var msgEl = document.createElement("h2");

            msgEl.textContent = (msg);

            document.getElementById("cityDetail").appendChild(msgEl);
        }
    }).then(function (data) {
        console.log(data);
        cityDetail(data, cityName, lat, lon);
    });
};

var cityDetail = function (weather, cityName, lat, lon) {

    var params = ["feels_like", "wind_speed", "humidity", "uvi"];
    var cityName = cityName;
    var date = "today";
    var headerEl = document.createElement("h3")
    var headerText = cityName + " | " + date;
    
    for (var i = 0; i < params.length; i++) {
        var key = params[i];
        var temp = weather.current[key];
        var statEl = document.createElement("li")

    };

    /*
    var temp = weather.current.feels_like;
    var wind = weather.current.wind_speed;
    var humidity = weather.current.humidity;
    var uv = weather.current.uvi;
    */




    fiveDayForecast(weather, lat, lon);
};

var fiveDayForecast = function (weather, lat, lon) {
    console.log(lat);

    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=29ef50d060c47733c354da0cfb28c4e5";
    //get five day forecast
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            var msg = "That city was not found.  Please check your entry and try again."
            var msgEl = document.createElement("h2");

            msgEl.textContent = (msg);

            document.getElementById("cityDetail").appendChild(msgEl);
        }
    }).then(function (data) {
        console.log(data);
    });

};




searchEl.addEventListener("submit", formHandler);