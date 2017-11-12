import React from 'react'
import GridViewItem from './gridViewItem'

export default class GridView extends React.Component {
  render() {
    return (
      <div className="row card-columns">
        {
          this.props.courses.map(course => {
            return (
              <GridViewItem course={course} />
            );

          })
        }
      </div>
    )

  }
}
