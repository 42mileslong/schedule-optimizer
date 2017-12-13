import React from 'react';

// Displays all selected courses of a specific type (required, preferred)
export default class CourseTable extends React.Component {

  removeCourse(course) {
    var courseWork = this.props.courseWork;
    var typedWork = courseWork[this.props.courseType];

    var index = -1;
    for (var i = typedWork.length - 1; i >= 0; i--) {
      if (typedWork[i]._id == course._id) {
        typedWork.splice(i, 1);
      }
    }

    this.props.selectCourses(this.props.courseType, typedWork);
  }

  // Simple table view for each course that's selected
  render() {
    var courses = this.props.courseWork[this.props.courseType];
    if (typeof courses == 'undefined') {
      courses = [];
    }
    return (
      <table className="table course-table">
        <thead>
          <tr>
            <th scope="col">Course</th>
            <th scope="col">Title</th>
            <th scope="col">Credits</th>
            <th scope="col"></th>
          </tr>
        </thead>
        {
          courses.map(course => {
            return (
              <tbody key={course._id}>
                <tr>
                  <td>{course.subject + " " + course.number}</td>
                  <td>{course.name}</td>
                  <td>{course.credit_hours}</td>
                  <td className="remove-button">
                    <button type="button"
                      className="btn btn-danger remove-course"
                      onClick={() => {
                        this.removeCourse(course);
                        this.removeCourse(course);
                    }}>X</button>
                  </td>
                </tr>
                {
                  course.section_types.map(section_type => {
                    return (
                      <tr className = "section" key={course._id + "-" + section_type}>
                        <td>{section_type}</td>
                        <td></td>
                        <td></td>
                        <td></td>

                      </tr>
                    )
                  })
                }
              </tbody>
            )
          })
        }
      </table>

    )
  }
}
