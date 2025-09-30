/* eslint-disable react/prop-types */
import classes from './GoalGrid.module.css'
import GridLayout from "../UI/GridLayout";
import Goal from "./Goal";
export default function GoalsGrid({ goals }) {
  return (
    <>
      {!goals.length ? (
        <div className={classes.fallback}>
          <p className={classes.fallback_message}>There is not anything here</p>
        </div>
        
      ) : (
        <div className={classes.grid}>
          {goals.map((goal) => <Goal key={goal._id} goal={goal} />)}
       </div>
      )}
    </>
  );
}
