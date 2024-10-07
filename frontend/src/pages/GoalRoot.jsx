import { Link, Outlet, useLoaderData, useParams } from "react-router-dom";
import AsideMenu from "../components/AsideMenu/AsideMenu";
import Clock from "../components/Clock/Clock";
import classes from '../components/Goals/Goal.module.css'
export default function GoalRoot() {
  return (
    <main className={classes["goal-main"]}>
     <AsideMenu/>
     <Outlet/>
     <Clock/>
    </main>
  );
}
export async function loader({params}){
  const token = localStorage.getItem('token');
  const id = params.goalId;
  console.log(id);
  const response = await fetch(
    `http://localhost:8080/goals/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
    
}