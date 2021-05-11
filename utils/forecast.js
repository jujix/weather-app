const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=" +
    process.env.API_KEY_WEATHER_STACK +
    "&query=" +
    latitude +
    "," +
    longitude +
    "&units=m";

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service!");
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
      console.log(url);
    } else {
      callback(
        undefined,
        response.body.current.weather_descriptions[0] +
          ". It is currently " +
          response.body.current.temperature +
          " degrees out. " +
          "It feels like " +
          response.body.current.feelslike +
          " degrees out."
      );
    }
  });
};

module.exports = forecast;
