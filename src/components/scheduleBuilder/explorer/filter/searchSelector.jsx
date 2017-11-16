import React from 'react';

export default class SearchSelector extends React.Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(event) {
    var text = event.target.value;
    this.props.selectFilterCriteria("textSearch", text);
  }

  render() {
    return (
      <div>
        <h6 className="text-center">Search</h6>
        <input
          type="text"
          className="form-control"
          onInput={this.handleInput}>
        </input>
      </div>
    );
  }
}
