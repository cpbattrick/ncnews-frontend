import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const styles = theme => ({
  form: {
    display: "inline-flex",
    flexDirection: "row",
    width: "50%",
    marginBottom: "20px",
    marginTop: "20px",
    // eslint-disable-next-line no-useless-computed-key
    ["@media (max-width:780px)"]: {
      width: "100%"
    }
  },
  column: {
    display: "flex",
    flexDirection: "column",
    flexBasis: "100%",
    flex: 1,
    marginLeft: "1rem",
    // eslint-disable-next-line no-useless-computed-key
    ["@media (max-width:780px)"]: {
      marginLeft: "0rem"
    }
  },
  button: {
    minWidth: "50px",
    marginLeft: "10px",
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    color: "white"
  }
});

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
    this.props.setQuery(this.state.topic, this.state.sort_by);
  };

  render() {
    const {
      classes: { form, column, button }
    } = this.props;

    return (
      <div>
        <form className={form} onSubmit={this.handleSubmit}>
          <FormControl className={column}>
            <InputLabel htmlFor="sort-simple">Order By</InputLabel>
            <Select
              name="sort_by"
              value={this.state.sort_by}
              onChange={this.handleChange}
              inputProps={{
                name: "sort_by",
                id: "order-by-simple"
              }}
            >
              <MenuItem value={"created_at"} label="Creation Date">
                Creation Date
              </MenuItem>
              <MenuItem value={"votes"}>Votes</MenuItem>
              <MenuItem value={"comment_count"}>Comment Count</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" type="submit" className={button}>
            Sort me!
          </Button>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(SortBar);
