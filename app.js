// init classes

const weather = new WeatherByCityName();
const weatherZip = new WeatherByZipCode();

//retrieve html elements

const btn = document.getElementById("btn");
const cityInput = document.getElementById("city-input");
const countryInput = document.getElementById("country-input");
const zipcodeInput = document.getElementById("zipcode-input");

const degreeBtn = document.getElementById("degree-format");
const weatherDescription = document.getElementById("weather-description");
let unit = "metric";
let degree = "C°";
let windSpeed = "meter/second";

// function get and show weather

function getAndShowWeather() {
  let cityName = cityInput.value;
  let countryName = countryInput.value;
  let zipcode = zipcodeInput.value;  

  if (cityName !== "" && countryName !== "" && zipcode === "") {
    /* //capitalize city name
    cityName = cityName[0].toUpperCase() + cityName.slice(1); */

    weather.getWeatherCityName(cityName, countryName, unit).then((data) => {
      //show alert if city name cannto be found
      if (data.message === "city not found") {
        showAlert("City not found");
        weatherDescription.innerHTML = "";
      } else {
/*         console.log(data);
 */
        weatherDescription.innerHTML = `<h3>The current weather in ${data.name} (${countryName}) is:</h3> 
       <ul>
        <li>Description: ${data.weather[0].description};</li>
        <li>Min-temperature: ${data.main.temp_min} ${degree};</li>
        <li>Max-temperature: ${data.main.temp_max} ${degree};</li>
        <li>Clouds: ${data.clouds.all}%;</li>
        <li>Wind speed: ${data.wind.speed} ${windSpeed};</li>
        <li>Humidity: ${data.main.humidity}%;</li>
       </ul>
     <div><img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="icon"></div>`;
      }
    });
  } else if (zipcode !== "" && countryName !== "" && cityName === "") {
    weatherZip.getWeatherZipCode(zipcode, countryName, unit).then((data) => {
      //show alert
      if (data.message === "city not found") {
        showAlert("Check zipcode");
        weatherDescription.innerHTML = "";
      } else {
/*         console.log(data);
 */        weatherDescription.innerHTML = `<h3>The current weather in ${data.name} (${countryName}) is:</h3> 
        <ul>
         <li>Description: ${data.weather[0].description};</li>
         <li>Min-temperature: ${data.main.temp_min} ${degree};</li>
         <li>Max-temperature: ${data.main.temp_max} ${degree};</li>
         <li>Clouds: ${data.clouds.all}%;</li>
         <li>Wind speed: ${data.wind.speed} ${windSpeed};</li>
         <li>Humidity: ${data.main.humidity}%;</li>
        </ul>
      <div><img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="icon"></div>`;
      }
    });
  } else {
    showAlert("Fill out fields correctly");
    weatherDescription.innerHTML = "";
  }
}

///event listeners

//display weather
btn.addEventListener("click", getAndShowWeather);
document.getElementById("container").addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    getAndShowWeather();
  }
});

// change units format and display weather

degreeBtn.addEventListener("click", changeDegreeFormat);
degreeBtn.addEventListener("click", getAndShowWeather);
