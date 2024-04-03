import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"; // Importing required hooks from 'react-router-dom'
import Logo from "./Logo";
import { RiMenu4Fill } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import { BsCart2, BsSearch } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { DarkModeContext } from "../context/DarkModeContext"; // Importing context for dark mode
import { useDispatch, useSelector } from "react-redux";
import { loadCartFromLocalStorage } from "../redux/cartSlice"; // Importing Redux action to load cart from local storage
import { checkAuth } from "../redux/userSlice"; // Importing Redux action to check user authentication

function Navbar() {
  let { cart } = useSelector((state) => state.cart);

  const { filters, setFilters } = useContext(DarkModeContext); // Accessing dark mode context
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value })); // Updating filters state based on input changes
  };
  const nav = useNavigate(); // Navigation hook from 'react-router-dom'

  const [isOpen, setIsOpen] = useState(false); // State for mobile navigation menu
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user); // Accessing user state from Redux store

  useEffect(() => {
    loadCartFromLocalStorage(dispatch); // Load cart from local storage on component mount
    dispatch(checkAuth()); // Check user authentication on component mount
  }, [isAuthenticated, dispatch]); // Effect runs when isAuthenticated changes

  const links = [
    {
      to: "/",
      text: "Home",
    },
    {
      to: "/allproducts",
      text: "Shop",
    },
    ...(user?.role === "admin"
      ? [
          {
            text: "Dashboard",
            to: "/admin",
          },
        ]
      : []),
  ];

  return (
    <nav className="bg-blue-500 text-white px-2 py-3  text-xl items-center dark:bg-slate-950 shadow-2xl transition-all duration-500 ease-out">
      <div className="flex md:justify-evenly justify-around items-center">
        <Link to={"/"}>
          <Logo classes="md:text-lg text-md  font-normal" />
        </Link>
        <div className="hidden md:flex">
          {links.map((ele, i) => (
            <Link
              className="mx-2 text-md hover:scale-105 duration-100"
              key={i}
              to={ele.to}
            >
              {ele.text}
            </Link>
          ))}
        </div>
        {/* mobile navigation */}
        {isOpen && (
          <div className="md:hidden flex absolute flex-col top-10 bg-blue-500 w-full py-4 text-left z-50 shadow-xl transition-all duration-500 ease-out">
            {links.map((ele, i) => (
              <Link
                className="mx-2 text-left ml-[10%] text-md"
                key={i}
                to={ele.to}
              >
                {ele.text}
              </Link>
            ))}
          </div>
        )}
        {/* side icons for pc and mobile */}
        <div className="flex gap-2 md:gap-3 md:text-2xl items-center justify-end text-xl">
          {isAuthenticated ? (
            <>
              <div className="hidden md:flex justify-end  items-center ">
                <input
                  name="name"
                  value={filters.name}
                  type="search"
                  placeholder="Search Product"
                  className="text-sm md:text-md md:py-1  outline-none focus:outline focus:outline-blue-600 w-[70%] text-black px-1 md:w-[90%]"
                  onChange={handleFilterChange} // Handling change in search input
                />
                <button
                  type="submit"
                  className="bg-blue-700 text-sm text-white h-fit md:p-2 p-0.5 hover:scale-105 duration-500"
                  onClick={() => nav(`/allproducts`)}
                >
                  <BsSearch />
                </button>
              </div>
              <Link
                to={"/cart"}
                className="text-xl flex items-center relative mx-1"
              >
                <BsCart2 />
                {cart.length >= 1 && (
                  <span className="bg-blue-900 text-xs p-1 rounded-[100%] text-white absolute bottom-2 left-4 ">
                    {cart.length}
                  </span>
                )}
              </Link>

              <Link to={"/profile"} className="text-xl">
                <CgProfile />
              </Link>
              <button
                className="md:hidden transition-all text-2xl duration-500 ease-linear"
                onClick={() => setIsOpen((prev) => !prev)}
              >
                {isOpen ? <AiOutlineClose /> : <RiMenu4Fill />}
              </button>
            </>
          ) : (
            // not authenticated 4 pc and mobile
            <>
              <div className="hidden md:flex w-full justify-end  items-center ">
                <input
                  name="name"
                  type="search"
                  value={filters.name}
                  placeholder="Search Product"
                  className="text-sm md:text-md md:py-1 outline-none focus:outline focus:outline-blue-600 text-black px-1 md:w-[90%] w-[70%]"
                  onChange={handleFilterChange} // Handling change in search input
                />
                <button
                  type="submit"
                  className="bg-blue-700 text-sm text-white h-fit md:p-2 p-0.5 hover:scale-105 duration-500"
                  onClick={() => nav(`/allproducts`)}
                >
                  <BsSearch />
                </button>
              </div>
              <Link to={"/cart"} className="text-2xl">
                <BsCart2 />
              </Link>
              <Link to={"/profile"} className="text-2xl">
                <CgProfile />
              </Link>
              <button
                className="md:hidden text-2xl  transition-all duration-500 ease-out"
                onClick={() => setIsOpen((prev) => !prev)}
              >
                {isOpen ? <AiOutlineClose /> : <RiMenu4Fill />}
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
