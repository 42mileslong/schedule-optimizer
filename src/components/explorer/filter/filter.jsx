import React from 'react';
import AvalibilitySelector from './avalibilitySelector';
import FilterButton from './filterButton';

export default class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.updateSearchCriteria = this.updateSearchCriteria.bind(this);
    this.toggleAvalibility = this.toggleAvalibility.bind(this);
  }

  updateSearchCriteria(newSearchCriteria) {
    this.props.onChange(newSearchCriteria);
  }

  toggleAvalibility(term) {
    var searchCriteria = this.props.searchCriteria;
    var avalibility = searchCriteria.avalibility;

    var index = -1;
    for (var i = 0; i < avalibility.length; i++) {
      if(term.term == avalibility[i].term) {
        index = i;
        break;
      }
    }

    if (index != -1) {
      avalibility.splice(index, 1)
      searchCriteria.avalibility = avalibility;
    } else {
      avalibility.push(term);
      searchCriteria.avalibility = avalibility
    }
    this.updateSearchCriteria(searchCriteria);
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
        <h6 className="text-center">Subjects</h6>
        <ul className="list-group">
          {/*
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
            })*/
          }
        </ul>
      </div>
    );
  }
}
