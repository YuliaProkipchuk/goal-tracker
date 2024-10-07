import classes from './Plan.module.css';
export default function AddInput() {
  return (
    <div className={classes.addStep_form}>
      <input placeholder="name" name="step" className={classes.add_input}/>
      <button className={`${classes.btn} ${classes.addBtn}`}>Add</button>

      <button type="button" className={`${classes.btn} ${classes.resetBtn}`}>Reset</button>
    </div>
  );
}
