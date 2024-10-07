import { Form, redirect } from "react-router-dom";
import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import classes from "./Modal.module.css";
import RadioBtn from "./RadioBtn";
export default function Modal({ openModal, closeModal }) {
  const ref = useRef();
  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current.close();
    }
  }, [openModal]);
  return (
    <>
      {createPortal(
        <dialog ref={ref} onClose={closeModal} onCancel={closeModal} className={classes.newGoal_modal}>
          <h1 className={classes.title}>Create a new Goal!</h1>
          <Form method="post" action="/newGoal" onSubmit={closeModal}>
            <div className={classes.input_box}>
              <input type="text" name="name" id="name" placeholder=" " />
              <label htmlFor="name">Name</label>
            </div>
            <div className={classes.input_box}>
              <textarea
                name="description"
                id="description"
                placeholder=" "
              ></textarea>
              <label htmlFor="description">Description</label>
            </div>
            <p>Type</p>
            <div className={classes.radio_input}>
              <RadioBtn name='type' id='education'/>
              <RadioBtn name='type' id='health'/>
              <RadioBtn name='type' id='sport'/>
              <RadioBtn name='type' id='travel'/>
              <RadioBtn name='type' id='career'/>
              <RadioBtn name='type' id='other'/>
            </div>
            <div className={classes.div_btn}>
              <button
                className={classes.cancel_btn}
                type="button"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button className={classes.add_btn}>Add</button>
            </div>
          </Form>
        </dialog>,
        document.getElementById("dialog")
      )}
    </>
  );
}
export async function action({ request }) {
  const token = localStorage.getItem("token");
  try {
    const formData = await request.formData();
    const goal = {
      name: formData.get("name"),
      description: formData.get("description"),
      type: formData.get("type"),
      create_date: new Date(),
    };
    console.log(goal);
    const response = await fetch("http://localhost:8080/goals/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(goal),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
  return redirect("/");
}
