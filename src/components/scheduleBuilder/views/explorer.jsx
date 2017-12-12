import React from 'react';
import { browserHistory } from 'react-router';

import Filter from './../explorer/filter/filter';
import CourseList from './../explorer/courseList/courseList';
import FeaturedCourses from './../explorer/featuredCourses';

export default class Schedule extends React.Component {
  constructor() {
    super()
    this.state = {
      coursesToDisplay: []
    }
  }

  componentDidMount() {
    var searchCriteria = this.props.searchCriteria;
    console.log(searchCriteria);
    searchCriteria.avalibility = this.props.config.term;
    this.props.updateSearchCriteria(searchCriteria);
  }



  hasSearchCriteria() {
    var hasSearchCriteria = false;
    if (this.props.searchCriteria.avalibility.year !== undefined) {
      hasSearchCriteria = true;
    }
    if (this.props.searchCriteria.subjects.length > 0) {
      hasSearchCriteria = true;
    }
    return hasSearchCriteria;
  }

  render() {
    return (
      <div className="container-fluid schedule">
        <br />
        <div className="row">
          <div className="col-4 mx-auto">
            <button
              type="button"
              className="btn btn-outline-primary btn-lg"
              onClick={() => this.props.setView("startup")}>Previous Step: Startup</button>
          </div>
          <div className="col-4">
            <h1 className="text-center">Explorer</h1>
          </div>
          <div className="col-4" style={{'text-align' : 'right'}}>
            <button
              type="button"
              className="btn btn-outline-primary btn-lg"
              onClick={() => this.props.setView("planner")}>Next Step: Planner</button>
          </div>
        </div>
        <br />
        <div className="row">
        </div>
        <div className="row">
          <Filter
            searchCriteria={this.props.searchCriteria}
            onChange={this.props.updateSearchCriteria}
            config={this.props.config}/>

          {
            this.hasSearchCriteria() ? (
              <CourseList
                searchCriteria={this.props.searchCriteria}
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
