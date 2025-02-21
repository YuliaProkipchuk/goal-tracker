import { Link, useNavigate } from "react-router-dom";
import classes from "./AsideMenu.module.css";

export default function BurgerAside() {
  const navigate = useNavigate();
  return (
    <>
      <aside>
        <i className="bi bi-list"></i>
        <ul className={classes.burger_menu}>
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
