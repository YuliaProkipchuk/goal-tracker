import classes from "./Modal.module.css";

export default function RadioBtn({name, id}){
    return  <label htmlFor={id}>
    <input type="radio" name={name} id={id} value={id} />
    <div className={classes.radio_btn}></div>
    <p className={classes.radio_val}>{id}</p>
  </label>
}