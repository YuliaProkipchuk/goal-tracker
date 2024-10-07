import { NavLink } from "react-router-dom";
import classes from "./Navigation.module.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Root";
// import authToken from "../../../../backend/util/verify";
export default function Navigation() {
  let [isToken, setIsToken] = useState(false);

  // const { isToken, setIsToken } = useContext(AuthContext);
  const data = useContext(AuthContext);

  console.log(data);
  
  if(data){
    isToken = data.isToken;
    setIsToken = data.setIsToken;

  }
  //   const token = localStorage.getItem("token");
  //   const [IsToken, setIsToken] = useState(false)
  function handleLogOut() {
    localStorage.removeItem("token");
    setIsToken(false);
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsToken(token ? true : false);
  }, [isToken]);
  return (
    <nav>
      <NavLink to="/">
        <span className={classes.logo}>GTrack</span>
      </NavLink>
      <ul className={classes.mainNav}>
        <li>
          {isToken && (
            <NavLink to='/profile'>
              <span>PROFILE</span>
            </NavLink>
          )}
        </li> 
        <li>
          {isToken ? (
            <NavLink to="/">
              <span className={classes.logSpan} onClick={handleLogOut}>
                Log Out
              </span>
            </NavLink>
          ) : (
            <NavLink to="/auth">
              <span className={classes.logSpan}>Log In</span>
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
}
