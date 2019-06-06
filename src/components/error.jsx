import React from "react";

const Error = props => {
  if (props.err) return <div>{props.err}</div>;
  return <div>Route Not Found</div>;
};

export default Error;
