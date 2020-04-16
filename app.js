//retrieving html elements

const btnDisplayWeather = document.getElementById("btn-displayWeather");
const locationInput = document.getElementById("location-input");
const countryInput = document.getElementById("country-input");
const degreeBtn = document.getElementById("btn-changeDegreeFormat");
const weatherDescription = document.getElementById("weather-description");

// units variables
let prefix = "q=";
let unit = "metric";
let degree = "C°";
let windSpeed = "meter/second";

/// INIT APPLICATION ///

(function () {
  //populate select input
  populateSelectInput(countryInput);

  //clear input field
  locationInput.addEventListener("focus", clearField);

  // display weather on click
  btnDisplayWeather.addEventListener("click", function () {
    getAndShowWeather(locationInput.value, countryInput.value);
  });
  // or enter key
  document.getElementById("main-content").addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
      getAndShowWeather(locationInput.value, countryInput.value);
    }
  });

  // change units format and display weather
  degreeBtn.addEventListener("click", changeDegreeFormat);

  degreeBtn.addEventListener("click", function () {
    getAndShowWeather(locationInput.value, countryInput.value);
  });
})();
