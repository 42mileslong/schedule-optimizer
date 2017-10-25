var express = require('express');
var router = express.Router();
var database = require('../database')

// This module routes specific urls / API endpoints to content - in this case,
// data pulled from the database.
router.get('/', function(req, res) {
    database.Head.findOne({}, function(err, resp) {
        res.send(resp.children);
    });
});

router.get('/year/:id', function(req, res) {
    database.Year.findById(req.params.id, function(err, resp) {
        res.send(resp);
    });
});

router.get('/term/:id', function(req, res) {
    database.Term.findById(req.params.id, function(err, resp) {
        res.send(resp);
    });
});

router.get('/subject/:id', function(req, res) {
    database.Subject.findById(req.params.id, function(err, resp) {
        res.send(resp);
    });
});

router.get('/course/:id', function(req, res) {
    database.Course.findById(req.params.id, function(err, resp) {
        res.send(resp);
    });
});

router.get('/section/:id', function(req, res) {
    database.Section.findById(req.params.id, function(err, resp) {
        res.send(resp);
    });
});

module.exports = router;
