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
        {
          sections.map(section => {
            return (
              <SectionViewItem section={section}/>
            )
          })
        }
      </div>
    )
  }
}
