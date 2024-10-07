import classes from "./Book.module.css";
export default function Book({children}) {
  return (
    <div className={classes.wrapper}>
      <div className={classes.paliturka}>
        <div className={classes.pages}></div>
        <div className={classes.pages}></div>
        <div className={classes.pages}></div>
        <div className={classes.pages}></div>
      </div>
      {children}
    </div>
  );
}
