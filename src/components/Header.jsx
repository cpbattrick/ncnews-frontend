import React from "react";
import LoginBox from "./LoginBox";
import "../App.css";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const Header = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <LoginBox
            color="inherit"
            loggedInUser={props.loggedInUser}
            loginUser={props.loginUser}
            logoutUser={props.logoutUser}
          />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
