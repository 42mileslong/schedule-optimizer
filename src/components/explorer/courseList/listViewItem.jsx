import React from 'react';

export default class ListViewItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      course: {}
    }
    this.handleClick = this.handleClick.bind(this);
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

  handleClick() {
    this.setState({
      active: !this.state.active
    });
  }
  render() {
    var course = this.state.course;
    return (
      <div className="list-group-item">
        <h4>{this.props.course.code + " " + course.number}</h4>
        <h6>{course.name}</h6>
        <p>{course.description}</p>
        <div className={this.state.active ? "d-inline" : "d-none"}>
          <div>
            <h5>Avalible Sections</h5>
            ...
          </div>
        </div>
        <button onClick={this.handleClick}>{this.state.active ? "Hide Details" : "Show Details"}</button>
      </div>
    )
  }
}
