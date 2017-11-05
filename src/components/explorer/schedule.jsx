import React from 'react';
import Filter from './filter/filter';
import CourseList from './courseList/courseList';

export default class Schedule extends React.Component {
  constructor() {
    super()
    this.state = {
      scheduleData: {},
      terms: [],
      searchCriteria: {
        avalibility: {},
        subjects: []
      },
      coursesToDisplay: []
    }
    this.updateSearchCriteria = this.updateSearchCriteria.bind(this);
  }

  updateSearchCriteria(searchCriteria) {
    console.log(searchCriteria);
    this.setState({
      searchCriteria: searchCriteria,
    });
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
            scheduleData={this.state.scheduleData}
            onChange={this.updateSearchCriteria}/>

          <CourseList
            searchCriteria={this.state.searchCriteria}
            />
        </div>
      </div>
    );
  }
}
