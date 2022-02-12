const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiYWtpbi1hLWNvZGVyIiwiYSI6ImNqa2lqcnZpcTAyYWozbGtmNHJwd29vcGQifQ.3ZASIFvafsNuUeK84ZKgwQ&limit=1";

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to the location service", undefined);
    } else if (body.features.length < 1) {
      callback("Unable to find loation. Try another service", undefined);
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
