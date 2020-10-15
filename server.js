'use strict';

// allowing us to user the dotenv file to declare environment variables.
// example: the PORT variable
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const superagent = require('superagent');

// we are getting the port from the env file
const PORT = process.env.PORT;
const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;

app.use(cors());

app.get('/location', handleLocation);

function handleLocation(request, response) {
  const city = request.query.city;
  // getting the city variable
  const url = `https://us1.locationiq.com/v1/search.php?key=${GEOCODE_API_KEY}&q=${city}&format=json&limit=1`;
  superagent.get(url)
    .then(data => {
      // we will declare a new variable to use the API request through super agent instead of the json file 
      const locationData = data.body[0];
      response.json(new Location(city, locationData));
    });
}

function Location(city, locationData) {
  this.search_query = city;
  this.formatted_query = locationData.display_name;
  this.latitude = locationData.lat;
  this.longitude = locationData.lon;
}

app.get('/', (request, response) => {
  response.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
});

app.get('/weather', handleWeather);

function handleWeather(request, response) {
  // declare a variable named weather data that has its contents as the entire json file 
  let weatherData = require('./data/weather.json');
  // declaring a new array called days
  // for each day in weatherData, we will create a new Object
  const days = weatherData.data.map(day => new Day(day));
  response.send(days);
}

function Day(dayData) {
  this.forecast = dayData.weather.description;
  this.time = dayData.datetime;
}