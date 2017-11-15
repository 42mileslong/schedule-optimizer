import React from 'react';

export default class CourseTable extends React.Component {
  render() {
    var courses = this.props.courses;
    if (typeof courses == 'undefined') {
      courses = [];
    }
    console.log(courses);
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
                <tr>
                  <td>{course.subject + " " + course.number}</td>
                  <td>{course.name}</td>
                  <td>{course.credit_Hours}</td>
                </tr>
              )
            })
          }
        </thead>
      </table>
    )
  }
}
