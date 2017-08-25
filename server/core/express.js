const express = require('express');
const bodyParser = require('body-parser');
const compress = require('compression');
const api = require('../api');

const app = express();
const server = require('http').Server(app);
const websocket = require('./websocket').init(server);
require('./stock').init(websocket);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compress({ threshold: 0 }));
app.use('/api/v1', api);

module.exports = { express: app, server };
