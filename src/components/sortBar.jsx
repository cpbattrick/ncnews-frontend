import React from "react";

class SortBar extends React.Component {
  state = {
    topic: "",
    sort_by: ""
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.setQuery(this.state);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Topics:
            <select
              name="topic"
              value={this.state.topic}
              onChange={this.handleChange}
            >
              <option name="all" value="">
                All
              </option>
              <option name="football" value="football">
                Football
              </option>
              <option name="cooking" value="cooking">
                Cooking
              </option>
              <option name="coding" value="coding">
                Coding
              </option>
            </select>
          </label>
          <label>
            Order By:
            <select
              name="sort_by"
              value={this.state.sort_by}
              onChange={this.handleChange}
            >
              <option name="none" value="">
                None
              </option>
              <option name="votes" value="votes">
                Votes
              </option>
              <option name="comment_count" value="comment_count">
                Comment Count
              </option>
            </select>
          </label>
          <button type="submit">Sort Me!</button>
        </form>
      </div>
    );
  }
}

export default SortBar;
