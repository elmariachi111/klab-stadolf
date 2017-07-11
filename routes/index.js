var express = require('express');
var router = express.Router();
const _ = require('lodash');

var Search = require('../service/search');

/* GET home page. */
router.get('/', function(req, res, next) {
  let p = [Search.count()];
  if (req.query.q) {
    p.push(Search.search(req.query.q));
  } 

  Promise.all(p).then((results) => {
    var vm = {};
    _.each(results, (result) => {
      vm = _.assign(vm, result);
    });

    res.render('index', vm );
  });
  
});

module.exports = router;
