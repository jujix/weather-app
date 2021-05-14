// @ts-ignore
import request from "postman-request";

const forecast = (latitude: number, longitude: number, callback: (message: string | undefined, object?: {} | undefined) => {}) => {
  const url =
    "http://api.weatherstack.com/current?access_key=" +
    process.env.API_KEY_WEATHER_STACK +
    "&query=" +
    latitude +
    "," +
    longitude +
    "&units=m";


/* @ts-ignore */
request({ url, json: true }, (error: Error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!");
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". It is currently " +
          body.current.temperature +
          " degrees out. " +
          "It feels like " +
          body.current.feelslike +
          " degrees out. The humidity is " +
          body.current.humidity +
          "%."
      );
    }
  });
};

module.exports = forecast;
