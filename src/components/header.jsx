import React from "react";
import LoginBox from "./loginBox";

const Header = props => {
  return (
    <div>
      <h1>News Stuff, maybe cat memes</h1>
      <LoginBox loginUser={props.loginUser} logoutUser={props.logoutUser}/>
    </div>
  );
};

export default Header;
