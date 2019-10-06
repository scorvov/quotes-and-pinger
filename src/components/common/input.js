import React from "react";

export const Input = ({ label, ...props }) => {
  return (
    <div className={"input-group"}>
      <p className={"input-group_label"}>{label}</p>
      <input className={"input-group_input"} {...props} />
    </div>
  );
};
