import React from 'react';
import Filter from './filter/filter';
import CourseList from './courseList/courseList';
import FeaturedCourses from './featuredCourses';

export default class Schedule extends React.Component {
  constructor() {
    super()
    this.state = {
      searchCriteria: {
        avalibility: {},
        subject: {},
        creditHour: []
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
    if (this.state.searchCriteria.avalibility.year != undefined) {
      hasSearchCriteria = true;
    }
    if (this.state.searchCriteria.subject.code != undefined > 0) {
      hasSearchCriteria = true;
    }
    return hasSearchCriteria;
  }

  render() {
    return (
      <div className="container-fluid schedule">
        <h1>Schedule</h1>
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
