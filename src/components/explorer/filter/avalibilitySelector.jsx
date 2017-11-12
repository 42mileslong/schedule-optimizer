import React from 'react';
import FilterButton from './filterButton';

export default class AvalibilitySelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      terms: []
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(term) {
    this.state.terms.forEach(e => {
      if (e.name == term.name) {
        return;
      }
      e.active = false;
    })
    term.active = !term.active;
    this.props.selectFilterCriteria("avalibility", term);
  }

  componentDidMount() {
    fetch('/api/term?year=2018')
      .then(res => {
          return res.json()
      })
      .then(terms => {
        var terms_obj = terms.map(term => {
          term.active = false;
          term.key = "filterAvailabilityButton" + term.name;
          return term;
        });
        this.setState({
          terms: terms_obj
        });
      });
  }

  render() {
    return (
      <div>
        <h6 className="text-center">Availability</h6>
        <ul className="list-group">
          {
            this.state.terms.map(term => {
              return (
                <FilterButton
                  active={term.active}
                  name={term.name + ' ' + term.year}
                  key={term.key}
                  onClick={()=> {this.handleClick(term)}
                  }
                />
              )
            })
          }
        </ul>
      </div>
    )
  }
}
