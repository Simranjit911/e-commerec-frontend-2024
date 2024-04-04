import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function AdminCheck() {
  let { user } = useSelector((state) => state.user); 
  if (user.role === "admin") {
    return <Outlet />;
  } else {
    return <Navigate to={"/"} />;
  }
}

export default AdminCheck;
