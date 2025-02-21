import {
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import classes from "./Auth.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "../../types/signInSchema";
import { useLoginMutation } from "../../features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";
import usePersist from "../../hooks/usePersist";
export default function Login() {
  const [persist, setPersist] = usePersist();

  const authErrors = useActionData();

  const navigation = useNavigation();
  const navigate = useNavigate();
  const btnText = navigation.state === "submitting" ? "Submitting" : "Login";

  const dispatch = useDispatch();

  const [handleLogin] = useLoginMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    setPersist(true);
    try {
      const { accessToken } = await handleLogin(data).unwrap();
      dispatch(setCredentials({ accessToken }));
      reset();
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <>
      <form
        className={`${classes["auth-form"]} ${classes["login"]}`}
        onSubmit={handleSubmit(onSubmit)}
      >
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
        {authErrors && (
          <span className={classes["error-message"]}>
            {authErrors.errors.error}
          </span>
        )}
        <button
          className={classes.btn}
          disabled={navigation.state === "submitting"}
        >
          {btnText}
        </button>
      </form>
    </>
  );
}
