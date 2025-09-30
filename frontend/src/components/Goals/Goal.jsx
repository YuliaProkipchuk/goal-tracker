/* eslint-disable react/prop-types */
import { Link, useSubmit } from "react-router-dom";
import PseudoImg from "../UI/PseudoImg";
import classes from "./Goal.module.css";
import { useState } from "react";
export default function Goal({ goal }) {
  const date = new Date(goal.createdAt);
  const submit = useSubmit();
  const [openMenu, setOpenMenu] = useState(false);

  function submitDelete(id) {
    const formData = new FormData();
    formData.append("id", id);
    submit(formData, { method: "delete" });
  }
  return (
    <div className={classes.goal_wrapper}>
      <button
        type="button"
        className={classes.more_btn}
        onClick={() => setOpenMenu((prev) => !prev)}
        onBlur={() => setOpenMenu((prev) => !prev)}
      >
        <i className="bi bi-three-dots"></i>
      </button>
      {openMenu && (
        <div
          className={classes.drop_menu}
          onClick={() => submitDelete(goal._id)}
        >
          Delete Goal
        </div>
      )}

      <Link to={`/goals/${goal._id}`}>
        <div className={classes.goal}>
          <PseudoImg type={goal.type}/>
          <div className={classes.goal_info}>
            {" "}
            <h3>{goal.name}</h3>
            <hr />
            <span>{`${date.getDate()}.${
              date.getMonth() + 1
            }.${date.getFullYear()}`}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
