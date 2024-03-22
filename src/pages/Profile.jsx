import React, { useState } from "react";
import { CgLogOut, CgProfile, CgShoppingCart } from "react-icons/cg";
import { GiNotebook } from "react-icons/gi";
import { MdDashboard, MdUpdate } from "react-icons/md";
import { useSelector } from "react-redux";
import MyProfile from "../components/profile/MyProfile";
import Orders from "../components/profile/Orders";
import Logout from "../components/profile/Logout";
import AllOrders from "../components/order/AllOrders";

function Profile() {
  const { user } = useSelector((state) => state.user);
  console.log(user.role);
  const [page, setPage] = useState("profile");
  const navigation = [
    {
      name: "profile",
      icon: <CgProfile />,
      component: <MyProfile />,
    },
    {
      name: "orders",
      icon: <GiNotebook />,
      component: <AllOrders />,
    },
    {
      name: "update",
      icon: <MdUpdate />,
    },
    {
      name: "cart",
      icon: <CgShoppingCart />,
    },
    {
      name: "logout",
      icon: <CgLogOut />,
      component: <Logout />,
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

export default Profile;
