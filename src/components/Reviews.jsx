import React from "react";
import Review from "./Review";

function Reviews() {
  let reviews = [
    {
      name: "User1",
      rating: 1,
    },
    {
      name: "User2",
      rating: 1,
    },
    {
      name: "User3",
      rating: 3,
    },
    {
      name: "User4",
      rating: 4,
    },
    {
      name: "User5",
      rating: 5,
    },
    {
      name: "User6",
      rating: 4.5,
    },
    {
      name: "User7",
      rating: 4.5,
    },
    {
      name: "User8",
      rating: 4.5,
    },
    {
      name: "User9",
      rating: 4.5,
    },
  ];

  return (
    <div className="flex gap-6 my-16 overflow-x-auto custom-scrollbar px-10 py-6">
      {reviews.length > 0 ? (
        reviews.map((review, index) => <Review key={index} review={review} />)
      ) : (
        <div>No Reviews Yet</div>
      )}
    </div>
  );
}

export default Reviews;
