import React from "react";
import Marquee from "react-fast-marquee";
import Card from "./Card";

function TopDeals() {
  const products = [
    {
      _id: "1",
      name: "Laptop",
      images: [
        { url: "https://m.media-amazon.com/images/I/71JwQSPtkRL._SY450_.jpg" },
      ],
      category: "laptop",
      price: 5000,
    },
    {
      _id: "2",
      name: "Mobile",
      images: [
        {
          url: "https://m.media-amazon.com/images/I/31p5cVyRLmL._SY445_SX342_QL70_FMwebp_.jpg",
        },
      ],
      category: "mobile",
      price: 6000,
    },
    {
      _id: "4",
      name: "Tablet",
      images: [
        {
          url: "https://m.media-amazon.com/images/I/31V3lrjd9YL._SX300_SY300_QL70_FMwebp_.jpg",
        },
      ],
      category: "tablet",
      price: 6000,
    },
    {
      _id: "3",
      name: "Headphone",
      images: [
        {
          url: "https://m.media-amazon.com/images/I/61zWFqX+krL._SL1500_.jpg",
        },
      ],
      category: "headphone",
      price: 6000,
    },
    {
      _id: "4",
      name: "Earbud",
      images: [
        {
          url: "https://m.media-amazon.com/images/I/61bodEi+1JL._SL1500_.jpg",
        },
      ],
      category: "earbuds",
      price: 6000,
    },
    {
      _id: "5",
      name: "Smartwatch",
      images: [
        {
          url: "https://m.media-amazon.com/images/I/51u3-CrLPIL._SL1000_.jpg",
        },
      ],
      category: "smartwatch",
      price: 6000,
    },
  ];

  return (
    <div className="text-black py-8 px-4 -mb-10 md:mb-0 md:my-5 bg-gray-300 rounded-md">
      <p className="  font-semibold text-xl  md:text-3xl text-left underline  text-decoration-sky-500 text-slate-600 ">
        Categories
      </p>
      <Marquee
        className="py-2 "
        pauseOnClick={true}
        pauseOnHover={true}
        speed={180}
      >
        {products?.map((product, index) => (
          <Card key={index} product={product} />
        ))}
      </Marquee>
    </div>
  );
}

export default TopDeals;
