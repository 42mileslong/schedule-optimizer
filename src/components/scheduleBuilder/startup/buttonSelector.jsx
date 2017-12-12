import React from 'react';

export default class ButtonSelector extends React.Component {

  render() {
    var btnModifier = this.props.active ? "btn-primary" : "btn-outline-primary";
    return (
      <button
        type="button"
        className={"btn btn-lg " + btnModifier}
        onClick={this.props.onClick}>{this.props.name}</button>
    )
  }
}
