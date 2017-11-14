import React from 'react';

export default class CourseTable extends React.Component {
  render() {
    var courses = this.props.courses;
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
                  <td>{course.search_field}</td>
                  <td>Title</td>
                  <td>Credits</td>
                </tr>
              )
            })
          }
        </thead>
      </table>
    )
  }
}
