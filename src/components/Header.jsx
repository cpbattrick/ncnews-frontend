import React from "react";
import LoginBox from "./LoginBox";
import "../App.css";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Home from "@material-ui/icons/Home";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "@reach/router";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    flexWrap: "wrap",
    paddingTop: "5px"
  },
  title: {
    flexGrow: 1
  },
  mobile: {}
}));

const AdapterLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} {...props} />
));

const Header = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <div className={classes.mobile}>
          <Toolbar>
            <IconButton component={AdapterLink} to="/">
              <Home />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              News
            </Typography>
            <LoginBox
              loggedInUser={props.loggedInUser}
              loginUser={props.loginUser}
              logoutUser={props.logoutUser}
            />
          </Toolbar>
        </div>
      </AppBar>
    </div>
  );
};

export default Header;
