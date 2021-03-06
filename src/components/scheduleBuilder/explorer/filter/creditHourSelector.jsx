import React from 'react';
import FilterButton from './filterButton';

// Allows filtering based on credit hours
export default class CreditHourSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: []
    }
    this.handleClick = this.handleClick.bind(this);
  }

  /**
    * Handles a click on a filter button
    *
    * @param {Integer} hour The number of credit hours on the pressed button
    */
  handleClick(hour) {
    hour.active = !hour.active;
    var activeHours = [];
    this.state.hours.forEach((e) => {
      if (e.active) {
        activeHours.push(e.name);
      }
    });
    this.props.selectFilterCriteria("creditHours", activeHours);
  }

  componentDidMount() {
    var hours = [];

    // Set up 5 credit hour buttons
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
                  active={
                    this.props.searchCriteria.creditHours !== undefined ? (
                      this.props.searchCriteria.creditHours.includes(hour.name)
                    ) : false
                  }
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
