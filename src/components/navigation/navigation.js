import React from "react";
import { NavLink } from "react-router-dom";

export const Navigation = () => {
  return (
    <div className={"navigation"}>
      <NavLink to={"/quotes"} className={"nav-item"} activeClassName="selected">
        Quotes
      </NavLink>
      <NavLink to={"/ping"} className={"nav-item"} activeClassName="selected">
        Pinger
      </NavLink>
    </div>
  );
};
