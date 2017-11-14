import React from 'react';
export default class GridViewItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: ""
    }
    this.renderCardDetails = this.renderCardDetails.bind(this);
    this.renderModalDetails = this.renderModalDetails.bind(this);
  }

  componentDidMount() {
    this.state.id = this.props.course.name.replace(/\s/g,''); // No render
  }

  addCourse(type) {
    this.props.addCourse(type, this.props.course);
  }

  removeCourse(type) {
    this.props.removeCourse(type, this.props.course);
  }


  renderCardDetails() {
    var course = this.props.course;
    return (
      <div>
        <h6 className="card-subtitle">{course.name}</h6>
        <p>{course.description}</p>
        <button type="button"
          className="btn btn-link"
          data-toggle="modal"
          data-target={"#Modal" + this.state.id}>Details</button>
        <button type="button"
          className="btn btn-success"
          onClick={() => {
            this.addCourse("requiredCourses")
          }}>Add Course</button>

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
      <div className="col-6">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">{course.subject + " " + course.number}</h4>
            {
              this.renderCardDetails()
            }
          </div>
        </div>

        <div className="modal fade"
          id={"Modal" + this.state.id}
          tabIndex="-1" role="dialog"
          aria-labelledby={"Modal" + this.state.id}
          aria-hidden="true">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">{course.code + " " + course.number + " " + course.name}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {
                  this.renderModalDetails()
                }
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
