import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProductswithQuery } from "../redux/productSlice";
import Loader from "./Loader.jsx";

function RecommendedProd() {
  const { products, isLoading, isError, singleProduct } = useSelector(
    (state) => state.products
  );
  const [recom, setRecom] = useState([]);
  const dispatch = useDispatch();
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
  const q = new URLSearchParams(filters).toString();

  useEffect(() => {
    dispatch(fetchProductswithQuery(q));
  }, [dispatch, q]);

  useEffect(() => {
    if (products) {
      setRecom(products);
    }
  }, [products]);

  return (
    <div className="text-black text-center container  my-1 py-2">
      <p className="py-2 md:ml-28 font-semibold text-xl  md:text-3xl md:text-left text-center underline text-decoration-sky-500 text-sky-600">
        Recommended Products
      </p>
      <div className="flex flex-wrap gap-7 my-5 items-center justify-center">
        {isLoading && <Loader span={"Loading Recommended Products"} />}
        {isError && <div>Error in Fetching Products</div>}
        {!isLoading &&
          !isError &&
          products?.products?.map((product, index) => (
            <Product key={index} product={product} />
          ))}
      </div>
    </div>
  );
}

export default RecommendedProd;
