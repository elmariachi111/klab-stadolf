const _ = require('lodash');
var Promise = require('promise');
const Elasticsearch = require('../lib/elasticsearch');

const INDEX_NAME="tweets";
const TYPE_NAME="tweet";

var search = (terms) => {
    return new Promise( (res, rej) => {
      Elasticsearch.search({
        index: INDEX_NAME,
        q: terms
      }, (error, response) => {
        if (error) rej(error);
        else {
            var texts = _.map(response.hits.hits,(hit) => {
                 return _.pick(hit._source, ['text']);
            });
            res({ tweets: texts });
        }
      });
    });
}

var count = () => {
    return new Promise( (res, rej) => {
        Elasticsearch.count({
            index: INDEX_NAME
        }, (error, response) => {
            if (error) rej(error);
            else res({ count: response.count });
        });
    });
}

module.exports = {
  search: (terms) => {
    return search(terms);
  },
  count: count
}
