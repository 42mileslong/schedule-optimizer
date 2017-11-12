var express = require('express');
var router = express.Router();
var database = require('../database')


var getHead = function(callback) {
    database.Head.findOne({}, callback);
}

// This module routes specific urls / API endpoints to content - in this case,
// data pulled from the database.

// The jank JS pyramid begins now
router.get('/', function(req, res) {
    getHead(function(err, head) {
        database.Year.find({
            'iteration' : head.iter_id,
            'name' : '2018'
        }, function(err, years) {
            res.send(years);
        });
    });
});

router.get('/year', function(req, res) {
    getHead(function(err, head) {
        var parameters = req.query;
        parameters['iteration'] = head.iter_id;
        database.Year.find(
            parameters,
            function(err, years) {
                res.send(years);
        });
    });
});

router.get('/term', function(req, res) {
    getHead(function(err, head) {
        var parameters = req.query;
        parameters['iteration'] = head.iter_id;
        database.Term.find(
            parameters,
            function(err, years) {
                res.send(years);
        });
    });
});

router.get('/subject', function(req, res) {
    getHead(function(err, head) {
        var parameters = req.query;
        parameters['iteration'] = head.iter_id;
        database.Subject.find(
            parameters,
            function(err, years) {
                res.send(years);
        });
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
});


router.get('/section', function(req, res) {
    getHead(function(err, head) {
        var parameters = req.query;
        parameters['iteration'] = head.iter_id;
        database.Section.find(
            parameters,
            function(err, years) {
                res.send(years);
        });
    });
});

module.exports = router;
