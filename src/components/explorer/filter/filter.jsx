import React from 'react';
import AvalibilitySelector from './avalibilitySelector';
import FilterButton from './filterButton';
import SubjectSelector from './subjectSelector';
import CreditHourSelector from './creditHourSelector';

export default class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.updateSearchCriteria = this.updateSearchCriteria.bind(this);
    this.toggleAvalibility = this.toggleAvalibility.bind(this);
    this.toggleSubject = this.toggleSubject.bind(this);
    this.toggleCreditHour = this.toggleCreditHour.bind(this);
  }

  updateSearchCriteria(newSearchCriteria) {
    this.props.onChange(newSearchCriteria);
  }

  toggleAvalibility(term) {
    var searchCriteria = this.props.searchCriteria;
    searchCriteria.avalibility = term;
    this.updateSearchCriteria(searchCriteria);
  }

  toggleSubject(subject) {
    var searchCriteria = this.props.searchCriteria;

    var index = -1;
    for(var i = 0; i < searchCriteria.subjects.length; i++) {
      if (searchCriteria.subjects[i].name == subject.name) {
        index = i;
        break;
      }
    }
    if (index == -1) {
      searchCriteria.subjects.push(subject);
    } else {
      searchCriteria.subjects.splice(index, 1);
    }

    this.updateSearchCriteria(searchCriteria);
  }

  toggleCreditHour(creditHour) {
    var newSearchCriteria = this.props.searchCriteria;

    var index = newSearchCriteria.creditHour.indexOf(creditHour);
    if (index == -1) {
      newSearchCriteria.creditHour.push(creditHour);
    } else {
      newSearchCriteria.creditHour.splice(index, 1);
    }
    this.updateSearchCriteria(newSearchCriteria);
  }

  render() {

    return (
      <div className="col-3">
        <h4 className="text-center">Filter Courses</h4>
        <br/>
        <AvalibilitySelector
          toggleAvalibility={this.toggleAvalibility}
          searchCriteria={this.props.searchCriteria}/>
        <br/>
        <SubjectSelector
          toggleSubject={this.toggleSubject}
          searchCriteria={this.props.searchCriteria}/>
        <br />
        <CreditHourSelector
          toggleCreditHour={this.toggleCreditHour}
          searchCriteria={this.props.searchCriteria}/>
      </div>
    );
  }
}
