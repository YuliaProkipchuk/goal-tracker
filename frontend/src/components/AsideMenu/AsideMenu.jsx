import { Link, useNavigate} from "react-router-dom";
import classes from "./AsideMenu.module.css";
import { useState } from "react";
export default function AsideMenu() {
  const navigate = useNavigate();
  const [burgerClass, setBurgerClass] = useState(false)
  return (
    <>
      <aside className={burgerClass?classes.burger_aside:undefined}>
      <i className="bi bi-list" onClick={()=>setBurgerClass(prev=>!prev)}></i>
        <ul className={burgerClass?classes.burger_menu:undefined}>
          <li>
            <i className="bi bi-box-arrow-left"></i>{" "}
            <span className={classes.menu_text} onClick={() => navigate("..")}>
              Back
            </span>
          </li>
        
          <Link to={`/todo`}>
            <li>
              {" "}
              <i className="bi bi-card-checklist"></i>{" "}
              <span className={classes.menu_text}>To Do</span>
            </li>
          </Link>
          <Link to={"plan"}>
            <li>
              {" "}
              <i className="bi bi-journal-check"></i>{" "}
              <span className={classes.menu_text}>Plan</span>
            </li>
          </Link>
          <Link to={"/notes"}>
            <li>
              <i className="bi bi-journal-richtext"></i>{" "}
              <span className={classes.menu_text}>Notes</span>
            </li>
          </Link>
        </ul>
      </aside>
    </>
  );
}
