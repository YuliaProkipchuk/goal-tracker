/* eslint-disable react/prop-types */
import { useState } from "react";
import classes from "./Plan.module.css";
export default function AddInput({ addPlanStep }) {
  const [step, setStep] = useState({
    title: "",
    description: "",
    status: "to do",
    completed: false,
    priority: 1,
  });
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await addPlanStep(step).unwrap();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form method="post" onSubmit={handleSubmit}>
      <div className={classes.addStep_form}>
        <input
          placeholder="title"
          name="title"
          className={classes.add_input}
          onChange={(e) => {
            setStep((prev) => ({
              ...prev,
              title: e.target.value,
            }));
          }}
        />
      </div>
      <div className={classes.addStep_form}>
        <textarea
          placeholder="description"
          name="description"
          className={classes.add_input}
          onChange={(e) => {
            setStep((prev) => ({
              ...prev,
              description: e.target.value,
            }));
          }}
        ></textarea>
      </div>
      <button className={`${classes.btn} ${classes.addBtn}`}>Add</button>

      <button type="reset" className={`${classes.btn} ${classes.resetBtn}`}>
        Reset
      </button>
    </form>
  );
}
