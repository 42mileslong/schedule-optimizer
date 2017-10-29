import React from 'react';
import FilterButton from './FilterButton';

export default class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.updateSearchCriteria = this.updateSearchCriteria.bind(this);
    this.toggleSubjectToCriteria = this.toggleSubjectToCriteria.bind(this);
  }

  updateSearchCriteria(newSearchCriteria) {
    this.props.onChange(newSearchCriteria);
  }

  toggleSubjectToCriteria(subject) {
    var searchCriteria = this.props.searchCriteria;

    var subjects = searchCriteria.subjects;
    var index = subjects.indexOf(subject);
    if (index != -1) {
      subjects.splice(index, 1)
      searchCriteria.subjects = subjects;
    } else {
      searchCriteria.subjects = subjects.concat([subject]);
    }
    this.updateSearchCriteria(searchCriteria);
  }

  render() {

    var props = this.props;
    var searchCriteria = props.searchCriteria;
    var subjects = props.scheduleData[0].terms[0].subjects;
    return (
      <div className="col-3">
        <h4 className="text-center">Filter Courses</h4>
        <br/>
        <h6 className="text-center">Avalibility</h6>
        <ul className="list-group">
          <li className="list-group-item">Fall 2017</li>
          <li className="list-group-item">Winter 2017</li>
          <li className="list-group-item">Spring 2018</li>
        </ul>
        <br/>
        <h6 className="text-center">Subjects</h6>
        <ul className="list-group">
          {
            subjects.map(data => {
              return (
                <FilterButton
                  active={searchCriteria.subjects.indexOf(data.name) != -1 ? true : false}
                  name={data.name}
                  key={"filterSubjectButton" + data.name}
                  onClick={() => {
                    this.toggleSubjectToCriteria(data.name);
                  }}/>
              )
            })
          }
        </ul>
      </div>
    );
  }
}
