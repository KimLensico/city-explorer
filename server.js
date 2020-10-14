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

app.get('/', (request, response) => {
  response.send('Hello World~!');
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
});