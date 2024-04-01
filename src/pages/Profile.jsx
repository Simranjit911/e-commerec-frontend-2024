import React, { useState } from "react";
import { CgLogOut, CgProfile, CgShoppingCart } from "react-icons/cg";
import { GiNotebook } from "react-icons/gi";
import { MdDashboard, MdUpdate } from "react-icons/md";
import { useSelector } from "react-redux";
import MyProfile from "../components/profile/MyProfile";
import Orders from "../components/profile/Orders";
import Logout from "../components/profile/Logout";
import AllOrders from "../components/order/AllOrders";
import { FaHamburger, FaUsers } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import CartPage from "../components/CartPage";

function Profile() {
  const { user } = useSelector((state) => state.user);

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
    // {
    //   name: "update",
    //   icon: <MdUpdate />,
    // },
    {
      name: "cart",
      icon: <CgShoppingCart />,
      component: <CartPage />,
    },
    {
      name: "logout",
      icon: <CgLogOut />,
      component: <Logout />,
    },
  ];
  const [isOpen, setIsOpen] = useState(false);

  const handleSidebarToggle = () => setIsOpen(!isOpen);

  return (
    <div className="flex h-full">
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
        <nav className="flex flex-col mt-8 gap-4 px-0.5 transition-all duration-500 ease-in-out capitalize">
          {navigation.map((e, i) => (
            <p
              key={i}
              className={`
                flex items-center justify-start p-2 rounded-md shadow-sm text-lg hover:bg-blue-500 focus:outline-none 
                ${page === e.name ? "bg-blue-500 text-white" : ""}
              `}
              onClick={() => setPage(e.name)}
            >
              {e.icon}
              <span
                className={` transition-all duration-500 ease-in-out ml-2 ${
                  isOpen && "hidden"
                }`}
              >
                {e.name}
              </span>
            </p>
          ))}{" "}
        </nav>
      </section>
      {/* Main */}
      <main className="w-full">
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
