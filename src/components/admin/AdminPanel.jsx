import React, { useState } from "react";
import {
  CgLogOut,
  CgProductHunt,
  CgProfile,
  CgShoppingCart,
} from "react-icons/cg";
import { useSelector } from "react-redux";
import MyProfile from "../profile/MyProfile";
import { GiNotebook } from "react-icons/gi";
import Orders from "../profile/Orders";
import { MdDashboard, MdUpdate } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FaProductHunt } from "react-icons/fa6";
import Dashboard from "./components/Dashboard";
import Products from "./components/Products";
import User from "./components/User";

function AdminPanel() {
  const { user } = useSelector((state) => state.user);
  console.log(user.role);
  const [page, setPage] = useState("profile");
  const navigation = [
    {
      name: "Dashboard",
      icon: <MdDashboard />,
      component: <Dashboard />,
    },
    {
      name: "profile",
      icon: <CgProfile />,
      component: <MyProfile />,
    },
    {
      name: "orders",
      icon: <GiNotebook />,
      component: <Orders />,
    },
    {
      name: "products",
      component: <Products />,
      icon: <FaProductHunt />,
    },
    {
      name: "cart",
      icon: <CgShoppingCart />,
    },
    {
      name: "users",
      icon: <FaUsers />,
      component: <User />,
    },
    {
      name: "logout",
      icon: <CgLogOut />,
    },
  ];
  return (
    <div className="flex h-[100%]">
      {/* Sidebar */}
      <section className="w-[8%] h-full text-center capitalize bg-gray-300 shadow-xl">
        {navigation.map((e, i) => (
          <p
            key={i}
            className={`py-6  hover:scale-105 duration-150 cursor-pointer flex justify-center items-center gap-2 text-lg ${
              page === e.name
                ? "bg-blue-500 border-r-4 border-sky-900 text-white"
                : ""
            }`}
            onClick={() => setPage(e.name)}
          >
            {e.icon}
            {e.name}
          </p>
        ))}
      </section>
      {/* Main */}
      <main className="w-[92%] transition-all duration-300">
        {navigation.map((navItem, index) => (
          <React.Fragment key={index}>
            {page === navItem.name && navItem.component}
          </React.Fragment>
        ))}
      </main>
    </div>
  );
}

export default AdminPanel;
