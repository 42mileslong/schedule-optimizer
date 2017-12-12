import React from 'react';
import SectionView from './sectionView';

// A course list entry for list view
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

  /**
    * Adds this course to the user's selected course list
    *
    * @param {String} type  The type of selection to make (requiredCourses, preferredCourses)
    */
  addCourse(type) {
    this.props.addCourse(type, this.props.course);
  }

  /**
    * Removes this course from the user's selected course list
    *
    * @param {String} type  The type of selection to make (requiredCourses, preferredCourses)
    */
  removeCourse(type) {
    this.props.removeCourse(type, this.props.course);
  }

  /**
    * Render the button to select this course
    */
  renderSelectorButton() {
    var isSelected = false;
    var courseWork = this.props.courseWork;
    courseWork['requiredCourses'].forEach(course => {
      if (course._id == this.props.course._id) {
        isSelected = true;
      }
    })
    courseWork['preferredCourses'].forEach(course => {
      if (course._id == this.props.course._id) {
        isSelected = true;
      }
    })

    if (isSelected) {
      return (
        <button type="button"
          className="btn btn-danger remove-course"
          onClick={() => {
            this.removeCourse("requiredCourses");
            this.removeCourse("preferredCourses");
          }}>Remove Course</button>
      )
    } else {
      return (
        <div className="btn-group add-course-group">
          <button type="button"
            className="btn btn-success"
            onClick={() => {
              this.addCourse("requiredCourses")
            }}>Add Course
          </button>
          <button type="button" className="btn btn-success dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          </button>
          <div className="dropdown-menu dropdown-menu-right">
            <a className="dropdown-item" href="#" onClick={() => {
              this.addCourse("requiredCourses")
            }}>Require Course</a>
            <a className="dropdown-item" href="#" onClick={() => {
              this.addCourse("preferredCourses")
            }}>Prefer Course</a>
          </div>
        </div>
      )
    }
  }

  renderCourseDetails() {
    var course = this.props.course;
    return (
      <div>
        <h5>{course.name}</h5>
        <p>{course.description}</p>

        {
          course.gen_ed_categories.length > 0 ? (
            <p>Satisfies the following general education categories:
              {
                 course.gen_ed_categories.map(category => {
                   return (
                     <span key={category}>
                       <br/>
                       {category}
                     </span>
                   )
                 })
              }
            </p>
          ) : ''
        }

        {
          this.renderSelectorButton()
        }

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
