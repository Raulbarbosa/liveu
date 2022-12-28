const tp = require('tedious-promises');
const dbConfig = require('config.json');
const TYPES = require('tedious').TYPES;
const ConnectionPool = require('tedious-connection-pool');
const poolConfig = {
    min: 2,
    max: 4,
    log: true
};
const pool = new ConnectionPool(poolConfig, dbConfig);
tp.setConnectionPool(pool);