/* @ts-ignore */
const request = require("postman-request");

const geocode = (address: string, callback: (message: string, undefined?: undefined, address?: {}) => {}) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=" +
    process.env.API_KEY_MAPBOX;

/* @ts-ignore */
  request({ url, json: true }, (error: Error, { body }) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find locations. Try another search.");
    } else {
      /* @ts-ignore */
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
