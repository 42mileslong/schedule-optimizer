import React from 'react';

import ScheduleCourse from './scheduleCourse';

// One column of the schedule view - corresponds to a specific day
// Passed a day param (M, T, W, F etc)
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
                if (days !== undefined && days !== null && days.includes(this.props.day)) {
                  var start_time = this.props.timeToInt(section.meetings[0].start_time) * (4/6.);
                  var end_time = this.props.timeToInt(section.meetings[0].end_time) * (4/6.);

                  // Move course to appropriate location based on start/end time
                  var style = {
                    top: (start_time + 'px'),
                    height: ((end_time - start_time) + 'px')
                  }
                  return (
                    <ScheduleCourse
                      key={section._id}
                      style={style}
                      section={section}/>
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
              <div key={i}>
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
