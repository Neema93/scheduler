import React from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {
  // get useAppliction hook for seprate data
  const { state, setDay, bookInterview, cancelInterview } = useApplicationData();
  // get the perticular day appointment
  const appointments = getAppointmentsForDay(state, state.day);
  // make appointment map data
  const schedule = appointments.map((appointment) => {
    // get interview object
    const interview = getInterview(state, appointment.interview);
    // get interviewer object
    const interviewers = getInterviewersForDay(state, state.day);
    // send data to appointment componet
    return (

      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });
  // cteart main page
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          /></nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        {/* fix last appointment */}
        <Appointment key="last" time="5pm" /></section>
    </main>
  );
}
