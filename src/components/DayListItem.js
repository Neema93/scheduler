import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";
export default function DayListItem(props) {
  // get data state
  const { name, spots, setDay } = props;
  //create dayClass 
  const dayClass = classNames(
    "day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });
  // set spots
  const formatSpots = () => {
    if (spots === 0) {
      return `no spots remaining`;
    }
    else if (spots === 1) {
      return `1 spot remaining`;
    }
    else {
      return `${spots} spots remaining`;
    }
  }
// create daylistitem componet
  return (
    <li className={dayClass} onClick={() => setDay(name)}>
      <h2 className="text--regular">Day Name: {name}</h2>
      <h3 className="text--light">{formatSpots()} </h3>
    </li>

  );
}