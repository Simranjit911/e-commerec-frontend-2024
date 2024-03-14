import { MdOutlineArrowUpward } from "react-icons/md";
import { FaFacebook, FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Logo from "./Logo";
function Footer() {
  return (
    <footer className="bg-blue-600 sticky w-full bottom-0">
      {/* ftop */}
      <section className="flex justify-evenly items-center py-4 text-xl border-b-2 border-gray-400  ">
        <p>Get connected with us on social networks:</p>
        <div className="flex gap-6">
          <a href="#">
            <FaFacebook />
          </a>
          <a href="#">
            <FaXTwitter />
          </a>
          <a href="">
            <FaInstagram />
          </a>
          <a href="">
            <FaLinkedinIn />
          </a>
        </div>
        <a href="#nav" className="flex items-center text-xl">
          Scroll to Top
          <MdOutlineArrowUpward />
        </a>
      </section>
      {/* fmiddle */}
      <div className="flex w-full h-full mx-auto justify-center items-center px-10 py-10 gap-10">
        {/*1st  */}
        <div className="md:w-[25%] mx-auto text-center">
          <Logo />
          <p className="font-normal text-slate-950">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            labore similique fugit a incidunt tempore mollitia! Ex quae aliquid
            commodi!
          </p>
        </div>
        {/* 2nd */}
        <div className="md:w-[25%] mx-auto text-center">
          <p className="text-xl font-semibold">Brands</p>
          <ul>
            <li>Apple</li>
            <li>Apple</li>
            <li>Apple</li>
            <li>Apple</li>
          </ul>
        </div>
        {/* 3rd */}
        <div className="md:w-[25%] mx-auto text-center">
          <p>Brands</p>
          <ul>
            <li>Apple</li>
            <li>Apple</li>
            <li>Apple</li>
            <li>Apple</li>
          </ul>
        </div>
        {/* 4th */}
        <div className="md:w-[25%] mx-auto text-center">
          <p>Brands</p>
          <ul>
            <li>Apple</li>
            <li>Apple</li>
            <li>Apple</li>
            <li>Apple</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
