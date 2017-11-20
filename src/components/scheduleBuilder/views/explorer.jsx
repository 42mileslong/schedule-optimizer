import React from 'react';
import { browserHistory } from 'react-router';

import Filter from './../explorer/filter/filter';
import CourseList from './../explorer/courseList/courseList';
import FeaturedCourses from './../explorer/featuredCourses';

export default class Schedule extends React.Component {
  constructor() {
    super()
    this.state = {
      searchCriteria: {
        avalibility: {},
        subjects: [],
        creditHours: [],
        textSearch: ""
      },
      coursesToDisplay: []
    }
    this.updateSearchCriteria = this.updateSearchCriteria.bind(this);
  }

  updateSearchCriteria(searchCriteria) {
    this.setState({
      searchCriteria: searchCriteria,
    });
  }

  hasSearchCriteria() {
    var hasSearchCriteria = false;
    if (this.state.searchCriteria.avalibility.year !== undefined) {
      hasSearchCriteria = true;
    }
    if (this.state.searchCriteria.subjects.length > 0) {
      hasSearchCriteria = true;
    }
    return hasSearchCriteria;
  }

  render() {
    return (
      <div className="container-fluid schedule">
        <br />
        <h1 className="text-center">Explorer</h1>
        <br />
        <div className="row">
        </div>
        <div className="row">
          <Filter
            searchCriteria={this.state.searchCriteria}
            onChange={this.updateSearchCriteria}/>

          {
            this.hasSearchCriteria() ? (
              <CourseList
                searchCriteria={this.state.searchCriteria}
                selectCourses={this.props.selectCourses}
                courseWork={this.props.courseWork}
                />
            ) : (
              <FeaturedCourses />
            )
          }

        </div>
      </div>
    );
  }
}
