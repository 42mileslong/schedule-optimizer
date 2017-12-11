import React from 'react';
import FilterButton from './filterButton';

export default class SubjectSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: [],
      loadedTermName: '',
      loadedYearName: '',
      options: []
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleClick(subject) {
    var name = subject.name;
    var activeSubjects = [];
    var found = false;
    this.props.searchCriteria.subjects.forEach(subject => {
      if (subject !== name) {
        activeSubjects.push(subject);
      } else {
        found = true;
      }
    })

    if (!found) {
      activeSubjects.push(subject.name);
    }

    this.props.selectFilterCriteria("subjects", activeSubjects);
    this.setState({
      options: []
    });
  }

  handleInput(event) {
    var text = event.target.value;
    if (text.length > 0) {
      text = text.toLowerCase().trim();
      var matchList = []
      this.state.subjects.forEach((e) => {
        if (e.name.toLowerCase().includes(text) && !e.active) {
          matchList.push(e);
        }
      });
      matchList.sort((first, second) => {
        return first.name.length - second.name.length;
      });
      this.state.subjects.forEach((e) => {
        if (e.name_verbose.toLowerCase().includes(text) && !e.active) {
          matchList.push(e);
        }
      });
      matchList = matchList.slice(0, 4);
      this.setState({
        options: matchList
      });
    } else {
      this.setState({
        options: []
      });
    }
  }

  componentWillReceiveProps() {
    var termName = this.props.searchCriteria.avalibility.name;
    var yearName = this.props.searchCriteria.avalibility.year;
    var isNewYearOrTerm = (termName != this.state.loadedTermName)
            || (yearName != this.state.loadedYearName);
    if (typeof termName != 'undefined' && isNewYearOrTerm) {
      fetch('/api/subject?year=' + yearName + '&term=' + termName)
        .then(res => {
          return res.json()
        })
        .then(subjects => {
          subjects = subjects.map(subject => {
            subject.key = "subjectSelectorButton_" + subject.name;
            return subject;
          })
          console.log(this.props.searchCriteria.subjects);
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
      <div className="subject-selector"
        onFocus={() => {
          $(".subject-selector").addClass("focused");
        }}
        onBlur={() => {
          setTimeout(() => {
            $(".subject-selector").removeClass("focused");
          }, 100);
        }}>
        <h6 className="text-center">Subjects</h6>
          <input
            type="text"
            className="form-control"
            placeholder="Add subject filter"
            onInput={this.handleInput}>
          </input>
        {
          this.props.searchCriteria.avalibility.name == null ? (
            <div className="text-center">
              <small >Choose avalibility.</small>
            </div>
          ) : (
            <div>
              <div className="subject-search-wrapper">
                <ul className="list-group subject-search">
                  {
                    this.state.options.map(subject => {
                      return (
                        <FilterButton
                          name={subject.name_verbose + ' (' + subject.name + ')'}
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
              </div>
              <br/>
              <ul className="list-group selected-subjects">
                {
                  this.state.subjects.map(subject => {
                    if (this.props.searchCriteria.subjects.includes(subject.name)) {
                      return (
                        <FilterButton
                          name={subject.name_verbose + ' (' + subject.name + ')'}
                          key={'selected-' + subject.key}
                          onClick={()=> {
                              this.handleClick(subject)
                            }
                          }
                        />
                      );
                    } else {
                      return '';
                    }

                  })
                }
              </ul>
            </div>
          )
        }

      </div>
    )
  }
}
