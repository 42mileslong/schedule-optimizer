import React from 'react';

import ButtonSelector from './buttonSelector';

// Term selection widget
export default class TermSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      terms: []
    }
    this.selectTerm = this.selectTerm.bind(this);
  }

  componentDidMount() {
    // Select all terms for the current year
    fetch('/api/term')
      .then(res => {
          return res.json()
      })
      .then(terms => {
        var terms_obj = terms.map(term => {
          term.key = "termSelectorButton" + term.name;
          return term;
        });
        this.setState({
          terms: terms_obj
        });
      });
  }

  /**
    * Selects a given term in the overall builder config
    *
    * @param {Boolean} term The term to select
    */
  selectTerm(term) {
    this.props.selectConfig('term', term);
    this.props.selectCourses('requiredCourses', []);
    this.props.selectCourses('preferredCourses', []);
  }

  render() {
    return (
      <div className="col-12 term-selector">
        <h4 className="text-center">Term</h4>
        <br />
        <div className="row justify-content-center">
            {
              this.state.terms.sort((term1, term2) => {
                if (term1.year !== term2.year) {
                  return parseInt(term1.year) - parseInt(term2.year);
                } else {
                  var t1Val = (term1.name === "Spring") ? 1 :
                              (term1.name === "Summer") ? 2 :
                              (term1.name === "Fall") ? 3 : 4;
                  var t2Val = (term2.name === "Spring") ? 1 :
                              (term2.name === "Summer") ? 2 :
                              (term2.name === "Fall") ? 3 : 4;
                  return t1Val - t2Val;
                }
              }).map(term => {
                var name = term.name + " " + term.year;
                return (
                  <ButtonSelector
                    className="col-3"
                    active={this.props.config.term.key == term.key}
                    name={name}
                    onClick={() => {
                      this.selectTerm(term)
                    }}
                    key={term.key}/>
                )
              })
            }
        </div>
      </div>
    )
  }
}
