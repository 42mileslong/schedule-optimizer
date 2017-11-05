import React from 'react';

export default class CourseList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: []
    }
  }

  loadCourses() {
    var subjects = this.props.searchCriteria.subjects;
    console.log("")
    console.log(subjects);
    subjects.forEach(subject => {
      var isLoaded = false;
      this.state.courses.forEach(course => {
        if (course.code == subject.name) {
          isLoaded = true;
        }
      })
      console.log("loaded? " + isLoaded);
      if (!isLoaded) {
        fetch(subject.url)
          .then(res => {
            return res.json()
          })
          .then(subject => {
            var courses = subject.children;
            var coursesCollector = courses.map(course => {
              return {
                code: subject.code,
                name: subject.name + " " + course.name,
                url: course.url
              }
            })
            this.setState({
              courses: coursesCollector,
            })

          })
      }
    });

  }

  render() {
    this.loadCourses();
    return (
      <div className="col-9">
        <div className="container-fluid">
          <div className="row">
            <h4 className="col-4">Courses</h4>

          </div>
          <div className="row">
            {
              this.state.courses.map(course => {
                return (
                  <div className="card col-6">
                    <div className="card-body">
                      <h4 className="card-title">{course.name}</h4>
                      <h6 className="card-subtitle">{course.name}</h6>
                      <p>{course.description}</p>
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
