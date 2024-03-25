import { MdOutlineArrowUpward } from "react-icons/md";
import {
  FaFacebook,
  FaLinkedinIn,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import Logo from "./Logo";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function Footer() {
  const { cart } = useSelector((state) => state.cart);

  return (
    <footer className="bg-blue-600 sticky w-full bottom-0">
      {/* Top section */}
      <section className="flex flex-col md:flex-row justify-evenly items-center py-4 text-xl border-b-2 border-gray-400">
        <p className="mb-4 md:mb-0">
          Get connected with us on social networks:
        </p>
        <div className="flex gap-6 mb-4 md:mb-0">
          <a href="#">
            <FaFacebook />
          </a>
          <a href="#">
            <FaTwitter />
          </a>
          <a href="#">
            <FaInstagram />
          </a>
          <a href="#">
            <FaLinkedinIn />
          </a>
        </div>
        <a href="#nav" className="flex items-center text-xl">
          Scroll to Top
          <MdOutlineArrowUpward />
        </a>
      </section>
      {/* Middle section */}
      <div className="flex flex-col md:flex-row justify-evenly items-center px-4 py-10 gap-10">
        {/* 1st section */}
        <div className="md:w-[25%] mx-auto text-center mb-2 md:mb-0">
          <Logo />
          <p className="font-normal text-gray-800">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            labore similique fugit a incidunt tempore mollitia! Ex quae aliquid
            commodi!
          </p>
        </div>
        {/* 2nd section */}
        <div className="md:w-[25%] mx-auto text-center mb-2 md:mb-0">
          <p className="text-xl font-semibold">Brands</p>
          <ul>
            <li>Samsung</li>
            <li>Apple</li>
            <li>Google</li>
            <li>Microsoft</li>
          </ul>
        </div>
        {/* 3rd section */}
        <div className="md:w-[25%] mx-auto text-center mb-2 md:mb-0">
          <p className="text-xl font-semibold">Brands</p>
          <ul>
            <li>Lenovo</li>
            <li>Asus</li>
            <li>HP</li>
            <li>Dell</li>
          </ul>
        </div>
        {/* 4th section */}
        <div className="md:w-[25%] mx-auto text-center mb-2 md:mb-0 ">
          <p className="text-xl font-semibold">Brands</p>
          <ul>
            <li>Sony</li>
            <li>Xiaomi</li>
            <li>OnePlus</li>
            <li>LG</li>
          </ul>
        </div>
      </div>
      {/* bottom section
       */}
      <section className="flex gap-2 py-2 justify-center text-md border-t-2 border-gray-400 mx-auto w-full">
        &copy; <Logo /> {new Date().getFullYear()}
      </section>
    </footer>
  );
}

export default Footer;
