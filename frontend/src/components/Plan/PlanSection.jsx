/* eslint-disable react/prop-types */
import classes from "./Plan.module.css";

import AddInput from "./AddInput";
import { useAddStepMutation, useGetPlanQuery } from "../../features/goalPlan/goalPLanApi";
import { AnimatePresence, motion } from "framer-motion";
import PlanStep from "./PlanStep";

export default function PlanSection({ goalId }) {
  const { data: plan, isFetching, isError } = useGetPlanQuery(goalId);
  const [addPlanStep] = useAddStepMutation();
  async function handleAddMutation(step){
      try {
        await addPlanStep({goalId, data:step}).unwrap()
      } catch (error) {
        console.log(error)
      }
  }
  if (isFetching) {
    return <p className={classes["loading"]}>Loading...</p>;
  }
  if (isError) {
    return <p>Failed to fetch data</p>;
  }
  return (
    <section className={classes["plan-page"]}>
      <h1>Goal Progress</h1>

      <AddInput addPlanStep={handleAddMutation}/>
      <div className={classes["plan-items"]}>
        {!plan.length && (
          <div>
            <p>There is nothing here yet.</p>{" "}
          </div>
        )}
        <AnimatePresence>
          {plan.length !== 0 && (
            <motion.ul
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ y: -30, opacity: 0 }}
              key="list"
            >
              {plan.map((p) => (
                <PlanStep key={p._id} p={p} />
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
