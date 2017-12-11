import React from 'react';

export default class SearchSelector extends React.Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.triggerChange = this.triggerChange.bind(this);
  }

  componentDidMount() {
    this.timer = null;
    this.text = null;
  }

  handleInput(event) {
    this.text = event.target.value;
    clearTimeout(this.timer);
    this.timer = setTimeout(this.triggerChange, 250);
  }

  triggerChange() {
    this.props.selectFilterCriteria("textSearch", this.text);
  }

  render() {
    return (
      <div>
        <h6 className="text-center">Search</h6>
        <input
          type="text"
          className="form-control"
          placeholder="Search for a course"
          onInput={this.handleInput}>
        </input>
      </div>
    );
  }
}
