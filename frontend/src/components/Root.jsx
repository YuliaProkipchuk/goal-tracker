import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import Header from "./Header/Header";
import Navigation from "./Navigation/Navigation";
import { createContext, useEffect, useState } from "react";
import { getTokenDuration } from "../util/logout";
export const AuthContext = createContext();

export default function Root(){
  const [isToken, setIsToken] = useState(false);
  const token = localStorage.getItem('token')
  const submit = useSubmit();
  
  useEffect(() => {
    if (!token) {
      return;
    }
    if (token === "EXPIRED") {
      submit(null, { action: "/logout", method: "post" });
      return;
    }
    const tokenDuration = getTokenDuration();

    setTimeout(() => {
      submit(null, { action: "/logout", method: "post" });
    }, tokenDuration);
  }, [token, submit]);
    return (
        <AuthContext.Provider value={{isToken, setIsToken}}>

         <div>
          <Navigation/>
        </div>
        <Outlet/>
        </AuthContext.Provider>
    )
}
export async function loader({params, request}) {
  const token = localStorage.getItem("token");
  if (token) {
    const response = await fetch("http://localhost:8080/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    if (response.ok) {
      console.log(data);
    } else {
      console.error(data.message);
    }
    return data;
  }
  return null;
}
