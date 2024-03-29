import React from "react";
import { useNavigate } from "react-router-dom";

function Card({ product }) {
  const nav = useNavigate();

  return (
    <div className="group relative w-72 h-80 overflow-hidden rounded-lg shadow-lg hover:shadow-xl cursor-pointer transform transition duration-300 ease-in-out hover:scale-105 mx-5 drop-shadow-xl">
      <img
        src={product.images[0].url}
        alt={product.name}
        className="h-full w-full object-cover rounded-lg group-hover:brightness-75 transition duration-300 ease-in-out drop-shadow-2xl"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-gray-700 to-transparent opacity-0 group-hover:opacity-75 transition duration-300 ease-in-out">
        <p className="absolute bottom-2 left-4 text-lg font-semibold text-blue-600 text-center py-2 px-4 rounded-lg">
          {product.name}
        </p>
      </div>
    </div>
  );
}

export default Card;
