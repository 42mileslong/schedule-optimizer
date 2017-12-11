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
        className={props.active ? "list-group-item text-center active clickable" : "list-group-item text-center clickable"}
        onClick={this.handleClick}>
        {props.name}
      </li>
    );
  }
}
