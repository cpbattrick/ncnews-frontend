import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  error: {
    fontSize: "30px",
    textAlign: "center",
    margin: "1em"
  }
}));

const Error = props => {
  const classes = useStyles();
  if (props.err)
    return <Typography className={classes.error}>{props.err}</Typography>;
  return <div className="error">Route Not Found</div>;
};

export default Error;
