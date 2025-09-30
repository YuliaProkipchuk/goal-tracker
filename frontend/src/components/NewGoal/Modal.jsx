/* eslint-disable react/prop-types */
import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import classes from "./Modal.module.css";
import RadioBtn from "./RadioBtn";
import { useAddGoalMutation } from "../../features/goals/goalApiSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addGoalSchema } from "../../types/addGoalSchema";
export default function Modal({ openModal, closeModal }) {
  const ref = useRef();
  const [addGoal] = useAddGoalMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addGoalSchema),
  });

  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current.close();
    }
  }, [openModal]);
  async function onSubmit(formData) {
    try {
      await addGoal(formData).unwrap();
      closeModal();
    } catch (error) {
      console.log(error);
    }
  }
  const formatDate = (date) => {
    const month =
      date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
    const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
    return `${date.getFullYear()}-${month}-${day}`;
  };
  return (
    <>
      {createPortal(
        <dialog
          ref={ref}
          onClose={closeModal}
          onCancel={closeModal}
          className={classes.newGoal_modal}
        >
          <h1 className={classes.title}>Create a new Goal!</h1>

          <form method="post" onSubmit={handleSubmit(onSubmit)}>
            <div className={classes.input_box}>
              <input
                type="text"
                {...register("name")}
                id="name"
                placeholder=" "
              />
              <label htmlFor="name">Name</label>
              {errors?.name && <p>{errors.name.message}</p>}
            </div>
            <div className={classes.input_box}>
              <textarea
                {...register("description")}
                id="description"
                placeholder=" "
              ></textarea>
              <label htmlFor="description">Description</label>
            </div>
            <div className={classes.input_box}>
              <input
                type="date"
                {...register("due_date")}
                id="due_date"
                placeholder=" "
                min={formatDate(new Date())}
              />
              <label htmlFor="due_date">Due to</label>
              {errors?.due_date && <p>{errors.due_date.message}</p>}
            </div>
            <p>Type</p>
            <div className={classes.radio_input}>
              <RadioBtn name="type" id="education" register={register} />
              <RadioBtn name="type" id="health" register={register} />
              <RadioBtn name="type" id="sport" register={register} />
              <RadioBtn name="type" id="travel" register={register} />
              <RadioBtn name="type" id="career" register={register} />
              <RadioBtn
                name="type"
                id="other"
                register={register}
                selected={true}
              />
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
          </form>
        </dialog>,
        document.getElementById("dialog")
      )}
    </>
  );
}
