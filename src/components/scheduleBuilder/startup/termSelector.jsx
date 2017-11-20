import React from 'react';

import ButtonSelector from './buttonSelector';

export default class TermSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      terms: []
    }
    this.selectTerm = this.selectTerm.bind(this);
  }

  componentDidMount() {
    fetch('/api/term?year=2018')
      .then(res => {
          return res.json()
      })
      .then(terms => {
        var terms_obj = terms.map(term => {
          term.active = false;
          term.key = "termSelectorButton" + term.name;
          return term;
        });
        this.setState({
          terms: terms_obj
        });
      });
  }

  selectTerm(term) {
    this.state.terms.forEach(term => {
      term.active= false
    })
    term.active = true;
    this.props.selectConfig('term', term)
  }

  render() {
    return (
      <div className="col-12">
        <h4 className="text-center">Term</h4>
        <br />
        <div className="row justify-content-center">
            {
              this.state.terms.map(term => {
                var name = term.name + " " + term.year;
                return (
                  <ButtonSelector
                    className="col-3"
                    active={term.active}
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
