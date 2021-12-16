export function getAppointmentsForDay(state, dayName) {
  //... returns an array of appointments for that day
  let newArr = [];
  let id ;
  for (let day of state.days) {
    if (day.name === dayName) {
         id = day.appointments;
      }
    }
    if(id) {
   for (let appointment in state.appointments) {
      if (id.includes(state.appointments[appointment].id)) {
        newArr.push(state.appointments[appointment]);
      }
    }
    return newArr;
  }
  return newArr;
}
export function getInterviewersForDay(state, dayName) {
  let newArr = [];
  let id;
  for (let day of state.days) {
    if (day.name === dayName) {
      id = (day.interviewers);
    }
  }
  if (id) {
    for (let interviewer in state.interviewers) {
      if (id.includes(state.interviewers[interviewer].id)) {
        newArr.push(state.interviewers[interviewer]);
      }
    }
    return newArr;
  }
  return newArr;
}
 
export function getInterview(state, interview) {
  
  let interviewObj = {};
  for (const data in state.interviewers) {
    
    if (interview && state.interviewers[data].id === interview.interviewer) {
      
      interviewObj["student"] = interview.student;
      interviewObj["interviewer"] = state.interviewers[data];
      
      return interviewObj
    }
  }
  return null;
}

