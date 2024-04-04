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
    size: window.innerWidth < 600 ? 14 : 18,
    value: ratings , // Use actual rating from product data
    activeColor: "salmon",
    isHalf: true,
  };

  return (
    <Link
      to={`/product/${_id}`}
      className="group relative bg-sky-100  rounded-lg shadow-xl shadow-slate-300 border border-slate-400 overflow-hidden transform hover:scale-105 transition duration-300 h-[250px] md:h-[384px] ease-in-out flex flex-col justify-between max-w-[230px]   md:min-w-[300px]  p-4 pb-0 w-full md:w-1/3 px-2  hover:shadow-lg-hover"
    >
      {/* Product image */}
      <div className="group-hover:opacity-75 overflow-hidden md:h-[70%]">
        <img
          src={images[0]?.url}
          alt={name}
          className="object-contain md:object-cover w-full h-full   rounded-lg group-hover:scale-105 transition duration-300 ease-in-out"
        />
      </div>

      {/* Product details */}
      <div className="mt-3 flex flex-col gap-0.5 md:gap-1 md:h-[30%] py-1 md:p-0">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500 uppercase">{category}</p>
          <span className="flex items-center text-xs md:text-sm">
            <ReactStars {...options} />
            <p className="text-xs text-gray-500 ml-1">
              ({numOfReviews ? numOfReviews : 0})
            </p>
          </span>
        </div>
        <p className="text-lg font-normal capitalize text-left text-black md:hidden">
          {name.length >= 14 ? `${name.slice(0, 13)}..` : name}
        </p>
        <p className="text-lg hidden font-normal capitalize text-left text-black md:block">
          {name.length >= 25 ? `${name.slice(0, 25)}..` : name}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <p className="md:text-lg  font-semibold text-blue-700">₹{price}</p>
            <p className="text-xs line-through text-slate-600 ml-2">
              ₹{(product?.price * 1.25).toFixed(2)}
            </p>
          </div>
          {/* Add to Cart button (uncomment and customize) */}
          <Button
            classes={
              "bg-blue-700 text-md md:text-lg text-white hover:bg-blue-800"
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
