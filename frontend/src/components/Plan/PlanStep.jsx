/* eslint-disable react/prop-types */
import classes from "./Plan.module.css";
import { useDeleteStepMutation } from "../../features/goalPlan/goalPLanApi";
import { useParams } from "react-router-dom";
const COLORS = ['blue','green','yellow','orange','red'];

export default function PlanStep({ subtask }) {

  const [deleteStep] = useDeleteStepMutation();
  const {goalId}  = useParams()
  async function deleteSubmit() {
    try {
      await deleteStep({goalId, stepId:subtask._id}).unwrap()
    } catch (error) {
      console.log(error)
    }
  }

  
  return (
    <div className={`${classes[`draggable-plan-step`]} ${classes[`${COLORS[subtask.priority-1]}`]}`}>
      <h5>{subtask.title}</h5>
      <p>{subtask.description}</p>
      <span>{subtask.priority}</span>
      <button type="button" onClick={(e)=>{ e.stopPropagation(); console.log('del')}}>Delete</button>
      <input type="checkbox" />
    </div>
   
  );
}
