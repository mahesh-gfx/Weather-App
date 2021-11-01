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
  var days = 6;
  var urlForLive = `http://api.weatherapi.com/v1/current.json?key=981c56aab5ba4484a7a105826210109&q=${location}`;
  var urlForForecast = `http://api.weatherapi.com/v1/forecast.json?key=981c56aab5ba4484a7a105826210109&q=${location}&days=${days}`;

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
      console.log("Forecast");
      console.log({ data });
    });
}

document.getElementById("search-query").onclick = function search() {
  var searchQuery = document.getElementById("search").value;
  weatherAPI(searchQuery);
};
