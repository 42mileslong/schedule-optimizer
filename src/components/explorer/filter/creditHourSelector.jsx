import React from 'react';
import FilterButton from './filterButton';

export default class CreditHourSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: []
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(hour) {
    this.state.hours.forEach(e => {
      if (e.name == hour.name) {
        return;
      }
      e.active = false;
    })
    hour.active = !hour.active;
    this.props.selectFilterCriteria("creditHour", hour);
  }

  componentDidMount() {
    var hours = [];
    for (var i = 0; i < 5; i++) {
      hours[i] = {
        active: false,
        name: i,
        key: 'creditHour' + i
      }
    }
    this.setState({
      hours: hours
    })
  }

  render() {
    return (
      <div>
        <h6 className="text-center">Credit Hours</h6>
        <ul className="list-group">
          {
            this.state.hours.map(hour => {
              return (
                <FilterButton
                  active={hour.active}
                  name={hour.name}
                  key={hour.key}
                  onClick={()=> {this.handleClick(hour)}
                  }
                />
              )
            })
          }
        </ul>
      </div>
    )
  }
}
