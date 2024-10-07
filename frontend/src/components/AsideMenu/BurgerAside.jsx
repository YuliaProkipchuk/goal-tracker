import { useNavigate, useRouteLoaderData } from "react-router-dom";

export default function BurgerAside() {
  const data = useRouteLoaderData("user");
  const navigate = useNavigate();
  return (
    <>
      <aside>
        <i className="bi bi-list"></i>
        <ul className={classes.burger_menu}>
          {/* <Link to={'.'}> */}
          <li>
            <i className="bi bi-box-arrow-left"></i>{" "}
            <span className={classes.menu_text} onClick={() => navigate("..")}>
              Back
            </span>
          </li>
          {/* </Link> */}
          <Link to={`../todo/${data.user.todos._id}`}>
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
          <Link to={"notes"}>
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
