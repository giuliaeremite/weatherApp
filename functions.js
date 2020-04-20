// GET AND SHOW WEATHER

function getAndShowWeather(location, country) {
  //if one of the fields is empty, show alert
  if (location === "" || country === "") {
    showAlert("Fill out all fields");
  } else {
    //request weather data from API
    requestsMethods
      .getWeatherRequest(prefix, location, country, unit)
      .then((data) => {
        if (data.message === "city not found") {
          showAlert("City not found, check fields");
        } else {
          // if location is number search by zip
          if (typeof location === "number") {
            prefix = "zip=";
            showWeatherDescription(data);
          } else showWeatherDescription(data);
        }
      });
  }
}

// DISPLAY WEATHER DESCRIPTION

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

//CHANGE UNIT FORMAT METRIC/IMPERIAL

function changeDegreeFormat(format) {
  if (format === "metric") {
    unit = "imperial";
    degreeBtn.textContent = "F°";
    degree = "F°";
    windSpeed = "miles/hour";
  } else {
    unit = "metric";
    degreeBtn.textContent = "C°";
    degree = "C°";
    windSpeed = "meter/second";
  }
}

//SHOW ALERT MESSAGE

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

// DELETE WEATHER DESCRIPTION AND CLEAR INPUT FIELD

function clearField(inputField) {
  inputField.target.value = "";
  document.getElementById("weather-description").textContent = "";
}

// POPULATE SELECT INPUT WITH COUNTRY CODE OPTIONS

function populateSelectInput(selectInput) {
  requestsMethods.getCountryCodes().then((data) => {
    //sort country codes alphabetically
    Object.keys(data)
      .sort()
      .forEach((key) => {
        //create option element
        let option = document.createElement("option");
        //add key name as text to element
        let content = document.createTextNode(key);
        option.appendChild(content);
        //append element to parent element select input
        selectInput.appendChild(option);
      });
  });
}


