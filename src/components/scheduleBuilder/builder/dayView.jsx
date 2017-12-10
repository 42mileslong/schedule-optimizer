import React from 'react';

import DayView from './dayView';

export default class ScheduleView extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    var sections = this.props.sections;
    if (typeof sections == 'undefined') {
      sections = [];
    }
    return (
      <div className="col-2">
        <div className="course-container">
          <div className="course-container-inner">
            {
              sections.map(section => {
                var days = section.meetings[0].days;
                if (days.includes(this.props.day)) {
                  var start_time = this.props.timeToInt(section.meetings[0].start_time);
                  var end_time = this.props.timeToInt(section.meetings[0].end_time);
                  var type = section.meetings[0].type_verbose;
                  var display_name = section.subject + ' ' + section.course_number + ' ' + type;
                  var style = {
                    top: (start_time + 'px'),
                    height: ((end_time - start_time) + 'px')
                  }
                  return (
                    <div
                      className = 'card-body card course'
                      style = {style}>{display_name}</div>
                  );
                } else {
                  return ('');
                }

              })
            }
          </div>
        </div>
        <div className='row day-name'>{this.props.dayName}</div>
        {
          Array.from(Array(this.props.numHours).keys()).map(i => {
            return (
              <div>
                <div className='row hour-delimiter top-half'></div>
                <div className='row hour-delimiter bottom-half'></div>
              </div>
            )
          })
        }
        <br/>
        <br/>
      </div>
    )
  }
}
