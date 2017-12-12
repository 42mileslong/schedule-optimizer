import React from 'react';
import GridView from './gridView';
import ListView from './listView';

// Lists all courses that satisfy given parameters
export default class CourseList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      viewType: 'grid',
      courseWork: {
        requiredCourses: [],
        preferredCourses: []
      }
    }
    this.handleGridToggle = this.handleGridToggle.bind(this);
    this.handleListToggle = this.handleListToggle.bind(this);
    this.addCourse = this.addCourse.bind(this);
    this.removeCourse = this.removeCourse.bind(this);
  }

  componentWillReceiveProps() {
    // Rebuild course list on change
    var subjects = this.props.searchCriteria.subjects;
    var creditHours = this.props.searchCriteria.creditHours;
    var textSearch = this.props.searchCriteria.textSearch;
    var newCourses = [];

    // Build URL to access desired courses
    var url = 'api/course'
        + '?year=' + this.props.searchCriteria.avalibility.year
        + '&term=' + this.props.searchCriteria.avalibility.name;

    // Add multiple &subject parameters, one for each desired subject
    subjects.forEach(subject => {
      url += '&subject=' + subject;
    });

    // Add multiple &subject parameters, one for each desired subject
    creditHours.forEach(creditHour => {
      url += '&credit_hours=' + creditHour;
    });

    // Check to see if there is a lower bound ('<XX' or '>XX') in the query
    var lowerNumberBound = null;
    var upperNumberBound = null;

    var courseNumberFinder = /[><]\d+/g;
    var match = courseNumberFinder.exec(textSearch);
    while (match != null) {
      if (match[0][0] == '>') {
        lowerNumberBound = match[0].slice(1);
      } else {
        upperNumberBound = match[0].slice(1);
      }
      match = courseNumberFinder.exec(textSearch);
    }
    textSearch = textSearch.replace(courseNumberFinder, '').trim();

    if (lowerNumberBound !== null) {
      url += '&min_course_num=' + lowerNumberBound;
    }

    if (upperNumberBound !== null) {
      url += '&max_course_num=' + upperNumberBound;
    }

    // Add text search to search url
    if (textSearch.length > 0) {
      url += '&search=' + textSearch;
    }

    // If at least one 'meaninful' selector is picked, fetch matching courses
    if (subjects.length > 0 || textSearch.length > 0) {
      fetch(url)
        .then(res => {
          return res.json()
        })
        .then(courses => {
          this.setState({
            courses: courses
          });
        });
    } else {
      // Reset course list so not every class is shown
      this.setState({
        courses: []
      });
    }

  }

  /**
    * Adds a course to the user's selected course list
    *
    * @param {String} type    The type of selection to make (requiredCourses, preferredCourses)
    * @param {Object} course  The course object
    */
  addCourse(type, course) {
    var courseWork = this.props.courseWork;
    var typedWork = courseWork[type];

    var index = -1;
    for (var i = 0; i < typedWork.length; i++) {
      if (typedWork[i]._id == course._id) {
        index = i;
        break;
      }
    }

    if (index == -1) {
      typedWork.push(course);
    }

    this.props.selectCourses(type, typedWork);
  }

  /**
    * Removes a course from the user's selected course list
    *
    * @param {String} type    The type of selection to make (requiredCourses, preferredCourses)
    * @param {Object} course  The course object
    */
  removeCourse(type, course) {
    var courseWork = this.props.courseWork;
    var typedWork = courseWork[type];

    var index = -1;
    for (var i = 0; i < typedWork.length; i++) {
      if (typedWork[i]._id == course._id) {
        index = i;
        break;
      }
    }

    if (index != -1) {
      typedWork.splice(index, 1);
    }

    this.props.selectCourses(type, typedWork);
  }

  /**
    * Toggle to grid view
    */
  handleGridToggle() {
    this.setState({
      viewType: 'grid'
    })
  }

  /**
    * Toggle to list view
    */
  handleListToggle() {
    this.setState({
      viewType: 'list'
    })
  }

  render() {
    return (
      <div className="col-9">
        <div className="container-fluid">
          <div className="row">
            <h4 className="col-4">Courses</h4>
            <div className="btn-group col-2 offset-md-6" role="group" aria-label="Basic example">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={this.handleGridToggle}>Grid</button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={this.handleListToggle}>List</button>
            </div>
          </div>
          <br/>
          {
            this.state.viewType == 'grid' ? (
              <GridView
                courseWork={this.props.courseWork}
                courses={this.state.courses}
                addCourse={this.addCourse}
                removeCourse={this.removeCourse}/>
            ) : (
              <ListView
                courseWork={this.props.courseWork}
                courses={this.state.courses}
                addCourse={this.addCourse}
                removeCourse={this.removeCourse}/>
            )
          }
        </div>
      </div>
    );
  }
}
