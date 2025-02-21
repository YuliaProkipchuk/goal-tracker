import { NavLink, useNavigate } from "react-router-dom";
import classes from "./Navigation.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectToken } from "../../features/auth/authSlice";
import { useLogoutMutation } from "../../features/auth/authApiSlice";

export default function Navigation() {
  const token = useSelector(selectToken);
  const [sendLogout, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogOut() {
    try {
      await sendLogout();
      dispatch(logout);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <nav>
      <NavLink to={token ? "/home" : "/"}>
        <span className={classes.logo}>GTrack</span>
      </NavLink>
      <ul className={classes.mainNav}>
        <li>
          {token && (
            <NavLink to="/profile">
              <span>PROFILE</span>
            </NavLink>
          )}
        </li>
        <li>
          {token ? (
            <span
              className={classes.logSpan}
              onClick={handleLogOut}
              aria-disabled={isLoading}
            >
              Log Out
            </span>
          ) : (
            <NavLink to="/auth">
              <span className={classes.logSpan} aria-disabled={isLoading}>
                Log In
              </span>
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
}
