/* eslint-disable react/prop-types */
import classes from "./Plan.module.css";

import AddInput from "./AddInput";
import {
  useAddStepMutation,
  useGetPlanQuery,
  useMutateStepMutation,
} from "../../features/goalPlan/goalPLanApi";
import PlanStep from "./PlanStep";
import { DndContext } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import Draggable from "../UI/Draggable";
import Droppable from "../UI/Droppable";
const COLUMNS = [
  {
    id: "to do",
    title: "To Do",
  },
  {
    id: "in progress",
    title: "In Progress",
  },
  {
    id: "completed",
    title: "Completed",
  },
];

export default function PlanSection({ goalId }) {
  const { data: plan, isFetching, isError } = useGetPlanQuery(goalId);
  console.log("plan: ", plan);
  const [addPlanStep] = useAddStepMutation();
  const [changeStatus] = useMutateStepMutation();
  const [tasks, setTasks] = useState([]);
  function handleDragEnd(event) {
    const { over, active } = event;
    if (!over) return;
    const task = tasks.find(t=>t._id===active.id);
    if(task.status!==over.id){
      try {
        changeStatus({ goalId, status: over.id, stepId: active.id }).unwrap();
      } catch (error) {
        console.log(error);
      }
      setTasks(() =>
        tasks.map((task) => {
          if (task._id === active.id) {
            return {
              ...task,
              status: over.id,
            };
          }
          return task;
        })
      );
    }
    
  }
  async function handleAddMutation(step) {
    try {
      await addPlanStep({ goalId, data: step }).unwrap();
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (plan) setTasks(plan);
  }, [plan]);
  if (isFetching) {
    return <p className={classes["loading"]}>Loading...</p>;
  }
  if (isError) {
    return <p>Failed to fetch data</p>;
  }

  return (
    <section className={classes["plan-page"]}>
      <h3 className={classes['plan-page-heading']}>Goal Progress</h3>
      <AddInput addPlanStep={handleAddMutation} />
      <DndContext onDragEnd={handleDragEnd}>
        <section className={classes["kanban"]}>
          {COLUMNS.map((column) => (
            <div
              className={classes["kanban-section"]}
              key={`kanban-${column.id}`}
            >
              <h3>{column.title}</h3>
              <Droppable key={column.id} id={column.id}>
                {tasks
                  .filter((task) => task.status === column.id)
                  .map((task) => (
                    <Draggable id={task._id} key={task._id}>
                      <PlanStep subtask={task} />
                    </Draggable>
                  ))}
              </Droppable>
            </div>
          ))}
        </section>
      </DndContext>
      {/* <div className={classes["plan-items"]}>
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
      </div> */}
    </section>
  );
}
