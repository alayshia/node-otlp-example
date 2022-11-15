'use strict';

const express = require('express');

// Constants
const PORT = 9000;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/message', async (req, res) => {
  const message = await determineMessage(messages);
  res.send(`${message}`);
});

const messages = [
  'how are you?',
  'how are you doing?',
  "what's good?",
  "what's up?",
  'how do you do?',
  'sup?',
  'good day to you',
  'how are things?',
  'howzit?',
  'woohoo',
];

function determineMessage() {
  return messages[Math.floor(Math.random() * messages.length)];
}

app.listen(PORT, HOST);
console.log(`Running node message service on http://${HOST}:${PORT}`);
