import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {
  // create interviewerclass
  const interviewerClass = classNames(
    "interviewers__item", {
    "interviewers__item--selected": props.selected
  });
  // create interviewers compont
  return (
    <li className={interviewerClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
