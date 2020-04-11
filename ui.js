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
  let errorBox = document.createElement("div");
  let errorMessage = document.createTextNode(message);
  errorBox.classList.add("error");
  errorBox.appendChild(errorMessage);
  const footer = document.querySelector("footer");
  document.getElementById("wrapper-container").insertBefore(errorBox, footer);
  setTimeout(function () {
    document.getElementById("wrapper-container").removeChild(errorBox);
  }, 3000);
}

// delete weather description and clear inputs when on focus

const inputs = document.querySelectorAll("input");
for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("focus", (e) => {
    e.target.value = "";
    document.getElementById("weather-description").innerHTML = "";
  });
}

// populate select input with country codes options

getCountries().then((data) => {
  data = Object.keys(data).sort();

  data.forEach((key) => {
    let option = document.createElement("option");
    let content = document.createTextNode(key);
    option.appendChild(content);
    document.getElementById("country-input").appendChild(option);
  });
});
