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

// This module routes specific urls / API endpoints to content - in this case,
// data pulled from the database.

// The jank JS pyramid begins now
router.get('/', function(req, res) {
    getHead(function(err, head) {
        res.send(head);
    });
});

router.get('/:yearName', function(req, res) {
    getHead(function(err, head) {
        getChildWhere(head, 'name', req.params.yearName, res, function(err, year) {
            var url = '/api/' + req.params.yearName;
            replaceChildrenWithUrls(year, url, 'name', function(h2) {
                res.send(h2);
            });
        });
    });
});

router.post('/:yearName/:termName/search', function(req, res) {
    var subjectCodes = req.body['subjects']

    getHead(function(err, head) {
        getChildWhere(head, 'name', req.params.yearName, res, function(err, year) {
            var termNameFull = req.params.termName + ' ' + req.params.yearName;
            getChildWhere(year, 'name', termNameFull, res, function(err, term) {

                var toComplete = subjectCodes.length;
                var wow = []
                subjectCodes.forEach(function(subjectCode) {
                    getChildWhere(term, 'code', subjectCode, res, function(err, subject) {
                        var url = '/api/' + req.params.yearName
                                    + '/' + req.params.termName
                                    + '/' + subjectCode;
                        replaceChildrenWithUrls(subject, url, 'number', function(h2) {
                            toComplete--;
                            wow = wow.concat(h2['children']);
                            if (toComplete == 0) {
                                res.send(wow);
                            }
                        });
                    });
                });

            });
        });
    });
});

router.get('/:yearName/:termName', function(req, res) {
    getHead(function(err, head) {
        getChildWhere(head, 'name', req.params.yearName, res, function(err, year) {
            var termNameFull = req.params.termName + ' ' + req.params.yearName;
            getChildWhere(year, 'name', termNameFull, res, function(err, term) {
                    var url = '/api/' + req.params.yearName
                                + '/' + req.params.termName;
                    replaceChildrenWithUrls(term, url, 'code', function(h2) {
                    res.send(h2);
                });
            });
        });
    });
});


router.get('/:yearName/:termName/:subjectCode', function(req, res) {
    getHead(function(err, head) {
        getChildWhere(head, 'name', req.params.yearName, res, function(err, year) {
            var termNameFull = req.params.termName + ' ' + req.params.yearName;
            getChildWhere(year, 'name', termNameFull, res, function(err, term) {
                getChildWhere(term, 'code', req.params.subjectCode, res, function(err, subject) {
                    var url = '/api/' + req.params.yearName
                                + '/' + req.params.termName
                                + '/' + req.params.subjectCode;
                    replaceChildrenWithUrls(subject, url, 'number', function(h2) {
                        res.send(h2);
                    });
                });
            });
        });
    });
});

router.get('/:yearName/:termName/:subjectCode/:courseNumber', function(req, res) {
    getHead(function(err, head) {
        getChildWhere(head, 'name', req.params.yearName, res, function(err, year) {
            var termNameFull = req.params.termName + ' ' + req.params.yearName;
            getChildWhere(year, 'name', termNameFull, res, function(err, term) {
                getChildWhere(term, 'code', req.params.subjectCode, res, function(err, subject) {
                    getChildWhere(subject, 'number', req.params.courseNumber, res, function(err, course) {
                        var url = '/api/' + req.params.yearName
                                    + '/' + req.params.termName
                                    + '/' + req.params.subjectCode
                                    + '/' + req.params.courseNumber;
                        replaceChildrenWithUrls(course, url, 'number', function(h2) {
                            res.send(h2);
                        });
                    });
                });
            });
        });
    });
});

router.get('/:yearName/:termName/:subjectCode/:courseNumber/:sectionNumber', function(req, res) {
    getHead(function(err, head) {
        getChildWhere(head, 'name', req.params.yearName, res, function(err, year) {
            var termNameFull = req.params.termName + ' ' + req.params.yearName;
            getChildWhere(year, 'name', termNameFull, res, function(err, term) {
                getChildWhere(term, 'code', req.params.subjectCode, res, function(err, subject) {
                    getChildWhere(subject, 'number', req.params.courseNumber, res, function(err, course) {
                        getChildWhere(course, 'number', req.params.sectionNumber, res, function(err, section) {
                            res.send(section);
                        });
                    });
                });
            });
        });
    });
});



module.exports = router;
