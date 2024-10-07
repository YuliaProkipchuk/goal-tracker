import classes from './UI.module.css'
export default function CheckInput({checkHandler, isChecked=false, inputName='', className=''}) {
  const customStyle = `${classes.custom_checkbox} ${classes[className]}`
  return (
    <>
      <input 
        type="checkbox"
        onChange={checkHandler}
        name={inputName}
       
        className={classes.checkbox}
        checked={isChecked}
      />
      <div className={customStyle}></div>
    </>
  );
}
