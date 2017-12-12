import React from 'react';

// Text search for the explorer page
export default class SearchSelector extends React.Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.triggerChange = this.triggerChange.bind(this);
  }

  componentDidMount() {
    this.timer = null;
    this.text = null;

    // Load search query from saved state
    this.refs.searchBox.value = this.props.searchCriteria.textSearch;
  }

  /**
    * Handles typing input in the textbox - starts a timer, when it elapses,
    * update search results
    *
    * @param {Object} event The typing event
    */
  handleInput(event) {
    // The timer resets each time a letter is typed, meaning that a search won't
    // be performed until the user stops typing
    this.text = event.target.value;
    clearTimeout(this.timer);
    this.timer = setTimeout(this.triggerChange, 250);
  }

  /**
    * Actually updates the search query, after the user pauses typing
    */
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
          onInput={this.handleInput}
          ref="searchBox">
        </input>
      </div>
    );
  }
}
