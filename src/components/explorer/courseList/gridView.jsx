import React from 'react'

export default class GridView extends React.Component {
  render() {
    return (
      <div className="row">
        {
          this.props.courses.map(course => {
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
    )

  }
}
