/* eslint-disable react/prop-types */
import classes from "./Modal.module.css";

export default function RadioBtn({name, id, register, selected=false}){
    return  <label htmlFor={id}>
    <input type="radio" id={id} value={id} {...register(name)} defaultChecked={selected}/>
    <div className={classes.radio_btn}></div>
    <p className={classes.radio_val}>{id}</p>
  </label>
}