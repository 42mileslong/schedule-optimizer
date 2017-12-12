import React from 'react'
import GridViewItem from './gridViewItem'

// A grid-based list of courses
export default class GridView extends React.Component {
  render() {
    return (
      <div className="row card-columns">
        {
          this.props.courses.map(course => {
            return (
              <GridViewItem
                key={course._id}
                courseWork={this.props.courseWork}
                course={course}
                addCourse={this.props.addCourse}
                removeCourse={this.props.removeCourse}/>
            );

          })
        }
      </div>
    )

  }
}
