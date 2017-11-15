import React from 'react';

export default class SectionViewItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      section: {}
    }
  }

  componentDidMount() {
    var url = this.props.section.url;
    fetch(url)
      .then(res => {
        return res.json();
      })
      .then(section => {
        this.setState({
          section: section
        })
      })
  }

  render() {
    var section = this.state.section;
    if (typeof section.number != "undefined") {
      return (
        <p>{section.number + " " + section.start_date}</p>
      )
    } else {
      return (<p>"Loading..."</p>);
    }
  }
}
