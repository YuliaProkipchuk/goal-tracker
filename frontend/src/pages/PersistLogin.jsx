import { useSelector } from "react-redux";
import usePersist from "../hooks/usePersist";
import { selectToken } from "../features/auth/authSlice";
import { useEffect, useRef, useState } from "react";
import { useRefreshMutation } from "../features/auth/authApiSlice";
import { Outlet } from "react-router-dom";
const MODE = "development";
export default function PersistLogin() {
  const [persist] = usePersist();
  const token = useSelector(selectToken);
  const effectRan = useRef(false);

  const [truSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true || MODE !== "development") {
      const verifyRefreshToken = async () => {
        try {
          await refresh();
          setTrueSuccess(true);
        } catch (error) {
          console.error(error);
        }
      };
      if (!token && persist) verifyRefreshToken();
    }
    return () => (effectRan.current = true);

    // eslint-disable-next-line
  }, []);
  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = <p>Error: {error.message}</p>;
    // return redirect('/auth')
  } else if (isSuccess && truSuccess) {
    content = <Outlet />;
  } else if (token && isUninitialized) {
    // console.log("token and uninit");
    content = <Outlet />;
  }
  return content;
}
