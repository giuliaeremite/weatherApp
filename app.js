//retrieving html elements

const btnDisplayWeather = document.getElementById("btn-displayWeather");
const locationInput = document.getElementById("location-input");
const countryInput = document.getElementById("country-input");
const zipcodeInput = document.getElementById("zipcode-input");
const degreeBtn = document.getElementById("btn-changeDegreeFormat");
const weatherDescription = document.getElementById("weather-description");

// units variables

let unit = "metric";
let degree = "C°";
let windSpeed = "meter/second";

// function get and show weather

function getAndShowWeather() {
  // getting the inputs values
  let location = locationInput.value;
  let country = countryInput.value;
  // declare prefix variable
  let prefix = "q=";

  if (location === "" || country === "") {
    //if one of the fiels is clear, show alert message
    showAlert("Fill out all fields");
  } else {
    getWeatherRequest(prefix, location, country, unit).then((data) => {
      //if user enter zipcode change prefix
      if (typeof location === "number") {
        prefix = "zip=";
      }
      if (data.message === "city not found") {
        //if city is not found, show alert
        showAlert("City not found");
        weatherDescription.innerHTML = "";
      }
      //populate weather description with data from API
      weatherDescription.innerHTML = `<h3>The current weather in ${data.name} (${country}) is:</h3> 
      <ul>
       <li>Description: ${data.weather[0].description};</li>
       <li>Min-temperature: ${data.main.temp_min} ${degree};</li>
       <li>Max-temperature: ${data.main.temp_max} ${degree};</li>
       <li>Clouds: ${data.clouds.all}%;</li>
       <li>Wind speed: ${data.wind.speed} ${windSpeed};</li>
       <li>Humidity: ${data.main.humidity}%;</li>
      </ul>
    <div><img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="icon"></div>`;
    });
  }
}

///event listeners

// display weather on click or enter key
btnDisplayWeather.addEventListener("click", getAndShowWeather);
document.getElementById("main-content").addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    getAndShowWeather();
  }
});

// change units format and display weather

degreeBtn.addEventListener("click", changeDegreeFormat);
degreeBtn.addEventListener("click", getAndShowWeather);
