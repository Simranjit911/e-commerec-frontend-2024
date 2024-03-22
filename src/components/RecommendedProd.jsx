import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import axios from "../axiosConfig.js";
import { useEffect, useState } from "react";
import { fetchProductswithQuery } from "../redux/productSlice";
function RecommendedProd() {
  const { products, isLoading, isError, singleProduct } = useSelector(
    (state) => state.products
  );
  let recom = products;
  let dispatch = useDispatch();
  const [filters, setFilters] = useState({
    name: "",
    desc: "",
    rating: "",
    category: "",
    isRecom: "true",
    isLatest: "",
    price: "",
    resultsPerPage: 10,
    page: 1,
  });
  let q = new URLSearchParams(filters).toString();
  useEffect(() => {
    dispatch(fetchProductswithQuery(q));
  }, []);

  console.log(products);

  return (
    <div className="text-black text-center bg-gray-200 my-3 py-4 ">
      <p className="py-5 font-semibold text-3xl ">Recommended Products</p>
      <div className="flex flex-wrap gap-7 my-5 items-center justify-center ">
        {recom.products?.map((product, index) => (
          <Product key={index} product={product} />
        ))}
      </div>
    </div>
  );
}

export default RecommendedProd;
