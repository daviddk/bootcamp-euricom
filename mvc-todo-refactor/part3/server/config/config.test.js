var config = require('./config.development');

config.env = 'test';
config.hostname = 'test.example';
config.port = 8080;
//config.mongo.db = 'example_test';

module.exports = config;
