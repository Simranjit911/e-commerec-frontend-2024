import React from "react";

function Card({ product }) {
  return (
    <div className="flex-shrink-0 w-64 mx-4 bg-slate-300 px-4 py-2 rounded-xl shadow-black/30 shadow-xl cursor-pointer my-10 hover:scale-105 duration-300 transition-all hover:text-slate-800">
      <img
        src={product.images[0].url}
        alt={product.name}
        className="h-60 w-full object-cover rounded-md drop-shadow-sm mb-4 transition-all duration-500 ease-in-out opacity-48 hover:opacity-30"
      />

      <p className="text-lg text-center text-blue-700 hover:text-slate-800">
        {product.category}
      </p>
    </div>
  );
}

export default Card;
