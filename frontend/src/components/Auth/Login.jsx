import { Form, useActionData, useNavigation } from "react-router-dom";
import classes from "./Auth.module.css";
export default function Login() {
  const errors = useActionData();
  const navigation = useNavigation();
  const btnText = navigation.state==='submitting'?'Submitting':'Login';
  console.log(errors);
  return (
    <>
      <Form
        className={`${classes["auth-form"]} ${classes["login"]}`}
        method="post"
      >
        <div className={classes["form-field"]}>
          <label>Email</label>
          <i className="bi bi-envelope-at-fill"></i>
          <input type="email" name="email" id="email" placeholder="Email" />
        </div>
        <div className={classes["form-field"]}>
          <label>Password</label>
          <i className="bi bi-lock-fill"></i>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
        </div>
        {errors&&<span className={classes['error-message']}>{errors.errors.error}</span>}
        <button className={classes.btn} disabled={navigation.state==="submitting"}>{btnText}</button>
      </Form>
    </>
  );
}
