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
    getHead(function(err, head) {
        var parameters = req.query;
        parameters['iteration'] = head.iter_id;
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

        var maxCourseNum = parameters['max_course_num'];
        var minCourseNum = parameters['min_course_num'];
        if (maxCourseNum !== undefined) {
          if (minCourseNum !== undefined) {
            parameters['number'] = { '$lte' : maxCourseNum, '$gte' : minCourseNum };
            delete parameters['min_course_num'];
          } else {
            parameters['number'] = { '$lte' : maxCourseNum };
          }
          delete parameters['max_course_num'];
        }
        else if (minCourseNum !== undefined) {
          delete parameters['min_course_num'];
          parameters['number'] = { '$gte' : minCourseNum };
        }

        if (parameters['search'] !== undefined) {
          parameters['$text'] = {
            '$search' :  parameters['search']
          }

          delete parameters['search'];

          database.Course.find(
              parameters,
              { score : { $meta: 'textScore' } }
            ).sort({
              score: { $meta: "textScore" }
            }).exec(function(err, years) {
                res.send(years);
            });

        } else {
          database.Course.find(
              parameters
            ).exec(function(err, years) {
                res.send(years);
            });
        }
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
