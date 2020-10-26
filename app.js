const express = require("express");
const https = require("https");

const app = express();

app.get("/", function (req, res) {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=London,uk&units=metric&appid=31c9d59138e8688e103b8a62deb1fc57";
  https.get(url, function (response) {
    console.log(response.statusCode); //Prints the status code from the WS

    response.on("data", function(data){

      const weatherData = JSON.parse(data); //Format data from the WS to JS object
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;

      res.write("<h1>The temperature in London is " + temp + " degree Celcius</h1>")
      res.write("<img src='http://openweathermap.org/img/wn/" + icon + "@2x.png'>")
      res.write("<p>The weather is currently " + description + "</p>")
      res.send();
    });
  });
  //res.status(200).send("Server is running");
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});