import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import Button from "./Button";
import { BsLightbulbFill } from "react-icons/bs";
import { BsLightbulbOffFill } from "react-icons/bs";
import { DarkModeContext } from "../context/DarkModeContext";
import { useDispatch, useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";
import {
  checkAuth,
  handleLogout,
  loginUser,
  logout,
  registerUser,
} from "../redux/userSlice";
function Navbar() {
  let nav = useNavigate();
  let dispatch = useDispatch();
  let { isAuthenticated, user } = useSelector((state) => state.user);
  useEffect(() => {
    console.log("useffect call nav");
    nav("/");
    dispatch(checkAuth());
  }, [registerUser, loginUser, isAuthenticated]);
  console.log(user);
  let links = [
    {
      to: "/",
      text: "Home",
    },
    {
      to: "/allproducts",
      text: "All Products",
    },
    {
      to: "/cart",
      text: "Cart",
    },
  ];
  if (user.role === "admin") {
    links.push({
      text: "Dashboard",
      to: "/admin",
    });
  }
  let { handleDark, isDark } = useContext(DarkModeContext);
  return (
    <nav
      id="nav"
      className="bg-blue-200 py-2 text-lg items-center dark:bg-slate-950 shadow-xl "
    >
      {/* pc */}
      {/* main div */}
      <div className="flex justify-evenly items-center px-4 py-2">
        {/* Logo */}
        <Link to={"/"}>
          <Logo classes={"text-lg font-semibold"} />
        </Link>
        {/* links */}
        <div className="">
          {links.map((ele, i) => {
            return (
              <Link className="mx-2 text-md " key={i} to={ele.to}>
                {ele.text}
              </Link>
            );
          })}
        </div>
        {/* buttons */}
        <div className="flex gap-3 justify-center items-center pl-9">
          {isAuthenticated ? (
            <>
              <Button text={"Logout"} fn={() => handleLogout(dispatch, nav)} />
              <Link to={"/profile"} className="text-xl">
                {user?.avatar ? (
                  <img
                    style={{ borderRadius: "70%", width: "20%" }}
                    src={user?.avatar?.url}
                    alt="profile"
                    className="w-[15%] h-fit hover:scale-105 cursor-pointer shadow-xl drop-shadow-sm"
                  />
                ) : (
                  <CgProfile />
                )}
              </Link>
            </>
          ) : (
            <>
              <Link to={"/login"}>
                <Button text={"Login"} classes={"mx-1 px-4"} />
              </Link>
              <Link to={"/signup"}>
                <Button text={"SignUp"} classes={"mx-1 px-4"} />
              </Link>
            </>
          )}

          {/* Dark Light btn */}
          <button className="hidden" onClick={handleDark}>
            {isDark ? <BsLightbulbFill /> : <BsLightbulbOffFill />}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
