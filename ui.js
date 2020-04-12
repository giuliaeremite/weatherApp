//change units metric/imperial

function changeDegreeFormat() {
  if (degreeBtn.innerHTML === "C°") {
    degreeBtn.innerHTML = "F°";
    unit = "imperial";
    degree = "F°";
    windSpeed = "miles/hour";
  } else {
    degreeBtn.innerHTML = "C°";
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
  const footer = document.querySelector("footer");
  document.getElementById("wrapper-container").insertBefore(errorBox, footer);

  //remove error div after 3s
  setTimeout(function () {
    document.getElementById("wrapper-container").removeChild(errorBox);
  }, 3000);
}

// delete weather description and clear inputs when on focus

const input = document.getElementById("location-input");
input.addEventListener("focus", (e) => {
  e.target.value = "";
  document.getElementById("weather-description").innerHTML = "";
});

// populate select input with country codes options

getCountryCodes().then((data) => {
  //sort country codes alphabetically 
  data = Object.keys(data).sort();

  data.forEach((key) => {
    //create option element
    let option = document.createElement("option");
    //add key name as text
    let content = document.createTextNode(key);
    option.appendChild(content);
    //append element to parent element select
    document.getElementById("country-input").appendChild(option);
  });
});
