import React from 'react';

// Displays all selected courses of a specific type (required, preferred)
export default class CourseTable extends React.Component {

  // Simple table view for each course that's selected
  render() {
    var courses = this.props.courses;
    if (typeof courses == 'undefined') {
      courses = [];
    }
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Course</th>
            <th scope="col">Title</th>
            <th scope="col">Credits</th>
          </tr>
          {
            courses.map(course => {
              return (
                <tr key={course._id}>
                  <td>{course.subject + " " + course.number}</td>
                  <td>{course.name}</td>
                  <td>{course.credit_hours}</td>
                </tr>
              )
            })
          }
        </thead>
      </table>

    )
  }
}
