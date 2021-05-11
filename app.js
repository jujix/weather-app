const request = require("postman-request");
require("dotenv/config");

const url =
  "http://api.weatherstack.com/current?access_key=" +
  process.env.API_KEY +
  "&query=37.8267,-122.4233";

request({ url: url }, (error, response) => {
  const data = JSON.parse(response.body);
  console.log(data.current);
});
