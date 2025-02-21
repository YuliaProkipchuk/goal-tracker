import {
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import classes from "./Auth.module.css";
import { signUpSchema } from "../../types/signupSchema";
import { useDispatch } from "react-redux";
import { useSignupMutation } from "../../features/auth/authApiSlice";
import { setCredentials } from "../../features/auth/authSlice";
import usePersist from "../../hooks/usePersist";
export default function Registration() {
  const [persist, setPersist] = usePersist();

  const navigation = useNavigation();
  const navigate = useNavigate();

  const btnText = navigation.state === "submitting" ? "Submitting" : "Sign Up";
  const dispatch = useDispatch();
  const [handleSignup] = useSignupMutation();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });
  const onSubmit = async (data) => {
    setPersist(true);
    try {
      const { token } = await handleSignup(data).unwrap();
      dispatch(setCredentials({ accessToken: token }));
      reset();
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className={classes["auth-form"]} onSubmit={handleSubmit(onSubmit)}>
      <div className={classes["form-field"]}>
        <label>Username</label>
        <i className="bi bi-person-fill"></i>
        <input
          type="text"
          id="username"
          placeholder="Username"
          {...register("username")}
        />
        {errors.username && <p>{errors.username.message}</p>}
      </div>
      <div className={classes["form-field"]}>
        <label>Email</label>
        <i className="bi bi-envelope-at-fill"></i>

        <input
          type="email"
          id="email"
          placeholder="Email"
          {...register("email")}
        />
        {errors?.email && <p>{errors.email.message}</p>}
      </div>
      <div className={classes["form-field"]}>
        <label>Password</label>
        <i className="bi bi-lock-fill"></i>
        <input
          type="password"
          id="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors?.password && <p>{errors.password.message}</p>}
      </div>
      <button
        type="submit"
        className={classes.btn}
        disabled={navigation.state === "submitting"}
      >
        {btnText}
      </button>
    </form>
  );
}
