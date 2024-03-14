
import { Navigate, Outlet} from "react-router-dom";
import { checkAuthFrontEnd } from "../redux/userSlice";

function PrivateRoute() {

  let auth = checkAuthFrontEnd();
  console.log(auth);
  if (auth == true) {
    return <Outlet />;
  } else {
    return <Navigate to={"/login"} />;
  }
}

export default PrivateRoute;
