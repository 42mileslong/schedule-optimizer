import React from 'react';
import GridView from './gridView';
import ListView from './listView';

export default class CourseList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      viewType: 'grid'
    }
    this.handleGridToggle = this.handleGridToggle.bind(this);
    this.handleListToggle = this.handleListToggle.bind(this);
  }

  componentWillReceiveProps() {
      console.log('aaaaadafds');
    //  Rebuild course list on change
    this.state.courses = [];
    var subjects = [this.props.searchCriteria.subject];
    var newCourses = [];
    console.log(subjects.length + 'aaaa');
    subjects.forEach(subject => {
        console.log('bbb');
        fetch('api/course?year=2018&term=Spring&subject=' + subject.name)
          .then(res => {
            return res.json()
          })
          .then(courses => {
              console.log('aaa');
              var coursesCollector = courses.map(course => {
                return {
                  code: subject.name,
                  name: subject.name_verbose + " " + course.name,
                  number: course.number,
                  description: course.description
                }
              })
              this.setState({
                courses: this.state.courses.concat(coursesCollector)
              });
          });
    });
  }


  handleGridToggle() {
    this.setState({
      viewType: 'grid'
    })
  }

  handleListToggle() {
    this.setState({
      viewType: 'list'
    })
  }

  render() {
    return (
      <div className="col-9">
        <div className="container-fluid">
          <div className="row">
            <h4 className="col-4">Courses</h4>
            <div className="btn-group col-2 offset-md-6" role="group" aria-label="Basic example">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={this.handleGridToggle}>Grid</button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={this.handleListToggle}>List</button>
            </div>
          </div>
          <br/>
          {
            this.state.viewType == 'grid' ? (
              <GridView courses={this.state.courses}/>
            ) : (
              <ListView courses={this.state.courses} />
            )

          }

        </div>
      </div>
    );
  }
}
