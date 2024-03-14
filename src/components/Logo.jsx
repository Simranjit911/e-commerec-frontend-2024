import React from "react";
import { FaOpencart } from "react-icons/fa6";

function Logo({ classes }) {
  return (
    <div
      className={`flex justify-center font-bold gap-1 items-center ${classes}`}
    >
      ProCart.com
      <FaOpencart />
    </div>
  );
}

export default Logo;
