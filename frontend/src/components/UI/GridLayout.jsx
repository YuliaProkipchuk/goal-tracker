import classes from './UI.module.css';
export default function GridLayout({ children, className='' }) {
  return <div className={`${classes.grid} ${className}`}>{children}</div>;
}
