import React from 'react'

export default class GridView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <div className="row">
        <div className="list-group col-12">
          {
            this.props.courses.map(course => {
              return (
                <div className="list-group-item">
                  <h4>{course.code + " " + course.name.split(" ").slice().pop()}</h4>
                  <h6>{course.name}</h6>
                  <p>Some Course Description</p>
                </div>
              );

            })
          }
          </div>
      </div>
    )

  }
}
