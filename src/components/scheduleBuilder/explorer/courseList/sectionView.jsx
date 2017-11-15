import React from 'react';
import SectionViewItem from './sectionViewItem';

export default class SectionView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      section: {}
    }
  }
  componentDidMount() {
    var sections = this.props.sections;
    console.log(sections);
  }

  render() {
    var sections = this.props.sections;
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
