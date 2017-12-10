import React from 'react';

import DayView from './dayView';

export default class ScheduleView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sections: []
    }
    this.base_time = 6;
    this.num_hours = 16;
    this.timeToInt = this.timeToInt.bind(this);
  }

  timeToInt(time) {
    var start_am_pm = time.split(' ')[1];
    var start_clock = time.split(' ')[0];
    var start_hour = parseInt(start_clock.split(':')[0]) - this.base_time;
    if (start_am_pm === 'PM') {
      start_hour += 12;
    }
    var start_minute = parseInt(start_clock.split(':')[1]);
    return start_hour * 60 + start_minute;
  }


  componentDidMount() {
    console.log('test test');

    fetch('/api/optimize', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.props.courses)
    }).then(res => {
        return res.json()
    }).then(section_ids => {
        console.log(section_ids);
        var url = 'api/section'
            + '?year=' + '2018'
            + '&term=Spring';

        section_ids.forEach(section_id => {
          url += '&number=' + section_id;
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
      });
  }


  render() {
    var sections = this.state.sections;
    if (typeof sections == 'undefined') {
      sections = [];
    }
    return (
      <div className='row' style={{'margin': '0px'}}>
        <div className='col-1'>
        {
          Array.from(Array(this.num_hours).keys()).map(i => {
            var hour = (this.base_time + i);
            var ampm = 'AM';
            if (hour > 12) {
              hour -= 12;
              ampm = 'PM';
            } else if (hour == 12) {
              ampm = 'PM';
            }

            return (
              <div className='row' style={{'height':'60px'}}>{hour + ' ' + ampm}</div>
            )
          })
        }
        </div>
        <DayView day='M' sections={sections} timeToInt={this.timeToInt}/>
        <DayView day='T' sections={sections} timeToInt={this.timeToInt}/>
        <DayView day='W' sections={sections} timeToInt={this.timeToInt}/>
        <DayView day='R' sections={sections} timeToInt={this.timeToInt}/>
        <DayView day='F' sections={sections} timeToInt={this.timeToInt}/>
      </div>
    )
  }
}
