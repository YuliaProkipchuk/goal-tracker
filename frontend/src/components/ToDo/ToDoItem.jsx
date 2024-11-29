import { useContext, useRef, useState } from "react";
import classes from "./ToDoList.module.css";
import { motion } from "framer-motion";
import { useSubmit } from "react-router-dom";
import { TodoDateContext } from "../../pages/ToDo";
import CheckInput from "../UI/CheckInput";

export default function ToDoItem({ children, taskId, checked }) {
  const [isChecked, setIsChecked] = useState(checked);
  const [isDoubleClick, setIsDoubleClick] = useState(false);
  const [editText, setEditText] = useState(children);
  const { currTodo } = useContext(TodoDateContext);
  const timeout = useRef(null);
  const submit = useSubmit();
  

  function handleChange() {
  
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
 
    timeout.current = setTimeout(() => {
      setIsDoubleClick(false);
      setIsChecked((prev) => !prev);
      const formData = new FormData();
      formData.append("isCompleted", !isChecked);
      formData.append("date", currTodo);
      formData.append("taskId", taskId);
      formData.append("actionType", "check");

      submit(formData, { method: "patch" });
    }, 500); 
  }

  function handleDoubleClick() {
    clearTimeout(timeout.current);

    setIsDoubleClick(true);

  }
  function handleLoseFocus() {
    setIsDoubleClick(false);
   
    const formData = new FormData();
    formData.append("name", editText);
    if (editText !== undefined && editText.trim() === "") {
      formData.append("actionType", 'delete');
      formData.append("date", currTodo);
      formData.append("taskId", taskId);
      submit(formData, { method: "delete" });
    }
    else if(editText){
      formData.append("actionType", 'edit');
      formData.append("date", currTodo);
      formData.append("taskId", taskId);
      submit(formData, { method: "patch" });
    }
  }

  return (
    <motion.li
      className={classes.todo_item}
      animate={{
        textDecoration: `${
          isChecked && !isDoubleClick ? "line-through" : "none"
        }`,
      }}
    >
      <label className={classes.todo_label} onDoubleClick={handleDoubleClick}>
        {/* <input
          type="checkbox"
          onChange={handleChange}
          className={classes.checkbox}
          checked={isChecked}
        />
        <div className={classes.custom_checkbox}></div> */}
        <CheckInput checkHandler={handleChange} isChecked={isChecked} className="round"/>

        {!isDoubleClick ? (
          <span>{children}</span>
        ) : (
          <input
            value={editText}
            onBlur={handleLoseFocus}
            onChange={(e) => {
              setEditText(e.target.value);
            }}
            className={`${classes.input} ${classes.editInput}`}
          />
        )}
      </label>
    </motion.li>
  );
}

export async function editTask(token, todoId, taskId, obj) {
  await fetch(`http://localhost:8080/todo/${todoId}/${taskId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(obj),
  });
}

export async function deleteTask(token, todoId, taskId, obj) {
  await fetch(`http://localhost:8080/todo/${todoId}/${taskId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(obj),
  });
}
