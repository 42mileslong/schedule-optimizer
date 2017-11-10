import React from 'react';

export default class GridViewItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: {

      }
    }
  }

  componentDidMount() {
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

  render() {
    var id = this.props.course.name.replace(/\s/g,'');
    var course = this.state.course;
    var courseNum = course.number;
    return (
      <div className="col-6">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">{course.number + " " + course.name}</h4>
            <h6 className="card-subtitle">{course.name}</h6>
            <p>{course.description}</p>
            <button type="button"
              className="btn btn-link"
              data-toggle="modal"
              data-target={"#Modal" + id}>Details</button>
          </div>
        </div>

        <div className="modal fade"
          id={"Modal" + id}
          tabIndex="-1" role="dialog"
          aria-labelledby={"Modal" + id}
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
