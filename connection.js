const tp = require('tedious-promises');
const dbConfig = require('./config.json');
tp.setConnectionConfig(dbConfig); // global scope

module.exports = tp;