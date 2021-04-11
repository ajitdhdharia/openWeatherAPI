const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const { response } = require("express");

const app = express();

app.get("/", function (req, res) {
  const url = "https://api.openweathermap.org/data/2.5/weather?q=Jaipur&appid=dda9ddc8d3be251432731d04277635cc&units=metric";

  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;
        res.write("<h1>Current temperature in Jaipur is: " + temp + ".</h1>");
        res.write("<p>Weather is described as " + weatherDescription + ".</p>");
        res.send();
    })
  });

});

app.listen(3000, function () {
  console.log("Server is running at port 3000");
});
