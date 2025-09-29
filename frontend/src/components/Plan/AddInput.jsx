/* eslint-disable react/prop-types */
import { useState } from "react";
import classes from "./Plan.module.css";
export default function AddInput({addPlanStep}) {
  const [step, setStep] = useState('');
  async function handleSubmit(e){
    e.preventDefault();
    try {
      await addPlanStep(step)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <form method="post" onSubmit={handleSubmit}>
      <div className={classes.addStep_form}>
        <input placeholder="name" name="step" className={classes.add_input} onChange={(e)=>setStep(e.target.value)}/>
        <button className={`${classes.btn} ${classes.addBtn}`}>Add</button>

        <button type="reset" className={`${classes.btn} ${classes.resetBtn}`}>
          Reset
        </button>
      </div>
    </form>
  );
}
