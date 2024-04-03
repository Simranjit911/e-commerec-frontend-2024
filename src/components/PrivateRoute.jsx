import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { checkAuthFrontEnd, handleLogout } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useLayoutEffect } from "react";

function PrivateRoute() {
  let auth = checkAuthFrontEnd();
  const { user } = useSelector((state) => state.user);
  let nav = useNavigate();
  let dispatch = useDispatch();
  useEffect(() => {
    if (user.name == "") {
      console.log("cal");
      handleLogout(dispatch, nav);
    }
  }, []);

  if (auth == true) {
    return <Outlet />;
  } else {
    return <Navigate to={"/login"} />;
  }
}

export default PrivateRoute;
