const elasticsearch = require('elasticsearch');

module.exports = new elasticsearch.Client({
  host: process.env.ELASTICSEARCH_URL,
  log: 'trace'
});