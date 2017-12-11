import React from 'react';

import DayView from './dayView';

export default class ScheduleView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sections: [],
      schedules: [],
      sectionsForSchedule: [],
      scheduleNum: 0
    }
    this.baseTime = 6;
    this.numHours = 16;
    this.timeToInt = this.timeToInt.bind(this);
  }

  // Converts a time in the format XX:XX AM to an integer, for display purposes
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

        this.setState({
          schedules: sectionIds,
          sectionsForSchedule: new Array(sectionIds.length),
          scheduleNum: 0
        });

        this.updateSections(0);
      });
  }

  nextSection() {
    if (this.state.scheduleNum < this.state.schedules.length - 1) {
      var newScheduleNum = this.state.scheduleNum + 1;
      this.setState({
        scheduleNum: newScheduleNum
      });
      this.updateSections(newScheduleNum);
    }
  }

  prevSection() {
    if (this.state.scheduleNum > 0) {
      var newScheduleNum = this.state.scheduleNum - 1;
      this.setState({
        scheduleNum: newScheduleNum
      });
      this.updateSections(newScheduleNum);
    }
  }

  updateSections(newScheduleNum) {

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
          + '?year=' + '2018'
          + '&term=Spring';

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
                onClick={() => {this.prevSection()}}>&lt;</button>
              <span className="schedule-num">
                Schedule {this.state.scheduleNum + 1} of {this.state.schedules.length}
              </span>
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={() => {this.nextSection()}}>&gt;</button>
            </div>
        </div>
        <br/>
        <div className='row' style={{'margin': '0px'}}>
          <div className='col-1 hours'>
            <div className='row day-name'></div>
            {
              Array.from(Array(this.numHours).keys()).map(i => {
                var hour = (this.baseTime + i);
                var ampm = 'AM';
                if (hour > 12) {
                  hour -= 12;
                  ampm = 'PM';
                } else if (hour == 12) {
                  ampm = 'PM';
                }

                return (
                  <div className='row hour-number'>{hour + ' ' + ampm}</div>
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
      </div>
    )
  }
}
