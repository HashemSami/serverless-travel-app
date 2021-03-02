const fetch = require("node-fetch");

module.exports.geoName = async (city, countryCode) => {
  try {
    const uriCity = encodeURI(city);
    const apiKey = process.env.GEONAME_USERNAME;
    const apiurl = `http://api.geonames.org/searchJSON?q=${uriCity}&username=${apiKey}`;

    const res = await fetch(apiurl);

    const data = await res.json();

    if (!data || data.geonames.length === 0) throw "CITY NAME ERROR";

    const info = data.geonames[0];

    if (info.countryCode !== countryCode) throw "COUNTRY MATCHING ERROR";

    return [info.lng, info.lat];
  } catch (e) {
    console.log("Geo Name error", e);
    return e;
  }
};

module.exports.weatherForecast = async (lng, lat, date) => {
  try {
    const apiKey = process.env.WEATHERBIT_API_KEY;

    let apiurl = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lng}&key=${apiKey}`;

    const res = await fetch(apiurl);

    const data = await res.json();

    // filtering data
    const dateString = getDateString(date);
    const selectedDateInfo = data.data.filter(
      (info) => info.datetime === dateString
    );

    const { max_temp, min_temp, weather } = selectedDateInfo[0];

    return [max_temp, min_temp, weather];
  } catch (e) {
    console.log("WeatherBit error:", e.message);
    return e;
  }
};

module.exports.getImage = async (region, country, city) => {
  try {
    const imageName = `${country}+${city}`;
    const apiKey = process.env.PIXABAY_KEY;
    const apiurl = `https://pixabay.com/api/?key=${apiKey}&q=${imageName}&image_type=photo&category=travel&per_page=3`;

    const res = await fetch(apiurl);

    let data = await res.json();
    // console.log(data);

    // if no results from city name
    if (data.hits.length === 0) {
      const apiurlRegional = `https://pixabay.com/api/?key=${apiKey}&q=${region}&image_type=photo&category=travel&per_page=3`;
      const resRegional = await fetch(apiurlRegional);
      data = await resRegional.json();
    }

    const info = data.hits[0];
    return [info.webformatURL, info.tags];
  } catch (e) {
    console.log("Pixabay error", e.message);
    return e;
  }
};

// gitting a date string
const getDateString = (targetDate) => {
  const date = new Date(targetDate);
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  return `${y}-${m > 9 ? "" + m : "0" + m}-${d > 9 ? "" + d : "0" + d}`;
};
