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

function getAndShowWeather(){
  let location = locationInput.value;
  let country = countryInput.value;
  let prefix = "q=";
  
  if(location === "" || country === ""){
    showAlert("Fill out all fields")
  } else {
    getWeatherRequest(prefix, location, country, unit).then((data)=>{
      if(typeof location === "number"){
        prefix ="zip="
      } if(data.message === "city not found") {
        showAlert("City not found");
      } 
      weatherDescription.innerHTML = `<h3>The current weather in ${data.name} (${country}) is:</h3> 
      <ul>
       <li>Description: ${data.weather[0].description};</li>
       <li>Min-temperature: ${data.main.temp_min} ${degree};</li>
       <li>Max-temperature: ${data.main.temp_max} ${degree};</li>
       <li>Clouds: ${data.clouds.all}%;</li>
       <li>Wind speed: ${data.wind.speed} ${windSpeed};</li>
       <li>Humidity: ${data.main.humidity}%;</li>
      </ul>
    <div><img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="icon"></div>`
    })
  }
}

///event listeners

// display weather
btnDisplayWeather.addEventListener("click", getAndShowWeather);
document.getElementById("main-content").addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    getAndShowWeather();
  }
});

// change units format and display weather

degreeBtn.addEventListener("click", changeDegreeFormat);
degreeBtn.addEventListener("click", getAndShowWeather);
