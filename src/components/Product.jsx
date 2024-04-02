import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import ReactStars from "react-rating-stars-component";
import { MdShoppingCartCheckout } from "react-icons/md";

function Product({ product }) {
  // Destructuring product object
  const { _id, category, price, desc, images, ratings, name, numOfReviews } =
    product;
  console.log(product);
  // Options for ReactStars component
  const options = {
    edit: false,
    size: window.innerWidth < 600 ? 14 : 18,
    value: ratings || 0, // Use actual rating from product data
    activeColor: "gold",
    isHalf: true,
  };

  return (
    <Link
      to={`/product/${_id}`}
      className="group relative bg-sky-100  rounded-lg shadow-xl shadow-slate-300 border border-slate-400 overflow-hidden transform hover:scale-105 transition duration-300 h-[250px] md:h-[384px] ease-in-out flex flex-col justify-between max-w-[200px] md:min-w-[300px]  p-4 pb-0"
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
          <span className="flex items-center text-sm">
            <ReactStars {...options} />
            <p className="text-xs text-gray-500 ml-1">
              ({numOfReviews ? numOfReviews : 0})
            </p>
          </span>
        </div>
        <p className="text-lg font-normal capitalize text-left text-black md:hidden">
          {name.length >= 16 ? `${name.slice(0, 16)}...` : name}
        </p>
        <p className="text-lg hidden font-normal capitalize text-left text-black md:block">
          { name}
        </p>
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold text-blue-700">₹{price}</p>
          {/* Add to Cart button (uncomment and customize) */}
          <Button
            classes={"bg-blue-700 text-white hover:bg-blue-800"}
            text={"Buy Now"}
            icon={<MdShoppingCartCheckout />}
          />
        </div>
      </div>
    </Link>
  );
}

export default Product;
