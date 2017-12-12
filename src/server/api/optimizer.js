var express = require('express');
var http = require('http');
var promise = require('request-promise');
var request = require("request");
var database = require('../database')


/**
  * Implement this to return stuff from the /optimize API request
  * courseList is an array of Course objects - see
  * https://github.com/CS196Illinois/schedule-optimizer/wiki/Data-Schema
  *
  * @param {Array} courseList   An array of courses, find schedules that match
  * @param {Function} callback  Callback that will be evoked when finished
  */
module.exports.generate = function(courseList, callback) {
  getAvailableSectionsForCourses(courseList, function(sectionList) {
    callback(generate(sectionList));
  });
};

/**
  * Calls the given callback with a 2D array of Section objects corresponding
  * to the list of Course objects passed in.
  *
  * @param {Array} courseList   An array of courses whose sections to find
  * @param {Function} callback  Callback that will be evoked when finished
  */
function getAvailableSectionsForCourses(courseList, callback) {
    var allSections = [];

    var elementList = [];
    for (var i = 0; i < courseList.length; i++) {
      var course = courseList[i];

      course.section_types.forEach(sectionType => {
        var element = Object.assign({}, course);
        element.section_type = sectionType;
        elementList.push(element);
      });
    }

    var numCourses = elementList.length;

    for (var i = 0; i < elementList.length; i++) {
        var course = elementList[i];

        // Call method for each individual section
        getCourseSections(allSections, course, function() {
            // This lets us count how many callbacks finished - once they're all
            // done, return
            numCourses--;
            if (numCourses == 0) {
                callback(allSections);
            }
        });
    }
}

/**
  * Gets all sections for a given course and inserts it at the given index of
  * the passed allSections array, before calling the passed callback function
  *
  * @param {Array} allSections  Array to insert within
  * @param {Object} course      A course object, defined by the Course schema (https://github.com/CS196Illinois/schedule-optimizer/wiki/Data-Schema)
  * @param {Number} i           The index in the array to insert into
  * @param {Function} callback  Callback that will be evoked when finished
  */
function getCourseSections(allSections, course, callback) {
    var searchParams = {};
    searchParams['year'] = course['year'];
    searchParams['term'] = course['term'];
    searchParams['subject'] = course['subject'];
    searchParams['course_number'] = course['number'];
    searchParams['meetings'] = {'$elemMatch' : {'type_verbose' : course['section_type']}};

    // Get current sections that correspond with search parameters
    database.Section.findCurrent(
        searchParams,
        function(err, sections) {
            if (sections[0].meetings[0].start_time != "ARRANGED") {
                allSections.push(sections);
            }
            callback();
        }
    );
}

/**
 * Generates a sorted list of schedules given the parameters
 *
 * @param {Array} courseList  List of lists of sections for each course to be included in schedule
 * @return {Array}            List of lists of sections that make schedules
 */
function generate(courseList) {
    return oneRecursiveBoi([], 0, courseList);
}


/**
 * Some recursive magic that generates schedules without conflicts
 *
 * @param {Number} topC       the list of courses from upper for loops, it's empty if we are on first course
 * @param {Array} courseList  List of lists of sections for each course to be included in schedule
 * @param {Number} i          the index of the class we want to pick courses
 */
function oneRecursiveBoi(topC, i, classList) {
  secListId = []

  function funBoi(topC, i, classList) {

      if (i == classList.length) {
        temp = []
        for (var i = 0; i < topC.length; i++) {
              temp.push(topC[i].number);
        }
        secListId.push(temp)
      } else {
          var k = 0;
          var next = nextNonConflict(topC, classList[i], k);
          while (next != -1) {
              var currentSch = topC;
              currentSch.push(classList[i][next]);

              funBoi(currentSch, i + 1, classList);

              currentSch.pop();
              k = next + 1;
              next = nextNonConflict(topC, classList[i], k);
          }
      }
  }

  funBoi(topC, i, classList);

  return secListId.slice(0, 25);
}

/**
 * Checks if two courses aren't conflicting in an ordered list of sections
 *
 * @param {Array} arr  An ordered list of sections by time
 */
function noConflict(arr) {
    arr = sort(arr);
    for (var i = 1; i < arr.length; i++) {
        if (timeToInt(arr[i - 1].meetings[0].end_time) > timeToInt(arr[i].meetings[0].start_time)) {
            return false;
        }
    }
    return true;
}

/**
 * Finds the next course from the courses in arr from k index and onward that doesn't conflict with the current courses in schedule
 */
function nextNonConflict(schedule, courseList, k) {
    for (var i = k; i < courseList.length; i++) {
        schedule.push(courseList[i]);
        if (noConflict(schedule)) {
            schedule.pop();
            return i;
        }
        schedule.pop();
    }
    return -1;
}

/**
 * Sorts the courses by start time
 */
function sort(courses) {  // has start time, finish time, and weight
   if (courses.length < 2) {
        return courses;
    }

    var middle = parseInt(courses.length / 2);
    var left   = courses.slice(0, middle);
    var right  = courses.slice(middle, courses.length);
    return merge(sort(left), sort(right));
}

/**
 * Merges the courses by start time
 */
function merge(left, right) {
    var result = [];

    while (left.length && right.length) {
        if (timeToInt(left[0].meetings[0].end_time) <= timeToInt(right[0].meetings[0].end_time)) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }

    while (left.length) {
        result.push(left.shift());
    }

    while (right.length) {
        result.push(right.shift());
    }

    return result;
}

/**
 * Converts a time in the format XX:XX AM to an integer, for display purposes
 *
 * @param {String} time The time to convert
 */
function timeToInt(time) {
    var startAmPm = time.split(' ')[1];
    var startClock = time.split(' ')[0];
    var startHour = parseInt(startClock.split(':')[0]) - this.baseTime;
    if (startAmPm === 'PM' && startClock.split(':')[0] !== '12') {
        startHour += 12;
    }
    var startMinute = parseInt(startClock.split(':')[1]);
    return startHour * 60 + startMinute;
}
