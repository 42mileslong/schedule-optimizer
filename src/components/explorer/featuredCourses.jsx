import React from 'react';
import GridView from './courseList/gridView';

export default class CourseList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: []
    }
  }

  componentDidMount() {
    //  WILL EVENTUALLY FETCH FEATURED COURSE DATA, CURRENTLY DISPLAYS ALL COURSES IN SP18
    this.state.courses = [];
    var newCourses = [];

    fetch('api/2018')
      .then(res => {
        return res.json()
      })
      .then(year => {
        console.log(year);
        var subjects = year.children;
        subjects.forEach(subject => {
          fetch(subject.url)
            .then(res => {
              return res.json()
            })
            .then(subject => {
              console.log(subject);
              var courses = subject.children;
              var coursesCollector = courses.map(course => {
                return {
                  code: subject.code,
                  name: subject.name + " " + course.name,
                  url: course.url
                }
              })
              this.setState({
                courses: this.state.courses.concat(coursesCollector)
              });
            })
        });
      })

  }

  render() {
    return (
      <div className="col-9">
        <div className="container-fluid">
          <div className="row">
            <h4 className="col-4">Featured Courses</h4>

          </div>
          <br/>
          <GridView courses={this.state.courses}/>

        </div>
      </div>
    );
  }
}
