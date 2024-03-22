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
      heading: "Safe Payment",
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
    <div className="text-black mt-10  flex flex-wrap justify-around bg-sky-200 px-3 py-8 shadow-md rounded-md lg:mx-6">
      {servicesData.map((ele, i) => (
        <div
          key={i}
          className="flex flex-col items-center justify-center gap-3 p-4 hover:scale-105 duration-200 ease-in-out cursor-pointer border-2 rounded-md border-blue-600"
        >
          <div className="text-blue-600 text-4xl">{ele.logo}</div>
          <div className="text-center">
            <p className="font-semibold text-lg">{ele.heading}</p>
            <p className="text-sm text-gray-500">{ele.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Services;
