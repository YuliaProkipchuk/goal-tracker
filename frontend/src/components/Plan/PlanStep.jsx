import classes from "./Plan.module.css";
import { useState } from "react";
import { Form, useSubmit } from "react-router-dom";
import CheckInput from "../UI/CheckInput";
import { motion, AnimatePresence } from "framer-motion";
export default function PlanStep({ p }) {
  const submit = useSubmit();
  const [isEditing, setIsEditing] = useState(false);
  const [isChecked, setIsChecked] = useState(p.status);
  console.log(p);
  const [editArea, setEditArea] = useState("");
  function deleteSubmit(id) {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("actionType", "delete");
    submit(formData, { method: "delete" });
  }
  function editPlanStep(p) {
    setIsEditing((prev) => !prev);

    if (isEditing) {
      //'cause there state doesn't update immediatly, so it's kinda doing the opposite
      console.log("save", isEditing);
      const formData = new FormData();
      formData.append("id", p._id);
      formData.append("actionType", "edit");
      formData.append("editStep", editArea);
      submit(formData, { method: "patch" });
    } else {
      console.log("edit", p.step);
      setEditArea(p.step);
    }
  }
  function editStepSatus(e) {
    console.log(p._id, e.target.checked);
    setIsChecked(e.target.checked);
    const formData = new FormData();
    formData.append("id", p._id);
    formData.append("actionType", "check");
    formData.append("status", e.target.checked);
    submit(formData, { method: "patch" });
  }
  return (
    <AnimatePresence>
      <motion.li
        className={classes["plan-item"]}
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
      >
        <Form method="patch">
          {!isEditing && (
            <label className={classes["plan-label"]}>
              {/* <input
              type="checkbox"
              name="stepStatus"
              id="step"
              onChange={editStepSatus}
            /> */}
              <CheckInput
                checkHandler={editStepSatus}
                inputName="stepStatus"
                isChecked={isChecked}
              />
              <span>{p.step}</span>
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
              onClick={() => deleteSubmit(p._id)}
              className={classes["del-btn"]}
            >
              <i className="bi bi-trash3"></i>
            </button>
          </div>
        </Form>
      </motion.li>
    </AnimatePresence>
  );
}
