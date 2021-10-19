/* var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function success(pos) {
  var crd = pos.coords;
  var latitude = crd.latitude;
  var longitude = crd.longitude;
  var key = "AIzaSyAMX6-rANZLmhIj5kOQ80pJCPpxmF1zXPQ";

  console.log("Your current position is:");
  console.log(`Latitude : ${latitude}`);
  console.log(`Longitude: ${longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);

  let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng= ${latitude},${longitude}&key=${key}`;

  //geocoding-api-call
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    });
}
function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);
 */
//weather-api-call

var loc = "Chennai, India";
var url = `http://api.weatherapi.com/v1/current.json?key=981c56aab5ba4484a7a105826210109&q= $(loc)`;

fetch(
  "http://api.weatherapi.com/v1/current.json?key=981c56aab5ba4484a7a105826210109&q=Chennai India"
)
  .then(function (response) {
    return response.json();
  })
  .then((data) => {
    var date = new Date(data.current.last_updated);
    console.log(date);
    document.getElementById("condition-ico").src = data.current.condition.icon;
    document.getElementById("location").innerHTML = loc;
    document.getElementById("temperature").innerHTML = data.current.temp_c;
    document.getElementById("humidity").innerHTML = " " + data.current.humidity;
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
