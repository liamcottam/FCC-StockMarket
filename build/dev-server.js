require('dotenv').config();
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const connectHistory = require('connect-history-api-fallback')();

const app = require('../server/core/express');
const webpackConfig = require('./webpack.dev.conf');

const compiler = webpack(webpackConfig);

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: '/',
  quiet: false,
  stats: {
    colors: true,
  },
});

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => { },
  heartbeat: 2000,
});

compiler.plugin('compilation', (compilation) => {
  compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
    hotMiddleware.publish({
      action: 'reload',
    });
    cb();
  });
});

app.express.use(connectHistory);
app.express.use(devMiddleware);
app.express.use(hotMiddleware);

const staticPath = path.posix.join('/', 'static');
app.express.use(staticPath, express.static('./static'));
app.server.listen(process.env.PORT || 8080);
