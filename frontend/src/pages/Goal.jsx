import { useRouteLoaderData } from "react-router-dom";
import classes from "../components/Goals/Goal.module.css";
export default function GoalPage() {
  const goal = useRouteLoaderData("goal");
  console.log(goal);
  const date = new Date(goal.create_date);

  return (
    <>
      <section className={classes["goal-details"]}>
        <div className={classes["goal-data"]}>
          <div className={classes["goal-info"]}>
            <h1>{goal.name}</h1>
            <span>{`${date.getDate()}.${
              date.getMonth() + 1
            }.${date.getFullYear()}`}</span>
            <p className={classes["goal-description"]}>{goal.description}</p>
          </div>
          <div
            className={classes["progress-pie"]}
            style={{ "--progress": `${goal.completed}%` }}
          >
            <p>{goal.completed.toFixed(1)}%</p>
          </div>
          <div className={classes['progress']}>
            Progress
            <div className={classes["progress-bar"]}>
              <div
                className={classes["bar"]}
                style={{ "--progress": `${goal.completed}%` }}
              ></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
