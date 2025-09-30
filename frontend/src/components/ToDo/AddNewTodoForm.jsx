/* eslint-disable react/prop-types */

import classes from "./ToDoList.module.css";
import { useSelector } from "react-redux";
import { selectAllGoalsIds } from "../../features/goals/goalSlice";
import { useState } from "react";
import { useCreateTodoMutation } from "../../features/todos/todoApiSlice";

export default function AddNewTodoForm({ closeForm, newDate }) {
  const goalsId = useSelector(selectAllGoalsIds);
  const [goalRelatedToTask, setGoalRelatedToTask] = useState({
    id: "",
    name: "",
  });
  const [newTask, setNewTask] = useState("");
  const [mutation] = useCreateTodoMutation();

  function handleChangeTask(task) {
    setNewTask(task);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const data = {
      name: newTask,
      goal: goalRelatedToTask,
      actionType: "add",
    };
    const date = {
      year: newDate.getFullYear(),
      month: newDate.getMonth() + 1,
      day: newDate.getDate(),
    };

    mutation({ todo: data, date });
    closeForm();
  }

  return (
    <form method="patch">
      <input
        placeholder="name"
        name="name"
        onChange={(e) => handleChangeTask(e.target.value)}
        className={`${classes.input} ${classes.addInput}`}
      />
      <select
        name="goals"
        id="goals"
        onChange={(e) => setGoalRelatedToTask(e.target.value)}
      >
        <option value={{ id: null, name: "" }}>none</option>
        {goalsId.map((goal) => (
          <option key={goal.id} value={{ id: goal.id, name: goal.name }}>
            {goal.name}
          </option>
        ))}
      </select>
      <button
        onClick={() => handleSubmit(event)}
        className={`${classes.btn} ${classes.saveBtn}`}
      >
        Save
      </button>

      <button
        className={`${classes.btn} ${classes.cancelBtn}`}
        onClick={closeForm}
      >
        Cancel
      </button>
    </form>
  );
}
