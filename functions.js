// get and show weather

function getAndShowWeather(location, country) {

  if (location === "" || country === "") {
    //if one of the fiels is clear, show alert message
    showAlert("Fill out all fields");
  } else {
    requests.getWeatherRequest(prefix, location, country, unit).then((data) => {
      //if user enter zipcode change prefix
      if (typeof location === "number") {
        prefix = "zip=";
      }
      if (data.message === "city not found") {
        //if city is not found, show alert
        showAlert("City not found");
        weatherDescription.innerHTML = "";
      }
      showWeatherDescription(data);
    });
  }
}

// display weather description

function showWeatherDescription(data) {
  //populate weather description with data from API
  weatherDescription.innerHTML = `<h3>The current weather in ${data.name} (${data.sys.country}) is:</h3> 
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

//change units metric/imperial ------------ CAN BE IMPROVED!!! -----------------

function changeDegreeFormat() {
  if (unit === "metric") {
    degreeBtn.textContent = "F°";
    unit = "imperial";
    degree = "F°";
    windSpeed = "miles/hour";
  } else {
    degreeBtn.textContent = "C°";
    unit = "metric";
    degree = "C°";
    windSpeed = "meter/second";
  }
}

//show alert message

function showAlert(message) {
  //create errorBox div element
  let errorBox = document.createElement("div");
  // get error message
  let errorMessage = document.createTextNode(message);
  // add CSS error class
  errorBox.classList.add("error");
  // append error message to div
  errorBox.appendChild(errorMessage);
  // place div before footer element
  const footer = document.getElementById("main-footer");
  document.getElementById("wrapper-container").insertBefore(errorBox, footer);

  //remove error div after 3s
  setTimeout(() => {
    document.getElementById("wrapper-container").removeChild(errorBox);
  }, 3000);
}

// delete weather description and clear inputs when on focus

function clearField(input) {
  input.target.value = "";
  document.getElementById("weather-description").textContent = "";
}

// populate select input with country codes options

function populateSelectInput(input) {
  requests.getCountryCodes().then((data) => {
    //sort country codes alphabetically
    data = Object.keys(data)
      .sort()
      .forEach((key) => {
        //create option element
        let option = document.createElement("option");
        //add key name as text
        let content = document.createTextNode(key);
        option.appendChild(content);
        //append element to parent element select
        input.appendChild(option);
      });
  });
}