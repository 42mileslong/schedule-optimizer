import React from 'react';

export default class CourseTable extends React.Component {
  render() {
    var courses = this.props.courses;
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
                </tr>
                {
                  course.section_types.map(section_type => {
                    return (
                      <tr className = "section" key={course._id + "-" + section_type}>
                        <td>{section_type}</td>
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
