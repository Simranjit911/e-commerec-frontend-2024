import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import axios from "../axiosConfig.js";
import { useEffect, useState } from "react";
import { fetchProductswithQuery } from "../redux/productSlice";
import Loader from "./Loader.jsx";

function LatestProducts() {
  // const { products, isLoading, isError, singleProduct } = useSelector(
  //   (state) => state.products
  // );
  let [products, setProducts] = useState([]);
  let dispatch = useDispatch();
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
      <div className="text-black text-center bg-gray-200 my-3 py-4 ">
        <p className="py-2 md:ml-28 font-semibold text-xl  md:text-3xl md:text-left text-center underline text-decoration-sky-500 text-sky-600">
          Latest Products
        </p>
        <div className="flex flex-wrap gap-7 my-5 items-center justify-center ">
          {products.length <= 1 ? (
            <Loader span={"Loading Latest Products"} />
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
