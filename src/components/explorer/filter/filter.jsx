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

  toggleAvalibilityToCriteria(year, term) {
    var searchCriteria = this.props.searchCriteria;

    var avalibility = searchCriteria.avalibility;
    var token = year + term;
    var index = avalibility.indexOf(token);
    if (index != -1) {
      avalibility.splice(index, 1)
      searchCriteria.avalibility = avalibility;
    } else {
      searchCriteria.avalibility = avalibility.concat([token]);
    }
    this.updateSearchCriteria(searchCriteria);
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
    var years = props.scheduleData;
    var subjects = props.scheduleData[0].terms[0].subjects;
    console.log(years);
    return (
      <div className="col-3">
        <h4 className="text-center">Filter Courses</h4>
        <br/>
        <h6 className="text-center">Avalibility</h6>
        <ul className="list-group">
          {
            years.map(year => {
              return (
                year.terms.map(term => {
                  var token = year.name + term.name;
                  return (
                    <FilterButton
                      active={searchCriteria.avalibility.indexOf(token) != -1 ? true : false}
                      name={year.name + " " + term.name}
                      key={"filterAvalibilityButton" + token}
                      onClick={()=> {
                          this.toggleAvalibilityToCriteria(year.name, term.name);
                        }
                      }
                    />
                  )
                })
              )
            })
          }
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
