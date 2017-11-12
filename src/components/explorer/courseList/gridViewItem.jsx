import React from 'react';
export default class GridViewItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: {},
      id: ""
    }
    this.renderCardDetails = this.renderCardDetails.bind(this);
    this.renderModalDetails = this.renderModalDetails.bind(this);
  }

  componentDidMount() {
    this.state.id = this.props.course.name.replace(/\s/g,''); // No render
  }

  renderCardDetails() {
    var course = this.props.course;
    return (
      <div>
        <h5 className="card-subtitle">{course.name}</h5>
        <p>{course.description}</p>
        <button type="button"
          className="btn btn-link"
          data-toggle="modal"
          data-target={"#Modal" + this.state.id}>Details</button>
      </div>
    )
  }
  renderModalDetails() {
    if (typeof this.props.course.name != "undefined") {
      var course = this.props.course;
      return (
        <div>
          <p>{course.description}</p>
        </div>
      )
    } else {
      return (
        <p>Loading...</p>
      )
    }
  }

  render() {
    var course = this.props.course;
    return (
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">{course.subject + " " + course.number}</h4>
          {
            this.renderCardDetails()
          }
        </div>
      </div>
    )
  }
}
