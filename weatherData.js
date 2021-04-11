const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const { response } = require("express");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const cityName = req.body.cityName;
  const key = "dda9ddc8d3be251432731d04277635cc";
  const url =  + cityName + "&appid=" + key + "&units=metric";

  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      res.write("<h1>Current temperature in " + cityName + " is: " + temp + ".</h1>");
      res.write("<p>Weather is described as " + weatherDescription + ".</p>");
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running at port 3000");
});
