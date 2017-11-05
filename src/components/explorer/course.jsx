import React from 'react';
import Section from './section';

export default class Term extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        courseData: props.courseData,
        active: false
      }
      this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
      console.log("clicked");
      this.setState({
        active: !this.state.active
      });
    }

    render() {
      var isActive = this.props.visible;
      var course = this.state.courseData;
      console.log(course);
      return (
            <div className={ isActive ? "" : "d-none"}>
                <h4 onClick={this.handleClick}>{this.props.subject + " " + course.number + " " + course.name}</h4>
                <p>{course.description}.</p>
                {
                  course.sections.map(data => {
                    return (
                      <Section
                        visible={this.state.active}
                        sectionData={data}/>
                    )
                  })
                }
            </div>
        );
    }
}
