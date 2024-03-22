import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  checkAuth,
  handleLogout,
  loginUser,
  registerUser,
} from "../../redux/userSlice";
import Button from "../Button";

function Logout() {
  let nav = useNavigate();
  let dispatch = useDispatch();
  let { isAuthenticated, user } = useSelector((state) => state.user);
  useEffect(() => {
    console.log("useffect call nav");
    // nav("/");
    dispatch(checkAuth());
  }, [registerUser, loginUser, isAuthenticated]);
  return (
    <div>
      <Button text={"Logout"} fn={() => handleLogout(dispatch, nav)} />
    </div>
  );
}

export default Logout;
