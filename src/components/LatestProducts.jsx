import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import axios from "../axiosConfig.js";
import { useEffect, useState } from "react";
import { fetchProductswithQuery } from "../redux/productSlice";
import Loader from "./Loader.jsx";
import Button from "./Button.jsx";
import { useNavigate } from "react-router-dom";
function LatestProducts() {
  // const { products, isLoading, isError, singleProduct } = useSelector(
  //   (state) => state.products
  // );
  let [products, setProducts] = useState([]);
  let dispatch = useDispatch();
  let nav = useNavigate();
  const [filters, setFilters] = useState({
    name: "",
    desc: "",
    rating: "",
    category: "",
    isRecom: "",
    isLatest: "true",
    price: "",
    resultsPerPage: 10,
    page: 1,
  });
  let q = new URLSearchParams(filters).toString();
  async function getProd() {
    try {
      const response = await axios.get(`/product/all?${q}`);
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getProd();
  }, []);

  return (
    <div>
      <div className="text-black text-center bg-gray-200 my-3 py-4 px-4 md:px-0 ">
        <div className="flex justify-between md:px-8 items-center ">
          <p className="py-2  font-semibold text-xl  md:text-3xl md:text-left text-center underline text-decoration-sky-500 text-blue-600">
            Latest Products
          </p>
          <div className="mx auto md:flex justify-center items-center hidden">
            <Button
              text={"Explore More Products"}
              fn={() => nav("/allproducts")}
              classes={"mx auto flex justify-center items-center"}
            />
          </div>
        </div>
        <div className="grid xs:grid-cols-1 grid-cols-2  justify-center items-center col-auto px-auto   gap-5 md:flex md:flex-wrap md:gap-5 md:my-5 md:items-center md:justify-between">
          {/* <div className="md:flex md:flex-wrap md:gap-7 md:my-5 md:items-center md:justify-center "> */}
          {products.length <= 1 ? (
            <div className="col-span-2 flex justify-center items-center mx-auto">
              <Loader span={"Loading Latest Products"} />
            </div>
          ) : (
            products.products?.map((product, index) => (
              <Product key={index} product={product} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default LatestProducts;
