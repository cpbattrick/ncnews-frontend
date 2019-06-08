import React from "react";
import LoginBox from "./LoginBox";
import "../App.css";

const Header = props => {
  return (
    <div className="Header">
      <h1>News For Humans</h1>
      <LoginBox loginUser={props.loginUser} logoutUser={props.logoutUser} />
    </div>
  );
};

export default Header;
