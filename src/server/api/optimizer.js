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
    var schedule = getAvailableSectionsForCourses(courseList, generate());
    callback(schedule);
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
    var numCourses = courseList.length;

    for (var i = 0; i < courseList.length; i++){
        var course = courseList[i];

        // Call method for each individual section
        getCourseSections(allSections, course, i, function() {
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
function getCourseSections(allSections, course, i, callback) {
    var searchParams = course;

    // Course object can be used as search parameters for database - but
    // course's number must be put into 'course_number'
    searchParams['course_number'] = searchParams['number'];
    delete searchParams['number'];

    // Get current sections that correspond with search parameters
    database.Section.findCurrent(
        searchParams,
        function(err, sections) {
            allSections[i] = sections;
            callback();
        }
    );
}

function generate(courseList) {
    oneRecursiveBoi([], 0, courseList);
    return courseList;
}

//topC : the list of courses from upper for loops, it's empty if we are on first course
//i : the index of the class we want to pick courses

function boiRapper(){
  secListId = []
  function oneRecursiveBoi(topC, i, classList){

      if (i == classList.length){
        for (var i = 0; i < topC.length; i++){
              secListId.push(topC[i]._id);
            }
      } else {
          var k = 0;
          var next = nextNonConflict(topC, classList[i], k);
          while (next != -1){
              var currentSch = topC;
              currentSch.push(classList[i][next]);

              oneRecursiveBoi(currentSch, i + 1, classList);

              currentSch.pop();
              k = next + 1;
              next = nextNonConflict(topC, classList[i], k);
          }
      }
  }

  return secListId;
}


function noConflict(arr){
    arr = sort(arr);
    for (var i = 1; i < arr.length; i++){
        if (arr[i - 1].end_time > arr[i].start_time){
            return false;
        }
    }
    return true;
}

//Finds the next course from the courses in arr from k index
//and onward that doesn't conflict with the current courses in schedule
function nextNonConflict(schedule, courseList, k){
    for (var i = k; i < courseList.length; i++){
        schedule.push(courseList[i]);
        if (noConflict(schedule)){
            schedule.pop();
            return i;
        }
        schedule.pop();
    }
    return -1;
}


function sort(courses){  // has start time, finish time, and weight 
   if (courses.length < 2){
        return courses;
    }

    var middle = parseInt(courses.length / 2);
    var left   = courses.slice(0, middle);
    var right  = courses.slice(middle, courses.length);

    return merge(sort(left), sort(right));
}

function merge(left, right) {
    var result = [];

    while (left.length && right.length) {
        if (left[0].end_time <= right[0].end_time) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }

    while (left.length){
        result.push(left.shift());
    }

    while (right.length){
        result.push(right.shift());
    }

    return result;
}
