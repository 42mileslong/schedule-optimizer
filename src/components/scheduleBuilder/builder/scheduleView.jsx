import React from 'react';

import DayView from './dayView';

export default class ScheduleView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sections: []
    }
    this.baseTime = 6;
    this.numHours = 16;
    this.timeToInt = this.timeToInt.bind(this);
  }

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
    var sectionIds = ['31208', '31218', '31187', '39311'] // TODO make this real
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
        this.setState({
          sections: sections
        });
      });
  }


  render() {
    var sections = this.state.sections;
    if (typeof sections == 'undefined') {
      sections = [];
    }
    return (
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
    )
  }
}
