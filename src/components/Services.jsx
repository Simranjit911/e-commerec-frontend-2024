import React from "react";
import { CiDeliveryTruck } from "react-icons/ci";
import { MdOutlinePayment, MdVerified } from "react-icons/md";
import { FaIdCard } from "react-icons/fa";
import { FaShippingFast } from "react-icons/fa";
import { MdOutlineVerified } from "react-icons/md";

function Services() {
  let servicesData = [
    {
      logo: <CiDeliveryTruck />,
      heading: "Free delivery",
      text: "For delivery on all orders",
    },
    {
      logo: <MdOutlinePayment />,
      heading: "Safe Payemnt",
      text: "For delivery on all orders",
    },
    {
      logo: <FaShippingFast />,
      heading: "Fast Service",
      text: "For delivery on all orders",
    },
    {
      logo: <FaIdCard />,
      heading: "Shop with Confidence",
      text: "If goods have problems",
    },
    {
      logo: <MdVerified />,
      heading: "Verified Products",
      text: "100% verified Product",
    },
  ];

  return (
    <div className="text-black mt-10 flex justify-around bg-slate-300 px-3 py-16 shadow-md  mx-6 rounded-md">
      {servicesData.map((ele, i) => (
        <div
          key={i}
          className="flex justify-center items-center gap-3 hover:scale-105 duration-200 ease-in-out cursor-pointer border-1"
        >
          <p className="text-[39px] text-slate-900">{ele.logo}</p>
          <div className="flex flex-col gap-0">
            <p className="font-semibold text-lg text-blue-600">{ele.heading}</p>
            <p className="text-sm text-slate-500">{ele.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Services;
