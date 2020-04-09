class WeatherByCityName {
  //make an http GET request
  async getWeatherCityName(city, country, unit) {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=${unit}&appid=bad8e69248d889e7ce3a8d2e1f5071ee`
    );
    const resData = await response.json();
    console.log(response)
    return resData;
  }
}

class WeatherByZipCode {
  //make an http GET request
  async getWeatherZipCode(zipcode, country, unit) {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?zip=${zipcode},${country}&units=${unit}&appid=bad8e69248d889e7ce3a8d2e1f5071ee`
    );
    const resData = await response.json();
    console.log(response)
    return resData;
  }
}

