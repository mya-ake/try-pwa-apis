const express = require('express');
const router = express.Router();
const notifyRouter = require('./notify-router');

router.use('/notify', notifyRouter);

router.get('/status', (req, res) => {
  res.json({ status: 'ok' });
});

router.all('*', (req, res) => {
  res.status(404);
  res.json({ message: 'Not Found', path: req.path, method: req.method });
});

module.exports = router;
