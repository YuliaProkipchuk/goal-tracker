/* eslint-disable react/prop-types */
import CATEGORIES from '../../util/categories';
import classes from './UI.module.css'
export default function PseudoImg({type}) {
  return (
    <div className={classes.pseudo}>
      {CATEGORIES[type]}
    </div>
  );
}
