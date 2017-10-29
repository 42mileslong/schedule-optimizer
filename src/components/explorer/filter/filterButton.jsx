import React from 'react';

export default class FilterButton extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick();
  }

  render() {
    var props = this.props;
    return (
      <li
        className={this.props.active ? "list-group-item active" : "list-group-item"}
        onClick={this.handleClick}>
        {props.name}
      </li>
    );
  }
}
