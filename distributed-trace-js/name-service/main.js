'use strict';

const express = require('express');
const fetch = require('node-fetch');

// Constants
const PORT = 8000;
const HOST = '0.0.0.0';
const YEAR_ENDPOINT = process.env.YEAR_ENDPOINT || 'localhost:6001';

const yearURL = `http://${YEAR_ENDPOINT}/year`;

// App
const app = express();
app.get('/name', async (req, res) => {
  const year = await getYear(yearURL);  
  const name = determineName(year);
  res.send(`${name}`);
});

const names = new Map([
  // prettier-ignore
  [2015, ["sophia", "jackson", "emma", "aiden", "olivia", "liam", "ava", "lucas", "mia", "noah"]],
  // prettier-ignore
  [2016, ["sophia", "jackson", "emma", "aiden", "olivia", "lucas", "ava", "liam", "mia", "noah"]],
  // prettier-ignore
  [2017, ["sophia", "jackson", "olivia", "liam", "emma", "noah", "ava", "aiden", "isabella", "lucas"]],
  // prettier-ignore
  [2018, ["sophia", "jackson", "olivia", "liam", "emma", "noah", "ava", "aiden", "isabella", "caden"]],
  // prettier-ignore
  [2019, ["sophia", "liam", "olivia", "jackson", "emma", "noah", "ava", "aiden", "aria", "grayson"]],
  // prettier-ignore
  [2020, ["olivia", "noah", "emma", "liam", "ava", "elijah", "isabella", "oliver", "sophia", "lucas"]],
]);

const getYear = async (url) =>
  fetch(url)
    .then((data) => {
      return data.text();
    })
    .then((text) => {
      text = Number(text);
      return text;
    })
    .catch((err) => console.error(`Problem getting year: ${err}`));

const getRandomNumber = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const determineName = (year) => {
  console.log(typeof year);
  const namesInYear = names.get(year);
  return getRandomNumber(namesInYear);
};

app.listen(PORT, HOST);
console.log(`Running node name service on http://${HOST}:${PORT}`);
