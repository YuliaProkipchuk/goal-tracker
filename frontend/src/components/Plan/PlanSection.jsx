/* eslint-disable react/prop-types */
import classes from "./Plan.module.css";

import AddInput from "./AddInput";
import {
  useAddStepMutation,
  useGetPlanQuery,
} from "../../features/goalPlan/goalPLanApi";
import PlanStep from "./PlanStep";
import { DndContext } from "@dnd-kit/core";
import { useState } from "react";
import Draggable from "../UI/Draggable";
import Droppable from "../UI/Droppable";
const COLUMNS = [
  {
    id: "not started",
    title: "Not Started",
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
const TASKS = [
  {
    id: "1",
    title: "step1",
    status: "not started",
  },
  {
    id: "2",
    title: "step2",
    status: "not started",
  },
  {
    id: "3",
    title: "step3",
    status: "not started",
  },
  {
    id: "4",
    title: "step4",
    status: "in progress",
  },
  {
    id: "5",
    title: "step5",
    status: "in progress",
  },
];
export default function PlanSection({ goalId }) {
  const { data: plan, isFetching, isError } = useGetPlanQuery(goalId);
  console.log('plan: ', plan)
  const [addPlanStep] = useAddStepMutation();
  const [tasks, setTasks] = useState(TASKS);
  function handleDragEnd(event) {
    const { over, active } = event;
    if (!over) return;

    setTasks(() =>
      tasks.map((task) => {
        if (task.id === active.id) {
          return {
            ...task,
            status: over.id,
          };
        }
        return task;
      })
    );
  }
  async function handleAddMutation(step) {
    try {
      await addPlanStep({ goalId, data: step }).unwrap();
    } catch (error) {
      console.log(error);
    }
  }
  // if (isFetching) {
  //   return <p className={classes["loading"]}>Loading...</p>;
  // }
  // if (isError) {
  //   return <p>Failed to fetch data</p>;
  // }
  return (
    <section className={classes["plan-page"]}>
      <h1>Goal Progress</h1>
      <AddInput addPlanStep={handleAddMutation} />
      <DndContext onDragEnd={handleDragEnd}>
        <section className={classes["kanban"]}>
          {COLUMNS.map((column) => (
            <div
              className={classes["kanban-section"]}
              key={`kanban-${column.id}`}
            >
              <h3>{column.title}</h3>
              <Droppable id={column.id}>
                {/* {tasks.map((task) => {
                  if (task.status === column.id) {
                    return (
                      <Draggable id={task.id} key={task.id}>
                        <PlanStep />
                      </Draggable>
                    );
                  }
                  return null;
                })} */}
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
