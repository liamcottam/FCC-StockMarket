const router = require('express').Router();
const logger = require('../core/logger');
const stock = require('../core/stock');

router.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

router.get('/get/:symbol', (req, res) => {
  if (typeof req.params.symbol !== 'string') {
    res.status(401).end();
    return;
  }

  const symbol = req.params.symbol.toUpperCase();
  stock.getStock(symbol).then((data) => {
    res.json(data);
  }).catch(() => {
    res.status(404).send('resource not found');
  });
});

router.get('/init', (req, res) => {
  res.json(stock.getData());
});

router.use((err, req, res, next) => {
  logger.error('Express: UnhandledException', err);
  return res.status(500).json({ name: 'UnhandledException' });
});

router.use((req, res, next) => {
  logger.warn('Express:', `Error 404 - ${req.url}`);
  res.status(404).send('resource not found');
});

module.exports = router;
