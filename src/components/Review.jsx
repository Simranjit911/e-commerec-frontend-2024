import React from "react";
import { RxAvatar } from "react-icons/rx";
import ReactStars from "react-rating-stars-component";
function Review({ review }) {
  let options = {
    edit: false,
    size: window.innerWidth < 600 ? 14 : 18,
    value: review.rating,
    activeColor: "salmon",
    isHalf: true,
  };
  return (
    <div className="border px-1 py-1 border-black bg-gray-300 text-center min-w-[250px] flex flex-col justify-center items-center">
      <div className="flex items-center justify-center gap-1">
        <p className="text-blue-800 font-semibold ">
          <RxAvatar />
        </p>
        <p className="text-blue-500 font-semibold font-serif">{review.name}</p>
      </div>
      <ReactStars {...options} />

      <p className="">
        Lorem, ipsum dolor lorem50 sit amet consectetur adipisicing elit. Magni, non.
      </p>
    </div>
  );
}

export default Review;
