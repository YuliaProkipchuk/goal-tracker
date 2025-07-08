import { useSelector } from "react-redux";
import Header from "../components/Header/Header";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { selectToken } from "../features/auth/authSlice";

export default function MainPage() {
  const token = useSelector(selectToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, []);
  return (
    <>
      <Header />
    </>
  );
}
