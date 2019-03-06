const express = require('express');
const {
  corsMiddleware,
  customDefaultHeaderMiddleware,
} = require('./middlewares');
const router = require('./routes');

const app = express();

app.use(express.json());
app.use(customDefaultHeaderMiddleware);
app.use(corsMiddleware);
app.use(router);

module.exports = app;
