import React from "react";
import { Navigate } from "react-router-dom";

const AppRoute = (props) => {
  // let res = JSON.parse(localStorage.getItem("authUser"));
  
  // if (!localStorage.getItem("authUser")) {
  //   return (
  //     <Navigate to={{ pathname: "/auth", state: { from: props.location } }} />
  //   );
  // }
  
  return <React.Fragment>{props.children}</React.Fragment>;
};

export default AppRoute;
