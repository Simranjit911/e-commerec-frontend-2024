import React from "react";
import Marquee from "react-fast-marquee";
import Product from "./Product";
import Card from "./Card";
function TopDeals() {
  const products = [
    {
      _id: "1",
      name: "Sample product 1",
      images: [
        { url: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" },
      ],
      category: "Laptop",
      price: 5000,
    },
    {
      _id: "2",
      name: "Sample product 2",
      images: [
        { url: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" },
      ],
      category: "category2",
      price: 6000,
    },
    {
      _id: "4",
      name: "Sample product 2",
      images: [
        { url: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" },
      ],
      category: "category2",
      price: 6000,
    },
    {
      _id: "3",
      name: "Sample product 2",
      images: [
        { url: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" },
      ],
      category: "category2",
      price: 6000,
    },
    {
      _id: "3",
      name: "Sample product 2",
      images: [
        { url: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" },
      ],
      category: "category2",
      price: 6000,
    },
    {
      _id: "3",
      name: "Sample product 2",
      images: [
        { url: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" },
      ],
      category: "category2",
      price: 6000,
    },
    {
      _id: "3",
      name: "Sample product 2",
      images: [
        { url: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" },
      ],
      category: "category2",
      price: 6000,
    },
    {
      _id: "3",
      name: "Sample product 2",
      images: [
        { url: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" },
      ],
      category: "category2",
      price: 6000,
    },
    // Add more products as needed
  ];
  return (
    <div className="text-black  py-4">
      <p className="py-5 font-semibold text-4xl text-center shadow-sm drop-shadow-md">
        Top Deals
      </p>

      <Marquee className="" pauseOnClick={true} pauseOnHover={true}>
        {products.map((e, i) => {
          return <Card key={i} product={e} />;
        })}
      </Marquee>
    </div>
  );
}

export default TopDeals;
