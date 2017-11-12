import React from 'react';
import FilterButton from './filterButton';

export default class SubjectSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: [],
      loadedTermName: '',
      loadedYearName: ''
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(subject) {
    this.state.subjects.forEach((e) => {
      if (e.name == subject.name) {
        return;
      }
      e.active = false
    });
    subject.active = !subject.active;
    this.props.selectFilterCriteria("subject", subject);
  }

  componentWillReceiveProps() {
    var termName = this.props.searchCriteria.avalibility.name;
    var yearName = this.props.searchCriteria.avalibility.year;
    var isNewYearOrTerm = (termName != this.state.loadedTermName)
            || (yearName != this.state.loadedYearName);
    if (typeof termName != 'undefined' && isNewYearOrTerm) {
      fetch('/api/subject?year=2018&term=Summer')
        .then(res => {
          return res.json()
        })
        .then(subjects => {
          subjects = subjects.map(subject => {
            subject.active = false;
            subject.key = "subjectSelectorButton_" + subject.name;
            return subject;
          })
          this.setState({
            subjects: subjects,
            loadedTermName: termName,
            loadedYearName: yearName
          });
        })
    }
  }

  render() {
    return (
      <div>
        <h6 className="text-center">Subjects</h6>
        {
          this.props.searchCriteria.avalibility.name == null ? (
            <div className="text-center">
              <small >Choose avalibility.</small>
            </div>
          ) : (
            this.props.searchCriteria.subject.code == null ? (
              <ul className="list-group">
                {
                  this.state.subjects.map(subject => {
                    return (
                      <FilterButton
                        active={subject.active}
                        name={subject.name}
                        key={subject.key}
                        onClick={()=> {
                          this.handleClick(subject)
                        }
                        }
                      />
                    )
                  })
                }
              </ul>
            ) : (
              <ul className="list-group">
                <li className="list-group-item">
                  {this.props.searchCriteria.subject.name}
                </li>
              </ul>
            )

          )
        }

      </div>
    )
  }
}
