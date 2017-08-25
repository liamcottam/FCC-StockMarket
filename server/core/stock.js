const yahooFinance = require('yahoo-finance');
const logger = require('./logger');

function zeroPad(num, places) {
  const zero = (places - num.toString().length) + 1;
  return Array(+(zero > 0 && zero)).join('0') + num;
}

// Format the date ready for the Yahoo API
function getDate() {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setTime(endDate.getTime());
  startDate.setFullYear(startDate.getFullYear() - 1);
  startDate.setDate(startDate.getDate() - 1);
  return {
    from: `${startDate.getFullYear()}-${zeroPad(startDate.getMonth() + 1, 2)}-${zeroPad(startDate.getDate(), 2)}`,
    to: `${endDate.getFullYear()}-${zeroPad(endDate.getMonth() + 1, 2)}-${zeroPad(endDate.getDate(), 2)}`,
  };
}

class Stock {
  constructor() {
    this.data = [];
    this.date = getDate();
  }
  init(websocket) {
    this.websocket = websocket;
    const names = ['AAPL', 'GOOG', 'MSFT'];
    for (let i = 0; i < names.length; i++) {
      this.loadStock(names[i]).then((data) => {
        logger.info(`loaded name '${names[i]}'`);
        this.data.push(data);
        this.data.sort((a, b) => a.name.localeCompare(b.name));
        this.websocket.emit('add', names[i]);
      }).catch((err) => {
        logger.error(`failed to load name '${names[i]}'`, err);
      });
    }
  }
  loadStock(name) {
    return new Promise((resolve, reject) => {
      Promise.all([yahooFinance.quote({
        symbol: name,
        modules: ['price'],
      }),
      yahooFinance.historical({
        symbol: name,
        from: this.date.from,
        to: this.date.to,
      })]).then((data) => {
        if (data[1].length === 0) return reject();
        // Parse the data
        const parsedData = [];
        for (let i = 0; i < data[1].length; i++) {
          const item = data[1][i];
          parsedData.push([new Date(item.date).getTime(), item.close]);
        }
        parsedData.sort((a, b) => a[0] - b[0]);
        return resolve({ name, longName: data[0].price.longName, data: parsedData });
      }).catch((err) => {
        reject(err);
      });
    });
  }
  getStock(name) {
    return new Promise((resolve, reject) => {
      const index = this.data.findIndex(i => i.name === name);
      if (index !== -1) {
        logger.info('sending name from memory');
        resolve(this.data[index]);
        return;
      }

      this.loadStock(name).then((data) => {
        logger.error(`loaded name '${name}'`);
        this.data.push(data);
        resolve(data);
        this.data.sort((a, b) => a.name.localeCompare(b.name));
        this.websocket.emit('add', name);
      }).catch((err) => {
        logger.error(`failed to load name '${name}'`, err);
        reject();
      });
    });
  }
  getData() {
    return this.data;
  }
  remove(name) {
    logger.error(`removing name '${name}'`);
    const index = this.data.findIndex(i => i.name === name);
    if (index !== -1) {
      this.data.splice(index, 1);
      return true;
    }
    return false;
  }
}

let instance = null;
const getInstance = () => {
  if (instance === null) {
    logger.info('creating new stock instance');
    instance = new Stock();
  }
  return instance;
};
module.exports = getInstance();
