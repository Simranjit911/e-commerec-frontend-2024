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
    console.log("useEffect call nav");
    // nav("/");
    dispatch(checkAuth());
  }, [registerUser, loginUser, isAuthenticated]);

  return (
    <div className="flex items-center justify-center min-h-[400px] md:min-h-[600px] bg-gray-800">
      <div className="bg-slate-200 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Logout</h2>
        <p className="text-gray-600 mb-4">
          Are you sure you want to logout, {user.username}?
        </p>
        <div className="flex justify-center">
          <Button text="Logout" fn={() => handleLogout(dispatch, nav)} />
        </div>
      </div>
    </div>
  );
}

export default Logout;
