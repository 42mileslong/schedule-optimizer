import React from 'react';
import SectionView from './sectionView';
import CourseModal from './courseModal';

export default class GridViewItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: ""
    }
    this.renderCardDetails = this.renderCardDetails.bind(this);
    this.renderModalDetails = this.renderModalDetails.bind(this);
  }

  componentDidMount() {
    this.state.id = this.props.course.name.replace(/\s/g,''); // No render
  }

  addCourse(type) {
    this.props.addCourse(type, this.props.course);
  }

  removeCourse(type) {
    this.props.removeCourse(type, this.props.course);
  }

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
  renderCardDetails() {
    var course = this.props.course;
    return (
      <div>
        <h5 className="card-subtitle">{course.name}</h5>
        <p>{course.description}</p>

        <div className="course-box-buttons">
          <button type="button"
            className="btn btn-primary"
            data-toggle="modal"
            data-target={"#Modal" + this.state.id}>Details</button>

          {
            this.renderSelectorButton()
          }
        </div>


      </div>
    )
  }
  renderModalDetails() {
    if (typeof this.props.course.name != "undefined") {
      var course = this.props.course;
      return (
        <div>
          <p>{course.description}</p>
        </div>
      )
    } else {
      return (
        <p>Loading...</p>
      )
    }
  }

  render() {
    var course = this.props.course;
    return (
      <div className="card">
        <div className="explorer-card card-body">
          <h4 className="card-title">{course.subject + " " + course.number}</h4>
          {
            this.renderCardDetails()
          }
        </div>
        <CourseModal course={this.props.course} modalId={this.state.id}/>
      </div>
    )
  }
}
