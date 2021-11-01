var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

//Geolocation Api
navigator.geolocation.getCurrentPosition(success, error, options);

function success(pos) {
  var latitude = pos.coords.latitude;
  var longitude = pos.coords.longitude;

  var accessToken = "pk.d2a483ead28060cc7405107f8b3e40de";
  var revGeocodingUrl = `https://us1.locationiq.com/v1/reverse.php?key=${accessToken}&lat=${latitude}&lon=${longitude}&format=json`;

  var loc = "";

  //Reverse geolocation API call
  fetch(revGeocodingUrl)
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      loc += data.address.county;
      loc += ", ";
      loc += data.address.country;
      weatherAPI(loc);
    });
}
function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

function weatherAPI(location) {
  var urlForLive = `http://api.weatherapi.com/v1/current.json?key=981c56aab5ba4484a7a105826210109&q=${location}`;
  var urlForForecast = `http://api.weatherapi.com/v1/forecast.json?key=981c56aab5ba4484a7a105826210109&q=${location}&days=6`;

  //Weather API Call for Current Weather
  fetch(urlForLive)
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      var date = new Date(data.current.last_updated);
      document.getElementById("condition-ico").src =
        data.current.condition.icon;
      document.getElementById("location").innerHTML = location;
      document.getElementById("temperature").innerHTML = data.current.temp_c;
      document.getElementById("humidity").innerHTML =
        " " + data.current.humidity;
      document.getElementById("precipitation").innerHTML =
        " " + data.current.precip_mm + " mm";
      document.getElementById("last-update").innerHTML =
        date.toDateString() + " at " + date.toLocaleTimeString();
      document.getElementById("condition").innerHTML =
        data.current.condition.text + " at";
      document.getElementById("wind").innerHTML =
        data.current.wind_kph +
        " kph in " +
        data.current.wind_dir +
        " direction.";
      document.getElementById("pressure").innerHTML =
        " " + data.current.pressure_mb + " millibars";
    });

  //Weather API call for Forecast
  fetch(urlForForecast)
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      console.log(`Forecast for ${location}`);
      console.log({ data });
      var forecastData = data.forecast.forecastday;
      var forecastBody = document.getElementById("forecast-data");
      var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      forecastBody.innerHTML = "";

      for (i = 0; i < forecastData.length; i++) {
        var forecastDayCard = document.createElement("div");
        forecastDayCard.setAttribute("class", "forecast-day-card");

        var forecastDay = document.createElement("div");
        forecastDay.setAttribute("class", "forecast-day");
        var dateString = forecastData[i].date;
        var d = new Date(dateString);
        var dayName = days[d.getDay()];
        console.log(dayName);
        forecastDay.innerText = dayName;

        var tempContainer = document.createElement("div");
        tempContainer.setAttribute("class", "temp-container");

        var forecastTempMax = document.createElement("div");
        forecastTempMax.setAttribute("class", "forecast-temp-max");
        forecastTempMax.innerText =
          "Max: " + forecastData[i].day.maxtemp_c + " °C";

        var forecastTempMin = document.createElement("div");
        forecastTempMin.setAttribute("class", "forecast-temp-min");
        forecastTempMin.innerText =
          "Min: " + forecastData[i].day.mintemp_c + " °C";

        var forecastCondition = document.createElement("img");
        forecastCondition.setAttribute("class", "weather-condition-icon");
        forecastCondition.src = forecastData[i].day.condition.icon;

        forecastDayCard.append(forecastDay);
        tempContainer.append(forecastTempMax);
        tempContainer.append(forecastTempMin);
        forecastDayCard.append(tempContainer);
        forecastDayCard.append(forecastCondition);
        forecastBody.append(forecastDayCard);
      }
      console.log(urlForForecast);
    });
}

document.getElementById("search-query").onclick = function search() {
  var searchQuery = document.getElementById("search").value;
  weatherAPI(searchQuery);
};
