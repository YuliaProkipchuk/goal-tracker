import { Outlet} from "react-router-dom";
import Navigation from "./Navigation/Navigation";


export default function Root() {
  
  return (
    <>
      <div>
        <Navigation />
      </div>

      <Outlet />
    </>
  );
}
