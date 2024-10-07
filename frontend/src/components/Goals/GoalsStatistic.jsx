import classes from './Goal.module.css'
export default function GoalsStatistic({ goals }) {
  const goalsInProgress = (goals) => {
    return goals.filter((g) => g.completed < 100).length;
  };
  const goalsCompleted = (goals) => {
    return goals.filter((g) => g.completed === 100).length;
  };
  return (
    <div className={classes['goals-data']}>
      <div className={`${classes['goals-statistic-main-item']}`}>
        <p className={classes['goals-stats-heading']}>Total Goals</p>
        <span>{goals.length}</span>
      </div>
      <div className={`${classes['goals-statistic-item']}`}>
        <p className={classes['goals-stats-heading']}>In Progress</p>
        <span>{goalsInProgress(goals)}</span>
      </div>
      <div className={`${classes['goals-statistic-item']}`}>
        <p className={classes['goals-stats-heading']}>Completed</p>
        <span>{goalsCompleted(goals)}</span>
      </div>
    </div>
  );
}
