/* eslint-disable react/prop-types */
import classes from "./Plan.module.css";
import { useState } from "react";
import CheckInput from "../UI/CheckInput";
import { motion, AnimatePresence } from "framer-motion";
import { useDeleteStepMutation } from "../../features/goalPlan/goalPLanApi";
export default function PlanStep({ p, goalId }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isChecked, setIsChecked] = useState(p.completed);
  const [editArea, setEditArea] = useState("");
  const [deleteStep] = useDeleteStepMutation();
  const [editStep] = useDeleteStepMutation();
  async function deleteSubmit() {
    try {
      await deleteStep({goalId, stepId:p._id}).unwrap()
    } catch (error) {
      console.log(error)
    }
  }

  async function editPlanStep(p) {
    setIsEditing((prev) => !prev);

    if (isEditing) {
      const data = {
        title:editArea,
        actionType:'edit',
        id:p._id
      }
      try {
       await editStep({goalId,data, stepId:p._id}).unwrap(); 
      } catch (error) {
        console.log(error)
      }
    } else {
      setEditArea(p.step);
    }
  }
  async function editStepSatus(e) {
    setIsChecked(e.target.checked);
    const data = {
      completed:e.target.checked,
      actionType:'check',
      id:p._id
    }
    try {
      await editStep({goalId,data, stepId:p._id}).unwrap(); 
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <AnimatePresence>
      <motion.li
        className={classes["plan-item"]}
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
      >
        <form method="patch">
          {!isEditing && (
            <label className={classes["plan-label"]}>
              <CheckInput
                checkHandler={editStepSatus}
                inputName="stepcompleted"
                isChecked={isChecked}
              />
              <span>{p.title}</span>
            </label>
          )}
          {isEditing && (
            <input
              type="text"
              value={editArea}
              name="editStep"
              className={classes.editInput}
              onChange={(e) => setEditArea(e.target.value)}
            />
          )}
          <div className={classes["planStep-btn"]}>
            {" "}
            <button
              type="button"
              onClick={() => editPlanStep(p)}
              className={classes["edit-btn"]}
            >
              {isEditing ? "Save" : <i className="bi bi-pencil"></i>}
            </button>
            <button
              type="button"
              onClick={() => deleteSubmit()}
              className={classes["del-btn"]}
            >
              <i className="bi bi-trash3"></i>
            </button>
          </div>
        </form>
      </motion.li>
    </AnimatePresence>
  );
}
