
// @ts-ignore
import request from "postman-request";

const geocode = (address: string, callback: (message: string | undefined, object?: {} | undefined) => {}) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=" +
    process.env.API_KEY_MAPBOX;

    request({ url, json: true }, (error: Error, { body }: any) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find locations. Try another search.", "undefined");
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
