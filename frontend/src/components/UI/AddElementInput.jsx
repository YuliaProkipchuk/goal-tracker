export default function AddElementInput() {
  return (
    <input
      ref={taskName}
      placeholder="name"
      name="name"
      className={`${classes.input} ${classes.addInput}`}
    />
  );
}
