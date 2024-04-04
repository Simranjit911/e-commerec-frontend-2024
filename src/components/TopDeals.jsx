import React from "react";
import Marquee from "react-fast-marquee";
import Card from "./Card";

function TopDeals() {
  const products = [
    {
      _id: "1",
      name: "Laptops",
      images: [
        { url: "https://m.media-amazon.com/images/I/71JwQSPtkRL._SY450_.jpg" },
      ],
      category: "laptop",
      price: 5000,
    },
    {
      _id: "2",
      name: "Mobiles",
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
      name: "HeadPhones",
      images: [
        {
          url: "https://m.media-amazon.com/images/I/31rqjDOoKRL._SX300_SY300_QL70_FMwebp_.jpg",
        },
      ],
      category: "headphone",
      price: 6000,
    },
    {
      _id: "4",
      name: "Earbuds",
      images: [
        {
          url: "https://m.media-amazon.com/images/I/31JICL9In-L._SX300_SY300_QL70_FMwebp_.jpg",
        },
      ],
      category: "earbuds",
      price: 6000,
    },
  ];

  return (
    <div className="text-black py-8 my-5">
      <p className="py-2 md:ml-28 font-semibold text-xl  md:text-3xl md:text-left text-center underline text-decoration-sky-500 text-sky-600">
        Top Deals on
      </p>
      <Marquee
        className="py-2"
        pauseOnClick={true}
        pauseOnHover={true}
        speed={200}
      >
        {products?.map((product, index) => (
          <Card key={index} product={product} />
        ))}
      </Marquee>
    </div>
  );
}

export default TopDeals;
