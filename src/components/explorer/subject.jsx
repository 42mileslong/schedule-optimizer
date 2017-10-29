import React from 'react';
import Course from './course';

export default class Subject extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        subjectData: props.subjectData,
        active: false
      }
      this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
      this.setState({
        active: !this.state.active
      });
    }

    render() {
        return (
            <div>
                <h6
                  className="text-center"
                  onClick={this.handleClick}>
                  {this.state.subjectData.name}</h6>
                {
                  this.state.subjectData.courses.map(data => {
                    return (
                      <Course
                        key={"course_" + this.state.subjectData.code + "_" + data.number}
                        visible={this.state.active}
                        courseData={data}
                        subject={this.state.subjectData.code}/>
                    )
                  })
                }

            </div>
        );

    }
}
