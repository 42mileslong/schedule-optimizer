var express = require('express');
var router = express.Router();
var database = require('../database')


var getHead = function(callback) {
    database.Head.findOne({}, callback);
}

var replaceChildrenWithUrls = function(doc, urlBase, fieldName, callback) {
    if (doc === null) {
       callback(null);
       return;
    }
    doc.getChildren(function(err, children) {
        var docObj = doc.toObject();
        var list = [];
        children.forEach(function(child) {
           var identifying = child[fieldName].split(' ')[0];
           list.push({
              name: identifying,
              url: urlBase + '/' + identifying
           });
        });
        docObj.children = list;
        callback(docObj);
    });
}

var getChildWhere = function(doc, fieldName, value, res, callback) {
    if (doc === null || doc === undefined) {
        res.send(null);
        return;
    }
    doc.getChildWhere(fieldName, value, function(err, childDoc) {
        if (childDoc === null) {
            res.send(null);
            return;
        }
        callback(err, childDoc);
    });
}

var getChildren = function(doc, callback) {
    if (doc === null || doc === undefined) {
        res.send(null);
        return;
    }
    doc.getChildren(callback);
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
        database.Course.find(
            parameters,
            function(err, years) {
                res.send(years);
        });
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
