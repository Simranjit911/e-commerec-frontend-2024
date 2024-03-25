import React from "react";
import { CiDeliveryTruck } from "react-icons/ci";
import { MdOutlinePayment, MdVerified } from "react-icons/md";
import { FaIdCard } from "react-icons/fa";
import { FaShippingFast } from "react-icons/fa";
import { MdOutlineVerified } from "react-icons/md";

function Services() {
  const servicesData = [
    {
      logo: <CiDeliveryTruck className="text-blue-600 text-3xl" />,
      heading: "Free Delivery",
      text: "On all orders",
    },
    {
      logo: <MdOutlinePayment className="text-blue-600 text-3xl" />,
      heading: "Safe Payment",
      text: "Secure and trusted transactions",
    },
    {
      logo: <FaShippingFast className="text-blue-600 text-3xl" />,
      heading: "Fast Service",
      text: "Quick turnaround times",
    },
    {
      logo: <MdVerified className="text-blue-600 text-3xl" />,
      heading: "Verified Products",
      text: "High-quality and genuine items",
    },
  ];

  return (
    <div className=" mt-7 services-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-4 rounded-md shadow-md bg-sky-200">
      {servicesData.map((service, index) => (
        <div
          key={index}
          className="service-card flex flex-col items-center justify-center p-3 hover:scale-105 duration-150 rounded-md hover:bg-sky-300 cursor-pointer border border-sky-400"
        >
          {service.logo}
          <h3 className="text-xl font-semibold text-gray-800 mt-2">
            {service.heading}
          </h3>
          <p className="text-gray-600 text-sm mt-1">{service.text}</p>
        </div>
      ))}
    </div>
  );
}

export default Services;
