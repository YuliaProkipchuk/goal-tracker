/* eslint-disable react/prop-types */

import { useRef, useState } from "react";
import classes from "./ToDoList.module.css";
import { motion } from "framer-motion";
import CheckInput from "../UI/CheckInput";
import { useDeleteTaskMutation, useEditTodoMutation } from "../../features/todos/todoApiSlice";

export default function ToDoItem({ task, newDate }) {
  const [isChecked, setIsChecked] = useState(task.isCompleted);
  const [isDoubleClick, setIsDoubleClick] = useState(false);
  const [editText, setEditText] = useState(task.title);
  const timeout = useRef(null);
  const [editTask] = useEditTodoMutation();
  const [deleteTask] = useDeleteTaskMutation();
  function handleChange() {
  
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
 
    timeout.current = setTimeout(() => {
      setIsDoubleClick(false);
      setIsChecked((prev) => !prev);
      const data={
        taskId:task._id,
        isCompleted:!isChecked,
        actionType:'check'
      }
      const date = {
        year: newDate.getFullYear(),
        month: newDate.getMonth() + 1,
        day: newDate.getDate(),
      };
      editTask({todo:data, date})
    
    }, 500); 
  }

  function handleDoubleClick() {
    clearTimeout(timeout.current);

    setIsDoubleClick(true);

  }
  function handleLoseFocus() {
    setIsDoubleClick(false);
    const date = {
      year: newDate.getFullYear(),
      month: newDate.getMonth() + 1,
      day: newDate.getDate(),
    };
    const data={
      taskId:task._id,
      name:editText
    }
    const formData = new FormData();
    formData.append("name", editText);
    if (editText !== undefined && editText.trim() === "") {
      data.actionType='delete'
      deleteTask({taskId:task._id, date});

    }
    else if(editText){
      data.actionType='edit'
      editTask({todo:data, date});
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
      
        <CheckInput checkHandler={handleChange} isChecked={isChecked} className="round"/>

        {!isDoubleClick ? (
          <span>{task.title}</span>
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


