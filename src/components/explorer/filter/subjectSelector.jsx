import React from 'react';
import FilterButton from './filterButton';

export default class AvalibilitySelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: []
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(subject) {
    subject.active = !subject.active;
    this.props.toggleSubject(term);
  }

  componentDidMount() {
    var url = 
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
                    term: term.name,
                    name: year.name + " " + term.name,
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

    )
  }
}
