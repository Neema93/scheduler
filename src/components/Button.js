import React from "react";

import "components/Button.scss";
import classNames from "classnames";
export default function Button(props) {
   //create button class name
   const buttonClass = classNames("button", {
      "button--confirm": props.confirm,
      "button--danger": props.danger
    });
  // create button compont
    return (
      <button
        className={buttonClass}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.children}
      </button>
    );
 }