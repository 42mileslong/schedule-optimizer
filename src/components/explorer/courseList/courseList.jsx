import React from 'react';

export default class CourseList extends React.Component {
  render() {
    var props = this.props;
    return (
      <div className="col-9">
        <h4>Courses</h4>
        <div className="container-fluid">
          <div className="row">
            {
              props.courses.map(course => {
                return (
                  <div className="card col-6">
                    <div className="card-body">
                      <h4 className="card-title">{course.code + " " + course.number}</h4>
                      <h6 className="card-subtitle">{course.name}</h6>
                    </div>
                  </div>
                );

              })
            }
          </div>
        </div>
      </div>
    );
  }
}
