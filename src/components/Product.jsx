import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import ReactStars from "react-rating-stars-component";
import { MdShoppingCartCheckout } from "react-icons/md";

function Product({ product }) {
  // Destructuring product object
  const { _id, category, price, desc, images, ratings, name, numOfReviews } =
    product;
  // Options for ReactStars component
  const options = {
    edit: false,
    size: window.innerWidth < 600 ? 10 : 18,
    value: ratings , // Use actual rating from product data
    activeColor: "salmon",
    isHalf: true,
  };

  return (
    <Link
      to={`/product/${_id}`}
      className="group relative bg-gray-100 self-center mx-auto rounded-lg shadow-xl border border-slate-400 overflow-hidden transform hover:scale-105 transition duration-300 h-[250px] md:h-[350px] ease-in-out flex flex-col justify-between max-w-[230px] gap-2 md:gap-0  md:min-w-[280px]  p-2 hover:shadow-3xl   w-full md:w-1/3   "
    >
      {/* Product image */}
      <div className="group-hover:opacity-75 overflow-hidden h-[70%]  md:h-[75%]">
        <img
          src={images[0]?.url}
          alt={name}
          className="object-cover md:object-fill w-full h-full shadow-xl  rounded-lg group-hover:scale-105 transition duration-300 ease-in-out"
        />
      </div>

      {/* Product details */}
      <div className="md:mt-2 flex flex-col md:-pb-16   md:h-[25%] ">
        <div className="flex justify-between items-center">
          <p className="text-[9px] md:text-sm text-gray-600 uppercase">{category}</p>
          <span className="flex items-center text-xs md:text-sm">
            <ReactStars {...options} />
            <p className="text-xs text-gray-500 ml-1">
              ({numOfReviews ? numOfReviews : 0})
            </p>
          </span>
        </div>
        <p className="md:text-lg text-[14px] font-normal capitalize text-left text-black md:hidden">
          {name.length >= 14 ? `${name.slice(0, 14)}..` : name}
        </p>
        <p className="text-xl hidden font-normal capitalize text-left text-black md:block">
          {name.length >= 23 ? `${name.slice(0, 23)}..` : name}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <p className="md:text-lg text-sm  font-semibold text-blue-700">₹{price}</p>
            <p className="text-xs line-through hidden md:block text-slate-600 ml-2">
              ₹{(product?.price * 1.25).toFixed(2)}
            </p>
          </div>
          {/* Add to Cart button (uncomment and customize) */}
          <Button
            classes={
              "bg-blue-700 text-[7.5px] px-1 py-0 md:text-sm text-white hover:bg-blue-800"
            }
            text={"Buy Now"}
            icon={<MdShoppingCartCheckout />}
          />
        </div>
      </div>
    </Link>
  );
}

export default Product;
