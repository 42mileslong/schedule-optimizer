import React from 'react';

export default class ListViewItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({
      active: !this.state.active
    });
  }
  render() {
    var course = this.props.course;
    return (
      <div className="list-group-item">
        <h4>{course.code + " " + course.name.split(" ").slice().pop()}</h4>
        <h6>{course.name}</h6>
        <p>Some Course Description</p>
        <div className={this.state.active ? "d-inline" : "d-none"}>
          <div>
            <h5>Avalible Sections</h5>
            ...
          </div>
        </div>
        <button onClick={this.handleClick}>{this.state.active ? "Hide Details" : "Show Details"}</button>
      </div>
    )
  }
}
