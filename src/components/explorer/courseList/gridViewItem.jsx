import React from 'react';

export default class GridViewItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: {},
      id: ""
    }
    this.renderCardDetails = this.renderCardDetails.bind(this);
  }

  componentDidMount() {
    this.state.id = this.props.course.name.replace(/\s/g,''); // No render
    var url = this.props.course.url;
    fetch(url)
      .then(res => {
        return res.json();
      })
      .then(course => {
        this.setState({
          course: course
        })
      })
  }

  renderCardDetails() {
    if (typeof this.state.course.name != "undefined") {
      var course = this.state.course;
      return (
        <div>
          <h6 className="card-subtitle">{course.name}</h6>
          <p>{course.description}</p>
          <button type="button"
            className="btn btn-link"
            data-toggle="modal"
            data-target={"#Modal" + this.state.id}>Details</button>
        </div>
      )
    } else {
      return (
        <p>Loading...</p>
      )
    }
  }

  render() {
    var courseMinData = this.props.course;
    var courseNum = courseMinData.name.split(" ").splice(-1)[0];

    //  Course will be undefined in initial render
    var course = this.state.course;
    return (
      <div className="col-6">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">{courseMinData.code + " " + courseNum}</h4>
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
                <h5 className="modal-title" id="exampleModalLabel">{this.props.course.code + " " + courseNum + " " + course.name}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>{course.description}</p>
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
