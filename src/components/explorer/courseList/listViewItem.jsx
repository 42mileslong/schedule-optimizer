import React from 'react';

export default class ListViewItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      course: {}
    }
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
  }

  handleClick() {
    this.setState({
      active: !this.state.active
    });
  }

  renderCourseDetails() {
    var course = this.props.course;
    return (
      <div>
        <h6>{course.name}</h6>
        <p>{course.description}</p>
        <div className={this.state.active ? "d-inline" : "d-none"}>
        </div>
      </div>
    )
  }
  render() {
    var course = this.props.course;
    return (
      <div className="list-group-item">
        <h4>{course.subject + " " + course.number}</h4>
        {this.renderCourseDetails()}
        <button onClick={this.handleClick}>{this.state.active ? "Hide Details" : "Show Details"}</button>
      </div>
    )
  }
}
