import { useContext, useEffect, useRef, useState } from "react";
import classes from "./ToDoList.module.css";
import {
  Form,
  json,
  redirect,
  useLoaderData,
  useSubmit,
} from "react-router-dom";
import ToDoItem, { deleteTask, editTask } from "./ToDoItem";
import { motion } from "framer-motion";
import { TodoDateContext } from "../../pages/ToDo";
const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function ToDoList() {
  const { todo } = useLoaderData();
  console.log('todo',todo)
  const [addTaskBtnClicked, setAddTaskBtnClicked] = useState(false);
  const [tasks, setTasks] = useState(null);
  const { currTodo, setCurrToDo } = useContext(TodoDateContext);
  const [pickDate, setPickDate] = useState(false);
  const currentDate = useRef();
  const taskName = useRef(null);
  const datePicker = useRef(null);
  const submit = useSubmit();
  useEffect(() => {
    console.log("kkk");
    const ind = todo.todo.findIndex(
      (t) => new Date(t.date).toDateString() === currTodo.toDateString()
    );
    if (ind !== -1) {
      console.log(todo)
      setTasks(todo.todo[ind].tasks.length > 0 ? todo.todo[ind].tasks : null);
      console.log(todo.todo[ind].tasks);
    } else {
      setTasks(null);
    }
  }, [currTodo, todo]);

  function showCalendar() {
    setPickDate((prev) => !prev);
    datePicker.current.click()
  }
  function handlePickDate(event) {
    setCurrToDo(new Date(event.target.value));
  }
  function getFullDate(date) {
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} `;
  }
  function handleSubmit(event) {
    event.preventDefault();

    const [day, month, year] = currentDate.current.innerText.split(".");
    const date = new Date(year, month - 1, day);

    const formData = new FormData();
    formData.append("date", date);
    formData.append("name", taskName.current.value);
    formData.append("actionType", "add");

    submit(formData, { method: "post" });
    setAddTaskBtnClicked(false);
  }
  return (
    <>
      <div className={classes["toDo-grid"]}>
        <h2>{DAYS[currTodo.getDay()]}</h2>
        <h2 className={classes.date}>
          <span ref={currentDate}>{getFullDate(currTodo)}</span>
          <motion.span
            className={classes["date-icon"]}
            onClick={showCalendar}
            animate={pickDate ? { rotate: "180deg" } : { rotate: "0deg" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-caret-down-fill"
              viewBox="0 0 16 16"
            >
              <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
            </svg>
          </motion.span>
          {pickDate && (
            <input type="date" onChange={handlePickDate} className={classes.datePicker} ref={datePicker}/>
          )}
        </h2>
        {addTaskBtnClicked ? (
          <Form method="patch">
            <input ref={taskName} placeholder="name" name="name" className={`${classes.input} ${classes.addInput}`}/>
            <button
              onClick={() => handleSubmit(event)}
              className={`${classes.btn} ${classes.saveBtn}`}
            >
              Save
            </button>

            <button
            className={`${classes.btn} ${classes.cancelBtn}`}
              onClick={() => {
                setAddTaskBtnClicked(false);
              }}
            >
              Cancel
            </button>
          </Form>
        ) : (
          <button
            className={classes["add-btn"]}
            onClick={() => setAddTaskBtnClicked(true)}
          >
            + Add task
          </button>
        )}

        {tasks ? (
          <ul className={classes.toDoList}>
            {tasks.map((task) => (
              <ToDoItem
                key={task._id}
                taskId={task._id}
                checked={task.isComplete}
              >
                {task.name}
              </ToDoItem>
            ))}
          </ul>
        ) : (
          <p>Nothing is here</p>
        )}
      </div>
    </>
  );
}
export async function action({ params, request }) {
  const token = localStorage.getItem("token");
  const formData = await request.formData();
  const id = params.todoId;
  const actionType = formData.get("actionType");
  console.log(actionType);
  let response;
  if (actionType === "add") {
    console.log(formData.get("date"));
    
    response = await fetch(`http://localhost:8080/todo/${id}/new`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        date: formData.get("date"),
        name: formData.get("name"),
        isComplete: false,
      }),
    });
  }
  if (actionType === "check") {
    const taskId = formData.get("taskId");
    const obj = {
      isComplete: formData.get("isCompleted"),
      date: formData.get("date"),
      actionType: actionType,
    };
    response = await editTask(token, id, taskId, obj);
  }
  if (actionType === "edit") {
    console.log("yey edit");
    const taskId = formData.get("taskId");
    const obj = {
      name: formData.get("name"),
      date: formData.get("date"),
      actionType: actionType,
    };
    response = await editTask(token, id, taskId, obj);
  }
  if (actionType === "delete") {
    console.log("yey delete");
    const taskId = formData.get("taskId");
    response = await deleteTask(token, id, taskId, {
      date: formData.get("date"),
    });
  }
  // if (!response?.ok) {
  //   console.log(response);

  //   throw json({ message: "Failed" }, { status: 500 });
  // }
  return null;
}
