import React from 'react';
import SectionViewItem from './sectionViewItem';

export default class SectionView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sections: []
    }
  }

  componentDidMount() {
    var course = this.props.course;

    // Build URL to access desired sections
    var url = 'api/section'
      + '?year=' + course.year
      + '&term=' + course.term
      + '&course_number=' + course.number;

    fetch(url)
      .then(res => {
        return res.json();
      })
      .then(sections => {
        this.setState({
          sections: sections
        })
      })
  }

  render() {
    var course = this.props.course;
    var sections = this.state.sections;
    return (
      <div>
        <h4>Sections</h4>
        <table className = "table">
          <thead>
            <tr>
              <th scope="col">CRN</th>
              <th scope="col">Section Code</th>
              <th scope="col">Type</th>
              <th scope="col">Time</th>
              <th scope="col">Days</th>
              <th scope="col">Location</th>
              <th scope="col">Instructor</th>
            </tr>
          </thead>
          <tbody>
          {
            sections.map(section => {
              if (this.props.section === undefined || section.number == this.props.section) {
                return (
                  <SectionViewItem
                    key={section._id}
                    section={section}/>
                );
              } else {
                return "";
              }
            })
          }
          </tbody>
        </table>
      </div>
    )
  }
}
