import React, { useState } from "react";
import { CiSquareChevLeft } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import Logo from "../Logo";
import {
  CgLogOut,
  CgProductHunt,
  CgProfile,
  CgShoppingCart,
  CgSidebar,
  CgToggleOn,
} from "react-icons/cg";
import { useSelector } from "react-redux";
import MyProfile from "../profile/MyProfile";
import Orders from "../profile/Orders";
import { MdDashboard } from "react-icons/md";
import { FaHamburger, FaUsers } from "react-icons/fa";
import { FaProductHunt } from "react-icons/fa6";
import Dashboard from "./components/Dashboard";
import Products from "./components/Products";
import User from "./components/User";
import { RiCustomerServiceLine } from "react-icons/ri";
import Logout from "../profile/Logout";

function AdminPanel() {
  const { user } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(true);
  const [page, setPage] = useState("Dashboard");

  const navigation = [
    {
      name: "Dashboard",
      icon: <MdDashboard />,
      component: <Dashboard />,
    },
    {
      name: "Profile",
      icon: <CgProfile />,
      component: <MyProfile />,
    },
    {
      name: "Orders",
      icon: <RiCustomerServiceLine />,
      component: <Orders />,
    },
    {
      name: "Products",
      icon: <FaProductHunt />,
      component: <Products />,
    },
    {
      name: "Users",
      icon: <FaUsers />,
      component: <User />,
    },
    {
      name: "Logout",
      icon: <CgLogOut />,
      component: <Logout />,
    },
  ];

  const handleSidebarToggle = () => setIsOpen(!isOpen);

  return (
    <div className={`flex h-full  `}>
      {/* Sidebar */}
      <section
        className={` 
           transition-all duration-500 ease-in-out z-10
          h-fill w-[200px] bg-slate-600 shadow-2xl
          ${isOpen ? "w-[40px] " : ""}
        `}
      >
        <button
          className="sticky left-1 top-14 bg-blue-500 text-xl p-1 rounded focus:outline-none"
          onClick={handleSidebarToggle}
        >
          <RxHamburgerMenu />
        </button>
        <nav className="flex flex-col mt-8 gap-4 px-0.5 transition-all duration-500 ease-in-out">
          {navigation.map((navItem, index) => (
            <button
              key={index}
              className={`
                flex items-center justify-start p-2 rounded-md shadow-sm text-lg hover:bg-blue-500 focus:outline-none 
                ${page === navItem.name ? "bg-blue-500 text-white" : ""}
              `}
              onClick={() => setPage(navItem.name)}
            >
              {navItem.icon}
              <span
                className={` transition-all duration-500 ease-in-out ml-2 ${
                  isOpen && "hidden"
                }`}
              >
                {navItem.name}
              </span>
            </button>
          ))}
        </nav>
      </section>

      {/* Main Content */}
      <main className="w-full  min-h-[600px]   ">
        {navigation.map((navItem) => (
          <React.Fragment key={navItem.name}>
            {page === navItem.name && navItem.component}
          </React.Fragment>
        ))}
      </main>
    </div>
  );
}

export default AdminPanel;
// import React from 'react'

// function AdminPanel() {
//   return (
//     <div>AdminPanel</div>
//   )
// }

// export default AdminPanel
