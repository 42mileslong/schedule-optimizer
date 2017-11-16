import React from 'react';
import SectionView from './sectionView';

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
    console.log(course);
    return (
      <div>
        <h5>{course.name}</h5>
        <p>{course.description}</p>
        <button type="button" className="btn btn-primary" onClick={this.handleClick}>{this.state.active ? "Hide Details" : "Show Details"}</button>
        <div className={this.state.active ? "d-inline" : "d-none"}>
          <SectionView course={course}/>
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
      </div>
    )
  }
}
