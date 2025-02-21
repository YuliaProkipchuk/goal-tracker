/* eslint-disable react/prop-types */

import ToDoItem from './ToDoItem'
import classes from "./ToDoList.module.css";

export default function TasksLayout({ tasks,newDate }) {
    console.log('ssss', tasks)
  return (
    <ul className={classes.toDoList}>
      {tasks.map((task) => (
              <ToDoItem
                key={task._id}
               task={task}
               newDate={newDate}
              />

            ))}
    </ul>
  );
}
