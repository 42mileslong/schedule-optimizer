var express = require('express');
var router = express.Router();
var database = require('../database')
var optimizer = require('./optimizer.js')

router.post('/optimize', function(req, res) {
    if (req.body.constructor !== Array) {
      res.send([]);
    } else {
      optimizer.generate(req.body, function(schedules) {
        res.send(schedules);
      });
    }
});

// This module routes specific urls / API endpoints to content - in this case,
// data pulled from the database.

// The jank JS pyramid begins now
router.get('/', function(req, res) {
  res.send('Api works!');
});

router.get('/year', function(req, res) {
  var parameters = req.query;
  database.Year.findCurrent(
    parameters,
    function(err, years) {
      res.send(years);
  });
});

router.get('/term', function(req, res) {
  var parameters = req.query;
  database.Term.findCurrent(
    parameters,
    function(err, years) {
      res.send(years);
  });
});

router.get('/subject', function(req, res) {
  var parameters = req.query;
  database.Subject.findCurrent(
    parameters,
    function(err, years) {
      res.send(years);
  });
});

router.get('/course', function(req, res) {
  var parameters = req.query;

  // Temporary - TODO clean up with new UI in course explorer
  var credit_hours_options = parameters['credit_hours'];
  if (credit_hours_options !== undefined) {
    if (credit_hours_options.constructor !== Array) {
      credit_hours_options = [credit_hours_options];
    }
    var min_credit_hours = Math.min.apply(null, credit_hours_options);
    parameters['max_credit_hours'] = { '$gte' : min_credit_hours };

    var max_credit_hours = Math.max.apply(null, credit_hours_options);
    parameters['min_credit_hours'] = { '$lte' : max_credit_hours };

    delete parameters['credit_hours'];
  }

  // If a search query is entered, query gets a bit complicated
  if (parameters['search'] !== undefined) {
    parameters['$text'] = {
      '$search' :  parameters['search']
    }
    delete parameters['search'];

    // Fetch results, sort results by text relevancy
    database.Head.getHead(function(err, head) {
      parameters['iteration'] = head.iter_id;
      database.Course.find(
          parameters,
          { score : { $meta: 'textScore' } }
        ).sort({
          score: { $meta: "textScore" }
        }).exec(function(err, years) {
          res.send(years);
        });
    });
  } else {
    database.Course.findCurrent(
      parameters,
      function(err, courses) {
        res.send(courses);
    });
  }
});


router.get('/section', function(req, res) {
  var parameters = req.query;
  database.Section.findCurrent(
    parameters,
    function(err, years) {
      res.send(years);
  });
});

module.exports = router;
