// import { Link } from "react-router-dom";
// import Button from "./Button";
// import ReactStars from "react-rating-stars-component";
// import { MdShoppingCartCheckout } from "react-icons/md";
// function Product({ product }) {
//   // Destructuring product object
//   const { _id, category, price, desc, images, rating, name } = product;

//   // Options for ReactStars component
//   const options = {
//     edit: false,
//     size: window.innerWidth < 600 ? 14 : 18,
//     value: 3.7,
//     activeColor: "salmon",
//     isHalf: true,
//   };

//   return (
//     <Link
//       to={`/product/${_id}`}
//       className="bg-gray-300 shadow-gray-500 rounded text-black dark:text-white pb-2 min-w-[290px] shadow-2xl h-full mx-auto flex flex-col justify-between gap-0 hover:scale-105 duration-150 transition-all p-2 max-w-[200px] my-2"
//     >
//       {/* Product image */}
//       <div className="w-full mx-auto overflow-hidden rounded-md shadow-xl">
//         <img
//           className="w-full max-h-[220px] min-h-[220px] mx-auto hover:scale-105 duration-150 object-fit rounded-md shadow-xl"
//           src={images[0]?.url}
//           alt={name}
//         />
//       </div>
//       {/* Product details */}
//       <div className="">
//         <div className="flex justify-between items-center mt-1">
//           <p className="text-left uppercase text-slate-700 text-xs font-normal">
//             {category}
//           </p>
//           <span className="flex justify-center items-center text-md">
//             <ReactStars {...options} />
//             <p className="text-sm">(200)</p>
//           </span>
//         </div>
//         <p className="text-left capitalize text-xl">{name}</p>
//       </div>
//       {/* Product price */}
//       <div className="flex justify-between items-center my-0.5 gap-2">
//         <p className="text-left text-xl text-blue-700">
//           ${price}{" "}
//           <span className="text-xs text-gray-800 line-through">
//             ${price * 1.25}
//           </span>
//         </p>
//         {/* Add to Cart button (currently commented out) */}
//         <Button
//           classes={"text-lg "}
//           text={"But Now   "}
//           icon={<MdShoppingCartCheckout />}
//         />
//       </div>
//     </Link>
//   );
// }

// export default Product;

import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import ReactStars from "react-rating-stars-component";
import { MdShoppingCartCheckout } from "react-icons/md";

function Product({ product }) {
  // Destructuring product object
  const { _id, category, price, desc, images, rating, name } = product;

  // Options for ReactStars component
  const options = {
    edit: false,
    size: window.innerWidth < 600 ? 14 : 18,
    value: rating, // Use actual rating from product data
    activeColor: "gold",
    isHalf: true,
  };

  return (
    <Link
      to={`/product/${_id}`}
      className="group relative bg-sky-100  rounded-lg shadow-xl shadow-slate-300 border border-slate-400 overflow-hidden transform hover:scale-102 transition duration-300 ease-in-out flex flex-col justify-between max-w-[300px] md:min-w-[300px] min-w-[280px] p-4"
    >
      {/* Product image */}
      <div className="group-hover:opacity-75 overflow-hidden">
        <img
          src={images[0]?.url}
          alt={name}
          className="object-cover w-full h-40 sm:h-48 md:h-56 lg:h-64 rounded-lg group-hover:scale-105 transition duration-300 ease-in-out"
        />
      </div>

      {/* Product details */}
      <div className="mt-4 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500 uppercase">{category}</p>
          <span className="flex items-center text-sm">
            <ReactStars {...options} />
            <p className="text-xs text-gray-500 ml-1">(200)</p>
          </span>
        </div>
        <p className="text-lg font-semibold text-black">{name}</p>
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold text-blue-700">${price}</p>
          {/* Add to Cart button (uncomment and customize) */}
          <Button
            classes={"bg-blue-700 text-white hover:bg-blue-800"}
            text={"Add to Cart"}
            icon={<MdShoppingCartCheckout />}
          />
        </div>
      </div>
    </Link>
  );
}

export default Product;
