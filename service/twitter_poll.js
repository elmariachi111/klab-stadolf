const _ = require('lodash');
var Promise = require('promise');

const Twitter = require('../lib/twitter');
const Elasticsearch = require('../lib/elasticsearch');

const INDEX_NAME="tweets";
const TYPE_NAME="tweet";

var getTweets = (search) => {
  return new Promise((res, rej) => {
    Twitter.get('search/tweets', {
            q: search,
            result_type: 'recent'
    }, (error, result, response) => {
          if (error) rej(error);
          else res(result.statuses);
    });
  });
};

var storeTweets = (statuses) => {
  var promises = _.map(statuses, (tweet) => {
    return new Promise( (res, rej) => {
      Elasticsearch.index({
        index: INDEX_NAME,
        type: TYPE_NAME,
        id: tweet.id_str,
        body: tweet
      }, (error, response) => {
        if (error) rej(error);
        else res(response);
      });
    });
  });
  return new Promise.all(promises);
}

module.exports = {
  update: (terms) => {
    return getTweets(terms).then(storeTweets);
  }
}


