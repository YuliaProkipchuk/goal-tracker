/* eslint-disable react/prop-types */
import classes from "./UI.module.css";
export default function SearchBar({ className, onChange = null, onBlur=null}) {
  const cssClass = `${classes["search-input"]} ${className}`;
  return (
    <form>
      <input
        type="search"
        placeholder="Search"
        className={cssClass}
        onChange={onChange}
        onBlur={onBlur}
      />
    </form>
  );
}
