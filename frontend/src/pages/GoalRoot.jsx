import { Outlet} from "react-router-dom";
import classes from '../components/Goals/Goal.module.css'
export default function GoalRoot() {

  return (
    <main className={classes["goal-main"]}>
     <Outlet/>
    </main>
  );
}
