import classes from './GoalGrid.module.css'
import GridLayout from "../UI/GridLayout";
import Goal from "./Goal";
export default function GoalsGrid({ goals }) {
  console.log(goals);
  return (
    <>
      {!goals.length ? (
        <p className={classes.fallback_message}>There is not anything here</p>
      ) : (
        <div className={classes.grid}>
          {goals.map((goal) => <Goal key={goal._id} goal={goal} />)}
       </div>
      )}
    </>
  );
}
