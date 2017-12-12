import React from 'react';

import DayView from './dayView';

// Displays all a user's schedules
export default class ScheduleView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // A list of current sections to display
      sections: [],
      // All schedules, a 2d array of section ids
      schedules: [],
      // A 2d array of section objects
      sectionsForSchedule: [],
      // Currently viewed schedule
      scheduleNum: 0
    }
    this.baseTime = 6;
    this.numHours = 16;
    this.timeToInt = this.timeToInt.bind(this);
  }

  /**
    * Converts a time in the format XX:XX AM to an integer, for display purposes
    *
    * @param {String} time The time to convert
    */
  timeToInt(time) {
    var startAmPm = time.split(' ')[1];
    var startClock = time.split(' ')[0];
    var startHour = parseInt(startClock.split(':')[0]) - this.baseTime;
    if (startAmPm === 'PM' && startClock.split(':')[0] !== '12') {
      startHour += 12;
    }
    var startMinute = parseInt(startClock.split(':')[1]);
    return startHour * 60 + startMinute;
  }

  componentDidMount() {
    // Generate schedules based on given courses
    fetch('/api/optimize', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.props.courses)
    }).then(res => {
        return res.json()
    }).then(sectionIds => {
        // Populate schedules, set up current sections to view
        this.setState({
          schedules: sectionIds,
          sectionsForSchedule: new Array(sectionIds.length),
          scheduleNum: 0
        });

        this.updateSections(0);
      });
  }

  /**
    * Advances to the next generated schedule, if possible
    */
  nextSchedule() {
    if (this.state.scheduleNum < this.state.schedules.length - 1) {
      var newScheduleNum = this.state.scheduleNum + 1;
      this.setState({
        scheduleNum: newScheduleNum
      });
      this.updateSections(newScheduleNum);
    }
  }

  /**
    * Goes to the previous generated schedule, if possible
    */
  nextSection() {
    if (this.state.scheduleNum > 0) {
      var newScheduleNum = this.state.scheduleNum - 1;
      this.setState({
        scheduleNum: newScheduleNum
      });
      this.updateSections(newScheduleNum);
    }
  }

  /**
    * Grabs the actual section data associated with the section ids for this
    * schedule. Cache in case the user comes back to it.
    */
  updateSections(newScheduleNum) {
    var year = this.props.config.term.year;
    var term = this.props.config.term.name;

    // Check to see if the Section objects for this schedule have been
    // saved before, otherwise load from API
    var cachedSections = this.state.sectionsForSchedule[newScheduleNum];
    if (cachedSections !== undefined) {
      this.setState({
        sections: cachedSections
      });
    } else {
      // Get all section IDs for this schedule
      var sectionIds = this.state.schedules[newScheduleNum];
      var url = 'api/section'
          + '?year=' + year
          + '&term=' + term;

      if (sectionIds.length > 0) {
        sectionIds.forEach(sectionId => {
          url += '&number=' + sectionId;
        });

        fetch(url)
          .then(res => {
            return res.json()
          })
          .then(sections => {
            // Pull Section objects from API, display them, and cache for later
            this.state.sectionsForSchedule[newScheduleNum] = sections;

            this.setState({
              sections: sections,
              sectionsForSchedule: this.state.sectionsForSchedule
            });
          });
      } else {
        this.state.sectionsForSchedule[newScheduleNum] = [];

        this.setState({
          sections: [],
          sectionsForSchedule: this.state.sectionsForSchedule
        });
      }

    }

    // Load the next schedule too, to reduce perceived latency
    if (newScheduleNum < this.state.schedules.length - 1
        && this.state.sectionsForSchedule[newScheduleNum + 1] === undefined) {
      var sectionIds = this.state.schedules[newScheduleNum + 1];
      var url = 'api/section'
          + '?year=' + year
          + '&term=' + term;

      if (sectionIds.length > 0) {
        sectionIds.forEach(sectionId => {
          url += '&number=' + sectionId;
        });

        fetch(url)
          .then(res => {
            return res.json()
          })
          .then(sections => {
            // Pull Section objects from API, display them, and cache for later
            this.state.sectionsForSchedule[newScheduleNum + 1] = sections;
          });
      } else {
        this.state.sectionsForSchedule[newScheduleNum + 1] = [];
      }
    }
  }


  render() {
    var sections = this.state.sections;
    if (typeof sections == 'undefined') {
      sections = [];
    }
    return (
      <div>
        <div className='row'>
            <div className='col text-center'>
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={() => {this.nextSection()}}
                disabled={this.state.scheduleNum > 0 ? false : true}>&lt;</button>
              <span className="schedule-num">
                Schedule {this.state.scheduleNum + 1} of {this.state.schedules.length}
              </span>
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={() => {this.nextSchedule()}}
                disabled={this.state.scheduleNum < this.state.schedules.length - 1 ? false : true}>&gt;</button>
            </div>
        </div>
        <br/>
        <div className='row' style={{'margin': '0px'}}>
          <div className='col-1 hours'>
            <div className='row day-name'></div>
            {
              Array.from(Array(this.numHours).keys()).map(i => {
                // List numbers alongside left column
                var hour = (this.baseTime + i);
                var ampm = 'AM';
                if (hour > 12) {
                  hour -= 12;
                  ampm = 'PM';
                } else if (hour == 12) {
                  ampm = 'PM';
                }

                return (
                  <div key={i} className='row hour-number'>{hour + ' ' + ampm}</div>
                )
              })
            }
          </div>
          <DayView day='M' dayName='Monday' sections={sections} timeToInt={this.timeToInt} numHours={this.numHours}/>
          <DayView day='T' dayName='Tuesday' sections={sections} timeToInt={this.timeToInt} numHours={this.numHours}/>
          <DayView day='W' dayName='Wednesday' sections={sections} timeToInt={this.timeToInt} numHours={this.numHours}/>
          <DayView day='R' dayName='Thursday' sections={sections} timeToInt={this.timeToInt} numHours={this.numHours}/>
          <DayView day='F' dayName='Friday' sections={sections} timeToInt={this.timeToInt} numHours={this.numHours}/>
        </div>
        <div className='row'>
          <div className='col-3'></div>
          <div className='col-6'>
            <table className="table course-table">
              <thead>
                <tr>
                  <th scope="col">Course</th>
                  <th scope="col">Section Type</th>
                  <th scope="col">CRN</th>
                </tr>
              </thead>
              <tbody>
              {
                sections.map(section => {
                  return (
                      <tr key={section._id}>
                        <td>{section.subject + " " + section.course_number}</td>
                        <td>{section.meetings[0].type_verbose}</td>
                        <td>{section.number}</td>
                      </tr>
                  )
                })
              }
              </tbody>
            </table>
          </div>
          <div className='col-3'></div>
        </div>
      </div>
    )
  }
}
