import { useEffect, useRef, useState } from "react";
import {
  Form,
  useActionData,
  useRouteLoaderData,
  useSubmit,
} from "react-router-dom";
import PlanStep from "../components/Plan/PlanStep";
import AddInput from "../components/Plan/AddInput";
import { motion, AnimatePresence } from "framer-motion";
import classes from '../components/Plan/Plan.module.css';
export default function PlanPage() {
  const r = useRef(null);
  const plan = useRouteLoaderData("goal")?.plan;
  console.log(plan);
  const actionData = useActionData();

  useEffect(() => {
    if (actionData?.success) {
      r.current.reset();
    }
  }, [actionData]);

  return (
    <section className={classes["plan-page"]}>
      <h1>Goal Progress</h1>
      <Form method="post" ref={r}>
        <AddInput />
      </Form>
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
export async function action({ request, params }) {
  const { goalId } = params;
  const url = `http://localhost:8080/goals/${goalId}/plan`;
  console.log("id ", goalId);

  const token = localStorage.getItem("token");
  try {
    const formData = await request.formData();
    const stepId = formData.get("id");

    const actionType = formData.get("actionType");
    if (actionType === "delete") {
      console.log("wwrwrwrewe");

      const response = await fetch(`${url}/${stepId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return { success: true };
    } else if (actionType === "edit") {
      console.log(formData.get("editStep"));
      const item = {
        step: formData.get("editStep"),
        actionType,
      };
      const response = await fetch(`${url}/${stepId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(item),
      });
      return { success: true };
    } else if (actionType === "check") {
      const item = {
        status: formData.get("status"),
        actionType,
      };
      const response = await fetch(`${url}/${stepId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(item),
      });
      return { success: true };
    } else {
      const item = {
        step: formData.get("step"),
        status: false,
      };
      console.log(item);
      const response = await fetch(`${url}/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(item),
      });
      // const data = await response.json();
      // console.log(data);
      console.log("Returning from action:", { success: true });
    }
    return { success: true };
  } catch (err) {
    console.log(err);
    return null;
  }
}
