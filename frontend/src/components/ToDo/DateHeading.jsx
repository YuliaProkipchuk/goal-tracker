/* eslint-disable react/prop-types */

import { motion } from "framer-motion";

import classes from './ToDoList.module.css'
import { useRef, useState } from "react";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function DateHeading({newDate, setNewDate}){
      const [pickDate, setPickDate] = useState(false);
      const datePicker = useRef(null);

    function showCalendar() {
        setPickDate((prev) => !prev);
        datePicker.current.click();
      }
      function handlePickDate(event) {
        setNewDate(new Date(event.target.value));
      }
      function getFullDate(date) {
        return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} `;
      }
    return (
        <>
         <h2>{DAYS[newDate.getDay()]}</h2>
        <h2 className={classes.date}>
          <span>{getFullDate(newDate)}</span>
          <motion.span
            className={classes["date-icon"]}
            onClick={showCalendar}
            animate={pickDate ? { rotate: "180deg" } : { rotate: "0deg" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-caret-down-fill"
              viewBox="0 0 16 16"
            >
              <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
            </svg>
          </motion.span>
          {pickDate && (
            <input
              type="date"
              onChange={handlePickDate}
              className={classes.datePicker}
              ref={datePicker}
            />
          )}
        </h2>
        </>
    )
}