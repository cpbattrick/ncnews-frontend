import React from "react";
import LoginBox from "./LoginBox";
import "../App.css";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "@reach/router";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: "10px"
  }
}));

const AdapterLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} {...props} />
));

const Header = props => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div>
      <AppBar position="static">
        <div>
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem component={AdapterLink} to="/">
                Home
              </MenuItem>
              <MenuItem component={AdapterLink} to="/football">
                Football
              </MenuItem>
              <MenuItem component={AdapterLink} to="/cooking">
                Cooking
              </MenuItem>
              <MenuItem component={AdapterLink} to="/coding">
                Coding
              </MenuItem>
            </Menu>

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
