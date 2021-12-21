import axios from "axios";
const { useState, useEffect } = require("react");
export default function useVisualMode(initial) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviews: {},
  });
  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:8001/api/days`),
      axios.get(`http://localhost:8001/api/appointments`),
      axios.get(`http://localhost:8001/api/interviewers`)
    ])
      .then((all) => {
        const dayData = all[0].data;
        const appointmentData = all[1].data;
        const interviewData = all[2].data;
        setState((state) => ({ ...state, days: dayData, appointments: appointmentData, interviewers: interviewData }));
      })
  }, []);

  const setDay = day => setState({ ...state, day });
  const bookInterview = function (id, interview, mode, err) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        if (mode) {
          const days = state.days.map(day => {
            if (day.appointments.indexOf(id) > -1) {
              day.spots = day.spots - 1;
            }
            return day;
          })
          setState({ ...state, appointments, days });
          err(null);
        }
        setState({ ...state, appointments });
        err(null);
      })
      .catch((error) => err(error))
  }
  function cancelInterview(id, err) {
    console.log('id delete', id);
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`, appointment)
      .then((response) => {
        const days = state.days.map(day => {
          if (day.appointments.indexOf(id) > -1) {
            day.spots = day.spots + 1;
          }
          return day;
        })
        setState({ ...state, appointments, days });
        err(null);
      })
      .catch((error) => err(error))
  }
  return { state, setDay, bookInterview, cancelInterview };

}