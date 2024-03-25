import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { RiMenu4Fill } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import Button from "./Button";
import { BsCart2, BsLightbulbFill } from "react-icons/bs";
import { BsLightbulbOffFill } from "react-icons/bs";
import { DarkModeContext } from "../context/DarkModeContext";
import { useDispatch, useSelector } from "react-redux";
import { CgProfile, CgSearch } from "react-icons/cg";
import {
  checkAuth,
  handleLogout,
  loginUser,
  logout,
  registerUser,
} from "../redux/userSlice";
import { loadCartFromLocalStorage } from "../redux/cartSlice";
function Navbar() {
  let nav = useNavigate();
  let [isOpen, setIsOpen] = useState(false);
  let dispatch = useDispatch();
  let { isAuthenticated, user } = useSelector((state) => state.user);
  useEffect(() => {
    // nav("/");
    loadCartFromLocalStorage(dispatch);
    dispatch(checkAuth());
  }, [isAuthenticated]);
  let links = [
    {
      to: "/",
      text: "Home",
    },
    {
      to: "/allproducts",
      text: "All Products",
    },
    // {
    //   to: "/cart",
    //   text: "Cart",
    // },
  ];
  if (user?.role === "admin") {
    links.push({
      text: "Dashboard",
      to: "/admin",
    });
  }
  let { handleDark, isDark } = useContext(DarkModeContext);
  return (
    <nav
      id="nav"
      className="bg-blue-500 text-white py-2 text-lg items-center dark:bg-slate-950 shadow-2xl transition-all duration-500 ease-out"
    >
      {/* pc */}
      {/* main div */}
      <div className="flex md:justify-evenly justify-around items-center">
        {/* Logo */}
        <Link to={"/"}>
          <Logo classes={"text-lg font-semibold"} />
        </Link>
        {/* links */}
        <div className="hidden md:flex ">
          {links.map((ele, i) => {
            return (
              <Link
                className="mx-2 text-md hover:scale-105 duration-100"
                key={i}
                to={ele.to}
              >
                {ele.text}
              </Link>
            );
          })}
        </div>
        {/* mobile links */}
        {isOpen && (
          <div
            onClick={() => setIsOpen((p) => !p)}
            className="md:hidden flex absolute flex-col top-10 bg-blue-500 w-full py-4 text-left  z-50 shadow-xl transition-all duration-1000 ease-out"
          >
            {links.map((ele, i) => {
              return (
                <Link className="mx-2 text-md " key={i} to={ele.to}>
                  {ele.text}
                </Link>
              );
            })}
            {!isAuthenticated && (
              <div>
                <Link to={"/login"} className="">
                  <Button text={"Login"} classes={"mx-1 shadow-xl  px-4"} />
                </Link>
                <Link to={"/signup"}>
                  <Button text={"SignUp"} classes={"mx-1 px-4"} />
                </Link>
              </div>
            )}
          </div>
        )}
        {/*side  buttons */}
        <div className="flex gap-3 items-center justify-center text-2xl">
          {isAuthenticated ? (
            <>
              {/* <Link to={"/profile"} className="text-2xl">
                <CgSearch />
              </Link> */}
              <Link to={"/cart"} className="text-2xl">
                <BsCart2 />
              </Link>
              <Link to={"/profile"} className="text-2xl">
                <CgProfile />
              </Link>
              <button
                className="md:hidden transition-all duration-500 ease-linea"
                onClick={() => setIsOpen((prev) => !prev)}
              >
                {isOpen ? <AiOutlineClose /> : <RiMenu4Fill />}
              </button>
            </>
          ) : (
            <>
              <Link to={"/login"} className="hidden">
                <Button text={"Login"} classes={"mx-1 shadow-xl  px-4"} />
              </Link>
              {/* <Link to={"/signup"} className="hidden">
                <Button text={"SignUp"} classes={"mx-1 px-4"} />
              </Link> */}
              <Link to={"/profile"} className="text-2xl">
                <CgSearch />
              </Link>
              <Link to={"/cart"} className="text-2xl">
                <BsCart2 />
              </Link>
              <button
                className="md:hidden transition-all duration-500 ease-linear"
                onClick={() => setIsOpen((prev) => !prev)}
              >
                {isOpen ? <AiOutlineClose /> : <RiMenu4Fill />}
              </button>
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
