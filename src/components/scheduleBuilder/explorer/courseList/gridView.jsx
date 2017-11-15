import React from 'react'
import GridViewItem from './gridViewItem'

export default class GridView extends React.Component {
  render() {
    return (
      <div className="row">
        {
          this.props.courses.map(course => {
            return (
              <GridViewItem
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
