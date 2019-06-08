import React from "react";

const Error = props => {
  if (props.err) return <div className="error">{props.err}</div>;
  return <div className="error">Route Not Found</div>;
};

export default Error;
