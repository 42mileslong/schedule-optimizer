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
    fetch('/api')
      .then(res => {
          return res.json()
      })
      .then(data => {
        var years = data.children;
        years.map(year => {
          fetch(year.url)
            .then(res => {
              return res.json()
            })
            .then(data => {
              var terms = data.children;
              var terms_obj = terms.map(term => {
                return (
                  {
                    active: false,
                    year: year.name,
                    name: term.name,
                    key: "filterAvalibilityButton" + term.name,
                    url: term.url,
                  }
                )
              })
              this.setState({
                terms: terms_obj
              });
            })
        });
      })
  }

  render() {
    return (
      <div>
        <h6 className="text-center">Avalibility</h6>
        <ul className="list-group">
          {
            this.state.terms.map(term => {
              return (
                <FilterButton
                  active={term.active}
                  name={term.name}
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
