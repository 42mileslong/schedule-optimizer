import React from 'react';
import CourseModal from '../explorer/courseList/courseModal';

export default class ScheduleCourse extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      id: ""
    }
  }

  componentDidMount() {
    var section = this.props.section;

    // Build URL to access desired sections
    var url = 'api/course'
      + '?year=' + section.year
      + '&term=' + section.term
      + '&subject=' + section.subject
      + '&number=' + section.course_number;

    fetch(url)
      .then(res => {
        return res.json();
      })
      .then(courses => {
        this.setState({
          course: courses[0],
          id: section.number
        });
      })
  }

  render() {
    var section = this.props.section;
    var style = this.props.style;
    var type = section.meetings[0].type_verbose;
    var display_name = section.subject + ' ' + section.course_number
        + ' ' + type + ' (' + section.number + ')';
    return (
      <div>
        <div
          className = 'card-body card course'
          style = {style}
          data-toggle="modal"
          data-target={"#Modal" + this.state.id}>{display_name}</div>
        {
          this.state.course === undefined ? ""
          : (
            <CourseModal course={this.state.course} modalId={this.state.id} section={section.number}/>
          )
        }
      </div>
    )
  }
}
