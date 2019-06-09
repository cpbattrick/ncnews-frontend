import React from "react";
import LoginBox from "./LoginBox";
import "../App.css";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const Header = props => {
  return (
    <div className="">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">News</Typography>
          <LoginBox
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
