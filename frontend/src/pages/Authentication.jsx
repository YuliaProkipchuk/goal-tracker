/* eslint-disable react/no-unknown-property */
import Login from "../components/Auth/Login";
import { useState } from "react";
import Registration from "../components/Auth/Registration";

export default function AuthenticationPage() {
  const [isRegistered, setIsRegistered] = useState(true);

  return (
    <>
      <main className="auth-main">
        <div className="back-card">
          <div className="auth_title">
            <h1>Welcome back!</h1>
          </div>

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
