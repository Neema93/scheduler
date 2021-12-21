import React from "react";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import "components/Appointment/styles.scss"
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
// set mode
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";
export default function Appointment(props) {
  //get data from useVisualMode hook
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  // save and edit function
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    if (mode === CREATE) {
      transition(SAVING);
      props.bookInterview(props.id, interview, CREATE, (err) => {
        if (!err) {
          transition(SHOW);
          return;
        }
        transition(ERROR_SAVE, true);
      })
    } else {
      transition(SAVING);
      props.bookInterview(props.id, interview,(err) => {
        if (!err) {
          transition(SHOW);
          return;
        }
        transition(ERROR_SAVE, true);
      })
    }
  }
  // delete function
  function deleting() {
    transition(DELETING, true);
    props.cancelInterview(props.id, (err) => {
      if (!err) {
        transition(SHOW);
        return;
      }
      transition(ERROR_DELETE, true);
    })
  }
  // change mode when create somthing
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === CREATE && <Form interviewers={props.interviewers} onSave={save} onCancel={() => back(EMPTY)} />}
      {mode === EDIT && <Form interviewers={props.interviewers} student={props.interview.student} interviewer={props.interview.interviewer.id} onSave={save} onCancel={() => back(EMPTY)} />}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === DELETING && <Status message={"deleting"} />}
      {mode === CONFIRM && <Confirm message={"Are you Sure Deleting interview?"} onCancel={() => back(SHOW)} onConfirm={deleting} />}
      {mode === ERROR_SAVE && <Error message={"you are not able to save"} onClose={back} />}
      {mode === ERROR_DELETE && <Error message={"you are not able to delete"} onClose={back} />}
    </article>
  );
}