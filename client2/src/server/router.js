const express = require("express");
const router = express.Router();
const { geoName, weatherForecast, getImage } = require("./apiCalls");
const dataBase = require("./mockDatabase");

router.post("/post-data", async (req, res) => {
  try {
    const { region, country, city, date, countryInfo } = req.body;

    // API calls
    // console.log(countryInfo);
    const geoNameRes = await geoName(city, countryInfo.alpha2Code);
    if (geoNameRes === "COUNTRY MATCHING ERROR") throw geoNameRes;
    if (geoNameRes === "CITY NAME ERROR") throw geoNameRes;

    const [lng, lat] = geoNameRes;
    const [max_temp, min_temp, weather] = await weatherForecast(lng, lat, date);
    const [imageURL, tags] = await getImage(region, country, city);

    const id = dataBase.data.length + 1;
    // wupdating the database
    const tripData = {
      id,
      region,
      country,
      city,
      countryInfo,
      longitude: lng,
      latitude: lat,
      date,
      max_temp,
      min_temp,
      weather,
      imageURL,
      tags,
    };
    dataBase.data.push(tripData);
    // console.log(dataBase);

    res.send("done");
  } catch (e) {
    console.log(e.message);
    if (e === "COUNTRY MATCHING ERROR")
      return res.status(500).send({
        matchErr: "COUNTRY MATCHING ERROR",
      });
    if (e === "CITY NAME ERROR")
      return res.status(500).send({
        matchErr: "CITY NAME ERROR",
      });
    res.send(e.message);
  }
});

router.get("/get-data", (req, res) => {
  res.send(dataBase);
});

module.exports = router;
