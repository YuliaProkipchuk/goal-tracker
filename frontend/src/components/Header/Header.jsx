import classes from "./Header.module.css";
export default function Header() {
  return (
    <>
      <header className={classes["main-header"]}>
        <div className={classes.titleBlock}>
          <h1 data-text='Create a new Goal' className={classes["main-title"]}>
            Create a new Goal
          </h1>
        </div>
      </header>
    </>
  );
}
