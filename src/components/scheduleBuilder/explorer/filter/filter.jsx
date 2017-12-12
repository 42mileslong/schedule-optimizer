import React from 'react';
import AvalibilitySelector from './avalibilitySelector';
import FilterButton from './filterButton';
import SubjectSelector from './subjectSelector';
import CreditHourSelector from './creditHourSelector';
import SearchSelector from './searchSelector';

// A set of filters for the explorer view
export default class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.selectFilterCriteria = this.selectFilterCriteria.bind(this);
  }

  selectFilterCriteria(criteria, value) {
    var newSearchCriteria = this.props.searchCriteria;
    if (newSearchCriteria[criteria] == value) {
      newSearchCriteria[criteria] = {};
    } else {
      newSearchCriteria[criteria] = value;
    }
    this.updateSearchCriteria(newSearchCriteria);
  }

  updateSearchCriteria(newSearchCriteria) {
    this.props.onChange(newSearchCriteria);
  }

  render() {
    var term = this.props.config.term.name + " " + this.props.config.term.year;
    var termMessage = this.props.config.term.name ? term : "Select a term on the Startup page.";
    return (
      <div className="col-3">
        <h4 className="text-center">Filter Courses</h4>
        <br/>
        <SearchSelector
          selectFilterCriteria={this.selectFilterCriteria}
          searchCriteria={this.props.searchCriteria}/>
        <br/>
        <SubjectSelector
          selectFilterCriteria={this.selectFilterCriteria}
          searchCriteria={this.props.searchCriteria}/>
        <br />
        <CreditHourSelector
          selectFilterCriteria={this.selectFilterCriteria}
          searchCriteria={this.props.searchCriteria}/>
      </div>
    );
  }
}
