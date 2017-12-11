import React from 'react';

export default class SectionViewItem extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    var section = this.props.section;
    var meetingType = "";
    var meetingDays = "N/A";
    var meetingLocation = "N/A";
    var instructor = "N/A";
    var time = "N/A";

    if (section.meetings.length > 0) {
      meetingType = section.meetings[0].type_verbose;
      if (section.meetings[0].days !== null) {
        meetingDays = section.meetings[0].days;
      }
      if (section.meetings[0].building !== null) {
        meetingLocation = section.meetings[0].room + " " + section.meetings[0].building;
      }
      if (section.meetings[0].instructors.length > 0) {
        instructor = section.meetings[0].instructors[0].first_name + " "
          + section.meetings[0].instructors[0].last_name;
      }
      if (section.meetings[0].start_time !== null) {
        if (section.meetings[0].end_time !== null) {
          time = section.meetings[0].start_time + ' - '
            + section.meetings[0].end_time;
        } else {
          time = section.meetings[0].start_time;
        }
      }
    }


    return (
      <tr>
        <td>{section.number}</td>
        <td>{section.code}</td>
        <td>{meetingType}</td>
        <td>{time}</td>
        <td>{meetingDays}</td>
        <td>{meetingLocation}</td>
        <td>{instructor}</td>
      </tr>
    )
  }
}
