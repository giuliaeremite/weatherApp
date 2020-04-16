const requests = {
  //get data from OpenWeatherMap API

  getWeatherRequest: async function (prefix, location, country, unit) {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?${prefix}${location},${country}&units=${unit}&appid=bad8e69248d889e7ce3a8d2e1f5071ee`
    );
    return await response.json();
  },

  //get data from local file countries.json

  getCountryCodes: async function () {
    const response = await fetch("countries.json");
    return await response.json();
  },
};
