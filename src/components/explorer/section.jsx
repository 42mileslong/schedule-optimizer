import React from 'react';

export default class Section extends React.Component {
  render() {
    console.log("rendering");
    var section = this.props.sectionData;
    var isActive = this.props.visible;
    return (
      <div className={isActive ? "" : "d-none"}>
      <h5>{section.code}</h5>
      <p>This is a section.</p>
      </div>
    );
  }
}
