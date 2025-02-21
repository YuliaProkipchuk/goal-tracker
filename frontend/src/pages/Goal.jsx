import { useParams } from "react-router-dom";
import classes from "../components/Goals/Goal.module.css";
import { useGetGoalByIdQuery } from "../features/goals/goalApiSlice";
import PlanSection from "../components/Plan/PlanSection";
export default function GoalPage() {
  const { goalId } = useParams();

  const { data, isLoading, isError, error } = useGetGoalByIdQuery(goalId);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    console.log(error);

    return <p>{error.data.message}</p>;
  }
  const { goal } = data;
  console.log(goal, goal.completed.toFixed(1));
  const date = new Date(goal.createdAt);

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
          <div className={classes["progress"]}>
            Progress
            <div className={classes["progress-bar"]}>
              <div
                className={classes["bar"]}
                style={{ "--progress": `${goal.completed}%` }}
              ></div>
            </div>
          </div>
        </div>

        <PlanSection goalId={goalId}/>
      </section>
    </>
  );
}
