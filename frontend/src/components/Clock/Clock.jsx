import { useEffect, useRef, useState } from "react";
import classes from "./Clock.module.css";
export default function Clock() {
  const date = new Date(Date.now());
  const timer = useRef(null);
  const [time, setTime] = useState({
    hour: date.getHours(),
    minutes: date.getMinutes(),
  });
  useEffect(() => {
    const updateClock = () => {
      const dateN = new Date();
      setTime({
        hour: dateN.getHours(),
        minutes: dateN.getMinutes(),
      });
    };

    const d = 60 - new Date().getSeconds();
    timer.current = setTimeout(() => {
      updateClock();
      timer.current = setInterval(updateClock, 60000);
    }, d * 1000);

    return () => {
      clearTimeout(timer.current);
      clearInterval(timer.current);
    };
  }, []);
  return (
    <>
      <div className={classes["clock-wrapper"]}>
        <div className={classes.hours}>
          <p>{time.hour < 10 ? "0" + time.hour : time.hour}</p>
        </div>
        <div className={classes.dots}></div>
        <div className={classes.minutes}>
          <p>{time.minutes < 10 ? "0" + time.minutes : time.minutes}</p>
        </div>
      </div>
    </>
  );
}
