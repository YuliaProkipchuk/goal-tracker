import { useState } from "react";
import classes from "./ToDoList.module.css";

import AddNewTodoForm from "./AddNewTodoForm";
import TasksLayout from "./TasksLayout";
import DateHeading from "./DateHeading";


// eslint-disable-next-line react/prop-types
export default function ToDoList({ tasks, newDate, setNewDate }) {
  const [addTaskBtnClicked, setAddTaskBtnClicked] = useState(false);
  
  
  return (
    <>
      <div className={classes["toDo-grid"]}>
        <DateHeading newDate={newDate} setNewDate={setNewDate}/>
        {addTaskBtnClicked ? (
          <AddNewTodoForm
            closeForm={() => setAddTaskBtnClicked(false)}
            newDate={newDate}
          />
        ) : (
          <button
            className={classes["add-btn"]}
            onClick={() => setAddTaskBtnClicked(true)}
          >
            + Add task
          </button>
        )}

        {tasks ? (
         <TasksLayout tasks={tasks} newDate={newDate}/>
        ) : (
          <p>Nothing is here</p>
        )}
      </div>
    </>
  );
}
