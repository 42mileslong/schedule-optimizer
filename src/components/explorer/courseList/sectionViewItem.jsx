import React from 'react';

export default class SectionViewItem extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    var section = this.props.section;
    if (typeof section.number != "undefined") {
      return (
        <p>{section.number + " " + section.start_date}</p>
      )
    } else {
      return (<p>"Loading..."</p>);
    }
  }
}
