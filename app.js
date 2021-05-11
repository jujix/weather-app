const request = require("postman-request");
require("dotenv/config");

const url =
  "http://api.weatherstack.com/current?access_key=" +
  process.env.API_KEY_WEATHER_STACK +
  "&query=37.8267,-122.4233&units=m";

request({ url: url, json: true }, (error, response) => {
  if (error) {
    console.log("Unable to connect to weather service!");
  } else if (response.body.error) {
    console.log("Unable to find a location");
  } else {
    console.log(
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

const geocodeURL =
  "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=" +
  process.env.API_KEY_MAPBOX;

request({ url: geocodeURL, json: true }, (error, response) => {
  if (error) {
    console.log("Unable to connect to location services!");
  } else if (response.body.features.length === 0) {
    console.log("Unable to find a location. Try another search");
  } else {
    const latitude = response.body.features[0].center[1];
    const longitude = response.body.features[0].center[0];
    console.log(latitude, longitude);
  }
});
