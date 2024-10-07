import { useRouteError } from "react-router-dom";
import Navigation from "../components/Navigation/Navigation";

export default function ErrorPage() {
  let error = useRouteError();
  let title = "An Error occured!";
  let message = error?.data?.message || "Something went wrong";
  console.log(error);

  if (error.status === 404) {
    title = "Not found";
    message = "Could not find resource or page";
  }
  return (
    <>
      <Navigation />
      <div className="error"></div>
      <h1>{title}</h1>
      <p>{message}</p>
    </>
  );
}
