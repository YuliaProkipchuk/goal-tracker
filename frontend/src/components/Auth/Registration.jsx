import { Form, useActionData, useNavigation } from "react-router-dom";
import classes from "./Auth.module.css";
export default function Registration() {
  const errors = useActionData();
  const navigation = useNavigation();
  const btnText = navigation.state === "submitting" ? "Submitting" : "Sign Up";
  console.log(errors);

  return (
    <Form className={classes["auth-form"]} method="post">
      <div className={classes["form-field"]}>
        <label>Username</label>
        <i className="bi bi-person-fill"></i>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
        />
      </div>
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
      <button
        className={classes.btn}
        disabled={navigation.state === "submitting"}
      >
        {btnText}
      </button>
    </Form>
  );
}
