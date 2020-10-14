'use strict';

// allowing us to user the dotenv file to declare environment variables.
// example: the PORT variable
require('dotenv').config();

const express = require('express');

const app = express();

const cors = require('cors');

// we are getting the port from the env file
const PORT = process.env.PORT;

app.use(cors());

app.get('/location', handleLocation);

function handleLocation(request, response) {
  let locationData = require('./data/location.json');
  const city = request.query.city;
  response.json(new Location(city, locationData[0]));
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
  const days = [];
  // for each day in weatherData, we will create a new Object
  weatherData.data.forEach(day => days.push(new Day(day)));
  response.send(days);
}

function Day(dayData) {
  this.forecast = dayData.weather.description;
  this.time = dayData.datetime;
}

// FOR REFERENCE:
// [
//   {
//     "forecast": "Partly cloudy until afternoon.",
//     "time": "Mon Jan 01 2001"
//   },
//   {
//     "forecast": "Mostly cloudy in the morning.",
//     "time": "Tue Jan 02 2001"
//   },
//   ...
// ]