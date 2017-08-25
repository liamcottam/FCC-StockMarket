const socketio = require('socket.io');
const logger = require('./logger');
const stock = require('./stock');

class Websocket {
  constructor() {
    this.websocket = null;
  }
  init(server) {
    this.websocket = socketio(server);
    this.websocket.on('connection', (client) => {
      logger.info('client connected');

      client.on('remove', (sym) => {
        if (typeof sym !== 'string') return;
        const symbol = sym.toUpperCase();
        if (stock.remove(symbol)) {
          client.broadcast.emit('remove', symbol);
        }
      });
    });
    return this;
  }
  emit(path, data) {
    if (this.websocket !== null) {
      logger.info('websocket', `emitting ${path} with`, data);
      this.websocket.emit(path, data);
    }
  }
}

let instance = null;
const getInstance = () => {
  if (instance === null) {
    logger.info('creating new websocket instance');
    instance = new Websocket();
  }
  return instance;
}
module.exports = getInstance();
