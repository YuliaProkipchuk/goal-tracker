import { json, redirect, useActionData } from "react-router-dom";
import Login from "../components/Auth/Login";
import { useState } from "react";
import Registration from "../components/Auth/Registration";

export default function AuthenticationPage() {
  const [isRegistered, setIsRegistered] = useState(true);
  const errors = useActionData();

  return (
    <>
      <main className="auth-main">
        <div className="back-card">
          <div className="auth_title">
            <h1 >Welcome back!</h1>
            {errors && <p>{errors?.message}</p>}
          </div>

          {/* <Login/> */}
          {isRegistered ? <Login /> : <Registration />}
          <span
            className="sign-text"
            onClick={() => setIsRegistered((prev) => !prev)}
          >
            {isRegistered
              ? "Do you not have an account yet? Sign up"
              : "Already have an account? Sing in."}
          </span>
        </div>
        <div className="decorative-box">
          <div className="square" style={{ "--i": 1 }} s1="true"></div>
          <div className="square" style={{ "--i": 2 }} s2="true"></div>
          <div className="square" style={{ "--i": 3 }} s3="true"></div>
          <div className="square" style={{ "--i": 4 }} s4="true"></div>
          <div className="square" style={{ "--i": 5 }} s5="true"></div>
          <div className="square" style={{ "--i": 1.5 }}></div>
          <div className="square" style={{ "--i": 2.5 }}></div>
          <div className="square" style={{ "--i": 3.5 }}></div>
          <div className="square" style={{ "--i": 4.5 }}></div>
          <div className="square" style={{ "--i": 5.5 }}></div>
        </div>
      </main>
    </>
  );
}
export async function action({ request }) {
  const formData = await request.formData();
  const mode = formData.get("username") === null ? "login" : "signup";
  console.log(mode);
  const user = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const response = await fetch(`http://localhost:8080/auth/${mode}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (response.status === 422 || response.status === 421) {
    console.log(response);
    return response;
  }
  if (!response.ok) {
    console.log(response);

    throw json({ message: "Could not find user" }, { status: 500 });
  }
  const { token } = await response.json();
  localStorage.setItem("token", token);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 4);
  localStorage.setItem("expiration", expiration.toISOString());
  // console.log(data)
  return redirect("/");
}
