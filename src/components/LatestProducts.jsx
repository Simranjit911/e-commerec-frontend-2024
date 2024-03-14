
import Product from "./Product";
import { useSelector } from "react-redux";

function LatestProducts() {

  // const products = [
  //   {
  //     _id: "1",
  //     name: "Sample product 1",
  //     images: [
  //       { url: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" },
  //     ],
  //     category: "category1",
  //     price: 5000,
  //   },
  //   {
  //     _id: "2",
  //     name: "Sample product 2",
  //     images: [
  //       { url: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" },
  //     ],
  //     category: "category2",
  //     price: 6000,
  //   },
  //   {
  //     _id: "4",
  //     name: "Sample product 2",
  //     images: [
  //       { url: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" },
  //     ],
  //     category: "category2",
  //     price: 6000,
  //   },
  //   {
  //     _id: "3",
  //     name: "Sample product 2",
  //     images: [
  //       { url: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" },
  //     ],
  //     category: "category2",
  //     price: 6000,
  //   },
  //   {
  //     _id: "3",
  //     name: "Sample product 2",
  //     images: [
  //       { url: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" },
  //     ],
  //     category: "category2",
  //     price: 6000,
  //   },
  //   {
  //     _id: "3",
  //     name: "Sample product 2",
  //     images: [
  //       { url: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" },
  //     ],
  //     category: "category2",
  //     price: 6000,
  //   },
  //   {
  //     _id: "3",
  //     name: "Sample product 2",
  //     images: [
  //       { url: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" },
  //     ],
  //     category: "category2",
  //     price: 6000,
  //   },
  //   {
  //     _id: "3",
  //     name: "Sample product 2",
  //     images: [
  //       { url: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" },
  //     ],
  //     category: "category2",
  //     price: 6000,
  //   },
  //   // Add more products as needed
  // ];
  const { products, isLoading, isError, singleProduct } = useSelector(
    (state) => state.products
  );

  return (
    <div className="text-black text-center bg-gray-200 my-3 py-4 ">
      <p className="py-5 font-semibold text-xl ">Latest Products</p>
      <div className="grid grid-cols-4 gap-8 items-center justify-center w-full md:px-5 px-3">
        {products.products?.map((product, index) => (
          <Product key={index} product={product} />
        ))}
      </div>
    </div>
  );
}

export default LatestProducts;
