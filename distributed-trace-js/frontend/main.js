const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

// Constants
const PORT = 7001;
const HOST = '0.0.0.0';
const MESSAGE_ENDPOINT = process.env.MESSAGE_ENDPOINT || 'localhost:9000';
const NAME_ENDPOINT = process.env.NAME_ENDPOINT || 'localhost:8000';

const nameUrl = `http://${NAME_ENDPOINT}/name`;
const messageUrl = `http://${MESSAGE_ENDPOINT}/message`;

// App
const app = express();


// CORS for use with web frontend
const corsOptions = {
  origin: ['http://localhost:8080'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions))


app.get('/greeting', async (req, res) => {

    const name = await getName(nameUrl);

    const message = await getMessage(messageUrl);

    res.send(`Hello ${name}, ${message}`);

});

const getName = (url) =>
  fetch(url)
    .then((data) => {
      return data.text();
    })
    .then((text) => {
      console.log(text);
      return text;
    })
    .catch((err) => console.error(`Problem getting name: ${err}`));

app.get('/', (req, res, next) => {
  setTimeout(() => {
    try {
      throw new Error('BROKEN')
    } catch (err) {
      console.error('example');
      next(err)
    }
  }, 100)
})

const getMessage = (url) =>
  fetch(url)
    .then((data) => {
      return data.text();
    })
    .then((text) => {
      console.log(text);
      return text;
    })
    .catch((err) => console.error(`Problem getting message: ${err}`));



app.listen(PORT, HOST);
console.log(`Running node frontend service on http://${HOST}:${PORT}`);
