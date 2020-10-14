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

// FOR REFERENCE:
// {
//   "search_query": "seattle",
//   "formatted_query": "Seattle, WA, USA",
//   "latitude": "47.606210",
//   "longitude": "-122.332071"
// }